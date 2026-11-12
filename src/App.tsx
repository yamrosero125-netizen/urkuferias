// src/App.tsx — portal Urkuferias: ferias y eventos de Pasto
import { useEffect, useState } from 'react';
import type { ColorEtiqueta, Feria, Indicator, NuevaFeria } from './types/index';
import { Encabezado } from './componentes/Encabezado';
import { Hero } from './componentes/Hero';
import { Cultura } from './componentes/Cultura';
import { TarjetaItem } from './componentes/TarjetaItem';
import { FormularioMetrica } from './componentes/FormularioMetrica';
import { PanelIA } from './componentes/PanelIA';
import { Productos } from './componentes/Productos';
import { Mapa } from './componentes/Mapa';
import { BarraAccesibilidad } from './componentes/BarraAccesibilidad';
import { PieDePagina } from './componentes/PieDePagina';
import './App.css';

const COLORES: ColorEtiqueta[] = ['amarillo', 'rojo', 'naranja', 'morado'];

const feriasIniciales: Feria[] = [
  {
    id: 1,
    nombre: 'Feria Artesanal',
    fecha: '15 SEP',
    lugar: 'Plaza de Nariño',
    horario: '9:00 a.m. – 6:00 p.m.',
    estado: 'Confirmada',
    color: 'amarillo',
  },
  {
    id: 2,
    nombre: 'Festival Gastronómico',
    fecha: '22 SEP',
    lugar: 'Parque Bolívar',
    horario: '11:00 a.m. – 8:00 p.m.',
    estado: 'Confirmada',
    color: 'rojo',
  },
  {
    id: 3,
    nombre: 'Desfile Cultural',
    fecha: '30 SEP',
    lugar: 'Av. de los Estudiantes',
    horario: '3:00 p.m. – 7:00 p.m.',
    estado: 'Confirmada',
    color: 'amarillo',
  },
];

function App() {
  const [ferias, setFerias] = useState<Feria[]>(feriasIniciales);
  const [textoGrande, setTextoGrande] = useState(false);

  // Cada feria se resume como un indicador para el Analista IA
  const indicators: Indicator[] = ferias.map((f) => ({
    id: f.id,
    metric: f.nombre,
    value: `${f.fecha} · ${f.lugar} · ${f.horario}`,
    status: f.estado,
  }));

  // Callback del formulario controlado: agrega la nueva feria a la lista
  const agregarIndicador = (nueva: NuevaFeria) => {
    setFerias((actuales) => [
      ...actuales,
      {
        ...nueva,
        id: Math.max(0, ...actuales.map((f) => f.id)) + 1,
        color: COLORES[actuales.length % COLORES.length],
      },
    ]);
  };

  // El modo de texto grande se aplica con una clase sobre el <body>
  useEffect(() => {
    document.body.classList.toggle('texto-grande', textoGrande);
  }, [textoGrande]);

  return (
    <>
      <Encabezado />
      <Hero />
      <Cultura />

      {/* Ferias y eventos destacados */}
      <section className="section section--muted" id="ferias">
        <div className="container">
          <h2 className="section-title section-title--amarillo">Ferias y eventos destacados</h2>

          <div className="card-grid">
            {ferias.map((feria) => (
              <TarjetaItem key={feria.id} feria={feria} />
            ))}
          </div>

          {/* Formulario Controlado (Tema 3) */}
          <FormularioMetrica onAgregarMetrica={agregarIndicador} />

          {/* Unidad 3 · Tema 2: análisis con IA de los indicadores actuales */}
          <PanelIA indicadores={indicators} />
        </div>
      </section>

      <Productos />
      <Mapa ferias={ferias} />
      <BarraAccesibilidad textoGrande={textoGrande} onCambiarTexto={setTextoGrande} />
      <PieDePagina />
    </>
  );
}

export default App;
