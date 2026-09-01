# Step 2: Docs Content Quality Analysis (File-by-File)

## Objective

Perform comprehensive content quality analysis of the docs/ folder using a file-by-file approach to avoid context limits, identifying contradictions, redundancy, gaps, and clarity issues across all documentation.

## Entry Criteria

- docs/ folder selected for analysis in Step 1
- Context loaded for docs/ folder structure and key files
- Cross-reference mapping initialized
- Working defects file created in task folder

## Actions

### 2.1 File-by-File Analysis Setup

**CRITICAL: Use file-by-file processing to avoid context limits**
Instead of reading all files at once, process files individually and accumulate findings:

```bash
# Get complete file inventory first (no content reading)
find docs/ -name "*.md" -type f | sort > docs_file_list.txt

# Create working defects file
touch working_defects.md
```

**Working defects file structure:**
```markdown
# Working Defects - Docs Content Quality Analysis

## Processing Status
- Total Files: <count>
- Files Processed: <count>
- Current File: <filename>

## Quality Rubric Applied
- Contradiction Detection (Critical/High/Medium/Low)
- Redundancy Assessment (Critical/High/Medium/Low) 
- Gap Identification (Critical/High/Medium/Low)
- Clarity Assessment (Critical/High/Medium/Low)
- Cross-Reference Validation (Critical/High/Medium/Low)

## Defects Found
<!-- Accumulated defects will be added here -->
```

### 2.2 File-by-File Quality Analysis

Process each file individually using the established rubric:

#### 2.2.1 Individual File Analysis

For each file in the inventory:

1. **Read single file**: `read_file <filepath>`
2. **Apply quality rubric**: 
3. **Document findings**: Add to working defects file
4. **Mark complete**: Update processing status

**Quality Assessment Rubric:**

**Contradiction Detection Criteria:**
- **Critical**: Direct contradictory statements within same document
- **High**: Conflicting process descriptions or technical specifications
- **Medium**: Outdated information conflicting with current practices
- **Low**: Minor inconsistencies in examples or illustrations

**Redundancy Assessment Criteria:**
- **Critical**: Same process documented in multiple places within file
- **High**: Similar technical instructions with differences
- **Medium**: Overlapping conceptual explanations
- **Low**: Repeated examples or illustrations

**Gap Identification Criteria:**
- **Critical**: Missing essential process steps or critical information
- **High**: Referenced but not documented content within file
- **Medium**: Incomplete documentation sections
- **Low**: Missing examples or supplementary information

**Clarity Assessment Criteria:**
- **Critical**: Unclear or ambiguous instructions that could cause errors
- **High**: Poorly structured content that's hard to follow
- **Medium**: Technical jargon without explanation
- **Low**: Minor readability issues

**Cross-Reference Validation Criteria:**
- **Critical**: Broken internal links to non-existent sections
- **High**: Links to outdated or moved content
- **Medium**: Inconsistent reference formatting
- **Low**: Minor link formatting issues

#### 2.2.2 Defect Documentation Format

For each defect found, add to working_defects.md:

```markdown
### <SEVERITY> - <CATEGORY> - <FILENAME>

**Issue**: <Clear description of the problem>
**Location**: <Line numbers or section reference>
**Impact**: <Why this matters>
**Suggested Fix**: <How to resolve the issue>
**Priority**: <Critical/High/Medium/Low>

---
```

#### 2.2.3 Processing Workflow

```bash
# Process files one by one
while read file; do
    echo "Processing: $file"
    
    # Read single file
    read_file "$file"
    
    # Apply rubric and document findings
    # (Analysis happens here)
    
    # Update working defects file
    echo "Processed: $file" >> working_defects.md
    
    # Continue to next file
done < docs_file_list.txt
```

### 2.3 Cross-File Analysis (After Individual Processing)

Once all files are processed individually, perform targeted cross-file analysis:

#### 2.3.1 Cross-File Contradiction Detection

Focus only on potential contradictions identified during individual analysis:

```bash
# Extract statements that might contradict across files
grep -i "critical.*must\|required.*should\|always.*never" docs/**/*.md
```

**Cross-file contradiction criteria:**
- **Critical**: Same process described differently across files
- **High**: Conflicting technical specifications
- **Medium**: Different approaches to same problem
- **Low**: Minor terminology differences

#### 2.3.2 Cross-File Redundancy Analysis

Identify redundancy across files:

```bash
# Look for similar headings across files
grep -r "^#" docs/ | sort | uniq -c | sort -nr | head -20
```

**Cross-file redundancy criteria:**
- **Critical**: Identical process documentation in multiple files
- **High**: Similar technical instructions with conflicting details
- **Medium**: Overlapping conceptual explanations
- **Low**: Repeated examples or illustrations

### 2.4 Quality Score Calculation

Calculate quality scores based on accumulated defects:

#### 2.4.1 File-Level Quality Scores

For each file, calculate:
```bash
# Score calculation (0-10 scale)
score = 10 - (critical_count * 2) - (high_count * 1) - (medium_count * 0.5) - (low_count * 0.25)
```

#### 2.4.2 Overall Docs Quality Score

**Weighted calculation:**
- Content quality: 40% (based on contradictions and gaps)
- Format consistency: 20% (based on structure and formatting)
- Cross-reference validity: 20% (based on link validation)
- Organization structure: 20% (based on redundancy and clarity)

### 2.5 Issue Classification and Prioritization

Classify all accumulated defects:

#### 2.5.1 Severity Classification

**Critical Issues** (Immediate attention required):
- Direct contradictions that could cause confusion
- Broken critical links or missing essential content
- Security or compliance issues

**High Priority Issues** (Address soon):
- Significant redundancy or outdated information
- Poor clarity that impacts usability
- Cross-reference inconsistencies

**Medium Priority Issues** (Address when convenient):
- Minor formatting inconsistencies
- Small gaps in documentation
- Readability improvements

**Low Priority Issues** (Nice to have):
- Minor redundancy
- Cosmetic issues
- Optional improvements

#### 2.5.2 Impact Assessment

Assess impact of each issue category:
- **User Impact**: How this affects documentation users
- **Maintenance Impact**: How this affects documentation maintenance
- **Process Impact**: How this affects documented processes

### 2.6 Defect Accumulation and Summary

After processing all files:

#### 2.6.1 Generate Summary Statistics

```markdown
## Analysis Summary

### Files Processed
- Total Files: <count>
- Files with Defects: <count>
- Files Defect-Free: <count>

### Defects by Category
- Contradictions: <count> (Critical: <count>, High: <count>, Medium: <count>, Low: <count>)
- Redundancy: <count> (Critical: <count>, High: <count>, Medium: <count>, Low: <count>)
- Gaps: <count> (Critical: <count>, High: <count>, Medium: <count>, Low: <count>)
- Clarity: <count> (Critical: <count>, High: <count>, Medium: <count>, Low: <count>)
- Cross-Reference: <count> (Critical: <count>, High: <count>, Medium: <count>, Low: <count>)

### Overall Quality Score
- Docs Folder Score: <score>/10
- Quality Grade: <A/B/C/D/F>
```

#### 2.6.2 Prepare for Next Step

Ensure working defects file is complete and ready for format validation step:
- All defects documented with proper format
- Processing status marked as complete
- Summary statistics calculated
- File ready for cross-reference validation in Step 3

## Discussion Point (Governed Mode)

**STOP** after file-by-file analysis completion:
- "Completed file-by-file analysis of <count> files in docs/ folder"
- "Found <total> defects: <critical> critical, <high> high, <medium> medium, <low> low"
- "Overall quality score: <score>/10 (<grade>)"
- "Working defects file created with detailed findings"
- "Ready to proceed to format and structure validation?"
- "Any specific areas to focus on for the next step?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Process all files individually using the quality rubric
- Document all findings in working defects file
- Calculate quality scores and generate summary
- Proceed to Step 3 when all files processed
- Continue with format validation

## Exit Criteria

- [ ] All files in docs/ folder processed individually
- [ ] Quality rubric applied to each file
- [ ] All defects documented in working defects file
- [ ] Cross-file contradictions and redundancy identified
- [ ] Quality scores calculated for each file and overall
- [ ] Summary statistics generated
- [ ] Working defects file complete and ready for next step
- [ ] Processing status marked as complete

## Next Step

Proceed to Step 5: Format and Structure Validation, using the accumulated defects file as input for format-specific analysis.

→ [05-docs-format-structure-validation.md](./05-docs-format-structure-validation.md)

## Notes

This file-by-file approach prevents context limits while ensuring comprehensive coverage. The working defects file serves as the central repository for all findings, which will be used in subsequent steps for cross-validation and work plan generation.

The quality rubric provides consistent assessment criteria across all files, ensuring standardized evaluation and comparable results.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
