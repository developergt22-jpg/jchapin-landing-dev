export type ScreenshotId =
  | '01-inicio'
  | '02-explorar'
  | '03-mapa'
  | '04-detalle'
  | '05-ticket-qr'
  | '06-agenda'
  | '07-notificaciones'
  | '08-crear-evento'
  | '09-mis-eventos'
  | '10-aprobaciones'
  | '11-escaner'
  | '12-reportes';

export interface Screenshot {
  /** Nombre base del archivo en `public/images/screenshots/` (sin extensión). */
  readonly id: ScreenshotId;
  readonly alt: string;
  readonly caption: string;
}
