# Step 5: Specification Cross-Reference Validation

## Objective

Validate cross-references within the explore/ folder and between specifications and other project components, ensuring all references are accurate, current, and provide effective navigation.

## Entry Criteria

- explore/ folder content review completed in Step 4
- Content quality issues identified and categorized
- Ready to validate cross-reference consistency

## Actions

### 5.1 Internal Specification Cross-References

Validate all internal links and references within specification documents:

#### 5.1.1 Internal Link Validation

```bash
# Extract all internal specification links
find explore/ -name "*.md" -exec grep -H "\[.*\](explore/.*.md)" {} \;

# Validate link targets
for link in $(find explore/ -name "*.md" -exec grep -o "explore/[^)]*\.md" {} \; | sort -u); do
    if [ ! -f "$link" ]; then
        echo "Broken internal link: $link"
    fi
done
```

**Internal link validation criteria:**
- **Target exists**: Link points to existing specification file
- **Path accuracy**: Relative paths are correct
- **Anchor validity**: Section anchors exist and are accurate
- **Case sensitivity**: Path case matches file system

#### 5.1.2 Concept Reference Validation

Validate references to concepts and definitions:

```bash
# Find concept references
find explore/ -name "*.md" -exec grep -H -i "concept\|entity\|component" {} \;

# Check concept definitions
find explore/concepts/ -name "*.md" -exec basename {} .md \; | sort
```

**Concept reference validation:**
- **Definition exists**: Referenced concepts have definitions
- **Consistent naming**: Concept names are consistent
- **Context clarity**: Reference context is clear
- **Bidirectional links**: Definitions link back to usage

#### 5.1.3 Architecture Component References

Validate references to architectural components:

```bash
# Find architecture component references
find explore/ -name "*.md" -exec grep -H -i "component\|service\|module" {} \;

# Check architecture documentation
find explore/designs/ -name "*.md" -exec basename {} .md \; | sort
```

**Architecture reference validation:**
- **Component documentation**: Referenced components have documentation
- **Interface specifications**: Component interfaces are specified
- **Relationship clarity**: Component relationships are clear
- **Consistent terminology**: Component names are consistent

### 5.2 Specification to Documentation Cross-References

Validate references between specifications and general documentation:

#### 5.2.1 Process Reference Validation

```bash
# Find process references in specifications
find explore/ -name "*.md" -exec grep -H "docs/process/" {} \;

# Validate process existence
for process in $(find explore/ -name "*.md" -exec grep -o "docs/process/[^)]*" {} \; | sort -u); do
    if [ ! -d "$process" ]; then
        echo "Missing process reference: $process"
    fi
done
```

**Process reference validation:**
- **Process exists**: Referenced processes exist in docs/process/
- **Process relevance**: Process references are relevant to specification
- **Version consistency**: Process versions match specification needs
- **Bidirectional links**: Processes reference relevant specifications

#### 5.2.2 Repository Reference Validation

```bash
# Find repository references in specifications
find explore/ -name "*.md" -exec grep -H -i "repository\|repo\|github\|gitlab" {} \;

# Validate repository names
find explore/ -name "*.md" -exec grep -o "dava\.flow-[^)]*" {} \; | sort -u
```

**Repository reference validation:**
- **Repository exists**: Referenced repositories exist
- **Repository accuracy**: Repository descriptions are accurate
- **Access consistency**: Repository access patterns are consistent
- **Integration clarity**: Repository integration points are clear

#### 5.2.3 Tool and Dependency References

Validate references to external tools and dependencies:

```bash
# Find tool references
find explore/ -name "*.md" -exec grep -H -E "(tool|library|dependency|package)" {} \;

# Check version consistency
find explore/ -name "*.md" -exec grep -H -E "v[0-9]+\.[0-9]+" {} \;
```

**Tool reference validation:**
- **Tool relevance**: Tool references are relevant to specifications
- **Version consistency**: Tool versions are consistent across specifications
- **Integration clarity**: Tool integration is clearly specified
- **Alternative options**: Alternative tools are documented where relevant

### 5.3 Specification to Implementation Cross-References

Validate references between specifications and implementation:

#### 5.3.1 Task Reference Validation

```bash
# Find task references in specifications
find explore/ -name "*.md" -exec grep -H "work/" {} \;

# Validate task existence
for task in $(find explore/ -name "*.md" -exec grep -o "work/[^)]*" {} \; | sort -u); do
    if [ ! -d "$task" ]; then
        echo "Missing task reference: $task"
    fi
done
```

**Task reference validation:**
- **Task exists**: Referenced tasks exist in work/
- **Task relevance**: Task references are relevant to specification
- **Status accuracy**: Task status information is accurate
- **Completion tracking**: Specification reflects implementation status

#### 5.3.2 Code Reference Validation

```bash
# Find code file references
find explore/ -name "*.md" -exec grep -H -E "\.go|\.py|\.js|\.ts|\.java" {} \;

# Check for implementation patterns
find explore/ -name "*.md" -exec grep -H -i "implement\|code\|function\|class" {} \;
```

**Code reference validation:**
- **File existence**: Referenced code files exist
- **Function accuracy**: Function signatures match specifications
- **Class accuracy**: Class definitions match specifications
- **Interface accuracy**: Interface definitions match specifications

### 5.4 Decision Record Cross-References

Validate cross-references involving decision records:

#### 5.4.1 Decision Reference Validation

```bash
# Find decision references
find explore/ -name "*.md" -exec grep -H -i "decision\|adr\|choice" {} \;

# Check decision record format
find explore/ -name "*.md" -exec grep -l "status\|consequences\|decision" {} \;
```

**Decision reference validation:**
- **Decision exists**: Referenced decisions exist
- **Decision status**: Decision status is current
- **Impact clarity**: Decision impact is clearly documented
- **Implementation alignment**: Implementation aligns with decisions

#### 5.4.2 Decision to Specification Links

Validate links from decisions back to specifications:

```bash
# Find specification references in decisions
find explore/ -name "*decision*" -exec grep -H "explore/" {} \;

# Check for bidirectional references
find explore/ -name "*.md" -exec grep -l -i "decision" {} \;
```

**Bidirectional validation:**
- **Back references**: Decisions reference affected specifications
- **Impact tracking**: Decision impact on specifications is tracked
- **Consistency**: Decision and specification content are consistent
- **Update propagation**: Specification updates reflect decision changes

### 5.5 Cross-Reference Quality Assessment

Assess the quality and effectiveness of cross-references:

#### 5.5.1 Reference Accuracy Metrics

Calculate reference accuracy scores:

**Accuracy metrics:**
- **Valid links**: Percentage of links that resolve correctly
- **Current content**: Percentage of references to current content
- **Relevant context**: Percentage of references with relevant context
- **Bidirectional coverage**: Percentage of bidirectional references

#### 5.5.2 Navigation Effectiveness

Assess navigation effectiveness:

**Navigation criteria:**
- **Logical flow**: References follow logical navigation paths
- **Context preservation**: Reference context is maintained
- **Granularity**: References provide appropriate level of detail
- **Completeness**: Important relationships are referenced

#### 5.5.3 Maintenance Impact

Assess maintenance impact of cross-references:

**Maintenance criteria:**
- **Update propagation**: Changes propagate through references correctly
- **Broken link detection**: Broken references are easily identifiable
- **Reference redundancy**: Minimal redundant references
- **Reference clarity**: Reference purpose is clear

### 5.6 Cross-Reference Issues Classification

Classify cross-reference issues by severity and impact:

#### 5.6.1 Critical Cross-Reference Issues

**Critical (Blockers):**
- Broken links to essential specifications
- Missing references to critical components
- Incorrect references that lead to wrong implementations
- Circular references causing infinite loops

#### 5.6.2 High Priority Cross-Reference Issues

**High (Significant):**
- Multiple broken links in important specifications
- Missing bidirectional references for key relationships
- Outdated references to superseded content
- Inconsistent reference patterns

#### 5.6.3 Medium Priority Cross-Reference Issues

**Medium (Moderate):**
- Some broken links in less critical specifications
- Missing contextual information for references
- Inconsistent reference formatting
- Minor navigation inefficiencies

#### 5.6.4 Low Priority Cross-Reference Issues

**Low (Minor):**
- Minor formatting inconsistencies in references
- Could-be-better reference context
- Optional bidirectional references missing
- Minor navigation improvements

### 5.7 Cross-Reference Validation Report

Compile comprehensive cross-reference validation report:

#### 5.7.1 Reference Summary Statistics

```
🔗 Cross-Reference Validation Summary

Total references analyzed: <total-refs>
Valid references: <valid-count> (<valid-percentage>%)
Broken references: <broken-count> (<broken-percentage>%)

Reference types:
- Internal specs: <count>
- Process docs: <count>
- Repository refs: <count>
- Task refs: <count>
- External links: <count>
```

#### 5.7.2 Reference Issues Breakdown

```
🔍 Reference Issues by Category

Critical: <count> issues
High: <count> issues
Medium: <count> issues
Low: <count> issues

By type:
- Broken internal links: <count>
- Missing bidirectional refs: <count>
- Outdated references: <count>
- Context issues: <count>
- Format inconsistencies: <count>
```

#### 5.7.3 Recommended Reference Improvements

Top reference improvements to prioritize:
1. **[Critical]** <improvement description> - <affected-files>
2. **[High]** <improvement description> - <affected-files>
3. **[Medium]** <improvement description> - <affected-files>

### 5.8 Reference Maintenance Recommendations

Provide recommendations for maintaining reference quality:

#### 5.8.1 Automated Validation

Recommend automated validation approaches:
- **Link checking**: Regular automated link validation
- **Reference monitoring**: Monitor reference validity over time
- **Change detection**: Detect when referenced content changes
- **Alert systems**: Alert for broken references

#### 5.8.2 Documentation Standards

Recommend documentation standards:
- **Reference templates**: Standard templates for common references
- **Naming conventions**: Consistent naming for reference targets
- **Version handling**: Standard approach to versioned references
- **Context guidelines**: Guidelines for reference context

## Discussion Point (Governed Mode)

**STOP** for critical reference issues:
- "Found <count> broken references affecting specification usability"
- "Key specification <spec> has missing references to critical components"
- "Circular reference detected between <spec1> and <spec2>"

**STOP** for reference quality assessment:
- "Cross-reference quality score: <score>/10"
- "Major reference gaps: <areas>"
- "Recommended reference improvements: <priorities>"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-validate all internal and external references
- Calculate reference quality scores automatically
- Generate improvement recommendations based on impact
- Proceed to Step 6 with validation results
- Flag only critical reference issues for user attention

## Exit Criteria

- [ ] All internal specification links validated
- [ ] Cross-references to documentation validated
- [ ] References to implementation validated
- [ ] Decision record cross-references checked
- [ ] Reference quality assessed
- [ ] Issues classified by impact
- [ ] Validation report compiled
- [ ] Maintenance recommendations provided
- [ ] Ready to proceed to format consistency validation

## Next Step

→ [08-specification-format-consistency.md](./08-specification-format-consistency.md)

## Troubleshooting

### Common Issues

**Complex reference patterns:**
- Handle relative vs absolute path resolution
- Account for symbolic links and file system quirks
- Validate complex reference chains

**External reference validation:**
- Handle network access limitations
- Account for authentication requirements
- Validate external content availability

**Bidirectional reference validation:**
- Detect missing reverse references
- Validate reference consistency in both directions
- Handle asymmetric reference patterns

### Recovery Actions

**Partial reference validation:**
- Document which references were validated
- Note areas requiring manual validation
- Continue with available validation results

**Quality assessment limitations:**
- Use simplified scoring for complex reference patterns
- Document assessment methodology
- Proceed with available quality metrics

## Integration Notes

This step integrates with:
- **docs/process/**: For process reference validation
- **work/**: For task and implementation reference validation
- **decision-create**: For decision record reference validation
- **docs/repositories.md**: For repository reference validation

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
