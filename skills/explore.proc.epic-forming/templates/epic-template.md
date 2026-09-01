# Epic Template

> Use this template for epics extracted from PRDs. Epics represent a cohesive capability or feature set that can be broken down into multiple tasks (typical range: 5-15 tasks, but may exceed this with more demos) and delivered within 2-4 sprints. If an epic appears to need significantly more or fewer tasks, escalate to user for sizing decision before finalizing.

```toml
[metadata]
epic_id = "[EPIC_ID]"
last_updated = "YYYY-MM-DD"

[epochs]
# Each epoch represents a period of active work on this epic.
# Epochs are zero-indexed. Tasks reference a specific epoch by
# suffixing the epic ID: e.g. DFE-EXAMPLE-001 for epoch 1.
# See explore/architecture/turbine/sync/epic-epoch-handling.md

  [epochs.0]
  name = "[Epoch Name]"
  started = "YYYY-MM-DD"
  jira_key = ""
```

## Header
**Epic ID:** [EPIC_ID]  
**Epic Name:** [Short descriptive name]  
**Domain:** [CSR | Finance | Back Office | Platform]  
**Source PRD:** [PRD-XXX - Title]  
**Owner:** [name]  
**Status:** [Draft | Ready for Breakdown | In Progress | Complete]  
**Links:** [related epics], [design docs], [diagrams]

## Objective

[1-2 paragraphs describing the purpose and business value of this epic. What problem does it solve? What capability does it enable?]

## Scope & Boundaries

### In Scope
- [Specific capability 1]
- [Specific capability 2]
- [Specific capability 3]

### Out of Scope (Explicitly)
- [What this epic does NOT include]
- [Deferred to post-MVP or other epics]
- [Cross-domain concerns owned elsewhere]

## Key Behaviors

[Describe the core behaviors this epic must implement. Use numbered list for clarity.]

1. **[Behavior 1]** — [description]
2. **[Behavior 2]** — [description]
3. **[Behavior 3]** — [description]

## Acceptance Criteria

[High-level acceptance criteria that define "done" for the entire epic. These should be observable and testable. Include functional requirements, testing requirements, operational readiness, and cross-domain integration validation. **NOTE:** All completion criteria (including what would traditionally be "Definition of Done") are consolidated here.]

- [ ] [Functional criterion - e.g., "All orders emit lifecycle events per canonical schema"]
- [ ] [Performance criterion - e.g., "Order processing completes within 5 min SLA"]
- [ ] [Operational criterion - e.g., "Retry and recovery APIs functional and tested"]
- [ ] [Testing criterion - e.g., "Integration tests pass for happy path and error scenarios"]
- [ ] [Observability criterion - e.g., "Observability metrics published and dashboards configured"]
- [ ] [Documentation criterion - e.g., "Operational runbooks created and reviewed"]
- [ ] [Integration criterion - e.g., "Cross-domain integration validated with downstream consumers"]
- [ ] [Review criterion - e.g., "Post-implementation review conducted with stakeholders"]

## Data & Events

### Data Model (Conceptual)
[List key entities and their relationships - conceptual only, not schema]

- **[Entity1]** — [description and key relationships]
- **[Entity2]** — [description and key relationships]

### Event Model
**Consumes:**
- `[event_name]` — [from which domain/source]

**Emits:**
- `[event_name]` — [to which consumers/purpose]
- `[event_name]` — [to which consumers/purpose]

## Dependencies

### Upstream Dependencies
[What must exist before this epic can be completed?]

| Domain/Epic | Dependency | Type |
|-------------|------------|------|
| [Domain] | [What is needed] | [Blocking | Non-blocking] |

### Downstream Consumers
[Who/what depends on this epic's outputs?]

| Domain/Epic | Consumes | Type |
|-------------|----------|------|
| [Domain] | [What they consume] | [Event | API | Data] |

### Cross-Domain Integration
[External systems, platforms, or third-party dependencies]

- **[System/Platform]** — [what it provides; integration points]

## Technical Considerations

[Key technical decisions, constraints, or implementation notes that will guide task breakdown]

- **[Consideration 1]** — [e.g., "Must support idempotent retries with deterministic outcomes"]
- **[Consideration 2]** — [e.g., "PGP encryption managed by Platform; adapter consumes via API"]
- **[Consideration 3]** — [e.g., "State machine must be replayable from event log"]

## Risks & Mitigations

| Risk | Impact | Mitigation | Owner |
|------|--------|------------|-------|
| [Risk description] | [High/Med/Low] | [How we address it] | [Team/person] |

## Non-Functional Requirements

- **Availability:** [target, e.g., ≥ 99.95%]
- **Latency:** [target, e.g., < 5 min for data ingestion]
- **Event Reliability:** [target, e.g., ≥ 99.99%]
- **Audit Retention:** [target, e.g., ≥ 7 years]
- **Compliance:** [PCI DSS, GDPR, etc.]
- **Observability:** [metrics, logs, traces, dashboards]

## Observability & Monitoring

### Key Metrics
- `[metric_name]` — [purpose; target threshold]
- `[metric_name]` — [purpose; target threshold]

### Alerts
- [Alert condition and escalation path]

### Dashboards
- [Dashboard name and key visualizations]

## Task Breakdown Strategy

Organize tasks into **demo milestones** representing independently demonstrable progress to stakeholders. Each demo should be independently valuable and show concrete observable deliverables.

**Demo-Driven Approach:**
- Plan for a demo every 3-4 tasks (not a fixed phase structure)
- Each demo represents a logical capability increment with explicit observable deliverables
- Demos should follow implementation sequence: Foundation → Core Logic → Resilience → Optimization
- Adjust demo frequency based on epic complexity and task interdependencies
- **Demo tasks are explicit tasks** that include demonstration instructions and video recording requirements

### **Demo N: [Title] (Tasks X-Y)**
*Objective: [what this demo proves]*

- **Task X:** [description]
- **Task X+1:** [description]
- **Task Y:** **Demo N — [Title] Demonstration** — create and record demonstration video

**Observable Deliverables:**
- [deliverable 1]
- [deliverable 2]
- **Demo N Video:** Recorded demonstration with narrative context

**Stakeholder Value:** [why this matters]

## Demo Task Requirements

**Demo Task Structure:**
Each demo task must include:

### Demonstration Instructions
- **Step-by-step demonstration script** with specific commands and expected outputs
- **Environment setup requirements** for reproducible demonstrations
- **Key scenarios to showcase** based on cumulative functionality from preceding tasks
- **Narrative context** explaining the business value and technical significance

### Video Recording Requirements
- **Screen recording** of the demonstration (5-10 minutes)
- **Voice narration** explaining what's being shown and why it matters
- **Context building** by referencing previous demos and overall epic objectives
- **Shareable format** (MP4) uploaded to project repository or designated location

**Task Sizing & Sequencing:**
- **Demo Task Ratio:** 1 demo task per 3-4 implementation tasks
- **Dependencies:** Implementation tasks within each demo can be parallelized; demo task depends on completion of preceding implementation tasks
- **Demo Cadence:** 1 demo per sprint (weekly demos to stakeholders with recorded video for broader sharing)

## Related Epics

[List related epics with brief description of relationship]

- **[EPIC-ID]** — [relationship, e.g., "Depends on this for event schema"]
- **[EPIC-ID]** — [relationship, e.g., "Provides input to this epic"]
- **[EPIC-ID]** — [relationship, e.g., "Parallel implementation, shares patterns"]

## Links & References

- **PRD:** [link to source PRD]
- **Design Docs:** [HLD, technical specs]
- **Diagrams:** [architecture diagrams, sequence diagrams, state machines]
- **Platform Docs:** [relevant platform standards, patterns, conventions]
- **Decision Records:** [relevant ADRs from explore/decisions/]
- **External Specs:** [provider documentation, industry standards]

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.epic-forming:0.1.3:2026-09-01T11:38:04Z -->
