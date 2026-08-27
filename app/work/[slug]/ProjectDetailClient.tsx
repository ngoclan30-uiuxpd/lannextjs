"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { getProjectBySlug, getAdjacentProjects, translateProject } from "@/lib/projects";
import { useLanguage } from "../../../components/useLanguage";

function AnimatedStatNumber({ value, decimals = 0, prefix = "", suffix = "K+" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;
    const end = value;
    const duration = 1600;
    const frameTime = 1000 / 60;
    const totalFrames = Math.round(duration / frameTime);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(2, -10 * progress);
      const current = end * easeProgress;

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(current);
      }
    }, frameTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const { lang, t } = useLanguage();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("https://apps.apple.com/vn/app/quà-tặng-vip/id1589555369");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor || (window as { opera?: string }).opera;
      if (userAgent && /android/i.test(userAgent)) {
        setDownloadUrl("https://play.google.com/store/apps/details?id=mwg.tgdd.loyalty");
      }
    }
  }, []);
  const rawProject = getProjectBySlug(slug)!;
  const { prev: rawPrev, next: rawNext } = getAdjacentProjects(slug);
  const project = translateProject(rawProject, lang);
  const prev = rawPrev ? translateProject(rawPrev, lang) : null;
  const next = rawNext ? translateProject(rawNext, lang) : null;

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const challengeRef = useRef<HTMLDivElement>(null);
  const challengeInView = useInView(challengeRef, { once: true, margin: "-10%" });
  const approachRef = useRef<HTMLDivElement>(null);
  const approachInView = useInView(approachRef, { once: true, margin: "-10%" });
  const resultsRef = useRef<HTMLDivElement>(null);
  const resultsInView = useInView(resultsRef, { once: true, margin: "-10%" });
  const decisionsRef = useRef<HTMLDivElement>(null);
  const decisionsInView = useInView(decisionsRef, { once: true, margin: "-10%" });
  const outcomeRef = useRef<HTMLDivElement>(null);
  const outcomeInView = useInView(outcomeRef, { once: true, margin: "-10%" });
  const reflectionRef = useRef<HTMLDivElement>(null);
  const reflectionInView = useInView(reflectionRef, { once: true, margin: "-10%" });
  const navRef = useRef<HTMLDivElement>(null);
  const navInView = useInView(navRef, { once: true, margin: "-10%" });

  const fadeUp = (inView: boolean, delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const parseInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} style={{ fontWeight: 600, color: "var(--paper)" }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (match) {
          const label = match[1];
          const url = match[2];
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--amber, #E8A842)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 500,
                transition: "opacity 0.2s, color 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 4
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {label}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          );
        }
      }
      return part;
    });
  };

  const renderContent = (text: string) => {
    return text.split("\n").filter(Boolean).map((para, idx) => {
      const trimmed = para.trim();
      if (trimmed === "---") {
        return (
          <hr key={idx} style={{ border: "none", borderTop: "1px solid rgba(226,222,216,0.1)", margin: "2rem 0" }} />
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} style={{
            fontFamily: "'Google Sans', sans-serif",
            fontSize: 20,
            fontWeight: 600,
            color: "var(--paper)",
            marginTop: "1.8rem",
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
          }}>
            {trimmed.replace(/^###\s+/, "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h4 key={idx} style={{
            fontFamily: "'Google Sans', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--paper)",
            marginTop: "0.6rem",
            marginBottom: "0.4rem",
            lineHeight: 1.4,
          }}>
            {trimmed.replace(/^####\s+/, "")}
          </h4>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        return (
          <div key={idx} style={{ display: "flex", alignItems: "start", gap: 10, marginBottom: "0.4rem", paddingLeft: "0.5rem" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--muted)", flexShrink: 0, marginTop: "0.6rem" }} />
            <span style={{ fontSize: 16, color: "#c1c1c1", lineHeight: 1.6 }}>
              {parseInlineBold(trimmed.replace(/^[-•]\s+/, ""))}
            </span>
          </div>
        );
      }
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return (
          <p key={idx} style={{ fontSize: 16, fontWeight: 600, color: "#c1c1c1", lineHeight: 1.6, marginTop: "1.2rem", marginBottom: "0.8rem" }}>
            {parseInlineBold(trimmed.slice(2, -2))}
          </p>
        );
      }
      if (trimmed.startsWith("![") && trimmed.includes("](") && trimmed.endsWith(")")) {
        const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (match) {
          const caption = match[1];
          const url = match[2];
          return (
            <div key={idx} style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(226,222,216,0.08)" }}>
                <img
                  src={url}
                  alt={caption || "Decision Illustration"}
                  style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in", transition: "transform 0.3s ease" }}
                  onClick={() => setActiveImage(url)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            </div>
          );
        }
      }
      return (
        <p key={idx} style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.8rem" }}>
          {parseInlineBold(trimmed)}
        </p>
      );
    });
  };

  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", "--muted": "#c1c1c1" } as React.CSSProperties}>
      {/* Fixed nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(226,222,216,0.08)"
      }}>
        <Link href="/#work" style={{
          display: "flex", alignItems: "center", gap: 10, textDecoration: "none",
          color: "var(--paper)", fontSize: 14, transition: "color 0.2s"
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--amber)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--paper)")}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("Back to Work", "Quay lại danh sách")}
        </Link>
        <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "'Google Sans', sans-serif" }}>
          {project.company} · {project.year}
        </span>
      </div>

      {/* Hero Header */}
      <div style={{ paddingTop: 140, paddingBottom: 60, borderBottom: "1px solid rgba(226,222,216,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
          <motion.div ref={heroRef} {...fadeUp(heroInView)}>


            <h1 style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 500,
              color: "var(--paper)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1rem",
            }}>
              {project.title}
            </h1>

            {renderContent(project.description)}

            {/* Project Metadata Block */}
            {(() => {
              const metaMap: Record<string, { role: string; scope: string; timeline: string; team: string }> = {
                "redesign-home": {
                  role: "UI/UX Designer",
                  scope: "Information Architecture · UX Flow · Wireframing · UI Design · Component Design",
                  timeline: "2025",
                  team: lang === "vi" ? "MWG Product Team (2 Designers, 4 Engineers, 1 PM, 1 Researcher)" : "MWG Product Team (2 Designers, 4 Engineers, 1 PM, 1 Researcher)",
                },
                "comparison": {
                  role: "UI/UX Designer",
                  scope: "Information Architecture · UX Flow · Wireframing · UI Design · Component Design",
                  timeline: "2025",
                  team: lang === "vi" ? "MWG Product Team (2 Designers, 3 Engineers, 1 PM, 1 BA)" : "MWG Product Team (2 Designers, 3 Engineers, 1 PM, 1 BA)",
                },
                "private-offer": {
                  role: "UI/UX Designer",
                  scope: "Information Architecture · UX Flow · Wireframing · UI Design · Component Design",
                  timeline: "2025",
                  team: lang === "vi" ? "MWG Product Team (1 Designer, 3 Engineers, 1 PM, 1 BA)" : "MWG Product Team (1 Designer, 3 Engineers, 1 PM, 1 BA)",
                },
                "flash-sale": {
                  role: "UI/UX Designer",
                  scope: "Information Architecture · UX Flow · Wireframing · UI Design · Component Design",
                  timeline: "2025",
                  team: lang === "vi" ? "MWG Product Team (2 Designers, 3 Engineers, 1 PM, 1 Researcher)" : "MWG Product Team (2 Designers, 3 Engineers, 1 PM, 1 Researcher)",
                },
              };

              const meta = metaMap[slug] || {
                role: "UI/UX Designer",
                scope: "Information Architecture · UX Flow · Wireframing · UI Design · Component Design",
                timeline: "2025",
                team: "MWG Product Team",
              };

              return (
                <div style={{
                  marginTop: "1.75rem",
                  paddingLeft: "1.25rem",
                  borderLeft: "3px solid rgba(226, 222, 216, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  fontFamily: "'Google Sans', sans-serif"
                }}>
                  <div>
                    <strong style={{ color: "var(--paper)", fontWeight: 600 }}>Role: </strong>
                    <span>{meta.role}</span>
                  </div>
                  <div>
                    <strong style={{ color: "var(--paper)", fontWeight: 600 }}>Scope: </strong>
                    <span>{meta.scope}</span>
                  </div>
                  <div>
                    <strong style={{ color: "var(--paper)", fontWeight: 600 }}>Timeline: </strong>
                    <span>{meta.timeline}</span>
                  </div>
                  <div>
                    <strong style={{ color: "var(--paper)", fontWeight: 600 }}>Team: </strong>
                    <span>{meta.team}</span>
                  </div>
                </div>
              );
            })()}

            {slug === "redesign-home" && (
              <div
                style={{
                  marginTop: "2.5rem",
                  background: "rgba(226, 222, 216, 0.02)",
                  border: "1px solid rgba(226,222,216,0.06)",
                  borderRadius: 16,
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
                className="app-experience-card"
              >
                {/* Left Section: Icon + Text */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: "1 1 300px" }}>
                  <img
                    src="/logo-mua-sam.png"
                    alt="Quà Tặng VIP Logo"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 14,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      flexShrink: 0,
                      objectFit: "contain"
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--paper)", margin: 0 }}>
                      {t("Experience the Real Product", "Trải nghiệm sản phẩm thực tế")}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 0 0", lineHeight: 1.4 }}>
                      {t(
                        "Download the Quà Tặng VIP app and enter the Shopping section to explore MWG Shop.",
                        "Tải ứng dụng Quà Tặng VIP và vào mục Mua sắm để khám phá MWG Shop."
                      )}
                    </p>
                  </div>
                </div>

                {/* Middle Section: QR Code */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{
                    background: "#fff",
                    padding: 6,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}>
                    <img
                      src="/image-1787.png"
                      alt="QR Code"
                      style={{ width: 64, height: 64, display: "block" }}
                    />
                  </div>
                </div>

                {/* Right Section: Button + Info */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }} className="download-btn-section">
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "var(--accent-purple)",
                      color: "#fff",
                      borderRadius: 10,
                      padding: "10px 20px",
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "all 0.2s",
                      boxShadow: "0 4px 12px rgba(var(--accent-purple-rgb), 0.2)"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    {t("Download Quà Tặng VIP", "Tải Quà Tặng VIP")}
                  </a>
                  <span style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", maxWidth: 180, lineHeight: 1.3 }}>
                    {t(
                      "After downloading, open the Shopping section in the navigation bar.",
                      "Sau khi tải ứng dụng, mở mục Mua sắm ở thanh điều hướng."
                    )}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 2rem 6rem" }}>
        {/* Context */}
        <motion.div ref={challengeRef} {...fadeUp(challengeInView)} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `${project.accent}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
            }}>01</div>
            <h2 style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
            }}>{t("Context", "Bối cảnh")}</h2>
          </div>
          {renderContent(project.challenge)}
          {project.challengeImage && project.slug !== "private-offer" && (
            <div style={{ marginTop: "2rem", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(226,222,216,0.08)" }}>
              <img
                src={project.challengeImage}
                alt="Challenge Illustration"
                style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in", transition: "transform 0.3s ease" }}
                onClick={() => setActiveImage(project.challengeImage!)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          )}

          {/* My Role Block */}
          {(() => {
            const roleDescMap: Record<string, { en: string; vi: string }> = {
              "redesign-home": {
                en: "I translated business requirements into the homepage experience, working across information hierarchy, UX flows, wireframes, UI design and reusable components.",
                vi: "Tôi chuyển đổi các yêu cầu kinh doanh thành trải nghiệm trang chủ, đảm nhiệm từ kiến trúc thông tin, luồng UX, wireframe, thiết kế UI đến các thành phần tái sử dụng.",
              },
              "comparison": {
                en: "I led the end-to-end design for product comparison and smart labeling, defining interaction flows, UI specs, and integration patterns across category and detail pages.",
                vi: "Tôi đảm nhiệm thiết kế toàn bộ tính năng so sánh sản phẩm và nhãn thông minh, xây dựng luồng tương tác, thông số UI và tích hợp trên các trang ngành hàng và chi tiết sản phẩm.",
              },
              "private-offer": {
                en: "I designed the end-to-end Private Offer shopping journey, mapping complex business rules into intuitive UI states across Product Detail, Cart, and Checkout.",
                vi: "Tôi thiết kế hành trình mua sắm Ưu đãi riêng từ đầu đến cuối, chuyển hóa các quy tắc kinh doanh phức tạp thành các trạng thái giao diện trực quan từ Trang chi tiết, Giỏ hàng đến Thanh toán.",
              },
              "flash-sale": {
                en: "I optimized the Flash Sale landing page experience, prioritizing featured deals, sticky navigation, and real-time urgency cues to improve purchase decision speed.",
                vi: "Tôi tối ưu hóa trải nghiệm landing page Flash Sale, ưu tiên các deal nổi bật, thanh điều hướng cố định và chỉ báo mức độ khẩn cấp theo thời gian thực để giúp người dùng ra quyết định mua sắm nhanh hơn.",
              },
            };

            const roleData = roleDescMap[slug] || roleDescMap["redesign-home"];

            return (
              <div style={{
                marginTop: "2rem",
                paddingLeft: "1.25rem",
                borderLeft: "3px solid rgba(226, 222, 216, 0.35)",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                fontFamily: "'Google Sans', sans-serif"
              }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--paper)", margin: 0 }}>
                  {t("My role", "Vai trò của tôi")}
                </h4>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
                  {lang === "vi" ? roleData.vi : roleData.en}
                </p>
              </div>
            );
          })()}

          {/* The Homepage at Scale Metric Card Block */}
          {slug === "redesign-home" && (
            <div style={{
              marginTop: "2.5rem",
              background: "rgba(226, 222, 216, 0.02)",
              border: "1px solid rgba(226, 222, 216, 0.08)",
              borderRadius: 20,
              padding: "2rem",
              fontFamily: "'Google Sans', sans-serif",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
            }}>
              {/* Card Header */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--paper)",
                  margin: 0,
                  letterSpacing: "-0.01em"
                }}>
                  The Homepage at Scale
                </h3>
                <p style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  margin: "6px 0 0 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexWrap: "wrap"
                }}>
                  <span>May 01 – Aug 06, 2026</span>
                  <span>|</span>
                  <span>Data from MWG Shop app report</span>
                </p>
              </div>

              {/* Metrics Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.5rem",
                alignItems: "flex-start"
              }}>
                {/* Metric 1 */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1rem 0.5rem"
                }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(232, 168, 66, 0.12)",
                    color: "rgb(232, 168, 66)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <div style={{
                    fontSize: "clamp(28px, 3.5vw, 36px)",
                    fontWeight: 700,
                    color: "rgb(232, 168, 66)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1
                  }}>
                    <AnimatedStatNumber value={221} suffix="K+" />
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--paper)",
                    marginTop: "0.6rem",
                    marginBottom: "0.3rem"
                  }}>
                    Homepage sessions
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    lineHeight: 1.4,
                    maxWidth: 170
                  }}>
                    {lang === "vi" ? "Một trong những điểm truy cập chính" : "One of the most trafficked entry points"}
                  </div>
                </div>

                {/* Metric 2 */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1rem 0.5rem"
                }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(232, 168, 66, 0.12)",
                    color: "rgb(232, 168, 66)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                  </div>
                  <div style={{
                    fontSize: "clamp(28px, 3.5vw, 36px)",
                    fontWeight: 700,
                    color: "rgb(232, 168, 66)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1
                  }}>
                    <AnimatedStatNumber value={215} suffix="K+" />
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--paper)",
                    marginTop: "0.6rem",
                    marginBottom: "0.3rem"
                  }}>
                    Homepage Recommendation
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    lineHeight: 1.4,
                    maxWidth: 170
                  }}>
                    {lang === "vi" ? "Khu vực gợi ý sản phẩm lưu lượng cao" : "High-volume product discovery surface"}
                  </div>
                </div>

                {/* Metric 3 */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1rem 0.5rem"
                }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(232, 168, 66, 0.12)",
                    color: "rgb(232, 168, 66)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div style={{
                    fontSize: "clamp(28px, 3.5vw, 36px)",
                    fontWeight: 700,
                    color: "rgb(232, 168, 66)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1
                  }}>
                    <AnimatedStatNumber value={193} suffix="K+" />
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--paper)",
                    marginTop: "0.6rem",
                    marginBottom: "0.3rem"
                  }}>
                    Flash Sale
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    lineHeight: 1.4,
                    maxWidth: 170
                  }}>
                    {lang === "vi" ? "Khu vực ưu đãi lưu lượng cao" : "High-volume promotional surface"}
                  </div>
                </div>

                {/* Metric 4 */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1rem 0.5rem"
                }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "rgba(232, 168, 66, 0.12)",
                    color: "rgb(232, 168, 66)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem"
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <div style={{
                    fontSize: "clamp(28px, 3.5vw, 36px)",
                    fontWeight: 700,
                    color: "rgb(232, 168, 66)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1
                  }}>
                    <AnimatedStatNumber value={76} suffix="K+" />
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--paper)",
                    marginTop: "0.6rem",
                    marginBottom: "0.3rem"
                  }}>
                    Product Detail
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    lineHeight: 1.4,
                    maxWidth: 170
                  }}>
                    {lang === "vi" ? "Bước cốt lõi trong hành trình mua sắm" : "Core step in the shopping journey"}
                  </div>
                </div>
              </div>

              {/* Analysis Summary Note Block */}
              <div style={{
                marginTop: "1.75rem",
                paddingLeft: "1.25rem",
                borderLeft: "3px solid rgba(226, 222, 216, 0.35)",
                fontFamily: "'Google Sans', sans-serif"
              }}>
                <p style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0
                }}>
                  {lang === "vi"
                    ? "Trong khoảng thời gian phân tích, trang chủ đã ghi nhận hơn 221K+ phiên truy cập, trong khi khu vực Gợi ý và Flash Sale cũng là những bề mặt có lưu lượng truy cập lớn. Điều này khẳng định trang chủ vừa là nơi khám phá sản phẩm, vừa là không gian thương mại chính — khiến cho cấu trúc thứ bậc thông tin và việc tổ chức nội dung trở nên sống còn đối với trải nghiệm người dùng."
                    : "During the analyzed period, the homepage recorded 221K+ sessions, while Recommendation and Flash Sale were also high-volume surfaces. This highlighted the homepage as both a product-discovery and commercial surface — making information hierarchy and content organization critical to the experience."}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Challenge */}
        <motion.div ref={approachRef} {...fadeUp(approachInView)} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `${project.accent}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
            }}>02</div>
            <h2 style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
            }}>{t("The Challenge", "Bài toán")}</h2>
          </div>
          {renderContent(project.approach)}
          {project.approachImage && project.slug !== "private-offer" && (
            <div style={{ marginTop: "2rem", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(226,222,216,0.08)" }}>
              <img
                src={project.approachImage}
                alt="Challenge Illustration"
                style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in", transition: "transform 0.3s ease" }}
                onClick={() => setActiveImage(project.approachImage!)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          )}
        </motion.div>

        {/* From Requirements to Design */}
        {slug === "redesign-home" && (
          <motion.div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${project.accent}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
              }}>03</div>
              <h2 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>
                {t("From Requirements to Design", "Từ yêu cầu đến thiết kế")}
              </h2>
            </div>

            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
              {t(
                "I translated business and product requirements into a clear design direction to solve the key challenges of the homepage.",
                "Tôi chuyển đổi các yêu cầu kinh doanh và sản phẩm thành một hướng đi thiết kế rõ ràng nhằm giải quyết các thách thức cốt lõi của trang chủ."
              )}
            </p>

            {/* Flowchart Card Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {/* Row 1: Business Requirements */}
              <div className="flow-card-row" style={{
                background: "rgba(226, 222, 216, 0.02)",
                border: "1px solid rgba(226, 222, 216, 0.08)",
                borderRadius: 16,
                padding: "1.25rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "220px 1fr 280px",
                gap: "1.5rem",
                alignItems: "center"
              }}>
                {/* Left Badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(167, 139, 250, 0.12)",
                  border: "1px solid rgba(167, 139, 250, 0.2)",
                  padding: "0.75rem 1rem",
                  borderRadius: 12,
                  color: "#a78bfa"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t("Business requirements", "Yêu cầu kinh doanh")}</span>
                </div>

                {/* Middle Items */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12A10 10 0 0 0 12 2v10z"/><path d="M12 12L2.1 14.9A10 10 0 0 0 12 22v-10z"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Campaigns", "Chiến dịch")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Flash Sale", "Flash Sale")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="9" y1="12" x2="15" y2="12"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Vouchers", "Mã giảm giá")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8l2.5 5h-5z"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Recommendations", "Gợi ý sản phẩm")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Product discovery", "Khám phá sản phẩm")}</span>
                  </div>
                </div>

                {/* Right Description */}
                <div style={{ borderLeft: "1px solid rgba(226, 222, 216, 0.08)", paddingLeft: "1.25rem" }}>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                    {t(
                      "Multiple business objectives and content types needed to coexist on the same surface.",
                      "Nhiều mục tiêu kinh doanh và loại nội dung khác nhau cần đồng thời xuất hiện trên cùng một trang."
                    )}
                  </p>
                </div>
              </div>

              {/* Arrow Down */}
              <div style={{ display: "flex", justifyContent: "center", padding: "0.2rem 0", color: "rgba(226, 222, 216, 0.3)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>

              {/* Row 2: Design Challenges */}
              <div className="flow-card-row" style={{
                background: "rgba(226, 222, 216, 0.02)",
                border: "1px solid rgba(226, 222, 216, 0.08)",
                borderRadius: 16,
                padding: "1.25rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "220px 1fr 280px",
                gap: "1.5rem",
                alignItems: "center"
              }}>
                {/* Left Badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  padding: "0.75rem 1rem",
                  borderRadius: 12,
                  color: "#f59e0b"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t("Design challenges", "Thách thức thiết kế")}</span>
                </div>

                {/* Middle Items */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="16" height="12" rx="2"/><rect x="6" y="8" width="16" height="12" rx="2"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Content competition", "Cạnh tranh nội dung")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M18 12h4"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Information hierarchy", "Thứ bậc thông tin")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Campaign scalability", "Khả năng mở rộng")}</span>
                  </div>
                </div>

                {/* Right Description */}
                <div style={{ borderLeft: "1px solid rgba(226, 222, 216, 0.08)", paddingLeft: "1.25rem" }}>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                    {t(
                      "Too many competing elements made the homepage complex, hard to navigate and difficult to scale.",
                      "Quá nhiều yếu tố cạnh tranh khiến trang chủ trở nên phức tạp, khó điều hướng và khó mở rộng."
                    )}
                  </p>
                </div>
              </div>

              {/* Arrow Down */}
              <div style={{ display: "flex", justifyContent: "center", padding: "0.2rem 0", color: "rgba(226, 222, 216, 0.3)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>

              {/* Row 3: UX Focus */}
              <div className="flow-card-row" style={{
                background: "rgba(226, 222, 216, 0.02)",
                border: "1px solid rgba(226, 222, 216, 0.08)",
                borderRadius: 16,
                padding: "1.25rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "220px 1fr 280px",
                gap: "1.5rem",
                alignItems: "center"
              }}>
                {/* Left Badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  padding: "0.75rem 1rem",
                  borderRadius: 12,
                  color: "#10b981"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t("UX focus", "Trọng tâm UX")}</span>
                </div>

                {/* Middle Items */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="3" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="15" y="17" width="6" height="4" rx="1"/><path d="M12 7v6M6 13h12v4"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Information architecture", "Kiến trúc thông tin")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Shopping flow", "Luồng mua sắm")}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--paper)", fontWeight: 500 }}>{t("Reusable patterns", "Mẫu tái sử dụng")}</span>
                  </div>
                </div>

                {/* Right Description */}
                <div style={{ borderLeft: "1px solid rgba(226, 222, 216, 0.08)", paddingLeft: "1.25rem" }}>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                    {t(
                      "Focus on structuring information, connecting key shopping flows and building reusable patterns for consistency.",
                      "Tập trung tái cấu trúc thông tin, kết nối các luồng mua sắm cốt lõi và xây dựng mẫu thiết kế tái sử dụng."
                    )}
                  </p>
                </div>
              </div>

              {/* Arrow Down */}
              <div style={{ display: "flex", justifyContent: "center", padding: "0.2rem 0", color: "rgba(226, 222, 216, 0.3)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>

              {/* Row 4: Design Solution */}
              <div className="flow-card-row" style={{
                background: "rgba(226, 222, 216, 0.02)",
                border: "1px solid rgba(226, 222, 216, 0.08)",
                borderRadius: 16,
                padding: "1.25rem 1.5rem",
                display: "grid",
                gridTemplateColumns: "220px 1fr 280px",
                gap: "1.5rem",
                alignItems: "center"
              }}>
                {/* Left Badge */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(59, 130, 246, 0.12)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  padding: "0.75rem 1rem",
                  borderRadius: 12,
                  color: "#3b82f6"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-1.81l-1.98-1.98s-1.1.08-1.81.79z"/>
                    <path d="M15 8s-4-4-7-1c-2.22 2.22-1.56 6.32-1.56 6.32l4.24 4.24s4.1-1.34 6.32-3.56c3-3-1-7-1-7z"/>
                    <path d="M15 8l4.24-4.24a2.12 2.12 0 1 1 3 3L18 11"/>
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t("Design solution", "Giải pháp thiết kế")}</span>
                </div>

                {/* Middle Solution Card */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: "var(--paper)", margin: 0 }}>
                      {t("A more structured homepage system", "Hệ thống trang chủ có cấu trúc rõ ràng")}
                    </h4>
                    <p style={{ fontSize: 12, color: "var(--muted)", margin: "3px 0 0 0" }}>
                      {t(
                        "Clear hierarchy · Seamless shopping flows · Scalable modules",
                        "Thứ bậc rõ ràng · Luồng mua sắm mượt mà · Mô-đun mở rộng"
                      )}
                    </p>
                  </div>
                </div>

                {/* Right Description */}
                <div style={{ borderLeft: "1px solid rgba(226, 222, 216, 0.08)", paddingLeft: "1.25rem" }}>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
                    {t(
                      "A homepage that balances product discovery and business campaigns without overwhelming users.",
                      "Trang chủ cân bằng giữa khám phá sản phẩm và các chiến dịch kinh doanh mà không làm người dùng bị quá tải."
                    )}
                  </p>
                </div>
              </div>

              {/* Quote Box at Bottom */}
              <div style={{
                marginTop: "1.5rem",
                background: "rgba(167, 139, 250, 0.05)",
                border: "1px solid rgba(167, 139, 250, 0.15)",
                borderRadius: 16,
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem"
              }}>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#a78bfa",
                  fontFamily: "serif",
                  lineHeight: 1,
                  flexShrink: 0
                }}>
                  “
                </div>
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--paper)",
                  margin: 0,
                  fontStyle: "italic"
                }}>
                  {t(
                    "Rather than treating each campaign as an individual UI problem, I translated the requirements into a broader information and interaction structure for the homepage.",
                    "Thay vì xử lý từng chiến dịch như một bài toán giao diện đơn lẻ, tôi đã chuyển đổi các yêu cầu thành một cấu trúc thông tin và tương tác toàn diện hơn cho trang chủ."
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Design Principles */}
        <motion.div ref={resultsRef} {...fadeUp(resultsInView)} style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `${project.accent}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
            }}>04</div>
            <h2 style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
            }}>{t("Design Principles", "Nguyên tắc thiết kế")}</h2>
          </div>
          {project.slug === "flash-sale" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                {lang === "vi"
                  ? "Thay vì thiết kế lại toàn bộ Landing Page, mình lựa chọn tối ưu các điểm ảnh hưởng trực tiếp đến hành trình mua hàng.\n\nChiến lược tối ưu được dẫn dắt bởi bốn nguyên tắc:"
                  : "Instead of redesigning the entire landing page, I focused on improving the touchpoints that had the greatest impact on the shopping journey.\n\nThe design strategy was guided by four principles:"}
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginTop: "1rem" }}>
                {[
                  {
                    icon: "/projects/1.png",
                    title: lang === "vi" ? "Ưu tiên các deal quan trọng" : "Prioritize featured deals",
                    desc: lang === "vi" 
                      ? "Thiết kế khu vực Top Deal hiển thị 10 sản phẩm đầu tiên theo danh sách Flash Sale, giúp người dùng tiếp cận các ưu đãi nổi bật ngay khi mở trang."
                      : "Designed a dedicated Top Deal section to showcase the first 10 Flash Sale products, allowing users to discover the best offers immediately after entering the page."
                  },
                  {
                    icon: "/projects/2.png",
                    title: lang === "vi" ? "Giảm chi phí điều hướng" : "Reduce navigation effort",
                    desc: lang === "vi"
                      ? "Giữ cố định Header, Countdown và Tab Filter khi cuộn, đồng thời bổ sung bộ lọc theo giá và danh mục để người dùng tìm đúng sản phẩm nhanh hơn."
                      : "Introduced a sticky Header, Countdown, and Category Tabs, along with price and category filters, so users could browse and refine products without repeatedly scrolling back to the top."
                  },
                  {
                    icon: "/projects/3.png",
                    title: lang === "vi" ? "Tăng cảm giác khẩn cấp" : "Create a stronger sense of urgency",
                    desc: lang === "vi"
                      ? "Hiển thị Countdown theo Server Time cùng các trạng thái tồn kho như Mua ngay, Sắp hết, Còn lại x sản phẩm và Hết suất, giúp người dùng dễ dàng nhận biết mức độ khan hiếm của sản phẩm."
                      : "Displayed a server-based countdown timer together with inventory states such as Buy Now, Running Low, Only X Left, and Sold Out, helping users quickly understand product availability and encouraging faster purchase decisions."
                  },
                  {
                    icon: "/projects/4.png",
                    title: lang === "vi" ? "Giữ danh sách luôn hữu ích" : "Keep the product list relevant",
                    desc: lang === "vi"
                      ? "Đối với sản phẩm hết suất, thiết kế chuyển toàn bộ thẻ sang màu xám, hiển thị trạng thái \"Hết suất\" và tự động đưa xuống cuối danh sách để ưu tiên các sản phẩm còn khả dụng."
                      : "For sold-out products, I designed a dedicated visual state by grayscaling the product card, displaying a Sold Out badge, and automatically moving those items to the end of the list to prioritize products that were still available."
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        objectFit: "contain",
                        flexShrink: 0
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <h4 style={{
                        fontFamily: "'Google Sans', sans-serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--paper)",
                        margin: 0
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        fontSize: 15,
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : project.slug === "private-offer" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                {lang === "vi"
                  ? "Thay vì chỉ thiết kế từng màn hình riêng lẻ, mình tiếp cận theo End-to-End Shopping Experience, tập trung vào toàn bộ hành trình mua hàng.\n\nQuá trình thiết kế gồm bốn bước:"
                  : "Instead of designing isolated screens, I approached this project from an End-to-End Shopping Experience perspective.\n\nThe optimization was structured in four phases:"}
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginTop: "1rem" }}>
                {[
                  {
                    icon: "/projects/pj3-1.png",
                    title: lang === "vi" ? "Hiểu Business Rule" : "Understand business rules",
                    desc: lang === "vi"
                      ? "Làm việc cùng PO và BA để tổng hợp toàn bộ rule của chương trình: giới hạn suất, giới hạn số lượng theo khách hàng, quy tắc Voucher, hành vi khi hết suất, các exception trong Cart và Checkout."
                      : "Worked closely with Product Owner and Business Analyst to understand all promotion rules, including promotional quota, purchase limit, voucher restriction, out-of-stock behavior, and cart/checkout exceptions."
                  },
                  {
                    icon: "/projects/pj3-2.png",
                    title: lang === "vi" ? "Mapping toàn bộ User Flow" : "Map the complete shopping journey",
                    desc: lang === "vi"
                      ? "Xác định các điểm người dùng cần được thông báo hoặc hỗ trợ quyết định: Landing Page, Product Listing, Product Detail, Add to Cart, Cart, Checkout. Điều này giúp đảm bảo thông tin luôn nhất quán trong toàn bộ trải nghiệm."
                      : "Identified every touchpoint where customers need guidance or confirmation: Landing Page, Product Listing, Product Detail, Add to Cart, Cart, and Checkout. This ensured a consistent experience across the entire purchase flow."
                  },
                  {
                    icon: "/projects/pj3-3.png",
                    title: lang === "vi" ? "Thiết kế theo trạng thái (State-driven Design)" : "Design for multiple states",
                    desc: lang === "vi"
                      ? "Thay vì chỉ thiết kế happy path, mình xây dựng đầy đủ các trạng thái: còn nhiều suất, sắp hết suất, hết suất, vượt giới hạn mua, có Voucher, đơn hàng hỗn hợp, sản phẩm có nhiều biến thể. Nhờ đó giao diện có thể phản hồi đúng với từng tình huống thực tế."
                      : "Rather than focusing only on the happy path, I designed for various real-world scenarios: promotion available, low remaining quota, promotion sold out, purchase limit reached, voucher conflict, mixed order, and product variants."
                  },
                  {
                    icon: "/projects/pj3-4.png",
                    title: lang === "vi" ? "Prototype & Hoàn thiện" : "Prototype & Iterate",
                    desc: lang === "vi"
                      ? "Kiểm chứng luồng trải nghiệm và tương tác thông qua prototype và phản hồi từ các bên liên quan."
                      : "Validated user flows and interactions through prototyping and stakeholder feedback."
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        objectFit: "contain",
                        flexShrink: 0
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <h4 style={{
                        fontFamily: "'Google Sans', sans-serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--paper)",
                        margin: 0
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        fontSize: 15,
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            renderContent(project.results)
          )}
          {project.resultsImage && project.slug !== "flash-sale" && (
            <div style={{ marginTop: "2rem", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(226,222,216,0.08)" }}>
              <img
                src={project.resultsImage}
                alt="Design Approach Illustration"
                style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in", transition: "transform 0.3s ease" }}
                onClick={() => setActiveImage(project.resultsImage!)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          )}
        </motion.div>

        {/* User Flow */}
        {slug === "redesign-home" && (
          <motion.div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${project.accent}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
              }}>05</div>
              <h2 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>
                {t("User Flow", "Luồng trải nghiệm người dùng")}
              </h2>
            </div>

            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
              {t("Key shopping journeys across the homepage", "Các hành trình mua sắm cốt lõi trên trang chủ")}
            </p>

            {/* 3 Columns Flow Grid */}
            <div className="user-flow-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              alignItems: "stretch"
            }}>
              {/* Column 1: PRODUCT DISCOVERY (Green) */}
              <div style={{
                background: "rgba(226, 222, 216, 0.02)",
                border: "1px solid rgba(226, 222, 216, 0.08)",
                borderRadius: 20,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem"
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "0.75rem", borderBottom: "1px solid rgba(226,222,216,0.08)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#10b981", letterSpacing: "0.04em", margin: 0, textTransform: "uppercase" }}>
                    {t("PRODUCT DISCOVERY", "Khám phá sản phẩm")}
                  </h3>
                </div>

                {/* Flow Steps */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {/* Step 1 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#10b981", opacity: 0.8, minWidth: 20 }}>01</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Homepage", "Trang chủ")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 2 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#10b981", opacity: 0.8, minWidth: 20 }}>02</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Recommendation / Category", "Gợi ý / Ngành hàng")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 3 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#10b981", opacity: 0.8, minWidth: 20 }}>03</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Product Detail", "Chi tiết sản phẩm")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 4 (Highlighted) */}
                  <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981", minWidth: 20 }}>04</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>{t("Add to Cart", "Thêm vào giỏ hàng")}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: PROMOTIONAL DISCOVERY (Orange) */}
              <div style={{
                background: "rgba(226, 222, 216, 0.02)",
                border: "1px solid rgba(226, 222, 216, 0.08)",
                borderRadius: 20,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem"
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "0.75rem", borderBottom: "1px solid rgba(226,222,216,0.08)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(245, 158, 11, 0.12)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#f59e0b", letterSpacing: "0.04em", margin: 0, textTransform: "uppercase" }}>
                    {t("PROMOTIONAL DISCOVERY", "Khám phá ưu đãi")}
                  </h3>
                </div>

                {/* Flow Steps */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {/* Step 1 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", opacity: 0.8, minWidth: 20 }}>01</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Homepage", "Trang chủ")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 2 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", opacity: 0.8, minWidth: 20 }}>02</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Flash Sale / Campaign", "Flash Sale / Chiến dịch")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 3 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#f59e0b", opacity: 0.8, minWidth: 20 }}>03</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Product", "Sản phẩm")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 4 (Highlighted) */}
                  <div style={{ background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", minWidth: 20 }}>04</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b" }}>{t("Product Detail", "Chi tiết sản phẩm")}</span>
                  </div>
                </div>
              </div>

              {/* Column 3: VOUCHER (Purple) */}
              <div style={{
                background: "rgba(226, 222, 216, 0.02)",
                border: "1px solid rgba(226, 222, 216, 0.08)",
                borderRadius: 20,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem"
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: "0.75rem", borderBottom: "1px solid rgba(226,222,216,0.08)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(167, 139, 250, 0.12)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/><line x1="9" y1="12" x2="15" y2="12"/></svg>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.04em", margin: 0, textTransform: "uppercase" }}>
                    {t("VOUCHER", "Mã giảm giá")}
                  </h3>
                </div>

                {/* Flow Steps */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {/* Step 1 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#a78bfa", opacity: 0.8, minWidth: 20 }}>01</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Homepage", "Trang chủ")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 2 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#a78bfa", opacity: 0.8, minWidth: 20 }}>02</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Voucher", "Mã giảm giá")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 3 */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#a78bfa", opacity: 0.8, minWidth: 20 }}>03</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(167, 139, 250, 0.1)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--paper)" }}>{t("Eligible Product", "Sản phẩm áp dụng")}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", color: "rgba(226,222,216,0.3)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                  </div>

                  {/* Step 4 (Highlighted) */}
                  <div style={{ background: "rgba(167, 139, 250, 0.12)", border: "1px solid rgba(167, 139, 250, 0.3)", borderRadius: 12, padding: "0.75rem 1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa", minWidth: 20 }}>04</span>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(167, 139, 250, 0.2)", color: "#a78bfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa" }}>{t("Product Detail", "Chi tiết sản phẩm")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Callout Box */}
            <div style={{
              marginTop: "1.5rem",
              background: "rgba(59, 130, 246, 0.05)",
              border: "1px solid rgba(59, 130, 246, 0.15)",
              borderRadius: 16,
              padding: "1.25rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--paper)", margin: 0 }}>
                {lang === "vi" ? (
                  <>Tôi đã lập bản đồ các hành trình mua sắm cốt lõi để đảm bảo nội dung khuyến mãi luôn gắn liền với việc <strong style={{ color: "#3b82f6" }}>khám phá sản phẩm</strong> và <strong style={{ color: "#3b82f6" }}>tỷ lệ chuyển đổi</strong>.</>
                ) : (
                  <>I mapped the key shopping paths to keep promotional content connected to <strong style={{ color: "#3b82f6" }}>product discovery</strong> and <strong style={{ color: "#3b82f6" }}>conversion</strong>.</>
                )}
              </p>
            </div>
          </motion.div>
        )}

        {/* Key Design Decisions */}
        {project.keyDecisions && (
          <motion.div ref={decisionsRef} {...fadeUp(decisionsInView)} style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${project.accent}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
              }}>06</div>
              <h2 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>{t("Key Design Decisions", "Quyết định thiết kế chính")}</h2>
            </div>
            {renderContent(project.keyDecisions)}
            {project.keyDecisionsImage && (
              <div style={{ marginTop: "2rem", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(226,222,216,0.08)" }}>
                <img
                  src={project.keyDecisionsImage}
                  alt="Key Decisions Illustration"
                  style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in", transition: "transform 0.3s ease" }}
                  onClick={() => setActiveImage(project.keyDecisionsImage!)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Outcome */}
        {project.outcome && (
          <motion.div ref={outcomeRef} {...fadeUp(outcomeInView)} style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${project.accent}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
              }}>07</div>
              <h2 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>{t("Outcome/Impact & ROI", "Kết quả / Tác động & ROI")}</h2>
            </div>
            {renderContent(project.outcome)}

            {slug === "redesign-home" && (
              <div style={{
                marginTop: "2.5rem",
                background: "linear-gradient(135deg, rgba(232, 168, 66, 0.05) 0%, rgba(226, 222, 216, 0.02) 100%)",
                border: "1px solid rgba(232, 168, 66, 0.22)",
                borderRadius: 24,
                padding: "2.25rem",
                fontFamily: "'Google Sans', sans-serif",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35)",
                position: "relative",
                overflow: "hidden"
              }}>
                {/* Background Glow Accent */}
                <div style={{
                  position: "absolute",
                  top: "-40%",
                  right: "-10%",
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(232, 168, 66, 0.12) 0%, rgba(0,0,0,0) 70%)",
                  pointerEvents: "none"
                }} />

                {/* Header */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: "rgba(232, 168, 66, 0.15)",
                      color: "#E8A842",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(232, 168, 66, 0.15)",
                      flexShrink: 0
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                        <polyline points="17 6 23 6 23 12"/>
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--paper)", margin: 0, letterSpacing: "-0.01em" }}>
                        {lang === "vi" ? "Các chỉ số ROI & Kinh doanh đạt được sau khi triển khai thiết kế mới" : "Key ROI & Business Metrics Achieved Post-Redesign"}
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 0 0" }}>
                        {lang === "vi" ? "Dữ liệu đo lường hiệu quả thực tế từ hệ thống báo cáo MWG Shop" : "Measured performance impact on MWG Shop platform"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Metrics Cards Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.75rem"
                }}>
                  {/* Metric 1: Orders & Revenue */}
                  <div style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(232, 168, 66, 0.2)",
                    borderRadius: 18,
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--paper)", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>🛒</span>
                        <span>{lang === "vi" ? "Đơn hàng & Doanh thu" : "Orders & Revenue"}</span>
                      </span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#10b981",
                        background: "rgba(16, 185, 129, 0.15)",
                        padding: "4px 10px",
                        borderRadius: 20,
                        border: "1px solid rgba(16, 185, 129, 0.25)"
                      }}>
                        +22.6% đơn · +3.2% DT
                      </span>
                    </div>
                    <div style={{ fontSize: "clamp(24px, 2.3vw, 28px)", fontWeight: 700, color: "#E8A842", letterSpacing: "-0.02em" }}>
                      140,03 Tỷ ₫ <span style={{ fontSize: 16, fontWeight: 500, color: "var(--paper)" }}>/ 62,9K đơn</span>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                      {lang === "vi"
                        ? "Đạt 62,9K đơn hàng (tăng trưởng +22,6%), mang về tổng doanh thu 140,03 Tỷ ₫ (+3,2%)."
                        : "Reached 62.9K orders (+22.6% growth), generating total revenue of 140.03B ₫ (+3.2%)."}
                    </span>
                  </div>

                  {/* Metric 2: Traffic */}
                  <div style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                    borderRadius: 18,
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--paper)", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>📈</span>
                        <span>{lang === "vi" ? "Lượng truy cập (Traffic)" : "Traffic"}</span>
                      </span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#a78bfa",
                        background: "rgba(167, 139, 250, 0.15)",
                        padding: "4px 10px",
                        borderRadius: 20,
                        border: "1px solid rgba(167, 139, 250, 0.25)"
                      }}>
                        +35.9% Sessions
                      </span>
                    </div>
                    <div style={{ fontSize: "clamp(24px, 2.3vw, 28px)", fontWeight: 700, color: "#a78bfa", letterSpacing: "-0.02em" }}>
                      2,8 triệu <span style={{ fontSize: 16, fontWeight: 500, color: "var(--muted)" }}>Sessions</span>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                      {lang === "vi"
                        ? "Đạt 2,8 triệu Sessions (+35,9%), trong đó Trang chủ mới là phễu chính dẫn dắt người dùng với 2,79 triệu lượt truy cập."
                        : "Reached 2.8M Sessions (+35.9%), with the new Homepage as the primary funnel driving 2.79M visits."}
                    </span>
                  </div>

                  {/* Metric 3: System Peak Load */}
                  <div style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: 18,
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--paper)", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>⚡</span>
                        <span>{lang === "vi" ? "Tải hệ thống đỉnh điểm" : "Peak System Load"}</span>
                      </span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#3b82f6",
                        background: "rgba(59, 130, 246, 0.15)",
                        padding: "4px 10px",
                        borderRadius: 20,
                        border: "1px solid rgba(59, 130, 246, 0.25)"
                      }}>
                        ~71K Session/ngày
                      </span>
                    </div>
                    <div style={{ fontSize: "clamp(24px, 2.3vw, 28px)", fontWeight: 700, color: "#3b82f6", letterSpacing: "-0.02em" }}>
                      ~62K <span style={{ fontSize: 16, fontWeight: 500, color: "var(--muted)" }}>User/ngày (DAU)</span>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                      {lang === "vi"
                        ? "Thiết kế cấu trúc mới vận hành mượt mà ở các mốc peak traffic, đáp ứng đến ~62K User/ngày (DAU) và ~71K Session/ngày."
                        : "New structural design ran smoothly during peak traffic, accommodating up to ~62K DAU and ~71K Sessions/day."}
                    </span>
                  </div>
                </div>

                {/* Evidence Report CTA Banner */}
                <div style={{
                  background: "rgba(232, 168, 66, 0.08)",
                  border: "1px solid rgba(232, 168, 66, 0.22)",
                  borderRadius: 14,
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>📊</span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--paper)" }}>
                      {lang === "vi" ? "Báo cáo dữ liệu đo lường thực tế (1/5 - 6/8/2026)" : "Full measurement data report (May 1 – Aug 6, 2026)"}
                    </span>
                  </div>
                  <a
                    href="/report-mwg-shop-overview.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "linear-gradient(135deg, #E8A842 0%, #D49228 100%)",
                      color: "#0a0a0a",
                      fontWeight: 600,
                      fontSize: 13,
                      padding: "9px 18px",
                      borderRadius: 10,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 4px 14px rgba(232, 168, 66, 0.25)",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 6px 18px rgba(232, 168, 66, 0.35)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 14px rgba(232, 168, 66, 0.25)";
                    }}
                  >
                    <span>{lang === "vi" ? "Xem report dẫn chứng (từ 1/5 - 6/8/2026)" : "View evidence report (from 1/5 - 6/8/2026)"}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {project.outcomeImage && project.slug !== "flash-sale" && (
              <div style={{ marginTop: "2rem", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(226,222,216,0.08)" }}>
                <img
                  src={project.outcomeImage}
                  alt="Outcome Illustration"
                  style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in", transition: "transform 0.3s ease" }}
                  onClick={() => setActiveImage(project.outcomeImage!)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Reflection */}
        {project.reflection && (
          <motion.div ref={reflectionRef} {...fadeUp(reflectionInView)} style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${project.accent}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: project.accent, fontFamily: "'Google Sans', sans-serif"
              }}>08</div>
              <h2 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>{t("Reflection", "Nhìn lại & Bài học")}</h2>
            </div>
            {renderContent(project.reflection)}
            {project.reflectionImage && project.slug !== "flash-sale" && project.slug !== "private-offer" && (
              <div style={{ marginTop: "2rem", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(226,222,216,0.08)" }}>
                <img
                  src={project.reflectionImage}
                  alt="Reflection Illustration"
                  style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in", transition: "transform 0.3s ease" }}
                  onClick={() => setActiveImage(project.reflectionImage!)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.015)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation between projects */}
      <motion.div
        ref={navRef}
        {...fadeUp(navInView)}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem 6rem",
        }}
      >
        <div style={{
          borderTop: "1px solid rgba(226,222,216,0.08)",
          paddingTop: "3rem",
          display: "grid",
          gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
          gap: "1.5rem",
        }}
          className="project-nav-grid"
        >
          {prev && (
            <ProjectNavCard project={prev} direction="prev" />
          )}
          {next && (
            <ProjectNavCard project={next} direction="next" />
          )}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .flow-card-row { grid-template-columns: 1fr !important; }
          .user-flow-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .project-meta-grid { grid-template-columns: 1fr 1fr !important; }
          .project-nav-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .app-experience-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            padding: 1.25rem !important;
          }
          .app-experience-card > div:first-of-type {
            flex-direction: column !important;
            text-align: center !important;
          }
          .download-btn-section {
            width: 100% !important;
          }
          .download-btn-section a {
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
      {/* Zoom Lightbox Modal */}
      {activeImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(10, 10, 10, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            cursor: "zoom-out",
          }}
          onClick={() => setActiveImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImage(null)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "24px",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            &times;
          </button>

          <img
            src={activeImage}
            alt="Zoomed Illustration"
            style={{
              maxHeight: "90vh",
              maxWidth: "90vw",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              animation: "zoom-in-anim 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <style>{`
            @keyframes zoom-in-anim {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </main>
  );
}

function ProjectNavCard({ project, direction }: { project: { slug: string; title: string; company: string; accent: string; bg: string; image: string }; direction: "prev" | "next" }) {
  const { t } = useLanguage();
  const isPrev = direction === "prev";

  return (
    <Link href={`/work/${project.slug}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          padding: "2rem",
          background: project.bg,
          border: "1px solid rgba(226,222,216,0.08)",
          borderRadius: 16,
          transition: "border-color 0.3s, transform 0.3s",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          textAlign: isPrev ? "left" : "right",
          flexDirection: isPrev ? "row" : "row-reverse",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = project.accent + "40";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(226,222,216,0.08)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* Thumbnail */}
        <div style={{
          width: 80, height: 60, borderRadius: 10, overflow: "hidden", flexShrink: 0,
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            {isPrev ? t("← Previous", "← Dự án trước") : t("Next →", "Dự án sau →")}
          </div>
          <div style={{
            fontFamily: "'Google Sans', sans-serif",
            fontSize: 20,
            color: "var(--paper)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}>
            {project.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            {project.company}
          </div>
        </div>
      </div>
    </Link>
  );
}
