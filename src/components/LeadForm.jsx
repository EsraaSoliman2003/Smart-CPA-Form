import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, Mail, Phone, Send, Leaf, CheckCircle } from "lucide-react";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function LeadForm({ onSuccess }) {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);

      const fetchPromise = fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );
      await Promise.race([fetchPromise, timeoutPromise]);

      setForm({ name: "", email: "", phone: "" });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="glass-effect rounded-2xl p-8 shadow-lg border border-emerald-100">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="relative mx-auto mb-4 w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-green-500"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <Leaf className="text-emerald-600" size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-emerald-900 mb-2">
              {t("enter_data")}
            </h1>
            <p className="text-emerald-700/80">{t("enter_data_subtitle")}</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "phone"].map((field) => (
              <motion.div
                key={field}
                className="space-y-2"
                onFocus={() => setFocusedField(field)}
                onBlur={() => setFocusedField(null)}
              >
                <label className="flex items-center gap-2 text-emerald-800 font-medium text-sm">
                  {field === "name" && (
                    <User size={16} className="text-emerald-600" />
                  )}
                  {field === "email" && (
                    <Mail size={16} className="text-emerald-600" />
                  )}
                  {field === "phone" && (
                    <Phone size={16} className="text-emerald-600" />
                  )}
                  {t(field)}
                </label>
                <motion.div
                  className="rounded-xl"
                  animate={{
                    boxShadow:
                      focusedField === field
                        ? "0 0 0 3px rgba(16, 185, 129, 0.1)"
                        : "none",
                  }}
                >
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                          ? "tel"
                          : "text"
                    }
                    name={field}
                    className={`input-field ${i18n.language === "ar" ? "text-right" : "text-left"}`}
                    value={form[field]}
                    onChange={handleChange}
                    required={field !== "phone"}
                    placeholder={t(`${field}_placeholder`)}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {["name", "email", "phone"].map((field) => (
                <motion.div
                  key={field}
                  className="h-1 flex-1 rounded-full bg-emerald-100"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: form[field] ? 1 : 0,
                    backgroundColor: form[field] ? "#10B981" : "#D1FAE5",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-500 text-sm">!</span>
                </div>
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || !form.name || !form.email}
              className={`btn-primary w-full flex items-center justify-center gap-2 mt-4 ${
                !form.name || !form.email ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={form.name && form.email ? { scale: 1.02 } : {}}
              whileTap={form.name && form.email ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send size={18} />
                  {t("submit")}
                </>
              )}
            </motion.button>
          </form>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-emerald-100"
          >
            <CheckCircle size={16} className="text-emerald-500" />
            <span className="text-emerald-600 text-sm">
              {t("privacy_note")}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
