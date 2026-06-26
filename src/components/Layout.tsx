import { ReactNode, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import ErrorBoundary from "./ErrorBoundary";
import { ArrowRight } from "lucide-react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  // Reset scroll on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  // Prefetch all route chunks once the app is idle  -  makes every
  // subsequent navigation feel instant (chunks are already cached).
  useEffect(() => {
    const prefetch = () => {
      import("../pages/About");
      import("../pages/Services");
      import("../pages/Resources");
      import("../pages/Contact");
      import("../pages/Calculator");
      import("../pages/LoanAudit");
    };
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(prefetch, { timeout: 3000 });
    } else {
      setTimeout(prefetch, 1500);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {/* key forces remount on route change  -  fixes stale-content bug + resets ErrorBoundary */}
        <ErrorBoundary key={pathname}>{children}</ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFloat />

      {/* Mobile sticky CTA — hidden on md+ and on contact/assess pages where user is already converting */}
      {!pathname.startsWith("/assess") && pathname !== "/contact" && pathname !== "/audit" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-primary/95 backdrop-blur-sm border-t border-accent/25 px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-white/50 text-[11px] uppercase tracking-wider font-medium leading-tight">
            ₹200Cr+ facilitated.<br className="hidden" /> Zero upfront fees.
          </span>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-accent text-primary text-xs font-bold uppercase tracking-wider px-4 py-2.5 hover:bg-accent/90 transition-colors"
          >
            Book a Free Call <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
