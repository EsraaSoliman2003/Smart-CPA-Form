// src/App.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";

import LeadForm from "./components/LeadForm.jsx";

export default function App() {
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    const createParticle = () => {
      const particle = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 10,
        size: Math.random() * 4 + 1,
      };
      setParticles((prev) => [...prev, particle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, particle.duration * 1000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-neutral-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-0 z-0"
          style={{ 
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white to-neutral-300 rounded-full"></div>
        </motion.div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-neutral-900 to-black rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-neutral-800 to-black rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        
        {/* Subtle Shimmer Effects */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 animate-shimmer rounded-full"></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 animate-shimmer rounded-full"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.header
          className="w-full flex justify-end px-4 pt-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="flex gap-2 glass-effect rounded-full p-1 shadow-2xl">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => i18n.changeLanguage("ar")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                currentLang === "ar"
                  ? "gradient-bg text-white shadow-lg"
                  : "text-neutral-300 hover:bg-neutral-900/50"
              }`}
            >
              <Globe size={16} />
              العربية
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => i18n.changeLanguage("en")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                currentLang === "en"
                  ? "gradient-bg text-white shadow-lg"
                  : "text-neutral-300 hover:bg-neutral-900/50"
              }`}
            >
              <Globe size={16} />
              English
            </motion.button>
          </div>
        </motion.header>

        <main className="flex-1 flex items-center justify-center px-4 py-6">
          <AnimatePresence mode="wait">
            {!leadSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
              >
                <LeadForm onSuccess={() => setLeadSubmitted(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="glass-effect rounded-2xl p-8 shadow-2xl gradient-border">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center"
                  >
                    <Sparkles className="text-white" size={32} />
                  </motion.div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent mb-4">
                    Thank You!
                  </h2>
                  <p className="text-neutral-400">
                    Your information has been submitted successfully.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Floating Accent */}
        <motion.div
          className="absolute bottom-8 right-8 z-0"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-50"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}