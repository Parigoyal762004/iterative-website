import AssessmentEngine, { ToolConfig } from "@/components/tools/AssessmentEngine";

const config: ToolConfig = {
  serviceType: "secured-loans",
  heroTexture: "hero-graph",
  eyebrow: "Free Assessment",
  headline: "Unlock larger capital against",
  headlineAccent: "your existing assets.",
  subtitle:
    "Secured financing unlocks significantly better rates and higher amounts. Answer 7 questions to understand your eligibility profile.",
  toolLabel: "Asset-Backed Loan Check",
  questions: [
    {
      type: "pills",
      id: "asset_type",
      category: "Collateral Profile",
      question: "What assets can you offer as collateral?",
      description:
        "Select all that apply. Multiple asset types can strengthen your profile.",
      multiSelect: true,
      options: [
        { label: "Residential Property", value: "residential", points: 25 },
        { label: "Commercial Property", value: "commercial", points: 25 },
        { label: "Industrial Property", value: "industrial", points: 25 },
        { label: "Listed Shares / Mutual Funds", value: "shares", points: 22 },
        { label: "Fixed Deposits", value: "fd", points: 25 },
        { label: "Plant & Machinery", value: "machinery", points: 20 },
        { label: "Warehouse / Cold Storage", value: "warehouse", points: 22 },
      ],
    },
    {
      type: "slider",
      id: "asset_value",
      category: "Collateral Profile",
      question: "What is the approximate market value of your collateral?",
      description:
        "Use current market value  -  not purchase price or book value.",
      notches: [
        { label: "₹25L", value: 25, points: 5 },
        { label: "₹50L", value: 50, points: 8 },
        { label: "₹1Cr", value: 100, points: 12 },
        { label: "₹2Cr", value: 200, points: 15 },
        { label: "₹5Cr", value: 500, points: 18 },
        { label: "₹10Cr", value: 1000, points: 20 },
        { label: "₹25Cr", value: 2500, points: 22 },
        { label: "₹50Cr", value: 5000, points: 23 },
        { label: "₹100Cr+", value: 10000, points: 25 },
      ],
    },
    {
      type: "slider",
      id: "loan_amount",
      category: "Funding Requirement",
      question: "How much funding do you require?",
      notches: [
        { label: "₹25L", value: 25, points: 25 },
        { label: "₹50L", value: 50, points: 25 },
        { label: "₹1Cr", value: 100, points: 25 },
        { label: "₹5Cr", value: 500, points: 25 },
        { label: "₹10Cr", value: 1000, points: 25 },
        { label: "₹25Cr", value: 2500, points: 25 },
        { label: "₹50Cr+", value: 5000, points: 25 },
      ],
    },
    {
      type: "radio",
      id: "vintage",
      category: "Business Standing",
      question: "How long has your business been operating?",
      options: [
        { label: "Less than 1 year", points: 0 },
        { label: "1–3 years", points: 10 },
        { label: "3–7 years", points: 20 },
        { label: "7+ years", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "credit_score",
      category: "Credit Profile",
      question: "What is your approximate CIBIL / credit score?",
      options: [
        { label: "750+ (Excellent)", points: 25 },
        { label: "700–750 (Good)", points: 20 },
        { label: "650–700 (Average)", points: 10 },
        { label: "Below 650", points: 5 },
        { label: "I'm not sure", points: 10 },
      ],
    },
    {
      type: "pills",
      id: "purpose",
      category: "Use of Funds",
      question: "What is the primary purpose of this loan?",
      options: [
        { label: "Working Capital", value: "working_capital", points: 25 },
        { label: "Business Expansion", value: "expansion", points: 25 },
        { label: "Capital Expenditure", value: "capex", points: 25 },
        { label: "Acquisition", value: "acquisition", points: 22 },
        { label: "Debt Refinancing", value: "refinancing", points: 22 },
        { label: "Project Bridge", value: "bridge", points: 20 },
      ],
    },
    {
      type: "radio",
      id: "liabilities",
      category: "Balance Sheet",
      question: "How would you describe your current debt situation?",
      options: [
        {
          label: "Debt-free  -  no active loans",
          points: 25,
        },
        {
          label: "Low leverage  -  1–2 manageable loans",
          points: 22,
        },
        {
          label: "Moderate  -  several loans but serviced on time",
          points: 12,
        },
        {
          label: "High  -  multiple loans, some stress",
          points: 5,
        },
      ],
    },
  ],
  tiers: {
    high: {
      label: "Strong Secured Loan Profile",
      description:
        "Your collateral profile and business standing look compelling. We can likely structure a facility at better rates than you may expect. Our team will confirm details shortly.",
    },
    mid: {
      label: "Eligible with the Right Structure",
      description:
        "You have assets and a serviceable history. Structuring this correctly matters. Our team will walk you through how to position it for the best outcome.",
    },
    low: {
      label: "Let's Build the Case Together",
      description:
        "There are areas to address  -  but that's what we specialise in. We'll map the path clearly so you know exactly what to do before approaching any lender.",
    },
  },
  whatNext: [
    {
      n: "01",
      t: "We review your collateral profile",
      d: "Our team assesses your asset quality, LTV ratios, and which lenders are best suited to your structure.",
    },
    {
      n: "02",
      t: "We identify the right structure",
      d: "Secured lending has many forms  -  LAP, OD against shares, FD-backed lines. We find the most capital-efficient fit.",
    },
    {
      n: "03",
      t: "We reach out within 24 hours",
      d: "A quick, direct conversation with our initial read and a path forward.",
    },
    {
      n: "04",
      t: "We manage the full process",
      d: "From documentation to disbursement  -  we handle the lender relationship so you can focus on your business.",
    },
  ],
};

const SecuredLoansTool = () => <AssessmentEngine config={config} />;
export default SecuredLoansTool;
