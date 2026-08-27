# dft config

Configuration and validation for Turbine and warehouse settings.

## Commands

| Command | Type | Purpose |
|---------|------|---------|
| `dft config check` | Read-only | Validate the warehouse's configuration files and settings |

## `dft config check`

Validates `.flow/config.toml` and related configuration. Reports errors but does not attempt to fix them.

### Usage

```bash
dft config check
```

### Safety

- **Read-only** — safe for autonomous use
- Reports validation errors to stderr
- Human review required before making config changes

## Deeper Documentation

```bash
dft config --llm
```
