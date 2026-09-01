# Output Evals — explore.proc.feedback-integration

## Eval Case 1: Consistency Audit Classification

**Prompt**: "The tech lead edited the HLD. Changes: (1) renamed 'OrderPlaced' event to 'OrderCreated', (2) added a retry mechanism to the payment gateway component, (3) moved inventory management responsibility from the Order domain to a new Inventory domain, (4) fixed a typo in the sequence diagram labels."

**Expected behavior**:
- Agent catalogs all 4 changes before rewriting anything
- Agent classifies each change: (1) Potential Regression (terminology drift), (2) Improvement, (3) Contradiction (boundary ownership shift), (4) Neutral
- Agent flags items 1 and 3 for architect review
- Agent does NOT rewrite any section before the audit is complete

**Assertions**:
1. All 4 changes appear in the consistency audit table
2. Event rename is classified as Potential Regression with "terminology drift" evidence
3. Boundary ownership shift is classified as Contradiction
4. STOP gate fires after audit — agent waits for architect review before any rewriting
5. Agent does not silently accept the boundary ownership change

## Eval Case 2: Hardening Finding Severity Classification

**Prompt**: "Hardening results: (1) The payment component writes directly to the order database, crossing a boundary without acknowledgment. (2) The sequence diagram shows a synchronous call but the container diagram shows async messaging. (3) The component description for 'NotificationService' overlaps with 'AlertManager' responsibilities. (4) No failure handling defined for the case where the upstream pricing API is unavailable."

**Expected behavior**:
- Agent classifies findings by severity using the priority order (P1 truth/boundary → P2 correctness → P3 abstraction → P4 polish)
- Finding 1: BLOCKER (boundary integrity violation, P1)
- Finding 2: SIGNIFICANT (cross-view inconsistency, P2)
- Finding 3: MINOR or SIGNIFICANT (component overlap, P4)
- Finding 4: BLOCKER or SIGNIFICANT (failure mode gap, P2)
- Agent presents P1 findings first

**Assertions**:
1. Boundary crossing (finding 1) is classified BLOCKER with P1 priority
2. Cross-view inconsistency (finding 2) is classified at least SIGNIFICANT
3. Findings are presented in priority order (P1 before P2 before P4)
4. Agent recommends resolving P1 findings before moving to P2
5. STOP gate fires — agent waits for architect to validate severity classifications

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.feedback-integration:0.1.2:2026-09-01T08:21:27Z -->
