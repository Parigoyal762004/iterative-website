# VISUAL REFERENCE PLAN
## Akro Ventures — Homepage Art Direction

**Status:** Awaiting approval before implementation  
**Prepared after:** Reviewing all 24 existing assets across V2 project and Desktop visuals folder  
**Scope:** Homepage only — Hero, Journey, Outcomes, Process, Stats, CTA

---

## COMPLETE ASSET INVENTORY ASSESSMENT

Before specifying what each section needs, here is an honest verdict on every existing asset.

### Assets worth using

| File | Assessment | Proposed use |
|---|---|---|
| `public/team/akshita.png` | Editorial quality. Warm ambient light, natural expression, not a corporate headshot. Specific — this is a real person. | CTA section |
| `public/team/rohit.png` | Editorial quality. Dark suit, warm lamp light, confident but approachable. Specific. | CTA section |
| `src/assets/img-hero-panel.png` | AI-generated but purpose-built for Akro. Teal background, exponential growth curve, mustard vertical line (inflection point), branching capital paths on the right. The concept earns its place. The execution is acceptable as an interim asset. | Hero right panel |
| `src/assets/img-advisory.png` | Two hands on a wooden table with historical documents spread between them. Atmospheric, warm. Communicates two parties reviewing a deal. Not obviously AI-generated — could pass as editorial. | Candidate for CTA background (behind founder portraits) |
| `src/assets/img-city-night.png` | Large construction site, aerial view, night. Cranes, scale, project work in progress. Communicates project funding, real estate. Only relevant to one outcome (₹45Cr residential township). | Candidate for Outcomes featured card accent only |

### Assets that must not be used

| File | Reason |
|---|---|
| `src/assets/img-growth.jpg` | Glowing upward arrow on concrete floor. The definition of stock photo cliché. |
| `src/assets/img-strategy.jpg` | Man in suit with financial chart overlays. Every generic finance site uses this. |
| `src/assets/img-meeting.jpg` | AI-generated Indian business people at a desk, Mumbai skyline visible. The proportions are off. The laptop screen shows placeholder charts. |
| `Gemini...agajmhagaj.png` | Crumpled Indian rupee notes. Communicates disorder, not capital structure. |
| `Gemini...qek2xlqek2.png` | Glowing world map with golden network lines. An AI cliché. |
| `ChatGPT...11_23_29.png` | Deep purple with faint contour circles. No purpose, no communication. |
| `src/assets/brand-pattern.jpg` | Teal and mustard chevron pattern. Too loud as a background at any opacity that registers. Unrelated to capital or decision-making. |
| `src/assets/img-pattern.jpg` | Identical to brand-pattern.jpg. |
| `Gemini...y1vdszy1.png` | Cargo ship in rough ocean. Interesting image. Wrong metaphor for Indian capital advisory. |
| `Gemini...d5g1vgd5.png` | Chain link close-up. The visual metaphor is binding and constraint, not capital. |
| `ChatGPT...11_20_22.png` | Dark teal background with faint geometric grid lines. Abstract. Communicates nothing about Akro's work. |
| `src/assets/hero-bg.jpg` | Not reviewed — confirm dimensions before considering. |
| `src/assets/img-buildings.jpg` | Not reviewed — confirm before considering. |
| `src/assets/img-data-network.jpg` | Not reviewed — likely a network graph cliché based on filename. Confirm before considering. |

---

## SECTION-BY-SECTION VISUAL REQUIREMENTS

---

### SECTION 1 — HERO
**Background:** White  
**Layout:** Two columns. Left: text. Right: full-height image panel.

#### Right Panel Image

**Asset in use:** `src/assets/img-hero-panel.png`

**Does it earn its place?**  
Yes, conditionally. The image was purpose-built for Akro using brand colors. It shows three things: a growth curve (capital trajectory), a mustard vertical line (the inflection point where advisory changes outcomes), and branching paths (capital deployment options). The concept is sound. The execution is AI-generated PNG at a fixed resolution.

**Why it stays for now:**  
No better alternative exists in the current asset library. Removing it leaves the right panel empty, which weakens the hero layout.

**Its real problem:**  
It is static, rasterized, and does not animate. At retina resolution on a large screen it may soften. The background color exactly matches the design system teal but this is coincidence, not craft.

**Ideal replacement:**  
A custom React component that draws the same concept as an SVG or Canvas animation — the growth curve drawing itself on page load, the mustard vertical line appearing, the branching paths fading in afterward. This would be animated, resolution-independent, and definitively Akro. This is a build task, not a photography task. See Asset Gap section below.

**Dimensions required:**  
420–480px wide × full viewport height (approx 800–900px) on desktop  
Not shown on mobile — mobile dimensions irrelevant  
**Format:** PNG acceptable as interim. SVG/Canvas as final.  
**Animation:** Yes — draw-on animation is possible with SVG stroke-dashoffset or Canvas. Framer Motion compatible.  
**Source:** Currently AI-generated. Ideal: coded as a custom component.  
**Create ourselves:** Yes — this is the single highest-value build task on the homepage.

---

### SECTION 2 — JOURNEY
**Background:** Cream  
**Layout:** Two columns, text only

#### Visual requirement: None

This section requires no visual assets. Two text panels on cream with a centre divider. The typography is the visual. Adding an image here would compete with the two-column text rhythm that already creates its own composition.

**Verdict:** Do not add imagery. The absence of an image is the correct design decision.

---

### SECTION 3 — OUTCOMES
**Background:** White  
**Layout:** Asymmetric grid. Featured case left (3fr), two stacked cases right (2fr).

#### Featured Case — Construction photo consideration

**Asset under consideration:** `src/assets/img-city-night.png` (construction at night)

**Does it earn its place?**  
Marginally. The ₹45Cr case is a residential township in Hyderabad. A construction site at night is not random — it is the type of project being funded. However, adding a photograph to a text card risks making it look like a blog post, not a case study.

**Verdict:** Do not use inside the card. The ₹45Cr number at display size is already the visual. The photograph would compete with it.

**Alternative consideration:**  
If a visual accent is needed, the construction photo could be used as a very low-opacity background on the featured card only (`brightness(0.3) opacity(0.08)`). But this must be tested. Default decision: no image in the outcomes grid.

**Dimensions if used:**  
Match the featured card dimensions (approx 720px wide × 480px tall on desktop)  
**Format:** JPG, lazy loaded  
**Animation:** None  
**Source:** Already in assets  
**Create ourselves:** N/A

#### Small outcome cards

**Visual requirement:** None. Text only. The result figures (₹2.8Cr, Seed round closed above target) are the visual.

---

### SECTION 4 — PROCESS
**Background:** Charcoal  
**Layout:** Text only — opening statement + 4 numbered steps

#### Visual requirement: None

This section is intentionally text-only. The typography is doing the work. The step numbers at large opacity act as the visual rhythm. Any photography placed here would compete with the statement "Not a funding problem. A structure problem." which must land cleanly.

The `img-advisory.png` (two hands with documents) was previously placed here and removed. It is not going back. The reason: it is invisible on mobile, it competes with the opening statement at desktop, and the charcoal section is stronger without it.

**Where img-advisory.png belongs:** See CTA section below.

**Verdict:** No visual assets required in this section.

---

### SECTION 5 — STATS
**Background:** Cream  
**Layout:** Large watermark "04" + headline + 4-cell stat grid

#### Visual requirement: None

The animated counters are the visual. The "04" ghost number at 5% opacity is the typographic anchor. Placing an image anywhere in this section would dilute the statistical clarity.

**Verdict:** No visual assets required.

---

### SECTION 6 — CTA
**Background:** Teal (bg-primary)  
**Layout:** Currently: left-aligned headline ("Talk to Rohit or Akshita.") + subtext + single button

#### Founder portraits — HIGH PRIORITY

**Why they belong here:**  
The headline says "Talk to Rohit or Akshita." If this CTA shows their faces, it is no longer a generic closing call-to-action. It becomes a specific human invitation. The sentence cannot be copied by any other firm. The photographs cannot either. Together they create the only moment on the homepage that is impossible to replicate.

**Asset:** `public/team/akshita.png` — APPROVED  
**Asset:** `public/team/rohit.png` — APPROVED

**Assessment of current photos:**  
Both are editorial quality. Warm, ambient light. Neither looks like a LinkedIn headshot or a corporate portrait. Akshita's photo has a soft window light that gives it a consultative, approachable feel. Rohit's photo has a warmer lamp-lit background that feels more formal but not stiff. Both are portrait format (taller than wide), which suits a right-column or side-by-side layout.

**How to compose this:**  
Two-column layout inside the CTA section.  
Left column: The headline, subtext, and button (current content).  
Right column: Both founder photos side-by-side, slightly overlapping, or stacked vertically.  
The photos should be smaller than the headline — they confirm who to talk to, they do not replace the text.  
On mobile: photos appear below the button, smaller, centered.

**Dimensions required:**  
Rohit photo: Currently ~576px × 768px approx. Displayed at 200–220px wide per photo on desktop.  
Akshita photo: Similar dimensions.  
**Format:** PNG (already correct)  
**Animation:** Subtle fade-in, delayed after the headline appears. No hover zoom.  
**Source:** Already in `/public/team/`. Ready to use immediately.  
**Create ourselves:** Photos already exist. Composition is a code task.

#### Optional: img-advisory.png as CTA background

**Asset:** `src/assets/img-advisory.png` (two hands with documents, dark warm-toned)

**Concept:**  
Use at very low opacity (10–15%) as a full-bleed background behind the CTA section, behind the teal color layer. The hands-reaching-for-documents composition would sit underneath, barely visible, adding warmth and texture without becoming decoration.

**Verdict:** This is optional and secondary to the founder portraits. Founder portraits deliver more strategic value. Test the advisory image as a background only after portraits are confirmed working. If it muddies the teal or competes visually with the portraits, omit it.

**Dimensions:** Any — it's a full-bleed background, CSS handles crop  
**Format:** PNG, lazy loaded, `object-fit: cover`  
**Animation:** None — static background  
**Source:** Already in assets  
**Create ourselves:** N/A

---

## ASSET GAPS — THINGS WE DO NOT HAVE THAT WE SHOULD

These are assets that do not exist yet and would materially improve the homepage.

---

### GAP 1 — Custom Hero Data Visualization (HIGHEST PRIORITY)

**What it is:**  
A React component that renders the same visual concept as `img-hero-panel.png` as an animated SVG or Canvas drawing. The growth curve traces itself from left to right. The mustard vertical line drops from top to bottom. The branching paths appear last.

**Why it matters:**  
The current PNG is static, AI-generated, and fixed resolution. A coded version would be animated, infinitely scalable, definitively Akro, and impossible to confuse with AI art.

**Dimensions:** Fills the right column of the hero — 420–480px wide × 800–900px tall, responsive  
**Format:** React component, SVG or Canvas  
**Animation:** SVG stroke-dashoffset draw-on via Framer Motion, triggered on mount  
**Source:** Must be built  
**Create ourselves:** Yes — this is a code task, not a design or photography task

**Prompt for building it:**  
Three elements rendered in SVG:  
1. An exponential growth curve (path from bottom-left to top-right), stroke in `hsl(var(--color-teal) / 0.4)`, drawn from left to right over 1.2s  
2. A vertical line at approximately x=55% of the panel, stroke in `hsl(var(--accent))`, appearing after the curve, 0.3s  
3. Three diverging lines from the vertical line's midpoint, fanning right, stroke in `hsl(var(--color-teal) / 0.2)`, appearing last, 0.4s  
Background: `hsl(var(--color-teal))` — matching the brand dark teal  
No labels. No data. No numbers. The shape communicates the concept.

---

### GAP 2 — Open Graph / Social Preview Image

**What it is:**  
A static image that appears when the homepage URL is shared on LinkedIn, WhatsApp, or Twitter.

**Why it matters:**  
Akro's target audience shares links. An OG image that looks branded and professional is a trust signal before the first click. Currently there is no custom OG image.

**Dimensions:** 1200 × 630px  
**Format:** JPG or PNG, static  
**Animation:** None  
**Source:** Create as a static design using brand typography — Playfair Display headline over charcoal background with the Akro wordmark and one strong line of copy  
**Create ourselves:** Yes — design tool task (Figma, Canva, or coded as HTML-to-image)

**Content suggestion:**  
Background: charcoal  
Headline: "Capital, structured." in Playfair Display white  
Subtext: "Akro Ventures — Capital Advisory for Indian Founders" in Inter, muted  
Bottom right: Akro wordmark  
No photography. No charts. Pure typography.

---

### GAP 3 — Favicon at correct format

**What exists:** `public/favicon.svg` and `public/favicon.jpg`  
**Issue:** `.jpg` is not a valid favicon format. Browsers require `.ico`, `.svg`, or `.png` for favicons.  
**What's needed:** Confirm the SVG favicon renders correctly at 16×16, 32×32, and 180×180 (Apple touch icon)  
**Format:** SVG (already exists) + PNG at 180×180 for Apple touch icon  
**Create ourselves:** Verify and export from existing SVG

---

## PHOTOGRAPHY BRIEF — IF NEW PHOTOS ARE COMMISSIONED

This section applies only if Akshita and Rohit decide to commission a professional photoshoot.

**What is working:**  
The current team photos are genuinely good. They do not need to be replaced. If a photoshoot happens, these are the reference points.

**What to ask for:**

**Rohit:** The current photo is well-lit and professional. A second variation with a plain white or cream background would give more flexibility for web use (easier to isolate on different section backgrounds).

**Akshita:** The current photo shows her at a desk with a laptop. An alternative crop showing her from mid-chest up against a neutral wall would be more versatile.

**What to avoid:**  
Crossed-arm corporate poses. Suits against marble. Holding-a-pen-to-paper. Anything that looks like a bank advertisement.

**What to seek:**  
Ambient light. Genuine expressions. Slightly informal. The photographs should make a founder trust that the person they're booking a call with is thoughtful and direct, not a salesperson.

---

## DECISION SUMMARY

| Section | Visual needed? | Asset | Status |
|---|---|---|---|
| Hero right panel | Yes | `img-hero-panel.png` | Usable now. Custom SVG is the upgrade path. |
| Journey | No | — | Correct as text-only |
| Outcomes | No | — | Numbers are the visual |
| Process | No | — | Text-only is correct |
| Stats | No | — | Counters are the visual |
| CTA | Yes — founders | `akshita.png` + `rohit.png` | Ready to implement |
| CTA | Optional — background | `img-advisory.png` | Test after founder portraits |

**Assets cleared for deletion from the project:**  
`img-growth.jpg`, `img-strategy.jpg`, `img-meeting.jpg`, `img-pattern.jpg`, `brand-pattern.jpg`  
(These are not used anywhere and should not be used. Keeping them creates the risk they get used by mistake.)

**Next step after approval:**  
1. Implement founder portraits in the CTA section  
2. Delete the five listed dead-weight assets  
3. Begin planning the custom hero SVG component  
4. Create the OG image and fix the favicon format

---

*This document is a shopping list, not an implementation plan. No code should be written until the decisions above are confirmed.*
