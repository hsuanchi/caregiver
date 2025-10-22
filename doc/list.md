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

### 2.3 提示框結構標準化 (Alert Box Structure Standardization)
- [ ] **目標**: 檢查並修正所有文章頁面中的 `.alert` 提示框，確保其 HTML 結構符合 `writing-guide.md` 的最新規範 (`<strong>` 標題 + `<p>` 內文)。
- [ ] **待處理檔案列表 (A-Z)**:
    - [ ] `amino-acids.html`
    - [ ] `anthocyanins.html`
    - [ ] `beta-glucan.html`
    - [ ] `calcium.html`
    - [ ] `chondroitin.html`
    - [ ] `chromium.html`
    - [ ] `coenzyme-q10.html`
    - [ ] `collagen.html`
    - [ ] `copper.html`
    - [ ] `curcumin.html`
    - [ ] `dietary-fiber.html`
    - [ ] `fish-oil.html`
    - [ ] `fluoride.html`
    - [ ] `folic-acid.html`
    - [ ] `gaba.html`
    - [ ] `glucosamine.html`
    - [ ] `glutathione.html`
    - [ ] `iodine.html`
    - [ ] `iron.html`
    - [ ] `lutein.html`
    - [ ] `lycopene.html`
    - [ ] `magnesium.html`
    - [ ] `manganese.html`
    - [ ] `official-health-sites.html`
    - [ ] `phosphorus.html`
    - [ ] `potassium.html`
    - [ ] `prebiotics.html`
    - [ ] `protein.html`
    - [ ] `selenium.html`
    - [ ] `sodium.html`
    - [ ] `topic-immune-boosting-nutrients.html`
    - [ ] `topic-stroke-prevention-nutrients.html`
    - [ ] `topic-vascular-health-superfoods.html`
    - [ ] `vitamin-a.html`
    - [ ] `vitamin-b.html`
    - [ ] `vitamin-c.html`
    - [ ] `vitamin-d.html`
    - [ ] `vitamin-e.html`
    - [ ] `vitamin-k.html`
    - [ ] `zinc.html`

### 2.4 全局響應式設計 (Global RWD)

**目標**: 整合並標準化全站的響應式設計規則，一次性解決卡片佈局與內容溢出（如橫向滾動）的問題，提升在所有裝置上的瀏覽體驗與未來可維護性。

#### 1. **核心 CSS 規則 (應統一添加至全站樣式)**

```css
/* ============================================= */
/* == 全局 RWD 與佈局標準化 (Global RWD)     == */
/* ============================================= */

/* 1. 通用盒模型與文字換行 */
* {
    box-sizing: border-box;
}
p, td, th, li, a {
    word-break: break-word; /* 防止長字串溢出 */
}

/* 2. 響應式媒體 (圖片、SVG) */
img, svg {
    max-width: 100%;
    height: auto;
}

/* 3. 響應式表格容器 */
.responsive-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 20px 0;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
}

/* 4. 行動版優先的卡片容器 */
.info-cards, .risk-group-cards {
    display: flex;
    flex-direction: column; /* 手機上預設為單欄垂直排列 */
    gap: 20px;
    margin: 40px 0;
}
.info-card, .risk-card {
    flex: 1;
    min-width: 250px;
}

/* 5. 桌面版佈局的 Utility Classes */
@media (min-width: 768px) {
    .md-grid-2 { 
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
    }
    .md-grid-3 { 
        display: grid;
        grid-template-columns: repeat(3, 1fr); 
    }
    .md-flex-row { 
        flex-direction: row; 
    }
}
```

#### 2. **HTML 實作方式**

- **卡片佈局**: 為 `.info-cards` 或 `.risk-group-cards` 容器加上對應的 Utility Class (如 `.md-grid-3`)。
- **表格**: **所有**的 `<table>` 元素，都**必須**被一個 `<div class="responsive-table-wrapper">` 包裹起來。

#### 3. **執行計畫**
- [ ] **步驟一：統一 CSS**: 將上述「全局 RWD」核心 CSS 規則，整合到所有文章頁面的 `<style>` 區塊中。
- [ ] **步驟二：全面應用**: 
    - 檢查所有卡片佈局，移除行內樣式，並換上新的 Utility Class。
    - 檢查所有表格，確保都已被 `responsive-table-wrapper` `<div>` 包裹。
- [ ] **步驟三：驗證**: 在手機模擬器中，檢查所有頁面，確保卡片佈局正常且已無橫向滾動條。
---


## 第三部分：組件化與功能 (Components & Functionality)

### 3.1 響應式目錄 (Responsive TOC)
- [ ] **HTML 容器**: 在於<div class="article-hero">之後、 <article class="article-body">之前，必須放置 `<div id="toc-mobile-target"></div>`。
        範例:
          </header>

        <div id="toc-mobile-target"></div>
        
        <article class="article-body">


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

### 3.3 RWD 初始渲染問題 (Initial Render Issue)

- [ ] **問題**: 在 Chrome 開發者工具的手機模擬模式下，頁面首次載入時，RWD 效果（如卡片佈局、側邊欄隱藏）可能不會立即生效，需要手動切換模擬尺寸後才會正常顯示。這通常是瀏覽器渲染時序或模擬器本身的行為導致。

- [ ] **解決方案**: 在 `DOMContentLoaded` 事件中，手動觸發一次 `window.dispatchEvent(new Event('resize'));` 事件，強制瀏覽器重新評估所有響應式規則。

- [ ] **實作方式**: 將以下程式碼加入到頁面底部的 `<script>` 區塊中，緊接在所有組件初始化之後：

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // ... 其他組件初始化代碼 ...

  // 強制觸發 resize 事件，解決 RWD 初始渲染問題
  window.dispatchEvent(new Event('resize'));
});
```

---