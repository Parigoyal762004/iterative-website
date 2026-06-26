import { useEffect, useRef, useCallback } from "react";
import { Shield, Lock, BadgeCheck, Award, Target, Eye, Heart } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import useReveal from "@/hooks/useReveal";
import { Link } from "react-router-dom";
import imgStrategy from "@/assets/img-strategy.jpg";

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

const founders = [
  {
    name: "Rohit Jain",
    role: "Co-Founder",
    bio: "Expertise in business lending, structured finance, and investment advisory with over a decade navigating India's financial landscape. Rohit built Akro around one belief: every credible business deserves access to great financial advice, regardless of collateral.",
    photo: "/team/rohit.jpg",
    initials: "RJ",
    linkedin: "https://linkedin.com/in/rohita1304/",
  },
  {
    name: "Akshita Chahande",
    role: "Co-Founder",
    bio: "Specialises in startup fundraising, growth strategy, and early-stage financial consulting. Akshita brings a founder's perspective to every engagement, from pre-seed through growth stage, ensuring strategy always comes before paperwork.",
    photo: "/team/akshita.jpg",
    initials: "AC",
    linkedin: "https://linkedin.com/in/akshitachahande/",
  },
];

const milestones = [
  { y: "2023", t: "Akro Ventures founded", d: "Rohit and Akshita establish Akro Ventures with a clear mandate: make structured capital advisory accessible to every credible Indian business, regardless of collateral." },
  { y: "2024", t: "First capital milestone", d: "Early clients funded across SaaS, manufacturing, and real estate. The Akro method validated across sectors and ticket sizes." },
  { y: "2024", t: "FDI & ECB advisory launched", d: "Cross-border advisory added for inbound investment from Singapore, UAE and US family offices. Export invoice factoring introduced." },
  { y: "2025", t: "₹200Cr+ facilitated", d: "50+ clients served. Pan-India lender network established. Every business deserves great advice — and now more of them are getting it." },
];

const About = () => {
  useReveal();
  const parallaxRef = useParallax(0.18);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary text-white py-28 md:py-40 overflow-hidden">
        {/* Horizontal ledger lines  -  financial records, transparency */}
        <div className="absolute inset-0 hero-ledger pointer-events-none" aria-hidden="true" />
        <div className="container relative z-10">
          <span className="eyebrow text-accent">About Akro</span>
          <div className="divider-gold mt-6 mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-4xl leading-[1.05]">
            Built on Integrity. <br /><span className="text-accent">Scaled by Strategy.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/75">
            We believe every business, large or small, deserves access to great financial advice. We are not a loan broker. We are capital strategists with one of India's most relationship-rich lender networks.
          </p>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <div className="reveal text-center mb-16">
            <span className="eyebrow">Partners in Capital</span>
            <div className="divider-gold mt-5 mb-6 mx-auto" />
            <h2 className="text-4xl md:text-6xl">The team behind every approval.</h2>
          </div>

          <div className="stagger grid md:grid-cols-2 gap-8">
            {founders.map((f, i) => (
              <article key={i} className={`${i % 2 === 0 ? "reveal-left" : "reveal-right"} card-editorial overflow-hidden`}>
                <div className="relative aspect-[4/3] bg-primary overflow-hidden">
                  <img
                    src={f.photo}
                    alt={f.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fb = e.currentTarget.parentElement?.querySelector(".fallback") as HTMLElement;
                      if (fb) fb.classList.remove("hidden");
                    }}
                  />
                  <div className="fallback hidden absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold text-white/20 select-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {f.initials}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl">{f.name}</h3>
                  <p className="text-accent text-xs font-semibold mt-2 uppercase tracking-widest">{f.role}</p>
                  <p className="text-muted-foreground mt-5 leading-relaxed text-sm">{f.bio}</p>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-widest font-semibold text-accent hover:text-foreground transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE BREAK */}
      <div ref={parallaxRef} className="relative h-72 md:h-96 overflow-hidden">
        <img
          data-parallax-img
          src={imgStrategy}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full object-cover object-center will-change-transform"
          style={{ filter: "brightness(0.35) saturate(0.8)", height: "130%", top: "-15%" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-semibold mb-4">The Akro Way</p>
          <blockquote className="text-white text-3xl md:text-5xl max-w-3xl leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "Capital should follow competence,<br className="hidden md:block" /> not collateral."
          </blockquote>
          <div className="w-12 h-0.5 bg-accent mt-8" />
        </div>
      </div>

      {/* MISSION / VISION / VALUES */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container">
          <div className="reveal mb-12">
            <span className="eyebrow">Why we exist</span>
            <div className="divider-gold mt-5 mb-6" />
            <h2 className="text-4xl md:text-6xl max-w-3xl">Mission. Vision. Values.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            <article className="reveal-scale bg-primary text-white p-10 md:col-span-3">
              <Target className="text-accent mb-6" size={32} strokeWidth={1.25} />
              <h3 className="text-2xl mb-4">Our Mission</h3>
              <p className="text-white/80 text-lg max-w-3xl leading-relaxed">
                To make financial advisory accessible and help every client obtain capital and clarity for sustainable growth. We provide honest advice, build real relationships, and deliver measurable outcomes.
              </p>
            </article>
            <article className="reveal-left bg-background p-8">
              <Eye className="text-accent mb-4" size={28} strokeWidth={1.25} />
              <h3 className="text-xl mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">An India where capital follows competence, not collateral. Where every credible founder gets a fair shot.</p>
            </article>
            <article className="reveal bg-background p-8">
              <Heart className="text-accent mb-4" size={28} strokeWidth={1.25} />
              <h3 className="text-xl mb-3">Our Values</h3>
              <p className="text-muted-foreground leading-relaxed">Honest advice over comfortable answers. Quick-moving processes built on established relationships. Founder over fee.</p>
            </article>
            <article className="reveal-right bg-background p-8">
              <Award className="text-accent mb-4" size={28} strokeWidth={1.25} />
              <h3 className="text-xl mb-3">Zero upfront fees</h3>
              <p className="text-muted-foreground leading-relaxed">We earn when you get funded. We actively decline opportunities that are not in your best interest.</p>
            </article>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-background py-24 md:py-32">
        <div className="container max-w-4xl">
          <div className="reveal mb-16">
            <span className="eyebrow">The Journey</span>
            <div className="divider-gold mt-5 mb-6" />
            <h2 className="text-4xl md:text-6xl">Founded 2023. One thesis. Accelerating.</h2>
          </div>
          <div className="stagger relative pl-8 space-y-12 border-l border-accent">
            {milestones.map((m, i) => (
              <div key={i} className="relative reveal-left">
                <span className="absolute -left-[37px] top-2 size-3 bg-accent" />
                <span className="text-accent font-mono text-sm tracking-widest">{m.y}</span>
                <h3 className="text-2xl mt-2">{m.t}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed max-w-2xl">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
        <div className="absolute inset-0 hero-ledger pointer-events-none opacity-60" aria-hidden="true" />
        <div className="container relative z-10">
          <div className="reveal text-center mb-12">
            <span className="eyebrow text-accent">Trust</span>
            <div className="divider-gold mt-5 mb-6 mx-auto" />
            <h2 className="text-4xl md:text-6xl">Trust, by every measure.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-accent/30">
            {[
              { Icon: Shield, t: "RBI Advisory Compliant" },
              { Icon: Lock, t: "100% Confidential" },
              { Icon: BadgeCheck, t: "Zero Upfront Fees" },
              { Icon: Award, t: "Verified Track Record" },
            ].map(({ Icon, t }, i) => (
              <div key={i} className="bg-primary p-8 text-center">
                <Icon size={32} className="text-accent mx-auto mb-4" strokeWidth={1.25} />
                <div className="font-semibold text-sm">{t}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/contact"><MagneticButton variant="teal">Talk to a Strategist</MagneticButton></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
