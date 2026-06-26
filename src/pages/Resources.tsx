import { useState } from "react";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useReveal from "@/hooks/useReveal";
import MagneticButton from "@/components/MagneticButton";
import { supabase } from "@/lib/supabase";

const tags = ["Startup Funding", "Unsecured Loans", "FDI Strategy", "Debt Restructuring", "MSME Schemes", "Project Finance", "Term Sheets", "RBI Updates"];

const filters = ["All", "Funding", "Strategy", "Market", "Legal"] as const;
type Filter = typeof filters[number];

const articles = [
  {
    cat: "Market",
    title: "India's Export Finance Landscape Just Changed Completely",
    excerpt: "RBI's recent moves on export credit have quietly shifted the rules of the game for Indian exporters. Here's what changed, what it means for your capital stack, and what to do about it.",
    read: "6 min read",
    featured: true,
    href: "https://www.linkedin.com/pulse/indias-export-finance-landscape-just-changed-completely-9metc/",
  },
  {
    cat: "Funding",
    title: "What I Tell Every Founder Who Walks In Asking About Funding",
    excerpt: "A founder came in wanting Series A with ₹90L in revenue and needed ₹80L for inventory. The first question wasn't about valuation. Here's what it was.",
    read: "7 min read",
    href: "https://www.linkedin.com/pulse/what-i-tell-every-founder-who-walks-asking-funding-akro-ventures-ivn9c/",
  },
  {
    cat: "Strategy",
    title: "Your Pitch Deck Gets 2 Minutes and 24 Seconds. Here's How Indian Investors Actually Use Them.",
    excerpt: "An Indian VC sees roughly 2,000 decks a year and invests in 5 to 8. The average first-pass review is 2 minutes and 24 seconds. Make every slide count.",
    read: "5 min read",
    href: "https://www.linkedin.com/pulse/your-pitch-deck-gets-2-minutes-24-seconds-heres-how-indian-klvgc/",
  },
  {
    cat: "Strategy",
    title: "Every Founder Says Their Unit Economics Work. Most Are Lying to Themselves.",
    excerpt: "Not because founders are dishonest, because unit economics is the most confidently miscalculated metric in startup finance. Investors have built their entire DD process around finding the errors.",
    read: "6 min read",
    href: "https://www.linkedin.com/pulse/every-founder-says-unit-economics-work-most-lying-themselves-8hrje/",
  },
  {
    cat: "Funding",
    title: "Your Startup's Valuation Is Not What You Think It Is",
    excerpt: "Most founders base their valuation on a friend's raise, a VC's tweet, and a revenue multiple from a panel somewhere. Those figures were accurate in 2021, now probably off by 40% today.",
    read: "5 min read",
    href: "https://www.linkedin.com/pulse/your-startups-valuation-what-you-think-akro-ventures-wmlrc/",
  },
  {
    cat: "Funding",
    title: "3 Things Investors Won't Tell You They Hate in Pitch Decks",
    excerpt: "Clean design, good fonts. After two reads, you still can't explain what the company does. That's not a deck problem. That's a communication problem that ends fundraising conversations before they begin.",
    read: "4 min read",
    href: "https://www.linkedin.com/pulse/3-things-investors-wont-tell-you-hate-pitch-decks-akro-ventures-jtyxc/",
  },
  {
    cat: "Funding",
    title: "Your Loan Didn't Get Rejected Because Your Business Is Weak",
    excerpt: "Most loan rejections have nothing to do with business quality. They happen because of how the application was structured, which lender was approached, and what the documents said versus what the business actually looks like.",
    read: "5 min read",
    href: "https://www.linkedin.com/pulse/your-loan-didnt-get-rejected-because-business-weak-akro-ventures-zn3nc/",
  },
  {
    cat: "Market",
    title: "₹81 Lakh Crore Sitting in Unpaid MSME Invoices Right Now",
    excerpt: "India's MSME sector is owed over 81 lakh crore in unpaid invoices. That's not just a statistic - it's a working capital crisis hiding in plain sight. Here's what it means and what can actually be done.",
    read: "6 min read",
    href: "https://www.linkedin.com/pulse/81-lakh-crore-sitting-unpaid-msme-invoices-right-now-theres-m5ucc/",
  },
];

const Resources = () => {
  useReveal();
  const [filter, setFilter] = useState<Filter>("All");
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading">("idle");

  const visible = articles.filter(a => filter === "All" || a.cat === filter);
  const featured = visible.find(a => a.featured) || visible[0];
  const rest = visible.filter(a => a !== featured);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNewsletterStatus("loading");
    const { error } = await supabase.from("newsletter_subscriptions").insert({ email: email.trim() });
    setNewsletterStatus("idle");
    if (error) {
      if (error.code === "23505") {
        // Unique constraint  -  already subscribed
        toast.success("You're already subscribed. We'll keep you updated.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      setEmail("");
      toast.success("Thank you. We'll keep you updated.");
    }
  };

  return (
    <>
      <section className="relative bg-primary text-white py-28 md:py-36 overflow-hidden">
        {/* Fine dot matrix  -  clarity, open knowledge */}
        <div className="absolute inset-0 hero-dot-fine pointer-events-none" aria-hidden="true" />
        <div className="container relative z-10">
          <span className="eyebrow text-accent">Resources</span>
          <div className="divider-gold mt-6 mb-8" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-4xl leading-[1.05]">Insights for <span className="text-accent">ambitious founders.</span></h1>
          <p className="mt-8 max-w-2xl text-white/75 text-lg">Practical knowledge to help you navigate funding, investment, and capital strategy with confidence.</p>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-background py-8 border-y border-border">
        <div className="marquee">
          {[0, 1].map(k => (
            <div key={k} className="marquee-track" style={{ animationDuration: "60s" }}>
              {tags.map((t, i) => (
                <span key={i} className="text-xl md:text-3xl font-light tracking-tight whitespace-nowrap text-foreground/60">
                  {t} <span className="text-accent mx-4">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="reveal flex flex-wrap gap-3 justify-center mb-12">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all border ${filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-transparent border-border hover:border-accent text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <a href={featured.href} target="_blank" rel="noreferrer" className="block reveal group cursor-pointer card-editorial mb-10 hover:-translate-y-1 transition-transform duration-300">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-2 bg-primary text-white p-10 flex flex-col justify-between hero-dot-fine">
                  <span className="eyebrow text-accent">{featured.cat}</span>
                  <div>
                    <div className="text-white/20 text-[10px] font-mono tracking-widest mb-4">FEATURED · LINKEDIN</div>
                    <div className="text-white/60 text-sm leading-relaxed max-w-xs">
                      The perspective every founder should read before their next funding conversation.
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 p-10">
                  <h3 className="text-3xl md:text-4xl leading-tight group-hover:text-accent transition-colors">{featured.title}</h3>
                  <p className="text-muted-foreground mt-4 text-lg max-w-3xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                    <span>{featured.read}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-accent font-semibold">Read on LinkedIn <ArrowRight size={14} /></span>
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* Empty state */}
          {visible.length === 0 && (
            <div className="border border-border py-20 text-center reveal">
              <div className="text-accent font-mono text-xs tracking-widest mb-4 uppercase">Coming Soon</div>
              <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Nothing here yet.
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                We're working on content for this category. Check back soon — or browse everything in All.
              </p>
              <button
                onClick={() => setFilter("All")}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent hover:text-foreground transition-colors"
              >
                View all articles <ArrowRight size={12} />
              </button>
            </div>
          )}

          {/* Grid */}
          {visible.length > 0 && (
            <div className="stagger grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
              {rest.map((a, i) => (
                <a
                  key={i}
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group cursor-pointer p-8 border-b border-r border-border hover:bg-secondary/50 transition-all duration-300 block hover:-translate-y-0.5 ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
                >
                  <span className="eyebrow">{a.cat}</span>
                  <h3 className="font-semibold text-2xl leading-tight mt-4 group-hover:text-accent transition-colors">{a.title}</h3>
                  <p className="text-muted-foreground text-sm mt-3 line-clamp-3">{a.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-semibold mt-6 opacity-70 group-hover:opacity-100 transition-opacity">
                    {a.read} · Read on LinkedIn <ArrowRight size={12} />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-primary py-24 md:py-32">
        <div className="container grid md:grid-cols-2 gap-10 items-center text-white">
          <div>
            <span className="eyebrow text-accent">Newsletter</span>
            <div className="divider-gold mt-5 mb-6" />
            <h2 className="text-4xl md:text-6xl">Stay Ahead of the Capital Curve.</h2>
            <p className="mt-6 text-white/75 max-w-md">One sharp insight a week. Funding intel, lender shifts, and founder playbooks. No spam, ever.</p>
          </div>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1 px-4 bg-white/5 border border-accent/30 min-w-0">
              <Mail size={18} className="text-accent shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="founder@yourstartup.in"
                className="bg-transparent outline-none flex-1 text-white placeholder:text-white/50 py-3 min-w-0 w-full"
              />
            </div>
            <MagneticButton variant="teal" type="submit" disabled={newsletterStatus === "loading"} className="shrink-0">
              {newsletterStatus === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Subscribe"}
            </MagneticButton>
          </form>
        </div>
      </section>
    </>
  );
};

export default Resources;
