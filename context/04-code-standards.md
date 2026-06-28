# 04 — Code Standards
> Akro Ventures Website V2 · Coding Conventions & Rules

---

## Language

- TypeScript 5, strict mode enabled (`tsconfig.app.json` inherits strict)
- No `any` types — use `unknown` if type is genuinely unknown, then narrow
- No type assertions (`as Type`) except in test files or Supabase response typing
- `interface` for object shapes; `type` for unions, intersections, aliases
- All exported components and functions must have explicit return types

---

## File Naming

| Thing | Convention | Example |
|---|---|---|
| React components | PascalCase `.tsx` | `HeroReveal.tsx` |
| Hooks | camelCase, `use-` prefix, `.ts` | `use-mobile.ts` |
| Utilities | camelCase `.ts` | `utils.ts` |
| Pages | PascalCase `.tsx` | `Founders.tsx` |
| Directories | lowercase-kebab | `motion/`, `primitives/` |
| Context files | `NN-kebab-name.md` | `04-code-standards.md` |

---

## Component Rules

### Structure (order within a component file)
1. Imports (React, third-party, internal — each group blank-line separated)
2. Types / interfaces
3. Constants (outside component if stable)
4. Component function
5. Sub-components (same file only if small and not reused elsewhere)
6. Default export

### Props
- Always destructure props in the function signature
- Provide default values in destructuring, not inside the function body
- `children` typed as `React.ReactNode`
- Event handlers named `onVerbNoun` pattern: `onFormSubmit`, `onCardClick`

### Motion components
- Every page component calls `useReveal()` at the top level (V1 hook for CSS classes)
- For new components: use Framer Motion `<ScrollReveal>`, `<FadeIn>`, `<Stagger>` wrappers instead
- Never mix V1 CSS reveal classes with Framer Motion on the same element
- All Framer Motion animations: `once: true` — no repeat on scroll

### Do not
- Do not use inline `style={{}}` except for dynamic values that cannot be expressed in Tailwind
- Do not create one-off utility components that are not in `primitives/`
- Do not import from `../../../` more than 2 levels — use `@/` alias
- Do not add `console.log` to production components

---

## Naming Conventions

### CSS / Tailwind
- Custom utility classes: `kebab-case` (e.g. `section-y`, `card-editorial`, `divider-gold`)
- CSS variables: `--color-*`, `--shadow-*`, `--duration-*`, `--ease-*`
- Semantic tokens: `--background`, `--foreground`, `--primary`, `--accent`, `--border`, etc.

### TypeScript
- React components: `PascalCase`
- Variables and functions: `camelCase`
- Constants (top-level, non-reactive): `SCREAMING_SNAKE_CASE`
- Zod schemas: `camelCase` with `Schema` suffix: `contactFormSchema`
- Supabase table types: `PascalCase` with `Row` suffix: `ContactSubmissionRow`

---

## Tailwind Usage Rules

1. Use design token classes, not arbitrary values:
   - `text-foreground` not `text-[#2B2B2B]`
   - `bg-accent` not `bg-[#F2B705]`
   - `border-border` not `border-[#E5E7EB]`
2. Use `cn()` from `@/lib/utils` for conditional classes — never string concatenation
3. Responsive classes: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
4. Avoid `!important` (`!` prefix) unless overriding a third-party component
5. Group Tailwind classes by concern: layout → spacing → typography → colour → border → animation

---

## Error Handling

- All Supabase inserts: wrap in try/catch, show `sonner` toast on error
- Distinguish error codes: `23505` = duplicate (newsletter already subscribed), show specific message
- All Sanity fetches: wrapped in TanStack Query — use `isError` + `error` states, show fallback UI
- Never show raw error messages to users — show friendly copy
- `ErrorBoundary.tsx` wraps the router — catches render errors gracefully

```ts
// Supabase insert pattern
const { error } = await supabase.from('contact_submissions').insert(data)
if (error) {
  if (error.code === '23505') {
    toast.info('You are already subscribed.')
  } else {
    toast.error('Something went wrong. Please try again.')
  }
  return
}
toast.success('Submitted successfully.')
```

---

## Validation

- All forms use Zod schema validated via `@hookform/resolvers/zod`
- Validate at the field level (inline error messages below each field)
- Never submit to Supabase without passing Zod validation
- Phone numbers: accept any 10-digit format, no strict regex (Indian numbers vary)
- Email: Zod's built-in `.email()` is sufficient
- Monetary inputs: always store as numbers (lakhs), format for display with `fmt()` helper

---

## Logging

- No logging in production
- Development only: `import.meta.env.DEV && console.log(...)` pattern if needed
- Never log Supabase error objects directly to console in production builds

---

## Testing

- Tests co-located in `src/test/` or `*.test.tsx` beside the component
- Use Vitest + React Testing Library
- Test user behaviour, not implementation: `getByRole`, `getByText`, `userEvent`
- Do not test Framer Motion animation values
- Do not mock Supabase in integration tests unless truly unavoidable
- Coverage target: all form submission paths, all Zod schemas

---

## Security

- Never hardcode secrets — all credentials via `VITE_*` env vars
- Never log auth tokens, emails, or personal data
- Sanitise no HTML from user inputs (no `dangerouslySetInnerHTML`)
- Sanity Portable Text: use `@portabletext/react` — never render raw HTML from CMS
- No `eval()`, no dynamic `import()` from user input

---

## Performance

- All page components: `React.lazy()` — no exceptions
- All images below the fold: `loading="lazy" decoding="async"`
- Hero images: `loading="eager"` (above fold)
- No third-party scripts loaded synchronously in `<head>`
- Framer Motion: import from `framer-motion` not `framer-motion/dist/...` (tree-shake handles it)
- TanStack Query: set `staleTime: 1000 * 60 * 5` (5 minutes) for Sanity reads

---

## Accessibility

- All interactive elements have visible focus ring (`outline: 2px solid hsl(var(--ring))`)
- All `<img>` tags have `alt` — use `alt=""` + `aria-hidden="true"` for decorative images
- All `<button>` elements have accessible labels (text or `aria-label`)
- Navigation landmark: `<nav aria-label="Main navigation">`
- `<main>` wraps page content
- Modal/drawer: traps focus while open; closes on `Escape`
- Form errors: `aria-describedby` links field to error message

---

## Anti-Patterns (Never Do These)

| Category | Forbidden |
|---|---|
| Visual | `glowing` gradients, neon colours, floating blobs, glassmorphism, heavy shadows |
| Copy | Em dashes, "Not X. Y." sentence structure, words: seamless/empower/unlock/leverage/revolutionary/cutting-edge/game-changing |
| Motion | Looping decorative animations, hover-triggered text scramble, parallax on mobile |
| Components | Fake dashboards, generic testimonial carousels, star rating widgets, countdown timers |
| UX | Auto-playing video, sticky banners, cookie consent popups, exit-intent popups |
| Code | `any` type, inline styles for colours, arbitrary Tailwind values for brand colours |
