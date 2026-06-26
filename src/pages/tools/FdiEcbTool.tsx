import AssessmentEngine, { ToolConfig } from "@/components/tools/AssessmentEngine";

const config: ToolConfig = {
  serviceType: "fdi-ecb",
  heroTexture: "hero-bloom",
  eyebrow: "Free Assessment",
  headline: "Can your business access",
  headlineAccent: "cross-border capital?",
  subtitle:
    "FDI and ECB can be lower-cost, larger-ticket capital  -  but navigating RBI guidelines and FEMA compliance is complex. Find out where you stand.",
  toolLabel: "Cross-Border Capital Eligibility",
  questions: [
    {
      type: "radio",
      id: "entity_type",
      category: "Legal Entity",
      question: "What is your business's legal structure?",
      description:
        "This determines which foreign capital routes are available to you under FEMA/RBI guidelines.",
      options: [
        {
          label: "Private Limited Company",
          description: "Most FDI routes available",
          points: 25,
        },
        {
          label: "Public Limited Company",
          description: "Full range of FDI and ECB options",
          points: 25,
        },
        {
          label: "Limited Liability Partnership (LLP)",
          description: "Select FDI routes available",
          points: 20,
        },
        {
          label: "Partnership / Proprietorship",
          description: "Limited FDI options",
          points: 8,
        },
      ],
    },
    {
      type: "pills",
      id: "capital_type",
      category: "Capital Route",
      question: "What type of foreign capital are you exploring?",
      description: "Select all that apply  -  we'll assess your eligibility for each.",
      multiSelect: true,
      options: [
        {
          label: "FDI  -  Foreign Direct Investment (equity)",
          value: "fdi",
          points: 25,
        },
        {
          label: "ECB  -  External Commercial Borrowing (debt)",
          value: "ecb",
          points: 25,
        },
        {
          label: "Both equity and debt",
          value: "both",
          points: 25,
        },
        {
          label: "Not sure yet  -  exploring options",
          value: "unsure",
          points: 15,
        },
      ],
    },
    {
      type: "slider",
      id: "capital_requirement",
      category: "Capital Scale",
      question: "What is the approximate capital requirement?",
      description:
        "ECB minimum ticket sizes and FDI reporting thresholds vary by amount.",
      notches: [
        { label: "₹1Cr", value: 100, points: 10 },
        { label: "₹5Cr", value: 500, points: 14 },
        { label: "₹10Cr", value: 1000, points: 17 },
        { label: "₹25Cr", value: 2500, points: 20 },
        { label: "₹50Cr", value: 5000, points: 22 },
        { label: "₹100Cr", value: 10000, points: 24 },
        { label: "₹250Cr", value: 25000, points: 25 },
        { label: "₹500Cr+", value: 50000, points: 25 },
      ],
    },
    {
      type: "pills",
      id: "industry",
      category: "Sector",
      question: "Which sector does your business operate in?",
      description:
        "Some sectors have FDI caps or require government approval. This determines your route.",
      options: [
        { label: "Manufacturing", value: "manufacturing", points: 25 },
        { label: "IT & Technology", value: "it", points: 25 },
        { label: "Healthcare", value: "healthcare", points: 25 },
        { label: "Infrastructure", value: "infrastructure", points: 25 },
        { label: "Renewable Energy", value: "energy", points: 25 },
        { label: "Retail (Single Brand)", value: "retail_single", points: 22 },
        { label: "Retail (Multi-Brand)", value: "retail_multi", points: 15 },
        { label: "Financial Services", value: "finserv", points: 18 },
        { label: "Real Estate", value: "real_estate", points: 18 },
        { label: "Media / Broadcasting", value: "media", points: 15 },
        { label: "Other", value: "other", points: 20 },
      ],
    },
    {
      type: "radio",
      id: "fdi_route",
      category: "Regulatory Position",
      question: "Do you believe your sector qualifies under the FDI Automatic Route?",
      description:
        "The Automatic Route does not require prior government approval  -  most sectors qualify.",
      options: [
        { label: "I'm not sure", points: 10 },
        { label: "Likely yes  -  general sector, no restrictions", points: 20 },
        { label: "Yes  -  I've confirmed automatic route eligibility", points: 25 },
        {
          label: "No  -  we're in a restricted or government-approval sector",
          points: 5,
        },
      ],
    },
    {
      type: "radio",
      id: "compliance_readiness",
      category: "Compliance Capability",
      question: "What is your current RBI / FEMA compliance capability?",
      options: [
        {
          label: "No in-house expertise  -  starting from scratch",
          points: 5,
        },
        {
          label: "Basic awareness, but no dedicated resource",
          points: 12,
        },
        {
          label: "Company Secretary handles compliance",
          points: 18,
        },
        {
          label: "Dedicated compliance team or external specialist",
          points: 25,
        },
      ],
    },
    {
      type: "radio",
      id: "existing_foreign",
      category: "Current Foreign Exposure",
      question: "Does your company currently have any foreign shareholding or ECB?",
      options: [
        { label: "None  -  fully Indian entity", points: 15 },
        { label: "Minor foreign shareholding (<10%)", points: 20 },
        { label: "Significant foreign stake (10%+)", points: 22 },
        { label: "Already FDI-compliant with prior filings", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "use_of_funds",
      category: "End-Use",
      question: "What is the primary end-use of the foreign capital?",
      description:
        "ECB end-use restrictions exist under RBI guidelines. FDI has fewer but important conditions.",
      options: [
        {
          label: "Working capital / operational expenses",
          description: "Note: ECB has restrictions on working capital end-use",
          points: 15,
        },
        {
          label: "Capital expenditure / infrastructure",
          points: 25,
        },
        {
          label: "Acquisition / strategic investment",
          points: 22,
        },
        {
          label: "R&D / technology import",
          points: 25,
        },
        {
          label: "Refinancing existing foreign debt",
          points: 20,
        },
      ],
    },
  ],
  tiers: {
    high: {
      label: "Strong Cross-Border Eligibility",
      description:
        "Your entity structure, sector, and purpose align well with FDI/ECB requirements. We can begin structuring your cross-border capital raise immediately.",
    },
    mid: {
      label: "Eligible with Careful Structuring",
      description:
        "There are a few FEMA/RBI considerations to navigate, but you're in a workable position. Our team will map the compliance path and the right capital structure.",
    },
    low: {
      label: "Eligibility Assessment Needed First",
      description:
        "Some aspects of your profile need clarification before a foreign capital raise can begin. We'll identify exactly what needs to be in place and how to get there.",
    },
  },
  whatNext: [
    {
      n: "01",
      t: "We assess your regulatory eligibility",
      d: "Our team checks your entity type, sector, and end-use against current RBI/FEMA guidelines to confirm which routes are available.",
    },
    {
      n: "02",
      t: "We design the optimal structure",
      d: "FCY ECB, INR ECB, FDI via automatic or government route  -  we find the lowest-cost, most compliant path.",
    },
    {
      n: "03",
      t: "We manage documentation and filings",
      d: "From term sheet structuring to RBI reporting, we handle the full compliance workflow.",
    },
    {
      n: "04",
      t: "Ongoing compliance support",
      d: "Post-disbursement, we continue to manage your periodic RBI filings and hedging advisory.",
    },
  ],
};

const FdiEcbTool = () => <AssessmentEngine config={config} />;
export default FdiEcbTool;
