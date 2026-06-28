# 05 — Library Docs
> Akro Ventures Website V2 · Dependency Reference

---

## Core Framework

### React 18 + React DOM
**Purpose:** UI component framework  
**Why:** SPA architecture; concurrent features (Suspense, lazy)  
**Version:** `^18.3.1`  
**Project usage:** All components. Key features: `React.lazy()`, `Suspense`, `useEffect`, `useRef`, `useState`

### React Router v6
**Purpose:** Client-side routing  
**Why:** Standard for React SPAs; lazy route support  
**Version:** `^6.30.1`  
**Installation:** Already installed  
**Project usage:**
```tsx
// App.tsx pattern — all routes lazy
const Home = lazy(() => import('./pages/Home'))
<Route path="/" element={<Home />} />
```
**Key rules:**
- All page components must be wrapped in `React.lazy()`
- Prefetch happens via `requestIdleCallback` in `Layout.tsx`
- Use `<Link>` for internal navigation, never `<a href>`
- Use `useNavigate()` for programmatic navigation

---

## Build & Tooling

### Vite 5 + @vitejs/plugin-react-swc
**Purpose:** Build tool and dev server  
**Version:** `^5.4.19`  
**Key config:** `vite.config.ts` — SWC transform, path alias `@/` → `src/`

### TypeScript 5
**Purpose:** Type safety  
**Version:** `^5.8.3`  
**Key config:** `tsconfig.app.json` — strict mode, path aliases

---

## Styling

### Tailwind CSS v3
**Purpose:** Utility-first CSS  
**Version:** `^3.4.17`  
**Config:** `tailwind.config.ts`  
**Key customisations:**
- Container: `max-w-[1280px]` with `1.5rem` horizontal padding
- Custom colours referencing CSS variables: `hsl(var(--color-charcoal))`
- Custom font families: `playfair` (display), `inter` (sans)
- Extended `borderRadius`: `sm: 2px` (all buttons and cards)
- `section-y` utility class for responsive vertical rhythm

**Common mistakes:**
- Do NOT use `bg-[#F2B705]` — use `bg-accent` (resolves to CSS variable)
- Do NOT write `rounded-lg` — max radius is `rounded-sm` (2px)
- Always use `cn()` for conditional classes

### tailwindcss-animate
**Purpose:** CSS keyframe animation utilities  
**Usage:** Powers `animate-in`, `fade-in`, etc. — used by shadcn/ui

### class-variance-authority (CVA)
**Purpose:** Typed component variant system  
**Version:** `^0.7.1`  
**Project usage:** `Button.tsx`, `Card.tsx`, `Badge.tsx`
```tsx
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { primary: '...', ghost: '...', 'ghost-light': '...' },
    size: { sm: '...', md: '...', lg: '...' }
  },
  defaultVariants: { variant: 'primary', size: 'md' }
})
```

### clsx + tailwind-merge
**Purpose:** Conditional class merging without conflicts  
**Usage:** Always via `cn()` from `@/lib/utils`
```ts
import { cn } from '@/lib/utils'
cn('base', isActive && 'active', className)
```

---

## Animation

### Framer Motion 12
**Purpose:** All scroll reveals, page entrances, hero animation  
**Version:** `^12.42.0`  
**Installation:** `npm install framer-motion`

**Project motion components (use these, don't write raw Framer):**
```tsx
import { FadeIn } from '@/components/motion/FadeIn'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { Stagger } from '@/components/motion/Stagger'
import { HeroReveal } from '@/components/motion/HeroReveal'
import { MaskReveal } from '@/components/motion/MaskReveal'
```

**Rules:**
- All `ScrollReveal` and `FadeIn`: set `once: true` in `useInView` — never re-trigger on scroll up
- `HeroReveal`: no scroll trigger — fires on mount
- Stagger delay between children: 80–120ms (never more than 600ms total)
- All durations use CSS variable tokens, not hardcoded ms
- Reduced motion: `useReducedMotion()` hook collapses all durations to 10ms

**Hero SVG animation pattern (for future custom component):**
```tsx
// SVG stroke-dashoffset draw-on
<motion.path
  strokeDasharray="1000"
  initial={{ strokeDashoffset: 1000 }}
  animate={{ strokeDashoffset: 0 }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Common mistakes:**
- Do NOT use `whileHover` with spring animations on UI elements (hover: 100–200ms max)
- Do NOT animate `width` or `height` — use `scaleX`/`scaleY` instead (GPU-composited)
- Do NOT put Framer Motion on `<img>` tags — wrap in a `<motion.div>`

### Lenis 1.3
**Purpose:** Smooth scroll  
**Version:** `^1.3.24`  
**Initialisation:** `SmoothScroll.tsx` at app root (inside `Layout`)

**Rules:**
- Lenis uses passive event listeners — never override
- On mobile: consider disabling Lenis if scroll performance is poor
- Do NOT animate scroll position via Lenis and Framer Motion simultaneously

---

## Backend

### @supabase/supabase-js v2
**Purpose:** Form submission to Postgres  
**Version:** `^2.105.3`  
**Client location:** `src/lib/supabase.ts`

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

**Insert pattern:**
```ts
const { error } = await supabase.from('contact_submissions').insert({
  name, email, phone, company, industry, revenue_lakhs, funding_amount, message
})
```

**Error codes to handle:**
- `23505` — unique constraint violation (already subscribed)
- Any other error — generic "try again" toast

**Rules:**
- Anon key only — no service role key in client code
- INSERT only — no SELECT, UPDATE, DELETE from browser
- Always check `error` before assuming success

### @sanity/client + @portabletext/react
**Purpose:** Headless CMS for Insights articles  
**Versions:** `^7.23.0`, `^6.2.0`  
**Client location:** `src/lib/sanity.ts`

```ts
// src/lib/sanity.ts
import { createClient } from '@sanity/client'
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})
```

**GROQ query patterns:**
```ts
// All posts (index)
const posts = await sanityClient.fetch(
  `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, category, readTime,
    "coverImageUrl": coverImage.asset->url
  }`
)

// Single post
const post = await sanityClient.fetch(
  `*[_type == "post" && slug.current == $slug][0] {
    title, publishedAt, body, author,
    "coverImageUrl": coverImage.asset->url
  }`,
  { slug }
)
```

**Portable Text rendering:**
```tsx
import { PortableText } from '@portabletext/react'
<PortableText value={post.body} components={portableTextComponents} />
```

**Common mistakes:**
- Do NOT render Sanity body as raw HTML — always use `<PortableText>`
- Do NOT use `useCdn: false` in production — CDN reduces latency
- Wrap all Sanity fetches in TanStack Query for caching

---

## Forms

### React Hook Form v7 + Zod + @hookform/resolvers
**Purpose:** Form state management + schema validation  
**Project usage:** Contact wizard, Investors form, Newsletter

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
})

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { name: '', email: '', phone: '' }
})
```

**Rules:**
- Always define schema first; infer TypeScript type from it
- Display field errors: `{form.formState.errors.name?.message}`
- Multi-step wizard: use single `useForm` instance across steps; validate per-step subset

---

## State Management

### @tanstack/react-query v5
**Purpose:** Server state for Sanity CMS fetches  
**Version:** `^5.83.0`  
**Provider:** Wrap app with `QueryClientProvider` if not already done

```tsx
const { data: posts, isLoading, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: () => sanityClient.fetch(POSTS_QUERY),
  staleTime: 1000 * 60 * 5, // 5 minutes
})
```

**Rules:**
- Always provide `staleTime` for Sanity queries (avoid refetching on every focus)
- Handle `isLoading` and `isError` states — never render null silently

---

## UI Primitives

### Radix UI (via shadcn/ui)
**Purpose:** Accessible, unstyled primitive components  
**Location:** `src/components/ui/` — DO NOT MODIFY these files  
**Usage:** Import from `@/components/ui/button` etc.

**Key primitives used:**
- Accordion (FAQ sections)
- Dialog (future modal needs)
- Select (form dropdowns)
- Slider (revenue range in Contact wizard)
- Tabs (Insights filter)
- Toast (via Sonner)
- Tooltip

### Sonner
**Purpose:** Toast notifications  
**Version:** `^1.7.4`  
**Usage:**
```tsx
import { toast } from 'sonner'
toast.success('Message sent.')
toast.error('Something went wrong.')
toast.info('Already subscribed.')
```

---

## Charts

### Chart.js 4 + react-chartjs-2
**Purpose:** Donut chart in Calculator page  
**Version:** `^4.4.0`, `^5.2.0`  
**Usage:** Only in `Calculator.tsx` — do not use elsewhere  
**Recharts:** Also installed but not preferred — Chart.js is already in use for the donut

---

## Icons

### Lucide React
**Version:** `^0.462.0`  
**Usage:** Tree-shakeable — import only what you need
```tsx
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
```
**Rules:**
- Consistent size: `size={16}` for inline, `size={20}` for standalone
- Always set `aria-hidden="true"` on decorative icons

---

## Other

### Embla Carousel
**Purpose:** Carousel if needed (mobile testimonials, etc.)  
**Version:** `^8.6.0`  
**Note:** Not currently in use — available if mobile carousel is needed

### date-fns
**Purpose:** Date formatting for Insights article dates  
**Usage:** `format(new Date(post.publishedAt), 'MMMM d, yyyy')`

### @tailwindcss/typography
**Purpose:** Prose styling for Portable Text article body  
**Usage:** Apply `prose prose-neutral` to the Portable Text container in article pages
