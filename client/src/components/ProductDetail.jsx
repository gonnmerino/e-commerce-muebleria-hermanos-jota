import { useState, useEffect } from 'react';
import { fetchProductById } from '../services/api';

const formatPrice = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

export default function ProductDetail({ productId, onAddToCart, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchProductById(productId)
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setError(null);
        }
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
  }, [productId]);

  if (loading) return <p className="status-message">Cargando producto…</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!product) return null;

  return (
    <section className="product-detail">
      <button className="btn-back" onClick={onBack}>← Volver al catálogo</button>

      <div className="product-detail-content">
        <div className="product-detail-img" aria-label={product.nombre}>
          <span>{product.categoria?.charAt(0)}</span>
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.categoria}</span>
          <h2>{product.nombre}</h2>
          <p className="product-price">{formatPrice(product.precio)}</p>
          <p className="product-description">{product.descripcion}</p>
          <button className="btn-primary" onClick={() => onAddToCart(product)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  );
}