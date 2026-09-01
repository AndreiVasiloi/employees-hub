# Step 7: Working Process Validation

## Objective

Perform comprehensive validation of working processes, ensuring process definitions are complete, consistent, executable, and properly integrated with the overall project workflow.

## Entry Criteria

- work/ folder selected for analysis in Step 1
- Context loaded for work/ folder structure and key files
- Previous folder analysis (docs/ and/or explore/) completed if selected

## Actions

### 7.1 Working Structure Inventory

**CRITICAL: Read ALL files in work/ folder**
Create complete inventory of work/ folder content and read ALL files:

```bash
# Get all working files
find work/ -name "*.md" -type f | sort

# Analyze working organization
find work/ -type d | sort

# File complexity analysis
find work/ -name "*.md" -exec wc -l {} \; | sort -n
```

**File Reading Requirements:**
- **ALL markdown files must be read** using parallel file reading
- Use `read_file` tool for each file to ensure complete content analysis
- Maintain file inventory with read status for verification
- Do not proceed to analysis until ALL files are read

**Working categorization:**
- **Process definitions**: Core working processes and procedures
- **Integration workflows**: Cross-system integration processes
- **Operational workflows**: Day-to-day operational procedures
- **Development workflows**: Development and deployment processes
- **Support workflows**: Support and maintenance processes

### 7.2 Process Completeness Validation

#### 7.2.1 Process Definition Completeness

Validate that each process has complete definition:

```bash
# Check for essential process components
find work/ -name "*.md" -exec grep -l -E "(purpose|scope|steps|entry.*criteria|exit.*criteria)" {} \;

# Look for incomplete processes
find work/ -name "*.md" -exec grep -l -i "(tbd|todo|placeholder|forthcoming)" {} \;
```

**Essential process components:**
- **Purpose statement**: Clear process purpose and objectives
- **Scope definition**: Process boundaries and applicability
- **Entry criteria**: Conditions for process initiation
- **Exit criteria**: Conditions for process completion
- **Step definitions**: Detailed process steps
- **Roles and responsibilities**: Who does what
- **Inputs and outputs**: Process inputs and expected outputs

#### 7.2.2 Step Sequence Validation

Validate process step sequences and dependencies:

```bash
# Extract step sequences
find work/ -name "*.md" -exec grep -H -E "(step|phase|stage)" {} \;

# Check for step numbering consistency
find work/ -name "*.md" -exec grep -H -E "^[0-9]+\." {} \;
```

**Step sequence validation:**
- **Logical flow**: Steps follow logical sequence
- **Dependency clarity**: Step dependencies are clear
- **Sequential numbering**: Steps are numbered sequentially
- **No gaps**: No missing steps in sequences
- **Parallel processing**: Parallel steps are clearly identified

#### 7.2.3 Process Integration Validation

Validate process integration points:

```bash
# Find process references
find work/ -name "*.md" -exec grep -H -i "(process|workflow|procedure)" {} \;

# Check for cross-process dependencies
find work/ -name "*.md" -exec grep -H "docs/process/" {} \;
```

**Integration validation:**
- **Process links**: Processes reference related processes
- **Handoff points**: Clear handoff points between processes
- **Data flow**: Data flow between processes is defined
- **Trigger conditions**: Process triggers are clearly defined
- **Error handling**: Error handling across process boundaries

### 7.3 Process Execution Validation

#### 7.3.1 Actionability Assessment

Assess if processes are actionable and executable:

```bash
# Look for action-oriented language
find work/ -name "*.md" -exec grep -l -i "(do|execute|perform|run|start)" {} \;

# Check for clear instructions
find work/ -name "*.md" -exec grep -c -E "(you|shall|must|should)" {} \;
```

**Actionability criteria:**
- **Clear instructions**: Steps provide clear, actionable instructions
- **Specific actions**: Actions are specific and well-defined
- **Tool references**: Required tools and resources are specified
- **Time estimates**: Time estimates are provided where relevant
- **Success criteria**: Success criteria for each step are defined

#### 7.3.2 Resource Requirement Validation

Validate resource requirements for processes:

```bash
# Find resource references
find work/ -name "*.md" -exec grep -H -i "(resource|tool|access|permission)" {} \;

# Check for dependency requirements
find work/ -name "*.md" -exec grep -H -i "(require|need|depend|prerequisite)" {} \;
```

**Resource validation:**
- **Tool requirements**: Required tools are specified
- **Access requirements**: Access permissions are documented
- **Skill requirements**: Required skills are identified
- **Time requirements**: Time requirements are realistic
- **Cost requirements**: Cost implications are documented

#### 7.3.3 Error Handling and Recovery

Validate error handling and recovery procedures:

```bash
# Look for error handling
find work/ -name "*.md" -exec grep -l -i "(error|fail|problem|issue|troubleshoot)" {} \;

# Check for recovery procedures
find work/ -name "*.md" -exec grep -l -i "(recover|rollback|backout|undo)" {} \;
```

**Error handling validation:**
- **Error scenarios**: Common error scenarios are identified
- **Recovery procedures**: Recovery procedures are documented
- **Escalation paths**: Escalation paths are defined
- **Fallback options**: Fallback options are available
- **Support contacts**: Support contacts are provided

### 7.4 Process Consistency Analysis

#### 7.4.1 Terminology Consistency

Validate consistent terminology across processes:

```bash
# Extract key process terms
find work/ -name "*.md" -exec grep -o -E "(process|workflow|step|phase|stage)" {} \; | sort -u

# Check for term variations
find work/ -name "*.md" -exec grep -H -E "(workflow|work-flow|work flow)" {} \;
```

**Terminology consistency:**
- **Standard terms**: Use consistent process terminology
- **Definition clarity**: Key terms are clearly defined
- **Acronym consistency**: Acronyms are used consistently
- **Naming conventions**: Process and step naming follows conventions

#### 7.4.2 Format Consistency

Validate consistent formatting across process documents:

```bash
# Check heading consistency
find work/ -name "*.md" -exec grep -H "^#" {} \; | sort

# Check for consistent structure
find work/ -name "*.md" -exec grep -l -E "(purpose|scope|steps)" {} \;
```

**Format consistency:**
- **Document structure**: Similar processes use similar structure
- **Heading hierarchy**: Consistent heading usage
- **Section ordering**: Consistent section ordering
- **Formatting standards**: Consistent markdown formatting

#### 7.4.3 Process Standard Compliance

Validate compliance with process standards:

```bash
# Check for standard compliance elements
find work/ -name "*.md" -exec grep -l -E "(version|status|review|approval)" {} \;

# Look for quality indicators
find work/ -name "*.md" -exec grep -l -i "(quality|metric|measure|kpi)" {} \;
```

**Compliance validation:**
- **Version tracking**: Process versions are tracked
- **Status management**: Process status is documented
- **Review requirements**: Review requirements are met
- **Quality metrics**: Quality metrics are defined
- **Approval processes**: Approval processes are documented

### 7.5 Process Integration with Documentation

#### 7.5.1 Documentation Link Validation

Validate links between processes and documentation:

```bash
# Find documentation references
find work/ -name "*.md" -exec grep -H "docs/" {} \;

# Validate documentation links
for link in $(find work/ -name "*.md" -exec grep -o "docs/[^)]*" {} \; | sort -u); do
    if [ ! -f "$link" ] && [ ! -d "$link" ]; then
        echo "Broken documentation link: $link"
    fi
done
```

**Documentation link validation:**
- **Reference accuracy**: Documentation references are accurate
- **Link validity**: Documentation links are valid
- **Version consistency**: Documentation versions match process needs
- **Bidirectional links**: Documentation references relevant processes

#### 7.5.2 Specification Alignment

Validate alignment with specifications:

```bash
# Find specification references
find work/ -name "*.md" -exec grep -H "explore/" {} \;

# Check for specification compliance
find work/ -name "*.md" -exec grep -l -i "(requirement|spec|standard)" {} \;
```

**Specification alignment:**
- **Requirement compliance**: Processes comply with specifications
- **Standard adherence**: Processes follow established standards
- **Constraint awareness**: Process constraints are documented
- **Implementation guidance**: Processes provide implementation guidance

### 7.6 Process Quality Metrics

#### 7.6.1 Quality Score Calculation

Calculate quality scores for workflow processes:

**Scoring categories (0-10 scale):**
- **Completeness**: Process definition completeness
- **Actionability**: Ease of process execution
- **Integration**: Integration with other processes
- **Consistency**: Format and terminology consistency
- **Maintainability**: Ease of process maintenance

#### 7.6.2 Process Maturity Assessment

Assess process maturity levels:

**Maturity indicators:**
- **Version control**: Process version control
- **Change management**: Process change management
- **Training materials**: Training material availability
- **Usage tracking**: Process usage tracking
- **Improvement feedback**: Feedback mechanisms for improvement

### 7.7 Process Issues Classification

Classify identified process issues:

#### 7.7.1 Critical Process Issues

**Critical (Blockers):**
- Incomplete process definitions preventing execution
- Missing essential steps or criteria
- Broken integration points
- No error handling for critical steps

#### 7.7.2 High Priority Process Issues

**High (Significant):**
- Unclear or ambiguous process steps
- Missing resource requirements
- Inconsistent terminology causing confusion
- Incomplete integration documentation

#### 7.7.3 Medium Priority Process Issues

**Medium (Moderate):**
- Minor formatting inconsistencies
- Some missing contextual information
- Could-be-better error handling
- Minor terminology inconsistencies

#### 7.7.4 Low Priority Process Issues

**Low (Minor):**
- Minor formatting improvements
- Optional enhancements to process descriptions
- Could-be-better examples
- Minor documentation improvements

### 7.8 Process Validation Report

Compile comprehensive process validation report:

#### 7.8.1 Process Summary Statistics

```
🔄 Working Process Validation Summary

Processes analyzed: <total-processes>
Total steps: <total-steps>
Average process length: <avg-length>

Quality scores:
- Overall: <overall-score>/10
- Completeness: <completeness-score>/10
- Actionability: <actionability-score>/10
- Integration: <integration-score>/10
- Consistency: <consistency-score>/10
```

#### 7.8.2 Process Issues Breakdown

```
🔍 Process Issues by Category

Critical: <count> issues
High: <count> issues
Medium: <count> issues
Low: <count> issues

By type:
- Incomplete definitions: <count>
- Integration problems: <count>
- Consistency issues: <count>
- Resource gaps: <count>
- Error handling gaps: <count>
```

#### 7.8.3 Recommended Process Improvements

Top process improvements to prioritize:
1. **[Critical]** <improvement description> - <affected-processes>
2. **[High]** <improvement description> - <affected-processes>
3. **[Medium]** <improvement description> - <affected-processes>

## Discussion Point (Governed Mode)

**STOP** for critical process issues:
- "Found <count> critical process issues affecting workflow execution"
- "Process <process-name> has incomplete definition preventing execution"
- "Missing integration points between <process1> and <process2>"

**STOP** for overall process quality:
- "Working/ folder quality score: <score>/10"
- "Key process gaps: <areas>"
- "Recommended process improvements: <priorities>"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-classify process issues based on execution impact
- Calculate process quality scores automatically
- Generate improvement recommendations based on best practices
- Proceed to Step 8 with validation results
- Flag only critical process issues for user attention

## Exit Criteria

- [ ] All working processes analyzed for completeness
- [ ] Process execution validation completed
- [ ] Process consistency assessed
- [ ] Integration points validated
- [ ] Quality scores calculated
- [ ] Issues classified by impact
- [ ] Process validation report compiled
- [ ] Ready to proceed to inter-process consistency check

## Next Step

→ [10-workflow-interprocess-consistency.md](./10-workflow-interprocess-consistency.md)

## Troubleshooting

### Common Issues

**Complex process validation:**
- Handle processes with conditional logic
- Account for parallel and sequential step variations
- Validate complex integration patterns

**Resource requirement assessment:**
- Handle implicit resource requirements
- Account for skill and tool dependencies
- Validate resource availability assumptions

**Integration point validation:**
- Handle complex cross-process dependencies
- Account for circular dependencies
- Validate data flow accuracy

### Recovery Actions

**Partial process validation:**
- Document which processes were validated
- Note areas requiring expert review
- Continue with available validation results

**Quality assessment limitations:**
- Use simplified scoring for complex processes
- Document assessment methodology
- Proceed with available quality metrics

## Integration Notes

This step integrates with:
- **docs/process/**: For process definition standards and validation
- **explore/**: For specification compliance validation
- **work/**: For process implementation validation
- **AGENTS.md**: For understanding process standards and conventions

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
