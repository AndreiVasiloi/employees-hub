+++
name = "explore.util.document-ingestion"
description = "Use this skill when you need to convert PDF, DOCX, or PPTX files into Markdown for use as source material in explore activities, signal capture, or specifications. Can be loaded at any point during any session. Also relevant when someone says 'import this document,' 'convert this PDF,' or 'I have a file to share.' Does NOT analyze or interpret document content — it converts format only. Use the appropriate explore skill to process the converted content."
license = "Proprietary. See LICENSE.md"
+++

# Document Ingestion

Convert PDF, DOCX, and PPTX files into Markdown for use in context warehouse processes, specifications, and LLM context loading.

## When to Use

Use this skill when you need a **repeatable** conversion of binary documents (PDF, DOCX, PPTX) into Markdown files that can be consumed by context warehouse processes, specifications, and LLM context loading.

## Pre-Check

If a converted `.md` file already exists at `explore/sources/<filename>.md` for a given input:
1. Check the `converted_date` in the frontmatter against the source file's last-modified date
2. If source is unchanged → skip conversion, inform the user the existing conversion is current
3. If source is newer → re-run extraction and overwrite the existing `.md`

## Inputs to Request (if missing)

- Source file path(s) — PDF, DOCX, or PPTX files to convert
- Target output directory (default: `explore/sources/`)
- Preservation preferences — whether images, tables, slide notes, and structure should be preserved

## Procedure

1. **Identify Source Documents**
   - Locate all target files (PDF, DOCX, or PPTX)
   - Validate that each file extension is one of `.pdf`, `.docx`, `.pptx`
   - Confirm the output directory with the user (default: `explore/sources/`)
   - **STOP**: If files are missing or a format is unsupported, request clarification before proceeding

2. **Run Extraction Tool**
   - Ensure dependencies are installed: `pip install -r tools/requirements-doc-to-md.txt`
   - Execute the tool for each source file:
     ```bash
     python tools/doc-to-md.py <input-file> --output-dir explore/sources/
     ```
   - The tool produces one `.md` file per input, with matching stem name
   - Images are extracted to `explore/sources/assets/` alongside the output `.md`
   - Report the output path(s) to the user

3. **Validate & Enrich Output**
   - Open the generated `.md` and verify structural accuracy: headings, lists, tables render correctly
   - Check the TOML frontmatter is complete (`source_file`, `source_format`, `converted_date`)
   - Fix any formatting artifacts (broken table alignment, orphan headings, garbled Unicode)
   - **STOP**: Present the converted file(s) to the user for review before proceeding

4. **Integrate into Context Warehouse**
   - Confirm final `.md` files are in `explore/sources/`
   - Add a reference to the new document in `explore/README.md` under a `## Source Documents` section (create the section if it does not exist)
   - Converted files are now available as source material for processes, explore activities, and specifications

## Output Format

**Template:** `templates/ingested-document.md`

For each input file, the tool produces a single Markdown file at `explore/sources/<filename>.md` containing:

- **TOML frontmatter** with `source_file`, `source_format`, `converted_date`, and format-specific metadata (`page_count`, `slide_count`, `image_count`)
- **Preserved document structure**: headings (H1–H6 for DOCX), slide headers (PPTX), page separators (PDF)
- **Tables**: rendered as Markdown pipe tables
- **Lists**: bullet and numbered lists preserved
- **Image references**: `![alt](assets/filename.ext)` pointing to `explore/sources/assets/`
- **Speaker notes** (PPTX only): rendered as Markdown blockquotes under each slide

Example frontmatter:
```toml
+++
source_file = "/path/to/report.docx"
source_format = "docx"
converted_date = "2026-02-27"
paragraph_count = 142
image_count = 4
+++
```

## Tool Reference

> ⚠️ **Dependency not yet available**: The files `tools/doc-to-md.py` and `tools/requirements-doc-to-md.txt` referenced below do not yet exist in this repository. They must be created or sourced before this skill can execute the automated extraction step. Until then, manual conversion or an alternative tool must be used.

The extraction tool lives in the shared tooling context warehouse:

```
tools/doc-to-md.py          — Python CLI script
tools/requirements-doc-to-md.txt — Pinned dependencies
```

**Install dependencies once:**
```bash
pip install -r tools/requirements-doc-to-md.txt
```

**Supported formats and extraction behaviour:**
| Format | Extracts |
|--------|----------|
| `.docx` | Headings (H1–H6), paragraphs, lists, tables, embedded images |
| `.pptx` | Slide titles, text frames, speaker notes (as blockquotes), embedded images |
| `.pdf`  | Text blocks, best-effort table extraction, page-break markers |

## Integration with Workflows

**Integrates with**:
- **Explore Activities** — Load converted client documents as source material before running activities
- **Signal Capture** — Convert attached artifacts into readable context for Signal Seeds
- **Task Specification** — Reference converted documents in `[sources]` blocks using `#L` line references
- **Ad-hoc sessions** — Load this skill and provide file paths at any point during any session

## Best Practices

**Do**:
- ✅ Run once, reuse many — converted `.md` files are available to all processes
- ✅ Validate before ingesting — always review output before referencing in a specification
- ✅ Commit conversions so all collaborators can reference them without original binary files
- ✅ Re-run on update — if the source document changes, re-run and overwrite the `.md`

**Don't**:
- ❌ Re-run unnecessarily if the source document hasn't changed
- ❌ Reference converted files without reviewing them first
- ❌ Assume binary extraction is perfect — always validate

## Gotchas

- ⚡ **Table extraction fragility**: PDF table extraction is best-effort and frequently produces garbled output (merged cells, misaligned columns). Always manually verify every extracted table — do not reference table data from converted PDFs without review.
- ⚡ **Image loss**: Embedded images in DOCX/PPTX may fail to extract if they use uncommon formats or are linked rather than embedded. Always check the `image_count` in frontmatter against the original document — missing images must be manually recovered.
- ⚡ **Unicode garbling**: Documents with special characters (accented text, mathematical symbols, non-Latin scripts) may produce encoding artifacts after conversion. Always scan the output for `?`, `â€`, or other encoding corruption markers before committing.
