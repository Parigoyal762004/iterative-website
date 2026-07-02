import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './lib/theme'

// ── Pages ─────────────────────────────────────────────────────────────────────
const Home             = lazy(() => import('./pages/Home'))
const About            = lazy(() => import('./pages/About'))
const Founders         = lazy(() => import('./pages/Founders'))
const Investors        = lazy(() => import('./pages/Investors'))
const Insights         = lazy(() => import('./pages/Insights'))
const Contact          = lazy(() => import('./pages/Contact'))
const Calculator       = lazy(() => import('./pages/Calculator'))
const LoanAudit        = lazy(() => import('./pages/LoanAudit'))
const PortalComingSoon = lazy(() => import('./pages/PortalComingSoon'))
const Login           = lazy(() => import('./pages/Login'))
const NotFound         = lazy(() => import('./pages/NotFound'))

// ── Assessment tools ──────────────────────────────────────────────────────────
const UnsecuredLoansTool      = lazy(() => import('./pages/tools/UnsecuredLoansTool'))
const SecuredLoansTool        = lazy(() => import('./pages/tools/SecuredLoansTool'))
const ProjectFundingTool      = lazy(() => import('./pages/tools/ProjectFundingTool'))
const StartupFundraisingTool  = lazy(() => import('./pages/tools/StartupFundraisingTool'))
const StartupConsultationTool = lazy(() => import('./pages/tools/StartupConsultationTool'))
const FdiEcbTool              = lazy(() => import('./pages/tools/FdiEcbTool'))

const PageFallback = () => (
  <div className="bg-background" aria-hidden="true">
    {/* Hero block */}
    <div className="bg-charcoal px-6 pt-32 pb-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="skeleton-shimmer h-3 w-32 rounded-full mb-6" />
        <div className="skeleton-shimmer h-10 sm:h-14 w-full max-w-xl rounded-md mb-4" />
        <div className="skeleton-shimmer h-10 sm:h-14 w-2/3 max-w-md rounded-md mb-8" />
        <div className="skeleton-shimmer h-4 w-full max-w-lg rounded-full mb-2" />
        <div className="skeleton-shimmer h-4 w-3/4 max-w-md rounded-full mb-8" />
        <div className="flex gap-3">
          <div className="skeleton-shimmer h-11 w-36 rounded-sm" />
          <div className="skeleton-shimmer h-11 w-36 rounded-sm" />
        </div>
      </div>
    </div>

    {/* Content block */}
    <div className="px-6 py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="skeleton-shimmer h-3 w-24 rounded-full mb-4" />
        <div className="skeleton-shimmer h-8 w-1/2 max-w-sm rounded-md mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[0, 1, 2].map(i => (
            <div key={i} className="skeleton-shimmer h-44 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const PageError = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="t-body-m text-muted-foreground">This page couldn't load. Try refreshing.</p>
    <button
      onClick={() => window.location.reload()}
      className="t-label text-accent underline underline-offset-4"
    >
      Reload page
    </button>
  </div>
)

const App = () => (
  <ThemeProvider>
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <ErrorBoundary fallback={<PageError />}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/founders"  element={<Founders />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/about"     element={<About />} />
            <Route path="/insights"  element={<Insights />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/loan-audit" element={<LoanAudit />} />
            <Route path="/portal"    element={<PortalComingSoon />} />
            <Route path="/login"     element={<Login />} />

            {/* Assessment tools */}
            <Route path="/assess/unsecured-loans"      element={<UnsecuredLoansTool />} />
            <Route path="/assess/secured-loans"        element={<SecuredLoansTool />} />
            <Route path="/assess/project-funding"      element={<ProjectFundingTool />} />
            <Route path="/assess/startup-fundraising"  element={<StartupFundraisingTool />} />
            <Route path="/assess/startup-consultation" element={<StartupConsultationTool />} />
            <Route path="/assess/fdi-ecb"              element={<FdiEcbTool />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  </TooltipProvider>
  </ThemeProvider>
)

export default App
