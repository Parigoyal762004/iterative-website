import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, Building2, Layers, Rocket, Lightbulb, Globe2,
  ClipboardCheck, Ship, Plus, CheckCircle2, ArrowRight, ChevronDown,
} from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import useReveal from "@/hooks/useReveal";
import imgBuildings from "@/assets/img-buildings.jpg";

const services = [
  {
    Icon: TrendingUp,
    title: "Unsecured Business Loans",
    summary: "Working capital without pledging assets.",
    detail:
      "Access working capital without pledging assets. We help businesses secure funding based on cashflow strength, using GST returns, bank statements, and revenue history as the underwriting backbone. Unlike traditional lenders, we look beyond credit scores to find the right facility for your profile.",
    highlights: [
      "Loan amounts from ₹25L to ₹50Cr",
      "Flexible tenures of 12–48 months",
      "Eligibility: 12+ months of operations, ₹1Cr+ minimum monthly turnover",
      "Typical disbursals within 3–6 weeks of engagement",
    ],
    bestFor:
      "SMEs, traders, service businesses, and retailers seeking growth capital or bridging funds.",
    toolPath: "/assess/unsecured-loans",
    toolLabel: "Check Your Eligibility",
  },
  {
    Icon: Building2,
    title: "Secured Loans",
    summary: "Larger financing backed by your assets.",
    detail:
      "Leverage your existing equity or assets to unlock larger financing at significantly better rates. We structure loan arrangements against residential or commercial property, listed shares, fixed deposits, and machinery, optimising your balance sheet while maximising the capital available to you.",
    highlights: [
      "Loan amounts from ₹50L to ₹200Cr",
      "Collateral accepted: property, listed shares, FDs, plant & machinery",
      "Lower interest rates compared to unsecured products",
      "Suitable for both working capital needs and long-term capex",
    ],
    bestFor:
      "Established businesses looking to scale, acquire, or refinance existing higher-cost debt.",
    toolPath: "/assess/secured-loans",
    toolLabel: "Check Asset Eligibility",
  },
  {
    Icon: Layers,
    title: "Project Funding",
    summary: "Dedicated financing for large-scale projects.",
    detail:
      "Large-scale projects like real estate developments, infrastructure build-outs, and industrial capex require capital structures that match their timelines and risk profiles. We work with lenders and investors to design project-specific funding arrangements, including milestone-based drawdowns and hybrid debt-equity structures.",
    highlights: [
      "Funding range: ₹1Cr to ₹100Cr+",
      "Structures include senior debt, mezzanine, equity, and hybrid instruments",
      "Milestone-based drawdown arrangements available",
      "SPV structuring and escrow management where required",
    ],
    bestFor:
      "Developers, infrastructure companies, and industrial businesses with large, defined projects.",
    toolPath: "/assess/project-funding",
    toolLabel: "Check Project Viability",
  },
  {
    Icon: Rocket,
    title: "Startup Fundraising",
    summary: "Pre-seed to growth stage, end to end.",
    detail:
      "We guide startups through every stage of the fundraising journey, from sharpening the pitch to closing the round. Our team helps build investor-ready financial models, craft compelling narratives, and create warm introductions to the right angels, family offices, and institutional VCs across India and Southeast Asia.",
    highlights: [
      "Pre-seed, seed, Series A and growth-stage raises",
      "Pitch deck review and investor narrative coaching",
      "Financial model build, scenario analysis, and valuation benchmarking",
      "Term sheet review, cap table advisory, and dilution modelling",
    ],
    bestFor:
      "Early and growth-stage startups seeking equity capital from angels, VCs, or family offices.",
    toolPath: "/assess/startup-fundraising",
    toolLabel: "Get Investor Readiness Score",
  },
  {
    Icon: Lightbulb,
    title: "Startup Consultation",
    summary: "Strategic clarity beyond just capital.",
    detail:
      "Beyond funding, we help founders think more clearly about how they're building. Our consultation goes deep on the fundamentals that investors and lenders scrutinise, and that often determine whether a business can raise at all. We've seen the patterns across dozens of raises; we help you avoid the traps.",
    highlights: [
      "Pricing strategy and unit economics audit",
      "Go-to-market planning and distribution channel strategy",
      "Market sizing: TAM, SAM, SOM analysis and competitive positioning",
      "Fundraising readiness assessment and investor objection mapping",
    ],
    bestFor:
      "Pre-seed to Series A founders who want sharper strategy alongside their capital raise.",
    toolPath: "/assess/startup-consultation",
    toolLabel: "Get Your Business Clarity Score",
  },
  {
    Icon: Globe2,
    title: "FDI & ECB Advisory",
    summary: "Cross-border capital, simplified.",
    detail:
      "Foreign direct investment and external commercial borrowings can be powerful, lower-cost capital sources, but navigating RBI guidelines, FEMA compliance, end-use restrictions, and hedging requirements is genuinely complex. We manage the entire process: structuring, documentation, regulatory filings, and ongoing compliance.",
    highlights: [
      "FDI structuring via automatic route and government approval route",
      "ECB in both foreign currency (FCY) and Indian rupee (INR) tracks",
      "End-to-end RBI/FEMA compliance and reporting",
      "Optimal capital structuring to minimise all-in cost and currency risk",
    ],
    bestFor:
      "Indian businesses seeking lower-cost foreign capital, or foreign investors entering India.",
    toolPath: "/assess/fdi-ecb",
    toolLabel: "Check Cross-Border Eligibility",
  },
  {
    Icon: Ship,
    title: "Export Invoice Factoring",
    summary: "Get paid on Day 0. Your buyer settles later.",
    detail:
      "Indian exporters routinely wait 30 to 120 days for overseas buyers to pay, tying up working capital that should be funding the next order. We help you unlock up to 90% of your invoice value the day your shipment goes out. Collateral-free, non-recourse financing backed by our global trade finance network, with buyer coverage spanning 70+ countries.",
    highlights: [
      "Up to 90% of invoice value released on Day 0",
      "Collateral-free — no assets pledged against the facility",
      "Non-recourse: buyer default risk fully covered",
      "Buyer coverage across 70+ countries including all OECD markets",
      "Credit terms up to 120 days from invoice date",
      "Eligible: USD 200,000+ annual export turnover",
    ],
    bestFor:
      "Indian exporters and MSMEs selling to overseas buyers on open account terms, looking to stop funding their buyers' credit periods.",
    toolPath: "/contact",
    toolLabel: "Check Your Eligibility",
  },
  {
    Icon: ClipboardCheck,
    title: "Business Loan Readiness",
    summary: "Know where you stand before you apply.",
    detail:
      "Most loan applications fail not because the business isn't fundable — but because they apply to the wrong lender, at the wrong time, with the wrong documentation. Our Loan Readiness Audit gives you a clear score, identifies the gaps, and tells you exactly what to fix before you approach any lender.",
    highlights: [
      "4-question diagnostic covering financials, credit, and documentation",
      "Instant readiness score with gap analysis",
      "Personalised lender-match recommendation based on your profile",
      "Team follow-up within 24 hours with an actionable roadmap",
    ],
    bestFor:
      "Any business owner who wants to understand their loan eligibility before wasting time on rejections.",
    toolPath: "/audit",
    toolLabel: "Take the Free Audit",
  },
];

const faqs = [
  {
    q: "Do I need collateral to get funded?",
    a: "Not necessarily. Our unsecured business loan service is specifically designed for businesses that don't want to pledge assets. We use cashflow, GST returns, and bank statements as the underwriting backbone. For secured loans, collateral unlocks larger amounts at lower rates; we structure both.",
  },
  {
    q: "How long does the process take?",
    a: "Unsecured loans and startup fundraising typically move within 3–6 weeks from discovery to term sheet. Larger structured deals like project funding and FDI/ECB run 6–12 weeks depending on complexity and lender timelines.",
  },
  {
    q: "What are your fees?",
    a: "Zero upfront. We work on a success fee, payable only when capital is disbursed or a deal closes. The exact percentage is shared transparently in writing before engagement begins.",
  },
  {
    q: "What stage does my startup need to be at?",
    a: "We work with startups from pre-seed onwards. Early-stage founders benefit most from our Startup Fundraising and Consultation services. For debt products, we generally look for 12+ months of operating history, but assess each case individually.",
  },
  {
    q: "What is ECB and do I qualify?",
    a: "External Commercial Borrowings (ECB) are loans raised from foreign lenders. They're subject to RBI guidelines but can be an excellent source of lower-cost capital for eligible businesses. We assess your eligibility, structure the borrowing, and manage the compliance end-to-end.",
  },
  {
    q: "Is my information confidential?",
    a: "Categorically yes. We operate under signed NDAs and never share your financial data or business details with any lender or investor without your explicit written consent.",
  },
];

// ── Parallax hook ─────────────────────────────────────────────────────────
const useParallax = (strength = 0.18) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const offset = (clamped - 0.5) * strength * 120;
      const img = el.querySelector<HTMLImageElement>("[data-parallax-img]");
      if (img) img.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);
  return ref;
};

// ── Desktop detail panel ──────────────────────────────────────────────────
const ServiceDetail = ({
  service,
  visible,
}: {
  service: (typeof services)[0];
  visible: boolean;
}) => {
  const navigate = useNavigate();
  const { Icon, title, summary, detail, highlights, bestFor, toolPath, toolLabel } = service;
  return (
    <div
      className="absolute inset-0 p-10 xl:p-14 flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition:
          "opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6 pb-8 mb-8 border-b border-border">
        <div className="flex-1">
          <h2
            className="text-3xl xl:text-4xl leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {title}
          </h2>
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mt-3">
            {summary}
          </p>
        </div>
        <div className="shrink-0 size-14 border border-accent/30 flex items-center justify-center">
          <Icon size={26} className="text-accent" strokeWidth={1.25} />
        </div>
      </div>

      {/* Body */}
      <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">{detail}</p>

      {/* Highlights grid */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {highlights.map((h, j) => (
          <div key={j} className="flex items-start gap-3 bg-secondary/40 px-4 py-3">
            <CheckCircle2 size={13} className="text-accent mt-0.5 shrink-0" strokeWidth={2} />
            <span className="text-sm text-foreground leading-snug">{h}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <p className="text-sm text-muted-foreground max-w-md">
          <span className="text-accent font-semibold uppercase tracking-widest text-[10px] block mb-1">
            Best for
          </span>
          {bestFor}
        </p>
        <button
          onClick={() => navigate(toolPath)}
          className="shrink-0 flex items-center gap-2 px-6 py-3 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 group/btn"
        >
          <span>{toolLabel}</span>
          <ArrowRight
            size={13}
            className="group-hover/btn:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────
const Services = () => {
  useReveal();
  const navigate = useNavigate();

  // Desktop tab
  const [activeIdx, setActiveIdx] = useState(0);
  const [shownIdx, setShownIdx] = useState(0);
  const [fading, setFading] = useState(false);

  // Mobile accordion
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Parallax
  const parallaxRef = useParallax(0.18);

  const selectService = (idx: number) => {
    if (idx === activeIdx || fading) return;
    setFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setShownIdx(idx);
      setFading(false);
    }, 200);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary text-white py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 hero-columns pointer-events-none" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow text-accent">Services</span>
          <div className="divider-gold mt-6 mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-4xl leading-[1.05]">
            Capital solutions,{" "}
            <span className="text-accent">tailored to your stage.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/75 text-lg">
            Eight focused services. Each with a free interactive tool to tell you exactly where you stand.
          </p>
        </div>
      </section>

      {/* ── DESKTOP: Tab / Panel ─────────────────────────────────────────── */}
      <section className="hidden lg:block bg-background py-24 md:py-32">
        <div className="container">
          <div className="reveal mb-10">
            <span className="eyebrow">What We Offer</span>
            <div className="divider-gold mt-5 mb-5" />
            <h2 className="text-4xl md:text-5xl">Eight ways to move capital forward.</h2>
          </div>

          <div className="border border-border flex" style={{ minHeight: "620px" }}>
            {/* Left sidebar */}
            <div className="w-[268px] shrink-0 border-r border-border flex flex-col">
              {services.map(({ Icon, title, summary }, i) => {
                const active = activeIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => selectService(i)}
                    className={`group relative w-full text-left px-5 py-4 border-b border-border flex items-start gap-3 transition-colors duration-200
                      ${active ? "bg-primary" : "hover:bg-secondary/50"}`}
                  >
                    {/* Left accent bar */}
                    <span
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent transition-opacity duration-200"
                      style={{ opacity: active ? 1 : 0 }}
                    />
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold tracking-widest transition-colors ${
                            active
                              ? "text-accent"
                              : "text-muted-foreground group-hover:text-accent"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon
                          size={13}
                          strokeWidth={1.5}
                          className={`shrink-0 transition-colors ${
                            active
                              ? "text-accent"
                              : "text-muted-foreground/40 group-hover:text-accent/60"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-[13px] font-semibold leading-snug transition-colors ${
                          active ? "text-white" : "text-foreground"
                        }`}
                      >
                        {title}
                      </span>
                      <span
                        className={`text-[11px] leading-snug line-clamp-1 transition-colors ${
                          active ? "text-white/45" : "text-muted-foreground/60"
                        }`}
                      >
                        {summary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right panel */}
            <div className="flex-1 relative overflow-hidden bg-background">
              {services.map((svc, i) => (
                <ServiceDetail key={i} service={svc} visible={i === shownIdx && !fading} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE: Accordion ────────────────────────────────────────────── */}
      <section className="lg:hidden bg-background py-16">
        <div className="container">
          <div className="reveal mb-10">
            <span className="eyebrow">What We Offer</span>
            <div className="divider-gold mt-5 mb-5" />
            <h2 className="text-3xl">Eight ways to move capital forward.</h2>
          </div>

          <div className="border-t border-border">
            {services.map(
              ({ Icon, title, summary, detail, highlights, bestFor, toolPath, toolLabel }, i) => {
                const open = openMobile === i;
                return (
                  <article key={i} className="border-b border-border">
                    <button
                      onClick={() => setOpenMobile(open ? null : i)}
                      className="w-full flex items-center gap-4 py-5 text-left"
                    >
                      <span className="text-accent font-mono text-xs shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[15px] leading-snug">{title}</div>
                        <div className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                          {summary}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Icon
                          size={15}
                          strokeWidth={1.5}
                          className={`transition-colors ${
                            open ? "text-accent" : "text-muted-foreground/40"
                          }`}
                        />
                        <ChevronDown
                          size={15}
                          className={`text-accent transition-transform duration-400 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className="grid transition-all duration-500"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 space-y-5">
                          <p className="text-muted-foreground text-sm leading-relaxed">{detail}</p>
                          <ul className="space-y-2">
                            {highlights.map((h, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                              >
                                <CheckCircle2
                                  size={13}
                                  className="text-accent mt-0.5 shrink-0"
                                  strokeWidth={2}
                                />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-4 border-t border-border/60">
                            <p className="text-xs text-muted-foreground mb-4">
                              <span className="text-accent font-semibold uppercase tracking-widest text-[10px] block mb-1">
                                Best for
                              </span>
                              {bestFor}
                            </p>
                            <button
                              onClick={() => navigate(toolPath)}
                              className="flex items-center gap-2 px-5 py-3 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300 group/btn"
                            >
                              <span>{toolLabel}</span>
                              <ArrowRight
                                size={12}
                                className="group-hover/btn:translate-x-1 transition-transform duration-300"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* LOAN AUDIT CALLOUT */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="eyebrow text-accent">Already have the numbers?</span>
              <div className="divider-gold mt-4 mb-5" />
              <h2 className="text-3xl md:text-4xl text-white">Take the full Loan Readiness Audit.</h2>
              <p className="text-white/60 mt-3 max-w-xl">
                4 questions. Instant score. Our team follows up personally with a detailed read.
              </p>
            </div>
            <MagneticButton variant="teal" onClick={() => navigate("/audit")} className="shrink-0">
              Start Free Audit <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE BREAK — parallax */}
      <div ref={parallaxRef} className="relative h-56 md:h-80 overflow-hidden">
        <img
          data-parallax-img
          src={imgBuildings}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full object-cover will-change-transform"
          style={{
            objectPosition: "center 30%",
            filter: "brightness(0.25) saturate(0.7)",
            height: "130%",
            top: "-15%",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-white text-3xl md:text-5xl text-center px-6 max-w-3xl leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "The right structure unlocks
            <br className="hidden md:block" /> capital others said wasn't there."
          </p>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-secondary/40 py-24">
        <div className="container max-w-3xl text-center reveal">
          <span className="eyebrow">Ready when you are</span>
          <div className="divider-gold mt-5 mb-6 mx-auto" />
          <h2 className="text-4xl md:text-6xl">Let's structure your next raise.</h2>
          <p className="text-muted-foreground mt-6 text-lg">
            Tell us about your business and we will come back with a clear next step within 24 hours.
          </p>
          <div className="mt-10">
            <MagneticButton variant="teal" onClick={() => navigate("/contact")}>
              Get Started
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-24 md:py-32">
        <div className="container max-w-3xl">
          <div className="reveal text-center mb-12">
            <span className="eyebrow">FAQ</span>
            <div className="divider-gold mt-5 mb-6 mx-auto" />
            <h2 className="text-4xl md:text-6xl">Asked & Answered.</h2>
          </div>
          <div className="border-t border-border">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="font-semibold text-base md:text-lg">{f.q}</span>
                    <Plus
                      className={`text-accent shrink-0 transition-transform duration-500 ${
                        open ? "rotate-[135deg]" : ""
                      }`}
                      size={22}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-500"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
