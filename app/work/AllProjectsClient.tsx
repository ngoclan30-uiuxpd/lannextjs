"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { projects, type Project, translateProject } from "@/lib/projects";
import { useLanguage } from "../../components/useLanguage";

function ProjectCard({ project: rawProject, index }: { project: Project; index: number }) {
  const { lang, t } = useLanguage();
  const project = translateProject(rawProject, lang);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState(false);

  return (
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
        borderRadius: 20,
        cursor: "pointer",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Link href={`/work/${project.slug}`} style={{ textDecoration: "none" }}>
        <div>
          {/* Project Image */}
          <div style={{
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            borderRadius: "20px 20px 0 0",
            position: "relative"
          }}>
            <img
              src={project.image}
              alt={`${project.title} — ${project.company}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          </div>

          <div style={{ padding: "1.5rem 2rem 2rem" }}>
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {project.company} · {project.year}
                </span>
              </div>
              <motion.div
                animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: hovered ? project.accent : "var(--bg-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.3s", flexShrink: 0,
                  border: "1px solid var(--card-border)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke={hovered ? "#fff" : "var(--ink)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            {/* Number + title */}
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ fontSize: 12, color: project.accent, opacity: 0.6, fontWeight: 500 }}>{project.id}</span>
              <h3 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(24px, 2.5vw, 32px)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
                color: "var(--ink)", marginTop: 2
              }}>{project.title}</h3>
            </div>

            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 0 }}>
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AllProjectsClient() {
  const { lang, t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <main>
      {/* Nav back */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2rem", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(226,222,216,0.08)"
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 10, textDecoration: "none",
          color: "var(--paper)", fontSize: 14, fontWeight: 400,
          transition: "color 0.2s"
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--amber)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--paper)")}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("Back to home", "Quay lại trang chủ")}
        </Link>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{
            width: 32, height: 32, background: "var(--amber)", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Google Sans', sans-serif", fontSize: 16, color: "var(--ink)"
          }}>LD</span>
          <span style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 18, color: "var(--paper)", letterSpacing: "-0.02em" }}>
            Lan Đinh
          </span>
        </Link>
      </div>

      <section style={{ padding: "140px 2rem 6rem", maxWidth: 1200, margin: "0 auto" }}>
        <div ref={titleRef} style={{ marginBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}
          >
            {t("All Projects", "Tất cả dự án")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600,
              lineHeight: 1.05, letterSpacing: "-0.03em",
              color: "var(--ink)", maxWidth: 700
            }}
          >
            {lang === "vi" ? (
              <>
                Mỗi dự án, một{" "}
                <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>
                  câu chuyện
                </em>
              </>
            ) : (
              <>
                Every project, every{" "}
                <em style={{ color: "var(--accent-purple)", fontStyle: "normal" }}>
                  story
                </em>
                .
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, maxWidth: 520, marginTop: "1.5rem" }}
          >
            {t(
              "A collection of product design work spanning e-commerce, fintech, design systems, and sustainability.",
              "Bộ sưu tập các dự án thiết kế sản phẩm thuộc lĩnh vực thương mại điện tử, công nghệ tài chính, hệ thống thiết kế và phát triển bền vững."
            )}
          </motion.p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="all-work-grid">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .all-work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
