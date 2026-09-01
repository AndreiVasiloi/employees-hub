# Truth Hierarchy: Employee Hub

**Status**: Validated  
**Created**: 2026-09-01  
**Last Validated**: 2026-09-01  
**Validated By**: Andrei, Architect  
**Domain**: Employee leave management; see [domain profile](../../persistent-knowledge/employee-leave-management-profile.md).

## Authority Map

Authority-pattern guidance comes from the approved domain profile. `[OBS]`

| # | Authority | Scope | Consumers | Constraints | Evidence |
| ---: | --- | --- | --- | --- | --- |
| 1 | Approved PRD and Product Manager | Product scope, requirements, acceptance criteria. | Architecture, UX, planning. | Changes require product approval. | `[OBS]` |
| 2 | Sponsor / Lead Engineer | Technical delivery, implementation, and final project authority. | Architecture, build, release evidence. | Must preserve approved scope and safeguards. | `[OBS]` |
| 3 | Architect | Architecture review and accepted design direction. | HLD, ADRs, module boundaries. | Must preserve canonical requirements/domain invariants. | `[OBS]` |
| 4 | Domain Analysis and Glossary | Domain vocabulary, lifecycle, invariants, and ownership framing. | HLD, APIs, tests, UX. | Real policy practice remains provisional pending HR review. | `[OBS]` |
| 5 | Employee Hub application | Fictional workforce, policy, request, balance, decision, audit, notification-intent records. | UI, API, audit/reconciliation. | Organization-scoped and server-authorized. | `[OBS]` |
| 6 | Future external providers | Identity assertions and external-delivery facts once selected. | Organization & Access; notification adapter. | Provider contracts are provisional until selected. | `[ASM]` |
| 7 | Future HR reviewer | Actual leave-policy practice. | Policy acceptance and implementation rules. | No HR reviewer is currently available. | `[OBS]` |

## Document Classification

| # | Document | Type | Classification | Rationale |
| ---: | --- | --- | --- | --- |
| 1 | Employee Hub PRD | PRD | Canonical | Approved requirements and acceptance evidence. |
| 2 | Architecture Context | Architecture discovery | Canonical | Consolidated drivers, constraints, and domain sketch. |
| 3 | Domain Profile/Analysis/Glossary | Domain baseline | Canonical | Controlled domain truth and invariants. |
| 4 | HLD Template | Architecture standard | Canonical | Required HLD structure/evidence convention. |
| 5 | Feasibility/Regulatory/UX/Ideation | Research/design inputs | Directional | Inform design without overriding canonical inputs. |
| 6 | Adjacent HLDs | Existing architecture | Unavailable | No adjacent application/HLD exists. |

## Authority Conflicts

| # | Conflict | Domain A Claims | Domain B Claims | Resolution | Status |
| ---: | --- | --- | --- | --- | --- |
| 1 | Administrator breadth vs least privilege | PRD R-017 describes access to every feature. | Domain rules prohibit implicit unrestricted authority, self-approval, and history mutation. | Define explicit permissions; preserve non-bypass prohibitions; PM/Architect review in design sketch/HLD. | Open |

## Re-validation History

| Date | Trigger | Changes | Approved By |
| --- | --- | --- | --- |
| 2026-09-01 | Initial boundary mapping | Initial hierarchy confirmed. | Andrei, Architect |

## Enrichment Log

| Date | Change | Source | Updated By |
| --- | --- | --- | --- |
| 2026-09-01 | Created authority map and document classification. | Architecture Solutioning B.1.2 | Explore Agent |

## Document History

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | 2026-09-01 | Explore Agent | Initial validated truth hierarchy. |
