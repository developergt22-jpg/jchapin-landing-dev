// Se ejecuta después de `npm run build`.
// Vercel (y la mayoría de hosts estáticos) sirve `404.html` en la raíz para rutas inexistentes.
import { copyFile } from 'node:fs/promises';

const dist = 'dist/jchapin-landing/browser';

await copyFile(`${dist}/404/index.html`, `${dist}/404.html`);
console.log('404.html generado');
