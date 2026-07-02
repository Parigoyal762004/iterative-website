import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import footerLogoImg from '@/assets/logo-dark-mode.png'

const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const navCols = [
  {
    heading: 'Advisory',
    links: [
      { label: 'For Founders', href: '/founders' },
      { label: 'For Investors', href: '/investors' },
      { label: 'About Akro', href: '/about' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Tools',
    links: [
      { label: 'Loan Calculator', href: '/calculator' },
      { label: 'Loan Readiness Audit', href: '/loan-audit' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Client Portal', href: '/portal' },
    ],
  },
]

const socials = [
  { icon: <Linkedin size={15} />, href: 'https://www.linkedin.com/company/akro-ventures', label: 'LinkedIn' },
  { icon: <XLogo size={14} />, href: 'https://twitter.com/akroventures', label: 'X' },
  { icon: <Instagram size={15} />, href: 'https://www.instagram.com/akroventures/', label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-white border-t-2 border-accent">
      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/">
              <img src={footerLogoImg} alt="Akro Ventures" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
            <p className="text-[0.875rem] text-white/55 leading-relaxed max-w-[260px]">
              Capital advisory for ambitious Indian founders. Strategy first, paperwork second.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/50 hover:border-accent hover:text-accent transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="t-label text-accent mb-5">{heading}</h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-[0.8125rem] text-white/55 hover:text-white transition-colors duration-200 link-underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="t-label text-accent mb-5">Reach Us</h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="mailto:info@akroventures.com"
                  className="flex items-start gap-3 text-[0.8125rem] text-white/55 hover:text-white transition-colors duration-200"
                >
                  <Mail size={14} className="text-accent mt-0.5 shrink-0" />
                  info@akroventures.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919940628986"
                  className="flex items-start gap-3 text-[0.8125rem] text-white/55 hover:text-white transition-colors duration-200"
                >
                  <Phone size={14} className="text-accent mt-0.5 shrink-0" />
                  +91 99406 28986
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919940628986"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 text-[0.8125rem] text-white/55 hover:text-accent transition-colors duration-200"
                >
                  <MessageCircle size={14} className="text-accent mt-0.5 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3 text-[0.8125rem] text-white/40">
                <MapPin size={14} className="text-accent/60 mt-0.5 shrink-0" />
                Pan-India · Fully remote
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-[1280px] px-6 py-4 flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
          <p className="text-[0.6875rem] text-white/30">
            © {new Date().getFullYear()} Akro Ventures Capital Advisory. All rights reserved.
          </p>
          <p className="text-[0.6875rem] text-white/30 flex items-center gap-3">
            <span>RBI Advisory Compliant</span>
            <span className="text-accent/50">·</span>
            <span>100% Confidential</span>
            <span className="text-accent/50">·</span>
            <span>Zero Upfront Fees</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
