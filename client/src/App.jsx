import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductFormPage from './pages/ProductFormPage';

export default function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    return () => lenis.destroy();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((item) => item._id !== id)
        : prev.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemove = (id) => handleUpdateQuantity(id, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productos"
            element={<ProductList onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/productos/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/carrito"
            element={
              <Cart
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            }
          />
          <Route path="/contacto" element={<ContactForm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/crear-producto" element={<ProductFormPage />} />
          <Route
            path="/admin/editar-producto/:id"
            element={<ProductFormPage />}
          />
          <Route
            path="*"
            element={<p className="status-message">Página no encontrada.</p>}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
