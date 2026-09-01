+++
name = "explore.proc.market-research"
description = "Use this skill when you need to validate market opportunity — researching market size, competitive landscape, and opportunity gaps for a product concept. Activates during discovery after context documentation establishes the baseline. Also relevant when someone says 'is there a market for this,' 'who are the competitors,' or 'size the opportunity.' Does NOT analyze the technical domain — use Domain Analysis for entity and rules modeling."
license = "Proprietary. See LICENSE.md"
+++

# Market Research

Conduct market research to validate market size, competitive landscape, and opportunity gaps for product concepts.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Validate market size and growth potential for a product concept
- Analyze competitive landscape and identify market gaps
- Understand industry trends and emerging technologies
- Validate demand and supply assumptions
- Assess regulatory and compliance context
- Size the addressable market for MVP planning
- Position product differentiation against competitors

**Key principle**: Market research validates product-market fit early by providing evidence-based insights on market size, competitive positioning, and opportunity gaps before significant investment in design and development.

## Pre-Check

If market research already exists at `explore/explore-[slug]/market-research.md`:
1. Load the existing market research
2. Present to the steering team: "Existing market research found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before conducting market research, ensure you have:

1. **Context baseline** - From Context Documentation skill (problem statement, domain)
2. **Product concept** - Clear description of what you're building
3. **Target market** - Geographic region, industry, or segment
4. **Research questions** - What you need to validate
5. **Slug** - Project identifier for file naming (e.g., `care-it`)

**Optional inputs**:
- Hypothesis document (from Hypothesis Documentation skill)
- Known competitors or alternatives
- Regulatory requirements or constraints
- Budget and timeline for research

**STOP**: If product concept is unclear, work with stakeholders to define it before conducting research.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-research-scope.md](./steps/01-research-scope.md) | Define research scope and questions |
| 2 | [02-market-size.md](./steps/02-market-size.md) | Research market size and growth |
| 3 | [03-competitive-landscape.md](./steps/03-competitive-landscape.md) | Analyze competitive landscape |
| 4 | [04-market-gaps.md](./steps/04-market-gaps.md) | Identify market gaps |
| 5 | [05-supply-demand.md](./steps/05-supply-demand.md) | Analyze supply and demand |
| 6 | [06-regulatory.md](./steps/06-regulatory.md) | Research regulatory and compliance context |
| 7 | [07-technology-trends.md](./steps/07-technology-trends.md) | Identify technology trends |
| 8 | [08-market-sizing.md](./steps/08-market-sizing.md) | Size the target market (MVP focus) |
| 9 | [09-competitive-positioning.md](./steps/09-competitive-positioning.md) | Create competitive positioning |
| 10 | [10-synthesize.md](./steps/10-synthesize.md) | Synthesize findings and recommendations |
| 11 | [11-write-document.md](./steps/11-write-document.md) | Write market research document |
| 12 | [12-validation.md](./steps/12-validation.md) | Run completeness validation |

## Output Format

```
explore/explore-[slug]/market-research.md
```

**Template**: `templates/market-research-template.md`

**Complete Structure** (11 sections):
1. **Executive Summary** - Key finding, market opportunity, validation status
2. **Market Size & Growth** - Global market data, drivers, segments
3. **Competitive Landscape** - Current players by category with comparison tables
4. **Market Gap Analysis** - What exists vs what we provide
5. **Supply and Demand Analysis** - Both sides of marketplace (if applicable)
6. **Regulatory & Compliance Context** - Standards, requirements, strategy
7. **Technology Trends** - Emerging technologies and innovations
8. **Market Sizing (Target Region)** - MVP-focused bottom-up sizing
9. **Competitive Positioning** - Differentiation and positioning statement
10. **Key Insights & Recommendations** - Validated opportunities, assumptions, risks, next steps
11. **Sources** - All references with URLs

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Provides market context for problem statement
- **Domain Analysis** — Domain understanding informs competitive analysis

**Produces** (consumed by):
- **Hypothesis Documentation** (`explore.proc.hypothesis-documentation`) — Competitive gaps and white space feed hypothesis
- **Problem Framing** (Step 3 Phase A) — Market context frames ideation
- **Idea Evaluation** (Step 3 Phase D) — Market fit as evaluation criterion
- **PRD Generation** (`explore.proc.prd-generation`) — Competitive positioning and market gaps
- **Regulatory Compliance** (`explore.proc.regulatory-compliance`) — Regional regulations inform market entry strategy
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Competitive landscape informs differentiation
- **Risk Documentation** (`explore.proc.risk-documentation`) — Market and competitive risks
- **Persona** (`explore.proc.persona`) — Identifies target customer segments

## Best Practices

**Do**:
- ✅ Cite all sources with URLs and dates
- ✅ Use recent data (within last 2 years for market size)
- ✅ Tag assumptions as [VALIDATED] or [NEEDS VALIDATION]
- ✅ Create comparison tables for competitive analysis
- ✅ Focus MVP sizing on specific geographic region and segment
- ✅ Document what needs further validation (user research, pilot)
- ✅ Use multiple sources to triangulate findings
- ✅ Distinguish between facts and assumptions

**Don't**:
- ❌ Rely on single sources for critical claims
- ❌ Use outdated market data (>3 years old)
- ❌ Confuse market size with addressable market
- ❌ Ignore competitors or alternatives
- ❌ Make unsupported claims about market gaps
- ❌ Skip regulatory research for regulated industries
- ❌ Overestimate market size without bottom-up validation
- ❌ Forget to document assumptions that need validation

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Market size estimated with TAM, SAM, and SOM clearly distinguished
- [ ] Competitive landscape analyzed (including at least one failed entrant)
- [ ] Market gaps identified with supporting evidence
- [ ] All claims tagged with source and date
- [ ] Assumptions tagged [VALIDATED] or [NEEDS VALIDATION]
- [ ] LLM knowledge cutoff flagged for unverifiable data

## Gotchas

- ⚡ **TAM vs. SAM confusion**: The agent frequently conflates Total Addressable Market with Serviceable Addressable Market, inflating opportunity estimates. Always present both figures clearly separated — the SAM is what drives product decisions, not the TAM.
- ⚡ **Survivorship bias in competitor analysis**: The agent tends to analyze only successful competitors, missing failed entrants whose lessons are equally valuable. Always include at least one failed or exited competitor to understand market risks.
- ⚡ **LLM knowledge cutoff**: Market research based on the agent's training data may be outdated. Always tag market size figures, competitor information, and trend data with their source date. Flag anything that could not be verified against current sources.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.market-research:0.1.2:2026-08-27T13:34:39Z -->
