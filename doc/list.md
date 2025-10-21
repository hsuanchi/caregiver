# 文章頁面檢查與重構計畫 (Master Checklist)

本文件為修正現有文章的標準作業流程 (SOP)，旨在確保所有頁面功能統一、樣式一致且符合最新開發規範。

---


## 第二部分：內容與樣式 (Content & Style)

### 2.1 內容結構 ()
- [ ] **引言段落**: 確保每個 `<h2>` 標籤後都跟隨一個 `<p>` 引言段落，用於情境鋪陳，且內容需要完整說明解釋，不可僅用一句話帶過。
- [ ] **文字內容鎖定**: 執行結構或格式檢查時，應盡量不修改原始文字內容，專注於 HTML 結構、CSS Class 與排版樣式的調整。


### 2.2 目錄 (TOC)
- [ ] **階層式結構**: 對於次要章節，在 `<a>` 標籤上使用 `.sub-item` class 來建立兩層式目錄。
- [ ] **`<h3>` 標籤納入**: 為了讓目錄更詳盡，應將文章中的 `<h3>` 標籤也納入目錄結構中，並應用為第二階層的 `.sub-item` 樣式。
- [ ] **錨點連結修正**:
    - **CSS**: 樣式表中必須包含 `section[id] { scroll-margin-top: 100px; }` 規則，以防止標題被固定式 Header 遮擋。
    - **連結目標**: 「相關營養素」的目錄連結必須指向 `#related-articles-container`。

### 2.3 CSS 元件使用規則
- [ ] **資訊卡片 (`.info-cards`)**:
    - **數量限制**: 一個 `.info-cards` 容器內，**最多只能放置 3 張** `.info-card`。
- [ ] **風險卡片 (`.risk-group-cards`)**:
    - **數量限制**: 一個 `.risk-group-cards` 容器內，**最多只能放置 3 張** `.risk-card`。
- [ ] **提示框 (`.alert`)**:
    - **標題樣式**: `<strong>` 標題為行內元素 (`display: inline`)，會與後續文字在同一行。
- [ ] **高亮底線 (`.highlight-nutrient`)**:
    - **CSS 規則**: 必須使用 `background-image: linear-gradient(...)` 的技巧來實現，禁止使用 `border-bottom`。

---

## 第三部分：組件化與功能 (Components & Functionality)

### 3.1 響應式目錄 (Responsive TOC)
- [ ] **HTML 容器**: 在 `<main>` 區塊的 `<header>` 標籤後，必須放置 `<div id="toc-mobile-target"></div>`。
- [ ] **CSS 規則**: 必須移除 `@media (max-width: 1024px)` 中 `display: none` 的 sidebar 規則。
- [ ] **JS 初始化**:
    - **引入**: 頁尾需引入 `responsive-toc-component.js`。
    - **執行**: `DOMContentLoaded` 事件中需包含 `new ResponsiveTocComponent().initialize();`。

### 3.2 智慧推薦文章 (Related Articles)
- [ ] **HTML 容器**: 在 `</article>` 標籤前，必須用 `<div id="related-articles-container"></div>` 替換所有靜態推薦連結。
- [ ] **JS 初始化**:
    - **引入**: 頁尾需依序引入 `articles-data.js` 和 `related-articles-component.js`。
    - **執行**: `DOMContentLoaded` 事件中需包含 `new window.RelatedArticlesComponent(container, articleId, articlesData, topicArticles).initialize();`。

---

- [ ] **內部連結**: 確認至少在 1-2 個相關舊頁面中，加入了指向新頁面的連結。