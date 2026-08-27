# dft aux

Auxiliary tools for reporting flows and content generation.

## Commands

| Command | Type | Purpose |
|---------|------|---------|
| `dft aux videogen <slides.md>` | Mutating | Generate video artifacts from Markdown slide decks |
| `dft aux pdfgen <file.md>` | Mutating | Generate branded Endava PDFs from Markdown |

## `dft aux videogen`

Transforms Markdown slide decks into narration scripts, manifests, and timing hints.

- Creates `.videogen/` working directory next to the deck
- Output goes to `<deck-dir>/videogen/<run-id>/`
- Each run creates a new versioned directory (immutable history)
- Does NOT modify the original slide deck

### Key Flags

None for 0.1 — just provide the path to the Markdown file.

## `dft aux pdfgen`

Generates branded Endava PDFs from Markdown files.

### Key Flags

- `--title-page` — Include a title page
- `--toc` — Include table of contents
- `--toc-depth N` — TOC heading depth
- `--author <name>` — Author name
- `--subtitle <text>` — Subtitle
- `--header <text>` — Page header
- `--footer <text>` — Page footer
- `-o <path>` — Output file path

## Safety

- **Non-destructive** — does not modify warehouse state or source files
- **Resource intensive** — video generation consumes CPU and disk
- Safe for autonomous use when pointed at existing decks

## Deeper Documentation

```bash
dft aux --llm
```
