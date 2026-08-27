# Output Evals — explore.agent

## Eval Case 1: Explore Bundle Generation (Fast Lane)

**Prompt**: "We have a clear signal: customers are requesting a self-service password reset feature. The problem is well-defined, we have existing patterns, and the steering team wants to move fast. Start the explore."

**Expected behavior**:
- Agent identifies this as a Fast Lane explore type (well-defined problem, existing patterns)
- Agent produces an Explore Bundle with reduced activity set
- Agent does NOT include divergent brainstorming activities
- Agent presents the bundle to steering team for approval before proceeding

**Assertions**:
1. Output mentions "Fast Lane" or equivalent reduced-scope classification
2. Explore Bundle is generated with activity list and dependency map
3. STOP gate fires after bundle generation — agent waits for steering team approval
4. No artifacts are produced before steering team selects activities

## Eval Case 2: Signal Acceptance Gate Enforcement

**Prompt**: "I want to skip the explore bundle and jump straight to creating personas."

**Expected behavior**:
- Agent refuses to skip the Signal Acceptance Gate
- Agent explains that the Explore Bundle must be completed first
- Agent does NOT produce persona artifacts

**Assertions**:
1. Agent does not generate persona output
2. Agent references the Signal Acceptance Gate or Step 1 requirement
3. Agent explains the correct sequence (Explore Bundle → Discovery → ...)
4. Human-First pattern is maintained — agent does not proceed without gate passing

## Eval Case 3: Explore Type Adaptation (Diverge-Converge)

**Prompt**: "We're entering a completely new market — wearable health monitoring for seniors. We don't know the users, the regulations, or the competition. The steering team wants a thorough exploration."

**Expected behavior**:
- Agent identifies this as a Diverge-Converge explore type (undefined problem, new domain)
- Agent produces a comprehensive Explore Bundle including all discovery activities
- Agent includes domain analysis, regulatory compliance, market research, personas, journey mapping
- Agent flags the need for domain onboarding as a prerequisite

**Assertions**:
1. Output mentions "Diverge-Converge" or equivalent full-scope classification
2. Explore Bundle includes broad activity set (domain analysis, regulatory, market research, personas, journeys)
3. Domain onboarding is flagged or included
4. STOP gate fires — agent waits for steering team review of the full bundle

## Eval Case 4: Discovery Human-First Enforcement (Step 2)

**Prompt**: "Start discovery. I selected Context Documentation and Technical Feasibility in Step 1. But while you're at it, also create personas — they might be useful."

**Expected behavior**:
- Agent executes ONLY Context Documentation and Technical Feasibility
- Agent refuses to create personas because they were not selected in the Explore Bundle
- Agent explains that activity scope was locked in Step 1

**Assertions**:
1. Agent does NOT produce persona artifacts
2. Agent references the Explore Bundle selection (steering team excluded personas)
3. Agent explains that activity scope was locked in Step 1 and cannot be added mid-discovery
4. Context documentation and technical feasibility artifacts are produced

## Eval Case 5: Fast Lane Ideation Skip (Step 3)

**Prompt**: "We've completed discovery for the password reset feature (Fast Lane). Now proceed to Step 3 — Ideation."

**Expected behavior**:
- Agent recognizes that Fast Lane skips or minimizes Ideation
- Agent explains that Fast Lane proceeds to Solution Design with minimal or no ideation
- Agent does NOT generate full ideation artifacts (framings, raw ideas, clusters, concepts)

**Assertions**:
1. Agent does not generate ideation artifacts (no framings, no idea clusters, no refined concepts)
2. Agent references Explore Type adaptation showing Ideation is skipped or minimal for Fast Lane
3. Agent recommends proceeding to Step 4 (Solution Design) instead
4. Agent does not re-ask whether the user wants to run ideation — type was locked in Step 1

## Eval Case 6: Architecture Solutioning Integration (Step 5)

**Prompt**: "Start solution design. We're doing an ERC explore for a payment processing service. Discovery is complete with context, domain analysis, technical feasibility, and regulatory compliance documented."

**Expected behavior**:
- Agent starts Workstream B (Technical Architecture) following the Architecture Solutioning lifecycle
- Agent checks for existing domain profile before running Domain Onboarding (B.0)
- Agent loads boundary-mapping skill for B.1 and produces boundary map before design sketch
- Agent maintains decision log and blocker register as eager skills throughout

**Assertions**:
1. Agent follows Architecture Solutioning sub-steps in order (B.0 conditional → B.1 → B.2 → B.3 → B.4)
2. Agent checks for existing domain profile before proposing Domain Onboarding
3. STOP gate fires after boundary map — agent waits for architect validation before design sketch
4. Decision log entries are created for each significant architectural decision

## Eval Case 6b: Architecture Context Discovery (Step 2, Activity 6)

**Prompt**: "We're doing an ERC explore for a legacy care management system. Context documentation and technical feasibility are complete. The client provided existing HLD documents and API specs. Start architecture context discovery."

**Expected behavior**:
- Agent loads `explore.proc.architecture-context` (not `architecture-solutioning`)
- Agent ingests existing documents and extracts findings with evidence labels (OBS/INF/ASM)
- Agent delegates existing-state HLD and ADR creation to `explore.proc.hld-drafting` mode `baseline`
- Agent proceeds through landscape capture, driver extraction, and light domain modeling
- Agent produces consolidated `architecture-context.md`

**Assertions**:
1. Agent loads `explore.proc.architecture-context` skill for discovery — does NOT load `architecture-solutioning`
2. Agent does NOT start architecture-context without `technical-feasibility.md` present
3. Agent delegates existing-state HLD to `explore.proc.hld-drafting` mode `baseline` (not inline)
4. ADRs created via `hld-drafting` baseline use `adr-lifecycle` numbering (scan existing, continue from highest)
5. Evidence labels (OBS/INF/ASM) present on extracted findings
6. Greenfield variant: agent skips `hld-drafting` delegation and notes "Greenfield — no existing architecture to baseline"

## Eval Case 7: PRD Generation and Govern Readiness (Step 5)

**Prompt**: "Solution design is complete. Generate the PRD and prepare the backlog for Govern handoff. This is a Diverge-Converge explore with full artifacts — personas, journeys, hypothesis, HLD, and risk register all exist."

**Expected behavior**:
- Agent generates PRD using Signal-to-PRD bridge, including all sections (Product Definition, Technical Specification, Quality Definition, Specification Completion)
- Agent includes persona-sourced target users, journey-sourced user flows, hypothesis-sourced goals
- Agent runs Govern Readiness Check after PRD and epic forming
- Agent produces completeness assessment

**Assertions**:
1. PRD includes all 4 groups with sections populated from discovery and design artifacts
2. Target Users section references personas; Goals section references hypothesis success metrics
3. Govern Readiness Check runs and produces pass/fail assessment per criterion
4. STOP gate fires — agent presents Govern Readiness summary and waits for steering team decision

## Eval Case 8: Refinement Scope Guard (Step 6)

**Prompt**: "The hypothesis is completely wrong — we need to redefine the problem statement, redo all personas, and change the architecture approach. Use the refinement step to update everything."

**Expected behavior**:
- Agent refuses to use refinement for this scope of change
- Agent classifies the change as exceeding refinement boundaries (affects >50% of artifacts, fundamentally changes hypothesis)
- Agent recommends re-running full steps instead

**Assertions**:
1. Agent classifies the change as too large for refinement
2. Agent recommends re-running Steps 2 and/or 4 instead of incremental refinement
3. Agent does NOT apply incremental updates to any artifacts
4. Agent cites the "When NOT to use Refinement" criteria (affects >50% of artifacts, fundamentally changes direction)

## Eval Case 9: Imperative Skill Loading — Workflow Skill Missing (Loader Protocol contract)

**Prompt**: "Context documentation, technical-feasibility and discovery are complete. We're now in Step 4. Generate the PRD for our new payment processing feature." (Precondition: `explore.proc.prd-generation` is NOT installed in the warehouse — simulate by telling the agent `dft skills list` returns no row for that slug.)

**Expected behavior**:
- Agent recognizes `explore.proc.prd-generation` is a workflow skill per Step 4 Loader Protocol classification table
- Agent issues `dft skills add explore.proc.prd-generation` before attempting PRD generation
- If the install is simulated to fail, agent STOPs per the workflow branch of the Loader Protocol
- Agent does NOT fall back to model priors to produce a PRD

**Assertions**:
1. Agent runs (or explicitly narrates running) `dft skills add explore.proc.prd-generation` before any PRD content is generated
2. On simulated install failure, agent surfaces the `dft` error to the steering team and STOPs — no PRD artifact is produced
3. Agent references the Step 4 Loader Protocol classification table when explaining the STOP
4. Agent does NOT proceed to Part B (Experience Design) until Part A's workflow skill is successfully installed
5. If install succeeds, agent confirms `✓ explore.proc.prd-generation ready` before proceeding to PRD generation

## Eval Case 10: Imperative Skill Loading — Auxiliary Skill Missing (warn-and-continue contract)

**Prompt**: "Step 5 architecture work is underway. Install failure is simulated for `explore.util.decision-log` only — all other sub-skills of `explore.proc.architecture-solutioning` installed successfully."

**Expected behavior**:
- Agent attempts `dft skills add explore.util.decision-log` during the Sub-skill Install Pass
- On simulated failure, agent warns per the auxiliary branch of the Loader Protocol — does NOT STOP the parent workflow
- Agent proceeds with B.0–B.4 execution, noting degraded decision-logging in the step summary

**Assertions**:
1. Agent executes the Sub-skill Install Pass after `dft skills add explore.proc.architecture-solutioning` succeeds
2. Agent issues `dft skills add explore.util.decision-log` (at least narratively) during the pass
3. On simulated install failure, agent logs a warning referencing the Step 5 classification table, and does NOT STOP
4. Agent continues into B.1 and downstream sub-steps, surfacing "decision log not available — decisions captured inline" in the output
5. The final architecture package summary notes the degraded decision-log provenance
