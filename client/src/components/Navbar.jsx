import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ scrollTo, refs, active }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", refKey: "homeRef", id: "home" },
    { label: "About", refKey: "aboutRef", id: "about" },
    { label: "Contact", refKey: "contactRef", id: "contact" },
    { label: "Reviews", refKey: "testimonialRef", id: "testimonials" }
  ];

  const handleNavClick = (refKey) => {
    if (location.pathname === "/" && refs?.[refKey]) {
      scrollTo?.(refs[refKey]);
    } else {
      navigate("/", { state: { scrollTarget: refKey } });
    }
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
      <h1 className="text-xl font-bold">Health Predictor</h1>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-10 text-base font-medium">
        {navItems.map((item, idx) => (
          <li key={idx}>
            <button
              onClick={() => handleNavClick(item.refKey)}
              className={`relative group px-2 ${active === item.id ? "text-yellow-300" : ""}`}
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-600 group-hover:w-full transition-all"></span>
            </button>
          </li>
        ))}
        <li>
          <Link to="/predictor" className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition font-semibold">
            Get Prediction
          </Link>
        </li>
      </ul>

      {/* Mobile Nav Toggle */}
      <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <ul className="absolute top-20 left-0 w-full bg-blue-800 text-center space-y-4 py-4 md:hidden z-50">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => {
                  handleNavClick(item.refKey);
                  setMobileOpen(false);
                }}
                className={`block w-full py-2 ${active === item.id ? "text-yellow-300 font-semibold" : "text-white"}`}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/predictor"
              onClick={() => setMobileOpen(false)}
              className="inline-block bg-white text-blue-700 px-4 py-2 rounded font-semibold"
            >
              Get Prediction
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
