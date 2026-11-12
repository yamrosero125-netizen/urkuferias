// src/services/productos.ts — consume la Fake Store API (https://fakestoreapi.com)
// a modo de catálogo de ejemplo para representar productos artesanales y textiles.
import type { Producto } from '../types/index';

export async function obtenerProductos(signal?: AbortSignal): Promise<Producto[]> {
  const respuesta = await fetch('https://fakestoreapi.com/products?limit=8', { signal });

  // fetch NO lanza error con 4xx o 5xx: hay que revisar respuesta.ok
  if (!respuesta.ok) {
    throw new Error('La API respondió con un error: ' + respuesta.status);
  }

  const productos: unknown = await respuesta.json();

  if (!Array.isArray(productos) || productos.length === 0) {
    throw new Error('La API no devolvió productos.');
  }

  return productos as Producto[];
}
