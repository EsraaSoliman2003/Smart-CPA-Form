import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import LeadForm from "./components/LeadForm.jsx";
import wallPaper from "./assets/wallPaper.png";

export default function App() {
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  return (
    <div className="relative min-h-screen bg-white">
      {/* Mobile */}
      <div className="lg:hidden">
        <motion.div
          className="relative min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${wallPaper})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative z-10 flex min-h-screen flex-col justify-center px-5 py-6">
            <main className="flex flex-1 items-center justify-center">
              <AnimatePresence mode="wait">
                {!leadSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-sm"
                  >
                    <LeadForm onSuccess={() => setLeadSubmitted(true)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    className="bg-white/90 backdrop-blur-md rounded-3xl p-6 text-center shadow-2xl border border-purple-100"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
                      <Sparkles size={26} className="text-white" />
                    </div>

                    <h2 className="text-xl font-black text-purple-700 mb-1">
                      🎉 Thank You! 🎉
                    </h2>
                    <p className="text-sm text-gray-700">
                      Your information has been submitted!
                    </p>
                    <p className="mt-1 text-xs text-purple-700">Redirecting…</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </motion.div>
      </div>

      {/* Desktop */}
      <div className="hidden min-h-screen lg:flex">
        {/* Image */}
        <div
          className="flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${wallPaper})` }}
        />

        {/* Form */}
        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-10">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!leadSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <LeadForm onSuccess={() => setLeadSubmitted(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl border border-purple-100"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-xl">
                    <Sparkles size={32} className="text-white" />
                  </div>

                  <h2 className="text-2xl font-black text-purple-700 mb-2">
                    🎉 Congratulations! 🎉
                  </h2>

                  <p className="text-base text-gray-700 mb-3">
                    Your information has been submitted successfully!
                  </p>

                  <p className="text-sm font-semibold text-purple-700">
                    Redirecting to your exclusive offer...
                  </p>

                  <div className="mt-6 animate-pulse text-sm text-gray-600">
                    Preparing your reward…
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
