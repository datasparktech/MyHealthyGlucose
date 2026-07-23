import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import GlowBackground from "./components/GlowBackground";
import ScrollProgress from "./components/ScrollProgress";
import Analytics from "./components/Analytics";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

// Lazy-load everything except the home page to keep the initial bundle small
const AboutApp = lazy(() => import("./pages/AboutApp"));
const Features = lazy(() => import("./pages/Features"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Community = lazy(() => import("./pages/Community"));
const Assistant = lazy(() => import("./pages/Assistant"));
const Legal = lazy(() => import("./pages/Legal"));
const Store = lazy(() => import("./pages/Store"));
const Give = lazy(() => import("./pages/Give"));
const ToolsHub = lazy(() => import("./pages/ToolsHub"));
const InfoHub = lazy(() => import("./pages/InfoHub"));
const Guide = lazy(() => import("./pages/Guide"));
const Glossary = lazy(() => import("./pages/Glossary"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const A1CConverter = lazy(() => import("./pages/tools/A1CConverter"));
const CarbCalculator = lazy(() => import("./pages/tools/CarbCalculator"));
const RiskQuiz = lazy(() => import("./pages/tools/RiskQuiz"));
const GlycemicIndexTool = lazy(() => import("./pages/tools/GlycemicIndexTool"));
const InsulinRatioCalculator = lazy(() => import("./pages/tools/InsulinRatioCalculator"));
const WaterIntakeCalculator = lazy(() => import("./pages/tools/WaterIntakeCalculator"));
const EmergencyCard = lazy(() => import("./pages/tools/EmergencyCard"));
const MealSimulator = lazy(() => import("./pages/tools/MealSimulator"));
const CGMAnalyzer = lazy(() => import("./pages/tools/CGMAnalyzer"));
const CarbTargetCalculator = lazy(() => import("./pages/tools/CarbTargetCalculator"));
const PostMealTarget = lazy(() => import("./pages/tools/PostMealTarget"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminStore = lazy(() => import("./pages/AdminStore"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const BlogEditor = lazy(() => import("./pages/BlogEditor"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-400" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-body text-ink">
      <GlowBackground />
      <ScrollProgress />
      <Analytics />
      <ScrollToTop />
      <Nav />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-app" element={<AboutApp />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/legal/:slug" element={<Legal />} />
            <Route path="/store" element={<Store />} />
            <Route path="/give" element={<Give />} />

            <Route path="/tools" element={<ToolsHub />} />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/a1c-converter" element={<A1CConverter />} />
            <Route path="/tools/carb-calculator" element={<CarbCalculator />} />
            <Route path="/tools/risk-quiz" element={<RiskQuiz />} />
            <Route path="/tools/glycemic-index" element={<GlycemicIndexTool />} />
            <Route path="/tools/insulin-ratio" element={<InsulinRatioCalculator />} />
            <Route path="/tools/water-intake" element={<WaterIntakeCalculator />} />
            <Route path="/tools/emergency-guide" element={<EmergencyCard />} />
            <Route path="/tools/meal-simulator" element={<MealSimulator />} />
            <Route path="/tools/cgm-analyzer" element={<CGMAnalyzer />} />
            <Route path="/tools/carb-target" element={<CarbTargetCalculator />} />
            <Route path="/tools/post-meal-target" element={<PostMealTarget />} />

            <Route path="/info" element={<InfoHub />} />
            <Route path="/info/glossary" element={<Glossary />} />
            <Route path="/info/:slug" element={<Guide />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/store"
              element={
                <ProtectedRoute>
                  <AdminStore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/new"
              element={
                <ProtectedRoute>
                  <BlogEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit/:id"
              element={
                <ProtectedRoute>
                  <BlogEditor />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
