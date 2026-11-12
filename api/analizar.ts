// api/analizar.ts — responde en la ruta /api/analizar
import { consultarIA, formatearIndicadores } from './_adaptadores.js';

// Instrucciones para el modelo (adaptadas al portal de ferias y eventos de Pasto)
const INSTRUCCIONES = `Eres un asesor de ferias y eventos de Pasto que apoya a visitantes y organizadores sin formación técnica.
Recibirás la agenda de ferias del portal entre las etiquetas <datos></datos>.
Responde en español y en máximo 4 frases:
1) resume el estado general de la agenda, 2) señala la feria que requiere más atención
(por ejemplo, una cancelada o por confirmar) y 3) sugiere una acción concreta.
Usa SOLO la información de <datos>; si falta algo, dilo con claridad.`;

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Método no permitido' }, { status: 405 });
    }

    // 1. Leer y validar lo que envía el navegador
    let indicadores: any; // any: se valida justo debajo
    try {
      ({ indicadores } = (await request.json()) as { indicadores?: unknown });
    } catch {
      return Response.json({ error: 'El cuerpo debe ser JSON' }, { status: 400 });
    }
    const valido = Array.isArray(indicadores) && indicadores.length > 0 && indicadores.length <= 30;
    if (!valido) {
      return Response.json({ error: 'Envía entre 1 y 30 indicadores' }, { status: 400 });
    }

    // 2. Consultar al proveedor y devolver siempre el mismo formato: { texto }
    try {
      const datos = formatearIndicadores(indicadores);
      const texto = await consultarIA(INSTRUCCIONES, [
        { rol: 'user', contenido: `<datos>\n${datos}\n</datos>` },
      ]);
      return Response.json({ texto });
    } catch (error) {
      // El detalle se ve en la terminal o en los logs de Vercel, NO en el navegador
      console.error(error);
      return Response.json({ error: 'El servicio de IA no respondió' }, { status: 502 });
    }
  },
};
