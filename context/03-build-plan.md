# 03 — Build Plan
> Akro Ventures Website V2 · Implementation Roadmap

---

## Phase Overview

| Phase | Focus | Status |
|---|---|---|
| Phase 1 | Foundation & primitives | Complete |
| Phase 2 | Core pages (Home, About, Contact, tools) | Complete |
| Phase 3 | V2 redesign (journey split, design system upgrade) | In Progress |
| Phase 4 | Insights CMS integration | Pending |
| Phase 5 | Investors journey | Pending |
| Phase 6 | Polish & performance | Pending |

---

## Phase 1 — Foundation (Complete)

**Goal:** Stable, deployable SPA with routing, design tokens, and layout shell.

- [x] Vite + React 18 + TypeScript project scaffolding
- [x] Tailwind v3 configured with custom token extensions
- [x] `index.css` with CSS custom properties for all colour/spacing tokens
- [x] Supabase client initialised at `src/lib/supabase.ts`
- [x] React Router v6 with lazy-loaded routes
- [x] Layout shell: Navbar + Footer + WhatsAppFloat
- [x] Lenis smooth scroll via `SmoothScroll.tsx`
- [x] Error boundary
- [x] Vercel deployment (vercel.json)
- [x] All shadcn/ui primitives installed (Radix UI base)

---

## Phase 2 — Core Pages (Complete)

**Goal:** All primary user-facing pages functional with V1 design.

- [x] Home page (hero, social proof, services grid, testimonials, CTA strip, how-it-works)
- [x] About page (founder cards, stats, timeline, mission/values, fees)
- [x] Services page (V1 — now superseded by `/founders` in V2)
- [x] Contact wizard (3-step form → Supabase `contact_submissions`)
- [x] Loan Audit quiz (4 questions + score + contact capture → Supabase)
- [x] Calculator (loan model + Chart.js donut)
- [x] Resources page (article grid, newsletter capture)
- [x] 6 Assessment tool pages (`/assess/*`)
- [x] PortalComingSoon stub
- [x] NotFound page

---

## Phase 3 — V2 Redesign (In Progress)

**Goal:** Implement new design system, two-journey architecture, Framer Motion animation library, and Sanity CMS setup.

### 3.1 Design System Implementation
- [x] Update colour tokens to V2 palette (charcoal/teal/mustard/cream)
- [x] Switch display font from Cormorant Garamond → Playfair Display
- [x] Build `primitives/` component library (Container, Section, Heading, Paragraph, Divider, Badge, Grid)
- [x] Build `motion/` Framer Motion components (FadeIn, MaskReveal, HeroReveal, Stagger, ScrollReveal)
- [x] Button component with 5 variants
- [x] Card component with 4 variants
- [ ] Migrate all pages to use new primitives (replace inline Tailwind patterns)

### 3.2 Navigation V2
- [x] Navbar: "For Founders | For Investors | About | Insights | Login | Book a Call" structure
- [x] Scroll progress bar (GPU-composited via DOM ref)
- [x] Mobile drawer (320px, charcoal)
- [ ] Active page underline animation (mustard scaleX on mount)
- [ ] Hover underline animation (matching active state)

### 3.3 Home Page V2
- [x] Hero: two-column (text left, image panel right), white background
- [x] Journey section: cream bg, two-column text panels (founders vs investors split)
- [x] Outcomes section: asymmetric case study grid (3 real deal outcomes)
- [x] Process section: charcoal bg, "Not a funding problem. A structure problem." + 4 steps
- [x] Stats section: cream bg, watermark "04", animated counters, 4-cell grid
- [x] CTA section: teal bg, founder portraits (Rohit + Akshita), Calendly button
- [ ] **Founder portraits in CTA section** — `akshita.png` + `rohit.png` — HIGH PRIORITY
- [ ] **Count-up animation on stats** — scroll-triggered number counters
- [ ] **Custom hero SVG component** — replace `img-hero-panel.png` with animated SVG

### 3.4 Founders Journey Page (`/founders`)
- [x] Hero section
- [x] 6 service entry points with links to `/assess/*` tools
- [ ] Verify all service cards link correctly to assessment tools
- [ ] Add social proof (lender logos or stats) specific to founders

### 3.5 About Page V2
- [x] Playfair Display headings
- [x] Founder cards with directional reveals
- [x] Stats section with hero-ledger texture
- [x] Timeline (4 milestones)
- [x] Mission / Vision editorial cards
- [x] Values grid
- [x] Fees card
- [ ] Add Pari Goyal to team section (photo: `/public/team/pari.jpg`)

### 3.6 Dead Assets Cleanup
- [ ] Delete: `img-growth.jpg`, `img-strategy.jpg`, `img-meeting.jpg`, `img-pattern.jpg`, `brand-pattern.jpg`
- [ ] Confirm `hero-bg.jpg`, `img-buildings.jpg`, `img-data-network.jpg` status before deleting

---

## Phase 4 — Insights CMS (Pending)

**Goal:** Replace static article data with live Sanity CMS content.

- [ ] Sanity client at `src/lib/sanity.ts` (VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET)
- [ ] `@portabletext/react` renderer for article body
- [ ] Insights index page fetching from Sanity (`*[_type == "post"] | order(publishedAt desc)`)
- [ ] Insight article page (`/insights/:slug`) fetching single post
- [ ] TanStack Query wrapping all Sanity fetches (cache, loading, error states)
- [ ] Category filter tabs (All / Funding / Strategy / Market / Legal)
- [ ] Featured article (first/pinned post) with split-panel layout
- [ ] Article card component with cover image, excerpt, read time, category badge
- [ ] Empty state when no articles match a filter
- [ ] Error state if Sanity is unreachable
- [ ] Newsletter capture at bottom of Insights page

---

## Phase 5 — Investors Journey (Pending)

**Goal:** Build the `/investors` page and investor application flow.

- [ ] Investors hero section
- [ ] Value proposition for investors (deal flow, co-investment, track record)
- [ ] Anonymised deal cards (3–4 example deals, no company names)
- [ ] Track record / portfolio stats
- [ ] Investor application form → Supabase `investor_applications`
- [ ] Investor application success state

**Supabase table (new):**
```sql
create table investor_applications (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  name text not null,
  firm text,
  email text not null,
  phone text,
  investment_range text,
  interest_areas text[],
  message text
);
```

---

## Phase 6 — Polish & Performance (Pending)

**Goal:** Production-ready hardening, accessibility, SEO, and performance.

### Animation Pass
- [ ] Consistent `ScrollReveal` application across all pages
- [ ] Stagger delays audited (80–120ms between children, max 600ms total)
- [ ] `prefers-reduced-motion` tested — all durations collapse to 10ms
- [ ] No looping decorative animations anywhere

### SEO & Meta
- [ ] OG image (1200×630px) — charcoal bg, "Capital, structured." Playfair Display
- [ ] Unique `<title>` and `<meta description>` per page
- [ ] `robots.txt` confirms Vercel deployment
- [ ] Structured data (JSON-LD) for the firm (LocalBusiness schema)

### Assets
- [ ] Favicon: confirm SVG renders at 16×16, 32×32; add 180×180 PNG for Apple touch icon
- [ ] All images: `loading="lazy"`, `decoding="async"`, `alt` text
- [ ] Verify WebP availability for key images

### Accessibility
- [ ] Keyboard navigation audit (Tab order, focus rings)
- [ ] Screen reader test (landmark roles, button labels)
- [ ] Colour contrast audit (all combinations WCAG AA)

### Performance
- [ ] Lighthouse audit > 90 on all pages
- [ ] Google Fonts: confirm `display=swap` on both fonts
- [ ] Remove unused Radix UI primitives if bundle is large

### Final Cleanup
- [ ] Remove `lovable-tagger` devDependency
- [ ] Confirm Calendly URL is correct: `https://calendly.com/akroventures-info/30-min-stand-up-call`
- [ ] Confirm founder photo paths: `/public/team/rohit.png`, `/public/team/akshita.png`

---

## Feature Build Order (Next Session Priority)

1. **Founder portraits in Home CTA section** — highest-impact, assets ready
2. **Count-up animation on Home stats** — scroll-triggered, high impact
3. **Sanity CMS integration** — unblocks Pari's content publishing
4. **Investors page** — opens second revenue audience
5. **Custom hero SVG component** — replace static PNG with animated SVG
6. **OG image + favicon fix** — low effort, high share-moment value

---

## Risk Areas

| Risk | Mitigation |
|---|---|
| Sanity API quota (100k req/month free) | TanStack Query caching; Sanity CDN hits edge cache |
| Supabase anon key security | RLS insert-only policies; no sensitive data on public tables |
| Framer Motion bundle size | Tree-shake; only import used sub-modules |
| Lenis + Framer Motion conflict | Lenis uses passive listeners; no conflict reported |
| Mobile performance with animations | `prefers-reduced-motion` fallback; test on low-end Android |
| Calendly URL changing | Single const at top of `Contact.tsx`; update in one place |
