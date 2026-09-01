# Step 3: Extract Architecture Drivers

## Objective

Identify the functional drivers, quality attributes, and constraints that materially shape the architecture. Score and prioritize them to determine which drivers will dominate the design in solutioning.

## Entry Criteria

- [ ] Step 2 complete (or skipped per Fast Lane) — landscape captured

## Explore Type Gate

| Explore Type | Action |
|---|---|
| **Fast Lane** | ⚠️ Light — extract drivers from ingested documents and Explore artifacts only. No human elicitation. Confirm top 3–5 constraints. |
| **ERC** | ✅ Full driver extraction with human validation |
| **Diverge/Converge** | ✅ Full with tension analysis and PoC flagging |

## Actions

### 3.1 Capture Functional Drivers

From Explore artifacts (`context.md`, `technical-feasibility.md`, ingested documents) and landscape answers, identify the business capabilities and major functional building blocks:

- Core business capabilities the system must provide
- Key use cases and user journeys that drive architectural decisions
- Integration requirements with external systems
- Data processing and storage requirements
- Workflow and business process automation needs

For each functional driver, note:
- **Priority**: MUST / SHOULD / COULD
- **Complexity**: Low / Medium / High
- **Uncertainty**: Low (well-understood) / Medium (some unknowns) / High (major unknowns or blockers)
- **Dependencies**: on other capabilities or external systems

### 3.2 Capture Quality Attributes

Extract NFRs from `technical-feasibility.md` design guardrails and any available specification artifacts. For each quality attribute, demand a **measurable target** — reject vague statements like "high performance."

| Quality Attribute | What to Capture | Example Target |
|-------------------|----------------|----------------|
| **Performance** | Throughput, latency targets, peak load | p95 < 500ms for state transitions |
| **Scalability** | Growth expectations, scaling dimensions | 120 concurrent → 240 without rearchitecture |
| **Availability** | Uptime requirements, SLA targets, downtime windows | 99.5% Mon–Fri 07:00–19:00 |
| **Security** | AuthN, AuthZ, data protection, threat model | RBAC with 7 roles; server-side enforcement |
| **Resilience** | Failure modes, RPO/RTO, degradation strategy | Enrichment degraded mode; Outbox retry |
| **Observability** | Logging, metrics, tracing, alerting | Structured logging; distributed tracing |
| **Maintainability** | Change frequency, testability, team skills | 80% unit test coverage; TDD workflow |
| **Extensibility** | Plugin points, API-first, future phases | New enrichment providers without core changes |
| **Compliance** | Regulatory frameworks, audit trail, data residency | FCA SMCR immutable audit log; GDPR DPAs |
| **Accessibility** | WCAG level, keyboard navigation, screen reader | WCAG 2.2 AA; keyboard-only for all flows |

For each quality attribute:
- Define the **measurable target** with units
- Identify which **stakeholder** owns or cares most about it
- Note **trade-offs** with competing quality attributes
- Reference the source artifact and section

### 3.3 Capture Constraints

Document architecture-shaping constraints consolidating all sources:

| Constraint Type | Sources |
|-----------------|---------|
| **Platform constraints** | `technical-feasibility.md`, ingested infra docs |
| **Technology constraints** | `technical-feasibility.md`, AQ-010 answer |
| **Skills constraints** | `context.md` team map, landscape maturity assessment |
| **Procurement constraints** | `context.md` budget/vendor constraints |
| **Standards constraints** | Ingested enterprise architecture docs |
| **Regulatory constraints** | `regulatory-compliance.md`, AQ-011 answer |
| **Delivery constraints** | `context.md` timeline, AQ-002 answer |
| **Legacy constraints** | Step 1 existing-state baseline, ingested docs |

For each constraint, classify:
- **Hard constraint**: non-negotiable, must be respected
- **Soft constraint**: preferred but negotiable with justification

### 3.4 Score and Prioritize Architecture Drivers

Create a ranked driver matrix:

| Rank | Driver | Type | Impact | Uncertainty | Tension With | Source |
|------|--------|------|--------|-------------|-------------|--------|
| 1 | [driver] | Functional / QA / Constraint | High/Med/Low | High/Med/Low | [competing driver] | [OBS/INF/ASM] [artifact] |
| 2 | ... | ... | ... | ... | ... | ... |

Rules:
- List the **top 5–10 drivers** that will shape major architecture decisions
- Identify which drivers are **in tension** with each other (e.g., compliance audit-first vs response time)
- High-uncertainty drivers may require **PoC validation** in solutioning — flag them
- Tag every driver with evidence label and source artifact

## Checkpoint

**STOP — AskUserQuestion** (skip for Fast Lane — present summary only):

```
Question AC-3
  Header:      "Architecture Drivers Review"
  Question:    "I've extracted architecture drivers from Explore artifacts and client documents:
                Functional drivers: [N] (MUST: [N], SHOULD: [N], COULD: [N])
                Quality attributes: [N] with measurable targets
                Constraints: [N] hard, [N] soft
                
                Top drivers (ranked):
                1. [driver] — [type] — tension with [competing driver]
                2. [driver] — [type] — tension with [competing driver]
                ...
                
                High-uncertainty items needing PoC: [N]
                
                Please validate these architecture drivers."
  Multi-select: No
  Options:
    - Validated — drivers are correct and prioritized; proceed to domain modeling
    - Adjust priorities — ranking needs changes
    - Missing drivers — I have additional drivers to add
```

## Exit Criteria

- [ ] Functional drivers captured with priorities, complexity, and uncertainty
- [ ] Quality attributes captured with measurable targets and source references
- [ ] Constraints documented and classified (hard / soft)
- [ ] Top 5–10 architecture drivers scored and ranked
- [ ] Tensions between competing drivers identified
- [ ] All drivers evidence-labeled (OBS/INF/ASM) with source artifact
- [ ] Human has validated the prioritized driver list (ERC, D/C) or summary confirmed (FL)

## Next Step

→ [04-model-domain.md](./04-model-domain.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-context:1.0.1:2026-08-27T13:34:38Z -->
