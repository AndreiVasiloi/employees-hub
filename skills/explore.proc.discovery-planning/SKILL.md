+++
name = "explore.proc.discovery-planning"
description = "Use this skill when you need to plan discovery activities — creating an Explore Bundle with phased approach, assumptions tracking, risk identification, and activity sequencing. Activates at the beginning of the Explore phase after a Signal is validated. Also relevant when someone says 'plan the discovery,' 'what should we explore first,' or 'create an explore bundle.' Does NOT execute the discovery activities themselves — it plans them so downstream skills can execute."
license = "Proprietary. See LICENSE.md"
+++

# Discovery Planning

Create Explore Bundle for planning discovery activities with phased approach, assumptions tracking, and risk management.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Create Explore Bundles to plan discovery activities
- Define phased discovery approach with dependencies
- Track assumptions and open questions
- Set checkpoints and success criteria
- Establish discovery scope and constraints

## Pre-Check

If an Explore Bundle already exists at `explore/explore-[slug]/explore-bundle.md`:
1. Load the existing Explore Bundle
2. Present to the steering team: "Existing Explore Bundle found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating an Explore Bundle, ensure you have:

1. **Signal document** - The validated Signal from Signal Agent
2. **Domains in scope** - Validated domain table from Step 1
3. **Slug** - Project identifier for file naming (e.g., `care-it`)

**STOP**: If the Signal document is missing, request it before proceeding.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-create-header.md](./steps/01-create-header.md) | Create overview and header |
| 2 | [02-signal-information.md](./steps/02-signal-information.md) | Document Signal information |
| 3 | [03-solution-profile.md](./steps/03-solution-profile.md) | Create solution profile with domains |
| 4 | [04-plan-activities.md](./steps/04-plan-activities.md) | Plan discovery activities by phase |
| 5 | [05-open-questions.md](./steps/05-open-questions.md) | Document open questions |
| 6 | [06-active-assumptions.md](./steps/06-active-assumptions.md) | Document active assumptions |
| 7 | [07-identify-risks.md](./steps/07-identify-risks.md) | Identify initial risks |
| 8 | [08-expected-outputs.md](./steps/08-expected-outputs.md) | Define expected outputs |
| 9 | [09-constraints.md](./steps/09-constraints.md) | Document constraints |
| 10 | [10-checkpoints.md](./steps/10-checkpoints.md) | Define checkpoints |
| 11 | [11-present-for-approval.md](./steps/11-present-for-approval.md) | Present bundle for approval |
| 12 | [12-write-explore-bundle.md](./steps/12-write-explore-bundle.md) | Write Explore Bundle document |
| 13 | [13-validation.md](./steps/13-validation.md) | Run completeness validation |

## Output Format

```
explore/explore-[slug]/explore-bundle.md
```

**Template**: `templates/explore-bundle-template.md`

## Integration with Workflows

**Consumes**:
- **Signal Agent** — Signal information feeds bundle
- **Domains in scope** — Validated domain table from Step 1

**Produces** (consumed by):
- **Context Documentation** (`explore.proc.context-documentation`) — Explore Bundle defines scope and domains for context baseline
- **Market Research** (`explore.proc.market-research`) — Bundle defines research scope and priorities
- **Domain Analysis** (`explore.proc.domain-analysis`) — Bundle defines domain analysis scope
- **All downstream skills** — Bundle defines what artifacts to create and when

## Best Practices

**Do**:
- ✅ Code all activities (A1, A2, etc.)
- ✅ Map dependencies between activities
- ✅ Link open questions to resolving activities
- ✅ Link assumptions to validation activities
- ✅ Define clear checkpoint criteria
- ✅ List all expected output artifacts
- ✅ Document all constraints upfront

**Don't**:
- ❌ Skip activity coding
- ❌ Forget to map dependencies
- ❌ Leave questions or assumptions unlinked
- ❌ Create vague checkpoint criteria
- ❌ Forget to list expected outputs
- ❌ Assume constraints are obvious

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All activities coded (A1, A2, etc.) with dependencies mapped
- [ ] Dependency graph is a DAG (no circular dependencies)
- [ ] Open questions linked to resolving activities
- [ ] Assumptions linked to validation activities
- [ ] Checkpoint criteria tied to specific artifacts or decisions
- [ ] Expected output artifacts listed per activity
- [ ] Approval obtained from steering team

## Gotchas

- ⚡ **Activity dependency cycles**: The agent sometimes creates circular dependencies between activities (A depends on B, B depends on C, C depends on A). Always validate the dependency graph is a DAG before presenting the Explore Bundle.
- ⚡ **Checkpoint criteria too vague**: Checkpoints like "sufficient understanding achieved" are unverifiable. Every checkpoint criterion must be tied to a specific artifact or decision — if you can't point to a file, it's not a checkpoint.
- ⚡ **Scope creep via "nice to have" activities**: Activities marked as optional in the Explore Bundle tend to become mandatory during execution. Either commit to an activity or drop it — optional activities consume planning effort without guaranteed return.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.discovery-planning:0.1.2:2026-08-27T13:21:11Z -->
