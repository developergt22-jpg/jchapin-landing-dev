import { CalendarPlus, Landmark, ScanLine, UserRound } from 'lucide';

import type { RoleCard } from '../models';

export const ROLES: readonly RoleCard[] = [
  {
    id: 'asistente',
    title: 'Asistente',
    summary: 'Para quien quiere salir y encontrar qué hacer.',
    icon: UserRound,
    bullets: [
      'Descubre eventos cerca de ti o en el mapa.',
      'Reserva tu entrada con QR en segundos.',
      'Lleva tu agenda de eventos ordenada por fecha.',
      'Califica y comenta después de asistir.',
    ],
    screenshot: '05-ticket-qr',
  },
  {
    id: 'organizador',
    title: 'Organizador',
    summary: 'Para quien crea y administra eventos.',
    icon: CalendarPlus,
    bullets: [
      'Crea tu evento en 4 pasos: información, ubicación en el mapa, categoría y tipo, entradas y portada.',
      'Reprograma o cancela con aviso automático a los asistentes.',
      'Asigna staff para validar las entradas.',
      'Consulta reportes y expórtalos a CSV.',
    ],
    screenshot: '08-crear-evento',
  },
  {
    id: 'municipalidad',
    title: 'Municipalidad',
    summary: 'Para quien aprueba los eventos que lo necesitan.',
    icon: Landmark,
    bullets: [
      'Bandeja con las solicitudes pendientes.',
      'Pide documentos en PDF al organizador.',
      'Aprueba o rechaza con un comentario.',
    ],
    screenshot: '10-aprobaciones',
  },
  {
    id: 'staff',
    title: 'Staff',
    summary: 'Para quien recibe a los asistentes en la puerta.',
    icon: ScanLine,
    bullets: [
      'Escanea los QR en la entrada del evento asignado.',
      'Ve al instante si el ticket es válido o ya se usó.',
    ],
    screenshot: '11-escaner',
  },
];
