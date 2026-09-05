const data = [
  {
    id: 1,
    name: "Mesa de comedor Roble",
    description:
      "Mesa extensible para seis comensales, elaborada en roble macizo con acabado natural.",
    category: "Comedor",
    price: 320000,
    stock: true,
  },
  {
    id: 2,
    name: "Biblioteca Modular",
    description:
      "Estantería de cinco niveles con diseño modular adaptable a cualquier ambiente.",
    category: "Living",
    price: 185000,
    stock: true,
  },
  {
    id: 3,
    name: "Sillón Córdoba",
    description:
      "Sillón de tres cuerpos con estructura de madera y tapizado en tela premium.",
    category: "Living",
    price: 410000,
    stock: false,
  },
  {
    id: 4,
    name: "Cama Queen Nogal",
    description:
      "Cama matrimonial con cabecero tallado a mano en nogal sostenible.",
    category: "Dormitorio",
    price: 275000,
    stock: true,
  },
];
const container = document.querySelector("#products");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
}

function renderProducts(items) {
  if (!items || items.length === 0) {
    return (container.innerHTML = `No se encontraron productos que coincidan.`);
  }

  container.innerHTML = items
    .map(
      (product) => `
<article class="product-card">
      <img src="" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">$${product.price.toLocaleString("es-AR")}</span>
        <div class="product-actions">
          <a href="producto.html?id=${product.id}" class="btn btn-primary">Ver Detalle</a>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

function filterProducts(query) {
  const searchNormalize = query.toLowerCase().trim();
  const filtered = data.filter((product) =>
    product.name.toLowerCase().includes(searchNormalize),
  );
  renderProducts(filtered);
}

searchInput.addEventListener("input", (event) => {
  filterProducts(event.target.value);
});
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterProducts(searchInput.value);
});

document.addEventListener("DOMContentLoaded", async () => {
  container.innerHTML = `<p>Cargando productos...</p>`;
  try {
    const products = await fetchProducts();
    renderProducts(products);
  } catch (err) {
    container.innerHTML = `<p>Error al cargar los productos.</p>`;
  }
  const footerYear = document.getElementById("year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
