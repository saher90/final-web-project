$(document).ready(function() {

    $('#btn-submit').click(function() {
        const invaidFeedBack = "UserName Exist ,Try Different UserName"

        $('.invalid-feedback').hide()
        var isValid = true;
        var namename = $('#username').val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();


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

        //check if username exist 

        if (isValid) {
            $('#form-wrap form')[0].reset()
        }

        return false;
    })

});