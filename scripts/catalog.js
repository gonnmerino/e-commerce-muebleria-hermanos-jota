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

  const filtered = ALL_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchVal);
    const matchesCategory = categoryVal === "all" || product.category === categoryVal;
    return matchesSearch && matchesCategory;
  });

  renderCatalog(filtered);
};

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog(ALL_PRODUCTS);
  updateCartCounter();
  updateFooterYear();

  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");

  if (searchInput) searchInput.addEventListener("input", filterProducts);
  if (categorySelect) categorySelect.addEventListener("change", filterProducts);
});