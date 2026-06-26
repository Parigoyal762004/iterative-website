import AssessmentEngine, { ToolConfig } from "@/components/tools/AssessmentEngine";

const config: ToolConfig = {
  serviceType: "project-funding",
  heroTexture: "hero-columns",
  eyebrow: "Free Assessment",
  headline: "How fundable is",
  headlineAccent: "your project?",
  subtitle:
    "Large-scale project financing requires the right structure from day one. Answer 7 questions to understand your capital readiness.",
  toolLabel: "Project Capital Viability Check",
  questions: [
    {
      type: "pills",
      id: "project_type",
      category: "Project Profile",
      question: "What type of project are you seeking funding for?",
      options: [
        { label: "Real Estate Development", value: "real_estate", points: 25 },
        { label: "Infrastructure", value: "infrastructure", points: 25 },
        { label: "Industrial / Manufacturing", value: "industrial", points: 25 },
        { label: "Renewable Energy", value: "renewable", points: 25 },
        { label: "Hospitality / Leisure", value: "hospitality", points: 22 },
        { label: "Healthcare Facility", value: "healthcare", points: 22 },
        { label: "Mixed-Use Development", value: "mixed_use", points: 22 },
        { label: "Other Large Capex", value: "other", points: 20 },
      ],
    },
    {
      type: "slider",
      id: "project_cost",
      category: "Project Scale",
      question: "What is the total estimated project cost?",
      description:
        "Include all phases of development  -  land, construction, equipment, working capital.",
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
      type: "radio",
      id: "equity_contribution",
      category: "Capital Structure",
      question: "How much equity are you planning to contribute from your own side?",
      description:
        "This is the promoter contribution  -  your skin-in-the-game. Lenders typically expect 25–40%.",
      options: [
        { label: "Less than 10%  -  minimal promoter equity", points: 0 },
        { label: "10–25%  -  limited equity", points: 8 },
        { label: "25–40%  -  standard promoter contribution", points: 20 },
        { label: "40%+  -  strong equity commitment", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "project_stage",
      category: "Project Readiness",
      question: "What stage is your project at right now?",
      options: [
        {
          label: "Concept only  -  no DPR or approvals yet",
          points: 5,
        },
        {
          label: "Detailed Project Report (DPR) ready",
          points: 12,
        },
        {
          label: "Key approvals in progress",
          points: 20,
        },
        {
          label: "Shovel-ready  -  all approvals secured",
          points: 25,
        },
      ],
    },
    {
      type: "radio",
      id: "revenue_visibility",
      category: "Revenue & Risk",
      question: "What is your revenue or return visibility on this project?",
      options: [
        {
          label: "Speculative  -  no pre-sales or contracts",
          points: 0,
        },
        {
          label: "Some pre-sales, LOIs, or LOAs",
          points: 10,
        },
        {
          label: "Majority contracted or pre-leased",
          points: 20,
        },
        {
          label: "Fully contracted with creditworthy counterparties",
          points: 25,
        },
      ],
    },
    {
      type: "radio",
      id: "land_status",
      category: "Site & Approvals",
      question: "What is the land / site status?",
      options: [
        { label: "Not yet identified", points: 0 },
        { label: "Identified, negotiation in progress", points: 8 },
        { label: "Secured but no approvals yet", points: 17 },
        { label: "Land secured and key approvals received", points: 25 },
      ],
    },
    {
      type: "radio",
      id: "track_record",
      category: "Promoter Profile",
      question: "How many similar projects have you successfully completed?",
      description:
        "Lenders assess promoter track record heavily for large-scale project finance.",
      options: [
        { label: "This is my first project of this type", points: 5 },
        { label: "1–2 completed projects", points: 15 },
        { label: "3–5 completed projects", points: 22 },
        { label: "5+ completed projects", points: 25 },
      ],
    },
  ],
  tiers: {
    high: {
      label: "Fundable Project Profile",
      description:
        "Your project has a strong foundation  -  approvals, equity, and revenue visibility are aligned. Our team can begin identifying the right capital structure immediately.",
    },
    mid: {
      label: "Fundable with Structuring",
      description:
        "This project has real merit. The path to funding requires the right structure and lender match. Our team will map exactly how to position it.",
    },
    low: {
      label: "Groundwork First  -  Then Capital",
      description:
        "A few critical elements need to be in place before lenders engage. We'll tell you specifically what those are and how to get there faster.",
    },
  },
  whatNext: [
    {
      n: "01",
      t: "We review your project profile",
      d: "Our team assesses DPR quality, equity structure, approvals status, and the capital stack required.",
    },
    {
      n: "02",
      t: "We design the capital structure",
      d: "Senior debt, mezzanine, equity, or hybrid  -  we recommend the most efficient structure for your project's risk profile.",
    },
    {
      n: "03",
      t: "We identify the right lenders",
      d: "Project finance lenders are highly specialised. We match your project to the right institutional appetite.",
    },
    {
      n: "04",
      t: "We manage the full engagement",
      d: "From information memorandum to drawdown  -  we run the entire capital raise process.",
    },
  ],
};

const ProjectFundingTool = () => <AssessmentEngine config={config} />;
export default ProjectFundingTool;
