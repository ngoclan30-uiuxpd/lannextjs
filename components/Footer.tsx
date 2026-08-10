"use client";
import { useLanguage } from "./useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      padding: "2.5rem",
      borderTop: "1px solid var(--border)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "1rem",
      background: "var(--bg)",
    }}>
      <div style={{ fontSize: 13, color: "var(--muted)" }}>
        © 2026 Lan Đinh · {t("Designed & built with care.", "Được thiết kế & hoàn thiện với sự tận tâm.")}
      </div>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "rgba(0,0,0,0.2)" }}>
          Next.js · TypeScript · Framer Motion · AntiGravity
        </span>
        <a href="#home" style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "var(--bg-secondary)", border: "1px solid var(--card-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", color: "var(--ink)", transition: "border-color 0.2s"
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--card-border)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
