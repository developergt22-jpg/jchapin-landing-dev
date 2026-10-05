// Genera capturas de EJEMPLO (maquetas) de la app para la landing.
// Uso: node scripts/generate-screenshots.mjs
// Salida: public/images/screenshots/<id>.webp (1080×2340) y <id>-540.webp (540×1170).
// Reemplazar por capturas reales con el mismo nombre de archivo cuando existan.
import { mkdir } from 'node:fs/promises';
import * as lucide from 'lucide';
import sharp from 'sharp';

const OUT = 'public/images/screenshots';
const W = 360;
const H = 780;

const C = {
  primary: '#004e3d',
  primaryContainer: '#006853',
  secondary: '#0d658d',
  secondaryContainer: '#8dd1fe',
  tertiary: '#5e3e00',
  tertiaryContainer: '#7d5300',
  surface: '#f6faff',
  surfaceDim: '#d3dbe3',
  neutral: '#1d252b',
  muted: '#5b6670',
  white: '#ffffff',
  error: '#ba1a1a',
  amber: '#f2b33d',
};

const FONT = "Poppins, 'Helvetica Neue', Helvetica, Arial, sans-serif";

// ---------- utilidades SVG ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function text(x, y, str, { size = 12, weight = 400, fill = C.neutral, anchor = 'start', opacity = 1 } = {}) {
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" opacity="${opacity}">${esc(str)}</text>`;
}

function rect(x, y, w, h, { r = 0, fill = C.white, stroke, sw = 1, opacity = 1 } = {}) {
  const s = stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${s} opacity="${opacity}"/>`;
}

function icon(name, x, y, size = 20, color = C.neutral, sw = 2) {
  const node = lucide[name];
  if (!node) throw new Error(`Ícono lucide inexistente: ${name}`);
  const inner = node
    .map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`)
    .join('');
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
}

function chip(x, y, label, { active = false, fill, color, w } = {}) {
  const width = w ?? label.length * 6.4 + 24;
  const bg = fill ?? (active ? C.primary : C.white);
  const fg = color ?? (active ? C.white : C.neutral);
  return (
    rect(x, y, width, 28, { r: 14, fill: bg, stroke: active || fill ? undefined : C.surfaceDim }) +
    text(x + width / 2, y + 18, label, { size: 11, weight: 500, fill: fg, anchor: 'middle' })
  );
}

let gradId = 0;
/** "Foto" de portada: degradado con volcanes, sol y siluetas. */
function cover(x, y, w, h, [a, b], { r = 14, kind = 'volcano' } = {}) {
  const id = `g${gradId++}`;
  const clip = `c${gradId}`;
  let art = '';
  if (kind === 'volcano') {
    art = `<circle cx="${x + w * 0.72}" cy="${y + h * 0.35}" r="${h * 0.14}" fill="#ffd68a" opacity="0.9"/>
      <path d="M${x} ${y + h} L${x + w * 0.28} ${y + h * 0.42} L${x + w * 0.36} ${y + h * 0.48} L${x + w * 0.62} ${y + h} Z" fill="#000" opacity="0.22"/>
      <path d="M${x + w * 0.35} ${y + h} L${x + w * 0.6} ${y + h * 0.5} L${x + w * 0.95} ${y + h} Z" fill="#000" opacity="0.3"/>`;
  } else if (kind === 'music') {
    art = [0.2, 0.45, 0.7]
      .map((p, i) => `<circle cx="${x + w * p}" cy="${y + h * 0.15}" r="${h * 0.5}" fill="#fff" opacity="${0.06 + i * 0.03}"/>`)
      .join('') +
      `<path d="M${x} ${y + h} Q${x + w * 0.5} ${y + h * 0.55} ${x + w} ${y + h}" fill="#000" opacity="0.25"/>`;
  } else if (kind === 'food') {
    art = `<circle cx="${x + w * 0.5}" cy="${y + h * 0.62}" r="${h * 0.32}" fill="#fff" opacity="0.25"/>
      <circle cx="${x + w * 0.5}" cy="${y + h * 0.62}" r="${h * 0.2}" fill="#fff" opacity="0.25"/>`;
  } else if (kind === 'kites') {
    art = [
      [0.25, 0.35, 0.22],
      [0.6, 0.3, 0.3],
      [0.82, 0.55, 0.16],
    ]
      .map(([px, py, s]) => `<circle cx="${x + w * px}" cy="${y + h * py}" r="${h * s}" fill="none" stroke="#fff" stroke-width="3" opacity="0.55"/>
        <circle cx="${x + w * px}" cy="${y + h * py}" r="${h * s * 0.55}" fill="#fff" opacity="0.18"/>`)
      .join('');
  } else if (kind === 'run') {
    art = `<path d="M${x} ${y + h * 0.75} C${x + w * 0.3} ${y + h * 0.55}, ${x + w * 0.6} ${y + h * 0.95}, ${x + w} ${y + h * 0.7} L${x + w} ${y + h} L${x} ${y + h} Z" fill="#fff" opacity="0.2"/>`;
  }
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath></defs>
    <g clip-path="url(#${clip})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/>${art}</g>`;
}

function statusBar(dark = false) {
  const c = dark ? C.white : C.neutral;
  return (
    text(24, 20, '9:41', { size: 12, weight: 600, fill: c }) +
    icon('Signal', 278, 8, 14, c) +
    icon('Wifi', 296, 8, 14, c) +
    icon('BatteryFull', 316, 7, 18, c)
  );
}

function appBar(title, { back = false, actions = [] } = {}) {
  let s = '';
  let tx = 20;
  if (back) {
    s += icon('ArrowLeft', 16, 44, 22, C.neutral);
    tx = 50;
  }
  s += text(tx, 62, title, { size: 19, weight: 700 });
  actions.forEach((a, i) => {
    s += icon(a, W - 44 - i * 36, 44, 22, C.neutral);
  });
  return s;
}

const NAV = [
  ['House', 'Inicio'],
  ['Compass', 'Explorar'],
  ['Map', 'Mapa'],
  ['CalendarDays', 'Agenda'],
  ['UserRound', 'Perfil'],
];

function bottomNav(active) {
  let s = rect(0, 708, W, 72, { fill: C.white }) + `<line x1="0" y1="708" x2="${W}" y2="708" stroke="${C.surfaceDim}"/>`;
  NAV.forEach(([ic, label], i) => {
    const cx = 36 + i * 72;
    const on = i === active;
    if (on) s += rect(cx - 22, 716, 44, 26, { r: 13, fill: '#d6efe6' });
    s += icon(ic, cx - 10, 719, 20, on ? C.primary : C.muted);
    s += text(cx, 758, label, { size: 10, weight: on ? 600 : 400, fill: on ? C.primary : C.muted, anchor: 'middle' });
  });
  s += rect(W / 2 - 60, 770, 120, 4, { r: 2, fill: C.neutral });
  return s;
}

function searchField(y, placeholder, { value, filter = Boolean(value) } = {}) {
  return (
    rect(20, y, W - 40, 44, { r: 22, fill: C.white, stroke: C.surfaceDim }) +
    icon('Search', 36, y + 12, 20, C.muted) +
    text(66, y + 27, value ?? placeholder, { size: 13, fill: value ? C.neutral : C.muted }) +
    (filter ? icon('SlidersHorizontal', W - 56, y + 12, 20, C.primary) : '')
  );
}

/** Fila de evento compacta: miniatura + título + meta. */
function eventRow(y, { title, meta, sub, colors, kind, badge }) {
  let s = rect(20, y, W - 40, 84, { r: 16, fill: C.white, stroke: '#e3e9ef' });
  s += cover(30, y + 10, 64, 64, colors, { r: 12, kind });
  s += text(106, y + 30, title, { size: 13, weight: 600 });
  s += icon('CalendarDays', 106, y + 40, 13, C.muted);
  s += text(124, y + 51, meta, { size: 11, fill: C.muted });
  s += icon('MapPin', 106, y + 58, 13, C.muted);
  s += text(124, y + 69, sub, { size: 11, fill: C.muted });
  if (badge) s += chip(W - 30 - (badge.length * 6 + 18), y + 12, badge, { fill: '#d6efe6', color: C.primary, w: badge.length * 6 + 18 });
  return s;
}

function button(x, y, w, label, { variant = 'primary', h = 48, ic } = {}) {
  const fill = variant === 'primary' ? C.primary : variant === 'danger' ? '#fde8e8' : C.white;
  const color = variant === 'primary' ? C.white : variant === 'danger' ? C.error : C.primary;
  const stroke = variant === 'outline' ? C.primary : undefined;
  let s = rect(x, y, w, h, { r: h / 2, fill, stroke, sw: 1.5 });
  const tx = x + w / 2 + (ic ? 11 : 0);
  if (ic) s += icon(ic, tx - label.length * 3.6 - 26, y + h / 2 - 9, 18, color);
  s += text(tx, y + h / 2 + 5, label, { size: 14, weight: 600, fill: color, anchor: 'middle' });
  return s;
}

/** Mapa estilizado (manzanas, calles, lago). */
function mapBg(x, y, w, h, { r = 0 } = {}) {
  const id = `m${gradId++}`;
  let s = `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath></defs><g clip-path="url(#${id})">`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e8efe9"/>`;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 14; j++) {
      const bx = x + i * 46 - 10 + (j % 2) * 8;
      const by = y + j * 58 - 12;
      s += `<rect x="${bx}" y="${by}" width="38" height="48" rx="4" fill="${(i + j) % 5 === 0 ? '#cfe6d2' : '#f4f6f2'}"/>`;
    }
  }
  s += `<path d="M${x - 10} ${y + h * 0.3} C${x + w * 0.3} ${y + h * 0.25}, ${x + w * 0.5} ${y + h * 0.55}, ${x + w + 10} ${y + h * 0.5}" stroke="#ffd98a" stroke-width="9" fill="none"/>`;
  s += `<path d="M${x + w * 0.35} ${y - 10} L${x + w * 0.45} ${y + h + 10}" stroke="#fff" stroke-width="8" fill="none"/>`;
  s += `<path d="M${x - 10} ${y + h * 0.78} L${x + w + 10} ${y + h * 0.7}" stroke="#fff" stroke-width="7" fill="none"/>`;
  s += `<ellipse cx="${x + w * 0.85}" cy="${y + h * 0.15}" rx="${w * 0.25}" ry="${h * 0.09}" fill="#b5dcf3"/>`;
  s += '</g>';
  return s;
}

function pin(x, y, color = C.primary, size = 30) {
  return `<g transform="translate(${x - size / 2} ${y - size})"><path d="M${size / 2} ${size} C${size * 0.15} ${size * 0.62}, 0 ${size * 0.45}, 0 ${size * 0.38} A${size / 2} ${size / 2} 0 1 1 ${size} ${size * 0.38} C${size} ${size * 0.45}, ${size * 0.85} ${size * 0.62}, ${size / 2} ${size} Z" fill="${color}" stroke="#fff" stroke-width="2"/><circle cx="${size / 2}" cy="${size * 0.38}" r="${size * 0.15}" fill="#fff"/></g>`;
}

/** Patrón tipo QR determinista (no es un QR válido; es decorativo). */
function qr(x, y, size, seed = 7) {
  const n = 25;
  const cell = size / n;
  let rnd = seed;
  const next = () => ((rnd = (rnd * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  let s = rect(x - 10, y - 10, size + 20, size + 20, { r: 12, fill: C.white });
  const finder = (fx, fy) =>
    rect(x + fx * cell, y + fy * cell, cell * 7, cell * 7, { fill: C.neutral }) +
    rect(x + (fx + 1) * cell, y + (fy + 1) * cell, cell * 5, cell * 5, { fill: C.white }) +
    rect(x + (fx + 2) * cell, y + (fy + 2) * cell, cell * 3, cell * 3, { fill: C.neutral });
  const inFinder = (i, j) => (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (inFinder(i, j)) continue;
      if (next() > 0.52) s += `<rect x="${x + i * cell}" y="${y + j * cell}" width="${cell + 0.3}" height="${cell + 0.3}" fill="${C.neutral}"/>`;
    }
  }
  s += finder(0, 0) + finder(n - 7, 0) + finder(0, n - 7);
  return s;
}

function screen(body, { bg = C.surface, dark = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="2340" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${bg}"/>${body}${statusBar(dark)}</svg>`;
}

// ---------- datos de ejemplo ----------
const EV = {
  barriletes: { title: 'Festival de Barriletes', meta: 'Dom 1 nov · 9:00', sub: 'Sumpango, Sacatepéquez', colors: ['#0d658d', '#8dd1fe'], kind: 'kites' },
  marimba: { title: 'Noche de Marimba', meta: 'Sáb 17 oct · 19:00', sub: 'Teatro Nacional, Zona 4', colors: ['#5e3e00', '#d08a1e'], kind: 'music' },
  cafe: { title: 'Expo Café de Altura', meta: 'Vie 23 oct · 10:00', sub: 'Antigua Guatemala', colors: ['#3b2a1a', '#a0703c'], kind: 'food' },
  carrera: { title: 'Carrera 10K Reforma', meta: 'Dom 25 oct · 6:30', sub: 'Av. La Reforma, Zona 10', colors: ['#004e3d', '#3fb38f'], kind: 'run' },
  volcan: { title: 'Amanecer en el Pacaya', meta: 'Sáb 31 oct · 4:00', sub: 'San Vicente Pacaya', colors: ['#7a2e3a', '#f29a5c'], kind: 'volcano' },
  rock: { title: 'Concierto Rock Chapín', meta: 'Sáb 7 nov · 20:00', sub: 'Explanada Cayalá', colors: ['#1d252b', '#0d658d'], kind: 'music' },
};

// ---------- pantallas ----------
const screens = {
  '01-inicio': () => {
    let s = text(20, 62, 'Hola, Andrea', { size: 20, weight: 700 });
    s += text(20, 82, '¿Qué hacemos este fin de semana?', { size: 12, fill: C.muted });
    s += icon('Bell', W - 48, 48, 22) + `<circle cx="${W - 30}" cy="50" r="4" fill="${C.error}"/>`;
    s += searchField(98, 'Buscar eventos');
    s += text(20, 170, 'Destacados', { size: 16, weight: 700 }) + text(W - 20, 170, 'Ver todo', { size: 12, weight: 500, fill: C.secondary, anchor: 'end' });
    s += cover(20, 182, 260, 170, EV.barriletes.colors, { r: 20, kind: 'kites' });
    s += `<rect x="20" y="282" width="260" height="70" fill="url(#shade)"/>`;
    s += `<defs><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></linearGradient></defs>`;
    s += chip(32, 194, 'Cultura', { fill: '#ffffffd9', color: C.primary, w: 64 });
    s += text(34, 320, EV.barriletes.title, { size: 16, weight: 700, fill: C.white });
    s += text(34, 340, 'Dom 1 nov · Sumpango', { size: 11, fill: C.white, opacity: 0.9 });
    s += cover(292, 182, 120, 170, EV.volcan.colors, { r: 20, kind: 'volcano' });
    s += text(20, 390, 'Cerca de ti', { size: 16, weight: 700 }) + text(W - 20, 390, 'Ver mapa', { size: 12, weight: 500, fill: C.secondary, anchor: 'end' });
    s += eventRow(402, { ...EV.marimba, badge: '1.2 km' });
    s += eventRow(496, { ...EV.carrera, badge: '2.8 km' });
    s += eventRow(590, { ...EV.cafe, badge: '41 km' });
    return screen(s + bottomNav(0));
  },

  '02-explorar': () => {
    let s = appBar('Explorar');
    s += searchField(84, '', { value: 'concierto' });
    ['Todos', 'Música', 'Cultura', 'Deportes', 'Comida'].reduce((x, c) => {
      const w = c.length * 6.4 + 24;
      s += chip(x, 142, c, { active: c === 'Música', w });
      return x + w + 8;
    }, 20);
    s += rect(20, 186, W - 40, 36, { r: 18, fill: '#e6edf3' });
    s += rect(22, 188, (W - 44) / 2, 32, { r: 16, fill: C.white });
    s += text(20 + (W - 40) / 4, 209, 'Próximos', { size: 12, weight: 600, anchor: 'middle' });
    s += text(20 + ((W - 40) * 3) / 4, 209, 'Pasados', { size: 12, weight: 500, fill: C.muted, anchor: 'middle' });
    s += text(20, 252, '12 resultados', { size: 12, fill: C.muted });
    s += eventRow(264, EV.rock);
    s += eventRow(358, EV.marimba);
    s += eventRow(452, { title: 'Sinfónica al Parque', meta: 'Dom 15 nov · 16:00', sub: 'Parque Central, Zona 1', colors: ['#0d658d', '#004e3d'], kind: 'music' });
    s += eventRow(546, { title: 'Jazz en Cayalá', meta: 'Vie 20 nov · 19:30', sub: 'Paseo Cayalá, Zona 16', colors: ['#3a2a5e', '#8a6fd1'], kind: 'music' });
    return screen(s + bottomNav(1));
  },

  '03-mapa': () => {
    let s = mapBg(0, 0, W, 708);
    s += rect(20, 40, W - 40, 44, { r: 22, fill: C.white }) + icon('Search', 36, 52, 20, C.muted) + text(66, 67, 'Buscar en el mapa', { size: 13, fill: C.muted });
    ['Hoy', 'Esta semana', 'Música', 'Gratis'].reduce((x, c, i) => {
      const w = c.length * 6.4 + 24;
      s += chip(x, 94, c, { active: i === 1, w });
      return x + w + 8;
    }, 20);
    [
      [80, 220, C.secondary],
      [210, 260, C.primary],
      [150, 360, C.tertiaryContainer],
      [270, 420, C.secondary],
      [96, 470, C.primary],
      [300, 190, C.tertiaryContainer],
    ].forEach(([x, y, c]) => (s += pin(x, y, c)));
    s += pin(210, 260, C.primary, 44);
    s += `<circle cx="180" cy="330" r="9" fill="${C.secondary}" stroke="#fff" stroke-width="3"/><circle cx="180" cy="330" r="22" fill="${C.secondary}" opacity="0.15"/>`;
    s += rect(W - 64, 520, 44, 44, { r: 22, fill: C.white }) + icon('LocateFixed', W - 53, 531, 22, C.primary);
    s += rect(20, 580, W - 40, 112, { r: 20, fill: C.white });
    s += cover(32, 592, 88, 88, EV.marimba.colors, { r: 14, kind: 'music' });
    s += text(134, 614, EV.marimba.title, { size: 14, weight: 700 });
    s += text(134, 634, EV.marimba.meta, { size: 11, fill: C.muted });
    s += text(134, 652, 'A 1.2 km de ti', { size: 11, fill: C.secondary, weight: 500 });
    s += button(134, 660, 110, 'Ver detalle', { h: 26 }).replace(/font-size="14"/, 'font-size="11"');
    return screen(s + bottomNav(2));
  },

  '04-detalle': () => {
    let s = cover(0, 0, W, 250, EV.marimba.colors, { r: 0, kind: 'music' });
    s += `<circle cx="34" cy="58" r="18" fill="#ffffffe0"/>` + icon('ArrowLeft', 23, 47, 22, C.neutral);
    s += `<circle cx="${W - 76}" cy="58" r="18" fill="#ffffffe0"/>` + icon('Share2', W - 86, 48, 20, C.neutral);
    s += `<circle cx="${W - 34}" cy="58" r="18" fill="#ffffffe0"/>` + icon('Heart', W - 44, 48, 20, C.neutral);
    s += rect(0, 230, W, 560, { r: 24, fill: C.surface });
    s += chip(20, 250, 'Música', { fill: '#d6efe6', color: C.primary, w: 64 });
    s += text(20, 304, 'Noche de Marimba', { size: 22, weight: 700 });
    s += icon('CalendarDays', 20, 318, 18, C.primary) + text(46, 332, 'Sábado 17 de octubre · 19:00', { size: 12 });
    s += icon('MapPin', 20, 344, 18, C.primary) + text(46, 358, 'Teatro Nacional, Zona 4', { size: 12 });
    s += icon('Users', 20, 370, 18, C.primary) + text(46, 384, '186 personas van', { size: 12 });
    s += text(20, 422, 'Cómo llegar', { size: 15, weight: 700 });
    s += mapBg(20, 434, W - 40, 150, { r: 16 });
    s += `<path d="M60 560 C100 540, 120 500, 170 494 S250 470, 290 462" stroke="${C.secondary}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M60 560 C80 520, 150 540, 200 520 S270 500, 290 462" stroke="${C.secondary}" stroke-width="4" fill="none" stroke-dasharray="2 7" stroke-linecap="round" opacity="0.6"/>`;
    s += `<circle cx="60" cy="560" r="7" fill="${C.secondary}" stroke="#fff" stroke-width="3"/>` + pin(290, 466, C.primary, 28);
    s += chip(20, 596, '25 min con tráfico', { fill: '#fdecc8', color: C.tertiary, w: 130 });
    s += chip(158, 596, 'Alterna: 31 min', { w: 112 });
    s += rect(0, 640, W, 140, { fill: C.white });
    s += text(20, 668, 'Entrada general', { size: 12, fill: C.muted }) + text(20, 690, 'Q 75.00', { size: 18, weight: 700 });
    s += button(170, 652, 170, 'Reservar ticket', { ic: 'Ticket' });
    s += rect(W / 2 - 60, 770, 120, 4, { r: 2, fill: C.neutral });
    return screen(s, { dark: true });
  },

  '05-ticket-qr': () => {
    let s = appBar('Mi ticket', { back: true, actions: ['Share2'] });
    s += rect(24, 90, W - 48, 560, { r: 24, fill: C.primary });
    s += cover(24, 90, W - 48, 120, EV.marimba.colors, { r: 24, kind: 'music' });
    s += rect(24, 180, W - 48, 30, { fill: C.primary });
    s += text(44, 240, 'Noche de Marimba', { size: 20, weight: 700, fill: C.white });
    s += text(44, 262, 'Sáb 17 oct · 19:00 · Teatro Nacional', { size: 11, fill: C.white, opacity: 0.85 });
    s += qr(W / 2 - 95, 290, 190, 11);
    s += text(W / 2, 520, 'JCH-2026-4F7K2Q', { size: 16, weight: 700, fill: C.white, anchor: 'middle' });
    s += text(W / 2, 540, 'Muestra este código en la entrada', { size: 11, fill: C.white, opacity: 0.85, anchor: 'middle' });
    s += `<line x1="44" y1="566" x2="${W - 44}" y2="566" stroke="#ffffff55" stroke-dasharray="6 6"/>`;
    s += `<circle cx="24" cy="566" r="12" fill="${C.surface}"/><circle cx="${W - 24}" cy="566" r="12" fill="${C.surface}"/>`;
    s += text(44, 598, 'Entrada', { size: 10, fill: C.white, opacity: 0.75 }) + text(44, 618, 'General', { size: 13, weight: 600, fill: C.white });
    s += text(W - 44, 598, 'Estado', { size: 10, fill: C.white, opacity: 0.75, anchor: 'end' }) + text(W - 44, 618, 'Vigente', { size: 13, weight: 600, fill: C.secondaryContainer, anchor: 'end' });
    s += button(24, 668, W - 48, 'Agregar a mi agenda', { variant: 'outline', ic: 'CalendarPlus' });
    return screen(s);
  },

  '06-agenda': () => {
    let s = appBar('Mi agenda', { actions: ['CalendarDays'] });
    s += rect(20, 84, W - 40, 36, { r: 18, fill: '#e6edf3' }) + rect(22, 86, (W - 44) / 2, 32, { r: 16, fill: C.white });
    s += text(20 + (W - 40) / 4, 107, 'Próximos', { size: 12, weight: 600, anchor: 'middle' });
    s += text(20 + ((W - 40) * 3) / 4, 107, 'Historial', { size: 12, weight: 500, fill: C.muted, anchor: 'middle' });
    const group = (y, label, list) => {
      let g = text(20, y, label, { size: 13, weight: 700, fill: C.primary });
      list.forEach((e, i) => (g += eventRow(y + 12 + i * 94, e)));
      return g;
    };
    s += group(152, 'Sábado 17 de octubre', [{ ...EV.marimba, badge: 'Ticket' }]);
    s += group(272, 'Domingo 25 de octubre', [{ ...EV.carrera, badge: 'Voy' }]);
    s += group(392, 'Domingo 1 de noviembre', [{ ...EV.barriletes, badge: 'Ticket' }]);
    s += group(512, 'Sábado 7 de noviembre', [{ ...EV.rock, badge: 'Ticket' }]);
    return screen(s + bottomNav(3));
  },

  '07-notificaciones': () => {
    let s = appBar('Notificaciones', { back: true, actions: ['CheckCheck'] });
    const items = [
      ['Clock', C.primary, 'Mañana es Noche de Marimba', 'Empieza a las 19:00. Revisa cómo llegar.', 'Hace 5 min', true],
      ['CalendarClock', C.tertiaryContainer, 'Cambio de horario', 'Carrera 10K Reforma ahora inicia a las 6:00.', 'Hace 2 h', true],
      ['MapPin', C.secondary, 'Nuevo evento cerca de ti', 'Expo Café de Altura en Antigua Guatemala.', 'Ayer', false],
      ['Sparkles', C.primary, 'Tus recomendaciones de la semana', '5 eventos que te pueden gustar.', 'Lun', false],
      ['CircleX', C.error, 'Evento cancelado', 'Feria del Libro Zona 1 fue cancelada.', 'Hace 3 días', false],
      ['Star', C.amber, '¿Qué tal estuvo?', 'Califica Festival de Jazz y ayuda a otros.', 'Hace 5 días', false],
    ];
    items.forEach(([ic, color, title, body, when, unread], i) => {
      const y = 88 + i * 98;
      s += rect(16, y, W - 32, 88, { r: 16, fill: unread ? '#e8f4ef' : C.white, stroke: unread ? undefined : '#e3e9ef' });
      s += `<circle cx="48" cy="${y + 44}" r="20" fill="${color}" opacity="0.14"/>` + icon(ic, 37, y + 33, 22, color);
      s += text(80, y + 32, title, { size: 13, weight: 600 });
      s += text(80, y + 52, body, { size: 11, fill: C.muted });
      s += text(80, y + 72, when, { size: 10, fill: C.muted });
      if (unread) s += `<circle cx="${W - 34}" cy="${y + 28}" r="5" fill="${C.primary}"/>`;
    });
    return screen(s);
  },

  '08-crear-evento': () => {
    let s = appBar('Crear evento', { back: true });
    const steps = ['Información', 'Ubicación', 'Categoría', 'Entradas'];
    steps.forEach((st, i) => {
      const cx = 48 + i * 88;
      const done = i < 1;
      const on = i === 1;
      if (i < 3) s += `<line x1="${cx + 16}" y1="104" x2="${cx + 72}" y2="104" stroke="${i < 1 ? C.primary : C.surfaceDim}" stroke-width="3"/>`;
      s += `<circle cx="${cx}" cy="104" r="15" fill="${done || on ? C.primary : C.white}" stroke="${done || on ? C.primary : C.surfaceDim}" stroke-width="2"/>`;
      s += done ? icon('Check', cx - 8, 96, 16, C.white, 3) : text(cx, 109, String(i + 1), { size: 12, weight: 700, fill: on ? C.white : C.muted, anchor: 'middle' });
      s += text(cx, 136, st, { size: 10, weight: on ? 600 : 400, fill: on ? C.primary : C.muted, anchor: 'middle' });
    });
    s += text(20, 176, '¿Dónde será tu evento?', { size: 17, weight: 700 });
    s += text(20, 196, 'Busca la dirección o mueve el pin en el mapa.', { size: 12, fill: C.muted });
    s += searchField(212, '', { value: 'Parque Central, Zona 1', filter: false });
    s += mapBg(20, 268, W - 40, 300, { r: 18 });
    s += `<circle cx="180" cy="420" r="46" fill="${C.primary}" opacity="0.12"/>` + pin(180, 420, C.primary, 48);
    s += rect(W - 72, 520, 40, 40, { r: 20, fill: C.white }) + icon('LocateFixed', W - 62, 530, 20, C.primary);
    s += rect(20, 580, W - 40, 56, { r: 14, fill: C.white, stroke: '#e3e9ef' });
    s += icon('MapPin', 34, 597, 20, C.primary);
    s += text(62, 604, '6a Avenida y 6a Calle, Zona 1', { size: 12, weight: 600 });
    s += text(62, 622, 'Ciudad de Guatemala', { size: 11, fill: C.muted });
    s += button(20, 660, 140, 'Atrás', { variant: 'outline' });
    s += button(170, 660, W - 190, 'Siguiente');
    return screen(s);
  },

  '09-mis-eventos': () => {
    let s = appBar('Mis eventos', { actions: ['Plus'] });
    ['Todos', 'Publicados', 'En revisión', 'Borradores'].reduce((x, c, i) => {
      const w = c.length * 6.4 + 24;
      s += chip(x, 84, c, { active: i === 0, w });
      return x + w + 8;
    }, 20);
    const st = {
      pub: ['Publicado', '#d6efe6', C.primary],
      rev: ['En revisión', '#fdecc8', C.tertiary],
      draft: ['Borrador', '#e6edf3', C.muted],
      cancel: ['Cancelado', '#fde8e8', C.error],
    };
    const rows = [
      [EV.marimba, 'pub', '186 reservas'],
      [EV.barriletes, 'rev', 'Esperando aprobación'],
      [EV.cafe, 'pub', '92 reservas'],
      [{ ...EV.rock, title: 'Concierto Rock Chapín' }, 'draft', 'Falta portada'],
      [{ title: 'Feria del Libro', meta: 'Sáb 10 oct · 9:00', colors: ['#5e3e00', '#0d658d'], kind: 'volcano' }, 'cancel', 'Asistentes notificados'],
    ];
    rows.forEach(([e, k, note], i) => {
      const y = 128 + i * 112;
      const [label, bg, fg] = st[k];
      s += rect(20, y, W - 40, 100, { r: 16, fill: C.white, stroke: '#e3e9ef' });
      s += cover(30, y + 10, 80, 80, e.colors, { r: 12, kind: e.kind });
      s += chip(122, y + 12, label, { fill: bg, color: fg, w: label.length * 6.2 + 18 });
      s += text(122, y + 60, e.title, { size: 13, weight: 600 });
      s += text(122, y + 78, e.meta, { size: 11, fill: C.muted });
      s += text(122, y + 94, note, { size: 10, fill: C.secondary, weight: 500 });
      s += icon('EllipsisVertical', W - 50, y + 12, 20, C.muted);
    });
    return screen(s + bottomNav(4));
  },

  '10-aprobaciones': () => {
    let s = appBar('Aprobaciones', { actions: ['Filter'] });
    s += rect(20, 84, (W - 52) / 3, 64, { r: 14, fill: '#fdecc8' }) + text(20 + (W - 52) / 6, 112, '8', { size: 20, weight: 700, fill: C.tertiary, anchor: 'middle' }) + text(20 + (W - 52) / 6, 134, 'Pendientes', { size: 10, fill: C.tertiary, anchor: 'middle' });
    s += rect(26 + (W - 52) / 3, 84, (W - 52) / 3, 64, { r: 14, fill: '#d6efe6' }) + text(26 + (W - 52) / 2, 112, '24', { size: 20, weight: 700, fill: C.primary, anchor: 'middle' }) + text(26 + (W - 52) / 2, 134, 'Aprobadas', { size: 10, fill: C.primary, anchor: 'middle' });
    s += rect(32 + ((W - 52) * 2) / 3, 84, (W - 52) / 3, 64, { r: 14, fill: '#fde8e8' }) + text(32 + ((W - 52) * 5) / 6, 112, '3', { size: 20, weight: 700, fill: C.error, anchor: 'middle' }) + text(32 + ((W - 52) * 5) / 6, 134, 'Rechazadas', { size: 10, fill: C.error, anchor: 'middle' });
    // Solicitud destacada
    s += rect(20, 164, W - 40, 250, { r: 18, fill: C.white, stroke: '#e3e9ef' });
    s += cover(32, 176, 64, 64, EV.barriletes.colors, { r: 12, kind: 'kites' });
    s += text(108, 196, 'Festival de Barriletes', { size: 14, weight: 700 });
    s += text(108, 214, 'Organiza: Comité Cultural Sumpango', { size: 11, fill: C.muted });
    s += chip(108, 222, 'Aforo 5,000', { fill: '#e6edf3', color: C.neutral, w: 84 });
    s += text(32, 270, 'Documentos', { size: 12, weight: 600 });
    s += rect(32, 280, W - 64, 40, { r: 10, fill: C.surface }) + icon('FileText', 42, 290, 20, C.error) + text(70, 305, 'plan-de-seguridad.pdf', { size: 11 }) + icon('Download', W - 62, 290, 18, C.muted);
    s += rect(32, 326, W - 64, 40, { r: 10, fill: C.surface, stroke: C.surfaceDim }) + icon('FilePlus', 42, 336, 20, C.muted) + text(70, 351, 'Pedir otro documento', { size: 11, fill: C.secondary, weight: 500 });
    s += button(32, 374, 140, 'Rechazar', { variant: 'danger', h: 32 }).replace(/font-size="14"/, 'font-size="12"');
    s += button(184, 374, W - 216, 'Aprobar', { h: 32 }).replace(/font-size="14"/, 'font-size="12"');
    s += text(20, 444, 'Otras solicitudes', { size: 13, weight: 700 });
    s += eventRow(456, { ...EV.volcan, badge: 'Nueva' });
    s += eventRow(550, { title: 'Feria de Jocotenango', meta: 'Sáb 14 nov · 10:00', sub: 'Zona 2, Ciudad de Guatemala', colors: ['#0d658d', '#8dd1fe'], kind: 'run', badge: 'Docs' });
    return screen(s + bottomNav(4));
  },

  '11-escaner': () => {
    let s = `<defs><radialGradient id="cam" cx="0.5" cy="0.45" r="0.8"><stop offset="0" stop-color="#3c4a52"/><stop offset="1" stop-color="#0d1215"/></radialGradient></defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#cam)"/>`;
    s += `<circle cx="34" cy="58" r="18" fill="#ffffff22"/>` + icon('X', 23, 47, 22, C.white);
    s += text(W / 2, 64, 'Validar entradas', { size: 16, weight: 600, fill: C.white, anchor: 'middle' });
    s += `<circle cx="${W - 34}" cy="58" r="18" fill="#ffffff22"/>` + icon('Zap', W - 44, 48, 20, C.white);
    s += text(W / 2, 96, 'Noche de Marimba · Puerta 1', { size: 11, fill: C.white, opacity: 0.75, anchor: 'middle' });
    const x = 70;
    const y = 200;
    const sz = 220;
    s += `<g opacity="0.25">${qr(x + 25, y + 25, sz - 50, 11)}</g>`;
    const corner = (cx, cy, dx, dy) => `<path d="M${cx} ${cy + dy * 36} L${cx} ${cy} L${cx + dx * 36} ${cy}" stroke="${C.secondaryContainer}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    s += corner(x, y, 1, 1) + corner(x + sz, y, -1, 1) + corner(x, y + sz, 1, -1) + corner(x + sz, y + sz, -1, -1);
    s += `<line x1="${x + 10}" y1="${y + sz * 0.55}" x2="${x + sz - 10}" y2="${y + sz * 0.55}" stroke="${C.secondaryContainer}" stroke-width="3" opacity="0.9"/>`;
    s += text(W / 2, y + sz + 40, 'Apunta la cámara al código QR', { size: 13, fill: C.white, anchor: 'middle' });
    s += rect(20, 560, W - 40, 120, { r: 20, fill: C.white });
    s += `<circle cx="64" cy="604" r="22" fill="#d6efe6"/>` + icon('CircleCheck', 50, 590, 28, C.primary);
    s += text(100, 598, 'Entrada válida', { size: 16, weight: 700, fill: C.primary });
    s += text(100, 618, 'JCH-2026-4F7K2Q · General', { size: 11, fill: C.muted });
    s += rect(36, 640, (W - 84) / 2, 28, { r: 8, fill: C.surface }) + text(36 + (W - 84) / 4, 659, 'Ingresados: 142', { size: 11, weight: 500, anchor: 'middle' });
    s += rect(48 + (W - 84) / 2, 640, (W - 84) / 2, 28, { r: 8, fill: C.surface }) + text(48 + ((W - 84) * 3) / 4, 659, 'Reservas: 186', { size: 11, weight: 500, anchor: 'middle' });
    s += rect(W / 2 - 60, 770, 120, 4, { r: 2, fill: C.white });
    return screen(s, { dark: true, bg: '#0d1215' });
  },

  '12-reportes': () => {
    let s = appBar('Reportes', { back: true, actions: ['Share2'] });
    s += text(20, 102, 'Noche de Marimba', { size: 15, weight: 700 }) + text(20, 120, 'Sáb 17 oct · Teatro Nacional', { size: 11, fill: C.muted });
    const kpi = (x, y, label, value, color) =>
      rect(x, y, (W - 52) / 2, 76, { r: 16, fill: C.white, stroke: '#e3e9ef' }) +
      text(x + 14, y + 26, label, { size: 11, fill: C.muted }) +
      text(x + 14, y + 56, value, { size: 22, weight: 700, fill: color });
    s += kpi(20, 136, 'Reservas', '186', C.primary) + kpi(32 + (W - 52) / 2, 136, 'Asistieron', '142', C.secondary);
    s += kpi(20, 224, 'Ocupación', '74 %', C.tertiaryContainer) + kpi(32 + (W - 52) / 2, 224, 'Reseña promedio', '4.8', C.primary);
    s += rect(20, 314, W - 40, 230, { r: 18, fill: C.white, stroke: '#e3e9ef' });
    s += text(34, 340, 'Reservas por día', { size: 13, weight: 600 });
    const bars = [12, 18, 9, 24, 31, 22, 40, 30];
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D', 'L'];
    bars.forEach((v, i) => {
      const bh = v * 3.6;
      const bx = 44 + i * 36;
      s += rect(bx, 512 - bh, 22, bh, { r: 6, fill: i === 6 ? C.primary : C.secondaryContainer });
      s += text(bx + 11, 530, days[i], { size: 10, fill: C.muted, anchor: 'middle' });
    });
    s += rect(20, 556, W - 40, 72, { r: 16, fill: C.white, stroke: '#e3e9ef' });
    s += text(34, 584, 'Por tipo de entrada', { size: 12, weight: 600 });
    s += rect(34, 598, W - 68, 12, { r: 6, fill: C.surfaceDim }) + rect(34, 598, (W - 68) * 0.7, 12, { r: 6, fill: C.primary });
    s += text(34, 622, 'General 70 % · VIP 30 %', { size: 10, fill: C.muted });
    s += button(20, 648, W - 40, 'Exportar a CSV', { ic: 'FileDown' });
    return screen(s);
  },
};

await mkdir(OUT, { recursive: true });
for (const [id, render] of Object.entries(screens)) {
  const svg = Buffer.from(render());
  await sharp(svg, { density: 72 }).resize(1080, 2340).webp({ quality: 82 }).toFile(`${OUT}/${id}.webp`);
  await sharp(svg, { density: 72 }).resize(540, 1170).webp({ quality: 80 }).toFile(`${OUT}/${id}-540.webp`);
  console.log(`✓ ${id}`);
}
