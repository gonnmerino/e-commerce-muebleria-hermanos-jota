const productsData = [
  {
    id: 1,
    name: "Mesa de comedor Roble",
    description: "Mesa extensible para seis comensales, elaborada en roble macizo con acabado natural.",
    category: "Comedor",
    price: 320000,
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80",
    stock: true
  },
  {
    id: 2,
    name: "Biblioteca Modular",
    description: "Estantería de cinco niveles con diseño modular adaptable a cualquier ambiente.",
    category: "Living",
    price: 185000,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    stock: true
  },
  {
    id: 3,
    name: "Sillón Córdoba",
    description: "Sillón de tres cuerpos con estructura de madera y tapizado en tela premium.",
    category: "Living",
    price: 410000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    stock: false
  },
  {
    id: 4,
    name: "Cama Queen Nogal",
    description: "Cama matrimonial con cabecero tallado a mano en nogal sostenible.",
    category: "Dormitorio",
    price: 275000,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    stock: true
  }
];

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const cartCounter = document.getElementById("cart-counter");
  const footerYear = document.getElementById("year");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCounter() {
    if (cartCounter) {
      cartCounter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  }

  function formatPrice(amount) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    }).format(amount);
  }

  function fetchProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsData);
      }, 400);
    });
  }

  function renderProducts(items) {
    if (!container) return;

    if (!items || items.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--texto-gris);">No se encontraron productos que coincidan con la búsqueda.</p>`;
      return;
    }

    container.innerHTML = items
      .map(
        (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p style="font-size: 0.9rem; color: var(--texto-gris); margin-bottom: 0.75rem;">${product.description}</p>
          <span class="price">${formatPrice(product.price)}</span>
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" ${!product.stock ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
              ${product.stock ? 'Agregar al carrito' : 'Sin stock'}
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    attachCartEvents();
  }

  function attachCartEvents() {
    const addBtns = document.querySelectorAll(".add-to-cart-btn");
    addBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        const product = productsData.find((p) => p.id === id);

        if (product && product.stock) {
          const existing = cart.find((item) => item.id === id);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCounter();
          showNotification(`Se agregó "${product.name}" al carrito`);
        }
      });
    });
  }

  function showNotification(message) {
    const toast = document.createElement("div");
    toast.className = "cart-feedback";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  function filterProducts(query) {
    const cleanQuery = query.toLowerCase().trim();
    const filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(cleanQuery) ||
      product.description.toLowerCase().includes(cleanQuery)
    );
    renderProducts(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterProducts(e.target.value);
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      filterProducts(searchInput.value);
    });
  }

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Inicializar carga asíncrona
  container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Cargando catálogo...</p>`;
  updateCartCounter();

  try {
    const products = await fetchProducts();
    renderProducts(products);
  } catch (error) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--madera);">Ocurrió un error al cargar los productos.</p>`;
  }
});