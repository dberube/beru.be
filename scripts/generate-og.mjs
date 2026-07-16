import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'public', 'og');
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const pages = [
  ['site', 'Commercial product leader who builds.'],
  ['writing', 'Writing.'],
  ['builds', 'Builds.'],
  ['agents', 'Agents.'],
  ['about', 'About.'],
  ['now', 'Now.']
];

async function frontmatterFiles(dir, prefix) {
  try {
    const baseDir = path.join(root, 'src/content', dir);
    const names = await collectMarkdown(baseDir);
    for (const fullPath of names) {
      const text = await fs.readFile(fullPath, 'utf8');
      if (/draft:\s*true/.test(text)) continue;
      const rel = path.relative(baseDir, fullPath).replace(/\.md$/, '').replaceAll(path.sep, '-');
      if (dir === 'now' && rel === 'current') continue;
      const titleLine = text.split('\n').find((line) => line.startsWith('title:') || line.startsWith('name:'));
      const fallback = dir === 'now' ? rel.replace('archive-', '') : rel;
      const title = titleLine?.replace(/^(title|name):\s*/, '').replace(/^['"]|['"]$/g, '') ?? fallback;
      pages.push([`${prefix}-${fallback}`, title]);
    }
  } catch {}
}

async function collectMarkdown(dir) {
  const out = [];
  for (const dirent of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, dirent.name);
    if (dirent.isDirectory()) out.push(...await collectMarkdown(full));
    else if (dirent.name.endsWith('.md')) out.push(full);
  }
  return out;
}

await frontmatterFiles('writing', 'writing');
await frontmatterFiles('builds', 'builds');
await frontmatterFiles('agents', 'agents');
await frontmatterFiles('now', 'now');

function esc(s) { return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
function lines(text, max = 28) {
  const words = text.split(/\s+/);
  const out = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max) { out.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) out.push(line);
  return out.slice(0, 3);
}

for (const [slug, title] of pages) {
  const titleLines = lines(title).map((line, i) => `<text x="72" y="${220 + i * 72}" font-family="Georgia, serif" font-size="58" font-weight="500" fill="#1C1914">${esc(line)}</text>`).join('');
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#F5F1E7"/><line x1="72" y1="72" x2="1128" y2="72" stroke="#1C1914" stroke-width="2"/><line x1="72" y1="79" x2="1128" y2="79" stroke="#1C1914" stroke-width="1"/><text x="72" y="142" font-family="Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="4" fill="#29486B">BERU.BE</text>${titleLines}<text x="72" y="548" font-family="Georgia, serif" font-style="italic" font-size="32" font-weight="600" fill="#1C1914">David Berube</text><line x1="72" y1="582" x2="1128" y2="582" stroke="#1C1914" stroke-width="1"/><line x1="72" y1="589" x2="1128" y2="589" stroke="#1C1914" stroke-width="2"/></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, `${slug}.png`));
}
console.log(`generated ${pages.length} OG images`);
