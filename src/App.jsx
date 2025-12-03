import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Leaf, Sprout } from "lucide-react";

import LeadForm from "./components/LeadForm.jsx";
import Thanks from "./components/Thanks.jsx";

export default function App() {
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    const createLeaf = () => {
      const leaf = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 10,
      };
      setLeaves((prev) => [...prev, leaf]);

      setTimeout(() => {
        setLeaves((prev) => prev.filter((l) => l.id !== leaf.id));
      }, leaf.duration * 1000);
    };

    const interval = setInterval(createLeaf, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-0 z-0"
          style={{ left: `${leaf.left}%` }}
          initial={{ y: -100, rotate: 0, opacity: 0 }}
          animate={{
            y: "100vh",
            rotate: 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            ease: "linear",
          }}
        >
          <Leaf className="text-emerald-200/50" size={20} />
        </motion.div>
      ))}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply opacity-20 animate-float"></div>
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-teal-100 rounded-full opacity-10"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.header
          className="w-full flex justify-end px-4 pt-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="flex gap-2 glass-effect rounded-full p-1 shadow-sm border border-emerald-100">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => i18n.changeLanguage("ar")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                currentLang === "ar"
                  ? "gradient-bg text-white shadow-md"
                  : "text-emerald-700 hover:bg-emerald-50"
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
                  ? "gradient-bg text-white shadow-md"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <Globe size={16} />
              English
            </motion.button>
          </div>
        </motion.header>

        <motion.div
          className="absolute bottom-0 left-10 z-0"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Sprout className="text-emerald-400/30" size={120} />
        </motion.div>

        <main className="flex-1 flex items-center justify-center px-4 py-6">
          <AnimatePresence mode="wait">
            {!leadSubmitted ? (
              <motion.div
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
              >
                <LeadForm onSuccess={() => setLeadSubmitted(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-xl"
              >
                <Thanks />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

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
        <Leaf className="text-emerald-300/40" size={28} />
      </motion.div>
    </motion.div>
  );
}
