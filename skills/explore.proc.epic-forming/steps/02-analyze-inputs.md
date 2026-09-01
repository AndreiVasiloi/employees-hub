# Step 2: Analyze Inputs

## Objective

Analyze source materials to extract system capabilities and understand their implementation state, preparing for pattern analysis and placement decisions.

## Entry Criteria

- Source materials available (PRDs, concepts, requirements, existing artifacts)
- Epic-forming process triggered
- Access to existing epics for pattern context

## Actions

### 2.1 Extract System Capabilities

Identify capabilities from source materials:
- **Core Capabilities**: Primary system features and functionality
- **Supporting Capabilities**: Enabling features and infrastructure
- **Integration Capabilities**: Connections to other systems/components
- **User Experience Capabilities**: Workflow and interaction improvements

### 2.2 Assess Implementation State

Determine current state of each capability:
- **Already Implemented**: Capabilities that exist in the system
- **Partially Implemented**: Capabilities that need enhancement
- **Not Yet Implemented**: Capabilities to be built
- **Unknown State**: Capabilities requiring investigation

### 2.3 Document Capability Context

Capture context for each capability:
- **Capability Description**: What the capability does/provides
- **Business Value**: Why the capability matters
- **Technical Context**: How the capability works
- **Dependencies**: What other capabilities it depends on

### 2.4 Prepare for Pattern Analysis

Organize capabilities for pattern matching:
- **Capability Inventory**: Complete list of identified capabilities
- **Implementation State Matrix**: Current state of each capability
- **Relationship Map**: How capabilities relate to each other
- **Source References**: Links back to source materials

## Discussion Point (Governed Mode)

**STOP**: Present capability analysis for validation:
- "I've analyzed the source materials and identified the following capabilities:"
- "Core capabilities: [list]"
- "Implementation state: [summary of what exists vs what needs building]"
- "Key relationships: [important dependencies]"
- "Does this capability analysis match your understanding?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Extract capabilities from source materials using pattern matching
- Assess implementation state based on available system information
- Document capability context and relationships
- Create capability inventory for pattern analysis
- Proceed to Step 2 with documented capabilities

## Exit Criteria

- [ ] System capabilities extracted and documented
- [ ] Implementation state assessed for each capability
- [ ] Capability context and relationships documented
- [ ] Capability inventory prepared for pattern analysis
- [ ] Ready for existing epic pattern analysis

## Next Step

→ [03-analyze-existing-patterns.md](./03-analyze-existing-patterns.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.epic-forming:0.1.3:2026-09-01T11:38:04Z -->
