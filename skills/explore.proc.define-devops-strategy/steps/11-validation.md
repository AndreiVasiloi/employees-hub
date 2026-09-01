# Step 11: Validation

## Objective

Run completeness and consistency checks on the DevOps strategy document to ensure no critical sections are missing, all cross-references are valid, and the strategy is internally consistent.

## Entry Criteria

- [ ] Step 10 complete with document written and acknowledged by human

## Actions

### 11.1 Completeness Check

Verify that every required section is populated (not just templated):

| # | Section | Status | Notes |
|---|---------|--------|-------|
| 1 | Overview & Context | [ ] Populated | Must include architecture type, risk posture, source docs |
| 2 | CI/CD Pipeline Design | [ ] Populated | Must include stages, triggers, durations |
| 3 | Quality Gates | [ ] Populated | Must include thresholds and failure policies |
| 4 | Testing Integration | [ ] Populated | Must reference test strategy or define testing approach |
| 5 | Environment Strategy | [ ] Populated | Must include environment topology table |
| 6 | Infrastructure as Code | [ ] Populated | Must include IaC approach and pipeline |
| 7 | Release & Deployment Strategy | [ ] Populated | Must include deployment style and rollback |
| 8 | Observability & Incident Response | [ ] Populated | Must include three pillars, SLOs, and alerting |
| 9 | DevSecOps | [ ] Populated | Must include shift-left pipeline and secrets mgmt |
| 10 | Governance & Compliance | [ ] Populated | Must include approval workflows and audit trail |
| 11 | Developer Experience | [ ] Populated | Must include local dev loop and DX metrics |
| 12 | DORA Metrics | [ ] Populated | Must include baselines, targets, and improvement loops |
| 13 | Risks & Open Questions | [ ] Populated | Must list all TBDs and unresolved items |

**If any section is empty or template-only**: Flag to human and offer to populate based on the strategy profile defaults.

### 11.2 Consistency Check

Verify internal consistency across sections:

| Check | Validation Rule |
|-------|----------------|
| Pipeline stages ↔ Quality gates | Every pipeline stage has a corresponding quality gate |
| Pipeline stages ↔ Test integration | Test pyramid layers are mapped to pipeline stages |
| Environment topology ↔ Pipeline stages | Each pipeline stage has a corresponding environment |
| Release strategy ↔ Rollback strategy | Rollback mechanism exists for the chosen deployment style |
| Observability ↔ Release strategy | Canary/progressive delivery has SLO metrics to validate against |
| DevSecOps ↔ Pipeline stages | Security checks mapped to specific pipeline stages |
| Governance ↔ Pipeline stages | Approval gates aligned with pipeline promotion gates |
| DORA targets ↔ Pipeline durations | Lead time target is achievable with defined stage durations |
| IaC ↔ Environment strategy | All environments are IaC-provisioned (except local) |

**If inconsistency found**: Fix the document and note the correction.

### 11.3 Cross-Reference Validation

Verify all referenced documents exist or are noted as planned:

| Reference | Expected Path | Exists? |
|-----------|-------------|---------|
| PRD | `explore/prds/[slug]-prd.md` | [ ] |
| HLD | `explore/hlds/[slug]-hld.md` | [ ] |
| ADRs | `explore/decisions/[slug]-adr-*.md` | [ ] |
| Test Strategy | `explore/explore-[slug]/test-strategy.md` | [ ] |
| Path to Production | `explore/[slug]/path-to-production.md` | [ ] |
| Tooling | `explore/tooling.md` | [ ] |
| Glossary | `explore/glossary.md` | [ ] |

**If a referenced document does not exist**: Note in Risks & Open Questions (Section 13) as a dependency.

### 11.4 Strategy Profile Alignment Check

Verify the document matches the selected strategy profile:

**Lean Profile Checks:**
- [ ] Pipeline has ≤ 4 stages
- [ ] ≤ 3 environments defined
- [ ] Feature flags optional (not required)
- [ ] Manual production approval acceptable
- [ ] Basic observability (metrics + logs; tracing optional)

**Standard Profile Checks:**
- [ ] Pipeline has 5-6 stages
- [ ] 4 environments defined (local, CI, staging, prod)
- [ ] Feature flags for major features
- [ ] Automated gates + manual production approval
- [ ] Full observability (metrics + logs + tracing)
- [ ] SLOs defined

**Enterprise Profile Checks:**
- [ ] Pipeline has 6+ stages with policy gates
- [ ] 4+ environments with ephemeral PR environments
- [ ] Progressive delivery (canary + feature flags)
- [ ] Automated canary promotion with SLO validation
- [ ] Full observability + change correlation
- [ ] Policy-as-code enforced
- [ ] SBOM + artifact signing
- [ ] Audit evidence package per release

### 11.5 Present Validation Results

Present a validation summary to the human:

```
DevOps Strategy Validation Results:

Completeness:  [X/13] sections populated
Consistency:   [X/Y] checks passed
Cross-refs:    [X/Y] documents exist
Profile:       [Lean/Standard/Enterprise] — [all/N] profile checks pass

Issues found:
  - [issue 1 — description and proposed fix]
  - [issue 2]

Recommendation: [Ready for use / Needs corrections]
```

**STOP**: If issues are found, fix the document and re-validate. If all checks pass, confirm completion with the human.

## Exit Criteria

- [ ] Completeness check: all 13 sections populated
- [ ] Consistency check: no contradictions between sections
- [ ] Cross-reference check: all documents exist or noted as dependencies
- [ ] Profile alignment check: document matches selected strategy profile
- [ ] Validation results presented to human
- [ ] Human has confirmed the strategy is complete

## Skill Complete

The DevOps strategy document is ready for use. It can be:
- Referenced by the Architect skill when writing HLD Section 10
- Used by Task Planning to create infrastructure and DevOps setup tasks
- Consumed by Epic Forming to shape a "DevOps Foundation" epic
- Updated as architectural or operational decisions evolve

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
