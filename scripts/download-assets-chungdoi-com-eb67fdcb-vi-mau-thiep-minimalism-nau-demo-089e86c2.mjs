import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';

const BASE = 'https://chungdoi.com';
const CDN = 'https://cdn.chungdoi.com';
const OUT = 'public/sites/chungdoi-com-eb67fdcb/vi-mau-thiep-minimalism-nau-demo-089e86c2';

const THEME = [
  'leaf-background.webp','house-background.webp','frame-avatar.webp',
  'flower2-decoration.webp','paper.webp','gate.webp','cake.webp',
  'water.webp','paper-note.webp',
].map(f => `/images/themes/minimalism-brown/${f}`);

const UPLOADS = [
  '88aa2b21-f2e3-4f9a-8725-f59c2ef48c9a','d30fe2fc-7c30-4c1c-8515-83142e714040',
  '869c2794-6378-4981-a7cb-045489cbc84f','d797b1a8-d52e-49a7-9f4f-c6688dd86f98',
  '14435a15-ded0-4efd-881d-f274554b148d','3a42f7f7-4f7f-4a62-a65c-5da28d132114',
  '8b354eab-5468-4b35-b061-efd15a560a42',
].map(id => `/uploads/${id}.jpg`);

const GIFT = ['/images/giftbox/mini/boho_floral_pink.webp','/images/giftbox/mini/minimalism_red.webp'];

const dest = (p) =>
  p.includes('/themes/') ? join(OUT, 'images/theme', basename(p))
  : p.includes('/uploads/') ? join(OUT, 'images/photos', basename(p))
  : join(OUT, 'images/misc', basename(p));

async function grab(p) {
  const url = (p.includes('/uploads/') ? CDN : BASE) + p, out = dest(p);
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': BASE } });
    if (!r.ok) return { p, ok: false, status: r.status };
    const buf = Buffer.from(await r.arrayBuffer());
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    return { p, ok: true, bytes: buf.length, out };
  } catch (e) { return { p, ok: false, err: e.message }; }
}

const all = [...THEME, ...UPLOADS, ...GIFT];
const results = [];
for (let i = 0; i < all.length; i += 4) {
  results.push(...await Promise.all(all.slice(i, i + 4).map(grab)));
}
const ok = results.filter(r => r.ok), bad = results.filter(r => !r.ok);
console.log(`OK ${ok.length}/${results.length}`);
ok.forEach(r => console.log(`  ${(r.bytes/1024).toFixed(0)}KB  ${r.out}`));
if (bad.length) { console.log('FAILED:'); bad.forEach(r => console.log(`  ${r.p} ${r.status||r.err}`)); }
