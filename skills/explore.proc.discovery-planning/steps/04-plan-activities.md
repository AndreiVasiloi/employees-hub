# Step 4: Plan Discovery Activities

## Objective

Break discovery into phases with detailed activity tables including codes, owners, dependencies, outputs, and what each activity closes.

## Entry Criteria

- [ ] Step 3 (Solution Profile) complete with domains documented

## Actions

### 4.1 Define Phased Activities

Create activity tables for each phase:

```
Planned Activities

Phase 1: Context & Stakeholder (Week 1)

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A1 | Stakeholder identification & kick-off | PM | None | Stakeholder map with roles | Open Q#, AS-# |
| A2 | Build context baseline | PM | A1 | Context document with domain model, system map | AS-#, Open Q# |
| A3 | Create personas | UX Designer | A2 | Persona set document | AS-#, Open Q# |
| A4 | Map current-state journeys | UX Designer | A3 | Journey maps | Open Q# |
| A5 | Draft hypothesis | PM | A2, A3, A4 | Hypothesis document | AS-#, Open Q# |

Phase 2: Solution Design (Weeks 2-3)

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A6 | Create HLD | Architect | A5 | High-Level Design | AT-#, Open Q# |
| A7 | Document ADRs | Architect | A6 | Architecture Decision Records | AT-#, Open Q# |
| A8 | Update journey maps (future-state) | UX Designer | A6 | Updated journey maps with future-state | Open Q# |
| A9 | Create user flows | UX Designer | A6, A8 | User flow set document | Open Q# |
| A10 | Create risk register | PM | A6, A7 | Risk register | Open Q# |

Phase 3: Specification (Week 4)

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A11 | Generate PRD | PM | All Phase 1-2 | Complete PRD | — |
| A12 | Run consistency check | PM | A11 | Validation report | — |
| A13 | Form epics | PM | A11 | Epic breakdown | — |
| A14 | Govern readiness check | PM | A11, A12, A13 | Readiness confirmation | — |

Note: 
- Code = Activity identifier (A1, A2, etc.)
- Owner = Role responsible (PM, Architect, UX Designer, etc.)
- Dependencies = Which activities must complete first (None, or A# codes)
- Output = Deliverable produced
- What it closes = Which Open Questions (Q#) or Assumptions (AS-#, AT-#, etc.) this resolves
```

## Exit Criteria

- [ ] All activities coded (A1, A2, etc.)
- [ ] Dependencies mapped between activities
- [ ] Each activity has owner, output, and what it closes
- [ ] Activities organized into logical phases

## Next Step

→ [05-open-questions.md](./05-open-questions.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.discovery-planning:0.1.2:2026-08-27T13:21:11Z -->
