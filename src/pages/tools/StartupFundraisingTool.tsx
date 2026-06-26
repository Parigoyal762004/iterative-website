import AssessmentEngine, { ToolConfig } from "@/components/tools/AssessmentEngine";

const config: ToolConfig = {
  serviceType: "startup-fundraising",
  heroTexture: "hero-dot-fine",
  eyebrow: "Free Assessment",
  headline: "How investor-ready",
  headlineAccent: "is your startup?",
  subtitle:
    "Most founders find out they're not investor-ready only after getting ignored. Answer 8 questions and get an honest read from our team.",
  toolLabel: "Investor Readiness Score",
  questions: [
    {
      type: "radio",
      id: "stage",
      category: "Startup Stage",
      question: "Where is your startup right now?",
      options: [
        {
          label: "Idea / pre-product",
          description: "Working on concept, no prototype yet",
          points: 5,
        },
        {
          label: "Product built, no revenue yet",
          description: "MVP or beta live, users but no paid revenue",
          points: 10,
        },
        {
          label: "Early revenue",
          description: "Making sales, figuring out repeatability",
          points: 17,
        },
        {
          label: "Growing revenue",
          description: "Month-on-month growth, clear playbook",
          points: 22,
        },
        {
          label: "Scaling",
          description: "Proven model, looking to accelerate",
          points: 25,
        },
      ],
    },
    {
      type: "slider",
      id: "monthly_revenue",
      category: "Traction",
      question: "What is your current Monthly Recurring Revenue (MRR)?",
      description:
        "If pre-revenue, select ₹0. If revenue is irregular, use your average.",
      notches: [
        { label: "₹0", value: 0, points: 0 },
        { label: "₹1L", value: 1, points: 5 },
        { label: "₹5L", value: 5, points: 10 },
        { label: "₹10L", value: 10, points: 15 },
        { label: "₹25L", value: 25, points: 18 },
        { label: "₹50L", value: 50, points: 20 },
        { label: "₹1Cr", value: 100, points: 22 },
        { label: "₹5Cr", value: 500, points: 25 },
        { label: "₹10Cr+", value: 1000, points: 25 },
      ],
    },
    {
      type: "slider",
      id: "raise_target",
      category: "Fundraising Goal",
      question: "How much are you looking to raise in this round?",
      notches: [
        { label: "₹25L", value: 25, points: 25 },
        { label: "₹50L", value: 50, points: 25 },
        { label: "₹1Cr", value: 100, points: 25 },
        { label: "₹3Cr", value: 300, points: 25 },
        { label: "₹5Cr", value: 500, points: 25 },
        { label: "₹10Cr", value: 1000, points: 25 },
        { label: "₹25Cr", value: 2500, points: 25 },
        { label: "₹50Cr+", value: 5000, points: 25 },
      ],
    },
    {
      type: "radio",
      id: "previous_funding",
      category: "Funding History",
      question: "What funding have you raised so far?",
      options: [
        { label: "Purely bootstrapped", points: 8 },
        { label: "Friends & family round", points: 12 },
        { label: "Angel investors", points: 18 },
        { label: "Institutional seed round", points: 22 },
        { label: "Series A or beyond", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "pitch_deck",
      category: "Investor Materials",
      question: "What is the status of your investor pitch deck?",
      options: [
        { label: "No deck yet", points: 0 },
        { label: "Draft in progress", points: 8 },
        { label: "Complete, reviewed by advisors", points: 17 },
        { label: "VC-reviewed and refined", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "financial_model",
      category: "Investor Materials",
      question: "How developed is your financial model?",
      options: [
        { label: "None  -  no financial model", points: 0 },
        { label: "Basic spreadsheet, top-down projections", points: 8 },
        { label: "Detailed model with multiple scenarios", points: 18 },
        { label: "Investor-reviewed, audited financials available", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "unit_economics",
      category: "Business Fundamentals",
      question: "How clearly do you know your unit economics?",
      description: "CAC, LTV, payback period, gross margin, burn rate.",
      options: [
        { label: "Not calculated or unclear", points: 0 },
        { label: "Roughly estimated", points: 8 },
        { label: "Calculated and improving", points: 17 },
        { label: "Strong, documented, and investor-ready", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "investor_access",
      category: "Network & Access",
      question: "What is your current access to the investor ecosystem?",
      options: [
        { label: "None  -  starting from scratch", points: 0 },
        { label: "Some warm introductions possible", points: 10 },
        { label: "Actively networked in startup ecosystem", points: 18 },
        { label: "Backed or supported by known angels or accelerators", points: 25 },
      ],
    },
  ],
  tiers: {
    high: {
      label: "Investor-Ready Profile",
      description:
        "Your fundamentals are strong. With the right narrative and investor introductions, you're in a good position to run a tight process. Our team will help you close faster.",
    },
    mid: {
      label: "Nearly Ready  -  A Few Gaps to Close",
      description:
        "You have real substance here. A few targeted improvements to your materials and positioning will significantly increase your conversion rate with investors.",
    },
    low: {
      label: "Foundational Work Before Fundraising",
      description:
        "Fundraising before you're ready is the fastest way to burn bridges with investors. We'll tell you exactly what to build first  -  and how to get there in 60–90 days.",
    },
  },
  whatNext: [
    {
      n: "01",
      t: "We review your readiness profile",
      d: "Our team assesses your traction, materials, and narrative against what investors in your category actually look for.",
    },
    {
      n: "02",
      t: "We identify the gaps that matter",
      d: "Not every gap affects every investor. We tell you which ones to fix first for maximum impact on your round.",
    },
    {
      n: "03",
      t: "We help you build the materials",
      d: "Pitch deck refinement, financial model review, narrative coaching  -  we work alongside you.",
    },
    {
      n: "04",
      t: "We make warm introductions",
      d: "We connect you with the right angels, family offices, and institutional VCs for your stage and sector.",
    },
  ],
};

const StartupFundraisingTool = () => <AssessmentEngine config={config} />;
export default StartupFundraisingTool;
