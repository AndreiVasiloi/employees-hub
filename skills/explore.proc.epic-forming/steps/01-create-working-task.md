# Step 1: Create Working Task

## Objective

Create a working task for the epic formation process, providing a complete task definition with requirements, technical plan, and sizing that will serve as the workspace for epic formation work.

## Entry Criteria

- Epic forming session initiated
- Source material identified (PRD, concept document, requirements, existing artifacts)
- Process mode determined (governed or delegated)

## Actions

### 1.1 Generate Task ID and Name

Create task following naming conventions:
- **Task ID**: Next available ID from working folder
- **Task Name**: `{XXXX}-epic-{description}`
- **Description**: Concise summary of epic focus (e.g., "epic-turbine-cli", "epic-documentation-linter")

### 1.2 Create Task Folder Structure

Create the epic formation working task folder:
```
work/04-implementing/{XXXX}-epic-{description}/
├── task.md
├── plan.md
├── size.md
└── session-history/ (created during process)
```

### 1.3 Create Task Definition (task.md)

Apply the `flow.util.task-definition` skill to create comprehensive task.md:
- Use task-definition skill with comprehensive TOML frontmatter
- Include epic formation scope in TOML sources section
- **Problem Statement**: What epic formation work needs to be done and why it matters
- **Goals & Acceptance Criteria**: Clear outcomes for epic formation process
- **Non-Goals**: Explicitly out-of-scope features
- **Context & References**: Links to source materials, related epics, design docs
- **Constraints & Dependencies**: Business and technical constraints
- **Success Metrics**: How epic formation success will be measured

### 1.4 Create Technical Implementation Plan (plan.md)

Write detailed technical plan for epic formation:
- **Epic Analysis Approach**: How to analyze source materials and extract capabilities
- **Pattern Analysis Strategy**: How to review existing epic grouping patterns
- **Capability Placement Logic**: Decision framework for new epic vs amend existing
- **Epic Creation Process**: Steps for generating epic shell or amending existing
- **Validation Approach**: How to ensure epic boundaries and consistency
- **Indexing Strategy**: How to update epic index and establish links

### 1.5 Create Sizing Analysis (size.md)

Apply `govern.util.task-sizing` skill to estimate epic formation complexity:
- Use task-sizing skill for multi-axis complexity scoring
- **Source Material Complexity**: Volume and complexity of input materials
- **Pattern Analysis Effort**: Time to review existing epic patterns
- **Decision Making Complexity**: Difficulty of capability placement decisions
- **Epic Creation Effort**: Time to generate or amend epic content
- **Validation Work**: Effort required for boundary validation and indexing

## Discussion Point (Governed Mode)

**STOP**: Present task setup for validation:
- "I've created epic formation working task {XXXX}-epic-{description}"
- "Task includes complete requirements, technical plan, and sizing"
- "Task is ready to serve as workspace for epic formation work"
- "Does this task capture the epic formation scope correctly?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Create working task without confirmation following standard patterns
- Use task-definition skill with comprehensive TOML frontmatter
- Apply task-sizing skill for complexity estimation
- Generate technical plan following epic formation best practices
- Proceed to Step 2 with working task established

## Next Step

With working task created and established as workspace, proceed to Step 2 to analyze source materials and extract capabilities using the task folder as the working environment.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.epic-forming:0.1.3:2026-09-01T11:38:04Z -->
