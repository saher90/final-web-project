$(document).ready(function() {

    $.get('./load-orders', function(res, status) {
        $(".container.orders-container").html('')
        $.each(res, function(index, data) {
            $(".container.orders-container").append(`<div class="flex-row order-container">
            <div class="flex-row mini-detals-box">
                <p>Ordered in Date: <b id="date">${data.date}</b></p>
                <p>Send to address: <b id="county">${data.country}</b> ,<b id="city">${data.city}</b> ,<b id="address">${data.address}</b></p>
                <p>total: <b id="total">${data.totalPrice}</b><b>$</b></p>
                <p>Delivery Method: <b id="deliveryMethod">${data.deliveryMethod}</b></p>
                <button type="button" id="btn-show">Show order</button>
            </div>
            <div class="flex-row  large-detals-box" id="${data.username}">
                <div class="flex-row user-detal-box">
                <p>To: <b id="firstname">${data.firstname}</b> <b id="lastname">${data.lastname}</b></p>
                    <p>tel: <b id="tel">${data.tel}</b></p>
                    <p>email: <b id="email">${data.email}</b></p>
                </div> </div>`)

            $.each(data.orders, function(index, order) {
                $(`#${data.username}`).append(`<div class="flex-row order-detal-box">
                <p>Product Id: <b id="productId">${order.productId}</b></p>
                <p>Quantity: <b id="quantity">${order.quantity}</b></p>
                </div>`)

            })

            $(`#${data.username}`).append(` <button type="button" id="btn-close">Close</button>`)
        })
        $(".flex-row.large-detals-box").hide()
    })
    $.get('/is-admin', function(data, status) {
        if (status) {
            var flag = data.admin
            if (flag == "admin") {
                $(".flex-row.navbar-container").html('')
                $(".flex-row.navbar-container").append(`<div id="navbar-wrap">
                <nav id="navBar">
                <a href="/">Home Page</a> |
                <a href="/products">Products Page</a>
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
                <a href="/">Home Page</a> |
                <a href="/products">Products Page</a>
                </nav>
                <div id="loggedin">
                <p id="loginColor">logged in as: <b id="username">${data.username}</b></p>
                </div>
            </div>`)
            }


        }
    })

    $(document).on('click', '#btn-show', function() {
        console.log(`${$(this).closest(".flex-row.order-container").find(".flex-row.large-detals-box").html()}`)
        $(this).closest(".flex-row.order-container").find(".flex-row.large-detals-box").show()
    })
    $(document).on('click', '#btn-close', function() {
        $(this).closest(".flex-row.order-container").find(".flex-row.large-detals-box").hide()
    })
})