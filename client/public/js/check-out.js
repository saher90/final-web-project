$(document).ready(function() {

    $.get('./load-data', function(data, status) {

        $(".flex-row.products-container").html('')
        var totalPrice = 0

        $.each(data, function(index, item) {
            var val = Number(item.price) * Number(item.quantity)
            $(".flex-row.products-container").append(`<div class="product-small-wrap" id=${item.name}>
            <div class="img-wrap">
                <a target="_blank" href="/img/${item.imgname}">
                    <img src="/img/${item.imgname}" alt=${item.name} width="300" height="200"></a>
            </div>
            <div class="text-wrap">
                <p id="description">${item.description}</p>
                <div class="form-wrap">
                    <form class="add-form">
                        <p>price: <b id="price">${val}</b><b>$</b></p>
                        <label class="quantity-label" for="quantity">Quantity:</label>
                        <input type="number" class="class-quantity" value="${item.quantity}" id="quantity">
                        <input type="button" value="Remove" class="btn-remove">
                    </form>
                </div>
            </div>
        </div>
            `)
            totalPrice += Number(item.price) * Number(item.quantity)

        })
        if (totalPrice == 0) {
            alert("cart is empty")
        }
        $('#totalPrice').html(`${totalPrice}`)


    })
    $.get('/is-admin', function(data, status) {
        if (status) {

            $(".flex-row.navbar-container").html('')
            $(".flex-row.navbar-container").append(`<div id="navbar-wrap">
                <nav id="navBar">
                <a href="/">Home page</a> |
                <a href="/products">products</a>
                </nav>
                <div id="loggedin">
                <p id="loginColor">logged in as: <b id="username">${data.username}</b></p>
                </div>
            </div>`)



        }
    })
    $('#btn-submit').click(function() {
        $('.invalid-feedback').hide()
        var isValid = true;
        var firstname = $('#Name').val();
        var lastname = $('#LastName').val();
        var email = $('#Email').val();
        var country = $('#CountryName').val();
        var city = $('#CityName').val();
        var tel = $('#Tel').val();
        var address = $('#Address').val();
        var deliveryMethod = $('#deliveryType').val();
        var totalPrice = Number($("#totalPrice").html());


        if (deliveryMethod != "Normal Delivery") {
            totalPrice += 10;
        }
        if ($('#Name').val() < 1) {
            $('#Name').parent().find('.invalid-feedback').show();
            isValid = false
        }
        if ($('#LastName').val() < 1) {
            $('#LastName').parent().find('.invalid-feedback').show();
            isValid = false
        }
        if (!validEmail($('#Email').val())) {
            $('#Email').parent().find('.invalid-feedback').show();
            isValid = false
        }

        if ($('#Tel').val() < 1 || isNaN($('#Tel').val())) {
            $('#Tel').parent().find('.invalid-feedback').show();
            isValid = false
        }
        if ($('#CountryName').val() < 1) {
            $('#CountryName').parent().find('.invalid-feedback').show();
            isValid = false
        }
        if ($('#CityName').val() < 1) {
            $('#CityName').parent().find('.invalid-feedback').show();
            isValid = false
        }
        if ($('#Address').val() < 1) {
            $('#Address').parent().find('.invalid-feedback').show();
            isValid = false
        }


        if (isValid) {
            $('#output').html(`<h5>Order complete :</h5><hr><p>Total: ${totalPrice} $</p><hr>
            <p>firstName: ${firstname}</p><p>LastName: ${lastname}</p><p>Tel: ${tel}</p>
            <p>Email: ${email}</p><p>country: ${country}</p><p>City: ${city}</p>
            <p>Address: ${address}</p><hr><p>delivery Type: ${deliveryMethod}</p>`)
            $('#form-wrap form')[0].reset()
            const data = {
                firstname,
                lastname,
                tel,
                email,
                address,
                country,
                city,
                totalPrice,
                deliveryMethod
            }
            $.post('/order', data, 'json').done(function(res, status) {
                if (status) {
                    alert("order done!")
                    $("#totalPrice").html("0")
                    $('#myproducts').empty()
                }
            }).fail(function(res) {
                if (res.status === 403) {
                    alert("fail to order!")
                }
            })
            $("#totalPrice").html("0")
            $('#myproducts').empty()

        }

        return false;
    })
    $(document).on('change', '.form-select', function() {
        var val = Number($('#totalPrice').html())
        if ($(this).val() != "Normal Delivery")
            val += 10
        else
            val -= 10

        $('#totalPrice').html(`${val}`)
        return false
    })

    $(document).on('change', '.class-quantity', function() {
        var amount = $(this).val()
        var oldvalue
        var temp
        var elmId
        if (amount > 0) {
            elmId = $(this).closest(".product-small-wrap").attr("id");
            $.post('/update-quantity', { productId: elmId, quantity: amount }, function(res, status) {
                if (status) {
                    oldvalue = Number(res.quantity) - Number(res.oldquantity)
                    oldvalue *= 20
                    temp = Number($("#totalPrice").html())
                    temp += oldvalue
                    $("#totalPrice").html(`${temp}`)
                }
            }, 'json')
            amount *= 20
            $(this).closest(".form-wrap").find('#price').html(`${amount}`)
        } else {
            oldvalue = Number($(this).closest(".form-wrap").find('#price').html()) / 20
            $(this).val(oldvalue)
        }
        return false;
    });
    $(document).on('click', '.btn-remove', function() {
        var elmId = $(this).closest(".product-small-wrap").attr("id");
        var amount = Number($(this).closest(".form-wrap").find('#price').html())
        var totalAmount = Number($("#totalPrice").html())
        totalAmount -= amount
        $.post('/remove-iteam', { productId: elmId }, 'json').done(function(res, status) {
            if (status) {
                alert("item removed!")
                $(`#${elmId}`).remove()
                $("#totalPrice").html(`${totalAmount}`)
            }
        }).fail(function(res) {
            alert("fail to remove!")
            if (res.status === 403) {
                alert("fail to remove!")
            }
        })
    })

});

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}