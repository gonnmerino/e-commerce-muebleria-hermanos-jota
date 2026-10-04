const fetchFeaturedProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALL_PRODUCTS.filter((p) => p.featured));
    }, 200);
  });
};

const renderFeaturedProducts = async () => {
  const container = document.getElementById("featured-products-container");
  if (!container) return;

  try {
    const list = await fetchFeaturedProducts();
    if (!list || list.length === 0) {
      container.innerHTML = "<p>No hay productos destacados en este momento.</p>";
      return;
    }
    container.innerHTML = list
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
  } catch (error) {
    container.innerHTML = "<p>Error al obtener los productos destacados.</p>";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  updateCartCounter();
  updateFooterYear();
});