import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchProductById(id)
      .then((data) => {
        if (!ignore) setProduct(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <p className="status-message">Cargando producto…</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    <section className="product-detail">
      <Link className="btn-back" to="/productos">
        ← Volver al catálogo
      </Link>

      <div className="product-detail-content">
        <div className="product-detail-img" aria-label={product.name}>
          <span>{product.category.charAt(0)}</span>
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h2>{product.name}</h2>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="product-description">{product.description}</p>
          <button className="btn-primary" onClick={() => onAddToCart(product)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
