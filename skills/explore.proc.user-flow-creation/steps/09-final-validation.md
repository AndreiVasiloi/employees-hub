# Step 9: Final Validation

## Objective

Run a completeness check on the flow set document.

## Entry Criteria

- [ ] Step 8 (Write Document) complete
- [ ] Document exists at `explore/domain/flows-[slug].md`

## Actions

### 9.1 Run Completeness Check

Verify all required elements:

- [ ] All flows have unique IDs (F1, F2, etc.)
- [ ] Every flow has single objective with tag
- [ ] Entry and exit points defined with tags
- [ ] Every step has [VALIDATED] or [ASSUMPTION] tag
- [ ] All decision nodes have 2 labeled paths
- [ ] No dead ends in any flow
- [ ] Shape Legend present in AGENT USAGE INSTRUCTIONS
- [ ] Narrative written for each flow (inferred steps prefixed "Assumed:")
- [ ] Assumptions to Validate section present for each flow
- [ ] Validation Summary table complete
- [ ] Validation Priority calculated correctly
- [ ] File written to correct location

### 9.2 Present Validation Results

```
User Flow Set Complete

File: explore/domain/flows-[slug].md
Flows: [N] created
Validation status:
  - F1: [X]% validated, [Y]% assumptions [Priority]
  - F2: [X]% validated, [Y]% assumptions [Priority]

Overall validation priority: [High/Medium/Low]
UX Validation: All flows passed ✓

Ready for wireframing, prototyping, and implementation.
```

## Exit Criteria

- [ ] All completeness checks pass
- [ ] Validation results presented to human
- [ ] Document ready for downstream consumption

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.user-flow-creation:0.2.1:2026-08-31T12:53:29Z -->
