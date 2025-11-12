
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Diseño artesanal. Estilo moderno.</h1>
        <p>Descubre muebles de autor que definen tu espacio.</p>
        <Link to="/productos" className="btn btn-primary">Ver Catálogo Completo</Link>
      </div>
    </section>
  );
}

export default Hero;