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

    $('#btn-submit').click(function() {
        $('.invalid-feedback').hide()
        var city = $('#city').val()
        var isValid = true

        if ($('#city').val() < 1) {
            $('#city').parent().find('.invalid-feedback').show();
            isValid = false
        }
        if (isValid) {

            $.post('/get-weather', { city: city }, 'json').done(res => {
                console.log(res)
                $('.weather-output').html('')
                $.each(res.weather, (index, val) => {
                    $('.weather-output').append(`<p><b>${res.name}</b> <img src="/weather-img/${val.icon}@2x.png"></p>
                    <p><b>${res.main.temp} &deg;C |</b> ${val.main}, ${val.description}</p>`)
                })

            }).fail(res => {
                alert("worng city name ")
            })

        }
        return false;
    })
    $('#btn-submit-nba').click(function() {
        $.get('/nba-api', 'json').done(res => {
            console.log(res)
            var counter = Number(res.api.results)
            $('.games-wrap').html('')
            $.each(res.api.games, (index, game) => {
                console.log("hello")
                $('.games-wrap').append(`
                <div class="game-wrap">
                <div class="Team">
                    <p><img src="${game.vTeam.logo}" class="img-logo"></p>
                    <p><b>${game.vTeam.nickName}</b></p>
                </div>
                <div class="score">
                    <h4 id="vTeam-score">${game.vTeam.score.points}</h4>
                    <p class="final"><b> final </b></p>
                    <h4 id="hTeam-score">${game.hTeam.score.points}</h4>
                </div>

                <div class="Team">
                    <p><img src="${game.hTeam.logo}" class="img-logo"></p>
                    <p><b>${game.hTeam.nickName}</b></p>
                </div>
            </div>`)
                if (--counter > 0) $('.games-wrap').append(`<hr>`)
            })
            console.log($('.games-wrap').html())
                /* $('.img-logo').width(50); // Units are assumed to be pixels
                 $('.img-logo').height(50);*/
        }).fail(res => {
            console.log("error nba api")
        })

        return false;
    })


})