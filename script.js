// Simple cart logic using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    cartItems.innerHTML += `<li>${item.name} - ₦${item.price.toLocaleString()} <button onclick="removeFromCart(${idx})" style="margin-left:10px;">Remove</button></li>`;
  });
  cartTotal.textContent = 'Total: ₦' + total.toLocaleString();
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartDisplay();
  document.getElementById('cart-sidebar').style.display = 'block';
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  updateCartDisplay();
}

function closeCart() {
  document.getElementById('cart-sidebar').style.display = 'none';
}

document.getElementById('open-cart-btn').onclick = function() {
  updateCartDisplay();
  document.getElementById('cart-sidebar').style.display = 'block';
};

// Attach to all add-to-cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.onclick = function() {
    addToCart(this.dataset.name, Number(this.dataset.price));
  };
});

// On page load, update cart display
updateCartDisplay();

// Make functions global for inline onclick
window.removeFromCart = removeFromCart;
window.closeCart = closeCart;