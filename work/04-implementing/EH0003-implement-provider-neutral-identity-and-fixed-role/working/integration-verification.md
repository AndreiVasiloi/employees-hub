# Integration Verification: EH0003 Identity Adapter Tests

## Current Test Boundary

The current green tests verify only the provider-neutral identity adapter
contract and its lifecycle validation. They intentionally do not resolve a
database account, expose an HTTP route, or emit an audit event; those
integrations belong to later TDD loops.

## Integration Status

### Identity Adapter

- [x] A real TypeScript adapter implementation exists.
- [x] The test exercises the adapter directly rather than mocking it.
- [x] The adapter returns the normalized provider-neutral identity contract.
- [x] Lifecycle validation uses a deterministic injected clock and rejects
      empty, malformed, and expired identities with a safe error.

### API Producers

- [ ] No API endpoint is wired for this increment yet. The protected access
      route is intentionally deferred to the API test loop.

### Data Persistence

- [ ] No repository or database integration is touched by this increment. The
      adapter has no persistence dependency by design.

### Audit Events

- [ ] No audit port is touched by this increment. Event integration is deferred
      until authorization outcomes are implemented.

## Real Connections Verified

**1/1 current-test connections verified.** The adapter is directly exercised by
the passing Vitest tests. The remaining architecture arrows are not claimed as
implemented and are tracked by the remaining test inventory.

## Validation

- Targeted Vitest identity tests: passed (2 tests).
- API lint: passed.
- API TypeScript check: passed.
- API build: passed.
- Full suite: intentionally not green because 24 approved skeletons remain;
  the pre-existing disposable PostgreSQL test also requires a working container
  runtime in the current shell.
