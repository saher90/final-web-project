$(document).ready(function() {

    $.get('./check-out-my-items', function(data, status) {
        var obj = {
            "items": [{
                    "name": "ahri",
                    "price": 20,
                    "imgname": "League-of-Legends-Ahri-and-D-Va.jpg",
                    "description": "5 Panel Lol League Legends Ahri Picture Artworks Poster",
                    "quantity": "2"
                },
                {
                    "name": "akali",
                    "price": 20,
                    "imgname": "League-of-Legends-akali.jpg",
                    "description": "5 Panel Lol League Legends Akali Picture Artworks Poster",
                    "quantity": "1"

                },
                {
                    "name": "irelia",
                    "price": 20,
                    "imgname": "League-of-Legends-Irelia.jpg",
                    "description": "5 Panel Lol League Legends Irelia Picture Artworks Poster",
                    "quantity": "4"
                },
                {
                    "name": "janna",
                    "price": 20,
                    "imgname": "League-of-Legends-Janna.jpg",
                    "description": "5 Panel Lol League Legends Janna Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "jinx",
                    "price": 20,
                    "imgname": "League-of-Legends-Jinx.jpg",
                    "description": "5 Panel Lol League Legends Jinx Picture Artworks Poster",
                    "quantity": "5"
                },
                {
                    "name": "katarina",
                    "price": 20,
                    "imgname": "League-of-Legends-Katarina.jpg",
                    "description": "5 Panel Lol League Legends Katarina Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "kindred",
                    "price": 20,
                    "imgname": "League-of-Legends-Kindred.jpg",
                    "description": "5 Panel Lol League Legends Kindred Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "lux",
                    "price": 20,
                    "imgname": "League-of-Legends-Lux.jpg",
                    "description": "5 Panel Lol League Legends Lux Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "riven-yasuo",
                    "price": 20,
                    "imgname": "League-of-Legends-Riven-Yasuo.jpg",
                    "description": "5 Panel Lol League Legends Riven And Yasuo Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "xayah-rakan",
                    "price": 20,
                    "imgname": "League-of-Legends-Xayah-Rakan.jpg",
                    "description": "5 Panel Lol League Legends Xayah And Rakan Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "zed-1",
                    "price": 20,
                    "imgname": "League-of-Legends-Zed.jpg",
                    "description": "5 Panel Lol League Legends Zed Picture Artworks Poster",
                    "quantity": "1"
                },
                {
                    "name": "zed-2",
                    "price": 20,
                    "imgname": "League-of-Legends-Zed-Game-Canvas.jpg",
                    "description": "5 Panel Lol League Legends Zed Picture Artworks Poster",
                    "quantity": "1"
                }
            ]
        }


        $(".flex-row.products-container").html('')
        $.each(obj.items, function(index, item) {

            $(".flex-row.products-container").append(`<div class="product-small-wrap" id=${item.name}>
            <div class="img-wrap">
                <a target="_blank" href="public/img/${item.imgname}">
                    <img src="public/img/${item.imgname}" alt=${item.name} width="300" height="200"></a>
            </div>
            <div class="text-wrap">
                <p id="description">${item.description}</p>
                <div class="form-wrap">
                    <form class="add-form">
                        <p>price: <b id="price>${Number(item.price) * Number(item.quantity)}$</b></p>
                        <label class="quantity-label" for="quantity">Quantity:</label>
                        <input type="number" class="class-quantity" value="${item.quantity}" id="quantity">
                        <input type="button" value="Remove" class="btn-remove">
                    </form>
                </div>
            </div>
        </div>
            `)
        })


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

});