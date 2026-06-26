import AssessmentEngine, { ToolConfig } from "@/components/tools/AssessmentEngine";

const config: ToolConfig = {
  serviceType: "startup-consultation",
  heroTexture: "hero-ledger",
  eyebrow: "Free Diagnostic",
  headline: "Where does your startup",
  headlineAccent: "actually stand?",
  subtitle:
    "Most founders are too close to their business to see its real strategic gaps. Answer 7 questions for an honest diagnostic from our team.",
  toolLabel: "Business Clarity Score",
  questions: [
    {
      type: "radio",
      id: "business_model",
      category: "Business Fundamentals",
      question: "How well-defined is your business model?",
      options: [
        {
          label: "Pre-revenue  -  still figuring it out",
          description: "No clear monetisation yet",
          points: 0,
        },
        {
          label: "Making revenue, but model isn't clear yet",
          description: "Selling, but unsure of the repeatable formula",
          points: 8,
        },
        {
          label: "Revenue with some unit economics clarity",
          description: "Know CAC, rough LTV, improving margins",
          points: 17,
        },
        {
          label: "Strong, documented unit economics",
          description: "Margin-positive, scalable playbook in place",
          points: 25,
        },
      ],
    },
    {
      type: "pills",
      id: "challenge_area",
      category: "Strategic Focus",
      question: "What is your biggest challenge right now?",
      description:
        "Select the area that's most holding you back. This helps us focus our consultation.",
      options: [
        { label: "Pricing Strategy", value: "pricing", points: 15 },
        { label: "Go-to-Market", value: "gtm", points: 15 },
        { label: "Distribution / Sales", value: "distribution", points: 15 },
        { label: "Hiring & Team", value: "hiring", points: 15 },
        { label: "Fundraising", value: "fundraising", points: 15 },
        { label: "Product-Market Fit", value: "pmf", points: 15 },
        { label: "Operational Efficiency", value: "operations", points: 15 },
        { label: "Market Positioning", value: "positioning", points: 15 },
      ],
    },
    {
      type: "radio",
      id: "revenue_trend",
      category: "Growth Trajectory",
      question: "What is your revenue trend over the last 6 months?",
      options: [
        { label: "Declining  -  revenue is falling", points: 0 },
        { label: "Flat  -  roughly stable", points: 5 },
        { label: "Growing 0–25% month-on-month", points: 12 },
        { label: "Growing 25–100% month-on-month", points: 20 },
        { label: "Growing 100%+ month-on-month", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "team",
      category: "Team",
      question: "How would you describe your current team?",
      options: [
        {
          label: "Founder only  -  I'm doing everything",
          points: 5,
        },
        {
          label: "2–3 person founding team",
          points: 10,
        },
        {
          label: "Functional team covering core areas",
          description: "Sales, tech, ops are covered",
          points: 18,
        },
        {
          label: "Full team with specialists in key roles",
          points: 25,
        },
      ],
    },
    {
      type: "radio",
      id: "market_understanding",
      category: "Market Clarity",
      question: "How well do you understand your market?",
      description:
        "TAM/SAM/SOM, competitive landscape, customer segments, buying behaviour.",
      options: [
        { label: "Informal understanding  -  mostly instinct", points: 0 },
        { label: "Basic research done", points: 8 },
        { label: "Detailed analysis with data", points: 17 },
        { label: "Deep domain expertise + validated data", points: 25 },
      ],
    },
    {
      type: "pills",
      id: "primary_market",
      category: "Go-to-Market",
      question: "Who is your primary customer?",
      options: [
        { label: "B2B  -  businesses", value: "b2b", points: 20 },
        { label: "B2C  -  consumers", value: "b2c", points: 20 },
        { label: "B2G  -  government", value: "b2g", points: 20 },
        { label: "B2B2C  -  both via partners", value: "b2b2c", points: 20 },
        { label: "Marketplace  -  both sides", value: "marketplace", points: 20 },
      ],
    },
    {
      type: "radio",
      id: "decision_horizon",
      category: "Urgency",
      question: "When do you need strategic clarity most urgently?",
      description:
        "This helps us prioritise the depth and focus of our engagement.",
      options: [
        { label: "Right now  -  critical decision within a month", points: 25 },
        { label: "Next 3 months", points: 20 },
        { label: "Next 6 months", points: 12 },
        { label: "Exploring  -  no immediate deadline", points: 8 },
      ],
    },
  ],
  tiers: {
    high: {
      label: "Strong Strategic Foundation",
      description:
        "You have a clear picture of your business, your market, and your trajectory. Our consultation will sharpen the edges and unlock the next phase of growth.",
    },
    mid: {
      label: "Solid Base, Key Gaps to Address",
      description:
        "You're building something real. There are 2–3 areas where focused work will have disproportionate impact. Our team will identify exactly where to focus.",
    },
    low: {
      label: "Strategic Clarity Needed First",
      description:
        "Before scaling or fundraising, a clear strategic foundation matters enormously. We've helped dozens of founders get here  -  and the path is clearer than it feels right now.",
    },
  },
  whatNext: [
    {
      n: "01",
      t: "We review your diagnostic",
      d: "Our team analyses your answers against the strategic patterns we've seen across 50+ founder engagements.",
    },
    {
      n: "02",
      t: "We identify your highest-leverage gaps",
      d: "Not every gap is equal. We identify the 2–3 areas where focused work moves the needle most.",
    },
    {
      n: "03",
      t: "We run a focused consultation session",
      d: "A structured deep-dive on pricing, GTM, unit economics, fundraising readiness  -  whatever your critical constraint is.",
    },
    {
      n: "04",
      t: "You leave with a clear action plan",
      d: "Specific actions, in priority order, with clear success criteria. Not generic advice.",
    },
  ],
};

const StartupConsultationTool = () => <AssessmentEngine config={config} />;
export default StartupConsultationTool;
