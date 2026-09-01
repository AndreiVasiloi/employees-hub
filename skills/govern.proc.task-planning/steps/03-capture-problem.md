# Step 3: Capture High-Level Problem

## Objective

Document the problem statement, stakeholders, and initial questions that need resolution. Create interim artifact `work/03-problem.md`.

## Entry Criteria

- On planning branch (Step 2 complete)
- High-level problem statement or feature request available

## Actions

### 3.1 Create Working Folder

Create the working folder for interim artifacts:
```bash
mkdir -p work/02-planning/{TASK_ID}-{slug}/working
```

### 3.2 Document Problem Statement

Answer: What problem are we solving and why now?

Include:
- Current state (what's broken or missing)
- Desired state (what success looks like)
- Business driver (why this matters now)

### 3.3 Identify Stakeholders

List:
- Who is affected by this problem?
- Who will use the solution?
- Who needs to approve the specification?

### 3.4 Identify Affected Components

Determine which components are impacted:
- Manager
- Server
- App
- Cross-cutting (multiple components)

### 3.5 List Initial Questions

Document questions that need resolution during planning:
- Technical unknowns
- Business rule clarifications
- Integration points
- Edge cases

### 3.6 Document Existing Context

Reference any:
- Related tasks from epics or PRDs
- User feedback or bug reports
- Previous discussions or decisions

### 3.7 Create Interim Artifact

Write findings to `work/03-problem.md`:

```markdown
# Problem Capture

## Problem Statement
[Current state, desired state, business driver]

## Stakeholders
- [Stakeholder 1]: [Role/Interest]
- [Stakeholder 2]: [Role/Interest]

## Affected Components
- [ ] Manager
- [ ] Server
- [ ] App
- [ ] Cross-cutting

## Initial Questions
- [ ] [Question 1]
- [ ] [Question 2]

## Existing Context
- [Reference 1]
- [Reference 2]
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present problem capture to user:
  - "Here's my understanding of the problem: [summary]"
  - "Key questions to resolve: [list]"
  - "Is this accurate? Any corrections or additions?"
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Extract problem statement from task.md if it exists
- Infer stakeholders from component type
- List obvious questions based on problem domain
- Create `work/03-problem.md` with findings
- Proceed to Step 4 after documenting

## Exit Criteria

- [ ] Working folder created
- [ ] Problem statement documented
- [ ] Stakeholders identified
- [ ] Affected components listed
- [ ] Initial questions captured
- [ ] Existing context referenced
- [ ] `work/03-problem.md` created

## Next Step

→ [04-define-goals.md](./04-define-goals.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
