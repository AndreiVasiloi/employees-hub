# Step 3: Define Cross-Cutting Requirements

## Objective

Document accessibility requirements that apply across all screens and components.

## Entry Criteria

- [ ] Step 2 (Identify Critical Flows) complete with confirmed priorities
- [ ] P0 flows and high-risk screens identified

## Actions

### 3.1 Define Cross-Cutting Requirements

Document requirements that apply to all screens and components:

```
Cross-Cutting Accessibility Requirements

I'll define requirements that apply to all screens and components:

**Structure and semantics**:
- Pages use meaningful headings in order (H1, H2, H3)
- Primary landmarks exist (header, main, nav, footer)
- Interactive controls use native elements where possible
- Link text is descriptive out of context

**Keyboard and focus**:
- All functionality reachable by keyboard
- No keyboard traps
- Focus order follows visual order and task flow
- Focus always visible
- Focus management rules defined for navigation, dialogs, drawers

**Forms and validation**:
- Every input has accessible name
- Required fields indicated in text (not only color)
- Errors specific, actionable, and programmatically associated
- Error summary provided for multi-field forms

**Visual and non-text cues**:
- Information not conveyed by color alone
- Hover-only interactions have keyboard equivalents
- Target sizes meet platform guidelines
- Motion respects reduced motion settings

**Content readability**:
- Instructions avoid shape/position/color-only references
- Plain language for key actions and errors
- Consistent terminology

Are these requirements appropriate for your product?
```

**STOP**: Wait for human to confirm cross-cutting requirements.

## Exit Criteria

- [ ] Structure and semantics requirements defined
- [ ] Keyboard and focus requirements defined
- [ ] Forms and validation requirements defined
- [ ] Visual and non-text cue requirements defined
- [ ] Content readability requirements defined
- [ ] Human confirmed cross-cutting requirements

## Next Step

→ [04-component-requirements.md](./04-component-requirements.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.accessibility-specifications:0.1.2:2026-09-01T07:59:41Z -->
