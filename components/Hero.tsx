"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLanguage } from "./useLanguage";

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const heroSection = heroRef.current;
    if (!heroSection) return;

    // Orbit Animation
    let r1Deg = 0;
    let r2Deg = 0;
    let animationFrameId: number;

    const animate = () => {
      r1Deg += 0.08; // degrees per frame
      r2Deg -= 0.05; // degrees per frame (reverse)

      const isMobile = window.innerWidth <= 900;
      const r1 = isMobile ? 150 : 215;
      const r2 = isMobile ? 206.5 : 295;

      const p1 = heroSection.querySelectorAll(".pill-on-ring1");
      p1.forEach((el) => {
        const wrap = el as HTMLElement;
        const base = parseFloat(wrap.dataset.angle || "0");
        const rad = ((base + r1Deg) * Math.PI) / 180;
        const x = r1 * Math.cos(rad);
        const y = r1 * Math.sin(rad);
        wrap.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });

      const p2 = heroSection.querySelectorAll(".pill-on-ring2");
      p2.forEach((el) => {
        const wrap = el as HTMLElement;
        const base = parseFloat(wrap.dataset.angle || "0");
        const rad = ((base + r2Deg) * Math.PI) / 180;
        const x = r2 * Math.cos(rad);
        const y = r2 * Math.sin(rad);
        wrap.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width; // -0.5 to 0.5
      const dy = (e.clientY - cy) / rect.height;

      const layers = heroSection.querySelectorAll(".parallax-layer");
      layers.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const depth = parseFloat(htmlEl.dataset.depth || "0");
        const tx = dx * depth * 60;
        const ty = dy * depth * 60;
        htmlEl.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    };

    const handleMouseLeave = () => {
      const layers = heroSection.querySelectorAll(".parallax-layer");
      layers.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = "translate(0px, 0px)";
      });
    };

    heroSection.addEventListener("mousemove", handleMouseMove);
    heroSection.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      heroSection.removeEventListener("mousemove", handleMouseMove);
      heroSection.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={heroRef} id="home" style={{
      minHeight: "70vh", display: "flex", alignItems: "center",
      padding: "80px 2rem 50px", position: "relative", overflow: "hidden",
      background: "var(--bg)",
    }}>
      {/* Dot grid bg */}
      <div className="hero-dot-grid" />

      {/* Subtle background accents */}
      <div style={{
        position: "absolute", top: "5%", right: "-5%", width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-8%", width: 500, height: 500,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,66,0.06) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <motion.div style={{ y, opacity, width: "100%", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">

          {/* Left: text */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              style={{ display: "flex", width: "fit-content", alignItems: "center", gap: 10, marginBottom: "1rem" }}
            >
              <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <span className="availability-pulse" style={{
                  position: "relative", width: 8, height: 8, borderRadius: "50%",
                  background: "#22c55e", display: "block"
                }} />
              </span>
              <span style={{
                fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
                color: "#16a34a", padding: "6px 14px", border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 999, background: "rgba(34,197,94,0.08)"
              }}>{t("Available for new projects", "Sẵn sàng cho dự án mới")}</span>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{ display: "flex", width: "fit-content", alignItems: "center", marginBottom: "1.5rem" }}
            >
              <span style={{
                fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--ink)", fontFamily: "'Google Sans', sans-serif"
              }}>{t("Hello There!", "Xin chào, mình là")}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(44px, 7vw, 84px)", fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                marginBottom: "1.5rem"
              }}
            >
              Lan <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>Đinh</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ fontSize: 20, color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem", fontWeight: 500, fontFamily: "'Google Sans', sans-serif" }}
            >
              UI/UX & Product Designer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, maxWidth: 460, marginBottom: "2.5rem" }}
            >
              {t(
                "With a foundation in both Graphic Design and UI/UX, and continuously growing as a Product Designer, I create digital products that balance user needs, data insights, and business goals.",
                "Với nền tảng trong cả Graphic Design và UI/UX và đang dần hoàn thiện về kỹ năng của một Product Design, mình thiết kế các sản phẩm số cân bằng giữa nhu cầu người dùng, dữ liệu và mục tiêu kinh doanh."
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}
            >
              <a href="#work" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", background: "var(--ink)", color: "#fff",
                borderRadius: 999, fontSize: 14, fontWeight: 500, textDecoration: "none",
                transition: "all 0.25s"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#333"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; }}
              >
                {t("View My Work", "Xem dự án")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", background: "transparent", color: "var(--ink)",
                border: "1px solid var(--border)",
                borderRadius: 999, fontSize: 14, fontWeight: 400, textDecoration: "none",
                transition: "border-color 0.25s"
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#999"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                {t("Let's Talk", "Trò chuyện")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>


          </div>

          {/* Right: orbit visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-right"
          >
            <div className="orbit-wrap">
              {/* Glow */}
              <div className="orbit-glow" />

              {/* Orbit rings */}
              <div className="orbit-ring orbit-ring-1" />
              <div className="orbit-ring orbit-ring-2" />

              {/* Portrait */}
              <div className="portrait-circle">
                <img src="/portrait.png" alt="Maya Chen" />
              </div>

              {/* Pills — positioned via JS on orbit paths */}
              {/* Inner orbit pills (ring-1) */}
              <div className="orbit-pill-wrap pill-on-ring1" data-angle="320">
                <div className="orbit-pill pill-designer parallax-layer" data-depth="0.08">
                  <span className="pill-dot" />{t("Product Designer", "Thiết kế Sản phẩm")}
                </div>
              </div>
              <div className="orbit-pill-wrap pill-on-ring1" data-angle="140">
                <div className="orbit-pill pill-systems parallax-layer" data-depth="0.08">
                  <span className="pill-dot" />{t("Systems Thinker", "Tư duy Hệ thống")}
                </div>
              </div>

              {/* Outer orbit pills (ring-2) */}
              <div className="orbit-pill-wrap pill-on-ring2" data-angle="50">
                <div className="orbit-pill pill-researcher parallax-layer" data-depth="0.12">
                  <span className="pill-dot" />{t("User Researcher", "Nghiên cứu Người dùng")}
                </div>
              </div>
              <div className="orbit-pill-wrap pill-on-ring2" data-angle="230">
                <div className="orbit-pill pill-strategist parallax-layer" data-depth="0.12">
                  <span className="pill-dot" />{t("UX Strategist", "Chiến lược UX")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        .hero-dot-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(circle at 18px 18px, rgba(0, 0, 0, 0.14) 1.2px, transparent 1.2px),
            radial-gradient(circle at 54px 54px, rgba(0, 0, 0, 0.14) 1.2px, transparent 1.2px),
            radial-gradient(circle at 54px 18px, rgba(0, 0, 0, 0.06) 1.2px, transparent 1.2px),
            radial-gradient(circle at 18px 54px, rgba(0, 0, 0, 0.06) 1.2px, transparent 1.2px),
            linear-gradient(to right, rgba(0, 0, 0, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.015) 1px, transparent 1px);
          background-size: 72px 72px, 72px 72px, 72px 72px, 72px 72px, 36px 36px, 36px 36px;
          background-position: 0 0, 0 0, 0 0, 0 0, 18px 0, 0 18px;
          -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 80%);
          mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 80%);
        }

        /* Right — orbit visual */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 680px;
        }
        .orbit-wrap {
          position: relative;
          width: 660px;
          height: 660px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Portrait */
        .portrait-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 340px;
          height: 340px;
          border-radius: 50%;
          overflow: hidden;
          z-index: 5;
          border: 3px solid rgba(230, 230, 230, 0.08);
          box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.02), 0 24px 70px rgba(0, 0, 0, 0.12);
        }
        .portrait-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(10%) contrast(1.05);
        }

        /* Orbits */
        .orbit-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform-origin: center center;
          transform: translate(-50%, -50%);
        }
        .orbit-ring-1 {
          width: 400px;
          height: 400px;
          animation: orbit-spin 80s linear infinite;
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='50%25' cy='50%25' r='49.5%25' fill='none' stroke='rgba(0, 0, 0, 0.08)' stroke-width='1.5' stroke-dasharray='6 10'/%3e%3c/svg%3e");
        }
        .orbit-ring-2 {
          width: 500px;
          height: 500px;
          animation: orbit-spin 120s linear infinite reverse;
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='50%25' cy='50%25' r='49.5%25' fill='none' stroke='rgba(0, 0, 0, 0.08)' stroke-width='1.5' stroke-dasharray='6 10'/%3e%3c/svg%3e");
        }
        @keyframes orbit-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        /* Pills on orbit */
        .orbit-pill-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 10;
          pointer-events: none;
        }
        .orbit-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          pointer-events: auto;
        }
        .pill-designer {
          background: rgba(109, 40, 217, 0.06);
          color: #6d28d9;
          border-color: rgba(109, 40, 217, 0.15);
        }
        .pill-researcher {
          background: rgba(29, 78, 216, 0.06);
          color: #1d4ed8;
          border-color: rgba(29, 78, 216, 0.15);
        }
        .pill-systems {
          background: rgba(4, 120, 87, 0.06);
          color: #047857;
          border-color: rgba(4, 120, 87, 0.15);
        }
        .pill-strategist {
          background: rgba(180, 83, 9, 0.06);
          color: #b45309;
          border-color: rgba(180, 83, 9, 0.15);
        }
        .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .pill-designer .pill-dot {
          background: #7c3aed;
        }
        .pill-researcher .pill-dot {
          background: #2563eb;
        }
        .pill-systems .pill-dot {
          background: #10b981;
        }
        .pill-strategist .pill-dot {
          background: #f59e0b;
        }

        /* Glow behind orbit */
        .orbit-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(124, 92, 252, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }

        /* Parallax wrapper */
        .parallax-layer {
          transition: transform 0.1s linear;
          will-change: transform;
        }

        @media (max-width: 900px) {
          .orbit-wrap {
            width: 462px;
            height: 462px;
          }
          .orbit-ring-1 {
            width: 300px;
            height: 300px;
          }
          .orbit-ring-2 {
            width: 413px;
            height: 413px;
          }
          .portrait-circle {
            width: 238px;
            height: 238px;
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

