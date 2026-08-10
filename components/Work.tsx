"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { projects, type Project, translateProject } from "@/lib/projects";
import { useLanguage } from "./useLanguage";

function ProjectCard({ project: rawProject, index }: { project: Project; index: number }) {
  const { lang, t } = useLanguage();
  const project = translateProject(rawProject, lang);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${project.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          border: `1px solid ${hovered ? project.accent + "50" : "var(--card-border)"}`,
          borderRadius: 24,
          cursor: "pointer",
          transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.02)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          minHeight: 160,
        }}
        className="project-row-card"
      >
        <div style={{
          width: "40%",
          background: project.bg || "#0a0a0a",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
          className="project-row-image"
        >
          <img
            src={project.image}
            alt={`${project.title} — ${project.company}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, transparent, rgba(0,0,0,0.02))",
            pointerEvents: "none"
          }} />
        </div>

        <div style={{
          padding: "1rem 2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
          className="project-row-content"
        >
          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
            <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
              {project.company} · {project.year}
            </span>
            <span style={{ fontSize: 13, color: project.accent, fontWeight: 600, opacity: 0.8 }}>{project.id}</span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Google Sans', sans-serif",
            fontSize: "clamp(24px, 2.5vw, 36px)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: "1rem",
            fontWeight: 600
          }}>{project.title}</h3>

          {/* Description */}
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "95%" }}>
            {project.description}
          </p>

          {/* CTA Link (now a div for nested validity) */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: hovered ? project.accent : "var(--ink)",
            transition: "color 0.2s"
          }}>
            <span>{t("View Case Study", "Xem chi tiết dự án")}</span>
            <motion.div
              animate={{ x: hovered ? 4 : 0, y: hovered ? -2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Work() {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  // Show only first 4 projects on homepage
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="work" style={{ padding: "3.5rem 2rem 6rem", maxWidth: 1200, margin: "0 auto" }}>
      <div ref={titleRef} style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }} className="work-header">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}
          >
            {t("Selected Work", "Dự án Nổi bật")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 600,
              lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "var(--ink)", maxWidth: 700
            }}
          >
            {t("More than projects", "Không chỉ là các dự án")}<br />
            {t("Designing ", "mà là thiết kế ")}
            <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>{t("the shopping journey", "hành trình mua sắm")}</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: 16,
              color: "var(--muted)",
              lineHeight: 1.6,
              marginTop: "1.25rem",
              maxWidth: 680,
            }}
          >
            {t(
              "Rather than presenting standalone projects, this portfolio is structured around the end-to-end shopping journey—from product discovery and comparison to personalised offers and campaign engagement. Each case study demonstrates how I approached different product challenges within the same e-commerce ecosystem.",
              "Thay vì trình bày các dự án riêng lẻ, portfolio này được xây dựng theo hành trình mua sắm của người dùng – từ khám phá sản phẩm, cân nhắc lựa chọn, nhận ưu đãi cá nhân đến tham gia các chiến dịch mua sắm. Mỗi case study thể hiện cách tôi giải quyết những bài toán sản phẩm khác nhau trong cùng một hệ sinh thái e-commerce."
            )}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/work" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: "transparent",
            color: "var(--ink)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
          >
            {t("View All Projects", "Xem tất cả dự án")}
          </Link>
        </motion.div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }} className="work-list">
        {featuredProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row-card {
            flex-direction: column !important;
            min-height: auto !important;
            height: auto !important;
            border-radius: 20px !important;
          }
          .project-row-image {
            width: 100% !important;
            aspect-ratio: 16/10 !important;
          }
          .project-row-content {
            padding: 1.75rem 2rem 2rem !important;
          }
          .work-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
