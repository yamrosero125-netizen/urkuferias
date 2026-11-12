// src/componentes/FormularioMetrica.tsx — formulario controlado para agregar una feria o evento
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { EstadoFeria, NuevaFeria } from '../types/index';

interface FormularioMetricaProps {
  onAgregarMetrica: (feria: NuevaFeria) => void;
}

const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
const ESTADOS: EstadoFeria[] = ['Confirmada', 'Por confirmar', 'Cancelada'];

// "2026-09-15" → "15 SEP" (se separa el texto a mano para evitar problemas de zona horaria)
function formatearFecha(fechaISO: string): string {
  const [, mes, dia] = fechaISO.split('-');
  return `${Number(dia)} ${MESES[Number(mes) - 1]}`;
}

// "14:30" → "2:30 p.m."
function formatearHora(hora24: string): string {
  const [h, minutos] = hora24.split(':');
  const hora = Number(h);
  const sufijo = hora >= 12 ? 'p.m.' : 'a.m.';
  const hora12 = hora % 12 === 0 ? 12 : hora % 12;
  return `${hora12}:${minutos} ${sufijo}`;
}

const estadoInicial = {
  nombre: '',
  fecha: '',
  lugar: '',
  inicio: '',
  fin: '',
  estado: 'Confirmada' as EstadoFeria,
};

export const FormularioMetrica = ({ onAgregarMetrica }: FormularioMetricaProps) => {
  const [campos, setCampos] = useState(estadoInicial);
  const [error, setError] = useState<string | null>(null);

  // Un solo manejador para todos los campos: el atributo "name" indica cuál cambió
  const manejarCambio = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!campos.nombre.trim() || !campos.lugar.trim()) {
      setError('Escribe el nombre y el lugar de la feria.');
      return;
    }
    if (!campos.fecha || !campos.inicio || !campos.fin) {
      setError('Indica la fecha y el horario de inicio y de cierre.');
      return;
    }
    if (campos.fin <= campos.inicio) {
      setError('La hora de cierre debe ser posterior a la hora de inicio.');
      return;
    }

    onAgregarMetrica({
      nombre: campos.nombre.trim(),
      fecha: formatearFecha(campos.fecha),
      lugar: campos.lugar.trim(),
      horario: `${formatearHora(campos.inicio)} – ${formatearHora(campos.fin)}`,
      estado: campos.estado,
    });

    setError(null);
    setCampos(estadoInicial);
  };

  return (
    <form className="form-feria" onSubmit={manejarEnvio} noValidate aria-labelledby="titulo-form-feria">
      <h3 id="titulo-form-feria">Agregar una feria o evento</h3>

      <div className="form-feria-grid">
        <div className="form-campo">
          <label htmlFor="feria-nombre">Nombre</label>
          <input
            id="feria-nombre"
            name="nombre"
            type="text"
            maxLength={60}
            value={campos.nombre}
            onChange={manejarCambio}
            placeholder="Ej. Feria de la Trucha"
          />
        </div>

        <div className="form-campo">
          <label htmlFor="feria-lugar">Lugar</label>
          <input
            id="feria-lugar"
            name="lugar"
            type="text"
            maxLength={60}
            value={campos.lugar}
            onChange={manejarCambio}
            placeholder="Ej. Plaza del Carnaval"
          />
        </div>

        <div className="form-campo">
          <label htmlFor="feria-fecha">Fecha</label>
          <input id="feria-fecha" name="fecha" type="date" value={campos.fecha} onChange={manejarCambio} />
        </div>

        <div className="form-campo">
          <label htmlFor="feria-inicio">Hora de inicio</label>
          <input id="feria-inicio" name="inicio" type="time" value={campos.inicio} onChange={manejarCambio} />
        </div>

        <div className="form-campo">
          <label htmlFor="feria-fin">Hora de cierre</label>
          <input id="feria-fin" name="fin" type="time" value={campos.fin} onChange={manejarCambio} />
        </div>

        <div className="form-campo">
          <label htmlFor="feria-estado">Estado</label>
          <select id="feria-estado" name="estado" value={campos.estado} onChange={manejarCambio}>
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-small">
        Agregar feria
      </button>
    </form>
  );
};
