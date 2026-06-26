import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";

// Route-level code splitting  -  each page loads only when visited
const Home       = lazy(() => import("./pages/Home"));
const About      = lazy(() => import("./pages/About"));
const Services   = lazy(() => import("./pages/Services"));
const Resources  = lazy(() => import("./pages/Resources"));
const Contact    = lazy(() => import("./pages/Contact"));
const Calculator = lazy(() => import("./pages/Calculator"));
const LoanAudit  = lazy(() => import("./pages/LoanAudit"));
const NotFound   = lazy(() => import("./pages/NotFound"));

// Service assessment tools  -  interactive lead-capture flows
const UnsecuredLoansTool      = lazy(() => import("./pages/tools/UnsecuredLoansTool"));
const SecuredLoansTool        = lazy(() => import("./pages/tools/SecuredLoansTool"));
const ProjectFundingTool      = lazy(() => import("./pages/tools/ProjectFundingTool"));
const StartupFundraisingTool  = lazy(() => import("./pages/tools/StartupFundraisingTool"));
const StartupConsultationTool = lazy(() => import("./pages/tools/StartupConsultationTool"));
const FdiEcbTool              = lazy(() => import("./pages/tools/FdiEcbTool"));

// Minimal fallback that matches the background  -  no flash
const PageFallback = () => (
  <div className="min-h-[60vh] bg-background" aria-hidden="true" />
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/services"   element={<Services />} />
            <Route path="/resources"  element={<Resources />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/audit"      element={<LoanAudit />} />
            {/* Service assessment tools */}
            <Route path="/assess/unsecured-loans"      element={<UnsecuredLoansTool />} />
            <Route path="/assess/secured-loans"        element={<SecuredLoansTool />} />
            <Route path="/assess/project-funding"      element={<ProjectFundingTool />} />
            <Route path="/assess/startup-fundraising"  element={<StartupFundraisingTool />} />
            <Route path="/assess/startup-consultation" element={<StartupConsultationTool />} />
            <Route path="/assess/fdi-ecb"              element={<FdiEcbTool />} />
            <Route path="*"           element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
