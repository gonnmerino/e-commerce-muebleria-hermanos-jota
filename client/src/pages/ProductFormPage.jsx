import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProductById,
  createProduct,
  updateProduct,
} from '../services/api';

const INITIAL_STATE = {
  name: '',
  price: '',
  category: '',
  image: '',
  description: '',
  stock: 0,
};

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetchProductById(id)
      .then(({ name, price, category, image, description = '', stock = 0 }) =>
        setForm({ name, price, category, image, description, stock }),
      )
      .catch((err) => setError(err.message));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await (id ? updateProduct(id, form) : createProduct(form));
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="contact">
      <h2>{id ? 'Editar producto' : 'Crear producto'}</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="price"
            min="0"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoría
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen (URL)
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descripción
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            name="stock"
            min="0"
            value={form.stock}
            onChange={handleChange}
          />
        </label>

        {error && <p className="status-message error">{error}</p>}

        <button type="submit" className="btn-primary">
          {id ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </form>
    </section>
  );
}
