# Update Task Metadata with Research

Update task.md TOML frontmatter with links discovered during research. Technical details go to plan.md, not task.md.

## Objective

Update the task.md TOML frontmatter `[sources]` and `[links]` sections with decisions, related tasks, and documentation references discovered during research. The task.md body content should remain product-readable requirements only.

**Important**: Technical details, research findings, and implementation decisions are documented in plan.md (Step 13), NOT in task.md.

## Entry Criteria

- [ ] Step 05 (Search Related Work) completed with:
  - Decision inventory created
  - Related tasks inventory created
  - Documentation references identified
  - Conflicts or gaps documented
- [ ] Task.md exists in work/02-planning/{TASK_ID}-{slug}/
- [ ] Task uses `flow.util.task-definition` skill template with TOML frontmatter

## Exit Criteria

- [ ] Task.md TOML `[sources].documents` updated with decision links
- [ ] Task.md TOML `[links]` updated with related/blocking tasks
- [ ] Task.md body content remains product-readable (no technical details added)
- [ ] Research findings noted for inclusion in plan.md (Step 13)

## Actions

### Update TOML Frontmatter Only

Update the task.md TOML sections with research links:

```toml
[sources]
epic = "path/to/epic.md"
documents = [
    "path/to/decision1.md",      # Add discovered decisions
    "path/to/decision2.md",
    "path/to/related-doc.md"
]

[links]
blocks = ["path/to/blocked-task/task.md"]
related = ["path/to/related-task/task.md"]
parent = []
child = []
```

### Preserve Research for plan.md

Keep notes on research findings for inclusion in plan.md (Step 13):
- Decision inventory with key requirements
- Related tasks with relationships
- Documentation references with relevance
- Conflicts and gaps with resolutions

**Do NOT add these as sections in task.md body** — they belong in plan.md.

### Light Body Updates (If Needed)

Only update task.md body content if research reveals:
- Incorrect problem statement that needs correction
- Missing acceptance criteria that are requirements (not implementation)
- New non-goals or constraints

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present research summary:
  - "Research found X decisions and Y related tasks"
  - "Task.md TOML links updated"
  - "Technical details will be documented in plan.md (Step 13)"
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Update TOML frontmatter with discovered links
- Note research findings for plan.md
- Do NOT add technical sections to task.md body
- Proceed to Step 7

## Quality Checks

- [ ] TOML `[sources].documents` includes relevant decisions
- [ ] TOML `[links]` correctly categorizes task relationships
- [ ] Task.md body remains product-readable
- [ ] No technical implementation details added to task.md
- [ ] Research findings preserved for plan.md

## Common Pitfalls

- **Adding technical sections to task.md**: Research findings belong in plan.md
- **Overwriting requirements**: Only update if research reveals incorrect requirements
- **Missing TOML updates**: Ensure frontmatter links are updated

## Tips

- Task.md = Product-readable requirements (what)
- Plan.md = Technical implementation details (how)
- Keep research notes for Step 13 (create-technical-plan)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
