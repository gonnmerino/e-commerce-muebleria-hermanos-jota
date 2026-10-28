const formatPrice = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

export default function ProductCard({ product, onSelect, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card-img" aria-label={product.nombre}>
        <span>{product.categoria.charAt(0)}</span>
      </div>
      <div className="product-card-body">
        <span className="product-category">{product.categoria}</span>
        <h3>{product.nombre}</h3>
        <p className="product-price">{formatPrice(product.precio)}</p>
        <div className="product-card-actions">
          <button className="btn-secondary" onClick={() => onSelect(product.id)}>
            Ver detalle
          </button>
          <button className="btn-primary" onClick={() => onAddToCart(product)}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}