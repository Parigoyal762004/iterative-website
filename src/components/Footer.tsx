import { Link } from "react-router-dom";
import { Linkedin, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

// X (formerly Twitter) logo  -  official SVG path
const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Resources", "/resources"],
  ["Calculator", "/calculator"],
  ["Contact", "/contact"],
];

const Footer = () => (
  <footer className="relative bg-primary text-primary-foreground border-t-2 border-accent">
    <div className="container py-16 grid gap-12 md:grid-cols-3">

      {/* Brand column */}
      <div className="space-y-6">
        <div>
          <div className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Akro Ventures</div>
          <div className="text-xs text-accent tracking-[0.2em] uppercase mt-1">Capital Advisory</div>
        </div>

        <p className="text-sm text-white/70 max-w-xs leading-relaxed">
          Guiding ambitious Indian founders to structured capital. Without collateral, without compromise.
        </p>

        <div className="flex gap-3">
          {[
            { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/akro-ventures", label: "LinkedIn" },
            { icon: <XLogo size={15} />, href: "https://twitter.com/akroventures", label: "X" },
            { icon: <Instagram size={16} />, href: "https://www.instagram.com/akroventures/", label: "Instagram" },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="size-9 grid place-items-center border border-white/20 hover:border-accent hover:text-accent transition-all duration-300"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Navigation column */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6">Navigate</h4>
        <ul className="space-y-3 text-sm text-white/75">
          {navLinks.map(([label, to]) => (
            <li key={to}>
              <Link
                to={to}
                className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact column */}
      <div>
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6">Reach Us</h4>
        <ul className="space-y-4 text-sm text-white/75">
          <li>
            <a href="mailto:info@akroventures.com" className="flex items-center gap-3 hover:text-white transition-colors">
              <Mail size={15} className="text-accent shrink-0" />
              info@akroventures.com
            </a>
          </li>
          <li>
            <a href="tel:+919940628986" className="flex items-center gap-3 hover:text-white transition-colors">
              <Phone size={15} className="text-accent shrink-0" />
              +91 99406 28986
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
            <span>Pan-India. Fully remote.</span>
          </li>
        </ul>

        <a
          href="https://wa.me/919940628986"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent hover:text-white transition-colors"
        >
          <MessageCircle size={15} /> Chat on WhatsApp
        </a>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="container py-5 flex flex-col sm:flex-row gap-3 justify-between text-xs text-white/40">
        <span>© {new Date().getFullYear()} Akro Ventures Capital Advisory Private Proprietor. All rights reserved.</span>
        <span className="flex items-center gap-3">
          <span>RBI Advisory Compliant</span>
          <span className="text-accent">·</span>
          <span>100% Confidential</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
