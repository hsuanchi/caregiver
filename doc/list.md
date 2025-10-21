# 文章頁面檢查與重構計畫 (Master Checklist)

本文件為修正現有文章的標準作業流程 (SOP)，旨在確保所有頁面功能統一、樣式一致且符合最新開發規範。

---


## 第二部分：內容與樣式 (Content & Style)

### 2.1 章節引言 (Section Introduction)
- [ ] **豐富引言內容**: 根據 `writing-guide.md` 的「章節開場白原則」，確保每一個 `<h2>` 和 `<h3>` 標籤後，都有一段內容豐富的 `<p>` 引言。
- [ ] **強化引導性**: 引言段落應扮演承上啟下的角色，為讀者提供必要的背景知識、情境鋪陳，或點出該章節要解決的核心問題，讓讀者更容易進入章節的核心內容。
- [ ] **避免生硬陳列**: 透過更具吸引力的比喻或提問來開頭，讓資訊的流動更順暢，提升文章的整體閱讀體驗與專業感。
- [ ] **待處理檔案**: `prebiotics.html`, `vitamin-a.html`, `vitamin-b.html` (因缺少原始檔案內容而跳過)。


### 2.2 CSS 元件使用規則
- [x] **資訊卡片 (`.info-cards`)**:
    - **數量限制**: 一個 `.info-cards` 容器內，**最多只能放置 3 張** `.info-card`。
    - **排版規則**: 容器預設使用 `display: inline-flex`，使其寬度能符合內容寬度。卡片應使用 `flex: 1` 來填滿容器。

- [x] **風險卡片 (`.risk-group-cards`)**:
    - **數量限制**: 一個 `.risk-group-cards` 容器內，**最多只能放置 3 張** `.risk-card`。
    - **排版規則**: 容器預設使用 `display: inline-flex`，使其寬度能符合內容寬度。卡片應使用 `flex: 1` 來填滿容器。

- [x] **提示框 (`.alert`)**:
    - **HTML 結構**: 必須使用標準結構：`<strong>` 標籤僅用於標題，其後緊跟 `<p>` 標籤用於內文，以確保版面正確。
    - **禁止手動添加圖示**: 警示圖示 (⚠️, 💡) 由 CSS 自動添加，嚴禁在 HTML 中手動插入任何 Emoji 或圖示。
    - **內容分段**: 較長的內容應放入 `<p>` 標籤，或使用 `<ul>` 條列式，以增強可讀性。
- [x] **高亮底線 (`.highlight-nutrient`)**:
    - **CSS 規則**: 必須使用 `background-image: linear-gradient(...)` 的技巧來實現，禁止使用 `border-bottom`。
- [ ] **禁止行內樣式**: 避免使用 `style="..."` 屬性，應將樣式移至 CSS class 中。

---

## 第三部分：組件化與功能 (Components & Functionality)

### 3.1 響應式目錄 (Responsive TOC)
- [ ] **HTML 容器**: 在 `<main>` 區塊的 `<header>` 標籤後，必須放置 `<div id="toc-mobile-target"></div>`，且放置位置必須於<div class="article-hero">之後，  <article class="article-body">之前。
- [ ] **CSS 規則**: 必須移除 `@media (max-width: 1024px)` 中 `display: none` 的 sidebar 規則。
- [ ] **JS 初始化**:
    - **引入**: 頁尾需引入 `responsive-toc-component.js`。
    - **執行**: `DOMContentLoaded` 事件中需包含 `new ResponsiveTocComponent().initialize();`。
3.1.2目錄 (TOC)
- [ ] **階層式結構**: 對於次要章節，在 `<a>` 標籤上使用 `.sub-item` class 來建立兩層式目錄。
- [ ] **`<h3>` 標籤存在性**: 根據 `writing-guide.md` 規範，內文應使用 `<h3>` 劃分次級章節。
- [ ] **`<h3>` 標籤納入**: 為了讓目錄更詳盡，應將文章中的 `<h3>` 標籤也納入目錄結構中，並應用為第二階層的 `.sub-item` 樣式。
- [ ] **錨點連結修正**:
    - **CSS**: 樣式表中必須包含 `section[id] { scroll-margin-top: 100px; }` 規則，以防止標題被固定式 Header 遮擋。
    - **連結目標**: 「相關營養素」的目錄連結必須指向 `#related-articles-container`。


### 3.2 智慧推薦文章 (Related Articles)
- [ ] **HTML 容器**: 在 `</article>` 標籤前，必須用 `<div id="related-articles-container"></div>` 替換所有靜態推薦連結。
- [ ] **JS 初始化**:
    - **引入**: 頁尾需依序引入 `articles-data.js` 和 `related-articles-component.js`。
    - **執行**: `DOMContentLoaded` 事件中需包含 `new window.RelatedArticlesComponent(container, articleId, articlesData, topicArticles).initialize();`。

---