import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react'
import { RadialOrbitalTimeline } from '@/components/ui/radial-orbital-timeline'
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/motion/FadeIn'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import rohitImg from '@/assets/rohit.jpg'
import akshitaImg from '@/assets/akshita.jpg'
import { useSEO } from '@/hooks/useSEO'

// eslint-disable-next-line
const CALENDLY = 'https://calendly.com/akroventures-info/30-min-stand-up-call'
const EASE = [0.22, 1, 0.36, 1] as const
const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'

// ── Vertical slide word ticker ────────────────────────────────────────────────
const TICKER_WORDS = ['conviction', 'precision', 'clarity', 'purpose', 'resolve']

function WordTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % TICKER_WORDS.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      style={{ height: '1.15em', verticalAlign: 'bottom' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'block', color: '#F2B705' }}
        >
          {TICKER_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || triggered.current) return
    triggered.current = true
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return { count, ref }
}

interface StatProps { prefix?: string; target: number; suffix: string; label: string }
function AnimatedStat({ prefix = '', target, suffix, label }: StatProps) {
  const { count, ref } = useCountUp(target)
  return (
    <div ref={ref}>
      <div
        className="font-display text-accent tabular-nums"
        style={{ fontSize: 'clamp(1.375rem, 4.5vw, 3rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}
      >
        {prefix}{count}{suffix}
      </div>
      <div className="t-label text-muted-foreground mt-3">{label}</div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const OUTCOMES_CAROUSEL = [
  {
    label: 'Project Finance · Hyderabad',
    metric: '₹45Cr',
    descriptor: 'Residential township. Senior + Mezzanine hybrid. Funded in 58 days.',
    category: 'Term Loan',
    detail: 'Developer had strong land assets but no banking relationship.',
    bg: '#283C40',
    panel: '#304650',
  },
  {
    label: 'Startup Equity · Mumbai',
    metric: 'Seed+',
    descriptor: 'Closed above target. First cheque in 18 days after mandate.',
    category: 'Equity Advisory',
    detail: 'B2B SaaS founder. Six months of failed outreach. One restructured narrative.',
    bg: '#1A1A1A',
    panel: '#232323',
  },
  {
    label: 'Working Capital · Pune',
    metric: '₹2.8Cr',
    descriptor: 'Unsecured OD sanctioned in 22 days. No collateral.',
    category: 'Working Capital',
    detail: 'D2C brand. Structured entirely against GST returns and bank statements.',
    bg: '#3F6F73',
    panel: '#4A8186',
  },
  {
    label: 'Cross-border · Bengaluru',
    metric: '$2M',
    descriptor: 'ECB structured and placed. Full RBI compliance.',
    category: 'ECB / FDI',
    detail: 'Tech startup needed USD-denominated debt to match their revenue currency.',
    bg: '#252525',
    panel: '#2E2E2E',
  },
]

const steps = [
  {
    n: '01',
    title: 'Discovery Call',
    desc: 'We listen, you talk. 15 minutes tells us everything we need to know about fit, readiness, and the right path forward.',
  },
  {
    n: '02',
    title: 'Capital Blueprint',
    desc: 'Cashflow mapped. Capital structure designed. We tell you exactly what you qualify for and what is standing in the way.',
  },
  {
    n: '03',
    title: 'Lender Matchmaking',
    desc: 'Curated outreach to the right desks. No spray-and-pray. Only lenders we know will look at your profile seriously.',
  },
  {
    n: '04',
    title: 'Capital Secured',
    desc: 'Term sheet negotiated. Conditions reviewed. Capital disbursed. We stay on the deal until funds arrive.',
  },
]

const stats = [
  { prefix: '₹', target: 200, suffix: 'Cr+', label: 'Capital Facilitated' },
  { target: 50,  suffix: '+',  label: 'Founders Served' },
  { target: 95,  suffix: '%',  label: 'Client Approval Rate' },
  { target: 40,  suffix: '+',  label: 'Lender Relationships' },
]

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — HERO (centered, cinematic)
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-18%'])

  return (
    <section ref={sectionRef} className="relative bg-charcoal overflow-hidden min-h-screen flex flex-col" aria-label="Hero">

      {/* Background video */}
      <video
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'blur(16px)', transform: 'scale(1.1)' }}
        aria-hidden="true"
      />
      {/* Charcoal overlay — high opacity suppresses blue video cast */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(36,36,36,0.84)' }} aria-hidden="true" />

      {/* Centered content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex flex-col items-center justify-center text-center flex-1 px-6 py-24 pt-32"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">

          <h1 className="t-display-xl font-display text-white leading-tight">
            <span className="block" style={{ overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'inline-block' }}
                initial={reduced ? {} : { filter: 'blur(10px)', opacity: 0, y: 50 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                Capital, structured
              </motion.span>
            </span>
            <span className="block" style={{ overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'inline-block' }}
                initial={reduced ? {} : { filter: 'blur(10px)', opacity: 0, y: 50 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.33 }}
              >
                with <WordTicker />.
              </motion.span>
            </span>
          </h1>

          <FadeIn delay={0.52} direction="up">
            <p className="t-body-xl text-white/55 leading-relaxed max-w-xl">
              We advise Indian founders on capital structure, lender selection,
              and deal architecture. Strategy first, paperwork second.
            </p>
          </FadeIn>

          <FadeIn delay={0.66} direction="up">
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Link to="/founders" className="btn-slide btn-slide-teal">
                <span>For Founders</span>
                <ArrowRight size={14} />
              </Link>
              <Link to="/investors" className="btn-slide btn-slide-mustard">
                <span>For Investors</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex flex-col items-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-white/20" />
        </motion.div>
      </motion.div>

    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — JOURNEY (manifesto + two paths)
// ─────────────────────────────────────────────────────────────────────────────
function JourneySection() {
  return (
    <section className="bg-charcoal section-y border-t border-white/[0.06]" aria-label="Advisory paths">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* Manifesto quote — no decorative line */}
        <ScrollReveal className="mb-20 max-w-4xl">
          <span className="t-label text-white/40 tracking-[0.2em] mb-5 block">Our Thesis</span>
          <p
            className="font-display italic text-white/90 leading-[1.1]"
            style={{ fontSize: 'clamp(1.625rem, 3.2vw, 3rem)' }}
          >
            "Most founders don't have a funding problem.
            <br className="hidden lg:block" /> They have a structure problem."
          </p>
        </ScrollReveal>

        {/* Two-column paths */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">

          {/* For Founders */}
          <ScrollReveal className="py-10 lg:py-0 lg:pr-16 flex flex-col items-center lg:items-start" delay={0}>
            <span className="t-label text-accent mb-6 block tracking-widest">FOR FOUNDERS</span>
            <h2 className="t-display-m font-display text-white mb-4 leading-[1.08] text-center lg:text-left">
              Capital to build.
              <br />
              <em className="text-white/50 not-italic">Strategy to sustain.</em>
            </h2>
            <p className="t-body-m text-white/55 mb-8 leading-relaxed max-w-md text-center lg:text-left">
              Six capital solutions, one advisory relationship. Click any node to explore.
            </p>
            <RadialOrbitalTimeline mode="founders" />
            <Link to="/founders" className="btn-slide btn-slide-teal mt-8">
              <span>Founder Services</span>
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>

          {/* For Investors */}
          <ScrollReveal className="py-10 lg:py-0 lg:pl-16 flex flex-col items-center lg:items-start" delay={0.1}>
            <span className="t-label text-accent mb-6 block tracking-widest">FOR INVESTORS</span>
            <h2 className="t-display-m font-display text-white mb-4 leading-[1.08] text-center lg:text-left">
              Curated deal flow.
              <br />
              <em className="text-white/50 not-italic">Structured access.</em>
            </h2>
            <p className="t-body-m text-white/55 mb-8 leading-relaxed max-w-md text-center lg:text-left">
              Four pillars of investor access. Click any node to see what you get.
            </p>
            <RadialOrbitalTimeline mode="investors" />
            <Link to="/investors" className="btn-slide btn-slide-mustard mt-8">
              <span>Investor Access</span>
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

const CAROUSEL_TRANS = 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)'

function OutcomesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex(prev => dir === 'next' ? (prev + 1) % 4 : (prev + 3) % 4)
    setTimeout(() => setIsAnimating(false), 650)
  }, [isAnimating])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  navigate('prev')
      if (e.key === 'ArrowRight') navigate('next')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const center = activeIndex
  const left   = (activeIndex + 3) % 4
  const right  = (activeIndex + 1) % 4
  const back   = (activeIndex + 2) % 4

  // Reduced height so nav + view-all are visible without scrolling
  const STAGE_H = isMobile ? 480 : 520

  function getRole(i: number): 'center' | 'left' | 'right' | 'back' {
    if (i === center) return 'center'
    if (i === left)   return 'left'
    if (i === right)  return 'right'
    return 'back'
  }

  function getCardStyle(i: number): React.CSSProperties {
    const role = getRole(i)
    const data = OUTCOMES_CAROUSEL[i]

    const base: React.CSSProperties = {
      position: 'absolute',
      aspectRatio: '3 / 4',
      backgroundColor: data.panel,
      transition: reduced ? 'none' : CAROUSEL_TRANS,
      willChange: reduced ? 'auto' : 'transform, filter, opacity',
      overflow: 'hidden',
    }

    switch (role) {
      case 'center': return {
        ...base,
        left: '50%',
        height: isMobile ? '70%' : '82%',
        bottom: 0,
        transform: `translateX(-50%) scale(${isMobile ? 1.0 : 1.12})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
      }
      case 'left': return {
        ...base,
        left: isMobile ? '8%' : '22%',
        height: isMobile ? '36%' : '48%',
        bottom: isMobile ? '5%' : '8%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.6,
        zIndex: 10,
      }
      case 'right': return {
        ...base,
        left: isMobile ? '92%' : '78%',
        height: isMobile ? '36%' : '48%',
        bottom: isMobile ? '5%' : '8%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.6,
        zIndex: 10,
      }
      case 'back': return {
        ...base,
        left: '50%',
        height: isMobile ? '28%' : '37%',
        bottom: isMobile ? '5%' : '8%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: 0.3,
        zIndex: 5,
      }
    }
  }

  const active = OUTCOMES_CAROUSEL[activeIndex]
  const btnSize = isMobile ? 44 : 52

  return (
    <section
      className="relative overflow-hidden h-viewport-safe"
      style={{
        backgroundColor: active.bg,
        transition: reduced ? 'none' : 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        minHeight: 560,
        maxHeight: 900,
      }}
      aria-label="Deal outcomes"
    >
      {/* Ghost text "CAPITAL" */}
      <div
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
        style={{ top: isMobile ? '6%' : '10%', zIndex: 2 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-stencil)',
            fontSize: 'clamp(70px, 22vw, 280px)',
            fontWeight: 700,
            color: 'white',
            opacity: 0.06,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            whiteSpace: 'nowrap',
          }}
        >
          CAPITAL
        </span>
      </div>

      {/* Eyebrow */}
      <div className="absolute top-7 left-5 sm:top-9 sm:left-9 z-50">
        <span className="t-label text-white/35 tracking-[0.22em]">AKRO VENTURES</span>
      </div>

      {/* Card stage */}
      <div
        className="relative w-full"
        style={{ height: STAGE_H, overflow: 'hidden', zIndex: 3 }}
      >
        {OUTCOMES_CAROUSEL.map((deal, i) => {
          const role = getRole(i)
          const isCenter = role === 'center'

          return (
            <div key={i} style={getCardStyle(i)}>
              <div className="p-5 sm:p-7 h-full flex flex-col">
                <p className="t-label text-white/45 mb-3 sm:mb-4">{deal.category}</p>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isCenter
                      ? (isMobile ? 'clamp(1.5rem, 5vw, 4rem)' : 'clamp(2.25rem, 5vw, 4rem)')
                      : 'clamp(1.125rem, 2.5vw, 1.75rem)',
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {deal.metric}
                </div>

                {isCenter && (
                  <p className="t-body-s sm:t-body-m text-white/65 leading-relaxed mt-1 mb-3">
                    {deal.descriptor}
                  </p>
                )}

                {isCenter && (
                  <>
                    <div className="flex-1" />
                    <div className="border-t border-white/10 pt-4">
                      <p className="t-body-s text-white/45 leading-relaxed mb-2">
                        {deal.detail}
                      </p>
                      <p className="t-label text-white/28">{deal.label}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom-left — label + nav */}
      <div
        className="absolute z-50"
        style={{
          bottom: isMobile ? '1.5rem' : '2.5rem',
          left: isMobile ? '1.25rem' : '3rem',
          maxWidth: 340,
        }}
      >
        <p
          className="font-bold uppercase text-white tracking-[0.03em] mb-1.5"
          style={{ fontSize: isMobile ? '0.875rem' : '1.125rem' }}
        >
          Deal Outcomes
        </p>
        <p className="t-label text-white/40 mb-4 hidden sm:block">
          Real capital · Real structures · All anonymised
        </p>

        <div className="flex items-center gap-3">
          {(['prev', 'next'] as const).map((dir, di) => (
            <button
              key={dir}
              onClick={() => navigate(dir)}
              aria-label={dir === 'prev' ? 'Previous deal' : 'Next deal'}
              style={{
                width: btnSize, height: btnSize,
                border: '2px solid rgba(255,255,255,0.35)',
                borderRadius: '50%',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'background 150ms, transform 150ms',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.transform = 'scale(1.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              {di === 0
                ? <ArrowLeft size={isMobile ? 16 : 18} strokeWidth={2.25} />
                : <ArrowRight size={isMobile ? 16 : 18} strokeWidth={2.25} />
              }
            </button>
          ))}

          {/* Dots */}
          <div className="flex items-center gap-1.5 ml-1">
            {OUTCOMES_CAROUSEL.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (!isAnimating) { setIsAnimating(true); setActiveIndex(i); setTimeout(() => setIsAnimating(false), 650) } }}
                aria-label={`Go to deal ${i + 1}`}
                style={{
                  width: i === activeIndex ? '1.25rem' : '0.3125rem',
                  height: '0.3125rem',
                  borderRadius: 9999,
                  background: i === activeIndex ? 'white' : 'rgba(255,255,255,0.28)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 300ms ease, background 300ms ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-right — View all */}
      <div
        className="absolute z-50"
        style={{
          bottom: isMobile ? '1.5rem' : '2.5rem',
          right: isMobile ? '1.25rem' : '2.5rem',
        }}
      >
        <Link
          to="/founders"
          className="flex items-center gap-2 text-white/65 hover:text-white transition-colors duration-200"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: isMobile ? '1rem' : 'clamp(1.125rem, 2.2vw, 1.75rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textDecoration: 'none',
          }}
        >
          View all
          <ArrowRight
            size={isMobile ? 14 : 18}
            strokeWidth={2.25}
            style={{ flexShrink: 0 }}
          />
        </Link>
      </div>
    </section>
  )
}



// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — PROCESS
// ─────────────────────────────────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section className="bg-charcoal section-y border-t border-white/[0.06]" aria-label="How we work">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 xl:gap-32">

          {/* Left — sticky statement — no decorative line */}
          <div className="lg:sticky lg:top-28 lg:self-start mb-16 lg:mb-0">
            <ScrollReveal>
              <span className="t-label text-white/40 tracking-widest mb-8 block">The Process</span>
              <h2 className="t-display-xl font-display text-white leading-[1.02]">
                Not a funding
                <br /> problem.
              </h2>
              <p className="t-display-m font-display text-accent italic mt-2 leading-[1.02]">
                A structure problem.
              </p>
              <p className="t-body-l text-white/60 mt-8 max-w-md leading-relaxed">
                From first call to funded capital. Four steps, absolute discretion,
                no upfront fees.
              </p>
              <div className="mt-10">
                <a href={CALENDLY} target="_blank" rel="noreferrer">
                  <Button variant="ghost-light" size="lg">
                    Book a Discovery Call <ArrowUpRight size={14} />
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — steps */}
          <div className="lg:py-2">
            <Stagger stagger={0.09}>
              {steps.map((step, i) => (
                <StaggerItem key={step.n}>
                  <div
                    className={`flex gap-8 md:gap-12 py-8 ${
                      i < steps.length - 1 ? 'border-b border-white/[0.09]' : ''
                    }`}
                  >
                    <span
                      className="font-display font-bold leading-none text-white/[0.22] tabular-nums shrink-0 select-none"
                      style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', width: '3.5rem' }}
                      aria-hidden="true"
                    >
                      {step.n}
                    </span>
                    <div className="pt-1">
                      <h3 className="t-heading-m font-display text-white mb-2">{step.title}</h3>
                      <p className="t-body-m text-white/75 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — STATS
// ─────────────────────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="bg-secondary section-y relative overflow-hidden" aria-label="Track record numbers">
      <div className="mx-auto max-w-[1280px] px-6">

        <ScrollReveal className="mb-16">
          <span className="t-label text-muted-foreground tracking-widest mb-4 block">By the Numbers</span>
          <h2 className="t-display-m font-display text-foreground leading-tight">
            The numbers<br className="hidden sm:block" /> don't change.
          </h2>
          <p className="t-body-m text-muted-foreground mt-3 max-w-md">
            Since 2023. Every figure is live and verified.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-background px-4 py-6 sm:px-8 sm:py-10 border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            >
              <AnimatedStat {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — CTA
// ─────────────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="bg-primary section-y overflow-hidden relative" aria-label="Book a consultation">

      <div
        className="absolute inset-0 texture-diagonal pointer-events-none"
        style={{ opacity: 0.35 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 xl:gap-20 items-center">

          <ScrollReveal>
            <span className="t-label text-white/45 tracking-widest mb-8 block">Let's Talk</span>
            <h2 className="t-display-xl font-display text-white leading-[1.02] max-w-3xl">
              Talk to Rohit
              <br /> or Akshita.
            </h2>
            <p className="t-body-xl text-white/60 mt-6 max-w-md leading-relaxed">
              15 minutes. Your entire capital path, mapped.
              <br />
              Not a bot. Not a template reply.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={CALENDLY} target="_blank" rel="noreferrer">
                <Button size="lg">
                  Book a Call <ArrowUpRight size={14} />
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="ghost-light" size="lg">
                  Send a message <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Founder portraits */}
          <FadeIn delay={0.35} direction="up" className="hidden lg:flex items-end justify-end gap-5">

            <div className="flex flex-col items-center gap-3 mb-14">
              <motion.div
                className="w-[148px] h-[198px] overflow-hidden ring-1 ring-white/15"
                whileHover={{ scale: 1.03, transition: { duration: 0.3, ease: EASE } }}
              >
                <img
                  src={rohitImg}
                  alt="Rohit Jain, Co-Founder"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <div className="text-center">
                <p className="t-label text-white/75 leading-none">Rohit Jain</p>
                <p className="t-label text-white/32 mt-1.5">Co-Founder</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <motion.div
                className="w-[148px] h-[198px] overflow-hidden ring-1 ring-white/15"
                whileHover={{ scale: 1.03, transition: { duration: 0.3, ease: EASE } }}
              >
                <img
                  src={akshitaImg}
                  alt="Akshita Chahande, Co-Founder"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <div className="text-center">
                <p className="t-label text-white/75 leading-none">Akshita Chahande</p>
                <p className="t-label text-white/32 mt-1.5">Co-Founder</p>
              </div>
            </div>

          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  useSEO({
    title: 'Business Loans, Startup Fundraising & Capital Advisory',
    description: 'Akro Ventures pairs Indian founders with the right capital and the right investors: unsecured business loans, startup fundraising, project finance, and FDI/ECB advisory. Right founder, right capital, right investor.',
    path: '/',
  })
  return (
    <>
      <HeroSection />
      <JourneySection />
      <OutcomesCarousel />
      <ProcessSection />
      <StatsSection />
      <CtaSection />
    </>
  )
}
