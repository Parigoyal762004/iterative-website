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
  <div className="min-h-[60vh] bg-background flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin opacity-40" />
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
