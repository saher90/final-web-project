$(document).ready(function() {

    $.get('./products-items', function(data, status) {
        $(".flex-row.products-container").html('')
        $.each(data, function(index, item) {
            $(".flex-row.products-container").append(`<div class="product-small-wrap" id=${item.name}>
            <div class="img-wrap">
                <a target="_blank" href="img/${item.imgname}">
                    <img src="/img/${item.imgname}" alt=${item.name} width="300" height="200"></a>
            </div>
            <div class="text-wrap">
                <p>${item.description}</p>
                <div class="form-wrap">
                    <form class="add-form">
                        <p>price: <b id="price">${item.price}$</b></p>
                        <label class="quantity-label" for="quantity">Quantity:</label>
                        <input type="number" class="class-quantity" value="1" id="quantity">
                        <input type="button" value="Add To Cart" class="btn-submit">
                    </form>
                </div>

            </div>

        </div>`)

        })

    })

    $(document).on('click', '.btn-submit', function() {
        var elmId = $(this).closest(".product-small-wrap").attr("id");
        var amount = $(this).closest(".text-wrap").find(".class-quantity").val()
        $(this).closest(".text-wrap").find(".class-quantity").val(1)
        $(this).closest(".form-wrap").find('#price').html(`20$`)
        console.log(elmId)
        console.log(amount)
        $.post('/products', { productId: elmId, quantity: amount }, function(res) {
            if (res.var == "false") {
                alert("login first")
            }
            location.href = '/login';
            if (res.statusCode == 200)
                alert("item added to cart!")
        }, 'json')

        return false;
    })
    $(document).on('click', '.class-quantity', function() {
        var amount = $(this).val()
        if (amount > 0) {
            amount *= 20
            $(this).closest(".form-wrap").find('#price').html(`${amount}$`)
        } else
            $(this).val(1)
        return false;
    });

})