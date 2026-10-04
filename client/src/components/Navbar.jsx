export default function Navbar({ cartCount, onNavigate, currentView }) {
  return (
    <header className="navbar">
      <span className="navbar-brand" onClick={() => onNavigate('catalog')}>
        Mueblería Hermanos Jota
      </span>

      <nav className="navbar-links">
        <button
          className={currentView === 'catalog' ? 'active' : ''}
          onClick={() => onNavigate('catalog')}
        >
          Catálogo
        </button>
        <button
          className={currentView === 'contact' ? 'active' : ''}
          onClick={() => onNavigate('contact')}
        >
          Contacto
        </button>
        <button
          className={currentView === 'cart' ? 'active' : ''}
          onClick={() => onNavigate('cart')}
        >
          Carrito {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  );
}