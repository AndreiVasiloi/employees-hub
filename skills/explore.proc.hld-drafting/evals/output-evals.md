# Output Evals — explore.proc.hld-drafting

## Eval Case 1: Architecture Rule Enforcement — Public State Model

**Prompt**: "Generate the HLD for a payment reconciliation service. The design sketch includes an internal reconciliation state machine with states: PENDING_MATCH, PARTIAL_MATCH, MATCHED, EXCEPTION, MANUAL_REVIEW. The component also has internal caching of transaction hashes for deduplication."

**Expected behavior**:
- Agent drafts the HLD at the correct abstraction level
- Agent describes the reconciliation states as public behavior (what the service exposes to consumers)
- Agent does NOT expose internal implementation details like the transaction hash cache
- Agent enforces the public state model rule: describe what the component does, not how it does it internally

**Assertions**:
1. HLD describes reconciliation states in terms of external behavior (e.g., "the service reports reconciliation status as...")
2. Internal caching mechanism is NOT described in the HLD (it's an implementation detail)
3. Component descriptions are non-overlapping in responsibility
4. Each component has negative boundary statements ("This component does NOT...")
5. Agent tags any assumptions about upstream contracts with [ASSUMPTION] or [VALIDATED]

## Eval Case 2: Decision Consolidation and Evidence Tagging

**Prompt**: "The design sketch has 3 open decision points: (1) sync vs async for payment notifications — sketch recommends async but no evidence yet, (2) PostgreSQL vs DynamoDB for transaction store — architect validated PostgreSQL during sketch review, (3) whether to use a message broker or direct API calls for inter-service communication — still under discussion."

**Expected behavior**:
- Agent consolidates all 3 decisions from the sketch into the HLD
- Decision 1: tagged [ASSUMPTION] (no evidence)
- Decision 2: tagged [VALIDATED] (architect confirmed)
- Decision 3: flagged as unresolved — logged as blocker or open decision
- All decisions feed into the decision log

**Assertions**:
1. All 3 decisions appear in the HLD with correct evidence tags
2. PostgreSQL choice is tagged [VALIDATED] with architect attribution
3. Async notification is tagged [ASSUMPTION]
4. Unresolved decision (message broker vs API) is either flagged as a blocker or listed as an open decision requiring resolution
5. Decision log entries are referenced or generated for all 3 decisions

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
