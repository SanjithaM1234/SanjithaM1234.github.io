// ================= PRODUCT DATA =================
const products = [
    // Christmas
    { id: 1, name: "Cozy Christmas Vibes", category: "Christmas", price: 12.99, image: "https://i.scdn.co/image/ab67616d00001e0201731f466f4c1c6ac912f714" },
    { id: 2, name: "Santa's Sleigh Minimal", category: "Christmas", price: 14.99, image: "https://thumbs.dreamstime.com/b/merry-christmas-card-design-text-young-deer-looks-up-silhouette-santa-sleigh-reindeer-night-sky-winter-fairy-forest-105237748.jpg" },
    { id: 3, name: "Elegant Red Ornaments", category: "Christmas", price: 12.99, image: "https://png.pngtree.com/thumb_back/fw800/background/20251124/pngtree-elegant-christmas-red-background-ornament-design-image_20582050.webp"},
    { id: 4, name: "Vintage Noel Poster", category: "Christmas", price: 18.99, image: "https://t1.pixers.pics/img-c676e9e9/posters-vintage-christmas-poster-with-santa-claus-design.jpg?H4sIAAAAAAAAA42PW26EMAxFtwMSYCcmE8MC5neWgEISprS8lDAt6uobplX_KlX-8EP2ub7wWKIZPFi_7D7APDo3eRjGKXWxDT6Onz7DQimVt2k6ZYiYt-u7DzasW1YKlEWpKC1wcUGdtx8mXc4mvGUv-77FFiBStY1HwqVkI9g5gkShARlUw0zeEg9DPXRbGXezOBNcKeuDsNqWe4Fn_B_LIBBU70R_6dlh3XMnJR4Ky1_CE0uknj8n9I9JjVjo09wexjlLbte0vWev2z2HPzS_a0hXcL2BYpAESoNozlF3vSmWpLRoOul97axreinYOPJsDJKoUWomso6qpPIF5v4i1IoBAAA="},
    // New Year
    { id: 5, name: "Golden New Year Countdown", category: "New Year", price: 19.99, image: "https://www.shutterstock.com/image-vector/happy-new-year-2026-golden-260nw-2690076293.jpg"},
    { id: 6, name: "Fireworks Celebration Feed", category: "New Year", price: 15.99, image: "https://img.freepik.com/free-vector/abstract-new-year-party-flyer-template_23-2148360641.jpg?semt=ais_hybrid&w=740&q=80"},
    { id: 7, name: "Minimalist 'Hello 2026'", category: "New Year", price: 10.99, image: "https://png.pngtree.com/png-vector/20250809/ourlarge/pngtree-hello-2026-png-image_17090806.webp"},
    // Sankranti
    { id: 8, name: "Colorful Kite Festival", category: "Sankranti", price: 14.99, image: "https://img.freepik.com/free-vector/flat-makar-sankranti-celebration-photocall-template_23-2149951526.jpg?semt=ais_hybrid&w=740&q=80"},
    { id: 9, name: "Pongal", category: "Sankranti", price: 16.99, image: "https://www.shutterstock.com/image-vector/south-indian-harvesting-festival-happy-260nw-2091131032.jpg"},
    { id: 10, name: "Pongal with harvest Poster", category: "Sankranti", price: 12.99, image: "https://img.myloview.com/posters/illustration-of-happy-pongal-holiday-harvest-festival-of-tamil-nadu-south-india-greeting-vector-background-700-192679127.jpg"},
    { id: 11, name: "New Year Positivity", category: "New Year", price: 16.99, image: "https://i.pinimg.com/736x/0f/54/22/0f5422fbaa724b1e2e428a9a1c5cae11.jpg"},
    { id: 12, name: "Sankranti Celebration", category: "Sankranti", price: 12.99, image: 'https://c8.alamy.com/comp/2E14F4X/indian-festival-happy-makar-sankranti-poster-design-with-group-of-colorful-kites-flying-cloudy-sky-vector-illustration-design-2E14F4X.jpg'} 
];

// ================= CORE FUNCTIONS =================

// 1. Get Cart from LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// 2. Save Cart to LocalStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(); // Update badge whenever we save
}

// 3. Add Item to Cart
// Handles both ID (from grid) and Object (from your header button)
function addToCart(input) {
    const cart = getCart();
    let productToAdd;

    if (typeof input === 'object') {
        // Handle the header button case where an object is passed
        productToAdd = input;
    } else {
        // Handle the standard ID case
        productToAdd = products.find(p => p.id === input);
    }

    if (!productToAdd) {
        console.error("Product not found");
        return;
    }

    cart.push(productToAdd);
    saveCart(cart);
    alert(`${productToAdd.name} added to cart! 🛒`);
}

// 4. Remove Item from Cart
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1); // Remove item at specific index
    saveCart(cart);
    loadCartPage(); // Refresh the cart view
}

// 5. Update Cart Badge (if you have one in nav)
function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) {
        const cart = getCart();
        badge.textContent = cart.length;
    }
}

// ================= PAGE SPECIFIC LOGIC =================

// A. Load Products (For Products Page)
function loadProductsPage() {
    const container = document.getElementById('product-container');
    if (!container) return; // Stop if we are not on products page

    container.innerHTML = ''; 

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300'">
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <span class="price">$${product.price.toFixed(2)}</span>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// B. Load Cart Items (For Cart Page)
function loadCartPage() {
    const container = document.getElementById("cart-items-container");
    const totalEl = document.querySelector(".cart-checkout-container h3");

    if (!container) return; // Stop if we are not on cart page

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is currently empty.</p>";
        if(totalEl) totalEl.textContent = "Total: $0.00";
        return;
    }

    let total = 0;
    container.innerHTML = "";

    cart.forEach((item, index) => {
        // Ensure price is treated as a number
        const price = parseFloat(item.price);
        total += price;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.category || 'Item'}</p>
                <span>$${price.toFixed(2)}</span>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Remove</button>
        `;
        container.appendChild(div);
    });

    if(totalEl) totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

// ================= CONTACT FORM =================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Thank you! Message saved.");
                contactForm.reset();
            } else {
                alert("Error: " + result.message);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Connection failed. Is the server running on port 3000?");
        }
    });
}

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    loadProductsPage(); // Will run only on products.html
    loadCartPage();     // Will run only on cart.html
    updateCartBadge();  // Will run on all pages
    
    if (window.lucide) {
        lucide.createIcons();
    }
});
