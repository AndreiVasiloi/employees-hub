# Step 6: Canonical Hardening

Run the hardening checklist on the revised draft. The goal is no longer to improve the design — it is to find what would break implementation.

The checklist has two layers:
- **BASE categories (always mandatory)** — 4 universal categories that apply to every engagement
- **EXTENDED categories (from engagement brief)** — driven by the engagement's top quality attributes
- **DOMAIN categories (from domain profile)** — domain-specific hardening checks

**Present the configured checklist to the architect for confirmation before running.**

## Base Categories (Always Mandatory)

```
Canonical Hardening — BASE 1: Boundary Integrity (M1)

- [✓/✗] Each bounded context owns what it claims to own
- [✓/✗] No logic crosses a boundary without acknowledgment
- [✓/✗] Event names and state names match semantic weight
- [✓/✗] Negative boundary statements present for every component (M4)

Findings: [N]
```

```
Canonical Hardening — BASE 2: Cross-View Consistency (M3)

- [✓/✗] Context, container, and component diagrams tell the same story
- [✓/✗] Sequence flows match structural views
- [✓/✗] Every design decision propagates from detail to high-level views
- [✓/✗] Component descriptions non-overlapping in responsibility

Findings: [N]
```

```
Canonical Hardening — BASE 3: Failure Mode Analysis

- [✓/✗] Critical failure scenarios identified and handled
- [✓/✗] Upstream data incomplete — handled
- [✓/✗] Concurrent trigger races — handled
- [✓/✗] Mid-process state changes — handled

Findings: [N]
```

```
Canonical Hardening — BASE 4: Contract Completeness (M8, M9)

- [✓/✗] Every upstream dependency has a defined contract (not assumed)
- [✓/✗] Every downstream handoff has a defined event/artifact schema
- [✓/✗] All ASSUMED contracts flagged as potential blockers
- [✓/✗] Implementation readiness verified — can teams build from this without guessing? (M8)

Findings: [N]
⚠️ ASSUMED contracts added to blocker register: [N]
```

## EXTENDED Categories (from engagement brief quality attributes)

Include categories matching the engagement's top quality attributes (pick from table):

| Trigger | Category | Key Checks |
|---------|----------|------------|
| LATENCY in top-3 | Latency | Latency budget allocation, hot path optimization, caching strategy, NFR target achievability |
| COMPLIANCE in top-3 or regulations apply | Regulatory Compliance | Data classification, audit trail sufficiency, jurisdictional data flows, regulation mapping. ⚠️ Findings are BLOCKING by default |
| AVAILABILITY in top-3 | Availability | Failure domain isolation, redundancy model, graceful degradation, recovery procedures |
| SECURITY in top-3 | Security | Threat model coverage, auth boundaries, data-at-rest/in-transit posture, secrets management |
| OBSERVABILITY in top-3 | Observability | Metric/log/trace coverage, alerting strategy, SLO alignment, debugging visibility |
| COST in top-3 | Cost | Infrastructure cost model, scaling economics (1x/10x/100x), build-vs-buy justification, cost-performance tradeoffs |

For each selected category, run 4 checks and report findings count with severity.

## DOMAIN Categories (from domain profile)

If the domain profile includes domain-specific hardening items (e.g., Healthcare → HIPAA data flow validation, Payments → closure-scoped determinism, Financial services → SOX audit trail), run those checks and report findings.

**Total categories: 4 base + [N] extended/domain (max 10 total)**

**STOP**: Wait for architect to review hardening results before classification.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.feedback-integration:0.1.2:2026-09-01T08:21:27Z -->
