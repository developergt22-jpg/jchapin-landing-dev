// Genera logo, favicon e íconos del manifest a partir del ícono de la app.
// Uso: node scripts/generate-brand.mjs
// Fuente: assets-src/icon.png (copia de JChapin_APP_BETA/src/assets/icon/icon.png).
// Cuando exista el logo oficial en SVG, reemplazar assets-src/icon.png y volver a correrlo.
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'assets-src/icon.png';
const OUT = 'public';
const BG = '#fbf7ee'; // fondo crema del ícono original

// Recorte cuadrado del símbolo (quetzal + G), sin la palabra "JChapín".
const MARK = { left: 130, top: 40, width: 690, height: 690 };

const mark = () => sharp(SRC).extract(MARK);

/** Ícono cuadrado con margen interno (útil para maskable y apple-touch). */
async function padded(size, paddingRatio) {
  const inner = Math.round(size * (1 - paddingRatio * 2));
  const symbol = await mark().resize(inner, inner).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: symbol, gravity: 'center' }])
    .png();
}

/** ICO con PNG embebido (soportado por todos los navegadores actuales). */
function pngToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await mkdir(`${OUT}/images`, { recursive: true });

// Logo del header/footer (se muestra a 40 px; 2x para pantallas retina)
await mark().resize(80, 80).webp({ quality: 90 }).toFile(`${OUT}/images/logo-mark.webp`);
await mark().resize(80, 80).png().toFile(`${OUT}/images/logo-mark.png`);
// Logo completo (para JSON-LD Organization y la imagen OG)
await sharp(SRC).resize(512).png().toFile(`${OUT}/images/logo.png`);

// Íconos
await (await padded(180, 0.06)).toFile(`${OUT}/apple-touch-icon.png`);
await mark().resize(192, 192).png().toFile(`${OUT}/images/icon-192.png`);
await mark().resize(512, 512).png().toFile(`${OUT}/images/icon-512.png`);
await (await padded(512, 0.12)).toFile(`${OUT}/images/icon-maskable-512.png`);

const ico = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await mark().resize(size, size).png().toBuffer(),
  })),
);
await writeFile(`${OUT}/favicon.ico`, pngToIco(ico));

console.log('Íconos y logo generados en public/');
