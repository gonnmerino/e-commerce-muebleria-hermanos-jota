import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card-img" aria-label={product.name}>
        <span>{product.category.charAt(0)}</span>
      </div>

      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>

        <div className="product-card-actions">
          <Link className="btn-secondary" to={`/productos/${product._id}`}>
            Ver detalle
          </Link>
          <button className="btn-primary" onClick={() => onAddToCart(product)}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
