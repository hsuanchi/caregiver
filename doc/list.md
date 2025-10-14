<檔案結構>
x改網址 不要第二層 
x製作categery (放header的頁面)
post只放營養素
x推薦版位(相關營養素、相關文章)進行抽象的工作
sidebar 目錄 新增條件，判斷手機載具時，呈現在h1下方
全文章的統一格式

<post內容部分>
每個<p>都要補充更多文字知識 去ai感
資訊卡只要三個


___________

### 智慧推薦版位重構 - AI 執行手冊

**目標：** 將此手冊中的步驟，應用於 `/post` 目錄下除了 `amino-acids.html` 之外的所有文章頁面。

**前置條件：**
- `assets/js/related-articles-component.js` 組件已建立。
- `assets/js/articles-data.js` 已存在。

---

**修改單一文章頁面 (`[article_name].html`) 的標準作業流程 (SOP):**

**第一步：讀取與分析**
1.  讀取目標文章檔案的完整 HTML 內容。
2.  從 `articles-data.js` 資料中，根據檔案名稱 (e.g., `vitamin-b.html`) 找到對應文章的 `id` (e.g., `card-vitamin-b`)。

**第二步：修改 `<body>` 標籤**
1.  **目標**: `<body ...>`
2.  **動作**: 在 `<body>` 標籤上加入 `data-article-id` 屬性。
3.  **範例**:
    *   **舊**: `<body>`
    *   **新**: `<body data-article-id="[此處填入第一步找到的ID]">`

**第三步：替換靜態推薦區塊**
1.  **目標**: 在 `</article>` 標籤前，找到手動編寫的 `<h2>相關營養素</h2>` 或 `<h2>相關文章</h2>` 及其整個 `div.related-grid` 區塊。
2.  **動作**: 將上述整個靜態區塊，替換為單一的容器 `div`。
3.  **範例**:
    *   **舊**: `<h2 class="related-title" ...>...</h2><div class="related-grid">...</div>`
    *   **新**: `<div id="related-articles-container"></div>` (注意維持原有的縮排)

**第四步：修正目錄 (TOC) 連結**
1.  **目標**: 在側邊欄的 `<ul class="toc-list">` 中，找到「相關營養素」的連結。
2.  **動作**: 將其 `href` 屬性從舊的 ID (如 `#related-nutrients`) 修改為指向新的容器 ID。
3.  **範例**:
    *   **舊**: `<li><a href="#related-nutrients" class="toc-link">相關營養素</a></li>`
    *   **新**: `<li><a href="#related-articles-container" class="toc-link">相關營養素</a></li>`

**第五步：引入並初始化新組件**
1.  **引入腳本**:
    *   **目標**: 找到頁尾負責引入 `deus-footer-component.js` 的 `<script>` 標籤。
    *   **動作**: 在它後面，依序加入 `articles-data.js` 和 `related-articles-component.js` 的 `<script>` 標籤。
    *   **範例**:
        ```html
        <script src="../assets/js/deus-footer-component.js"></script>
        <script src="../assets/js/articles-data.js"></script>
        <script src="../assets/js/related-articles-component.js"></script>
        ```

2.  **初始化腳本**:
    *   **目標**: 找到頁尾的 `DOMContentLoaded` 事件監聽器。
    *   **動作**: 在監聽器內部，加入初始化 `RelatedArticlesComponent` 的程式碼。
    *   **範例**:
        ```javascript
        // ... 其他組件的初始化 ...

        // Initialize Related Articles Component
        const container = document.getElementById("related-articles-container");
        const articleId = document.body.dataset.articleId;
        if (container && window.RelatedArticlesComponent && typeof articlesData !== 'undefined' && typeof topicArticles !== 'undefined') {
          new window.RelatedArticlesComponent(container, articleId, articlesData, topicArticles).initialize();
        }
        ```

---
**自動化流程提示:**
在對所有檔案進行批次修改時，可以透過 `glob` 尋找所有 `/post/*.html` 檔案，然後對每一個檔案重複以上 SOP。

---

### 響應式目錄 (TOC) 重構計畫

**目標：** 在手機版瀏覽時（螢幕寬度 ≤ 1024px），將側邊欄的目錄(TOC)移動到主內容區塊，顯示於文章標題下方、第一段正文之前。

**挑戰：** 無法單純用 CSS 讓一個元素同時出現在兩個地方。目前的作法是直接在手機版隱藏目錄 (`display: none;`)，使用者體驗不佳。

**執行方案 (JavaScript 動態移動 DOM)：**

1.  **建立新組件 (`responsive-toc-component.js`)**:
    *   在 `assets/js/` 路徑下建立一個新的 JS 檔案。此組件將專門負責處理 TOC 的響應式行為。

2.  **定義組件邏輯**:
    *   **尋找目標元素**: 組件初始化時，需要找到三個關鍵元素：
        1.  `#sidebar`: 原始的 TOC 容器 (桌面版位置)。
        2.  `#toc-mobile-target`: 我們將在文章 `<header>` 下方手動新增一個空的 `div` 作為 TOC 在手機版的新家。
        3.  `.toc`: 真正的目錄內容元素。
    *   **移動函式 (`moveToc`)**: 撰寫一個函式，此函式會檢查當前視窗寬度。
        *   如果寬度小於等於 `1024px` (手機/平板)，就將 `.toc` 元素從 `#sidebar` 移入 `#toc-mobile-target`。
        *   如果寬度大於 `1024px` (桌面版)，就將 `.toc` 元素移回 `#sidebar`。
    *   **事件監聽**:
        *   在頁面載入時 (`DOMContentLoaded`) 立即執行一次 `moveToc` 函式。
        *   監聽視窗的 `resize` 事件，當視窗大小改變時，再次呼叫 `moveToc` 函式 (需要加入 debounce 處理以優化效能)。

3.  **修改文章頁面 HTML (以 `amino-acids.html` 為例)**:
    *   **移除舊 CSS**: 刪除樣式表中 `@media (max-width: 1024px) { .sidebar { display: none; } }` 這條規則。
    *   **新增目標容器**: 在 `<main class="article-content">` 內的 `<header class="article-header">` 標籤正下方，加入一個空的目標容器：`<div id="toc-mobile-target"></div>`。
    *   **引入新腳本**: 在頁尾引入新的 `responsive-toc-component.js`。

4.  **初始化組件**:
    *   在頁尾的 `DOMContentLoaded` 監聽器中，加入初始化新組件的程式碼。
    *   範例：`new ResponsiveTocComponent().initialize();`

**優點：**
*   **單一事實來源**: HTML 中永遠只有一份目錄，避免內容重複，有利於維護。
*   **優化使用者體驗**: 手機用戶也能方便地使用目錄，快速跳轉章節。
*   **結構清晰**: 將複雜的響應式行為封裝在獨立的 JS 組件中，不污染現有程式碼。