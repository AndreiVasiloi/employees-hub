# Output Evals — explore.proc.persona

## Eval Case 1: Evidence Tagging Accuracy

**Prompt**: "Create personas for a B2B invoicing tool. From stakeholder interviews we know: (1) The primary user is an accounts payable clerk who processes 50-100 invoices per day. (2) We think there's also a finance manager who approves large invoices, but we haven't talked to one. (3) The stakeholder mentioned that 'most of our users are 30-45 years old' but this is just their impression."

**Expected behavior**:
- Agent creates 2 personas (AP clerk + finance manager)
- AP clerk's invoice volume (50-100/day) is tagged [VALIDATED] — sourced from stakeholder interview
- Finance manager's existence and role is tagged [ASSUMPTION] — not directly confirmed
- Age range (30-45) is tagged [ASSUMPTION] — stakeholder impression, not user research data
- Agent does NOT tag stakeholder opinions as [VALIDATED]
- Validation priority is calculated based on assumption percentage

**Assertions**:
1. Exactly 2 personas created (not 1, not 3+)
2. AP clerk invoice volume is tagged [VALIDATED] with stakeholder interview citation
3. Finance manager persona is clearly marked with [ASSUMPTION] tags on unconfirmed attributes
4. Age demographic is tagged [ASSUMPTION], not [VALIDATED] — stakeholder opinion is not validation
5. "Assumptions to Validate" section is present with prioritized list
6. Single persona set document is produced (not one file per persona)
7. AGENT USAGE INSTRUCTIONS section is included

## Eval Case 2: Persona Consolidation

**Prompt**: "We've identified these user types: IT admin, system administrator, DevOps engineer, infrastructure engineer, and platform engineer. They all manage cloud infrastructure but with different tools and team sizes."

**Expected behavior**:
- Agent recognizes that 5 user types with similar needs should be consolidated
- Agent does NOT create 5 separate personas
- Agent consolidates into 2-3 distinct personas based on genuinely different needs/behaviors
- Agent explains the consolidation rationale

**Assertions**:
1. Agent produces 2-3 personas, not 5 (consolidation applied)
2. Consolidation rationale is documented — which user types were merged and why
3. Distinct personas represent genuinely different needs or behaviors, not just job titles
4. Each persona has a unique `persona_id` (P1, P2, P3)
5. Agent flags that 5 personas would be unmanageable for downstream skills

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.persona:0.1.2:2026-08-27T13:34:41Z -->
