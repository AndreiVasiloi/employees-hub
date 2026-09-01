# Design Sketch: [HLD Name]

**Date**: [YYYY-MM-DD]
**Status**: Draft | Direction Approved
**Iteration**: [N]
**Architect**: [Name]
**Slug**: [slug]

---

## 1. Service Boundary

**Proposed boundary**: [Description of what this service encompasses]
**Justification**: [Why this boundary — based on ownership matrix and domain analysis]

**Includes**:
- [Capability 1] — [VALIDATED] / [ASSUMPTION]
- [Capability 2] — [VALIDATED] / [ASSUMPTION]

**Excludes** (owned by other domains):
- [Capability] — owned by [Domain] per boundary map
- [Capability] — owned by [Domain] per boundary map

---

## 2. Module Map

| # | Module | Responsibility | Owns | Consumes | Produces | Evidence |
|---|--------|---------------|------|----------|----------|----------|
| 1 | [Module] | [Description] | [What] | [What] | [What] | [VALIDATED] / [ASSUMPTION] |

---

## 3. Runtime Trigger

- **What initiates the process**: [Event / API call / Schedule]
- **Source**: [Upstream domain or system]
- **Evidence**: [VALIDATED] / [ASSUMPTION]

---

## 4. Data Model Sketch

### Entities

| # | Entity | Key Fields | Source of Truth | Relationship | Evidence |
|---|--------|-----------|----------------|-------------|----------|
| 1 | [Entity] | [Fields] | [Domain / System] | [Relates to] | [VALIDATED] / [ASSUMPTION] |

### Authoritative Data Sources

| # | Input | Source | Authority Level | Contract Status | Evidence |
|---|-------|--------|----------------|-----------------|----------|
| 1 | [Input] | [Source] | Canonical / Provisional | Exists / Assumed | [VALIDATED] / [ASSUMPTION] |

---

## 5. Event Map

| # | Event | Direction | Owner | Consumer(s) | Schema Status | Evidence |
|---|-------|-----------|-------|-------------|---------------|----------|
| 1 | [Event] | Produced / Consumed | [Domain] | [Domain(s)] | Defined / Assumed | [VALIDATED] / [ASSUMPTION] |

---

## 6. API Contracts

| # | API | Direction | Purpose | Contract Status | Evidence |
|---|-----|-----------|---------|-----------------|----------|
| 1 | [API] | Upstream / Downstream | [Purpose] | Exists / Needs Creation | [VALIDATED] / [ASSUMPTION] |

---

## 7. Architectural Decision Points

### Decision 1: [Title]

**Context**: [Why this decision matters]

| Option | Description | Pros | Cons | Evidence |
|--------|------------|------|------|----------|
| A | [Description] | [Advantages] | [Disadvantages] | [VALIDATED] / [ASSUMPTION] |
| B | [Description] | [Advantages] | [Disadvantages] | [VALIDATED] / [ASSUMPTION] |

**Agent recommendation**: [If clear winner, state it. Otherwise: "Architect to decide — tradeoffs are balanced."]
**Architect selection**: [To be filled during calibration]

---

## 8. Open Questions

| # | Question | Source Step | Impact | Blocking? | Proposed Resolution |
|---|----------|-----------|--------|-----------|-------------------|
| 1 | [Question] | Step [N] | [What it affects] | Yes / No | [How to resolve] |

---

## 9. Assumptions Register

| # | Assumption | Source Step | Evidence Level | Risk if Wrong |
|---|-----------|-----------|---------------|---------------|
| 1 | [Assumption] | Step [N] | INFERRED / ASSUMED | [Impact] |

---

## 10. Evaluation Criteria Log

| Date | Type | Change | Impact |
|------|------|--------|--------|
| [Date] | Content Correction / Eval Function Reset / Context Injection | [What changed] | [How approach shifted] |

---

## 11. Enrichment Log

| Date | Change | Source | Updated By |
|------|--------|--------|------------|
| [YYYY-MM-DD] | [What changed] | [What triggered the change] | [Who made it] |

---

## 12. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | [YYYY-MM-DD] | [Author] | Initial design sketch |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.design-sketch:0.1.2:2026-09-01T08:21:27Z -->
