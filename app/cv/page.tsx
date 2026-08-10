"use client";

import { useRef, useEffect, Suspense } from "react";
import { useLanguage } from "../../components/useLanguage";
import "./cv.css";

// ==========================================================================
// SVG ICONS MAP (React-safe inline icons matching the clean template look)
// ==========================================================================
const Icons = {
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
  ),
  Behance: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M8.2 13.6c0 1-.3 1.8-.8 2.3c-.6.6-1.5.9-2.7.9H2V7.2h3c2.4 0 3.2 1.3 3.2 2.6c0 .8-.3 1.5-.9 1.9c.7.4.9 1.1.9 1.9zM5.3 11c.7 0 1.1-.3 1.1-.9s-.4-.8-1.1-.8H3.8V11h1.5zm.2 4.2c.8 0 1.2-.3 1.2-1s-.4-.9-1.2-.9H3.8v2.9h1.7zm11.2-3.1c0 2.2-1.6 3.6-3.8 3.6c-2.4 0-3.9-1.6-3.9-3.7s1.5-3.7 3.9-3.7c2.3.1 3.8 1.6 3.8 3.8zm-3.8-2.2c-1.3 0-2.1.8-2.2 2.2h4.3c0-1.4-.8-2.2-2.1-2.2zm1.6-3.2H12V5h4.5v1.8z" /></svg>
  ),
  Work: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
  )
};

function CVPageContent() {
  const { t, lang } = useLanguage();
  const workspaceRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const workspace = workspaceRef.current;
    const glow = glowRef.current;
    if (!workspace || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = workspace.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      glow.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      glow.style.opacity = "0";
    };

    workspace.addEventListener("mousemove", handleMouseMove);
    workspace.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      workspace.removeEventListener("mousemove", handleMouseMove);
      workspace.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="editor-container-wrapper">
      {/* FLOATING ACTION - DOWNLOAD PDF */}
      <div className="floating-actions no-print">
        <button onClick={() => window.print()} className="btn-floating-print" title={t("Download PDF", "Tải PDF")} suppressHydrationWarning>
          <Icons.Download />
          <span suppressHydrationWarning>{t("Download PDF", "Tải PDF")}</span>
        </button>
      </div>

      {/* WORKSPACE CANVAS */}
      <main ref={workspaceRef} className="workspace">
        {/* Interactive spotlight glow overlay */}
        <div ref={glowRef} className="mouse-glow no-print" />

        <div className="page-container">
          <div className="cv-page" id="cv-sheet">
            <div className="top-accent-bar"></div>

            <div className="cv-layout">
              {/* LEFT COLUMN */}
              <aside className="cv-left-col">
                {/* Arch photo */}
                <div className="profile-photo-container">
                  <div className="photo-placeholder arch-photo">
                    <img src="/portrait.png" alt="Lan Đinh" />
                  </div>
                </div>

                {/* Contact list */}
                <div className="cv-section contact-section">
                  <ul className="contact-list">
                    <li className="contact-pill">
                      <Icons.Phone />
                      <span>0986 425 801</span>
                    </li>
                    <li className="contact-pill">
                      <Icons.Mail />
                      <span>ngoclan30@gmail.com</span>
                    </li>
                    <li className="contact-pill">
                      <Icons.Behance />
                      <a href="https://behance.net/kojiwon" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>behance.net/kojiwon</a>
                    </li>
                    <li className="contact-pill">
                      <Icons.Work />
                      <a href="https://imlandinh-design.vercel.app/#work" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{t("View Projects", "Xem các dự án")}</a>
                    </li>
                  </ul>
                </div>

                {/* Expertise */}
                <div className="cv-section">
                  <h3 className="section-title text-accent">{t("Expertise", "Chuyên môn")}</h3>
                  <ul className="bullet-list-left">
                    <li>{t("Product Design", "Product Design")}</li>
                    <li>{t("UX Research", "UX Research")}</li>
                    <li>{t("Wireframing & Prototyping", "Wireframing & Prototyping")}</li>
                    <li>{t("UI Design", "UI Design")}</li>
                    <li>{t("Graphic Design", "Graphic Design")}</li>
                    <li>{t("Brand Identity", "Brand Identity")}</li>
                    <li>{t("Web Design", "Web Design")}</li>
                  </ul>
                </div>

                {/* Tools */}
                <div className="cv-section">
                  <h3 className="section-title text-accent">{t("Tools", "Công cụ")}</h3>
                  <ul className="bullet-list-left">
                    <li>Figma</li>
                    <li>FigJam</li>
                    <li>Adobe Photoshop</li>
                    <li>Adobe Illustrator</li>
                    <li>After Effects</li>
                    <li>Lottie</li>
                    <li>Claude, Chat GPT, Gemini, Anti Gravity</li>
                  </ul>
                </div>

                {/* Languages */}
                <div className="cv-section">
                  <h3 className="section-title text-accent">{t("Languages", "Ngôn ngữ")}</h3>
                  <ul className="bullet-list-left">
                    <li>{t("Vietnamese (Native)", "Tiếng Việt (Bản ngữ)")}</li>
                    <li>{t("English (Basic Communication)", "Tiếng Anh (Giao tiếp cơ bản)")}</li>
                  </ul>
                </div>

              </aside>

              {/* RIGHT MAIN COLUMN */}
              <div className="cv-right-col">
                <header className="cv-hero">
                  <h1 className="designer-name">LAN ĐINH</h1>
                  <h2 className="designer-title text-accent">{t("UI/UX & Product Designer", "UI/UX & Product Designer")}</h2>
                </header>

                {/* Profile */}
                <div className="cv-section">
                  <h3 className="section-title text-accent">{t("Profile", "Giới thiệu")}</h3>
                  <p className="designer-summary">
                    {t(
                      "Product Designer with a strong foundation in Graphic Design, specializing in user-centered digital products for e-commerce. My experience spans graphic design, web design, and product design, enabling me to create intuitive, user-friendly experiences that balance user needs, business goals, and technical feasibility.",
                      "Với nền tảng trong Graphic Design và UI/UX, tôi hiện tập trung phát triển ở vai trò Product Designer, thiết kế các sản phẩm số lấy người dùng làm trung tâm và giải quyết bài toán kinh doanh thông qua trải nghiệm. Kinh nghiệm từ thiết kế đồ họa, website đến ứng dụng di động giúp tôi tiếp cận sản phẩm một cách toàn diện, từ giao diện, trải nghiệm đến khả năng triển khai thực tế."
                    )}
                  </p>
                </div>

                {/* Experience */}
                <div className="cv-section">
                  <h3 className="section-title text-accent">{t("Work Experience", "Kinh nghiệm làm việc")}</h3>
                  <div className="timeline">
                    {/* Job 1 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Product Designer", "Product Designer")}</span>
                          <span className="divider">|</span>
                          <span className="company">{t("Mobile World Investment Corporation (MWG)", "Mobile World Investment Corporation (MWG)")}</span>
                        </div>
                        <div className="exp-date">2023 – 2026</div>
                      </div>
                      <p className="exp-desc">
                        {t(
                          "Designed end-to-end product experiences for MWG Shop, focusing on core e-commerce journeys across Dien May Xanh, The Gioi Di Dong, TopZone, and companion mobile applications. Worked closely with Product Managers, Business Analysts, Engineers, and stakeholders to deliver user-centered solutions that aligned business goals with customer needs.",
                          "Thiết kế trải nghiệm sản phẩm đầu cuối cho hệ sinh thái thương mại điện tử MWG Shop, tập trung vào các hành trình mua sắm trên Điện Máy Xanh, Thế Giới Di Động, TopZone và các ứng dụng di động. Phối hợp chặt chẽ với Product Manager, Business Analyst, Developer và các bên liên quan để xây dựng những giải pháp cân bằng giữa nhu cầu người dùng và mục tiêu kinh doanh."
                        )}
                      </p>
                      <p style={{ fontWeight: 600, marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "18px", color: "var(--cv-text)" }}>
                        {t("Highlights", "Vai trò & Đóng góp")}
                      </p>
                      <ul className="exp-bullet-points">
                        <li>{t("Designed end-to-end experiences for web and mobile products, from user flows and wireframes to high-fidelity interfaces and developer handoff.", "Thiết kế trải nghiệm người dùng cho các tính năng trên nền tảng web và ứng dụng, từ User Flow, Wireframe, Prototype đến giao diện hoàn chỉnh.")}</li>
                        <li>{t("Led the design of core shopping experiences, including Homepage, Flash Sale, Voucher, Private Offers, Checkout, and Order Summary.", "Phụ trách thiết kế các tính năng cốt lõi như Homepage, Flash Sale, Voucher, Private Offer, Checkout và Order Summary.")}</li>
                        <li>{t("Conducted user research, usability testing, and design validation to support product decisions.", "Thực hiện nghiên cứu người dùng, kiểm thử khả năng sử dụng và xác thực giải pháp thiết kế.")}</li>
                        <li>{t("Collaborated on Design System improvements and reusable UI components to ensure consistency across the ecosystem.", "Xây dựng và phát triển các thành phần Design System nhằm đảm bảo tính nhất quán và khả năng mở rộng của sản phẩm.")}</li>
                        <li>{t("Continuously optimized user journeys based on business requirements, user feedback, and product strategy.", "Liên tục tối ưu trải nghiệm dựa trên phản hồi người dùng, dữ liệu và mục tiêu kinh doanh.")}</li>
                      </ul>
                    </div>

                    {/* Job 2 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Senior Graphic Designer", "Senior Graphic Designer")}</span>
                          <span className="divider">|</span>
                          <span className="company">{t("Mobile World Investment Corporation (MWG)", "Mobile World Investment Corporation (MWG)")}</span>
                        </div>
                        <div className="exp-date">2019 – 2023</div>
                      </div>
                      <p className="exp-desc">
                        {t(
                          "Led the visual design of large-scale e-commerce campaigns while expanding into digital product initiatives, bridging brand communication and user experience across web and mobile platforms.",
                          "Dẫn dắt thiết kế hình ảnh cho các chiến dịch thương mại điện tử quy mô lớn, đồng thời mở rộng sang các dự án trải nghiệm số, góp phần kết nối giữa hình ảnh thương hiệu và trải nghiệm người dùng trên các nền tảng trực tuyến."
                        )}
                      </p>
                      <p style={{ fontWeight: 600, marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "18px", color: "var(--cv-text)" }}>
                        {t("Highlights", "Vai trò & Đóng góp")}
                      </p>
                      <ul className="exp-bullet-points">
                        <li>{t("Designed landing pages, microsites, and digital campaign experiences for major e-commerce initiatives.", "Thiết kế Landing Page, Microsite và các giao diện phục vụ chiến dịch Digital Marketing.")}</li>
                        <li>{t("Developed key visuals and visual systems for promotional campaigns and seasonal sales events.", "Xây dựng Key Visual và hệ thống hình ảnh cho các chương trình bán hàng và chiến dịch thương mại điện tử.")}</li>
                        <li>{t("Collaborated with Marketing, Product Managers, and Engineering teams to deliver consistent digital experiences.", "Phối hợp cùng Marketing, Product và Developer để triển khai các dự án đa nền tảng.")}</li>
                        <li>{t("Established reusable design guidelines and visual standards across digital touchpoints.", "Xây dựng và chuẩn hóa hệ thống thiết kế nhằm đảm bảo tính nhất quán trên các nền tảng số.")}</li>
                        <li>{t("Improved user experience by refining visual hierarchy, content presentation, and interface consistency across e-commerce platforms.", "Góp phần cải thiện trải nghiệm người dùng thông qua việc tối ưu bố cục, hệ thống hình ảnh và khả năng tương tác trên website.")}</li>
                      </ul>
                    </div>

                    {/* Job 3 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Graphic Designer & UI Designer", "Graphic Designer & UI Designer")}</span>
                          <span className="divider">|</span>
                          <span className="company">{t("Cao Phong Co., Ltd", "Cao Phong Co., Ltd")}</span>
                        </div>
                        <div className="exp-date">2015 – 2017</div>
                      </div>
                      <p className="exp-desc">
                        {t(
                          "Expanded from graphic design into digital product design by contributing to website redesigns and mobile application projects while continuing to support brand communication and marketing initiatives.",
                          "Mở rộng từ thiết kế đồ họa sang thiết kế sản phẩm số thông qua các dự án website và ứng dụng di động, đồng thời tiếp tục phụ trách thiết kế hình ảnh truyền thông và hoạt động kinh doanh."
                        )}
                      </p>
                      <p style={{ fontWeight: 600, marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "18px", color: "var(--cv-text)" }}>
                        {t("Highlights", "Vai trò & Đóng góp")}
                      </p>
                      <ul className="exp-bullet-points">
                        <li>{t("Redesigned the company's website with a focus on usability, information architecture, and visual hierarchy.", "Thiết kế và cải tiến website công ty với định hướng nâng cao trải nghiệm người dùng và khả năng sử dụng.")}</li>
                        <li>{t("Designed user interfaces for food review, location-based, and financial applications.", "Thiết kế giao diện cho các ứng dụng trong lĩnh vực ẩm thực, đánh giá địa điểm và tài chính.")}</li>
                        <li>{t("Created user flows, wireframes, mockups, and high-fidelity UI for new product features.", "Xây dựng User Flow, Wireframe, Mockup và giao diện cho các tính năng mới.")}</li>
                        <li>{t("Worked closely with developers to ensure accurate implementation across web and mobile platforms.", "Phối hợp với đội ngũ phát triển để triển khai giao diện trên nền tảng web và mobile.")}</li>
                        <li>{t("Maintained visual consistency across digital products and brand identity.", "Đảm bảo tính nhất quán giữa giao diện sản phẩm và hệ thống nhận diện thương hiệu.")}</li>
                        <li>{t("Contributed to UI guidelines and reusable interface components.", "Hỗ trợ xây dựng các tiêu chuẩn giao diện và thành phần thiết kế nhằm nâng cao tính đồng nhất trong quá trình phát triển sản phẩm.")}</li>
                      </ul>
                    </div>

                    {/* Job 4 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Graphic Designer", "Graphic Designer")}</span>
                          <span className="divider">|</span>
                          <span className="company">{t("Cao Phong Co., Ltd", "Cao Phong Co., Ltd")}</span>
                        </div>
                        <div className="exp-date">2011 – 2015</div>
                      </div>
                      <p className="exp-desc">
                        {t(
                          "Created visual communication materials and brand assets for a wide range of business sectors, supporting marketing campaigns and corporate branding initiatives.",
                          "Thiết kế các ấn phẩm truyền thông và nhận diện thương hiệu cho nhiều lĩnh vực kinh doanh, góp phần xây dựng hình ảnh thương hiệu và hỗ trợ các hoạt động marketing."
                        )}
                      </p>
                      <p style={{ fontWeight: 600, marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "18px", color: "var(--cv-text)" }}>
                        {t("Highlights", "Vai trò & Đóng góp")}
                      </p>
                      <ul className="exp-bullet-points">
                        <li>{t("Designed banners, brochures, catalogs, POSM materials, and other marketing collateral.", "Thiết kế banner, brochure, catalogue, POSM và các ấn phẩm quảng cáo.")}</li>
                        <li>{t("Developed visual assets for advertising campaigns and brand communication.", "Xây dựng hệ thống hình ảnh cho các chiến dịch truyền thông và marketing.")}</li>
                        <li>{t("Collaborated with Sales and Marketing teams to create product presentation materials.", "Phối hợp với bộ phận Kinh doanh và Marketing để thiết kế tài liệu giới thiệu sản phẩm.")}</li>
                        <li>{t("Prepared print-ready artwork and coordinated with print vendors to ensure production quality.", "Chuẩn bị file in và làm việc với nhà in nhằm đảm bảo chất lượng thành phẩm.")}</li>
                      </ul>
                    </div>

                    {/* Job 5 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Web Designer (Outsourcing Projects)", "Web Designer (Outsource Projects)")}</span>
                          <span className="divider">|</span>
                          <span className="company">{t("TQ Design", "TQ Design")}</span>
                        </div>
                        <div className="exp-date">2010 – 2011</div>
                      </div>
                      <p className="exp-desc">
                        {t(
                          "Designed corporate websites for clients across multiple industries, translating business requirements into intuitive web experiences while collaborating closely with developers throughout implementation.",
                          "Thiết kế website cho khách hàng doanh nghiệp theo mô hình outsource, chuyển hóa yêu cầu kinh doanh thành các giao diện trực quan, dễ sử dụng và có khả năng triển khai thực tế."
                        )}
                      </p>
                      <p style={{ fontWeight: 600, marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "18px", color: "var(--cv-text)" }}>
                        {t("Highlights", "Vai trò & Đóng góp")}
                      </p>
                      <ul className="exp-bullet-points">
                        <li>{t("Designed responsive website layouts and corporate websites for outsourcing clients.", "Thiết kế giao diện website doanh nghiệp cho nhiều lĩnh vực khác nhau.")}</li>
                        <li>{t("Planned page structures, navigation, and content hierarchy to improve usability.", "Xây dựng cấu trúc trang, bố cục nội dung và hệ thống điều hướng nhằm nâng cao trải nghiệm người dùng.")}</li>
                        <li>{t("Produced UI mockups and design specifications for development.", "Chuẩn bị tài liệu thiết kế và bàn giao cho đội ngũ phát triển.")}</li>
                        <li>{t("Worked closely with developers to ensure design quality during implementation.", "Phối hợp với lập trình viên để đảm bảo giao diện được triển khai đúng thiết kế.")}</li>
                        <li>{t("Revised and refined designs based on client feedback and project requirements.", "Điều chỉnh giao diện dựa trên phản hồi của khách hàng trong suốt quá trình triển khai dự án.")}</li>
                      </ul>
                    </div>

                    {/* Job 6 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Graphic Designer", "Graphic Designer")}</span>
                          <span className="divider">|</span>
                          <span className="company">{t("Natural Rendez-Vous Co., Ltd", "Natural Rendez-Vous Co., Ltd")}</span>
                        </div>
                        <div className="exp-date">2007 – 2010</div>
                      </div>
                      <p className="exp-desc">
                        {t(
                          "Designed marketing collateral and print materials while collaborating with print vendors to ensure high-quality production and consistent brand communication.",
                          "Thiết kế các ấn phẩm truyền thông và sản phẩm in ấn, đồng thời phối hợp với nhà in trong toàn bộ quy trình sản xuất nhằm đảm bảo chất lượng thành phẩm và tính nhất quán của hình ảnh thương hiệu."
                        )}
                      </p>
                      <p style={{ fontWeight: 600, marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "13px", color: "var(--cv-text)" }}>
                        {t("Highlights", "Vai trò & Đóng góp")}
                      </p>
                      <ul className="exp-bullet-points">
                        <li>{t("Designed catalogs, brochures, banners, packaging, and marketing collateral.", "Thiết kế catalogue, brochure, banner và các ấn phẩm marketing.")}</li>
                        <li>{t("Prepared print-ready artwork and managed prepress files before production.", "Chuẩn bị file in, kiểm tra kỹ thuật và xử lý file trước khi sản xuất.")}</li>
                        <li>{t("Coordinated with print vendors to ensure color accuracy and production quality.", "Phối hợp với nhà in để kiểm soát màu sắc, chất liệu và chất lượng thành phẩm.")}</li>
                        <li>{t("Supported brand communication through consistent visual design across marketing materials.", "Hỗ trợ xây dựng hình ảnh thương hiệu thông qua hệ thống tài liệu truyền thông và quảng bá.")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="cv-section">
                  <h3 className="section-title text-accent">{t("Education", "Học vấn")}</h3>
                  <div className="timeline">
                    {/* Edu 1 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Diploma in Multimedia Design", "Cao đẳng Thiết kế Mỹ thuật Đa phương tiện")}</span>
                          <span className="divider">|</span>
                          <span className="company">{t("FPT Arena Multimedia", "FPT Arena Multimedia")}</span>
                        </div>
                        <div className="exp-date">2006-2007</div>
                      </div>
                      <p className="exp-desc">
                        {t(
                          "Built a strong foundation in visual communication, branding, print design, and digital media through hands-on projects. Trained in Adobe Photoshop, Illustrator, InDesign, CorelDRAW, Adobe Flash, and Motion Graphics, with practical experience in branding, web, and interactive design.",
                          "Được đào tạo nền tảng về thiết kế đồ họa, truyền thông thị giác và mỹ thuật đa phương tiện."
                        )}
                      </p>
                      <ul className="exp-bullet-points">
                        <li>
                          {t(
                            "Completed hands-on projects across branding, print, web, and interactive media.",
                            "Thành thạo các công cụ thiết kế như Adobe Photoshop, Illustrator, InDesign, CorelDRAW, Adobe Flash và Motion Graphics."
                          )}
                        </li>
                        {lang === "vi" && (
                          <li>
                            Thực hiện các dự án thực hành về nhận diện thương hiệu, thiết kế in ấn, website và truyền thông số.
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Edu 2 */}
                    <div className="experience-item">
                      <div className="exp-header">
                        <div className="exp-role-company">
                          <span className="role">{t("Continuous Learning", "Đang tiếp tục học tập & Phát triển chuyên môn")}</span>
                        </div>
                      </div>
                      <ul className="exp-bullet-points" style={{ marginTop: "0.5rem" }}>
                        <li>Product Design</li>
                        <li>UX Research</li>
                        <li>Design System</li>
                        <li>{t("AI-assisted Design Workflow", "Ứng dụng AI trong quy trình thiết kế")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CVPage() {
  return (
    <Suspense fallback={null}>
      <CVPageContent />
    </Suspense>
  );
}
