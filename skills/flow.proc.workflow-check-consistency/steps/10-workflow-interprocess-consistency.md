# Step 8: Working Inter-Process Consistency Check

## Objective

Validate consistency and integration across all analyzed folders (docs, specification, working), ensuring cross-folder references are accurate, processes are aligned, and the overall documentation ecosystem provides a cohesive user experience.

## Entry Criteria

- All selected folders have been individually analyzed
- Content quality, format consistency, and cross-references validated for each folder
- Issues identified and categorized within each folder
- Ready to perform cross-folder consistency validation

## Actions

### 8.1 Skip Completed Files

**CRITICAL: Skip files marked as "done" in work/ folder**

Before performing inter-process consistency checks, identify and skip completed work:

```bash
# Identify completed work (skip these files)
find work/05-pending-release/ -name "*.md" -type f | sort
find work/06-released/ -name "*.md" -type f | sort

# Identify active work (analyze these files)
find work/04-implementing/ -name "*.md" -type f | sort

# Get all other working files (excluding completed)
find work/ -name "*.md" -type f | grep -v "work/05-pending-release/" | grep -v "work/06-released/" | sort
```

**File Filtering Requirements:**
- **SKIP all files in `work/05-pending-release/` and `work/06-released/`** - these are considered complete
- **FOCUS on active work in `work/04-implementing/`** and other active folders
- **EXCLUDE completed tasks** from inter-process consistency analysis
- **MAINTAIN inventory** of skipped vs analyzed files for verification

**Rationale:**
- Completed files are considered stable and don't need re-analysis
- Focus inter-process checks on active, evolving work
- Reduce analysis overhead by excluding finished tasks
- Ensure consistency checks are relevant to current work

### 8.2 Cross-Folder Reference Validation

Validate all references that span across folders:

#### 8.2.1 Docs to Specification References

```bash
# Find docs → specification references
find docs/ -name "*.md" -exec grep -H "explore/" {} \;

# Validate specification targets
for spec_ref in $(find docs/ -name "*.md" -exec grep -o "explore/[^)]*\.md" {} \; | sort -u); do
    if [ ! -f "$spec_ref" ]; then
        echo "Broken docs → specification reference: $spec_ref"
    fi
done
```

**Docs → Specification validation:**
- **Reference accuracy**: Documentation references point to existing specifications
- **Content relevance**: Referenced specifications are relevant to documentation context
- **Version alignment**: Documentation references match specification versions
- **Bidirectional links**: Specifications reference relevant documentation

#### 8.1.2 Docs to Workflow References

```bash
# Find docs → workflow references
find docs/ -name "*.md" -exec grep -H "workflow/" {} \;

# Validate workflow targets
for workflow_ref in $(find docs/ -name "*.md" -exec grep -o "workflow/[^)]*\.md" {} \; | sort -u); do
    if [ ! -f "$workflow_ref" ]; then
        echo "Broken docs → workflow reference: $workflow_ref"
    fi
done
```

**Docs → Workflow validation:**
- **Process relevance**: Documentation references relevant processes
- **Process completeness**: Referenced processes have complete definitions
- **Step accuracy**: Documentation references correct process steps
- **Integration clarity**: Documentation explains process integration

#### 8.1.3 Specification to Workflow References

```bash
# Find specification → workflow references
find explore/ -name "*.md" -exec grep -H "workflow/" {} \;

# Validate workflow targets
for workflow_ref in $(find explore/ -name "*.md" -exec grep -o "workflow/[^)]*\.md" {} \; | sort -u); do
    if [ ! -f "$workflow_ref" ]; then
        echo "Broken specification → workflow reference: $workflow_ref"
    fi
done
```

**Specification → Workflow validation:**
- **Implementation alignment**: Specifications reference relevant implementation processes
- **Process compliance**: Referenced processes comply with specification requirements
- **Step consistency**: Process steps align with specification requirements
- **Quality assurance**: Specifications reference quality assurance processes

#### 8.1.4 Workflow to Documentation References

```bash
# Find workflow → docs references
find workflow/ -name "*.md" -exec grep -H "docs/" {} \;

# Validate documentation targets
for doc_ref in $(find workflow/ -name "*.md" -exec grep -o "docs/[^)]*\.md" {} \; | sort -u); do
    if [ ! -f "$doc_ref" ]; then
        echo "Broken workflow → docs reference: $doc_ref"
    fi
done
```

**Workflow → Docs validation:**
- **Guidance availability**: Processes reference available guidance documentation
- **Instruction completeness**: Referenced documentation provides complete instructions
- **Standard compliance**: Referenced documentation reflects current standards
- **Support resources**: Processes reference support and troubleshooting resources

### 8.2 Process and Specification Alignment

Validate alignment between processes and specifications:

#### 8.2.1 Specification Compliance in Processes

```bash
# Find specification compliance references
find workflow/ -name "*.md" -exec grep -H -i "(comply|requirement|standard|spec)" {} \;

# Check for specific specification references
find workflow/ -name "*.md" -exec grep -H "explore/" {} \;
```

**Compliance validation:**
- **Requirement coverage**: Processes cover all specification requirements
- **Standard adherence**: Processes follow documented standards
- **Constraint handling**: Processes handle specification constraints
- **Quality assurance**: Processes include quality assurance steps

#### 8.2.2 Process Implementation in Specifications

```bash
# Find process implementation references
find explore/ -name "*.md" -exec grep -H -i "(process|workflow|procedure|implement)" {} \;

# Check for specific process references
find explore/ -name "*.md" -exec grep -H "workflow/" {} \;
```

**Implementation validation:**
- **Process feasibility**: Specifications reference feasible processes
- **Resource availability**: Specifications account for process resource requirements
- **Timing alignment**: Specification timelines align with process capabilities
- **Integration points**: Specifications define process integration points

### 8.3 Terminology and Concept Consistency

Validate consistent terminology across all folders:

#### 8.3.1 Cross-Folder Terminology Analysis

```bash
# Extract key terms from all folders
find docs/ explore/ workflow/ -name "*.md" -exec grep -o -E "(component|service|process|workflow|specification)" {} \; | sort -u

# Check for term variations
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -E "(micro-service|microservice)" {} \;
```

**Terminology consistency validation:**
- **Standard terms**: Use consistent terminology across all folders
- **Definition alignment**: Term definitions are consistent across folders
- **Context usage**: Terms used consistently with their definitions
- **Acronym consistency**: Acronyms defined and used consistently

#### 8.3.2 Concept Definition Consistency

```bash
# Find concept definitions in each folder
find docs/ -name "*.md" -exec grep -l -i "definition\|means\|refers to" {} \;
find explore/ -name "*.md" -exec grep -l -i "definition\|means\|refers to" {} \;
find workflow/ -name "*.md" -exec grep -l -i "definition\|means\|refers to" {} \;
```

**Concept consistency validation:**
- **Unified definitions**: Core concepts have unified definitions
- **Contextual consistency**: Concepts used consistently with definitions
- **Cross-reference accuracy**: Concept cross-references are accurate
- **Evolution tracking**: Concept evolution is tracked consistently

### 8.4 Process Flow and Dependency Validation

Validate process flows and dependencies across folders:

#### 8.4.1 Cross-Folder Process Dependencies

```bash
# Find cross-folder process dependencies
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(depend|require|prerequisite|before|after)" {} \;

# Map process dependency chains
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(step|phase|stage)" {} \;
```

**Dependency validation:**
- **Dependency clarity**: Cross-folder dependencies are clearly documented
- **Circular dependencies**: No circular dependencies between folders
- **Sequence logic**: Process sequences are logical across folders
- **Parallel processing**: Parallel processes don't create conflicts

#### 8.4.2 Integration Point Validation

```bash
# Find integration points
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(integrate|interface|connect|link)" {} \;

# Validate integration completeness
find docs/ explore/ workflow/ -name "*.md" -exec grep -l -i "(handoff|transition|boundary)" {} \;
```

**Integration validation:**
- **Interface definition**: Integration interfaces are clearly defined
- **Data flow**: Data flow across folders is documented
- **Error handling**: Error handling across integration points is defined
- **Recovery procedures**: Recovery procedures span integration boundaries

### 8.5 Quality and Standard Consistency

Validate quality standards and consistency across folders:

#### 8.5.1 Quality Metric Alignment

```bash
# Find quality metric references
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(quality|metric|measure|kpi)" {} \;

# Check for standard quality criteria
find docs/ explore/ workflow/ -name "*.md" -exec grep -l -i "(standard|criteria|guideline)" {} \;
```

**Quality consistency validation:**
- **Metric consistency**: Quality metrics are consistent across folders
- **Standard alignment**: Quality standards are aligned across folders
- **Measurement approach**: Quality measurement approaches are consistent
- **Improvement processes**: Quality improvement processes are coordinated

#### 8.5.2 Documentation Standard Compliance

```bash
# Find standard compliance references
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(standard|template|format|style)" {} \;

# Check for template usage
find docs/ explore/ workflow/ -name "*.md" -exec grep -l -i "(template|pattern|example)" {} \;
```

**Standard compliance validation:**
- **Format standards**: Documentation formats follow consistent standards
- **Template usage**: Templates are used consistently across folders
- **Style guidelines**: Style guidelines are applied consistently
- **Version control**: Version control approaches are consistent

### 8.6 User Experience and Navigation Consistency

Validate user experience and navigation across the documentation ecosystem:

#### 8.6.1 Navigation Path Validation

```bash
# Find navigation references
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(navigate|previous|next|up|down)" {} \;

# Check for breadcrumb patterns
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(path|trail|breadcrumb)" {} \;
```

**Navigation consistency validation:**
- **Path clarity**: Navigation paths are clear and logical
- **Breadcrumb consistency**: Breadcrumb patterns are consistent
- **Back navigation**: Back navigation works consistently
- **Cross-folder navigation**: Cross-folder navigation is intuitive

#### 8.6.2 Search and Discovery Consistency

```bash
# Find search-related content
find docs/ explore/ workflow/ -name "*.md" -exec grep -H -i "(search|find|locate|discover)" {} \;

# Check for indexing consistency
find docs/ explore/ workflow/ -name "README.md" -exec grep -l -i "(index|contents|toc)" {} \;
```

**Discovery consistency validation:**
- **Index completeness**: Index files provide complete content overviews
- **Searchability**: Content is searchable across folders
- **Tag consistency**: Tagging approaches are consistent
- **Categorization**: Content categorization is logical and consistent

### 8.7 Cross-Folder Quality Metrics

Calculate overall consistency quality metrics:

#### 8.7.1 Consistency Score Calculation

**Scoring categories (0-10 scale):**
- **Reference accuracy**: Accuracy of cross-folder references
- **Terminology consistency**: Consistency of terminology and concepts
- **Process alignment**: Alignment between processes and specifications
- **Quality standards**: Consistency of quality standards
- **User experience**: Consistency of user experience and navigation

#### 8.7.2 Integration Health Score

**Integration health indicators:**
- **Reference validity**: Percentage of valid cross-folder references
- **Bidirectional coverage**: Percentage of bidirectional references
- **Process completeness**: Percentage of processes with complete integration
- **Standard compliance**: Percentage of content complying with standards

### 8.8 Cross-Folder Issues Classification

Classify cross-folder consistency issues:

#### 8.8.1 Critical Cross-Folder Issues

**Critical (Blockers):**
- Broken cross-folder references preventing navigation
- Contradictory information between folders
- Missing integration points between processes and specifications
- Inconsistent quality standards affecting user experience

#### 8.8.2 High Priority Cross-Folder Issues

**High (Significant):**
- Inconsistent terminology causing confusion
- Missing bidirectional references for key relationships
- Process and specification misalignment
- Navigation inconsistencies affecting usability

#### 8.8.3 Medium Priority Cross-Folder Issues

**Medium (Moderate):**
- Some missing cross-references
- Minor terminology inconsistencies
- Incomplete integration documentation
- Navigation improvements needed

#### 8.8.4 Low Priority Cross-Folder Issues

**Low (Minor):**
- Optional bidirectional references missing
- Minor style inconsistencies
- Could-be-better navigation paths
- Minor user experience improvements

### 8.9 Cross-Folder Consistency Report

Compile comprehensive cross-folder consistency report:

#### 8.9.1 Consistency Summary Statistics

```
🔗 Cross-Folder Consistency Summary

Cross-folder references: <total-refs>
Valid references: <valid-count> (<valid-percentage>%)
Broken references: <broken-count> (<broken-percentage>%)

Consistency scores:
- Overall: <overall-score>/10
- Reference accuracy: <accuracy-score>/10
- Terminology consistency: <terminology-score>/10
- Process alignment: <alignment-score>/10
- User experience: <ux-score>/10
```

#### 8.9.2 Cross-Folder Issues Breakdown

```
🔍 Cross-Folder Issues by Category

Critical: <count> issues
High: <count> issues
Medium: <count> issues
Low: <count> issues

By type:
- Broken cross-references: <count>
- Terminology inconsistencies: <count>
- Process misalignments: <count>
- Navigation problems: <count>
- Standard conflicts: <count>
```

#### 8.9.3 Recommended Cross-Folder Improvements

Top cross-folder improvements to prioritize:
1. **[Critical]** <improvement description> - <affected-folders>
2. **[High]** <improvement description> - <affected-folders>
3. **[Medium]** <improvement description> - <affected-folders>

### 8.10 Integration Improvement Recommendations

Provide recommendations for improving cross-folder integration:

#### 8.10.1 Automated Validation

Recommend automated approaches:
- **Cross-reference checking**: Regular automated cross-reference validation
- **Consistency monitoring**: Monitor terminology and concept consistency
- **Integration testing**: Test process integration across folders
- **Quality dashboards**: Track cross-folder quality metrics

#### 8.10.2 Governance Processes

Recommend governance improvements:
- **Cross-folder review**: Include cross-folder review in update processes
- **Change impact analysis**: Analyze cross-folder impact of changes
- **Standard coordination**: Coordinate standards across folders
- **Integration ownership**: Assign ownership for integration points

## Discussion Point (Governed Mode)

**STOP** for critical cross-folder issues:
- "Found <count> critical cross-folder issues affecting ecosystem usability"
- "Major inconsistency between <folder1> and <folder2> regarding <topic>"
- "Broken integration between <process> and <specification>"

**STOP** for overall consistency assessment:
- "Cross-folder consistency score: <score>/10"
- "Major integration gaps: <areas>"
- "Recommended cross-folder improvements: <priorities>"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-validate all cross-folder references and consistency
- Calculate consistency scores automatically
- Generate improvement recommendations based on impact
- Proceed to Step 9 with validation results
- Flag only critical cross-folder issues for user attention

## Exit Criteria

- [ ] All cross-folder references validated
- [ ] Process and specification alignment checked
- [ ] Terminology and concept consistency validated
- [ ] Process flows and dependencies assessed
- [ ] Quality and standard consistency verified
- [ ] User experience and navigation consistency checked
- [ ] Quality scores calculated
- [ ] Issues classified by impact
- [ ] Cross-folder consistency report compiled
- [ ] Ready to proceed to work plan generation

## Next Step

→ [11-work-plan-generation.md](./11-work-plan-generation.md)

## Troubleshooting

### Common Issues

**Complex cross-reference validation:**
- Handle multi-level reference chains
- Account for conditional references
- Validate complex integration patterns

**Terminology consistency challenges:**
- Handle context-dependent term usage
- Account for evolving terminology
- Validate concept relationships

**Process integration complexity:**
- Handle complex process dependencies
- Account for parallel and conditional processes
- Validate integration point completeness

### Recovery Actions

**Partial cross-folder validation:**
- Document which cross-folder relationships were validated
- Note areas requiring expert review
- Continue with available validation results

**Quality assessment limitations:**
- Use simplified scoring for complex integration patterns
- Document assessment methodology and limitations
- Proceed with available quality metrics

## Integration Notes

This step integrates with:
- **docs/**: For documentation cross-reference validation
- **explore/**: For specification alignment validation
- **workflow/**: For process integration validation
- **AGENTS.md**: For understanding project-wide standards and conventions

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
