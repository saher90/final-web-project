$(document).ready(function() {
    $('#btn-submit').click(function() {

        $('.invalid-feedback').hide()
        var isValid = true;
        var username = $('#username').val();
        var password = $('#password').val();
        var url = '/login'
        var admin = $('input[name ="admin"]:checked').val();
        if (admin == "admin")
            url = '/admin-login'

        if ($('#username').val() < 1) {
            $('#username').parent().find('.invalid-feedback').show();
            isValid = false
        }
        if ($('#password').val() < 1) {
            $('#password').parent().find('.invalid-feedback').show();
            isValid = false
        }

        if (isValid) {
            $.post(url, { username, password }, 'json').done(res => {
                localStorage.setItem('token', data.access_token);
                location.href = '/';
            }).fail(res => {
                alert("bad user password try again !")
            })
            $('#form-wrap form')[0].reset()

        }

        return false;
    })
})