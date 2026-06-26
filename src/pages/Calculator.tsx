import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { ArrowRight, ChevronDown, Info } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import useReveal from "@/hooks/useReveal";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

type LoanType =
  | "Unsecured Business Loan"
  | "Bridge / Gap Financing"
  | "Secured Term Loan"
  | "Project Finance"
  | "Equipment / Machinery Loan";

type LenderType = "Public Bank" | "Private Bank" | "NBFC";

interface Preset {
  rate: number;
  maxMonths: number;
  defaultMonths: number;
  defaultAmount: number; // in Lakhs
  description: string;
  bestFor: string;
}

interface LenderInfo {
  description: string;
  rateRange: string;
  note: string;
}

// ─── Loan type metadata ────────────────────────────────────────────────────
const presets: Record<LoanType, Preset> = {
  "Unsecured Business Loan": {
    rate: 15,
    maxMonths: 60,
    defaultMonths: 36,
    defaultAmount: 50,
    description: "Working capital or growth funding without pledging any assets. Approved on cashflow, GST returns, and banking history.",
    bestFor: "Profitable businesses with ₹1Cr+ annual turnover and 18+ months of operations.",
  },
  "Bridge / Gap Financing": {
    rate: 18,
    maxMonths: 24,
    defaultMonths: 12,
    defaultAmount: 100,
    description: "Short-term capital to cover a liquidity gap, typically while a larger facility or receivable clears.",
    bestFor: "Businesses awaiting receivables, asset sales, or a pending larger debt facility.",
  },
  "Secured Term Loan": {
    rate: 10,
    maxMonths: 180,
    defaultMonths: 84,
    defaultAmount: 200,
    description: "Long-tenure debt backed by collateral (property, plant, or equipment). Lowest rates in our product suite.",
    bestFor: "Asset-rich businesses seeking large-ticket, long-tenor debt at the sharpest rates.",
  },
  "Project Finance": {
    rate: 11,
    maxMonths: 240,
    defaultMonths: 120,
    defaultAmount: 500,
    description: "Structured debt for specific capital projects: infrastructure, real estate, and manufacturing plants; repaid from project cashflows.",
    bestFor: "Large capex projects with defined revenue projections: ₹5Cr and above.",
  },
  "Equipment / Machinery Loan": {
    rate: 12,
    maxMonths: 84,
    defaultMonths: 60,
    defaultAmount: 75,
    description: "Asset-backed financing where the equipment itself serves as collateral. Faster approvals than general term loans.",
    bestFor: "Manufacturing, logistics, and healthcare businesses purchasing specific machinery.",
  },
};

const lenderInfo: Record<LenderType, LenderInfo> = {
  "Public Bank": {
    description: "State-owned banks (SBI, PNB, Bank of Baroda, etc.). Lowest rates but slower process and stricter documentation.",
    rateRange: "9 – 13% p.a.",
    note: "Best for secured loans and large-ticket project finance.",
  },
  "Private Bank": {
    description: "HDFC, ICICI, Axis, Kotak etc. Faster turnaround, digital processes, and more flexible structuring.",
    rateRange: "12 – 18% p.a.",
    note: "Our primary channel for unsecured business loans.",
  },
  "NBFC": {
    description: "Non-Banking Financial Companies. Most flexible underwriting, fastest disbursal, but higher rates.",
    rateRange: "16 – 24% p.a.",
    note: "Ideal for bridge financing, new-age businesses, and sub-prime profiles.",
  },
};

// ─── Formatting ───────────────────────────────────────────────────────────
const fmtINR = (n: number) => {
  if (!isFinite(n) || n < 0) return "₹0";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

// Display amount label for slider (in Lakhs input)
const fmtAmountL = (l: number) => {
  if (l >= 100) return `₹${(l / 100).toFixed(l % 100 === 0 ? 0 : 1)} Cr`;
  return `₹${l} L`;
};

const Calculator = () => {
  useReveal();

  const [loanType, setLoanType] = useState<LoanType>("Unsecured Business Loan");
  const [lenderType, setLenderType] = useState<LenderType>("Private Bank");
  const [amountL, setAmountL] = useState(50);       // in Lakhs
  const [rate, setRate] = useState(15);
  const [months, setMonths] = useState(36);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showLoanInfo, setShowLoanInfo] = useState(false);
  const [showLenderInfo, setShowLenderInfo] = useState(false);

  // Apply smart defaults when loan type changes
  useEffect(() => {
    const p = presets[loanType];
    setRate(p.rate);
    setMonths(p.defaultMonths);
    // Clamp current amount to valid range, fallback to default
    setAmountL(a => {
      const clamped = Math.min(Math.max(a, 1), 5000);
      return clamped || p.defaultAmount;
    });
  }, [loanType]);

  // ─── Core EMI formula ──────────────────────────────────────────────────
  // EMI = P × r × (1+r)^n / ((1+r)^n − 1)
  // where P = principal, r = monthly rate, n = months
  const principal = amountL * 100_000;
  const r = rate / 12 / 100;
  const n = months;

  const emi = useMemo(() => {
    if (r === 0) return principal / n;
    const factor = Math.pow(1 + r, n);
    return (principal * r * factor) / (factor - 1);
  }, [principal, r, n]);

  const totalPayment  = emi * n;
  const totalInterest = totalPayment - principal;
  const processingLow  = principal * 0.01;
  const processingHigh = principal * 0.02;

  // ─── Donut chart ──────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  const CHART_COLORS = { principal: "#295757", interest: "#d4af35" };

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["Principal", "Total Interest"],
        datasets: [{
          data: [principal, totalInterest],
          backgroundColor: [CHART_COLORS.principal, CHART_COLORS.interest],
          borderWidth: 0,
        }],
      },
      options: {
        cutout: "72%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => `${ctx.label}: ${fmtINR(Number(ctx.parsed))}` },
          },
        },
      },
    });
    return () => { chartRef.current?.destroy(); chartRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const c = chartRef.current;
    if (!c) return;
    c.data.datasets[0].data = [principal, totalInterest];
    c.update();
  }, [principal, totalInterest]);

  // ─── Yearly amortization schedule ─────────────────────────────────────
  const schedule = useMemo(() => {
    let balance = principal;
    const rows: { year: number; principal: number; interest: number; balance: number }[] = [];
    const years = Math.ceil(n / 12);
    for (let y = 1; y <= years; y++) {
      let yearPrincipal = 0;
      let yearInterest  = 0;
      const monthsThisYear = Math.min(12, n - (y - 1) * 12);
      for (let m = 0; m < monthsThisYear; m++) {
        const intPart  = balance * r;
        const prinPart = emi - intPart;
        yearInterest  += intPart;
        yearPrincipal += prinPart;
        balance       -= prinPart;
      }
      rows.push({ year: y, principal: yearPrincipal, interest: yearInterest, balance: Math.max(0, balance) });
    }
    return rows;
  }, [principal, r, emi, n]);

  const maxMonths = presets[loanType].maxMonths;
  // Max loan amount in Lakhs  -  5000L = ₹50 Cr (covers enterprise-scale scenarios)
  const MAX_AMOUNT_L = 5000;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-primary text-white py-28 md:py-36 overflow-hidden">
        {/* Graph-paper grid  -  numerical precision, financial modelling */}
        <div className="absolute inset-0 hero-graph pointer-events-none" aria-hidden="true" />
        <div className="container relative z-10">
          <span className="eyebrow text-accent">Advisor Tool</span>
          <div className="divider-gold mt-6 mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-4xl leading-[1.05]">Model your deal before you talk to a lender.</h1>
          <p className="mt-6 max-w-2xl text-white/75 text-lg">
            The same numbers we use in every client conversation  -  calibrated by loan type, lender category, and real market rates.
          </p>
        </div>
      </section>

      {/* CALC */}
      <section className="bg-background py-16 md:py-24">
        <div className="container grid lg:grid-cols-5 gap-10">

          {/* ── INPUTS ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Loan Type */}
            <Field
              label="Loan Type"
              info={
                <InfoToggle
                  open={showLoanInfo}
                  onToggle={() => setShowLoanInfo(v => !v)}
                  label="What's the difference?"
                />
              }
            >
              <SelectNative
                value={loanType}
                onChange={v => setLoanType(v as LoanType)}
                options={Object.keys(presets) as LoanType[]}
              />
              {showLoanInfo && (
                <div className="mt-3 border-l-2 border-accent pl-4 space-y-1">
                  <p className="text-sm text-foreground leading-relaxed">{presets[loanType].description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="font-semibold text-accent">Best for: </span>{presets[loanType].bestFor}
                  </p>
                </div>
              )}
            </Field>

            {/* Lender Type */}
            <Field
              label="Lender Type"
              info={
                <InfoToggle
                  open={showLenderInfo}
                  onToggle={() => setShowLenderInfo(v => !v)}
                  label="Which should I choose?"
                />
              }
            >
              <SelectNative
                value={lenderType}
                onChange={v => setLenderType(v as LenderType)}
                options={["Public Bank", "Private Bank", "NBFC"]}
              />
              {showLenderInfo && (
                <div className="mt-3 border-l-2 border-accent pl-4 space-y-1">
                  <p className="text-sm text-foreground leading-relaxed">{lenderInfo[lenderType].description}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">Typical rate: </span>{lenderInfo[lenderType].rateRange}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">Note: </span>{lenderInfo[lenderType].note}
                  </p>
                </div>
              )}
            </Field>

            {/* Loan Amount */}
            <Field label={`Loan Amount: ${fmtAmountL(amountL)}`}>
              <input
                type="range"
                min={1}
                max={MAX_AMOUNT_L}
                step={amountL < 100 ? 1 : amountL < 500 ? 5 : 25}
                value={amountL}
                onChange={e => setAmountL(+e.target.value)}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>₹1 L</span>
                <span>₹50 Cr</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 border-l-2 border-accent/40 pl-3">
                For project finance and structured deals above ₹50 Cr, contact us directly for a custom model.
              </p>
            </Field>

            {/* Interest Rate */}
            <Field label={`Interest Rate: ${rate.toFixed(2)}% p.a.`}>
              <input
                type="range"
                min={5}
                max={24}
                step={0.25}
                value={rate}
                onChange={e => setRate(+e.target.value)}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>5%</span><span>24%</span>
              </div>
            </Field>

            {/* Tenure */}
            <Field label={`Tenure: ${months} months (${(months / 12).toFixed(1)} yrs)`}>
              <input
                type="range"
                min={3}
                max={maxMonths}
                step={1}
                value={months}
                onChange={e => setMonths(+e.target.value)}
                className="w-full accent-accent"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>3 months</span>
                <span>{Math.round(maxMonths / 12)} yrs</span>
              </div>
            </Field>

            <p className="text-xs text-muted-foreground border-l-2 border-accent pl-4">
              Smart preset applied for <span className="text-accent font-semibold">{loanType}</span>. Adjust sliders to model alternative scenarios.
            </p>
          </div>

          {/* ── OUTPUT  -  sticky ── */}
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="card-editorial p-8">
                <span className="eyebrow">Monthly EMI</span>
                <div className="divider-gold mt-3 mb-4" />
                <div className="text-5xl md:text-6xl text-primary font-bold leading-none tabular-nums">
                  {fmtINR(emi)}
                </div>

                <div className="mt-8 space-y-3 text-sm">
                  <Row label="Principal"           value={fmtINR(principal)} />
                  <Row label="Total Interest"       value={fmtINR(totalInterest)} highlight />
                  <Row label="Total Payment"        value={fmtINR(totalPayment)} />
                  <Row label="Est. Processing Fee"  value={`${fmtINR(processingLow)} – ${fmtINR(processingHigh)}`} />
                  <Row label="Lender Category"      value={lenderType} />
                </div>

                {/* Donut */}
                <div className="mt-8 h-44 grid place-items-center">
                  <canvas ref={canvasRef} />
                </div>
                <div className="flex items-center justify-center gap-6 mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-2"><span className="size-3 bg-primary inline-block" /> Principal</div>
                  <div className="flex items-center gap-2"><span className="size-3 bg-accent inline-block" /> Interest</div>
                </div>

                <Link to="/contact" className="block mt-8">
                  <MagneticButton variant="teal" className="w-full">
                    Get this Loan Rate <ArrowRight size={14} />
                  </MagneticButton>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground text-center px-4">
                Indicative only. Actual rates and fees subject to lender underwriting and credit assessment.
              </p>
            </div>
          </aside>
        </div>

        {/* ── AMORTIZATION SCHEDULE ── */}
        <div className="container mt-14">
          <button
            onClick={() => setShowSchedule(s => !s)}
            className="w-full card-editorial p-6 flex items-center justify-between hover:bg-secondary/40 transition-colors"
          >
            <div>
              <span className="eyebrow">Schedule</span>
              <div className="text-xl mt-1">Yearly Amortization Breakdown</div>
            </div>
            <ChevronDown
              size={22}
              className={`text-accent transition-transform duration-300 ${showSchedule ? "rotate-180" : ""}`}
            />
          </button>

          {showSchedule && (
            <div className="mt-4 card-editorial overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white">
                    <tr>
                      {["Year", "Principal Paid", "Interest Paid", "Closing Balance"].map(h => (
                        <th key={h} className={`p-4 uppercase tracking-widest text-xs font-semibold ${h === "Year" ? "text-left" : "text-right"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map(row => (
                      <tr key={row.year} className="border-t border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-4 font-mono text-accent">Year {row.year}</td>
                        <td className="p-4 text-right tabular-nums">{fmtINR(row.principal)}</td>
                        <td className="p-4 text-right text-accent tabular-nums">{fmtINR(row.interest)}</td>
                        <td className="p-4 text-right font-semibold tabular-nums">{fmtINR(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-secondary/30">
                    <tr className="border-t-2 border-accent">
                      <td className="p-4 font-bold text-xs uppercase tracking-widest">Total</td>
                      <td className="p-4 text-right font-bold tabular-nums">{fmtINR(principal)}</td>
                      <td className="p-4 text-right font-bold text-accent tabular-nums">{fmtINR(totalInterest)}</td>
                      <td className="p-4 text-right text-muted-foreground text-xs"> - </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ── POST-CALCULATOR CTA ── */}
        <div className="container mt-16">
          <div className="bg-primary text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="relative z-10">
              <span className="eyebrow text-accent">Like what you see?</span>
              <div className="divider-gold mt-4 mb-5" />
              <h2 className="text-2xl md:text-3xl text-white leading-snug">
                These are indicative numbers.<br className="hidden md:block" /> The real ones could be better.
              </h2>
              <p className="text-white/65 mt-3 max-w-md text-sm leading-relaxed">
                Our team negotiates rates across 40+ lenders. A 15-minute call could save you more than the interest difference suggests.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link to="/contact">
                <MagneticButton variant="teal">
                  Get the Real Rate <ArrowRight size={14} />
                </MagneticButton>
              </Link>
              <Link to="/audit">
                <MagneticButton variant="ghost-light">
                  Check Loan Readiness
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── Sub-components ────────────────────────────────────────────────────────

const Field = ({
  label,
  children,
  info,
}: {
  label: string;
  children: React.ReactNode;
  info?: React.ReactNode;
}) => (
  <div className="border border-border p-6 bg-background">
    <div className="flex items-center justify-between mb-3">
      <label className="block text-xs font-semibold text-foreground uppercase tracking-widest">{label}</label>
      {info}
    </div>
    {children}
  </div>
);

const InfoToggle = ({
  open,
  onToggle,
  label,
}: {
  open: boolean;
  onToggle: () => void;
  label: string;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors font-medium"
  >
    <Info size={12} />
    {open ? "Hide" : label}
  </button>
);

const SelectNative = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none border border-border bg-background px-4 py-3 pr-10 outline-none focus:border-accent transition-colors text-sm font-medium"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
  </div>
);

const Row = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex justify-between items-baseline border-b border-border pb-2">
    <span className="text-muted-foreground uppercase tracking-widest text-xs">{label}</span>
    <span className={`font-bold tabular-nums ${highlight ? "text-accent" : "text-foreground"}`}>{value}</span>
  </div>
);

export default Calculator;
