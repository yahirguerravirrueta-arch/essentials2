/* ===========================
   🛒 CARRITO GLOBAL
   Funciona en todas las páginas
   =========================== */

let cart = JSON.parse(localStorage.getItem("cart_v1")) || [];

// Guardar carrito
function saveCart() {
  localStorage.setItem("cart_v1", JSON.stringify(cart));
  renderMiniCart();
  updateCartUI();
}

// Agregar al carrito
function addToCart(product) {
  cart.push(product);
  saveCart();
}

// Quitar del carrito por ID único
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

// ================= MINICART FLOTANTE ================= //
function renderMiniCart() {
  const mini = document.getElementById("miniCart");
  const count = document.getElementById("miniCount");

  if (!mini || !count) return;

  count.textContent = cart.length;
  mini.style.display = cart.length > 0 ? "flex" : "none";
}

function setupMiniCart() {
  const mini = document.getElementById("miniCart");
  if (mini) {
    mini.addEventListener("click", () => {
      const panel = document.getElementById("cart");
      if (panel) panel.classList.add("open");
    });
  }
}

// ================= PANEL DE CARRITO LATERAL ================= //
function updateCartUI() {
  const list = document.getElementById("cartList");
  const total = document.getElementById("totalLine");

  if (!list || !total) return;

  list.innerHTML = "";
  let t = 0;

  cart.forEach((p, i) => {
    t += p.price;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${p.image}" />
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="meta">Talla ${p.size}</div>
        <div class="price">$${p.price}</div>
      </div>
      <button class="btn" onclick="removeFromCart(${i})">❌</button>
    `;
    list.appendChild(div);
  });

  total.textContent = "Total: $" + t;
}

// ================= INICIALIZAR ================= //
document.addEventListener("DOMContentLoaded", () => {
  renderMiniCart();
  setupMiniCart();
  updateCartUI();
});
