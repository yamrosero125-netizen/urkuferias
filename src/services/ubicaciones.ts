// src/services/ubicaciones.ts — busca en OpenStreetMap (Nominatim) dónde queda un lugar de Pasto.
// Es un servicio público y gratuito que no requiere clave. Su política de uso pide como
// máximo 1 petición por segundo, por eso Mapa.tsx consulta los lugares de uno en uno.

export interface Coordenadas {
  lat: number;
  lng: number;
}

// Pasto, Nariño: caja de búsqueda (oeste, norte, este, sur) para no confundir lugares de otras ciudades
const CAJA_PASTO = '-77.35,1.27,-77.20,1.15';
const CLAVE_CACHE = 'urkuferias:ubicaciones:v1';

function leerCache(): Record<string, Coordenadas | null> {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CACHE) ?? '{}');
  } catch {
    return {}; // sin almacenamiento disponible: simplemente no hay caché
  }
}

function guardarCache(cache: Record<string, Coordenadas | null>) {
  try {
    localStorage.setItem(CLAVE_CACHE, JSON.stringify(cache));
  } catch {
    /* sin almacenamiento: se ignora */
  }
}

// Devuelve lo ya consultado antes (undefined = nunca consultado, null = consultado y no encontrado)
export function ubicacionEnCache(lugar: string): Coordenadas | null | undefined {
  return leerCache()[lugar.toLowerCase()];
}

export async function buscarUbicacion(lugar: string, signal?: AbortSignal): Promise<Coordenadas | null> {
  const clave = lugar.toLowerCase();
  const enCache = leerCache()[clave];
  if (enCache !== undefined) return enCache;

  const url =
    'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=es' +
    `&viewbox=${CAJA_PASTO}&bounded=1&q=${encodeURIComponent(`${lugar}, Pasto`)}`;

  const respuesta = await fetch(url, { signal });
  // fetch NO lanza error con 4xx o 5xx: hay que revisar respuesta.ok
  if (!respuesta.ok) throw new Error('Nominatim respondió ' + respuesta.status);

  const resultados: unknown = await respuesta.json();
  const primero = Array.isArray(resultados) ? resultados[0] : undefined;
  const coordenadas =
    primero && !Number.isNaN(Number(primero.lat)) && !Number.isNaN(Number(primero.lon))
      ? { lat: Number(primero.lat), lng: Number(primero.lon) }
      : null;

  // Se recuerda también el "no encontrado" para no repetir la consulta
  guardarCache({ ...leerCache(), [clave]: coordenadas });
  return coordenadas;
}
