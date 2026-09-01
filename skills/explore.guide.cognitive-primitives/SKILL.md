+++
name = "explore.guide.cognitive-primitives"
description = "Use this skill when you need atomic cognitive operations during a brainstorm session — reframe, associate, blend, transform, decompose, generate, evaluate, cluster, and select. Load specific primitives on-demand per brainstorm step for token efficiency. Also relevant when someone says 'I need a thinking tool,' 'help me reframe this,' or 'how do I evaluate these ideas.' Does NOT run a full brainstorm session — use Brainstorm Methods for structured method protocols."
license = "Proprietary. See LICENSE.md"
+++

# Cognitive Primitives

Atomic cognitive operations for brainstorming. Load specific primitive sections on-demand during brainstorm steps. Never load the entire skill at once — load only the primitives needed for the current step.

## When to Use

| Primitive | Load During Step |
|-----------|-----------------|
| `reframe` | Step 1: Frame |
| `associate`, `blend`, `decompose`, `transform` | Step 2: Stimulate |
| `generate`, `transform` | Step 3: Diverge |
| `cluster` | Step 4: Externalize |
| `evaluate`, `select` | Step 5: Converge |

## Inputs to Request (if missing)

1. Problem statement (for reframe, decompose)
2. Seed concept (for associate, blend)
3. Base idea (for transform)
4. Raw idea list (for cluster, evaluate, select)
5. Evaluation criteria (for evaluate, select)

## Primitive Index

| # | Primitive | Guide File | What It Does |
|---|-----------|-----------|-------------|
| 1 | reframe | `guides/reframe.md` | Generate alternative problem formulations that open different search spaces |
| 2 | associate | `guides/associate.md` | Retrieve related concepts from seed; push toward remote associations for novelty |
| 3 | blend | `guides/blend.md` | Construct conceptual blends — emergent hybrids from two domains |
| 4 | transform | `guides/transform.md` | Apply systematic operators (SCAMPER, TRIZ) to mutate existing ideas |
| 5 | decompose | `guides/decompose.md` | Factor problem into independent parameters for morphological analysis |
| 6 | generate | `guides/generate.md` | Main production engine — flexibility mode or persistence mode |
| 7 | evaluate | `guides/evaluate.md` | Structured appraisal with bias defenses |
| 8 | cluster | `guides/cluster.md` | Group raw ideas by thematic affinity into named clusters |
| 9 | select | `guides/select.md` | Choose which ideas to advance using portfolio thinking |

## Output Format

Each primitive produces inline output within the step's context. No standalone artifact per primitive.

## Integration with Workflows

- **Brainstorm** (Steps 1-5) — Lazy load specific primitives per step
- Never load all primitives simultaneously — load only what the current step needs

## Best Practices

**Do**: Load only the primitives needed for the current step (token efficiency).
**Do**: Follow the protocol steps in order — they're sequenced for a reason.
**Do**: Mark far/random associations as fragile — protect them from premature judgment.
**Don't**: Mix generation primitives (associate, generate) with evaluation primitives (evaluate, select) in the same phase.
**Don't**: Skip the bias checks in evaluate — they're the most important part.
**Don't**: Use blend for surface-level combinations ("gamification" is lazy synectics) — look for deep structural analogies.

## Gotchas

- ⚡ **Premature evaluation kills novelty**: The agent tends to load `evaluate` and `select` primitives too early — during divergence phases when `generate` and `associate` should dominate. Never mix generation and evaluation primitives in the same brainstorm phase. Protect fragile early ideas from judgment.
- ⚡ **Shallow association trap**: When using `associate`, the agent defaults to obvious first-order associations (e.g., "hospital → doctor"). Push for remote associations (e.g., "hospital → airport terminal") — novelty comes from cross-domain transfer, not nearest neighbors.
- ⚡ **Blend without structure**: The agent sometimes produces blends that are just feature lists from two domains mashed together. A real blend has emergent properties that neither source has alone — if the blend doesn't surprise you, it's not a blend.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.guide.cognitive-primitives:0.1.1:2026-08-31T08:53:48Z -->
