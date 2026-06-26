import { useState } from "react";

// ── Update this URL when Calendly is finalized ──────────────────────────────
const CALENDLY_URL = "https://calendly.com/akroventures-info/30-min-stand-up-call";
// ────────────────────────────────────────────────────────────────────────────
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin, Linkedin, Instagram, Calendar, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const fmt = (lakhs: number) => {
  if (lakhs >= 10000) return "₹100Cr+";
  if (lakhs >= 100) {
    const cr = lakhs / 100;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(1)}Cr`;
  }
  return `₹${lakhs}L`;
};
import { Link } from "react-router-dom";
import MagneticButton from "@/components/MagneticButton";
import useReveal from "@/hooks/useReveal";
import { supabase } from "@/lib/supabase";

const industries = ["SaaS", "Manufacturing", "D2C", "Fintech", "Healthcare", "Logistics", "Other"];
const fundingPills = ["₹10L", "₹50L", "₹1Cr", "₹5Cr", "₹10Cr", "₹25Cr", "₹50Cr+"];

type FormState = { name: string; email: string; phone: string; company: string; industry: string; revenue: number; funding: string; message: string };
type SubmitStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  useReveal();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [otherIndustry, setOtherIndustry] = useState("");
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "",
    company: "", industry: industries[0], revenue: 15,
    funding: "₹1Cr", message: "",
  });
  const update = (k: keyof FormState, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const stepValid = () => {
    if (step === 0) return form.name.trim() && form.email.trim() && form.phone.trim();
    if (step === 1) return form.company.trim() && form.industry;
    return true;
  };

  const submit = async () => {
    setStatus("loading");
    setErrorMsg("");
    const resolvedIndustry = form.industry === "Other"
      ? (otherIndustry.trim() || "Other")
      : form.industry;
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim() || null,
        industry: resolvedIndustry || null,
        revenue_lakhs: form.revenue,
        funding_amount: form.funding,
        message: form.message.trim() || null,
      });
      if (error) throw error;
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg || "Something went wrong. Please try again or email us directly at info@akroventures.com.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setStep(0);
    setForm({ name: "", email: "", phone: "", company: "", industry: industries[0], revenue: 15, funding: "₹50L", message: "" });
    setErrorMsg("");
    setOtherIndustry("");
  };

  return (
    <>
      <section className="relative bg-primary text-white py-28 md:py-36 overflow-hidden">
        {/* Warm central bloom  -  invitation, not announcement */}
        <div className="absolute inset-0 hero-bloom pointer-events-none" aria-hidden="true" />
        <div className="container relative z-10">
          <span className="eyebrow text-accent">Contact</span>
          <div className="divider-gold mt-6 mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-[1.05]">Let's Talk <span className="text-accent">Capital.</span></h1>
          <p className="mt-8 max-w-xl text-white/75 text-lg">No sales pitch, no pressure. Just an honest conversation about your business and how we can help.</p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container grid lg:grid-cols-5 gap-10">
          {/* WIZARD */}
          <div className="lg:col-span-3 card-editorial p-5 sm:p-8 md:p-10">

            {/* SUCCESS STATE */}
            {status === "success" && (
              <div className="text-center py-10">
                <div className="size-16 bg-accent/15 grid place-items-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-accent" strokeWidth={1.25} />
                </div>
                <div className="eyebrow mb-4">Application Received</div>
                <h2 className="text-3xl md:text-4xl">We'll be in touch.</h2>
                <p className="text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
                  Rohit or Akshita will review your profile personally and reach out to{" "}
                  <span className="text-accent font-semibold">{form.email}</span> within 24 hours.
                  Not a bot. Not a template reply.
                </p>
                <div className="mt-8 pt-6 border-t border-border space-y-3">
                  <p className="text-xs text-muted-foreground">While you wait, explore what we've been writing about:</p>
                  <Link
                    to="/resources"
                    className="text-xs uppercase tracking-widest font-semibold text-accent hover:text-foreground transition-colors"
                  >
                    Browse Resources →
                  </Link>
                </div>
              </div>
            )}

            {/* FORM WIZARD */}
            {status !== "success" && (
              <>
                {/* Progress */}
                <div className="flex items-center gap-3 mb-8">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="flex-1 h-px bg-border overflow-hidden">
                      <div className={`h-full bg-accent transition-all duration-500 ${step >= i ? "w-full" : "w-0"}`} />
                    </div>
                  ))}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step {step + 1} of 3</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8">
                  {step === 0 && "About you."}
                  {step === 1 && "About your business."}
                  {step === 2 && "Your funding need."}
                </h2>

                {step === 0 && (
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput label="Full name" value={form.name} onChange={v => update("name", v)} />
                    <FormInput label="Email" type="email" value={form.email} onChange={v => update("email", v)} />
                    <FormInput label="Phone" type="tel" value={form.phone} onChange={v => update("phone", v)} className="sm:col-span-2" />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <FormInput label="Company name" value={form.company} onChange={v => update("company", v)} />
                    <div>
                      <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-widest">Industry</label>
                      <div className="flex flex-wrap gap-2">
                        {industries.map(ind => (
                          <button
                            key={ind}
                            type="button"
                            onClick={() => update("industry", ind)}
                            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all border ${form.industry === ind ? "bg-accent text-primary border-accent" : "border-border hover:border-accent"}`}
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                      {form.industry === "Other" && (
                        <input
                          type="text"
                          value={otherIndustry}
                          onChange={e => setOtherIndustry(e.target.value)}
                          placeholder="Please specify your industry…"
                          className="mt-3 w-full border border-accent bg-background px-4 py-3 outline-none focus:border-accent transition-colors text-sm"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-widest">
                        Monthly revenue: <span className="text-accent">{fmt(form.revenue)}</span>
                      </label>
                      <input
                        type="range" min={1} max={10000} step={form.revenue < 100 ? 1 : form.revenue < 1000 ? 10 : 100} value={form.revenue}
                        onChange={e => update("revenue", +e.target.value)}
                        className="w-full accent-accent"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹1L</span><span>₹100Cr+</span></div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-widest">Funding amount needed</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {fundingPills.map(p => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => update("funding", p)}
                            className={`py-3 text-sm font-bold transition-all border ${form.funding === p ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent/60"}`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-widest">Anything else? (optional)</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={e => update("message", e.target.value)}
                        className="w-full border border-border bg-background p-4 outline-none focus:border-accent transition-colors resize-none"
                        placeholder="Tell us about your timeline, use of funds, or questions…"
                      />
                    </div>
                  </div>
                )}

                {/* Error message */}
                {status === "error" && (
                  <div className="mt-6 flex items-start gap-3 border border-destructive/40 bg-destructive/5 p-4">
                    <AlertCircle size={18} className="text-destructive mt-0.5 shrink-0" />
                    <p className="text-sm text-destructive">{errorMsg}</p>
                  </div>
                )}

                <div className="mt-10 flex justify-between gap-4">
                  <button
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0 || status === "loading"}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-muted-foreground disabled:opacity-30"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>

                  {step < 2 ? (
                    <MagneticButton
                      variant="teal"
                      onClick={() => stepValid() && setStep(s => s + 1)}
                      disabled={!stepValid()}
                    >
                      Continue <ArrowRight size={14} />
                    </MagneticButton>
                  ) : (
                    <MagneticButton
                      variant="teal"
                      onClick={submit}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                      ) : (
                        "Submit Application"
                      )}
                    </MagneticButton>
                  )}
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="bg-primary text-white p-8 border border-accent/30">
              <Calendar className="text-accent mb-4" size={28} strokeWidth={1.25} />
              <h3 className="text-2xl">Or skip the form</h3>
              <p className="text-white/75 mt-3 text-sm">Pick a 15-minute slot directly on our calendar. No back and forth.</p>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="mt-6 inline-block">
                <MagneticButton variant="teal">Open Calendar</MagneticButton>
              </a>
            </div>

            <div className="card-editorial p-8 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-widest">Direct lines</h3>
              <a href="mailto:info@akroventures.com" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Mail size={16} className="text-accent" /> info@akroventures.com
              </a>
              <a href="tel:+919940628986" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Phone size={16} className="text-accent" /> +91 99406 28986
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-accent mt-0.5" /> Pan-India. Fully remote advisory
              </div>
              <div className="flex gap-3 pt-2">
                {[
                  { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/akro-ventures", label: "LinkedIn" },
                  { icon: <XLogo size={15} />, href: "https://twitter.com/akroventures", label: "X" },
                  { icon: <Instagram size={16} />, href: "https://www.instagram.com/akroventures/", label: "Instagram" },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="size-9 grid place-items-center border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Pan-India presence card (replaces removed map) */}
            <div className="bg-primary text-white p-8 border border-accent/30">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} className="text-accent" strokeWidth={1.25} />
                <span className="eyebrow text-accent">Pan-India Presence</span>
              </div>
              <p className="text-white/75 text-sm leading-relaxed">
                We work with founders across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune and beyond.
                Fully remote-capable, serving clients across India.
              </p>
            </div>
          </aside>
        </div>
      </section>

    </>
  );
};

const FormInput = ({
  label, value, onChange, type = "text", className = ""
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; className?: string;
}) => (
  <label className={`block ${className}`}>
    <span className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-widest">{label}</span>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
      className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent transition-colors"
    />
  </label>
);

export default Contact;
