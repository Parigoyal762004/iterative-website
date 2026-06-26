import AssessmentEngine, { ToolConfig } from "@/components/tools/AssessmentEngine";

const config: ToolConfig = {
  serviceType: "unsecured-loans",
  heroTexture: "hero-arcs",
  eyebrow: "Free Assessment",
  headline: "Is your business ready for",
  headlineAccent: "an unsecured loan?",
  subtitle:
    "No collateral, no guesswork. Answer 8 questions and get a personalised eligibility read from our team within 24 hours.",
  toolLabel: "Loan Eligibility Check",
  questions: [
    {
      type: "radio",
      id: "vintage",
      category: "Business Standing",
      question: "How long has your business been operating?",
      options: [
        { label: "Less than 1 year", points: 0 },
        { label: "1–2 years", points: 8 },
        { label: "2–5 years", points: 17 },
        { label: "5+ years", points: 25 },
      ],
    },
    {
      type: "slider",
      id: "turnover",
      category: "Revenue & Banking",
      question: "What is your average monthly turnover?",
      description:
        "This is the key underwriting signal. Include all business revenue channels.",
      notches: [
        { label: "₹5L", value: 5, points: 0 },
        { label: "₹10L", value: 10, points: 5 },
        { label: "₹25L", value: 25, points: 10 },
        { label: "₹50L", value: 50, points: 15 },
        { label: "₹1Cr", value: 100, points: 18 },
        { label: "₹2Cr", value: 200, points: 20 },
        { label: "₹5Cr", value: 500, points: 22 },
        { label: "₹10Cr", value: 1000, points: 23 },
        { label: "₹25Cr+", value: 2500, points: 25 },
      ],
    },
    {
      type: "pills",
      id: "business_type",
      category: "Business Profile",
      question: "What best describes your business?",
      options: [
        { label: "Trading / Distribution", value: "trading", points: 22 },
        { label: "Manufacturing", value: "manufacturing", points: 22 },
        { label: "Services", value: "services", points: 22 },
        { label: "Retail", value: "retail", points: 22 },
        { label: "E-commerce", value: "ecommerce", points: 20 },
        { label: "Real Estate", value: "real_estate", points: 18 },
        { label: "Hospitality / F&B", value: "hospitality", points: 18 },
        { label: "Other", value: "other", points: 20 },
      ],
    },
    {
      type: "radio",
      id: "gst",
      category: "Tax & Compliance",
      question: "What is your GST registration status?",
      options: [
        { label: "Not registered", points: 0 },
        { label: "Applied, pending", points: 5 },
        { label: "Registered, less than 1 year", points: 12 },
        { label: "Registered, 1+ years", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "itr",
      category: "Tax & Compliance",
      question: "Are your last 2 years of ITR filed?",
      options: [
        { label: "No ITR filed", points: 0 },
        { label: "Only 1 year filed", points: 10 },
        { label: "Both years filed, clean", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "existing_loans",
      category: "Credit Profile",
      question: "How many active business loans do you currently have?",
      description: "Active EMI-based loans, not OD or credit lines.",
      options: [
        { label: "None", points: 18 },
        { label: "1–2 loans", points: 25 },
        { label: "3–5 loans", points: 12 },
        { label: "5+ loans", points: 5 },
      ],
    },
    {
      type: "slider",
      id: "loan_amount",
      category: "Funding Requirement",
      question: "How much funding are you looking for?",
      notches: [
        { label: "₹10L", value: 10, points: 25 },
        { label: "₹25L", value: 25, points: 25 },
        { label: "₹50L", value: 50, points: 25 },
        { label: "₹1Cr", value: 100, points: 25 },
        { label: "₹2Cr", value: 200, points: 22 },
        { label: "₹5Cr", value: 500, points: 18 },
        { label: "₹10Cr+", value: 1000, points: 15 },
      ],
    },
    {
      type: "radio",
      id: "documentation",
      category: "Documentation",
      question: "How ready is your documentation?",
      description:
        "Lenders typically ask for last 12 months bank statements, GST returns, and 2 years ITR.",
      options: [
        { label: "Not started  -  I don't have much ready", points: 0 },
        { label: "I have some basics but gaps exist", points: 8 },
        { label: "Mostly complete", points: 17 },
        { label: "Bank statements, GST, ITR all ready", points: 25 },
      ],
    },
  ],
  tiers: {
    high: {
      label: "Strong Eligibility Profile",
      description:
        "Your profile checks most of the key signals lenders look for. Our team will confirm specifics and match you with the right facility.",
    },
    mid: {
      label: "Developing Profile  -  Fundable with Positioning",
      description:
        "You have a credible profile. There are a few areas to sharpen before approach. Our team will map the exact path.",
    },
    low: {
      label: "Preparation Needed First",
      description:
        "We've helped businesses in this position get funded  -  but it starts with a clear action plan. We'll tell you exactly what to fix.",
    },
  },
  whatNext: [
    {
      n: "01",
      t: "We review your submission",
      d: "Our team checks your answers against the 6 parameters lenders actually use  -  not just a score.",
    },
    {
      n: "02",
      t: "We reach out within 24 hours",
      d: "A direct call or message with our initial read of your eligibility and what to do next.",
    },
    {
      n: "03",
      t: "You get a clear action plan",
      d: "Know exactly what to fix, in what order, and which lenders are most likely to fund your profile.",
    },
    {
      n: "04",
      t: "We take it forward together",
      d: "If you want to proceed, we manage the entire process  -  from documentation to disbursement.",
    },
  ],
};

const UnsecuredLoansTool = () => <AssessmentEngine config={config} />;
export default UnsecuredLoansTool;
