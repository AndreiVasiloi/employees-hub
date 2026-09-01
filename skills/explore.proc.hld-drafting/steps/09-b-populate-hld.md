# Step 09b: Populate HLD

**Mode**: `baseline` only

## Objective

Fill all 13 sections of the HLD template with evidence drawn from the existing system context loaded in Step 08b. Tag every claim with `OBS`, `INF`, or `ASM`.

## Entry Criteria

- [ ] Step 08b complete — template loaded and context artifacts mapped

## Actions

### 09b.1 Evidence Tagging Rules

Before populating each section, apply these labels to every claim:

| Label | Meaning |
|-------|---------|
| `OBS` | Confirmed by direct evidence (existing docs, system map, stakeholder interviews) |
| `INF` | Logically inferred from observed facts — not directly confirmed |
| `ASM` | Assumed — believed true but not yet validated; needs verification |

No claim may be left untagged.

### 09b.2 Populate All 13 Sections

Work through each section in order. For each:
- Use evidence from loaded artifacts (Step 08b.2 mapping)
- Tag every non-trivial claim
- Where evidence is insufficient, write the section stub and tag with `ASM`

| Section | Key Questions to Answer | Primary Evidence Source |
|---------|------------------------|------------------------|
| 1. Executive Summary | What does this system do? Why does it exist? What are the top 3–5 architecture decisions already made? | `context.md`, existing ADRs |
| 2. System Overview | Who uses it? What are its main capabilities? What is its system boundary? | `context.md`, `system-map.md` |
| 3. Architecture Principles | What principles govern this system's design? Any known deviations? | Existing ADRs, engineering standards |
| 4. Technology Stack | What languages, frameworks, databases, and cloud services are in use? | `technical-feasibility.md`, source repos |
| 5. High-Level Architecture | What are the main services/containers? How do they interact? | `system-map.md`, `context.md` |
| 6. Component Architecture | What are the internal components? What are their responsibilities? | Source repos, technical docs |
| 7. Runtime View | What are the key flows? What happens in the main happy path? | `domain-analysis.md`, existing docs |
| 8. Data & Domain Model | What domain concepts does this system own? What is persisted? | `domain-analysis.md` |
| 9. Quality Attributes | What are the known performance, security, and scalability characteristics? | `technical-feasibility.md`, `risks.md` |
| 10. Operational Concerns | How is this system deployed and operated? | Infrastructure docs, existing runbooks |
| 11. API & Integration Contracts | What APIs does it expose? What does it consume? | `system-map.md`, API docs |
| 12. Risks, Trade-offs, Open Questions | What risks are known? What trade-offs were made? What is unknown? | `risks.md`, existing ADRs |
| 13. Future Enhancements | What evolution is expected? What is deferred? | PRD out-of-scope items, backlog |

### 09b.3 Flag Sections Needing Human Input

If any section cannot be populated even at `ASM` confidence, flag it explicitly:

```
> ⚠️ Section [N] requires human input: [specific question]
```

Collect all such flags and present them as a consolidated list in the next step.

## Exit Criteria

- [ ] All 13 sections populated (stubs with `ASM` tags acceptable where evidence is missing)
- [ ] Every claim tagged with `OBS`, `INF`, or `ASM`
- [ ] Human-input flags collected

## Next Step

→ [10-b-present-hld.md](./10-b-present-hld.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
