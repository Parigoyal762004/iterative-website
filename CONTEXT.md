# Akro Ventures Website — Session Context

## Project Overview

**Stack:** React 18 + TypeScript + Vite SPA, React Router v6, Tailwind CSS v3, Supabase JS v2  
**Repo location:** `C:\Users\Admin\Downloads\akro-alchemy-main\akro-alchemy-main`  
**Live site:** https://akro-website.vercel.app/  
**Old site:** https://www.akroventures.com/  
**Purpose:** Lead generation for Akro Ventures — a capital advisory firm helping Indian SMEs and startups raise debt and equity

---

## Design System

### Typography
- **Headings:** Cormorant Garamond (serif, editorial weight)
- **Body/UI:** Inter (variable, clean)
- **Code/mono accents:** monospace stack

### Color Tokens (CSS variables)
- `--primary`: deep navy/dark background for hero sections
- `--accent`: gold (#C9A84C or similar) — used for all highlighted text, borders, icons
- `--background`: off-white/cream for content sections
- `--border`: subtle gray
- `--muted-foreground`: gray for body copy
- `--secondary`: very light tint for alternating section backgrounds

### Design Principles
- **Zero border-radius** — sharp edges everywhere
- `card-editorial`: white card + 1px border + 2px left gold accent border
- `eyebrow`: small caps, tracked, gold — used above every section heading
- `divider-gold`: 40px wide 2px gold horizontal rule
- Grid layouts: border-collapsed (items share borders via `border-t border-l` on container + `border-b border-r` on items)
- Stagger animations via `.stagger` class on grid containers

### CSS Hero Texture Classes (in src/index.css)
Each page has a unique CSS-only hero background pattern:
```css
.hero-ledger      /* horizontal lines — about page */
.hero-columns     /* vertical columns — services page */
.hero-dot-fine    /* fine dot matrix — resources page */
.hero-graph       /* graph paper grid — calculator page */
.hero-bloom       /* warm radial gradient — contact page */
.hero-arcs        /* concentric score arcs — loan audit page */
```
Home hero uses `.bg-diagonal-lines` (pre-existing class).

### Animation Classes
- `reveal` — fade+translate up on scroll enter (IntersectionObserver, `useReveal` hook)
- `reveal-left` / `reveal-right` — directional slide in
- `reveal-scale` — scale from 0.96 to 1
- `stagger` — cascades delay across children with `:nth-child` selectors
- All animations use `useReveal()` hook called at component top level

---

## File Structure (key files)

```
src/
  components/
    Navbar.tsx          — scroll progress bar (direct DOM ref, 60fps)
    MagneticButton.tsx  — custom button with magnetic hover effect
    Footer.tsx
    Layout.tsx          — wraps all pages, calls requestIdleCallback for route prefetch
  hooks/
    useReveal.ts        — IntersectionObserver-based scroll animation system
  pages/
    Home.tsx            — main landing page
    About.tsx           — team + founders + timeline
    Services.tsx        — 6 service cards + FAQ
    Resources.tsx       — article grid + newsletter
    Calculator.tsx      — loan/equity calculator with Chart.js donut
    Contact.tsx         — 3-step wizard form
    LoanAudit.tsx       — 4-question quiz + contact capture
  lib/
    supabase.ts         — Supabase client init
  index.css             — all global styles, CSS variables, utility classes
```

---

## Supabase Tables

| Table | Columns |
|-------|---------|
| `contact_submissions` | name, email, phone, company, industry, revenue_lakhs, funding_amount, message |
| `loan_audit_submissions` | name, email, phone, q1_answer, q2_answer, q3_answer, q4_answer, score |
| `newsletter_subscriptions` | email (unique constraint — 23505 error = already subscribed) |

---

## Per-Page Current State

### Home (`/`)
- **Hero:** City night image bg + diagonal lines overlay, eyebrow "Capital Advisory", heading "We get Indian businesses funded.", CTA to /contact and /loan-audit
- **Social proof bar:** 50+ Founders · $10M+ Capital · 40+ Lenders (horizontal strip)
- **What we do:** 2-col layout — WordRotator cycling service names on left, 2×2 stats grid on right (`$10M+`, `95%`, `50+`, `40+`)
- **Services grid:** 6 cards, icon + title + one-line summary + "Learn more →", links to /services
- **Testimonials:** 3-col card grid, ALWAYS VISIBLE (no accordion, no carousel). Each card: 5 stars → outcome metric (bold gold) → quote → avatar initials + name/role
- **CTA strip:** dark bg, "Raise capital the smart way."
- **How it works:** 3 steps (horizontal on desktop)
- **Loan Audit CTA:** full-width dark section

### About (`/about`)
- **Hero:** `hero-ledger` texture, eyebrow "About"
- **Two founder cards:** side by side, `reveal-left` / `reveal-right`, initials avatar, bio
- **Trust section:** dark bg + `hero-ledger` overlay (60% opacity), 4 stats: 50+ founders, $10M+, 40+ lenders, zero upfront
- **Timeline:** 4 milestone items in stagger (2020–2023)
- **Mission / Vision:** side by side editorial cards
- **Values:** 4-col grid
- **Fees:** transparent fee card (success-only model)
- **CTA:** navigate to /contact

### Services (`/services`)
- **Hero:** `hero-columns` texture
- **Capital range signal:** above grid — "₹10L → ₹100Cr+" and "Pre-Seed → Infrastructure Scale"
- **6 service cards:** icon + title + summary + detail + highlights (CheckCircle2 list) + "Best for:" — uses `reveal-scale` + `hover:-translate-y-1 hover:shadow-lg hover:z-10`
- **Editorial image break:** `imgBuildings` photo with quote overlay — "The right structure unlocks capital others said wasn't there."
- **CTA section:** navigate to /contact
- **FAQ:** accordion (Plus icon rotates 135°), 6 questions

### Resources (`/resources`)
- **Hero:** `hero-dot-fine` texture
- **Marquee:** 8 topic tags scrolling infinitely
- **Filter tabs:** All / Funding / Strategy / Market / Legal
- **Featured article:** 5-col split card (dark left panel with dot-fine texture + copy panel)
- **Article grid:** remaining articles in 2-3 col bordered grid
- **Newsletter section:** email capture → `newsletter_subscriptions` table, toast feedback

### Calculator (`/calculator`)
- **Hero:** `hero-graph` texture, headline "Model your deal before you talk to a lender."
- **2-col layout:** inputs left, Chart.js donut + summary right
- **Input fields:** plain `border border-border` (NOT card-editorial — removed gold left borders from field groups)
- **Loan types:** Working Capital, Term Loan, Overdraft, Equipment Finance

### Contact (`/contact`)
- **Hero:** `hero-bloom` texture, "Let's Talk Capital."
- **3-step wizard:**
  - Step 1: Name, Email, Phone
  - Step 2: Company, Industry (pills), Monthly Revenue (range slider with `fmt()` helper)
  - Step 3: Funding amount (pill grid), optional message textarea
- **Success state:** "Application Received" / "We'll be in touch." — names Rohit + Akshita, references user email, "Not a bot. Not a template reply." + Browse Resources link
- **Right column:** Calendly card (`CALENDLY_URL` const at top of file), Direct lines (email/phone/address), Social links, Pan-India presence card
- **NO "Quick Gauge" section** — deleted entirely (was a placeholder with slider that submitted nothing)

### Loan Audit (`/loan-audit`)
- **Hero:** `hero-arcs` texture, "Is your business actually loan-ready?"
- **4-question quiz:**
  - Q1: How long has your business been operating? (0/8/17/25 pts)
  - Q2: Average monthly revenue? (0/8/17/25 pts)
  - Q3: Are last 2 years ITR filed? (0/10/25 pts)
  - Q4: How ready is loan documentation? (0/8/17/25 pts)
- **Contact stage:** Name, Email, Phone → submits to `loan_audit_submissions`
- **Done stage:** Score display (pct%), animated score bar, tier messaging (≥75 / ≥50 / <50), CTA to /contact and /services
- **"What happens next" section:** hidden on done stage, shows 4-step process

---

## All Changes Made This Session

### Navbar.tsx
- Replaced React state scroll progress (`scrollPct` + `setScrollPct`) with direct DOM ref
- Progress bar now uses `transform: scaleX()` + `will-change: transform` for GPU-composited 60fps animation
- Added `progressRef = useRef<HTMLDivElement>(null)`
- Scroll handler: `progressRef.current.style.transform = scaleX(${pct})`
- JSX: full-width div with `origin-left`, initial `transform: scaleX(0)`

### index.css
- Added 6 hero texture classes: `hero-ledger`, `hero-columns`, `hero-dot-fine`, `hero-graph`, `hero-bloom`, `hero-arcs`

### Home.tsx
- Added `useEffect` back to imports (had been removed, crashing page — WordRotator uses two useEffects)
- Removed auto-advancing testimonials carousel
- Removed old accordion testimonials
- Added testimonials with `metric` field as outcome headline
- Replaced SVG graphic with 2×2 stats grid (dark panel, font-mono numbers)
- Removed `imgBuildings` and `imgGrowth` imports, kept `imgCityNight`
- Hero uses `.bg-diagonal-lines` overlay

### About.tsx
- Removed `imgBuildings` and `heroBg` imports
- Added `hero-ledger` to hero section
- Added `hero-ledger` overlay to trust/stats section
- Applied directional reveal classes (`reveal-left`, `reveal-right`) to founder cards
- Wrapped timeline items in `stagger`

### Services.tsx
- Removed `heroBg` import, kept `imgBuildings` (used in editorial break only)
- Added `hero-columns` to hero
- Added capital range signal bar above service grid
- Applied `reveal-scale` + enhanced hover states to service cards

### Resources.tsx
- Removed `imgBuildings` import entirely
- Added `hero-dot-fine` to hero
- Enhanced featured article left panel with descriptive copy + `hero-dot-fine` texture

### Calculator.tsx
- Removed `imgBuildings` import
- Added `hero-graph` to hero
- Changed headline to "Model your deal before you talk to a lender."
- Changed Field component containers from `card-editorial` to `border border-border`

### Contact.tsx
- Removed `imgBuildings` import, removed `teaser` state
- Added `hero-bloom` to hero
- Rewrote success state (Application Received + personal names + not-a-bot line)
- Deleted entire "Quick Gauge" / funding teaser section

### LoanAudit.tsx
- Added `hero-arcs` to hero
- Added score display to done stage (pct%, animated bar, tier messaging)
- Score was previously calculated but never shown to user

---

## What Was NOT Done (Pending)

1. **Count-up animation on stats** — Home page stats ($10M+, 95%, etc.) are static text; animated counter on scroll-enter would add more impact
2. **About page thesis quote** — "Capital should follow competence, not collateral" is in the editorial break; could be elevated
3. **Verify founder photos** — Check if `/public/team/rohit.jpg` and `/public/team/akshita.jpg` exist; cards have initials fallback but real photos would be better
4. **Verify Calendly URL** — `https://calendly.com/akroventures/discovery` hardcoded in Contact.tsx (line 4) — needs confirmation
5. **Animation coherence pass** — directional animation rules partially applied but not fully consistent across all pages
6. **Market / Legal filter tabs** — Resources page has "Market" and "Legal" filter categories but no articles tagged with those categories yet

---

## Key Technical Notes

- `useReveal()` must be called at the top of every page component — it sets up IntersectionObserver for `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` classes
- `useLayoutEffect` in `useReveal` handles synchronous above-fold animation before first paint
- `requestIdleCallback` in `Layout.tsx` prefetches all route chunks after mount
- The `.stagger` class + CSS `:nth-child` selectors create cascade delays without JS
- Supabase client is in `src/lib/supabase.ts` — uses env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- `MagneticButton` variants: `"teal"` (filled accent), `"ghost-light"` (white outline for dark backgrounds)
- `fmt()` function in Contact.tsx formats rupee amounts from slider value (1–10000 lakhs)
- `CALENDLY_URL` constant at line 4 of Contact.tsx is the only hardcoded external URL
