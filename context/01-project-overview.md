# 01 — Project Overview
> Akro Ventures Website V2 · Capital Advisory · Lead Generation SPA

---

## Purpose

Akro Ventures is a capital advisory firm that helps Indian SMEs and startups raise debt and equity. This website is the firm's primary lead-generation surface. It is not a SaaS product, a marketplace, or a content publication — it is a trust-building and conversion tool that causes qualified founders and investors to make contact.

---

## Problem Statement

Indian founders who need capital face two failure modes:
1. They do not know which instrument (loan, equity, ECB, export finance) fits their business.
2. They approach lenders without the right structure, documentation, or readiness — and get rejected.

Akro solves both: advisory on structure, and active placement with the right lenders/investors. The website must communicate this clearly and make it easy to start a conversation.

---

## Target Audience

### Primary: Founders
- Indian SME founders raising ₹10L – ₹100Cr+
- Startup founders (pre-seed through Series A) raising equity
- Business owners who have been rejected by lenders and need to understand why
- Founders preparing for their first debt raise who need guidance on structure

### Secondary: Investors / Lenders
- HNIs and family offices looking for curated deal flow
- Co-investment partners
- Institutional lenders and NBFCs who want a clean pipeline of structured deals

### Internal: Team
- Rohit (Co-founder) — primary relationship owner
- Akshita (Co-founder) — operations and outreach
- Pari Goyal — content publisher (uses Sanity Studio without developer involvement)

---

## Business Goals

1. Generate qualified inbound leads via the contact wizard and loan audit tool
2. Build credibility with founders who are evaluating advisory firms
3. Allow Pari to publish Insights articles independently via Sanity CMS
4. Establish two distinct journeys — Founders and Investors — so each audience gets a tailored experience
5. Collect investor expressions of interest for deal flow

---

## Project Vision

The website should feel like a well-designed annual report from a firm that knows what it is doing. It should communicate:
- **Measured confidence** — not aggressive persuasion
- **Earned trust** — not manufactured urgency
- **Advisory relationship** — not a sales funnel

Visitors should feel: *"We are speaking with experienced advisors."*

**What this site is not:** AI-generated-looking, template-looking, generic SaaS, glassmorphism clone, Framer showcase.

---

## Core Features

| Feature | Route | Purpose |
|---|---|---|
| Home | `/` | First impression, journey split, outcomes, social proof |
| Founders Journey | `/founders` | Tailored narrative for founders; 6 service entry points |
| Investors Journey | `/investors` | Deal flow pitch, co-investment, track record |
| About | `/about` | Founder bios, timeline, values, fees |
| Insights | `/insights` | Article index (Sanity CMS) |
| Insight Article | `/insights/:slug` | Full article (Portable Text render) |
| Contact Wizard | `/contact` | 3-step lead capture form → Supabase |
| Loan Audit | `/loan-audit` | 4-question readiness quiz + contact capture → Supabase |
| Calculator | `/calculator` | Loan / equity deal modelling with Chart.js |
| Assessment Tools | `/assess/*` | 6 service-specific qualification tools |
| Portal (stub) | `/portal` | Coming-soon placeholder for future client portal |

---

## Success Metrics

- Qualified contact submissions per month (primary KPI)
- Loan audit completions with contact capture
- Newsletter subscriptions
- Time-on-page for Founders and Investors journey pages
- Calendly booking rate from the "Book a Call" nav CTA

---

## Assumptions (Inferred)

- The site is deployed to Vercel (vercel.json present)
- Supabase is the backend for all form submissions — no custom API server
- Sanity CMS is a separate project; this repo only contains the read client
- Calendly URL for bookings: `https://calendly.com/akroventures-info/30-min-stand-up-call`
- No user authentication for the public site; `/portal` is a placeholder
- All monetary values are in Indian Rupees (₹); amounts displayed in lakhs / crores
- Mobile-first responsive design; no native app required

---

## V2 vs V1 Differences

| Concern | V1 | V2 |
|---|---|---|
| Navigation | Generic `/services` page | Two-journey split: `/founders` + `/investors` |
| Typography | Cormorant Garamond | Playfair Display + Inter |
| Animation | CSS IntersectionObserver hooks | Framer Motion component library |
| Scroll | Default browser scroll | Lenis smooth scroll |
| CMS | Static article data | Sanity headless CMS |
| Colour accent | Gold (#C9A84C) | Mustard (#F2B705) + Teal (#3F6F73) |
| Color tokens | Single `--accent` | Full semantic token system |
| Hero texture | CSS-only `.hero-*` classes | SVG hero panel component (planned) |
