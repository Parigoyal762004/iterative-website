import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/resources", label: "Resources" },
  { to: "/calculator", label: "Calculator" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Direct DOM update  -  bypasses React re-render for buttery smoothness
      if (progressRef.current) {
        const doc = document.documentElement;
        const total = doc.scrollHeight - doc.clientHeight;
        const pct = total > 0 ? window.scrollY / total : 0;
        progressRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Background layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/95 border-b border-border shadow-soft transition-opacity duration-500 pointer-events-none"
        style={{ opacity: scrolled || open ? 1 : 0 }}
      />
      {/* Scroll progress bar  -  GPU-composited scaleX, direct DOM update */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full bg-accent pointer-events-none z-10 origin-left"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />

      <div className="relative container flex items-center justify-between h-16 md:h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden lg:inline-flex">
            <MagneticButton variant="teal" className="!py-2.5 !px-5 text-xs">
              Free Consultation
            </MagneticButton>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center p-2 -mr-2 text-primary relative z-[60]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={28} strokeWidth={2.25} /> : <Menu size={28} strokeWidth={2.25} />}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Side drawer */}
      <aside
        style={{ backgroundColor: "#295757" }}
        className={`lg:hidden fixed top-0 right-0 z-40 h-full w-[80%] max-w-sm shadow-2xl transition-transform duration-300 ease-out flex flex-col text-white ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="h-16 md:h-20 border-b border-white/15" />
        <nav className="flex-1 flex flex-col px-6 py-6 gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-lg font-semibold py-3 border-b border-white/15 transition-colors ${
                  isActive ? "text-accent" : "text-white hover:text-accent"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="mt-6">
            <MagneticButton variant="teal" className="w-full">Free Consultation</MagneticButton>
          </Link>
        </nav>
      </aside>
    </header>
  );
};

export default Navbar;
