# Step 5b: Test & DevOps Strategy

## Entry Condition

Architecture package complete (Gate B.4 PASS or CONDITIONAL PASS) — proceed from [`05a-architecture-solutioning.md`](./05a-architecture-solutioning.md).

---

## Part 2: Test & DevOps Strategy

**Position**: After HLD is complete (Part 1 finished), before Epic Forming.

**Skills Required**: Load after HLD is written:
- **Test Strategy**: Load `explore.proc.test-strategy` skill (9-step process)
- **DevOps Strategy**: Load `explore.proc.define-devops-strategy` skill (11-step process)

**Objective**: Produce comprehensive test strategy and DevOps strategy documents grounded in the complete PRD and HLD. These complement the PRD's Group 3 (Quality Definition) with full-depth strategy documents.

### Trigger

**Agent proceeds automatically after Architecture package is complete (Part 1 finished).** Both strategies are mandatory.

> **Agent declares**: use template from [Loader Protocol](../references/loader-protocol.md) § Step 5 — Announcement Templates § Architecture Complete.

### Explore Type Adaptation

> Strategy depth by Explore Type: see [Explore Type Adaptation](../references/explore-type-adaptation.md) § Step 5 — Strategy Depth.

---

### Test Strategy

> **Load skill:** `explore.proc.test-strategy` — follow Loader Protocol above. Workflow skill.

> Context bridge: see [Context Bridge Tables](../references/context-bridge-tables.md) § Step 5 — Test Strategy Inputs.

**Explore Agent adaptations applied to test-strategy skill:**
- **Evidence labeling**: Test strategy claims tagged as OBS/INF/ASM consistent with Explore pipeline
- **PRD grounding**: Full PRD is available — use it as the primary input alongside HLD
- **Artifact location**: Output written to `explore/explore-[slug]/test-strategy.md`

**Agent delegates to test-strategy skill:**

```
Delegating to Test Strategy skill (explore.proc.test-strategy)
  Inputs: see Context Bridge Tables § Step 5 — Test Strategy Inputs.
  See Loader Protocol § Step 5 — Delegated Skill Step Lists for the 9-step sequence.
ONE STEP AT A TIME — follow the skill's interaction model.
```

**On completion:**

> See [Loader Protocol](../references/loader-protocol.md) § Step 5 — Announcement Templates § Test Strategy Complete for the completion declaration template.

---

### DevOps Strategy

> **Load skill:** `explore.proc.define-devops-strategy` — follow Loader Protocol above. Workflow skill.

> Context bridge: see [Context Bridge Tables](../references/context-bridge-tables.md) § Step 5 — DevOps Strategy Inputs.

**Explore Agent adaptations applied to devops-strategy skill:**
- **Evidence labeling**: DevOps strategy claims tagged as OBS/INF/ASM consistent with Explore pipeline
- **PRD grounding**: Full PRD is available — use it as the primary input alongside HLD
- **Test strategy alignment**: If test strategy was just produced, the devops-strategy skill MUST read it for quality gate alignment
- **Artifact location**: Output written to `explore/explore-[slug]/devops-strategy.md`

**Agent delegates to devops-strategy skill:**

```
Delegating to DevOps Strategy skill (explore.proc.define-devops-strategy)
  Inputs: see Context Bridge Tables § Step 5 — DevOps Strategy Inputs.
  See Loader Protocol § Step 5 — Delegated Skill Step Lists for the 11-step sequence.
ONE STEP AT A TIME — follow the skill's interaction model.
```

**On completion:**

> See [Loader Protocol](../references/loader-protocol.md) § Step 5 — Announcement Templates § DevOps Strategy Complete for the completion declaration template.

---

### Strategy Artifact Updates

**Agent updates after strategies are produced:**

1. **Enriches `discovery.md`** — adds test-strategy and/or devops-strategy artifact paths, updates rows to ✓
2. **Enriches `explore-bundle.md`** — notes which strategies were produced
3. **Updates HLD cross-references** — if test or DevOps strategies identify changes needed in HLD Sections 10-11 (Deployment Architecture, Monitoring & Observability), agent proposes HLD amendments via back-port findings
4. **Updates PRD Group 3** — adds cross-references to the full strategy documents

**Artifact locations:**

| Artifact | Location | Status |
|----------|----------|--------|
| Test Strategy | `explore/explore-[slug]/test-strategy.md` | produced |
| DevOps Strategy | `explore/explore-[slug]/devops-strategy.md` | produced |

---

### Cross-Skill Integration Validation

Agent validates alignment between both strategies and existing artifacts:

```
Cross-Skill Alignment Check:

Test Strategy ↔ DevOps Strategy:
  [✓/✗] Quality gates in DevOps pipeline align with test strategy gates
  [✓/✗] CI/CD pipeline stages map to testing pyramid layers
  [✓/✗] Test environments align with DevOps environment model
  [✓/✗] Coverage targets are enforceable in pipeline quality gates
  [✓/✗] Test data strategy is compatible with environment provisioning

Test Strategy ↔ HLD:
  [✓/✗] Integration test boundaries match HLD component boundaries
  [✓/✗] Contract tests defined for all inter-service APIs in HLD
  [✓/✗] Performance test targets match HLD quality attribute targets

DevOps Strategy ↔ HLD:
  [✓/✗] Pipeline architecture matches HLD architecture type
  [✓/✗] Environment model supports HLD deployment architecture
  [✓/✗] Observability stack covers all HLD components
  [✓/✗] Release strategy compatible with HLD architecture type

Test Strategy ↔ PRD:
  [✓/✗] Test coverage addresses all PRD acceptance criteria
  [✓/✗] NFR targets from PRD have corresponding test targets
  [✓/✗] Quality gates enforce PRD quality attributes

DevOps Strategy ↔ PRD:
  [✓/✗] Deployment strategy supports PRD availability requirements
  [✓/✗] Observability SLOs match PRD performance targets
  [✓/✗] Compliance requirements from PRD are enforced in pipeline
```

**If misalignments found:**

```
Question SB-strategy-align
  Header:      "Strategy Alignment Issues"
  Question:    "I found [N] misalignments between strategies. How should we proceed?"
  Multi-select: No
  Options:
    - Fix now           — I'll address each misalignment
    - Accept as-is      — Document as known gaps; proceed to epic forming
    - Revise strategy   — Tell me which strategy to update
```

---


---

**Next**: → [`05c-epic-forming.md`](./05c-epic-forming.md)
