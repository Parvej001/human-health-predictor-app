import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      id="home"
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold mb-4">Welcome to the Health Predictor</h2>
      <p className="max-w-2xl mx-auto text-lg">
        An intelligent web-based application that helps you predict your possible disease based on selected symptoms.
      </p>
    </motion.section>
  );
};

export default Hero;