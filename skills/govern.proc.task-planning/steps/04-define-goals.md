# Step 4: Define Goals and Constraints

## Objective

Establish measurable goals, explicit constraints, non-goals, and assumptions. Create interim artifact `work/04-goals.md`.

## Entry Criteria

- Problem statement captured (Step 3 complete)
- `work/03-problem.md` exists
- Understanding of stakeholders and affected components

## Actions

### 4.1 List Measurable Goals

Define what success looks like:
- Each goal should be measurable or verifiable
- Goals should address the problem statement
- Prioritize goals if there are many (must-have vs nice-to-have)

### 4.2 Document Constraints

Capture explicit limitations:
- **Timeline**: Deadlines or milestones
- **Resources**: Team capacity, budget
- **Technical**: Platform limitations, compatibility requirements
- **Compliance**: Regulatory or policy requirements

### 4.3 Define Non-Goals

Explicitly state what is out of scope:
- Features that won't be included
- Problems that won't be solved
- Future work that's deferred

**Why non-goals matter**: Prevents scope creep and sets clear expectations.

### 4.4 Identify Assumptions

Document assumptions that need validation:
- Technical assumptions (e.g., "API X supports feature Y")
- Business assumptions (e.g., "Users prefer option A over B")
- Integration assumptions (e.g., "Service Z will be available")

Mark assumptions that are high-risk or unvalidated.

### 4.5 Create Interim Artifact

Write findings to `work/04-goals.md`:

```markdown
# Goals and Constraints

## Measurable Goals
- [ ] [Goal 1]: [How to verify]
- [ ] [Goal 2]: [How to verify]

## Constraints
- **Timeline**: [Constraint]
- **Resources**: [Constraint]
- **Technical**: [Constraint]
- **Compliance**: [Constraint]

## Non-Goals
- [Non-goal 1]: [Why excluded]
- [Non-goal 2]: [Why excluded]

## Assumptions
| Assumption | Risk | Validation |
|------------|------|------------|
| [Assumption 1] | [High/Medium/Low] | [How to validate] |
| [Assumption 2] | [High/Medium/Low] | [How to validate] |
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present goals and constraints to user:
  - "Goals: [list]"
  - "Constraints: [list]"
  - "Non-goals: [list]"
  - "Assumptions to validate: [list]"
  - "Does this capture the scope correctly?"
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Extract goals from epic acceptance criteria if available
- Infer constraints from project context
- Mark anything not explicitly in scope as a non-goal
- Flag assumptions that require external validation
- Create `work/04-goals.md` with findings
- Proceed to Step 5 after documenting

## Exit Criteria

- [ ] Measurable goals documented
- [ ] Constraints captured (timeline, resources, technical, compliance)
- [ ] Non-goals explicitly stated
- [ ] Assumptions identified and risk-flagged
- [ ] `work/04-goals.md` created

## Next Step

→ [05-search-related-work.md](./05-search-related-work.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
