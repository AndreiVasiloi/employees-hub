# Goals and Constraints

## Measurable Goals

- [ ] **Identity resolution:** A fictional local identity resolves to one
      server-owned user, organization, and fixed-role context, with contract tests
      covering valid and invalid states.
- [ ] **Authorization isolation:** The positive and negative permission matrix
      proves that every protected capability checks role and organization scope.
- [ ] **Reporting-line scope:** Manager access is limited to direct reports and
      rejects self-approval and unrelated reporting lines.
- [ ] **Safe failure behavior:** Missing, invalid, expired, unlinked, and
      unauthorized identities receive stable non-sensitive responses.
- [ ] **Audit attribution:** Authorization-sensitive outcomes contain the
      required actor and correlation context and produce the agreed audit evidence.
- [ ] **Regression protection:** The complete identity and authorization matrix
      is automated and passes in local verification and GitHub Actions.

## Constraints

- **Timeline:** Implemented as the next focused learning increment with regular
  development time from Andrei; no external delivery deadline is assumed.
- **Resources:** Andrei is Product Manager, Architect, and Developer; reviews
  are performed through the governed Dava.Flow workflow.
- **Technical:** Build on the completed EH0002 Angular/NestJS/PostgreSQL
  foundation, use the modular NestJS monolith, and keep the identity boundary
  provider-neutral with a local fictional identity stub.
- **Data:** Use fictional data only. Start with one local organization while
  preserving organization boundaries in the design.
- **Compliance:** This is a learning project; no formal GDPR or legal compliance
  certification is claimed. Security and data-minimization safeguards still
  apply within the project scope.
- **Platform:** External identity-provider capabilities remain unavailable and
  are not selected by this task.

## Non-Goals

- Final OIDC provider selection, registration, token issuance, or production
  identity integration.
- Local password authentication.
- Dynamic roles, configurable permissions, or administrator bypasses.
- Leave policies, balances, requests, approvals, notifications, or complete
  employee-profile workflows.
- Multi-office policy variation, payroll/HRIS integration, or legal automation.
- Shared Rancher deployment, production operations, or real employee data.

## Assumptions

| Assumption                                                                                   | Risk   | Validation                                                                                               |
| -------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| A local identity stub can represent the provider-neutral OIDC/JWT adapter contract.          | High   | Define a versioned contract and test valid, absent, invalid, expired, and unlinked identities.           |
| Server-resolved organization and role context is authoritative over client-supplied values.  | High   | Add negative tests that tamper with organization and role claims.                                        |
| One fixed role per user is sufficient for this increment.                                    | Medium | Confirm against ADR-006 and retain multi-role support as a future decision.                              |
| A user has one effective manager for direct-report scope.                                    | Medium | Model the relationship explicitly and test self, direct-report, unrelated, and cross-organization cases. |
| Audit and correlation requirements can be implemented without an external identity provider. | Medium | Define the minimum actor/correlation evidence and verify it in integration tests.                        |
| The EH0002 database and quality baseline are sufficient for this increment.                  | Low    | Run the inherited full quality gate before implementation completion.                                    |
