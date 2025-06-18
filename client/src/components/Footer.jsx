import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-white text-center py-4 w-full">
      <p>Contact us: <a href="mailto:health@predictor.com" className="underline">health@predictor.com</a></p>
      <p>&copy; {new Date().getFullYear()} Health Predictor</p>
    </footer>
  );
};

export default Footer;
