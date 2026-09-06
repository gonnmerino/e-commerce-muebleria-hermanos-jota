const addToCart = (product, quantity) => {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === product.id);

  if (index !== -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  saveCart(cart);
};

const getProductIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
};

const renderProductDetail = () => {
  const container = document.getElementById("product-detail-container");
  const breadcrumbName = document.getElementById("breadcrumb-product-name");
  const productId = getProductIdFromURL();
  const product = ALL_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    if (breadcrumbName) breadcrumbName.textContent = "No encontrado";
    container.innerHTML = "<p>El producto no existe. Regresá al <a href='catalog.html'>catálogo</a>.</p>";
    return;
  }

  if (breadcrumbName) breadcrumbName.textContent = product.name;

  container.innerHTML = `
    <div class="product-gallery">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info-detail">
      <span class="category-tag">${product.category}</span>
      <h2>${product.name}</h2>
      <p class="price">${formatPrice(product.price)}</p>
      <p class="description">${product.description}</p>
      <div class="product-specs">
        <h3>Especificaciones Técnicas</h3>
        <ul>
          <li><strong>Material:</strong> ${product.specs.material}</li>
          <li><strong>Dimensiones:</strong> ${product.specs.dimensions}</li>
          <li><strong>Acabado:</strong> ${product.specs.finish}</li>
          <li><strong>Peso:</strong> ${product.specs.weight}</li>
        </ul>
      </div>
      <div class="purchase-actions">
        <div class="quantity-selector">
          <label for="product-quantity">Cantidad:</label>
          <input type="number" id="product-quantity" value="1" min="1" max="10">
        </div>
        <button id="add-to-cart-btn" class="btn btn-primary">Añadir al Carrito</button>
      </div>
    </div>
  `;

  const addBtn = document.getElementById("add-to-cart-btn");
  const qtyInput = document.getElementById("product-quantity");

  addBtn.addEventListener("click", () => {
    const qty = parseInt(qtyInput.value, 10) || 1;
    addToCart(product, qty);

    const originalText = addBtn.textContent;
    addBtn.textContent = "¡Agregado al carrito! ✔️";
    addBtn.disabled = true;

    setTimeout(() => {
      addBtn.textContent = originalText;
      addBtn.disabled = false;
    }, 1500);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderProductDetail();
  updateCartCounter();
  updateFooterYear();
});