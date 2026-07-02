import { useState, useRef, lazy, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, FileText, Users, Mail, TrendingUp, Bell, BarChart2, ChevronDown } from 'lucide-react'
import { CardStack } from '@/components/ui/card-stack'
import { supabase } from '@/lib/supabase'
import { useSEO } from '@/hooks/useSEO'
import logoIconImg from '@/assets/logo-icon.png'
const CelestialSphere = lazy(() => import('@/components/ui/celestial-sphere').then(m => ({ default: m.CelestialSphere })))

// ── Fade-up helper ──────────────────────────────────────────────────────────
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
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    Icon: FileText,
    title: 'Curated Deal Memos',
    body: 'Every opportunity comes with a full deal memo: sector, stage, deal size, business model, traction, and Akro\'s diligence summary. No raw, unverified pitches.',
  },
  {
    Icon: TrendingUp,
    title: 'Co-Investment with Akro',
    body: 'On select deals, investors can co-invest alongside Akro, giving them confidence that the deal has been internally backed and structured.',
  },
  {
    Icon: Mail,
    title: 'Monthly Deal Flow Newsletter',
    body: 'A curated digest of active opportunities, market insights, and Akro\'s deal pipeline, delivered monthly to all network members.',
  },
  {
    Icon: Users,
    title: 'Exclusive Events & Networking',
    body: 'Access to Akro-hosted investor events, founder pitch sessions, and ecosystem networking, in person and online.',
  },
  {
    Icon: BarChart2,
    title: 'Portfolio Monitoring Dashboard',
    body: 'Track every investment you\'ve made through Akro: revenue, traction milestones, and company updates, all in your portal. No need to chase founders for updates.',
  },
  {
    Icon: Bell,
    title: 'Early Access to Diligenced Deals',
    body: 'Network members get first look at new opportunities before they\'re distributed more widely. Priority access is reserved for active members.',
  },
]

const VETTING_STEPS = [
  { n: '01', label: 'Apply', body: 'Fill the application form. Tell us about yourself, your investment background, and what you\'re looking to deploy into.' },
  { n: '02', label: 'KYC & Financial Verification', body: 'We verify your identity (KYC), confirm your financial standing, and assess your stated investment capacity.' },
  { n: '03', label: 'Full Due Diligence', body: 'We review your investment history, conduct background checks, and complete our internal due diligence on your profile.' },
  { n: '04', label: 'Network Access', body: 'Once approved, you get full portal access: deal room, portfolio monitoring, newsletter, and event invites.' },
]

const DEAL_FLOW_POINTS = [
  {
    n: '01',
    title: 'Akro sources & diligences every deal',
    body: 'Every deal in the network has been originated by Akro, not submitted by a startup. We conduct our own diligence: financials, business model, team, market, and risks. You get our assessment, not just their pitch.',
  },
  {
    n: '02',
    title: 'You receive a full deal memo',
    body: 'For every opportunity, network members receive a structured memo: sector, stage, deal size, business model summary, traction metrics, use of funds, and Akro\'s diligence notes. Enough to make an informed first decision.',
  },
  {
    n: '03',
    title: 'Express interest: Akro facilitates',
    body: 'If a deal interests you, you express interest through the portal. Akro then facilitates the next steps: founder introductions, follow-up Q&A, and deal structuring. You don\'t chase; we manage the process.',
  },
]

const PORTFOLIO_FEATURES = [
  { title: 'Revenue Tracking', body: 'See monthly/quarterly revenue updates from portfolio companies as they submit their traction data to Akro.' },
  { title: 'Milestone Alerts', body: 'Get notified when a portfolio company hits a key milestone: new client, product launch, next funding round.' },
  { title: 'Traction Overview', body: 'User growth, retention, and key metrics displayed per company in your dashboard.' },
  { title: 'Company Updates', body: 'Founders submit periodic updates via the Akro portal. You see them instantly, without any back-and-forth.' },
]

const INVESTOR_TYPES = ['Angel Investor', 'HNI', 'Family Office', 'NBFC', 'Micro VC', 'Institutional Investor', 'Other']
const TICKET_SIZES = ['Under ₹25L', '₹25L–₹1 Cr', '₹1–5 Cr', '₹5–20 Cr', '₹20 Cr+']
const SECTORS = ['Healthcare', 'AI', 'SaaS', 'Manufacturing', 'Fintech', 'Consumer', 'Other']

const DEAL_CARDS = [
  { id: 1, title: 'Healthcare SaaS', description: 'Pre-Series A · ₹3.5 Cr equity raise · ₹1.2 Cr ARR, profitable unit economics. Full deck and model prepared by Akro.', tag: 'Healthcare' },
  { id: 2, title: 'B2B Fintech Platform', description: 'Seed · ₹1.8 Cr · 40+ enterprise clients, 3-month payback period. Akro sourced 6 investor intros, closed in 9 weeks.', tag: 'Fintech' },
  { id: 3, title: 'Manufacturing SME', description: 'Structured debt · ₹8 Cr · GST-backed underwriting, 3-year tenure. Working capital for capacity expansion.', tag: 'Manufacturing' },
  { id: 4, title: 'AI Infrastructure Co.', description: 'Seed · ₹2.5 Cr · Patent-pending inference optimisation stack. Pre-revenue, strong technical moat. Closed in 6 weeks.', tag: 'AI' },
  { id: 5, title: 'Export Trading House', description: 'Invoice factoring · ₹50L/month · Non-recourse, 90% advance on Day 0. VoloFin partnership. Immediate liquidity unlocked.', tag: 'Export' },
]

const FAQS = [
  { q: 'Who can apply to join?', a: 'Angel investors, HNIs, family offices, NBFCs, and institutional investors are all welcome to apply. All applications are reviewed personally by the Akro team. We look for credible investors with genuine intent to deploy.' },
  { q: 'What is the minimum ticket size?', a: 'There is no fixed minimum. Ticket sizes are deal-by-deal and depend on the specific opportunity. We will discuss this with you once you are part of the network.' },
  { q: 'How does the background check work?', a: 'Our vetting involves KYC verification, financial background assessment, and a full review of your investment history. This typically takes 5–7 business days. All information is treated with strict confidentiality.' },
  { q: 'Is there a fee to join the network?', a: 'There is no fee to join the Akro investor network. You only engage financially when you choose to participate in a deal.' },
  { q: 'How many deals will I get access to?', a: 'We prioritise quality over volume. Network members typically see 2–4 curated opportunities per month, each with a full deal memo and Akro\'s diligence summary.' },
]

const NETWORK_BRANDS = [
  { label: 'Angel Investors', style: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: 15 } },
  { label: 'Family Offices', style: { fontFamily: 'Palatino, Book Antiqua, serif', fontWeight: 400, letterSpacing: '-0.01em', fontSize: 16 } },
  { label: 'HNIs', style: { fontFamily: 'Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: 13 } },
  { label: 'Micro VCs', style: { fontFamily: 'Trebuchet MS, sans-serif', fontWeight: 600, letterSpacing: '0.01em', fontSize: 15, fontStyle: 'italic' as const } },
  { label: 'NBFCs', style: { fontFamily: 'Courier New, monospace', fontWeight: 700, letterSpacing: '0.12em', fontSize: 13 } },
  { label: 'Institutional Investors', style: { fontFamily: 'Impact, Arial Narrow, sans-serif', fontWeight: 400, letterSpacing: '0.04em', fontSize: 14 } },
  { label: 'Corporate Treasuries', style: { fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '-0.03em', fontSize: 13 } },
  { label: 'Healthcare', style: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: 15 } },
  { label: 'AI', style: { fontFamily: 'Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: 13 } },
  { label: 'B2B SaaS', style: { fontFamily: 'Trebuchet MS, sans-serif', fontWeight: 600, letterSpacing: '0.01em', fontSize: 15, fontStyle: 'italic' as const } },
  { label: 'Manufacturing', style: { fontFamily: 'Courier New, monospace', fontWeight: 700, letterSpacing: '0.1em', fontSize: 12 } },
  { label: 'Fintech', style: { fontFamily: 'Palatino, Book Antiqua, serif', fontWeight: 400, letterSpacing: '-0.01em', fontSize: 16 } },
]

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: '60vh',
        background: 'linear-gradient(145deg, #0e1208 0%, #1a1510 25%, #1e1a0e 55%, #2B2B2B 100%)',
      }}
    >
      {/* CelestialSphere — very blurred, just a colour wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.22, filter: 'blur(18px)', zIndex: 0 }}
      >
        <Suspense fallback={null}>
          <CelestialSphere hue={42} speed={0.14} zoom={2.2} particleSize={2} className="w-full h-full" />
        </Suspense>
      </div>

      {/* Mustard SVG glow — top-left bias */}
      <svg className="absolute pointer-events-none" aria-hidden="true"
        style={{ top: '-8%', left: '-5%', zIndex: 1 }}
        width="700" height="420" viewBox="0 0 700 420">
        <defs><filter id="inv-glow"><feGaussianBlur stdDeviation="32" /></filter></defs>
        <ellipse cx="260" cy="200" rx="300" ry="180" fill="rgba(242,183,5,0.11)" filter="url(#inv-glow)" />
      </svg>

      {/* Left-aligned content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-2xl">
          <FadeUp delay={0.2}>
            <h1
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'white',
                lineHeight: 1.03,
                letterSpacing: '-0.03em',
              }}
            >
              The deals you want.<br />None of the noise.
            </h1>
          </FadeUp>

          <FadeUp delay={0.38}>
            <p className="text-white/55 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg">
              Akro's investor network is curated, not open. Every member is vetted before they see a single deal.
            </p>
          </FadeUp>

          <FadeUp delay={0.52}>
            <a href="#apply" className="btn-slide btn-slide-mustard">
              <span>Apply to Join</span>
              <ArrowRight size={15} />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ── Network Marquee ────────────────────────────────────────────────────────
function NetworkMarquee() {
  return (
    <section className="py-12 px-6 overflow-hidden border-t border-border bg-background">
      <style>{`
        @keyframes inv-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .inv-marquee-track {
          display: flex;
          width: max-content;
          animation: inv-marquee 28s linear infinite;
        }
      `}</style>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Open to investors<br className="hidden md:block" /> and sectors including
          </p>
          <div className="md:col-span-3 overflow-hidden">
            <div className="inv-marquee-track">
              {[...NETWORK_BRANDS, ...NETWORK_BRANDS].map((b, i) => (
                <span
                  key={i}
                  className="mx-8 shrink-0 whitespace-nowrap"
                  style={{ ...b.style, color: 'hsl(var(--foreground) / 0.38)' }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Benefits ───────────────────────────────────────────────────────────────
function BenefitsSection() {
  return (
    <section className="section-y bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* Left — sticky editorial */}
          <FadeUp>
            <div className="lg:sticky lg:top-28">
              <p className="t-label text-primary mb-3">The Network</p>
              <h2
                className="mb-5 leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  color: 'hsl(var(--foreground))',
                }}
              >
                What being part of the Akro network means.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
                A curated network of verified investors accessing diligenced deals, portfolio monitoring, and Akro's ongoing support.
              </p>
              <a href="#apply" className="btn-slide btn-slide-mustard" style={{ display: 'inline-flex', width: 'fit-content' }}>
                <span>Apply to Join</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </FadeUp>

          {/* Right — benefit list */}
          <div className="divide-y divide-border">
            {BENEFITS.map(({ Icon, title, body }, i) => (
              <FadeUp key={title} delay={i * 0.06}>
                <div className="flex gap-5 py-6">
                  <div
                    className="flex-shrink-0 h-9 w-9 rounded-sm flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(63,111,115,0.1)' }}
                  >
                    <Icon size={16} style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-1.5">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Vetting Process ────────────────────────────────────────────────────────
function VettingSection() {
  return (
    <section className="section-y bg-secondary">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start mb-14">
          <FadeUp>
            <p className="t-label text-primary mb-3">Due Diligence</p>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
            >
              A network you have to earn.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-muted-foreground text-base leading-relaxed lg:pt-10">
              We review every application personally. No automated approvals. No shortcuts. The vetting process typically takes 5–7 business days. All information is treated with strict confidentiality.
            </p>
          </FadeUp>
        </div>

        {/* Connected timeline */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div
            className="hidden md:block absolute h-px"
            style={{
              top: 20,
              left: '5%',
              right: '5%',
              background: 'linear-gradient(90deg, #3F6F73 0%, rgba(63,111,115,0.3) 100%)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {VETTING_STEPS.map(({ n, label, body }, i) => (
              <FadeUp key={n} delay={i * 0.1}>
                <div>
                  {/* Circle node */}
                  <div className="flex md:block items-center gap-4 mb-4">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ background: '#3F6F73', color: 'white', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em' }}
                    >
                      {n}
                    </div>
                    <p className="font-bold text-foreground text-sm md:hidden">{label}</p>
                  </div>
                  <p className="font-bold text-foreground text-sm mb-2 hidden md:block">{label}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Deal Flow ──────────────────────────────────────────────────────────────
function DealFlowSection() {
  return (
    <section className="section-y bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp>
          <p className="t-label text-primary mb-3">Process</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
          >
            How we bring deals to you.
          </h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-xl">
            Every deal below is anonymised. Once you express interest through the portal, Akro facilitates the full introduction.
          </p>
        </FadeUp>

        {/* How it works — compact 3-step */}
        <FadeUp className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEAL_FLOW_POINTS.map(({ n, title, body }) => (
              <div key={n} className="p-5 bg-secondary rounded-sm border-l-2" style={{ borderLeftColor: '#3F6F73' }}>
                <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: 'hsl(var(--primary))' }}>{n}</span>
                <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Deal card stack */}
        <FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest mb-6 text-center" style={{ color: '#F2B705' }}>
            Sample Deal Memos: Drag to explore
          </p>
          <CardStack
            items={DEAL_CARDS}
            cardWidth={400}
            cardHeight={240}
            maxVisible={5}
            spreadDeg={36}
            overlap={0.44}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            showDots
            renderCard={(item, { active }) => (
              <div
                className="h-full w-full p-7 flex flex-col justify-between"
                style={{
                  background: active ? '#1a3538' : '#1e2020',
                  border: `1px solid ${active ? '#3F6F73' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 12,
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: '#F2B705' }}
                >
                  {item.tag}
                </span>
                <div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'white',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </div>
                <div style={{ height: 2, width: 28, background: active ? '#F2B705' : 'rgba(255,255,255,0.15)', borderRadius: 1, transition: 'background 0.3s' }} />
              </div>
            )}
          />
        </FadeUp>
      </div>
    </section>
  )
}

// ── Portfolio Monitoring ───────────────────────────────────────────────────
function PortfolioSection() {
  return (
    <section
      className="section-y relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #142022 0%, #1c2a2b 45%, #232e2e 100%)' }}
    >
      {/* Subtle teal dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(63,111,115,0.06) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Soft glow top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%', right: '-10%',
          width: 520, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(63,111,115,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-14 items-start">
          {/* Left editorial */}
          <FadeUp>
            <div className="lg:sticky lg:top-28">
              <p className="t-label text-primary mb-3">Portfolio</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Invest once.<br />Stay informed always.
              </h2>
              <p className="text-white/55 text-sm font-light leading-relaxed mb-8">
                Once you've deployed into a deal through Akro, you never have to chase the founder for updates again.
                Your portfolio monitoring dashboard tracks everything, automatically.
              </p>
              <a
                href="/portal"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: 'hsl(var(--primary))' }}
              >
                See how the portal works <ArrowRight size={14} />
              </a>
            </div>
          </FadeUp>

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_FEATURES.map(({ title, body }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div
                  className="p-6 rounded-sm h-full"
                  style={{
                    background: 'rgba(63,111,115,0.1)',
                    border: '1px solid rgba(63,111,115,0.22)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: '#3F6F73' }} />
                    <h3 className="font-bold text-white text-sm">{title}</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light">{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Deal Types ─────────────────────────────────────────────────────────────
const DEAL_COVERAGE_PILLARS = [
  { label: 'Sectors',    items: ['Healthcare & Hospitals', 'Artificial Intelligence', 'B2B SaaS', 'Manufacturing'] },
  { label: 'Stages',     items: ['Pre-Seed', 'Seed', 'Pre-Series A', 'Series A & Growth'] },
  { label: 'Deal Types', items: ['Equity Raise', 'Structured Debt', 'Debt Syndication', 'Co-Investment'] },
]

const COVERAGE_LINE_GRADIENT = 'linear-gradient(180deg, #3F6F73, #F2B705 70%, transparent)'

function DealTypesSection() {
  return (
    <section className="section-y bg-secondary overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp>
          <p className="t-label text-primary mb-3">Deal Coverage</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-16"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
          >
            Deal types we work on.
          </h2>
        </FadeUp>

        {/* Desktop — rising staircase */}
        <FadeUp delay={0.1}>
          <div className="hidden sm:block relative" style={{ height: '23vw', color: 'hsl(var(--foreground))' }}>
            {DEAL_COVERAGE_PILLARS.map((pillar, i) => (
              <div
                key={pillar.label}
                className="absolute flex flex-col items-center"
                style={{ left: `${4 + i * 33}%`, bottom: `${5 + i * 6}vw` }}
              >
                <div
                  className="flex items-center gap-2 rounded-full whitespace-nowrap"
                  style={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    padding: '0.65vw 1.3vw',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <img src={logoIconImg} alt="" style={{ width: '1.2vw', minWidth: 16, height: 'auto' }} />
                  {pillar.label}
                </div>
                <div className="relative flex flex-col items-center" style={{ marginTop: 8 }}>
                  <div style={{ width: 1, height: '10vw', backgroundImage: COVERAGE_LINE_GRADIENT }} />
                  <div className="absolute top-2 left-4 flex flex-col items-start gap-2">
                    {pillar.items.map(item => (
                      <span key={item} className="whitespace-nowrap text-muted-foreground" style={{ fontSize: 13 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Mobile — alternating flow */}
        <div className="flex flex-col sm:hidden w-full" style={{ color: 'hsl(var(--foreground))' }}>
          {DEAL_COVERAGE_PILLARS.map((pillar, i) => {
            const isRight = i % 2 !== 0
            return (
              <FadeUp key={pillar.label} delay={0.1 + i * 0.08}>
                <div className="flex flex-col pb-2" style={{ alignItems: isRight ? 'flex-end' : 'flex-start' }}>
                  <div
                    className="inline-flex items-center gap-2 rounded-full whitespace-nowrap"
                    style={{
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      padding: '10px 16px',
                    }}
                  >
                    <img src={logoIconImg} alt="" style={{ width: 15, height: 'auto' }} />
                    {pillar.label}
                  </div>
                  <div className="flex w-full" style={{ flexDirection: isRight ? 'row-reverse' : 'row' }}>
                    <div
                      style={{
                        width: 1, flexShrink: 0, minHeight: 100,
                        backgroundImage: COVERAGE_LINE_GRADIENT,
                        marginLeft: isRight ? 0 : 20, marginRight: isRight ? 20 : 0,
                      }}
                    />
                    <div
                      className="flex flex-col gap-2 pt-2 pb-2"
                      style={{ alignItems: isRight ? 'flex-end' : 'flex-start', paddingLeft: isRight ? 0 : 16, paddingRight: isRight ? 16 : 0 }}
                    >
                      {pillar.items.map(item => (
                        <span key={item} className="text-muted-foreground" style={{ fontSize: 13 }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Application Form ───────────────────────────────────────────────────────
function ApplicationForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', investorType: '', ticketSize: '', background: ''
  })
  const [sectors, setSectors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const toggleSector = (s: string) =>
    setSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('portal_applications').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        applicant_type: 'investor',
        metadata: {
          investor_type: form.investorType,
          investment_range: form.ticketSize,
          sectors_of_interest: sectors,
          background_note: form.background || null,
        },
      })
      if (err) throw err
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please email us at info@akroventures.com.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors bg-background'

  if (submitted) {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <div className="h-12 w-12 rounded-sm flex items-center justify-center mx-auto mb-4" style={{ background: '#3F6F73' + '18' }}>
          <FileText size={22} style={{ color: 'hsl(var(--primary))' }} />
        </div>
        <h3
          className="text-2xl font-bold text-foreground mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Application received.
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The Akro team will review your application within 5 business days.
          Check your inbox at <span className="text-foreground font-medium">{form.email}</span>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Full name *" required value={form.name} onChange={set('name')} className={inputCls} />
        <input type="email" placeholder="Email address *" required value={form.email} onChange={set('email')} className={inputCls} />
      </div>
      <input type="tel" placeholder="Phone number (with country code) *" required value={form.phone} onChange={set('phone')} className={inputCls} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select required value={form.investorType} onChange={set('investorType')} className={`${inputCls} cursor-pointer`}>
          <option value="" disabled>Investor type *</option>
          {INVESTOR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select required value={form.ticketSize} onChange={set('ticketSize')} className={`${inputCls} cursor-pointer`}>
          <option value="" disabled>Typical ticket size *</option>
          {TICKET_SIZES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Sectors multi-select */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Sectors of interest</p>
        <div className="flex flex-wrap gap-2">
          {SECTORS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSector(s)}
              className="px-3 py-1.5 rounded-sm text-sm border transition-colors"
              style={
                sectors.includes(s)
                  ? { background: '#3F6F73', color: 'white', borderColor: '#3F6F73' }
                  : { background: 'white', color: '#6B7280', borderColor: '#E5E7EB' }
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Tell us briefly about your investment background: sectors, stage, notable deals (if any). This helps us understand fit."
        value={form.background}
        onChange={set('background')}
        rows={4}
        className={inputCls}
        style={{ resize: 'vertical' }}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-sm text-sm font-bold uppercase tracking-wide text-foreground disabled:opacity-50 hover:opacity-90 transition-opacity"
        style={{ background: '#F2B705' }}
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Your application is reviewed by the Akro team within 5 business days. All information shared
        is strictly confidential. We do not share your details with any third party without your consent.
      </p>
    </form>
  )
}

// ── FAQ ────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="section-y border-t border-border bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <FadeUp>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
          >
            Questions from serious investors.
          </h2>
        </FadeUp>
        <div className="divide-y divide-border">
          {FAQS.map(({ q, a }, i) => (
            <FadeUp key={q} delay={i * 0.05}>
              <div>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors pr-4">
                    {q}
                  </span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 text-muted-foreground transition-transform"
                    style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="pb-5"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
                  </motion.div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Strip ──────────────────────────────────────────────────────────────
function CtaStrip() {
  return (
    <section className="py-16 px-6 text-center" style={{ background: 'rgba(63,111,115,0.95)' }}>
      <FadeUp>
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          If you're serious about deployment, we're serious about finding you the right deals.
        </h2>
        <p className="text-white/70 text-base font-light max-w-lg mx-auto mb-8">
          Join a network of verified investors deploying into diligenced opportunities across
          Healthcare, AI, SaaS, and Manufacturing.
        </p>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-sm text-foreground hover:scale-105 active:scale-95 transition-transform"
          style={{ background: '#F2B705' }}
        >
          Apply to Join <ArrowRight size={16} />
        </a>
      </FadeUp>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Investors() {
  useSEO({
    title: 'For Investors — Curated Deal Flow & Verified Capital Access',
    description: 'Join the Akro Ventures investor network for curated, pre-vetted deal flow across equity and structured credit, from ₹50L to ₹50Cr+. Right founder, right capital, right investor.',
    path: '/investors',
    faqs: FAQS,
  })
  return (
    <>
      <HeroSection />
      <NetworkMarquee />
      <BenefitsSection />
      <VettingSection />
      <DealFlowSection />
      <PortfolioSection />
      <DealTypesSection />

      <section id="apply" className="section-y bg-background">
        <div className="mx-auto max-w-2xl px-6">
          <FadeUp>
            <p className="t-label text-primary mb-3 text-center">Apply</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-3"
              style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
            >
              Apply to join the Akro investor network.
            </h2>
            <p className="text-muted-foreground text-sm text-center mb-10">
              Your application is reviewed by the Akro team within 5 business days.
              All information shared is strictly confidential.
            </p>
          </FadeUp>
          <ApplicationForm />
        </div>
      </section>

      <FAQSection />
      <CtaStrip />
    </>
  )
}
