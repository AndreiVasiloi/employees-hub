# B.4: Finalization & Handoff

## Objective

Polish the HLD for wider review through a simplification audit, terminology and template compliance check, and produce the final architecture package with all supporting artifacts finalized.

## Entry Criteria

- [ ] Gate B.3 PASS or CONDITIONAL PASS
- [ ] `[slug]-hld.md` hardened (all B.3 findings resolved or accepted)
- [ ] All ADRs updated to reflect hardening outcomes

**Load skill**: `explore.proc.socialization-handoff`

---

## B.4.1 — Simplification Audit

Audit the HLD for complexity that does not carry architectural weight:

| Check | Rule | Action if Violated |
|-------|------|--------------------|
| Internal states | Collapse to externally visible checkpoints | Remove internal state detail; reference LLD |
| Unjustified infrastructure | Every infra component must have a justified current requirement (M7) | Flag with `[M7-VIOLATION]`; propose removal or defer to LLD |
| LLD detail in HLD | No implementation-level detail (class structure, method signatures, SQL schemas) | Move to LLD notes or remove |
| Noisy events | No per-record or high-frequency events without milestone justification (M6) | Consolidate to milestone events |
| Redundant components | Duplicate responsibilities across components | Consolidate or clarify boundary distinction |
| Over-specified integrations | API contracts at method/field level belong in LLD | Reduce to contract-level specification |

For each violation found: log the finding, apply the simplification, update the affected HLD section.

---

## B.4.2 — Polish

**Inputs consumed**:
- `glossary.md` — canonical terminology (`explore/glossary.md`)
- `domain-analysis.md` — domain glossary and domain rules (`explore/explore-[slug]/domain-analysis.md`)

**Actions**:

1. **Negative boundary statements balanced (M4)** — every component has both a responsibility statement AND a clear statement of what it does NOT own. Flag any component missing its non-responsibility statement.

2. **Terminology consistent (M3)** — cross-check every component name, domain term, and event name against:
   - `explore/glossary.md` (project-level canonical terminology)
   - `domain-analysis.md` Domain Glossary (domain-level canonical terminology)
   - Flag any term not in either glossary as `[GLOSSARY-GAP: term]`
   - Resolve GLOSSARY-GAP flags before finalizing (or accept with steering team sign-off)

3. **Cross-references valid**:
   - HLD → ADR links: every `See ADR-NNN` reference resolves to an existing ADR file
   - ADR → HLD links: every ADR's `Affects:` reference matches the correct HLD section number
   - HLD Section 13 open questions: each has an owner and a target resolution date
   - All `[slug]-blocker-register.md` entries with `CONFIRMED BLOCKER` status are reflected in HLD Section 13

4. **Template compliance**:
   - All 14 sections present with content (no blank sections)
   - Front matter complete (domain, source, glossary_version, validated_by, explore_type, prd_source, prd_requirements_mapped, prd_nfrs_mapped, architecture_context_source)
   - Document history table present with at least one entry
   - Section 14 Enrichment Log present (initialized; will be populated post-finalization)
   - ADR Index present in back matter

5. **Compile Backport Findings** — gather all findings discovered during B sub-steps that should update upstream documents:
   - New technical constraints → update `[slug]-prd.md` (Group 2 constraints)
   - Architecture risks not in risk register → update `explore/explore-[slug]/risks.md`
   - New domain terms discovered during HLD → update `explore/glossary.md`
   - Changed assumptions → update relevant upstream Explore artifacts
   - Findings that affect `architecture-context.md` → note for discovery refresh

   Write `explore/hlds/[slug]-backport-findings.md`:
   ```markdown
   # Backport Findings — [slug]

   | # | Finding | Target Artifact | Section | Action |
   |---|---------|----------------|---------|--------|
   | BF-001 | [description] | [artifact path] | [section] | [what to update] |
   ```

---

## B.4.3 — Architecture Package

Produce the final deliverables and confirm all artifacts are finalized:

**Architecture Package**:

| Artifact | Path | Status |
|----------|------|--------|
| `[slug]-hld.md` | `explore/hlds/` | Socialization-ready — all 14 sections, hardened, polished |
| `[slug]-engagement-brief.md` | `explore/hlds/` | Finalized |
| `[slug]-boundary-map.md` | `explore/hlds/` | Validated |
| `[slug]-truth-hierarchy.md` | `explore/hlds/` | Validated |
| `[slug]-design-sketch.md` | `explore/hlds/` | Approved direction |
| `[slug]-decision-log.md` | `explore/hlds/` | Complete decision record |
| `[slug]-blocker-register.md` | `explore/hlds/` | All blockers with status |
| `[slug]-backport-findings.md` | `explore/hlds/` | Upstream update instructions |
| `[slug]-feedback-disposition.md` | `explore/hlds/` | If B.3.1 ran |
| `[slug]-cross-domain-alignment.md` | `explore/hlds/` | If B.3.2 ran |
| `[slug]-adr-[###]-[name].md` | `explore/decisions/` | All decisions, all in `Accepted` status |

**ADR Lifecycle Finalization**:
- Promote all ADRs from `Proposed` → `Accepted` status (requires steering team confirmation)
- Verify no ADRs remain in `Proposed` status
- Verify every `Superseded` ADR links to its replacement

## Checkpoint

**STOP — AskUserQuestion:**

```
Question ARCH-B4
  Header:      "Architecture Package Review"
  Question:    "Architecture package complete:
                HLD finalized ([N] sections, hardened, polished)
                Decision log ([N] decisions)
                Blocker register ([N] open / [N] resolved)
                ADRs ([N] decisions, all Accepted)
                Back-port findings ([N] items for [N] upstream artifacts)
                Simplification audit: [N] violations resolved
                Terminology: [N] GLOSSARY-GAP flags resolved / [N] accepted
                
                Approve the architecture package?"
  Multi-select: No
  Options:
    - Approved — architecture complete; proceed to Test & DevOps Strategy
    - Minor corrections — I have small fixes
    - Not ready — needs more work
```

**Gate B.4** (human decides): PASS / CONDITIONAL PASS / FAIL

## Exit Criteria

- [ ] Simplification audit complete — no M7 violations, no LLD detail, no noisy events
- [ ] All 14 HLD sections present with content, no blank sections
- [ ] All negative boundary statements present for every component (M4)
- [ ] All terminology consistent with `glossary.md` and `domain-analysis.md` (no unresolved GLOSSARY-GAP)
- [ ] All cross-references valid (HLD <-> ADR bidirectional, Section 13 owners assigned)
- [ ] Front matter and document history complete
- [ ] All ADRs in `Accepted` status (none `Proposed`)
- [ ] `[slug]-backport-findings.md` written
- [ ] Gate B.4 PASS or CONDITIONAL PASS
- [ ] Caller (`explore.agent` Step 5) notified to update `discovery.md` HLD and ADR rows to complete

## Next Step

Architecture package complete. Return to `explore.agent` Step 5 Part 2 (Test & DevOps Strategy).

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-solutioning:1.0.1:2026-09-01T08:21:26Z -->
