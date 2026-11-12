// src/componentes/Productos.tsx — catálogo de ejemplo que consume una API pública
import { useEffect, useState } from 'react';
import type { Producto } from '../types/index';
import { obtenerProductos } from '../services/productos';

// Traducciones cortas y color asignado a cada categoría original
// de la API (en inglés), dejando claro que son datos de ejemplo.
const infoCategoria: Record<string, { nombre: string; clase: string }> = {
  jewelery: { nombre: 'Joyería (demo)', clase: 'product-category--morado' },
  "men's clothing": { nombre: 'Ropa de hombre (demo)', clase: 'product-category--naranja' },
  "women's clothing": { nombre: 'Ropa de mujer (demo)', clase: 'product-category--rojo' },
  electronics: { nombre: 'Electrónica (demo)', clase: 'product-category--azul' },
};

// Imágenes propias del proyecto (carpeta public/imagenes-productos), por id de producto
const imagenesPropias: Record<number, string> = {
  1: '/imagenes-productos/producto-1.jpg',
  2: '/imagenes-productos/producto-2.jpg',
  3: '/imagenes-productos/producto-3.jpg',
  4: '/imagenes-productos/producto-4.jpg',
  5: '/imagenes-productos/producto-5.jpg',
  6: '/imagenes-productos/producto-6.jpg',
  7: '/imagenes-productos/producto-7.jpg',
  8: '/imagenes-productos/producto-8.jpg',
};

export const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controlador = new AbortController();

    obtenerProductos(controlador.signal)
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((e) => {
        // Si el componente se desmonta, la petición se cancela y no hay nada que mostrar
        if (controlador.signal.aborted) return;
        console.error('Error al cargar productos desde la API:', e);
        setError(
          'No se pudieron cargar las artesanías en este momento. Verifica tu conexión a internet e intenta recargar la página.',
        );
        setCargando(false);
      });

    return () => controlador.abort();
  }, []);

  return (
    <section className="section" id="productos">
      <div className="container">
        <h2 className="section-title section-title--morado">Catálogo de ejemplo: integración con API pública</h2>
        <p className="section-intro">
          Ejemplo de uso de la{' '}
          <a href="https://fakestoreapi.com" target="_blank" rel="noopener noreferrer">
            Fake Store API
          </a>
          .
        </p>
        <p className="api-disclaimer">
          ⚠️ Importante: los productos, precios e imágenes que ves abajo son <strong>datos de demostración</strong>{' '}
          de la API pública — no representan artesanías reales de Pasto. Se muestran así, tal como los entrega la
          API, para evidenciar el consumo correcto de un servicio externo. Más adelante, esta misma sección
          podría conectarse a un catálogo real de proveedores locales sin cambiar el diseño.
        </p>

        {cargando && <div className="product-status">Cargando catálogo de ejemplo…</div>}
        {error && (
          <div className="product-status is-error" role="alert">
            {error}
          </div>
        )}

        <div className="product-grid" aria-live="polite">
          {productos.map((producto) => {
            const info = infoCategoria[producto.category] ?? { nombre: producto.category, clase: '' };
            const rutaImagen = imagenesPropias[producto.id] ?? producto.image;

            return (
              <article className="product-card" key={producto.id}>
                <div className="product-image">
                  <img src={rutaImagen} alt={producto.title} loading="lazy" />
                </div>
                <div className="product-body">
                  <span className={`product-category ${info.clase}`}>{info.nombre}</span>
                  <p className="product-title">{producto.title}</p>
                  <p className="product-price">
                    ${producto.price.toFixed(2)} <span>USD · dato de ejemplo</span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
