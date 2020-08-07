$(document).ready(function() {

    $("#regAdmin").hide()

    $('#btn-submit').click(function() {


        $('.invalid-feedback').hide()
        var isValid = true;
        var username = $('#username').val();
        var password = $('#password').val();
        var checkadmin = $('input[name ="admin"]:checked').val();
        var isadmin = false;
        var adminPassword
        var url = '/register'
        if (checkadmin == "admin") {
            isadmin = true
            url = '/admin-register'
            $("#regAdmin").show()
        }

        if ($('#username').val() < 1) {
            $('#username').parent().find('.invalid-feedback.Bb').show();
            isValid = false
        }
        if ($('#password').val() < 1) {
            $('#password').parent().find('.invalid-feedback.Bb').show();
            isValid = false
        }
        if ($('#passwordConfirm').val() < 1) {
            $('#passwordConfirm').parent().find('.invalid-feedback.Bb').show();
            isValid = false
        }
        if ($('#password').val() != $('#passwordConfirm').val()) {
            $('#passwordConfirm').parent().find('.invalid-feedback.Aa').show();
            isValid = false
        }
        if (isadmin) {
            if ($('#admin-password').val() < 1) {
                $('#password').parent().find('.invalid-feedback.Bb').show();
                isValid = false
            }
            adminPassword = $('#admin-password').val()
        }
        var data
        if (isadmin) {
            data = { username, password, adminPassword }
        } else {
            data = { username, password }
        }

        //check if username exist 

        if (isValid) {

            $.post(url, data, 'json').done(res => {
                console.log(`name:${username} pass:${password}`)
                alert(`welcome ${username}`)
                localStorage.setItem('token', data.access_token);
                location.href = '/';
            }).fail(res => {
                alert("bad user password try again !")
            })
            $('#form-wrap form')[0].reset()

        }

        return false;
    })
    $(document).on('change', '#admin', function() {
        var amount = $('input[name ="admin"]:checked').val();

        if (amount == "admin") {
            $('#regAdmin').show()
        } else
            $('#regAdmin').hide()
        return false;
    });


});