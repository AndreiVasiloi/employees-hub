# Output Evals — explore.util.problem-classification

## Eval Case 1: Well-Defined Problem Classification

**Prompt**: "We need to add a password reset flow to our existing authentication system. The requirements are clear — users click 'forgot password,' enter their email, receive a reset link, and set a new password. We've done this before on other products."

**Expected behavior**:
- Agent classifies along all 4 dimensions
- Definition level: High (requirements are clear and specific)
- Solution space: Narrow (well-established pattern)
- Novelty requirement: Low (done before on other products)
- Complexity: Low (single, well-scoped flow)
- Agent routes to convergent/structured methods, not divergent brainstorming
- Agent presents classification to steering team for confirmation before proceeding

**Assertions**:
1. All 4 dimensions are classified with evidence from the problem statement
2. Definition level is classified as High — citing "requirements are clear"
3. Solution space is classified as Narrow — citing "done this before"
4. Method routing selects convergent/structured approach, not divergent
5. STOP gate fires — agent presents classification for steering team confirmation
6. Classification output follows the template format with evidence per dimension

## Eval Case 2: Ambiguous Problem — Escalation Required

**Prompt**: "We're seeing user drop-off in the checkout flow but we're not sure why. It could be a UX problem, a performance issue, or a pricing concern. We haven't done much research yet."

**Expected behavior**:
- Agent identifies ambiguity in the definition level dimension
- Agent does NOT default to a middle classification
- Agent surfaces the ambiguity and asks the steering team for clarification
- Agent may suggest that the problem needs discovery before classification can be finalized

**Assertions**:
1. Agent flags that the problem definition is ambiguous — multiple possible root causes
2. Agent does NOT silently pick a classification without flagging uncertainty
3. Agent asks the steering team to clarify or confirms that discovery is needed first
4. If classification proceeds, novelty and complexity dimensions cite evidence (or flag as uncertain)
5. Agent does not route to a method until classification is confirmed

## Eval Case 3: Mid-Session Reclassification

**Prompt**: "We initially classified this as a well-defined problem (add dark mode to the app), but during discovery we learned the existing theming system is fundamentally broken and needs a complete redesign. The problem is now much more complex and open-ended than we thought."

**Expected behavior**:
- Agent recognizes that the initial classification is no longer valid
- Agent surfaces the contradiction immediately rather than continuing with the original classification
- Agent recommends reclassification with updated evidence
- Agent does NOT treat the initial classification as immutable

**Assertions**:
1. Agent flags the classification change — definition level and complexity have shifted
2. Agent recommends reclassification rather than continuing with original routing
3. Updated classification cites new evidence (broken theming system, complete redesign needed)
4. Method routing is updated to match the new classification
5. The reclassification decision is documented (feeds into decision log if available)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.util.problem-classification:0.1.2:2026-08-31T08:53:46Z -->
