import { useState, useEffect } from "react";

export function useLanguage() {
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang");
    if (savedLang) {
      setLang(savedLang);
    }

    const handleLangChange = () => {
      setLang(localStorage.getItem("portfolio_lang") || "en");
    };

    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  const changeLanguage = (newLang: string) => {
    localStorage.setItem("portfolio_lang", newLang);
    setLang(newLang);
    window.dispatchEvent(new Event("languageChange"));
  };

  const t = <T,>(en: T, vi: T): T => {
    return lang === "vi" ? vi : en;
  };

  return { lang, changeLanguage, t };
}

