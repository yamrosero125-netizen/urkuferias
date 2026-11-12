// src/componentes/PieDePagina.tsx — contacto y derechos

export const PieDePagina = () => (
  <footer className="site-footer" id="contacto">
    <div className="container footer-inner">
      <div>
        <h3>Portal de Ferias de Pasto</h3>
        <p>Contacto: info@feriaspasto.co</p>
        <p>Síguenos en redes sociales</p>
      </div>
      <div className="social-dots" aria-hidden="true">
        <span className="dot dot--yellow"></span>
        <span className="dot dot--red"></span>
        <span className="dot dot--purple"></span>
        <span className="dot dot--blue"></span>
        <span className="dot dot--black"></span>
      </div>
    </div>
    <p className="footer-copy">© 2026 Universidad Mariana — Todos los derechos reservados</p>
  </footer>
);
