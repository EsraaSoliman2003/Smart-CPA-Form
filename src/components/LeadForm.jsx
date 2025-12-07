// src/components/LeadForm.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, Mail, Phone, Send } from "lucide-react";

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
    <div
      className="w-full flex justify-center"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white/95 rounded-xl p-5 shadow-md">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {["name", "email"].map((field) => (
              <motion.div key={field} className="space-y-1">
                <label className="flex items-center gap-1.5 text-gray-700 font-medium text-sm">
                  {field === "name" && (
                    <User size={15} className="text-purple-600" />
                  )}
                  {field === "email" && (
                    <Mail size={15} className="text-purple-600" />
                  )}
                  {t(field)}
                </label>

                <motion.div
                  className="rounded-lg border border-gray-300"
                  animate={{
                    borderColor: focusedField === field ? "#8b5cf6" : "#d1d5db",
                    boxShadow:
                      focusedField === field
                        ? "0 0 0 3px rgba(139, 92, 246, 0.15)"
                        : "none",
                  }}
                >
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    className={`w-full px-3 py-2 rounded-lg bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none ${
                      i18n.language === "ar" ? "text-right" : "text-left"
                    }`}
                    value={form[field]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder={t(`${field}_placeholder`)}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200 text-sm"
              >
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                  !
                </span>
                <p className="text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !form.name || !form.email}
              className={`w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-md transition ${
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
        </div>
      </motion.div>
    </div>
  );
}
