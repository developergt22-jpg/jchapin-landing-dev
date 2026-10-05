import type { Screenshot, ScreenshotId } from '../models';

/**
 * Capturas en `public/images/screenshots/`: `<id>.webp` (1080×2340) y `<id>-540.webp` (540×1170).
 * Las actuales son maquetas de ejemplo generadas con `node scripts/generate-screenshots.mjs`;
 * reemplazarlas por capturas reales con el mismo nombre.
 */
export const SCREENSHOT_SIZE = { width: 1080, height: 2340 } as const;

export const SCREENSHOTS: readonly Screenshot[] = [
  {
    id: '01-inicio',
    alt: 'Pantalla de inicio de JChapín con eventos destacados y eventos cerca de ti',
    caption: 'Destacados y cerca de ti',
  },
  {
    id: '02-explorar',
    alt: 'Pantalla Explorar con buscador y filtros por categoría',
    caption: 'Busca por texto y categoría',
  },
  {
    id: '03-mapa',
    alt: 'Mapa con la ubicación de los eventos vigentes',
    caption: 'Todos los eventos en el mapa',
  },
  {
    id: '04-detalle',
    alt: 'Detalle de un evento con la ruta en carro y el tiempo estimado con tráfico',
    caption: 'Cómo llegar, con tráfico en vivo',
  },
  {
    id: '05-ticket-qr',
    alt: 'Ticket de un evento con su código QR único',
    caption: 'Tu ticket con código QR',
  },
  {
    id: '06-agenda',
    alt: 'Agenda con los eventos reservados ordenados por fecha',
    caption: 'Tu agenda de eventos',
  },
  {
    id: '07-notificaciones',
    alt: 'Lista de notificaciones con recordatorios y avisos de cambios',
    caption: 'Recordatorios y avisos',
  },
  {
    id: '08-crear-evento',
    alt: 'Formulario para crear un evento, paso de ubicación en el mapa',
    caption: 'Crea tu evento en 4 pasos',
  },
  {
    id: '09-mis-eventos',
    alt: 'Lista de eventos creados por el organizador con su estado',
    caption: 'Administra tus eventos',
  },
  {
    id: '10-aprobaciones',
    alt: 'Bandeja de solicitudes de aprobación de la municipalidad',
    caption: 'Aprobaciones municipales',
  },
  {
    id: '11-escaner',
    alt: 'Escáner de códigos QR para validar entradas',
    caption: 'Validación de entradas',
  },
  {
    id: '12-reportes',
    alt: 'Reportes del organizador con asistentes y reservas',
    caption: 'Reportes y exportación a CSV',
  },
];

export function screenshotById(id: ScreenshotId): Screenshot {
  const shot = SCREENSHOTS.find((s) => s.id === id);
  if (!shot) {
    throw new Error(`Captura no encontrada: ${id}`);
  }
  return shot;
}
