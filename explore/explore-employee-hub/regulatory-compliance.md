# Regulatory and Compliance Focus: Employee Hub

**Project**: Employee Hub  
**Created**: 2026-08-31  
**Last Updated**: 2026-08-31  
**Status**: Learning-scope baseline; not legal approval

> This document records product and engineering boundaries for a learning project. It is not legal advice, a jurisdictional assessment, or a claim of regulatory, security, or accessibility compliance.

## 1. Applicable Standards and Policies

### Scope decision

| Dimension | Decision | Reassessment trigger | Owner | Validation |
|---|---|---|---|---|
| Region | No launch market or operating jurisdiction is defined. No region-specific law is selected. | Deployment for real users or selection of a target market | Andrei — Product Manager | Scope review before deployment |
| Industry | Internal leave management is modelled for learning; no regulated industry operation is claimed. | Use by an organization in a regulated sector | Andrei — Product Manager | Product-scope review |
| Data | Only fictional employee and leave data is permitted. Real identifiable people and their data are out of scope. | Collection, import, or processing of any real-person data | Andrei — Architect | Fixture review and environment audit |
| Certification | No certification or attestation is required or claimed. | Commercialization, procurement requirement, or production governance decision | Andrei — Architect | Release-documentation review |

The distinction matters because information relating to an identified or identifiable person can be personal data; fictional records must therefore not be derived from real people. See the [European Commission data-protection guidance](https://commission.europa.eu/system/files/2020-06/5._h2020_ethics_and_data_protection_0.pdf).

### Non-binding engineering references

| Reference | Use | Claim boundary | Owner | Validation |
|---|---|---|---|---|
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA | Accessibility design and test target | No conformance claim until the complete applicable experience is evaluated | Andrei — Product Manager | Automated and manual accessibility evidence |
| [OWASP ASVS 5.0.0](https://owasp.org/www-project-application-security-verification-standard/) | Source for proportionate web-security requirements and tests | No ASVS level or certification claim | Andrei — Architect | Threat, code, configuration, and test review |

No GDPR, ePrivacy, EAA, EN 301 549, Section 508, HIPAA, CCPA, SOC 2, ISO 27001, or equivalent obligation is asserted for the current scope. Applicability must be assessed by qualified organizational or legal reviewers when a trigger above occurs.

## 2. Data Handling Rules

### Collection and minimization

| Requirement | Rule | Owner | Validation |
|---|---|---|---|
| Synthetic data only | Employees, organizations, contact details, identifiers, balances, requests, and audit events must be invented and must not reproduce real people. | Andrei — Lead Engineer | Seed/fixture and demo-data review |
| Purpose limitation | Data exists only to exercise employee profiles, leave configuration, requests, approvals, balances, notifications, authorization, and audit behaviour. | Andrei — Product Manager | PRD and schema review |
| Minimized leave details | Store leave type, dates, optional concise note, status, calculation facts, and workflow evidence. Do not request medical details, diagnoses, attachments, government IDs, payroll, or recruitment/performance data. | Andrei — Product Manager | Form, API contract, and schema tests |
| Consent and age | Consent, age gates, and parental consent are not applicable because the project is not a real-user service and may not process real-person data. | Andrei — Product Manager | Shared-demo scope review |

### Retention, deletion, access, and portability

| Area | Current rule | Owner | Validation |
|---|---|---|---|
| Retention | Synthetic operational and audit data may remain for the lifetime of an active learning environment. Reset it before an externally shared demonstration and when it is no longer useful. | Andrei — Lead Engineer | Environment runbook check |
| Deletion | No statutory or user-request deletion process is defined. Test fixtures and disposable environments must be resettable. | Andrei — Architect | Reset/seed procedure test |
| Archival/legal hold | Not applicable; no production records or legal hold process exists. | Andrei — Product Manager | Scope review |
| User access | Users see only data allowed by their role, organization, reporting relationship, and workflow responsibility. | Andrei — Architect | Positive and negative authorization tests |
| Export/portability | No regulatory export is required. Any learning export must preserve authorization and minimize fields. | Andrei — Architect | API and authorization tests |
| Third parties | No third-party processor receives Employee Hub data in the current scope. | Andrei — Architect | Dependency and deployment review |

### Security and transfers

| Requirement | Rule | Owner | Validation |
|---|---|---|---|
| Authentication | Every non-public operation requires an authenticated identity. | Andrei — Architect | Integration tests |
| Authorization | Role and organization boundaries are enforced server-side; manager scope is restricted to direct reports where applicable. | Andrei — Architect | Cross-role, cross-manager, and cross-organization denial tests |
| Least privilege | UI visibility is not an authorization control. APIs and data queries return only the minimum permitted records and fields. | Andrei — Architect | Code review and integration tests |
| Secrets | Credentials, signing keys, and tokens must not be committed or logged; shared environments use protected configuration. | Andrei — Lead Engineer | Secret scan and configuration review |
| Transport/storage | Shared environments use encrypted transport and protected database/volume configuration. Exact platform controls are defined during deployment design. | Andrei — Architect | Deployment configuration check |
| Incident handling | No statutory breach timeline is claimed. Suspected exposure blocks sharing: contain access, rotate affected secrets, remove exposed data, preserve safe evidence, correct the control, and retest. | Andrei — Architect | Incident exercise before shared deployment |
| Cross-border transfer | Not applicable because real-person data is prohibited and no hosting region is committed. Selecting a region or real data triggers reassessment. | Andrei — Product Manager | Deployment gate review |

## 3. Accessibility Requirements

### Baseline and obligations

WCAG 2.2 Level AA is a voluntary quality target. No jurisdictional legal obligation, penalty, exemption, or formal conformance claim is recorded.

| Requirement | Baseline | Owner | Validation |
|---|---|---|---|
| Keyboard and focus | All functionality is keyboard-operable, has no trap, follows a logical order, and exposes visible, unobscured focus. | Andrei — Lead Engineer | Manual keyboard test for each critical flow |
| Semantics and screen readers | Native semantics are preferred; controls, fields, statuses, errors, dialogs, and changing results have programmatic names, roles, relationships, and announcements. | Andrei — Lead Engineer | Automated scan and representative screen-reader check |
| Contrast and non-color cues | AA contrast is targeted: 4.5:1 for normal text and 3:1 for large text and meaningful UI components. Meaning is not conveyed by color alone. | Andrei — Product Manager | Design-token and page-level contrast check |
| Text alternatives | Informative images have equivalent text; decorative images are ignored; icons used as controls have accessible names. | Andrei — Lead Engineer | Automated scan and content review |
| Adaptability | Content remains usable at 200% zoom, reflows without loss of critical functionality, and does not unnecessarily restrict orientation. | Andrei — Lead Engineer | Browser zoom and responsive manual test |
| Accessible authentication | Authentication must not depend only on memory, transcription, puzzles, or inaccessible gestures. | Andrei — Architect | Authentication-flow review |

### Testing and documentation

| Evidence | Frequency | Owner | Validation |
|---|---|---|---|
| Automated accessibility checks | In CI for implemented user-interface increments | Andrei — Lead Engineer | Passing report retained with CI run |
| Manual keyboard review | Before completing each critical workflow increment | Andrei — Lead Engineer | Checklist attached to review evidence |
| Screen-reader review | For profile, request, status, approval/rejection, and error paths before shared MVP | Andrei — Lead Engineer | Recorded test notes |
| Participant testing | Include accessibility observations in the planned 2–3 participant learning test; do not claim disability representation unless recruited. | Andrei — Product Manager | Research notes |

An accessibility statement and VPAT/ACR are not required for the learning scope. A public or contractual use case triggers reassessment.

## 4. Copy and Disclosure Requirements

### Required disclosure

A persistent notice must appear in every shared instance and its README or access instructions:

> Employee Hub is a learning/demo application. Use fictional data only. It is not a production HR service and makes no legal, security-certification, or accessibility-conformance claim.

**Owner**: Andrei — Product Manager. **Validation**: manual UI and documentation review before sharing.

Privacy policies, terms of service, cookie consent, marketing consent, breach notices, service/price-change notices, and consent records are not applicable while there are no real users, non-essential tracking technologies, commercial terms, or jurisdiction. Introducing any of these is a reassessment trigger.

### Product-state disclosures

| Situation | Required copy behaviour | Owner | Validation |
|---|---|---|---|
| Leave submission | State that submission creates a pending request, not approved leave. | Andrei — Product Manager | Journey and UI acceptance test |
| Working-day result | Show included working days and the effect of weekends and public holidays. | Andrei — Product Manager | Calculation UI test |
| Approval/rejection | Show the committed decision, actor, time, and balance effect; notification delivery must not be presented as the source of truth. | Andrei — Product Manager | Workflow and audit test |
| Destructive or conflicting action | Explain the consequence and provide an actionable recovery/error message. | Andrei — Product Manager | Negative-path usability test |

### Prohibited claims

| Prohibited | Acceptable alternative | Owner | Validation |
|---|---|---|---|
| “GDPR compliant” or equivalent | “Real personal data is outside the learning scope.” | Andrei — Product Manager | Copy review |
| “WCAG conformant” | “WCAG 2.2 AA is used as a design and test target.” | Andrei — Product Manager | Accessibility documentation review |
| “100% secure,” “fully secure,” or “ASVS certified” | Describe the specific implemented and tested controls. | Andrei — Architect | Security documentation review |
| “Legally accurate leave balance” | “Calculated using the configured learning policy and holiday calendar.” | Andrei — Product Manager | Product copy review |

## 5. Evidence Requirements

### Audit events

The application must create structured, append-only audit events for authentication outcomes, authorization denials, leave creation/cancellation/approval/rejection, balance adjustments, employee/role/team changes, policy and holiday changes, relevant job outcomes, and security-sensitive configuration actions.

Each event contains timestamp, organization ID, actor or system identity, action, target type and ID, correlation ID, outcome, and safe before/after facts when relevant. Events must not contain passwords, tokens, keys, unnecessary free text, or unnecessary leave details.

| Requirement | Rule | Owner | Validation |
|---|---|---|---|
| Protection | Application users cannot rewrite or delete audit history through normal workflows. | Andrei — Architect | API and database integration tests |
| Searchability | Authorized reviewers can search by organization, actor, target, action, outcome, and time range. | Andrei — Lead Engineer | Query/API tests |
| Access | HR accesses operational audit history within its remit; administrators access security-sensitive activity. Audit access is itself logged. | Andrei — Architect | Role authorization tests |
| Retention | Audit records follow the active synthetic environment lifetime and reset rule; no statutory duration is claimed. | Andrei — Product Manager | Environment review |

### Verification evidence

Each delivery increment retains reviewable results for authorization and organization isolation, working-day calculations, balance transactions and concurrency, audit generation, critical accessibility paths, linting, tests, build, and deployment configuration as applicable. Certifications, formal penetration-test schedules, privacy impact assessments, DPAs, legal holds, regulatory response times, and formal compliance reports are not required or claimed in the current scope.

**Owner**: Andrei — Lead Engineer. **Validation**: definition-of-done and CI evidence review.

## 6. Compliance Risk Register

| ID | Risk / requirement | Likelihood | Impact | Priority | Consequences | Mitigation and detection | Response | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| RC-01 | Real-person data enters a synthetic-only environment | Medium | High | Critical | Privacy and trust exposure; unplanned legal/operational work | Synthetic seed conventions, demo notice, fixture and environment review | Restrict access, remove data safely, preserve minimal evidence, reassess applicability | Andrei — Product Manager | Open |
| RC-02 | A role, manager, or organization accesses unauthorized records | Medium | High | Critical | Confidentiality failure, loss of trust, data correction and redesign | Server-side scoping, query constraints, adversarial authorization tests, audit denials | Contain access, investigate scope, fix, add regression test, reset affected demo data | Andrei — Architect | Open |
| RC-03 | Secrets or non-local traffic/storage are insufficiently protected | Medium | High | Critical | Account/system compromise and environment disruption | Protected configuration, secret scanning, encrypted transport, deployment review | Disable access, rotate secrets, correct configuration, retest | Andrei — Architect | Open |
| RC-04 | Leave forms or logs collect unnecessary sensitive details | Medium | High | High | Greater exposure and unclear product purpose | Minimal schema/forms, no medical fields or uploads, payload/log review | Remove fields/data, update fixtures, add schema tests | Andrei — Product Manager | Open |
| RC-05 | Audit evidence is incomplete, mutable, or overexposes content | Medium | Medium | High | Decisions cannot be explained; troubleshooting becomes unreliable | Structured event contract, append-only workflow, access and completeness tests | Preserve available evidence, repair event generation, backfill only when provenance is explicit | Andrei — Architect | Open |
| RC-06 | Critical flows are inaccessible | Medium | Medium | High | Participants cannot complete tasks; usability and learning evidence are biased | WCAG target, automated scans, keyboard and screen-reader checks | Block increment, remediate, rerun manual and automated tests | Andrei — Product Manager | Open |
| RC-07 | Documentation or UI makes unsupported compliance/security claims | Low | High | High | Misleading expectations and reputational risk | Prohibited-claim list and release copy review | Withdraw claim, correct materials, reassess if a formal claim is desired | Andrei — Product Manager | Open |

No medium or low risks are accepted at this baseline. “Launch” in this register means sharing a deployed learning increment beyond the developer’s private environment.

## 7. Non-Negotiables List

| Category | Shared-demo/release blocker | Why / consequence | Owner | Validation |
|---|---|---|---|---|
| Legal scope | Real-person data is prohibited; its introduction requires reassessment before processing continues. | The current no-jurisdiction decision would no longer be sufficient. | Andrei — Product Manager | Data and scope review |
| Data protection | Synthetic data is minimized and organization/role/manager boundaries are enforced server-side. | Failure exposes records and invalidates security-learning outcomes. | Andrei — Architect | Schema and authorization tests |
| Accessibility | Critical flows satisfy the keyboard, semantics, status/error, contrast, and adaptability baseline. | Participants may be unable to complete essential tasks. | Andrei — Product Manager | Automated and manual accessibility evidence |
| Security | Authentication protects non-public operations; secrets stay out of source; shared transport and storage/configuration are protected. | Failure can expose or compromise the environment. | Andrei — Architect | Integration, secret-scan, and deployment checks |
| Disclosure | Shared instances show the learning/demo notice and make no unsupported claim. | Users could mistake the project for a production or certified service. | Andrei — Product Manager | UI and documentation review |
| Evidence | Critical workflow, authorization, calculation, balance, audit, and accessibility controls have test evidence; required audit events are present. | Behaviour cannot be trusted or explained. | Andrei — Lead Engineer | CI and review checklist |

These blockers cannot be deferred for a shared learning release. A failed validation blocks sharing until the control is corrected and retested.

## 8. Compliance Acceptance Criteria

### Data collection, retention, and scope

- [ ] Every committed seed and fixture is fictional and cannot reasonably be mistaken for a real person. Owner: Andrei — Lead Engineer. Validation: fixture review.
- [ ] Employee and leave forms, DTOs, schemas, and logs exclude medical details, government identifiers, payroll data, and file uploads. Owner: Andrei — Product Manager. Validation: contract/schema tests and review.
- [ ] A documented command or procedure resets synthetic operational and audit data. Owner: Andrei — Lead Engineer. Validation: successful reset-and-reseed test.
- [ ] Consent, age, statutory retention/deletion, portability, and cross-border criteria remain marked not applicable unless a trigger in Section 1 occurs. Owner: Andrei — Product Manager. Validation: release-scope review.

### Security

- [ ] Unauthenticated requests to every non-public endpoint are rejected. Owner: Andrei — Architect. Validation: integration tests.
- [ ] Employee, manager, HR, and administrator permissions pass positive and negative tests. Owner: Andrei — Architect. Validation: authorization test matrix.
- [ ] Cross-manager and cross-organization record access is rejected even when a valid record ID is supplied. Owner: Andrei — Architect. Validation: adversarial integration tests.
- [ ] Secrets are absent from tracked files and logs. Owner: Andrei — Lead Engineer. Validation: secret scan and log review.
- [ ] Shared-environment transport and storage/configuration protections are documented and verified. Owner: Andrei — Architect. Validation: deployment checklist.
- [ ] MFA and statutory breach procedures are marked not applicable rather than claimed as implemented; a real production identity/deployment decision reopens them. Owner: Andrei — Architect. Validation: architecture review.

### Accessibility

- [ ] Critical functionality is keyboard-operable with no trap and with visible, unobscured focus. Owner: Andrei — Lead Engineer. Validation: manual keyboard test.
- [ ] Interactive elements, inputs, errors, dialogs, statuses, and dynamic results expose meaningful semantics and announcements. Owner: Andrei — Lead Engineer. Validation: automated scan and representative screen-reader test.
- [ ] Text and meaningful UI components meet the documented AA contrast target, and state is not conveyed by color alone. Owner: Andrei — Product Manager. Validation: contrast and design review.
- [ ] Informative images have equivalent text, decorative images are ignored, and icon-only controls have accessible names. Owner: Andrei — Lead Engineer. Validation: automated scan and manual review.
- [ ] Critical pages remain usable at 200% zoom and responsive layouts do not lose content or actions. Owner: Andrei — Lead Engineer. Validation: browser and viewport test.

### Disclosures

- [ ] Every shared instance and its access documentation show the approved learning/demo notice. Owner: Andrei — Product Manager. Validation: manual review.
- [ ] Submission, calculation, approval, rejection, cancellation, and error copy accurately distinguishes pending state, committed state, balance effect, and recovery action. Owner: Andrei — Product Manager. Validation: workflow acceptance tests.
- [ ] UI and documentation contain none of the prohibited claims in Section 4. Owner: Andrei — Product Manager. Validation: release copy review.
- [ ] Terms, privacy, cookie, pricing, and statutory notices remain marked not applicable until their stated trigger occurs. Owner: Andrei — Product Manager. Validation: release-scope review.

### Audit and evidence

- [ ] Each required event type produces a structured audit event with all mandatory safe fields. Owner: Andrei — Architect. Validation: integration tests.
- [ ] Audit events exclude credentials, tokens, keys, and unnecessary leave free text. Owner: Andrei — Architect. Validation: payload assertions and log review.
- [ ] Normal application workflows cannot update or delete audit events. Owner: Andrei — Architect. Validation: API and database tests.
- [ ] Audit queries are searchable, role-scoped, organization-scoped, and audit-access events are logged. Owner: Andrei — Architect. Validation: authorization and query tests.
- [ ] Each completed increment links its relevant tests, checks, review notes, and skipped checks with reasons. Owner: Andrei — Lead Engineer. Validation: definition-of-done review.
- [ ] Certifications, DPAs, PIAs, formal penetration reports, legal holds, and regulatory response timelines are not presented as available. Owner: Andrei — Product Manager. Validation: documentation review.

### Regional compliance

- [ ] No region-specific compliance claim appears while no target jurisdiction is selected. Owner: Andrei — Product Manager. Validation: scope and copy review.
- [ ] Selecting a real deployment market, real-person data, regulated-sector use, procurement requirement, or formal conformance claim creates a new compliance assessment before release. Owner: Andrei — Product Manager. Validation: governance gate.

These criteria must be mapped into the PRD, QA planning, and definition of done. Criteria applicable to an increment must pass before that increment is shared.

## Related Artifacts

- [Explore Bundle](./explore-bundle.md)
- [Context](./context.md)
- [Domain Analysis](./domain-analysis.md)
- [Market Research](./market-research.md)
- [Technical Feasibility](./technical-feasibility.md)
- [Architecture Context](./architecture-context.md)
- [Hypothesis](./hypothesis.md)
- [Personas](../domain/personas-employee-hub.md)
- [Current-State Journey](../domain/journey-employee-hub.md)
- Planned PRD: `explore/prds/employee-hub-prd.md`

**Last Updated**: 2026-08-31  
**Status**: Learning-scope baseline; not legal approval  
**Legal Review**: Not performed or required for the current fictional-data scope  
**Approved By**: Pending human confirmation
