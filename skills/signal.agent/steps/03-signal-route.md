# Step 3: Signal Route

**Objective**: Verify Route-Readiness across all 7 criteria and make the explicit routing decision that gates entry to Explore.

**Read ONLY this step file during execution. Do not load other steps until this step is complete.**

---

## Step Execution Rule

❌ Do not route a low-confidence Signal to Explore.
❌ Do not route without confirmed sponsor appetite.
❌ Do not route without a named approver and date.
❌ Do not move to Nurture without defining specific re-activation triggers.
❌ Do not retire without documenting rationale and learning captured.

---

## Actions

### 1. Load the Signal

Ask the user which Signal to route. Read the Signal file and verify State = "Active".

### 2. Self-Audit Against Quality Gates

Before evaluating route-readiness, verify all Quality Gates from SKILL.md:

- [ ] Signal Seed created with all required sections (matches `templates/signal-seed.md`)
- [ ] All claims tagged as `[ASSUMPTION]`, `[OPINION]`, or `[FACT]`
- [ ] 7 completion criteria assessed with clear status
- [ ] Importance and urgency scores include written rationale
- [ ] Explore Type recommendation set via score-based checklists
- [ ] Sponsor appetite confirmed (required for Explore routing)
- [ ] Signal Summary appended before routing
- [ ] Routing decision made explicitly with named approver

If any gate is unmet, resolve it before proceeding to Route-Readiness.

---

### 3. Route-Readiness Verification

Perform strict verification of all 7 criteria:

For each criterion, check all sub-items and declare Pass/Fail:
1. **Signal Fundamentals** — Type, importance, source, duplicates
2. **Evidence and Context** — Evidence collected, quality, context, patterns, assumptions, claims tagged
3. **Framing and Meaning** — Clearly framed, scope, actors, constraints, outcomes
4. **Strategic and Market Alignment** — North Star, market, regulatory, **sponsor appetite (CRITICAL)**
5. **Readiness and Feasibility** — Technical, data, organisational, urgency, risk of inaction
6. **Prioritisation and Positioning** — Importance scored with rationale, urgency scored with rationale, position defined
7. **Explore Type Recommendation** — All three checklists filled, type selected, rationale documented

### 4. Route-Readiness Decision

Evaluate overall readiness:
- **Route-Ready**: All criteria pass, confidence Medium or High → proceed to routing decision
- **NOT Route-Ready**: Blocking issues exist → go back to Signal Strengthen or route to Nurture/Retire

### 5. Routing Decision

Present routing options:

1. **Route to Explore** — Signal needs shaping and validation. Requires: approver name, rationale, suggested activities, timeline expectation
2. **Route to Observation** — Timing not right. Requires: rationale, conditions to change, review cadence
3. **Move to Nurture** — Pause with triggers. Requires: rationale, specific re-activation triggers (market/time/event), owner
4. **Move to Retire** — Close with rationale. Requires: rationale, outcome/learning, related signals

### 6. Update Signal Document

Append Routing Decision section to the Signal Seed:
- Decision, rationale, approver name, date
- Route-Readiness verification summary table
- Routing details specific to the destination

Update Signal State:
- Explore/Observation: State remains "Active"
- Nurture: State = "Nurtured"
- Retire: State = "Retired"

### 7. Summarize and Confirm

Present final routing summary to user with next steps.

---

## Required Outputs (Gate to Explore)

For routing to Explore:
- [ ] All 7 completion criteria verified as complete
- [ ] Confidence level is Medium or High
- [ ] Sponsor appetite is confirmed
- [ ] Routing decision = "Route to Explore"
- [ ] Approver name and date recorded
- [ ] Rationale documented
- [ ] Signal document updated with routing section

**Next step**: If routed to Explore → Explore Agent Step 1.
