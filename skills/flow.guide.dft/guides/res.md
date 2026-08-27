# dft res

Utilities for inspecting and navigating warehouse artifacts.

## Key Capabilities

- **Artifact resolution** — resolve short IDs (`NCPT-0042`, `NCPE-TURBINE-SYNC`) to absolute file paths
- **Frontmatter extraction** — parse TOML frontmatter from task, epic, and size files
- **Batch operations** — resolve and extract multiple artifacts in one call

## Short ID Format

| Format | Resolves To |
|--------|-------------|
| `NCPT-XXXX` | `govern/working/*/NCPT-XXXX-*/task.md` |
| `NCPE-SLUG` | `specification/epics/NCPE-SLUG.md` |

## Common Usage

```bash
dft res fm NCPT-0042             # Extract frontmatter for a task
dft res fm NCPE-TURBINE-SYNC     # Extract frontmatter for an epic
dft res fm NCPT-0042 ./some.md   # Batch: mix short IDs and file paths
```

## Safety

- **Read-only** — safe for autonomous use
- Never modifies files or warehouse state

## Deeper Documentation

```bash
dft res --llm
```
