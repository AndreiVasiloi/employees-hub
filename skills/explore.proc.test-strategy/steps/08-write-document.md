# Step 8: Write Test Strategy Document

## Entry Criteria
- All previous steps (1-7) are complete
- All user questions answered and selections locked

## Actions

### Action 1: Assemble the Test Strategy Document

**Agent writes to:** `explore/explore-[slug]/test-strategy.md`

**Use template:** `templates/test-strategy-template.md`

**Agent populates every section from Steps 1-7 outputs:**

| Document Section | Source Step | Content |
|-----------------|-----------|---------|
| 1. Overview | Steps 1-2 | Purpose, scope, guiding principles, risk posture |
| 2. Testing Pyramid | Step 3 | Layer definitions, distribution targets, visual pyramid |
| 3. Unit Testing | Steps 3-4 | Scope, patterns, framework, coverage targets |
| 4. Integration Testing | Steps 3-4 | Boundaries, approach, framework, data strategy |
| 5. Contract Testing | Steps 3-4 | CDC approach, tooling (or "Not applicable" with rationale) |
| 6. E2E Testing | Steps 3-4 | Critical journeys, framework, stability approach |
| 7. Non-Functional Testing | Steps 2, 4 | Performance, security, accessibility, compatibility |
| 8. Test Data & Environments | Step 5 | Data strategy per layer, environment topology |
| 9. CI/CD Integration | Step 6 | Pipeline stages, quality gates, failure policies |
| 10. Metrics & Success Criteria | Step 7 | Coverage, performance, quality, DORA metrics |
| 11. Risks & Mitigations | Steps 2, 7 | Testing risks, red flags, mitigation actions |
| 12. References | Step 1 | Links to PRD, HLD, ADRs, tooling docs |

**Before writing, agent MUST verify:**
- [ ] Slug is confirmed
- [ ] Folder `explore/explore-[slug]/` exists (create if not)
- [ ] File name follows pattern: `test-strategy.md`
- [ ] All sections reference actual project specifics (not generic placeholder text)
- [ ] All user decisions from Steps 2-6 are reflected
- [ ] Cross-references to PRD and HLD use correct file paths

### Action 2: Write Document History

**Include document history table at the top:**

```markdown
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | [date] | [Agent + Steering Team] | Initial test strategy |
```

### Action 3: Confirm Document Creation

**Agent confirms:**

```
Test Strategy written to Context Warehouse:
  ✓ explore/explore-[slug]/test-strategy.md — created

Sections: 12
Source documents referenced:
  - explore/prds/[slug]-prd.md
  - explore/hlds/[slug]-hld.md
  - explore/decisions/ ([N] ADRs)

User decisions incorporated:
  - Risk posture: [selection]
  - Contract testing: [selection]
  - E2E journeys: [N] selected
  - Tooling: [confirmed/adjusted]
  - Quality gate thresholds: [confirmed/adjusted]
  - CI/CD platform: [selection]
```

## Checkpoint
- [ ] Document written to correct path
- [ ] All 12 sections populated with project-specific content
- [ ] Document history included
- [ ] Cross-references to PRD, HLD, ADRs are correct
- [ ] All user decisions reflected

## Exit Criteria
- Test strategy document exists at `explore/explore-[slug]/test-strategy.md`
- Document is complete and ready for validation

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
