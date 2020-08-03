$(document).ready(function() {


    $('.btn-submit').click(function() {
        var elmId = $(this).closest(".text-wrap").attr("id");
        alert(elmId);
        console.log(elmId)
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

})