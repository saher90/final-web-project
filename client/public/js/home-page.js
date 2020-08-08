$(document).ready(function() {

    $.get('/is-admin', function(data, status) {
        if (status) {
            var flag = data.admin
            if (flag == "admin") {
                $(".flex-row.navbar-container").html('')
                $(".flex-row.navbar-container").append(`<div id="navbar-wrap">
                <nav id="navBar">
                    <a href="/products">Products Page</a> | 
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
                    <a href="/products">Products Page</a> | 
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

})