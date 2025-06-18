import React, { useState } from "react";
import { motion } from "framer-motion";
import doctorImage from "../assets/doctor2.png";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("contactSubmission", JSON.stringify(formData));
    toast.success("✅ Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", location: "" });
  };

  return (
    <motion.section
      id="contact"
      className="pt-28 pb-24 px-4 w-full mx-auto text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <img src={doctorImage} alt="Doctor background" className="absolute top-0 left-0 w-full h-full object-cover opacity-0 -z-10" />
      <div className="max-w-3xl mx-auto px-6 bg-white/70 rounded-xl  shadow-lg transform transition-transform duration-300 hover:scale-105 p-10">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
            <input type="text" name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;