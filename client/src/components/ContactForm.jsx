import { useState } from 'react';

const INITIAL_STATE = { nombre: '', email: '', mensaje: '' };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      return;
    }

    setSent(true);
    setForm(INITIAL_STATE);
  };

  if (sent) {
    return (
      <section className="contact-success">
        <p>Mensaje enviado. Te responderemos a la brevedad.</p>
        <button className="btn-secondary" onClick={() => setSent(false)}>
          Enviar otro mensaje
        </button>
      </section>
    );
  }

  return (
    <section className="contact">
      <h2>Contactanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Mensaje
          <textarea name="mensaje" rows="5" value={form.mensaje} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn-primary">Enviar</button>
      </form>
    </section>
  );
}