import { useState, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Search, Clock, Calendar } from 'lucide-react'

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Category config ────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',               label: 'All',                color: '#2B2B2B' },
  { id: 'fundraising',       label: 'Fundraising',         color: '#3F6F73' },
  { id: 'market-view',       label: 'Market View',         color: '#2B2B2B' },
  { id: 'deal-announcements',label: 'Deal Announcements',  color: '#F2B705' },
  { id: 'events',            label: 'Events',              color: '#7B68A6' },
  { id: 'spotlights',        label: 'Spotlights',          color: '#C4633F' },
] as const

type CategoryId = typeof CATEGORIES[number]['id']

function getCategoryColor(id: string) {
  return CATEGORIES.find(c => c.id === id)?.color ?? '#2B2B2B'
}
function getCategoryLabel(id: string) {
  return CATEGORIES.find(c => c.id === id)?.label ?? id
}

// ── Sample articles (placeholder until CMS is wired) ──────────────────────
const ARTICLES = [
  {
    id: 1,
    category: 'fundraising',
    title: 'What investors actually read in your pitch deck — and what they skip',
    excerpt: 'Most founders spend 80% of their time on the wrong slides. Here is what a seasoned investor looks at first, and why.',
    author: 'Rohit Jain',
    date: '2026-06-25',
    readTime: 5,
    featured: true,
  },
  {
    id: 2,
    category: 'market-view',
    title: 'The Indian startup funding landscape in H1 2026',
    excerpt: 'Deal volumes are up 18% YoY, but average ticket sizes have compressed. What this means for founders raising today.',
    author: 'Rohit Jain',
    date: '2026-06-22',
    readTime: 7,
    featured: false,
  },
  {
    id: 3,
    category: 'fundraising',
    title: 'Debt vs equity: how to decide what\'s right for your stage',
    excerpt: 'The wrong capital at the wrong time is worse than no capital at all. A framework for making the call.',
    author: 'Pari Goyal',
    date: '2026-06-20',
    readTime: 6,
    featured: false,
  },
  {
    id: 4,
    category: 'deal-announcements',
    title: 'Akro closes healthcare SaaS mandate: Pre-Series A, 3.5 Cr equity raise',
    excerpt: 'The company had 1.2 Cr ARR and profitable unit economics. Akro prepared the full deck and financial model.',
    author: 'Akshita Chahande',
    date: '2026-06-18',
    readTime: 3,
    featured: false,
  },
  {
    id: 5,
    category: 'fundraising',
    title: 'How to structure your financial model before you speak to investors',
    excerpt: 'Investors will forensically probe your assumptions. Here is how to build projections that hold up under scrutiny.',
    author: 'Rohit Jain',
    date: '2026-06-15',
    readTime: 8,
    featured: false,
  },
  {
    id: 6,
    category: 'spotlights',
    title: 'Spotlight: A founder who raised 2 Cr in 6 weeks — without a warm intro',
    excerpt: 'No prior investor relationships. No network. Just a tight deck, solid numbers, and a clear narrative. Here is how it happened.',
    author: 'Pari Goyal',
    date: '2026-06-12',
    readTime: 5,
    featured: false,
  },
  {
    id: 7,
    category: 'market-view',
    title: 'Why manufacturing SMEs are the most underfunded segment in India',
    excerpt: 'GST-backed underwriting and debt syndication are unlocking capital for a sector that banks routinely ignore.',
    author: 'Rohit Jain',
    date: '2026-06-10',
    readTime: 6,
    featured: false,
  },
  {
    id: 8,
    category: 'events',
    title: 'Akro Founder Pitch Night — June 2026 recap',
    excerpt: 'Eight founders. Three investor panels. One evening. What came out of Akro\'s quarterly pitch session.',
    author: 'Pari Goyal',
    date: '2026-06-08',
    readTime: 4,
    featured: false,
  },
  {
    id: 9,
    category: 'fundraising',
    title: 'The Akro checklist: are you ready to raise?',
    excerpt: 'Twelve questions that tell us whether a founder is genuinely ready to enter a fundraising process. Honest answers required.',
    author: 'Rohit Jain',
    date: '2026-06-05',
    readTime: 5,
    featured: false,
  },
  {
    id: 10,
    category: 'deal-announcements',
    title: 'B2B Fintech: Seed round closed, 1.8 Cr — 40+ enterprise clients',
    excerpt: 'Three-month payback period, no prior institutional investors. Akro sourced 6 investor introductions and closed in 9 weeks.',
    author: 'Akshita Chahande',
    date: '2026-06-02',
    readTime: 3,
    featured: false,
  },
]

const PER_PAGE = 9

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Category pill ──────────────────────────────────────────────────────────
function CategoryPill({ id, small = false }: { id: string; small?: boolean }) {
  const color = getCategoryColor(id)
  const label = getCategoryLabel(id)
  return (
    <span
      className="inline-block font-bold uppercase tracking-[0.1em] rounded-full"
      style={{
        fontSize: small ? '0.6rem' : '0.65rem',
        padding: small ? '2px 8px' : '3px 10px',
        background: color === '#F2B705' ? '#F2B705' : color + '18',
        color: color === '#F2B705' ? '#2B2B2B' : color,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  )
}

// ── Featured card ──────────────────────────────────────────────────────────
function FeaturedCard({ article }: { article: typeof ARTICLES[0] }) {
  return (
    <FadeUp>
      <a
        href={`/insights/${article.id}`}
        className="group block rounded-sm overflow-hidden border border-border hover:border-primary transition-colors"
        style={{ background: '#ffffff' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-0">
          {/* Left: content */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <CategoryPill id={article.category} />
              <h2
                className="mt-4 mb-3 group-hover:text-primary transition-colors leading-tight"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                  fontWeight: 700,
                  color: '#2B2B2B',
                }}
              >
                {article.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-lg">
                {article.excerpt}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {article.readTime} min read
                </span>
                <span>{article.author}</span>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                Read Article <ArrowRight size={12} />
              </span>
            </div>
          </div>
          {/* Right: visual accent */}
          <div
            className="hidden md:flex items-center justify-center min-h-[200px]"
            style={{ background: getCategoryColor(article.category) + '12' }}
          >
            <p
              className="px-8 text-center leading-tight"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '3.5rem',
                fontWeight: 700,
                fontStyle: 'italic',
                color: getCategoryColor(article.category),
                opacity: 0.25,
              }}
            >
              {getCategoryLabel(article.category)}
            </p>
          </div>
        </div>
      </a>
    </FadeUp>
  )
}

// ── Article card ───────────────────────────────────────────────────────────
function ArticleCard({ article, delay = 0 }: { article: typeof ARTICLES[0]; delay?: number }) {
  const accent = getCategoryColor(article.category)
  return (
    <FadeUp delay={delay}>
      <a
        href={`/insights/${article.id}`}
        className="group block bg-white rounded-sm border border-border hover:border-primary transition-colors h-full overflow-hidden"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <div className="p-6 flex flex-col h-full">
          <CategoryPill id={article.category} small />
          <h3
            className="mt-3 mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#2B2B2B',
            }}
          >
            {article.title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>{formatDate(article.date)}</span>
              <span>·</span>
              <span>{article.readTime} min</span>
              <span>·</span>
              <span>{article.author}</span>
            </div>
            <span className="text-[10px] font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Read <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </a>
    </FadeUp>
  )
}

// ── Newsletter strip ───────────────────────────────────────────────────────
function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="py-12 px-6 text-center" style={{ background: '#3F6F73' }}>
      <FadeUp>
        <h3
          className="text-2xl md:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Get Akro's insights in your inbox.
        </h3>
        <p className="text-white/65 text-sm mb-6">
          Deal flow, market views, and fundraising intelligence — delivered weekly.
        </p>
        {submitted ? (
          <p className="text-white font-semibold text-sm">You're subscribed. Watch your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-sm text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 bg-white"
              style={{ focusRingColor: '#F2B705' } as React.CSSProperties}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-sm font-bold text-sm text-foreground hover:opacity-90 transition-opacity flex-shrink-0"
              style={{ background: '#F2B705' }}
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe any time.</p>
      </FadeUp>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Insights() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const featured = ARTICLES.find(a => a.featured)!

  const filtered = useMemo(() => {
    return ARTICLES.filter(a => {
      if (a.featured) return false
      if (activeCategory !== 'all' && a.category !== activeCategory) return false
      if (query) {
        const q = query.toLowerCase()
        return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
      }
      return true
    })
  }, [activeCategory, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCategory = (id: CategoryId) => {
    setActiveCategory(id)
    setPage(1)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="px-6 pt-32 pb-10" style={{ background: '#ffffff' }}>
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <h1
              className="mb-2"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 700,
                color: '#2B2B2B',
                lineHeight: 1.05,
              }}
            >
              Insights
            </h1>
            <p className="text-muted-foreground text-base mb-7 max-w-xl">
              Fundraising intelligence, market views, and deal thinking from the Akro team.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative max-w-2xl">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1) }}
                placeholder="Search articles, topics, or deals..."
                className="w-full pl-10 pr-4 py-3.5 text-sm text-foreground placeholder-muted-foreground border border-border rounded-sm focus:outline-none focus:border-primary transition-colors bg-white"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Category filter (sticky) ── */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id
              const color = cat.color
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategory(cat.id as CategoryId)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all whitespace-nowrap"
                  style={
                    isActive
                      ? { background: color, color: color === '#F2B705' ? '#2B2B2B' : 'white', border: `1px solid ${color}` }
                      : { background: 'transparent', color: '#6B7280', border: '1px solid #E5E7EB' }
                  }
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Featured post */}
        {activeCategory === 'all' && !query && (
          <div className="mb-10">
            <FeaturedCard article={featured} />
          </div>
        )}

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {paginated.map((article, i) => (
              <ArticleCard key={article.id} article={article} delay={i * 0.05} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground text-sm">No articles in this category yet. Check back soon.</p>
          </div>
        )}

        {/* Newsletter strip after first page */}
        {page === 1 && filtered.length > 0 && <NewsletterStrip />}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs font-semibold border border-border rounded-sm disabled:opacity-40 hover:border-primary transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className="h-8 w-8 text-xs font-bold rounded-sm border transition-colors"
                style={
                  n === page
                    ? { background: '#3F6F73', color: 'white', borderColor: '#3F6F73' }
                    : { background: 'white', color: '#6B7280', borderColor: '#E5E7EB' }
                }
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-xs font-semibold border border-border rounded-sm disabled:opacity-40 hover:border-primary transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  )
}
