# 08 — UI Registry
> Akro Ventures Website V2 · Component Inventory & Reuse Policy

Status key: ✅ Built | 🔄 Needs V2 Update | 🔲 Planned

---

## Layout Components

| Component | Path | Status | Purpose | Notes |
|---|---|---|---|---|
| `Layout` | `components/layout/Layout.tsx` | ✅ | Wraps all pages | Contains Navbar + Footer + WhatsApp float |
| `Navbar` | `components/layout/Navbar.tsx` | ✅ | Sticky top nav | GPU progress bar, mobile drawer |
| `Footer` | `components/layout/Footer.tsx` | 🔄 | 3-column footer | Needs V2 font/colour update |
| `SmoothScroll` | `components/layout/SmoothScroll.tsx` | ✅ | Lenis initialiser | Mount once at app root |

---

## Motion Components

All in `src/components/motion/`. Use these wrappers — never write raw Framer Motion in page components.

| Component | Path | Status | Behaviour | When to Use |
|---|---|---|---|---|
| `HeroReveal` | `motion/HeroReveal.tsx` | ✅ | Text clip-mask reveal up, fires on mount | Hero headings only — no scroll trigger |
| `FadeIn` | `motion/FadeIn.tsx` | ✅ | opacity 0→1 + translateY 24px→0 | General content entrance |
| `MaskReveal` | `motion/MaskReveal.tsx` | ✅ | Clip-path reveal left→right | Images, horizontal reveals |
| `ScrollReveal` | `motion/ScrollReveal.tsx` | ✅ | Viewport-triggered FadeIn (once) | Everything below the fold |
| `Stagger` | `motion/Stagger.tsx` | ✅ | Wraps children, staggers FadeIn at 80–120ms | Card grids, list items |

**Props common to all:**
- `className?: string` — passthrough
- `delay?: number` — additional delay in seconds (default 0)
- `duration?: number` — override duration in seconds

---

## Primitive Components

All in `src/components/primitives/`. Use these building blocks. Never duplicate their function inline.

| Component | Path | Status | Props | Use |
|---|---|---|---|---|
| `Container` | `primitives/Container.tsx` | ✅ | `size?: "narrow" \| "default" \| "wide"` | Wraps all page content |
| `Section` | `primitives/Section.tsx` | ✅ | `bg?: "white" \| "cream" \| "charcoal" \| "teal"` | Section wrapper with `section-y` padding |
| `Heading` | `primitives/Heading.tsx` | ✅ | `as`, `size: "xl"\|"l"\|"m"\|"s"`, `font: "display"\|"body"` | All headings |
| `Paragraph` | `primitives/Paragraph.tsx` | ✅ | `size: "xl"\|"l"\|"m"\|"s"`, `muted?: boolean` | Body copy |
| `Divider` | `primitives/Divider.tsx` | ✅ | `color?: "accent"\|"border"`, `width?: number` | Section eyebrow separator |
| `Badge` | `primitives/Badge.tsx` | ✅ | `variant: "mustard"\|"teal"\|"ghost"\|"dark"` | Category tags, status pills |
| `Grid` | `primitives/Grid.tsx` | ✅ | `cols?: 2\|3\|4`, `gap?: "sm"\|"md"\|"lg"` | Consistent grid layout |

---

## Form Components

All in `src/components/forms/`. Styled consistently. Never use raw `<input>` in pages.

| Component | Path | Status | Props | Use |
|---|---|---|---|---|
| `Input` | `forms/Input.tsx` | ✅ | `error?: string`, standard HTML input props | All text inputs |
| `Textarea` | `forms/Textarea.tsx` | ✅ | `error?: string`, rows | Multi-line inputs |
| `Select` | `forms/Select.tsx` | ✅ | `options: { value, label }[]`, `error?: string` | Dropdowns |

---

## Button Component

| Component | Path | Status | Variants |
|---|---|---|---|
| `Button` | `components/Button.tsx` | ✅ | `primary`, `ghost`, `ghost-light`, `dark`, `link` |

**Sizes:** `sm`, `md` (default), `lg`  
**Extra props:** `loading?: boolean` (shows spinner, disables), `asChild?: boolean` (renders as child element)

```tsx
<Button variant="primary" size="md">Book a Call</Button>
<Button variant="ghost-light" size="lg">Learn More</Button>
<Button variant="dark" loading={isSubmitting}>Submit</Button>
```

---

## Card Component

| Component | Path | Status | Variants |
|---|---|---|---|
| `Card` | `components/Card.tsx` | ✅ | `content`, `deal`, `service`, `team` |

```tsx
<Card variant="content">        ← White + 1px border + 2px mustard left
<Card variant="deal">           ← Transparent + white/10 border + hover lift
<Card variant="service">        ← Cream + 2px teal top accent
<Card variant="team">           ← No border, full-bleed image
```

---

## Tools Component

| Component | Path | Status | Purpose |
|---|---|---|---|
| `AssessmentEngine` | `components/tools/AssessmentEngine.tsx` | ✅ | Shared multi-step quiz engine for all `/assess/*` pages |

**Props:**
```ts
interface AssessmentEngineProps {
  questions: Question[]
  onComplete: (answers: Record<string, string>) => void
  title: string
  description: string
}
```

---

## Page Components

All lazy-loaded via `React.lazy()` in `App.tsx`.

| Page | Route | Status | Key Sections |
|---|---|---|---|
| `Home` | `/` | 🔄 | Hero, Journey, Outcomes, Process, Stats, CTA |
| `Founders` | `/founders` | 🔄 | Hero, 6 service entries, social proof, CTA |
| `Investors` | `/investors` | 🔲 | Hero, deal flow, deal cards, investor form |
| `About` | `/about` | 🔄 | Hero, founders, stats, timeline, values, fees |
| `Insights` | `/insights` | 🔲 | Hero, filter tabs, featured article, article grid, newsletter |
| `InsightArticle` | `/insights/:slug` | 🔲 | Hero, Portable Text body, related articles |
| `Contact` | `/contact` | ✅ | 3-step wizard, Calendly card, success state |
| `Calculator` | `/calculator` | ✅ | Hero, input panel, Chart.js donut, summary |
| `LoanAudit` | `/loan-audit` | ✅ | Hero, 4-question quiz, score display, CTA |
| `PortalComingSoon` | `/portal` | ✅ | Stub page |
| `NotFound` | `*` | ✅ | 404 |

---

## Assessment Tool Pages

All under `/assess/*`, all use `AssessmentEngine`:

| Page | Route | Status |
|---|---|---|
| `UnsecuredLoansTool` | `/assess/unsecured-loans` | ✅ |
| `SecuredLoansTool` | `/assess/secured-loans` | ✅ |
| `ProjectFundingTool` | `/assess/project-funding` | ✅ |
| `StartupFundraisingTool` | `/assess/startup-fundraising` | ✅ |
| `StartupConsultationTool` | `/assess/startup-consultation` | ✅ |
| `FdiEcbTool` | `/assess/fdi-ecb` | ✅ |

---

## Planned New Components (Not Yet Built)

| Component | Path (planned) | Purpose | Priority |
|---|---|---|---|
| `HeroDataViz` | `components/HeroDataViz.tsx` | Animated SVG for Home hero right panel (replaces PNG) | High |
| `CountUp` | `components/CountUp.tsx` | Scroll-triggered number counter for stats | High |
| `FounderPortrait` | `components/FounderPortrait.tsx` | Paired founder photos in CTA section | High |
| `ArticleCard` | `components/ArticleCard.tsx` | Sanity post card for Insights index | Medium |
| `PortableTextRenderer` | `components/PortableTextRenderer.tsx` | Portable Text component map for article bodies | Medium |
| `InvestorForm` | `components/InvestorForm.tsx` | Investor application form → Supabase | Medium |
| `Skeleton` | `components/Skeleton.tsx` | Loading placeholder for Sanity content | Medium |
| `OGImage` | (static asset) | 1200×630 social preview image | Low |

---

## Reuse Policy

1. **Always check this registry first.** If a component exists, use it — don't create a new one.
2. **Primitives are not optional.** All layout and typography must go through `Section`, `Container`, `Heading`, `Paragraph`.
3. **Motion wrappers are mandatory.** No raw Framer Motion `<motion.div>` in page components.
4. **shadcn/ui components** (`src/components/ui/`) are untouchable — never edit those files.
5. **One instance of Chart.js** — only in `Calculator.tsx`. Don't spread chart dependencies.
6. **AssessmentEngine is the only quiz engine.** Don't build a second quiz system.
7. **If you need a new primitive,** add it to `primitives/` and update this registry.

---

## shadcn/ui Components (Installed, Do Not Modify)

Located in `src/components/ui/`. Import as-is.

Key components available:
- Accordion, Alert, AlertDialog, AspectRatio, Avatar
- Button (shadcn version — use our custom `Button.tsx` instead for brand variants)
- Calendar, Card (shadcn — use our custom `Card.tsx` instead)
- Checkbox, Collapsible, Command, ContextMenu
- Dialog, DropdownMenu, Form, HoverCard
- Input (shadcn — use our `forms/Input.tsx` instead for consistent styling)
- Label, Menubar, NavigationMenu, Popover, Progress
- RadioGroup, ResizablePanels, ScrollArea, Select
- Separator, Sheet, Skeleton, Slider, Switch
- Table, Tabs, Textarea, Toast, Toggle, Tooltip
