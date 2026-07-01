import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Target, TrendingUp, FileText, BookOpen, Users,
  Globe, Landmark, ChevronDown, ChevronRight,
} from 'lucide-react'

const CALENDLY = 'https://calendly.com/akroventures-info/30-min-stand-up-call'
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4'
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
const SERVICES_A = [
  {
    Icon: Target,
    name: 'Business Model Assessment',
    fullName: 'Business Model Assessment & Strategic Review',
    body: 'We review your core model, unit economics, and market positioning, and give you a frank assessment of what\'s working and what needs strengthening before you approach investors.',
    tag: 'Assessment',
  },
  {
    Icon: TrendingUp,
    name: 'Fundraising Strategy',
    fullName: 'Fundraising Strategy & Capital Planning',
    body: 'We map the right capital structure for your stage: equity, debt, or a mix. We define raise size, valuation approach, and investor tier targeting.',
    tag: 'Strategy',
  },
  {
    Icon: FileText,
    name: 'Pitch Deck Review',
    fullName: 'Pitch Deck Review & Enhancement',
    body: 'We review your deck slide by slide, rewrite what isn\'t landing, and ensure the narrative is tight, credible, and investor-ready.',
    tag: 'Preparation',
  },
  {
    Icon: BookOpen,
    name: 'Financial Projections',
    fullName: 'Financial Projections & Investor Documentation',
    body: 'We build or review your financial model, ensure projections are defensible, and prepare the full documentation set investors expect.',
    tag: 'Documentation',
  },
  {
    Icon: Users,
    name: 'Investor Mapping',
    fullName: 'Investor Mapping & Outreach Assistance',
    body: 'We identify the right investors for your stage, sector, and ticket size, and support you with personalised outreach and warm introductions where possible.',
    tag: 'Outreach',
  },
  {
    Icon: Globe,
    name: 'Startup Positioning',
    fullName: 'Startup Positioning & Go-To-Market Guidance',
    body: 'We help you articulate what makes you different and ensure your GTM strategy is coherent and credible to investors.',
    tag: 'Positioning',
  },
  {
    Icon: Landmark,
    name: 'Ongoing Advisory',
    fullName: 'Ongoing Strategic Advisory',
    body: 'We stay with you through the fundraising process: available for prep calls, feedback after investor meetings, and course-correction when needed.',
    tag: 'Advisory',
  },
]

const SERVICES_B = [
  {
    name: 'Unsecured Business Loans',
    body: 'Access working capital without pledging assets. We identify the right lenders for your profile and handle the application end to end. Fast approvals, no unnecessary complexity.',
  },
  {
    name: 'Secured Loans',
    body: 'Leverage existing assets (property, shares, or receivables) to unlock larger financing at better rates. We structure the arrangement and negotiate terms on your behalf.',
  },
  {
    name: 'FDI & ECB Advisory',
    body: 'Navigating foreign direct investment or external commercial borrowings involves regulatory complexity. We simplify compliance, structure the capital optimally, and guide you through every step.',
  },
  {
    name: 'Export Financing',
    body: 'Access pre and post-shipment financing to support your export operations. We connect you with the right trade finance instruments and lenders suited to your business profile.',
  },
]

const JOURNEY_STEPS = [
  { n: '01', label: 'Assess', body: 'We review your business model, financials, and readiness. Honest, frank, no fluff.' },
  { n: '02', label: 'Strategise', body: 'We define the right capital structure, raise size, and investor targeting strategy.' },
  { n: '03', label: 'Prepare', body: 'We build your deck, model, and documentation. We sharpen everything until it\'s ready.' },
  { n: '04', label: 'Raise', body: 'We make introductions, support investor conversations, and stay with you to close.' },
]

const QUIZ_QS = [
  { q: 'What stage is your startup?', opts: ['Pre-Idea', 'Pre-Revenue', 'Revenue-Generating', 'Profitable'], w: [0, 10, 20, 30] },
  { q: 'Do you have a pitch deck?', opts: ['No', 'Draft', 'Investor-Ready'], w: [0, 9, 18] },
  { q: 'Do you have financial projections?', opts: ['No', 'Basic', 'Detailed 3-year model'], w: [0, 7, 16] },
  { q: 'Have you raised before?', opts: ['No', 'Friends & Family', 'Institutional'], w: [0, 5, 12] },
  { q: 'What is your target raise size?', opts: ['Under ₹1 Cr', '₹1–5 Cr', '₹5–20 Cr', '₹20 Cr+'], w: [2, 4, 6, 8] },
  { q: 'Do you have a clear GTM strategy?', opts: ['No', 'Partially', 'Yes, documented'], w: [0, 5, 10] },
  { q: 'Have you spoken to investors in the last 6 months?', opts: ['No', 'Informally', 'Formally'], w: [0, 3, 6] },
]

const FAQS = [
  { q: 'Do you work on both equity and debt?', a: 'Yes. Akro advises on both equity fundraising and debt syndication. Depending on your stage, model, and goals, we help you determine the right capital mix, then execute on it.' },
  { q: 'How long does the fundraising process typically take?', a: 'It varies. For equity raises, typically 3–6 months from mandate to close. For debt, 4–8 weeks. Our preparation work upfront significantly reduces the overall timeline.' },
  { q: 'What does Akro charge for its services?', a: 'Our fee structure varies by engagement: advisory retainer, success fee, or a combination. We discuss this transparently on our first call. No hidden charges.' },
  { q: 'How is Akro different from a broker or aggregator?', a: 'Brokers connect you to lenders or investors and step back. Akro stays involved end to end, from reviewing your model to structuring your deal to supporting you through negotiations. We are advisors, not introducers.' },
  { q: 'What documents do I need to get started?', a: 'For startups: pitch deck, financials (if available), and a brief on your raise. For businesses: last 2 years\' financials, bank statements, and details of the funding requirement. We\'ll guide you through exactly what\'s needed on our first call.' },
  { q: 'Do you guarantee funding?', a: 'No, and any firm that does is not being honest with you. What we guarantee is rigorous preparation, the right introductions, and full support through the process. Our track record speaks for itself.' },
]

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: '62vh',
        background: 'linear-gradient(145deg, #0a1f21 0%, #0f2224 28%, #1a3538 60%, #2B2B2B 100%)',
      }}
    >
      {/* Cinematic video hint — extreme blur, texture only */}
      <video
        src={HERO_VIDEO}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ filter: 'blur(60px)', transform: 'scale(1.25)', opacity: 0.11, zIndex: 0 }}
        aria-hidden="true"
      />

      {/* SVG teal glow — top-left bias */}
      <svg className="absolute pointer-events-none" aria-hidden="true"
        style={{ top: '-10%', left: '-8%', zIndex: 1 }}
        width="800" height="500" viewBox="0 0 800 500">
        <defs><filter id="founders-glow"><feGaussianBlur stdDeviation="32" /></filter></defs>
        <ellipse cx="280" cy="230" rx="340" ry="200" fill="rgba(63,111,115,0.16)" filter="url(#founders-glow)" />
      </svg>

      {/* Left-aligned content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-2xl">
          <FadeUp delay={0.2}>
            <h1
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'white',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              We don't just connect you<br />to investors. We make sure<br />you're ready for them.
            </h1>
          </FadeUp>

          <FadeUp delay={0.38}>
            <p className="text-white/55 text-base font-light leading-relaxed mb-10 max-w-lg">
              Whether you're a founder building your first raise or a business owner looking to access capital, Akro works with you end to end.
            </p>
          </FadeUp>

          <FadeUp delay={0.52}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#startup-founders" className="btn-slide">
                <span>Startup Founders</span>
                <ArrowRight size={15} />
              </a>
              <a href="#growing-businesses" className="btn-slide btn-slide-mustard">
                <span>Growing Businesses</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ── Service Selector (visual, not a grid) ──────────────────────────────────
function ServiceSelector() {
  const [active, setActive] = useState(0)
  const service = SERVICES_A[active]
  const ActiveIcon = service.Icon

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-0 rounded-sm overflow-hidden shadow-lg border border-border">
      {/* Left — list */}
      <div style={{ background: '#2B2B2B' }}>
        {SERVICES_A.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setActive(i)}
            className="w-full text-left px-5 py-4 flex items-center justify-between group transition-colors"
            style={{
              background: active === i ? '#3F6F73' : 'transparent',
              borderBottom: i < SERVICES_A.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
          >
            <span
              className="text-sm font-medium leading-snug transition-colors"
              style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.55)' }}
            >
              {s.name}
            </span>
            {active === i && <ChevronRight size={14} className="text-white flex-shrink-0" />}
          </button>
        ))}
      </div>

      {/* Right — detail */}
      <div className="bg-background p-8 md:p-10 flex flex-col justify-center min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-10 w-10 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ background: '#3F6F73' + '1a' }}
              >
                <ActiveIcon size={18} style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'hsl(var(--primary))' }}
              >
                {service.tag}
              </span>
            </div>
            <h3
              className="text-xl md:text-2xl font-bold mb-4 leading-snug"
              style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
            >
              {service.fullName}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg">
              {service.body}
            </p>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-slide" style={{ display: 'inline-flex', width: 'fit-content' }}>
              <span>Book a Call</span>
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Readiness Calculator ───────────────────────────────────────────────────
function ReadinessCalculator() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const total = QUIZ_QS.length
  const done = step >= total

  const score = answers.reduce((sum, v) => sum + v, 0)
  const scoreLabel =
    score <= 40
      ? 'Early Stage: Let\'s build your foundation first'
      : score <= 70
      ? 'Getting There: A few key gaps to close'
      : 'Ready to Raise: Let\'s get you in front of investors'
  const scoreTeal = score <= 40 ? '#e05252' : score <= 70 ? '#F2B705' : '#3F6F73'

  const handleNext = () => {
    if (selected === null) return
    const w = QUIZ_QS[step].w[selected]
    setAnswers(prev => [...prev, w])
    setSelected(null)
    setStep(s => s + 1)
  }

  const handleReset = () => { setStep(0); setAnswers([]); setSelected(null) }

  return (
    <div className="bg-background rounded-sm shadow-md p-8 max-w-xl mx-auto" style={{ borderTop: '3px solid #3F6F73' }}>
      <p className="t-label text-primary mb-2">How fundraising-ready are you?</p>

      {!done ? (
        <>
          <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#3F6F73' }}
              initial={{ width: 0 }}
              animate={{ width: `${(step / total) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-muted-foreground mb-3">Question {step + 1} of {total}</p>
          <h4
            className="text-xl font-bold mb-6 leading-snug"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
          >
            {QUIZ_QS[step].q}
          </h4>
          <div className="space-y-3 mb-6">
            {QUIZ_QS[step].opts.map((opt, i) => (
              <button
                key={opt}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-4 py-3 rounded-sm border text-sm transition-all ${
                  selected === i
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-border text-foreground hover:border-primary/40'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="btn-slide w-full disabled:opacity-40"
          >
            <span>{step === total - 1 ? 'See my score' : 'Next'}</span>
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p
            className="text-7xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: scoreTeal }}
          >
            {score}<span className="text-3xl text-foreground/30">/100</span>
          </p>
          <p className="font-semibold text-base mb-4" style={{ color: scoreTeal }}>{scoreLabel}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm mx-auto">
            Book a call and we'll walk through your score and what it means for your raise.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-slide btn-slide-mustard">
              <span>Book a Call</span>
              <ArrowRight size={14} />
            </a>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm text-sm text-muted-foreground border border-border hover:text-foreground transition-colors"
            >
              Retake quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ── Journey Timeline ───────────────────────────────────────────────────────
function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="relative">
      {/* Connector line */}
      <div className="absolute top-[28px] left-[28px] right-[calc(25%-46px)] h-px hidden lg:block" style={{ background: 'rgba(63,111,115,0.15)', zIndex: 0 }}>
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #3F6F73, rgba(63,111,115,0.4))', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {JOURNEY_STEPS.map(({ n, label, body }, i) => (
          <motion.div
            key={n}
            className="flex flex-col items-center lg:items-start text-center lg:text-left relative"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.15 }}
          >
            {/* Node */}
            <div className="relative mb-5 z-10">
              <motion.div
                className="h-14 w-14 rounded-full flex items-center justify-center border-2"
                style={{ background: '#F4F6F2', borderColor: '#3F6F73' }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: 'backOut', delay: 0.3 + i * 0.15 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'hsl(var(--primary))',
                  }}
                >
                  {n}
                </span>
              </motion.div>
              {/* Glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(63,111,115,0.15)' }}
                animate={inView ? { scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 + i * 0.3 }}
              />
            </div>

            <p className="font-bold text-foreground text-base mb-2" style={{ letterSpacing: '-0.01em' }}>{label}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Track A ────────────────────────────────────────────────────────────────
function TrackASection() {
  return (
    <section id="startup-founders" className="section-y relative overflow-hidden bg-secondary">
      {/* Subtle teal dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(63,111,115,0.07) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="t-label text-primary mb-3">For Startup Founders</p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
          >
            Strategy first. Capital follows.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-12">
            We don't start with investor intros. We start with your business. Akro works alongside you to
            strengthen your model, sharpen your story, and prepare every document investors expect, so
            when you walk into a room, you're ready.
          </p>
        </FadeUp>

        {/* Visual service selector */}
        <FadeUp delay={0.1} className="mb-16">
          <ServiceSelector />
        </FadeUp>

        {/* 4-step journey — connected timeline */}
        <FadeUp>
          <h3
            className="text-2xl font-bold mb-12 text-center"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
          >
            The Founder Journey
          </h3>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-16">
          <JourneyTimeline />
        </FadeUp>

        {/* Readiness calculator */}
        <FadeUp>
          <ReadinessCalculator />
        </FadeUp>
      </div>
    </section>
  )
}

// ── EMI Calculator ─────────────────────────────────────────────────────────
function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000)
  const [rate, setRate] = useState(12)
  const [months, setMonths] = useState(36)

  const R = rate / 12 / 100
  const emi = R === 0 ? principal / months : (principal * R * Math.pow(1 + R, months)) / (Math.pow(1 + R, months) - 1)
  const total = emi * months
  const interest = total - principal

  const fmt = (n: number) =>
    n >= 10000000
      ? `₹${(n / 10000000).toFixed(2)} Cr`
      : n >= 100000
      ? `₹${(n / 100000).toFixed(1)} L`
      : `₹${Math.round(n).toLocaleString('en-IN')}`

  const TENURES = [6, 12, 18, 24, 36, 48, 60, 84, 120]

  return (
    <div className="bg-background rounded-sm shadow-md p-8 max-w-2xl mx-auto" style={{ borderTop: '3px solid #F2B705' }}>
      <p className="t-label mb-2" style={{ color: '#F2B705' }}>Calculate your loan repayment</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Loan Amount: {fmt(principal)}
          </label>
          <input
            type="range"
            min={100000}
            max={50000000}
            step={100000}
            value={principal}
            onChange={e => setPrincipal(+e.target.value)}
            className="w-full accent-[#F2B705]"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₹1 L</span><span>₹5 Cr</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Annual Rate (%)
          </label>
          <input
            type="number"
            min={6}
            max={36}
            step={0.5}
            value={rate}
            onChange={e => setRate(Math.max(0, +e.target.value))}
            className="w-full border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Tenure
          </label>
          <select
            value={months}
            onChange={e => setMonths(+e.target.value)}
            className="w-full border border-border rounded-sm px-3 py-2 text-sm text-foreground bg-background focus:outline-none focus:border-primary"
          >
            {TENURES.map(t => (
              <option key={t} value={t}>
                {t >= 12 ? `${t / 12} yr${t / 12 > 1 ? 's' : ''}` : `${t} months`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Monthly EMI</p>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--primary))' }}
            >
              {fmt(emi)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Total Interest</p>
          <p className="font-semibold text-sm text-foreground">{fmt(interest)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Total Repayment</p>
          <p className="font-semibold text-sm text-foreground">{fmt(total)}</p>
        </div>
      </div>

      <a
        href={CALENDLY}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        Want help structuring the right loan? Book a call <ArrowRight size={15} />
      </a>
    </div>
  )
}

// ── Quote Strip ────────────────────────────────────────────────────────────
function QuoteStrip() {
  return (
    <section className="py-16 px-6 relative overflow-hidden" style={{ background: '#1a2e30' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(63,111,115,0.08) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'white',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
          }}
        >
          "The wrong capital at the wrong time is worse than no capital at all."
        </p>
        <p className="mt-4 text-xs uppercase tracking-widest font-semibold" style={{ color: 'hsl(var(--primary))' }}>
          Rohit Jain, Co-Founder
        </p>
      </div>
    </section>
  )
}

// ── Track B ────────────────────────────────────────────────────────────────
function TrackBSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="growing-businesses" className="section-y relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #0f2224 0%, #1a3538 55%, #232e2e 100%)' }}>
      {/* Mustard dot grid on dark */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(242,183,5,0.04) 1px, transparent 0)',
        backgroundSize: '36px 36px',
      }} />
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="t-label mb-3" style={{ color: '#F2B705' }}>For Growing Businesses</p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'white' }}
          >
            Access the right capital, faster than you think.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-12" style={{ color: 'rgba(255,255,255,0.6)' }}>
            We simplify the process so you can focus on running your business. Whether you need working
            capital, want to leverage assets, or are exploring international financing options, Akro
            structures the right solution and handles the complexity end to end.
          </p>
        </FadeUp>

        {/* Visual selector — mustard accent */}
        <FadeUp delay={0.1} className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-0 rounded-sm overflow-hidden shadow-lg border border-border">
            <div style={{ background: '#2B2B2B' }}>
              {SERVICES_B.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActive(i)}
                  className="w-full text-left px-5 py-5 flex items-center justify-between transition-colors"
                  style={{
                    background: active === i ? '#F2B705' : 'transparent',
                    borderBottom: i < SERVICES_B.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  <span
                    className="text-sm font-medium leading-snug"
                    style={{ color: active === i ? '#2B2B2B' : 'rgba(255,255,255,0.55)' }}
                  >
                    {s.name}
                  </span>
                  {active === i && <ChevronRight size={14} style={{ color: 'hsl(var(--foreground))', flexShrink: 0 }} />}
                </button>
              ))}
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center min-h-[260px]" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="h-1 w-8 rounded-full mb-5" style={{ background: '#F2B705' }} />
                  <h3
                    className="text-xl md:text-2xl font-bold mb-4 leading-snug"
                    style={{ fontFamily: 'var(--font-display)', color: 'white' }}
                  >
                    {SERVICES_B[active].name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {SERVICES_B[active].body}
                  </p>
                  <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-slide btn-slide-mustard" style={{ display: 'inline-flex', width: 'fit-content' }}>
                    <span>Book a Call</span>
                    <ArrowRight size={14} />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <EMICalculator />
        </FadeUp>
      </div>
    </section>
  )
}

// ── FAQ ────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="section-y bg-secondary">
      <div className="mx-auto max-w-3xl px-6">
        <FadeUp>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
          >
            Questions founders and business owners ask us.
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
    <section className="py-16 px-6 text-center relative overflow-hidden" style={{ background: 'rgba(63,111,115,0.95)' }}>
      <FadeUp>
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Wherever you are in your journey, let's talk.
        </h2>
        <p className="text-white/70 text-base font-light max-w-lg mx-auto mb-8">
          One conversation is all it takes to understand where you are and what it would take to get you funded.
        </p>
        <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-slide btn-slide-mustard">
          <span>Book a Call</span>
          <ArrowRight size={15} />
        </a>
      </FadeUp>
    </section>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Founders() {
  return (
    <>
      <HeroSection />
      <TrackASection />
      <QuoteStrip />
      <TrackBSection />
      <FAQSection />
      <CtaStrip />
    </>
  )
}
