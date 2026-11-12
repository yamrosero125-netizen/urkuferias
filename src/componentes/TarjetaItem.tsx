// src/componentes/TarjetaItem.tsx — tarjeta de una feria o evento
import type { Feria } from '../types/index';
import styles from './TarjetaItem.module.css';

interface TarjetaItemProps {
  feria: Feria;
}

export const TarjetaItem = ({ feria }: TarjetaItemProps) => (
  <article className={styles.tarjeta}>
    <div className={styles.imagen}>
      <span className={`${styles.etiqueta} ${styles[feria.color]}`}>{feria.fecha}</span>
      <span className={styles.placeholder}>Imagen del evento</span>
    </div>
    <div className={styles.cuerpo}>
      <h3>{feria.nombre}</h3>
      <p className={styles.meta}>📍 {feria.lugar}</p>
      <p className={styles.meta}>🕒 {feria.horario}</p>
      <p className={styles.meta}>Estado: {feria.estado}</p>
      <a href="#" className="btn btn-small">
        Ver más
      </a>
    </div>
  </article>
);
