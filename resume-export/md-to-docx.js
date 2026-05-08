#!/usr/bin/env node
/**
 * md-to-docx.js
 * Converts the resume Markdown (public/paul-buramensky-resume.md) to a
 * styled DOCX matching the Nunito 2026 brand template.
 *
 * Usage:
 *   node resume-export/md-to-docx.js [input.md] [output.docx]
 *   node resume-export/md-to-docx.js            # defaults to public/paul-buramensky-resume.md
 *
 * Requires: npm install
 */

'use strict';

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  LevelFormat, AlignmentType, ExternalHyperlink, UnderlineType,
  SectionType, ColumnBreak,
} = require('docx');
const fs = require('fs');
const path = require('path');

const FONT = 'Nunito';

const SZ = {
  h1: 48, h2: 24, h3: 24, body: 22,
  contact: 20, skills: 21, bullet: 20, plain: 21, lang: 22,
};

const C = {
  dark: '193B5E', body: '1A1A2E', accent: '6094C3',
  muted: '999999', grey: '434343', hr: 'D9D9D9', link: '1155CC',
};

const SP = {
  h1After: 40, h1Line: 192,
  h2Before: 240, h2After: 60, h2SumBefore: 120,
  h3Before: 120, h3First: 0,
  h3EarlierBefore: 160, h3EarlierAfter: 120,
  hrLine: 192, skillsLine: 276,
  italicAfter: 100, bulletAfter: 60, bulletLine: 252,
  plainAfter: 60,
};

const BULLET_IND = { left: 180, hanging: 180 };

const HEADER_DEFAULTS = {
  name: 'Paul Buramensky',
  subtitle: 'Lead Front-End Engineer | UX-Driven | AI-Fluent',
  city: 'Berlin, Germany | EU Citizen',
  phone: '+49 155 6555 1632',
  email: { text: 'mail@paulbu.com', url: 'mailto:mail@paulbu.com' },
  links: [
    { text: 'paulbu.com', url: 'https://paulbu.com' },
    { text: 'linkedin.com/in/paul-buramensky', url: 'https://www.linkedin.com/in/paul-buramensky' },
  ],
};

const PAGE = {
  size: { width: 11906, height: 16838 },
  margin: { top: 907, bottom: 816, left: 1009, right: 720 },
};

function run(text, opts) {
  opts = opts || {};
  const props = {
    text,
    font: opts.font || FONT,
    size: opts.size || SZ.body,
    color: opts.color || C.body,
    bold: opts.bold || false,
    italics: opts.italic || false,
  };
  if (opts.underline) props.underline = { type: UnderlineType.SINGLE };
  if (opts.break) props.break = opts.break;
  return new TextRun(props);
}

function mkLink(text, url, opts) {
  opts = opts || {};
  return new ExternalHyperlink({
    link: url,
    children: [run(text, Object.assign({}, opts, { color: C.link, underline: true }))],
  });
}

function parseInline(text) {
  const tokens = [];
  const re = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let cursor = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > cursor) tokens.push({ text: text.slice(cursor, m.index) });
    if (m[1]) tokens.push({ text: m[1], bold: true, italic: true });
    else if (m[2]) tokens.push({ text: m[2], bold: true });
    else if (m[3]) tokens.push({ text: m[3], italic: true });
    else if (m[4]) tokens.push({ text: m[4], link: m[5] });
    cursor = re.lastIndex;
  }
  if (cursor < text.length) tokens.push({ text: text.slice(cursor) });
  return tokens.filter(function (t) { return t.text.length > 0; });
}

function inlineRuns(tokens, opts) {
  opts = opts || {};
  var result = [];
  tokens.forEach(function (t) {
    if (t.link) { result.push(mkLink(t.text, t.link, opts)); return; }
    var merged = Object.assign({}, opts, {
      bold: opts.bold || t.bold,
      italic: opts.italic || t.italic,
    });
    var linkRe = /\[(.+?)\]\((.+?)\)/g;
    var txt = t.text, c = 0, lm, found = false;
    while ((lm = linkRe.exec(txt)) !== null) {
      found = true;
      if (lm.index > c) result.push(run(txt.slice(c, lm.index), merged));
      result.push(mkLink(lm[1], lm[2], merged));
      c = linkRe.lastIndex;
    }
    if (found) {
      if (c < txt.length) result.push(run(txt.slice(c), merged));
    } else {
      result.push(run(t.text, merged));
    }
  });
  return result;
}

function h3Para(rawLine, spacingBefore) {
  const clean = rawLine.replace(/^### /, '').trim();
  const children = [];
  clean.split(' | ').forEach(function (part, i) {
    if (i > 0) children.push(run(' | ', { size: SZ.h3, color: C.accent }));
    const tokens = parseInline(part.trim());
    tokens.forEach(function (t) {
      children.push(run(t.text, { size: SZ.h3, color: C.dark, bold: t.bold || false }));
    });
  });
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: children,
    spacing: { before: spacingBefore, lineRule: 'auto' },
  });
}

function bulletPara(rawText) {
  return new Paragraph({
    style: 'RoundList',
    numbering: { reference: 'bullets-main', level: 0 },
    children: inlineRuns(parseInline(rawText), { size: SZ.bullet }),
    indent: BULLET_IND,
  });
}

function langBulletPara(rawText) {
  return new Paragraph({
    style: 'ListParagraph',
    numbering: { reference: 'bullets-main', level: 0 },
    children: [run(rawText.trim(), { size: SZ.lang, color: C.body })],
    indent: BULLET_IND,
  });
}

function descPara(rawText) {
  return new Paragraph({
    children: [run(rawText, { size: SZ.bullet, italic: true, color: C.grey })],
    spacing: { after: SP.italicAfter },
  });
}

function skillsPara(rawText) {
  const m = /^(\*\*[^*]+\*\*:?)(.*?)$/.exec(rawText);
  if (!m) return bodyPara(rawText);
  const label = m[1].replace(/\*\*/g, '');
  const rest = m[2];
  const children = [run(label, { size: SZ.skills, bold: true, color: C.body })];
  if (rest) children.push(run(rest, { size: SZ.skills, color: C.body }));
  return new Paragraph({
    children: children,
    spacing: { line: SP.skillsLine, lineRule: 'auto' },
  });
}

function educationPara(rawText) {
  return new Paragraph({
    style: 'PlainList',
    children: inlineRuns(parseInline(rawText), { size: SZ.plain, color: C.body }),
  });
}

function earlierPara(rawText) {
  return new Paragraph({
    style: 'PlainList',
    children: inlineRuns(parseInline(rawText), { size: SZ.plain, color: C.body }),
  });
}

function bodyPara(rawText) {
  return new Paragraph({
    children: inlineRuns(parseInline(rawText), { size: SZ.skills, color: C.body }),
  });
}

function extractHeader(lines) {
  const end = lines.findIndex(function (l) { return l.startsWith('## '); });
  const headerLines = lines
    .slice(0, end === -1 ? lines.length : end)
    .map(function (l) { return l.trimEnd().replace(/\s{2,}$/, ''); });

  const h = { name: '', subtitle: '', city: '', phone: '', links: '', hr: '' };
  headerLines.forEach(function (l) {
    if (!l) return;
    else if (l.startsWith('# ')) h.name = l.replace(/^# /, '').replace(/\*\*/g, '').trim();
    else if (l.startsWith('**') && l.includes(' | ')) h.subtitle = l;
    else if (/^[A-Z][a-z]+,?\s+Germany/.test(l)) h.city = l;
    else if (/^\\?\+/.test(l)) h.phone = l;
    else if (/^\[/.test(l) || /^https?:/.test(l)) h.links = l;
    else if (/^[–-]{5,}/.test(l)) h.hr = l;
  });
  return h;
}

function getHeaderData(lines) {
  var h = extractHeader(lines);
  return {
    name: h.name || HEADER_DEFAULTS.name,
    subtitle: (h.subtitle || HEADER_DEFAULTS.subtitle).replace(/\*\*/g, ''),
    city: h.city || HEADER_DEFAULTS.city,
    phone: (h.phone || HEADER_DEFAULTS.phone).replace(/^\\/, ''),
    email: HEADER_DEFAULTS.email,
    links: HEADER_DEFAULTS.links,
  };
}

function buildHeaderParas(hd) {
  var paras = [];
  var cSz = 21;

  paras.push(new Paragraph({
    spacing: { line: 216, lineRule: 'auto' },
    children: [run(hd.name, { size: SZ.h1, bold: true, color: C.dark })],
  }));

  var parts = hd.subtitle.split(' | ');
  var subChildren = [];
  parts.forEach(function (part, i) {
    if (i > 0) {
      subChildren.push(run(' ', {}));
      subChildren.push(run('|', { color: C.accent }));
      subChildren.push(run(' ', {}));
    }
    subChildren.push(run(part.trim(), { color: C.dark, bold: i === 0 }));
  });
  paras.push(new Paragraph({ children: subChildren }));

  var cc = [new ColumnBreak()];
  hd.city.split(' | ').forEach(function (seg, i) {
    if (i > 0) {
      cc.push(run(' ', { size: cSz }));
      cc.push(run('|', { size: cSz, color: C.muted }));
      cc.push(run(' ', { size: cSz }));
    }
    cc.push(run(seg.trim(), { size: cSz, color: C.body }));
  });
  cc.push(new TextRun({ break: 1 }));
  cc.push(run(hd.phone + ' ', { size: cSz, color: C.body }));
  cc.push(run('|', { size: cSz, color: C.muted }));
  cc.push(run(' ', { size: cSz }));
  cc.push(mkLink(hd.email.text, hd.email.url, { size: cSz }));

  paras.push(new Paragraph({
    children: cc,
    indent: { left: 142 },
    spacing: { before: 0, after: 0, beforeAutospacing: false, afterAutospacing: false },
  }));

  var lc = [];
  hd.links.forEach(function (link, i) {
    if (i > 0) {
      lc.push(run(' ', { size: cSz }));
      lc.push(run('|', { size: cSz, color: C.muted }));
      lc.push(run(' ', { size: cSz }));
    }
    lc.push(mkLink(link.text, link.url, { size: i === 0 ? SZ.body : cSz }));
  });
  paras.push(new Paragraph({
    children: lc,
    indent: { left: 142 },
  }));

  return paras;
}

function buildBodyParas(lines) {
  const paras = [];

  const bodyStart = lines.findIndex(function (l) { return l.startsWith('## '); });
  if (bodyStart === -1) return paras;

  let h2Count = 0;
  let h3Count = 0;
  let section = '';

  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    if (!line) continue;

    if (line.startsWith('## ')) {
      const text = line.replace(/^## /, '').replace(/\*\*/g, '').trim();
      const lc = text.toLowerCase();
      h2Count++;
      h3Count = 0;
      section = lc.includes('skills') ? 'skills'
        : lc.includes('experience') ? 'experience'
          : lc.includes('education') ? 'education'
            : lc.includes('languages') ? 'languages'
              : 'other';
      paras.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [run(text, { size: SZ.h2, bold: true, color: C.dark })],
        spacing: {
          before: h2Count === 1 ? SP.h2SumBefore : SP.h2Before,
          after: SP.h2After,
          lineRule: 'auto',
        },
      }));
      continue;
    }

    if (line.startsWith('### ')) {
      const text = line.replace(/^### /, '').replace(/\*\*/g, '').trim();

      if (text === 'Earlier Career') {
        section = 'earlier';
        paras.push(new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [run('Earlier Career', { size: SZ.h3, color: C.dark })],
          spacing: {
            before: SP.h3EarlierBefore,
            beforeAutospacing: false,
            after: SP.h3EarlierAfter,
            afterAutospacing: false,
          },
        }));
        continue;
      }

      h3Count++;
      const before = (section === 'experience' && h3Count === 1)
        ? SP.h3First : SP.h3Before;
      paras.push(h3Para(line, before));
      continue;
    }

    if (/^[–-]{5,}/.test(line)) continue;

    if (/^[*-] /.test(line)) {
      const text = line.replace(/^[*-] /, '');
      paras.push(section === 'languages' ? langBulletPara(text) : bulletPara(text));
      continue;
    }

    if (/^\*[^*]/.test(line) && line.endsWith('*')) {
      paras.push(descPara(line.slice(1, -1)));
      continue;
    }

    if (section === 'skills') { paras.push(skillsPara(line)); continue; }
    if (section === 'education') { paras.push(educationPara(line)); continue; }
    if (section === 'earlier') { paras.push(earlierPara(line)); continue; }

    paras.push(bodyPara(line));
  }

  return paras;
}

function stripFrontmatter(raw) {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\r?\n/, '');
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const inputFile = process.argv[2] || path.join(projectRoot, 'public/paul-buramensky-resume.md');
  const outputFile = process.argv[3] || inputFile.replace(/\.md$/i, '.docx');

  if (!fs.existsSync(inputFile)) {
    console.error('File not found: ' + inputFile);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputFile, 'utf8');
  const lines = stripFrontmatter(raw).split('\n');
  console.log('Reading  : ' + inputFile + '  (' + lines.length + ' lines)');

  const headerData = getHeaderData(lines);

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: SZ.body, color: C.body } },
      },
      paragraphStyles: [
        {
          id: 'Heading1', name: 'Heading 1',
          basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: SZ.h1, bold: true, color: C.dark, font: FONT },
          paragraph: { spacing: { after: SP.h1After, line: SP.h1Line, lineRule: 'auto' }, outlineLevel: 0 },
        },
        {
          id: 'Heading2', name: 'Heading 2',
          basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: SZ.h2, bold: true, color: C.dark, font: FONT },
          paragraph: { spacing: { before: SP.h2Before, after: SP.h2After }, outlineLevel: 1 },
        },
        {
          id: 'Heading3', name: 'Heading 3',
          basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: SZ.h3, bold: true, color: C.dark, font: FONT },
          paragraph: { spacing: { before: SP.h3Before }, outlineLevel: 2 },
        },
        {
          id: 'RoundList', name: 'Round List',
          basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: SZ.bullet, bold: false, italics: false, font: FONT },
          paragraph: {
            spacing: { after: SP.bulletAfter, line: 228, lineRule: 'auto' },
            indent: { left: 270, hanging: 270 },
          },
        },
        {
          id: 'PlainList', name: 'Plain List',
          basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: SZ.plain, bold: false, italics: false, color: C.body, font: FONT },
          paragraph: { spacing: { after: SP.plainAfter } },
        },
        {
          id: 'ListParagraph', name: 'List Paragraph',
          basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: SZ.bullet, bold: false, italics: false, font: FONT },
          paragraph: {
            spacing: { after: SP.bulletAfter, line: SP.bulletLine, lineRule: 'auto' },
            indent: { left: 270, hanging: 270 },
          },
        },
      ],
    },

    numbering: {
      config: [{
        reference: 'bullets-main',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '○',
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: { indent: { left: 720, hanging: 360 } },
            run: { font: FONT },
          },
        }],
      }],
    },

    sections: [
      {
        properties: {
          page: PAGE,
          column: { count: 2, space: 270 },
        },
        children: buildHeaderParas(headerData),
      },
      {
        properties: {
          type: SectionType.CONTINUOUS,
          page: PAGE,
        },
        children: buildBodyParas(lines),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputFile, buffer);
  console.log('✓ Written: ' + outputFile + '  (' + (buffer.length / 1024).toFixed(1) + ' KB)');
}

main().catch(function (err) {
  console.error('Error:', err.message);
  process.exit(1);
});
