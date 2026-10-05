import { Bell, CalendarDays, Compass, LogIn, Map, Route, Search, Star, Ticket } from 'lucide';

import type { Feature } from '../models';

export const FEATURES: readonly Feature[] = [
  {
    title: 'Eventos destacados y cerca de ti',
    description:
      'El inicio muestra destacados, populares y los eventos más cercanos a tu ubicación.',
    icon: Compass,
  },
  {
    title: 'Explorar y buscar',
    description:
      'Busca por texto y categoría; también puedes ver eventos que ya pasaron y sus reseñas.',
    icon: Search,
  },
  {
    title: 'Mapa de eventos',
    description: 'Todos los eventos vigentes en un mapa, con su ubicación exacta.',
    icon: Map,
  },
  {
    title: 'Rutas y tráfico',
    description:
      'En el detalle del evento ves cómo llegar en carro con tráfico en tiempo real y rutas alternativas.',
    icon: Route,
  },
  {
    title: 'Tickets con QR',
    description:
      'Reserva en segundos y recibe un ticket con código QR único. Si el evento no usa tickets, marca "Voy".',
    icon: Ticket,
  },
  {
    title: 'Agenda',
    description: 'Tus eventos reservados, ordenados por fecha, siempre a mano.',
    icon: CalendarDays,
  },
  {
    title: 'Notificaciones',
    description:
      'Recordatorios antes del evento, avisos de cambios o cancelaciones, recomendaciones semanales y eventos nuevos cerca de ti.',
    icon: Bell,
  },
  {
    title: 'Reseñas',
    description: 'Califica de 1 a 5 estrellas y comenta después de asistir.',
    icon: Star,
  },
  {
    title: 'Acceso fácil',
    description:
      'Entra con tu cuenta de Google o con tu correo y un código de verificación. Puedes explorar sin cuenta.',
    icon: LogIn,
  },
];
