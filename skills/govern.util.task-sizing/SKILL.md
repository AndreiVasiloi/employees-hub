+++
name = "task-sizing"
description = "Repeatable task complexity estimation using multi-axis scoring framework for implementation, analysis, or process tasks."
license = "Proprietary. See LICENSE.md"
+++

## When to use
Use this skill when you need a **repeatable** task complexity estimation for implementation, analysis, or process tasks.

## Inputs to request (if missing)
- Task description and scope
- Target folder/directory for analysis
- Any known dependencies or constraints
- Desired confidence level (optional)

## Procedure

1. **Analyze Task Scope**
   - Review task description and requirements
   - Identify files, modules, and systems involved
   - Map out interfaces and dependencies
   - Assess technical complexity factors

2. **Score Each Complexity Axis**
   - Scope/Surface Area: 0-3 based on files/modules involved
   - Coupling/Interfaces: 0-3 based on interface changes required
   - Novelty/Uncertainty: 0-3 based on new patterns/technologies
   - Dependencies: 0-3 based on external systems/people dependencies
   - Testing & Verification: 0-3 based on test infrastructure needs
   - Risk/Blast Radius: 0-3 based on production impact and rollback complexity

3. **Calculate Size and Present for Review**
   - Sum all axis scores (0-18 total)
   - Map total score to shirt size using framework table
   - Present sizing analysis to human for review
   - **STOP**: Wait for human feedback and adjustments

4. **Incorporate Feedback and Finalize**
   - Review human feedback and adjust scores as needed
   - Update axis scores based on human corrections
   - Recalculate total score and shirt size if scores changed
   - Generate final size.md file with adjusted scores and rationale

## Output format

Creates a `size.md` file in the task folder containing:
- Multi-axis complexity scoring with rationale
- Total complexity score and shirt size mapping
- Time estimate and confidence level
- Dependencies and risk factors
- Detailed rationale for sizing decisions

The size.md follows this structure:
```markdown
# Task Sizing

## Complexity Dimensions
### Technical Complexity
- Analysis Scope: <number> folders to analyze
- File Count: <estimated_files> files to process
- Cross-References: <estimated_xrefs> references to validate
- Integration Points: <estimated_integrations> dependencies

## Effort Estimation
### Multi-Axis Scoring
| Axis | Score (0-3) | Rationale |
|------|------------|----------|
| Scope / Surface Area | <score> | <reasoning> |
| Coupling / Interfaces | <score> | <reasoning> |
| Novelty / Uncertainty | <score> | <reasoning> |
| Dependencies | <score> | <reasoning> |
| Testing & Verification | <score> | <reasoning> |
| Risk / Blast Radius | <score> | <reasoning> |

### Total Complexity Score: <total>/18
### Size Estimate
- **Shirt Size**: <XS/S/M/L/XL>
- **Time Estimate**: <time_range>
- **Confidence**: <high/medium/low>
```

## Sizing Framework

### Multi-Axis Scoring System

Score each axis 0–3, then sum the points and map to a shirt size:

#### A1. Scope / Surface Area
- **0**: Single file/unit; internal interface only
- **1**: Multiple files in one module
- **2**: Multiple modules or one service plus shared libraries
- **3**: Multiple services/systems or client + server + infra

#### A2. Coupling / Interfaces
- **0**: Uses existing interfaces; no contract change
- **1**: Minor internal contract adjustment
- **2**: New public interface or meaningful contract change
- **3**: Breaking changes across services / versioned public API

#### A3. Novelty / Uncertainty
- **0**: Known pattern, prior art in codebase
- **1**: Variation on a known pattern
- **2**: New pattern or library; learning curve expected
- **3**: New technology/approach; R&D risk

#### A4. Dependencies (People/Systems)
- **0**: No external dependencies
- **1**: Optional/internal dependency with aligned priorities
- **2**: External system or another team on critical path
- **3**: Multiple external dependencies or vendor/release gating

#### A5. Testing & Verification
- **0**: Unit tests suffice; existing harness
- **1**: Integration tests using existing infra
- **2**: New harness, fixtures, or environment work
- **3**: End-to-end + non-functional (load/security) validation

#### A6. Risk / Blast Radius / NFR
- **0**: Low risk, easy rollback
- **1**: Medium risk, affects a secondary path
- **2**: Core path or data-impacting; rollback needs planning
- **3**: High risk, production impact, or compliance requirements

### Size Mapping

| Total Score | Shirt Size | Time Estimate |
|-------------|------------|---------------|
| 0-3         | XS         | 1-2 days      |
| 4-7         | S          | 3-5 days      |
| 8-11        | M          | 1-2 weeks     |
| 12-15       | L          | 2-3 weeks     |
| 16-18       | XL         | 3+ weeks      |

## Integration with Workflows

### Task Creation Workflows
When creating tasks (implementation, analysis, process):
1. **Initial Sizing**: Perform quick sizing during task creation
2. **File Creation**: Generate size.md with initial estimates
3. **Review Opportunity**: Present sizing for human revision
4. **Finalization**: Update size.md with final scores and rationale

### Analysis Workflows
For analysis processes (like workflow-check-consistency):
1. **Pre-Analysis**: Initial sizing based on expected scope
2. **Mid-Analysis**: Update sizing based on actual findings
3. **Post-Analysis**: Final sizing based on complete analysis results

### Planning Workflows
For planning processes:
1. **Scope Definition**: Size based on planned scope
2. **Detailed Planning**: Refine sizing as details emerge
3. **Final Planning**: Confirm sizing before implementation

## Best Practices

### Accuracy Considerations
- **Use Real Data**: Base scores on actual file counts, dependencies, etc.
- **Consider Context**: Account for team experience, tooling, environment
- **Document Rationale**: Explain why each score was chosen
- **Be Conservative**: Better to overestimate than underestimate

### Review Process
- **Present Clearly**: Show scores and reasoning in an easy-to-understand format
- **Invite Revision**: Explicitly ask for human input on sizing (Step 3)
- **Update Promptly**: Revise scores based on human feedback (Step 4)
- **Document Changes**: Keep track of sizing revisions and rationale in final size.md

### File Management
- **Location**: Always create size.md in the task folder
- **Format**: Use the standard size.md template
- **Updates**: Keep size.md current as scope changes
- **Version Control**: Commit size.md with other task files

## Common Sizing Scenarios

### Documentation Analysis Tasks
- **Scope**: Number of folders/files to analyze
- **Coupling**: Cross-references and integration points
- **Novelty**: Familiarity with content and tools
- **Dependencies**: Access to subject matter experts
- **Testing**: Validation of analysis results
- **Risk**: Impact of missed issues or incorrect analysis

### Implementation Tasks
- **Scope**: Number of components to modify
- **Coupling**: Interface changes and dependencies
- **Novelty**: New technologies or patterns
- **Dependencies**: External systems or teams
- **Testing**: Test coverage and environment needs
- **Risk**: Production impact and rollback complexity

### Process Tasks
- **Scope**: Process scope and affected teams
- **Coupling**: Integration with existing processes
- **Novelty**: New process concepts or tools
- **Dependencies**: Stakeholder buy-in and resources
- **Testing**: Process validation and rollout
- **Risk**: Adoption risk and process disruption

If you propose changes, keep them minimal and clearly scoped.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.util.task-sizing:0.1.1:2026-09-01T11:38:03Z -->
