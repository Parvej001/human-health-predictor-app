import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { motion } from "framer-motion";
import videoBg from "../assets/hospital.mp4";
import {
  FaHeartbeat,
  FaHandsWash,
  FaRunning,
  FaAppleAlt,
  FaNotesMedical,
  FaSmileBeam
} from "react-icons/fa";
import { toast } from "react-toastify";

const tips = [
  "Drink plenty of water and stay hydrated throughout the day.",
  "Wash your hands regularly to prevent infection.",
  "Get enough sleep to allow your body to heal and recover.",
  "Exercise daily to maintain physical and mental well-being.",
  "Avoid self-diagnosing; consult a doctor when in doubt."
];

const Prediction = () => {
  const [symptomOptions, setSymptomOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blur, setBlur] = useState(true);
  const [focused, setFocused] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const BACKEND_URL = "https://node-backend-n52v.onrender.com";

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/symptoms`);
        const options = res.data.symptoms.map(symptom => ({
          value: symptom,
          label: symptom.replace(/_/g, " ")
        }));
        setSymptomOptions(options);
      } catch (error) {
        toast.error("❌ Unable to load symptoms. Please try again later.");
      }
    };

    fetchSymptoms();
    setTimeout(() => setBlur(false), 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePredict = async () => {
    const symptoms = selected.map(s => s.value);

    if (symptoms.length === 0) {
      toast.warning("⚠️ Please select at least one symptom!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/predict`, { symptoms });
      setPredictions(res.data.predictions);
    } catch (error) {
      toast.error("❌ Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setPredictions([]);
  };

  const customStyles = {
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };

  return (
    <section className="min-h-screen w-full text-white relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-0 left-0 w-full h-full object-cover z-[-1] ${
          blur ? "blur-sm" : "blur-0"
        }`}
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="bg-white/20 backdrop-blur-md w-[95%] max-w-5xl mx-auto p-10 rounded-xl mt-24 shadow-xl transition-all duration-500">
        <motion.h3
          className="text-3xl font-bold text-center mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Predict Disease Based on Your Symptoms
        </motion.h3>

        <motion.p
          className="text-center text-white/90 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Select all symptoms you're experiencing. Our system will match them against real conditions.
        </motion.p>

        <div onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
          {symptomOptions.length === 0 ? (
            <div className="text-white text-center mb-6">⏳ Loading symptoms...</div>
          ) : (
            <Select
              options={symptomOptions}
              isMulti
              onChange={setSelected}
              value={selected}
              styles={customStyles}
              menuPortalTarget={document.body}
              className="mb-6 text-black z-[10] relative"
            />
          )}
        </div>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePredict}
            className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 transition"
          >
            {loading ? "Analyzing..." : "Predict"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
          >
            Clear
          </motion.button>
        </div>

        {loading && (
          <div className="mt-6 text-center animate-pulse text-indigo-200">
            Processing your symptoms. Please wait...
          </div>
        )}

        {predictions.length > 0 && (
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {predictions.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-lg text-center"
              >
                <p className="text-lg font-semibold text-indigo-700">{item.disease}</p>
                <p className="text-sm text-gray-800 mt-2">
                  Confidence: <strong>{item.confidence}%</strong>
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-12 text-center max-w-xl mx-auto">
          <motion.h4
            className="text-2xl font-bold mb-2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            💡 Health Tip
          </motion.h4>
          <motion.p
            key={tipIndex}
            className="text-sm text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {tips[tipIndex]}
          </motion.p>
        </div>
      </div>

      <div className="mt-12">
        <div className="w-40 mx-auto bg-white/10 backdrop-blur p-4 rounded-lg">
          <motion.h4
            className="text-3xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            🌿 Healthy Habits
          </motion.h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <FaHeartbeat className="text-4xl text-pink-400 mx-auto mb-2" />
            <p className="text-sm">Heart Health</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <FaHandsWash className="text-4xl text-blue-400 mx-auto mb-2" />
            <p className="text-sm">Hand Hygiene</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <FaRunning className="text-4xl text-yellow-400 mx-auto mb-2" />
            <p className="text-sm">Daily Activity</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <FaAppleAlt className="text-4xl text-green-400 mx-auto mb-2" />
            <p className="text-sm">Nutrition</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <FaNotesMedical className="text-4xl text-red-400 mx-auto mb-2" />
            <p className="text-sm">Checkups</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <FaSmileBeam className="text-4xl text-purple-400 mx-auto mb-2" />
            <p className="text-sm">Mental Health</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prediction;
