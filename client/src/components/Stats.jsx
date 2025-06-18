import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  const items = [
    { label: "Users Helped", value: 48000 },
    { label: "Diseases Covered", value: 41 },
    { label: "Prediction Accuracy", value: 92, suffix: "%" }
  ];

  return (
    <section className="bg-white py-16 text-center">
      <h2 className="text-4xl font-bold text-indigo-700 mb-12">Our Impact</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item, idx) => (
          <div key={idx} className="text-3xl font-bold text-blue-800">
            <CountUp end={item.value} duration={2} suffix={item.suffix || ""} />
            <p className="text-lg font-medium text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
