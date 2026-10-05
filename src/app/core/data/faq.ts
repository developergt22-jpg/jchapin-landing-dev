import { APP } from '../config/app-links';
import type { Faq } from '../models';

export const FAQS: readonly Faq[] = [
  {
    question: '¿Es gratis?',
    answer:
      'Sí. Descargar y usar JChapín no tiene costo. Algunos eventos pueden tener su propio precio de entrada, que define el organizador.',
  },
  {
    question: '¿Necesito una cuenta?',
    answer:
      'Para ver eventos, no. Solo necesitas iniciar sesión, con Google o con tu correo y un código de verificación, para reservar, marcar "Voy", dejar reseñas o publicar eventos.',
  },
  {
    question: '¿Por qué está en beta?',
    answer:
      'JChapín está en prueba cerrada en Google Play. Estamos probando la app con un grupo de usuarios para corregir errores antes de abrirla a todos. Tus comentarios nos ayudan mucho.',
  },
  {
    question: '¿Es seguro instalar el APK?',
    answer:
      'Sí, siempre que lo descargues desde este sitio o desde Google Play. Publicamos la huella SHA-256 de cada archivo para que puedas verificar que no fue modificado. Android te pedirá permitir la instalación desde tu navegador; es un aviso normal para apps fuera de la tienda.',
  },
  {
    question: '¿Cómo actualizo si instalé el APK?',
    answer:
      'Descarga la versión nueva desde la página de descarga e instálala encima; tus datos se conservan. Cuando la app esté pública en Google Play podrás actualizar desde ahí sin desinstalar.',
  },
  {
    question: '¿Hay versión para iPhone?',
    answer: 'Por ahora no. JChapín está disponible solo para Android 7.0 o superior.',
  },
  {
    question: '¿Cómo publico mi evento?',
    answer:
      'Inicia sesión, entra a "Crear evento" y completa los 4 pasos: información, ubicación en el mapa, categoría y tipo, y entradas y portada. Si no requiere revisión, se publica de inmediato.',
  },
  {
    question: '¿Qué hago si mi evento necesita permiso municipal?',
    answer:
      'La app te lo indica al crearlo, según la categoría y el tamaño del evento. La municipalidad revisa la solicitud y puede pedirte documentos en PDF desde la misma app. Recibirás una notificación cuando lo aprueben o rechacen.',
  },
  {
    question: '¿Cómo elimino mi cuenta?',
    answer: `Puedes pedir la eliminación de tu cuenta y tus datos escribiendo a ${APP.contactEmail}. En la página "Eliminar cuenta" explicamos el proceso y qué datos se borran.`,
  },
];
