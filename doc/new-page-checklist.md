# 新增頁面檢查清單

當您要為網站新增頁面時，請按照以下步驟確保頁面完整且符合網站標準。

> **文章寫作指引請參考** [`doc/writing-guide.md`](writing-guide.md) - 專注於內容結構、寫作風格、視覺化設計等內容層面

## 快速檢查清單

### 基礎結構
- [ ] 建立 HTML 檔案 (複製 `00template.html`)
- [ ] 設定正確的 `<title>` 與 `<meta>` 標籤
- [ ] 在 `<body>` 加入 `data-article-id`

### 組件與功能
- [ ] 加入 Header/Footer 組件
- [ ] **(新)** 加入響應式目錄組件 (`ResponsiveTocComponent`)
- [ ] **(新)** 加入智慧推薦文章組件 (`RelatedArticlesComponent`)
- [ ] 加入 GA4 分析組件
- [ ] 加入進度條、FAQ 等互動功能

### SEO 與結構化資料
- [ ] 設定 Article, WebSite, BreadcrumbList 的 JSON-LD
- [ ] 確認所有 JSON-LD 資料正確無誤

### 內容品質
- [ ] 檢查文章結構完整性（PSMA + 8個標準章節）
- [ ] 確認使用正確的 CSS 類別（`.alert`, `.info-cards` 等）
- [ ] 檢查視覺化元素（圖表、卡片等）
- [ ] 驗證所有內部連結正常

### 網站整合
- [ ] **更新 `articles-data.js` 中央資料庫**
- [ ] 在至少 1-2 個舊頁面中，加入指向此新頁面的內部連結
- [ ] 更新 `sitemap.xml`
- [ ] **最終驗證** (跨瀏覽器、響應式、效能)

---

## 詳細步驟指引

### 1. **建立基本 HTML 結構**

**標準作法：**
1.  複製專案中的官方空白範本檔案：`/post/00template.html`。
2.  將複製的檔案根據文章類型重新命名。
3.  基於此範本，開始修改標題、Meta 資訊與文章內容。

### 2. **設定文章 ID**

為了讓「智慧推薦組件」能正確運作，您必須在 `<body>` 標籤上設定獨一無二的文章 ID。

```html
<!-- 此 ID 需與 articles-data.js 中的 id 完全對應 -->
<body data-article-id="card-vitamin-b">
```

### 3. **設定組件容器**

在文章的 HTML 中，您需要在指定位置放置兩個空的 `<div>` 容器，作為新組件的「錨點」。

1.  **響應式目錄容器**：
    *   **位置**：放在 `<header class="article-header">` 標籤的正下方。
    *   **程式碼**：`<div id="toc-mobile-target"></div>`

2.  **智慧推薦文章容器**：
    *   **位置**：放在 `</article>` 標籤的正上方，取代舊有的靜態推薦連結區塊。
    *   **程式碼**：`<div id="related-articles-container"></div>`

### 4. **引入並初始化組件**

在頁面底部的 `<script>` 區塊，您需要引入新的組件腳本，並在 `DOMContentLoaded` 事件中初始化它們。

1.  **引入腳本 (注意順序)**：
    ```html
    <script src="../assets/js/articles-data.js"></script>
    <script src="../assets/js/related-articles-component.js"></script>
    <script src="../assets/js/responsive-toc-component.js"></script>
    ```

2.  **初始化程式碼**：
    ```javascript
    document.addEventListener("DOMContentLoaded", function () {
      // ... 其他組件初始化 ...

      // 初始化智慧推薦組件
      const relatedContainer = document.getElementById("related-articles-container");
      const articleId = document.body.dataset.articleId;
      if (relatedContainer && window.RelatedArticlesComponent && typeof articlesData !== 'undefined' && typeof topicArticles !== 'undefined') {
        new window.RelatedArticlesComponent(relatedContainer, articleId, articlesData, topicArticles).initialize();
      }

      // 初始化響應式目錄組件
      if (window.ResponsiveTocComponent) {
        new window.ResponsiveTocComponent().initialize();
      }
    });
    ```

### 5. **更新中央資料庫 (`articles-data.js`)**

此步驟至關重要，因為「智慧推薦組件」的關聯性計算完全依賴此檔案的資料。

- **新增文章時**：務必在 `articlesData` 或 `topicArticles` 陣列中，為您的新文章新增一筆完整的物件資料，特別是 `id`, `link`, `title`, `goals` 等欄位。

### 6. **更新目錄 (TOC) 連結**

請確認目錄中「相關營養素」的連結，已正確指向新的容器 ID。

```html
<li><a href="#related-articles-container" class="toc-link">相關營養素</a></li>
```

---

*（其餘步驟如「更新 sitemap.xml」、「新增內部連結」等維持不變）*