#!/usr/bin/env python3
"""
Merge a resume body PDF with the Nunito 2026 Template header.

Usage:
    python3 resume-export/merge-resume-with-template.py <body.pdf> <output.pdf>

The template header (name, subtitle, contact, HR line) is preserved.
Placeholder content below the header is stripped before merging.
Multi-page body PDFs are supported: template header only on page 1.
"""

import sys
import io
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DecodedStreamObject

SCRIPT_DIR = Path(__file__).resolve().parent
TEMPLATE = SCRIPT_DIR / "template" / "Nunito 2026 Template.pdf"


def strip_template_placeholder(template_path: Path) -> io.BytesIO:
    """
    Remove placeholder content from the template, keeping only the header
    (name, subtitle, contact info, HR line) and link underline annotations.
    """
    reader = PdfReader(str(template_path))
    page = reader.pages[0]

    contents = page["/Contents"]
    if hasattr(contents, 'get_data'):
        raw = contents.get_object().get_data()
    else:
        parts = []
        for obj in contents:
            parts.append(obj.get_object().get_data())
        raw = b''.join(parts)

    data = raw.decode('latin-1')

    placeholder_start = data.find('q\n.75 0 0 .75 50.399998 106.200005')
    if placeholder_start == -1:
        placeholder_start = data.find('q\r\n.75 0 0 .75 50.399998 106.200005')

    link_underlines_start = data.find('q\n305.02502 0 290.47498 842.25 re')
    if link_underlines_start == -1:
        link_underlines_start = data.find('q\r\n305.02502 0 290.47498 842.25 re')

    if placeholder_start > 0 and link_underlines_start > placeholder_start:
        cleaned = data[:placeholder_start] + data[link_underlines_start:]
    else:
        print("WARNING: Could not find placeholder boundaries — using full template.")
        cleaned = data

    if hasattr(contents, 'get_data'):
        contents.get_object().set_data(cleaned.encode('latin-1'))
    else:
        new_stream = DecodedStreamObject()
        new_stream.set_data(cleaned.encode('latin-1'))
        page["/Contents"] = new_stream

    buf = io.BytesIO()
    writer = PdfWriter()
    writer.add_page(page)
    writer.write(buf)
    buf.seek(0)
    return buf


def merge(body_path: str, output_path: str):
    if not TEMPLATE.exists():
        print(f"ERROR: Template not found: {TEMPLATE}")
        sys.exit(1)

    template_buf = strip_template_placeholder(TEMPLATE)
    clean_template = PdfReader(template_buf)
    body_pdf = PdfReader(body_path)

    writer = PdfWriter()

    first_page = clean_template.pages[0]
    first_page.merge_page(body_pdf.pages[0])
    writer.add_page(first_page)

    for i in range(1, len(body_pdf.pages)):
        writer.add_page(body_pdf.pages[i])

    with open(output_path, 'wb') as f:
        writer.write(f)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python3 resume-export/merge-resume-with-template.py <body.pdf> <output.pdf>")
        sys.exit(1)
    merge(sys.argv[1], sys.argv[2])
    print(f"✓ Merged: {sys.argv[2]}")
