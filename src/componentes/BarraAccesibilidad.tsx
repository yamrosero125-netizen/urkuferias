// src/componentes/BarraAccesibilidad.tsx — control del tamaño de texto

interface BarraAccesibilidadProps {
  textoGrande: boolean;
  onCambiarTexto: (grande: boolean) => void;
}

export const BarraAccesibilidad = ({ textoGrande, onCambiarTexto }: BarraAccesibilidadProps) => (
  <section className="accessibility-bar" id="accesibilidad">
    <div className="container accessibility-bar-inner">
      <span className="accessibility-label">Tamaño de texto:</span>
      <button
        type="button"
        className={`text-size-btn${!textoGrande ? ' text-size-btn--active' : ''}`}
        aria-label="Disminuir tamaño de texto"
        aria-pressed={!textoGrande}
        onClick={() => onCambiarTexto(false)}
      >
        A-
      </button>
      <button
        type="button"
        className={`text-size-btn${textoGrande ? ' text-size-btn--active' : ''}`}
        aria-label="Aumentar tamaño de texto"
        aria-pressed={textoGrande}
        onClick={() => onCambiarTexto(true)}
      >
        A+
      </button>
      <span className="accessibility-note">Interfaz optimizada para adultos mayores y bajo acceso a las TIC</span>
    </div>
  </section>
);
