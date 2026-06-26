import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import useReveal from "@/hooks/useReveal";
import { supabase } from "@/lib/supabase";
import { Slider } from "@/components/ui/slider";

const CALENDLY_URL = "https://calendly.com/akroventures-info/new-meeting";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioOption {
  label: string;
  description?: string;
  points: number;
}

export interface SliderNotch {
  label: string;
  value: number;
  points: number;
}

export interface PillOption {
  label: string;
  value: string;
  points: number;
}

export type Question =
  | {
      type: "radio";
      id: string;
      category: string;
      question: string;
      description?: string;
      options: RadioOption[];
    }
  | {
      type: "slider";
      id: string;
      category: string;
      question: string;
      description?: string;
      notches: SliderNotch[];
    }
  | {
      type: "pills";
      id: string;
      category: string;
      question: string;
      description?: string;
      options: PillOption[];
      multiSelect?: boolean;
    };

export interface TierConfig {
  label: string;
  description: string;
}

export interface ToolConfig {
  serviceType: string;
  heroTexture: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  toolLabel: string;
  questions: Question[];
  tiers: {
    high: TierConfig;
    mid: TierConfig;
    low: TierConfig;
  };
  whatNext: Array<{ n: string; t: string; d: string }>;
}

interface StoredAnswer {
  label: string;
  points: number;
  rawValue?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

const AssessmentEngine = ({ config }: { config: ToolConfig }) => {
  useReveal();
  const navigate = useNavigate();

  type Stage = "quiz" | "contact" | "done";
  const [stage, setStage] = useState<Stage>("quiz");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, StoredAnswer>>({});

  const [radioSelected, setRadioSelected] = useState<number | null>(null);
  const [sliderIdx, setSliderIdx] = useState(0);
  const [pillsSelected, setPillsSelected] = useState<string[]>([]);

  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [submitting, setSubmitting] = useState(false);

  // Score computation
  const totalPoints = Object.values(answers).reduce((s, a) => s + a.points, 0);
  const maxPoints = config.questions.reduce((s, q) => {
    if (q.type === "radio") return s + Math.max(...q.options.map(o => o.points));
    if (q.type === "slider") return s + Math.max(...q.notches.map(n => n.points));
    if (q.type === "pills") return s + Math.max(...q.options.map(o => o.points));
    return s;
  }, 0);
  const pct = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
  const tier = pct >= 75 ? "high" : pct >= 50 ? "mid" : "low";
  const tierConfig = config.tiers[tier];

  const currentQ = config.questions[current];

  // Restore input state when navigating back to a previously answered question
  useEffect(() => {
    const existing = answers[currentQ.id];
    if (existing) {
      if (currentQ.type === "radio") {
        const idx = currentQ.options.findIndex(o => o.label === existing.label);
        setRadioSelected(idx >= 0 ? idx : null);
      } else if (currentQ.type === "slider") {
        const idx = currentQ.notches.findIndex(n => n.label === existing.label);
        setSliderIdx(idx >= 0 ? idx : Math.floor(currentQ.notches.length / 3));
      } else if (currentQ.type === "pills") {
        const labels = existing.label.split(", ");
        const vals = currentQ.options
          .filter(o => labels.includes(o.label))
          .map(o => o.value);
        setPillsSelected(vals);
      }
    } else {
      setRadioSelected(null);
      setSliderIdx(
        currentQ.type === "slider" ? Math.floor(currentQ.notches.length / 3) : 0
      );
      setPillsSelected([]);
    }
  }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

  const canAdvance =
    currentQ.type === "radio"
      ? radioSelected !== null
      : currentQ.type === "slider"
      ? true
      : pillsSelected.length > 0;

  const handleNext = () => {
    if (!canAdvance) return;

    let answer: StoredAnswer;

    if (currentQ.type === "radio") {
      const opt = currentQ.options[radioSelected!];
      answer = { label: opt.label, points: opt.points };
    } else if (currentQ.type === "slider") {
      const notch = currentQ.notches[sliderIdx];
      answer = { label: notch.label, points: notch.points, rawValue: notch.value };
    } else {
      const sel = currentQ.options.filter(o => pillsSelected.includes(o.value));
      const pts = sel.length > 0 ? Math.max(...sel.map(o => o.points)) : 0;
      answer = { label: sel.map(o => o.label).join(", "), points: pts };
    }

    setAnswers(prev => ({ ...prev, [currentQ.id]: answer }));

    if (current + 1 < config.questions.length) {
      setCurrent(c => c + 1);
    } else {
      setStage("contact");
    }
  };

  const handleBack = () => {
    if (stage === "contact") {
      setStage("quiz");
      setCurrent(config.questions.length - 1);
      return;
    }
    if (current > 0) setCurrent(c => c - 1);
  };

  const togglePill = (value: string, multi: boolean) => {
    setPillsSelected(prev =>
      multi
        ? prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        : prev.includes(value) ? [] : [value]
    );
  };

  const contactValid =
    contact.name.trim() && contact.email.trim() && contact.phone.trim();

  const handleSubmit = async () => {
    if (!contactValid) return;
    setSubmitting(true);
    await supabase.from("service_assessments").insert({
      service_type: config.serviceType,
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      company: contact.company.trim() || null,
      answers,
      score: pct,
      result_tier: tier,
      max_score: maxPoints,
    });
    setSubmitting(false);
    setStage("done");
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary text-white py-28 md:py-36 overflow-hidden">
        <div
          className={`absolute inset-0 ${config.heroTexture} pointer-events-none`}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <span className="eyebrow text-accent">{config.eyebrow}</span>
          <div className="divider-gold mt-6 mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-4xl leading-[1.05]">
            {config.headline}{" "}
            <span className="text-accent">{config.headlineAccent}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/75 text-lg">{config.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
              {config.toolLabel}
            </span>
            <span className="text-accent/40">·</span>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
              {config.questions.length} questions
            </span>
            <span className="text-accent/40">·</span>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Free</span>
          </div>
        </div>
      </section>

      {/* TOOL WIDGET */}
      <section className="bg-background py-20 md:py-28">
        <div className="container max-w-2xl">

          {/* ── QUIZ ─────────────────────────────────────────── */}
          {stage === "quiz" && (
            <div className="card-editorial p-8 md:p-12">
              {/* Step progress */}
              <div className="mb-8">
                <div className="flex gap-1 mb-3">
                  {config.questions.map((_, i) => (
                    <div key={i} className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{
                          width:
                            i < Object.keys(answers).length
                              ? "100%"
                              : i === current
                              ? "60%"
                              : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                {currentQ.category} · {current + 1} of {config.questions.length}
              </div>
              <h2 className="text-2xl md:text-3xl mb-3 leading-snug">
                {currentQ.question}
              </h2>
              {currentQ.description ? (
                <p className="text-sm text-muted-foreground mb-8">
                  {currentQ.description}
                </p>
              ) : (
                <div className="mb-8" />
              )}

              {/* Radio */}
              {currentQ.type === "radio" && (
                <div className="space-y-3">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setRadioSelected(i)}
                      className={`w-full text-left px-6 py-4 border text-sm transition-all ${
                        radioSelected === i
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border hover:border-accent/60 text-foreground"
                      }`}
                    >
                      <div className="font-medium">{opt.label}</div>
                      {opt.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {opt.description}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Slider */}
              {currentQ.type === "slider" && (
                <div className="space-y-4">
                  <div className="text-center py-6 border border-border bg-secondary/30">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                      Selected value
                    </div>
                    <div className="text-5xl md:text-6xl font-mono font-bold text-accent leading-none">
                      {currentQ.notches[sliderIdx].label}
                    </div>
                  </div>
                  <Slider
                    min={0}
                    max={currentQ.notches.length - 1}
                    step={1}
                    value={[sliderIdx]}
                    onValueChange={([v]) => setSliderIdx(v)}
                    className="my-6"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground font-mono">
                    <span>{currentQ.notches[0].label}</span>
                    <span>{currentQ.notches[currentQ.notches.length - 1].label}+</span>
                  </div>
                </div>
              )}

              {/* Pills */}
              {currentQ.type === "pills" && (
                <div>
                  <div className="flex flex-wrap gap-3">
                    {currentQ.options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() =>
                          togglePill(opt.value, currentQ.multiSelect ?? false)
                        }
                        className={`px-5 py-3 border text-sm font-medium transition-all ${
                          pillsSelected.includes(opt.value)
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border hover:border-accent/60 text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {currentQ.multiSelect && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Select all that apply
                    </p>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-10 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  disabled={current === 0}
                  className="text-xs uppercase tracking-widest font-semibold text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <MagneticButton
                  variant="teal"
                  onClick={handleNext}
                  disabled={!canAdvance}
                >
                  {current + 1 === config.questions.length
                    ? "Almost done →"
                    : "Next"}{" "}
                  <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </div>
          )}

          {/* ── CONTACT ──────────────────────────────────────── */}
          {stage === "contact" && (
            <div className="card-editorial p-8 md:p-12">
              <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                One last step
              </div>
              <h2 className="text-3xl md:text-4xl mb-3">
                Where should we send your results?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our team personally reviews every submission and responds within 24
                hours with a clear picture of your position and what to do next.
              </p>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Full Name *
                  </span>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                    className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
                    placeholder="Rajesh Kumar"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Work Email *
                  </span>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                    className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
                    placeholder="you@yourcompany.com"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Phone *
                  </span>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                    className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Company{" "}
                    <span className="text-muted-foreground/60">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={contact.company}
                    onChange={e =>
                      setContact(c => ({ ...c, company: e.target.value }))
                    }
                    className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
                    placeholder="Acme Industries Pvt. Ltd."
                  />
                </label>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <MagneticButton
                  variant="teal"
                  onClick={handleSubmit}
                  disabled={!contactValid || submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      Get My Report <ArrowRight size={14} />
                    </>
                  )}
                </MagneticButton>
              </div>
            </div>
          )}

          {/* ── DONE ─────────────────────────────────────────── */}
          {stage === "done" && (
            <div className="card-editorial p-8 md:p-12">
              <div className="size-16 bg-accent/15 grid place-items-center mx-auto mb-6">
                <CheckCircle2 size={36} className="text-accent" strokeWidth={1.25} />
              </div>

              {/* Score */}
              <div className="text-center mb-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                  Your {config.toolLabel} Score
                </div>
                <div className="text-7xl font-bold text-accent font-mono leading-none mb-3">
                  {pct}%
                </div>
                <div className="text-sm font-semibold text-foreground mb-2">
                  {tierConfig.label}
                </div>
                <div className="w-full h-1.5 bg-border mt-5 overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-1000 delay-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="divider-gold mx-auto mb-6" />

              <p className="text-muted-foreground text-center mb-2">
                {tierConfig.description}
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Our team will review your profile and reach out to{" "}
                <span className="text-accent font-semibold">{contact.email}</span>{" "}
                within 24 hours.
              </p>

              {/* Calendly nudge */}
              <div className="mt-8 p-5 bg-secondary/50 border border-border">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Want to move faster?
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Book a free 20-minute call. We'll walk you through your results live.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-accent text-xs font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  Book a 20-min Call <ArrowRight size={13} />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <MagneticButton variant="teal" onClick={() => navigate("/contact")}>
                  Talk to Us <ArrowRight size={14} />
                </MagneticButton>
                <MagneticButton
                  variant="ghost-teal"
                  onClick={() => navigate("/services")}
                >
                  View Services
                </MagneticButton>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      {stage !== "done" && (
        <section className="bg-secondary/40 py-20 md:py-28">
          <div className="container max-w-4xl">
            <div className="reveal text-center mb-12">
              <span className="eyebrow">After you submit</span>
              <div className="divider-gold mt-5 mb-6 mx-auto" />
              <h2 className="text-4xl md:text-6xl">A personal review, not an algorithm.</h2>
              <p className="text-muted-foreground mt-6 text-lg max-w-xl mx-auto">
                Every submission is reviewed by our advisory team. You'll get a real
                assessment  -  not an automated email.
              </p>
            </div>
            <div className="stagger grid md:grid-cols-2 gap-0 border-t border-border">
              {config.whatNext.map(s => (
                <div
                  key={s.n}
                  className="reveal p-8 md:p-10 border-b border-r border-border bg-background"
                >
                  <div className="text-accent font-mono text-sm mb-4">{s.n}</div>
                  <h4 className="text-xl mb-2">{s.t}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AssessmentEngine;
