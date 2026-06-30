import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/Logo'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

const CALENDLY = 'https://calendly.com/akroventures-info/30-min-stand-up-call'

const navLinks = [
  { label: 'For Founders', href: '/founders' },
  { label: 'For Investors', href: '/investors' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [location.pathname])

  // Scroll-aware background + progress bar — direct DOM for perf
  useEffect(() => {
    const bar = progressRef.current

    function onScroll() {
      const sy = window.scrollY
      setScrolled(sy > 40)

      if (bar) {
        const docH = document.documentElement.scrollHeight - window.innerHeight
        const pct = docH > 0 ? sy / docH : 0
        bar.style.transform = `scaleX(${pct})`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        aria-hidden="true"
      />

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white border-b border-border shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <nav
            className="flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            {/* Logo — invert to black when nav is over white bg */}
            <div style={{ filter: scrolled ? 'brightness(0)' : 'none', transition: 'filter 0.3s' }}>
              <Logo />
            </div>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      cn(
                        'relative px-3 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200',
                        scrolled
                          ? 'text-foreground/80 hover:text-foreground'
                          : 'text-white/80 hover:text-white',
                        isActive && (scrolled ? 'text-foreground' : 'text-white'),
                        'group'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{label}</span>
                        <span
                          className={cn(
                            'absolute bottom-0 left-3 right-3 h-[1.5px] bg-accent origin-left transition-transform duration-300',
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          )}
                          style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/portal"
                className={cn(
                  'text-[0.6875rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200',
                  scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/50 hover:text-white'
                )}
              >
                Login
              </Link>
              <a href={CALENDLY} target="_blank" rel="noreferrer">
                <Button size="md">Book a Call</Button>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-foreground"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer — right side */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[320px] bg-charcoal flex flex-col"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Logo />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 px-6 py-8 overflow-y-auto">
                <ul className="space-y-1" role="list">
                  {navLinks.map(({ label, href }) => (
                    <li key={href}>
                      <NavLink
                        to={href}
                        className={({ isActive }) =>
                          cn(
                            'block py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 border-b border-white/8',
                            isActive ? 'text-accent' : 'text-white/70 hover:text-white'
                          )
                        }
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/portal"
                      className="block py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors duration-200 border-b border-white/8"
                    >
                      Login
                    </Link>
                  </li>
                </ul>

                <div className="mt-10 flex flex-col gap-3">
                  <a href={CALENDLY} target="_blank" rel="noreferrer" className="block">
                    <Button size="lg" className="w-full justify-center">
                      Book a Call
                    </Button>
                  </a>
                  <Link to="/contact" className="block">
                    <Button variant="ghost-light" size="lg" className="w-full justify-center">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-5 border-t border-white/10">
                <p className="text-[0.6875rem] text-white/30 uppercase tracking-[0.15em]">
                  Zero upfront fees · RBI compliant
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
