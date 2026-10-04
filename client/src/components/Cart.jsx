const formatPrice = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

export default function Cart({ items, onUpdateQuantity, onRemove, onNavigate }) {
  if (items.length === 0) {
    return (
      <section className="cart-empty">
        <p>Tu carrito está vacío.</p>
        <button className="btn-primary" onClick={() => onNavigate('catalog')}>
          Ver catálogo
        </button>
      </section>
    );
  }

  const total = items.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  return (
    <section className="cart">
      <h2>Tu carrito</h2>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            <h4>{item.nombre}</h4>
            <span className="product-category">{item.categoria}</span>
          </div>

          <div className="cart-item-controls">
            <button
              onClick={() =>
                item.quantity > 1
                  ? onUpdateQuantity(item.id, item.quantity - 1)
                  : onRemove(item.id)
              }
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>

          <span className="cart-item-subtotal">{formatPrice(item.precio * item.quantity)}</span>
          <button className="btn-remove" onClick={() => onRemove(item.id)}>✕</button>
        </div>
      ))}

      <div className="cart-total">
        <span>Total</span>
        <strong>{formatPrice(total)}</strong>
      </div>
    </section>
  );
}