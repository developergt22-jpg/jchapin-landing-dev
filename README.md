# JChapín · Landing page

Sitio público de **JChapín**: presenta la app, explica cómo funciona, muestra capturas y ofrece la descarga para Android mientras está en **prueba cerrada**.

- Angular 22 (standalone, signals, zoneless, `@defer`) con **prerender estático** (`outputMode: "static"`): cada ruta se genera como HTML al compilar; no hay servidor Node.
- Tailwind CSS v4 con los tokens de color de la app y fuente Poppins.
- Íconos de [`lucide`](https://lucide.dev) importados uno por uno (`shared/components/icon`).
- Deploy en Vercel (`vercel.json`).

## Comandos

```bash
npm ci              # instalar dependencias (usa el package-lock)
npm start           # desarrollo en http://localhost:4200
npm run build       # build de producción → dist/jchapin-landing/browser (+ 404.html)
npm run preview     # sirve el build estático para probarlo
npm run lint        # ESLint (incluye reglas de accesibilidad en plantillas)
npm test            # pruebas unitarias (Vitest)
npm run assets      # regenera logo/íconos, capturas de ejemplo e imagen OG
```

> Con npm 10 hay un error conocido del resolutor (`Cannot read properties of null (reading 'edgesOut')`) al **agregar** paquetes nuevos. `npm ci` funciona; para instalar algo nuevo usa `npx npm@11 install <paquete>`.

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Home: hero, funciones, cómo funciona, roles, ciclo del evento, capturas, descarga y FAQ |
| `/descargar` | Instrucciones del APK paso a paso |
| `/privacidad` | Política de privacidad |
| `/terminos` | Términos de uso |
| `/eliminar-cuenta` | Cómo pedir la eliminación de la cuenta (exigido por Google Play) |
| `/404` y `**` | Página no encontrada (`noindex`) |

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Package, URLs de Play, correo, redes, datos del APK | `src/app/core/config/app-links.ts` |
| Textos de funciones, pasos, roles, FAQ, capturas | `src/app/core/data/*.ts` |
| Título y descripción de cada página (SEO) | `src/app/app.routes.ts` |
| JSON-LD (SoftwareApplication, Organization, WebSite, FAQPage) | `src/app/core/services/structured-data.ts` |
| Colores y fuente | `src/styles.css` (`@theme`) |
| Textos legales | `src/app/pages/{privacy,terms,delete-account}/` |
| Sitemap y robots | `public/sitemap.xml`, `public/robots.txt` |

## Publicar un APK nuevo

1. En la app: subir `versionCode`/`versionName` y generar el **APK firmado de release** con la misma keystore que Play.
2. Copiarlo a `public/downloads/jchapin-beta-vX.Y.Z.apk` y **borrar el anterior**.
3. Calcular el hash: `shasum -a 256 public/downloads/jchapin-beta-vX.Y.Z.apk`.
4. En `app-links.ts` → `apk`: `available: true`, `version`, `url`, `sizeMb`, `sha256`, `releasedAt`.
5. `npm run build` y commit.

GitHub rechaza archivos de más de 100 MB y cada APK queda para siempre en el historial. Si crece, súbelo a **GitHub Releases** y solo cambia `apk.url`.

## Capturas e imágenes

Las capturas actuales son **maquetas de ejemplo** generadas con `scripts/generate-screenshots.mjs`. Para usar las reales:

1. Tomarlas en el teléfono/emulador con datos de ejemplo (sin datos personales reales).
2. Exportar cada una en WebP a 1080×2340 (`<id>.webp`) y 540×1170 (`<id>-540.webp`) con los nombres de `src/app/core/data/screenshots.ts` (`01-inicio`, `02-explorar`, …).
3. Reemplazarlas en `public/images/screenshots/` y volver a generar la imagen OG: `node scripts/generate-og.mjs`.

El logo y los íconos salen de `assets-src/icon.png` (copia del ícono de la app) con `scripts/generate-brand.mjs`. Al tener el logo oficial, reemplazar ese archivo y correr `npm run assets`.

Las imágenes se cachean 7 días en Vercel; si reemplazas una con el mismo nombre, puede tardar en verse para quien ya la tenía.

## Deploy en Vercel

1. Subir el repo a GitHub (p. ej. `Josvin-technology/jchapin-landing`).
2. En Vercel: *Import Project* → preset **Angular**. `vercel.json` ya define build (`npm run build`) y salida (`dist/jchapin-landing/browser`).
3. Agregar el dominio. Mientras no exista, cambiar `siteUrl` en `app-links.ts`, `robots.txt` y `sitemap.xml` por la URL `*.vercel.app`.
4. Registrar el dominio en Google Search Console y enviar el sitemap.
5. Cargar las URLs de `/privacidad` y `/eliminar-cuenta` en Play Console.

## Pendientes

- [ ] Dominio final (hoy `https://jchapin.site` en `app-links.ts`, `robots.txt` y `sitemap.xml`).
- [ ] Package de producción si cambia de `site.jchapin.dev`.
- [ ] Enlace del Google Group / formulario de testers (`testersGroupUrl`; mientras esté vacío se pide acceso por correo).
- [ ] Correo de contacto real y redes sociales.
- [ ] APK firmado y capturas reales.
- [ ] Logo oficial en SVG.
- [ ] Al salir a producción en Play: cambiar el botón propio de `store-badge` por el badge oficial de Google Play.
