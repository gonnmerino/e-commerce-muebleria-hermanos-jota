document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const feedbackContainer = document.getElementById('form-feedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('btn-submit');
    const originalText = submitBtn.innerText;

    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    try {
      await simulateFormSubmission(formData);

      showFeedback('¡Gracias por tu mensaje! Te responderemos a la brevedad.', 'success');
      contactForm.reset();
    } catch (error) {
      showFeedback('Ocurrió un error al enviar el mensaje. Intentá nuevamente.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = originalText;
    }
  });

  function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.name && data.email && data.message) {
          resolve({ status: 200, message: 'Message sent successfully' });
        } else {
          reject(new Error('Invalid form data'));
        }
      }, 1000);
    });
  }

  function showFeedback(message, type) {
    feedbackContainer.innerHTML = '';
    
    const toast = document.createElement('div');
    toast.className = 'cart-feedback';
    toast.style.backgroundColor = type === 'success' ? '#8c5a3c' : '#c0392b';
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
});