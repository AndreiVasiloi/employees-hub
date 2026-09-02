# Step 7: Verify Integration

## Objective

Verify that the integration points touched by the CURRENT test are properly implemented with real infrastructure connections, not mocks or stubs.

## Loop Context

**This step is part of a per-test loop:**
```
For each test in inventory:
  → Step 6: Select test & implement
  → Step 7: Verify integration (YOU ARE HERE)
  → Step 8: Validate quality
  → Return to Step 6 for next test
```

## Entry Criteria

- Current test implementation complete (Step 6 complete for this test)
- Test passes (green)
- Ready to verify integration for this test

## Actions

### 7.1 Comprehensive Integration Review

Systematically verify each integration point from the architectural context diagram:

**Event Consumers:**
- Verify actual Kafka listeners exist (not just interfaces)
- Check proper topic configuration and deserialization
- Confirm event handling logic is implemented
- Validate error handling and dead letter queue setup

**Event Producers:**
- Verify actual Kafka producers are configured
- Check proper topic publishing and serialization
- Confirm CloudEvents headers are set correctly
- Validate publishing logic in the code paths

**API Consumers:**
- Verify actual HTTP clients are implemented (not just interfaces)
- Check proper endpoint configuration and authentication
- Confirm request/response handling logic
- Validate error handling and retry mechanisms

**API Producers:**
- Verify actual REST endpoints are exposed
- Check proper request mapping and validation
- Confirm response formatting and status codes
- Validate API documentation if applicable

**Data Persistence:**
- Verify actual repository implementations (not in-memory)
- Check proper database connections and transactions
- Confirm entity mappings and queries
- Validate data access patterns and security

**Configuration:**
- Verify all infrastructure components are wired
- Check configuration properties are defined
- Confirm environment-specific configurations
- Validate health checks and monitoring endpoints

### 7.2 Cross-Reference with Diagram

Compare the actual implementation against the architectural context diagram:
- For each arrow in the diagram, find the corresponding code
- For each component, verify the connections are real
- Identify any gaps between diagram and implementation

### 7.3 Integration Test Validation

Run integration-focused tests to verify real connections:
- Testcontainers-based tests with real infrastructure
- End-to-end tests spanning multiple components
- Event flow tests with actual Kafka topics
- API integration tests with real HTTP calls

### 7.4 Document Integration Status

Create an integration verification report:
```
## Integration Verification for {TASK_ID}

### Event Consumers
- [✓/✗] {event_name} - {implementation_status}
- [✓/✗] {event_name} - {implementation_status}

### Event Producers  
- [✓/✗] {event_name} - {implementation_status}
- [✓/✗] {event_name} - {implementation_status}

### API Consumers
- [✓/✗] {service_name} - {implementation_status}
- [✓/✗] {service_name} - {implementation_status}

### Data Persistence
- [✓/✗] {repository_name} - {implementation_status}
- [✓/✗] {repository_name} - {implementation_status}
```

### 7.5 Address Integration Gaps

If any integration points are found to be stub-only or missing:
- Determine if this is intentional (interface-only design)
- Plan implementation of real integration if required
- Add integration tests to verify real connections
- Document any temporary limitations

## Discussion Point (Governed Mode)

**STOP**: Present integration verification results:
- "Integration verification complete for {TASK_ID}:"
- "Real connections verified: {count}/{total}"
- "Integration gaps found: {list any gaps}"
- "Integration tests passing: ✓/✗"
- "Any integration gaps need addressing, or is this intentional?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-check architectural diagram vs actual implementation
- Auto-verify real infrastructure vs mocks/stubs
- Auto-run integration tests if they exist
- Auto-flag integration gaps for user review
- Proceed to Step 8 if integration adequate
- Flag gaps if found and continue with user review

## Exit Criteria (for this test)

- [ ] Integration points touched by current test verified
- [ ] Real infrastructure connections confirmed (not stubs)
- [ ] Integration gaps documented or addressed
- [ ] Ready for quality validation

## Next Step

→ [08-validate-quality.md](./08-validate-quality.md) — Validate quality for this test

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
