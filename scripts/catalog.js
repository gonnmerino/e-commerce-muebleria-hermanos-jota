const catalogProducts = [
  {
    id: 1,
    name: "Silla Comedor Jota",
    price: 45000,
    category: "Sillas",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Mesa Roble Macizo",
    price: 180000,
    category: "Mesas",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Sillón Nórdico 2 Cuerpos",
    price: 250000,
    category: "Sillones",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Estantería Industrial",
    price: 95000,
    category: "Muebles",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Mesa de Centro Ratona",
    price: 62000,
    category: "Mesas",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Silla Ergonomica Madera",
    price: 52000,
    category: "Sillas",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80"
  }
];

const updateCartCounter = () => {
  const counter = document.getElementById("cart-counter");
  if (!counter) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((acc, item) => acc + item.quantity, 0);
  counter.textContent = total;
};

const formatPrice = (amount) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(amount);
};

const renderCatalog = (items) => {
  const container = document.getElementById("catalog-container");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = "<p>No se encontraron productos que coincidan con la búsqueda.</p>";
    return;
  }

  container.innerHTML = items
    .map(
      (product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">${formatPrice(product.price)}</p>
        <a href="product.html?id=${product.id}" class="btn btn-primary">Ver Detalle</a>
      </div>
    </article>
  `
    )
    .join("");
};

const filterProducts = () => {
  const searchVal = document.getElementById("search-input")?.value.toLowerCase().trim() || "";
  const categoryVal = document.getElementById("category-filter")?.value || "all";

  const filtered = catalogProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchVal);
    const matchesCategory = categoryVal === "all" || product.category === categoryVal;
    return matchesSearch && matchesCategory;
  });

  renderCatalog(filtered);
};

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog(catalogProducts);
  updateCartCounter();

  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");

  if (searchInput) searchInput.addEventListener("input", filterProducts);
  if (categorySelect) categorySelect.addEventListener("change", filterProducts);

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});