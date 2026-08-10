"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./useLanguage";

export default function Nav() {
  const { lang, changeLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const links = [
    { label: t("Home", "Trang chủ"), href: "#home" },
    { label: t("Work", "Dự án"), href: "#work" },
    { label: t("About", "Giới thiệu"), href: "#about" },
    { label: t("Contact", "Liên hệ"), href: "#contact" },
  ];

  useEffect(() => {
    const sectionIds = ["home", "work", "about", "contact"];

    const handler = () => {
      setScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 120;
      
      if (window.scrollY < 50) {
        setActiveSection("home");
        return;
      }

      const sections = sectionIds
        .map(id => {
          const el = document.getElementById(id);
          return { id, top: el ? el.offsetTop : 0 };
        })
        .filter(s => document.getElementById(s.id))
        .sort((a, b) => a.top - b.top);

      let active = "home";
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
          active = sections[i].id;
          break;
        }
      }
      setActiveSection(active);
    };

    window.addEventListener("scroll", handler);
    handler(); // Run once initially
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 2rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <span style={{
              width: 46, height: 46,
              background: "var(--ink)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Google Sans', sans-serif",
              fontSize: 24, color: "#fff",
              fontWeight: 600
            }}>LD</span>
            <div>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", display: "block", lineHeight: 1.2 }}>
                Lan Đinh
              </span>
              <span style={{ fontSize: 14, color: "var(--muted)", letterSpacing: "0.02em" }}>
                UI/UX & Product Designer
              </span>
            </div>
          </a>

          {/* Language Switcher */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            border: "1px solid var(--border)",
            borderRadius: "999px",
            padding: "2px",
            background: scrolled ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "'Google Sans', sans-serif",
          }}>
            <button
              onClick={() => changeLanguage("en")}
              style={{
                border: "none",
                background: lang === "en" ? "var(--ink)" : "transparent",
                color: lang === "en" ? "#fff" : "var(--muted)",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >EN</button>
            <button
              onClick={() => changeLanguage("vi")}
              style={{
                border: "none",
                background: lang === "vi" ? "var(--ink)" : "transparent",
                color: lang === "vi" ? "#fff" : "var(--muted)",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >VI</button>
          </div>
        </div>

        <nav style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center",
          background: "rgba(255, 239, 197, 0.04)",
          border: "1px solid var(--border)",
          borderRadius: 999, padding: "4px",
        }} className="hidden-mobile">
          {links.map(l => {
            const isActive = activeSection === l.href.substring(1);
            return (
              <a key={l.label} href={l.href} style={{
                padding: "7px 16px", fontSize: 14, fontWeight: isActive ? 500 : 400,
                color: isActive ? "#fff" : "var(--muted)",
                background: isActive ? "#e8a842" : "transparent",
                textDecoration: "none",
                borderRadius: 999, transition: "all 0.2s",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (!isActive) {
                    el.style.color = "var(--ink)";
                    el.style.background = "rgba(0,0,0,0.06)";
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (!isActive) {
                    el.style.color = "var(--muted)";
                    el.style.background = "transparent";
                  }
                }}
              >{l.label}</a>
            );
          })}
        </nav>

        {/* CTA */}
        <a href="#contact" className="hidden-mobile" style={{
          padding: "9px 22px",
          background: "var(--ink)",
          color: "#fff",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
          transition: "all 0.2s",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#333"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; }}
        >
          {t("Let's Connect", "Liên hệ ngay")}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 8 }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span key={i} style={{ width: 24, height: 1.5, background: "var(--ink)", display: "block" }}
              animate={menuOpen ? (i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 6.5 } : { rotate: -45, y: -6.5 }) : { rotate: 0, y: 0, opacity: 1 }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: 72, left: 0, right: 0,
              background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
              zIndex: 99, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem",
              borderBottom: "1px solid var(--border)"
            }}
          >
            {links.map(l => {
              const isActive = activeSection === l.href.substring(1);
              return (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{ color: isActive ? "#e8a842" : "var(--ink)", textDecoration: "none", fontSize: 24, fontWeight: 500, transition: "color 0.2s" }}>
                  {l.label}
                </a>
              );
            })}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              style={{ color: "var(--amber)", textDecoration: "none", fontSize: 24, fontWeight: 500 }}>
              {t("Let's Connect →", "Liên hệ ngay →")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
