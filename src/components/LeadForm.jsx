// src/components/LeadForm.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, Mail, Phone, Send, CheckCircle, Lock } from "lucide-react";

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

  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error("IP fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { name, email, phone } = form;

      const params = new URLSearchParams();
      params.append("name", name);
      params.append("email", email);
      params.append("phone", phone || "");
      params.append("ip", ip || "");

      const url = GOOGLE_SCRIPT_URL;

      if (navigator.sendBeacon) {
        const blob = new Blob([params.toString()], {
          type: "application/x-www-form-urlencoded;charset=UTF-8",
        });
        navigator.sendBeacon(url, blob);
      } else {
        fetch(url, {
          method: "POST",
          body: params,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          mode: "no-cors",
        }).catch((err) => {
          console.error("Send error:", err);
        });
      }

      setForm({ name: "", email: "", phone: "" });
      onSuccess?.();

      setTimeout(() => {
        window.location.href = "https://smrturl.co/a/sa0356a6983/62?s1=";
      }, 800);
    } catch (err) {
      console.error(err);
      setError(t("error"));
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };


  return (
    <div className="w-full" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="glass-effect rounded-2xl p-8 shadow-2xl gradient-border">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="relative mx-auto mb-4 w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900"
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
              <div className="absolute inset-2 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800">
                <Lock className="text-emerald-500" size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent mb-2">
              {t("enter_data")}
            </h1>
            <p className="text-neutral-400">{t("enter_data_subtitle")}</p>
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
                <label className="flex items-center gap-2 text-neutral-300 font-medium text-sm">
                  {field === "name" && (
                    <User size={16} className="text-emerald-500" />
                  )}
                  {field === "email" && (
                    <Mail size={16} className="text-emerald-500" />
                  )}
                  {field === "phone" && (
                    <Phone size={16} className="text-emerald-500" />
                  )}
                  {t(field)}
                </label>
                <motion.div
                  className="rounded-xl"
                  animate={{
                    border:
                      focusedField === field
                        ? "1px solid #166534"
                        : "1px solid #262626",
                    boxShadow:
                      focusedField === field
                        ? "0 0 0 3px rgba(22, 101, 52, 0.1)"
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
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-900 text-gray-200 placeholder-gray-500
                      focus:outline-none transition-all duration-300 ${
                        i18n.language === "ar" ? "text-right" : "text-left"
                      }`}
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
                  className="h-1 flex-1 rounded-full bg-neutral-800 overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: form[field] ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {form[field] && (
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 bg-gradient-to-r from-neutral-900 to-black rounded-lg border border-neutral-800"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-900 to-red-800 flex items-center justify-center">
                  <span className="text-red-400 text-sm">!</span>
                </div>
                <p className="text-red-300 text-sm">{error}</p>
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
            className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-neutral-800"
          >
            <CheckCircle size={16} className="text-emerald-500" />
            <span className="text-neutral-400 text-sm">
              {t("privacy_note")}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
