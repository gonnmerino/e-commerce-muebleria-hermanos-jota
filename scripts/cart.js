const renderCart = () => {
  const container = document.getElementById("cart-content-layout");
  if (!container) return;

  const cart = getCart();
  updateCartCounter();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-message">
        <p>Tu carrito está vacío.</p>
        <br>
        <a href="catalog.html" class="btn btn-primary">Ir al Catálogo</a>
      </div>
    `;
    return;
  }

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const itemsHTML = cart
    .map(
      (item) => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-price">${formatPrice(item.price)} c/u</p>
        </div>
        <div class="cart-item-actions">
          <button class="btn-qty decrease-btn" aria-label="Restar cantidad">-</button>
          <span class="cart-qty">${item.quantity}</span>
          <button class="btn-qty increase-btn" aria-label="Sumar cantidad">+</button>
        </div>
        <p class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</p>
        <button class="remove-btn" aria-label="Eliminar producto">
          <img src="assets/images/trash.png" alt="Eliminar" class="cart-icon">
        </button>
      </div>
    `
    )
    .join("");

  container.innerHTML = `
    <div class="cart-items-list">
      ${itemsHTML}
    </div>
    <div class="cart-summary">
      <h3>Resumen del Pedido</h3>
      <div class="summary-row">
        <span>Total:</span>
        <span class="total-price">${formatPrice(totalAmount)}</span>
      </div>
      <button id="checkout-btn" class="btn btn-primary btn-block">Finalizar Compra</button>
      <button id="clear-cart-btn" class="btn btn-secondary btn-block">Vaciar Carrito</button>
    </div>
  `;
};

const attachCartEvents = () => {
  const container = document.getElementById("cart-content-layout");
  if (!container) return;

  container.addEventListener("click", (e) => {
    if (e.target.id === "clear-cart-btn") {
      saveCart([]);
      renderCart();
      return;
    }
    if (e.target.id === "checkout-btn") {
      alert("¡Gracias por tu compra en Hermanos Jota! Pronto nos pondremos en contacto.");
      saveCart([]);
      renderCart();
      return;
    }

    const itemCard = e.target.closest(".cart-item");
    if (!itemCard) return;

    const productId = parseInt(itemCard.dataset.id, 10);
    let cart = getCart();

    if (e.target.classList.contains("increase-btn")) {
      cart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else if (e.target.classList.contains("decrease-btn")) {
      cart = cart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    } else if (e.target.closest(".remove-btn")) {
      cart = cart.filter((item) => item.id !== productId);
    }

    saveCart(cart);
    renderCart();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  attachCartEvents();
  updateFooterYear();
});