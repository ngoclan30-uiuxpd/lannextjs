"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "./useLanguage";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert(t("Please fill in all required fields.", "Vui lòng điền đầy đủ các thông tin bắt buộc."));
      return;
    }
    setSent(true);
  };

  return (
    <section ref={ref} id="contact" style={{
      padding: "8rem 2rem 6rem",
      background: "#0c0c0e",
      color: "#ffffff",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "6rem", alignItems: "start" }} className="contact-grid">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%", gap: "6rem" }}
          >
            <div>
              <div className="contact-badge" style={{
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 999,
                padding: "6px 16px",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.7)",
                background: "rgba(255, 255, 255, 0.05)",
                display: "inline-block",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.5rem"
              }}>
                {t("Contact Me", "Liên hệ")}
              </div>
              <h2 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: "clamp(38px, 6vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}>
                {t("Ways to Connect", "Phương thức liên hệ")}
              </h2>
            </div>
            
            <div>
              <div style={{
                border: "1.5px dashed rgba(255, 255, 255, 0.25)",
                padding: "5px",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                marginBottom: "1.25rem"
              }}>
                <img 
                  src="/portrait.png" 
                  alt="Lan Đinh" 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    borderRadius: "50%", 
                    objectFit: "cover" 
                  }} 
                />
              </div>
              <h3 style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: 24,
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "0.75rem",
                letterSpacing: "-0.01em"
              }}>
                Lan Đinh
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  { label: t("Product Designer", "Thiết kế Sản phẩm"), bg: "#6d28d9", color: "#ffffff" },
                  { label: t("User Researcher", "Nghiên cứu Người dùng"), bg: "#1d4ed8", color: "#ffffff" },
                  { label: t("Systems Thinker", "Tư duy Hệ thống"), bg: "#047857", color: "#ffffff" },
                  { label: t("UX Strategist", "Chiến lược UX"), bg: "#b45309", color: "#ffffff" },
                ].map(pill => (
                  <span key={pill.label} style={{
                    background: pill.bg,
                    color: pill.color,
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <a 
              href="mailto:ngoclan30@gmail.com" 
              style={{
                fontSize: "clamp(24px, 3.5vw, 38px)",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                display: "block",
                marginBottom: "1.25rem",
                fontFamily: "'Google Sans', sans-serif",
                letterSpacing: "-0.02em",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--amber)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#ffffff"; }}
              className="contact-email-link"
            >
              lan@landinh.design
            </a>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "3.5rem" }}>
              <a href="https://linkedin.com/in/lan-dinh-5370b3144" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://read.cv/landinh" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Read.cv">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </a>
              <a href="mailto:ngoclan30@gmail.com" className="social-icon-link" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>

            <h4 style={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "1.5rem"
            }}>
              {t("Message Me:", "Gửi tin nhắn:")}
            </h4>

            {!sent ? (
              <form style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div className="contact-field-group">
                  <input 
                    type="text" 
                    required
                    placeholder={t("Your Name *", "Họ và Tên *")}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <input 
                    type="email" 
                    required
                    placeholder={t("Your Email *", "Email của bạn *")}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <input 
                    type="tel" 
                    placeholder={t("Your Phone", "Số điện thoại")}
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <textarea 
                    required
                    rows={4}
                    placeholder={t("Your message *", "Lời nhắn *")}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="contact-input"
                    style={{ resize: "none" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1rem", flexWrap: "wrap" }}>
                  <button 
                    type="submit"
                    onClick={handleSubmit}
                    style={{
                      background: "#ffffff",
                      color: "#000000",
                      border: "none",
                      borderRadius: 999,
                      padding: "10px 10px 10px 24px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      transition: "transform 0.2s, background-color 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "scale(1.03)";
                      e.currentTarget.style.backgroundColor = "#f3f3f3";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    {t("Send message", "Gửi tin nhắn")}
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#000000",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                  
                  <p style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.4)",
                    lineHeight: 1.4,
                    maxWidth: 260
                  }}>
                    {t(
                      "Your information will remain private and will not be shared without your permission.",
                      "Thông tin của bạn sẽ được giữ bí mật và không chia sẻ nếu không có sự đồng ý của bạn."
                    )}
                  </p>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  padding: "3rem 2rem", 
                  background: "rgba(255, 255, 255, 0.03)", 
                  border: "1px solid rgba(255, 255, 255, 0.1)", 
                  borderRadius: 20, 
                  textAlign: "center" 
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12, color: "var(--amber)" }}>✓</div>
                <div style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 22, color: "#fff", marginBottom: 8 }}>{t("Message sent!", "Đã gửi tin nhắn!")}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{t("I'll get back to you within 24 hours.", "Tôi sẽ phản hồi lại trong vòng 24 giờ.")}</div>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: #fff;
          padding: 12px 0;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s;
          font-family: 'Google Sans', sans-serif;
          border-radius: 0;
        }
        .contact-input:focus {
          border-bottom: 1px solid #ffffff;
        }
        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s;
        }
        .contact-input:focus::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        .social-icon-link {
          color: #fff;
          opacity: 0.6;
          transition: opacity 0.2s, transform 0.2s;
        }
        .social-icon-link:hover {
          opacity: 1;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}

