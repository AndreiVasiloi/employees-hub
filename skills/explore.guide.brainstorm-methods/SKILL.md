+++
name = "explore.guide.brainstorm-methods"
description = "Use this skill when you need a structured brainstorming method protocol — SCAMPER, HMW, Morphological Analysis, Synectics, Six Hats, Crazy 8s, Reverse Brainstorming, TRIZ, Brainwriting, Affinity Mapping, or Round-Robin. Load only the method routed by Problem Classification. Also relevant when someone says 'let's brainstorm,' 'which ideation method fits,' or 'run a creative session.' Does NOT classify the problem or select the method — use Problem Classification for routing."
license = "Proprietary. See LICENSE.md"
+++

# Brainstorm Methods

Load the specific method protocol routed by the Problem Classification skill. Never load all methods at once — load only the method(s) selected for the current session.

## When to Use

Load the specific method protocol routed by the Problem Classification skill. Never load all methods at once — load only the method(s) selected for the current session.

## Inputs to Request (if missing)

1. Problem classification (from Problem Classification skill)
2. Selected framing (from Step 1: Frame)
3. Base concept/product/feature (for SCAMPER, transform-based methods)
4. Raw idea set (for Affinity Mapping, convergence methods)

## Method Index

| # | Method | Guide File | Best For | Cognitive Mode |
|---|--------|-----------|----------|---------------|
| 1 | SCAMPER | `guides/scamper.md` | Incremental improvement, product iteration | Persistence |
| 2 | How Might We (HMW) + Starbursting | `guides/hmw.md` | Problem definition, early-stage exploration | Flexibility |
| 3 | Morphological Analysis | `guides/morphological-analysis.md` | Complex systems with multiple parameters | Persistence |
| 4 | Synectics / Bisociation | `guides/synectics.md` | Breakthrough innovation, cross-domain transfer | Flexibility → Blend → Persistence |
| 5 | Six Thinking Hats | `guides/six-hats.md` | Examining idea from all angles, stuck perspective | Sequential perspective shifts |
| 6 | Crazy 8s | `guides/crazy-8s.md` | Quick divergence, breaking analysis paralysis | Pure flexibility |
| 7 | Reverse Brainstorming | `guides/reverse-brainstorming.md` | When normal brainstorming produces bland results | Inversion |
| 8 | TRIZ (Lite) | `guides/triz.md` | Technical problems with contradictions | Persistence |
| 9 | Brainwriting 6-3-5 | `guides/brainwriting.md` | Structured ideation with forced iteration | Flexibility → Persistence |
| 10 | Affinity Mapping + Impact-Effort | `guides/affinity-mapping.md` | Post-divergence convergence | Convergence |
| 11 | Round-Robin Perspectives | `guides/round-robin.md` | Stakeholder analysis, diverse viewpoints | Sequential perspective taking |

## Output Format

Each method produces output inline within the step context. Format varies by method — see Expected Output for each guide file.

## Integration with Workflows

- **Brainstorm** (Step 2: Stimulate) — Conditional load based on method routing
- **Brainstorm** (Step 3: Diverge) — Conditional load if method-specific generation needed
- Load ONLY the routed method, never all 11

## Best Practices

**Do**: Follow the method protocol step by step — the sequence matters.
**Do**: Generate the minimum viable output before presenting to steering team.
**Do**: Combine methods when routing suggests it (e.g., HMW + Starbursting, TRIZ + Reframe).
**Don't**: Load multiple method protocols simultaneously (token efficiency).
**Don't**: Skip steps within a method protocol — they build on each other.
**Don't**: Use SCAMPER when you need breakthrough innovation (use Synectics instead).
**Don't**: Use Synectics when you need incremental improvement (use SCAMPER instead).

## Gotchas

- ⚡ **Method overload**: The agent sometimes loads 2-3 method protocols simultaneously "for variety." This wastes tokens and confuses execution. Load exactly one method at a time — if the first method stalls, unload it before loading the next.
- ⚡ **SCAMPER on blank slates**: SCAMPER requires an existing concept to transform. The agent sometimes tries to run SCAMPER when there is no base concept yet — use HMW or Crazy 8s for initial divergence, then SCAMPER to iterate on the results.
- ⚡ **Six Hats without discipline**: The agent tends to collapse Six Hats into a generic pros-and-cons list. Each hat must be worn sequentially and exclusively — no mixing perspectives within a single hat pass. If the output reads like a balanced analysis rather than six distinct viewpoints, the method wasn't followed.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.guide.brainstorm-methods:0.1.1:2026-08-31T08:53:50Z -->
