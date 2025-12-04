import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const getInitialLanguage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get("lang");

  if (langFromUrl && ["en", "ar"].includes(langFromUrl)) {
    localStorage.setItem("language", langFromUrl);
    return langFromUrl;
  }

  const savedLang = localStorage.getItem("language");
  if (savedLang && ["en", "ar"].includes(savedLang)) {
    return savedLang;
  }

  return "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lang) => {
  localStorage.setItem("language", lang);
});

export default i18n;
