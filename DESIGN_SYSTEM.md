# Akro Ventures — Design System V2
> Source of truth. Every page, component, and interaction is built from this document.

---

## 1. Brand Personality

Akro Ventures is a capital advisory firm. Not a startup. Not a SaaS product.

The website should feel like:
- A well-designed annual report from a firm that knows what it is doing
- An advisory relationship, not a sales funnel
- Measured confidence, not aggressive persuasion
- Earned trust, not manufactured urgency

**Visitors should feel:** "We are speaking with experienced advisors."

**What we are not:** AI-generated, template-looking, generic SaaS, glassmorphism clone, Framer showcase.

---

## 2. Colour System

### Palette

| Token | Value | Usage |
|---|---|---|
| `--color-charcoal` | `hsl(0 0% 17%)` — `#2B2B2B` | Primary text, dark surfaces, footers |
| `--color-teal` | `hsl(184 29% 35%)` — `#3F6F73` | Brand primary, section headers, CTAs |
| `--color-mustard` | `hsl(44 89% 48%)` — `#F2B705` | Accent, dividers, active states, buttons |
| `--color-cream` | `hsl(100 11% 96%)` — `#F4F6F2` | Alt background, section breaks |
| `--color-white` | `hsl(0 0% 100%)` — `#FFFFFF` | Default background, cards |
| `--color-muted` | `hsl(220 9% 46%)` — `#6B7280` | Body copy, secondary text |
| `--color-border` | `hsl(220 13% 91%)` — `#E5E7EB` | Borders, dividers on light bg |

### Distribution rule
- **70%** white / cream / neutral
- **20%** charcoal
- **10%** mustard / teal (accent moments only)

### Semantic tokens (CSS custom properties)
```css
--background:          white          /* page default */
--foreground:          charcoal       /* default text */
--primary:             teal           /* brand primary */
--primary-foreground:  white
--accent:              mustard        /* highlight accent */
--accent-foreground:   charcoal
--secondary:           cream          /* alt surface */
--muted:               cream
--muted-foreground:    muted-grey
--border:              light-grey
--ring:                mustard        /* focus ring */
```

### Usage rules
- Never use `bg-teal` and `bg-mustard` in the same visual field
- Mustard is used for: eyebrows, divider lines, button fills, active nav states, icon accents
- Teal is used for: dark section backgrounds, primary CTA surfaces
- Cream is used for: alternating section backgrounds, card fills on dark surfaces

---

## 3. Typography

### Fonts
| Role | Family | Weights |
|---|---|---|
| Display / Headings | Playfair Display | 400 (italic), 700 |
| Body / UI | Inter | 400, 500, 600, 700 |

Loaded via Google Fonts CDN. Fallback: `Georgia, serif` / `system-ui, sans-serif`.

### Scale

| Class | Size (clamp) | Line height | Tracking | Use |
|---|---|---|---|---|
| `.t-display-xl` | clamp(3rem → 5rem) | 1.05 | -0.02em | Hero headline |
| `.t-display-l` | clamp(2.5rem → 4rem) | 1.08 | -0.02em | Section hero |
| `.t-display-m` | clamp(2rem → 3rem) | 1.10 | -0.01em | Section headline |
| `.t-heading-l` | clamp(1.5rem → 2.25rem) | 1.20 | -0.01em | Large subhead |
| `.t-heading-m` | clamp(1.25rem → 1.75rem) | 1.30 | -0.01em | Card title |
| `.t-heading-s` | clamp(1.125rem → 1.375rem) | 1.30 | — | Small subhead |
| `.t-body-xl` | 1.25rem | 1.60 | — | Lead paragraph |
| `.t-body-l` | 1.0625rem | 1.70 | — | Article body |
| `.t-body-m` | 0.9375rem | 1.65 | — | Standard body |
| `.t-body-s` | 0.8125rem | 1.60 | — | Captions, meta |
| `.t-label` | 0.6875rem | 1 | 0.18em | Eyebrows, tags (uppercase, 600) |
| `.t-mono` | 0.8125rem | 1 | 0.02em | Numbers, stats (tabular-nums) |

### Typography rules
- Headings: Playfair Display, always
- All UI text (labels, buttons, nav, forms): Inter
- Max prose width: 680px (`max-w-prose`)
- Leading lines: tight (1.05) for large display, relaxed (1.7) for body
- Tracking: negative on display, wide on labels only
- No text-transform on headings; uppercase only on `.t-label`

---

## 4. Spacing & Layout

### Section vertical rhythm

| Breakpoint | Padding block |
|---|---|
| Mobile (< 640px) | 4rem (64px) |
| Tablet (640–1023px) | 5rem (80px) |
| Desktop (≥ 1024px) | 7.5rem (120px) |

Apply via `.section-y` utility class.

### Container
- Max width: **1280px**
- Horizontal padding: `1.5rem` (24px) all breakpoints
- Applied via Tailwind's `container` class (reconfig'd to `max-w-[1280px]`)

### Grid system
- 12-column grid at desktop
- 4-column grid at tablet
- Single column at mobile
- Column gap: `2rem` desktop, `1.5rem` mobile

### Internal card spacing
- Card padding: `2rem` (32px) desktop, `1.25rem` (20px) mobile
- Stack gap inside card: `1rem` (16px)
- Section headline → body gap: `1.5rem` (24px)
- Section body → CTA gap: `2.5rem` (40px)

---

## 5. Border System

- Default radius: **2px** (sharp, not pill-shaped)
- Cards: `border: 1px solid hsl(var(--border))`
- Accent left border: `border-left: 2px solid hsl(var(--accent))`
- Dark surface cards: `border: 1px solid hsl(0 0% 100% / 0.10)`
- No `border-radius` larger than 4px anywhere in the design

---

## 6. Shadow System

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06)` | Subtle lift |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.08)` | Cards on hover |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.10)` | Modals, dropdowns |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.06)` | Default card |
| `--shadow-card-hover` | `0 4px 16px rgba(0,0,0,0.08)` | Card hover state |

No glow shadows. No coloured box-shadows.

---

## 7. Motion System

### Timing functions
| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | All exits and reveals |
| `--ease-in` | `cubic-bezier(0.64, 0, 0.78, 0)` | Elements leaving view |

### Duration scale
| Token | Value | Use |
|---|---|---|
| `--duration-micro` | 100ms | Hover colour/opacity |
| `--duration-quick` | 200ms | Button hover, icon swap |
| `--duration-standard` | 300ms | Nav transitions, modal open |
| `--duration-medium` | 450ms | Card reveals, tab switch |
| `--duration-slow` | 650ms | Section entrance, hero |

### Principles
- Every motion has a purpose: reveal, feedback, or transition
- No looping decorative animations
- Reduced motion: all durations collapse to 10ms via media query
- Entry animations fire once; no repeat on scroll up/down cycle
- Stagger delay: 80–120ms between children (never more than 600ms total)

### Animation library (Framer Motion components)

| Component | Behaviour | File |
|---|---|---|
| `<HeroReveal>` | Text clip mask up + fade, hero-only | `motion/HeroReveal.tsx` |
| `<FadeIn>` | Opacity 0→1 + translateY 24px→0 | `motion/FadeIn.tsx` |
| `<MaskReveal>` | Clip-path reveal left→right | `motion/MaskReveal.tsx` |
| `<Stagger>` | Wraps children, staggers FadeIn | `motion/Stagger.tsx` |
| `<ScrollReveal>` | Viewport-triggered FadeIn | `motion/ScrollReveal.tsx` |

---

## 8. Component Inventory

### Layout
| Component | Path | Description |
|---|---|---|
| `Layout` | `components/layout/Layout.tsx` | Navbar + children + Footer + WhatsApp |
| `Navbar` | `components/layout/Navbar.tsx` | Sticky, scroll-aware, mobile drawer |
| `Footer` | `components/layout/Footer.tsx` | 3-column footer |
| `SmoothScroll` | `components/layout/SmoothScroll.tsx` | Lenis initialiser |

### Primitives
| Component | Path | Variants / Props |
|---|---|---|
| `Container` | `primitives/Container.tsx` | `size?: "narrow" \| "default" \| "wide"` |
| `Section` | `primitives/Section.tsx` | `bg?: "white" \| "cream" \| "charcoal" \| "teal"` |
| `Heading` | `primitives/Heading.tsx` | `as`, `size: "xl"\|"l"\|"m"\|"s"`, `font: "display"\|"body"` |
| `Paragraph` | `primitives/Paragraph.tsx` | `size: "xl"\|"l"\|"m"\|"s"`, `muted?` |
| `Divider` | `primitives/Divider.tsx` | `color?: "accent"\|"border"`, `width?: number` |
| `Badge` | `primitives/Badge.tsx` | `variant: "mustard"\|"teal"\|"ghost"\|"dark"` |
| `Grid` | `primitives/Grid.tsx` | `cols?: 2\|3\|4`, `gap?: "sm"\|"md"\|"lg"` |

### Buttons
| Variant | Surface | Use |
|---|---|---|
| `primary` | Mustard bg, Charcoal text → hover Charcoal bg, White text | Main CTA |
| `ghost` | Mustard border, Mustard text → hover Mustard bg | Secondary on light bg |
| `ghost-light` | White border, White text → hover White bg, Charcoal text | Secondary on dark bg |
| `dark` | Charcoal bg, White text → hover Teal bg | Tertiary, footer CTAs |
| `link` | No border, text-only with underline animation | In-text actions |

All buttons: `border-radius: 2px`, `font-family: Inter`, `font-weight: 600`, `letter-spacing: 0.06em`, `text-transform: uppercase`, `font-size: 0.75rem`. Size variants: `sm`, `md` (default), `lg`.

### Cards
| Variant | Surface | Use |
|---|---|---|
| `content` | White bg, 1px border, mustard left border | Article / insight cards |
| `deal` | Transparent, white/10 border, hover lift | Deal showcase on dark bg |
| `service` | Cream bg, teal track accent top | Service description cards |
| `team` | No border, no radius, full bleed image | Founder / team cards |

### Forms
All inputs: `border-radius: 2px`, `border: 1px solid var(--border)`, `font-family: Inter`, `font-size: 0.9375rem`.
- Focus: `border-color: mustard`, `ring: 2px mustard/30%`, no glow
- Error: `border-color: red-500`, error message in `t-body-s` below field
- Disabled: `opacity: 0.5`, `cursor: not-allowed`

---

## 9. Navigation

### Structure
```
Logo | For Founders | For Investors | About | Insights | [Login — muted] | [Book a Call — primary button]
```

### Behaviour
- Sticky at top, `z-index: 50`
- Default: transparent background on hero sections, white background with border on scroll
- Scroll threshold: 40px triggers background
- Scroll progress bar: 2px mustard line at very top (`position: fixed`, `z-index: 100`)
- Mobile (< 768px): hamburger opens right-side drawer, 320px wide, charcoal bg

### Active state
- Current page link: mustard underline from left, `scaleX(0 → 1)` on mount
- Hover: same mustard underline animation

### Login link
- Text: "Login" in muted grey
- Routes to `/portal` → PortalComingSoon page
- Not styled as a CTA — intentionally subdued

### Book a Call
- Opens Calendly: `https://calendly.com/akroventures-info/30-min-stand-up-call`
- Styled as primary button (mustard)
- Opens in new tab / Calendly popup

---

## 10. Page Architecture

### Routes
| Path | Page | Audience |
|---|---|---|
| `/` | Home | All |
| `/founders` | Founders journey | Founders |
| `/investors` | Investors journey | Investors |
| `/about` | About Akro | All |
| `/insights` | Insights index | All |
| `/insights/:slug` | Insight article | All |
| `/contact` | Contact (3-step wizard) | All |
| `/calculator` | Loan calculator | Founders |
| `/loan-audit` | Loan audit | Founders |
| `/portal` | PortalComingSoon | All |
| `/assess/*` | Assessment tools (6) | Founders |

### Two-journey architecture
No generic `/services` page. Services are split:
- **Founders journey** (`/founders`): Business Loans, Startup Fundraising, Loan Audit, ECB/FDI Advisory, Export Finance, Unsecured Loans
- **Investors journey** (`/investors`): Deal flow, co-investment, track record, anonymised deal cards

---

## 11. Sections & Content Rules

### Section alternation pattern
Light sections and dark sections alternate to create breathing room:
```
White → Cream → White → Charcoal/Teal → White → ...
```

### Eyebrow pattern
Every section starts with an eyebrow label:
```tsx
<span className="eyebrow">Category Name</span>
<div className="divider-accent mt-3 mb-6" />
<Heading size="l">The actual headline</Heading>
```

### Headline writing rules
- No em dashes
- No "Not X. Y." constructions
- No "seamless", "empower", "unlock", "leverage", "revolutionary", "cutting-edge", "game-changing"
- Statements > questions > commands
- Numbers preferred where real: "₹200Cr+" over "significant capital"

### Image philosophy
- Photographs: treated with subtle desaturation + darkening overlay for editorial mood
- No stock photography of people in meetings or handshakes
- Existing assets: `img-strategy.jpg`, `img-city.jpg`, `img-finance.jpg`
- Team photos: `/public/team/rohit.jpg`, `/public/team/akshita.jpg`, `/public/team/pari.jpg`

---

## 12. CMS — Sanity

### Why Sanity
- Headless, TypeScript-native, free tier (3 users, 100k API requests/month)
- GROQ query language: expressive, fast
- Studio GUI: Pari Goyal can publish without developer involvement
- Portable Text: structured rich text, maps cleanly to React

### Setup
- Client: `src/lib/sanity.ts`
- Types: defined inline (no codegen required for V2 scope)
- Studio: separate Sanity project, not hosted inside this repo

### Content types
- **Post**: `_id`, `title`, `slug`, `publishedAt`, `excerpt`, `body` (Portable Text), `category`, `readTime`, `coverImage`, `author`
- **Category**: `_id`, `title`, `slug`

### Query patterns
```groq
// Index
*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, excerpt, category, readTime }

// Single post
*[_type == "post" && slug.current == $slug][0] { title, publishedAt, body, coverImage, author }
```

---

## 13. Supabase Schema

### Existing tables (preserve exactly)
- `contact_submissions`: from Contact page 3-step wizard
- `newsletter_subscriptions`: from Resources page

### New table (V2)
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

## 14. Accessibility

- Focus ring: `outline: 2px solid hsl(var(--accent))`, `outline-offset: 3px`
- All interactive elements reachable by keyboard
- Images: meaningful `alt` text, decorative images `alt=""` + `aria-hidden="true"`
- Colour contrast: all text against backgrounds meets WCAG AA
- Screen reader: navigation landmark roles (`<nav>`, `<main>`, `<footer>`)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` collapses all durations

---

## 15. Performance

- Fonts: Google Fonts with `display=swap`
- Images: `loading="lazy"`, `decoding="async"`, WebP format preferred
- Routes: lazy-loaded via `React.lazy()` + `<Suspense>`
- No large third-party bundles at initial load
- Lenis smooth scroll: passive listener only

---

## 16. Anti-Patterns (Never Build These)

| Category | Banned |
|---|---|
| Visual | Glowing gradients, neon colours, floating blobs, glassmorphism, heavy drop shadows, animated SVG backgrounds |
| Copy | Em dashes, "Not X. Y." construction, any banned words (see §11) |
| Motion | Looping decorative animations, hover-triggered text scramble, parallax on mobile |
| Components | Fake dashboards, generic testimonial carousels, star rating widgets |
| UX | Auto-playing video, sticky banners, cookie consent (no tracking), exit-intent popups |

---

## 17. File Structure

```
Akro-Website-V2/
├── public/
│   └── team/
│       ├── rohit.jpg
│       ├── akshita.jpg
│       └── pari.jpg          ← must be placed manually
├── src/
│   ├── assets/               ← logo.png, img-*.jpg (preserved)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SmoothScroll.tsx
│   │   ├── motion/
│   │   │   ├── FadeIn.tsx
│   │   │   ├── MaskReveal.tsx
│   │   │   ├── Stagger.tsx
│   │   │   ├── HeroReveal.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── primitives/
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Paragraph.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Grid.tsx
│   │   ├── forms/
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── Select.tsx
│   │   ├── ui/               ← shadcn (50+ components, untouched)
│   │   ├── tools/            ← AssessmentEngine.tsx (preserved)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Logo.tsx          ← preserved
│   │   ├── WhatsAppFloat.tsx ← preserved
│   │   └── ErrorBoundary.tsx ← preserved
│   ├── hooks/                ← use-mobile, use-toast (preserved)
│   ├── lib/
│   │   ├── supabase.ts       ← preserved
│   │   ├── utils.ts          ← preserved
│   │   └── sanity.ts         ← new
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Founders.tsx
│   │   ├── Investors.tsx
│   │   ├── Insights.tsx
│   │   ├── PortalComingSoon.tsx
│   │   ├── Contact.tsx       ← preserved
│   │   ├── Calculator.tsx    ← preserved
│   │   ├── LoanAudit.tsx     ← preserved
│   │   ├── NotFound.tsx      ← preserved
│   │   └── tools/            ← 6 assessment pages (preserved)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── DESIGN_SYSTEM.md          ← this file
└── [config files]
```

---

## 18. Installed Packages

### Core (preserved from V1)
- `react@18`, `react-dom@18`, `react-router-dom@6`
- `@supabase/supabase-js`
- `tailwindcss@3`, `tailwindcss-animate`
- `class-variance-authority` (CVA)
- `clsx`, `tailwind-merge`
- `lucide-react`
- All Radix UI primitives (via shadcn/ui)
- `react-hook-form`, `zod`
- `sonner` (toasts)
- `recharts`, `chart.js`
- `embla-carousel-react`
- `@tanstack/react-query`
- `date-fns`

### New in V2
- `framer-motion` — all scroll reveals and entrance animations
- `lenis` — smooth scroll
- `@sanity/client` — headless CMS queries
- `@portabletext/react` — render Sanity Portable Text in React

### Removed in V2
- `lovable-tagger` (devDependency, Lovable-specific, not needed)

---

## 19. Design Commandments

1. **Every pixel earns its place.** Remove before you add.
2. **Whitespace is content.** Generous margins communicate confidence.
3. **One accent moment per section.** Not three.
4. **Typography does the heavy lifting.** Not illustration, not icons.
5. **Hover states: subtle and immediate.** 100–200ms. No spring animations on UI.
6. **Scroll reveals: once, downward only.** Fire once, stay visible.
7. **Mobile is not a cut-down version.** It's a different context. Design for it.
8. **Never use a stock photo of a handshake.** Ever.
9. **If it needs an explanation tooltip, redesign it.**
10. **Dark sections are rare and intentional.** Not decorative.
11. **Mustard is the most powerful colour on the page. Use it last.**
12. **Build for the partner reading the site at 11pm, not the intern scanning it at 9am.**

---

*Last updated: June 2026. Phase 3 foundation implementation.*
