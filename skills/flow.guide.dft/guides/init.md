# dft init

Scaffold a new Dava.Flow Context Warehouse with phase-aligned directory structure.

## Usage

```bash
dft init [path]            # Defaults to current directory
dft init . --remote <url>  # Init with remote configured
```

## What It Creates

- `.flow/` — Turbine config and skills manifest
- `signal/`, `explore/`, `govern/`, `evolve/` — Phase-aligned folders
- `work/01-pending-planning/` through `work/06-released/` — Task workflow buckets
- `skills/` — Installed skill packages
- `AGENTS.md`, `README.md` — Generated artifacts
- Default skill profile installed

## Safety

- **Only runs in empty directories** or empty Git repos
- **Never overwrites** existing files — fails fast on non-empty dirs
- **Safe re-run** on already-initialised warehouses — warns and exits cleanly
- **Offline degradation** — completes without skills if registry unreachable

## Deeper Documentation

```bash
dft init --llm
```
