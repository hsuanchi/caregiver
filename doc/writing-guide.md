# 文件目錄

- [文件一: API 文件 (CaregiverHomepage)](#文件一-api-文件-caregiverhomepage)
  - [建構函數](#建構函數)
  - [Getter 方法](#getter-方法)
  - [Setter 方法（支援鏈式呼叫）](#setter-方法支援鏈式呼叫)
  - [功能方法](#功能方法)
  - [使用範例](#使用範例)
  - [Shadow DOM 隔離驗證](#shadow-dom-隔離驗證)
  - [除錯功能](#除錯功能)
- [文件二: 原生 JavaScript 前端函式庫開發規範指引](#文件二-原生-javascript-前端函式庫開發規範指引)
  - [核心理念：零建置、直接可用](#核心理念零建置直接可用)
  - [程式碼風格](#程式碼風格)
  - [Shadow DOM 封裝要求](#shadow-dom-封裝要求)
  - [JavaScript Class 封裝模式](#javascript-class-封裝模式)
  - [重要開發原則](#重要開發原則)
  - [Getter/Setter 實作檢查清單](#gettersetter-實作檢查清單)
- [文件三: 新增頁面檢查清單 (與重構步驟)](#文件三-新增頁面檢查清單-與重構步驟)
  - [快速檢查清單](#快速檢查清單)
  - [詳細步驟指引 (整合重構計畫)](#詳細步驟指引-整合重構計畫)
- [文件四: Caregiver 營養百科 - 文章風格指引](#文件四-caregiver-營養百科---文章風格指引)
  - [第一章：核心原則](#第一章核心原則)
  - [第二章：內容策略與結構](#第二章內容策略與結構)
  - [第三章：技術與格式化規範](#第三章技術與格式化規範)
  - [第五章：資源與範例](#第五章資源與範例)

---

# Caregiver 專案 - 完整開發指引

這份文件整合了專案的 API 文件、前端開發規範、新頁面建立清單以及文章寫作風格指引，旨在為所有開發與內容創作者提供一套統一、高標準的規範。

---

# 文件一: API 文件 (CaregiverHomepage)

## 建構函數

```javascript
const homepage = new CaregiverHomepage(hostElement);
```

- `hostElement`: Shadow DOM 的宿主元素（必要）

## Getter 方法

```javascript
homepage.getTheme(); // 取得主題設定
homepage.getDebug(); // 取得除錯模式狀態
homepage.getSearchPlaceholder(); // 取得搜尋框 placeholder
homepage.getLanguage(); // 取得語言設定
homepage.getConfig(); // 取得完整設定物件
```

## Setter 方法（支援鏈式呼叫）

```javascript
homepage
    .setTheme('light|dark')           // 設定主題
    .setDebug(true|false)             // 設定除錯模式
    .setSearchPlaceholder('...')      // 設定搜尋框 placeholder
    .setLanguage('zh-TW')             // 設定語言
    .setConfig({...})                 // 批次設定
```

## 功能方法

```javascript
homepage.initialize(); // 初始化組件（必要）
homepage.reset(); // 重置所有設定
homepage.destroy(); // 銷毀組件，清理資源
```

## 使用範例

### 基本初始化

```javascript
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("light")
  .setDebug(false)
  .initialize();
```

### 開發模式（包含除錯）

```javascript
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("light")
  .setDebug(true) // 啟用除錯訊息
  .setLanguage("zh-TW")
  .initialize();

// 檢查設定
console.log("主題:", homepage.getTheme());
console.log("除錯模式:", homepage.getDebug());
```

### 深色主題

```javascript
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("dark") // 深色主題
  .setDebug(false)
  .initialize();
```

### 自訂搜尋框 Placeholder

```javascript
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setSearchPlaceholder("輸入營養素名稱，例如：維生素C、鈣質...")
  .setTheme("light")
  .setDebug(false)
  .initialize();
```

### 批次設定

```javascript
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setConfig({
    theme: "dark",
    debug: false,
    language: "zh-TW",
    searchPlaceholder: "搜尋營養素...",
  })
  .initialize();
```

### 動態切換主題

```javascript
// 切換到深色主題
homepage.setTheme("dark");

// 切換到淺色主題
homepage.setTheme("light");
```

## Shadow DOM 隔離驗證

組件使用 Closed Shadow DOM 確保完全隔離：

```javascript
// 驗證 CSS 隔離
const initialStyleCount = document.head.querySelectorAll("style").length;

const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
).initialize();

// 檢查主頁面的 CSS 數量是否增加
const finalStyleCount = document.head.querySelectorAll("style").length;
console.log("CSS 隔離:", initialStyleCount === finalStyleCount); // 應該是 true
```

## 除錯功能

### 開啟除錯模式

```javascript
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setDebug(true) // 關鍵：啟用除錯模式
  .initialize();
```

---

# 文件二: 原生 JavaScript 前端函式庫開發規範指引

## 核心理念：零建置、直接可用

**本規範的核心原則是建立完全無需建置過程的 JavaScript 函式庫**

- ✅ **寫完即可用**：程式碼寫完直接就是可部署的最終版本
- ✅ **零工具相依**：不需要 Node.js、npm、webpack、babel 等任何工具
- ✅ **拷貝即部署**：直接將檔案複製到伺服器就能運作
- ✅ **原生相容**：使用純原生 JavaScript，支援 2022 年以來的瀏覽器
- ❌ **絕不使用**：任何需要編譯、轉譯、打包的語法或工具

## 程式碼風格

- 這是一個純原生 JavaScript 前端專案，所有程式碼都應該用原生 JavaScript 撰寫。
- **絕對不使用任何第三方 JavaScript 函式庫或框架**，包括 jQuery、React、Vue 等。
- **不使用 ES Modules (import/export)**，一律使用傳統的 JavaScript 載入方式。
- **所有 JavaScript 檔案都必須可以直接載入使用，絕對不需要任何 build、compile、transpile 等預處理程序**。
- **所有功能都必須用 JavaScript class 封裝**，確保程式碼組織清晰。
- Claude 在產生程式碼時一律要相容於**2022年以來的瀏覽器版本**。
- **所有必要和可選的參數及設定都必須使用 getter 和 setter 方法，並採用可串接的 chainable 模式**。
- **所有 setter 方法都要回傳 this 以支援鏈式呼叫**。
- **關鍵需求：所有 CSS 和 JavaScript 都必須封裝在 Shadow DOM 中以實現完全隔離**。
- **Shadow DOM 封裝：確保樣式和腳本不會與外部頁面產生衝突或洩漏**。
- **嚴格禁止：避免將 CSS 注入到主頁面中**。
- **debug 參數必須遵循 getter/setter + chainable 模式：`.setDebug(true).getDebug()`**。
- **當 debug 為 false 時，不得在 console 輸出任何除錯訊息**。

## Shadow DOM 封裝要求

**所有 JavaScript 函式庫都必須使用 Shadow DOM 來封裝 CSS 和 JavaScript，確保完全隔離**

### 🔒 Shadow DOM 封裝原則

- **完全隔離**：所有樣式和腳本都必須封裝在 Shadow DOM 內。
- **無外部影響**：Shadow DOM 內的樣式不會影響外部頁面。
- **無外部干擾**：外部頁面的樣式不會影響 Shadow DOM 內容。
- **嚴格禁止 CSS 注入**：絕對不允許將 CSS 注入到主頁面的 `<head>` 或任何外部元素。

### ❌ 禁止的做法

```javascript
// 🚫 絕對不要這樣做 - 不可將 CSS 注入主頁面
document.head.insertAdjacentHTML('beforeend', '<style>...</style>');
document.head.appendChild(styleElement);
document.styleSheets[0].insertRule('...');

// 🚫 不可在主頁面撰寫 style 標籤
const style = document.createElement('style');
document.head.appendChild(style);

// 🚫 不可修改主頁面的現有樣式
document.documentElement.style.setProperty('--custom-color', 'red');
```

### ✅ 正確的做法

```javascript
// ✅ 正確 - 所有 CSS 都在 Shadow DOM 內
createStyles()
{
    const style = document.createElement('style');
    style.textContent = `
        /* 所有樣式都在 Shadow DOM 內，完全隔離 */
        :host { display: block; }
        .component { background: #fff; }
    `;
    this.shadowRoot.appendChild(style); // 只添加到 Shadow DOM
}
```

### 📦 Shadow DOM 實作模式

```javascript
// Shadow DOM 封裝模式
(function (global) {
    'use strict';

    class DeusComponentWithShadowDOM {
        constructor(hostElement) {
            // 建立 Shadow DOM
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({mode: 'closed'});

            // 初始化設定
            this._config = {
                debug: false,
                theme: 'default'
            };

            // 初始化組件
            this.initialize();
        }

        initialize() {
            this.createStyles();
            this.createContent();
            this.attachEvents();
        }

        // 建立 Shadow DOM 內的樣式
        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                /* 所有樣式都在 Shadow DOM 內，完全隔離 */
                :host {
                    display: block;
                    contain: layout style paint;
                }
                
                .component-container {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background: #ffffff;
                    border: 1px solid #e1e5e9;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                /* ... 其他樣式 ... */
                
                /* 主題樣式 */
                :host([theme="dark"]) .component-container {
                    background: #1f2937;
                    border-color: #374151;
                    color: #f9fafb;
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        // ...
        // Getter/Setter 方法（維持 chainable 模式）
        getDebug() {
            return this._config.debug;
        }

        setDebug(debug) {
            this._config.debug = Boolean(debug);
            // ...
            return this; // 支援鏈式呼叫
        }

        getTheme() {
            return this._config.theme;
        }

        setTheme(theme) {
            this._config.theme = theme;
            this.hostElement.setAttribute('theme', theme);
            return this;
        }
        
        // 銷毀組件
        destroy() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = '';
            }
        }
    }

    // 將類別掛載到全域物件
    global.DeusComponentWithShadowDOM = DeusComponentWithShadowDOM;

})(window);

// 使用範例
const hostElement = document.createElement('div');
document.body.appendChild(hostElement);

const component = new DeusComponentWithShadowDOM(hostElement)
    .setTheme('dark')
    .setDebug(true)
    .setHeader('我的 Shadow DOM 組件')
    .setContent('完全隔離的內容，不會受到外部樣式影響');
```

### 📋 Shadow DOM 檢查清單

- [ ] 建立 Closed Shadow DOM
- [ ] 所有 CSS 都在 Shadow DOM 內定義
- [ ] **絕對不將 CSS 注入到主頁面的 `<head>` 或任何外部元素**
- [ ] 使用 `:host` 選擇器
- [ ] 事件處理器在 Shadow DOM 內註冊
- [ ] 維持 getter/setter + chainable API
- [ ] 包含 debug 參數控制
- [ ] 提供 destroy 方法清理資源
- [ ] **驗證無任何 CSS 洩漏到主頁面**

### 📊 Console 日誌輸出機制

```javascript
class DeusLogger {
    constructor(debugMode = false) {
        this.debugMode = debugMode;
    }

    setDebugMode(enabled) {
        this.debugMode = Boolean(enabled);
        return this;
    }

    log(level, message) {
        // 關鍵：只在 debug 模式或非 debug 等級時輸出
        if (!this.debugMode && level === 'debug') {
            return; // 不輸出 debug 訊息
        }
        // ...
    }

    debug(message) {
        if (this.debugMode) {
            this.log('debug', '🔍 ' + message);
        }
    }
}
```

## JavaScript Class 封裝模式

使用 IIFE 包裝避免全域污染

```javascript
// 使用 IIFE 包裝避免全域污染
(function (global) {
    'use strict';

    /**
     * 基礎服務類別 - 展示完整的 getter/setter chainable 模式
     */
    class DeusBaseService {
        constructor() {
            // 內部設定物件
            this._config = {
                apiUrl: null,
                timeout: 5000,
                debug: false,  // 關鍵需求：debug 參數
            };
            // ...
        }

        // =================
        // Getter 方法
        // =================
        getApiUrl() { /* ... */ }
        getDebug() {
            return this._config.debug;
        }
        getConfig() {
            return Object.assign({}, this._config); // 回傳完整設定的副本
        }

        // =================
        // Setter 方法 - 全部支援鏈式呼叫
        // =================
        setApiUrl(url) {
            // ... 驗證 ...
            this._config.apiUrl = url.trim();
            return this; // 支援鏈式呼叫
        }
        setDebug(debug) {
            this._config.debug = Boolean(debug);
            // ...
            return this;
        }

        // 批次設定方法
        setConfig(configObject) {
            // ...
            return this;
        }

        // ...
    }

    // 將類別掛載到全域物件
    global.DeusBaseService = DeusBaseService;

})(window);

// =================
// 使用範例 - 展示 chainable API
// =================

/*
// 基本鏈式呼叫 - 注意 debug 參數的使用
const service = new DeusBaseService()
    .setApiUrl('https://api.example.com')
    .setDebug(true)                 // 啟用除錯模式
    .validate()
    .execute();

// 正式環境使用 - 關閉除錯模式
const service2 = new DeusBaseService()
    .setConfig({
        apiUrl: 'https://api.example.com',
        debug: false                // 關閉除錯模式，不輸出 debug 訊息
    })
    .validate()
    .execute();

// 取得設定值 - 包含 debug 狀態
console.log('當前 debug 模式:', service.getDebug());  // 關鍵方法
*/
```

## 重要開發原則

- **確保你用適當的 JavaScript 類別和 IIFE 封裝來隔離程式碼**
- **特別重要：每一次的程式修改都要 100% 避免 breaking changes**
- **確保你寫的任何程式碼都是正式環境可用的**
- **強制要求：所有類別的參數和設定都必須使用 getter/setter 模式**
- **強制要求：所有 setter 方法都必須回傳 this 以支援鏈式呼叫**
- **關鍵需求：所有函式庫都必須包含 debug 參數控制除錯訊息顯示**
- **關鍵需求：debug=false 時絕對不能在 console 輸出除錯訊息**

## Getter/Setter 實作檢查清單

### ✅ 必要檢查項目

- [ ] 每個設定參數都有對應的 getter 和 setter 方法
- [ ] 所有 setter 方法都回傳 `this`
- [ ] 提供 `setConfig(object)` 批次設定方法
- [ ] **必須包含 `setDebug(boolean)` 和 `getDebug()` 方法**
- [ ] **debug 參數必須控制 console 除錯訊息的顯示/隱藏**
- [ ] **必須使用 Shadow DOM 封裝所有 CSS 和 JavaScript**
- [ ] **建立 Closed Shadow DOM（mode: 'closed'）**
- [ ] **絕對不將 CSS 注入到主頁面**
- [ ] **提供 destroy() 方法清理 Shadow DOM 資源**

---

# 文件三: 新增頁面檢查清單 (與重構步驟)

當您要為網站新增頁面，或重構舊有頁面以符合最新規範時，請按照以下步驟確保頁面完整且功能統一。

> **文章寫作指引請參考** 文件四 (`doc-4`) - 專注於內容結構、寫作風格、視覺化設計等內容層面

## 快速檢查清單

### 基礎結構

- [ ] 建立/檢查 HTML 檔案 (新頁面複製 `00template.html`)
- [ ] 設定/檢查正確的 `<title>` 與 `<meta>` 標籤
- [ ] 在 `<body>` 加入/檢查 `data-article-id` (需與 `articles-data.js` 對應)

### 組件與功能

- [ ] 加入/檢查 Header/Footer 組件
- [ ] **(新/重構)** 加入/檢查響應式目錄組件 (`ResponsiveTocComponent`) - 見下方詳細步驟
- [ ] **(新/重構)** 加入/檢查智慧推薦文章組件 (`RelatedArticlesComponent`) - 見下方詳細步驟
- [ ] 加入/檢查 GA4 分析組件
- [ ] 加入/檢查進度條、FAQ 等互動功能

### SEO 與結構化資料

- [ ] 設定/檢查 Article, WebSite, BreadcrumbList 的 JSON-LD
- [ ] 確認所有 JSON-LD 資料正確無誤

### 內容品質

- [ ] 檢查文章結構完整性（PSMA + 8個標準章節）- 見文件四
- [ ] 檢查 CSS 元件使用規則 (無行內樣式, Class 正確使用) - 見文件四
- [ ] 檢查視覺化元素（圖表、卡片等）
- [ ] 驗證所有內部連結正常

### 樣式與佈局

- [ ] 檢查全局 RWD 規則是否已應用 (卡片佈局、表格包裹) - 見文件四
- [ ] 驗證錨點連結 (`#hash`) 是否因 Header 遮擋 (需有 `scroll-margin-top`)

### 網站整合

- [ ] **(新頁面)** 更新 `articles-data.js` 中央資料庫
- [ ] **(新頁面)** 在至少 1-2 個舊頁面中，加入指向此 new 頁面的內部連結
- [ ] **(新頁面)** 更新 `sitemap.xml`
- [ ] **最終驗證** (跨瀏覽器、響應式、效能)

## 詳細步驟指引 (整合重構計畫)

### 1. 建立/檢查基本 HTML 結構

**新頁面標準作法：** 複製 `/post/00template.html` 範本檔案。

**重構頁面：** 檢查是否符合範本的基本結構。

### 2. 設定/檢查文章 ID

確保 `<body>` 標籤上已設定 `data-article-id`，且此 ID 與 `articles-data.js` 中的 `id` 完全對應。

```html
<!-- 範例 -->
<body data-article-id="card-vitamin-b">
```

### 3. 設定/檢查組件容器

確保在文章的 HTML 指定位置放置了必要的空的 `<div>` 容器：

- **響應式目錄容器 (Responsive TOC)**:
    - **位置**: 必須放置在 `<main>` 區塊的 `<header>` 標籤後，且位於 `<div class="article-hero">` 之後、`<article class="article-body">` 之前。
    - **程式碼**: `<div id="toc-mobile-target"></div>`
    - **範例**:
      ```html
      </header> <!-- header 結束 -->

      <div id="toc-mobile-target"></div> <!-- TOC 容器在此 -->
          
      <article class="article-body"> <!-- 文章主體開始 -->
      ```
- **智慧推薦文章容器 (Related Articles)**:
    - **位置**: 放在 `</article>` 標籤的**正上方**。
    - **程式碼**: `<div id="related-articles-container"></div>`
    - **重構注意**: 移除此位置原有的任何靜態推薦連結區塊。

### 4. 引入並初始化組件 (含 RWD 修正)

在頁面底部的 `<script>` 區塊，確保已正確引入組件腳本並初始化。

#### 引入腳本 (注意順序)

```html
<!-- 中央資料庫 (必須最先) -->
<script src="../assets/js/articles-data.js"></script> 
<!-- 組件腳本 -->
<script src="../assets/js/related-articles-component.js"></script>
<script src="../assets/js/responsive-toc-component.js"></script>
<!-- 其他組件... -->
```

#### 初始化程式碼 (DOMContentLoaded)

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // --- 其他組件初始化 ---
  // 例如：Header/Footer, GA4 等...

  // --- 初始化智慧推薦組件 ---
  const relatedContainer = document.getElementById("related-articles-container");
  const articleId = document.body.dataset.articleId; 
  // 確保容器存在、組件已載入、資料也已載入
  if (relatedContainer && articleId && window.RelatedArticlesComponent && typeof articlesData !== 'undefined' && typeof topicArticles !== 'undefined') {
    try { // 加入錯誤處理
        new window.RelatedArticlesComponent(relatedContainer, articleId, articlesData, topicArticles).initialize();
    } catch (error) {
        console.error("智慧推薦組件初始化失敗:", error);
    }
  } else {
     // 可選：如果缺少必要元素，輸出警告
     if (!relatedContainer) console.warn("缺少智慧推薦組件容器: #related-articles-container");
     if (!articleId) console.warn("缺少 body[data-article-id]");
     // ... 其他檢查
  }

  // --- 初始化響應式目錄組件 ---
  if (window.ResponsiveTocComponent) {
     try { // 加入錯誤處理
        new window.ResponsiveTocComponent().initialize();
     } catch (error) {
         console.error("響應式目錄組件初始化失敗:", error);
     }
  } else {
      console.warn("響應式目錄組件 (ResponsiveTocComponent) 未載入");
  }

  // --- RWD 初始渲染問題修正 ---
  // 強制觸發 resize 事件，解決 Chrome DevTools 手機模式下的初始渲染問題
  // 延遲觸發以確保佈局穩定
  setTimeout(() => {
     console.log("觸發 resize 事件以修正 RWD 初始渲染...");
     window.dispatchEvent(new Event('resize'));
  }, 100); 

});
```

#### 重構注意：

- 確保舊頁面中若有手動實現類似功能的 JS 程式碼已被移除。
- 檢查 CSS 中是否移除了舊的 `@media (max-width: 1024px)` 中隱藏 sidebar (`display: none`) 的規則，否則新組件無法正常顯示。

### 5. 更新中央資料庫 (`articles-data.js`) - 僅限新頁面

若為新增文章，務必在 `articlesData` (核心營養素) 或 `topicArticles` (主題式) 陣列中，為新文章新增一筆完整的物件資料，特別是 `id`, `link`, `title`, `goals` 等欄位。`goals` 欄位將影響智慧推薦的準確性。

### 6. 目錄 (TOC) 結構與連結修正

- **階層式結構**: 根據文件四規範，為次要章節 (通常是 `<h3>` 對應的連結) 在目錄的 `<a>` 標籤上加上 `.sub-item` class。
- **納入 `<h3>` 標籤**: 確保目錄生成邏輯 (無論是手動或自動) 包含文章中的 `<h3>` 標籤，並套用 `.sub-item` 樣式。
- **錨點連結 CSS**: 檢查全域 CSS 或頁面 `<style>` 中是否包含 `[id] { scroll-margin-top: 100px; }` (或類似數值)，防止標題被固定 Header 遮擋。 (見文件四詳細說明)
- **相關營養素連結**: 目錄中「相關營養素」的連結**必須**指向智慧推薦組件的容器 ID：`href="#related-articles-container"`。

---

# 文件四: Caregiver 營養百科 - 文章風格指引

這份文件旨在為所有「營養百科」的文章建立一套統一、高標準的風格與結構。遵循此指引將有助於我們產出高品質、風格一致且對讀者極具吸引力的內容。

> **技術檢查清單請參考** 文件三 (`doc-3`) - 專注於 HTML 結構、SEO 設定、組件整合等技術層面

## 第一章：核心原則

### 總體風格與核心理念

文章的整體風格應為**「專業、親切且易於行動」**。我們透過專業的口吻建立權威，同時用生活化的比喻和清晰的視覺設計拉近與讀者的距離，並在文末提供明確的指引。

## 第二章：內容策略與結構

### 標準文章結構
每篇文章都應遵循以下標準結構，以確保內容的連貫性與完整性。
. 頁面標題與導覽 (H1 & Breadcrumb)

1.1 權威型長標題 (H1 Strategy)
核心邏輯： 標題即摘要。H1 必須包含核心關鍵字，並使用「多重價值堆疊」策略，讓讀者一眼看見 4 種以上的具體功效。
撰寫公式：
[核心關鍵字] [強烈動詞/定義]：[功效1]、[功效2]、[功效3]與[功效4]... [目標族群/終極指南]
規範要求：
關鍵字前置： 核心關鍵字（如「鈣片」、「葉黃素」）必須位於標題最前方。
功效堆疊 (Benefit Stacking)： 必須列出 >3 個 具體好處（例：預防骨折、改善抽筋、幫助睡眠）。
長度無上限： 不要縮減標題長度，重點在於資訊密度。
正確範例
鈣片功效總整理：不只補骨預防骨折！還能改善抽筋、幫助睡眠、穩定情緒與調節血壓的完整解析
1.2 麵包屑導覽 (Breadcrumb)
HTML 規則： <nav class="breadcrumb"> 的最後一節文字 (Last Child) 必須 與頁面 <h1> 的文字完全一致。

2. 內文模組化結構 (Content Modules)
內文必須依照以下順序使用 <h2> 和 <h3> 標籤。每個區塊對應特定的 UI 元件與 SEO 目的。
Module 1: 基本資訊與定義
標題： <h2> [營養素]是什麼？
SEO 目的： 爭取 Google 精選摘要 (Featured Snippet) 的定義位置。
內容結構：
<h3> 定義與化學分類 (簡短、權威解釋)。
<h3> 關鍵類型比較 (例：檸檬酸鈣 vs. 碳酸鈣)。

Module 2: 核心功效總覽
標題： <h2> [營養素]對人體有哪些好處？
UI 元件： <div class="info-cards">
SEO 目的： 滿足主要搜尋意圖 (Search Intent)。
規範要求：
必須列出 5~8 點 功效（嚴禁少於 3 點）。
每點功效需附帶機制說明或醫學實證。

Module 3: 攝取量與時間
標題： <h2> 每日建議攝取量與最佳時間
SEO 目的： 回答具體操作 (How-to) 問題，增加長尾關鍵字。
內容結構：
<h3> 官方建議攝取量 (引用 DRIs 標準)。
<h3> 最佳攝取時間 (飯前/飯後/睡前及其原因)。

Module 4: 食物來源
標題： <h2> 哪些天然食物富含[營養素]？
UI 元件： <div class="data-table">
SEO 目的： 增加內容豐富度，提供非補充品的替代方案。
規範要求： 表格需列出食物名稱及每 100g 含量。

Module 5: 缺乏警訊與高風險族群
標題： <h2> 誰最需要補充？[營養素]缺乏的警訊
UI 元件： <div class="risk-group-cards">
SEO 目的： 觸發讀者自我檢測心理，提高轉換動機。
內容結構： 列出具體缺乏症狀（如指甲易斷、嘴角破裂）及高風險族群。

Module 6: 產品挑選指南 (導購核心)
標題： <h2> 如何挑選[營養素]補充品？
UI 元件： <div class="comparison-table"> 或 CheckList
SEO 目的： 展現專業評測能力 (Expertise)，引導購買決策。
內容重點： 劑量、劑型選擇、複方搭配建議、專利原料認證。

Module 7: 風險與禁忌
標題： <h2> [營養素]的副作用與藥物交互作用
SEO 目的： 建立信任感 (Trust)，揭露風險是符合 E-E-A-T 的關鍵。
內容結構：
<h3> 過量攝取的副作用。
<h3> 藥物交互作用 (如：與抗生素、抗凝血劑的衝突)。

Module 8: 常見問題 (FAQ)
標題： <h2> 常見問題
Schema 標記： 需在此區塊實作 FAQPage Schema。
規範要求： 收錄 PAA (People Also Ask) 中最熱門的 3-5 個問題。

Module 9: 延伸閱讀
系統功能： 指向 #related-articles-container
SEO 目的： 增加站內停留時間與頁面權重傳遞。

備註： 所有 CSS Class (.info-cards, .data-table, .risk-group-cards, .comparison-table) 需在前端樣式表中定義對應的響應式設計。
##### 章節開場白原則 (整合 Checklist 強調)


為確保內容流暢易讀，請務必遵循以下原則：
- **豐富引言內容**: 確保每一個 `<h2>` 和 `<h3>` 標籤後，都有一段**內容豐富**的 `<p>` 引言+說明。避免標題後直接就是列表、表格或卡片。
- **強化引導性**: 引言段落應扮演**承上啟下**的角色，為讀者提供必要的背景知識、情境鋪陳，或點出該章節要解決的核心問題，讓讀者更容易進入章節的核心內容。
- **避免生硬陳列**: 嘗試透過更具吸引力的**比喻或提問**來開頭，讓資訊的流動更順暢，提升文章的整體閱讀體驗與專業感。

### 內容與語氣
1.  **專業口吻**：適時使用「**營養師提醒**」、「**醫師警告**」等提示框。
2.  **善用比喻**：例如：*維生素B群是身體的「能量轉換器」。*
3.  **強調重點**：使用 `<strong>` 或 `<span class="highlight-nutrient">` 來凸顯。
4.  **精簡圖示 (Icon) 使用**：**原則禁止，例外手動**。絕不使用 Emoji。



#### TOC 目錄結構建議 (整合 Checklist 強調)

TOC 現已支援兩層式結構，並應包含 `<h3>` 標籤以提供更詳細的導航。
- **階層式結構**: 在目錄的 `<ul>` 列表中，為屬於子項目 (通常對應 `<h3>`) 的 `<a>` 標籤加上 `sub-item` class。
- **納入 `<h3>` 標籤**: 目錄應包含文章中的 `<h3>` 標籤，並套用 `.sub-item` 樣式。
- **錨點連結修正**:
    - **CSS**: 樣式表中必須包含 `[id] { scroll-margin-top: 100px; }` 規則 (見下方詳細說明)。
    - **連結目標**: 「相關營養素」的目錄連結必須指向 `#related-articles-container`。

```html
<ul class="toc-list">
  <!-- 主項目 (H2) -->
  <li><a href="#problem" class="toc-link">您有這些困擾嗎？（Pain）</a></li>
  <li><a href="#solution" class="toc-link">解方與核心效益（Solution）</a></li>
  
  <!-- 子項目 (H3) -->
  <li><a href="#mechanism" class="toc-link">[營養素]如何運作？</a></li>
  <li><a href="#mechanism-type-a" class="toc-link sub-item">類型 A 的機制</a></li> <!-- 假設有 H3 -->
  <li><a href="#mechanism-type-b" class="toc-link sub-item">類型 B 的機制</a></li> <!-- 假設有 H3 -->

  <li><a href="#related-articles-container" class="toc-link">相關營養素</a></li>
</ul>
```

##### 錨點連結滾動偏移重構說明 (CSS scroll-margin-top)

本節詳細說明為何及如何使用 CSS `scroll-margin-top` 屬性來解決固定 Header 遮擋錨點內容的問題，取代舊有的 JavaScript 解決方案。

1.  **問題背景：Header 遮擋錨點內容**
    當頁面頂部有固定 Header 時，點擊錨點連結會導致目標區塊被 Header 遮擋。
2.  **舊有解決方案（JavaScript 方式）**
    透過 JavaScript 阻止預設行為，計算位置並手動調整滾動偏移。
3.  **新的解決方案（CSS `scroll-margin-top` 方式）**
    使用 CSS `scroll-margin-top` 屬性指示瀏覽器在滾動到錨點時保留頂部空間。
    - **`[id] { scroll-margin-top: 100px; }` 的解釋**：選取所有帶 `id` 的元素，並在其上方保留 100px 的滾動邊距，以避開 Header。
4.  **新方法（CSS）的優勢**
    - **簡潔與易維護**：一行 CSS 取代複雜 JS。
    - **效能更佳**：瀏覽器原生支援，更流暢。
    - **更具彈性**：無需事件監聽，動態內容也有效。
    - **職責分離**：視覺呈現交由 CSS 處理。
5.  **整體修改邏輯與步驟 (Refactor Plan)**
    這次重構旨在將錨點滾動偏移的處理從 JavaScript 轉換為 CSS，提升程式碼品質和可維護性。主要步驟如下：
    1.  **[已完成] 在範本中添加 CSS 規則** (`post/00template.html`):
        - 添加 `[id] { scroll-margin-top: 100px; }` 規則，讓所有文章頁面自動獲得滾動偏移效果。
    2.  **[待執行] 移除各頁面中冗餘的 JavaScript 程式碼** (`post/*.html`):
        - 找出並移除各文章頁面底部 `<script>` 區塊中，用於處理錨點點擊、計算偏移和執行 `window.scrollTo` 或類似平滑滾動功能的 JavaScript 程式碼。
    3.  **[已完成] 移除組件中冗餘的 JavaScript 程式碼** (`assets/js/health-topics-logic.js`):
        - 移除該組件中處理內部錨點跳轉的手動滾動邏輯，確保行為統一由 CSS 控制。


## 第三章：技術與格式化規範

### 格式化與常用 CSS Class

> **重要規則：**
>
> 1.  **禁止行內樣式**: 應完全避免使用 `style="..."` 屬性。 (來自 Checklist 強調)
> 2.  **禁止裝飾性圖示**: **原則上禁止在文章內使用任何裝飾性圖示（包含 Emoji）**。
> 3.  **例外：CSS 變數**：唯一允許使用 `style` 屬性的情境，是為了傳遞動態數值給 CSS 變數，例如 `style="--percent: 40%;"`。

#### 1. 提示框 (`.alert`)

**圖示自動套用**: 警示圖示 (⚠️, 💡) 是由 CSS 自動添加的，**嚴禁**在 HTML 中手動插入任何 Emoji 或圖示。

標準 HTML 結構：

```html
<div class="alert alert-tip">
  <strong>營養師小撇步：</strong>
  <p>將魚油與含有脂肪的正餐一同服用，是提升其生物利用率的關鍵。</p>
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：提示框</h4>
    <div class="alert alert-tip" style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; border-width: 1px; background: #fffbeb; color: #b45309; border-color: #fde68a;">
        <strong style="flex-shrink: 0;">營養師小撇步：</strong>
        <p style="margin-bottom: 0; line-height: 1.6;">將魚油與含有脂肪的正餐一同服用，是提升其生物利用率的關鍵。空腹服用會大幅降低吸收效果。</p>
    </div>
    <div class="alert alert-nutritionist" style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; border-width: 1px; background: #eff6ff; color: #1e40af; border-color: #bfdbfe;">
        <strong style="flex-shrink: 0;">營養師提醒：</strong>
        <p style="margin-bottom: 0; line-height: 1.6;">這是一個專業建議，說明了為何這個營養素很重要。</p>
    </div>
    <div class="alert alert-doctor" style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; border-width: 1px; background: #fef2f2; color: #b91c1c; border-color: #fecaca;">
        <strong style="flex-shrink: 0;">醫師警告：</strong>
        <p style="margin-bottom: 0; line-height: 1.6;">若您正在服用特定藥物，請在補充此營養素前諮詢您的醫師。</p>
    </div>
</div>

#### 2. 資訊卡片 (`.info-cards`)

用於並列呈現核心觀點或功效。**[修改] 此舉是為了強調資訊卡僅用於呈現最核心的重點，故一個區塊不應放置超過 2 張卡片**。

```html
<!-- 桌面版為兩欄: md-grid-2 -->
<div class="info-cards md-grid-2"> 
  <div class="info-card">
    <h4 class="info-card-title">核心功效一</h4>
    <p class="info-card-desc">說明此功效的詳細內容...</p>
  </div>
  <div class="info-card">
    <h4 class="info-card-title">核心功效二</h4>
    <p class="info-card-desc">說明此功效的詳細內容...</p>
  </div>
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：資訊卡片（[修改] 最多 2 張）</h4>
    <div class="info-cards" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 1rem;">
        <div class="info-card" style="flex: 1; min-width: 280px; max-width: calc(50% - 10px); box-sizing: border-box; background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb;">
            <h4 class="info-card-title" style="font-size: 1.125rem; font-weight: 600; margin-top: 0 !important; margin-bottom: 0.5rem; color: #1f2937;">核心功效一</h4>
            <p class="info-card-desc" style="font-size: 0.9rem; color: #4b5563; margin-bottom: 0;">說明此功效的詳細內容，幫助讀者快速了解價值。</p>
        </div>
        <div class="info-card" style="flex: 1; min-width: 280px; max-width: calc(50% - 10px); box-sizing: border-box; background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb;">
            <h4 class="info-card-title" style="font-size: 1.125rem; font-weight: 600; margin-top: 0 !important; margin-bottom: 0.5rem; color: #1f2937;">核心功效二</h4>
            <p class="info-card-desc" style="font-size: 0.9rem; color: #4b5563; margin-bottom: 0;">說明此功效的詳細內容，幫助讀者快速了解價值。</p>
        </div>
    </div>
</div>

#### 3. 風險族群卡片 (`.risk-group-cards`)

**一個區塊不應放置超過 3 張卡片**。（此規則不變）

```html
<!-- 桌面版為三欄: md-grid-3 -->
<div class="risk-group-cards md-grid-3">
  <div class="risk-card">
    <div class="risk-card-header">
      <h4 class="risk-card-title">吸菸者</h4>
    </div>
    <p class="risk-card-desc">香菸會產生大量自由基...</p>
  </div>
  <!-- ... 其他卡片 ... -->
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：風險族群卡片</h4>
    <div class="risk-group-cards" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 1rem;">
        <div class="risk-card" style="flex: 1; min-width: 250px; max-width: calc(33.333% - 14px); box-sizing: border-box; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 0 0.5rem 0.5rem 0;">
            <div class="risk-card-header" style="margin-bottom: 0.5rem;">
                <h4 class="risk-card-title" style="font-size: 1.125rem; font-weight: 600; color: #78350f; margin-top: 0 !important;">吸菸者</h4>
            </div>
            <p class="risk-card-desc" style="font-size: 0.9rem; color: #78350f; margin: 0;">香菸會產生大量自由基，加速消耗體內抗氧化營養素。</p>
        </div>
        <div class="risk-card" style="flex: 1; min-width: 250px; max-width: calc(33.333% - 14px); box-sizing: border-box; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 0 0.5rem 0.5rem 0;">
            <div class="risk-card-header" style="margin-bottom: 0.5rem;">
                <h4 class="risk-card-title" style="font-size: 1.125rem; font-weight: 600; color: #78350f; margin-top: 0 !important;">高壓上班族</h4>
            </div>
            <p class="risk-card-desc" style="font-size: 0.9rem; color: #78350f; margin: 0;">長期壓力會消耗體內B群與維生素C，導致疲勞。</p>
        </div>
        <div class="risk-card" style="flex: 1; min-width: 250px; max-width: calc(33.333% - 14px); box-sizing: border-box; background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1.5rem; border-radius: 0 0.5rem 0.5rem 0;">
            <div class="risk-card-header" style="margin-bottom: 0.5rem;">
                <h4 class="risk-card-title" style="font-size: 1.125rem; font-weight: 600; color: #78350f; margin-top: 0 !important;">素食者</h4>
            </div>
            <p class="risk-card-desc" style="font-size: 0.9rem; color: #78350f; margin: 0;">部分營養素在植物性食物中含量較低，如B12與鐵。</p>
        </div>
    </div>
</div>

#### 4. 比較表格 (`.data-table`)

**必須**用 `<div class="responsive-table-wrapper">` 包裹。

```html
<div class="responsive-table-wrapper">
  <table class="data-table">
    <thead>
      <tr><th>排名</th><th>食物項目</th><th>含量 (mg)</th></tr>
    </thead>
    <tbody>
      <tr><td>冠軍</td><td><strong>葵花籽</strong></td><td><strong>36.3</strong></td></tr>
    </tbody>
  </table>
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：比較表格</h4>
    <div class="responsive-table-wrapper" style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 20px 0; border: 1px solid #e2e8f0; border-radius: 15px;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); margin-bottom: 1rem; border: 1px solid #e5e7eb;">
            <thead>
                <tr><th style="padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: 600; color: #374151;">排名</th><th style="padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: 600; color: #374151;">食物項目</th><th style="padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: 600; color: #374151;">含量 (mg)</th></tr>
            </thead>
            <tbody>
                <tr><td style="padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb;">冠軍</td><td style="padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb;"><strong>葵花籽</strong></td><td style="padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e5e7eb;"><strong>36.3</strong></td></tr>
                <tr><td style="padding: 0.75rem 1rem; text-align: left; border-bottom: 0;">亞軍</td><td style="padding: 0.75rem 1rem; text-align: left; border-bottom: 0;">杏仁</td><td style="padding: 0.75rem 1rem; text-align: left; border-bottom: 0;">29.8</td></tr>
            </tbody>
        </table>
    </div>
</div>

#### 5. 進階比較表格 (`.comparison-table`)

外部容器 `.comparison-table-container` 已包含 `overflow-x: auto`，無需再包裹 `.responsive-table-wrapper`。

```html
<div class="comparison-table-container">
  <table class="comparison-table">
    <thead>
      <tr>
        <th class="comparison-header-main">比較項目</th>
        <th class="comparison-header-option comparison-recommended">
          <div class="option-badge">推薦</div>
          <strong>魚油 (Fish Oil)</strong>
        </th>
        <th class="comparison-header-option"><strong>磷蝦油</strong></th>
      </tr>
    </thead>
    <tbody>
      <!-- ... rows ... -->
    </tbody>
  </table>
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：進階比較表格</h4>
    <div class="comparison-table-container" style="overflow-x: auto; margin-bottom: 1rem; border: 1px solid #e5e7eb; border-radius: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);">
        <table class="comparison-table" style="width: 100%; border-collapse: collapse; min-width: 600px;">
            <thead>
                <tr>
                    <th class="comparison-header-main" style="padding: 1rem; text-align: left; vertical-align: top; border-bottom: 1px solid #e5e7eb; background: #f9fafb; font-weight: 600; width: 25%;">比較項目</th>
                    <th class="comparison-header-option comparison-recommended" style="padding: 1rem; text-align: center; vertical-align: top; border-bottom: 1px solid #e5e7eb; background: #fffbeb; position: relative;">
                        <div class="option-badge" style="position: absolute; top: -1px; right: -1px; background-color: #ff6b35; color: white; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 0 14px 0 8px;">推薦</div>
                        <strong style="font-size: 1.125rem;">魚油 (Fish Oil)</strong>
                    </th>
                    <th class="comparison-header-option" style="padding: 1rem; text-align: center; vertical-align: top; border-bottom: 1px solid #e5e7eb; background: #f9fafb; position: relative;">
                        <strong style="font-size: 1.125rem;">磷蝦油 (Krill Oil)</strong>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="comparison-row">
                    <td class="comparison-label" style="padding: 1rem; text-align: left; vertical-align: top; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #374151; background: #fdfdfd;">生物利用率</td>
                    <td class="comparison-cell comparison-recommended" style="padding: 1rem; text-align: center; vertical-align: top; border-bottom: 1px solid #e5e7eb; background-color: #fffbeb;">
                        <div class="rating-badge rating-high" style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.875rem; font-weight: 500; background-color: #d1fae5; color: #065f46;">高</div>
                    </td>
                    <td class="comparison-cell" style="padding: 1rem; text-align: center; vertical-align: top; border-bottom: 1px solid #e5e7eb;">
                        <div class="rating-badge rating-very-high" style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.875rem; font-weight: 500; background-color: #a7f3d0; color: #047857;">極高</div>
                    </td>
                </tr>
                <tr class="comparison-row">
                    <td class="comparison-label" style="padding: 1rem; text-align: left; vertical-align: top; border-bottom: 0; font-weight: 500; color: #374151; background: #fdfdfd;">優缺點</td>
                    <td class="comparison-cell comparison-recommended" style="padding: 1rem; text-align: center; vertical-align: top; border-bottom: 0; background-color: #fffbeb;">
                        <div class="pros-cons" style="text-align: left; font-size: 0.9rem;">
                            <div class="pros" style="color: #059669; margin-bottom: 0.25rem;">+ 性價比高、研究完整</div>
                            <div class="cons" style="color: #dc2626;">- 可能有魚腥味</div>
                        </div>
                    </td>
                    <td class="comparison-cell" style="padding: 1rem; text-align: center; vertical-align: top; border-bottom: 0;">
                        <div class="pros-cons" style="text-align: left; font-size: 0.9rem;">
                            <div class="pros" style="color: #059669; margin-bottom: 0.25rem;">+ 吸收率極佳、無腥味</div>
                            <div class="cons" style="color: #dc2626;">- 價格昂貴、濃度偏低</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

#### 6. 全局響應式設計 (Global RWD) - 整合 Checklist

**目標**: 整合並標準化全站的響應式設計規則，提升在所有裝置上的瀏覽體驗與未來可維護性。

##### 核心 CSS 規則

```css
/* ============================================= */
/* == 全局 RWD 與佈局標準化 (Global RWD)    == */
/* ============================================= */

/* 1. 通用盒模型與文字換行 */
* { box-sizing: border-box; }
p, td, th, li, a { word-break: break-word; }

/* 2. 響應式媒體 */
img, svg { max-width: 100%; height: auto; }

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
    flex-direction: column; /* 手機預設單欄 */
    gap: 20px;
    margin: 40px 0;
}
.info-card, .risk-card { flex: 1; min-width: 250px; }

/* 5. 桌面版佈局 Utility Classes */
@media (min-width: 768px) {
    .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
    .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
    .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
    .md-flex-row { flex-direction: row; } /* (較少用，grid 優先) */
}
```

##### HTML 實作方式

- **卡片佈局**: 為 `.info-cards` (建議 `.md-grid-2`) 或 `.risk-group-cards` (建議 `.md-grid-3`) 容器加上對應的 Utility Class。
- **表格**: **所有**的普通 `<table class="data-table">` 元素，都**必須**被一個 `<div class="responsive-table-wrapper">` 包裹起來。

##### 執行檢查 (重構時)

- [ ] 檢查所有卡片佈局 (`.info-cards`, `.risk-group-cards`)，移除舊的行內樣式或特定欄數 class，換上標準的 `.md-grid-N` Utility Class。
- [ ] 檢查所有 `<table class="data-table">`，確保都已被 `responsive-table-wrapper` `<div>` 包裹。
- [ ] 在手機模擬器中，檢查頁面，確保卡片佈局正常（手機單欄，桌面多欄）且表格內容可橫向滾動，無頁面級橫向滾動條。

### SEO 與 Metadata

這是確保文章能被搜尋引擎正確索引的關鍵步驟。

1.  **基礎 Meta 標籤**：確實填寫 `<title>`、`<meta name="description">`。
2.  **JSON-LD 結構化資料**：**此為必填項目**。包含 `Article`, `WebSite`, `BreadcrumbList`。
3.  **全站品牌識別 (Site Name) 設定**。

## 第五章：資源與範例

### 完整範例：鈣質文章撰寫示範

#### 核心概念視覺化

```html
<div class="chart-dual-role">
  <div class="donut-chart-visual">
    <div class="donut-chart-segment"></div>
    <div class="donut-chart-text">鈣的<br>雙重角色</div>
  </div>
  <!-- ... legend ... -->
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：鈣的雙重角色圖表</h4>
    <div class="chart-dual-role" style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
        <div class="donut-chart-visual" style="position: relative; width: 150px; height: 150px; display: flex; align-items: center; justify-content: center;">
            <div class="donut-chart-segment" style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#ff6b35 0% 1%, #cbd5e1 1% 100%);"></div>
            <div class="donut-chart-text" style="position: absolute; width: 100px; height: 100px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 0.9rem; font-weight: 600; color: #374151; line-height: 1.3;">鈣的<br>雙重角色</div>
        </div>
        <div class="donut-chart-legend" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="legend-item legend-99" style="display: flex; align-items: flex-start; gap: 1rem;">
            <div class="legend-value" style="font-size: 1.5rem; font-weight: 700; color: #6b7280;">99%</div>
            <div class="legend-label" style="font-size: 0.9rem; line-height: 1.5; color: #4b5563;"><strong>結構鈣 (骨骼銀行)</strong><br>構成骨骼與牙齒的堅固建材。</div>
            </div>
            <div class="legend-item legend-1" style="display: flex; align-items: flex-start; gap: 1rem;">
            <div class="legend-value" style="font-size: 1.5rem; font-weight: 700; color: #ff6b35;">1%</div>
            <div class="legend-label" style="font-size: 0.9rem; line-height: 1.5; color: #4b5563;"><strong>離子鈣 (生命總司令)</strong><br>調控心跳、神經傳導與肌肉收縮。</div>
            </div>
        </div>
    </div>
</div>

#### 比較卡片設計 (使用 CSS 變數)

```html
<!-- 
  [修正說明]
  - 唯一例外：使用 CSS 自訂屬性 (Custom Property) 來傳遞「動態數值」(資料)，
  - 而非寫死「樣式」。CSS 檔案中應定義 .absorption-bar-fill { width: var(--absorption-percent, 0%); }
-->
<div class="absorption-bar">
  <div class="absorption-bar-fill" style="--absorption-percent: 40%;"></div>
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：吸收率進度條 (40%)</h4>
    <div class="absorption-bar" style="width: 100%; height: 1rem; background-color: #e5e7eb; border-radius: 5px; overflow: hidden;">
        <div class="absorption-bar-fill" style="width: 40%; height: 100%; background-color: #ff6b35; border-radius: 5px; transition: width 0.5s ease-in-out;"></div>
    </div>
</div>

#### 迷思破解區塊 (使用 CSS Class)

```html
<!--
  [修正說明]
  - 移除所有行內 style="..." 屬性。
  - 替換為功能性的 CSS class:
    - "md-grid-4": 控制桌面版網格佈局 (手機版預設單欄)。
    - "card-theme-myth": 控制卡片主題樣式。
-->
<div class="info-cards md-grid-4">
  <div class="info-card card-theme-myth">
    <h4 class="info-card-title title-theme-myth">迷思一：喝大骨湯補鈣？</h4>
    <p class="info-card-desc"><strong>事實：</strong>骨頭中的鈣很難溶出...</p>
  </div>
  <!-- ... 其他迷思卡片 ... -->
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：迷思破解卡片</h4>
    <div class="info-cards" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 1rem;">
        <div class="info-card card-theme-myth" style="flex: 1; min-width: 280px; max-width: calc(50% - 10px); box-sizing: border-box; background: #fef2f2; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb; border-top: 5px solid #f87171;">
            <h4 class="info-card-title title-theme-myth" style="font-size: 1.125rem; font-weight: 600; margin-top: 0 !important; margin-bottom: 0.5rem; color: #b91c1c;">迷思一：喝大骨湯補鈣？</h4>
            <p class="info-card-desc" style="font-size: 0.9rem; color: #4b5563; margin-bottom: 0;"><strong>事實：</strong>骨頭中的鈣很難溶出，一碗大骨湯的鈣含量微乎其微。</p>
        </div>
        <div class="info-card card-theme-myth" style="flex: 1; min-width: 280px; max-width: calc(50% - 10px); box-sizing: border-box; background: #fef2f2; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb; border-top: 5px solid #f87171;">
            <h4 class="info-card-title title-theme-myth" style="font-size: 1.125rem; font-weight: 600; margin-top: 0 !important; margin-bottom: 0.5rem; color: #b91c1c;">迷思二：吃小魚乾？</h4>
            <p class="info-card-desc" style="font-size: 0.9rem; color: #4b5563; margin-bottom: 0;"><strong>事實：</strong>鈣含量雖高，但鈉含量也極高，且不易吸收。</p>
        </div>
         <div class="info-card card-theme-myth" style="flex: 1; min-width: 280px; max-width: calc(50% - 10px); box-sizing: border-box; background: #fef2f2; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb; border-top: 5px solid #f87171;">
            <h4 class="info-card-title title-theme-myth" style="font-size: 1.125rem; font-weight: 600; margin-top: 0 !important; margin-bottom: 0.5rem; color: #b91c1c;">迷思三：豆漿補鈣？</h4>
            <p class="info-card-desc" style="font-size: 0.9rem; color: #4b5563; margin-bottom: 0;"><strong>事實：</strong>傳統豆漿鈣含量低，需選擇鈣強化豆漿。</p>
        </div>
         <div class="info-card card-theme-myth" style="flex: 1; min-width: 280px; max-width: calc(50% - 10px); box-sizing: border-box; background: #fef2f2; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); border: 1px solid #e5e7eb; border-top: 5px solid #f87171;">
            <h4 class="info-card-title title-theme-myth" style="font-size: 1.125rem; font-weight: 600; margin-top: 0 !important; margin-bottom: 0.5rem; color: #b91c1c;">迷思四：補鈣會結石？</h4>
            <p class="info-card-desc" style="font-size: 0.9rem; color: #4b5563; margin-bottom: 0;"><strong>事實：</strong>適量補充通常不會，水份攝取不足才是主因。</p>
        </div>
    </div>
</div>

#### FAQ 互動設計

```html
<div class="faq-item">
  <div class="faq-question">Q1: 鈣和鎂可以一起吃嗎？</div>
  <div class="faq-answer">
    <p><strong>A: 可以...</strong> 理想的<strong class="highlight-nutrient">鈣鎂攝取比例約為 2:1</strong>。</p>
  </div>
</div>
```

<div class="example-preview">
    <h4 class="example-preview-title">即時預覽：FAQ</h4>
    <div class="faq-item" style="border-bottom: 1px solid #e5e7eb;">
        <div class="faq-question" style="padding: 1rem 0; font-weight: 600; cursor: pointer;">Q1: 鈣和鎂可以一起吃嗎？</div>
        <div class="faq-answer" style="padding-bottom: 1rem; color: #374151;">
            <p><strong>A: 可以，而且建議一起補充，但要注意比例。</strong> 理想的<strong class="highlight-nutrient">鈣鎂攝取比例約為 2:1</strong>。</p>
        </div>
    </div>
    <div class="faq-item" style="border-bottom: 1px solid #e5e7eb;">
        <div class="faq-question" style="padding: 1rem 0; font-weight: 600; cursor: pointer;">Q2: 晚上吃鈣片會睡不著嗎？</div>
        <div class="faq-answer" style="padding-bottom: 1rem; color: #374151;">
            <p><strong>A: 通常不會。</strong> 鈣有助於神經穩定，對睡眠可能有幫助。但若選擇碳酸鈣且消化不良，可能影響睡眠。</p>
        </div>
   </div>
</div>

### CSS 類別快速參考

此處列出規範中提到的所有自訂 CSS 類別，應統一放在全域 CSS 檔案中。

```css
/* 提示框 */
.alert-tip { background: #fffbeb; color: #b45309; }
.alert-nutritionist { background: #eff6ff; color: #1e40af; }
.alert-doctor { background: #fef2f2; color: #b91c1c; }

/* 資訊卡片 CSS */
.info-card {
    flex: 1; 
    min-width: 280px; 
    max-width: calc(50% - 10px); /* 2 欄 */
    /* ... */
}

/* 風險卡片 */
.risk-card {
     flex: 1; 
     min-width: 250px; 
     max-width: calc(33.333% - 14px); /* 3 欄 */
     /* ... */
}


/* 高亮關鍵字 */
.highlight-nutrient { /* ... */ }

/* 響應式表格 */
.responsive-table-wrapper { /* ... */ }

/* 響應式網格 (桌面版) */
@media (min-width: 768px) {
  .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
  .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
  .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
}

/* 卡片主題 (迷思破解) */
.card-theme-myth { /* ... */ }
.title-theme-myth { /* ... */ }

/* CSS 變數模式 (動態寬度) */
.absorption-bar-fill { width: var(--absorption-percent, 0%); /* ... */ }

/* TOC 子項目 */
a.sub-item { /* ... */ }

/* 錨點偏移 */
[id] { scroll-margin-top: 100px; } /* [修改] 應用於所有帶 ID 的元素 */
```