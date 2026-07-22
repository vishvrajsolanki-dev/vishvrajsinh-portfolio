# Hero Review Decisions — Implementation Spec

Critical evaluation of the Hero / Landing creative review. Decisions drive Phase 1 code.

## Executive Summary

The review is strong on diagnosis: the hero has precision but not pulse, and the **right viewport is wasted** (compounded by a broken/invisible 3D stage when `Environment` HDR / transmission materials fail). Recommendations skew toward a coherent “control room / systems” identity, which fits Navy Trust and the ML + hardware story.

**High-impact opportunities:** reliable right-panel visual metaphor, load choreography (name + CTAs), scroll-aware nav, metric count-up, CTA hierarchy.

**Low-value / reject:** custom cursors, tab-title tricks, particle fields (redundant once the panel exists), literal mascots, dual competing 3D + particle spectacles.

**Batch merge:** Ideas 1+2+3 become one **System Panel** (SVG schematic always on) + optional lightweight wireframe 3D (no CDN env maps). Ideas 11+12+13 merge into CTA hierarchy (magnetic already shipped). Ideas 16 + tiny VS hover merge.

---

## Suggestion Matrix

| # | Suggestion | Decision | Reason | ROI | Complexity |
|---|---|---|---|---|---|
| 1 | Live System Dashboard | ✅ Implement (primary) | Fills dead space with TrackBot+ARC metaphor; works without WebGL | High | Med |
| 2 | Blueprint grid reveal | ✅ Merge into #1 | Low-cost precision cue | High | Low |
| 3 | Rotating 3D wireframe | 🟡 Modify | Keep mouse-tilt wireframe; drop transmission + remote Environment (root cause of empty/broken right panel) | High | Med |
| 4 | Particle field | ❌ Reject | Duplicates “alive” signal; noise risk; perf | Low | Med |
| 5 | Role cycler | 🟡 Modify | Cycle secondary framings; primary role dwells longer | Med | Low |
| 6 | Status dot tooltip | ✅ Implement | Available signal, on-brand | Med | Low |
| 7 | Kinetic name reveal | ✅ Implement | Highest-viewed moment needs pulse | High | Low |
| 8 | Name hover underline | ✅ Implement | Cheap exploration reward | Med | Low |
| 9 | Split-icon duality | ⚪ Defer | Panel already encodes duality; icon pack risk | Low | Med |
| 10 | Connecting flowchart line | ⚪ Defer | Redundant with kinetic stagger | Low | Low |
| 11 | Weighted CTA hierarchy | ✅ Implement | Skip intro must not compete | High | Low |
| 12 | Magnetic buttons | ✅ Already done | Keep; tighten hierarchy around it | High | — |
| 13 | Skip intro delayed ghost | ✅ Implement | Escape hatch, not destination | Med | Low |
| 14 | Scroll-aware nav | ✅ Implement | Functional + premium | High | Med |
| 15 | Dark toggle morph | 🟡 Modify | Icon + soft theme crossfade; skip heavy path morph | Med | Low |
| 16 | VS logo micro-anim | ✅ Implement | Signature without spectacle | Med | Low |
| 17 | Counting stats | ✅ Implement | Credibility strip comes alive | High | Low |
| 18 | Scroll cue | 🟡 Enhance | Exists; make more visible + pulse | Med | Low |
| 19 | Film grain | ✅ Implement | Anti-template tactility | Med | Low |
| 20 | Ambient gradient drift | 🟡 Enhance | Atmosphere already present; slow shift only | Med | Low |
| T1 | Custom cursor | ❌ Reject | A11y, gimmick for recruiter flow | Low | Med |
| T2 | Tab title rotate | ❌ Reject | Annoying; unprofessional | Low | Low |
| T3 | Corner brackets HUD | ✅ Merge into #1 | Consistent schematic language | Med | Low |
| T4 | VS first-hover bounce | ✅ Merge into #16 | One signature moment | Low | Low |
| T5 | Blueprint loading screen | ⚪ Defer | App is already fast; avoid fake load | Low | Med |
| T6 | Devtools console egg | ✅ Implement | Zero visual cost | Low | Low |
| T7 | Schematic metrics rule | ✅ Implement | Ties strip to system language | Low | Low |

---

## Priority Roadmap

### Phase 1 — Highest Impact (implementing now)
1. Fix / replace right panel → System Panel + safe wireframe 3D
2. Kinetic name + staggered content load
3. CTA hierarchy + Skip intro demotion
4. Metric count-up + schematic divider
5. Scroll-aware nav active state
6. Grain + scroll-cue + status available + role cycler (light)
7. Theme soft transition + icon toggle
8. VS logo signature + console egg

### Phase 2 — Experience Enhancements
- Dark mode polish across sections
- Recurring schematic motif near Work/Skills
- Name hover underline refinement

### Phase 3 — Premium Details
- Duality glyph (#9), connecting line (#10) only if panel still feels thin

### Phase 4 — Experimental
- Particle field, custom cursor, loading theatre — only if brand asks for spectacle

---

## Final Recommendation

Worth doing now: **1+2+3 merged**, **7**, **11–14**, **17**, **19**, light **5/6/15/16/18/20**.

Reject: particles, custom cursor, tab tricks.

Strongest combo: **alive schematic right panel + choreographed load + clear CTA hierarchy + scroll-linked nav** — precision with a pulse, still recruiter-safe.
