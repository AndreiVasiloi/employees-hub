## Completeness Checklist

- [ ] Signal Acceptance Gate passed before any work started
- [ ] Explore Type selected by steering team (Fast Lane / ERC / Diverge/Converge)
- [ ] Discovery plan (Explore Bundle) produced and approved
- [ ] All steering-team-selected activities executed — no extras, no omissions
- [ ] Mid-execution consistency checks run in Steps 2-4
- [ ] Inline readiness evaluations passed before hypothesis and PRD creation
- [ ] All artifacts stored in correct `explore/` locations per Outputs table
- [ ] Decision log and blocker register populated throughout
- [ ] Domain-to-artifact mapping confirmed (if multi-domain)
- [ ] All PRDs/HLDs named from Domain Glossary (if domain-analysis.md produced)
- [ ] All `[GLOSSARY-GAP]` and `[DOMAIN-RULE-VIOLATION]` flags resolved or accepted
- [ ] Traceability headers present on all PRDs and HLDs
- [ ] Govern Readiness Check passed by agent
- [ ] Context Warehouse fully populated — Govern can execute without discovering anything new

---

## Step 5 — Govern Readiness Check

```
Govern Readiness Check — agent assessment:

Signal & Planning
  [✓/✗] Signal was Active and routed to Explore
  [✓/✗] Explore Bundle was produced and approved
  [✓/✗] All step checks completed

Step 2 — Discovery (Context + Stakeholder + Hypothesis)
  [✓/✗] Problem statement — unambiguous: [brief evidence]
  [✓/✗] Domain model — complete: [N entities, no undefined terms]
  [✓/✗] All [ASSUMPTION] claims — resolved or listed as open questions with owners
  [✓/✗] Technical constraints — documented and confirmed
  [✓/✗] Personas — evidence-based attributes documented
  [✓/✗] Journeys — current-state and target-state documented
  [✓/✗] Hypothesis — written, evidence-backed, stakeholder-validated

Step 3 — Ideation (if D/C or PM requested)
  [✓/✗] Ideation artifacts present (if Ideation was run)
  [✓/✗] Refined concepts documented with risks and assumptions
  [✓/✗] Solution Design seeding section completed
  [✓/✗] Discovery artifacts enriched retroactively

Step 4 — PRD & Experience Design
  [✓/✗] PRD — written, signed off, all 4 groups approved
  [✓/✗] Success metrics — measurable and testable
  [✓/✗] Information architecture — documented and approved
  [✓/✗] User flows — documented and approved
  [✓/✗] Wireframes — documented and approved
  [✓/✗] Usability test plan — documented
  [✓/✗] Accessibility specifications — documented
  [✓/✗] Future-state journey — added to journey map
  [✓/✗] Risk register — complete, all risks documented
  [✓/✗] Accepted risks — explicitly stated with steering team confirmation
  [✓/✗] Architecture readiness — PASS

Step 5 — Architecture, Strategy & Backlog
  [✓/✗] HLD — documented, hardened, and locked
  [✓/✗] ADRs — written with rationale for all key decisions, all Accepted
  [✓/✗] ADR trade-offs — each trade-off risk fed back to risk register (rejected alternatives as fallback scenarios)
  [✓/✗] Architecture package — complete (boundary map, truth hierarchy, decision log, blocker register)
  [✓/✗] DoD and DoR — defined for every task
  [✓/✗] NFRs — documented in PRD Group 3
  [✓/✗] At least one epic — formed with acceptance criteria referencing PRD
  [✓/✗] Govern can start without a discovery meeting

Test & DevOps Strategy (Part 2)
  [✓/✗] Test strategy document exists and is complete
  [✓/✗] Test strategy aligns with HLD component boundaries
  [✓/✗] Test strategy coverage targets are enforceable in CI/CD quality gates
  [✓/✗] DevOps strategy document exists and is complete
  [✓/✗] DevOps strategy aligns with HLD architecture type
  [✓/✗] Quality gates in DevOps strategy align with test strategy
  [✓/✗] CI/CD pipeline stages map to testing pyramid layers
  [✓/✗] Cross-skill alignment check passed (or misalignments documented)

Execution Audit Trail
  [✓/✗] discovery.md artifact index matches actual files in explore/explore-[slug]/
  [✓/✗] discovery.md enrichment log confirms all steps executed (step completion evidence)

Enrichment Consistency
  [✓/✗] All enrichment logs are consistent across artifacts (no orphaned updates)
  [✓/✗] All ASSUMED → EVIDENCE-BASED transitions are logged with source

Process Integration Validation
  [✓/✗] Consistency check run and passed
  [✓/✗] Glossary updated (if Turbine available)
  [✓/✗] Epic forming process triggered and completed
  [✓/✗] Decision documentation complete (all ADRs + additional decisions)
  [✓/✗] Security review complete (if applicable)

Domain Traceability (if domain-analysis.md was produced)
  [✓/✗] Every PRD named `PRD · [Domain Name]` from Domain Glossary
  [✓/✗] Every HLD named `HLD · [Domain Name]` from Domain Glossary
  [✓/✗] All PRD/HLD traceability headers complete
  [✓/✗] No unresolved `[GLOSSARY-GAP]` flags (or steering team accepted)
  [✓/✗] No unresolved `[DOMAIN-RULE-VIOLATION]` flags (or steering team accepted)
  [✓/✗] Domain-to-artifact mapping confirmed by steering team
  [✓/✗] glossary_version in headers matches current domain-analysis.md

Naming Convention Validation
  [✓/✗] All file names use lowercase, hyphen-separated slugs
  [✓/✗] No spaces or special characters in file names
  [✓/✗] ADRs numbered sequentially (001, 002, 003...)
  [✓/✗] All artifacts in correct `explore/` subfolders
  [✓/✗] Document history tables present in all artifacts
  [✓/✗] Cross-references valid and up-to-date
  [✓/✗] Glossary updated (single file at `explore/glossary.md`)

**Anti-patterns to check for**:
- ❌ Uppercase in file names
- ❌ Underscores instead of hyphens
- ❌ Missing slug in file names
- ❌ Artifacts outside `explore/` folder
- ❌ Duplicate glossary files per signal

Overall: [N] of [N] items confirmed.
```

---

## Step 5 — Final Confirmation Template

```
Step 5 complete. Full artifact set:

**Core Specification:**
explore/prds/[slug]-prd.md                                [approved]
explore/hlds/[slug]-hld.md                                [locked]
explore/decisions/[slug]-adr-001-[name].md                [accepted]
explore/decisions/[slug]-adr-00N-[name].md                [accepted]

**Domain & User Research:**
explore/domain/[slug]-domain.md                           [locked]
explore/domain/personas-[slug].md                         [validated]
explore/domain/journey-[slug].md                          [complete]
explore/domain/flows-[slug].md                            [approved]

**Experience Design:**
explore/design/information-architecture-[slug].md         [approved]
explore/design/wireframes-[slug].md                       [approved]
explore/design/usability-test-plan-[slug].md             [documented]
explore/design/accessibility-[slug].md                    [documented]

**Strategy Documents (Part 2):**
explore/explore-[slug]/test-strategy.md                   [complete]
explore/explore-[slug]/devops-strategy.md                 [complete]

**Discovery Context:**
explore/explore-[slug]/context.md                         [complete]
explore/explore-[slug]/market-research.md                 [complete]
explore/explore-[slug]/domain-analysis.md                 [complete]
explore/explore-[slug]/regulatory-compliance.md           [complete]
explore/explore-[slug]/technical-feasibility.md           [complete]
explore/explore-[slug]/hypothesis.md                      [stakeholder-validated]
explore/explore-[slug]/risks.md                           [complete]
explore/explore-[slug]/explore-bundle.md                  [approved]
explore/explore-[slug]/discovery.md                       [status: PRD-READY]

**Epics & Tasks:**
explore/epics/DFE-[EPIC-ID].md                            [formed]

**Glossary:**
explore/glossary.md                                       [updated]

Consistency check:
  [✓] Terminology consistent with glossary
  [✓] All Signal [ASSUMPTION] claims appear as open questions
  [✓] Success metrics are measurable and testable
  [✓] Acceptance criteria reference PRD requirements
  [✓] DoD and DoR defined for every task
  [✓] No blank sections

Process handoffs ready:
  → Consistency Check (completed)
  → Turbine Glossary Extraction (completed if available)
  → Epic Forming Process (completed)
  → Decision Documentation (all ADRs documented)
  → Security Review (completed if applicable)

Govern Readiness Check: PASS

All [N] checklist items confirmed. Context Warehouse fully populated.
Govern Agent can execute without discovering anything new.
```

---

## Step 5 — Exit Criteria

Before completing Step 5 and handing off to Govern, verify:

**Architecture Artifacts (Part 1):**
- [ ] HLD documented, hardened, and locked (`explore/hlds/[slug]-hld.md`)
- [ ] All ADRs in Accepted status (`explore/decisions/[slug]-adr-*.md`)
- [ ] Boundary map validated (`explore/hlds/[slug]-boundary-map.md`)
- [ ] Truth hierarchy validated (`explore/hlds/[slug]-truth-hierarchy.md`)
- [ ] Decision log complete (`explore/hlds/[slug]-decision-log.md`)
- [ ] Blocker register complete (`explore/hlds/[slug]-blocker-register.md`)
- [ ] Hardening checklist passed (BASE + EXTENDED + DOMAIN categories)
- [ ] Hypothesis validation confirmed
- [ ] PRD validation confirmed (architecture delivers all PRD requirements)
- [ ] All evidence labels maintained (OBS/INF/ASM)

**PRD Artifacts (from Step 4):**
- [ ] PRD complete and approved (`explore/prds/[slug]-prd.md`)
- [ ] All 4 groups approved (Product Definition, Technical Specification, Quality Definition, Specification Completion)
- [ ] Success metrics are measurable and testable
- [ ] DoD and DoR defined
- [ ] NFRs documented
- [ ] Open questions documented with owners

**Epic & Task Artifacts:**
- [ ] Consistency check run and passed
- [ ] Glossary updated (`explore/glossary.md`)
- [ ] Epic forming process triggered and completed
- [ ] At least one epic formed (`explore/epics/DFE-[EPIC-ID].md`)

**Test & DevOps Strategy (Part 2):**
- [ ] Test strategy complete and validated (`explore/explore-[slug]/test-strategy.md`)
- [ ] DevOps strategy complete and validated (`explore/explore-[slug]/devops-strategy.md`)
- [ ] Test strategy aligns with HLD component boundaries
- [ ] DevOps strategy aligns with HLD architecture type
- [ ] Cross-skill alignment check passed (quality gates, pipeline stages, coverage targets)

**Govern Readiness:**
- [ ] All Govern Readiness checklist items confirmed (✓)
- [ ] All artifacts in correct `explore/` subfolders
- [ ] All naming conventions followed (lowercase, hyphen-separated)
- [ ] ADRs numbered sequentially (001, 002, 003...)
- [ ] Document history tables present in all artifacts
- [ ] Cross-references valid and up-to-date
- [ ] Discovery.md status: PRD-READY
- [ ] All enrichment logs consistent

**Quality Gates:**
- [ ] All artifacts are evidenced (no hallucinated content)
- [ ] All Signal [ASSUMPTION] claims appear as open questions
- [ ] Terminology consistent with glossary
- [ ] Acceptance criteria reference PRD requirements
- [ ] No blank sections in any artifact

**Traceability:**
- [ ] PRD links back to Signal, Hypothesis, HLD, Personas, Journey Map, Risk Register
- [ ] Requirements trace to discovery findings
- [ ] Success metrics align with hypothesis (if D/C)
- [ ] Technical notes reference Step 2, Step 4, and Step 5 artifacts
- [ ] HLD cross-references PRD requirements
