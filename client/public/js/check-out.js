$(document).ready(function() {

    $('.invalid-feedback').hide()
    $.get('./check-out-my-items', function(data, status) {
        var obj = {
            "items": [{
                    "name": "ahri",
                    "price": 20,
                    "imgname": "League-of-Legends-Ahri-and-D-Va.jpg",
                    "description": "5 Panel Lol League Legends Ahri Picture Artworks Poster",
                    "quantity": "2"
                },
                {
                    "name": "akali",
                    "price": 20,
                    "imgname": "League-of-Legends-akali.jpg",
                    "description": "5 Panel Lol League Legends Akali Picture Artworks Poster",
                    "quantity": "1"

                },
                {
                    "name": "irelia",
                    "price": 20,
                    "imgname": "League-of-Legends-Irelia.jpg",
                    "description": "5 Panel Lol League Legends Irelia Picture Artworks Poster",
                    "quantity": "4"
                },
                {
                    "name": "janna",
                    "price": 20,
                    "imgname": "League-of-Legends-Janna.jpg",
                    "description": "5 Panel Lol League Legends Janna Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "jinx",
                    "price": 20,
                    "imgname": "League-of-Legends-Jinx.jpg",
                    "description": "5 Panel Lol League Legends Jinx Picture Artworks Poster",
                    "quantity": "5"
                },
                {
                    "name": "katarina",
                    "price": 20,
                    "imgname": "League-of-Legends-Katarina.jpg",
                    "description": "5 Panel Lol League Legends Katarina Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "kindred",
                    "price": 20,
                    "imgname": "League-of-Legends-Kindred.jpg",
                    "description": "5 Panel Lol League Legends Kindred Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "lux",
                    "price": 20,
                    "imgname": "League-of-Legends-Lux.jpg",
                    "description": "5 Panel Lol League Legends Lux Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "riven-yasuo",
                    "price": 20,
                    "imgname": "League-of-Legends-Riven-Yasuo.jpg",
                    "description": "5 Panel Lol League Legends Riven And Yasuo Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "xayah-rakan",
                    "price": 20,
                    "imgname": "League-of-Legends-Xayah-Rakan.jpg",
                    "description": "5 Panel Lol League Legends Xayah And Rakan Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "zed-1",
                    "price": 20,
                    "imgname": "League-of-Legends-Zed.jpg",
                    "description": "5 Panel Lol League Legends Zed Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "zed-2",
                    "price": 20,
                    "imgname": "League-of-Legends-Zed-Game-Canvas.jpg",
                    "description": "5 Panel Lol League Legends Zed Picture Artworks Poster",
                    "quantity": "1"
                }
            ]
        }


        $(".flex-row.products-container").html('')
        var totalPrice = 0
        $.each(obj.items, function(index, item) {

            $(".flex-row.products-container").append(`<div class="product-small-wrap" id=${item.name}>
            <div class="img-wrap">
                <a target="_blank" href="public/img/${item.imgname}">
                    <img src="public/img/${item.imgname}" alt=${item.name} width="300" height="200"></a>
            </div>
            <div class="text-wrap">
                <p id="description">${item.description}</p>
                <div class="form-wrap">
                    <form class="add-form">
                        <p>price: <b id="price>${Number(item.price) * Number(item.quantity)}$</b></p>
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
        $('#totalPrice').html(`totalPrice$`)


    })
    $('#btn-submit').click(function() {
        $('.invalid-feedback').hide()
        var isValid = true;
        var name = $('#Name').val();
        var lastName = $('#LastName').val();
        var email = $('Email').val();
        var country = $('#CountryName').val();
        var city = $('#CityName').val();
        var tel = $('#Tel').val();
        var address = $('#Address').val();
        var deliveryType = $('#deliveryType').val();
        var totalPrice = 0;


        if (deliveryType != "Normal Delivery") {
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
            <p>Name: ${name}</p><p>Last Name: ${lastName}</p><p>Tel: ${tel}</p>
            <p>Email: ${email}</p><p>country: ${country}</p><p>City: ${city}</p>
            <p>Address: ${address}</p><p>Name: ${name}</p><hr><p>delivery Type: ${deliveryType}</p>`)
            $('#form-wrap form')[0].reset()

        }

        return false;
    })

    $('.class-quantity').on('change', function() {
        var amount = $(this).val()
        if (amount > 0) {
            amount *= 20
            $(this).closest(".form-wrap").find('#price').html(`${amount}$`)
        } else
            $(this).val(1)
        return false;
    });

});

function validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}