# Step 4: Define Domain Rules and Constraints

## Objective

Document what must be true in the domain to inform validation logic and business rules implementation.

## Entry Criteria

- [ ] Step 3 (Lifecycle States) complete

## Actions

### 4.1 Document Business Rules

**For each rule**:
- **[Rule name]**: [Description]
  - Applies to: [Which entities/processes]
  - Validation: [How to check if rule is satisfied]
  - Exception handling: [What happens if rule is violated]

### 4.2 Document Constraints

**For each constraint**:
- **[Constraint name]**: [Description]
  - Type: [Technical / Business / Regulatory]
  - Impact: [What this constrains]
  - Rationale: [Why this constraint exists]

### 4.3 Document Invariants

Invariants are things that must always be true:
- [Invariant 1]: [What must always be true]
- [Invariant 2]: [What must always be true]

### 4.4 Document Calculations and Validation Rules

**Calculations and formulas**:
- [Calculation name]: [Formula and logic]

**Validation rules**:
- [Field/entity]: [Validation requirements]

These rules inform validation logic, error handling, and business logic implementation.

## Exit Criteria

- [ ] Business rules documented with validation criteria
- [ ] Constraints documented with type and rationale
- [ ] Invariants identified
- [ ] Calculations and validation rules listed

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.domain-analysis:0.1.2:2026-08-27T13:34:37Z -->
