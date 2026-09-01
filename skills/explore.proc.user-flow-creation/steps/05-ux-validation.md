# Step 5: Run UX Validation Check

## Objective

Automatically validate every flow against UX best practices.

## Entry Criteria

- [ ] Step 4 (Create Flow Set) complete

## Actions

### 5.1 Validate Each Flow

**Validation Rules**:
- [ ] One goal per flow (single task objective)
- [ ] Clear entry point defined
- [ ] Clear exit/success state defined
- [ ] Every diamond has exactly 2 labeled paths
- [ ] No dead ends (every path leads somewhere)
- [ ] Shape consistency (Rectangle=screen, Circle=action, Diamond=decision)
- [ ] No redundant or repeated steps
- [ ] Directional flow (moves forward, no unexplained backward arrows)
- [ ] Every step has [VALIDATED] or [ASSUMPTION] tag
- [ ] All steps and paths are labeled

### 5.2 Present Validation Results

```
UX Validation for F[N]: [Title]

- [✓/✗] Single objective
- [✓/✗] Clear entry/exit
- [✓/✗] Decision completeness
- [✓/✗] No dead ends
- [✓/✗] Shape consistency
- [✓/✗] Tag completeness

Status: [VALID ✓ / VIOLATIONS FOUND ✗]
```

**STOP**: If violations found, fix them before proceeding.

## Exit Criteria

- [ ] All flows validated against UX rules
- [ ] All violations resolved
- [ ] All flows pass validation

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.user-flow-creation:0.2.1:2026-08-31T12:53:29Z -->
