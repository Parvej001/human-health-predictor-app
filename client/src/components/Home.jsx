import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import homeVideo from "../assets/home-bg.mp4";
import { FaStethoscope, FaRobot, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-visible text-white">
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition duration-500 ${scrolled ? "blur-sm" : "blur-0"}`}
        >
          <source src={homeVideo} type="video/mp4" />
        </video>
      </div>

      <div className="pt-32 px-6 lg:px-24 text-center">
        <motion.h1
          className="text-5xl font-extrabold leading-tight mb-6 drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Empowering <span className="text-indigo-300">Healthcare</span> with AI
        </motion.h1>
        <motion.p
          className="mb-6 text-lg max-w-2xl mx-auto drop-shadow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Your personal diagnosis companion. Enter your symptoms, get real-time predictions, and take informed steps toward better health.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/predictor")}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Get Started
        </motion.button>
      </div>

      <motion.div
        className="mt-24 mx-auto max-w-5xl px-6 py-12 rounded-xl text-white text-center bg-gradient-to-r from-cyan-600 to-violet-700 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">Start Your Health Journey Today!</h2>
        <p className="text-lg mb-6">We provide AI-powered symptom analysis at your fingertips — 100% free and accurate.</p>
        <button
          onClick={() => navigate("/predictor")}
          className="bg-white text-blue-700 px-6 py-2 rounded font-semibold hover:bg-blue-100 transition"
        >
          Check Your Symptoms
        </button>
      </motion.div>

      <section className="py-20 px-6">
        <motion.h2
          className="text-4xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          What We Offer
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-indigo-600/90 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05 }}
          >
            <FaStethoscope className="text-5xl mb-4 text-white" />
            <h4 className="text-xl font-semibold">AI-Based Diagnosis</h4>
            <p className="text-sm mt-2">Get smart predictions from clinical symptoms using trained models.</p>
          </motion.div>

          <motion.div
            className="bg-blue-600/90 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.2 }}
          >
            <FaRobot className="text-5xl mb-4 text-white" />
            <h4 className="text-xl font-semibold">Real-Time Insights</h4>
            <p className="text-sm mt-2">Receive instant feedback on your symptoms, anytime, anywhere.</p>
          </motion.div>

          <motion.div
            className="bg-purple-600/90 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.4 }}
          >
            <FaShieldAlt className="text-5xl mb-4 text-white" />
            <h4 className="text-xl font-semibold">Private & Secure</h4>
            <p className="text-sm mt-2">Your data stays private — nothing is saved or shared.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 text-center text-white bg-black/50 backdrop-blur">
        <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <p className="text-5xl font-extrabold text-yellow-400">
              <CountUp end={10000} duration={2} separator="," />+
            </p>
            <p className="text-lg mt-2">Users Helped</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-green-400">
              <CountUp end={95} duration={2} />%
            </p>
            <p className="text-lg mt-2">Prediction Accuracy</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-cyan-400">
              <CountUp end={24} duration={1} />/<CountUp end={7} duration={1} />
            </p>
            <p className="text-lg mt-2">Access Support</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;