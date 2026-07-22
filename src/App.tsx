import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import GlowBackground from "./components/GlowBackground";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutApp from "./pages/AboutApp";
import AboutUs from "./pages/AboutUs";
import Tools from "./pages/Tools";
import InfoHub from "./pages/InfoHub";
import Blog from "./pages/Blog";

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
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-app" element={<AboutApp />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/info" element={<InfoHub />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
