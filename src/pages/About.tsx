import { useRef, lazy, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CelestialSphere = lazy(() =>
  import('@/components/ui/celestial-sphere').then(m => ({ default: m.CelestialSphere }))
)

const CALENDLY = 'https://calendly.com/akroventures-info/30-min-stand-up-call'

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

const PILLARS = [
  {
    title: 'Right Founder',
    body: 'Not every founder is ready to raise. We work with you before the raise to make sure you are: business model, story, documentation, strategy. All of it.',
  },
  {
    title: 'Right Capital',
    body: 'Debt when debt is right. Equity when equity is right. The wrong capital at the wrong time is worse than no capital at all. We help you find the right structure.',
  },
  {
    title: 'Right Investor',
    body: "Every investor in Akro's network is vetted, credible, and genuinely looking to deploy. Founders don't pitch into a void. Investors don't wade through noise.",
  },
]

const DIFFERENTIATORS = [
  {
    headline: "We've been inside finance long enough to know what breaks.",
    body: "Rohit's experience spans stock markets, corporate finance at scale, and on-the-ground lending. Akro's advice isn't textbook; it comes from years of watching what actually works and what quietly destroys companies.",
  },
  {
    headline: "We don't just advise; we build, support, and stay.",
    body: "Most advisors hand you a report and walk away. Akro stays involved from the first conversation to the final close, and beyond. Akshita's tech and research capability means founders get more than capital strategy; they get execution support.",
  },
  {
    headline: "We know that capital alone isn't enough.",
    body: "Funding is a milestone, not a destination. That's why Akro brings marketing thinking, research capability, and technology perspective to every engagement, not just financial structuring.",
  },
]

const TEAM = [
  {
    name: 'Rohit Jain',
    title: 'Co-Founder & CEO',
    initials: 'RJ',
    bio: "With six years in the stock markets and a background as Finance Head at a 1,000 crore company, Rohit has seen capital from every angle. His time in the family lending business showed him how much damage the wrong funding advice could do, and why the right advisory matters. He founded Akro to fix that.",
  },
  {
    name: 'Akshita Chahande',
    title: 'Co-Founder & CTO',
    initials: 'AC',
    bio: "After three years at Dell, Akshita chose to build something that mattered. She believed that companies don't just need fundraising; they need marketing support, research capability, and technology infrastructure to truly grow. At Akro, she leads the tech and research function that turns advisory into real execution.",
  },
  {
    name: 'Pari Goyal',
    title: 'CMO',
    initials: 'PG',
    bio: 'Bio coming soon.',
  },
]

// ── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative flex items-end overflow-hidden px-6"
      style={{
        minHeight: '60vh',
        background: 'linear-gradient(145deg, #0a1f21 0%, #0f2a2c 40%, #1a3538 70%, #2B2B2B 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Teal glow — bottom-left */}
      <div className="absolute pointer-events-none" style={{ zIndex: 1,
        bottom: '-25%', left: '-8%', width: 560, height: 360, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(63,111,115,0.18) 0%, transparent 70%)' }}
      />
      {/* Secondary glow — top-right */}
      <svg className="absolute pointer-events-none" aria-hidden="true"
        style={{ top: '0%', right: '-5%', zIndex: 1 }}
        width="500" height="320" viewBox="0 0 500 320">
        <defs><filter id="about-glow"><feGaussianBlur stdDeviation="28" /></filter></defs>
        <ellipse cx="420" cy="100" rx="220" ry="140" fill="rgba(63,111,115,0.1)" filter="url(#about-glow)" />
      </svg>
      <div className="relative z-10 max-w-6xl mx-auto w-full pb-16 pt-36">
        <FadeUp delay={0.1}>
          <p className="t-label mb-5" style={{ color: '#3F6F73' }}>About Akro</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'white',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '14ch',
            }}
          >
            Built to fix what we watched break.
          </h1>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Founding Story ─────────────────────────────────────────────────────────
function FoundingStorySection() {
  return (
    <section className="section-y" style={{ background: '#F4F6F2' }}>
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="t-label text-primary mb-3">How We Started</p>
        </FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start mt-6">
          <FadeUp delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#2B2B2B',
                  lineHeight: 1.18,
                }}
              >
                Right founder.<br />Right capital.<br />Right investor.
              </h2>
              <div className="h-px w-12 mt-6" style={{ background: '#3F6F73' }} />
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="space-y-5 text-muted-foreground text-base leading-relaxed">
              <p>
                Rohit Jain spent six years in the stock markets before becoming Finance Head at a 1,000 crore company. When he later joined his family's lending business, he saw something that stayed with him: companies, good ones, with real potential, were failing. Not because of bad products or weak teams. Because no one had told them about the right kind of capital.
              </p>
              <p>
                He watched founders take high-interest loans they didn't need, miss equity opportunities they didn't know existed, and burn out chasing the wrong investors. The awareness gap was enormous. The cost of that gap was companies, jobs, and livelihoods.
              </p>
              <p>
                That's when the idea took shape: bring the right capital to the right founder. Not just introductions, full advisory. Not just fundraising, funding readiness.
              </p>
              <p>
                Akshita Chahande brought a different lens. After three years at Dell, she understood that capital alone doesn't build companies. Founders need marketing support, research capability, and technology infrastructure. She joined to build the platform side of Akro, turning it from an advisory shop into something that could genuinely scale with the founders it serves.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ── Three Pillars ──────────────────────────────────────────────────────────
function PillarsSection() {
  return (
    <section className="section-y relative overflow-hidden" style={{ background: '#2B2B2B' }}>
      {/* CelestialSphere nebula — teal wash */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.28, zIndex: 0 }}>
        <Suspense fallback={null}>
          <CelestialSphere hue={165} speed={0.18} zoom={2.0} particleSize={2.2} className="w-full h-full" />
        </Suspense>
      </div>
      {/* Dot grid on top of nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          zIndex: 1,
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6" style={{ zIndex: 2 }}>
        <FadeUp>
          <h2
            className="text-white mb-14"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
            }}
          >
            What we're built around.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PILLARS.map(({ title, body }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <div
                className="p-8 md:p-10 h-full rounded-2xl relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(63,111,115,0.3)',
                  boxShadow: '0 0 40px rgba(63,111,115,0.08)',
                }}
              >
                {/* Glow accent top */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #3F6F73, transparent)' }} />
                <p
                  className="mb-2"
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {title}
                </p>
                <div className="h-[2px] w-10 mb-5 rounded-full" style={{ background: '#3F6F73' }} />
                <p className="text-white/60 text-sm leading-relaxed font-light">{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Why Akro Is Different ──────────────────────────────────────────────────
function DifferentSection() {
  return (
    <section className="section-y" style={{ background: '#ffffff' }}>
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="t-label text-primary mb-3">Why Akro</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2B2B2B' }}
          >
            What makes us different.
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map(({ headline, body }, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                className="p-7 rounded-sm h-full"
                style={{ background: '#F4F6F2', borderTop: '3px solid #3F6F73' }}
              >
                <h3
                  className="font-bold text-foreground mb-4 leading-snug"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.15rem' }}
                >
                  {headline}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Team ───────────────────────────────────────────────────────────────────
function TeamSection() {
  return (
    <section className="section-y relative overflow-hidden" style={{ background: '#F4F6F2' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(63,111,115,0.06) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="t-label text-primary mb-3">The Team</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2B2B2B' }}
          >
            The people behind Akro.
          </h2>
          <p className="text-muted-foreground text-sm mb-12">
            A team of 6 across advisory, operations, research, and technology.
          </p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {TEAM.map(({ name, title, initials, bio }, i) => (
            <FadeUp key={name} delay={i * 0.1}>
              <div className="bg-white rounded-sm p-7 h-full shadow-sm">
                <div
                  className="h-16 w-16 rounded-sm flex items-center justify-center mb-5 font-bold text-white text-lg"
                  style={{ background: '#2B2B2B', letterSpacing: '0.05em' }}
                >
                  {initials}
                </div>
                <p
                  className="font-bold text-foreground mb-0.5"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.2rem' }}
                >
                  {name}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#3F6F73' }}>
                  {title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{bio}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.3}>
          <p className="text-muted-foreground text-sm text-center">
            ...and 3 more across advisory, operations, and research.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ── CTA Strip ──────────────────────────────────────────────────────────────
function CtaStrip() {
  return (
    <section className="py-20 px-6 text-center" style={{ background: '#3F6F73' }}>
      <FadeUp>
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          Work with a team that's been in your position.
        </h2>
        <p className="text-white/70 text-base font-light max-w-md mx-auto mb-9">
          We've seen what bad capital advice does. We're here to make sure it doesn't happen to you.
        </p>
        <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-slide btn-slide-mustard">
          <span>Book a Call</span>
          <ArrowRight size={15} />
        </a>
      </FadeUp>
    </section>
  )
}

export default function About() {
  return (
    <>
      <HeroSection />
      <FoundingStorySection />
      <PillarsSection />
      <DifferentSection />
      <TeamSection />
      <CtaStrip />
    </>
  )
}
