import { useState, useEffect } from 'react';
import { fetchProducts } from './services/api';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState('catalog');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((data) => {
        if (isMounted) setProducts(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigate = (target) => {
    setView(target);
    if (target !== 'detail') setSelectedProductId(null);
  };

  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    setView('detail');
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Navbar cartCount={cartCount} onNavigate={handleNavigate} currentView={view} />

      <main className="main-content">
        {view === 'catalog' && (
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onSelect={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}
        {view === 'detail' && (
          <ProductDetail
            productId={selectedProductId}
            onAddToCart={handleAddToCart}
            onBack={() => handleNavigate('catalog')}
          />
        )}
        {view === 'cart' && (
          <Cart
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
            onNavigate={handleNavigate}
          />
        )}
        {view === 'contact' && <ContactForm />}
      </main>

      <Footer />
    </div>
  );
}