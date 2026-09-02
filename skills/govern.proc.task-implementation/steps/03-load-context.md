# Step 3: Load Context

## Objective

Load and understand all context needed for implementation: dependencies, architectural boundaries, existing code, and integration points.

## Entry Criteria

- Task mobilized and assignment claimed (Step 2 complete)
- Task folder is in `work/04-implementing/`
- Ready to begin detailed analysis

## Actions

### 3.1 Review Task Tags and Dependencies

- Check task tags (see [task-tagging skill](../../../skills/task-tagging/)); align tags to actual scope, commit updates if needed
- Review dependencies ("Depends On"); read their summary.md files
- Stop if blockers or design changes emerge from dependency analysis

### 3.2 Load Task Definition and Technical Plan

**Read requirements from `task.md`:**
- Load problem statement and goals
- Review acceptance criteria and success metrics
- Note constraints, dependencies, and stakeholders
- Identify business risks and non-goals

**Read technical approach from `plan.md`:**
- Study the technical architecture decisions
- Review implementation strategy and development phases
- Load test inventory and pipeline requirements
- Note technical risks and security considerations
- Review data model changes and component modifications

**Why this separation matters:** 
- `task.md` provides the "what" and "why" (requirements)
- `plan.md` provides the "how" (technical implementation approach)
- Both are needed for successful implementation

### 3.3 Review Architectural Context

**Read the architectural context from `plan.md`:**
- Study the Mermaid diagram showing upstream/downstream dependencies
- Note the "Key Relationships" — these are integration points your code MUST connect to
- Identify: What events does this consume? What events does it publish? What APIs does it call/expose?

**Why this matters:** Tests can pass with stub/mock implementations that don't actually integrate. The diagram shows the REAL connections your code must make.

### 3.4 Consult Codemap

You MUST consult codemap:
- Locate relevant packages/types/endpoints/listeners quickly using any available project codemap or code index
- Understand boundaries/dependencies before coding
- Target tests to actual entry points and flows

### 3.5 Identify Language and Framework

Analyze the task to determine the primary technology stack:
- **Language**: Java, Python, TypeScript, Go, etc.
- **Framework**: Spring Boot, Django, React, FastAPI, etc.
- **Principal Libraries**: Kafka clients, database ORMs, web frameworks, etc.

**Identification Methods:**
- Examine existing code in target components
- Check task.md for technology specifications
- Review dependency files (pom.xml, requirements.txt, package.json)
- Look at file extensions and import patterns

### 3.6 Load Language and Framework Guidelines

Load relevant guidelines from `govern/guidelines/` based on identified technology stack and workflow needs:

**Guideline Loading Process:**
1. Scan `govern/guidelines/` for files matching the language/framework or workflow
2. Read and fully load any applicable guidelines
3. Document key patterns and conventions to follow
4. Note any specific requirements or constraints

**Example Guidelines to Load:**
- **Java/Spring Boot**: Look for Spring-specific patterns, dependency injection, testing approaches
- **Python/Django**: Look for Django patterns, ORM usage, testing frameworks
- **TypeScript/React**: Look for component patterns, state management, testing approaches
- **Go**: Look for Go idioms, package structure, testing patterns

**Guideline Integration:**
- Apply naming conventions from guidelines
- Follow architectural patterns specified
- Use recommended testing approaches
- Adhere to security and performance guidelines

### 3.7 Examine Existing Code

For each component mentioned in the task:
- Read existing implementation files
- Understand current patterns and conventions
- Identify extension points or modification areas
- Note existing test patterns and structure

### 3.8 Check Pipeline Test Requirements

Check task planning artifacts, repository docs, and CI configuration for pipeline test requirements:
- Ensure required repos are present and accessible
- Note CATS/Karate test requirements for this task
- Plan for local validation of pipeline tests

### 3.9 Document Context Summary

Create a mental or brief written summary:
- Key integration points (from architectural diagram)
- Existing patterns to follow
- Dependencies and their status
- Pipeline test requirements
- Language and framework guidelines to apply
- Potential risks or blockers

### 3.10 Decision Tracking During Implementation

**When implementation reveals new decisions or plan changes:**

1. **Update plan.md** with new technical approach:
   - Document the technical decision made
   - Update implementation strategy if needed
   - Revise test inventory or pipeline requirements
   - Note any new risks or dependencies discovered

2. **Update task.md** if requirements change:
   - Add to "Decision Changes During Implementation" section
   - Document the requirement change and rationale
   - Note impact on acceptance criteria or scope
   - Record approval if applicable

3. **Track in summary.md** (created during wrap-up):
   - Document all decisions made during implementation
   - Note deviations from original plan
   - Record rationale and impact assessment
   - Include lessons learned for future work

**Decision Tracking Process:**
- When implementation deviates from plan: Update plan.md + document in summary.md
- When requirements need adjustment: Update task.md + document in summary.md  
- When scope changes: Update both + document impact in summary.md
- All changes should include date, rationale, and approval status

## Discussion Point (Governed Mode)

**STOP**: Present context findings to user:
- "I've loaded the context for {TASK_ID}:"
- "Requirements from task.md: [key requirements]"
- "Technical approach from plan.md: [key technical decisions]"
- "Technology stack: [Language/Framework identified]"
- "Key integration points: [list from architectural diagram]"
- "Dependencies: [status of each]"
- "Guidelines loaded: [list relevant guidelines from govern/guidelines/]"
- "Pipeline tests required: [CATS/Karate/none]"
- "Any blockers or risks identified: [list]"
- "Ready to proceed with implementation?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-align task tags based on content analysis
- Auto-fetch dependency task summaries and flag blockers
- Auto-analyze architectural diagram and extract integration points
- Auto-consult codemap for relevant packages/types
- Auto-identify language and framework from existing code
- Auto-load relevant guidelines from `govern/guidelines/` based on technology stack
- Auto-check pipeline test requirements
- Proceed to Step 4 if no blockers found

## Exit Criteria

- [ ] Task definition (task.md) loaded and understood
- [ ] Technical plan (plan.md) loaded and understood
- [ ] Task tags reviewed and updated if needed
- [ ] Dependencies analyzed and confirmed unblocked
- [ ] Architectural context diagram understood
- [ ] Integration points identified
- [ ] Codemap consulted for relevant components
- [ ] Language and framework identified
- [ ] Relevant guidelines loaded from `govern/guidelines/`
- [ ] Existing code patterns reviewed
- [ ] Pipeline test requirements noted
- [ ] Context summary documented
- [ ] Decision tracking process understood

## Next Step

→ [04-plan-inventory.md](./04-plan-inventory.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
