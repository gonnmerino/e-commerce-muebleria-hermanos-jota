const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const statusDiv = document.getElementById("form-status");

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    statusDiv.textContent = "Por favor, completá todos los campos.";
    statusDiv.className = "form-status error";
    return;
  }

  if (!validateEmail(email)) {
    statusDiv.textContent = "Por favor, ingresá un correo electrónico válido.";
    statusDiv.className = "form-status error";
    return;
  }

  statusDiv.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
  statusDiv.className = "form-status success";
  form.reset();

  setTimeout(() => {
    statusDiv.className = "form-status";
    statusDiv.textContent = "";
  }, 4000);
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  updateFooterYear();

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});