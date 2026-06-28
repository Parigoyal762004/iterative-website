# Prompt 03 — Fullscreen Video Hero Section
> Ready-to-use agent prompt for `src/pages/Home.tsx` — Hero section with looping video background

---

## Task

Build a full-viewport-height hero section for the Akro Ventures homepage in React + TypeScript + Tailwind CSS using `lucide-react`. The section has a looping background video, the existing sticky Navbar, and staggered-animated hero text.

**Edit `src/pages/Home.tsx` only.** The `Navbar` already lives in `src/components/layout/Navbar.tsx` and is rendered by `Layout.tsx` — do not re-create it inside this section. This prompt covers the hero content below the Navbar.

---

## Fonts

Already loaded globally via Google Fonts. Do not add new `<link>` tags.
- Display headings: `'Playfair Display', Georgia, serif`
- All UI / body text: `'Inter', system-ui, sans-serif`

Font smoothing is already applied globally in `src/index.css`. Do not add CSS resets.

---

## Video Background

```ts
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'
```

- `autoPlay muted loop playsInline`
- `position: absolute`, fills parent, `width: 100%`, `height: 100%`
- `objectFit: 'cover'`, `objectPosition: '70% center'`
- Sits at `zIndex: 0` — all content above it
- A `position: absolute; inset: 0; background: rgba(0,0,0,0.52)` overlay sits above the video (`zIndex: 1`) to ensure text contrast

---

## Root Container

```tsx
<section
  className="relative h-screen w-full overflow-hidden bg-foreground"
  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
>
```

`bg-foreground` (charcoal `#2B2B2B`) acts as a fallback before the video loads.

---

## Hero Content (above overlay, `zIndex: 10`)

The content div fills the section and is split vertically: top content anchored top-left, bottom content anchored bottom-left.

```tsx
<div
  className="relative z-10 flex h-full flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16"
>
  {/* TOP: eyebrow + headline */}
  {/* BOTTOM: subtext + CTA */}
</div>
```

---

## Top Section (`max-w-3xl`)

### Eyebrow Badge

```tsx
<div
  className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-[2px] border border-white/20 px-3 py-1.5"
  style={{ animation: 'fadeSlideUp 0.8s ease 0.2s both' }}
>
  <span
    className="h-1.5 w-1.5 rounded-full bg-accent"
    aria-hidden="true"
  />
  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
    Capital Advisory · India
  </span>
</div>
```

Note: `bg-accent` is mustard (`#F2B705`) — the single accent moment on this section.

### Headline `<h1>`

```tsx
<h1
  className="text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
  style={{
    fontFamily: 'Playfair Display, Georgia, serif',
    animation: 'fadeSlideUp 0.8s ease 0.4s both',
  }}
>
  We get Indian
  <br className="hidden sm:block" />
  <span className="sm:hidden"> </span>
  businesses
  <br className="hidden sm:block" />
  <span className="sm:hidden"> </span>
  funded.
</h1>
```

---

## Bottom Section

### Subtext

```tsx
<p
  className="mb-5 max-w-sm text-sm leading-relaxed text-white/65 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg"
  style={{ animation: 'fadeSlideUp 0.8s ease 0.7s both' }}
>
  Debt, equity, ECB, export finance — structured right, placed fast.
  We've helped 50+ Indian founders raise ₹200Cr+.
</p>
```

### CTA Row

```tsx
<div
  className="flex flex-col gap-3 sm:flex-row sm:gap-4"
  style={{ animation: 'fadeSlideUp 0.8s ease 0.9s both' }}
>
  {/* Primary CTA */}
  <a
    href="/contact"
    className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-foreground transition-transform hover:scale-105 sm:px-6 sm:py-3"
  >
    Start your raise
    <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
  </a>

  {/* Secondary CTA */}
  <a
    href="/loan-audit"
    className="inline-flex items-center gap-2 rounded-[2px] border border-white/40 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:border-white/80 hover:text-white sm:px-6 sm:py-3"
  >
    Check loan readiness
    <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
  </a>
</div>
```

Import: `import { ArrowRight } from 'lucide-react'`

---

## Social Proof Strip (Bottom of Section)

Below the CTA row, pinned to the bottom of the section:

```tsx
<div
  className="mt-auto flex flex-wrap items-center gap-6 pt-8 text-white/50 sm:gap-8"
  style={{ animation: 'fadeSlideUp 0.8s ease 1.1s both' }}
>
  {[
    { value: '50+', label: 'Founders funded' },
    { value: '₹200Cr+', label: 'Capital placed' },
    { value: '40+', label: 'Lender network' },
    { value: '0', label: 'Upfront fees' },
  ].map(({ value, label }) => (
    <div key={label} className="flex flex-col">
      <span
        className="text-lg font-bold text-white sm:text-xl"
        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
      >
        {value}
      </span>
      <span className="text-xs uppercase tracking-[0.1em] text-white/50">{label}</span>
    </div>
  ))}
</div>
```

---

## CSS Animation (add to `src/index.css` if not already present)

```css
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Do NOT add a CSS reset — one already exists globally.

---

## Design Constraints (Non-Negotiable)

- Max `border-radius`: 4px (`rounded-[2px]`) — no `rounded-lg`, `rounded-xl`, `rounded-full` on content elements
- One accent moment only: the eyebrow dot uses `bg-accent` (mustard). No other mustard on this section.
- No glassmorphism, no glow effects, no floating blobs
- No looping decorative animations — `fadeSlideUp` fires once only
- White text hierarchy: `text-white` (headline) → `text-white/90` (eyebrow) → `text-white/65` (body) → `text-white/50` (stats)
- The video overlay at `rgba(0,0,0,0.52)` must maintain WCAG AA contrast for all text
- Hover states: 100–200ms max. `transition-transform` and `transition-colors` only.

---

## File to Edit

`src/pages/Home.tsx` — replace the existing hero `<section>` with this implementation. Do not touch `src/components/layout/Navbar.tsx` or `src/components/layout/Layout.tsx`.
