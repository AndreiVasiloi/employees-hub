# Step 5: Define State and Messaging Requirements

## Objective

Specify how application states are communicated accessibly, including empty states, loading, errors, permissions, and success.

## Entry Criteria

- [ ] Step 4 (Component Requirements) complete with all components specified
- [ ] Component interaction patterns documented

## Actions

### 5.1 Define State Requirements

Specify how each state type is communicated:

```
State and Messaging Requirements

**Empty states**:
- Provide context and next action
- Don't rely on imagery alone

**Loading states**:
- Loading communicated via text or ARIA status
- Skeletons don't prevent navigation to other content

**Error states**:
- Errors explain what happened and what to do
- Recovery paths provided
- Error messages announced and connected to controls

**No permission states**:
- Explain why access blocked in user-friendly terms
- Provide next step (request access, contact admin)

**Success states**:
- Confirmation announced
- Focus moved appropriately

Are there additional states that need specification?
```

**STOP**: Wait for human to confirm state requirements.

## Exit Criteria

- [ ] Empty state requirements defined
- [ ] Loading state requirements defined
- [ ] Error state requirements defined
- [ ] No permission state requirements defined
- [ ] Success state requirements defined
- [ ] Human confirmed state requirements

## Next Step

→ [06-flow-level-checks.md](./06-flow-level-checks.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.accessibility-specifications:0.1.2:2026-09-01T07:59:41Z -->
