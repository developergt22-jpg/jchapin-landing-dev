// Genera la imagen para redes (Open Graph / WhatsApp): public/images/og-image.png (1200×630).
// Uso: node scripts/generate-og.mjs  (después de generate-brand y generate-screenshots)
import sharp from 'sharp';

const W = 1200;
const H = 630;
const FONT = "Poppins, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.7">
      <stop offset="0" stop-color="#006853"/><stop offset="1" stop-color="#004e3d"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="80" cy="640" r="260" fill="#0d658d" opacity="0.35"/>
  <rect x="72" y="182" width="350" height="40" rx="20" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-opacity="0.3"/>
  <circle cx="96" cy="202" r="5" fill="#ffffff"/>
  <text x="112" y="209" font-family="${FONT}" font-size="19" font-weight="500" fill="#ffffff">Beta · Prueba cerrada en Android</text>
  <text font-family="${FONT}" font-weight="700" fill="#ffffff" font-size="62">
    <tspan x="72" y="300">Descubre y vive</tspan>
    <tspan x="72" y="372">los eventos de</tspan>
    <tspan x="72" y="444">Guatemala</tspan>
  </text>
  <text x="72" y="510" font-family="${FONT}" font-size="24" fill="#ffffff" fill-opacity="0.85">Eventos cerca de ti · Tickets con QR · Rutas con tráfico</text>
  <text x="152" y="122" font-family="${FONT}" font-size="40" font-weight="700" fill="#ffffff">JChapín</text>
</svg>`);

const logo = await sharp('public/images/icon-192.png')
  .resize(64, 64)
  .composite([
    {
      input: Buffer.from('<svg width="64" height="64"><rect width="64" height="64" rx="16" fill="#fff"/></svg>'),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

// Teléfono con la captura del inicio
const phoneW = 290;
const screenW = phoneW - 16;
const screenH = Math.round((screenW * 2340) / 1080);
const phoneH = screenH + 16;
const screen = await sharp('public/images/screenshots/01-inicio-540.webp')
  .resize(screenW, screenH)
  .composite([
    {
      input: Buffer.from(`<svg width="${screenW}" height="${screenH}"><rect width="${screenW}" height="${screenH}" rx="28" fill="#fff"/></svg>`),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();
const phone = await sharp(
  Buffer.from(`<svg width="${phoneW}" height="${phoneH}"><rect width="${phoneW}" height="${phoneH}" rx="36" fill="#1d252b"/></svg>`),
)
  .composite([{ input: screen, left: 8, top: 8 }])
  .png()
  .toBuffer();

await sharp(background)
  .composite([
    { input: logo, left: 72, top: 72 },
    { input: phone, left: W - phoneW - 90, top: 60 },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/images/og-image.png');

console.log('og-image.png generado');
