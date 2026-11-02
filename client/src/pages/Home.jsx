import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="home">
      <h1>Mueblería Hermanos Jota</h1>
      <p>Muebles de calidad, hechos para durar.</p>
      <Link className="btn-primary" to="/productos">
        Ver catálogo
      </Link>
    </section>
  );
}
