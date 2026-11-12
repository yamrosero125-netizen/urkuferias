// src/componentes/Encabezado.tsx — barra superior, navegación y cinta del Carnaval

const enlaces = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#ferias', texto: 'Ferias' },
  { href: '#cultura', texto: 'Identidad' },
  { href: '#productos', texto: 'Artesanías' },
  { href: '#eventos', texto: 'Eventos' },
  { href: '#contacto', texto: 'Contacto' },
];

export const Encabezado = () => {
  // El botón "Aa" lleva directamente a la barra de accesibilidad
  const irAAccesibilidad = () => {
    document.getElementById('accesibilidad')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="logo">
          <span className="logo-badge">UM</span>
          <span className="logo-text">Urkuferias</span>
        </a>

        <nav className="main-nav" aria-label="Navegación principal">
          <ul>
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a href={enlace.href}>{enlace.texto}</a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="accessibility-toggle"
          aria-label="Abrir opciones de accesibilidad"
          onClick={irAAccesibilidad}
        >
          Aa
        </button>
      </div>

      {/* Cinta decorativa: Carnaval de Negros y Blancos */}
      <div
        className="carnival-ribbon"
        role="note"
        aria-label="Carnaval de Negros y Blancos, Patrimonio de la Humanidad"
      >
        <span className="carnival-ribbon-text">
          ✦ Carnaval de Negros y Blancos — Patrimonio Cultural Inmaterial de la Humanidad (UNESCO) ✦
        </span>
      </div>
    </header>
  );
};
