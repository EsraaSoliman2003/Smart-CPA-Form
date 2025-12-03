import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  Clock,
  Heart,
  Leaf,
  Sparkles,
} from "lucide-react";

export default function Thanks() {
  const { t, i18n } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const successIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background */}
      <div className="absolute overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-emerald-200/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-green-200/20"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Card */}
      <motion.div
        variants={itemVariants}
        className="glass-effect rounded-2xl p-8 text-center max-w-xl shadow-lg border border-emerald-100 relative z-10"
      >
        {/* Success Icon with Animation */}
        <motion.div variants={successIconVariants} className="relative mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg">
            <CheckCircle className="text-white" size={56} />
          </div>

          {/* Animated Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-emerald-300/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-emerald-400/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />

          {/* Floating Sparkles */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="text-amber-400" size={24} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold gradient-text mb-4"
        >
          {t("thank_you_title")}
        </motion.h1>

        {/* Message */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-emerald-800/80 mb-10 leading-relaxed"
        >
          {t("thank_you_message")}
        </motion.p>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: Clock, color: "emerald", text: t("thank_you_note1") },
            { icon: Shield, color: "green", text: t("privacy_assurance") },
            { icon: Heart, color: "amber", text: t("thank_you_note2") },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gradient-to-b from-white to-emerald-50 rounded-xl border border-emerald-100"
            >
              <div
                className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center mb-3`}
              >
                <item.icon className={`text-${item.color}-600`} size={20} />
              </div>
              <span className="text-sm text-emerald-700 font-medium">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-emerald-100"
        >
          <p className="text-sm text-emerald-600">{t("contact_info")}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
