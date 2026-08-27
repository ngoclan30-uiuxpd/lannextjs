"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "./useLanguage";

export default function About() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const experience = [
    {
      period: "2017 — 2026",
      role: t("UI/UX/Product Designer & Senior Graphic Designer", "UI/UX/Product Designer & Senior Graphic Designer"),
      company: "MWG",
      note: t(
        "Designed end-to-end product experiences for MWG Shop, supporting the e-commerce ecosystem across Dien May Xanh, The Gioi Di Dong, TopZone, and companion mobile applications.\nLed the visual design of e-commerce campaigns, creating banners, landing pages, and promotional assets that supported large-scale online sales initiatives.\n• UI/UX & Product Designer (2023 – 2026)\n• Senior Graphic Designer (2017 – 2023)",
        "Thiết kế trải nghiệm sản phẩm cho nền tảng thương mại điện tử MWG Shop, phụ trách các tính năng cốt lõi và tối ưu hành trình mua sắm trên web Điện Máy Xanh, Thế Giới Di Động, TopZone và các website vệ tinh khác của công ty, ứng dụng di động như: Quà tặng VIP, Mua sắm MWG Shop.\nDẫn dắt thiết kế hình ảnh, banner, landing page cho các chiến dịch thương mại điện tử, đồng thời mở rộng sang các dự án trải nghiệm số nhằm nâng cao tính nhất quán giữa thương hiệu và sản phẩm.\n• UI/UX & Product Designer (2023 – 2026)\n• Senior Graphic Designer (2017 – 2024)"
      )
    },
    {
      period: "2011 — 2017",
      role: t("Graphic Designer & UI Designer", "Graphic Designer & UI Designer"),
      company: "CAO PHONG",
      note: t(
        "Designed brand identity systems, marketing collateral, and promotional materials across multiple business sectors.\nExpanded responsibilities from graphic design into website and mobile UI design for food review and financial applications, laying the foundation for a transition into Product Design.\n• Graphic Designer (2011 – 2015)\n• Graphic Designer & UI Designer (2015 – 2017)",
        "Thiết kế nhận diện thương hiệu, ấn phẩm truyền thông và các tài liệu marketing cho nhiều lĩnh vực kinh doanh.\nMở rộng từ thiết kế đồ họa sang thiết kế website và giao diện ứng dụng trong lĩnh vực ẩm thực và tài chính, đặt nền tảng cho hành trình chuyển hướng sang Product Design.\n• Graphic Designer (2011 – 2015)\n• Graphic Designer & UI Designer (2015 – 2017)"
      )
    },
    {
      period: "2010 — 2011",
      role: t("Web Designer (Outsourcing Projects)", "Web Designer (Outsourcing Projects)"),
      company: "TQ DESIGN",
      note: t(
        "Designed corporate websites for clients across various industries, translating business requirements into intuitive web interfaces. Collaborated closely with developers to ensure design quality and feasibility, with a strong focus on visual hierarchy, information architecture, and implementation.",
        "Thiết kế giao diện website doanh nghiệp, phối hợp với lập trình viên để xây dựng và hoàn thiện các sản phẩm web theo yêu cầu của khách hàng, tập trung vào trải nghiệm trực quan, bố cục thông tin và khả năng triển khai thực tế."
      )
    },
    {
      period: "2007 — 2010",
      role: t("Graphic Designer", "Graphic Designer"),
      company: "NATURAL",
      note: t(
        "Designed marketing collateral and printed materials while working closely with print vendors to prepare production files, perform prepress quality checks, and oversee print output. Contributed to brand communication through consistent visual design and high-quality production standards.",
        "Phụ trách thiết kế các ấn phẩm truyền thông và sản phẩm in ấn, phối hợp với nhà in kiểm tra kỹ thuật và giám sát chất lượng thành phẩm trước khi sản xuất, góp phần xây dựng hình ảnh thương hiệu và hỗ trợ các hoạt động marketing."
      )
    },
  ];

  return (
    <section ref={ref} id="about" style={{
      padding: "6rem 0 0",
      borderTop: "1px solid var(--border)",
      background: "var(--bg)",
    }}>
      {/* Top: Intro + Static Logos */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", marginBottom: "2.4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="about-grid">

          {/* Left: Intro */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              {t("About me", "Giới thiệu")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600,
                lineHeight: 1.2, letterSpacing: "-0.03em",
                color: "var(--ink)", marginBottom: "1.5rem"
              }}
            >
              {t(
                <>
                  <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>Design</em>, a journey I&apos;ve <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>chosen</em> to <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>grow</em> with for a lifetime
                </>,
                <>
                  <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>Thiết kế</em>, hành trình tôi <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>lựa chọn</em> để gắn bó và không ngừng <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>phát triển</em>
                </>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "100%" }}
            >
              {t(
                "From print media and brand identity to web design and digital products, every stage has broadened my perspective on how design drives value. This journey allows me to blend visual craft with product thinking to build intuitive, effective experiences that serve both user needs and business goals.",
                "Từ thiết kế in ấn, nhận diện thương hiệu, website đến sản phẩm số, mỗi giai đoạn đều giúp tôi mở rộng góc nhìn về cách thiết kế tạo ra giá trị. Hành trình đó giúp tôi kết hợp tư duy thị giác với tư duy sản phẩm để xây dựng những trải nghiệm trực quan, hiệu quả và phù hợp với nhu cầu của người dùng cũng như mục tiêu kinh doanh."
              )}
            </motion.p>

            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="/cv"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, color: "var(--ink)", textDecoration: "none",
                padding: "10px 20px", border: "1px solid var(--ink)",
                borderRadius: 999, transition: "all 0.2s", fontWeight: 500,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--ink)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--ink)";
              }}
            >
              {t("View My CV", "Xem CV của tôi")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>

          {/* Right: Static Partner Logos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3rem 4rem",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "560px",
              margin: "0 auto"
            }}
            className="about-logos-container"
          >
            {[
              { src: "/1.jpg", alt: "Natural", extraScale: true },
              { src: "/2.png", alt: "Dapha" },
              { src: "/3.svg", alt: "TQ", scale: true },
              { src: "/4.png", alt: "Cho Lon", scale: true },
              { src: "/5.jpeg", alt: "MWG", extraScale: true },
            ].map((logo, index) => (
              <img
                key={`logo-${index}`}
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: logo.extraScale ? "100px" : "50px",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: "grayscale(1) opacity(0.4)",
                  transition: "filter 0.3s, opacity 0.3s"
                }}
                className="partner-logo-static"
                onMouseEnter={e => {
                  e.currentTarget.style.filter = "grayscale(0) opacity(1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.filter = "grayscale(1) opacity(0.4)";
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom: Light Theme Full-Width Experience Timeline */}
      <div style={{
        background: "var(--bg)",
        padding: "1.2rem 0 3.5rem",
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "0.8fr 1.2fr 2fr",
                  gap: "2rem",
                  padding: "3rem 0",
                  borderBottom: idx === experience.length - 1 ? "none" : "1px solid var(--border)",
                  alignItems: "start",
                }}
                className="experience-row"
              >
                {/* Column 1: Period */}
                <div style={{
                  fontSize: "17px",
                  fontWeight: 500,
                  color: "var(--muted)",
                  fontFamily: "'Google Sans', sans-serif",
                  letterSpacing: "-0.01em",
                  paddingTop: "2px"
                }}>
                  {exp.period}
                </div>

                {/* Column 2: Company */}
                <div style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  fontFamily: "'Google Sans', sans-serif",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  paddingTop: "2px"
                }}>
                  {exp.company}
                </div>

                {/* Column 3: Role & Note */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <h4 style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    fontFamily: "'Google Sans', sans-serif",
                    margin: 0,
                    lineHeight: 1.3,
                  }}>
                    {exp.role}
                  </h4>
                  <p style={{
                    fontSize: "14px",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                    margin: 0,
                  }}>
                    {exp.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .about-logos-container { margin-top: 2rem !important; justify-content: center !important; }
          .experience-row { grid-template-columns: 1fr !important; gap: 0.8rem !important; padding: 2rem 0 !important; }
        }
      `}</style>
    </section>
  );
}
