// src/componentes/Cultura.tsx — sección "La esencia de Pasto"
import type { CSSProperties } from 'react';

// La variable CSS --acento-tarjeta no existe en CSSProperties, por eso se amplía el tipo
type EstiloConAcento = CSSProperties & { '--acento-tarjeta': string };

const acento = (color: string): EstiloConAcento => ({ '--acento-tarjeta': color });

export const Cultura = () => (
  <section className="section" id="cultura">
    <div className="container">
      <h2 className="section-title section-title--naranja">La esencia de Pasto</h2>
      <p className="section-intro">
        Tres rasgos que dan identidad a nuestras ferias y eventos: el color del Carnaval, la solidez de nuestra
        arquitectura y la riqueza de nuestros cultivos.
      </p>

      <div className="culture-grid">
        <article className="culture-card" style={acento('var(--carnaval-negro)')}>
          <div className="culture-icon culture-icon--carnaval" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <circle cx="24" cy="24" r="13" fill="#111111" />
              <circle cx="40" cy="24" r="13" fill="#ffffff" stroke="#111111" strokeWidth="2" />
              <circle cx="32" cy="40" r="13" fill="#FFC72C" />
            </svg>
          </div>
          <h3>Carnaval de Negros y Blancos</h3>
          <p>
            Cada 5 y 6 de enero, Pasto se llena de talco, pintura y color para celebrar el encuentro y la
            diversidad. Un patrimonio que inspira la alegría de cada feria del portal.
          </p>
        </article>

        <article className="culture-card" style={acento('var(--carnaval-azul)')}>
          <div className="culture-icon culture-icon--catedral" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <rect x="26" y="24" width="12" height="30" fill="#4F7A5B" />
              <polygon points="26,24 32,12 38,24" fill="#4F7A5B" />
              <rect x="10" y="34" width="8" height="20" fill="#6FA37C" />
              <rect x="46" y="34" width="8" height="20" fill="#6FA37C" />
              <rect x="30" y="6" width="4" height="8" fill="#4F7A5B" />
            </svg>
          </div>
          <h3>Catedrales y arquitectura</h3>
          <p>
            La Catedral de Pasto y templos como el Santuario de Las Lajas reflejan siglos de historia religiosa
            y artesanal, incluido el famoso Barniz de Pasto (mopa-mopa).
          </p>
        </article>

        <article className="culture-card" style={acento('var(--verde-medio)')}>
          <div className="culture-icon culture-icon--cultivo" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <path d="M32 54 V26" stroke="#3E7C3E" strokeWidth="3" fill="none" />
              <ellipse cx="32" cy="18" rx="7" ry="11" fill="#F4C542" />
              <ellipse cx="20" cy="26" rx="7" ry="11" transform="rotate(-30 20 26)" fill="#F4C542" />
              <ellipse cx="44" cy="26" rx="7" ry="11" transform="rotate(30 44 26)" fill="#F4C542" />
            </svg>
          </div>
          <h3>Cultivos y sabores</h3>
          <p>
            Papa, quinua, ulluco y trucha de páramo alimentan las ferias gastronómicas de la región, herencia
            de la vocación agrícola de Nariño.
          </p>
        </article>
      </div>
    </div>
  </section>
);
