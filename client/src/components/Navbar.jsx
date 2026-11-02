import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <Link className="navbar-brand" to="/">
        Mueblería Hermanos Jota
      </Link>

      <nav className="navbar-links">
        <NavLink to="/productos">Catálogo</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/carrito">
          Carrito{' '}
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
      </nav>
    </header>
  );
}
