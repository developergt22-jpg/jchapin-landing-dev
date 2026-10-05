import { APP } from '../config/app-links';
import type { FlowStep } from '../models';

export interface PlayStep extends FlowStep {
  readonly link?: { readonly label: string; readonly url: string };
}

/** Unirse a la prueba cerrada de Google Play (opción recomendada). */
export const PLAY_STEPS: readonly PlayStep[] = [
  {
    title: 'Únete al grupo de testers',
    description: APP.testersGroupUrl
      ? 'Entra al grupo con la misma cuenta de Google que usas en tu teléfono.'
      : 'Escríbenos desde la cuenta de Google que usas en tu teléfono y te agregamos a la prueba.',
    link: APP.testersGroupUrl
      ? { label: 'Unirme al grupo', url: APP.testersGroupUrl }
      : {
          label: 'Pedir acceso por correo',
          url: `mailto:${APP.contactEmail}?subject=${encodeURIComponent('Quiero probar JChapín')}`,
        },
  },
  {
    title: 'Acepta la invitación',
    description: 'Abre el enlace de la prueba y toca "Convertirse en tester".',
    link: { label: 'Abrir la prueba', url: APP.playTestingUrl },
  },
  {
    title: 'Instala desde Google Play',
    description: 'Ya puedes instalar JChapín desde su ficha en Google Play.',
    link: { label: 'Ir a Google Play', url: APP.playStoreUrl },
  },
];

/** Instalación del APK paso a paso (`/descargar`). */
export const APK_INSTALL_STEPS: readonly FlowStep[] = [
  { title: 'Descarga', description: 'Toca "Descargar APK" desde tu teléfono Android.' },
  {
    title: 'Abre el archivo',
    description: 'Ábrelo desde la notificación de descarga o desde la app Archivos › Descargas.',
  },
  {
    title: 'Permite la instalación',
    description:
      'Si Android lo pide, activa "Permitir de esta fuente" para tu navegador y vuelve atrás.',
  },
  { title: 'Instala y abre', description: 'Toca "Instalar" y luego "Abrir". ¡Listo!' },
  {
    title: 'Para actualizar',
    description:
      'Descarga la versión nueva desde esta página e instálala encima; no pierdes tus datos. Cuando la app sea pública podrás pasarte a Google Play.',
  },
];

export const REQUIREMENTS: readonly string[] = [
  `Android ${APP.requirements.minAndroid} o superior`,
  'Conexión a internet',
  'Servicios de Google Play (para el escáner QR y las notificaciones)',
];
