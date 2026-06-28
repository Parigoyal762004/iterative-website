# Prompt 01 — Animated Outcomes Carousel (Home Page Hero)
> Ready-to-use agent prompt for `src/pages/Home.tsx` — Outcomes section

---

## Task

Build a full-viewport-width animated carousel section for the Akro Ventures homepage in React + TypeScript + Tailwind CSS using `framer-motion` and `lucide-react`. This replaces the static Outcomes section. The component is called `OutcomesCarousel`.

Do NOT create a new file. Add this component inside `src/pages/Home.tsx` as a local component and render it in place of the existing Outcomes section.

---

## Fonts

Already loaded globally via Google Fonts in `index.html`. Do not add new font imports.
- Display headings: `'Playfair Display', Georgia, serif`
- All UI text: `'Inter', system-ui, sans-serif`

---

## Slide Data (4 items — exact values)

```ts
const OUTCOMES = [
  {
    label: 'Term Loan · Hyderabad',
    metric: '₹45Cr',
    descriptor: 'Residential township project funded in 42 days.',
    detail: 'A developer with strong land assets but no banking relationship. We structured a project-finance term loan and placed it with 3 lenders simultaneously.',
    category: 'Project Finance',
    bg: 'hsl(184 29% 35%)',       // --color-teal
    panel: 'hsl(184 29% 42%)',    // teal lightened
  },
  {
    label: 'Startup Equity · Mumbai',
    metric: 'Seed Round',
    descriptor: 'Closed above target. First cheque in 18 days.',
    detail: 'A B2B SaaS founder with strong MRR but no investor network. We structured the round, prepared the data room, and ran a targeted raise process.',
    category: 'Equity Advisory',
    bg: 'hsl(0 0% 17%)',          // --color-charcoal
    panel: 'hsl(0 0% 24%)',       // charcoal lightened
  },
  {
    label: 'Working Capital · Pune',
    metric: '₹2.8Cr',
    descriptor: 'Unsecured OD limit sanctioned in 11 days.',
    detail: 'A manufacturing SME with GST history but no collateral. We matched them to the right NBFC and navigated the documentation to a clean sanction.',
    category: 'Working Capital',
    bg: 'hsl(44 89% 38%)',        // mustard darkened for readability
    panel: 'hsl(44 89% 45%)',     // --color-mustard
  },
  {
    label: 'ECB Advisory · Bengaluru',
    metric: '$2M',
    descriptor: 'External commercial borrowing structured and placed.',
    detail: 'A tech startup needing USD-denominated debt to match their revenue currency. We navigated RBI compliance and placed the ECB with an offshore lender.',
    category: 'ECB / FDI',
    bg: 'hsl(100 11% 30%)',       // dark cream/forest for contrast
    panel: 'hsl(100 11% 38%)',
  },
];
```

Preload all image assets on mount via `useEffect` if any are added later. Currently text-only — no images required.

---

## State & Logic

```ts
const [activeIndex, setActiveIndex] = useState(0)
const [isAnimating, setIsAnimating] = useState(false)
const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

useEffect(() => {
  const onResize = () => setIsMobile(window.innerWidth < 640)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}, [])

function navigate(dir: 'next' | 'prev') {
  if (isAnimating) return
  setIsAnimating(true)
  setActiveIndex(prev => dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4)
  setTimeout(() => setIsAnimating(false), 650)
}
```

Derived roles (recalculate on every render from `activeIndex`):
```ts
const center = activeIndex
const left   = (activeIndex + 3) % 4
const right  = (activeIndex + 1) % 4
const back   = (activeIndex + 2) % 4
```

---

## Layout Structure

Outer `<section>` wrapper:
- `position: relative`, `width: 100%`, `overflow: hidden`
- `backgroundColor` transitions to `OUTCOMES[activeIndex].bg`
- Transition: `background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)`
- `fontFamily: 'Inter, sans-serif'`
- Min height: `100vh` on desktop, `auto` on mobile

Inner wrapper: `position: relative`, `width: 100%`, `minHeight: 100vh`, `overflow: hidden`.

---

## Element 1 — Grain Overlay

```ts
// position: absolute, inset: 0, pointerEvents: none, zIndex: 50
// SVG noise texture via data URI
const grainStyle = {
  position: 'absolute' as const,
  inset: 0,
  pointerEvents: 'none' as const,
  zIndex: 50,
  opacity: 0.35,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
  backgroundSize: '200px 200px',
  backgroundRepeat: 'repeat',
}
```

---

## Element 2 — Ghost Text "CAPITAL"

```ts
// position: absolute, centered horizontally, top: 18%, zIndex: 2
// fontFamily: 'Playfair Display, Georgia, serif'
// fontSize: clamp(90px, 28vw, 380px)
// fontWeight: 900
// color: white, opacity: 0.07  ← very subtle, behind cards
// lineHeight: 1, letterSpacing: '-0.02em'
// whiteSpace: nowrap, userSelect: none, pointerEvents: none
```

Text content: `"CAPITAL"`

This uses Playfair Display (Akro's display font) instead of a decorative sans-serif.

---

## Element 3 — Top-Left Brand Label

```ts
// position: absolute, top: 1.5rem, left: 1rem (sm: 2rem), zIndex: 60
// fontSize: 0.75rem, fontWeight: 600, textTransform: uppercase
// color: white, opacity: 0.9, letterSpacing: '0.18em'
// fontFamily: Inter
```

Text: `"AKRO VENTURES"`

---

## Element 4 — Slide Cards (Carousel)

Map all 4 OUTCOMES. Each item is `position: absolute`.

Card visual: a text content card (not an image). Each card contains:
- `category` label — `.t-label` style (Inter 600, uppercase, `letterSpacing: 0.18em`, 11px, white/70)
- `metric` — Playfair Display, 700 weight, white, `fontSize: clamp(2.5rem, 6vw, 5rem)`, `lineHeight: 1`
- `descriptor` — Inter 400, white/85, `fontSize: 0.9375rem`, `lineHeight: 1.6`
- Bottom accent: 2px solid white/30 left border on the card, 40px tall

Card container style per role:

**center:**
```ts
{
  transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.4})`,
  filter: 'none',
  opacity: 1,
  zIndex: 20,
  left: '50%',
  height: isMobile ? '52%' : '80%',
  bottom: isMobile ? '22%' : '8%',
  aspectRatio: '0.75 / 1',
  backgroundColor: OUTCOMES[activeIndex].panel,
  borderRadius: '2px',
  padding: '2rem',
  border: '1px solid rgba(255,255,255,0.15)',
}
```

**left:**
```ts
{
  transform: 'translateX(-50%) scale(1)',
  filter: 'blur(2px)',
  opacity: 0.6,
  zIndex: 10,
  left: isMobile ? '15%' : '28%',
  height: isMobile ? '30%' : '48%',
  bottom: isMobile ? '30%' : '15%',
  aspectRatio: '0.75 / 1',
  backgroundColor: OUTCOMES[(activeIndex + 3) % 4].panel,
  borderRadius: '2px',
  padding: '1.25rem',
}
```

**right:** Same as left but `left: isMobile ? '85%' : '72%'`, uses `OUTCOMES[(activeIndex + 1) % 4].panel`.

**back:**
```ts
{
  transform: 'translateX(-50%) scale(1)',
  filter: 'blur(4px)',
  opacity: 0.4,
  zIndex: 5,
  left: '50%',
  height: isMobile ? '24%' : '38%',
  bottom: isMobile ? '30%' : '15%',
  aspectRatio: '0.75 / 1',
  backgroundColor: OUTCOMES[(activeIndex + 2) % 4].panel,
  borderRadius: '2px',
  padding: '1rem',
}
```

Transition on each card:
```ts
transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)'
willChange: 'transform, filter, opacity'
```

---

## Element 5 — Bottom-Left Text + Nav Buttons

```ts
// position: absolute, bottom: 1.5rem (sm: 5rem), left: 1rem (sm: 6rem)
// zIndex: 60, maxWidth: 360px
```

Contents:
1. `<p>` — `"DEAL OUTCOMES"` — Inter 700, uppercase, `letterSpacing: 0.02em`, `fontSize: isMobile ? '1rem' : '1.375rem'`, white, opacity 0.95, `marginBottom: isMobile ? '0.5rem' : '0.75rem'`
2. `<p>` — `"Real capital, real structures, real results. Every outcome below is a closed deal — not a projection."` — hidden on mobile (`display: isMobile ? 'none' : 'block'`), Inter 400, `fontSize: '0.8125rem'`, white, opacity 0.8, `lineHeight: 1.6`, `marginBottom: '1.25rem'`
3. Two circular nav buttons — `width: isMobile ? '3rem' : '4rem'`, `height: isMobile ? '3rem' : '4rem'`, `background: transparent`, `border: 2px solid white`, `borderRadius: '50%'`, white icon, `display: flex, alignItems: center, justifyContent: center`, `gap: 0.75rem` between them, in a flex row.
   - Left button: `<ArrowLeft size={26} strokeWidth={2.25} />` — calls `navigate('prev')`
   - Right button: `<ArrowRight size={26} strokeWidth={2.25} />` — calls `navigate('next')`
   - Hover: `scale(1.08)`, `backgroundColor: rgba(255,255,255,0.12)`, transition `150ms`

Import from lucide-react: `import { ArrowLeft, ArrowRight } from 'lucide-react'`

---

## Element 6 — Bottom-Right Link "VIEW ALL OUTCOMES"

```ts
// position: absolute, bottom: 1.5rem (sm: 5rem), right: 1rem (sm: 2.5rem)
// zIndex: 60
// <a href="/founders"> (internal React Router link — use <Link> from react-router-dom)
```

Styles:
- `display: flex`, `alignItems: center`, `gap: 0.5rem`
- `fontFamily: 'Playfair Display, Georgia, serif'` ← Akro's display font
- `fontSize: clamp(20px, 4vw, 48px)`, `fontWeight: 700`, `fontStyle: italic`
- `color: white`, `opacity: 0.9` → `1.0` on hover (200ms transition)
- `letterSpacing: '-0.02em'`, `lineHeight: 1`, `textDecoration: none`
- Followed by `<ArrowRight>` (`width: isMobile ? '1.25rem' : '2rem'`, `height: isMobile ? '1.25rem' : '2rem'`, `strokeWidth: 2.25`)

Text: `"VIEW ALL"`

---

## Behaviour Summary

- Clicking arrows rotates roles; background color, card positions, scales, blurs, and opacities crossfade simultaneously over 650ms with `cubic-bezier(0.4, 0, 0.2, 1)`
- The center card shows full deal detail; side cards are blurred and smaller
- Background transitions between the 4 OUTCOMES `bg` values
- Ghost text "CAPITAL" sits behind all cards at very low opacity
- The section conveys track record — not decoration

---

## Design Constraints (from DESIGN_SYSTEM.md)

- Border radius: maximum `2px` — no rounded corners on cards
- No glassmorphism, no glow shadows
- No looping decorative animations
- Hover states: 100–200ms max
- Mustard (#F2B705) is not used here — this is a dark-background section; accents are white
- Typography: Playfair Display for the ghost text and bottom link; Inter everywhere else

---

## File to Edit

`src/pages/Home.tsx` — add `OutcomesCarousel` as a local component above the main export, replace the existing outcomes `<section>` with `<OutcomesCarousel />`.
