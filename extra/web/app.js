// ==============================
// PRODUCT DATA
// ==============================

const products = [
    {
        id: 1,
        name: "Gaming Headset Pro",
        price: 129.99,
        image:
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        name: "RGB Mechanical Keyboard",
        price: 159.99,
        image:
            "https://images.unsplash.com/photo-1587202372775-989c1c3a2e03?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        name: "Pro Gaming Mouse",
        price: 79.99,
        image:
            "https://images.unsplash.com/photo-1585079542156-2755d9c8a094?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        name: "UltraWide Gaming Monitor",
        price: 499.99,
        image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    },
];

// ==============================
// VARIABLES
// ==============================

const productGrid = document.getElementById("product-grid");
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartCount = document.querySelector(".cart-count");

let cart = [];

// ==============================
// DISPLAY PRODUCTS
// ==============================

function displayProducts() {
    products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

        productGrid.appendChild(card);
    });
}

displayProducts();

// ==============================
// ADD TO CART
// ==============================

function addToCart(id) {
    const product = products.find((p) => p.id === id);
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// ==============================
// UPDATE CART
// ==============================

function updateCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<div class="empty-cart-msg">Your cart is empty.</div>';
    }

    let total = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <button onclick="removeItem(${item.id})">✕</button>
    `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = totalItems;
}

// ==============================
// CHANGE QUANTITY
// ==============================

function changeQuantity(id, amount) {
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter((p) => p.id !== id);
    }

    updateCart();
}

// ==============================
// REMOVE ITEM
// ==============================

function removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
}

// ==============================
// OPEN / CLOSE CART
// ==============================

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", closeCartSidebar);
cartOverlay.addEventListener("click", closeCartSidebar);

function closeCartSidebar() {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
}