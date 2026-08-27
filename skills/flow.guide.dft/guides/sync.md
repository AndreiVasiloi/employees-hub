# dft sync

Sync warehouse state with external systems (JIRA, GitHub Issues, etc.).

## Usage

```bash
dft sync <profile-id>                    # Sync a single profile
dft sync backlog,triage                  # Sync multiple profiles
dft sync jira --ticket-path 0001-task    # Sync a specific ticket
```

## Profiles

Defined in `.flow/config.toml` under `[sync.profiles]`. Each profile specifies:
- **kind** — connector type (jira, figma, confluence)
- **url** — instance endpoint
- **project** — target project/workspace
- Credentials via environment variables (never stored in plain text)

## Error Categories

| Category | Meaning |
|----------|---------|
| `ConfigError` | Missing or misconfigured profile |
| `ConnectorError` | Network, auth, or API failure |
| `MappingError` | Field mapping or workflow transition failure |
| `UnknownError` | Uncategorised — needs investigation |

## Safety

- **Mutating** — creates, updates, or deletes external artifacts
- **Always requires human approval** before execution
- **Idempotent** — safe to re-run
- **Never log credentials**

## Deeper Documentation

```bash
dft sync --llm
```
