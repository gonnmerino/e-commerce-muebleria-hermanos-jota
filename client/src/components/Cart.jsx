import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function Cart({ items, onUpdateQuantity, onRemove }) {
  if (items.length === 0) {
    return (
      <section className="cart-empty">
        <p>Tu carrito está vacío.</p>
        <Link className="btn-primary" to="/productos">
          Ver catálogo
        </Link>
      </section>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="cart">
      <h2>Tu carrito</h2>

      {items.map((item) => (
        <div key={item._id} className="cart-item">
          <div className="cart-item-info">
            <h4>{item.name}</h4>
            <span className="product-category">{item.category}</span>
          </div>

          <div className="cart-item-controls">
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <span className="cart-item-subtotal">
            {formatPrice(item.price * item.quantity)}
          </span>
          <button className="btn-remove" onClick={() => onRemove(item._id)}>
            ✕
          </button>
        </div>
      ))}

      <div className="cart-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>
    </section>
  );
}
