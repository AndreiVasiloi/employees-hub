# Step 1: Phase Routing

**Objective**: Present the Dava.Flow phase menu, capture the user's selection, and hand off to the appropriate phase agent.

**Entry Criteria**: User triggered the Flow Agent via "Let's Flow", `/flow`, or `$flow`.

**Exit Criteria**: User has selected a phase and the appropriate phase agent has been loaded and started.

---

## Pre-Routing: Setup Detection

Before presenting the phase menu, check whether the warehouse requires first-run setup.

1. Read `.flow/config.toml`
2. If the file cannot be found OR `pending_setup = true`:
   a. Announce: "Warehouse setup is not yet complete. Starting flow.proc.setup..."
   b. Check whether `flow.proc.setup` is installed in `skills/`
   c. If not installed: run `dft skills add flow.proc.setup`
   d. Load and start `flow.proc.setup` — yield control; do NOT continue to the phase menu
3. If `pending_setup = false` or the key is absent: continue to the phase menu below

---

## Action: Present Phase Menu

Present the following question and options to the user. Use interactive options (clickable list) where the platform supports it; fall back to a numbered list otherwise.

```
Which Flow State do you want to work in?

1. Signal  — Capture a new observation, risk, or opportunity as a Signal Seed
2. Explore — Shape a problem into a solution through discovery and ideation
3. Govern  — Plan, implement, and review work through structured task management
4. Evolve  — Measure outcomes, reflect on delivery, and drive continuous improvement
```

---

## Routing

Based on the user's selection, load the corresponding phase agent:

| Selection | Agent Slug |
|-----------|------------|
| Signal    | `signal.agent` |
| Explore   | `explore.agent` |
| Govern    | `govern.agent` |
| Evolve    | `evolve.agent` |

Check whether the selected agent is installed in `skills/`. If it is not present, install it:

```
dft skills add <slug>
```

Once installed and loaded, announce the handoff:

```
Routing to [Phase] Agent.
---
```

Yield control to the phase agent. The phase agent is now the primary driver for the session.

---

## Exit

The Flow Agent's work is complete. Do NOT continue acting as the Flow Agent once the phase agent has been loaded.

---

## Related

- **Signal Agent**: `signal.agent`
- **Explore Agent**: `explore.agent`
- **Govern Agent**: `govern.agent`
- **Evolve Agent**: `evolve.agent`
