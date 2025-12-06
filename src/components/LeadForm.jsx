// src/components/LeadForm.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, Mail, Phone, Send, CheckCircle, Lock } from "lucide-react";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function LeadForm({ onSuccess }) {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.append("name", form.name);
      params.append("email", form.email);
      params.append("phone", form.phone || "");
      params.append("ip", ip || "");

      if (navigator.sendBeacon) {
        const blob = new Blob([params.toString()], {
          type: "application/x-www-form-urlencoded;charset=UTF-8",
        });
        navigator.sendBeacon(GOOGLE_SCRIPT_URL, blob);
      } else {
        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: params,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          mode: "no-cors",
        });
      }

      setForm({ name: "", email: "", phone: "" });
      onSuccess?.();

      setTimeout(() => {
        window.location.href = "https://smrturl.co/a/sa0356a6983/62?s1=";
      }, 800);
    } catch {
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
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white/95 rounded-xl p-6 shadow-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <div className="relative mx-auto mb-3 w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <Lock className="text-purple-600" size={24} />
              </div>
            </div>
            <h1 className="text-lg font-bold text-gray-800 mb-1">
              {t("enter_data")}
            </h1>
            <p className="text-gray-600 text-sm">{t("enter_data_subtitle")}</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone"].map((field) => (
              <motion.div
                key={field}
                onFocus={() => setFocusedField(field)}
                onBlur={() => setFocusedField(null)}
                className="space-y-1"
              >
                <label className="flex items-center gap-2 text-gray-700 font-medium text-xs">
                  {field === "name" && (
                    <User size={14} className="text-purple-600" />
                  )}
                  {field === "email" && (
                    <Mail size={14} className="text-purple-600" />
                  )}
                  {field === "phone" && (
                    <Phone size={14} className="text-purple-600" />
                  )}
                  {t(field)}
                </label>

                <motion.div
                  className="rounded-lg "
                  animate={{
                    border: "2px solid",
                    borderColor: focusedField === field ? "#8b5cf6" : "#d1d5db",
                    boxShadow:
                      focusedField === field
                        ? "0 0 0 3px rgba(139, 92, 246, 0.1)"
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
                    className={`w-full px-3 py-2.5 rounded-lg bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none ${
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

            {/* Progress */}
            <div className="flex items-center gap-1.5">
              {["name", "email", "phone"].map((field) => (
                <motion.div
                  key={field}
                  className="h-1 flex-1 rounded-full bg-gray-200 overflow-hidden"
                  animate={{ scaleX: form[field] ? 1 : 0 }}
                >
                  {form[field] && (
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 p-2.5 bg-red-50 rounded-lg border border-red-200 text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                  !
                </span>
                <p className="text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !form.name || !form.email}
              className={`w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-md transition ${
                !form.name || !form.email ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={form.name && form.email ? { scale: 1.02 } : {}}
              whileTap={form.name && form.email ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send size={16} />
                  {t("submit")}
                </>
              )}
            </motion.button>
          </form>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-5 pt-5 border-t border-gray-200 text-xs text-gray-600"
          >
            <CheckCircle size={14} className="text-purple-600" />
            {t("privacy_note")}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
