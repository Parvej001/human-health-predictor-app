import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Anita Sharma", feedback: "A life-saving tool. Instant and intuitive!" },
  { name: "Ravi Mehta", feedback: "Loved how simple and accurate the predictions were." },
  { name: "Dr. Kiran Das", feedback: "Great initiative in preventive healthcare!" },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-10 text-indigo-700">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded shadow hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
            <h4 className="font-semibold text-indigo-600">— {t.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;