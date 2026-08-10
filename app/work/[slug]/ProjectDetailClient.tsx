"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { getProjectBySlug, getAdjacentProjects, translateProject } from "@/lib/projects";
import { useLanguage } from "../../../components/useLanguage";

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
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} style={{ fontWeight: 600, color: "var(--paper)" }}>{part.slice(2, -2)}</strong>;
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

        {/* Design Approach */}
        <motion.div ref={resultsRef} {...fadeUp(resultsInView)} style={{ marginBottom: "4rem" }}>
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
            }}>{t("Design Approach", "Cách tiếp cận")}</h2>
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

        {/* Key Design Decisions */}
        {project.keyDecisions && (
          <motion.div ref={decisionsRef} {...fadeUp(decisionsInView)} style={{ marginBottom: "4rem" }}>
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
              }}>05</div>
              <h2 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                color: "var(--paper)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>{t("Outcome", "Kết quả")}</h2>
            </div>
            {renderContent(project.outcome)}
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
              }}>06</div>
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
