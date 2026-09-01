# Sequencing and Scope

Define implementation phases, dependencies, and apply task tags. Create interim artifact `work/12-sequencing.md`.

## Entry Criteria

- [ ] Step 11 (Risks and Dependencies) completed with all dependencies identified
- [ ] `work/11-risks.md` exists
- [ ] Implementation strategy defined
- [ ] All blocking and dependent tasks identified

## Exit Criteria

- [ ] Implementation phases clearly defined with logical sequencing
- [ ] Independent work opportunities identified
- [ ] Blocked dependencies documented with clear relationships
- [ ] Scope creep detected and documented
- [ ] Task tags applied
- [ ] `work/12-sequencing.md` created
- [ ] All dependencies and relationships validated

## Actions

### Phase Definition

Break down the implementation into logical phases:

#### Phase 1: Foundation
- Identify foundational components that must be implemented first
- Define prerequisites for subsequent phases
- Establish core infrastructure and data models

#### Phase 2: Core Features
- Implement primary functionality and business logic
- Build on foundation from Phase 1
- Focus on main user workflows

#### Phase 3: Integration & Polish
- Complete integration points and cross-cutting concerns
- Add performance optimizations and error handling
- Finalize documentation and testing

### Dependency Analysis

#### Independent Work
Identify tasks that can be worked on in parallel

#### Blocked Dependencies
Document tasks that depend on others

#### Dependent Tasks
Identify tasks that depend on this implementation

### Scope Validation

Compare current implementation scope against original problem in `work/03-problem.md`:
- All original requirements addressed
- No scope creep detected
- Non-goals properly excluded

### Create Interim Artifact

Write findings to `work/12-sequencing.md`:

```markdown
# Sequencing and Scope

## Implementation Phases

### Phase 1: Foundation
- [ ] [Task]: [Description]
- [ ] [Task]: [Description]

### Phase 2: Core Features
- [ ] [Task]: [Description]
- [ ] [Task]: [Description]

### Phase 3: Integration & Polish
- [ ] [Task]: [Description]
- [ ] [Task]: [Description]

## Parallel Work Opportunities
- [ ] [Component/Feature]: Can be developed independently
- [ ] [Component/Feature]: No blocking dependencies

## Scope Validation

### Original Requirements
- [ ] [Requirement 1]: Addressed in Phase [N]
- [ ] [Requirement 2]: Addressed in Phase [N]

### Scope Creep Detected
- [Feature]: Beyond original scope - [Action needed]

### Non-Goals Confirmed Excluded
- [Non-goal 1]: Not included
- [Non-goal 2]: Not included

## Task Tags
- **Complexity**: [simple | moderate | complex]
- **Component**: [manager | server | app | cross-cutting]
- **Type**: [feature | fix | enhancement | refactor]
- **Priority**: [high | medium | low]
- **Risk**: [high | medium | low]
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present sequencing and scope:
  - "Phase logic: Do the implementation phases follow a logical sequence?"
  - "Dependency accuracy: Are all dependencies correctly identified?"
  - "Scope validation: Have we stayed within the original problem scope?"
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Document sequencing based on `work/11-risks.md` dependencies
- Flag scope creep but don't create stubs without user approval
- Select tags based on task content
- Create `work/12-sequencing.md` with findings
- Proceed to Step 13 after documenting

## Quality Checks

- [ ] Implementation phases are logical and sequential
- [ ] All dependencies identified and properly categorized
- [ ] Independent work opportunities maximized
- [ ] Scope creep detected and documented
- [ ] Task tags applied according to taxonomy
- [ ] Sequencing plan is actionable and clear

## Next Step

→ [13-create-technical-plan.md](./13-create-technical-plan.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
