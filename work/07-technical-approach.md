# Technical Approach: EH0003 Refinement Iteration 1

## Current Detail Level

EH0003 will establish the first server-owned Access boundary in the NestJS
modular monolith. It will resolve a fictional provider identity to a local
account, organization, employee relationship, and fixed role, then expose
reusable authorization context and policies for later workforce and leave
modules. The Angular application will not be an authorization source.

## Decisions Already Constrained by Existing Direction

### Provider-neutral identity

- **Choice:** Use the ADR-003 OIDC/JWT-shaped identity contract with a local
  fictional stub.
- **Rationale:** Provider selection and external credentials are unavailable;
  the domain authorization boundary must still be testable now.
- **Guard:** The stub is development/test-only and cannot become a production
  authentication mechanism.

### Server-owned authorization

- **Choice:** Resolve organization and roles from server-owned records after
  identity resolution; ignore client-supplied organization or role values.
- **Rationale:** This is required by the HLD, PRD, and NFR-005.

### Fixed roles and reporting scope

- **Choice:** Support Employee, Manager, HR, and Administrator with explicit
  permissions. Manager scope is limited to direct reports; self-approval and
  mutation of immutable audit/ledger history are always denied.
- **Rationale:** Follows ADR-006 and the approved E1 scope.

### Failure and evidence

- **Choice:** Reject absent, invalid, expired, unlinked, cross-organization, and
  role-inappropriate requests with stable safe errors. Include actor and
  correlation context in security-sensitive evidence without secrets or
  unnecessary personal data.
- **Rationale:** Satisfies the approved safe-error, isolation, and audit
  requirements while keeping the implementation provider-neutral.

## Confirmed Implementation Decisions

### Identity input boundary

- Use a signed-token-shaped request adapter in production code.
- Provide an explicit development/test identity override for fictional local
  scenarios only.
- Keep token validation and provider-specific claim mapping behind the adapter;
  domain authorization consumes the resolved identity contract.

### Minimum persistence model

- Create `Organization`, `UserAccount`, `RoleAssignment`, and `Employee` tables
  in this task.
- Store the Employee-to-manager relationship with a same-organization
  constraint and support one effective manager for the MVP.
- Use TypeORM migrations and PostgreSQL as the authoritative store. Do not use
  an in-memory substitute for the application path.

### Proof surface

- Add a minimal protected `GET /api/v1/access/me` route that returns the safe
  resolved access context.
- Exercise authorization policies through HTTP integration tests using a small
  protected fixture route owned by the access module.
- Do not add employee-management or leave-management business routes here.

### Permission matrix scope

- Define the E1 identity/profile/workforce permission matrix now for Employee,
  Manager, HR, and Administrator.
- Leave permissions are explicitly unavailable until their owning tasks exist.
- Administrator access is represented by explicit permissions, never by a
  generic bypass; self-approval and immutable audit/ledger mutation remain
  denied.

### Audit implementation boundary

- Define a typed audit-event port and emit authorization-sensitive outcomes
  through it.
- Defer durable audit-record persistence and audit query screens to the Audit
  task, while retaining actor, organization, target, outcome, and correlation
  fields in the event contract.

## Component Changes

### NestJS API

- [ ] Add Access module boundaries for identity resolution, account/role lookup,
      authorization policies, and safe errors.
- [ ] Add TypeORM entities and migrations for the minimum access/workforce
      records.
- [ ] Add the protected access-context and policy-proof routes.
- [ ] Add the typed audit-event port and correlation context propagation.

### Tests

- [ ] Add Vitest unit tests for identity resolution and the fixed-role matrix.
- [ ] Add PostgreSQL integration tests for organization, role, manager, and
      account-linking constraints.
- [ ] Add HTTP negative tests for absent/invalid/expired/unlinked identities,
      cross-organization access, unrelated reports, self-approval, and
      prohibited mutations.

### Angular web application

- [ ] No feature UI is required; the web app must not duplicate or weaken the
      server authorization boundary.

## Data Model Changes

- `Organization` is the owner of scoped records.
- `UserAccount` links an external/provider-neutral subject to one organization
  and an active state.
- `RoleAssignment` stores one of the four fixed roles for an account.
- `Employee` belongs to an organization and may reference one active Manager
  Employee in that same organization.
- Business leave, audit storage, and notification tables remain outside this
  task.

## Integration Points

- HTTP request → identity adapter → linked UserAccount → organization/role
  context → authorization policy → protected route.
- Authorization-sensitive outcomes → typed audit-event port.
- Access module → TypeORM/PostgreSQL through explicit repositories and
  migrations.
- Future external identity providers implement the adapter contract without
  changing domain authorization policies.

## Configuration

- Local/test identity override is enabled only in non-production environments.
- Provider configuration is represented by validated adapter settings but no
  real provider credentials are committed.
- Automatic schema synchronization remains disabled; migrations are explicit.
- Stable error codes and correlation IDs are returned for rejected requests;
  responses exclude stack traces, secrets, and unauthorized record details.

## Dev Hints

- Follow the existing NestJS modular-monolith and Vitest patterns from EH0002.
- Keep all authorization checks server-side and test both allowed and denied
  paths for every matrix entry.
- Use fictional fixtures only and run the repository verification command before
  handoff.

## Tactical Decisions Deferred

- Exact class, method, DTO, and database-column names where they do not change
  the contract.
- Exact stable error wording after error codes and safe fields are selected.
- Exact test fixture names and generated migration filenames.
