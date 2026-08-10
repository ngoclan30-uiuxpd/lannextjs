import { useState, useEffect } from "react";

export function useLanguage() {
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    let currentLang = "en";

    if (langParam === "vi" || langParam === "en") {
      currentLang = langParam;
      localStorage.setItem("portfolio_lang", langParam);
    } else {
      currentLang = localStorage.getItem("portfolio_lang") || "en";
    }

    if (currentLang !== "en") {
      setLang(currentLang);
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

