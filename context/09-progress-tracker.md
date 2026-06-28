# 09 — Progress Tracker
> Akro Ventures Website V2 · Roadmap, Bugs & Technical Debt  
> Last updated: June 2026

---

## Overall Status

| Phase | Status | Completion |
|---|---|---|
| Phase 1 — Foundation | Complete | 100% |
| Phase 2 — Core pages | Complete | 100% |
| Phase 3 — V2 Redesign | In Progress | ~70% |
| Phase 4 — Insights CMS | Pending | 0% |
| Phase 5 — Investors | Pending | 0% |
| Phase 6 — Polish | Pending | 10% |

---

## Phase 3 Checklist — V2 Redesign

### Design System
- [x] V2 colour tokens (charcoal/teal/mustard/cream)
- [x] Font switch to Playfair Display + Inter
- [x] `primitives/` component library built
- [x] `motion/` Framer Motion components built
- [x] Button 5-variant component
- [x] Card 4-variant component
- [ ] Migrate all page components to use new primitives (currently some pages mix old patterns)

### Navigation
- [x] V2 navbar structure: For Founders | For Investors | About | Insights | Login | Book a Call
- [x] Scroll progress bar (GPU-composited)
- [x] Mobile drawer (charcoal, 320px)
- [ ] Active page underline — mustard scaleX animation on mount
- [ ] Hover underline — mustard scaleX on hover

### Home Page
- [x] Hero: two-column, white bg, text left + image panel right
- [x] Journey section: cream bg, founders/investors split
- [x] Outcomes: asymmetric 3fr/2fr case study grid
- [x] Process: charcoal bg, 4 numbered steps
- [x] Stats: cream bg, watermark "04", 4-cell grid
- [x] CTA: teal bg, "Talk to Rohit or Akshita."
- [ ] **Founder portraits in CTA** — `akshita.png` + `rohit.png` — READY TO IMPLEMENT
- [ ] **Count-up animation on stats** — scroll-triggered counters
- [ ] **Custom hero SVG component** — replace `img-hero-panel.png` with animated SVG

### Founders Page
- [x] Hero
- [x] 6 service entries
- [ ] Verify all service card links to `/assess/*` tools
- [ ] Add founder-specific social proof or lender logos

### About Page
- [x] Playfair Display headings
- [x] Founder cards with directional reveals
- [x] Stats section
- [x] Timeline (4 milestones)
- [x] Mission/Vision cards
- [x] Values grid
- [x] Fees card
- [ ] Add Pari Goyal to team section

### Asset Cleanup
- [ ] Delete dead assets: `img-growth.jpg`, `img-strategy.jpg`, `img-meeting.jpg`, `img-pattern.jpg`, `brand-pattern.jpg`
- [ ] Confirm status of `hero-bg.jpg`, `img-buildings.jpg`, `img-data-network.jpg` before removing

---

## Phase 4 Checklist — Insights CMS

- [ ] `src/lib/sanity.ts` — Sanity client setup
- [ ] Set env vars: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`
- [ ] Insights index page — fetch + TanStack Query
- [ ] Insight article page (`/insights/:slug`)
- [ ] Portable Text renderer component
- [ ] Category filter tabs (All / Funding / Strategy / Market / Legal)
- [ ] Featured article layout (first post pinned)
- [ ] Article card component
- [ ] Loading skeleton for article grid
- [ ] Error fallback
- [ ] Newsletter capture at page bottom
- [ ] Train Pari on Sanity Studio publishing workflow

---

## Phase 5 Checklist — Investors

- [ ] Investors page hero
- [ ] Value proposition section
- [ ] Anonymised deal cards (3–4 examples)
- [ ] Track record / stats
- [ ] Investor application form
- [ ] `investor_applications` table in Supabase (schema in `02-architecture.md`)
- [ ] Investor form success state

---

## Phase 6 Checklist — Polish

- [ ] OG image (1200×630px) — charcoal bg, "Capital, structured." in Playfair
- [ ] Unique `<title>` and `<meta description>` per route
- [ ] Favicon: verify SVG at 16×16 and 32×32; add 180×180 PNG for Apple touch icon
- [ ] Structured data JSON-LD (LocalBusiness schema)
- [ ] Keyboard navigation audit
- [ ] Screen reader test
- [ ] Colour contrast audit (WCAG AA)
- [ ] Lighthouse audit > 90 all pages
- [ ] `prefers-reduced-motion` audit
- [ ] Remove `lovable-tagger` devDependency
- [ ] Verify Calendly URL is correct: `https://calendly.com/akroventures-info/30-min-stand-up-call`
- [ ] Google Fonts `display=swap` confirmed on both fonts
- [ ] All images: `loading="lazy"` + `decoding="async"` + `alt`

---

## Feature Checklist (All Features)

### Lead Generation
- [x] Contact wizard (3 steps → Supabase)
- [x] Loan Audit quiz (4 questions + score → Supabase)
- [x] Newsletter subscription
- [ ] Investor application form

### Tools
- [x] Loan calculator with Chart.js
- [x] 6 assessment tools (`/assess/*`)

### Content
- [x] Testimonials (Home)
- [x] Case study outcomes (Home)
- [x] Team bios (About)
- [x] Company timeline (About)
- [x] FAQ (Founders page)
- [ ] Insights articles (Sanity CMS)

### Conversion
- [x] Calendly booking link (Navbar + Contact)
- [x] WhatsApp float button
- [x] CTA strips on all pages

---

## Bug Tracker

| ID | Bug | Status | Priority |
|---|---|---|---|
| B-01 | `favicon.jpg` is not a valid favicon format — browsers ignore JPG favicons | Open | Low |
| B-02 | `Market` and `Legal` filter tabs on Resources page have no articles — filter returns empty | Open | Low |
| B-03 | Home stats (`$10M+`, `95%`, etc.) are static text — count-up animation not yet implemented | Open | Medium |
| B-04 | Founder photos not shown in CTA section despite assets being available in `/public/team/` | Open | High |
| B-05 | Active nav underline animation not implemented — current page not visually indicated | Open | Medium |
| B-06 | `lovable-tagger` devDependency still in `package.json` — should be removed | Open | Low |

---

## Technical Debt

| ID | Item | Impact | Effort |
|---|---|---|---|
| TD-01 | Some page components still use V1 CSS reveal classes (`reveal`, `reveal-left`) instead of Framer Motion wrappers | Medium — inconsistent animation system | Medium |
| TD-02 | `img-hero-panel.png` is a static AI-generated PNG; should be replaced with coded SVG animation | Medium — resolution, brand integrity | High |
| TD-03 | Dead image assets in `src/assets/` pollute the bundle if imported accidentally | Low | Low |
| TD-04 | `QueryClientProvider` may not be set up if TanStack Query is not yet configured in `App.tsx` | Medium — blocks Sanity integration | Low |
| TD-05 | No OG image — site shares as a blank thumbnail on social | Medium — affects first impression on LinkedIn/WhatsApp | Low |
| TD-06 | Google Fonts loaded without `preconnect` hints — slight LCP impact | Low | Low |

---

## Known Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Sanity API rate limit (100k/month free) | Low — low traffic initially | Medium | TanStack Query caching; Sanity edge CDN |
| Framer Motion bundle size | Low — tree-shaking handles it | Low | Monitor bundle with `npm run build` |
| Calendly URL changes without code update | Medium | Medium | URL is a single const in `Contact.tsx` — easy to update |
| Team photos used in wrong context | Low | Medium | Visual Reference Plan specifies approved uses only |
| Mobile performance on low-end Android | Medium | High | Test with `prefers-reduced-motion`; disable parallax |

---

## Future Improvements (Post-V2)

| Item | Value | Notes |
|---|---|---|
| Client portal (`/portal`) | High | Authenticated deal tracking for active clients |
| Email notifications on form submission | High | Supabase edge function or Resend integration |
| Sanity real-time preview | Medium | For Pari to preview drafts before publishing |
| Multi-language support (Hindi) | Low | Not in current scope |
| Analytics (Plausible or Fathom) | Medium | Privacy-first analytics; no cookie consent needed |
| Case study deep-dive pages | High | `/case-studies/:slug` — individual deal narratives |
| Lender directory or map | Low | "40+ lenders" could link to an anonymised breakdown |
| Referral tracking | Medium | UTM parameters → Supabase for lead source attribution |

---

## Next Session Priority Queue

Run these in order at the start of the next development session:

1. **Implement founder portraits in Home CTA section** (B-04) — assets ready, no blockers
2. **Add count-up animation to Home stats** (B-03) — `CountUp` component, scroll-triggered
3. **Fix active nav underline** (B-05) — `scaleX` animation from left on current route
4. **Set up Sanity client** (`src/lib/sanity.ts`) and env vars — unblocks Phase 4
5. **Remove dead image assets** — `img-growth.jpg`, `img-strategy.jpg`, `img-meeting.jpg`, `img-pattern.jpg`, `brand-pattern.jpg`
6. **Remove `lovable-tagger` devDependency** (B-06, TD) — one-line fix
