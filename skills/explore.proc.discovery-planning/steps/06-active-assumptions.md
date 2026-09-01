# Step 6: Document Active Assumptions

## Objective

Extract assumptions from the Signal and categorize by type with risk assessment and validation plan.

## Entry Criteria

- [ ] Step 5 (Open Questions) complete with all questions documented

## Actions

### 6.1 Categorize Assumptions

Extract and categorize assumptions:

```
Active Assumptions

| Code | Assumption | Risk if wrong | Validate in |
|------|-----------|---------------|-------------|
| **Stakeholder Assumptions** |
| AS-1 | [User/stakeholder assumption] | [Impact if incorrect] | A# |
| AS-2 | [Market/adoption assumption] | [Impact if incorrect] | A# |
| **Technical Assumptions** |
| AT-1 | [Technology stack assumption] | [Impact if incorrect] | A# |
| AT-2 | [Architecture assumption] | [Impact if incorrect] | A# |
| AT-3 | [Integration assumption] | [Impact if incorrect] | A# |
| **Operational Assumptions** |
| AO-1 | [Process assumption] | [Impact if incorrect] | A# |
| AO-2 | [Resource assumption] | [Impact if incorrect] | A# |
| **Business Assumptions** |
| AB-1 | [Revenue/pricing assumption] | [Impact if incorrect] | A# |
| AB-2 | [Growth/adoption assumption] | [Impact if incorrect] | A# |
| AB-3 | [Performance metric assumption] | [Impact if incorrect] | A# |

Note: 
- All assumptions tagged [ASSUMPTION] in Signal become tracked assumptions here
- Each assumption must link to an activity (A#) that will validate it
- Categories: AS = Stakeholder, AT = Technical, AO = Operational, AB = Business
- Add custom categories as needed (e.g., AC = Compliance, AU = UX)
```

## Exit Criteria

- [ ] All assumptions extracted from Signal
- [ ] Assumptions categorized (AS, AT, AO, AB)
- [ ] Each assumption has risk assessment
- [ ] Each assumption linked to a validating activity (A#)

## Next Step

→ [07-identify-risks.md](./07-identify-risks.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.discovery-planning:0.1.2:2026-08-27T13:21:11Z -->
