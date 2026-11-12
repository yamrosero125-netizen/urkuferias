// src/types/index.ts — tipos compartidos por los componentes y los servicios

// Colores de etiqueta disponibles para la fecha de una feria
export type ColorEtiqueta = 'amarillo' | 'rojo' | 'naranja' | 'morado';

// Estados posibles de una feria o evento
export type EstadoFeria = 'Confirmada' | 'Por confirmar' | 'Cancelada';

// Una feria o evento del portal (lo que muestra TarjetaItem)
export interface Feria {
  id: number;
  nombre: string;
  fecha: string; // por ejemplo: "15 SEP"
  lugar: string;
  horario: string;
  estado: EstadoFeria;
  color: ColorEtiqueta;
}

// Datos que captura el formulario antes de crear la feria
export type NuevaFeria = Omit<Feria, 'id' | 'color'>;

// Indicador que se envía al Analista IA: cada feria se resume como
// "metric" (nombre), "value" (cuándo y dónde) y "status" (estado)
export interface Indicator {
  id: number;
  metric: string;
  value: string;
  status: string;
}

// Producto devuelto por la API pública (Fake Store API)
export interface Producto {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}
