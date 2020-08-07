$(document).ready(function() {

    $.get('/is-admin', function(data, status) {
        console.log("hello")
        if (status) {
            var flag = data.admin
            console.log(flag)
            if (flag) {
                $(".flex-row.navbar-container").html('')
                console.log(flag)
                $(".flex-row.navbar-container").append(`<div id="navbar-wrap">
                <nav id="navBar">
                    <a href="/products">Products Page</a> | 
                    <a href="/login">Login</a> | 
                    <a href="/register">Register</a> | 
                    <a href="/logout">LogOut</a> | 
                    <a href="/orders">Orders</a>
                </nav>
            </div>`)
            }
        }

    })

})