// src/componentes/Hero.tsx — banner principal

export const Hero = () => (
  <section className="hero" id="inicio">
    <div className="container hero-inner">
      <div className="hero-text">
        <h1>Vive las ferias y eventos de Pasto</h1>
        <p>
          Fechas, lugares y horarios de la ciudad, en un solo lugar. Carnaval, cultivos y tradición en el
          corazón de Nariño.
        </p>
        <div className="hero-actions">
          <a href="#ferias" className="btn btn-primary">
            Explorar ferias
          </a>
          <a href="#mapa" className="btn btn-outline">
            Ver mapa
          </a>
        </div>
      </div>
    </div>

    {/* Silueta decorativa: Volcán Galeras, catedral y cultivos */}
    <svg className="hero-skyline" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
      {/* Volcán Galeras */}
      <path d="M0,160 L120,55 L175,95 L230,40 L300,160 Z" fill="#ffffff" opacity="0.14" />
      {/* Catedral de Pasto (torres gemelas + cúpula) */}
      <g fill="#ffffff" opacity="0.22">
        <rect x="560" y="70" width="18" height="70" />
        <rect x="660" y="70" width="18" height="70" />
        <polygon points="569,70 569,50 578,40 587,50 587,70" />
        <polygon points="669,70 669,50 678,40 687,50 687,70" />
        <rect x="595" y="45" width="50" height="95" />
        <polygon points="595,45 620,15 645,45" />
        <rect x="616" y="0" width="8" height="18" />
        <rect x="612" y="0" width="16" height="4" />
      </g>
      {/* Surcos de cultivo */}
      <g stroke="#ffffff" strokeWidth="6" opacity="0.16">
        <path d="M780,160 Q860,120 940,160" fill="none" />
        <path d="M860,160 Q940,120 1020,160" fill="none" />
        <path d="M940,160 Q1020,120 1100,160" fill="none" />
        <path d="M1020,160 Q1100,120 1180,160" fill="none" />
      </g>
    </svg>
  </section>
);
