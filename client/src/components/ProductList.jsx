import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';

export default function ProductList({ onAddToCart }) {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="status-message">Cargando productos…</p>;
  if (error)
    return <p className="status-message error">Error al cargar: {error}</p>;
  if (products.length === 0)
    return <p className="status-message">No hay productos disponibles.</p>;

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}
