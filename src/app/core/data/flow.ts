import {
  BellRing,
  CalendarCheck,
  ClipboardCheck,
  DoorOpen,
  Eye,
  Megaphone,
  MessageSquareText,
  PencilLine,
  RefreshCw,
  ScanLine,
  Search,
  Ticket,
  TicketCheck,
} from 'lucide';

import type { FlowStep } from '../models';

/** Cómo funciona para el asistente (`#como-funciona`). */
export const ATTENDEE_STEPS: readonly FlowStep[] = [
  {
    title: 'Descubre',
    description: 'Abre la app y mira los eventos. No necesitas cuenta para explorar.',
    icon: Search,
  },
  {
    title: 'Elige',
    description: 'Revisa el detalle, el organizador, quién va, las reseñas y cómo llegar.',
    icon: Eye,
  },
  {
    title: 'Reserva',
    description: 'Inicia sesión y obtén tu ticket con QR, o marca "Voy" si el evento no usa tickets.',
    icon: Ticket,
  },
  {
    title: 'Recibe avisos',
    description: 'Te recordamos 24 horas antes y te avisamos si el evento cambia.',
    icon: BellRing,
  },
  {
    title: 'Entra',
    description: 'Muestra tu QR en la puerta y el staff lo escanea.',
    icon: DoorOpen,
  },
  {
    title: 'Opina',
    description: 'Deja tu reseña y ayuda a otros a elegir.',
    icon: MessageSquareText,
  },
];

/** Ciclo de vida de un evento (`#flujo`). */
export const EVENT_LIFECYCLE: readonly FlowStep[] = [
  {
    title: 'Creación',
    description: 'El organizador llena el formulario y ubica el evento en el mapa.',
    icon: PencilLine,
  },
  {
    title: 'Revisión',
    description:
      'Si el evento lo requiere, por su categoría o su tamaño, la municipalidad lo revisa y puede pedir documentos.',
    icon: ClipboardCheck,
  },
  {
    title: 'Publicación',
    description: 'El evento aparece en el inicio, en explorar y en el mapa.',
    icon: Megaphone,
  },
  {
    title: 'Reservas',
    description: 'Los usuarios reservan su ticket con QR o marcan "Voy".',
    icon: TicketCheck,
  },
  {
    title: 'Cambios',
    description: 'Si se reprograma o se cancela, todos los asistentes reciben una notificación.',
    icon: RefreshCw,
  },
  {
    title: 'Día del evento',
    description: 'El staff valida los códigos QR en la entrada.',
    icon: ScanLine,
  },
  {
    title: 'Cierre',
    description:
      'El evento se completa, los asistentes dejan reseñas y el organizador revisa sus reportes.',
    icon: CalendarCheck,
  },
];
