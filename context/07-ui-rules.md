# 07 — UI Rules
> Akro Ventures Website V2 · Layout, Interaction & Visual Consistency

---

## Layout Rules

### Page Structure

Every page follows this shell:
```
<Layout>                    ← Navbar + Footer + WhatsApp
  <main>
    <HeroSection />         ← Unique per page; always has eyebrow + headline + CSS texture
    <Section bg="cream">    ← First content section; alternates from hero
    <Section bg="white">
    <Section bg="charcoal"> ← Used sparingly; max 1–2 per page
    <Section bg="teal">     ← CTA sections only
  </main>
</Layout>
```

### Section Alternation

Backgrounds alternate to create breathing room. Default sequence:
```
white → cream → white → charcoal/teal → white
```
Never two charcoal/teal sections back-to-back. Dark sections are intentional punctuation marks, not decoration.

### Container Width

All content inside `<Container>` — max 1280px, 1.5rem horizontal padding. Nothing breaks out of this except full-bleed image panels in hero.

### Two-Column Layouts

Desktop: 50/50 or 60/40 split using CSS Grid. Never `float`.
Mobile: Single column, text above image.

```tsx
// Standard two-column
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div>text content</div>
  <div>image or visual</div>
</div>

// Asymmetric (60/40)
<div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
  <div className="lg:col-span-3">main content</div>
  <div className="lg:col-span-2">sidebar</div>
</div>
```

---

## Responsive Behaviour

### Mobile-First

All styles default to mobile. Use `sm:`, `md:`, `lg:` to enhance upward.

### Breakpoint Decisions

| Element | Mobile | Tablet (768px) | Desktop (1024px) |
|---|---|---|---|
| Navbar | Hamburger + drawer | Hamburger + drawer | Full horizontal nav |
| Hero | Single column | Single column | Two columns |
| Service cards | 1 column | 2 columns | 3 columns |
| Stats grid | 2×2 | 2×2 | 4 columns |
| Outcome cards | Stacked | Stacked | Asymmetric 3fr/2fr |
| Founder photos | Below button, centered | Below button | Side-by-side right column |
| Footer | Stacked | Stacked | 3 columns |

### Mobile Specifics

- WhatsApp float: always visible, `bottom-4 right-4`, `z-50`
- Parallax: disabled on mobile (Lenis passive; no parallax transforms on mobile)
- Hero image panel: hidden on mobile (`hidden lg:block`)
- Font sizes scale down via `clamp()` — no media query breakpoints for typography

---

## Component Hierarchy

### Button Variants

| Variant | Background | Text | Border | Hover | Surface |
|---|---|---|---|---|---|
| `primary` | Mustard | Charcoal | None | Charcoal bg, White text | Main CTA |
| `ghost` | Transparent | Mustard | Mustard 1px | Mustard bg, Charcoal text | Secondary on light |
| `ghost-light` | Transparent | White | White 1px | White bg, Charcoal text | Secondary on dark |
| `dark` | Charcoal | White | None | Teal bg | Tertiary, footer |
| `link` | None | Foreground | None | Underline animation | In-text |

All buttons: `border-radius: 2px`, Inter 600, `letter-spacing: 0.06em`, uppercase, `font-size: 0.75rem`.  
Sizes: `sm` (h-8), `md` (h-10, default), `lg` (h-12).

### Card Variants

| Variant | Background | Border | Special | Use |
|---|---|---|---|---|
| `content` | White | 1px border + 2px mustard left | — | Articles, insights |
| `deal` | Transparent | `white/10` border | Hover lift | Deal cards on dark bg |
| `service` | Cream | None | Teal top accent 2px | Service descriptions |
| `team` | None | None | Full-bleed image, no radius | Founder / team |

---

## Accessibility Rules

### Focus

Every interactive element must have visible focus ring:
```css
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 3px;
}
```
Never `outline: none` without a replacement focus indicator.

### Keyboard Navigation

- Tab order follows DOM order — do not use `tabindex > 0`
- All buttons and links keyboard-accessible
- Mobile drawer: traps focus while open; `Escape` closes it
- Modal (if added): focus trap + close on `Escape`

### ARIA

- Navigation: `<nav aria-label="Main navigation">`
- Page content: `<main>`
- Footer: `<footer>`
- Accordion: use Radix `Accordion` (handles ARIA automatically)
- Icons: `aria-hidden="true"` on all decorative icons
- Form fields: `<label>` always explicit, `htmlFor` matching `id`
- Form errors: `aria-describedby="field-error-id"` on input

### Contrast

- All text meets WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- Mustard on white: verify manually — mustard at `#F2B705` on white may be borderline; use bold weight or larger size when needed
- White text on teal: acceptable
- White text on charcoal: acceptable

---

## Interaction States

### Buttons

| State | Style |
|---|---|
| Default | As defined per variant |
| Hover | Background swap (100–200ms, `--ease-out`) |
| Focus | Mustard ring, 2px, offset 3px |
| Active | Slight scale down: `scale(0.98)` |
| Disabled | `opacity-50`, `cursor-not-allowed`, no hover effect |
| Loading | Spinner icon replaces label; button disabled |

### Links (Nav)

| State | Style |
|---|---|
| Default | No underline |
| Hover | Mustard underline, `scaleX(0→1)` from left, 200ms |
| Active (current page) | Mustard underline, `scaleX(1)` always visible |

### Form Inputs

| State | Style |
|---|---|
| Default | `border: 1px solid hsl(var(--border))` |
| Focus | `border-color: mustard`, `ring: 2px mustard/30%` |
| Error | `border-color: red-500`, error message below in `.t-body-s` |
| Disabled | `opacity-50`, `cursor-not-allowed` |
| Valid | No positive indicator (don't add green checkmarks) |

---

## Loading States

### Page Loading

- All routes lazy-loaded; `<Suspense>` fallback: `<div className="min-h-[60vh] bg-background" />`
- Blank white area — no spinner (avoids flash for fast connections)

### Form Submission

- Button: replace label with loading spinner, disable button
- Successful submission: replace form with success state (not a toast)
- Error: toast notification (`sonner`), form stays visible

### Sanity Content Loading

- `isLoading`: render skeleton placeholders in card shape (background pulse via CSS)
- `isError`: render error state with retry suggestion (see Error States)

### Skeleton Pattern

```tsx
<div className="animate-pulse">
  <div className="h-48 bg-secondary rounded-sm mb-4" />
  <div className="h-4 bg-secondary rounded-sm w-3/4 mb-2" />
  <div className="h-4 bg-secondary rounded-sm w-1/2" />
</div>
```

---

## Empty States

### Insights — No Articles in Category

```
[eyebrow: "Insights"]
Nothing here yet.
[body: "We are working on more content in this category. Check back soon."]
[button: "Browse all insights" → clears filter]
```

### Insights — Sanity Unavailable

Show article grid skeleton (pulse), not an error message. Silently retry via TanStack Query.

### Calculator — No Results

The calculator always has results (it's a live model, no async). Empty state not applicable.

### Assessment Tools — No Recommendation

Show generic "Contact us" CTA rather than a blank result.

---

## Error States

### Form Error

- Show inline field error below the input (`t-body-s text-red-500`)
- If Supabase returns error: show `sonner` toast — never alert()
- If network is offline: "Please check your connection and try again."

### Page-Level Error

`ErrorBoundary.tsx` catches render errors:
```
Something went wrong.
[Refresh the page] or [Go to homepage]
```
No stack traces shown to users.

### 404

`NotFound.tsx`:
```
404
Page not found.
[Go to homepage]
```
Styled consistently with the rest of the site. No image.

---

## Visual Consistency Rules

### Eyebrows

Every major section begins with an eyebrow label. Format:
```
[small-caps gold label]
[40px gold divider line]
[display heading]
```
No exceptions. Eyebrow text is always Inter 600, uppercase, `letter-spacing: 0.18em`.

### Section Numbers (Watermark Pattern)

Some sections use a large ghost ordinal number as a visual anchor:
```css
/* Pattern from Stats section */
.section-watermark::before {
  content: "04";
  font-size: clamp(6rem, 15vw, 12rem);
  color: hsl(var(--foreground) / 0.04);
  font-family: var(--font-display);
  position: absolute;
  top: 0; left: 0;
  pointer-events: none;
  user-select: none;
}
```

### Quote / Testimonial Cards

Format:
1. 5 stars (mustard, `★★★★★`)
2. Outcome metric — bold, gold, `.t-heading-m` — this is the lead visual
3. Quote text — `.t-body-m`
4. Avatar initials circle + Name / Role

Never: star rating as a number, generic quote icon, fake company logos.

### Photography Rules

- Treat all photos with subtle desaturation + darkening overlay (`brightness(0.85) saturate(0.9)`)
- No photos of handshakes, people in meetings, or stock "success" imagery
- Approved assets only: see `VISUAL_REFERENCE_PLAN.md`
- Decorative images: `alt=""` + `aria-hidden="true"`

### The Design Commandments (Reference)

1. Every pixel earns its place. Remove before you add.
2. Whitespace is content. Generous margins communicate confidence.
3. One accent moment per section. Not three.
4. Typography does the heavy lifting.
5. Hover states: subtle and immediate (100–200ms).
6. Scroll reveals: once, downward only.
7. Mobile is not a cut-down version.
8. Never use a stock photo of a handshake.
9. If it needs a tooltip, redesign it.
10. Dark sections are rare and intentional.
11. Mustard is the most powerful colour. Use it last.
12. Build for the partner reading at 11pm, not the intern scanning at 9am.
