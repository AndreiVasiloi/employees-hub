# Architecture Depth Matrix

**Single source of truth** for all Explore Type adaptation tables and the Architecture Style Matrix used across architecture skills and `explore.agent` Steps 2 and 5.

Referenced by:
- `explore.proc.architecture-context` (`SKILL.md` §Explore Type Adaptation)
- `explore.proc.architecture-solutioning` (`SKILL.md` §Explore Type Adaptation)
- `explore.agent` Step 5 (`05-specification-backlog.md` §Explore Type Adaptation)
- `explore.agent` Step 2 (`02-discovery.md` §Activity 6 depth)

> **Note**: Tables 1 and 2 below are retained for backward compatibility with `explore.proc.architect` (deprecated). New skills should reference the Explore Type Adaptation tables in their own SKILL.md files.

---

## Table 1: Architect Skill Step Depth by Explore Type

Applies to `explore.proc.architect` invoked in any mode (phase: A, phase: B, or full).

| Architect Step | Fast Lane | ERC | Diverge/Converge |
|---------------|-----------|-----|------------------|
| **Steps 01–02** (Context, Scope) | ⚠️ Confirm from Explore artifacts only | ✅ Full with Explore artifact pre-population | ✅ Full with Explore artifact pre-population |
| **Step 03** (Landscape) | ❌ Skip — already captured in Explore Steps 1–2 | ⚠️ Targeted — only questions not answered by Explore | ✅ Full question bank (AQ-001–012) |
| **Steps 04–05** (Drivers, Domain) | ⚠️ Light — confirm from Explore | ✅ Full | ✅ Full with DDD depth |
| **Step 06** (Approach) | ⚠️ Confirm existing approach | ✅ Full decision matrix | ✅ Full decision matrix + adaptation matrix |
| **Steps 07–08** (Design, Cross-cutting) | ⚠️ Outline only | ✅ Full HLD | ✅ Comprehensive HLD + cross-skill integration |
| **Step 09** (Harden) | ❌ Skip | ⚠️ BASE hardening only (4 categories) | ✅ Full (BASE + EXTENDED + DOMAIN) |
| **Step 10** (Write HLD) | ⚠️ Summary HLD | ✅ Full HLD | ✅ Full HLD with all supporting artifacts |

**Phase A (Steps 01–05) only:**

| Step | Fast Lane | ERC | Diverge/Converge |
|------|-----------|-----|------------------|
| **Steps 01–02** | ⚠️ Drivers only (skip landscape, domain) | ✅ Full | ✅ Full |
| **Step 03** | ❌ Skip | ⚠️ Targeted unanswered AQs only | ✅ Full AQ-001–012 |
| **Steps 04–05** | ⚠️ Confirm from Explore | ✅ Full | ✅ Full + DDD depth |

---

## Table 2: Unified Path Sub-Step Depth by Explore Type

Applies to the B.0–B.4 path in `explore.proc.architecture-solutioning` / `explore.agent` Step 5 Part 1. The solutioning skill reads `architecture-context.md` as its primary context input (produced by `explore.proc.architecture-context` in Step 2 Activity 6). No `context_mode` branching — presence of `architecture-context.md` determines pre-population depth.

| Sub-Step | Fast Lane | ERC | Diverge/Converge |
|----------|-----------|-----|------------------|
| **B.0** Domain Onboarding | ❌ Skip | ⚠️ Only if domain profile missing | ✅ Full (bootstrap from Explore artifacts) |
| **B.1** Context & Design Direction | ⚠️ Confirm existing architecture only | ✅ Full engagement setup + boundary map + sketch | ✅ Full with calibration loop |
| **B.2** Consolidated HLD Draft | ❌ Skip (reference existing HLD) | ✅ Full HLD draft | ✅ Full HLD draft with all sections |
| **B.3** Review & Hardening | ❌ Skip | ⚠️ BASE hardening only (4 categories) | ✅ Full hardening (BASE + EXTENDED + DOMAIN) |
| **B.4** Finalization & Handoff | ❌ Skip | ⚠️ Light polish | ✅ Full simplification audit + polish + package |

---

## Table 3: Step 5 Overall Explore Type Adaptation

Applies to all components of `explore.agent` Step 5 (Parts 1–4).

| Component | Fast Lane | ERC | Diverge/Converge |
|-----------|-----------|-----|------------------|
| **Domain-Analysis Gate** | ⛔ STOP if no `domain-analysis.md` | ⛔ STOP if no `domain-analysis.md` | ⛔ STOP if no `domain-analysis.md` |
| **HLD Domain Naming** | Single HLD, bundle name | Per-domain HLDs (if domain-analysis exists) | Per-domain HLDs (required if multi-domain) |
| **Architecture Path** | Single path (`explore.proc.architecture-solutioning`) | Single path | Single path |
| **Architecture (Part 1)** | ✅ Confirmation only | ✅ Analysis + HLD | ✅ Comprehensive HLD + ADRs + hardening |
| **Architecture Context (Step 2)** | ❌ Skip | ⚠️ Optional | ✅ Recommended |
| **Test Strategy** | ✅ Lightweight | ✅ Standard (9-step) | ✅ Full depth (9-step + extended) |
| **DevOps Strategy** | ✅ Lightweight | ✅ Standard (11-step) | ✅ Full depth (11-step + extended) |
| **Epic Formation** | ⚠️ Optional (may skip) | ✅ Standard epics | ✅ Detailed epics with key behaviors |
| **Task Breakdown** | ⚠️ Optional (may skip) | ✅ High-level tasks | ✅ Detailed task stubs |
| **Govern Readiness** | ✅ Streamlined check | ✅ Standard check | ✅ Comprehensive check (incl. domain traceability) |

---

## Table 4: Architecture Style Matrix

Applies when the architecture style is selected in B.1.3 Design Sketch (`explore.proc.architecture-solutioning`). Use to adapt design guidance per selected style.

| Architecture Type | Decomposition | Communication | Data | Resilience | Deployment |
|-------------------|--------------|---------------|------|------------|------------|
| **Monolith** | Layers/modules within single unit | In-process method calls | Single shared database | Error handling, graceful degradation | Single artifact; blue-green/rolling |
| **Modular monolith** | Domain-aligned modules with enforced boundaries | In-process with module APIs | Shared DB with schema-per-module ownership | Module-level circuit breakers; Outbox for async | Single artifact; feature flags per module |
| **Microservices** | Independent services per bounded context | REST/gRPC + async events | Database-per-service; eventual consistency | Circuit breaker, bulkhead, saga | Per-service pipeline; canary/blue-green |
| **Event-driven** | Event producers/consumers/processors | Async events via broker | Event sourcing or CQRS; schema registry | Dead letter queues, replay, compensating events | Schema-compatible; expand-and-contract |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-context:1.0.1:2026-08-27T13:34:38Z -->
