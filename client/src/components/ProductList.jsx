import ProductCard from './ProductCard';

export default function ProductList({ products, loading, error, onSelect, onAddToCart }) {
  if (loading) return <p className="status-message">Cargando productos…</p>;
  if (error) return <p className="status-message error">Error al cargar: {error}</p>;
  if (products.length === 0) return <p className="status-message">No hay productos disponibles.</p>;

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}