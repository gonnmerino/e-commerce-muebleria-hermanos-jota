const products = [
  {
    id: 1,
    name: "Silla Comedor Jota",
    price: 45000,
    category: "Sillas",
    featured: true,
    image: "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?q=80&w=378&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Mesa Roble Macizo",
    price: 180000,
    category: "Mesas",
    featured: true,
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Sillón Nórdico 2 Cuerpos",
    price: 250000,
    category: "Sillones",
    featured: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Estantería Industrial",
    price: 95000,
    category: "Muebles",
    featured: true,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80"
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

const fetchFeaturedProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter((p) => p.featured));
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

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});