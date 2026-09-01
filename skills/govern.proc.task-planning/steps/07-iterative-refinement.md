# Iterative Refinement

## Objective

Gather technical detail through discussion until sufficient for implementation, making ALL decisions that would be made during implementation. Create interim artifact `work/07-technical-approach.md`.

## Entry Criteria

- [ ] Step 06 (Update Task Metadata) completed with TOML links updated
- [ ] `work/05-research.md` exists with research findings
- [ ] No unresolved conflicts blocking refinement

## Actions

### Gather Technical Detail

For each refinement iteration:
1. Present current detail level
2. Identify areas still ambiguous or deferred to implementation
3. Ask: "What implementation decisions remain unmade?"
4. Discuss and resolve ambiguities

### Make Implementation Decisions

**Goal**: Minimize the chance of LLM breakdown during coding by making ALL decisions now.

Decisions to make:
- **Data model**: Field names, types, relationships
- **API design**: Endpoints, request/response shapes
- **Error handling**: Error types, recovery strategies
- **State management**: State transitions, persistence
- **Integration**: How components interact
- **Configuration**: What's configurable, defaults

### Check Completion Criteria

Stop refinement when:
- User confirms all major implementation decisions are documented
- Only minor tactical decisions remain (variable names, exact error messages)
- Sufficient clarity that an implementer would not need to make architectural or design choices

### Create Interim Artifact

Write findings to `work/07-technical-approach.md`:

```markdown
# Technical Approach

## High-Level Strategy
[Overview of implementation approach]

## Architecture Decisions

### [Decision 1]
- **Choice**: [What was decided]
- **Rationale**: [Why this choice]
- **Alternatives Considered**: [What else was considered]

### [Decision 2]
- **Choice**: [What was decided]
- **Rationale**: [Why this choice]

## Component Changes

### [Component 1]
- [ ] [Change description]
- [ ] [Change description]

### [Component 2]
- [ ] [Change description]

## Data Model Changes
[If applicable - new/modified models, fields, relationships]

## Integration Points
[How components interact, APIs, events]

## Configuration
[What's configurable, defaults]

## Dev Hints
[Useful commands, code snippets, patterns to follow]
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- **STOP** after each iteration:
  ```
  I've completed refinement iteration [N]. Current detail level:
  - [Summary of what's been specified]
  - [Key decisions made]
  - [Areas still ambiguous]

  What implementation decisions remain unmade?
  Should I continue adding detail, or is this sufficient?
  ```
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Gather detail until all architectural decisions are made
- Use existing decisions from `work/05-research.md` to guide choices
- Follow patterns from related completed tasks
- Create `work/07-technical-approach.md` with findings
- Stop when only tactical decisions remain
- Proceed to Step 8 after 2-3 iterations or when complete

## Exit Criteria

- [ ] All major implementation decisions made
- [ ] Technical approach documented
- [ ] Only tactical decisions remain for implementation
- [ ] `work/07-technical-approach.md` created

## Next Step

→ [08-pipeline-tests.md](./08-pipeline-tests.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
