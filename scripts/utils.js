const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
};

const updateCartCounter = () => {
  const counter = document.getElementById("cart-counter");
  if (!counter) return;
  const cart = getCart();
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

const updateFooterYear = () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
};