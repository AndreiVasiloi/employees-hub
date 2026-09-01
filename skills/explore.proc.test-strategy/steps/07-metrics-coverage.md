# Step 7: Metrics and Success Criteria

## Entry Criteria
- Quality gates defined from Step 6
- Pyramid layers and targets from Step 3

## Actions

### Action 1: Define Technical Metrics

**Agent defines measurable KPIs per category:**

**Coverage Metrics:**

| Metric | Target | Measurement Tool | Frequency |
|--------|--------|-----------------|-----------|
| Line coverage (unit) | ≥ 90% on business logic (FLOOR) | JaCoCo / Istanbul | Every PR |
| Branch coverage (unit) | ≥ 85% on business logic (FLOOR) | JaCoCo / Istanbul | Every PR |
| Function coverage (unit) | ≥ 95% on public interfaces (FLOOR) | JaCoCo / Istanbul | Every PR |
| Integration boundary coverage | 100% of boundaries have ≥ 1 test | Manual audit / CI check | Monthly |
| E2E journey coverage | 100% of critical journeys | Test inventory audit | Per release |

**Performance Metrics:**

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| Unit test suite duration | < 2 min | Fast feedback; developers run frequently |
| Integration test suite duration | < 10 min | Acceptable PR gate time |
| E2E test suite duration | < 30 min | Staging gate; doesn't block developer flow |
| Full pipeline duration (commit → staging) | < 20 min | Acceptable deployment cadence |

**Quality Metrics:**

| Metric | Target | Action When Exceeded |
|--------|--------|---------------------|
| Flaky test ratio | < 1% | Quarantine + fix within 1 sprint |
| Test maintenance ratio | < 20% of dev time | Refactor test infrastructure; reduce duplication |
| Defect escape rate | < 3% | Post-mortem; add missing lower-level tests |
| Mean time to detect (MTTD) | < 10 min (CI) | Pipeline optimisation |

### Action 2: Define Pyramid Health Indicators

**Agent defines distribution monitoring to prevent ice-cream cone drift:**

| Layer | Target % (FLOOR) | Red Flag |
|-------|---------|----------|
| Unit tests | 70-80% of total tests | Drops below 60% → team writing too few unit tests |
| Integration tests | 20-30% of total tests | Exceeds 35% → possible duplication with unit layer |
| Contract tests | 0-5% of total tests | N/A (only if multi-service) |
| E2E tests | 5-10% of total tests | Exceeds 15% → ice-cream cone forming; push tests down |

**All targets are FLOORS.** Teams should push higher wherever risk, regulation, or complexity justifies it. The goal is to automate every testable behaviour.

**Monthly health check:**
- Count tests per layer → compute distribution
- Compare against targets
- Flag any layer that drifts outside its target band
- Review and address in team retrospective

### Action 3: Define Business-Impact Metrics

| Metric | Baseline | Target | How to Measure |
|--------|----------|--------|---------------|
| Deployment frequency | [current or N/A] | [target from PRD/team goals] | CI/CD pipeline metrics |
| Lead time (commit → prod) | [current or N/A] | < [target] | Pipeline duration tracking |
| Change failure rate | [current or N/A] | < 5% | Post-deploy incident tracking |
| Mean time to recovery (MTTR) | [current or N/A] | < [target] | Incident management data |

**Note**: These align with DORA metrics. If the team doesn't currently track these, the test strategy establishes the baseline for future measurement.

### Action 4: Present Metrics Summary

```
Test Strategy Metrics:

Coverage Targets (ALL ARE FLOORS — push higher where risk justifies):
  Unit:        ≥ 90% line / ≥ 85% branch / ≥ 95% function
  Integration: 100% boundary coverage (happy + error + edge)
  E2E:         100% critical journey coverage

Speed Targets:
  Unit suite:        < 2 min
  Integration suite: < 10 min
  E2E suite:         < 30 min
  Full pipeline:     < 20 min

Quality Targets:
  Flaky ratio:       < 1%
  Maintenance ratio: < 20%
  Defect escape:     < 3%

Pyramid Distribution (FLOORS):
  Unit:        70-80%
  Integration: 20-30%
  Contract:    0-5%
  E2E:         5-10%

Red Flags:
  ⚠️ Unit < 60% → too few unit tests
  ⚠️ E2E > 15% → ice-cream cone forming
  ⚠️ Flaky > 1% → stability problem
  ⚠️ Pipeline > 30 min → feedback too slow

Goal: Automate every testable behaviour. Manual testing is exploratory only.
```

## Checkpoint
- [ ] Coverage metrics defined with targets
- [ ] Performance metrics defined with targets
- [ ] Quality metrics defined with action thresholds
- [ ] Pyramid health indicators defined
- [ ] Business-impact metrics identified (DORA alignment)

## Exit Criteria
- All metrics are measurable and have clear targets
- Red flags and action thresholds are defined
- Ready to write the test strategy document

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
