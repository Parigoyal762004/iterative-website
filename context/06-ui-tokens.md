# 06 — UI Tokens
> Akro Ventures Website V2 · Design Foundation

All tokens are defined as CSS custom properties in `src/index.css` and consumed via Tailwind config. Never hardcode values in components.

---

## Colour Palette

### Raw Colour Values

| Token | HSL | Hex | Name |
|---|---|---|---|
| `--color-charcoal` | `hsl(0 0% 17%)` | `#2B2B2B` | Charcoal |
| `--color-teal` | `hsl(184 29% 35%)` | `#3F6F73` | Teal |
| `--color-mustard` | `hsl(44 89% 48%)` | `#F2B705` | Mustard |
| `--color-cream` | `hsl(100 11% 96%)` | `#F4F6F2` | Cream |
| `--color-white` | `hsl(0 0% 100%)` | `#FFFFFF` | White |
| `--color-muted` | `hsl(220 9% 46%)` | `#6B7280` | Muted |
| `--color-border` | `hsl(220 13% 91%)` | `#E5E7EB` | Border |

### Semantic Tokens (Tailwind-facing)

```css
:root {
  --background:          var(--color-white);
  --foreground:          var(--color-charcoal);
  --primary:             var(--color-teal);
  --primary-foreground:  var(--color-white);
  --accent:              var(--color-mustard);
  --accent-foreground:   var(--color-charcoal);
  --secondary:           var(--color-cream);
  --secondary-foreground: var(--color-charcoal);
  --muted:               var(--color-cream);
  --muted-foreground:    var(--color-muted);
  --border:              var(--color-border);
  --ring:                var(--color-mustard);
  --card:                var(--color-white);
  --card-foreground:     var(--color-charcoal);
}
```

### Distribution Rule

- **70%** white / cream / neutral — default backgrounds
- **20%** charcoal — text, dark sections
- **10%** mustard + teal — accent moments only; never both in the same visual field

### Colour Usage Rules

- **Mustard:** eyebrow labels, divider lines, button fills, active nav underline, icon accents, focus rings
- **Teal:** dark section backgrounds, primary CTA surfaces, service card top accent
- **Cream:** alternating section backgrounds, card fills on dark surfaces
- **Charcoal:** primary text, footer, dark section backgrounds
- Never use `bg-teal` and `bg-mustard` visible in the same area simultaneously

---

## Typography

### Font Families

```css
--font-display: 'Playfair Display', Georgia, serif;
--font-sans:    'Inter', system-ui, sans-serif;
--font-mono:    'Roboto Mono', 'Courier New', monospace;
```

Loaded via Google Fonts CDN with `display=swap`. Fallbacks ensure immediate text render.

### Type Scale

| Class | Size (clamp) | Line height | Letter spacing | Weight | Font | Use |
|---|---|---|---|---|---|---|
| `.t-display-xl` | `clamp(3rem, 5vw, 5rem)` | 1.05 | -0.02em | 700 | Playfair | Hero headline |
| `.t-display-l` | `clamp(2.5rem, 4vw, 4rem)` | 1.08 | -0.02em | 700 | Playfair | Page hero |
| `.t-display-m` | `clamp(2rem, 3vw, 3rem)` | 1.10 | -0.01em | 700 | Playfair | Section headline |
| `.t-heading-l` | `clamp(1.5rem, 2vw, 2.25rem)` | 1.20 | -0.01em | 700 | Playfair | Large subhead |
| `.t-heading-m` | `clamp(1.25rem, 1.5vw, 1.75rem)` | 1.30 | -0.01em | 600 | Playfair | Card title |
| `.t-heading-s` | `clamp(1.125rem, 1.2vw, 1.375rem)` | 1.30 | — | 600 | Playfair | Small subhead |
| `.t-body-xl` | `1.25rem` | 1.60 | — | 400 | Inter | Lead paragraph |
| `.t-body-l` | `1.0625rem` | 1.70 | — | 400 | Inter | Article body |
| `.t-body-m` | `0.9375rem` | 1.65 | — | 400 | Inter | Standard body |
| `.t-body-s` | `0.8125rem` | 1.60 | — | 400 | Inter | Captions, meta, errors |
| `.t-label` | `0.6875rem` | 1 | 0.18em | 600 | Inter | Eyebrows, tags (uppercase) |
| `.t-mono` | `0.8125rem` | 1 | 0.02em | 400 | Mono | Stats, numbers (tabular) |

### Typography Rules

- All headings: Playfair Display only
- All UI (labels, buttons, nav, forms, body): Inter
- Max prose width: `680px` (`max-w-prose` Tailwind class)
- Negative tracking on display sizes; wide tracking on `.t-label` only
- No `text-transform: uppercase` on headings; only on `.t-label`
- Stats and numbers: `font-variant-numeric: tabular-nums` via `.t-mono`

---

## Spacing

### Section Vertical Rhythm

Applied via `.section-y` utility class:

```css
.section-y {
  padding-block: 4rem;       /* mobile */
}
@media (min-width: 640px) {
  .section-y { padding-block: 5rem; }   /* tablet */
}
@media (min-width: 1024px) {
  .section-y { padding-block: 7.5rem; } /* desktop */
}
```

### Spacing Scale (Tailwind)

Standard Tailwind scale; key values in use:

| Token | Value | Use |
|---|---|---|
| `space-4` | 1rem | Stack gap inside card |
| `space-6` | 1.5rem | Section headline → body gap |
| `space-8` | 2rem | Card padding (desktop) |
| `space-10` | 2.5rem | Section body → CTA gap |
| `space-5` | 1.25rem | Card padding (mobile) |

### Container

- Max width: `1280px`
- Horizontal padding: `1.5rem` all breakpoints
- Applied via `<Container>` primitive or Tailwind `container` class (reconfigured)

---

## Border System

```css
--radius-default: 2px;   /* All cards, inputs, buttons */
--radius-sm:      2px;
--radius-none:    0px;
```

- **Default card border:** `1px solid hsl(var(--border))`
- **Accent left border:** `border-left: 2px solid hsl(var(--accent))` — used on `card-editorial` and eyebrow dividers
- **Dark surface cards:** `border: 1px solid hsl(0 0% 100% / 0.10)`
- **No radius larger than 4px anywhere**

---

## Shadow System

```css
--shadow-sm:          0 1px 3px rgba(0,0,0,0.06);
--shadow-md:          0 4px 16px rgba(0,0,0,0.08);
--shadow-lg:          0 8px 32px rgba(0,0,0,0.10);
--shadow-card:        0 2px 8px rgba(0,0,0,0.06);
--shadow-card-hover:  0 4px 16px rgba(0,0,0,0.08);
```

- No glow shadows
- No coloured box-shadows
- Card hover uses `--shadow-card-hover` via Tailwind `hover:shadow-md`

---

## Motion Tokens

### Timing Functions

```css
--ease-out:  cubic-bezier(0.22, 1, 0.36, 1);   /* All reveals and exits */
--ease-in:   cubic-bezier(0.64, 0, 0.78, 0);   /* Elements leaving view */
```

### Duration Scale

```css
--duration-micro:    100ms;   /* Hover colour/opacity */
--duration-quick:    200ms;   /* Button hover, icon swap */
--duration-standard: 300ms;   /* Nav transitions, modal open */
--duration-medium:   450ms;   /* Card reveals, tab switch */
--duration-slow:     650ms;   /* Section entrance, hero */
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 10ms !important;
    transition-duration: 10ms !important;
  }
}
```

---

## Breakpoints

| Token | Value | Context |
|---|---|---|
| `sm` | `640px` | Small tablet |
| `md` | `768px` | Tablet / mobile nav threshold |
| `lg` | `1024px` | Desktop layout begins |
| `xl` | `1280px` | Wide desktop |
| `2xl` | `1536px` | Not used (container caps at 1280px) |

Mobile drawer triggers at `< 768px`.

---

## Grid System

- 12-column grid at desktop (`lg:grid-cols-12`)
- 4-column grid at tablet (`sm:grid-cols-4`)
- Single column at mobile (default)
- Column gap: `2rem` desktop (`gap-8`), `1.5rem` mobile (`gap-6`)

### Common Grid Patterns

```tsx
// 3-col with border collapse
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y border border-border">
  {/* Items share borders */}
</div>

// Asymmetric (Outcomes featured)
<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
  <div className="lg:col-span-3">featured</div>
  <div className="lg:col-span-2 grid grid-rows-2 gap-6">stacked</div>
</div>
```

---

## Icons

- Library: Lucide React — tree-shakeable
- Size: `16px` inline, `20px` standalone, `24px` feature icons
- Colour: inherits `currentColor` — use text colour utilities
- Decorative icons: `aria-hidden="true"`

---

## Section Background Patterns (CSS-only)

Hero sections use CSS-only texture classes defined in `index.css`:

| Class | Pattern | Page |
|---|---|---|
| `.bg-diagonal-lines` | 45° diagonal lines | Home hero |
| `.hero-ledger` | Horizontal ruled lines | About |
| `.hero-columns` | Vertical column guides | Founders |
| `.hero-dot-fine` | Fine dot matrix | Insights |
| `.hero-graph` | Graph paper grid | Calculator |
| `.hero-bloom` | Warm radial gradient | Contact |
| `.hero-arcs` | Concentric arcs | Loan Audit |

These are `::before` pseudo-element overlays on the hero section — no images required.

---

## Eyebrow Pattern

Every major section opens with this pattern:
```tsx
<span className="t-label text-accent uppercase tracking-widest">Category Label</span>
<div className="w-10 h-0.5 bg-accent mt-3 mb-6" />
<Heading size="l">The section headline</Heading>
```

The gold divider (`w-10 h-0.5 bg-accent`) is 40px wide, 2px tall, mustard colour.
