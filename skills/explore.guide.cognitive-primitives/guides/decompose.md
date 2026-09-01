# Primitive: decompose(problem, schema)

**What:** Factor a problem into independent parameters, then explore the combinatorial space systematically.

**Why:** Morphological analysis (Zwicky) makes the problem space explicit and navigable. Systematic enumeration instead of hoping for insight.

## Protocol

1. **Identify parameters** — independent dimensions of the problem:
   - Product: user, context, mechanism, interface, revenue model, technology
   - Process: trigger, input, transformation, output, feedback, actors
   - Strategy: audience, channel, message, timing, metric

2. **List values** — 3-5 options per parameter (include unconventional + "zero/eliminate")

3. **Build morphological box:**

```
| Parameter | Option A | Option B | Option C | Option D |
|-----------|----------|----------|----------|----------|
| User | power user | first-timer | admin | API consumer |
| Mechanism | automation | recommendation | collaboration | gamification |
| Interface | chat | dashboard | email digest | CLI |
| Revenue | subscription | usage-based | freemium | marketplace |
```

4. **Generate configurations** — pick one value from each row:
   - 3 conventional (sanity baseline)
   - 3 forced-unusual (randomly combine uncommon values)
   - 3 themed ("minimal", "maximal", "inverted")

5. **Consistency check** — discard truly impossible combinations, keep uncomfortable ones

**Template:** `templates/morphological-box.md`

## Output

Morphological table + 5-9 interesting configurations with one-line descriptions.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.guide.cognitive-primitives:0.1.1:2026-08-31T08:53:48Z -->
