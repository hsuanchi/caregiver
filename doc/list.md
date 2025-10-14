<檔案結構>
x改網址 不要第二層 
x製作categery (放header的頁面)
post只放營養素
推薦版位(相關營養素、相關文章)進行抽象的工作
sidebar 目錄 新增條件，判斷手機載具時，呈現在h1下方

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