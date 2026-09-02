# Step 6: Review Architecture and Tests

## Objective

Validate architectural context diagram and test strategy are sufficient for implementation.

## Entry Criteria

- Standards alignment checked (Step 5 complete)
- Architecture and test artifacts accessible

## Actions

### 6.1 Review Architectural Context

If architectural context diagram exists, verify:

- [ ] **Scope clarity**: Diagram shows what's in/out of scope
- [ ] **Component boundaries**: Clear service/module boundaries
- [ ] **Integration points**: External dependencies identified
- [ ] **Data flows**: Key data flows documented
- [ ] **Consistency**: Matches technical approach in `plan.md`

**Architecture assessment:**
```markdown
### Architecture Context
- Diagram present: Yes / No
- Quality: ✓ Clear / ⚠ Incomplete / ✗ Missing
- Alignment with plan: ✓ Consistent / ⚠ Gaps / ✗ Conflicts
```

### 6.2 Review Test Strategy

Evaluate test requirements from planning:

#### Unit Tests
- [ ] Core business logic covered
- [ ] Edge cases identified
- [ ] Mocking strategy appropriate

#### Integration Tests
- [ ] Component interactions covered
- [ ] Database interactions tested
- [ ] External service interactions tested

#### Contract/API Tests
- [ ] CATS/Karate tests specified (if API changes)
- [ ] Contract versioning considered
- [ ] Breaking changes identified

#### E2E Tests
- [ ] Critical user journeys covered
- [ ] Failure scenarios considered

### 6.3 Review Observability Requirements

Check observability planning:

- [ ] **Metrics**: Key metrics identified (latency, throughput, errors)
- [ ] **Logging**: Log levels and MDC keys defined
- [ ] **Tracing**: Correlation IDs planned
- [ ] **Alerts**: Alert thresholds considered
- [ ] **Dashboards**: Dashboard needs identified

### 6.4 Record Findings

```markdown
## Architecture & Test Findings

### Architecture Context
- Status:
- Issues:

### Test Strategy
- Unit test coverage: 
- Integration test coverage:
- Contract test coverage:
- E2E test coverage:
- Gaps:

### Observability
- Status:
- Missing elements:
```

## Discussion Point (Governed Mode)

**STOP**: Share architecture and test findings:
- "Architecture and test review complete."
- Highlight any coverage gaps
- "Shall I continue to risks and dependencies?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Flag missing test inventory as major issue
- Note architecture diagram absence but don't block
- Proceed to Step 7

## Exit Criteria

- [ ] Architecture context reviewed (if present)
- [ ] Test strategy evaluated for completeness
- [ ] Observability requirements checked
- [ ] Findings documented

## Next Step

→ [07-review-risks-dependencies.md](./07-review-risks-dependencies.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
