import { Routes } from '@angular/router';

import type { SeoData } from './core/services/seo.service';
import { homeJsonLd } from './core/services/structured-data';

const seo = (data: SeoData) => ({ seo: data });

export const routes: Routes = [
  {
    path: '',
    title: 'JChapín · Descubre y vive los eventos de Guatemala',
    loadComponent: () => import('./pages/home/home'),
    data: seo({
      description:
        'Encuentra eventos cerca de ti en Guatemala, reserva tu entrada con código QR y llega a tiempo con rutas y tráfico en vivo. Beta para Android.',
      jsonLd: homeJsonLd,
    }),
  },
  {
    path: 'descargar',
    title: 'Descargar JChapín APK para Android (beta)',
    loadComponent: () => import('./pages/download/download-page'),
    data: seo({
      description:
        'Descarga el APK oficial de JChapín para Android 7.0+ o únete a la prueba cerrada en Google Play. Instrucciones paso a paso.',
    }),
  },
  {
    path: 'privacidad',
    title: 'Política de privacidad · JChapín',
    loadComponent: () => import('./pages/privacy/privacy'),
    data: seo({
      description: 'Qué datos recopila JChapín, para qué los usa, con quién los comparte y cómo ejercer tus derechos.',
    }),
  },
  {
    path: 'terminos',
    title: 'Términos de uso · JChapín',
    loadComponent: () => import('./pages/terms/terms'),
    data: seo({ description: 'Condiciones para usar JChapín: cuentas, reservas, tickets con QR y publicación de eventos.' }),
  },
  {
    path: 'eliminar-cuenta',
    title: 'Eliminar tu cuenta · JChapín',
    loadComponent: () => import('./pages/delete-account/delete-account'),
    data: seo({
      description: 'Cómo pedir la eliminación de tu cuenta de JChapín y de tus datos, qué se borra y en qué plazo.',
    }),
  },
  {
    // Se prerenderiza como /404 y el postbuild lo copia a 404.html (lo sirve Vercel).
    path: '404',
    title: 'Página no encontrada · JChapín',
    loadComponent: () => import('./pages/not-found/not-found'),
    data: seo({ description: 'La página que buscas no existe.', noindex: true }),
  },
  {
    path: '**',
    title: 'Página no encontrada · JChapín',
    loadComponent: () => import('./pages/not-found/not-found'),
    data: seo({ description: 'La página que buscas no existe.', noindex: true }),
  },
];
