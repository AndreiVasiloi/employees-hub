# Retained Outcomes: [Name]

**Date**: [YYYY-MM-DD]
**Original HLD**: `[slug]-hld.md`
**Redesign Reason**: [Brief description of the fundamental architectural flaw]
**Authorized By**: [Architect name]

---

## Redesign Context

**What triggered the redesign**: [Description of the fundamental flaw identified during hardening]

**Why incremental correction is insufficient**: [Explanation of why patching won't work — the approach itself is wrong]

**What the replacement must achieve**: [The same functional goals, but via a different architectural approach]

---

## Retained Outcomes

### Decisions That Remain Valid

| # | Decision | Original Reference | Why It Survives | Evidence |
|---|----------|-------------------|-----------------|----------|
| 1 | [Decision] | DEC-[NNN] | [Why this decision is approach-independent] | [VALIDATED] |

### Boundary Assignments Still Correct

| # | Boundary | Owner | Authority Scope | Why It Survives |
|---|----------|-------|-----------------|-----------------|
| 1 | [Boundary] | [Domain] | [Scope] | [Why this ownership is approach-independent] |

### Contracts Already Validated

| # | Contract | Between | Validation Status | Why It Survives |
|---|----------|---------|-------------------|-----------------|
| 1 | [Contract/API/Event] | [Domain A ↔ Domain B] | [Validated with whom] | [Why this contract holds regardless of approach] |

### Requirements Interpretations Confirmed

| # | Requirement | Interpretation | Confirmed With | Why It Survives |
|---|------------|---------------|----------------|-----------------|
| 1 | [PRD requirement] | [How we interpreted it] | [Stakeholder] | [Why this interpretation is approach-independent] |

---

## Items NOT Retained (Approach-Dependent)

| # | Item | Why It's Discarded | Impact on Redesign |
|---|------|-------------------|-------------------|
| 1 | [Component/decision/pattern] | [Why this was tied to the old approach] | [What the replacement must address instead] |

---

## Archived Artifacts

| # | Artifact | Original Path | Archived Path |
|---|----------|--------------|---------------|
| 1 | [Artifact name] | `[original-path]` | `[archived-path-with-vN-suffix]` |

---

## Restart Inputs

The following inputs will be carried into Step 1 restart:

1. **Original PRD** — unchanged
2. **Retained outcomes list** — this document
3. **Decision log** — preserved as-is (prior entries NOT reset)
4. **Blocker register** — preserved as-is
5. **Truth hierarchy** — preserved (may need re-validation in new context)

---

## Enrichment Log

| Date | Change | Source | Updated By |
|------|--------|--------|------------|
| [YYYY-MM-DD] | [What changed] | [What triggered the change] | [Who made it] |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | [YYYY-MM-DD] | [Author] | Initial retained outcomes extraction |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
