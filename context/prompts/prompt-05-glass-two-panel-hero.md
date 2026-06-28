# Prompt 05 — Liquid Glass Two-Panel Hero (Investors Page)
> Ready-to-use agent prompt for `src/pages/Investors.tsx`

---

## Task

Build a fullscreen two-panel hero section for the Akro Ventures Investors page (`/investors`) in React + TypeScript + Tailwind CSS using `lucide-react`. The design uses a liquid glass morphism aesthetic over a looping video background. Left panel is the primary content panel; right panel is a desktop-only contextual information column.

**Edit `src/pages/Investors.tsx` only.** The `<Layout>` wrapper and `Navbar.tsx` are already applied at the route level — do not rebuild them.

---

## Fonts

Already loaded globally. Do not add new imports.
- Display / headings: `'Playfair Display', Georgia, serif`
- Body / UI: `'Inter', system-ui, sans-serif`

---

## CSS Classes (add to `src/index.css` under `@layer components` — only if not already present)

```css
@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.15) 80%,
      rgba(255, 255, 255, 0.45) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .liquid-glass-strong {
    background: rgba(255, 255, 255, 0.03);
    background-blend-mode: luminosity;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass-strong::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.2) 80%,
      rgba(255, 255, 255, 0.5) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

No `border` classes on glass elements — the `::before` pseudo-element is the border.

---

## Background Video

```ts
const INVESTORS_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4'
```

```tsx
<video
  src={INVESTORS_VIDEO}
  autoPlay muted loop playsInline
  className="absolute inset-0 w-full h-full object-cover z-0"
  aria-hidden="true"
/>
```

Black overlay `z-[1]`: `absolute inset-0 bg-black/55`

---

## Root Layout

```tsx
<div className="relative min-h-screen overflow-hidden bg-foreground flex flex-col lg:flex-row">
  {/* video + overlay */}
  {/* LEFT PANEL — w-full lg:w-[52%] */}
  {/* RIGHT PANEL — hidden lg:flex lg:w-[48%] */}
</div>
```

---

## LEFT PANEL

`w-full lg:w-[52%] relative z-10 flex flex-col min-h-screen`

Inside: a `liquid-glass-strong` overlay — `absolute inset-3 lg:inset-5 rounded-[2px]` — sits behind panel content, providing the frosted-glass surface. Everything else is `relative z-10`.

### Section-Local Nav (`px-6 py-5 flex items-center justify-between`)

**Left:**
```tsx
<div className="flex items-center gap-3">
  {/* AV logotype */}
  <div className="h-8 w-8 rounded-[2px] bg-white/10 flex items-center justify-center liquid-glass">
    <span
      className="text-sm font-bold italic text-white"
      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
    >
      AV
    </span>
  </div>
  <span className="text-sm font-semibold tracking-tight text-white Inter">
    Akro Ventures
  </span>
</div>
```

**Right:**
```tsx
<button className="liquid-glass rounded-[2px] px-4 py-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/80 hover:text-white transition-colors">
  <Menu size={14} />
  Menu
</button>
```

Import: `import { Menu, Sparkles, ArrowRight, BookOpen, TrendingUp } from 'lucide-react'`

### Hero Center (`flex-1 flex flex-col items-start justify-center px-6 lg:px-10 py-8`)

**Tagline / Eyebrow:**

```tsx
<div className="mb-6 flex items-center gap-2">
  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 Inter">
    For Investors & Lenders
  </span>
</div>
```

**Headline `<h1>`:**

```tsx
<h1
  className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.0] tracking-[-0.03em] text-white mb-6"
  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
>
  Curated deal flow.
  <br />
  <em className="not-italic text-white/60">Structured from day one.</em>
</h1>
```

**Body:**

```tsx
<p className="text-sm lg:text-base text-white/60 font-light leading-relaxed max-w-md mb-8 Inter">
  Every deal we present to you has already been structured, documented,
  and assessed for viability. We don't send raw inbound — we build the
  case before the introduction.
</p>
```

**CTA Button:**

```tsx
<button className="liquid-glass-strong rounded-[2px] px-5 py-3 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.06em] text-white hover:scale-105 active:scale-95 transition-transform">
  <span>Register your interest</span>
  <ArrowRight size={16} strokeWidth={2.25} />
</button>
```

On click: scrolls to or opens the investor application form section below (use `#investor-form` anchor).

**Three Category Pills** (flex, gap-2, mt-6):

```tsx
{['Co-investment', 'Debt Placement', 'ECB / FDI'].map(label => (
  <span key={label} className="liquid-glass rounded-[2px] px-3 py-1.5 text-xs text-white/70 Inter">
    {label}
  </span>
))}
```

### Bottom Quote (`mt-auto px-6 lg:px-10 pb-6 lg:pb-8`)

```tsx
<div>
  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3 Inter">
    Our Approach
  </p>
  {/* Horizontal lines + quote */}
  <div className="flex items-center gap-4">
    <div className="h-px flex-1 bg-white/15" />
    <p
      className="text-sm italic text-white/70 max-w-[280px] text-center leading-relaxed"
      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
    >
      "Capital should follow competence, not collateral."
    </p>
    <div className="h-px flex-1 bg-white/15" />
  </div>
  <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 text-center mt-3 Inter">
    Rohit & Akshita · Akro Ventures
  </p>
</div>
```

---

## RIGHT PANEL (Desktop Only)

`hidden lg:flex lg:w-[48%] relative z-10 flex-col px-8 py-6`

### Top Bar (`flex items-center justify-between mb-6`)

**Left:** Social icons in a `liquid-glass rounded-[2px] px-3 py-2 flex items-center gap-3`:

```tsx
{/* LinkedIn link */}
<a href="https://linkedin.com/company/akroventures" target="_blank" rel="noopener noreferrer"
   className="text-white/60 hover:text-white transition-colors">
  <Linkedin size={15} />
</a>
{/* Instagram link */}
<a href="https://instagram.com/akroventures" target="_blank" rel="noopener noreferrer"
   className="text-white/60 hover:text-white transition-colors">
  <Instagram size={15} />
</a>
{/* ArrowRight separator indicator */}
<div className="h-3 w-px bg-white/20" />
<ArrowRight size={13} className="text-white/40" />
```

Import: `import { Linkedin, Instagram } from 'lucide-react'`

**Right:** 

```tsx
<button className="liquid-glass rounded-[2px] h-9 w-9 flex items-center justify-center hover:scale-105 transition-transform">
  <Sparkles size={15} className="text-accent" />
</button>
```

### Deal Flow Teaser Card (`liquid-glass rounded-[2px] p-5 mb-4 w-full max-w-[260px]`)

```tsx
<div>
  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-2 Inter">
    Active deal flow
  </p>
  <p className="text-sm text-white/80 leading-relaxed Inter font-light">
    We currently have 3 active placements across working capital, 
    project finance, and startup equity. Reach out to see the deal deck.
  </p>
</div>
```

### Bottom Feature Section (`mt-auto flex flex-col gap-3`)

An outer `liquid-glass rounded-[2px] p-4` container wrapping three cards:

**Card A — Structured Deals** (`liquid-glass rounded-[2px] p-4 flex items-start gap-3`):

```tsx
<div className="liquid-glass h-9 w-9 rounded-[2px] flex items-center justify-center flex-shrink-0">
  <TrendingUp size={16} className="text-white/70" />
</div>
<div>
  <p className="text-sm font-semibold text-white mb-1 Inter">Structured Deals</p>
  <p className="text-xs text-white/55 leading-relaxed Inter font-light">
    Every deal arrives with a complete information memorandum and preliminary lender assessment.
  </p>
</div>
```

**Card B — Track Record** (`liquid-glass rounded-[2px] p-4 flex items-start gap-3`):

```tsx
<div className="liquid-glass h-9 w-9 rounded-[2px] flex items-center justify-center flex-shrink-0">
  <BookOpen size={16} className="text-white/70" />
</div>
<div>
  <p className="text-sm font-semibold text-white mb-1 Inter">Track Record</p>
  <p className="text-xs text-white/55 leading-relaxed Inter font-light">
    ₹200Cr+ placed across 50+ deals since 2020. Zero defaults in our placed debt portfolio.
  </p>
</div>
```

**Card C — Bottom CTA strip** (inside outer container, below the two cards):

```tsx
<div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
  {/* Thumbnail placeholder */}
  <div className="h-12 w-20 rounded-[2px] bg-white/10 flex items-center justify-center">
    <span className="text-[10px] text-white/40 Inter uppercase tracking-wider">Deal deck</span>
  </div>
  <div className="flex-1 px-4">
    <p className="text-xs font-semibold text-white Inter">Capital Placement Portfolio</p>
    <p className="text-[11px] text-white/50 Inter mt-0.5">
      Debt · Equity · Cross-border
    </p>
  </div>
  <button className="liquid-glass h-8 w-8 rounded-[2px] flex items-center justify-center hover:scale-105 transition-transform">
    <ArrowRight size={14} className="text-white/70" />
  </button>
</div>
```

---

## Investor Application Form Section

Below the two-panel hero, add a simple `<section id="investor-form">` with `bg-foreground` (charcoal), a `<Container>` wrapper, and a 4-field form:

```tsx
// Fields: Name, Firm (optional), Email, Interest (select: Co-investment / Debt Placement / ECB / FDI)
// On submit: supabase.from('investor_applications').insert({ name, firm, email, investment_range: interest })
// Success: show "We'll be in touch within 48 hours." confirmation
// Error: sonner toast
// Form style: uses existing forms/Input.tsx and forms/Select.tsx
// Section eyebrow: "Register Interest" · divider · "Join our investor network."
```

---

## Icons Required

```ts
import {
  Menu,
  Sparkles,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Linkedin,
  Instagram,
} from 'lucide-react'
```

---

## Design Constraints (Non-Negotiable)

- `border-radius`: maximum `2px` (`rounded-[2px]`) — no rounded-xl, rounded-2xl, rounded-full on panels or cards
- No `border` classes — glass border is handled by `::before`
- One accent moment: eyebrow dot (`bg-accent`) and `<Sparkles>` icon (`text-accent`) — nowhere else
- Left panel has a `liquid-glass-strong` overlay behind content — this is the frosted panel effect
- Right panel cards use `liquid-glass` (lighter, less blur)
- No looping animations on content — video only
- All interactive elements: `hover:scale-105 active:scale-95 transition-transform`
- Copy: the hero quote `"Capital should follow competence, not collateral."` is Akro's approved brand statement — do not change it
- All body copy: Inter, font-light (300)
- All headings and the AV logotype: Playfair Display, italic or bold-italic
- `text-white/60` or lower for secondary content; never pure white on glass panels (readability)

---

## Files to Edit / Create

- **Edit:** `src/pages/Investors.tsx` — replace placeholder content with this full implementation
- **Edit (conditional):** `src/index.css` — add glass classes only if not already defined
- **Do not touch:** `Layout.tsx`, `Navbar.tsx`, `App.tsx`, `supabase.ts`
- The investor form submits to the `investor_applications` Supabase table. Schema is in `02-architecture.md`. Run the SQL in `supabase-schema.sql` if the table does not exist.
