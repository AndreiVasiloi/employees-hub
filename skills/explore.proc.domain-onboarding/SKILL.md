+++
name = "explore.proc.domain-onboarding"
description = "Use this skill when entering a new domain and you need to quickly capture its vocabulary, constraints, regulations, and patterns through a lightweight interview process. Produces a persistent domain profile that informs all future engagements. Also relevant when someone says 'new domain,' 'unfamiliar system,' 'learning the landscape,' or 'I need to understand this business area.' Does NOT produce project-specific analysis — use Domain Analysis for that."
license = "Proprietary. See LICENSE.md"
+++

# Domain Onboarding

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:

- Begin working in a domain the agent has no persistent knowledge for
- Populate the persistent knowledge store with domain-specific vocabulary, constraints, regulations, patterns, and quality priorities
- Establish authority pattern guidance for truth hierarchy construction in future engagements
- The human explicitly says "new domain" or the agent detects no domain profile exists

**Processes that use this skill**:
- Architecture Copilot (Step 0: Domain Onboarding — one-time per domain, before Step 1)

**Key principle**: This is a lightweight 30-minute interview, not a week-long discovery. The domain profile is a living document enriched by the improvement loop after each engagement.

## Inputs to Request

Before running domain onboarding, ensure you have:

1. **Domain name** — what domain is this? (e.g., "healthcare claims processing," "logistics fleet management")
2. **Human with domain expertise** — someone who can answer questions about the domain's vocabulary, constraints, regulations, and patterns
3. **Any existing domain documentation** — glossaries, architecture diagrams, regulatory guides, prior HLDs (optional but helpful)

**STOP**: If the agent already has a domain profile for this domain in persistent knowledge, confirm with the human whether to skip onboarding or refresh the profile.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-vocabulary-and-scope.md](./steps/01-vocabulary-and-scope.md) | Structured interview to capture domain vocabulary and scope |
| 2 | [02-constraints-and-regulations.md](./steps/02-constraints-and-regulations.md) | Capture regulatory, technical, and organizational constraints |
| 3 | [03-patterns-and-authority.md](./steps/03-patterns-and-authority.md) | Capture architectural patterns, authority structures, and quality priorities |
| 4 | [04-assemble-validate.md](./steps/04-assemble-validate.md) | Compile responses into domain profile and run validation checklist |

## Output Format

```
persistent-knowledge/[domain]-profile.md
```

**Templates**: `templates/domain-profile.md`, `templates/pattern-library.md`

1. **Domain Overview** — name, description, industry vertical
2. **Domain Vocabulary** — terms with definitions, synonyms, usage notes
3. **Key Architectural Concerns** — what matters and why
4. **Known Constraints** — technical, organizational, regulatory, timeline, budget
5. **Regulatory Landscape** — applicable regulations with requirements and architectural impact
6. **Common Architectural Patterns** — patterns with when-to-use and when-not-to-use
7. **Authority Patterns** — truth hierarchy guidance for this domain
8. **Quality Priorities** — default quality attribute rankings
9. **Domain-Specific Hardening Items** — additional checks beyond universal categories

## Integration with Workflows

Architecture Copilot (Step 0: Domain Onboarding) loads this skill once per new domain. It runs before Step 1 and populates the persistent knowledge store. The domain profile feeds into all future engagements: engagement scoping uses quality priorities, boundary mapping uses authority patterns, design sketch uses architectural patterns, and hardening uses domain-specific checks.

**Consumes**:
- **Knowledge Extraction** — Improvement loop enriches the domain profile with DOMAIN-scoped learnings

**Produces** (consumed by):
- **Boundary Mapping** (`explore.proc.boundary-mapping`) — Authority patterns feed truth hierarchy construction
- **Design Sketch** (`explore.proc.design-sketch`) — Architectural patterns inform decision point analysis
- **Feedback Integration** (`explore.proc.feedback-integration`) — Domain-specific hardening items extend the checklist

## Best Practices

**Do**:
- Keep the interview lightweight — 30 minutes, not a week-long discovery
- Capture definitions, not just term names — "what does X mean in YOUR context?"
- Ask about ambiguous terms explicitly — same word, different meaning across sub-domains
- Document authority patterns as suggestions, not mandates — each engagement confirms its own hierarchy
- Include "when NOT to use" for every pattern — negative guidance is as valuable as positive

**Don't**:
- Pretend to know a domain you haven't been onboarded to — if no profile exists, say so
- Run this for every engagement — once per domain, then skip (unless human requests a refresh)
- Make the profile exhaustive — it's a living document that gets enriched over time
- Impose authority patterns from one domain onto another — each domain has its own truth structures
- Skip the regulatory landscape section — even "none applicable" is important to document

If you propose changes, keep them minimal and clearly scoped.

## Gotchas

- ⚡ **Cross-domain authority bleeding**: Each domain has its own truth hierarchy and authority patterns. The agent tends to carry authority assumptions from a previously onboarded domain into a new one. Always start fresh — never assume "this domain works like the last one."
- ⚡ **Regulatory blind spot**: Even when stakeholders say "no regulations apply," there are almost always data handling, privacy, or accessibility requirements. Always probe with specific regulatory categories rather than accepting a blanket "none applicable."
- ⚡ **Profile completeness vs. accuracy**: The agent may pad the domain profile with inferred information to appear thorough. A sparse but accurate profile is far more valuable than a comprehensive but speculative one. Tag every entry with its evidence source.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.domain-onboarding:0.1.2:2026-09-01T08:21:55Z -->
