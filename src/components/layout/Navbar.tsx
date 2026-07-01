import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/Logo'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'

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
  const { theme, toggleTheme } = useTheme()

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
            ? 'bg-background border-b border-border shadow-sm'
            : 'bg-black/55 backdrop-blur-md'
        )}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <nav
            className="flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            <Logo dark={!scrolled || theme === 'dark'} />

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
              <button
                onClick={toggleTheme}
                className={cn(
                  'w-8 h-8 flex items-center justify-center transition-colors duration-200',
                  scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/50 hover:text-white'
                )}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
              </button>
              <Link
                to="/login"
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

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-foreground"
              onClick={() => setDrawerOpen(o => !o)}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu — top dropdown panel */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop — dims the page below the panel */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 bottom-0 z-[60] bg-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown panel */}
            <motion.div
              key="dropdown"
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed top-16 left-0 right-0 z-[70] bg-charcoal shadow-2xl rounded-b-2xl overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 4rem)' }}
              aria-label="Mobile navigation"
            >
              <nav className="px-6 py-7">
                <ul className="space-y-1" role="list">
                  {navLinks.map(({ label, href }) => (
                    <li key={href}>
                      <NavLink
                        to={href}
                        className={({ isActive }) =>
                          cn(
                            'block py-3 text-[0.9375rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 border-b border-white/8',
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
                      to="/login"
                      className="block py-3 text-[0.9375rem] font-semibold uppercase tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors duration-200 border-b border-white/8"
                    >
                      Login
                    </Link>
                  </li>
                </ul>

                <div className="mt-7 flex flex-col gap-3">
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
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2.5 py-3 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {theme === 'dark' ? <Sun size={14} strokeWidth={1.8} /> : <Moon size={14} strokeWidth={1.8} />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-[0.6875rem] text-white/30 uppercase tracking-[0.15em]">
                    Zero upfront fees · RBI compliant
                  </p>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
