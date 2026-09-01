# Explore Bundle: Employee Hub

Employee Hub explores whether a focused leave-management platform can improve clarity and reliability for employees, managers, HR, and administrators while serving as a realistic full-stack learning project. This Diverge-Converge Explore will validate user and workflow assumptions, risky domain rules, technical feasibility, security boundaries, and experience design before producing a PRD, architecture package, strategies, and implementation backlog ready for Govern.

## Header

| Field | Value |
|-------|-------|
| Status | Approved |
| Created | 2026-08-27 |
| Timeline | 6 weeks; target completion 2026-10-08 |
| Explore Type | Diverge-Converge (Fast Lane 1/5; ERC 2/4; D/C 5/5) |
| Steering Team | Andrei — Product Manager and Architect; Initiative owner/developer — Lead Engineer and sponsor |
| Priority | Medium |
| Slug | `employee-hub` |

## Signal Information

| Field | Value |
|-------|-------|
| Signal Title | Employee Hub leave-management workflow |
| Problem Statement | Employees, managers, HR teams, and administrators need a clearer and more reliable way to manage employee leave information, requests, approvals, policies, and audit history. |
| Why This Matters | A focused capability may provide a single source of truth, reduce manual HR administration, clarify approval outcomes, and improve trust through traceable changes. |
| Actors | Employee, Manager, HR, Administrator, Initiative owner/developer |
| Tech Stack | Angular; NestJS with TypeScript on latest Node.js LTS; PostgreSQL; npm; Docker/Docker Compose; Rancher; Vitest; Jest and Supertest |
| Key Features | Employee profiles and leave balances; leave request lifecycle; manager approvals; HR policy, holiday, and employee administration; organization administration; notifications; audit history |
| Expected Outcomes | Consistent working-day and balance calculations; permission and tenant isolation; traceable changes; automated tests; deployable and observable application; explicit decisions and review evidence |
| Key Constraints | Fictional data; one local organization with API organization boundaries; fixed roles; simple policy model; one approval step; modular monolith; separate frontend/backend applications in one repository; formal legal compliance deferred |
| Accepted Explore Risk | Published evidence supports the broad administrative problem; Employee Hub-specific demand, adoption, and exact workflows remain assumptions to validate during Explore |

## Solution Profile — Domains in Scope

| Domain | In Scope | Description |
|--------|----------|-------------|
| UX / UI | Yes (confirmed) | Employee, manager, HR, and administrator journeys, navigation, forms, dashboards, accessibility, and feedback states |
| Backend Services | Yes (confirmed) | APIs and application services for employees, organizations, leave policies, requests, approvals, balances, holidays, notifications, and auditing |
| Data Layer | Yes (confirmed) | PostgreSQL relational model, transactions, consistency, organization scoping, audit records, and fictional seed data |
| Domain Rules | Yes (confirmed) | Leave types, working days, holidays, overlap, cancellation, approval, balance adjustments, and invariants |
| Integrations | Partial (confirmed) | Notifications are in scope; channels and providers remain undecided |
| Infrastructure | Yes (confirmed) | Local containers, CI/CD, Rancher deployment, environments, configuration, and observability |
| Security / Privacy Engineering | Yes (confirmed) | Authentication, fixed-role authorization, tenant isolation, sensitive-data protection, and security-sensitive auditing |
| Auditability | Yes (confirmed) | Important business and security changes must be traceable and reviewable |
| Testing | Yes (confirmed) | Unit, integration, API end-to-end, browser-level, security, concurrency, and business-rule testing |
| Mobile Development | No | Native or dedicated mobile applications are not evidenced or selected |
| Formal Legal / Regulatory Compliance | No | Explicitly deferred; compliance claims and certifications are out of scope |

This scope was approved by the steering team on 2026-08-27. Because UX / UI is included, the Explore design pipeline is active.

## Planned Activities

### Phase 1: Foundation and Validation (Weeks 1–2)

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A1 | Kick-off and context baseline | Andrei — Product; Lead Engineer | None | `context.md` with scope, actors, system context, and review responsibilities | AO-2 |
| A2 | Market and comparable-product research | Andrei — Product | A1 | `market-research.md` with evidence, comparable workflows, and limitations | Q9, Q11, AS-1, AB-1 |
| A3 | Domain analysis and glossary | Andrei — Architect; Lead Engineer | A1 | `domain-analysis.md` and `../glossary.md` | Q1, Q2, Q3, Q5, Q7, Q8, Q14, AT-3, AO-1 |
| A4 | Persona definition | Andrei — Product | A1, A2 | `../domain/personas-employee-hub.md` | Q6, AS-2, AS-3 |
| A5 | Current-state journey mapping | Andrei — Product | A3, A4 | `../domain/journey-employee-hub.md` current-state journeys | Q4, Q6, AS-2, AS-3, AO-1 |
| A6 | Hypothesis and validation plan | Steering team | A2, A4, A5 | `hypothesis.md` with evidence thresholds and learning tests | Q10, Q11, AS-1, AO-1, AB-1 |

### Phase 2: Feasibility and Solution Exploration (Weeks 3–4)

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A7 | Technical feasibility and risk spikes | Lead Engineer; Andrei — Architect | A3 | `technical-feasibility.md` | Q3, Q8, Q9, Q12, Q13, Q15, AT-1, AT-2, AT-3, AT-4 |
| A8 | Architecture context and option analysis | Andrei — Architect | A3, A7 | `architecture-context.md` with boundaries and options | Q7, Q8, Q12, Q14, Q15, AT-1, AT-2, AT-4 |
| A9 | Future-state journeys and user flows | Andrei — Product; Lead Engineer | A5, A8 | Updated journey map and `../domain/flows-employee-hub.md` | Q4, Q6 |
| A10 | Wireframes and design handoff | Andrei — Product | A9 | Design artifacts under `../design/` | Q4, Q6 |
| A11 | Detailed risk assessment | Steering team | A6, A7, A8 | `risks.md` with owners, mitigations, and residual risk | All active risks |

### Phase 3: Specification and Govern Readiness (Weeks 5–6)

| Code | Activity | Owner | Dependencies | Output | What it closes |
|------|----------|-------|-------------|--------|----------------|
| A12 | Comprehensive PRD | Andrei — Product and Architect | A2, A3, A4, A5, A6, A9, A10, A11 | `../prds/employee-hub-prd.md` | Q1, Q2, Q4, Q5, Q6, Q7, Q9, Q10, AB-1 |
| A13 | HLD and architecture decisions | Andrei — Architect; Lead Engineer | A7, A8, A12 | `../hlds/employee-hub-hld.md` and ADRs | Q12, Q13, Q14, AT-1, AT-2, AT-3 |
| A14 | Test and DevOps strategies | Lead Engineer; Andrei — Architect | A7, A8, A12, A13 | `test-strategy.md` and `devops-strategy.md` | Q15, AT-4 |
| A15 | Epic and task formation | Steering team | A12, A13, A14 | Epics under `../epics/` and task stubs under `../../work/03-pending-implementation/` | Converts approved scope into Govern work |
| A16 | Consistency validation and Govern readiness | Steering team | A11, A12, A13, A14, A15 | `govern-readiness.md` and updated `discovery.md` | AO-2 and all unresolved questions, assumptions, and risks |

The dependency graph is acyclic: every activity depends only on an earlier-numbered activity.

## Open Questions

### Product Scope and Requirements

- Q1: Which leave types are required for the MVP? — resolves in A3 and A12.
- Q4: Can employees edit or cancel a pending request, and under what conditions? — resolves in A5, A9, and A12.
- Q8: Should the first version support multiple offices or time zones? — resolves in A3, A7, and A8.
- Q9: Which notifications and delivery channels are required? — resolves in A2, A7, and A12.
- Q10: Which requirements are product decisions and which are learning exercises? — resolves in A6 and A12.

### Domain Rules

- Q2: Are pending requests allowed to overlap? — resolves in A3 and A12.
- Q3: How are weekends, public holidays, partial days, and time zones calculated? — resolves in A3 and A7.
- Q5: Who can adjust a leave balance, and how is the adjustment audited? — resolves in A3 and A12.
- Q6: What leave information may managers see about another employee? — resolves in A4, A5, and A12.
- Q7: Does each employee have one manager or can requests have multiple approvers? — resolves in A3, A8, and A12.

### Validation and Experience

- Q11: Is the broad problem sufficiently representative, and would intended users adopt the proposed workflow? — resolves in A2 and A6.

### Technical Feasibility

- Q12: How will organization isolation be enforced consistently across API, data access, background work, and auditing? — resolves in A7, A8, and A13.
- Q13: How will concurrent approvals and balance updates prevent lost updates or double deductions? — resolves in A7 and A13.
- Q14: Which business and security events must be audited, and what information belongs in each audit record? — resolves in A3, A8, and A13.
- Q15: How will the applications be packaged, tested, deployed through Rancher, configured, and observed? — resolves in A7, A8, and A14.

## Active Assumptions

| Code | Assumption | Risk if wrong | Validate in |
|------|------------|---------------|-------------|
| AS-1 | The broad leave-administration problem occurs often enough to justify exploration. | Discovery may optimize a problem with limited relevance. | A2, A6 |
| AS-2 | Employees need clearer balances, request submission, status, cancellation, and notifications. | The employee experience may solve the wrong pain points. | A4, A5 |
| AS-3 | Managers need a consolidated approval view and team-availability context. | Manager workflows may add complexity without value. | A4, A5 |
| AT-1 | A modular NestJS monolith is sufficient for the first production-like version. | Architecture could require expensive restructuring. | A7, A8, A13 |
| AT-2 | Organization isolation can be reliably enforced in the selected architecture. | A failure could expose sensitive data across tenants. | A7, A8, A13 |
| AT-3 | Working-day, time-zone, balance, and concurrency rules can be modeled consistently. | Incorrect balances or approvals would undermine trust. | A3, A7, A13 |
| AT-4 | Angular, NestJS, PostgreSQL, Docker, and Rancher are suitable for the learning and deployment goals. | Tooling friction could delay or reduce learning outcomes. | A7, A8, A14 |
| AO-1 | Fixed roles and one manager approval step are sufficient for the first version. | Core workflows may require redesign or scope expansion. | A3, A5, A6 |
| AO-2 | Part-time steering-team capacity is sufficient to complete Explore in six weeks. | Reviews may slip and block the Govern handoff. | A1, A16 |
| AB-1 | Focused leave management is useful without implementing a complete HR platform. | The MVP may lack enough value or context to feel realistic. | A2, A6, A12 |

## Risks

| Code | Risk | Impact | Likelihood | Mitigation |
|------|------|--------|------------|------------|
| R1 | Sensitive employee information is exposed or over-collected. | High | Medium | Define data minimization and access boundaries in A3, A8, A12, and A13. |
| R2 | Tenant-isolation failure exposes data between organizations. | High | Medium | Validate enforcement patterns and negative tests in A7, A8, A13, and A14. |
| R3 | Leave balances or working-day calculations are incorrect. | High | High | Define invariants in A3; spike edge cases in A7; specify tests in A14. |
| R4 | Date and time-zone behavior causes subtle request errors. | High | Medium | Decide date semantics in A3/A8 and build boundary tests in A7/A14. |
| R5 | Concurrent approvals or updates create inconsistent balances. | High | Medium | Validate transaction and locking strategy in A7/A13 and stress-test through A14. |
| R6 | Scope expands into a complete HR platform. | High | High | Maintain PRD exclusions, review scope at every checkpoint, and reject unapproved capability growth. |
| R7 | Dynamic roles or configurable workflows are introduced too early. | Medium | Medium | Preserve fixed roles and one-step approval unless A3/A12 records a justified change. |
| R8 | AI-assisted implementation introduces security or consistency defects. | High | Medium | Require TDD, human review, security checks, and traceability in A14/A16. |
| R9 | Product-specific demand and adoption remain unvalidated. | Medium | High | Treat adoption as a hypothesis in A2/A6 and avoid market-fit claims in the PRD. |

## Expected Outputs

1. Explore Bundle — `explore/explore-employee-hub/explore-bundle.md`.
2. Living discovery index — `explore/explore-employee-hub/discovery.md`.
3. Context baseline — `explore/explore-employee-hub/context.md`.
4. Market and comparable-product research — `explore/explore-employee-hub/market-research.md`.
5. Domain analysis — `explore/explore-employee-hub/domain-analysis.md`.
6. Shared glossary — `explore/glossary.md`.
7. Personas — `explore/domain/personas-employee-hub.md`.
8. Current and future journeys — `explore/domain/journey-employee-hub.md`.
9. Hypothesis and validation plan — `explore/explore-employee-hub/hypothesis.md`.
10. Technical feasibility assessment — `explore/explore-employee-hub/technical-feasibility.md`.
11. Architecture context and options — `explore/explore-employee-hub/architecture-context.md`.
12. Design pipeline artifacts and handoff — `explore/design/`.
13. Risk register — `explore/explore-employee-hub/risks.md`.
14. Product requirements document — `explore/prds/employee-hub-prd.md`.
15. High-level design — `explore/hlds/employee-hub-hld.md`.
16. Architecture decision records — `explore/decisions/employee-hub-adr-###-[decision-name].md`.
17. Test strategy — `explore/explore-employee-hub/test-strategy.md`.
18. DevOps strategy — `explore/explore-employee-hub/devops-strategy.md`.
19. Epic and implementation task set — `explore/epics/` and `work/03-pending-implementation/`.
20. Consistency and Govern readiness record — `explore/explore-employee-hub/govern-readiness.md`.

## Constraints

| Type | Constraint |
|------|------------|
| Budget | No dedicated paid-service budget is assumed; any paid service or platform requires sponsor approval during A1. |
| Timeline | Six-week, part-time Explore from 2026-08-27 through 2026-10-08. |
| Resources | Andrei covers Product Manager and Architect reviews; the initiative owner covers Lead Engineer and sponsor responsibilities. No dedicated UX designer or domain expert is assigned. |
| Data | Use fictional employee data only; no production or personal employee data may be introduced. |
| Product Scope | One organization in local development, fixed roles, simple leave policy, one approval step, and explicit exclusions for payroll, recruitment, and performance management. |
| Technical | Angular frontend and modular NestJS backend as separate applications in one repository; PostgreSQL primary data store; npm; organization boundaries designed into the API. |
| Compliance | Formal legal and regulatory analysis is deferred. Do not claim certification or jurisdictional compliance. Security and privacy engineering remain required. |
| Operational | Docker-based local environment, Rancher deployment target, automated testing, CI/CD, and observability; exact providers and service levels remain to be selected. |

## Checkpoints

| Milestone | Criteria |
|-----------|----------|
| Week 1 end | A1 context baseline approved; A2 research questions and source criteria agreed; A3 domain-analysis inventory initialized. |
| Week 2 end | A2–A6 complete; evidence limitations documented; glossary, personas, current journeys, and hypothesis reviewed by the steering team. |
| Week 3 end | A7 feasibility spikes complete with reproducible findings; A8 architecture options and decision criteria documented. |
| Week 4 end | A8–A11 complete; future journeys, user flows, wireframes, and risk register approved with unresolved items explicitly listed. |
| Week 5 end | A12 PRD approved in principle; A13 HLD and ADR set drafted with traceability to requirements and risks. |
| Week 6 end | A13–A16 complete; test and DevOps strategies approved; epics/tasks trace to PRD/HLD; consistency checks pass; Govern readiness decision recorded. |

## Document History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2026-08-27 | 1.0 | Explore Agent | Initial Explore Bundle created from the routed Signal and approved steering-team selections. |

## Related Artifacts

- Signal: [Employee Hub leave-management Signal](../../signal/signals/20260827-employee-hub-leave-management.md)
- Discovery index: [Employee Hub discovery](discovery.md)
- PRD: [Employee Hub PRD](../prds/employee-hub-prd.md) — planned
- HLD: [Employee Hub HLD](../hlds/employee-hub-hld.md) — planned
