# Employee Hub Discovery

**Signal:** [Employee Hub leave-management Signal](../../signal/signals/20260827-employee-hub-leave-management.md)  
**Explore Bundle:** [Employee Hub Explore Bundle](explore-bundle.md)  
**Status:** PRD-READY
**Explore Type:** Diverge-Converge  
**Last updated:** 2026-09-01

## Artifact Index

| Artifact | Path | Status |
|----------|------|--------|
| Explore Bundle | [explore-bundle.md](explore-bundle.md) | ✓ Approved |
| Discovery Index | [discovery.md](discovery.md) | ✓ Active |
| Context Baseline | [context.md](context.md) | ✓ Complete |
| Market Research | [market-research.md](market-research.md) | ✓ Complete |
| Domain Analysis | [domain-analysis.md](domain-analysis.md) | ✓ Complete |
| Glossary | [../glossary.md](../glossary.md) | ✓ Complete |
| Personas | [../domain/personas-employee-hub.md](../domain/personas-employee-hub.md) | ✓ Complete |
| Journeys | [../domain/journey-employee-hub.md](../domain/journey-employee-hub.md) | ✓ Current state complete; detailed future-state journey is an accepted, task-gated deferral |
| User Flows | [../domain/flows-employee-hub.md](../domain/flows-employee-hub.md) | ✓ Complete |
| Hypothesis | [hypothesis.md](hypothesis.md) | ✓ Stakeholder-validated learning hypothesis |
| Ideation | [ideation/employee-hub-refined-concepts.md](ideation/employee-hub-refined-concepts.md) | ✓ Three concepts approved |
| Technical Feasibility | [technical-feasibility.md](technical-feasibility.md) | ✓ Complete |
| Architecture Context | [architecture-context.md](architecture-context.md) | ✓ Complete |
| Design Pipeline | [../design/](../design/) | ✓ Complete |
| Risk Register | [PRD Risks & Mitigation](../prds/employee-hub-prd.md#risks--mitigation) | ✓ Complete |
| PRD | [../prds/employee-hub-prd.md](../prds/employee-hub-prd.md) | ✓ Approved |
| HLD | [../hlds/employee-hub-hld.md](../hlds/employee-hub-hld.md) | ✓ Locked for Govern handoff |
| Architecture Decisions | [../decisions/](../decisions/) | ✓ Complete |
| Test Strategy | [test-strategy.md](test-strategy.md) | ✓ Complete |
| DevOps Strategy | [devops-strategy.md](devops-strategy.md) | ✓ Complete |
| Epic Roadmap | [../epics/](../epics/) | ✓ Ready for Govern breakdown |
| Govern Readiness | [Govern Readiness](#govern-readiness) | ✓ PASS with explicit deferrals |

## Open Questions

| ID | Question | Resolving activities |
|----|----------|----------------------|
| Q1 | Which leave types are required for the MVP? | A3, A12 |
| Q2 | Are pending requests allowed to overlap? | A3, A12 |
| Q3 | How are weekends, public holidays, partial days, and time zones calculated? | A3, A7 |
| Q4 | Can employees edit or cancel a pending request, and under what conditions? | A5, A9, A12 |
| Q5 | Who can adjust a leave balance, and how is the adjustment audited? | A3, A12 |
| Q6 | What leave information may managers see about another employee? | A4, A5, A12 |
| Q7 | Does each employee have one manager or can requests have multiple approvers? | A3, A8, A12 |
| Q8 | Should the first version support multiple offices or time zones? | A3, A7, A8 |
| Q9 | Which notifications and delivery channels are required? | A2, A7, A12 |
| Q10 | Which requirements are product decisions and which are learning exercises? | A6, A12 |
| Q11 | Is the problem representative, and would intended users adopt the workflow? | A2, A6 |
| Q12 | How will organization isolation be enforced across all execution paths? | A7, A8, A13 |
| Q13 | How will concurrent approvals and balance updates preserve consistency? | A7, A13 |
| Q14 | Which business and security events must be audited? | A3, A8, A13 |
| Q15 | How will the applications be packaged, tested, deployed, configured, and observed? | A7, A8, A14 |

## Active Assumptions

The authoritative assumption catalogue is maintained in [Explore Bundle — Active Assumptions](explore-bundle.md#active-assumptions). Discovery updates must record evidence, disposition, and affected artifacts before closing an assumption.

## Govern Readiness

**Outcome:** PASS — approved for Govern task breakdown on 2026-09-01. The Signal, Explore Bundle, selected discovery and ideation activities, PRD, HLD, six accepted ADRs, test and DevOps strategies, consistency check, glossary, and E1–E6 epic roadmap are present and linked. `git diff --check` passed at the handoff review.

The Sponsor accepted the following as explicit, owned deferrals; they must appear in relevant task Definition of Ready criteria and must not be represented as validated or delivered capabilities:

| Deferred item | Owner | Governing point |
|---|---|---|
| Detailed future-state journey | Andrei — Product Manager | Before an affected frontend epic is marked ready for implementation; current flows, IA, wireframes, and accessibility specifications remain the approved implementation direction. |
| Identity provider, claims, session model, and account linking | Andrei — Architect and Lead Engineer | Before non-stub authentication implementation (BLK-001 / PRD Q11). |
| Rancher runtime, registry, ingress, secrets, storage, and operational ownership | Sponsor / runtime owner | Before shared deployment or production-like delivery work (BLK-002 / PRD Q15–Q17). |
| API and event schemas | Lead Engineer | Before the owning module or integration contract is implemented (BLK-003). |

Govern can begin with E1 planning without another discovery meeting. Product-policy, validation, and platform deferrals remain task-specific gates as recorded in the [PRD open questions](../prds/employee-hub-prd.md#open-questions), [HLD blocker register](../hlds/employee-hub-blocker-register.md), and epic prerequisites.

## Enrichment Log

| Date | Activity | Update |
|------|----------|--------|
| 2026-08-27 | Explore Bundle | Initialized the discovery index from the approved Diverge-Converge plan. |
| 2026-08-28 | Context Documentation | Completed and validated the context baseline: problem, scope, domain model, system map, constraints, stakeholders, governance, assumptions, and gaps. |
| 2026-08-28 | Market Research | Completed and validated the global market and competitor review with a European SME lens; retained product demand, pricing, differentiation, and target-segment fit as validation needs. |
| 2026-08-28 | Domain Analysis | Completed the domain vocabulary, entity model, lifecycles, structured rules, responsibility model, current-state hypotheses, risks, edge cases, and prioritized validation plan; HR-domain-expert review remains outstanding. |
| 2026-08-28 | Technical Feasibility | Completed feasibility analysis; retained identity, transaction tooling, platform, GitHub/Rancher, notification, and observability decisions as engineering validation questions. |
| 2026-08-28 | Architecture Context | Completed greenfield architecture context: landscape, ranked drivers, bounded contexts, aggregate sketch, constraints register, and solutioning readiness; unresolved choices remain explicitly owned. |
| 2026-08-31 | Personas | Completed four sponsor-approved role-based personas; all experience details remain high-priority assumptions pending direct user research. |
| 2026-08-31 | Journey Mapping | Completed the Employee current-state leave-request journey and sponsor-approved opportunities; future-state design remains deferred until an HLD exists. |
| 2026-09-01 | Architecture Solutioning | Completed the approved architecture package: HLD, boundary map, truth hierarchy, design sketch, decision log, blocker register, hardening disposition, backport findings, and six accepted ADRs. |
| 2026-09-01 | Test Strategy | Completed and approved business-critical test strategy with automated pyramid, selected tooling, fictional-data environments, GitHub Actions gates, and non-functional test scope. |
| 2026-09-01 | DevOps Strategy | Completed and approved standard beginner-friendly DevOps strategy: GitHub Actions pipeline, Rancher-target environment model, release/rollback, telemetry, DevSecOps, governance, and delivery measures. |
| 2026-09-01 | Solution Design | Completed approved user flows, information architecture, wireframes, accessibility specification, usability-test plan, and PRD; the detailed future-state journey remains deferred. |
| 2026-09-01 | Consistency Check | Corrected completed-artifact navigation and retained Govern Readiness as the next pending Explore artifact. |
| 2026-09-01 | Epic Forming | Extracted the approved E1-E6 capability roadmap into indexed target-state epics with initial epochs and validated boundaries. |
| 2026-08-31 | Hypothesis | Created and stakeholder-validated a learning hypothesis with a three-participant directional test; no direct customer validation is claimed. |
| 2026-08-31 | Ideation | Completed framing, stimulation, divergence, clustering, bias-aware evaluation, and refinement; selected three concepts as Solution Design direction seeds. |
