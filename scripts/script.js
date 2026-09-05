const products = [
  {
    id: 1,
    name: "Silla Comedor Jota",
    price: 45000,
    category: "Sillas",
    featured: true,
    image: "https://via.placeholder.com/300x200?text=Silla+Jota"
  },
  {
    id: 2,
    name: "Mesa Roble Macizo",
    price: 180000,
    category: "Mesas",
    featured: true,
    image: "https://via.placeholder.com/300x200?text=Mesa+Roble"
  },
  {
    id: 3,
    name: "Sillón Nórdico 2 Cuerpos",
    price: 250000,
    category: "Sillones",
    featured: true,
    image: "https://via.placeholder.com/300x200?text=Sillon+Nordico"
  },
  {
    id: 4,
    name: "Estantería Industrial",
    price: 95000,
    category: "Muebles",
    featured: true,
    image: "https://via.placeholder.com/300x200?text=Estanteria"
  }
];

const fetchFeaturedProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter(p => p.featured));
    }, 300);
  });
};

const renderFeaturedProducts = async () => {
  const container = document.getElementById("featured-products-container");
  if (!container) return;

  try {
    const featuredList = await fetchFeaturedProducts();
    
    container.innerHTML = featuredList.map(product => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toLocaleString('es-AR')}</p>
          <a href="producto.html?id=${product.id}" class="btn btn-primary">Ver Detalle</a>
        </div>
      </article>
    `).join('');
  } catch (error) {
    container.innerHTML = "<p>Error al cargar los productos destacados.</p>";
  }
};

document.addEventListener("DOMContentLoaded", renderFeaturedProducts);