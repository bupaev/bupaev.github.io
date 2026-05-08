#!/usr/bin/env node
/**
 * md-to-pdf.js
 * Converts the resume Markdown (public/paul-buramensky-resume.md) to a
 * PDF whose body styling matches the DOCX output. The branded header is
 * pulled from resume-export/template/Nunito 2026 Template.pdf via the
 * Python merge helper.
 *
 * Usage:
 *   node resume-export/md-to-pdf.js [input.md] [output.pdf]
 *   node resume-export/md-to-pdf.js             # defaults to public/paul-buramensky-resume.md
 *
 * Requires: npm install  +  python3 with pypdf installed
 */

'use strict';

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const MERGE_SCRIPT = path.join(__dirname, 'merge-resume-with-template.py');
const FONTS_DIR = path.join(__dirname, 'fonts');
const FONT_FILES = {
  regular: path.join(FONTS_DIR, 'Nunito-Regular.ttf'),
  bold: path.join(FONTS_DIR, 'Nunito-Bold.ttf'),
  medium: path.join(FONTS_DIR, 'Nunito-Medium.ttf'),
  italic: path.join(FONTS_DIR, 'Nunito-Italic.ttf'),
};

const PT = {
  h1: 24, h2: 12, h3: 12, body: 11, contact: 10,
  skills: 10.5, bullet: 10, plain: 10.5, lang: 11,
};

const C = {
  dark: '#193B5E', body: '#1A1A2E', accent: '#6094C3',
  muted: '#999999', grey: '#434343', hr: '#D9D9D9', link: '#1155CC',
};

const SP = {
  h1After: 2, h2Before: 12, h2After: 3,
  h2SumBefore: 6, h3Before: 6, h3First: 0,
  h3EarlierBefore: 8, h3EarlierAfter: 6, italicAfter: 5,
  bulletAfter: 3, plainAfter: 3,
};

const PAGE = {
  width: 595.28, height: 841.89,
  top: 28.35, bottom: 28.35, left: 50.4, right: 36,
};
const CONTENT_WIDTH = PAGE.width - PAGE.left - PAGE.right;
const BULLET_LEFT = 9;

function unescapeMd(text) {
  return text.replace(/\\([\\`*_{}[\]()#+\-.!|])/g, '$1');
}

function parseInline(text, outerBold, outerItalic) {
  const tokens = [];
  const re = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let cursor = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > cursor) {
      tokens.push({ text: unescapeMd(text.slice(cursor, m.index)), bold: outerBold, italic: outerItalic });
    }
    if (m[1]) {
      parseInline(m[1], true, true).forEach(function (t) { t.bold = true; t.italic = true; tokens.push(t); });
    } else if (m[2]) {
      parseInline(m[2], true, outerItalic).forEach(function (t) { t.bold = true; tokens.push(t); });
    } else if (m[3]) {
      parseInline(m[3], outerBold, true).forEach(function (t) { t.italic = true; tokens.push(t); });
    } else if (m[4]) {
      tokens.push({ text: unescapeMd(m[4]), link: m[5], bold: outerBold, italic: outerItalic });
    }
    cursor = re.lastIndex;
  }
  if (cursor < text.length) {
    tokens.push({ text: unescapeMd(text.slice(cursor)), bold: outerBold, italic: outerItalic });
  }
  return tokens.filter(function (t) { return t.text && t.text.length > 0; });
}

function stripFrontmatter(raw) {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\r?\n/, '');
}

function createPDF(lines, outputFile) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: PAGE.top, bottom: PAGE.bottom, left: PAGE.left, right: PAGE.right },
    info: { Title: 'Paul Buramensky – Resume', Author: 'Paul Buramensky' },
  });

  doc.registerFont('Nunito', FONT_FILES.regular);
  doc.registerFont('Nunito-Bold', FONT_FILES.bold);
  doc.registerFont('Nunito-Medium', FONT_FILES.medium);
  doc.registerFont('Nunito-Italic', FONT_FILES.italic);

  const stream = fs.createWriteStream(outputFile);
  doc.pipe(stream);

  function fontName(bold, italic) {
    if (bold) return 'Nunito-Bold';
    if (italic) return 'Nunito-Italic';
    return 'Nunito';
  }

  function ensureSpace(needed) {
    if (doc.y + needed > PAGE.height - PAGE.bottom) {
      doc.addPage();
    }
  }

  function renderTokens(tokens, size, color, opts) {
    opts = opts || {};
    if (!tokens.length) return;

    const width = opts.width || CONTENT_WIDTH;
    const x = opts.x != null ? opts.x : PAGE.left;
    const lineGap = opts.lineGap || 0;

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      const isLast = i === tokens.length - 1;
      const bold = opts.bold || t.bold || false;
      const italic = t.italic || false;
      const c = t.link ? C.link : (t.color || color);
      const fn = fontName(bold, italic);

      const textOpts = {
        continued: !isLast,
        width: width,
        lineGap: lineGap,
      };

      if (t.link) {
        textOpts.underline = true;
        textOpts.link = t.link;
      } else {
        textOpts.underline = false;
      }

      if (i === 0) {
        doc.font(fn).fontSize(size).fillColor(c);
        doc.text(t.text, x, doc.y, textOpts);
      } else {
        doc.font(fn).fontSize(size).fillColor(c);
        doc.text(t.text, textOpts);
      }
    }
  }

  function pipeSplitTokens(rawText, pipeColor) {
    const parts = rawText.split(' | ');
    const tokens = [];
    parts.forEach(function (part, i) {
      if (i > 0) tokens.push({ text: ' | ', color: pipeColor });
      parseInline(part.trim()).forEach(function (t) { tokens.push(t); });
    });
    return tokens;
  }

  doc.y = 120;

  const bodyStart = lines.findIndex(function (l) { return l.startsWith('## '); });
  if (bodyStart === -1) { doc.end(); return streamDone(stream); }

  let h2Count = 0, h3Count = 0, section = '';

  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i].trimEnd();
    if (!line) continue;

    if (line.startsWith('## ')) {
      const text = line.replace(/^## /, '').replace(/\*\*/g, '').trim();
      const lc = text.toLowerCase();
      h2Count++; h3Count = 0;
      section = lc.includes('skills') ? 'skills'
        : lc.includes('experience') ? 'experience'
          : lc.includes('education') ? 'education'
            : lc.includes('languages') ? 'languages'
              : 'other';

      const before = h2Count === 1 ? SP.h2SumBefore : SP.h2Before;
      ensureSpace(before + PT.h2 * 1.5 + SP.h2After);
      doc.y += before;
      doc.font('Nunito-Bold').fontSize(PT.h2).fillColor(C.dark);
      doc.text(text, PAGE.left, doc.y, { width: CONTENT_WIDTH });
      doc.y += SP.h2After;
      continue;
    }

    if (line.startsWith('### ')) {
      const rawText = line.replace(/^### /, '').trim();
      const plainText = rawText.replace(/\*\*/g, '');

      if (plainText === 'Earlier Career') {
        section = 'earlier';
        ensureSpace(SP.h3EarlierBefore + PT.h3 * 1.5 + SP.h3EarlierAfter);
        doc.y += SP.h3EarlierBefore;
        doc.font('Nunito-Bold').fontSize(PT.h3).fillColor(C.dark);
        doc.text('Earlier Career', PAGE.left, doc.y, { width: CONTENT_WIDTH });
        doc.y += SP.h3EarlierAfter;
        continue;
      }

      h3Count++;
      const before = (section === 'experience' && h3Count === 1) ? SP.h3First : SP.h3Before;
      ensureSpace(before + PT.h3 * 1.5);
      doc.y += before;
      const tokens = pipeSplitTokens(rawText, C.accent);
      renderTokens(tokens, PT.h3, C.dark);
      continue;
    }

    if (/^[–-]{5,}/.test(line)) continue;

    if (/^[*-] /.test(line)) {
      const text = line.replace(/^[*-] /, '');
      const isLang = section === 'languages';
      const size = isLang ? PT.lang : PT.bullet;
      const tokens = parseInline(text);

      ensureSpace(size * 3 + SP.bulletAfter);

      const bulletY = doc.y;
      const r = size * 0.2;
      const bx = PAGE.left + r + 0.5;
      const by = bulletY + size * 0.72;
      doc.save().circle(bx, by, r).lineWidth(0.7).stroke(C.body).restore();
      doc.y = bulletY;

      const naturalH = doc.font('Nunito').fontSize(size).currentLineHeight();
      const lineGap = size * 1.2 - naturalH;

      renderTokens(tokens, size, C.body, {
        x: PAGE.left + BULLET_LEFT,
        width: CONTENT_WIDTH - BULLET_LEFT,
        lineGap: lineGap,
      });
      doc.y += SP.bulletAfter;
      continue;
    }

    if (/^\*[^*]/.test(line) && line.endsWith('*')) {
      const text = line.slice(1, -1);
      ensureSpace(PT.bullet * 1.5 + SP.italicAfter);
      doc.font('Nunito-Italic').fontSize(PT.bullet).fillColor(C.grey);
      doc.text(text, PAGE.left, doc.y, { width: CONTENT_WIDTH });
      doc.y += SP.italicAfter;
      continue;
    }

    if (section === 'skills') {
      const sm = /^(\*\*[^*]+\*\*:?)(.*?)$/.exec(line);
      if (sm) {
        const label = sm[1].replace(/\*\*/g, '');
        const rest = sm[2] || '';
        const skillLineH = PT.skills * 1.4;
        ensureSpace(skillLineH * 2);
        const startY = doc.y;
        const tokens = [{ text: label, bold: true }];
        if (rest) tokens.push({ text: rest });
        renderTokens(tokens, PT.skills, C.body);
        doc.y = startY + skillLineH;
        continue;
      }
    }

    if (section === 'education') {
      ensureSpace(PT.plain * 1.5 + SP.plainAfter);
      renderTokens(parseInline(line), PT.plain, C.body);
      doc.y += SP.plainAfter;
      continue;
    }

    if (section === 'earlier') {
      ensureSpace(PT.plain * 1.5 + SP.plainAfter);
      renderTokens(parseInline(line), PT.plain, C.body);
      doc.y += SP.plainAfter;
      continue;
    }

    ensureSpace(PT.skills * 2);
    renderTokens(parseInline(line), PT.skills, C.body);
  }

  doc.end();
  return streamDone(stream);
}

function streamDone(stream) {
  return new Promise(function (resolve, reject) {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function main() {
  const inputFile = process.argv[2] || path.join(PROJECT_ROOT, 'public/paul-buramensky-resume.md');
  const outputFile = process.argv[3] || inputFile.replace(/\.md$/i, '.pdf');

  if (!fs.existsSync(inputFile)) {
    console.error('File not found: ' + inputFile);
    process.exit(1);
  }

  Object.keys(FONT_FILES).forEach(function (key) {
    if (!fs.existsSync(FONT_FILES[key])) {
      console.error('Font not found: ' + FONT_FILES[key]);
      process.exit(1);
    }
  });

  const raw = fs.readFileSync(inputFile, 'utf8');
  const lines = stripFrontmatter(raw).split('\n');
  console.log('Reading  : ' + inputFile + '  (' + lines.length + ' lines)');

  const bodyFile = outputFile.replace(/\.pdf$/i, '_body.pdf');
  await createPDF(lines, bodyFile);

  execSync('python3 "' + MERGE_SCRIPT + '" "' + bodyFile + '" "' + outputFile + '"', { stdio: 'inherit' });
  fs.unlinkSync(bodyFile);

  const stat = fs.statSync(outputFile);
  console.log('✓ Written: ' + outputFile + '  (' + (stat.size / 1024).toFixed(1) + ' KB)');
}

main().catch(function (err) {
  console.error('Error:', err.message);
  process.exit(1);
});
