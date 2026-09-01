# Truth Hierarchy: [Name]

**Status**: Draft | Validated | Re-validated
**Created**: [YYYY-MM-DD]
**Last Validated**: [YYYY-MM-DD]
**Validated By**: [Architect name]
**Domain**: [Domain name — references domain profile for authority pattern guidance]

---

## Authority Map

Authority patterns suggested by domain profile: [list from domain profile, or "none — first engagement in this domain"]

| # | Authority | Scope | Consumers | Constraints | Evidence |
|---|----------|-------|-----------|-------------|----------|
| 1 | [What truth does this authority own?] | [What decisions/data does this authority cover?] | [Who depends on this truth?] | [What rules govern this authority?] | [OBSERVED] / [INFERRED] / [ASSUMED] |

**Note**: Authority categories are domain-specific. Examples:
- Healthcare: Clinical source of record, Consent authority, Formulary authority
- Payments: Transaction source of truth, Reconciliation authority, Release governance
- Logistics: Fleet state authority, Route optimization authority, Delivery confirmation authority
- ML/AI: Training data lineage, Model registry authority, Serving configuration authority

---

## Document Classification

| # | Document | Type | Classification | Rationale |
|---|----------|------|---------------|-----------|
| 1 | [Document name] | PRD / HLD / Adjacent HLD / Scope Statement / Glossary | Canonical / Directional | [Why this classification] |

**Canonical** — authoritative, changes require formal approval
**Directional** — informative, may evolve without formal gate

---

## Authority Conflicts (if any)

| # | Conflict | Domain A Claims | Domain B Claims | Resolution | Status |
|---|----------|----------------|-----------------|------------|--------|
| 1 | [What is contested] | [Domain A's claim] | [Domain B's claim] | [How resolved or who to escalate to] | Resolved / Open |

---

## Re-validation History

| Date | Trigger | Changes | Approved By |
|------|---------|---------|-------------|
| [YYYY-MM-DD] | [What triggered re-validation — e.g., feedback item proposing authority change] | [What changed or "No changes — hierarchy confirmed"] | [Architect] |

---

## Enrichment Log

| Date | Change | Source | Updated By |
|------|--------|--------|------------|
| [YYYY-MM-DD] | [What changed] | [What triggered the change] | [Who made it] |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | [YYYY-MM-DD] | [Author] | Initial truth hierarchy from boundary mapping |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.boundary-mapping:0.1.2:2026-09-01T08:21:27Z -->
