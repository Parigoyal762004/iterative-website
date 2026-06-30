import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import useReveal from "@/hooks/useReveal";

// ── Animated semi-circle score arc ────────────────────────────────────────
const ScoreArc = ({ pct }: { pct: number }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  // Trigger animation on mount (score screen just appeared)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Semi-circle geometry
  // viewBox: 200×110, arc center (100, 100), radius 80
  const R = 80;
  const cx = 100;
  const cy = 100;
  // Full semi-circle circumference = π × R
  const circumference = Math.PI * R;
  // dashoffset: 0 = full arc, circumference = empty
  const dashOffset = animated ? circumference * (1 - pct / 100) : circumference;

  const scoreColor =
    pct >= 75 ? "hsl(142 60% 45%)" : pct >= 50 ? "hsl(46 65% 52%)" : "hsl(16 80% 55%)";

  const label =
    pct >= 75 ? "Strong Profile" : pct >= 50 ? "Getting There" : "Needs Work";

  return (
    <div className="flex flex-col items-center mb-8">
      <svg
        ref={ref}
        viewBox="0 0 200 108"
        width="220"
        height="120"
        aria-hidden="true"
      >
        {/* Track */}
        <path
          d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none"
          stroke="hsl(210 15% 88%)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none"
          stroke={scoreColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: animated
              ? "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)"
              : "none",
          }}
        />
        {/* Score label in centre */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fontFamily="'Inter', monospace"
          fill="hsl(180 36% 15%)"
        >
          {pct}%
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fontFamily="'Inter', sans-serif"
          fill="hsl(215 15% 40%)"
          letterSpacing="2"
          style={{ textTransform: "uppercase" }}
        >
          READINESS
        </text>
      </svg>
      <span
        className="text-xs font-bold uppercase tracking-widest mt-1"
        style={{ color: scoreColor }}
      >
        {label}
      </span>
    </div>
  );
};
import { supabase } from "@/lib/supabase";


const questions = [
  {
    id: 0,
    category: "Business Standing",
    question: "How long has your business been operating?",
    options: [
      { label: "Less than 1 year", points: 0 },
      { label: "1–2 years", points: 8 },
      { label: "2–4 years", points: 17 },
      { label: "4+ years", points: 25 },
    ],
  },
  {
    id: 1,
    category: "Revenue & Banking",
    question: "What is your average monthly revenue?",
    options: [
      { label: "Less than ₹5L", points: 0 },
      { label: "₹5L – ₹20L", points: 8 },
      { label: "₹20L – ₹50L", points: 17 },
      { label: "₹50L+", points: 25 },
    ],
  },
  {
    id: 2,
    category: "Tax Compliance",
    question: "Are your last 2 years of ITR filed?",
    options: [
      { label: "No ITR filed", points: 0 },
      { label: "Only 1 year filed", points: 10 },
      { label: "Both years filed, clean", points: 25 },
    ],
  },
  {
    id: 3,
    category: "Documentation",
    question: "How ready is your loan documentation?",
    options: [
      { label: "Missing several key documents", points: 0 },
      { label: "Have some, but gaps exist", points: 8 },
      { label: "Mostly complete", points: 17 },
      { label: "Bank statements, GST, ITR all ready", points: 25 },
    ],
  },
];

type ContactForm = { name: string; email: string; phone: string };
type Stage = "quiz" | "contact" | "done";

const LoanAudit = () => {
  useReveal();
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("quiz");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ label: string; points: number }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [contact, setContact] = useState<ContactForm>({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const score = answers.reduce((sum, a) => sum + a.points, 0);
  const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.points)), 0);
  const pct = Math.round((score / maxScore) * 100);

  const handleNext = () => {
    if (selected === null) return;
    const chosen = questions[current].options[selected];
    const newAnswers = [...answers, chosen];
    setAnswers(newAnswers);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setStage("contact");
    }
  };

  const handleBack = () => {
    if (current === 0) return;
    setCurrent(c => c - 1);
    setAnswers(a => a.slice(0, -1));
    setSelected(null);
  };

  const contactValid = contact.name.trim() && contact.email.trim() && contact.phone.trim();

  const handleSubmit = async () => {
    if (!contactValid) return;
    setSubmitting(true);

    await supabase.from("loan_audit_submissions").insert({
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      q1_answer: answers[0]?.label,
      q2_answer: answers[1]?.label,
      q3_answer: answers[2]?.label,
      q4_answer: answers[3]?.label,
      score: pct,
    });

    setSubmitting(false);
    setStage("done");
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary text-white py-28 md:py-36 overflow-hidden">
        {/* Concentric score arcs  -  assessment forming, progress building */}
        <div className="absolute inset-0 hero-arcs pointer-events-none" aria-hidden="true" />
        <div className="container relative z-10">
          <span className="eyebrow text-accent">Free Tool</span>
          <div className="divider-gold mt-6 mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-4xl leading-[1.05]">
            Is your business <span className="text-accent">actually loan-ready?</span>
          </h1>
          <p className="mt-8 max-w-2xl text-white/75 text-lg">
            Most business owners find out they're not, only after rejection. Answer 4 quick questions. Our team will review your profile and come back with a personalised assessment.
          </p>
        </div>
      </section>

      {/* MAIN WIDGET */}
      <section className="bg-background py-20 md:py-28">
        <div className="container max-w-2xl">

          {/* ── QUIZ STAGE ───────────────────────────────────── */}
          {stage === "quiz" && (
            <div className="card-editorial p-8 md:p-12">
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {questions.map((_, i) => (
                  <div key={i} className="flex-1 h-1 bg-border overflow-hidden">
                    <div className={`h-full bg-accent transition-all duration-500 ${i < answers.length ? "w-full" : i === current ? "w-1/2" : "w-0"}`} />
                  </div>
                ))}
              </div>

              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                {questions[current].category} · Question {current + 1} of {questions.length}
              </div>
              <h2 className="text-2xl md:text-3xl mb-8 leading-snug">{questions[current].question}</h2>

              <div className="space-y-3">
                {questions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left px-6 py-4 border text-sm font-medium transition-all ${
                      selected === i
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border hover:border-accent/60"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  disabled={current === 0}
                  className="text-xs uppercase tracking-widest font-semibold text-muted-foreground disabled:opacity-30"
                >
                  Back
                </button>
                <MagneticButton variant="teal" onClick={handleNext} disabled={selected === null}>
                  {current + 1 === questions.length ? "Almost done →" : "Next"} <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </div>
          )}

          {/* ── CONTACT STAGE ────────────────────────────────── */}
          {stage === "contact" && (
            <div className="card-editorial p-8 md:p-12">
              <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">One last step</div>
              <h2 className="text-3xl md:text-4xl mb-3">Where should we send your assessment?</h2>
              <p className="text-muted-foreground mb-8">
                Our team will personally review your answers and reach out within 24 hours with a clear picture of where you stand and what to fix.
              </p>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Full Name</span>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                    className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
                    placeholder="Rahul Sharma"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Email</span>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(c => ({ ...c, email: e.target.value }))}
                    className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
                    placeholder="rahul@yourbusiness.com"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Phone</span>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                    className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => { setStage("quiz"); setCurrent(questions.length - 1); }}
                  className="text-xs uppercase tracking-widest font-semibold text-muted-foreground"
                >
                  Back
                </button>
                <MagneticButton variant="teal" onClick={handleSubmit} disabled={!contactValid || submitting}>
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <>Get My Assessment <ArrowRight size={14} /></>}
                </MagneticButton>
              </div>
            </div>
          )}

          {/* ── DONE STAGE ───────────────────────────────────── */}
          {stage === "done" && (
            <div className="card-editorial p-8 md:p-12 text-center">
              <div className="size-16 bg-accent/15 grid place-items-center mx-auto mb-6">
                <CheckCircle2 size={36} className="text-accent" strokeWidth={1.25} />
              </div>

              {/* Score arc */}
              <ScoreArc pct={pct} />

              <div className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
                {pct >= 75
                  ? "Your profile looks strong. Our team will confirm the details on the call."
                  : pct >= 50
                  ? "A few areas to address. We'll walk you through what to fix."
                  : "Room to prepare, but we've helped businesses in this position before."}
              </div>

              <div className="divider-gold mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl mb-3">We've got your answers.</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our team will review your full profile and reach out to{" "}
                <span className="text-accent font-semibold">{contact.email}</span>{" "}
                within 24 hours with a personalised assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <MagneticButton variant="teal" onClick={() => navigate("/contact")}>
                  Book a Call <ArrowRight size={14} />
                </MagneticButton>
                <MagneticButton variant="ghost-light" onClick={() => navigate("/services")}>
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
              <span className="eyebrow">What happens after</span>
              <div className="divider-gold mt-5 mb-6 mx-auto" />
              <h2 className="text-4xl md:text-6xl">A personal review, not an algorithm.</h2>
              <p className="text-muted-foreground mt-6 text-lg max-w-xl mx-auto">
                Your answers are reviewed by our advisory team, not a bot. You'll get a real assessment of where you stand and exactly what to fix.
              </p>
            </div>

            <div className="stagger grid md:grid-cols-2 gap-0 border-t border-border">
              {[
                { n: "01", t: "We review your profile", d: "Our team looks at your answers against the 4 key parameters lenders actually check." },
                { n: "02", t: "We call you within 24hrs", d: "A quick 15-minute call to walk you through your readiness and any gaps we see." },
                { n: "03", t: "You get a clear action plan", d: "Know exactly what to fix and in what order before approaching any lender." },
                { n: "04", t: "We help you get there", d: "If you want, we take it forward, connecting you with the right lender for your profile." },
              ].map(s => (
                <div key={s.n} className="reveal p-8 md:p-10 border-b border-r border-border bg-background">
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

export default LoanAudit;
