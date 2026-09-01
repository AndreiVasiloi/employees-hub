# B.0: Domain Onboarding

## Objective

Bootstrap a reusable domain profile from Explore artifacts so that downstream B sub-steps have a stable vocabulary, constraint set, authority patterns, and quality priorities — without requiring a full domain interview.

## Entry Criteria

- [ ] `domain-analysis.md` exists (`explore/explore-[slug]/domain-analysis.md`) — prerequisite enforced by caller
- [ ] No domain profile exists at `persistent-knowledge/[domain]-profile.md` — **skip this sub-step if profile already exists**

## When to Skip

| Condition | Action |
|-----------|--------|
| `persistent-knowledge/[domain]-profile.md` exists | Skip B.0; proceed to B.1 |
| Fast Lane Explore Type | Skip B.0; proceed to B.1 |

**Load skill**: `explore.proc.domain-onboarding`

## Actions

### B.0.1 — Assemble Draft Domain Profile from Explore Artifacts

Pre-populate each profile field from the corresponding Explore artifact:

| Profile Field | Source Artifact | Location |
|---------------|----------------|----------|
| Domain vocabulary (terms + definitions) | `domain-analysis.md` Domain Glossary | `explore/explore-[slug]/domain-analysis.md` |
| Applicable regulations + data handling rules | `regulatory-compliance.md` | `explore/explore-[slug]/regulatory-compliance.md` |
| Technical constraints | `technical-feasibility.md` technical constraints | `explore/explore-[slug]/technical-feasibility.md` |
| Authority patterns + governance framework | `context.md` Governance Framework + Stakeholder Map | `explore/explore-[slug]/context.md` |
| Quality priorities | `explore-bundle.md` constraints + `technical-feasibility.md` design guardrails | `explore/explore-[slug]/explore-bundle.md` |
| Architecture drivers (if available) | `architecture-context.md` Section 3 | `explore/explore-[slug]/architecture-context.md` |

Tag every assembled field with evidence label:
- `OBS` — field directly extracted from artifact
- `INF` — field inferred from patterns across multiple artifacts
- `ASM` — field not evidenced; filling gap

### B.0.2 — Identify Gaps

List every profile field that could not be populated from Explore artifacts:
- Missing vocabulary terms needed for HLD component naming
- Unresolved authority patterns (who owns which data/decision)
- Unclear quality priorities (conflicting signals across artifacts)

### B.0.3 — Present and Validate

```
Question ARCH-B0
  Header:      "Domain Profile"
  Question:    "I've assembled a domain profile from your Explore artifacts:
                Vocabulary terms: [N] (from domain-analysis.md)
                Regulations: [N] (from regulatory-compliance.md)
                Constraints: [N] (from technical-feasibility.md)
                Authority patterns: [N] (from context.md governance framework)
                Quality priorities: [top 3-5]
                
                Gaps that need your input: [N] items
                [List gaps with impact of not resolving each]
                
                Approve this profile or provide additional domain context."
  Multi-select: No
  Options:
    - Approved — domain profile is sufficient; proceed to B.1
    - Fill gaps — I'll provide the missing information
    - Skip — domain profile already exists; proceed to B.1
```

### B.0.4 — Write Domain Profile

Write to `persistent-knowledge/[domain]-profile.md`.

Include:
- Vocabulary — canonical terms with definitions and source evidence
- Domain rules — constraints and invariants from domain-analysis.md
- Regulations — non-negotiables from regulatory-compliance.md
- Authority patterns — who owns what, governance model from context.md
- Quality priorities — ranked top-5 from explore-bundle.md + technical-feasibility.md
- Open items — gaps not resolved in this session (with owners)

## Checkpoint

**Gate**: Human approves domain profile → proceed to B.1.

## Exit Criteria

- [ ] Domain profile written to `persistent-knowledge/[domain]-profile.md`
- [ ] All fields tagged with evidence labels (OBS/INF/ASM)
- [ ] Gaps listed with owners
- [ ] Human has approved or skipped

## Next Step

→ [B1-context-design-direction.md](./B1-context-design-direction.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-solutioning:1.0.1:2026-09-01T08:21:26Z -->
