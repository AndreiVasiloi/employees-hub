# Step 14: Task Sizing

## Objective

Apply the `govern.util.task-sizing` skill to generate comprehensive complexity assessment for accurate planning and resource allocation.

## Entry Criteria

- [ ] Step 13 (Create Technical Plan) completed with comprehensive plan.md
- [ ] All technical decisions documented and validated
- [ ] Implementation strategy and sequencing defined

## Exit Criteria

- [ ] Task sizing completed using `govern.util.task-sizing` skill
- [ ] size.md file created with multi-axis complexity scores
- [ ] Effort estimates provided for planning
- [ ] Sizing committed to planning branch

## Actions

### 14.1 Apply Task-Sizing Skill

Use the `govern.util.task-sizing` skill to analyze the completed technical plan:

**Input Preparation**:
- Complete plan.md from Step 13
- Enriched task.md with research findings
- Implementation strategy and dependencies
- Risk assessment and technical decisions

**Execute Skill**:
```
Use govern.util.task-sizing skill with:
- Task description and scope from plan.md
- Target folder/directory for analysis
- Known dependencies and constraints
- Desired confidence level (optional)
```

### 14.2 Review and Finalize Sizing

The skill will:
1. **Analyze Task Scope**: Review requirements, identify files/modules, map dependencies
2. **Score Complexity Axes**: Apply 0-3 scoring across 6 dimensions
3. **Calculate Size**: Map total score to shirt size and time estimate
4. **Present for Review**: **STOP** and wait for human feedback
5. **Incorporate Feedback**: Adjust scores based on human input
6. **Generate Final size.md**: Create comprehensive sizing document

### 14.3 Document Results

The skill creates `size.md` with:
- Multi-axis complexity scoring with rationale
- Total complexity score and shirt size mapping
- Time estimate and confidence level
- Dependencies and risk factors
- Detailed rationale for sizing decisions

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present sizing analysis for review:
  - "Complexity assessment: [total score]/18 - [shirt size]"
  - "Key complexity factors: [list highest scoring axes]"
  - "Time estimate: [range] with [confidence] confidence"
  - "Does this sizing reflect the implementation complexity?"
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Apply task-sizing skill systematically using all inputs
- Score each axis based on technical plan details
- Present sizing for review before finalization
- Update scores based on any feedback received
- Proceed to Step 15 after size.md is created

## Integration Notes

The `govern.util.task-sizing` skill provides:
- **Multi-axis scoring framework**: 6 complexity dimensions (0-3 each)
- **Size mapping**: Total score → shirt size → time estimate
- **Structured output**: Standard size.md format with rationale
- **Review process**: Built-in human feedback loop

## Next Step

→ [15-finalize-task.md](./15-finalize-task.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
