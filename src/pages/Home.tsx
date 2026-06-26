import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Building2, Rocket, Globe2, Layers, Lightbulb, ClipboardCheck, Ship, ChevronRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import useReveal from "@/hooks/useReveal";

// Scroll-based parallax for editorial image sections
const useParallax = (strength = 0.18) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = (vh - rect.top) / (vh + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));
    const offset = (clamped - 0.5) * strength * 120;
    const img = el.querySelector<HTMLImageElement>("[data-parallax-img]");
    if (img) img.style.transform = `translateY(${offset}px)`;
  }, [strength]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return ref;
};
import imgCityNight from "@/assets/img-city-night.jpg";

// Editorial word rotator  -  slow, refined, no typing effect
const WORDS = ["conviction", "precision", "clarity", "purpose", "resolve", "confidence"];

const WordRotator = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("out"), 3200);
    return () => clearTimeout(holdTimer);
  }, [index]);

  useEffect(() => {
    if (phase !== "out") return;
    const exitTimer = setTimeout(() => {
      setIndex(i => (i + 1) % WORDS.length);
      setPhase("in");
    }, 700);
    return () => clearTimeout(exitTimer);
  }, [phase]);

  return (
    <span
      className="text-accent italic"
      style={{
        display: "inline-block",
        opacity: phase === "in" ? 1 : 0,
        transform: phase === "in" ? "translateY(0)" : "translateY(-10px)",
        transition: phase === "in"
          ? "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)"
          : "opacity 0.6s ease-in, transform 0.6s ease-in",
      }}
    >
      {WORDS[index]}
    </span>
  );
};

// Animated counter that fires once when scrolled into view
const useCountUp = (target: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return { count, ref };
};

interface StatConfig { prefix?: string; target: number; suffix: string; label: string; delay?: number }

const AnimatedStat = ({ prefix = "", target, suffix, label, delay = 0 }: StatConfig) => {
  const { count, ref } = useCountUp(target, 1600 + delay);
  return (
    <div ref={ref} className="relative flex flex-col justify-center p-8 md:p-12">
      <div className="text-accent font-mono font-bold leading-none text-[2.2rem] md:text-[3rem] tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="text-white/40 text-[10px] uppercase tracking-[0.25em] mt-3 font-medium leading-snug">{label}</div>
    </div>
  );
};

const services = [
  { Icon: TrendingUp, title: "Unsecured Business Loans", desc: "Access working capital without pledging assets. Matched to your cashflow, GST returns, and business profile.", path: "/assess/unsecured-loans" },
  { Icon: Building2, title: "Secured Loans", desc: "Leverage equity or assets for larger financing at better rates. Secured against property, shares, and collateral.", path: "/assess/secured-loans" },
  { Icon: Layers, title: "Project Funding", desc: "Dedicated financing for large-scale projects. Milestone-based drawdowns and hybrid debt-equity structures.", path: "/assess/project-funding" },
  { Icon: Rocket, title: "Startup Fundraising", desc: "From pre-seed to growth stage. We sharpen the pitch, build the model, and connect you to the right investors.", path: "/assess/startup-fundraising" },
  { Icon: Lightbulb, title: "Startup Consultation", desc: "Pricing strategy, go-to-market planning, market sizing, and investor objection mapping. Beyond just capital.", path: "/assess/startup-consultation" },
  { Icon: Globe2, title: "FDI & ECB Advisory", desc: "Foreign direct investment and external commercial borrowings. From RBI/FEMA compliance to full capital structuring.", path: "/assess/fdi-ecb" },
  { Icon: Ship, title: "Export Invoice Factoring", desc: "Stop funding your buyer's credit period. We unlock up to 90% of your export invoice value on Day 0, collateral-free and non-recourse.", path: "/contact" },
  { Icon: ClipboardCheck, title: "Business Loan Readiness", desc: "Know exactly where you stand before you apply. 4-question audit, instant score, follow-up within 24 hours.", path: "/audit" },
];

const trust = ["10+ Years", "₹200Cr+ Facilitated", "50+ Clients", "95% Approval Rate", "Pan-India Network", "RBI Compliant"];

const outcomes = [
  {
    tag: "Working Capital",
    headline: "₹2.8Cr secured in 22 days",
    context:
      "Pune-based D2C brand needed bridge capital for a large festive-season inventory order. No collateral. Structured entirely against GST returns and six months of bank statements.",
    sector: "D2C Consumer",
  },
  {
    tag: "Project Funding",
    headline: "₹45Cr structured for real estate development",
    context:
      "Mid-size Hyderabad developer required project-specific financing for a residential township. We designed a senior-mezzanine hybrid with milestone drawdowns matched to construction stages.",
    sector: "Real Estate",
  },
  {
    tag: "Startup Fundraising",
    headline: "Seed round closed above target",
    context:
      "A B2B SaaS startup had struggled with investor traction for six months. We rebuilt the financial model, repositioned the narrative, and made eight warm introductions. Round closed in eleven weeks.",
    sector: "SaaS / B2B",
  },
];

const Home = () => {
  useReveal();
  const parallaxRef = useParallax(0.18);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden bg-glow-corner">
        <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" aria-hidden="true" />
        <div className="container pt-28 pb-16 md:pt-40 md:pb-20 relative z-10">
          <div className="max-w-4xl">
            <span className="eyebrow text-accent" style={{ animation: "hero-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s both" }}>
              Akro Ventures · Capital Advisory
            </span>
            <div className="divider-gold mt-6 mb-8" style={{ transformOrigin: "left", animation: "line-draw 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s both" }} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-white" style={{ animation: "hero-rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both" }}>
              Capital, structured<br className="hidden sm:block" /> with <WordRotator />.
            </h1>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed" style={{ animation: "hero-rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both" }}>
              Akro Ventures connects ambitious founders across India with structured capital solutions,
              <span className="text-accent"> strategy first, paperwork second.</span>
            </p>

            <div className="mt-12 flex flex-wrap gap-4" style={{ animation: "hero-rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both" }}>
              <Link to="/contact">
                <MagneticButton variant="teal">
                  Free Consultation <ArrowRight size={16} />
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton variant="ghost-light">Book a Call</MagneticButton>
              </Link>
            </div>

            {/* Quick-path selector */}
            <div className="mt-8 pt-6 border-t border-white/10" style={{ animation: "hero-rise 0.7s cubic-bezier(0.22,1,0.36,1) 0.7s both" }}>
              <p className="text-white/35 text-[11px] uppercase tracking-[0.2em] mb-3 font-medium">What do you need?</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Working Capital", path: "/assess/unsecured-loans" },
                  { label: "Project Funding", path: "/assess/project-funding" },
                  { label: "Startup Fundraising", path: "/assess/startup-fundraising" },
                  { label: "FDI / ECB", path: "/assess/fdi-ecb" },
                  { label: "Export Finance", path: "/contact" },
                  { label: "Loan Readiness", path: "/audit" },
                ].map(({ label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    className="px-3 py-1.5 text-[11px] uppercase tracking-wider border border-white/15 text-white/45 hover:border-accent hover:text-accent transition-all duration-200 font-semibold"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust marquee */}
        <div className="border-t border-accent/30 py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-track" aria-hidden={k === 1}>
                {trust.map((t, i) => (
                  <div key={i} className="flex items-center gap-6 whitespace-nowrap">
                    <span className="size-1.5 bg-accent" />
                    <span className="text-white/85 text-sm font-medium tracking-wide uppercase">{t}</span>
                    <span className="text-accent">|</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES  -  7-card grid */}
      <section className="bg-background py-24 md:py-32 bg-dot-grid">
        <div className="container">
          <div className="reveal mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">What We Do</span>
              <div className="divider-gold mt-5 mb-6" />
              <h2 className="text-4xl md:text-6xl">Capital, engineered eight ways.</h2>
            </div>
            <Link to="/services" className="shrink-0">
              <MagneticButton variant="teal">
                All Services <ArrowRight size={14} />
              </MagneticButton>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
            {services.map(({ Icon, title, desc, path }, i) => (
              <Link
                to={path}
                key={i}
                className="group block p-8 md:p-10 border-b border-r border-border hover:bg-secondary/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-accent font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                  <Icon
                    size={22}
                    className="text-accent/40 group-hover:text-accent transition-colors duration-300"
                    strokeWidth={1.25}
                  />
                </div>
                <h3 className="text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors duration-300 leading-snug">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Check eligibility <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS  -  editorial steps */}
      <section id="how" className="bg-secondary/40 py-24 md:py-32">
        <div className="container">
          <div className="reveal text-center max-w-2xl mx-auto mb-20">
            <span className="eyebrow">The Akro Method</span>
            <div className="divider-gold mt-5 mb-6 mx-auto" />
            <h2 className="text-4xl md:text-6xl">From Inquiry to Funded.</h2>
            <p className="text-muted-foreground mt-6">A four-step engagement built for speed, clarity, and absolute discretion.</p>
          </div>

          {/* Connector line — draws across when section enters view */}
          <div className="steps-connector reveal mb-0">
            <div className="hidden md:block relative h-px bg-border mb-0 overflow-hidden steps-line-track">
              <div className="steps-line-fill absolute inset-y-0 left-0 w-0 bg-accent" />
            </div>
          </div>

          <div className="stagger grid md:grid-cols-4 gap-px bg-border">
            {[
              { n: "01", t: "Discovery Call", d: "We listen, you talk. 15 minutes." },
              { n: "02", t: "Financial Blueprint", d: "Cashflow + capital structure modelled." },
              { n: "03", t: "Lender Matchmaking", d: "Curated outreach to the right desks." },
              { n: "04", t: "Capital Secured", d: "Term sheet, negotiation, disbursal." },
            ].map((s) => (
              <div key={s.n} className="reveal bg-background p-8 md:p-10">
                {/* Step number with gold dot connector */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-2 bg-accent shrink-0" />
                  <div className="text-accent font-mono text-sm">{s.n}</div>
                </div>
                <h4 className="text-xl mb-3">{s.t}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE BREAK  -  Mumbai night city */}
      <div ref={parallaxRef} className="relative h-64 md:h-[480px] overflow-hidden">
        <img
          data-parallax-img
          src={imgCityNight}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full object-cover object-center will-change-transform"
          style={{ filter: "brightness(0.38)", height: "130%", top: "-15%" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-accent text-xs uppercase tracking-[0.3em] font-semibold mb-5">Pan-India · Fully Remote</p>
          <h2 className="text-white text-3xl md:text-6xl max-w-3xl leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            We go where the right<br className="hidden md:block" /> capital is. Everywhere.
          </h2>
          <div className="w-12 h-0.5 bg-accent mt-8" />
        </div>
      </div>

      {/* HOW WE WORK  -  animated stats + content split */}
      <section className="bg-background border-t border-border">
        <div className="grid md:grid-cols-2 min-h-[520px]">

          {/* Animated stats grid */}
          <div className="relative bg-primary min-h-[360px] md:min-h-0 grid grid-cols-2">
            <div className="absolute inset-0 bg-diagonal-lines pointer-events-none opacity-70" aria-hidden="true" />
            {/* Divider lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/20" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20" />
            </div>
            <AnimatedStat prefix="₹" target={200} suffix="Cr+" label="Capital Facilitated" delay={0} />
            <AnimatedStat target={95} suffix="%" label="Client Approval Rate" delay={150} />
            <AnimatedStat target={50} suffix="+" label="Founders Helped Get Funded" delay={300} />
            <AnimatedStat target={40} suffix="+" label="Lender Relationships" delay={450} />
          </div>

          {/* Content side */}
          <div className="reveal-right flex flex-col justify-center px-10 py-16 md:px-16 bg-background">
            <span className="eyebrow">How We Work</span>
            <div className="divider-gold mt-5 mb-6" />
            <h2 className="text-4xl md:text-6xl leading-tight">
              Every engagement starts with a <span className="text-accent">real conversation.</span>
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              Not a form. Not a bot. A 15-minute call with our advisory team who've seen the inside of 40+ lender desks. We tell you the truth: what you qualify for, what's blocking you, and what to fix.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact">
                <MagneticButton variant="teal">
                  Book a Call <ArrowRight size={14} />
                </MagneticButton>
              </Link>
              <Link to="/audit">
                <MagneticButton variant="ghost-teal">
                  Check Loan Readiness
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES  -  case snapshot cards */}
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <div className="reveal mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow">What We've Done</span>
              <div className="divider-gold mt-5 mb-6" />
              <h2 className="text-4xl md:text-6xl">Capital that moves the needle.</h2>
            </div>
          </div>

          {/* Mobile: snap carousel */}
          <div className="md:hidden flex gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar border-t border-l border-border">
            {outcomes.map((o, i) => (
              <div key={i} className="snap-start shrink-0 w-[85vw] p-7 border-b border-r border-border flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-accent/60 uppercase mb-4">{o.tag}</span>
                <div className="text-lg font-bold text-accent mb-3 leading-tight">{o.headline}</div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{o.context}</p>
                <div className="mt-5 pt-4 border-t border-border">
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{o.sector}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden flex gap-1.5 justify-center mt-4">
            {outcomes.map((_, i) => (
              <span key={i} className={`size-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-border"}`} />
            ))}
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid stagger md:grid-cols-3 gap-0 border-t border-l border-border">
            {outcomes.map((o, i) => (
              <div key={i} className="reveal group p-8 md:p-10 border-b border-r border-border hover:bg-secondary/40 transition-colors duration-300 flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-accent/60 uppercase mb-5">{o.tag}</span>
                <div className="text-xl md:text-2xl font-bold text-accent mb-4 leading-tight">{o.headline}</div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{o.context}</p>
                <div className="mt-6 pt-5 border-t border-border">
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{o.sector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-white py-24 md:py-32">
        <div className="container text-center">
          <span className="eyebrow">Begin</span>
          <div className="divider-gold mt-5 mb-6 mx-auto" />
          <h2 className="text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">15 Minutes Could Change Everything.</h2>
          <p className="mt-6 text-white/75 max-w-xl mx-auto">Book a no-obligation discovery call with Rohit or Akshita. We'll assess fit, map a path, and tell you the truth: funded or not.</p>
          <Link to="/contact" className="inline-block mt-10">
            <MagneticButton variant="teal">
              Free Consultation <ChevronRight size={16} />
            </MagneticButton>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
