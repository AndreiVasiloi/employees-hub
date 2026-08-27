# Step 4: Signal Clarify (Optional)

**Objective**: Systematically challenge, confirm, or reclassify assumptions found in a Signal Seed to strengthen signal confidence.

**Read ONLY this step file during execution. Do not load other steps until this step is complete.**

**When to use**: Any time after Signal Capture when a Signal Seed has `[ASSUMPTION]` tags that need review, when new information arrives that may change assumption status, or when you want to increase confidence before completing or routing.

---

## Step Execution Rule

❌ Do not force reclassification — it's OK to keep assumptions as assumptions.
❌ Do not fabricate sources — only convert to FACT with a real, verifiable source.
❌ Do not hide critical unverifiable assumptions — flag them as risks honestly.

---

## Actions

### 1. Load the Signal

Ask the user which Signal to clarify. Read the Signal file and extract all `[ASSUMPTION]`-tagged statements.

### 2. Present Assumptions

Present a table of all assumptions found: number, statement, section, current tag.

### 3. Challenge Each Assumption

For each assumption, ask:
1. **Confirm as FACT** — Do you have a source that verifies this?
2. **Reclassify as OPINION** — Is this a subjective judgement?
3. **Flag as RISK** — Is this critical and unverifiable right now?
4. **Keep as ASSUMPTION** — Acknowledged but not yet verifiable

Based on response, update tag:
- **FACT**: `[FACT — source: [document/person], [date]]`
- **OPINION**: `[OPINION — rationale: [reasoning]]`
- **RISK**: Keep as `[ASSUMPTION]` + add to Risks from Assumptions note
- **KEEP**: No change

### 4. Update the Signal Document

1. Update all reclassified tags
2. Add Completion Notes entry with session summary
3. If risks flagged, add to Constraints section

### 5. Summarize

Present clarification results: total reviewed, converted to FACT, reclassified as OPINION, flagged as RISK, kept as ASSUMPTION, confidence impact.

---

## Exit Criteria

- [ ] All `[ASSUMPTION]` tags reviewed
- [ ] Each reclassified assumption updated with source (FACT) or rationale (OPINION)
- [ ] Risk flags added to Completion Notes for critical unverifiable assumptions
- [ ] Completion Notes entry added with session summary
- [ ] Signal document saved with updated tags

**Next step**: Return to Step 2 (Signal Strengthen) or Step 3 (Signal Route) depending on confidence level.
