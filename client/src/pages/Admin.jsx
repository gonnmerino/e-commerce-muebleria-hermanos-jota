import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { deleteProduct } from '../services/api';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { products, setProducts, loading, error } = useProducts();

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="status-message">Cargando productos…</p>;
  if (error)
    return <p className="status-message error">Error al cargar: {error}</p>;

  return (
    <section className="admin">
      <h2>Administrar productos</h2>
      <Link className="btn-primary" to="/admin/crear-producto">
        Crear producto
      </Link>

      {products.map((product) => (
        <div key={product._id} className="cart-item">
          <div className="cart-item-info">
            <h4>{product.name}</h4>
            <span className="product-category">
              {formatPrice(product.price)}
            </span>
          </div>
          <Link
            className="btn-secondary"
            to={`/admin/editar-producto/${product._id}`}
          >
            Editar
          </Link>
          <button
            className="btn-remove"
            onClick={() => handleDelete(product._id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </section>
  );
}
