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
  { id: 'all',               label: 'All',                color: 'hsl(var(--foreground))' },
  { id: 'fundraising',       label: 'Fundraising',         color: 'hsl(var(--primary))' },
  { id: 'market-view',       label: 'Market View',         color: 'hsl(var(--foreground))' },
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

// ── Articles — real LinkedIn publications + Akro deal notes ───────────────
const ARTICLES = [
  {
    id: 1,
    category: 'fundraising',
    title: 'What I Tell Every Founder Who Walks In Asking About Funding',
    excerpt: 'A founder came in wanting Series A with 90L in revenue and needed 80L for inventory. The first question was not about valuation. Here is what it was.',
    author: 'Pari Goyal',
    date: '2026-05-18',
    readTime: 7,
    featured: true,
    href: 'https://www.linkedin.com/pulse/what-i-tell-every-founder-who-walks-asking-funding-akro-ventures-ivn9c/',
  },
  {
    id: 2,
    category: 'fundraising',
    title: 'Your Pitch Deck Gets 2 Minutes and 24 Seconds. Here\'s How Indian Investors Actually Use Them.',
    excerpt: 'An Indian VC sees roughly 2,000 decks a year and invests in 5 to 8. The average first-pass review is 2 minutes and 24 seconds. Make every slide count.',
    author: 'Pari Goyal',
    date: '2026-05-10',
    readTime: 5,
    featured: false,
    href: 'https://www.linkedin.com/pulse/your-pitch-deck-gets-2-minutes-24-seconds-heres-how-indian-klvgc/',
  },
  {
    id: 3,
    category: 'fundraising',
    title: 'Every Founder Says Their Unit Economics Work. Most Are Lying to Themselves.',
    excerpt: 'Not because founders are dishonest, because unit economics is the most confidently miscalculated metric in startup finance. Investors have built their entire DD process around finding the errors.',
    author: 'Pari Goyal',
    date: '2026-04-28',
    readTime: 6,
    featured: false,
    href: 'https://www.linkedin.com/pulse/every-founder-says-unit-economics-work-most-lying-themselves-8hrje/',
  },
  {
    id: 4,
    category: 'fundraising',
    title: 'Your Startup\'s Valuation Is Not What You Think It Is',
    excerpt: 'Most founders base their valuation on a friend\'s raise, a VC tweet, and a revenue multiple from a panel. Those figures were accurate in 2021, now probably off by 40% today.',
    author: 'Pari Goyal',
    date: '2026-04-15',
    readTime: 5,
    featured: false,
    href: 'https://www.linkedin.com/pulse/your-startups-valuation-what-you-think-akro-ventures-wmlrc/',
  },
  {
    id: 5,
    category: 'fundraising',
    title: '3 Things Investors Won\'t Tell You They Hate in Pitch Decks',
    excerpt: 'Clean design, good fonts. After two reads, you still cannot explain what the company does. That is not a deck problem. That is a communication problem that ends fundraising conversations before they begin.',
    author: 'Pari Goyal',
    date: '2026-04-02',
    readTime: 4,
    featured: false,
    href: 'https://www.linkedin.com/pulse/3-things-investors-wont-tell-you-hate-pitch-decks-akro-ventures-jtyxc/',
  },
  {
    id: 6,
    category: 'market-view',
    title: 'India\'s Export Finance Landscape Just Changed Completely',
    excerpt: 'RBI\'s recent moves on export credit have quietly shifted the rules of the game for Indian exporters. Here is what changed, what it means for your capital stack, and what to do about it.',
    author: 'Pari Goyal',
    date: '2026-03-20',
    readTime: 6,
    featured: false,
    href: 'https://www.linkedin.com/pulse/indias-export-finance-landscape-just-changed-completely-9metc/',
  },
  {
    id: 7,
    category: 'market-view',
    title: 'Your Loan Didn\'t Get Rejected Because Your Business Is Weak',
    excerpt: 'Most loan rejections have nothing to do with business quality. They happen because of how the application was structured, which lender was approached, and what the documents said.',
    author: 'Pari Goyal',
    date: '2026-03-08',
    readTime: 5,
    featured: false,
    href: 'https://www.linkedin.com/pulse/your-loan-didnt-get-rejected-because-business-weak-akro-ventures-zn3nc/',
  },
  {
    id: 8,
    category: 'market-view',
    title: '81 Lakh Crore Sitting in Unpaid MSME Invoices Right Now',
    excerpt: 'India\'s MSME sector is owed over 81 lakh crore in unpaid invoices. That is not just a statistic, it is a working capital crisis hiding in plain sight.',
    author: 'Pari Goyal',
    date: '2026-02-22',
    readTime: 6,
    featured: false,
    href: 'https://www.linkedin.com/pulse/81-lakh-crore-sitting-unpaid-msme-invoices-right-now-theres-m5ucc/',
  },
  {
    id: 9,
    category: 'deal-announcements',
    title: 'Akro closes Healthcare SaaS mandate: Pre-Series A, 3.5 Cr equity raise',
    excerpt: 'The company had 1.2 Cr ARR and profitable unit economics. Akro prepared the full deck and financial model, sourced investor intros, and closed in 11 weeks.',
    author: 'Pari Goyal',
    date: '2026-06-18',
    readTime: 3,
    featured: false,
    href: '',
  },
  {
    id: 10,
    category: 'deal-announcements',
    title: 'B2B Fintech: Seed round closed, 1.8 Cr, 40+ enterprise clients',
    excerpt: 'Three-month payback period, no prior institutional investors. Akro sourced 6 investor introductions and closed in 9 weeks.',
    author: 'Pari Goyal',
    date: '2026-06-02',
    readTime: 3,
    featured: false,
    href: '',
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
  const dest = article.href || `/insights/${article.id}`
  const isExternal = article.href?.startsWith('http')
  return (
    <FadeUp>
      <a
        href={dest}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className="group block rounded-2xl overflow-hidden border border-border hover:border-primary transition-colors bg-background"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-0">
          {/* Left: content */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <CategoryPill id={article.category} />
              <h2
                className="mt-4 mb-3 group-hover:text-primary transition-colors leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                  fontWeight: 700,
                  color: 'hsl(var(--foreground))',
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
                {isExternal ? 'Read on LinkedIn' : 'Read Article'} <ArrowRight size={12} />
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
                fontFamily: 'var(--font-display)',
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
  const dest = article.href || `/insights/${article.id}`
  const isExternal = article.href?.startsWith('http')
  return (
    <FadeUp delay={delay}>
      <a
        href={dest}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className="group block bg-white rounded-2xl border border-border hover:border-primary transition-colors h-full overflow-hidden"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <div className="p-6 flex flex-col h-full">
          <CategoryPill id={article.category} small />
          <h3
            className="mt-3 mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'hsl(var(--foreground))',
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
              {isExternal ? 'LinkedIn' : 'Read'} <ArrowRight size={10} />
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
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Get Akro's insights in your inbox.
        </h3>
        <p className="text-white/65 text-sm mb-6">
          Deal flow, market views, and fundraising intelligence, delivered weekly.
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
      <section
        className="px-6 pt-32 pb-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0a1f21 0%, #0f2a2c 50%, #2B2B2B 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(63,111,115,0.06) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <FadeUp>
            <p className="t-label mb-3" style={{ color: 'hsl(var(--primary))' }}>Insights</p>
            <h1
              className="mb-3 text-white"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Funding intelligence.<br />From the inside.
            </h1>
            <p className="text-white/55 text-base mb-8 max-w-xl">
              Fundraising strategy, market views, and deal thinking from the Akro team. Published on LinkedIn, collected here.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="relative max-w-2xl">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              />
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1) }}
                placeholder="Search articles, topics, or deals..."
                className="w-full pl-10 pr-4 py-3.5 text-sm text-white placeholder-white/40 border rounded-sm focus:outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
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
