const catalog = [
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
const content = catalog
  .map(
    (product) => `
  <div class="product-card">
    <h2>${product.name}</h2>
    <h3>${product.description}</h3>
    <p class="price" data-id="${product.id}">${product.price}</p>
  </div>
  `,
  )
  .join("");

container.addEventListener("click", (event) => {
  const price = event.target.closest(".price");
  if (price) {
    const productId = price.dataset.id;
    const productSelected = catalog.find((p) => p.id == productId);
    alert(`Esto es una prueba ${productSelected.name}`);
  }
});

const currentYear = new Date().getFullYear();

const footer = document.getElementById("footer");
footer.innerHTML = `
&copy; ${currentYear} All Rights Reserved
`;
container.innerHTML = content;


searchInput = document.getElementById('search-input')

