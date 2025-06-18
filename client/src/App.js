import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Prediction from "./components/Prediction";
import Home from "./components/Home";
import Testimonials from "./components/Testimonials";
import BackToTop from "./components/BackToTop";
import Stats from "./components/Stats";
import NewsletterPopup from "./components/NewsletterPopup";
import ThemeToggle from "./components/ThemeToggle";

const ScrollPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const homeRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const testimonialRef = useRef();
  const location = useLocation();

  const scrollTo = (ref) => {
    const offset = 100;
    if (ref?.current) {
      const y = ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const target = location.state?.scrollTarget;
    if (target && { homeRef, aboutRef, contactRef, testimonialRef }[target]) {
      toast.loading("Navigating to section...", { id: "scroll" });
      setTimeout(() => {
        scrollTo({ homeRef, aboutRef, contactRef, testimonialRef }[target]);
        toast.dismiss("scroll");
        toast.success("Arrived at section!");
      }, 300);
    }
  }, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = [homeRef, aboutRef, contactRef, testimonialRef];
    sections.forEach((ref) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <Navbar
        scrollTo={scrollTo}
        refs={{ homeRef, aboutRef, contactRef, testimonialRef }}
        active={activeSection}
      />
      <ThemeToggle dark={false} setDark={() => {}} />
      <div id="home" ref={homeRef}><Home /></div>
      <div id="about" ref={aboutRef}><About /></div>
      <div id="contact" ref={contactRef}><Contact /></div>
      <div id="testimonials" ref={testimonialRef}><Testimonials /></div>
      <Stats />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans scroll-smooth">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<ScrollPage />} />
          <Route
            path="/predictor"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Prediction />
                </main>
              </>
            }
          />
        </Routes>
        <Footer />
        <BackToTop />
        <NewsletterPopup />
      </div>
    </Router>
  );
}

export default App;