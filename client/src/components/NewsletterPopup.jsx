import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NewsletterPopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = /\S+@\S+\.\S+/.test(email);
    if (!valid) return toast.error("Invalid email format");
    toast.success("Subscribed successfully!");
    setShow(false);
  };

  return show ? (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Stay in the loop!</h3>
        <p className="text-sm text-gray-600 mb-4">Subscribe to get the latest updates from Health Predictor.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShow(false)} className="text-gray-500">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default NewsletterPopup;
