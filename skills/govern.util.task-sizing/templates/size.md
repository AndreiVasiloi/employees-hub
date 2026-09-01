+++
[metadata]
task_id = "<task_id>"
sized_date = "<YYYY-MM-DD>"
sized_by = "<human_or_llm>"
task_stage = "<definition|planning|implementation|completed>"

[sizing]
total_score = <total_score>
tshirt_size = "<XS|S|M|L|XL>"

[axes]
scope = <score_0_3>
coupling = <score_0_3>
novelty = <score_0_3>
dependencies = <score_0_3>
testing = <score_0_3>
risk = <score_0_3>
+++

# Complexity Sizing

## Complexity Dimensions

### Technical Complexity
- **Analysis Scope**: <number> folders to analyze
- **File Count**: <estimated_files> files to process
- **Cross-References**: <estimated_xrefs> references to validate
- **Integration Points**: <estimated_integrations> dependencies

### Process Complexity
- **File-by-File Processing**: Individual analysis of all files
- **Quality Rubric Application**: Consistent assessment across all files
- **Cross-File Validation**: Targeted analysis of potential issues
- **Work Plan Generation**: Consolidation and prioritization of findings

### Output Complexity
- **Defect Documentation**: Accumulated findings in working defects file
- **Quality Scoring**: Calculation of quality metrics for each folder
- **Task Creation**: Up to 3 ad-hoc implementation tasks (if issues found)
- **Report Generation**: Comprehensive analysis report

### Communication Complexity
- **Process Documentation**: Detailed step-by-step analysis tracking
- **Stakeholder Updates**: Progress reporting and issue prioritization
- **Task Handoff**: Clear documentation for implementation tasks

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
- Technical: <tech_score>/6
- Process: <process_score>/6  
- Output: <output_score>/6
- Communication: <comm_score>/6

### Size Estimate
- **Shirt Size**: <XS/S/M/L/XL>
- **Time Estimate**: <time_range>
- **Confidence**: <high/medium/low>

## Dependencies
- **Critical Path**: <critical_dependencies>
- **Blocking Items**: <blocked_items>
- **Risk Factors**: <risk_considerations>

## Rationale
<explanation of sizing decisions and key factors>

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.util.task-sizing:0.1.1:2026-09-01T11:38:03Z -->
