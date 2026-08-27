# dft activity

Manage collaborative activity sessions between warehouse files and external collaboration tools (e.g., Miro boards).

## Commands

| Command | Type | Purpose |
|---------|------|---------|
| `dft activity start <file>` | Mutating | Create external board and bind to file |
| `dft activity sync <file>` | Mutating | Fetch content from board back to file |
| `dft activity list` | Read-only | Show all activity bindings |
| `dft activity status <file>` | Read-only | Show detailed binding for a file |
| `dft activity unbind <file>` | Local mutating | Archive a binding (does NOT delete external board) |

## Binding Lifecycle

```
active → completed → archived
```

- **start** creates a binding and external board
- **sync** pulls content back, transitions to completed (unless `--keep-active`)
- **unbind** archives locally — external board remains untouched

## Key Flags

- `--provider <name>` — target specific provider
- `--dry-run` — preview sync changes without writing (on `sync`)
- `--keep-active` — keep binding active after sync
- `--all` — archive all bindings for a file (on `unbind`)

## Safety

- `list` and `status` are read-only — safe for autonomous use
- `start` and `sync` make external API calls — require human approval
- Content size limit: warning at 10K chars, hard limit at 12K (Miro)

## Deeper Documentation

```bash
dft activity --llm
```
