# 任務規格：導覽標記 (Breadcrumb) 專業化優化

**目標**: 重構網站的導覽標記 (Breadcrumb) 系統，使其符合 2024-2025 年的專業 SEO 與無障礙設計標準。

---

## 1. 專業標準與實作規範

### SEO (結構化資料)
- **格式**: JSON-LD `BreadcrumbList`。
- **屬性**: 每個項目必須包含 `position`、`name` 和 `item` (URL)。
- **階層**: 必須反映網站的邏輯結構（首頁 > 分類 > 當前頁面）。

### 使用者體驗與無障礙設計 (WAI-ARIA)
- **容器**: `<nav aria-label="Breadcrumb">`。
- **結構**: 使用有序列表 `<ol>` 以表示邏輯順序。
- **當前頁面**: 最後一個項目必須加上 `aria-current="page"` 屬性，且**不應**是可點擊的連結。
- **微互動**: 包含細緻的滑鼠懸停效果與一致的分隔符號（例如 `/` 或 `>`）。

### 視覺設計與佈局
- **響應式設計**: 確保導覽標記在行動裝置上能優雅地換行或截斷（必要時可使用 `white-space: nowrap` 和 `overflow-x: auto`）。
- **位置**: 固定放置在文章內容中 `h1` 標題的上方。

---

## 1.1. 採用自動化組件方案的理由

鑑於本專案的架構（零依賴、原生 JavaScript、組件化、使用 Shadow DOM 進行隔離）以及大量的文章頁面，手動更新導覽標記不僅效率低下，且容易出錯。因此，我們將採用一個自動化的組件式解決方案。此策略具有以下優勢：

*   **可維護性**: 集中化的邏輯意味著未來對導覽標記的結構、樣式或邏輯的任何修改，都只需編輯單一組件。
*   **可擴展性**: 新增內容時僅需更新資料來源，而無需手動編輯 HTML。
*   **一致性與可靠性**: 自動化能確保所有頁面上的導覽標記都是統一且無錯誤的。
*   **架構一致性**: 與專案現有的「將功能封裝在 JavaScript 組件中」的模式保持一致。

---

## 2. 技術路線圖：自動化組件方案

此路線圖專注於建立一個動態的 `BreadcrumbComponent.js`，以程式化方式生成導覽標記。

### 步驟一：集中化階層數據 (數據驅動)

自動化系統的基礎將是一個定義了網站內容階層的中央化資料來源。

*   **動作**: 修改 `assets/js/articles-data.js`。
*   **細節**: 在 `articlesData` 物件的每個條目中，新增一個 `parent` 屬性，該屬性指向其父層級文章或分類的鍵 (key)。這將建立一個全站內容的關聯地圖。

**`articles-data.js` 範例**:
```javascript
const articlesData = {
  // ... 其他條目
  'home': {
    name: '首頁',
    path: '/', // 假設 '/' 是首頁路徑
    parent: null // 根元素
  },
  'health-topics': {
    name: '健康主題',
    path: '/category/health-topics.html',
    parent: 'home'
  },
  'topic-cardiovascular-health': {
    name: '心血管健康',
    path: '/post/topic-cardiovascular-health.html',
    parent: 'health-topics'
  },
  'fish-oil': {
    name: '魚油',
    path: '/post/fish-oil.html',
    parent: 'topic-cardiovascular-health'
  }
  // ... 等等
};
```

### 步驟二：開發 `BreadcrumbComponent.js` 組件

此組件是新系統的核心。

*   **動作**: 在 `assets/js/components/BreadcrumbComponent.js` 建立新檔案。
*   **功能**:
    1.  組件的建構函數 (`constructor`) 將接受一個 `containerElement`（將要渲染導覽標記的 DOM 元素）和當前頁面的 `articleId`（例如 'fish-oil'）。
    2.  它將使用 `articleId` 在 `articlesData` 中查找當前頁面。
    3.  它將使用 `parent` 屬性遞迴地遍歷階層，直到找到 `null`（首頁），從而建立完整的路徑。
    4.  它將動態生成完整的導覽標記 HTML，包括：
        *   一個 `<nav aria-label="Breadcrumb">` 容器。
        *   一個 `<ol>` 列表。
        *   路徑中每個項目的 `<li>` 元素。
        *   當前頁面的最後一個 `<li>` 將是一個帶有 `aria-current="page"` 的 `<span>`，且不可點擊。
    5.  它還將根據生成的路徑，動態生成一個包含 `BreadcrumbList` 結構化資料的 `<script type="application/ld+json">` 標籤。
    6.  最後，它會將 HTML 和 JSON-LD 一起渲染到 `containerElement` 中。根據專案慣例，該組件必須將其 CSS 封裝在 Shadow DOM 內。

### 步驟三：整合組件至範本

*   **動作**: 修改主要文章範本 `post/00template.html`。
*   **細節**:
    1.  移除任何現有的硬編碼導覽標記 HTML。
    2.  在其位置上，新增一個空的佔位符：`<div id="breadcrumb-container"></div>`。
    3.  新增一個 `<script>` 區塊，用於：
        *   確保 `BreadcrumbComponent.js` 已被載入。
        *   獲取當前頁面的 `articleId`（例如，從 `<body>` 標籤的 `data-article-id` 屬性中獲取）。
        *   實例化 `BreadcrumbComponent`，將容器元素和 `articleId` 傳遞給它。
        *   呼叫組件上的 `initialize()` 或 `render()` 方法來生成並注入導覽標記。

### 步驟四：全站部署與驗證

*   **動作**: 由於大多數頁面都使用 `00template.html`，這些變更將自動應用於全站。對於未使用主要範本的特定頁面（例如，某些 `category/*.html` 檔案或 `index.html`），需要手動添加容器 `div` 和組件初始化腳本。
*   **任務**:
    1.  確保 `BreadcrumbComponent.js` 在所有相關頁面上被正確載入。
    2.  執行驗證步驟：
        *   使用 W3C 驗證器驗證 HTML。
        *   使用 Google 的複合式搜尋結果測試工具驗證 `BreadcrumbList` 結構化資料。
        *   執行無障礙檢查，確保螢幕閱讀器能正確解讀新結構。

---

## 3. 任務執行檢查清單

### 階段一：資料準備與組件開發
- [ ] 更新 `assets/js/articles-data.js`，為所有相關的文章和分類添加 `parent` 和 `path` 屬性。 <!-- id: 0 -->
- [ ] 建立 `assets/js/components/BreadcrumbComponent.js`，具備動態生成 HTML 和 JSON-LD 的功能。 <!-- id: 1 -->
    - [ ] 實作 Shadow DOM 以封裝 CSS。 <!-- id: 2 -->
    - [ ] 實作遍歷 `articlesData` 階層的邏輯。 <!-- id: 3 -->
    - [ ] 生成語意化的 HTML（`<nav>`, `<ol>`, `<li>`, 以及用於當前頁面的 `<span>`）。 <!-- id: 4 -->
    - [ ] 應用 WAI-ARIA 屬性（`aria-label`, `aria-current`）。 <!-- id: 5 -->
    - [ ] 生成 JSON-LD `BreadcrumbList` 結構化資料。 <!-- id: 6 -->

### 階段二：範本整合與初步部署
- [ ] 重構 `post/00template.html`: <!-- id: 7 -->
    - [ ] 移除現有的導覽標記 HTML。 <!-- id: 8 -->
    - [ ] 新增 `<div id="breadcrumb-container"></div>` 佔位符。 <!-- id: 9 -->
    - [ ] 新增腳本以載入並初始化 `BreadcrumbComponent.js`，並傳遞 `articleId`。 <!-- id: 10 -->
- [ ] 根據需要，將組件整合到關鍵的非範本頁面（例如 `category/tools.html`, `index.html`）。 <!-- id: 11 -->

### 階段三：全域覆蓋與驗證
- [ ] 確保所有剩餘的 `post/` 和 `food/` 文章都能正確顯示新的導覽標記。 <!-- id: 12 -->
- [ ] 驗證 HTML (W3C)。 <!-- id: 13 -->
- [ ] 驗證複合式搜尋結果 (Google Search Console Simulator)。 <!-- id: 14 -->
- [ ] 無障礙檢查 (螢幕閱讀器相容性)。 <!-- id: 15 -->
