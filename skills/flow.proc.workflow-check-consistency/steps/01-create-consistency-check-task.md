# Step 1: Create Consistency Check Task

## Objective

Create a session task for the workflow-check-consistency process to provide proper task context and workspace for the analysis work.

## Entry Criteria

- User initiated workflow-check-consistency process
- Target folders identified (either specified or to be selected)
- Working directory is tooling context warehouse
- LLM has write access to work/ directory

## Actions

### 1.1 Determine Task Scope

Identify the scope of the consistency check:

```bash
# Check if folders specified as arguments
if [ $# -gt 0 ]; then
    target_folders="$1"
else
    target_folders="interactive"
fi

# Determine task scope based on folders
case "$target_folders" in
    "docs")
        scope="Documentation Folder Consistency Check"
        slug="docs-consistency-check"
        ;;
    "specification")
        scope="Specification Folder Consistency Check"
        slug="specification-consistency-check"
        ;;
    "working")
        scope="Working Folder Consistency Check"
        slug="working-consistency-check"
        ;;
    "docs,specification")
        scope="Docs & Specification Consistency Check"
        slug="docs-spec-consistency-check"
        ;;
    "docs,working")
        scope="Docs & Working Consistency Check"
        slug="docs-working-consistency-check"
        ;;
    "specification,working")
        scope="Specification & Working Consistency Check"
        slug="spec-working-consistency-check"
        ;;
    "docs,specification,working"|"all")
        scope="Complete Repository Consistency Check"
        slug="complete-consistency-check"
        ;;
    *)
        scope="Interactive Consistency Check"
        slug="interactive-consistency-check"
        ;;
esac
```

### 1.2 Create Session Task

Create a session task in `work/04-implementing/`:

```bash
# Find next available task number
last_task=$(find work/04-implementing/ -name "*-task.md" | sort | tail -1 | grep -o "[0-9]\+" | sort -n | tail -1)
next_task=$((last_task + 1))

# Create task directory
task_dir="work/04-implementing/${next_task}-${slug}"
mkdir -p "$task_dir"
```

### 1.3 Generate Task Definition

Create comprehensive task.md file:

```bash
# Generate task.md using the task template
cat > "${task_dir}/task.md" << 'EOF'
# Task: ${next_task} - ${scope}

**Status:** In Progress  
**Priority:** Medium  
**Blocked By:** None  
**Blocks:** None  
**Tags:** process:consistency-check, lifecycle:active, type:analysis

## Problem Statement

### Current State (What's broken or missing)
Consistency issues may exist across the target documentation folders, potentially affecting:
- Content quality and accuracy
- Formatting consistency
- Cross-reference validity
- Structural integrity
- Documentation maintainability

### Desired State (What success looks like)
All consistency issues in target folders identified, documented, and prioritized with actionable work plan for resolution.

### Business Driver (Why this matters now)
Maintaining high-quality documentation is essential for:
- Team productivity and clarity
- Process consistency and reliability
- Knowledge transfer and onboarding
- Project governance and compliance

## Affected Components

- **Primary**: Target folders (${target_folders})
- **Secondary**: Related documentation and process dependencies
- **Tertiary**: Cross-references and integration points

## Analysis Scope

### Target Folders
${target_folders}

### Analysis Types
- Content quality assessment
- Format and structure validation
- Cross-reference verification
- Inter-process consistency checks

### Quality Rubric Applied
- Contradiction Detection (Critical/High/Medium/Low)
- Redundancy Assessment (Critical/High/Medium/Low)
- Gap Identification (Critical/High/Medium/Low)
- Clarity Assessment (Critical/High/Medium/Low)
- Cross-Reference Validation (Critical/High/Medium/Low)

## Acceptance Criteria
- [ ] All target folders analyzed using file-by-file approach
- [ ] Working defects file created and populated with findings
- [ ] Quality scores calculated for each folder
- [ ] Cross-file contradictions and redundancies identified
- [ ] Work plan generated with prioritized issues
- [ ] Ad-hoc implementation tasks created (up to 3) if issues found
- [ ] Consistency check session task moved to completed

## Related Work
- Previous consistency checks (if any)
- Related documentation improvement tasks
- Process documentation updates

## Working Files

### Analysis Artifacts
- `working_defects.md` - Accumulated defects from file-by-file analysis
- File-by-file analysis results
- Quality scoring calculations

### Deliverables
- Comprehensive consistency analysis report
- Prioritized work plan for identified issues
- Ad-hoc implementation tasks (if applicable)

## Process Steps

This task will follow the workflow-check-consistency process:

1. **Step 2**: Folder Selection and Context Loading
2. **Step 3**: Content Quality Analysis (File-by-File)
3. **Step 4**: Format and Structure Validation
4. **Step 5**: Specification Content Review (if applicable)
5. **Step 6**: Cross-Reference Validation (if applicable)
6. **Step 7**: Specification Format Consistency (if applicable)
7. **Step 8**: Working Process Validation (if applicable)
8. **Step 9**: Inter-Process Consistency Check (if applicable)
9. **Step 10**: Work Plan Generation and Task Creation
10. **Step 11**: Complete Process

## Notes

This is a session task for the workflow-check-consistency process. The actual consistency analysis work will happen within this task context, and any implementation tasks created will be separate ad-hoc tasks.

The session task itself will be moved to `05-pending-release/{release-slug}/` upon completion of the consistency check process.

The working defects file created here will be used throughout the analysis process to accumulate findings from individual file analysis.
EOF
```

### 1.4 Generate Technical Plan

Create plan.md file using the technical plan template:

```bash
# Generate plan.md using the technical plan template
cat > "${task_dir}/plan.md" << 'EOF'
# Technical Implementation Plan

## Technical Approach
<STRATEGY FOR EXECUTING THE WORKFLOW-CHECK-CONSISTENCY PROCESS>

## Implementation Details

### Phase 1: Task Setup and Context Loading
- <APPROACH FOR SETTING UP THE CONSISTENCY CHECK SESSION>
- <SPECIFIC ACTIONS AND CONSIDERATIONS>

### Phase 2: File-by-File Analysis
- <STRATEGY FOR PROCESSING FILES INDIVIDUALLY TO AVOID CONTEXT LIMITS>
- <WORKING DEFECTS FILE MANAGEMENT APPROACH>

### Phase 3: Quality Assessment
- <APPROACH FOR APPLYING CONSISTENCY RUBRIC TO EACH FILE>
- <QUALITY SCORING AND PRIORITIZATION METHOD>

### Phase 4: Cross-File Validation
- <STRATEGY FOR TARGETED CROSS-FILE ANALYSIS>
- <IDENTIFICATION AND DOCUMENTATION OF CROSS-FOLDER ISSUES>

### Phase 5: Work Plan Generation
- <APPROACH FOR CONSOLIDATING FINDINGS INTO ACTIONABLE WORK PLAN>
- <TASK CREATION STRATEGY FOR IDENTIFIED ISSUES>

## Test Strategy
- <VALIDATION APPROACH FOR CONSISTENCY ANALYSIS>
- <QUALITY ASSURANCE FOR GENERATED WORK PLAN>
- <VERIFICATION OF TASK CREATION AND DOCUMENTATION>

## Risk Assessment
- <RISKS OF MISSING ISSUES DUE TO CONTEXT LIMITS>
- <DEPENDENCY MANAGEMENT BETWEEN ANALYSIS PHASES>
- <QUALITY ASSURANCE FOR GENERATED TASKS>

## Development Workflow
<STEP-BY-STEP APPROACH FOR EXECUTING THE CONSISTENCY CHECK PROCESS>
EOF
```

### 1.5 Generate Complexity Sizing

Create size.md file using the sizing template:

```bash
# Generate size.md using the sizing template
cat > "${task_dir}/size.md" << 'EOF'
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

### Total Complexity Score: <score>/50
- Technical: <tech_score>/20
- Process: <process_score>/15
- Output: <output_score>/10
- Communication: <comm_score>/5

### Time Estimate
- **Small (3-5 days)**: < 15 points
- **Medium (1-2 weeks)**: 15-25 points
- **Large (2-3 weeks)**: 25-35 points
- **XLarge (3+ weeks)**: > 35 points

**Estimated Duration**: <time_estimate>

## Dependencies
- **Critical Path**: <critical_dependencies>
- **Blocking Items**: <blocked_items>
- **Risk Factors**: <risk_considerations>
EOF
```

### 1.6 Initialize Working Files

Create initial working files in the task directory:

```bash
# Create working defects file
touch "${task_dir}/working_defects.md"

# Initialize working defects file structure
cat > "${task_dir}/working_defects.md" << 'EOF'
# Working Defects - Consistency Check Analysis

## Processing Status
- Total Files: 0
- Files Processed: 0
- Current File: None

## Quality Rubric Applied
- Contradiction Detection (Critical/High/Medium/Low)
- Redundancy Assessment (Critical/High/Medium/Low) 
- Gap Identification (Critical/High/Medium/Low)
- Clarity Assessment (Critical/High/Medium/Low)
- Cross-Reference Validation (Critical/High/Medium/Low)

## Defects Found
<!-- Accumulated defects will be added here -->

---
EOF

# Create session-history directory
mkdir -p "${task_dir}/session-history"
```

### 0.5 Verify Task Creation

Confirm task is properly created:

```bash
# Verify task structure
ls -la "${task_dir}/"

# Verify task file exists
if [ -f "${task_dir}/task.md" ]; then
    echo "✅ Consistency check task created: ${task_dir}"
else
    echo "❌ Failed to create task file"
    exit 1
fi

# Verify working files exist
if [ -f "${task_dir}/working_defects.md" ]; then
    echo "✅ Working defects file initialized"
else
    echo "❌ Failed to initialize working defects file"
    exit 1
fi
```

## Discussion Point (Governed Mode)

**STOP**: Present task creation for validation:
- "Created consistency check session task: ${task_dir}"
- "Task scope: ${scope}"
- "Target folders: ${target_folders}"
- "Working defects file initialized"
- "Ready to begin consistency analysis?"
- "Proceed to Step 1: Folder Selection and Context Loading?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-determine scope from folder arguments or use "all"
- Create session task with appropriate scope and slug
- Initialize working defects file
- Verify task creation success
- Proceed to Step 1 automatically

## Exit Criteria

- [ ] Session task created in work/04-implementing/
- [ ] Task.md file with comprehensive scope and acceptance criteria
- [ ] Plan.md file with technical implementation approach
- [ ] Size.md file with complexity estimation
- [ ] Working defects file initialized with proper structure
- [ ] Session-history directory created
- [ ] Task structure verified and accessible
- [ ] Ready to proceed with folder selection and context loading

## Next Step

→ [02-sizing.md](./02-sizing.md)

## Notes

This step creates the session task that provides context and workspace for the consistency check process. The task itself is not the implementation work - it's the container for the analysis work.

Any implementation tasks created in Step 9 will be separate ad-hoc tasks, while this session task will be moved to completed in Step 10.

The working defects file created here will be used throughout the analysis process to accumulate findings from individual file analysis.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
