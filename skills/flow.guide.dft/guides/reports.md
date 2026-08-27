# dft reports

Generate reporting artifacts and metrics for the warehouse.

## Commands

| Command | Type | Purpose |
|---------|------|---------|
| `dft reports numbers` | Read-only | Generate velocity and sprint metrics (TOML output to stdout) |

## `dft reports numbers`

Full pipeline: scan tasks → calculate metrics → format → stdout.

### Key Flags

- `--start YYYY-MM-DD` — Override period start (default: previous ISO week Monday)
- `--end YYYY-MM-DD` — Override period end (default: previous ISO week Sunday)
- `--sprint-days N` — Sprint length in days; enables sprint windowing
- `--sprint-end YYYY-MM-DD` — Sprint end date (inclusive)

### Output Sections

- `[metadata]` — Report metadata (generated at, period, task count)
- `[tasks.NCPT-XXXX]` — Per-task metrics (story points, earned points, rolling points)
- `[totals.period]` — Period aggregates (velocity, earned/rolling story points)
- `[totals.sprint_starting_YYMMDD]` — Sprint window totals (when sprint windowing active)
- `[team."email@example.com"]` — Per-person metrics (when assignments present)

### Key Metrics

- **earned_points** — story points for tasks completed within the period
- **rolling_points** — proportional story points based on overlap with period
- **velocity** — earned_points / window_days
- **rolling_velocity** — rolling_points / window_days

## Deeper Documentation

```bash
dft reports --llm
```
