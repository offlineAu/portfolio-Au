# Design System — Portfolio AU

## Philosophy
One design system, two personalities.
The interface shifts perspective — not just color.

---

## Mode Tokens

### UI Layer (Frontend Mode)
```css--bg:        #F8FAFC   /* page background /
--bg2:       #FFFFFF   / card surface /
--bg3:       #F1F5F9   / subtle fill /
--txt:       #0F172A   / primary text /
--txt2:      #475569   / secondary text /
--txt3:      #94A3B8   / muted / labels /
--accent:    #10B981   / primary green /
--accent2:   #059669   / accent hover /
--border:    #E2E8F0   / card borders /
--radius:    16px      / card corners */
--shadow:    0 2px 12px rgba(0,0,0,0.07)

### System Layer (Backend Mode)
```css--bg:        #0B0F19   /* deep dark /
--bg2:       #111827   / card surface /
--bg3:       #1A2035   / subtle fill /
--txt:       #E2E8F0   / primary text /
--txt2:      #94A3B8   / secondary text /
--txt3:      #475569   / muted / labels /
--accent:    #38BDF8   / cyan /
--accent2:   #A78BFA   / purple accent /
--border:    #1E293B   / sharp borders /
--radius:    8px       / tighter corners /
--shadow:    none      / borders, not shadows */

---

## Typography

Font: Inter (primary) — import via Google Fonts or Bunny Fonts
Fallback: system-ui, sans-serif
Mono: 'JetBrains Mono', monospace — for backend code blocks

| Role       | Size  | Weight | Usage                        |
|------------|-------|--------|------------------------------|
| hero       | 56px  | 700    | Name / main headline         |
| h1         | 36px  | 700    | Section headings             |
| h2         | 24px  | 600    | Card titles, subsections     |
| h3         | 18px  | 600    | Labels, panel headers        |
| body       | 15px  | 400    | General content              |
| small      | 13px  | 400    | Captions, metadata           |
| mono       | 13px  | 400    | Code, API endpoints          |

UI Layer: line-height 1.7, generous letter-spacing
System Layer: line-height 1.5, tighter, denser

---

## Spacing System (8px base)

4px   — tight gaps (icon + label)
8px   — component internal padding
16px  — between elements
24px  — section padding
32px  — between sections
48px  — major section breaks
64px  — hero breathing room

---

## Mode Transition

Duration: 350ms
Easing:   cubic-bezier(0.4, 0, 0.2, 1)
Properties that animate: background, color, border-color, border-radius, box-shadow

Implementation: CSS custom properties on :root
Toggle: adds/removes class `.mode-backend` on <html> or layout wrapper
React: mode stored in Inertia shared props + localStorage for persistence

---

## Component Behavior by Mode

### Cards
UI Layer:    rounded-2xl · soft shadow · hover lift (-2px translateY)
System Layer: rounded-lg · border only · no lift · border brightens on hover

### Buttons
UI Layer:    filled · rounded-lg · green primary
System Layer: outlined · sharp · cyan primary · purple secondary

### Code blocks (System Layer only)
Background: #0d1b2a
Border:     1px solid #1e3a5f
Text:       #38BDF8 (cyan syntax)
Cursor:     blinking · 1s ease-in-out

### Status indicators (System Layer only)
Success: #10B981  ● 200 OK
Warning: #F59E0B  ● 429 Rate limited
Error:   #EF4444  ● 422 Validation error

---

## Mode Switcher
Label:     "UI Layer"  ↔  "System Layer"
Position:  Top navigation — always visible
Style:     Pill toggle · accent color shifts with mode
Behavior:  Persists in localStorage · passed to Inertia shared props

---

## Role-Based UI Layers

Guest:      Public sections only — hero, projects, contact
Recruiter:  + experience timeline, availability badge, resume download
Developer:  + system design, API docs, security layer toggle, tech depth

Role is set server-side via session.
Frontend reads from Inertia shared props: `auth.role`

---

## File Reference
design-system.md     ← this file (source of truth)
resources/css/       ← tokens as CSS custom properties
resources/js/        ← mode context (React)