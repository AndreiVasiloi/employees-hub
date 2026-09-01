# Step 2: Sizing

## Objective

Perform initial complexity sizing for the consistency check session task using the sizing skill to establish baseline estimates and provide human review opportunity before analysis begins.

## Entry Criteria

- Session task created in Step 1 with task.md, plan.md, and size.md template files
- Target folders identified (either specified or to be selected)
- Initial scope understood from task creation
- Ready to perform sizing before analysis work begins

## Actions

### 2.1 Estimate Analysis Scope

Gather initial scope information for sizing:

```bash
# Determine target folders
if [ "${target_folders}" = "interactive" ]; then
    folders_count=3  # docs/, explore/, work/
else
    folders_count=$(echo "${target_folders}" | tr ',' '\n' | wc -l)
fi

# Estimate file counts (quick scan)
estimated_files=0
for folder in $(echo "${target_folders}" | tr ',' ' '); do
    if [ -d "$folder" ]; then
        file_count=$(find "$folder" -name "*.md" -type f | wc -l)
        estimated_files=$((estimated_files + file_count))
    fi
done

# Estimate complexity factors
if [ ${estimated_files} -lt 20 ]; then
    complexity="Small"
elif [ ${estimated_files} -lt 50 ]; then
    complexity="Medium"
elif [ ${estimated_files} -lt 100 ]; then
    complexity="Large"
else
    complexity="Extra Large"
fi
```

### 2.2 Apply Sizing Framework

Use the sizing skill to calculate initial complexity estimates:

```bash
# Apply multi-axis scoring framework
scores = {
    "scope": calculate_scope_score(),
    "coupling": calculate_coupling_score(), 
    "novelty": calculate_novelty_score(),
    "dependencies": calculate_dependencies_score(),
    "testing": calculate_testing_score(),
    "risk": calculate_risk_score()
}

total_score = sum(scores.values())
size = map_score_to_size(total_score)
```

#### Scope Score Calculation
```bash
# A1. Scope / Surface Area
if [ ${folders_count} -eq 1 ] && [ ${files_processed} -lt 10 ]; then
    scope_score=0  # Single folder, few files
elif [ ${folders_count} -eq 1 ] && [ ${files_processed} -lt 50 ]; then
    scope_score=1  # Single folder, moderate files
elif [ ${folders_count} -le 2 ] && [ ${files_processed} -lt 100 ]; then
    scope_score=2  # Multiple folders, many files
else
    scope_score=3  # Multiple folders, many files with high complexity
fi
```

#### Coupling Score Calculation
```bash
# A2. Coupling / Interfaces
cross_refs=$(grep -c "Cross-reference:" "${task_dir}/working_defects.md" || echo "0")
if [ ${cross_refs} -lt 5 ]; then
    coupling_score=0  # Few cross-references
elif [ ${cross_refs} -lt 20 ]; then
    coupling_score=1  # Moderate cross-references
elif [ ${cross_refs} -lt 50 ]; then
    coupling_score=2  # Many cross-references
else
    coupling_score=3  # Extensive cross-references requiring coordination
fi
```

#### Novelty Score Calculation
```bash
# A3. Novelty / Uncertainty
novel_issues=$(grep -c "Novel pattern:" "${task_dir}/working_defects.md" || echo "0")
if [ ${novel_issues} -eq 0 ]; then
    novelty_score=0  # Known patterns only
elif [ ${novel_issues} -lt 5 ]; then
    novelty_score=1  # Some new patterns
elif [ ${novel_issues} -lt 15 ]; then
    novelty_score=2  # Significant new patterns
else
    novelty_score=3  # Extensive new patterns requiring research
fi
```

#### Dependencies Score Calculation
```bash
# A4. Dependencies (People/Systems)
if [ ${impl_tasks} -eq 0 ]; then
    dependencies_score=0  # No implementation dependencies
elif [ ${impl_tasks} -eq 1 ]; then
    dependencies_score=1  # Single implementation task
elif [ ${impl_tasks} -le 3 ]; then
    dependencies_score=2  # Multiple implementation tasks
else
    dependencies_score=3  # Complex implementation dependencies
fi
```

#### Testing Score Calculation
```bash
# A5. Testing & Verification
if [ ${defects_count} -lt 10 ]; then
    testing_score=0  # Simple validation
elif [ ${defects_count} -lt 50 ]; then
    testing_score=1  # Moderate validation
elif [ ${defects_count} -lt 100 ]; then
    testing_score=2  # Complex validation
else
    testing_score=3  # Extensive validation and verification
fi
```

#### Risk Score Calculation
```bash
# A6. Risk / Blast Radius / NFR
critical_issues=$(grep -c "Critical:" "${task_dir}/working_defects.md" || echo "0")
if [ ${critical_issues} -eq 0 ]; then
    risk_score=0  # Low risk
elif [ ${critical_issues} -lt 5 ]; then
    risk_score=1  # Medium risk
elif [ ${critical_issues} -lt 15 ]; then
    risk_score=2  # High risk
else
    risk_score=3  # Critical risk requiring careful planning
fi
```

### 2.3 Update size.md File

Replace the template placeholders with initial sizing calculations:

```bash
# Update size.md with actual sizing data
cat > "${task_dir}/size.md" << EOF
# Complexity Sizing

## Complexity Dimensions

### Technical Complexity
- **Analysis Scope**: ${folders_count} folders to analyze
- **File Count**: ${files_processed} files to process
- **Cross-References**: ${cross_refs} references to validate
- **Integration Points**: ${impl_tasks} implementation tasks

### Process Complexity
- **File-by-File Processing**: Individual analysis of ${files_processed} files
- **Quality Rubric Application**: Consistent assessment across all files
- **Cross-File Validation**: ${cross_refs} cross-reference validations
- **Work Plan Generation**: Consolidation of ${defects_count} identified issues

### Output Complexity
- **Defect Documentation**: ${defects_count} defects identified and documented
- **Quality Scoring**: Overall quality score ${quality_score}
- **Task Creation**: ${impl_tasks} ad-hoc implementation tasks created
- **Report Generation**: Comprehensive analysis report with prioritized issues

### Communication Complexity
- **Process Documentation**: Detailed step-by-step analysis tracking
- **Stakeholder Updates**: Progress reporting and issue prioritization
- **Task Handoff**: Clear documentation for ${impl_tasks} implementation tasks

## Effort Estimation

### Multi-Axis Scoring

| Axis | Score (0-3) | Rationale |
|------|------------|----------|
| Scope / Surface Area | ${scope_score} | ${folders_count} folders, ${files_processed} files analyzed |
| Coupling / Interfaces | ${coupling_score} | ${cross_refs} cross-references requiring validation |
| Novelty / Uncertainty | ${novelty_score} | ${novel_issues} novel patterns identified |
| Dependencies | ${dependencies_score} | ${impl_tasks} implementation tasks created |
| Testing & Verification | ${testing_score} | ${defects_count} defects require validation |
| Risk / Blast Radius | ${risk_score} | ${critical_issues} critical issues identified |

### Total Complexity Score: ${total_score}/18
- Technical: $((scope_score + coupling_score + novelty_score))/6
- Process: $((dependencies_score + testing_score + risk_score))/6

### Size Estimate
- **Shirt Size**: ${size}
- **Time Estimate**: ${time_estimate}
- **Confidence**: ${confidence_level}

## Dependencies
- **Critical Path**: Implementation of ${impl_tasks} ad-hoc tasks
- **Blocking Items**: Critical issues requiring immediate attention
- **Risk Factors**: ${critical_issues} critical defects may impact production

## Rationale
The sizing is based on actual analysis results:
- ${files_processed} files were individually analyzed using file-by-file approach
- ${defects_count} consistency issues were identified and documented
- ${cross_refs} cross-references required validation
- ${impl_tasks} implementation tasks were created for the most critical issues
- ${critical_issues} issues were classified as critical requiring immediate attention

The ${size} size reflects the comprehensive nature of the consistency analysis across ${folders_count} documentation folders with ${files_processed} total files.

**Sizing Method**: Multi-axis scoring framework from [Task Sizing Skill](../../../skills/task-sizing/)

EOF
```

### 2.4 Present Initial Sizing for Human Review

Present the initial sizing for human validation and revision using the sizing skill approach:

```
I've calculated the final sizing for the consistency check session based on actual analysis results:

**Analysis Results**:
- Folders analyzed: ${folders_count}
- Files processed: ${files_processed}
- Defects found: ${defects_count}
- Cross-references: ${cross_refs}
- Implementation tasks: ${impl_tasks}
- Critical issues: ${critical_issues}

**Size Estimate**: ${size} (${total_score}/18)
**Time Estimate**: ${time_range}

**Scoring Breakdown**:
- Scope: ${scope_score}/3 - ${folders_count} folders, ${files_processed} files
- Coupling: ${coupling_score}/3 - ${cross_refs} cross-references
- Novelty: ${novelty_score}/3 - ${novel_issues} novel patterns
- Dependencies: ${dependencies_score}/3 - ${impl_tasks} implementation tasks
- Testing: ${testing_score}/3 - ${defects_count} defects to validate
- Risk: ${risk_score}/3 - ${critical_issues} critical issues

Would you like to revise any of these scores or the overall size estimate?
```

### 2.5 Finalize Initial Sizing

Update the size.md file with any human revisions:

```bash
# Apply any human revisions to scores
# Update size.md with final scores and rationale
# Commit final size.md to repository
```

## Discussion Point (Governed Mode)

**STOP**: Present sizing for validation:
- "I've calculated the final sizing based on actual analysis results"
- "Size: ${size} (${total_score}/18) - ${time_estimate}"
- "Based on ${files_processed} files, ${defects_count} defects, ${impl_tasks} tasks"
- "Would you like to revise any scores or the size estimate?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Calculate scores based on actual analysis metrics
- Generate size.md with calculated scores and rationale
- Use conservative estimates for uncertainty
- Finalize size.md without human review

## Exit Criteria

- [ ] Actual analysis data collected from working defects file
- [ ] Multi-axis scores calculated based on real metrics using sizing skill
- [ ] size.md updated with actual calculations and rationale
- [ ] Sizing presented for human review (if in governed mode)
- [ ] Final size.md committed with any revisions
- [ ] Complexity estimate reflects actual analysis scope and results

## Next Step

→ [12-complete-process.md](./12-complete-process.md)

## Notes

This sizing step uses the actual analysis results to provide an accurate complexity estimate, replacing the initial template placeholders created in Step 1. The sizing reflects the real scope and complexity discovered during the consistency check process.

The sizing skill ([../../../skills/task-sizing/](../../../skills/task-sizing/)) provides detailed guidance on the scoring framework and best practices for accurate complexity estimation.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
