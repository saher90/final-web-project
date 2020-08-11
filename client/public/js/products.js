$(document).ready(function() {

    $.get('/products-items', function(data, status) {
        $(".flex-row.products-container").html('')
        $.each(data, function(index, item) {
            $(".flex-row.products-container").append(`<div class="product-small-wrap" id=${item.name}>
            <div class="img-wrap">
                <a target="_blank" href="img/${item.imgname}">
                    <img id="imgID" src="/img/${item.imgname}" alt=${item.name} width="300" height="200"></a>
            </div>
            <div class="text-wrap">
                <p>${item.description}</p>
                <div class="form-wrap">
                    <form class="add-form">
                        <p>price: <b id="price">${item.price}</b><b>$</b></p>
                        <label class="quantity-label" for="quantity">Quantity:</label>
                        <input type="number" class="class-quantity" value="1" id="quantity">
                        <input type="button" value="Add To Cart" class="btn-submit">
                    </form>
                </div>

            </div>

        </div>`)

        })


    })
    $.get('/is-admin', function(data, status) {
        console.log("isadmin")
        if (status) {
            console.log("is admin yessss")
            var flag = data.admin
            if (flag == "admin") {
                $(".flex-row.navbar-container").html('')
                $(".flex-row.navbar-container").append(`<div id="navbar-wrap">
                <nav id="navBar">
                <a href="/">Home page</a> |
                    <a href="/checkuser">Check out</a> |
                    <a href="/login">Login</a> |
                    <a href="/register">Register</a> |
                    <a href="/logout">LogOut</a> |
                    <a href="/orders">Orders</a>
                </nav>
                <div id="loggedin">
                <p id="loginColor">logged in as: <b id="username">${data.username}</b></p>
                </div>
            </div>`)
            }
            if (flag == "client") {
                $(".flex-row.navbar-container").html('')
                $(".flex-row.navbar-container").append(`<div id="navbar-wrap">
                <nav id="navBar">
                <a href="/">Home page</a> |
                    <a href="/checkuser">Check out</a> |
                    <a href="/login">Login</a> |
                    <a href="/register">Register</a> |
                    <a href="/logout">LogOut</a>
                </nav>
                <div id="loggedin">
                <p id="loginColor">logged in as: <b id="username">${data.username}</b></p>
                </div>
            </div>`)
            }


        }
    })


    $(document).on('click', '.btn-submit', function() {
        var elmId = $(this).closest(".product-small-wrap").attr("id");
        var amount = $(this).closest(".text-wrap").find(".class-quantity").val()
        var iteamValue = Number($(this).closest(".form-wrap").find('#price').html()) / amount
        $(this).closest(".text-wrap").find(".class-quantity").val(1)
        $(this).closest(".form-wrap").find('#price').html(`${iteamValue}`)
        $.post('/products', { productId: elmId, quantity: amount }, 'json').done(function(res, status) {
            if (status)
                alert("item added to cart!")
        }).fail(function(res) {
            if (res.status === 403) {
                alert("login first")
                location.href = '/login';
            }
        })

        return false;
    })
    $(document).on('click', '.class-quantity', function() {
        var amount = $(this).val()
        if (amount > 0) {
            amount *= 20
            $(this).closest(".form-wrap").find('#price').html(`${amount}`)
        } else
            $(this).val(1)
        return false;
    });

})