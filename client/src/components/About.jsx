import React from "react";
import { motion } from "framer-motion";
import doctorImage from "../assets/doctor1.png";
import { FaUserMd, FaEnvelopeOpenText, FaCommentAlt } from "react-icons/fa";

const About = () => {
  return (
    <motion.section
      id="about"
      className="pt-28 pb-24 px-4 w-full mx-auto text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <img src={doctorImage} alt="Doctor background" className="absolute top-0 left-0 w-full h-full object-cover opacity-0 -z-10" />
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">Who We Are</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          We are a passionate team committed to using technology to empower individuals in making informed healthcare decisions.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaUserMd className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg">Creator</h4>
            <p className="text-sm mt-2">Parvej khan</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaEnvelopeOpenText className="text-4xl text-indigo-500 mx-auto mb-4" />
            <h4 className="font-semibold text-lg">Email</h4>
            <a href="mailto:health@predictor.com" className="text-blue-700 text-sm">health@predictor.com</a>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaCommentAlt className="text-4xl text-green-500 mx-auto mb-4" />
            <h4 className="font-semibold text-lg">Feedback</h4>
            <textarea placeholder="Share your thoughts..." className="w-full p-2 mt-2 border rounded" rows="3" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;