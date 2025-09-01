# 知識內容開發指南 v12.0

**版本目標：** 建立一個以「主題權威」為核心的戰略性內容生產系統，系統性地規劃、生成並佈局內容，以全面佔領特定健康主題的所有相關搜尋意圖。

---

## PART 1: 內容策略與寫作框架

本部分定義了如何撰寫能贏得搜尋引擎、解答用戶疑惑並建立夥伴般信任的內容。

### 1.1 核心原則：E-E-A-T

- **Experience (經驗):** 核心是同理並闡述使用者的真實情境與困惑。
- **Expertise (專業):** 將專業知識轉化為簡單、可執行的建議。
- **Authoritativeness (權威):** 引用權威來源，而非扮演權威來源。我們是知識的「優質整理者」與「轉譯者」。
- **Trustworthiness (可信):** 資訊透明準確，坦誠說明知識的邊界。

### 1.2 語氣與風格

**核心：** 知識分享者的口吻

- **定位:** 一個聰明、熱心且善於化繁為簡的朋友。我們不是醫生或研究員，而是致力於為您搜集、整理、並解釋最可靠健康資訊的知識夥伴。
- **句式:** 避免使用「本站團隊」、「我們的專家」等詞彙。改用更直接、更親切的語氣，例如：「這裡的關鍵在於...」、「您可以這樣理解...」、「許多人常有的疑問是...」。
- **數據驅動:** 適時引用數據，並解釋數字背後的意義。
- **富有同理心:** 站在讀者的角度思考，從他們的日常生活情境出發。
- **引用來源規範:** 清晰註明資訊來源，讓讀者知道我們的內容是基於可靠證據。

### 1.3 文章結構：問題解決導向模組

- **[模組] YAML Front Matter:** 結構化 SEO 元數據。
- **[模組] H1 標題:** 必須直觀地反映它能解決的問題。
- **[模組] 開篇引言 (Opening Quote):** 用一個簡潔有力的金句，總結文章要傳達的核心知識點。
- **[模組] 痛點與解決方案 (Problem/Solution Block):** 鎖定讀者痛點。
- **[模組] 快速摘要 (Summary Table):** 服務於沒時間的讀者。
- **[模組] 安全性提醒 (Safety Notice):** 基於知識分享者的責任，提醒讀者注意安全事項。
- **[模組] 目錄 (Table of Contents):** 提升使用者體驗。
- **[模組] 主要內容章節 (H2/H3/H4):** 深度闡述知識。
- **[模組] 核心觀念解析 (Core Concept Breakdown):**
    - **用途:** 在最複雜的段落後，用最簡單的比喻或類比，幫助讀者理解核心概念。
    - **格式:** 使用 Blockquote 搭配一個引導性的標題，例如 `> 💡 簡單來說，您可以這樣理解：`。
- **[模組] 客觀選購指南 (Objective Buying Guide):** 教育讀者如何客觀評估，而非推薦。
- **[模組] 常見問題 (FAQ):** 解答讀者最後的疑慮。
- **[模組] 免責聲明 (Disclaimer):** 聲明平台的知識分享者角色。

---

## PART 2: 技術實踐與成效追蹤 (v2.0)

本部分是將 PART 1 的內容策略轉化為網頁的具體施工藍圖，以 `post/fish-oil.html` 為標準範本。

### 2.1 標準 HTML 結構

這是每一個新頁面的標準「建築藍圖」。它定義了頁面的基本骨架，包含進度條、側邊欄目錄、文章主體等區塊。

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Meta - 由 PART 3 指令生成 -->
    <title>頁面標題 | Caregiver 營養百科</title>
    <meta name="description" content="頁面描述..." />
    <meta name="keywords" content="關鍵字1, 關鍵字2, 關鍵字3" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">
    <link rel="shortcut icon" type="image/svg+xml" href="../favicon.svg">

    <!-- CSS - 見 2.2 -->
    <style>
      /* CSS 內容見 2.2 */
    </style>
</head>
<body>
    <!-- Progress Bar -->
    <div class="progress-bar" id="progressBar"></div>

    <!-- Header Component -->
    <div id="header-component"></div>

    <!-- Article Container -->
    <div class="article-container">
      <!-- Sidebar -->
      <aside class="sidebar" id="sidebar">
        <div class="toc">
          <h3 class="toc-title"><span>目錄</span></h3>
          <ul class="toc-list">
            <!-- 目錄連結會由 JS 動態生成 -->
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="article-content">
        <!-- Article Header -->
        <header class="article-header">
          <div class="article-hero">
            <span class="article-category">營養素指南</span>
            <h1 class="article-title">[文章主標題]</h1>
            <p class="article-subtitle">[文章副標題]</p>
            <div class="article-meta">
              <span>✍️ 專業營養師審核</span>
              <span>📅 [發布日期]</span>
              <span>⏱️ 閱讀時間：[閱讀時間]</span>
            </div>
          </div>
        </header>

        <!-- Article Body -->
        <article class="article-body">
          <!-- Markdown 轉 HTML 後的內容貼於此處 -->
        </article>

        <!-- Related Articles -->
        <h2 class="related-title">相關營養素</h2>
        <div class="related-grid">
          <!-- 相關文章卡片 -->
        </div>
      </main>
    </div>

    <!-- Disclaimer Section -->
    <section class="disclaimer">
      <div class="disclaimer-content">
        <h3>免責聲明</h3>
        <p>本資訊僅供教育目的...</p>
      </div>
    </section>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <!-- Load Components -->
    <script src="../assets/js/deus-analytics-component.js"></script>
    <script src="../assets/js/deus-header-component.js"></script>
    <script src="../assets/js/deus-footer-component.js"></script>

    <!-- Interactive JS - 見 2.3 -->
    <script>
      // 互動腳本見 2.3
    </script>
</body>
</html>
```

### 2.2 標準 CSS 樣式

此為所有文章頁面的標準樣式表，定義了顏色、排版、間距與各種 UI 組件的視覺外觀。

```css
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
        line-height: 1.8;
        color: #2d3748;
        background: #faf8f5;
      }

      /* Progress Bar */
      .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff6b35 0%, #ff8f65 100%);
        z-index: 1001;
        transition: width 0.3s ease;
      }

      .share-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4a5568;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
      }

      .share-btn:hover {
        background: #ff6b35;
        color: white;
      }

      /* Article Layout */
      .article-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 100px 20px 60px;
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 60px;
        position: relative;
      }

      /* Sidebar Table of Contents */
      .sidebar {
        position: sticky;
        top: 100px;
        height: fit-content;
        max-height: calc(100vh - 120px);
        overflow-y: auto;
      }

      .toc {
        background: white;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      }

      .toc-title {
        font-size: 1.2em;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .toc-list {
        list-style: none;
      }

      .toc-list li {
        margin-bottom: 8px;
      }

      .toc-list a {
        color: #4a5568;
        text-decoration: none;
        font-size: 0.95em;
        display: block;
        padding: 8px 12px;
        transition: all 0.3s ease;
        position: relative;
        border-radius: 8px;
        border-left: 3px solid transparent;
      }

      .toc-list a.active {
        color: #ff6b35;
        background: rgba(255, 107, 53, 0.1);
        border-left-color: #ff6b35;
        font-weight: 600;
      }

      .toc-list a:hover {
        color: #ff6b35;
        background: rgba(255, 107, 53, 0.08);
        border-left-color: #ff8f65;
        transform: translateX(2px);
      }

      /* 第一階層樣式 */
      .toc-list a:not(.sub-item) {
        font-weight: 600;
        background: rgba(255, 107, 53, 0.05);
        margin-bottom: 4px;
      }

      /* 第二階層樣式 */
      .toc-list a.sub-item {
        margin-left: 16px;
        font-size: 0.9em;
        color: #718096;
        background: rgba(113, 128, 150, 0.03);
        border-left-color: #e2e8f0;
        position: relative;
      }

      /* 第二階層前的連線效果 */
      .toc-list a.sub-item::before {
        content: "";
        position: absolute;
        left: -12px;
        top: 50%;
        width: 8px;
        height: 1px;
        background: #d1d5db;
        transform: translateY(-50%);
      }

      .toc-list a.active.sub-item {
        color: #ff6b35;
        background: rgba(255, 107, 53, 0.08);
        border-left-color: #ff8f65;
      }

      .toc-list a.active.sub-item::before {
        background: #ff8f65;
      }

      /* Main Content Area */
      .article-content {
        background: white;
        border-radius: 20px;
        padding: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      }

      /* Article Header */
      .article-header {
        margin-bottom: 60px;
        position: relative;
      }

      .article-hero {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border-radius: 20px;
        padding: 60px;
        margin-bottom: 40px;
        position: relative;
        overflow: hidden;
      }

      .article-hero::before {
        content: "🐟";
        position: absolute;
        right: -20px;
        top: -20px;
        font-size: 150px;
        opacity: 0.1;
        transform: rotate(-15deg);
      }

      .article-hero::after {
        content: "💊";
        position: absolute;
        left: -10px;
        bottom: -10px;
        font-size: 100px;
        opacity: 0.1;
        transform: rotate(15deg);
      }

      .article-category {
        display: inline-block;
        background: white;
        color: #ff6b35;
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 0.9em;
        font-weight: 600;
        margin-bottom: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .article-title {
        font-size: 2.5em;
        font-weight: 800;
        color: #2d3748;
        line-height: 1.3;
        margin-bottom: 20px;
        max-width: 800px;
      }

      .article-subtitle {
        font-size: 1.3em;
        color: #4a5568;
        line-height: 1.6;
        max-width: 700px;
        margin-bottom: 30px;
      }

      .article-meta {
        display: flex;
        gap: 30px;
        color: #718096;
        font-size: 0.95em;
        flex-wrap: wrap;
      }

      .article-meta span {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Alert Boxes */
      .alert {
        padding: 20px 25px;
        border-radius: 15px;
        margin: 30px 0;
        position: relative;
        overflow: hidden;
      }

      .alert::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
      }

      .alert-doctor {
        background: #fee2e2;
        color: #991b1b;
      }

      .alert-doctor::before {
        background: #dc2626;
      }

      .alert-nutritionist {
        background: #dbeafe;
        color: #1e3a8a;
      }

      .alert-nutritionist::before {
        background: #2563eb;
      }

      .alert-tip {
        background: #f0fdf4;
        color: #14532d;
      }

      .alert-tip::before {
        background: #22c55e;
      }

      .alert strong {
        font-weight: 700;
        display: block;
        margin-bottom: 8px;
      }

      /* Tables */
      .data-table {
        width: 100%;
        border-collapse: collapse;
        margin: 30px 0;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
      }

      .data-table thead {
        background: linear-gradient(135deg, #ff6b35 0%, #ff8f65 100%);
        color: white;
      }

      .data-table th,
      .data-table td {
        padding: 15px 20px;
        text-align: left;
      }

      .data-table th {
        font-weight: 600;
      }

      .data-table tbody tr {
        border-bottom: 1px solid #e5e7eb;
        transition: background 0.3s ease;
      }

      .data-table tbody tr:hover {
        background: #f9fafb;
      }

      .data-table tbody tr:last-child {
        border-bottom: none;
      }

      /* Visual Info Cards */
      .info-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 40px 0;
      }

      .info-card {
        background: white;
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        display: block;
      }

      .info-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        text-decoration: none;
        color: inherit;
      }

      .info-card:visited {
        color: inherit;
        text-decoration: none;
      }

      .info-card:active {
        color: inherit;
        text-decoration: none;
      }

      .info-card:focus {
        outline: 2px solid #ff6b35;
        outline-offset: 2px;
        text-decoration: none;
        color: inherit;
      }

      .info-card-icon {
        font-size: 3em;
        margin-bottom: 15px;
        display: block;
      }

      .info-card-title {
        font-size: 1.3em;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 10px;
      }

      .info-card-desc {
        color: #718096;
        font-size: 0.95em;
        line-height: 1.6;
      }

      .info-card-value {
        font-size: 2em;
        font-weight: 800;
        color: #ff6b35;
        margin: 10px 0;
      }

      /* Quick Read Card Specific Styles */
      .quick-read-card {
        cursor: pointer;
        position: relative;
        padding-bottom: 50px; /* 為點擊提示留出空間 */
      }

      .quick-read-card:hover .card-click-hint {
        transform: translateX(-50%) scale(1.05);
      }

      .card-click-hint {
        position: absolute;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff6b35, #ff8f65);
        color: white;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.8em;
        font-weight: 500;
        opacity: 1;
        transition: all 0.3s ease;
        white-space: nowrap;
        pointer-events: none;
        text-align: center;
      }

      .card-click-hint::before {
        content: "";
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #ff6b35;
      }

      /* Orange underline for strong text in benefits section */
      #benefits .info-card-desc strong {
        border-bottom: 2px solid #ff6b35;
        padding-bottom: 1px;
      }

      /* Orange underline for highlighted nutrients */
      .highlight-nutrient {
        border-bottom: 2px solid #ff6b35;
        padding-bottom: 1px;
      }

      /* Story Section */
      .story-intro {
        background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
        border-radius: 20px;
        padding: 40px;
        margin: 40px 0;
        position: relative;
      }

      .story-intro h3 {
        font-size: 1.8em;
        color: #3730a3;
        margin-bottom: 20px;
      }

      .story-intro p {
        font-size: 1.1em;
        line-height: 1.8;
        color: #4c1d95;
      }

      /* Quick Test */
      .quick-test {
        background: #f0fdf4;
        border-radius: 20px;
        padding: 40px;
        margin: 40px 0;
        text-align: center;
      }

      .quick-test h3 {
        font-size: 1.8em;
        color: #14532d;
        margin-bottom: 20px;
      }

      .test-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 30px;
      }

      .test-option {
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .test-option:hover {
        background: #fff7ed;
        border-color: #fed7aa;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(251, 146, 60, 0.15);
      }

      .test-option input[type="checkbox"] {
        display: none;
      }

      .test-option.selected {
        background: linear-gradient(135deg, #ff6b35 0%, #fb923c 100%);
        border-color: #ff6b35;
        color: white;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
      }
      .test-option.selected:hover {
        background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
        transform: translateY(-2px);
        color: white;
      }

      /* Content Typography */
      .article-body h2 {
        font-size: 2em;
        font-weight: 700;
        color: #2d3748;
        margin: 50px 0 30px;
        padding-top: 20px;
        position: relative;
      }

      .article-body h2::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 4px;
        background: linear-gradient(90deg, #ff6b35 0%, #ff8f65 100%);
        border-radius: 2px;
      }

      .article-body h3 {
        font-size: 1.5em;
        font-weight: 600;
        color: #2d3748;
        margin: 35px 0 20px;
      }

      .article-body h4 {
        font-size: 1.2em;
        font-weight: 600;
        color: #4a5568;
        margin: 25px 0 15px;
      }

      .article-body p {
        margin-bottom: 20px;
        color: #4a5568;
      }

      .article-body ul,
      .article-body ol {
        margin: 20px 0;
        padding-left: 30px;
        color: #4a5568;
      }

      .article-body li {
        margin-bottom: 10px;
      }

      .article-body blockquote {
        border-left: 4px solid #ff6b35;
        padding-left: 20px;
        margin: 30px 0;
        font-style: italic;
        color: #718096;
      }

      .article-body strong {
        color: #2d3748;
        font-weight: 600;
      }

      /* FAQ Section */
      .faq-section {
        margin-top: 60px;
        padding-top: 40px;
        border-top: 2px solid #e5e7eb;
      }

      .faq-item {
        background: #f9fafb;
        border-radius: 15px;
        margin-bottom: 20px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .faq-item:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .faq-question {
        padding: 20px 25px;
        font-weight: 600;
        color: #2d3748;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
      }

      .faq-question::after {
        content: "+";
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.5em;
        color: #ff6b35;
        transition: transform 0.3s ease;
      }

      .faq-item.active .faq-question::after {
        transform: translateY(-50%) rotate(45deg);
      }

      .faq-answer {
        padding: 0 25px;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .faq-item.active .faq-answer {
        padding: 0 25px 20px;
        max-height: 500px;
      }

      /* Related Articles */
      .related-section {
        margin-top: 80px;
        padding: 60px 0;
        background: #faf8f5;
        border-radius: 20px;
      }

      .related-title {
        font-size: 2em;
        font-weight: 700;
        color: #2d3748;
        text-align: center;
        margin-bottom: 40px;
      }

      .related-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
      }

      .related-card {
        background: white;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        text-decoration: none;
      }

      .related-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
      }

      .related-card-tag {
        display: inline-block;
        background: #e0e7ff;
        color: #3730a3;
        padding: 5px 15px;
        border-radius: 15px;
        font-size: 0.85em;
        font-weight: 600;
        margin-bottom: 15px;
      }

      .related-card-title {
        font-size: 1.3em;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 10px;
        line-height: 1.4;
      }

      .related-card-desc {
        color: #718096;
        font-size: 0.95em;
        line-height: 1.6;
      }

      /* Mobile Sidebar Toggle - Hidden */
      .mobile-toc-toggle {
        display: none !important;
      }

      /* Mobile TOC Overlay Animations */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translate(-50%, -40%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }

      /* Disclaimer */
      .disclaimer {
        background: #f9fafb;
        padding: 60px 0;
        text-align: center;
      }
      .disclaimer-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 20px;
      }
      .disclaimer h3 {
        color: #4b5563;
        margin-bottom: 15px;
        font-size: 1.5em;
      }
      .disclaimer p {
        color: #6b7280;
        font-size: 0.95em;
        line-height: 1.8;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .article-container {
          grid-template-columns: 1fr;
          gap: 0;
        }

        .sidebar {
          display: none;
        }

        .article-content {
          padding: 30px;
        }

        .article-title {
          font-size: 2em;
        }
      }

      @media (max-width: 768px) {
        .nav-breadcrumb {
          display: none;
        }

        .article-content {
          padding: 20px;
          border-radius: 15px;
        }

        .article-title {
          font-size: 1.8em;
        }

        .article-meta {
          flex-direction: column;
          gap: 10px;
        }

        .data-table {
          font-size: 0.9em;
        }

        .data-table th,
        .data-table td {
          padding: 10px;
        }

        .related-grid {
          grid-template-columns: 1fr;
        }
      }

      /* Print Styles */
      @media print {
        .header,
        .sidebar,
        .mobile-toc-toggle,
        .share-btn,
        .related-section {
          display: none;
        }

        body {
          background: white;
        }

        .alert {
          border: 1px solid #ddd;
        }
      }
```

### 2.3 標準 JavaScript

此為所有文章頁面的標準腳本，負責處理組件初始化與頁面互動功能。

```javascript
// Progress Bar
function updateProgressBar() {
  const scrollPosition = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollPosition / documentHeight) * 100;
  document.getElementById("progressBar").style.width = scrollPercentage + "%";
}
window.addEventListener("scroll", updateProgressBar);

// TOC Highlighting & Smooth Scroll
// ... JS code from fish-oil.html ...

// FAQ Toggle
// ... JS code from fish-oil.html ...

// Component Initialization
document.addEventListener("DOMContentLoaded", function () {
  // ... GA, Header, Footer Init ...
});
```

### 2.4 Sitemap.xml 更新

每次發布新頁面，都需要更新 `/sitemap.xml` 這份給 Google 的「網站地圖」。

```xml
<url>
  <loc>https://life.maxlist.xyz/post/your-new-page.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### 2.5 最終檢查清單

- [ ] 已建立 HTML 檔案並貼入內容。
- [ ] 已確認 SEO Meta 資訊正確填入。
- [ ] 已確認 CSS 與 JS 路徑與程式碼正確。
- [ ] 已更新 sitemap.xml。
- [ ] 已在不同裝置（電腦、手機）上預覽頁面。
- [ ] 已確認側邊欄目錄可正常運作。
- [ ] 已確認 FAQ 等互動元素可正常使用。

---

## PART 3: 戰略性 AI 協作指令庫 (Prompt Library v12.0)

(... a shortened version of PART 3 for brevity ...)
