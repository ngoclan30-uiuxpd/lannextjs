export interface ProjectMetric {
  label: string;
  value: string;
  positive: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  company: string;
  year: string;
  tags: string[];
  description: string;
  metrics: ProjectMetric[];
  accent: string;
  bg: string;
  image: string;
  // Detail page content
  challenge: string;
  challengeImage?: string;
  approach: string;
  approachImage?: string;
  results: string;
  resultsImage?: string;
  keyDecisions?: string;
  keyDecisionsImage?: string;
  outcome?: string;
  outcomeImage?: string;
  reflection?: string;
  reflectionImage?: string;
  role: string;
  duration: string;
  team: string;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "redesign-home",
    title: "Balancing Business Campaigns and Product Discovery on the MWG Shop Homepage",
    company: "MWG Shopping",
    year: "2025",
    tags: ["E-commerce", "Conversion", "Systems"],
    description:
      "Redesigning the homepage to support a growing e-commerce business while preserving a clear and intuitive shopping experience.",
    metrics: [
      { label: "Cart abandonment", value: "-28%", positive: true },
      { label: "Checkout time", value: "-41s", positive: true },
      { label: "Revenue impact", value: "$12M", positive: true },
    ],
    accent: "#E8A842",
    bg: "#161410",
    image: "/projects/pj1-thumb-hero-home.png",
    challengeImage: "/projects/pj1-context-en.png",
    approachImage: "/projects/pj1-challenge-en.png",
    challenge:
      `As MWG Shop continued to grow, the homepage evolved beyond a simple product discovery screen. It gradually became the central destination for a wide range of business initiatives, including Flash Sales, seasonal campaigns, personalized offers, vouchers, curated collections, videos, and quick navigation.

Each new initiative addressed a legitimate business need. However, over time, these additions accumulated within the same interface, creating increasing competition for users' attention. Promotional content became denser, information hierarchy became less distinguishable, and introducing new campaigns required continuous adjustments to the existing layout.

This was no longer a visual design issue.
It was a natural consequence of a product that had outgrown the structure of its homepage.

Instead of redesigning individual UI components, this project focused on redefining how the homepage should evolve alongside the product itself.`,
    approach:
      `After reviewing the existing experience and business requirements, we realized that the problem wasn't simply about reorganizing content.

The homepage had to satisfy three objectives that often competed with one another.

### Business
Increase the visibility of campaigns, promotions, vouchers, and seasonal events without limiting future marketing opportunities.

### Users
Help users quickly discover products and relevant offers without overwhelming them with promotional content.

### Product
Create a homepage structure that could continuously accommodate new business initiatives without requiring major layout changes every time a campaign was launched.

The challenge was not choosing one objective over another, but designing a solution that could balance all three.`,
    results:
      `Rather than optimizing individual sections, we stepped back and reconsidered the homepage as a complete system.

Every design decision was guided by four principles.

### Design around shopping behavior
Organize the homepage based on how people naturally browse and shop, rather than the priority of individual campaigns.
---
### Reduce visual competition
Create a clearer information hierarchy so promotional content supports, rather than interrupts, product discovery.
---
### Standardize campaign presentation
Define reusable presentation patterns that can accommodate different campaign types without introducing new layouts every time.
---
### Design for future growth
Build a homepage structure that remains flexible as new business requirements continue to emerge.`,
    resultsImage: "/projects/pj1-approach-en.png",
    keyDecisions:
      `This project was not about adding new features.
It was about making a series of structural decisions that would improve both usability and long-term scalability.
---
### Decision 01
#### Reorganized the homepage information hierarchy instead of adding more promotional modules.
The homepage was restructured around users' shopping journey, ensuring key actions and content were prioritized while reducing competition among promotional sections.
![Before vs. After Homepage](/projects/pj1-hinh-anh-decision-01-en.png)
---
### Decision 02
#### Standardize campaign presentation across different business initiatives.
Instead of creating custom layouts for every campaign, reusable presentation patterns were introduced, allowing different campaigns to share a consistent visual structure.
![Campaign Theme examples](/projects/pj1-hinh-anh-decision-02-en.png)
---
### Decision 03
#### Redesign the voucher experience to better support the shopping journey.
Voucher-related information was reorganized into a more consistent experience, making available offers easier to discover and understand during shopping.
![Voucher Experience Redesign](/projects/pj1-hinh-anh-decision-03-en.png)
---
### Decision 04
#### Build reusable homepage modules instead of campaign-specific interfaces.
Shared components such as promotional banners and campaign modules were designed to support multiple business scenarios while maintaining visual consistency across the homepage.
![Reusable Homepage Modules](/projects/pj1-hinh-anh-decision-04-en.png)`,
    outcome:
      `The redesign established a clearer homepage structure that better balanced commercial objectives with everyday shopping needs.

Rather than optimizing a single campaign, the project introduced a more consistent framework for presenting promotional content, making future homepage updates easier to integrate while preserving a coherent user experience.

Most importantly, the homepage evolved from a collection of individual promotional sections into a more structured experience capable of supporting the continued growth of the product.`,
    reflection:
      `This project fundamentally changed how I think about Product Design.

Previously, I tended to focus on improving individual screens or solving isolated interface problems.

Working on MWG Shop taught me that meaningful product design often happens at the system level. As products grow, designers are not only responsible for creating better interfaces—they also need to create structures that allow the product to evolve without continuously increasing complexity.

Designing for growth means balancing user needs, business objectives, and long-term maintainability within the same experience.`,
    role: "Lead Product Designer",
    duration: "12 weeks",
    team: "2 designers, 4 engineers, 1 PM, 1 researcher",
  },
  {
    id: "02",
    slug: "comparison",
    title: "Product Comparison & Smart Labels",
    company: "MWG Shopping",
    year: "2025",
    tags: ["E-commerce", "Decision UX", "Interaction Design"],
    description:
      "Designing a seamless product comparison flow and automated product labels to support customer decision-making directly within the e-commerce journey.",
    metrics: [
      { label: "Purchase decision time", value: "-22%", positive: true },
      { label: "Comparison adoption", value: "+34%", positive: true },
      { label: "Shopping drop-off", value: "-15%", positive: true },
    ],
    accent: "#4274e8ff",
    bg: "#101413",
    image: "/projects/pj2-comparison.png",
    challenge:
      `Purchasing electronics often involves evaluating several similar products before making a decision. However, the existing shopping experience required users to open multiple product pages and manually compare specifications.

To support a more informed purchasing journey, MWG Shop introduced a product comparison feature that enables users to compare products directly within the shopping flow across Category, Search, and Product Detail pages. The solution also includes automated product labels to surface key selling points consistently across the catalogue.`,
    challengeImage: "/projects/pj2-context-en.png",
    approach:
      `The challenge was not simply building a comparison page, but designing a seamless comparison experience that works naturally throughout the shopping journey.

The solution needed to:
• Allow users to start comparing products from multiple entry points.
• Keep comparison progress visible while users continue browsing.
• Present large amounts of technical information in a readable format.
• Support business constraints, including comparing only products within the same category and limiting comparison to three products.`,
    approachImage: "/projects/pj2-challenge-en.png",
    results:
      `Rather than creating a standalone feature, I focused on integrating comparison into existing shopping behaviour.

The design strategy was guided by four principles:

#### Compare Anywhere
Users should be able to start comparing products wherever they discover them.

---

#### Reduce Cognitive Load
Technical specifications should be structured to make differences easy to scan instead of requiring users to memorise information.

---

#### Maintain Shopping Flow
Comparison should never interrupt browsing. Users can continue exploring products while keeping track of their selections.

---

#### Design for Scalability
Interaction patterns and business rules should be reusable across different product categories and adaptable to future business changes.`,
    resultsImage: "/projects/pj2-approach-en.png",
    keyDecisions:
      `#### Multi-entry Comparison
Comparison actions are available directly on Category pages, Search results, and Product Detail pages. This reduces unnecessary navigation and allows comparison to begin naturally during product discovery.

---

#### Sticky Comparison Widget
Once the first product is selected, a sticky comparison widget appears at the bottom of the screen. This component keeps users aware of selected products while allowing them to continue browsing without losing context.

---

#### Side-by-side Comparison
The comparison page organises products into parallel columns, making specification differences easier to scan. Information is grouped into logical sections instead of long uninterrupted specification lists, improving readability.

---

#### Smart Product Labels
Products automatically display one priority badge (**Best Price**, **Bestseller**, or **Top Rated**). Displaying only the highest-priority label reduces visual noise while helping users identify product strengths more quickly.

---

#### Clear Selection Rules
To ensure a consistent experience: compare up to three products, only products within the same category can be compared, and invalid selections trigger immediate system feedback.`,
    keyDecisionsImage: "/projects/pj2-decisions-en.png",
    outcome:
      `The final solution creates a continuous comparison journey instead of a standalone feature.

Users can:
• Start comparison from multiple shopping touchpoints.
• Keep selected products visible while browsing.
• Compare up to three products side by side.
• Quickly identify product differences through structured specifications and smart labels.
• Make purchase decisions without repeatedly switching between product pages.`,
    outcomeImage: "/projects/pj2-outcome-en.png",
    reflection:
      `This project reinforced that comparison is fundamentally a decision-support experience rather than a specification display.

One of the biggest lessons was balancing user needs with business and technical constraints. Limiting comparison to three products, restricting comparisons to the same category, and introducing configurable product labels all contributed to a simpler and more scalable experience.

Working closely with Product Managers, Business Analysts, and Engineers also highlighted the importance of designing not only the interface, but the underlying interaction logic and business rules that support long-term product growth.`,
    reflectionImage: "/projects/pj2-reflection-en.png",
    role: "Lead Product Designer",
    duration: "10 weeks",
    team: "2 designers, 3 engineers, 1 PM, 1 BA",
  },
  {
    id: "03",
    slug: "private-offer",
    title: "Personalized Offers",
    company: "MWG Shopping",
    year: "2025",
    tags: ["Personalization & Business Goal", "CRM", "Loyalty"],
    description:
      "Designed a personalized, end-to-end promotional experience that balances complex business rules with user convenience to increase conversion and trust.",
    metrics: [],
    accent: "#10B981",
    bg: "#120F1A",
    image: "/projects/pj3-private offer.png",
    challengeImage: "/projects/pj3-context-en.png",
    challenge:
      `Private Offer is an exclusive promotion available only to eligible customers on MWG Shop. Unlike regular promotions, this campaign includes multiple business constraints, such as limited promotional quota, purchase limits per customer, and incompatibility with vouchers.

However, these rules were not communicated consistently throughout the shopping journey. Customers often discovered restrictions only at the final checkout step, resulting in confusion and unnecessary purchase interruptions.

The goal of this project was to redesign the entire Private Offer experience, making promotional rules easier to understand while ensuring a smoother purchasing journey from product discovery to checkout.`,
    approach:
      `After reviewing the product requirements, I identified four key UX challenges.

#### Customers could not identify Private Offer products or browse the full list
• Private Offer products lacked a consistent visual identity across Listing, Product Detail, Cart, and Checkout.
• No entry point to access the Private Offer Landing Page from the homepage.

---

#### Promotional rules were difficult to understand
Private Offer includes multiple business rules:
• Limited promotional quota
• Purchase limit per customer
• Voucher exclusion
These conditions were displayed inconsistently or too late in the purchase journey, causing misunderstandings.

---

#### Promotion availability changes dynamically
The remaining promotional quota changes in real time.
When customers attempt to purchase after the quota is exhausted, the system needs to communicate the change clearly without disrupting the shopping experience.

---

#### Multiple edge cases throughout the purchase flow
The experience must support various scenarios, including:
• Partially eligible promotional quantities
• Purchase limit exceeded
• Mixed carts containing regular and Private Offer products
• Orders with vouchers already applied
These cases need to be handled consistently from Product Detail to Cart and Checkout.`,
    approachImage: "/projects/pj3-challenge-en.png",
    results:
      `Instead of designing isolated screens, I approached this project from an End-to-End Shopping Experience perspective.

The optimization was structured in four phases:

#### Understand business rules
Worked closely with Product Owner and Business Analyst to understand all promotion rules, including promotional quota, purchase limit, voucher restriction, out-of-stock behavior, and cart/checkout exceptions.

---

#### Map the complete shopping journey
Identified every touchpoint where customers need guidance or confirmation: Landing Page, Product Listing, Product Detail, Add to Cart, Cart, and Checkout. This ensured a consistent experience across the entire purchase flow.

---

#### Design for multiple states
Rather than focusing only on the happy path, I designed for various real-world scenarios: promotion available, low remaining quota, promotion sold out, purchase limit exceeded, voucher conflict, mixed order, and product variants.

---

#### Prototype & Iterate
Validated user flows and interactions through prototyping and stakeholder feedback.`,
    resultsImage: "/projects/pj3-approach-en.png",
    keyDecisions:
      `#### Create a consistent Private Offer identity
Introduced a unified "Private Offer" badge across Product Listing, Product Detail, Cart, and Checkout, allowing customers to immediately recognize products that belong to the promotion.
![Create a consistent Private Offer identity](/projects/pj3-decision-01-en.png)

---

#### Display real-time promotional availability
Added dynamic quota indicators such as "Remaining X/Y" or "Only X left" to improve transparency while creating a natural sense of urgency.
![Display real-time promotional availability](/projects/pj3-decision-02-en.png)

---

#### Communicate promotion rules earlier
Instead of showing restrictions only during Checkout, important conditions are displayed directly on the Product Detail page, including promotional quota, purchase limit, and voucher restriction.
![Communicate promotion rules earlier](/projects/pj3-decision-03-en.png)

---

#### Provide clear system feedback
When promotional quota is exhausted or purchase limits are exceeded, the system presents contextual popups and updates the Cart accordingly, instead of leaving customers uncertain about what happened.
This makes the shopping experience more transparent and predictable.
![Provide clear system feedback](/projects/pj3-decision-04-en.png)

---

#### Optimize the Checkout experience
When an order contains Private Offer products, we disable voucher selection, explain the reason clearly, and guide users to purchase regular products separately if they want to use vouchers. For partially eligible purchases, Checkout separates promotional and regular-price items into different rows.
![Optimize the Checkout experience](/projects/pj3-decision-05-en.png)

---

#### Improve product discovery on the Landing Page
Redesigned the campaign landing page with a hero banner, horizontal featured products, sticky category tabs, and filters by category and price to help customers discover relevant offers more efficiently.
![Improve product discovery on the Landing Page](/projects/pj3-decision-06-en.png)`,
    outcome:
      `The project delivered a consistent Private Offer experience from product discovery through checkout.

Key improvements include:
• Standardized Private Offer presentation across the shopping journey.
• Made promotion rules easier to understand before purchase.
• Supported complex business scenarios such as promotional quotas, purchase limits, and mixed orders.
• Established a scalable design pattern for future limited-time promotional campaigns.`,
    outcomeImage: "/projects/pj3-outcome-en.png",
    reflection:
      `This project strengthened my ability to design for complex business constraints rather than simple UI interactions.

One of my biggest takeaways was learning how to translate complicated promotion rules into intuitive user experiences without overwhelming customers.

I also realized that designing for eCommerce is less about creating beautiful screens and more about anticipating edge cases, handling exceptions gracefully, and maintaining a seamless experience throughout the entire shopping journey.`,
    reflectionImage: "/projects/pj3-reflection-en.png",
    role: "Senior Product Designer",
    duration: "12 weeks",
    team: "1 designer, 3 engineers, 1 PM, 1 BA",
  },
  {
    id: "04",
    slug: "flash-sale",
    title: "Flash Sale Experience",
    company: "MWG Shopping",
    year: "2025",
    tags: ["Campaign", "Conversion", "Seasonal Business"],
    description:
      "Designing a real-time deal discovery experience that helps users discover and purchase limited-time offers faster.",
    metrics: [],
    accent: "#F87171",
    bg: "#150E0E",
    image: "/projects/pj4-flashsale.png",
    challengeImage: "/projects/pj4-detail-en.png",
    challenge:
      `Flash Sale is one of the key sales-driving campaigns on MWG Shop. As the number of products increased, users had to spend more time browsing to find relevant deals, while the time-sensitive nature of the campaign was not clearly reflected throughout the experience.

The goal of this project was to optimize the Flash Sale Landing Page, enabling users to discover products faster and make purchase decisions within a limited time.`,
    approach:
      `Based on the Product Requirement Document (PRD) and discussions with the Product Owner, I identified four key challenges:
• Featured deals were not prioritized on the page.
• Long product lists made browsing and category switching inefficient.
• The interface lacked strong urgency cues during the Flash Sale period.
• Sold-out products were mixed with available items, disrupting the shopping experience.`,
    approachImage: "/projects/pj4-challenge-en.png",
    results:
      `Instead of redesigning the entire landing page, I focused on improving the touchpoints that had the greatest impact on the shopping journey.

The design strategy was guided by four principles:

#### Prioritize featured deals
Designed a dedicated Top Deal section to showcase the first 10 Flash Sale products, allowing users to discover the best offers immediately after entering the page.

---

#### Reduce navigation effort
Introduced a sticky Header, Countdown, and Category Tabs, along with price and category filters, so users could browse and refine products without repeatedly scrolling back to the top.

---

#### Create a stronger sense of urgency
Displayed a server-based countdown timer together with inventory states such as Buy Now, Running Low, Only X Left, and Sold Out, helping users quickly understand product availability and encouraging faster purchase decisions.

---

#### Keep the product list relevant
For sold-out products, I designed a dedicated visual state by grayscaling the product card, displaying a Sold Out badge, and automatically moving those items to the end of the list to prioritize products that were still available.`,
    resultsImage: "/projects/pj4-approach-en.png",
    keyDecisions:
      `#### Top Deal Section
Highlighted the first 10 Flash Sale products in a dedicated section to improve the visibility of the most valuable deals.
![Top Deal Section](/projects/pj4-decision-01-en.png)

---

#### Sticky Navigation
Kept the Header, Countdown, and Category Tabs visible while scrolling, allowing users to navigate long product lists with minimal effort.
![Sticky Navigation](/projects/pj4-decision-02-en.png)

---

#### Simplified Filtering
Focused on the two most important filtering options—Price and Category—to keep the experience simple and efficient.
![Simplified Filtering](/projects/pj4-decision-03-en.png)

---

#### Clear Product States
Designed consistent inventory states so users could instantly understand product availability and make faster purchasing decisions.
![Clear Product States](/projects/pj4-decision-04-en.png)

---

#### Sold-out Handling
Instead of removing unavailable products, I moved them to the end of the list and applied a dedicated visual treatment, ensuring the browsing experience remained focused on products that could still be purchased.
![Sold-out Handling](/projects/pj4-decision-05-en.png)`,
    outcome:
      `The redesigned Flash Sale experience helped:
• Surface featured deals immediately upon entering the page.
• Reduce navigation effort through sticky navigation and simplified filtering.
• Reinforce purchase urgency with countdown and inventory indicators.
• Keep product listings focused on available items, creating a cleaner and more efficient browsing experience.

Due to the project's confidentiality, business metrics cannot be disclosed.`,
    outcomeImage: "/projects/pj4-outcome-en.png",
    reflection:
      `This project reinforced an important lesson for me: designing a Flash Sale experience is not about making the interface more visually engaging—it is about helping users discover the right deal and make purchase decisions as quickly as possible.

Through this project, I learned that:
• Prioritizing the right information is more valuable than displaying everything at once.
• Small interaction improvements, such as sticky navigation and clear product states, can significantly improve long-list browsing.
• Effective product design requires balancing business goals, user experience, and technical constraints to deliver a practical and scalable solution.`,
    reflectionImage: "/projects/pj4-reflection-en.png",
    role: "Senior Product Designer",
    duration: "10 weeks",
    team: "2 designers, 3 engineers, 1 PM, 1 researcher",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

const viTranslations: Record<string, Partial<Project>> = {
  "redesign-home": {
    title: "Thiết kế lại Trang chủ MWG Shop nhằm cân bằng giữa tăng trưởng kinh doanh và trải nghiệm mua sắm",
    description: "Tái cấu trúc kiến trúc thông tin và các mô-đun nội dung để hỗ trợ nhiều hoạt động kinh doanh hơn, đồng thời giúp người dùng dễ dàng khám phá ưu đãi và sản phẩm trong suốt hành trình mua sắm.",
    challengeImage: "/projects/pj1-context-vn.png",
    approachImage: "/projects/pj1-challenge-vn.png",
    resultsImage: "/projects/pj1-approach-vn.png",
    challenge: `Một sản phẩm thương mại điện tử không ngừng thay đổi.

Mỗi chương trình bán hàng mới, mỗi chiến dịch marketing, mỗi tính năng được bổ sung đều tạo thêm một nhu cầu hiển thị trên Trang chủ.

Theo thời gian, Trang chủ của MWG Shop không chỉ còn là nơi giới thiệu sản phẩm.

Nó dần trở thành nơi tập trung của nhiều hoạt động khác nhau:

- Flash Sale
- Voucher
- Bộ sưu tập sản phẩm
- Ưu đãi cá nhân hóa
- Campaign theo mùa
- Video
- Các điểm điều hướng nhanh

Mỗi yêu cầu đều có giá trị đối với Business.

Nhưng khi mọi nội dung đều cần được ưu tiên hiển thị, cấu trúc Trang chủ bắt đầu trở nên quá tải.

**Đây không phải lỗi của một màn hình.**

Đây là hệ quả tự nhiên khi sản phẩm phát triển.`,
    approach: `Sau khi phân tích yêu cầu từ PRD và hiện trạng sản phẩm, nhóm không xem đây là bài toán "thiết kế lại giao diện".

Mà là bài toán cân bằng giữa ba mục tiêu.

### Business
Liên tục triển khai nhiều chiến dịch mới.

Cần nhiều vị trí hiển thị hơn.
---
### User
Vẫn cần tìm được sản phẩm nhanh.

Không bị quá tải.
---
### Product
Trang chủ phải tiếp tục phát triển trong tương lai mà không cần thay đổi cấu trúc mỗi khi có chiến dịch mới.`,
    results: `Thay vì tối ưu hóa từng phần riêng lẻ, chúng tôi lùi lại và xem xét trang chủ như một hệ thống hoàn chỉnh.

Mọi quyết định thiết kế đều dựa trên bốn nguyên tắc.

### Thiết kế xoay quanh hành vi mua sắm
Tổ chức trang chủ dựa trên cách mọi người duyệt web và mua sắm tự nhiên, thay vì mức độ ưu tiên của từng chiến dịch riêng lẻ.
---
### Giảm thiểu sự cạnh tranh về mặt thị giác
Tạo ra hệ thống phân cấp thông tin rõ ràng hơn để nội dung quảng cáo hỗ trợ, thay vì cản trở việc khám phá sản phẩm.
---
### Chuẩn hóa cách hiển thị chiến dịch
Xác định các mẫu hiển thị có thể tái sử dụng để phù hợp với nhiều loại chiến dịch khác nhau mà không cần tạo bố cục mới mỗi lần.
---
### Thiết kế cho sự phát triển trong tương lai
Xây dựng cấu trúc trang chủ linh hoạt khi các yêu cầu kinh doanh mới tiếp tục xuất hiện.`,
    keyDecisions: `Dự án này không nhằm mục đích thêm các tính năng mới.
Đó là việc đưa ra một loạt các quyết định mang tính cấu trúc nhằm cải thiện cả khả năng sử dụng và khả năng mở rộng lâu dài.
---
### Quyết định 01
#### Thiết kế lại thứ bậc thông tin thay vì tiếp tục bổ sung thêm các khu vực khuyến mãi.
Trang chủ được tái cấu trúc dựa trên hành trình mua sắm của người dùng, giúp các nội dung quan trọng được ưu tiên hiển thị rõ ràng hơn, đồng thời giảm sự cạnh tranh giữa các chương trình khuyến mãi.
![Giao diện Trang chủ Trước & Sau khi làm lại](/projects/pj1-hinh-anh-decision-01-vn.png)
---
### Quyết định 02
#### Chuẩn hóa cách hiển thị chiến dịch trên các sáng kiến kinh doanh khác nhau.
Thay vì tạo bố cục tùy chỉnh cho mỗi chiến dịch, các mẫu hiển thị có thể tái sử dụng đã được giới thiệu, cho phép các chiến dịch khác nhau chia sẻ cấu trúc trực quan nhất quán.
![Các ví dụ về Chủ đề Chiến dịch](/projects/pj1-hinh-anh-decision-02-vn.png)
---
### Quyết định 03
#### Thiết kế lại trải nghiệm voucher để hỗ trợ tốt hơn cho hành trình mua sắm.
Thông tin liên quan đến voucher được tổ chức lại thành một trải nghiệm nhất quán hơn, giúp các ưu đãi có sẵn dễ dàng được khám phá và hiểu hơn trong quá trình mua sắm.
![Trải nghiệm Voucher được thiết kế lại](/projects/pj1-hinh-anh-decision-03-vn.png)
---
### Quyết định 04
#### Xây dựng các mô-đun trang chủ có thể tái sử dụng thay vì giao diện dành riêng cho từng chiến dịch.
Các thành phần dùng chung như banner quảng cáo và mô-đun chiến dịch được thiết kế để hỗ trợ nhiều kịch bản kinh doanh khác nhau trong khi vẫn duy trì tính nhất quán trực quan trên toàn bộ trang chủ.
![Các mô-đun Trang chủ tái sử dụng](/projects/pj1-hinh-anh-decision-04-vn.png)`,
    outcome: `Việc thiết kế lại đã thiết lập một cấu trúc trang chủ rõ ràng hơn, cân bằng tốt hơn giữa các mục tiêu thương mại và nhu cầu mua sắm hàng ngày.

Thay vì tối ưu hóa một chiến dịch đơn lẻ, dự án đã giới thiệu một khuôn khổ nhất quán hơn để hiển thị nội dung quảng cáo, giúp các bản cập nhật trang chủ trong tương lai dễ dàng tích hợp hơn trong khi vẫn duy trì trải nghiệm người dùng liền mạch.

Quan trọng nhất, trang chủ đã phát triển từ một tập hợp các phần quảng cáo riêng lẻ thành một trải nghiệm có cấu trúc hơn, có khả năng hỗ trợ sự phát triển liên tục của sản phẩm.`,
    reflection: `Dự án này đã thay đổi căn bản cách tôi suy nghĩ về Thiết kế Sản phẩm.

Trước đây, tôi có xu hướng tập trung vào việc cải thiện từng màn hình riêng lẻ hoặc giải quyết các vấn đề giao diện đơn lập.

Làm việc tại MWG Shop đã dạy tôi rằng thiết kế sản phẩm có ý nghĩa thường diễn ra ở cấp độ hệ thống. Khi sản phẩm phát triển, nhà thiết kế không chỉ chịu trách nhiệm tạo ra giao diện tốt hơn—họ còn cần tạo ra cấu trúc cho phép sản phẩm phát triển mà không làm tăng độ phức tạp liên tục.

Thiết kế cho sự phát triển có nghĩa là cân bằng nhu cầu người dùng, mục tiêu kinh doanh và khả năng bảo trì lâu dài trong cùng một trải nghiệm.`,
    role: "Nhà thiết kế Sản phẩm Chính",
    duration: "12 tuần",
    team: "2 nhà thiết kế, 4 kỹ sư, 1 PM, 1 nhà nghiên cứu",
    metrics: [
      { label: "Bỏ giỏ hàng", value: "-28%", positive: true },
      { label: "Thời gian thanh toán", value: "-41s", positive: true },
      { label: "Tác động doanh thu", value: "$12M", positive: true },
    ]
  },
  "comparison": {
    title: "So sánh sản phẩm & Nhãn thông minh",
    description: "Thiết kế luồng so sánh sản phẩm liền mạch và nhãn sản phẩm tự động nhằm hỗ trợ khách hàng ra quyết định mua sắm trực tiếp trong hành trình TMĐT.",
    challenge:
      `Khi mua sắm các sản phẩm điện máy, người dùng thường phải cân nhắc nhiều sản phẩm trước khi đưa ra quyết định. Tuy nhiên, trải nghiệm hiện tại buộc họ phải mở nhiều trang sản phẩm khác nhau rồi tự ghi nhớ và đối chiếu các thông số kỹ thuật.

Mục tiêu của dự án là xây dựng một trải nghiệm so sánh sản phẩm xuyên suốt hành trình mua sắm, giúp người dùng đánh giá sản phẩm nhanh hơn mà không cần rời khỏi luồng duyệt sản phẩm. Đồng thời, hệ thống cũng tự động hiển thị các nhãn nổi bật như **Giá Tốt Nhất**, **Bán Chạy Nhất** và **Đánh Giá Cao** nhằm hỗ trợ người dùng đưa ra quyết định dễ dàng hơn.`,
    challengeImage: "/projects/pj2-context-vn.png",
    approach:
      `Bài toán không chỉ là thiết kế một trang so sánh sản phẩm, mà là tạo ra một trải nghiệm liền mạch từ lúc người dùng khám phá sản phẩm cho đến khi đưa ra quyết định mua hàng.

Giải pháp cần đáp ứng các yêu cầu:
• Có thể bắt đầu so sánh từ nhiều điểm truy cập khác nhau.
• Người dùng luôn biết mình đang so sánh những sản phẩm nào.
• Thông số kỹ thuật được trình bày rõ ràng, dễ quét và dễ đối chiếu.
• Tuân thủ các ràng buộc nghiệp vụ như chỉ so sánh sản phẩm cùng ngành hàng và tối đa ba sản phẩm.`,
    approachImage: "/projects/pj2-challenge-vn.png",
    results:
      `Thay vì xây dựng một tính năng hoạt động độc lập, tôi tập trung tích hợp việc so sánh trực tiếp vào hành vi mua sắm hiện có của người dùng.

Quá trình thiết kế được định hướng bởi bốn nguyên tắc:

#### So sánh ở bất kỳ đâu
Người dùng có thể bắt đầu so sánh ngay tại nơi họ đang xem sản phẩm.

---

#### Giảm tải ghi nhớ
Thông tin cần được sắp xếp để người dùng dễ dàng nhận ra sự khác biệt thay vì phải ghi nhớ thông số.

---

#### Không làm gián đoạn hành trình mua sắm
Người dùng vẫn có thể tiếp tục khám phá sản phẩm trong khi quá trình so sánh luôn được duy trì.

---

#### Thiết kế có khả năng mở rộng
Các quy tắc nghiệp vụ và tương tác cần có thể tái sử dụng cho nhiều ngành hàng khác nhau trong tương lai.`,
    resultsImage: "/projects/pj2-approach-vn.png",
    keyDecisions:
      `#### Cho phép bắt đầu so sánh từ nhiều điểm truy cập
Tính năng Compare được đặt ngay tại:
• Trang ngành hàng
• Trang kết quả tìm kiếm
• Trang chi tiết sản phẩm

Điều này giúp người dùng bắt đầu quá trình so sánh ngay trong lúc khám phá sản phẩm mà không cần chuyển sang một luồng riêng.

---

#### Duy trì trạng thái so sánh trong suốt hành trình
Sau khi chọn sản phẩm đầu tiên, một Sticky Comparison Widget xuất hiện ở cuối màn hình.

Widget này giúp người dùng:
• Theo dõi các sản phẩm đã chọn.
• Tiếp tục duyệt sản phẩm.
• Mở trang so sánh bất kỳ lúc nào.

Nhờ đó, quá trình so sánh không bị gián đoạn khi người dùng tiếp tục khám phá sản phẩm khác.

---

#### Trình bày thông tin theo dạng so sánh song song
Trang Compare hiển thị các sản phẩm theo từng cột song song.

Thông tin được chia thành các nhóm như:
• Giá bán
• Thông số nổi bật
• Thông số kỹ thuật
• Thuộc tính sản phẩm

Cách trình bày này giúp người dùng nhanh chóng nhận ra điểm khác biệt giữa các sản phẩm mà không phải liên tục chuyển đổi giữa nhiều trang.

---

#### Đơn giản hóa việc thêm sản phẩm
Việc thêm sản phẩm mới được thực hiện thông qua Bottom Sheet, giúp người dùng tiếp tục thao tác ngay trên ngữ cảnh hiện tại mà không cần điều hướng sang màn hình khác.

---

#### Làm nổi bật giá trị của sản phẩm bằng Smart Labels
Hệ thống tự động hiển thị một nhãn ưu tiên dựa trên quy tắc nghiệp vụ:
• Giá Tốt Nhất
• Bán Chạy Nhất
• Đánh Giá Cao

Mỗi sản phẩm chỉ hiển thị một nhãn có độ ưu tiên cao nhất nhằm giảm nhiễu giao diện nhưng vẫn truyền tải được điểm mạnh nổi bật của sản phẩm.`,
    keyDecisionsImage: "/projects/pj2-decisions-vn.png",
    outcome:
      `Giải pháp cuối cùng tạo nên một trải nghiệm so sánh xuyên suốt thay vì chỉ là một trang Compare riêng lẻ.

Người dùng có thể:
• Bắt đầu so sánh từ nhiều điểm trong hành trình mua sắm.
• Luôn theo dõi được các sản phẩm đã chọn thông qua Sticky Widget.
• So sánh tối đa ba sản phẩm trên cùng một màn hình.
• Nhanh chóng nhận ra sự khác biệt thông qua bố cục trực quan và hệ thống Smart Labels.
• Đưa ra quyết định mua hàng với ít thao tác và ít phải ghi nhớ hơn.`,
    outcomeImage: "/projects/pj2-outcome-vn.png",
    reflection:
      `Dự án giúp tôi nhận ra rằng một tính năng so sánh hiệu quả không nằm ở việc hiển thị thật nhiều thông tin, mà ở cách giúp người dùng ra quyết định với ít công sức hơn.

Thông qua quá trình làm việc cùng PM, BA và Developer, tôi cũng hiểu rõ hơn tầm quan trọng của việc thiết kế song song giữa trải nghiệm người dùng và các quy tắc nghiệp vụ. Những giới hạn như chỉ so sánh tối đa ba sản phẩm hay chỉ hiển thị một Smart Label tưởng chừng là ràng buộc, nhưng thực tế lại giúp trải nghiệm trở nên rõ ràng và dễ sử dụng hơn.`,
    reflectionImage: "/projects/pj2-reflection-vn.png",
    role: "Nhà thiết kế Sản phẩm Chính",
    duration: "10 tuần",
    team: "2 nhà thiết kế, 3 kỹ sư, 1 PM, 1 BA",
    metrics: [
      { label: "Thời gian quyết định", value: "-22%", positive: true },
      { label: "Tỷ lệ sử dụng so sánh", value: "+34%", positive: true },
      { label: "Tỷ lệ rời bỏ mua sắm", value: "-15%", positive: true },
    ]
  },
  "private-offer": {
    title: "Hệ thống cá nhân hóa ưu đãi",
    description: "Thiết kế trải nghiệm mua sắm end-to-end cho chương trình Ưu đãi riêng, cân bằng giữa business rules phức tạp và trải nghiệm người dùng nhằm giúp việc mua sắm trở nên minh bạch, dễ hiểu và hiệu quả hơn.",
    challenge: "Private Offer là chương trình ưu đãi dành riêng cho một nhóm khách hàng đủ điều kiện trên MWG Shop. Khác với các chương trình giảm giá thông thường, ưu đãi này đi kèm nhiều quy tắc như giới hạn số lượng suất, giới hạn số lượng mua theo khách hàng và không được áp dụng cùng Voucher.\nTuy nhiên, trải nghiệm cũ chưa thể hiện rõ các điều kiện này xuyên suốt hành trình mua sắm. Người dùng chỉ phát hiện các ràng buộc ở những bước cuối, dẫn đến nhầm lẫn và làm gián đoạn quá trình thanh toán.\nMục tiêu của dự án là thiết kế lại toàn bộ trải nghiệm Private Offer, giúp người dùng dễ dàng nhận biết ưu đãi, hiểu rõ điều kiện áp dụng và hoàn tất đơn hàng với ít bất ngờ nhất.",
    challengeImage: "/projects/pj3-context-vn.png",
    approach: "Trong quá trình phân tích yêu cầu sản phẩm, mình xác định 4 vấn đề chính cần giải quyết:\n\n#### Người dùng không biết được sản phẩm nào có Ưu đãi riêng hoặc muốn xem toàn bộ\n• Các sản phẩm ưu đãi riêng chưa có điểm nhận diện nhất quán giữa Listing, Product Detail, Cart và Checkout.\n• Thiếu vị trí hiển thị để vào trang Landing Page Ưu đãi riêng từ trang chủ.\n\n---\n\n#### Điều kiện áp dụng ưu đãi không được truyền đạt rõ ràng\nPrivate Offer có nhiều rule:\n• Giới hạn số suất\n• Giới hạn số lượng mua\n• Không áp dụng Voucher\nNhưng thông tin chỉ xuất hiện rời rạc hoặc quá muộn khiến người dùng dễ hiểu sai.\n\n---\n\n#### Trạng thái ưu đãi thay đổi theo thời gian\nSố lượng suất còn lại thay đổi liên tục.\nNếu người dùng thêm sản phẩm khi ưu đãi đã hết suất, hệ thống cần phản hồi rõ ràng mà không làm họ mất phương hướng.\n\n---\n\n#### Hành trình mua hàng có nhiều trường hợp đặc biệt\nMột sản phẩm có thể:\n• Còn một phần suất ưu đãi\n• Vượt giới hạn mua\n• Kết hợp với sản phẩm thường\n• Đã áp Voucher trước đó\nNhững trường hợp này cần được xử lý xuyên suốt từ Product Detail → Cart → Checkout.",
    approachImage: "/projects/pj3-challenge-vn.png",
    results: "Thay vì chỉ thiết kế từng màn hình riêng lẻ, mình tiếp cận theo End-to-End Shopping Experience, tập trung vào toàn bộ hành trình mua hàng.\nQuá trình thiết kế gồm bốn bước:\n\n#### Hiểu Business Rule\nLàm việc cùng PO và BA để tổng hợp toàn bộ rule của chương trình: giới hạn suất, giới hạn số lượng theo khách hàng, quy tắc Voucher, hành vi khi hết suất, các exception trong Cart và Checkout.\n\n---\n\n#### Mapping toàn bộ User Flow\nXác định các điểm người dùng cần được thông báo hoặc hỗ trợ quyết định: Landing Page, Product Listing, Product Detail, Add to Cart, Cart, Checkout. Điều này giúp đảm bảo thông tin luôn nhất quán trong toàn bộ trải nghiệm.\n\n---\n\n#### Thiết kế theo trạng thái (State-driven Design)\nThay vì chỉ thiết kế happy path, mình xây dựng đầy đủ các trạng thái: còn nhiều suất, sắp hết suất, hết suất, vượt giới hạn mua, có Voucher, đơn hàng hỗn hợp, sản phẩm có nhiều biến thể. Nhờ đó giao diện có thể phản hồi đúng với từng tình huống thực tế.\n\n---\n\n#### Prototype & Hoàn thiện\nKiểm chứng luồng trải nghiệm và tương tác thông qua prototype và phản hồi từ các bên liên quan.",
    resultsImage: "/projects/pj3-approach-vn.png",
    keyDecisions:
      `#### Xây dựng hệ thống nhận diện Private Offer xuyên suốt
Đưa Label "Ưu đãi riêng bạn" xuất hiện nhất quán trên Product Card, Product Detail, Cart, và Checkout. Người dùng luôn biết mình đang mua sản phẩm thuộc chương trình ưu đãi đặc biệt.
![Xây dựng hệ thống nhận diện Private Offer xuyên suốt](/projects/pj3-decision-01-vn.png)

---

#### Hiển thị số suất còn lại theo thời gian thực
Bổ sung Badge số lượng "Còn X/Y" hoặc "Chỉ còn X suất". Thông tin được cập nhật theo trạng thái thực tế để tăng tính minh bạch và tạo cảm giác khan hiếm hợp lý.
![Hiển thị số suất còn lại theo thời gian thực](/projects/pj3-decision-02-vn.png)

---

#### Đưa điều kiện áp dụng lên sớm
Thay vì chỉ báo lỗi ở Checkout, các điều kiện được hiển thị ngay từ Product Detail bao gồm giới hạn số suất, giới hạn số lượng mua, và không áp dụng Voucher. Người dùng hiểu rõ điều kiện trước khi quyết định mua.
![Đưa điều kiện áp dụng lên sớm](/projects/pj3-decision-03-vn.png)

---

#### Thiết kế phản hồi rõ ràng khi ưu đãi thay đổi
Khi hết suất hoặc vượt giới hạn mua, hệ thống hiển thị popup và cập nhật lại trạng thái sản phẩm trong Cart thay vì để người dùng tự suy đoán nguyên nhân, giúp giảm cảm giác "đặt hàng bị lỗi".
![Thiết kế phản hồi rõ ràng khi ưu đãi thay đổi](/projects/pj3-decision-04-vn.png)

---

#### Tối ưu trải nghiệm Checkout
Khi đơn hàng chứa sản phẩm Private Offer, chúng tôi disable Voucher, giải thích rõ lý do, và hướng dẫn người dùng mua riêng sản phẩm thường nếu muốn sử dụng Voucher. Checkout hiển thị thành hai dòng riêng biệt đối với các trường hợp mua số lượng lớn áp dụng cả hai giá ưu đãi và giá thường.
![Tối ưu trải nghiệm Checkout](/projects/pj3-decision-05-vn.png)

---

#### Nâng cấp Landing Page giúp khám phá ưu đãi nhanh hơn
Thiết kế lại Landing Page với Hero Banner, Horizontal Highlight Listing, Sticky Category Tabs, và bộ lọc theo danh mục và giá giúp người dùng tìm được ưu đãi phù hợp nhanh hơn.
![Nâng cấp Landing Page giúp khám phá ưu đãi nhanh hơn](/projects/pj3-decision-06-vn.png)`,
    outcome:
      `Dự án tạo ra một trải nghiệm Private Offer nhất quán từ lúc người dùng khám phá sản phẩm đến khi hoàn tất thanh toán.
Một số cải thiện nổi bật:
• Chuẩn hóa cách hiển thị Private Offer trên toàn bộ hành trình mua hàng.
• Giảm khả năng người dùng hiểu sai về điều kiện áp dụng ưu đãi.
• Hỗ trợ đầy đủ các trường hợp đặc biệt như giới hạn suất, giới hạn mua và đơn hàng hỗn hợp.
• Thiết kế có thể mở rộng cho nhiều chiến dịch ưu đãi giới hạn trong tương lai.`,
    outcomeImage: "/projects/pj3-outcome-vn.png",
    reflection:
      `Đây là dự án giúp mình hiểu rõ hơn về việc thiết kế cho các bài toán có nhiều business rule. Điều mình học được không chỉ là thiết kế giao diện, mà là cách chuyển những quy tắc phức tạp thành trải nghiệm dễ hiểu và nhất quán cho người dùng.
Mình cũng nhận ra rằng trong các dự án eCommerce, phần khó nhất không nằm ở màn hình đẹp mà nằm ở việc dự đoán đầy đủ các trạng thái, xử lý exception và đảm bảo trải nghiệm không bị đứt gãy trên toàn bộ hành trình mua sắm.`,
    reflectionImage: "/projects/pj3-reflection-vn.png",
    role: "Nhà thiết kế Sản phẩm Cấp cao",
    duration: "12 tuần",
    team: "1 nhà thiết kế, 3 kỹ sư, 1 PM, 1 BA",
    metrics: []
  },
  "flash-sale": {
    title: "Trải nghiệm Flash Sale",
    description: "Thiết kế trải nghiệm săn deal theo thời gian thực, giúp người dùng khám phá và mua ưu đãi giới hạn nhanh hơn.",
    challenge: "Flash Sale là một trong những chương trình thúc đẩy doanh thu quan trọng trên MWG Shop. Tuy nhiên, khi số lượng sản phẩm tăng lên, người dùng phải mất nhiều thời gian để tìm deal phù hợp, trong khi các yếu tố tạo cảm giác khẩn cấp của một chương trình giới hạn thời gian vẫn chưa được thể hiện rõ.\n\nMục tiêu của dự án là tối ưu trải nghiệm mua sắm trên Landing Page Flash Sale, giúp người dùng khám phá sản phẩm nhanh hơn và đưa ra quyết định mua trong thời gian ngắn.",
    challengeImage: "/projects/pj4-detail-vn.png",
    approach: "Dựa trên yêu cầu từ Product Owner và PRD, mình tập trung giải quyết 4 vấn đề chính:\n• Các deal nổi bật chưa được ưu tiên hiển thị.\n• Danh sách sản phẩm dài khiến việc tìm kiếm và chuyển danh mục mất nhiều thao tác.\n• Chưa tạo đủ cảm giác cấp bách trong suốt thời gian Flash Sale diễn ra.\n• Sản phẩm hết suất vẫn xuất hiện xen kẽ với sản phẩm còn hàng, làm gián đoạn trải nghiệm mua sắm.",
    approachImage: "/projects/pj4-challenge-vn.png",
    results: "Thay vì thiết kế lại toàn bộ Landing Page, mình lựa chọn tối ưu các điểm ảnh hưởng trực tiếp đến hành trình mua hàng.\n\nChiến lược tối ưu được dẫn dắt bởi bốn nguyên tắc:\n\n#### Ưu tiên các deal quan trọng\nThiết kế khu vực Top Deal hiển thị 10 sản phẩm đầu tiên theo danh sách Flash Sale, giúp người dùng tiếp cận các ưu đãi nổi bật ngay khi mở trang.\n\n---\n\n#### Giảm chi phí điều hướng\nGiữ cố định Header, Countdown và Tab Filter khi cuộn, đồng thời bổ sung bộ lọc theo giá và danh mục để người dùng tìm đúng sản phẩm nhanh hơn.\n\n---\n\n#### Tăng cảm giác khẩn cấp\nHiển thị Countdown theo Server Time cùng các trạng thái tồn kho như Mua ngay, Sắp hết, Còn lại x sản phẩm và Hết suất, giúp người dùng dễ dàng nhận biết mức độ khan hiếm của sản phẩm.\n\n---\n\n#### Giữ danh sách luôn hữu ích\nĐối với sản phẩm hết suất, thiết kế chuyển toàn bộ thẻ sang màu xám, hiển thị trạng thái \"Hết suất\" và tự động đưa xuống cuối danh sách để ưu tiên các sản phẩm còn khả dụng.",
    resultsImage: "/projects/pj4-approach-vn.png",
    keyDecisions:
      `#### Top Deal
Đưa 10 sản phẩm đầu tiên thành một khu vực riêng để tăng khả năng khám phá các deal nổi bật ngay từ đầu trang.
![Top Deal](/projects/pj4-decision-01-vn.png)

---

#### Sticky Navigation
Giữ cố định Header, Countdown và Tab Filter trong quá trình cuộn nhằm giảm thao tác điều hướng trên danh sách dài.
![Sticky Navigation](/projects/pj4-decision-02-vn.png)

---

#### Bộ lọc tối giản
Chỉ giữ hai tiêu chí quan trọng nhất là Giá và Danh mục, giúp người dùng lọc nhanh mà không làm tăng độ phức tạp.
![Bộ lọc tối giản](/projects/pj4-decision-03-vn.png)

---

#### Trạng thái sản phẩm rõ ràng
Thiết kế các trạng thái mua hàng nhất quán để người dùng dễ nhận biết tình trạng của từng sản phẩm và đưa ra quyết định nhanh hơn.
![Trạng thái sản phẩm rõ ràng](/projects/pj4-decision-04-vn.png)

---

#### Xử lý sản phẩm hết suất
Không ẩn sản phẩm khỏi danh sách mà chuyển xuống cuối và thay đổi trạng thái hiển thị, giúp danh sách luôn ưu tiên các sản phẩm còn có thể mua.
![Xử lý sản phẩm hết suất](/projects/pj4-decision-05-vn.png)`,
    outcome:
      `Landing Page Flash Sale sau khi hoàn thiện giúp:
• Làm nổi bật các deal quan trọng ngay khi người dùng truy cập.
• Giảm số thao tác khi tìm kiếm sản phẩm nhờ Sticky Navigation và bộ lọc.
• Tăng cảm giác cấp bách bằng Countdown và trạng thái tồn kho.
• Ưu tiên hiển thị các sản phẩm còn khả dụng, giúp trải nghiệm duyệt danh sách mạch lạc hơn.

Do dự án thuộc sản phẩm nội bộ, mình không thể chia sẻ các chỉ số kinh doanh sau khi triển khai.`,
    outcomeImage: "/projects/pj4-outcome-vn.png",
    reflection:
      `Dự án giúp mình hiểu rằng tối ưu Flash Sale không nằm ở việc bổ sung nhiều thành phần mới, mà là giúp người dùng tìm được deal nhanh hơn và giảm thời gian ra quyết định mua hàng.

Qua dự án này, mình rút ra ba bài học chính:
• Ưu tiên đúng nội dung quan trọng sẽ tạo ra trải nghiệm hiệu quả hơn là hiển thị mọi thứ cùng một lúc.
• Những cải tiến nhỏ như Sticky Navigation hay cách xử lý trạng thái sản phẩm có thể tạo ra khác biệt lớn trên các danh sách dài.
• Một giải pháp tốt cần cân bằng giữa mục tiêu kinh doanh, trải nghiệm người dùng và các ràng buộc kỹ thuật từ hệ thống.`,
    reflectionImage: "/projects/pj4-reflection-vn.png",
    role: "Nhà thiết kế Sản phẩm Cấp cao",
    duration: "10 tuần",
    team: "2 nhà thiết kế, 3 kỹ sư, 1 PM, 1 nhà nghiên cứu",
    metrics: []
  }
};

export function translateProject(project: Project, lang: string): Project {
  if (lang !== "vi") return project;
  const translation = viTranslations[project.slug];
  if (!translation) return project;
  return { ...project, ...translation };
}
