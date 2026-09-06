const allProducts = [
  {
    id: 1,
    name: "Silla Comedor Jota",
    price: 45000,
    category: "Sillas",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80",
    description: "Silla de comedor fabricada en madera maciza de paraíso teñida. Ergonómica, elegante y resistente para el uso diario.",
    specs: {
      material: "Madera Maciza de Paraíso",
      dimensions: "45cm x 50cm x 90cm",
      finish: "Lustre Poliuretánico Semi-mate",
      weight: "6.5 kg"
    }
  },
  {
    id: 2,
    name: "Mesa Roble Macizo",
    price: 180000,
    category: "Mesas",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80",
    description: "Mesa principal de comedor construida enteramente en roble macizo estacionado. Capacidad para 6 u 8 comensales.",
    specs: {
      material: "Roble Macizo",
      dimensions: "180cm x 90cm x 78cm",
      finish: "Aceite Orgánico Protector",
      weight: "42 kg"
    }
  },
  {
    id: 3,
    name: "Sillón Nórdico 2 Cuerpos",
    price: 250000,
    category: "Sillones",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    description: "Sillón de estilo escandinavo tapizado en tela anti-manchas con estructura interna de madera reforzada.",
    specs: {
      material: "Estructura de Guatambú y Tela Pana",
      dimensions: "160cm x 85cm x 80cm",
      finish: "Patas barnizadas al natural",
      weight: "35 kg"
    }
  },
  {
    id: 4,
    name: "Estantería Industrial",
    price: 95000,
    category: "Muebles",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
    description: "Estantería de diseño industrial con estantes de pino enistonado y estructura metálica con pintura al horno.",
    specs: {
      material: "Pino Elliotis y Hierro",
      dimensions: "100cm x 35cm x 180cm",
      finish: "Pintura Epoxi Negra",
      weight: "22 kg"
    }
  },
  {
    id: 5,
    name: "Mesa de Centro Ratona",
    price: 62000,
    category: "Mesas",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80",
    description: "Mesa ratona moderna para sala de estar, elaborada con madera recuperada y acabado artesanal.",
    specs: {
      material: "Madera Reciclada de Paraíso",
      dimensions: "90cm x 50cm x 45cm",
      finish: "Cera de Abejas Natural",
      weight: "12 kg"
    }
  },
  {
    id: 6,
    name: "Silla Ergonomica Madera",
    price: 52000,
    category: "Sillas",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
    description: "Silla individual estilizada ideal para escritorios o ambientes de lectura.",
    specs: {
      material: "Laminado de Cedro",
      dimensions: "48cm x 48cm x 85cm",
      finish: "Laca Transparente",
      weight: "5 kg"
    }
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

const addToCart = (product, quantity) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
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

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
};

const getProductIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
};

const renderProductDetail = () => {
  const container = document.getElementById("product-detail-container");
  const breadcrumbName = document.getElementById("breadcrumb-product-name");
  const productId = getProductIdFromURL();

  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    if (breadcrumbName) breadcrumbName.textContent = "No encontrado";
    container.innerHTML = "<p>El producto no existe. Regresa al <a href='catalog.html'>catálogo</a>.</p>";
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
        <button id="add-to-cart-btn" class="btn btn-primary">Añadir al Carrito 🛒</button>
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

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});