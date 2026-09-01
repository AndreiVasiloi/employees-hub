# Primitive: generate(mode, budget)

**What:** Main production engine. Runs divergent idea generation in two modes.

## Flexibility Mode

- **Objective:** Maximum breadth — sweep across many categories
- **Behavior:** Rapid production. One-liners or two-liners.
- **Rule:** After each idea, check category — if same as last 2, force category switch
- **Budget:** 15-30 ideas
- **Quality:** Low per-idea, high variance, some garbage is correct

## Persistence Mode

- **Objective:** Maximum depth — explore few directions thoroughly
- **Behavior:** Pick 2-3 promising clusters. For each, generate 3-5 elaborated variants using transform operators.
- **Rule:** Stay within the cluster. Apply SCAMPER. Push to extremes.
- **Budget:** 5-10 ideas per cluster
- **Quality:** Higher per-idea, lower variance, more developed

## Switching Logic

Start in flexibility. Switch to persistence when:
- Hit flexibility budget (15-30 ideas)
- Semantic diversity declining (repeating yourself)
- Steering team says "that direction is interesting, go deeper"

Switch back to flexibility when:
- Persistence hits diminishing returns in a cluster
- Steering team says "let's explore other directions"
- 10+ persistence ideas without a breakthrough

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.guide.cognitive-primitives:0.1.1:2026-08-31T08:53:48Z -->
