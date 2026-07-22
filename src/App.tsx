import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import GlowBackground from "./components/GlowBackground";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import AboutApp from "./pages/AboutApp";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import ToolsHub from "./pages/ToolsHub";
import InfoHub from "./pages/InfoHub";
import Guide from "./pages/Guide";
import Glossary from "./pages/Glossary";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import BMICalculator from "./pages/tools/BMICalculator";
import A1CConverter from "./pages/tools/A1CConverter";
import CarbCalculator from "./pages/tools/CarbCalculator";
import RiskQuiz from "./pages/tools/RiskQuiz";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import BlogEditor from "./pages/BlogEditor";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen font-body text-ink">
      <GlowBackground />
      <ScrollProgress />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-app" element={<AboutApp />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />

          <Route path="/tools" element={<ToolsHub />} />
          <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
          <Route path="/tools/a1c-converter" element={<A1CConverter />} />
          <Route path="/tools/carb-calculator" element={<CarbCalculator />} />
          <Route path="/tools/risk-quiz" element={<RiskQuiz />} />

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
      </main>
      <Footer />
    </div>
  );
}
