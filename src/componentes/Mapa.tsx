// src/componentes/Mapa.tsx — mapa interactivo (Leaflet + OpenStreetMap) con las ferias y eventos
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Feria } from '../types/index';
import { buscarUbicacion, ubicacionEnCache } from '../services/ubicaciones';
import type { Coordenadas } from '../services/ubicaciones';

interface MapaProps {
  ferias: Feria[];
}

const CENTRO_PASTO: L.LatLngExpression = [1.2136, -77.2811];
const PAUSA_ENTRE_CONSULTAS_MS = 1100; // la política de Nominatim pide máximo 1 consulta por segundo

const pausa = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));

// Crea el contenido del globo con nodos de texto (nunca con HTML) porque los datos los escribe el usuario
function crearPopup(feria: Feria): HTMLElement {
  const contenedor = document.createElement('div');
  const titulo = document.createElement('strong');
  titulo.textContent = feria.nombre;
  contenedor.appendChild(titulo);
  [`📅 ${feria.fecha}`, `📍 ${feria.lugar}`, `🕒 ${feria.horario}`, `Estado: ${feria.estado}`].forEach((linea) => {
    contenedor.appendChild(document.createElement('br'));
    contenedor.appendChild(document.createTextNode(linea));
  });
  return contenedor;
}

export const Mapa = ({ ferias }: MapaProps) => {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<L.Map | null>(null);
  const marcadoresRef = useRef<L.LayerGroup | null>(null);

  // lugar (en minúsculas) → coordenadas, o null si OpenStreetMap no lo encontró
  const [ubicaciones, setUbicaciones] = useState<Record<string, Coordenadas | null>>({});
  const [buscando, setBuscando] = useState(false);

  // 1. Crear el mapa una sola vez
  useEffect(() => {
    if (!contenedorRef.current) return;

    const mapa = L.map(contenedorRef.current, { scrollWheelZoom: false }).setView(CENTRO_PASTO, 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapa);

    marcadoresRef.current = L.layerGroup().addTo(mapa);
    mapaRef.current = mapa;

    return () => {
      mapa.remove();
      mapaRef.current = null;
      marcadoresRef.current = null;
    };
  }, []);

  // 2. Ubicar los lugares de las ferias (de uno en uno), recordando lo ya consultado
  const lugares = Array.from(new Set(ferias.map((f) => f.lugar.trim().toLowerCase())));
  const lugaresClave = lugares.join('|');

  useEffect(() => {
    const controlador = new AbortController();

    const ubicar = async () => {
      setBuscando(true);
      let consultaHecha = false;

      for (const lugar of lugares) {
        if (controlador.signal.aborted) return;

        const guardado = ubicacionEnCache(lugar);
        if (guardado !== undefined) {
          setUbicaciones((actuales) => ({ ...actuales, [lugar]: guardado }));
          continue;
        }

        if (consultaHecha) await pausa(PAUSA_ENTRE_CONSULTAS_MS);
        if (controlador.signal.aborted) return;

        try {
          const coordenadas = await buscarUbicacion(lugar, controlador.signal);
          consultaHecha = true;
          setUbicaciones((actuales) => ({ ...actuales, [lugar]: coordenadas }));
        } catch (e) {
          if (controlador.signal.aborted) return;
          console.error('No se pudo ubicar "' + lugar + '":', e);
          consultaHecha = true;
          setUbicaciones((actuales) => ({ ...actuales, [lugar]: null }));
        }
      }
      if (!controlador.signal.aborted) setBuscando(false);
    };

    ubicar();
    return () => controlador.abort();
    // lugaresClave resume la lista de lugares: solo se vuelve a ejecutar si cambian
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lugaresClave]);

  // 3. Dibujar un marcador por cada feria ubicada
  useEffect(() => {
    const mapa = mapaRef.current;
    const capa = marcadoresRef.current;
    if (!mapa || !capa) return;

    capa.clearLayers();
    const puntos: L.LatLngExpression[] = [];

    ferias.forEach((feria) => {
      const coordenadas = ubicaciones[feria.lugar.trim().toLowerCase()];
      if (!coordenadas) return;

      const icono = L.divIcon({
        className: 'mapa-marcador-contenedor',
        html: `<span class="mapa-marcador mapa-marcador--${feria.color}"></span>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -14],
      });
      L.marker([coordenadas.lat, coordenadas.lng], { icon: icono, title: feria.nombre, alt: feria.nombre })
        .bindPopup(crearPopup(feria))
        .addTo(capa);
      puntos.push([coordenadas.lat, coordenadas.lng]);
    });

    if (puntos.length > 0) {
      mapa.fitBounds(L.latLngBounds(puntos), { padding: [50, 50], maxZoom: 16 });
    }
  }, [ferias, ubicaciones]);

  const noEncontradas = ferias.filter((f) => ubicaciones[f.lugar.trim().toLowerCase()] === null);
  const lugaresNoEncontrados = Array.from(new Set(noEncontradas.map((f) => f.lugar)));

  return (
    <section className="section section--muted" id="eventos">
      <div className="container">
        <h2 className="section-title section-title--azul">Ubicación de eventos</h2>
        <p className="section-intro">
          Toca un marcador para ver el nombre, la fecha y el horario de cada feria. El color coincide con la
          etiqueta de su tarjeta.
        </p>

        <div className="mapa-caja" id="mapa">
          <div
            ref={contenedorRef}
            className="mapa"
            role="region"
            aria-label="Mapa de Pasto con la ubicación de las ferias y eventos"
          />
        </div>

        <p className="mapa-estado" aria-live="polite">
          {buscando && 'Ubicando las ferias en el mapa…'}
          {!buscando &&
            lugaresNoEncontrados.length > 0 &&
            `No se encontró en el mapa: ${lugaresNoEncontrados.join(', ')}. Prueba escribiendo el lugar de forma más conocida.`}
        </p>
      </div>
    </section>
  );
};
