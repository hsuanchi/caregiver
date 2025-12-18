# 任務規格：導覽標記 (Breadcrumb) 專業化優化 (v2.0)

**目標**: 重構網站的導覽標記 (Breadcrumb) 系統，使其符合 2024-2025 年的專業 SEO 與無障礙設計標準，並採用高內聚、可維護的自動化組件方案。

---

## 1. 專業標準與實作規範

### SEO (結構化資料)
- **格式**: JSON-LD `BreadcrumbList`。
- **屬性**: 每個項目必須包含 `position`、`name` 和 `item` (URL)。
- **階層**: 必須反映網站的邏輯結構（首頁 > 分類 > 當前頁面）。
- **注入位置 (優化)**: 為確保最佳的搜尋引擎相容性，JSON-LD 的 `<script>` 標籤**必須**被注入到主頁面的 `<head>` (Light DOM) 中，而非 Shadow DOM 內部。

### 使用者體驗與無障礙設計 (WAI-ARIA)
- **容器**: `<nav aria-label="Breadcrumb">`。
- **結構**: 使用有序列表 `<ol>` 以表示邏輯順序。
- **當前頁面**: 最後一個項目必須加上 `aria-current="page"` 屬性，且**不應**是可點擊的連結。

### 視覺設計與佈局
- **樣式一致性 (優化)**: 組件應使用 CSS 變數（例如 `var(--primary-color, #fallback)`) 來接收全域樣式，確保其外觀與網站主題一致。
- **響應式設計**: 確保導覽標記在行動裝置上能優雅地橫向滾動。
- **位置**: 固定放置在文章內容中 `h1` 標題的上方。

---

## 2. 技術路線圖：自動化 Custom Element 方案

此路線圖專注於建立一個名為 `<breadcrumb-component>` 的動態自訂元素 (Custom Element)，以程式化方式生成導覽標記。

### 步驟一：集中化階層數據 (數據驅動)

自動化系統的基礎將是一個定義了網站內容階層的中央化資料來源。

*   **動作**: 修改 `assets/js/articles-data.js`。
*   **細節**: 在 `articlesData` 物件的每個條目中，新增一個 `parent` 屬性，該屬性指向其父層級文章或分類的鍵 (key)。這將建立一個全站內容的關聯地圖。

**`articles-data.js` 範例**:
```javascript
const articlesData = {
  // ... 其他條目
  'home': { name: '首頁', path: '/', parent: null },
  'health-topics': { name: '健康主題', path: '/category/health-topics.html', parent: 'home' },
  'topic-cardiovascular-health': { name: '心血管健康', path: '/post/topic-cardiovascular-health.html', parent: 'health-topics' },
  'fish-oil': { name: '魚油', path: '/post/fish-oil.html', parent: 'topic-cardiovascular-health' }
  // ... 等等
};
```

### 步驟二：開發 `<breadcrumb-component>` 組件

此自訂元素是新系統的核心，將被封裝在 `assets/js/components/BreadcrumbComponent.js` 中。

*   **功能與內部邏輯**:
    1.  **資料接收**: 組件將通過 `article-id` 屬性接收當前頁面的 ID。
    2.  **路徑解析 (`buildPath`)**:
        -   內部具有一個純邏輯函數，根據 `article-id` 遞迴地遍歷 `articlesData` 中的 `parent` 屬性，建立出完整的路徑陣列 `pathArray`。
        -   **防呆機制**: 遞迴邏輯中必須包含最大深度限制（例如 10 層）或已訪問節點檢查，以防止因數據配置錯誤導致的無限迴圈。
    3.  **JSON-LD 生成 (`generateJSONLD`)**:
        -   此函數接收 `pathArray`，生成符合 `BreadcrumbList` 規範的 JSON 物件。
        -   **關鍵**: 它會建立一個 `<script type="application/ld+json">` 標籤，並將其**注入到主文件的 `<head>` 中**，確保 SEO 效果。
    4.  **HTML 渲染 (`render`)**:
        -   此函數同樣接收 `pathArray`，在 Shadow DOM 中生成符合 WAI-ARIA 標準的 `<nav>` 和 `<ol>` HTML 結構。
        -   CSS 將被完全封裝在 Shadow DOM 內，並使用 CSS 變數來適配網站主題。
    5.  **生命週期**: 使用 `attributeChangedCallback` 監聽 `article-id` 屬性的變化，實現動態更新。

### 步驟三：整合組件至範本

*   **動作**: 修改主要文章範本 `post/00template.html`。
*   **細節**:
    1.  移除任何現有的硬編碼導覽標記 HTML。
    2.  在原位置上，直接使用自訂元素標籤，並傳入當前頁面的 `articleId`。
        ```html
        <!-- 假設 articleId 是從 body 的 data-article-id 屬性讀取 -->
        <breadcrumb-component 
            id="breadcrumb-component-container"
            article-id="CURRENT_ARTICLE_ID">
        </breadcrumb-component>

        <script>
          // 腳本獲取 articleId 並設置到組件上
          const articleId = document.body.dataset.articleId;
          document.getElementById('breadcrumb-component-container').setAttribute('article-id', articleId);
        </script>
        ```
    3.  確保 `BreadcrumbComponent.js` 腳本已在頁面中被正確引入。

### 步驟四：全站部署與驗證

*   **動作**: 由於大多數頁面都基於範本，變更將自動應用於全站。對未使用範本的頁面進行手動整合。
*   **任務**: 執行驗證步驟，包括 W3C HTML 驗證、Google 複合式搜尋結果測試及螢幕閱讀器相容性測試。

---

## 3. 任務執行檢查清單

### 階段一：資料準備與組件開發
- [ ] 更新 `assets/js/articles-data.js`，為所有相關條目添加 `parent` 和 `path` 屬性。 <!-- id: 0 -->
- [ ] 建立 `<breadcrumb-component>` 自訂元素 (`assets/js/components/BreadcrumbComponent.js`)。 <!-- id: 1 -->
    - [ ] 實作 Shadow DOM 以封裝 CSS。 <!-- id: 2 -->
    - [ ] 實作遍歷 `articlesData` 階層的 `buildPath` 邏輯。 <!-- id: 3 -->
    - [ ] **(優化)** 在 `buildPath` 中加入遞迴防呆機制（如最大深度限制）。 <!-- id: 3a -->
    - [ ] 生成語意化的 HTML (`<nav>`, `<ol>`) 並應用 WAI-ARIA 屬性。 <!-- id: 4 -->
    - [ ] **(優化)** 在組件的 CSS 中使用 CSS 變數（如 `var(--primary-color)`)。 <!-- id: 5a -->
    - [ ] **(優化)** 建立 `generateJSONLD` 函數，將 `BreadcrumbList` 腳本**注入 Light DOM 的 `<head>`**。 <!-- id: 6 -->

### 階段二：範本整合與初步部署
- [ ] 重構 `post/00template.html`: <!-- id: 7 -->
    - [ ] 移除現有的導覽標記 HTML。 <!-- id: 8 -->
    - [ ] **(優化)** 直接插入 `<breadcrumb-component>` 自訂元素標籤。 <!-- id: 9 -->
    - [ ] 新增腳本以動態設定組件的 `article-id` 屬性。 <!-- id: 10 -->
- [ ] 將組件整合到關鍵的非範本頁面。 <!-- id: 11 -->

### 階段三：全域覆蓋與驗證
- [ ] 確保所有 `post/` 和 `food/` 文章都能正確顯示新的導覽標記。 <!-- id: 12 -->
- [ ] 驗證 HTML (W3C)。 <!-- id: 13 -->
- [ ] 驗證複合式搜尋結果 (Google)。 <!-- id: 14 -->
- [ ] 無障礙檢查 (螢幕閱讀器相容性)。 <!-- id: 15 -->

---

## 4. 程式碼實作參考 (Code Implementation Reference)

以下是 `<breadcrumb-component>` 的核心邏輯草稿，已整合上述優化建議：

```javascript
class BreadcrumbComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // 監聽 'article-id' 屬性，以便動態傳入
  static get observedAttributes() { return ['article-id']; }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'article-id' && oldValue !== newValue) {
      this.render(newValue);
    }
  }

  buildPath(articleId) {
    const path = [];
    let currentId = articleId;
    let depth = 0;
    const maxDepth = 10; // 防呆機制：防止無限迴圈

    // 假設 articlesData 是全域變數或已匯入
    while (currentId && articlesData[currentId] && depth < maxDepth) {
      const item = articlesData[currentId];
      // 將項目加到陣列開頭
      path.unshift({
        name: item.name,
        url: item.path,
        isCurrent: depth === 0
      });
      
      currentId = item.parent;
      depth++;
    }
    return path;
  }

  generateJSONLD(pathArray) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": pathArray.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        // URL 必須是絕對路徑
        "item": window.location.origin + item.url 
      }))
    };

    // 檢查是否已存在，避免重複注入
    let script = document.getElementById('json-ld-breadcrumb');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-breadcrumb';
      script.type = 'application/ld+json';
      document.head.appendChild(script); // 注入到 Light DOM 的 head
    }
    script.textContent = JSON.stringify(schema, null, 2);
  }

  render(articleId) {
    if (!articleId) return;
    const pathArray = this.buildPath(articleId);
    
    // 1. 生成 JSON-LD (作為副作用執行)
    this.generateJSONLD(pathArray);

    // 2. 生成視覺化 HTML 到 Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block; 
          --separator: '/';
          --link-color: var(--primary-color, #007bff);
          --text-color: var(--text-secondary, #6c757d);
          --hover-color: var(--primary-color-dark, #0056b3);
        }
        nav { font-size: 0.9rem; color: var(--text-color); }
        ol { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; }
        li { display: inline-flex; align-items: center; }
        li:not(:last-child)::after {
          content: var(--separator);
          margin: 0 0.5rem;
          color: #ccc;
        }
        a { text-decoration: none; color: var(--link-color); }
        a:hover { text-decoration: underline; color: var(--hover-color); }
        span[aria-current="page"] { color: inherit; font-weight: bold; }
        
        /* 行動裝置優化：橫向滾動 */
        @media (max-width: 600px) {
           ol { 
             flex-wrap: nowrap; 
             overflow-x: auto; 
             white-space: nowrap; 
             padding-bottom: 5px; 
             -ms-overflow-style: none;  /* IE and Edge */
             scrollbar-width: none;  /* Firefox */
           }
           ol::-webkit-scrollbar { display: none; } /* Chrome, Safari, and Opera */
        }
      </style>
      <nav aria-label="Breadcrumb">
        <ol>
          ${pathArray.map(item => `
            <li>
              ${!item.isCurrent && item.url
                ? `<a href="${item.url}">${item.name}</a>`
                : `<span aria-current="page">${item.name}</span>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
    `;
  }
}

// customElements.define('breadcrumb-component', BreadcrumbComponent);
```