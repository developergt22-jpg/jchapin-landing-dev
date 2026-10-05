import { APP } from '../config/app-links';
import { FAQS } from '../data/faq';
import { SCREENSHOTS } from '../data/screenshots';

type JsonLd = Record<string, unknown>;

const abs = (path: string) => new URL(path, APP.siteUrl).toString();

const organization: JsonLd = {
  '@type': 'Organization',
  '@id': abs('/#organizacion'),
  name: APP.name,
  url: APP.siteUrl,
  logo: abs('/images/logo.png'),
  email: APP.contactEmail,
  ...(APP.socials.length ? { sameAs: APP.socials.map((s) => s.url) } : {}),
};

/** Home: app, organización, sitio y preguntas frecuentes. Sin `aggregateRating` hasta tener reseñas reales. */
export function homeJsonLd(): JsonLd[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: APP.name,
      description:
        'Descubre eventos en Guatemala, reserva tu entrada con código QR y llega a tiempo con rutas y tráfico en vivo.',
      operatingSystem: `Android ${APP.requirements.minAndroid}+`,
      applicationCategory: 'LifestyleApplication',
      inLanguage: 'es-GT',
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'GTQ' },
      downloadUrl: APP.apk.available ? abs(APP.apk.url) : APP.playStoreUrl,
      softwareVersion: APP.apk.version,
      screenshot: SCREENSHOTS.slice(0, 6).map((s) => abs(`/images/screenshots/${s.id}.webp`)),
      publisher: { '@id': organization['@id'] },
    },
    { '@context': 'https://schema.org', ...organization },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: APP.name,
      url: APP.siteUrl,
      inLanguage: 'es-GT',
      publisher: { '@id': organization['@id'] },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];
}
