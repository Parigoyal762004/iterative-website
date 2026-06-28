# Prompt 02 — Home Page: Hero + About + Outcomes Sections
> Ready-to-use agent prompt for `src/pages/Home.tsx`

---

## Task

Build three production-ready sections for the Akro Ventures homepage in React + TypeScript + Tailwind CSS. Use `framer-motion` for animations and `lucide-react` for icons. Match every layout, interaction, and style detail exactly as specified. Do not use the `shaders` package — it is not installed and not appropriate for Akro's editorial aesthetic.

Edit `src/pages/Home.tsx` directly. Do not create separate page files.

---

## Fonts

Already loaded. Do not add new imports.
- Display: `'Playfair Display', Georgia, serif`
- Body/UI: `'Inter', system-ui, sans-serif`

---

## CSS Variables Available (from `src/index.css`)

```css
--color-charcoal:  hsl(0 0% 17%)      /* #2B2B2B */
--color-teal:      hsl(184 29% 35%)   /* #3F6F73 */
--color-mustard:   hsl(44 89% 48%)    /* #F2B705 */
--color-cream:     hsl(100 11% 96%)   /* #F4F6F2 */
--color-white:     hsl(0 0% 100%)
--color-muted:     hsl(220 9% 46%)    /* #6B7280 */
--color-border:    hsl(220 13% 91%)   /* #E5E7EB */
--background, --foreground, --primary, --accent, --border, --ring (semantic tokens)
```

Use `bg-primary` (teal), `bg-accent` (mustard), `text-foreground` (charcoal), `bg-secondary` (cream), etc. — not arbitrary hex values.

---

## Global Button Hover Animation (Text Roll)

Used on multiple CTAs. Implement once as a local `RollButton` component:

```tsx
// Props: label, variant ('primary' | 'ghost-light'), href (optional), onClick (optional)
// 'primary' = mustard bg, charcoal text → charcoal bg, white text on hover
// 'ghost-light' = white border, white text → white bg, charcoal text on hover

function RollButton({ label, variant, href, onClick }: RollButtonProps) {
  // Inner text is duplicated in a flex-col overflow-hidden h-[1.25rem] container
  // On group-hover: translateY(-50%) over 500ms cubic-bezier(0.25,0.1,0.25,1)
  // Arrow icon in a circle, rotates -45deg on group-hover
  // All buttons: borderRadius 2px, Inter 600, uppercase, letterSpacing 0.06em, fontSize 0.75rem
}
```

---

## SECTION 1 — HERO (Full Viewport Height)

### Background

`bg-background` (white), `min-h-screen`, `relative`, `overflow-hidden`.

No animated shader. Instead:
- A CSS-only diagonal lines overlay (`.bg-diagonal-lines` — already defined in `index.css`) applied as an `absolute inset-0 pointer-events-none` div at `zIndex: 1`, `opacity: 0.04`.
- This is subtle texture, not decoration.

### Navigation

`position: relative`, `zIndex: 20`. A pill-shaped container: `bg-white`, `rounded-full` (but note: Akro uses max 4px radius — use `rounded-[4px]` if Tailwind `rounded-sm` is 2px in config; check `tailwind.config.ts`).

Actually Akro has sharp corners — navbar is NOT pill-shaped. Use:
- `border-b border-border` — standard sticky navbar with bottom border
- `bg-white/95 backdrop-blur-sm` once scrolled past 40px
- `sticky top-0 z-50`

Layout: `max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between`

**LEFT side:**
- `<Logo />` component from `src/components/Logo.tsx` — already exists, import it
- Nav links (hidden on mobile, shown `md:flex`): `"For Founders"`, `"For Investors"`, `"About"`, `"Insights"` — `text-sm text-foreground hover:text-primary transition-colors duration-200`, `gap-8`

**RIGHT side (hidden mobile, shown `md:flex`):**
- Clock + London time: `<Clock size={14} />` from lucide-react + `"{HH:MM} London"` — updates every second, `new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' })`
- Text: `"Available for Q3 2026"` — `text-xs text-muted-foreground hidden lg:block`
- CTA button: `<RollButton label="Book a Call" variant="primary" />` — opens `https://calendly.com/akroventures-info/30-min-stand-up-call` in new tab

**MOBILE:** Hamburger `<Menu size={20} />` / `<X size={20} />` toggle. Opens a bottom sheet overlay (see below).

**Mobile Menu Overlay:**
- `fixed inset-0 z-50`
- Black/60 backdrop
- White bottom sheet: `mx-3 mb-3 rounded-[4px]` (NOT rounded-2xl — Akro uses sharp corners)
- Slides up: `translateY(100%) → translateY(0)`, `duration-500`, `ease-[cubic-bezier(0.32,0.72,0,1)]`
- Contents: time badge (teal), nav links (`text-2xl font-medium font-display`), `"Book a Call"` button with `<ArrowRight />`
- Close on backdrop click or `<X>` button

### Hero Content

`zIndex: 20`, positioned at bottom of viewport: `flex flex-col`, `flex-1` spacer above content.

`max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20`

**Eyebrow label:**
```tsx
<span className="t-label text-accent uppercase tracking-[0.18em] mb-5 sm:mb-8 block">
  Capital Advisory
</span>
<div className="w-10 h-0.5 bg-accent mb-6" />
```

**Headline `<h1>`:**
```
"We get Indian  
businesses funded."
```
- `font-family: Playfair Display`
- `font-size: clamp(1.75rem, 7vw, 4.2rem)` on mobile, `clamp(2.5rem, 5vw, 4.2rem)` on `sm+`
- `font-weight: 700`, `line-height: 1.08`, `letter-spacing: -0.03em`
- `color: hsl(var(--foreground))` (charcoal)
- Use `<br className="hidden sm:block" />` with `<span className="sm:hidden"> </span>` for responsive line breaks

**CTA row:** `mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5`

1. **Primary CTA:** `<RollButton label="Start your raise" variant="primary" href="/contact" />`

2. **Secondary:** `<RollButton label="Check your loan readiness" variant="ghost" href="/loan-audit" />`
   - `variant="ghost"` = `border-accent text-accent hover:bg-accent hover:text-foreground`, `border-[1.5px]`

3. **Trust badge pill:**
   - `bg-white border border-border rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow`
   - `flex items-center gap-2 px-4 py-2`
   - Contents: Teal circle with `₹` symbol (white, bold), text `"₹200Cr+ placed"` (Inter 600, 13px), dark badge `"Track Record"` (10px, bg-foreground, text-white, `px-2 py-0.5 rounded-[2px]`)

---

## SECTION 2 — ABOUT / WHO WE ARE

`bg-secondary` (cream), `pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24`, `overflow-hidden`.

`max-w-[1280px] mx-auto`

### Badge Row

`px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8`

- Number circle: `w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-foreground text-white flex items-center justify-center text-[11px] font-semibold` — shows `"01"`
- Pill label: `"About Akro"` — `text-xs font-medium border border-border rounded-[2px] px-3 sm:px-4 py-1 sm:py-1.5`

### Heading `<h2>`

`"Advisory that structures / your raise before you / start pitching."`

- Same clamp sizing as hero h1
- `font-medium leading-[1.12] tracking-[-0.02em] text-foreground mb-12 sm:mb-16 lg:mb-28`
- Playfair Display

### Content Area

**Mobile / Tablet (`lg:hidden`):** Stacked layout — paragraph + button, then images.

- Paragraph: `"Most founders approach lenders too early, with the wrong structure, and leave empty-handed. We build the capital case first — the right instrument, the right lender, the right timing — then we make introductions that close."` — `text-[0.9375rem] leading-[1.65] font-medium text-foreground`
- Button: `<RollButton label="How we work" variant="primary" href="/founders" />`
- Two images side by side (`sm:flex-row gap-4`):
  - First: `sm:w-[45%] aspect-[438/346] rounded-[2px] object-cover`
  - Second: `sm:w-[55%] aspect-[3/2] rounded-[2px] object-cover`

**Desktop (`hidden lg:grid`):** `grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8`

- Left col (`self-end`): Small image, `aspect-[438/346] rounded-[2px] object-cover`
- Center col (`self-start flex flex-col items-start`): Paragraph (`text-base leading-[1.65] whitespace-nowrap`) + `<RollButton />`
- Right col (`self-end`): Large image, `aspect-[3/2] rounded-[2px] object-cover`

**Image URLs:**
```ts
const IMG_SMALL = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85'
const IMG_LARGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'
```

Both images: `loading="lazy" decoding="async"`. Apply `filter: brightness(0.88) saturate(0.9)` for editorial mood (Akro image treatment rule).

---

## SECTION 3 — FEATURED SERVICES / CASE STUDIES

`bg-[hsl(var(--background))]` (white), `pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28`.

`max-w-[1280px] mx-auto`

### Badge Row

Same pattern as Section 2, number `"02"`, label `"What we do"`.

### Heading `<h2>`

`"Our services"`

- Same clamp sizing, `font-medium leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14 lg:mb-16`

### Cards Grid

`grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12`

**Card 1 — Business Loans:**
- Panel container: `aspect-[329/246] rounded-[2px] overflow-hidden bg-primary group cursor-pointer relative`
- Background: `bg-primary` (teal), fill with CSS diagonal lines overlay at 8% opacity (same `.bg-diagonal-lines` class)
- Center content: eyebrow `"Secured & Unsecured"` (white/70, `.t-label`), metric `"₹10L → ₹50Cr"` (white, Playfair Display, `clamp(2rem, 5vw, 3.5rem)`, 700), subtext `"Working capital · Term loans · OD limits"` (white/75, 13px Inter)
- Hover expand button (`absolute bottom-4 left-4`): A charcoal circle (`h-9 w-9 bg-foreground`) that expands to `w-[148px]` on `group-hover` (`transition-all duration-300`). Contains `"Learn more"` text (13px, white, `opacity-0 group-hover:opacity-100 delay-100`) and `<ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />`
- Description: `"Secured and unsecured loans for operating businesses with revenue history."` — `text-xs sm:text-[0.8125rem] text-muted-foreground mt-4 leading-relaxed`
- Title: `"Business Loans"` — `text-sm font-semibold text-foreground mt-1`

**Card 2 — Startup Fundraising:**
- Panel container: `aspect-square rounded-[2px] overflow-hidden bg-foreground group cursor-pointer relative`
- Background: `bg-foreground` (charcoal), subtle cream grid lines overlay at 4% opacity
- Center content: eyebrow `"Equity Advisory"` (white/70), metric `"Pre-seed → Series A"` (white, Playfair Display italic), subtext `"Pitch · Data room · Lender intros"` (white/75)
- Hover expand button: A mustard/accent circle (`bg-accent`) that expands to `w-[168px]` on hover. Contains `"View service"` text (charcoal, font-medium) and `<ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 ..." />`
- Description: `"From structuring your round to closing the first cheque — we run the process."` — same style as Card 1
- Title: `"Startup Fundraising"` — same style as Card 1

---

## Technical Details

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS 3.4 (existing config in `tailwind.config.ts` — do not modify)
- **Packages:** `framer-motion` (already installed), `lucide-react` (already installed)
- **Icons needed:** `ArrowRight`, `Clock`, `Menu`, `X` from `lucide-react`
- **All animations:** `duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]` unless noted
- **Max content width:** `1280px`, centered `mx-auto`
- **Responsive breakpoints:** Default Tailwind (`sm: 640px`, `md: 768px`, `lg: 1024px`)
- **Live clock:** Updates every second via `useEffect` + `setInterval`, London timezone

---

## Design Constraints (Non-Negotiable)

- Max `border-radius`: 4px (`rounded-[2px]` or `rounded-[4px]`) — check `tailwind.config.ts`; never `rounded-xl`, `rounded-2xl`, `rounded-full` on cards
- No glassmorphism, no neon, no glowing gradients, no blobs
- No looping decorative animations
- No stock photos of handshakes, meetings, or suits
- Hover states: 100–200ms max
- Mustard (`bg-accent`) is used sparingly — only on primary CTAs and eyebrows
- Never `bg-primary` and `bg-accent` both visible in the same section
- All body copy: Inter. All display headings, italic, and the ghost text: Playfair Display
- All scroll reveals: `once: true` — never re-trigger on scroll back up
- Images: `loading="lazy" decoding="async"` + `alt` text always

---

## Files to Edit

- `src/pages/Home.tsx` — add all three sections; replace or extend existing content
- Do NOT touch: `src/components/layout/Layout.tsx`, `src/components/layout/Navbar.tsx` (Navbar already exists — if this prompt rebuilds nav, check that the existing `Navbar.tsx` is not duplicated)

**Note on Navbar:** The existing `Navbar.tsx` in `src/components/layout/` already handles the scroll-aware behaviour and mobile drawer. Do not rebuild it inside `Home.tsx`. If the spec above conflicts with the existing Navbar, defer to `Navbar.tsx` — update it there, not in Home.
