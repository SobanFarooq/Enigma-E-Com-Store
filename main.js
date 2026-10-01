document.addEventListener("DOMContentLoaded", function () {

    const products = [
        {
            id: 1,
            name: "Enigma Cleanser",
            image: "images/cleanser.jpg",
            description: "Deep cleansing for everyday clarity.",
            price: 32
        },
        {
            id: 2,
            name: "Enigma Body Bath",
            image: "images/bodybath.jpg",
            description: "A refined cleansing experience.",
            price: 28
        },
        {
            id: 3,
            name: "Enigma Hair Pomade",
            image: "images/pomade.jpg",
            description: "Flexible hold with premium texture.",
            price: 24
        },
        {
            id: 4,
            name: "Enigma Hand Exfoliator",
            image: "images/handexfoliator.jpg",
            description: "Renew and refine tired skin.",
            price: 26
        },
        {
            id: 5,
            name: "Enigma Sunscreen",
            image: "images/sunscreen.jpg",
            description: "Lightweight daily protection.",
            price: 30
        },
        {
            id: 6,
            name: "Enigma Day Cream",
            image: "images/daycream.jpg",
            description: "Lasting hydration throughout the day.",
            price: 34
        }
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const container = document.getElementById("products-container");

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {

        const count = document.getElementById("cart-count");

        if (!count) return;

        let total = 0;

        cart.forEach(item => {
            total += item.quantity;
        });

        count.textContent = total;
    }

function removeFromCart(id) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart = cart.filter(
            product => product.id !== id
        );

    }

    saveCart();
    updateCartCount();
    renderCart();
}

    function renderCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    let html = "";
    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        html += `
            <div class="cart-item mb-3 pb-3 border-bottom">

                <h6>${item.name}</h6>

                <p class="mb-1">
                    Quantity: ${item.quantity}
                </p>

                <p class="mb-2">
                    $${item.price}
                </p>

                <button
                    class="btn btn-sm btn-outline-dark remove-btn"
                    data-id="${item.id}">
                    Remove
                </button>

            </div>
        `;
    });

    if (cart.length === 0) {

        html = `
            <p class="text-muted">
                Your cart is empty.
            </p>
        `;
    }

    cartItems.innerHTML = html;

    cartTotal.textContent =
        "$" + total.toFixed(2);

    document
        .querySelectorAll(".remove-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    removeFromCart(
                        parseInt(this.dataset.id)
                    );

                }
            );

        });
}

    function addToCart(id) {

        const product = products.find(
            p => p.id === id
        );

        const existing = cart.find(
            item => item.id === id
        );

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }

        saveCart();
        updateCartCount();
        renderCart();
    }

    if (container) {

        let html = "";

        products.forEach(product => {

            html += `
                <div class="col-lg-4 col-md-6">

                    <div class="product-card">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            class="img-fluid">

                        <div class="card-body text-center">

                            <h5 class="product-title">
                                ${product.name}
                            </h5>

                            <p>
                                ${product.description}
                            </p>

                            <p class="product-price">
                                $${product.price}
                            </p>

                            <button
                                class="btn btn-dark-custom add-btn"
                                data-id="${product.id}">
                                Add To Cart
                            </button>

                        </div>

                    </div>

                </div>
            `;
        });

        container.innerHTML = html;

        document
            .querySelectorAll(".add-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            parseInt(
                                this.dataset.id
                            );

                        addToCart(id);

                    }
                );

            });
    }

    updateCartCount();
    renderCart();

});