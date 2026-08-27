# Step 5c: Epic Forming

## Entry Condition

Strategies complete (Part 2 finished) — proceed from [`05b-strategies.md`](./05b-strategies.md).

---

## Part 3: Epic Forming

### Pre-Epic Consistency Validation

**Before proceeding to epic forming, agent MUST trigger consistency-check process.**

**Agent action**: Recommend running the **consistency-check process** to validate:

- **Cross-activity consistency**: Ensure insights from different activities align
- **Persona-journey alignment**: Verify personas are consistent with journey maps
- **Insight validation**: Confirm insights are supported by data and analysis
- **Prototype consistency**: Ensure prototypes align with personas and journeys
- **Output completeness**: Validate all necessary artifacts are present and consistent

**Trigger phrase**: `Let's run a consistency check on the Explore outputs`

**Reference**: See `phases/02-explore/README.md` → Consistency Check Integration

---

### Turbine Glossary Integration

**Turbine** provides automated glossary management:

- **Automated extraction**: Extract terminology from all AI activity outputs
- **Glossary maintenance**: Update project glossary as new terms are identified
- **Consistency validation**: Validate consistent terminology usage across artifacts
- **Cross-reference checking**: Ensure terms used consistently in personas, journeys, insights
- **Living documentation**: Maintain evolving glossary reflecting current project terminology

**Agent action**: If Turbine is available, recommend glossary extraction before epic forming.

**Output**: `explore/glossary.md` updated with all domain terms from Explore artifacts

---

### Epic Forming Process

**Human-First Pattern: Steering team explicitly triggers epic forming (not automatic)**

**Human-First Enforcement:**
- Agent does NOT automatically proceed to epic forming
- Steering team must explicitly trigger epic forming process
- This prevents unwanted epic generation if steering team wants to adjust PRD first

**To continue when ready:** trigger epic forming with `Let's form epics from the [slug] Explore outputs`, or skip if not needed.

**Agent declares**:

```
Architecture & Strategies Complete

Artifacts ready for epic forming:
- PRD: explore/prds/[slug]-prd.md (from Step 4)
- HLD: explore/hlds/[slug]-hld.md (from Part 1)
- ADRs: explore/decisions/[slug]-adr-*.md (from Part 1)
- Test Strategy: explore/explore-[slug]/test-strategy.md (from Part 2)
- DevOps Strategy: explore/explore-[slug]/devops-strategy.md (from Part 2)
- Personas/Journey Maps/Domain Model/Risk Register/Glossary (from Steps 2–4)
```

---

**STOP HERE - Human decision required**

