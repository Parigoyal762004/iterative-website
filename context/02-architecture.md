# 02 — Architecture
> Akro Ventures Website V2 · System Design Reference

---

## Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 (SPA) | Established, fast HMR, strong ecosystem |
| Build tool | Vite 5 + SWC | Fastest dev server; SWC for TS/JSX transforms |
| Language | TypeScript 5 (strict) | Full type safety across all layers |
| Routing | React Router v6 | Lazy-loaded routes via `React.lazy()` |
| Styling | Tailwind CSS v3 | Utility-first; custom tokens in `tailwind.config.ts` |
| Animation | Framer Motion 12 | Scroll reveals, page entrances, hero draw-on |
| Smooth scroll | Lenis 1.3 | Passive listener; no jank on mobile |
| State | React local state + TanStack Query | No global store needed; server state via TQ |
| Forms | React Hook Form + Zod | Schema-validated, progressive wizard |
| Database | Supabase (Postgres) | Auth-free form submissions; JS v2 client |
| CMS | Sanity (headless, separate project) | Pari publishes independently; GROQ queries |
| UI Primitives | Radix UI (via shadcn/ui) | Accessible, unstyled base components |
| Toast | Sonner | Lightweight, non-blocking notifications |
| Charts | Chart.js 4 + react-chartjs-2 | Calculator donut chart |
| Icons | Lucide React | Consistent, tree-shakeable |
| Deployment | Vercel | Zero-config, preview URLs, edge CDN |
| Testing | Vitest + Testing Library | Co-located unit/integration tests |

---

## System Boundaries

```
Browser (React SPA)
    │
    ├── Vercel CDN         ← Static asset delivery, edge routing
    │
    ├── Supabase           ← Form submissions (contact, audit, newsletter, investor)
    │   └── Postgres RLS   ← Row-level security; anon key for inserts only
    │
    ├── Sanity CDN         ← Insights content delivery (GROQ over HTTPS)
    │   └── Sanity Studio  ← Separate project; Pari publishes here
    │
    └── Calendly           ← External booking widget (new tab / popup)
```

---

## Folder Structure

```
Akro-Website-V2/
├── public/
│   ├── team/
│   │   ├── rohit.png          ← Approved for CTA section
│   │   ├── akshita.png        ← Approved for CTA section
│   │   └── pari.jpg           ← Team page
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── assets/                ← Static images imported by components
│   │   ├── img-hero-panel.png ← Hero right panel (interim; replace with SVG component)
│   │   ├── img-advisory.png   ← Two hands / documents (CTA bg candidate)
│   │   ├── img-city-night.png ← Construction / night (outcomes accent candidate)
│   │   └── logo.png
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx       ← Navbar + children + Footer + WhatsAppFloat
│   │   │   ├── Navbar.tsx       ← Sticky, scroll-aware, progress bar, mobile drawer
│   │   │   ├── Footer.tsx       ← 3-column footer
│   │   │   └── SmoothScroll.tsx ← Lenis initialiser (runs once at app root)
│   │   │
│   │   ├── motion/              ← Framer Motion wrapper components
│   │   │   ├── FadeIn.tsx       ← opacity 0→1 + translateY 24px→0
│   │   │   ├── MaskReveal.tsx   ← clip-path reveal left→right
│   │   │   ├── HeroReveal.tsx   ← text clip-mask up, hero-only
│   │   │   ├── ScrollReveal.tsx ← viewport-triggered FadeIn
│   │   │   └── Stagger.tsx      ← wraps children, staggers FadeIn
│   │   │
│   │   ├── primitives/          ← Design-system building blocks
│   │   │   ├── Container.tsx    ← max-w-[1280px] + padding
│   │   │   ├── Section.tsx      ← bg prop, section-y padding
│   │   │   ├── Heading.tsx      ← as, size, font props
│   │   │   ├── Paragraph.tsx    ← size, muted props
│   │   │   ├── Divider.tsx      ← gold/border variants
│   │   │   ├── Badge.tsx        ← mustard/teal/ghost/dark variants
│   │   │   └── Grid.tsx         ← cols 2/3/4, gap sm/md/lg
│   │   │
│   │   ├── forms/
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── Select.tsx
│   │   │
│   │   ├── ui/                  ← shadcn/ui components (do not modify)
│   │   ├── tools/               ← AssessmentEngine.tsx (shared across /assess/* pages)
│   │   ├── Button.tsx           ← 5 variants: primary/ghost/ghost-light/dark/link
│   │   ├── Card.tsx             ← 4 variants: content/deal/service/team
│   │   ├── Logo.tsx
│   │   ├── WhatsAppFloat.tsx    ← Fixed bottom-right WhatsApp bubble
│   │   └── ErrorBoundary.tsx
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   │
│   ├── lib/
│   │   ├── supabase.ts          ← Supabase client (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
│   │   ├── sanity.ts            ← Sanity client (VITE_SANITY_PROJECT_ID + VITE_SANITY_DATASET)
│   │   └── utils.ts             ← cn() helper (clsx + tailwind-merge)
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Founders.tsx
│   │   ├── Investors.tsx
│   │   ├── About.tsx
│   │   ├── Insights.tsx         ← index, fetches from Sanity
│   │   ├── Contact.tsx          ← 3-step wizard → contact_submissions
│   │   ├── Calculator.tsx       ← loan model + Chart.js
│   │   ├── LoanAudit.tsx        ← quiz → loan_audit_submissions
│   │   ├── PortalComingSoon.tsx ← stub
│   │   ├── NotFound.tsx
│   │   └── tools/               ← 6 assessment pages (/assess/*)
│   │       ├── UnsecuredLoansTool.tsx
│   │       ├── SecuredLoansTool.tsx
│   │       ├── ProjectFundingTool.tsx
│   │       ├── StartupFundraisingTool.tsx
│   │       ├── StartupConsultationTool.tsx
│   │       └── FdiEcbTool.tsx
│   │
│   ├── App.tsx                  ← Router, Suspense, lazy imports
│   ├── main.tsx
│   ├── index.css                ← CSS variables, global utilities, section rhythm
│   └── vite-env.d.ts
│
├── context/                     ← AI context files (this directory)
├── supabase-schema.sql          ← Full schema for local reference
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.app.json
└── vercel.json
```

---

## Component Responsibilities

### Layout.tsx
- Renders `<Navbar>`, `{children}`, `<Footer>`, `<WhatsAppFloat>`
- Calls `requestIdleCallback` to prefetch all lazy route chunks after mount
- Does NOT wrap with `<SmoothScroll>` — Lenis initialises inside `SmoothScroll.tsx` at app root

### Navbar.tsx
- Sticky, `z-50`
- Transparent on hero, white+border after 40px scroll
- Scroll progress bar: 2px mustard, `position: fixed z-100`, uses direct DOM ref + `transform: scaleX()` (GPU-composited, 60fps)
- Mobile: hamburger → 320px right drawer, charcoal bg
- "Book a Call" → opens Calendly URL in new tab
- "Login" → routes to `/portal` (muted grey, not CTA-styled)

### motion/* components
- All accept `className` passthrough and optional `delay` prop
- `ScrollReveal` uses Framer `useInView` with `once: true` — fires on enter, never re-triggers
- `Stagger` wraps children and passes stagger delay via `variants` children prop
- `HeroReveal` is page-load only (no scroll trigger) — fires immediately on mount

### primitives/*
- Stateless, no business logic
- Accept `as` prop for semantic HTML override (e.g. `<Heading as="h2">`)
- `Section` component applies `section-y` class (responsive vertical padding) and bg color

### AssessmentEngine.tsx
- Shared wizard engine across all 6 `/assess/*` tools
- Takes questions config as prop, manages step state, renders result

---

## Data Flow

```
User fills Contact form
    → React Hook Form + Zod validation
    → supabase.from('contact_submissions').insert(data)
    → Success: show "Application Received" state
    → Error: toast notification

User completes Loan Audit
    → Quiz state (local useState)
    → Contact stage (name/email/phone)
    → supabase.from('loan_audit_submissions').insert({...answers, score})
    → Score display with tier messaging

User subscribes to newsletter
    → supabase.from('newsletter_subscriptions').insert({email})
    → 23505 error code = already subscribed → show different toast

Insights page loads
    → sanityClient.fetch(GROQ query)
    → TanStack Query caches result
    → Renders article grid

Investor applies
    → supabase.from('investor_applications').insert(data)
```

---

## Database Boundaries

All Supabase operations use the **anon key** — only inserts are permitted. No reads from the browser. No updates or deletes. RLS policies enforce this.

| Table | Operation | Source |
|---|---|---|
| `contact_submissions` | INSERT only | Contact page wizard |
| `newsletter_subscriptions` | INSERT only | Resources/Insights page |
| `loan_audit_submissions` | INSERT only | Loan Audit page |
| `investor_applications` | INSERT only | Investors page form |

---

## Security Rules

- Supabase anon key is safe to expose client-side (RLS restricts to insert-only)
- No user sessions, no JWTs, no auth flows on the public site
- All env vars prefixed `VITE_` — they are bundled into client JS (acceptable for public keys)
- No server-side code — pure static SPA; no API routes
- Input validation via Zod before any Supabase call

---

## Architecture Principles

1. **No server.** This is a static SPA. Every interaction happens in the browser or via third-party APIs.
2. **Route-level code splitting.** Every page is `React.lazy()`. Prefetch happens via `requestIdleCallback`.
3. **One source of truth for design.** CSS custom properties in `index.css` drive all colours, spacing, and tokens. Tailwind consumes them.
4. **Primitives first.** All UI is assembled from `primitives/` + `motion/` components. No inline style chaos.
5. **Animation once.** Framer Motion `once: true` on all scroll reveals. No repeat-on-scroll behaviour.
6. **Lenis is passive.** Smooth scroll only. Never block scroll events.
7. **Sanity is read-only from this app.** Studio lives elsewhere. This repo never writes to Sanity.
