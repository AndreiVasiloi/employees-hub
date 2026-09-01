# Step 2: Assess Testing Scope and Risk Profile

## Entry Criteria
- Context summary from Step 1 is complete
- PRD and HLD testability drivers are available

## Actions

### Action 1: Propose Testing Scope

**Agent proposes what is in and out of scope based on context:**

| Area | In Scope | Rationale |
|------|----------|-----------|
| [Feature/component 1] | Yes / No / Partial | [From PRD/HLD] |
| [Feature/component 2] | Yes / No / Partial | [From PRD/HLD] |
| Third-party services (external) | Stub/Mock only | Cannot control external systems |
| Legacy systems | [Yes/No/Partial] | [From HLD constraints] |

**STOP — AskUserQuestion:**

```
Question TS-1
  Header:      "Testing scope"
  Question:    "I've proposed the testing scope based on the PRD and HLD (table above).
                Is anything wrong, missing, or should something be excluded?"
  Multi-select: No
  Options:
    - All correct — proceed         — Scope confirmed; continue to risk assessment
    - Adjust scope                  — Tell me what to add, remove, or change
    - Exclude an area               — Tell me what is out of scope and why
    - Add an area                   — Tell me what additional area needs test coverage
```

### Action 2: Risk-Based Prioritisation Questions

**Agent asks targeted questions to understand risk appetite and priorities:**

**STOP — AskUserQuestion:**

```
Question TS-2
  Header:      "Risk tolerance and testing depth"
  Question:    "To calibrate testing depth per area, I need to understand your
                risk profile. Which statement best describes the project's quality posture?"
  Multi-select: No
  Options:
    - Safety-critical / regulated   — Zero tolerance for defects in core flows; compliance testing mandatory
    - Business-critical             — High quality bar; defects in core flows are costly but not dangerous
    - Standard commercial           — Normal quality expectations; balance speed and coverage
    - MVP / experimental            — Speed over coverage; test critical paths only, accept some risk
```

### Action 3: Identify High-Risk Areas

**Based on context + risk profile, agent proposes risk heat map:**

| Area | Risk Level | Risk Factors | Recommended Test Depth |
|------|-----------|--------------|----------------------|
| [Area 1 — e.g., Payment processing] | High | Financial impact, regulatory | Deep: unit + integration + contract + E2E |
| [Area 2 — e.g., User authentication] | High | Security, data privacy | Deep: unit + integration + E2E |
| [Area 3 — e.g., Reporting dashboard] | Medium | Data accuracy | Moderate: unit + integration |
| [Area 4 — e.g., Admin settings] | Low | Low usage, simple CRUD | Light: unit only |

**STOP — AskUserQuestion:**

```
Question TS-3
  Header:      "Risk assessment validation"
  Question:    "I've assessed risk levels for each area based on the PRD, HLD, and your
                risk posture. Does this risk heat map match your understanding?"
  Multi-select: No
  Options:
    - All correct — proceed         — Risk levels confirmed
    - Adjust risk levels            — Tell me which areas need higher or lower priority
    - Add a risk area               — Tell me what I missed
```

### Action 4: Non-Functional Testing Scope

**Agent asks about non-functional testing needs beyond basic functional coverage:**

**STOP — AskUserQuestion:**

```
Question TS-4
  Header:      "Non-functional testing needs"
  Question:    "Beyond functional testing, which non-functional testing types
                should the strategy include? Select all that apply."
  Multi-select: Yes
  Options:
    - Performance / Load testing    — Validate response times and throughput under load
    - Security testing              — OWASP checks, vulnerability scanning, pen test planning
    - Accessibility testing         — WCAG conformance verification (automated + manual)
    - Compatibility testing         — Cross-browser, cross-device, responsive validation
```

**After all questions answered, agent produces:**

```
Testing Scope & Risk Profile:

Scope:
  In scope: [list]
  Out of scope: [list with reasons]

Risk Posture: [Safety-critical / Business-critical / Standard / MVP]

Risk Heat Map:
  HIGH:   [areas] → Deep coverage (all pyramid layers)
  MEDIUM: [areas] → Moderate coverage (unit + integration)
  LOW:    [areas] → Light coverage (unit)

Non-Functional Testing:
  [✓/✗] Performance testing
  [✓/✗] Security testing
  [✓/✗] Accessibility testing
  [✓/✗] Compatibility testing
```

## Checkpoint
- [ ] Testing scope confirmed by user
- [ ] Risk posture selected
- [ ] Risk heat map validated
- [ ] Non-functional testing types selected

## Exit Criteria
- Scope, risk profile, and non-functional needs are locked
- Ready to define pyramid layers

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
