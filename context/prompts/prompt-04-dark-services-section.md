# Prompt 04 — Dark Cinematic Services Section (Two Sections: Hero + Capabilities)
> Ready-to-use agent prompt for `src/pages/Founders.tsx`

---

## Task

Build two full-screen sections for the Akro Ventures Founders page (`/founders`) in React + TypeScript + Tailwind CSS + Framer Motion. The page is a dark, editorial layout with video backgrounds, blur-in text animation, and glass-effect UI cards. It replaces the existing placeholder content in `src/pages/Founders.tsx`.

Do NOT touch `src/components/layout/Layout.tsx` or `Navbar.tsx`. The `<Layout>` wrapper is already applied at the route level.

---

## Fonts

Already loaded. Do not add new imports.
- Display / headings: `'Playfair Display', Georgia, serif` — always italic in this dark context
- Body: `'Inter', system-ui, sans-serif` — font-light (300) for cinematic feel

---

## Glass CSS Classes

Add these to `src/index.css` under `@layer components` **only if they don't already exist**. Check before adding.

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

**Important:** The `::before` border effect handles all borders. Do not add `border` classes to glass elements.

---

## FadingVideo Component

Create `src/components/FadingVideo.tsx`:

```tsx
// Accepts: src (string), className, style
// 1. Starts at opacity 0
// 2. On loadeddata: fades to opacity 1 over 500ms via requestAnimationFrame
// 3. On timeupdate: when (duration - currentTime) <= 0.55s, fades out over 550ms
// 4. On ended: resets currentTime to 0, plays, fades back in
// Attributes: autoPlay muted playsInline preload="auto"
```

---

## BlurText Component

Create `src/components/motion/BlurText.tsx`:

```tsx
// Props: text (string), className
// Splits text by spaces into words
// Each word is a motion.span with display: inline-block, marginRight: 0.28em
// Trigger: useInView (threshold 0.1, once: true)
// Each word animates:
//   initial: { filter: 'blur(10px)', opacity: 0, y: 50 }
//   animate: { filter: 'blur(0px)', opacity: 1, y: 0 }
//   transition: duration 0.7s, delay: wordIndex * 0.1s
// Container: display flex, flexWrap wrap, justifyContent center, rowGap 0.1em
```

---

## Shared Motion Config

```ts
const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
}
```

---

## SECTION 1 — HERO (Full Viewport Height)

### Structure

```tsx
<section className="relative h-screen overflow-hidden bg-foreground">
```

`bg-foreground` (charcoal) is the fallback before video loads.

### Background Video

```ts
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4'
```

```tsx
<FadingVideo
  src={HERO_VIDEO}
  className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
  style={{ width: '120%', height: '120%' }}
/>
```

Black overlay at `z-[1]`: `absolute inset-0 bg-black/50`

### Inline Navbar (`z-50`, `pt-4 px-8 lg:px-16`)

Position: `relative z-10` inside the section. A sticky Navbar exists globally — this is a **section-local top bar** that sits inside this dark page only, separate from the white navbar in `Navbar.tsx`. Use `position: relative` (not fixed).

```
LEFT:  liquid-glass circle (h-12 w-12 rounded-full) with "AV" in italic Playfair Display text-2xl text-white
CENTER (md:flex, hidden mobile): liquid-glass rounded-[2px] pill — nav links: 
  "How it works", "Services", "Outcomes", "Contact"
  Style: px-3 py-2 text-sm font-medium text-white/90 Inter
  + "Book a Call" button: bg-accent (mustard) text-foreground rounded-[2px] px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] hover:scale-105 transition-transform
RIGHT: empty h-12 w-12 spacer
```

### Main Content (centered, `z-10`)

`flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center`

**Badge** (`motion.div`, delay 0.4s):

```tsx
<div className="liquid-glass rounded-[2px] px-4 py-2 inline-flex items-center gap-3 mb-6">
  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
    Now placing Q3 2026 deals · Limited capacity
  </span>
</div>
```

**Headline** (mt-6, max-w-4xl):

```tsx
<BlurText
  text="Structured capital for Indian founders ready to grow."
  className="text-5xl md:text-6xl lg:text-[5rem] font-bold italic text-white leading-[0.9] tracking-[-0.03em]"
  // fontFamily applied via inline style: 'Playfair Display, Georgia, serif'
/>
```

**Subtext** (`motion.p`, delay 0.8s, mt-4):

```
"We don't send you to a lender. We build the case, structure the instrument, and place
it with the right capital partner. Debt or equity — we run the process end to end."
```

Style: `text-sm md:text-base text-white/60 max-w-2xl font-light leading-relaxed Inter`

**CTA Row** (`motion.div`, delay 1.1s, mt-6, flex, gap-4):

1. `"Start your raise"` — `liquid-glass-strong rounded-[2px] px-5 py-2.5` with `<ArrowRight size={16} />` from lucide-react
2. `"Check loan readiness"` — plain text, text-white/70, hover:text-white, with `<ArrowRight size={16} />`  
   Links to `/loan-audit`

**Stats Cards** (`motion.div`, delay 1.3s, mt-8, flex gap-4):

Two `liquid-glass p-5 w-[220px] rounded-[2px]` cards:

```
Card 1: <TrendingUp size={20} className="text-accent" />  "₹200Cr+"  "Capital placed across 50+ deals"
Card 2: <Clock size={20} className="text-white/60" />      "11 Days"  "Average sanction time for working capital"
```

Import: `import { TrendingUp, Clock, ArrowRight } from 'lucide-react'`

Number style: `text-4xl font-bold italic tracking-[-0.02em] leading-none mt-4` (Playfair Display)

**Bottom Trust Bar** (`motion.div`, delay 1.4s, flex-col items-center gap-4 pb-8):

```tsx
<div className="liquid-glass rounded-[2px] px-6 py-2.5 text-xs text-white/60 font-light tracking-wide">
  Trusted by founders across manufacturing, SaaS, real estate, export, and fintech
</div>
```

Lender / sector tags below (flex row, gap-8 md:gap-12):

```ts
['Working Capital', 'Term Loans', 'Startup Equity', 'ECB / FDI', 'Export Finance']
```

Each: `text-lg italic font-bold text-white/40 hover:text-white/70 transition-colors` (Playfair Display)

---

## SECTION 2 — CAPABILITIES (Min Full Height)

```tsx
<section className="relative min-h-screen overflow-hidden bg-foreground">
```

### Background Video

```ts
const CAPABILITIES_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4'
```

```tsx
<FadingVideo src={CAPABILITIES_VIDEO} className="absolute inset-0 w-full h-full object-cover z-0" />
```

Overlay: `absolute inset-0 bg-black/60 z-[1]`

### Content (`relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen`)

**Header:**

```tsx
<p className="text-sm font-medium uppercase tracking-[0.18em] text-white/60 mb-6 Inter">
  // What we do
</p>
<h2
  className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold italic leading-[0.95] tracking-[-0.03em] text-white"
  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
>
  Advisory, end
  <br />
  to end.
</h2>
```

**Cards Grid** (mt-16, `grid grid-cols-1 md:grid-cols-3 gap-6`):

Each card: `liquid-glass rounded-[2px] p-6 min-h-[360px] flex flex-col`

```ts
const SERVICES = [
  {
    icon: 'Landmark',          // lucide-react
    tags: ['Term Loans', 'Working Capital', 'OD Limits', 'Project Finance'],
    title: 'Debt Advisory',
    body: 'We identify the right debt instrument for your business — secured or unsecured — structure the documentation, and place it with our network of 40+ banks and NBFCs. You get a sanction, not just advice.',
  },
  {
    icon: 'TrendingUp',
    tags: ['Pre-Seed', 'Seed', 'Series A', 'Data Room'],
    title: 'Equity Fundraising',
    body: 'From structuring your round to closing the first cheque. We prepare the pitch, build the data room, identify the right investors, and run the process so you can focus on your business.',
  },
  {
    icon: 'Globe',
    tags: ['ECB', 'FDI', 'Export Finance', 'RBI Compliance'],
    title: 'Cross-Border Capital',
    body: 'External commercial borrowings, FDI structuring, and export finance — navigated through RBI compliance and placed with the right offshore or domestic partner.',
  },
]
```

Import icons: `import { Landmark, TrendingUp, Globe } from 'lucide-react'`

**Card structure:**

```tsx
// TOP ROW: icon square + tags
<div className="flex items-start justify-between mb-auto">
  {/* Icon */}
  <div className="liquid-glass h-11 w-11 rounded-[2px] flex items-center justify-center">
    <Icon size={20} className="text-white/80" />
  </div>
  {/* Tags */}
  <div className="flex flex-wrap gap-1.5 justify-end max-w-[60%]">
    {tags.map(tag => (
      <span key={tag} className="liquid-glass rounded-[2px] px-3 py-1 text-[11px] text-white/80 whitespace-nowrap Inter">
        {tag}
      </span>
    ))}
  </div>
</div>

{/* SPACER */}
<div className="flex-1 min-h-[2rem]" />

{/* BOTTOM: title + body */}
<div>
  <h3
    className="text-3xl md:text-4xl font-bold italic tracking-[-0.02em] leading-none text-white mb-3"
    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
  >
    {title}
  </h3>
  <p className="text-sm text-white/70 font-light leading-relaxed max-w-[32ch] Inter">
    {body}
  </p>
</div>
```

---

## Design Constraints (Non-Negotiable)

- `border-radius`: maximum `2px` (`rounded-[2px]`) — no `rounded-xl`, `rounded-2xl`, `rounded-full` on cards
- No borders via `border` Tailwind classes — glass `::before` handles the stroke
- Mustard accent (`text-accent` / `bg-accent`) used only on: eyebrow dot, "Book a Call" button, stat icon — nowhere else
- No looping animations. `FadingVideo` fade-out/in is the only ongoing motion.
- `BlurText` triggers once on viewport entry — never replays
- All `motion.*` elements use `once: true` in `useInView`
- Copy rule: no em dashes, no "seamless / empower / unlock / revolutionary" — copy above is pre-approved

---

## Files to Edit / Create

- **Edit:** `src/pages/Founders.tsx` — replace existing content with both sections
- **Create:** `src/components/FadingVideo.tsx`
- **Create:** `src/components/motion/BlurText.tsx` (if not already present)
- **Edit (conditional):** `src/index.css` — add `.liquid-glass` and `.liquid-glass-strong` only if not already defined
- **Do not touch:** `Layout.tsx`, `Navbar.tsx`, `App.tsx`
