/**
 * Datos del producto en un solo lugar.
 * Al publicar un APK nuevo o cambiar el package de producción, solo se edita este archivo.
 */

/** Id de **desarrollo**. Si producción usa otro (p. ej. `site.jchapin`), cambiarlo aquí. */
const PACKAGE_ID = 'site.jchapin.dev';

export interface SocialLink {
  readonly name: string;
  readonly url: string;
}

export const APP = {
  name: 'JChapín',
  tagline: 'Eventos de Guatemala',
  packageId: PACKAGE_ID,
  /** Dominio definitivo pendiente; mientras tanto se puede usar el de Vercel. */
  siteUrl: 'https://jchapin.site',
  contactEmail: 'contacto@jchapin.site',

  playStoreUrl: `https://play.google.com/store/apps/details?id=${PACKAGE_ID}`,
  playTestingUrl: `https://play.google.com/apps/testing/${PACKAGE_ID}`,
  /** Google Group o formulario para unirse a la prueba cerrada. Vacío = se pide por correo. */
  testersGroupUrl: '',

  /** Ej.: { name: 'Instagram', url: 'https://instagram.com/jchapin' }. Vacío = no se muestran. */
  socials: [] as readonly SocialLink[],

  apk: {
    /** `false` mientras no exista el archivo en `public/downloads/`. */
    available: false,
    version: '1.0.0',
    url: '/downloads/jchapin-beta-v1.0.0.apk',
    /** Llenar al generar el APK. */
    sizeMb: 0,
    /** `shasum -a 256 jchapin-beta-v1.0.0.apk` */
    sha256: '',
    releasedAt: '2026-10-04',
  },

  requirements: {
    minAndroid: '7.0',
  },
} as const;
