## API 文件

### 建構函數

```javascript
const homepage = new CaregiverHomepage(hostElement);
```

- `hostElement`: Shadow DOM 的宿主元素（必要）

### Getter 方法

```javascript
homepage.getTheme(); // 取得主題設定
homepage.getDebug(); // 取得除錯模式狀態
homepage.getSearchPlaceholder(); // 取得搜尋框 placeholder
homepage.getLanguage(); // 取得語言設定
homepage.getConfig(); // 取得完整設定物件
```

### Setter 方法（支援鏈式呼叫）

```javascript
homepage
    .setTheme('light|dark')           // 設定主題
    .setDebug(true|false)             // 設定除錯模式
    .setSearchPlaceholder('...')      // 設定搜尋框 placeholder
    .setLanguage('zh-TW')             // 設定語言
    .setConfig({...})                 // 批次設定
```

### 功能方法

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

### 動態開啟/關閉除錯模式

```javascript
// 開啟除錯模式
homepage.setDebug(true);

// 關閉除錯模式（正式環境建議）
homepage.setDebug(false);
```

### 重置和重新初始化

```javascript
// 重置所有設定
homepage.reset().setTheme("light").setDebug(false).initialize();
```

### 銷毀組件

```javascript
// 清理資源（頁面離開時建議呼叫）
homepage.destroy();
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

## 響應式支援

組件內建響應式設計，支援以下斷點：

- **桌面版** (> 768px): 完整網格佈局
- **平板版** (≤ 768px): 調整字體大小和間距
- **手機版** (≤ 480px): 單欄佈局

## 瀏覽器支援

支援 2022 年以來的現代瀏覽器：

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

必需功能：

- Shadow DOM v1
- ES6 Classes
- CSS Grid
- Flexbox
- Promise
- Fetch API

## 除錯功能

### 開啟除錯模式

```javascript
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setDebug(true) // 關鍵：啟用除錯模式
  .initialize();
```

### 除錯訊息類型

- **初始化訊息**: 組件載入狀態
- **設定訊息**: 參數設定和驗證
- **樣式訊息**: CSS 載入狀態
- **內容訊息**: DOM 建立狀態
- **事件訊息**: 事件監聽器狀態
- **互動訊息**: 使用者操作回饋

### 正式環境建議

```javascript
// 正式環境應關閉除錯模式
const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setDebug(false) // 關閉除錯訊息
  .initialize();
```

## 專案結構

```
caregiver/
├── index.html                     # 主頁面文件
├── category/
│   ├── archive.html               # 文章總覽頁面 (動態載入)
│   ├── health-topics.html         # 健康主題頁面 (動態載入)
│   └── nutrient-dashboard.html    # 互動式儀表板 (動態載入)
├── post/
│   ├── [nutrient].html            # 核心營養素文章
│   └── topic-[topic-name].html    # 主題式文章
├── assets/
│   └── js/
│       ├── articles-data.js         # 文章與營養素的中央資料庫
│       ├── archive-logic.js         # 文章總覽頁面的顯示邏輯
│       ├── health-topics-logic.js   # 健康主題頁面的顯示邏輯
│       ├── dashboard-logic.js       # 儀表板頁面的顯示邏輯
│       └── ...
├── doc/
│   ├── writing-guide.md           # 文章風格指引
│   └── new-page-checklist.md      # 新增頁面檢查清單
├── CLAUDE.md                     # 開發規範
└── README.md                     # 本文件
```

## 重要注意事項

### Shadow DOM 隔離要求

- **正確**：所有 CSS 都在 Shadow DOM 內
- **錯誤**：不可將 CSS 注入到主頁面 `<head>`

### Debug 參數要求

- **正確**：`setDebug(false)` 時不輸出任何除錯訊息
- **錯誤**：忽略 debug 設定，總是輸出訊息

### 鏈式呼叫要求

- **正確**：所有 setter 方法都回傳 `this`
- **錯誤**：setter 方法回傳其他值或 undefined

## 版本更新

所有更新都會保持向後相容性，不會產生 Breaking Changes。

## 技術支援

如有問題，請檢查：

1. **瀏覽器相容性**：確保使用支援的瀏覽器版本
2. **Shadow DOM 支援**：檢查 `'attachShadow' in Element.prototype`
3. **JavaScript 錯誤**：開啟開發者工具查看錯誤訊息
4. **除錯模式**：暫時啟用 `setDebug(true)` 查看詳細訊息




# 原生 JavaScript 前端函式庫開發規範指引

## 核心理念：零建置、直接可用

**本規範的核心原則是建立完全無需建置過程的 JavaScript 函式庫**

- ✅ **寫完即可用**：程式碼寫完直接就是可部署的最終版本
- ✅ **零工具相依**：不需要 Node.js、npm、webpack、babel 等任何工具
- ✅ **拷貝即部署**：直接將檔案複製到伺服器就能運作
- ✅ **原生相容**：使用純原生 JavaScript，支援 2022 年以來的瀏覽器
- ❌ **絕不使用**：任何需要編譯、轉譯、打包的語法或工具

## 程式碼風格

- 這是一個純原生 JavaScript 前端專案，所有程式碼都應該用原生 JavaScript 撰寫
- **絕對不使用任何第三方 JavaScript 函式庫或框架**，包括 jQuery、React、Vue 等
- **不使用 ES Modules (import/export)**，一律使用傳統的 JavaScript 載入方式
- **所有 JavaScript 檔案都必須可以直接載入使用，絕對不需要任何 build、compile、transpile 等預處理程序**
- **所有功能都必須用 JavaScript class 封裝**，確保程式碼組織清晰
- Claude 在產生程式碼時一律要相容於**2022年以來的瀏覽器版本**
- Claude 在處理 URL 參數時一律使用 `?foo=bar&baz=qux` 格式
- **Claude 在所有執行過程中都要有完整的 console 日誌輸出，包含但不限於：執行開始、處理步驟、錯誤訊息、警告、成功訊息、執行結束**
- **Claude 必須在每次提供程式碼時，都要附上使用範例和說明**，展示如何實際運用該程式碼
- **總是使用高度語義化和描述性的類別、方法和參數名稱，即使可能會比較冗長**
- **所有測試檔案都要依照 tests 目錄中的模式撰寫，檔案名稱統一為 `test-{module-name}-comprehensive-executor.js`**
- **Claude 在撰寫測試檔案和範例程式碼時，一律要依照 JavaScript 測試模組的模式和架構**
- **Claude 在產生測試和使用範例時，一律要使用具體的 module 名稱，而不是使用通用的佔位符**
- **所有必要和可選的參數及設定都必須使用 getter 和 setter 方法，並採用可串接的 chainable 模式**
- **所有 setter 方法都要回傳 this 以支援鏈式呼叫**
- **所有 getter 方法都要回傳對應的值**
- **關鍵需求：所有 CSS 和 JavaScript 都必須封裝在 Shadow DOM 中以實現完全隔離**
- **Shadow DOM 封裝：確保樣式和腳本不會與外部頁面產生衝突或洩漏**
- **嚴格禁止：避免將 CSS 注入到主頁面中**
- **debug 參數必須遵循 getter/setter + chainable 模式：`.setDebug(true).getDebug()`**
- **當 debug 為 false 時，不得在 console 輸出任何除錯訊息**
- **Claude 一律要撰寫 README.md 檔案來展示模組的「如何使用」範例**
- **Claude 要建立一個集中式的設定管理機制，用來設定所有必要和可選的設定參數，避免分散在各個類別中**

- **Claude 在撰寫所有腳本和服務時，一律要實作完整的 console 日誌輸出機制：**
  ## Shadow DOM 封裝要求

**所有 JavaScript 函式庫都必須使用 Shadow DOM 來封裝 CSS 和 JavaScript，確保完全隔離**

### 🔒 **Shadow DOM 封裝原則**

- **完全隔離**：所有樣式和腳本都必須封裝在 Shadow DOM 內
- **無外部影響**：Shadow DOM 內的樣式不會影響外部頁面
- **無外部干擾**：外部頁面的樣式不會影響 Shadow DOM 內容
- **嚴格禁止 CSS 注入**：絕對不允許將 CSS 注入到主頁面的 `<head>` 或任何外部元素
- **全域命名空間保護**：避免變數和函數名稱衝突

### ❌ **禁止的做法**

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

### ✅ **正確的做法**

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

### 📦 **Shadow DOM 實作模式**

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
                
                .component-header {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    color: #1f2937;
                }
                
                .component-content {
                    color: #4b5563;
                    line-height: 1.5;
                }
                
                .debug-info {
                    margin-top: 12px;
                    padding: 8px;
                    background: #f3f4f6;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 12px;
                    color: #6b7280;
                    display: none;
                }
                
                .debug-info.visible {
                    display: block;
                }
                
                /* 主題樣式 */
                :host([theme="dark"]) .component-container {
                    background: #1f2937;
                    border-color: #374151;
                    color: #f9fafb;
                }
                
                :host([theme="dark"]) .component-header {
                    color: #f9fafb;
                }
                
                :host([theme="dark"]) .component-content {
                    color: #d1d5db;
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        // 建立 Shadow DOM 內的內容
        createContent() {
            const container = document.createElement('div');
            container.className = 'component-container';

            const header = document.createElement('div');
            header.className = 'component-header';
            header.textContent = 'Shadow DOM 封裝組件';

            const content = document.createElement('div');
            content.className = 'component-content';
            content.textContent = '這個組件完全封裝在 Shadow DOM 中，與外部頁面完全隔離';

            const debugInfo = document.createElement('div');
            debugInfo.className = 'debug-info';
            debugInfo.textContent = 'Debug: Shadow DOM 隔離正常運作';

            container.appendChild(header);
            container.appendChild(content);
            container.appendChild(debugInfo);

            this.shadowRoot.appendChild(container);

            // 儲存引用以便後續操作
            this.elements = {
                container,
                header,
                content,
                debugInfo
            };
        }

        // Shadow DOM 內的事件處理
        attachEvents() {
            // 事件也完全封裝在 Shadow DOM 內
            this.elements.container.addEventListener('click', (e) => {
                if (this.getDebug()) {
                    console.log('🔍 Shadow DOM 組件被點擊');
                }
            });
        }

        // Getter/Setter 方法（維持 chainable 模式）
        getDebug() {
            return this._config.debug;
        }

        setDebug(debug) {
            this._config.debug = Boolean(debug);

            // 更新 Shadow DOM 內的 debug 顯示
            if (this.elements.debugInfo) {
                this.elements.debugInfo.classList.toggle('visible', this._config.debug);
            }

            return this; // 支援鏈式呼叫
        }

        getTheme() {
            return this._config.theme;
        }

        setTheme(theme) {
            this._config.theme = theme;

            // 更新 host 元素的 theme 屬性
            this.hostElement.setAttribute('theme', theme);

            return this;
        }

        // 批次設定
        setConfig(config) {
            Object.keys(config).forEach(key => {
                const setterName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
                if (typeof this[setterName] === 'function') {
                    this[setterName](config[key]);
                }
            });
            return this;
        }

        getConfig() {
            return Object.assign({}, this._config);
        }

        // 更新內容（僅影響 Shadow DOM 內部）
        setContent(content) {
            if (this.elements.content) {
                this.elements.content.textContent = content;
            }
            return this;
        }

        setHeader(header) {
            if (this.elements.header) {
                this.elements.header.textContent = header;
            }
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

### 🔧 **Shadow DOM 建立要求**

1. **使用 Closed Shadow DOM**：
   ```javascript
   this.shadowRoot = element.attachShadow({ mode: 'closed' });
   ```

2. **樣式封裝**：
    - 所有 CSS 都必須在 Shadow DOM 內定義
    - 使用 `:host` 選擇器定義容器樣式
    - 使用 `:host([attribute])` 實現主題切換

3. **事件隔離**：
    - 所有事件監聽器都在 Shadow DOM 內註冊
    - 避免事件冒泡到外部頁面

4. **變數隔離**：
    - 使用 IIFE 封裝所有 JavaScript 程式碼
    - 避免全域變數污染

### 📋 **Shadow DOM 檢查清單**

- [ ] 建立 Closed Shadow DOM
- [ ] 所有 CSS 都在 Shadow DOM 內定義
- [ ] **絕對不將 CSS 注入到主頁面的 `<head>` 或任何外部元素**
- [ ] 使用 `:host` 選擇器
- [ ] 事件處理器在 Shadow DOM 內註冊
- [ ] 支援主題切換（:host([theme="xxx"])）
- [ ] 維持 getter/setter + chainable API
- [ ] 包含 debug 參數控制
- [ ] 提供 destroy 方法清理資源
- [ ] **驗證無任何 CSS 洩漏到主頁面**

### 🎯 **Shadow DOM 使用範例**

```javascript
// 建立多個完全隔離的組件實例
const component1 = new DeusComponentWithShadowDOM(document.getElementById('container1'))
    .setTheme('light')
    .setDebug(false);

const component2 = new DeusComponentWithShadowDOM(document.getElementById('container2'))
    .setTheme('dark')
    .setDebug(true);

// 兩個組件完全獨立，樣式和行為不會互相影響
```

### 📊 **Console 日誌輸出機制**

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

        const timestamp = new Date().toLocaleTimeString();
        const logMessage = timestamp + ' - ' + level.toUpperCase() + ': ' + message;
        console[level](logMessage);
    }

    info(message) {
        this.log('info', '📋 ' + message);
    }

    warn(message) {
        this.log('warn', '⚠️ ' + message);
    }

    error(message) {
        this.log('error', '❌ ' + message);
    }

    success(message) {
        this.log('info', '✅ ' + message);
    }

    debug(message) {
        if (this.debugMode) {
            this.log('debug', '🔍 ' + message);
        }
    }
}
```

- **所有重要的執行步驟都要有對應的日誌輸出，包含：**
    - 📋 設定載入和驗證
    - 🔗 外部服務連線狀態
    - 📊 資料處理進度
    - ⏱️ 效能統計資訊
    - 🔍 除錯資訊（debug 模式）
    - ⚠️ 警告訊息
    - ❌ 錯誤處理
    - ✅ 成功訊息
    - 📈 執行結果統計

## JavaScript 程式碼結構最佳實務

- **使用現代 ES6+ 語法**，確保在現代瀏覽器中正常運作
- **所有檔案都要使用 `.js` 副檔名**
- **所有 JavaScript 檔案都是最終產品，開發即完成，無需任何後製處理**
- **使用 JavaScript class 語法**組織程式碼，利用現代瀏覽器的原生支援
- **使用 IIFE (Immediately Invoked Function Expression)** 避免全域命名空間污染
- **可以使用現代 JavaScript 功能**：Promise、fetch、async/await、arrow functions 等
- **使用原生 DOM API** 進行 DOM 操作
- **每個 .js 檔案都可以直接用 `<script src="檔案路徑"></script>` 載入使用**
- **簡單的檔案組織**：開發者可以根據需求自由組織獨立 JS 函式庫的檔案結構

## JavaScript Class 封裝模式

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
                retries: 3,
                debug: false,  // 關鍵需求：debug 參數
                headers: {},
                credentials: null
            };

            this.logger = global.DeusLogger ? new global.DeusLogger(this._config.debug) : console;
            this.initialize();
        }

        initialize() {
            this.logger.info('🚀 服務初始化開始');
        }

        // =================
        // Getter 方法
        // =================

        getApiUrl() {
            return this._config.apiUrl;
        }

        getTimeout() {
            return this._config.timeout;
        }

        getRetries() {
            return this._config.retries;
        }

        getDebug() {
            return this._config.debug;
        }

        getHeaders() {
            return Object.assign({}, this._config.headers); // 回傳副本避免外部修改
        }

        getCredentials() {
            return this._config.credentials;
        }

        getConfig() {
            return Object.assign({}, this._config); // 回傳完整設定的副本
        }

        // =================
        // Setter 方法 - 全部支援鏈式呼叫
        // =================

        setApiUrl(url) {
            if (typeof url !== 'string' || !url.trim()) {
                throw new Error('API URL 必須是非空字串');
            }
            this._config.apiUrl = url.trim();
            return this; // 支援鏈式呼叫
        }

        setTimeout(timeout) {
            if (typeof timeout !== 'number' || timeout <= 0) {
                throw new Error('Timeout 必須是正整數');
            }
            this._config.timeout = timeout;
            return this;
        }

        setRetries(retries) {
            if (typeof retries !== 'number' || retries < 0) {
                throw new Error('Retries 必須是非負整數');
            }
            this._config.retries = retries;
            return this;
        }

        setDebug(debug) {
            this._config.debug = Boolean(debug);
            // 更新 logger 的 debug 模式
            if (this.logger && typeof this.logger.setDebugMode === 'function') {
                this.logger.setDebugMode(this._config.debug);
            }
            return this;
        }

        setHeaders(headers) {
            if (typeof headers !== 'object' || headers === null) {
                throw new Error('Headers 必須是物件');
            }
            this._config.headers = Object.assign({}, headers);
            return this;
        }

        addHeader(key, value) {
            if (typeof key !== 'string' || !key.trim()) {
                throw new Error('Header key 必須是非空字串');
            }
            this._config.headers[key] = value;
            return this;
        }

        setCredentials(credentials) {
            this._config.credentials = credentials;
            return this;
        }

        // 批次設定方法
        setConfig(configObject) {
            if (typeof configObject !== 'object' || configObject === null) {
                throw new Error('Config 必須是物件');
            }

            // 逐一設定，確保驗證邏輯生效
            Object.keys(configObject).forEach(function (key) {
                const setterName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
                if (typeof this[setterName] === 'function') {
                    this[setterName](configObject[key]);
                }
            }.bind(this));

            return this;
        }

        // =================
        // 功能方法 - 也支援鏈式呼叫
        // =================

        validate() {
            this.logger.info('📋 開始驗證設定');

            if (!this.getApiUrl()) {
                throw new Error('API URL 是必要參數');
            }

            if (this.getTimeout() <= 0) {
                throw new Error('Timeout 必須大於 0');
            }

            this.logger.success('✅ 設定驗證通過');
            return this;
        }

        execute() {
            this.logger.info('📊 開始執行服務');

            try {
                // 執行邏輯
                const config = this.getConfig();
                this.logger.debug('🔍 使用設定: ' + JSON.stringify(config));

                // 模擬執行過程
                this.logger.info('⏳ 正在處理請求...');

                this.logger.success('✅ 服務執行成功');
                return this;
            } catch (error) {
                this.logger.error('❌ 服務執行失敗: ' + error.message);
                throw error;
            }
        }

        reset() {
            this._config = {
                apiUrl: null,
                timeout: 5000,
                retries: 3,
                debug: false,
                headers: {},
                credentials: null
            };
            this.logger.info('🔄 設定已重置');
            return this;
        }
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
    .setTimeout(3000)
    .setRetries(5)
    .setDebug(true)                 // 啟用除錯模式
    .addHeader('Authorization', 'Bearer token123')
    .addHeader('Content-Type', 'application/json')
    .validate()
    .execute();

// 正式環境使用 - 關閉除錯模式
const service2 = new DeusBaseService()
    .setConfig({
        apiUrl: 'https://api.example.com',
        timeout: 8000,
        retries: 2,
        debug: false                // 關閉除錯模式，不輸出 debug 訊息
    })
    .addHeader('User-Agent', 'MyApp/1.0')
    .validate()
    .execute();

// 動態調整設定 - 包含 debug 切換
service
    .setTimeout(10000)              // 調整 timeout
    .setRetries(1)                  // 調整重試次數
    .setDebug(false)                // 關閉除錯模式
    .execute();                     // 重新執行

// 開發階段除錯
service
    .setDebug(true)                 // 開啟除錯模式
    .debug('這是除錯訊息')           // 只在 debug=true 時顯示
    .execute();

// 取得設定值 - 包含 debug 狀態
console.log('當前 API URL:', service.getApiUrl());
console.log('當前 debug 模式:', service.getDebug());  // 關鍵方法
console.log('當前完整設定:', service.getConfig());

// 重置並重新設定
service
    .reset()                        // 重置所有設定（debug 回到預設 false）
    .setApiUrl('https://new-api.example.com')
    .setDebug(true)                 // 重新啟用除錯
    .setTimeout(5000)
    .validate()
    .execute();
*/
```

## Getter/Setter 設計原則

### ✅ **必須遵循的規則**

1. **所有參數都要有對應的 getter 和 setter**
2. **Setter 方法必須回傳 `this`** 以支援鏈式呼叫
3. **Getter 方法必須回傳值的副本**（避免外部修改內部狀態）
4. **參數驗證在 setter 中進行**
5. **提供批次設定方法** `.setConfig(object)`
6. **提供重置方法** `.reset()`

### 📝 **命名規範**

```javascript
// Getter: get + 參數名稱（首字母大寫）
getApiUrl(), getTimeout(), getDebug()

// Setter: set + 參數名稱（首字母大寫）  
setApiUrl(url), setTimeout(timeout), setDebug(debug)
```

### 🔗 **鏈式呼叫範例**

```javascript
const result = new ClassName()
    .setApiUrl('https://api.com')
    .setTimeout(5000)
    .setDebug(true)
    .validate()
    .execute();
```

## 瀏覽器相容性檢查

```javascript
// 瀏覽器相容性檢查工具
(function (global) {
    'use strict';

    class DeusCompatibilityChecker {
        static check() {
            const checks = [
                this.checkES6Support(),
                this.checkLocalStorageSupport(),
                this.checkJSONSupport(),
                this.checkFetchSupport(),
                this.checkPromiseSupport()
            ];

            return checks.every(function (check) {
                return check;
            });
        }

        static checkES6Support() {
            return !!(Array.prototype.includes &&
                Object.assign &&
                Promise);
        }

        static checkLocalStorageSupport() {
            try {
                return 'localStorage' in global && global.localStorage !== null;
            } catch (e) {
                return false;
            }
        }

        static checkJSONSupport() {
            return !!(global.JSON && global.JSON.parse && global.JSON.stringify);
        }

        static checkFetchSupport() {
            return !!(global.fetch);
        }

        static checkPromiseSupport() {
            return !!(global.Promise);
        }
    }

    global.DeusCompatibilityChecker = DeusCompatibilityChecker;

})(window);
```

## 錯誤處理和除錯

```javascript
// 全域錯誤處理
(function (global) {
    'use strict';

    class DeusErrorHandler {
        constructor() {
            this.setupGlobalErrorHandling();
        }

        setupGlobalErrorHandling() {
            // 捕獲 JavaScript 錯誤
            global.addEventListener('error', function (event) {
                console.error('❌ JavaScript Error:', {
                    message: event.message,
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                    error: event.error
                });
            });

            // 捕獲 Promise 拒絕
            global.addEventListener('unhandledrejection', function (event) {
                console.error('❌ Unhandled Promise Rejection:', event.reason);
            });
        }

        static handleError(error, context) {
            const errorInfo = {
                message: error.message || 'Unknown error',
                stack: error.stack || 'No stack trace',
                context: context || 'Unknown context',
                timestamp: new Date().toISOString()
            };

            console.error('❌ Error Handler:', errorInfo);

            // 可以在這裡加入錯誤回報邏輯
            return errorInfo;
        }
    }

    global.DeusErrorHandler = DeusErrorHandler;

    // 自動初始化錯誤處理
    new DeusErrorHandler();

})(window);
```

## 效能最佳化

- **使用 debounce 和 throttle** 控制頻繁事件
- **懶載入非必要功能**
- **使用 DocumentFragment** 進行批次 DOM 操作
- **避免強制重排重繪**
- **使用 Web Workers** 處理耗時操作（可選）

```javascript
// 效能工具類別
(function (global) {
    'use strict';

    class DeusPerformanceUtils {
        // Debounce 函數
        static debounce(func, wait) {
            let timeout;
            return function executedFunction() {
                const later = function () {
                    clearTimeout(timeout);
                    func.apply(this, arguments);
                }.bind(this);
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Throttle 函數
        static throttle(func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(function () {
                        inThrottle = false;
                    }, limit);
                }
            };
        }

        // 效能監控
        static measurePerformance(name, func) {
            const startTime = performance.now();
            const result = func();
            const endTime = performance.now();
            console.log('⏱️ ' + name + ' 執行時間: ' + (endTime - startTime) + ' 毫秒');
            return result;
        }
    }

    global.DeusPerformanceUtils = DeusPerformanceUtils;

})(window);
```

## 重要開發原則

- **確保你用適當的 JavaScript 類別和 IIFE 封裝來隔離程式碼**，避免與全域範圍衝突
- **特別重要：每一次的程式修改都要 100% 避免 breaking changes**，絕對不能破壞現有功能
- **確保你寫的任何程式碼都是正式環境可用的**，並且可以直接在瀏覽器中運作
- **所有功能都要有適當的錯誤處理**
- **確保在沒有 console 物件的環境中也能正常運作**
- **使用漸進式增強的方式開發功能**
- **絕對禁止使用任何需要建置、編譯、轉譯的語法或工具**
- **每個 JavaScript 檔案都必須是可以直接執行的最終版本**
- **強制要求：所有類別的參數和設定都必須使用 getter/setter 模式**
- **強制要求：所有 setter 方法都必須回傳 this 以支援鏈式呼叫**
- **強制要求：所有 getter 方法都必須回傳值的安全副本**
- **強制要求：提供批次設定方法和重置功能**
- **關鍵需求：所有函式庫都必須包含 debug 參數控制除錯訊息顯示**
- **關鍵需求：debug=false 時絕對不能在 console 輸出除錯訊息**

## Getter/Setter 實作檢查清單

在實作任何類別時，請確認以下項目：

### ✅ **必要檢查項目**

- [ ] 每個設定參數都有對應的 getter 和 setter 方法
- [ ] 所有 setter 方法都回傳 `this`
- [ ] 所有 getter 方法都回傳值的副本（避免外部修改）
- [ ] setter 方法包含適當的參數驗證
- [ ] 提供 `setConfig(object)` 批次設定方法
- [ ] 提供 `getConfig()` 取得完整設定方法
- [ ] 提供 `reset()` 重置設定方法
- [ ] **必須包含 `setDebug(boolean)` 和 `getDebug()` 方法**
- [ ] **debug 參數必須控制 console 除錯訊息的顯示/隱藏**
- [ ] **必須使用 Shadow DOM 封裝所有 CSS 和 JavaScript**
- [ ] **建立 Closed Shadow DOM（mode: 'closed'）**
- [ ] **所有樣式都在 Shadow DOM 內定義**
- [ ] **絕對不將 CSS 注入到主頁面**
- [ ] **事件處理器在 Shadow DOM 內註冊**
- [ ] **提供 destroy() 方法清理 Shadow DOM 資源**

### 📋 **驗證範例**

```javascript
// 驗證基本功能
const hostElement = document.createElement('div');
document.body.appendChild(hostElement);

// 記錄主頁面 CSS 數量（驗證無 CSS 注入）
const initialStyleCount = document.head.querySelectorAll('style').length;
const initialStyleSheetCount = document.styleSheets.length;

const instance = new YourClass(hostElement)
    .setApiUrl('https://api.com')
    .setDebug(true)
    .setTheme('dark')
    .validate();

// 驗證 Shadow DOM 隔離
console.log('Shadow Root 存在:', !!instance.shadowRoot);
console.log('Debug 模式:', instance.getDebug());

// 🔍 關鍵驗證：確認沒有 CSS 注入到主頁面
const finalStyleCount = document.head.querySelectorAll('style').length;
const finalStyleSheetCount = document.styleSheets.length;

if (finalStyleCount === initialStyleCount && finalStyleSheetCount === initialStyleSheetCount) {
    console.log('✅ 驗證通過：沒有 CSS 注入到主頁面');
} else {
    console.error('❌ 驗證失敗：檢測到 CSS 被注入到主頁面');
}

// 驗證樣式隔離 - 外部樣式不會影響組件
document.head.insertAdjacentHTML('beforeend', '<style>div { background: red !important; }</style>');
// Shadow DOM 內的樣式應該不受影響

// 清理資源
instance.destroy();
```

## Plan & Review

### Before starting work

- **Always enter plan mode to make a comprehensive plan**
- **After creating the plan, write it to `{{current_dir}}/tasks/TASK_NAME.md`**
- **The plan should include:**
    - Detailed implementation strategy with reasoning
    - Tasks broken down into manageable steps
    - **JavaScript Class design with getter/setter + chainable API structure**
    - **Shadow DOM encapsulation strategy for complete CSS/JS isolation**
    - **Debug parameter implementation strategy**
    - **Breaking Changes impact assessment**
    - **Zero-build compatibility check**
- **If the task requires external knowledge, research using Task tool**
- **Always think MVP** - focus on essential functionality first
- **Once the plan is written, ask for user review and approval before proceeding**

### While implementing

- **Continuously update the plan as work progresses**
- **Before making any code changes, verify no Breaking Changes will occur**
- **After completing each task, update with:**
    - Detailed descriptions of changes made
    - **Confirmation that getter/setter + chainable pattern is maintained**
    - **Verification that Shadow DOM encapsulation is properly implemented**
    - **Confirmation that CSS and JS are fully isolated within Shadow DOM**
    - **Verification that no CSS was injected into the main page**
    - **Verification that debug parameter works correctly**
    - **Zero-build principle compliance check**
- **Document changes thoroughly for easy handover to other engineers**

## 文件撰寫規範

- **使用 JSDoc 格式註解**記錄函數功能、參數和回傳值
- **每個類別都要有詳細的使用說明**
- **提供完整的範例程式碼**
- **特別說明 getter/setter 方法的用途和鏈式呼叫模式**

```javascript
/**
 * Shadow DOM 封裝組件
 * @class DeusMainClass
 * @description 展示 Shadow DOM + getter/setter + chainable API 設計模式
 * @compatibility 支援 2022 年以來的瀏覽器版本
 *
 * @example
 * // 基本使用方式 - Shadow DOM 完全隔離
 * const hostElement = document.createElement('div');
 * document.body.appendChild(hostElement);
 *
 * const instance = new DeusMainClass(hostElement)
 *     .setTheme('dark')
 *     .setDebug(true)             // 關鍵需求：啟用除錯模式
 *     .setContent('隔離的內容')
 *     .validate();
 *
 * // 取得設定值（包含 debug 狀態）
 * console.log('Theme:', instance.getTheme());
 * console.log('Debug 模式:', instance.getDebug()); // 關鍵方法
 *
 * // Shadow DOM 完全隔離，外部樣式不會影響組件
 * document.head.insertAdjacentHTML('beforeend',
 *     '<style>div { background: red !important; }</style>');
 * // 組件內部樣式不受影響
 */
class DeusMainClass {
    /**
     * 建構函數 - 建立 Shadow DOM
     * @constructor
     * @param {HTMLElement} hostElement - Shadow DOM 的宿主元素
     * @description 建立 Closed Shadow DOM 並初始化組件
     */
    constructor(hostElement) {
        // Shadow DOM 初始化...
    }

    /**
     * 設定主題（Shadow DOM 樣式隔離）
     * @method setTheme
     * @param {string} theme - 主題名稱 ('light', 'dark')
     * @returns {DeusMainClass} 回傳自身實例以支援鏈式呼叫
     * @example
     * instance.setTheme('dark').setDebug(true);
     */
    setTheme(theme) {
        // 方法實作...
    }

    /**
     * 設定除錯模式（關鍵需求）
     * @method setDebug
     * @param {boolean} debug - 是否啟用除錯模式
     * @returns {DeusMainClass} 回傳自身實例以支援鏈式呼叫
     * @description 控制 Shadow DOM 內的除錯資訊顯示
     */
    setDebug(debug) {
        // 方法實作...
    }

    /**
     * 銷毀 Shadow DOM 組件
     * @method destroy
     * @description 清理 Shadow DOM 內的所有內容和事件監聽器
     * @example
     * instance.destroy(); // 完全清理組件
     */
    destroy() {
        // 方法實作...
    }
}
```



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
        *   **位置**：必須放置在 `<main>` 區塊的 `<header>` 標籤後，且位於 `<div class="article-hero">` 之後、`<article class="article-body">` 之前。
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


# Caregiver 營養百科 - 文章風格指引

這份文件旨在為所有「營養百科」的文章建立一套統一、高標準的風格與結構。遵循此指引將有助於我們產出高品質、風格一致且對讀者極具吸引力的內容。

> **技術檢查清單請參考** [`doc/new-page-checklist.md`](new-page-checklist.md) - 專注於 HTML 結構、SEO 設定、組件整合等技術層面

---

## 目錄

*   [第一章：核心原則](#第一章核心原則)
    *   [總體風格與核心理念](#總體風格與核心理念)
    *   [使用說明](#使用說明)
*   [第二章：內容策略與結構](#第二章內容策略與結構)
    *   [問題解決導向敘事 (PSMA)](#問題解決導向敘事psma-流程)
    *   [標準文章結構](#標準文章結構)
    *   [內容與語氣](#內容與語氣)
    *   [近期文章優化項目](#近期文章優化項目列表)
*   [第三章：技術與格式化規範](#第三章技術與格式化規範)
    *   [檔案命名規範](#檔案命名規範)
    *   [格式化與常用 CSS Class](#格式化與常用-css-class)
    *   [整合 SVG 視覺化圖表](#整合-svg-視覺化圖表)
    *   [SEO 與 Metadata](#seo-與-metadata)
*   [第四章：品質與發布流程](#第四章品質與發布流程)
    *   [內容品質檢查要點](#內容品質檢查要點)
    *   [發布前檢查](#發布前檢查)
*   [第五章：資源與範例](#第五章資源與範例)
    *   [完整範例：鈣質文章](#完整範例鈣質文章撰寫示範)
    *   [快速模板與工具](#快速模板與工具)

---

# 第一章：核心原則

## 總體風格與核心理念

文章的整體風格應為**「專業、親切且易於行動」**。我們透過專業的口吻建立權威，同時用生活化的比喻和清晰的視覺設計拉近與讀者的距離，並在文末提供明確的指引。

## 使用說明

每個章節下方有三個 prompt（Nutritionist / Analyst / Front-end）。選用時把 `<<INPUT>>` 替換成你要寫的營養素名稱或文章草稿（例如：鈣、維生素D、益生菌）。每個 prompt 都會指定輸出格式（標題、摘要、表格、JSON-LD、SVG 區塊等），方便直接貼給撰稿 AI、分析師或前端工程師執行與產出。

---

# 第二章：內容策略與結構

## 問題解決導向敘事（PSMA 流程）

為提升閱讀完成率與轉化率，建議在不犧牲「8個標準章節」完整性的前提下，優先採用「PSMA：Pain → Solution → Mechanism → Action」的敘事順序，將資訊陳列調整為「問題解決導向」。

> **AI 協作核心指令**：此處的「Pain」、「Solution」等詞彙為**內部概念標籤**，旨在指導內容方向。在生成文章時，**絕不能將這些標籤文字（如 "Pain"）直接輸出到文章中**。請直接根據概念，產出面向讀者的、自然的章節標題與內容。

- **Pain（痛點）**：用讀者語言點名困擾與族群，建立共鳴。
- **Solution（解方）**：給出此營養素/干預作為核心解方與關鍵益處。
- **Mechanism（原理）**：挑重點講科學（用 1-2 個關鍵機制詞彙），讓說服更有力。
- **Action（行動）**：提供清晰計畫（食物餐盤與補充品挑選）、用具體步驟和工具讓讀者照做。

### 章節骨架（對應 HTML id）
```html
<section id="problem">
  <h2>您有這些困擾嗎？[痛點集合]</h2>
  <!-- 使用 .risk-group-cards 命中族群與症狀 -->
</section>

<section id="solution">
  <h2>[營養素]：問題的終極解答</h2>
  <!-- 使用 .info-cards 呈現 3-6 個核心效益 -->
</section>

<section id="mechanism">
  <h2>[營養素]如何運作？關鍵機制</h2>
  <!-- 聚焦 1-2 個最關鍵機制詞（例：黏度、發酵性）與差異點 -->
</section>

<section id="how-much">
  <h2>我該攝取多少？[權威建議]</h2>
  <!-- 使用 .data-table 呈現 RDA/UL 或權威建議 -->
</section>

<section id="action-plan-food">
  <h2>實踐指引(一)：打造您的高[營養素]餐盤</h2>
  <!-- 互動餐盤/可視化，提供逐步增量與替換策略 -->
</section>

<section id="action-plan-supplements">
  <h2>實踐指引(二)：精準挑選[營養素]補充品</h2>
  <!-- 使用 .comparison-table 梳理類型、機制、族群適配與選購要點 -->
</section>

<section id="safety">
  <h2>安全注意事項</h2>
  <!-- .alert-doctor：藥物交互作用、過量風險、特殊族群 -->
</section>

<section id="faq" class="faq-section">
  <h2>常見問題</h2>
  <!-- 3-5 題，聚焦行動落地與使用細節 -->
</section>
```

### 與「8個標準章節」的對應與整合
- Pain → 對應「誰最需要補充？缺乏警訊與高風險族群」。
- Solution → 對應「核心功效」。
- Mechanism → 對應「基本資訊：定義/分類/機制與型態差異」。
- Action → 對應「每日建議攝取量與最佳時間」「食物來源」「如何挑選補充品」。
- 安全注意事項、FAQ、結尾模組維持不變。

> 建議：側邊 TOC 依上述 id 排序；Hero 區副標題以痛點+效益一句話總結，帶出 PSMA 的「先痛點、再解方」。

### 撰寫提示（可直接複製當作小檢核）
```
□ 開頭 3 句內命中痛點（族群+情境+症狀/目標）
□ Solution 區使用 3-6 張 .info-card，語句以動詞起手、可量化
□ Mechanism 僅選 1-2 個關鍵機制詞，並用對比凸顯差異（如：高黏度/低發酵）
□ Action-Food 提供「逐步增量」與「聰明替換」路徑
□ Action-Supplements 以「機制×族群」配對給出首選與備選
□ 安全注意加入藥物交互與飲水/用量等落地提醒
□ FAQ 聚焦落地問題（脹氣怎麼辦？與藥間隔多久？何時吃？）
```

## 標準文章結構

每篇文章都應遵循以下標準結構，以確保內容的連貫性與完整性。
 
### 1. **引人入勝的開頭**
   - **標題撰寫的終極策略：V.I.P. + B.R.A.V.E. 混合框架**
     - **核心結構：** 所有文章標題**必須**嚴格遵循「**營養素 - 介紹說明**」的格式。
       - **營養素部分：** 簡潔明瞭地標示出文章主題，例如「鈣」、「維生素D」、「魚油」。
       - **介紹說明部分：** 這是發揮創意的空間，目標是融合 V.I.P. 與 B.R.A.V.E. 框架，創造最大的點擊誘因。
     - **格式範例 (正確示範)：**
       - `鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質`
       - `維生素K - 補鈣、補D為何一定要有它？K2才是預防骨鬆與血管鈣化的關鍵`
     - **核心要求：** 我們的標題不怕長，但**必須**精準且全面。**首要原則是「文要對題」**，絕不可為了套用公式而犧牲內容的準確性。
     - **V.I.P. 框架 (內容核心)**
       - **V (Value-Driven - 價值驅動):** 明確點出對讀者的核心**益處**。
       - **I (Intriguing - 引發好奇):** 使用**比喻、提問或知識缺口**來吸引讀者。
       - **P (Problem-Solving - 解決問題):** 直接命中讀者的**痛點**或生活情境。
     - **B.R.A.V.E. 框架 (點擊觸發器)**
       - **B (Brand - 品牌):** 在標題結尾加入「**| 營養百科**」，建立權威感。
       - **R (Recentness - 時效性):** <span style="color: #c0392b;">**(不建議使用)**</span> 避免加入年份，以維持文章的長期價值。
       - **A (Amount - 數量):** 使用**具體數字**，如「7大功效」、「5個技巧」，暗示內容的豐富性。
       - **V (Velocity - 速度):** 強調**效率**，如「5分鐘搞懂」、「快速上手」。
       - **E (Economy - 經濟性):** <span style="color: #c0392b;">**(不建議使用)**</span> 避免使用「免費」等詞彙，維持專業形象。

   - **綜合應用範例 (V+I+P+B+A+V)**
     - **目標：** 撰寫一篇關於「益生菌」的文章。
     - **元素拆解：**
       - **V (價值):** 重建腸道平衡、改善消化。
       - **I (好奇):** 菌株編號的秘密是什麼？
       - **P (問題):** 解決便秘、腹瀉困擾。
       - **B (品牌):** | 營養百科
       - **A (數量):** 7大關鍵
       - **V (速度):** 5分鐘搞懂
     - **最終標題組合：**
       - `益生菌 - 終結便秘腹瀉的7大關鍵：5分鐘搞懂菌株編號秘密的完整指引 | 營養百科`
     - **延伸應用 (SEO 頁面描述):** 撰寫標題時，必須同時思考如何產出優秀的 SEO 頁面描述 (`<meta name="description">`)。頁面描述的撰寫同樣遵循 **V.I.P. + B.R.A.V.E. 混合框架**，目標是將標題的吸引力延伸至搜尋結果頁面，提升點擊率。詳細規則請參考本文檔的「SEO 與 Metadata」章節。
   - **麵包屑導覽列 (`<nav class="breadcrumb">`) 規則**
     - 為了網站導覽的一致性，麵包屑的最後一節文字**必須**與頁面的 `<h1>` 主標題完全相同。
     - **範例：**
       ```html
       <nav class="breadcrumb">
         <a href="../index.html">首頁</a>
         <span class="separator">/</span>
         <span>鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質</span>
       </nav>
       <h1 class="article-title">鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質</h1>
       ```
   - **摘要區塊**：在主要內容開始前，提供一個「**30 秒速讀版**」或「**需求自我檢測**」區塊，快速抓住讀者興趣。

### 2. **清晰的章節劃分 (模組化結構)**
   - 內文應使用 `<h2>` 和 `<h3>` 標籤劃分章節。以下為**建議的核心章節順序**，這套結構是確保內容完整性的基礎。
   - **寫作彈性**：在包含這 8 個核心章節的前提下，作者可以根據特定營養素的深度與廣度，**自由增加額外的延伸章節**。例如：
       - **迷思破解章節**：針對市場常見的錯誤資訊進行澄清 (例如：「破解迷思：多醣體 ≠ 有效的 β-葡聚醣」)，能顯著提升文章的專業性和信任感。
       - **A vs. B 比較章節**：為滿足使用者的比較型搜尋意圖 (例如：「β-葡聚醣 vs. 益生菌」)，直接在文章中進行分析，有助於留住讀者，提升內容完整度。
       - **其他專業章節**：若某營養素有複雜的法規議題或豐富的歷史背景，也可額外增加「法規環境」或「歷史沿革」等章節。

   - **章節開場白原則**：
     - **豐富引言內容**: 確保每一個 `<h2>` 和 `<h3>` 標籤後，都有一段內容豐富的 `<p>` 引言。
     - **強化引導性**: 引言段落應扮演承上啟下的角色，為讀者提供必要的背景知識、情境鋪陳，或點出該章節要解決的核心問題，讓讀者更容易進入章節的核心內容。
     - **避免生硬陳列**: 透過更具吸引力的比喻或提問來開頭，讓資訊的流動更順暢，提升文章的整體閱讀體驗與專業感。
     - **豐富引言內容**: 確保每一個 `<h2>` 和 `<h3>` 標籤後，都有一段內容豐富的 `<p>` 引言。
     - **強化引導性**: 引言段落應扮演承上啟下的角色，為讀者提供必要的背景知識、情境鋪陳，或點出該章節要解決的核心問題，讓讀者更容易進入章節的核心內容。
     - **避免生硬陳列**: 透過更具吸引力的比喻或提問來開頭，讓資訊的流動更順暢，提升文章的整體閱讀體驗與專業感。

   - **`<h2>` 1. 基本資訊：[營養素]是什麼？**
     - **目的**：建立基礎認知。
     - **內容**：
       - `<h3>` 定義與分類：簡潔說明其本質。
       - `<h3>` 關鍵類型比較：比較不同型態的差異（例如：維生素D的D2 vs. D3、魚油的TG vs. rTG、葉黃素的游離型 vs. 酯化型）。這是展現專業深度的關鍵。

   - **`<h2>` 2. 核心功效：[營養素]對人體有哪些好處？**
     - **目的**：闡述價值，回應讀者「我為什麼需要它」的疑問。
     - **內容**：使用 `.info-cards` 樣式，列出 3-4 個最核心的功效，並在下方段落詳細解釋其作用機制。

   - **`<h2>` 3. 每日建議攝取量與最佳時間**
     - **目的**：提供具體的行動指引。
     - **內容**：
       - `<h3>` 官方建議攝取量：使用 `.data-table` 呈現不同年齡、族群的建議量(RDA)與上限攝取量(UL)。
       - `<h3>` 最佳攝取時間與方式：說明飯前/飯後、搭配何種食物能提高吸收率。

   - **`<h2>` 4. 食物來源：哪些天然食物富含[營養素]？**
     - **目的**：強調「從飲食優先」的健康觀念。
     - **內容**：使用 `.data-table` 製作食物含量排行榜，並搭配 `<div class="alert alert-tip">` 提供營養師的烹調或吸收小撇步。

   - **`<h2>` 5. 誰最需要補充？[營養素]缺乏的警訊與高風險族群**
     - **目的**：精準命中目標讀者的痛點，讓他們產生「這就是在說我」的共鳴。
     - **內容**：使用 `.risk-group-cards` 樣式，列出 4-5 個典型族群（如：上班族、孕婦、素食者、年長者）及其缺乏警訊。

   - **`<h2>` 6. 如何挑選[營養素]補充品？**
     - **目的**：提供商業決策價值的內容，是文章的重點之一。
     - **內容**：使用 `.data-table` 比較市售產品的類型、優缺點、吸收率，並條列出「選購要點」（如：看劑量、看型態、看複方、看認證）。

   - **`<h2>` 7. 副作用與注意事項**
     - **目的**：建立權威與信任感，展現內容的完整與負責。
     - **內容**：說明可能的副作用、過量風險，以及與特定藥物的交互作用。務必加入 `<div class="alert alert-doctor">` 的醫師警告。

   - **`<h2>` 8. 常見問題 (FAQ)**
     - **目的**：解答讀者的次要疑問，並增加長尾關鍵字的覆蓋率。
     - **內容**：以 Q&A 形式，回答 3-5 個常見問題（例如：可以跟B群一起吃嗎？晚上吃會失眠嗎？）。

   - **`<h2>` 9. 相關營養素 (自動化)**
     - **注意**: 此區塊現已由 `related-articles-component.js` 組件自動生成，**作者無需再手動編寫靜態 HTML**。
     - **TOC 要求**: 目錄 (TOC) 中的對應連結，現在**必須**指向新的容器 ID: `<li><a href="#related-articles-container" class="toc-link">相關營養素</a></li>`。
     - **關聯性邏輯**: 推薦的關聯性，取決於您在 `articles-data.js` 中為每篇文章設定的 `goals` 陣列，請務必用心填寫。

### TOC 目錄結構建議

為了提升長篇文章的易讀性，目錄 (TOC) 現已支援兩層式結構。建議在編寫目錄時，將核心章節作為主項目，並將次要或延伸的章節設定為子項目。

**實作方式：**
- **階層式結構**: 在目錄的 `<ul>` 列表中，為屬於子項目的 `<a>` 標籤加上 `sub-item` class 即可。
- **納入 `<h3>` 標籤**: 為了讓目錄更詳盡，應將文章中的 `<h3>` 標籤也納入目錄結構中，並應用為第二階層的 `.sub-item` 樣式。

**錨點連結修正：**
- **CSS 修正**: 樣式表中必須包含 `section[id] { scroll-margin-top: 100px; }` 規則，以防止標題被固定式 Header 遮擋。
- **連結目標修正**: 「相關營養素」的目錄連結必須指向 `#related-articles-container`。

**範例 (`00template.html`):**
```html
<ul class="toc-list">
  <!-- 主項目 -->
  <li><a href="#problem" class="toc-link">您有這些困擾嗎？（Pain）</a></li>
  <li><a href="#solution" class="toc-link">解方與核心效益（Solution）</a></li>
  
  <!-- 子項目 -->
  <li><a href="#myth-busting" class="toc-link sub-item">迷思破解</a></li>
  <li><a href="#comparison" class="toc-link sub-item">A vs. B 比較</a></li>

  <li><a href="#safety" class="toc-link">安全注意事項</a></li>
  <li><a href="#faq" class="toc-link">常見問題</a></li>
</ul>
```

**樣式說明：**
- **主項目**：會有較重的字體和淺色底色，作為視覺提示。
- **子項目**：會向內縮排，並以短橫線作為列點，清晰地區分出層次。

### 3. **固定的結尾模組**
   - **相關營養素 智慧推薦文章 (自動生成)**：文章結尾的推薦區塊已由 `related-articles-component.js` 全自動生成。它會根據當前文章的 `goals`，從 `articles-data.js` 和 `topicArticles` 中動態尋找最相關的文章來推薦。**您不再需要手動編寫此區塊**，只需確保新文章已正確加入 `articles-data.js` 即可。
   - **免責聲明**：在頁尾組件前，必須加上標準的免責聲明區塊。

## 內容與語氣

### 1. **專業口吻**
   - 適時使用「**營養師提醒**」、「**醫師警告**」等提示框，增加內容的權威性。

### 2. **善用比喻**
   - 將複雜的科學概念轉化為簡單易懂的比喻。例如：
     - *維生素B群是身體的「能量轉換器」。*
     - *Q10是「心臟的能量火星塞」。*

### 3. **強調重點**
   - 對於段落中的關鍵字詞與數據，使用 `<strong>` 標籤或 `<span class="highlight-nutrient">` 來凸顯。

### 4. **善用讀者觀點**
   - 在撰寫前，先思考讀者為何會搜尋這個主題？他們可能遇到了什麼具體問題（例如：失眠、容易累、皮膚不好），或是有什麼樣的目標（例如：備孕、提升運動表現）。
   - 從讀者會遇到的日常生活情境出發，分析其背後的意圖與困難，讓文章內容能真正解決他們的問題，而不只是單純的知識陳列。

### 5. **精簡圖示 (Icon) 使用**
   - **原則禁止，例外手動**：為維持版面的專業性與內容的純粹性，**原則上禁止使用任何裝飾性圖示（包含 Emoji）**。
   - 任何圖示的出現，都應是經過審慎評估後，由編輯**手動明確加入**的，絕非自動或常規性添加。
   - 目標是讓視覺焦點完全回歸內容本身，避免任何不必要的視覺干擾。

### 6. **全面專業潤稿 (Full-Pass Proofreading)**
   - **目標**：在完成初稿後，進行一次徹底的專業潤稿，根除所有可能削弱文章權威性的元素。
   - **核心原則**：
     - **消除「內容農場」語氣**：避免使用過於聳動、誇大或缺乏根據的語句。
     - **整合專家觀點**：將「專家建議」、「醫師提醒」等外部標籤，無縫地融入文章的論述脈絡中。讓內容本身直接展現其專業性，而非依賴標籤。
     - **統一沉穩語氣**：確保整篇文章的語氣一致、沉穩且充滿信賴感，避免過於口語化的表達。
     - **優化起承轉合**：檢查各段落間的邏輯連接，確保行文流暢，論述結構嚴謹。
   - **最終成果**：潤稿後的文章應是一份精雕細琢的權威指引，而非僅僅是資訊的堆砌。

### 7. **優化提示框文字分段**
   - 在使用 `.alert` 提示框（如「營養師的選購箴言」）時，應適度將長句切分為短句或條列式，以加強語氣和視覺指引，讓核心建議更清晰有力。

---

# 第三章：技術與格式化規範

## 檔案命名規範

為了確保專案的組織性與可維護性，所有文章的 HTML 檔名都必須遵循以下規則：

- **核心營養素文章**：檔名直接使用該營養素的英文名稱，並以連字號 (`-`) 分隔單字。所有字母均為小寫。
  - **範例**：`fish-oil.html`、`vitamin-c.html`、`coenzyme-q10.html`

- **主題式文章**：檔名必須以 `topic-` 作為前綴，後面跟隨主題的描述性名稱。同樣，單字間以連字號分隔，所有字母均為小寫。
  - **範例**：`topic-stroke-prevention-nutrients.html`、`topic-immune-system-boost.html`

## 格式化與常用 CSS Class

為了維持視覺上的一致性，請多加利用以下預設的 CSS 樣式。

> **重要規則：** 
> 1. **禁止行內樣式**: 為了方便統一管理與維護，應完全避免使用 `style="..."` 屬性，將所有樣式移至 CSS class 中。
> 2. **禁止裝飾性圖示**: 為維持版面的專業性與內容的純粹性，**原則上禁止在文章內使用任何裝飾性圖示（包含 Emoji）**。所有範例均不應包含圖示，以確保視覺焦點完全回歸內容本身。

### 1. **提示框 (`.alert`)**

提示框是用於強調關鍵資訊、提供專家建議或發出警告的重要元件。為了確保其視覺效果與功能性一致，請遵循以下結構與樣式規範。

#### **核心使用原則**
- **結構分離**: `<strong>` 標籤僅用於標題文字 (如 "營養師提醒：")，主要內容應放在 `<p>` 標籤中。
- **不強制換行**: 標題 (`<strong>`) 和主要內容 (`<p>`) 將會嘗試在同一行顯示，以節省空間並保持緊湊。
- **圖示自動套用**: 警示圖示 (⚠️, 💡) 是由 CSS 自動添加的，**嚴禁**在 HTML 中手動插入任何 Emoji 或圖示。

#### **標準 HTML 結構**

為了達到最佳的視覺排版與可讀性，請務必使用以下兩層結構：

```html
<div class="alert alert-tip">
  <strong>營養師小撇步：</strong>
  <p>將魚油與含有脂肪的正餐一同服用，是提升其生物利用率的關鍵。空腹服用會大幅降低吸收效果。</p>
</div>
```

#### **樣式與排版說明**

- **尺寸與佈局**: `.alert` 容器會自動填滿其父層的寬度，無需手動設定尺寸。
- **標題 (`<strong>`)**: 為了視覺上的強調，標題會以粗體顯示，並與下方的內文段落保有適當間距。
- **內文 (`<p>`)**: 建議將較長的內容放入 `<p>` 標籤中。若有多個要點，可使用 `<ul>` 和 `<li>` 進行條列，以增強可讀性。

#### **圖示使用規則**

為了在不犧牲專業性的前提下，增強特定提示的視覺辨識度，我們針對以下三種提示框，透過 CSS 自動添加了前置圖示。

- **醫師警告 (`.alert-doctor`)**: 自動附加 `⚠️` 圖示，用於強調潛在風險或藥物交互作用。
- **營養師提醒 (`.alert-nutritionist`)**: 自動附加 `💡` 圖示，用於提供專業建議或澄清迷思。
- **一般提示 (`.alert-tip`)**: 自動附加 `💡` 圖示，用於提供一般性的實用技巧。

> **疑難排解**: 如果您的提示框樣式不正確（例如，出現多餘的圖示或不正常的換行），請優先檢查：
> 1. 是否在 HTML 中手動加入了 Emoji 圖示？ (應移除)
> 2. 是否將主要內容與 `<strong>` 標籤寫在同一行，而沒有用 `<p>` 分隔？ (應使用 `<p>` 分隔)
> 3. 是否有使用到舊的、已被棄用的 CSS class？

### 2. **資訊卡片 (`.info-cards`)**
   - 用於並列呈現核心觀點或功效。
   - **排版規則**：
     - 容器預設使用 `display: inline-flex`，使其寬度能符合內容寬度，並允許卡片換行。
     - 卡片 (`.info-card`) 應使用 `flex: 1` 來填滿容器，並設定 `min-width: 280px` 和 `max-width: calc(33.333% - 14px)` (考慮到 20px 的 `gap`)，以確保每行最多顯示 3 張卡片。
     - **重要**：一個 `.info-cards` 區塊中，**不應放置超過 3 張**資訊卡片 (`.info-card`)。若超過，請手動移除多餘的卡片。

   ```html
   <div class="info-cards">
     <div class="info-card">
       <h4 class="info-card-title">核心功效一</h4>
       <p class="info-card-desc">說明此功效的詳細內容...</p>
     </div>
     <div class="info-card">
       <h4 class="info-card-title">核心功效二</h4>
       <p class="info-card-desc">說明此功效的詳細內容...</p>
     </div>
     <div class="info-card">
       <h4 class="info-card-title">核心功效三</h4>
       <p class="info-card-desc">說明此功效的詳細內容...</p>
     </div>
   </div>
   ```

### 3. **風險族群卡片 (`.risk-group-cards`)**
   - 用於強調哪些族群需要特別注意。
   - **排版規則**：
     - 容器預設使用 `display: inline-flex`，使其寬度能符合內容寬度。卡片應使用 `flex: 1` 來填滿容器。
     - 為了維持在所有裝置上的最佳閱讀體驗與排版，一個 `.risk-group-cards` 區塊中，**不應放置超過 3 張**風險卡片 (`.risk-card`)。若超過，請手動移除多餘的卡片。

   ```html
    <div class="risk-group-cards">
      <div class="risk-card">
        <div class="risk-card-header">
          <h4 class="risk-card-title">吸菸者</h4>
        </div>
        <p class="risk-card-desc">香菸會產生大量自由基...</p>
      </div>
      <div class="risk-card">
        <div class="risk-card-header">
          <h4 class="risk-card-title">高壓上班族</h4>
        </div>
        <p class="risk-card-desc">長期壓力會消耗體內營養素...</p>
      </div>
      <div class="risk-card">
        <div class="risk-card-header">
          <h4 class="risk-card-title">素食者</h4>
        </div>
        <p class="risk-card-desc">部分營養素在植物性食物中含量較低...</p>
      </div>
    </div>
   ```

### 4. **比較表格 (`.data-table`)**
   - 用於比較不同產品、食物的優劣。

   ```html
   <table class="data-table">
     <thead>
       <tr><th>排名</th><th>食物項目</th><th>含量 (mg)</th></tr>
     </thead>
     <tbody>
       <tr><td>冠軍</td><td><strong>葵花籽</strong></td><td><strong>36.3</strong></td></tr>
       <!-- more rows... -->
     </tbody>
   </table>
   ```

### 5. **進階比較表格 (`.comparison-table`)**
   - 用於多個項目（如不同劑型、來源）的詳細優劣比較，特別是當有「推薦選項」時。
   - 此表格設計更具視覺引導性，能幫助讀者快速抓住重點。

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
                   <th class="comparison-header-option">
                       <strong>磷蝦油 (Krill Oil)</strong>
                   </th>
               </tr>
           </thead>
           <tbody>
               <tr class="comparison-row">
                   <td class="comparison-label">生物利用率</td>
                   <td class="comparison-cell comparison-recommended">
                       <div class="rating-badge rating-high">高</div>
                   </td>
                   <td class="comparison-cell">
                       <div class="rating-badge rating-very-high">極高</div>
                   </td>
               </tr>
               <tr class="comparison-row">
                   <td class="comparison-label">優缺點</td>
                   <td class="comparison-cell comparison-recommended">
                       <div class="pros-cons">
                           <div class="pros">+ 性價比高、研究完整</div>
                           <div class="cons">- 可能有魚腥味</div>
                       </div>
                   </td>
                   <td class="comparison-cell">
                       <div class="pros-cons">
                           <div class="pros">+ 吸收率極佳、無腥味</div>
                           <div class="cons">- 價格昂貴、濃度偏低</div>
                       </div>
                   </td>
               </tr>
           </tbody>
       </table>
   </div>
   ```
   > **注意**: 此表格的完整 CSS 樣式較為複雜，已內建於各文章頁面的 `<style>` 區塊中。您可以在 `tests/comparison-table-demo.html` 中找到完整的實作範例。

### 6. 全局響應式設計 (Global RWD)

為了確保所有頁面在各種裝置上都有一致且流暢的瀏覽體驗，我們採用一套全局的響應式設計規則。

#### **核心 CSS 規則**

```css
/* 1. 通用盒模型與文字換行 */
* { box-sizing: border-box; }
p, td, th, li, a { word-break: break-word; }

/* 2. 響應式媒體 */
img, svg { max-width: 100%; height: auto; }

/* 3. 響應式表格容器 */
.responsive-table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }

/* 4. 行動版優先的卡片容器 */
.info-cards, .risk-group-cards {
    display: flex;
    flex-direction: column; /* 手機上預設為單欄 */
    gap: 20px;
}

/* 5. 桌面版佈局的 Utility Classes */
@media (min-width: 768px) {
    .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
    .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
    .md-flex-row { flex-direction: row; }
}
```

#### **HTML 實作範例**

- **卡片佈局**:
  ```html
  <!-- 在桌面版為三欄，手機版為單欄 -->
  <div class="info-cards md-grid-3">
    ...
  </div>
  ```

- **表格**:
  ```html
  <div class="responsive-table-wrapper">
    <table class="data-table">
      ...
    </table>
  </div>
  ```

## 整合 SVG 視覺化圖表

### 目的
建立一個標準化的指令 (Prompt)，用於指導 AI 在生成或優化文章時，主動扮演「視覺化內容策略師」的角色，找出最適合用圖表呈現的段落，並直接產出對應的 SVG 程式碼。

### Prompt 範本

#### # 角色 (Role)
你是一位頂尖的健康領域內容策略師，同時也是一位精通數據視覺化的前端開發者。你擅長將複雜的健康知識轉化為清晰、易懂且具吸引力的視覺圖表，並且堅持使用最純粹、高效的網頁技術來實現。

#### # 任務 (Task)
你的任務是分析我提供的文章草稿，找出其中最適合進行視覺化升級的 3-5 個關鍵點，並為每一個點主動提出一個具體的 SVG 資訊圖表建議，最後產出完整的 HTML/SVG/CSS 程式碼。

#### # 工作流程 (Workflow)
1.  **分析內容：** 深入閱讀文章，找出適合視覺化的關鍵概念，例如：
    *   包含關鍵數據或比例的段落 (e.g., 99% vs 1%)。
    *   描述一個過程、時間軸或生命週期的部分 (e.g., 巔峰骨量變化)。
    *   需要比較多個項目的優缺點 (e.g., 不同鈣質補充品)。
    *   解釋多個元素之間複雜關係的段落 (e.g., 鈣與維生素 D、鎂的協同作用)。
2.  **提出建議：** 對於每一個你找出的關鍵點，明確提出你的視覺化建議。例如：「在『鈣的雙重角色』段落，我建議使用一個甜甜圈圖來呈現...」
3.  **產出程式碼：** 在提出建議後，立即提供一個獨立、完整的 HTML 區塊，其中包含你手寫的 SVG 圖形以及對應的 CSS 樣式。

#### # 關鍵指令 (Key Directives)
*   **純粹技術原則：** 嚴格禁止使用任何外部 JavaScript 圖表函式庫 (如 Chart.js, D3.js) 或點陣圖檔 (如 JPG, PNG)。所有圖表**必須**使用純粹的 `<svg>` 標籤手寫而成。
*   **設計風格：** 圖表設計需現代、簡潔，並與文章的整體風格 (參考色：#ff6b35) 保持一致。
*   **程式碼品質：** 產出的 SVG 程式碼必須結構清晰、易於閱讀，並具備響應式設計，確保在各種螢幕尺寸上都能正常顯示。

#### # 範例
如果文章提到「市面上有碳酸鈣、檸檬酸鈣、海藻鈣三種主流的鈣補充品」，你應主動建議：「這個段落非常適合改造成一個視覺化比較卡片，讓讀者能一目了然地比較其優缺點。」接著，你就需要提供那幾張卡片的完整 HTML 與 CSS 程式碼。

## SEO 與 Metadata

這是確保文章能被搜尋引擎正確索引的關鍵步驟。

1.  **基礎 Meta 標籤**：確實填寫 `<title>`、`<meta name="description">` 和 `<meta name="keywords">`。
    - **頁面描述 (description)**：頁面描述是影響點閱率的關鍵。撰寫時應**完整使用 V.I.P. + B.R.A.V.E. 混合框架**，將文章的核心價值與誘因濃縮在 150 字元左右的文案中。目標是創造最大的 SEO 點擊誘因與資訊價值。
      - **寫作範例 (以益生菌為例)**: `想終結便秘腹瀉嗎？快來了解益生菌的7大關鍵功效！最新指引將教你如何看懂菌株編號，5分鐘學會挑選技巧，重建腸道健康。`
    - `keywords` 應包含文章的核心關鍵字。

2.  **JSON-LD 結構化資料**：**此為必填項目**。請務必複製並修改以下範本，填入正確的文章資訊。

    ```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://life.maxlist.xyz/post/your-new-page.html" // 修改為新頁面的完整網址
      },
      "headline": "文章主標題", // 與 <title> 相似
      "description": "文章的詳細描述", // 與 meta description 相似
      "image": "https://life.maxlist.xyz/assets/images/your-og-image.jpg", // 替換為代表性圖片
      "author": {
        "@type": "Organization",
        "name": "Caregiver 營養百科",
        "url": "https://life.maxlist.xyz/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Caregiver 營養百科",
        "logo": {
          "@type": "ImageObject",
          "url": "https://life.maxlist.xyz/assets/images/logo-for-google.png"
        }
      },
      "datePublished": "YYYY-MM-DD", // 首次發布日期
      "dateModified": "YYYY-MM-DD"  // 最後修改日期
    }
    </script>
    ```

3.  **全站品牌識別 (Site Name) 設定**：為了確保 Google 搜尋結果正確顯示網站名稱為「營養百科」，而非繼承主網域的名稱，所有頁面都必須包含以下設定。
    - **`og:site_name` 標籤**：在每個頁面的 `<head>` 中加入，為社群分享提供正確的網站名稱。
      ```html
      <meta property="og:site_name" content="營養百科" />
      ```

    - **`WebSite` 結構化資料**：在每個頁面的 `<head>` 中加入，明確向搜尋引擎宣告網站身份。這是**最關鍵**的步驟。
      ```html
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "營養百科",
        "url": "https://life.maxlist.xyz/"
      }
      </script>
      ```

    - **`BreadcrumbList` 結構化資料**：為所有**非首頁**的頁面加入麵包屑導航數據，強化網站層級與品牌主體。
      ```html
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "營養百科",
          "item": "https://life.maxlist.xyz/"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "目前頁面的標題" // 例如: "關於我們" 或 "維生素D完整指引"
        }]
      }
      </script>
      ```

---

# 第四章：品質與發布流程

## 內容品質檢查要點

### 寫作品質重點
- **標題策略**：確保符合 V.I.P. + B.R.A.V.E. 框架
- **章節完整性**：包含所有8個標準章節
- **專業權威性**：避免「內容農場」語氣，使用科學數據
- **用戶體驗**：文章長度適中，使用生活化比喻
- **視覺化元素**：至少包含1個 SVG 圖表或視覺化元素

> **詳細檢查清單請參考** [`doc/new-page-checklist.md`](new-page-checklist.md)

## 發布前檢查

在您完成一篇文章的撰寫後，請務必完成以下兩個關鍵步驟：

1.  **更新中央資料庫**：手動打開 `/assets/js/articles-data.js` 檔案，並根據文章類型進行更新：
    *   **核心營養素文章**：將新文章的物件資訊新增至 `articlesData` 陣列。
    *   **主題式文章**：將新文章的物件資訊新增至 `topicArticles` 陣列。
2. **更新 Sitemap**：手動打開 `/sitemap.xml` 檔案，加入新文章的 `<url>` 資訊。

> **完整技術檢查清單請參考** [`doc/new-page-checklist.md`](new-page-checklist.md)

---

# 第五章：資源與範例

## 完整範例：鈣質文章撰寫示範

### 標題撰寫範例
**輸入：** 鈣質
**V.I.P. + B.R.A.V.E. 分析：**
- **V (價值):** 不只補骨，終結抽筋、失眠
- **I (好奇):** 為何99%的鈣在骨骼，1%卻能調控生命？
- **P (問題):** 解決骨質疏鬆、抽筋、失眠困擾
- **B (品牌):** | 營養百科
- **A (數量):** 8大迷思、4大來源
- **V (速度):** 終結困擾

**最終標題：** `鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質 | 營養百科`

**頁面描述範例：**
```
深受抽筋、失眠困擾？想預防骨質疏鬆？這份鈣質終極指引，將在10分鐘內破解8大補鈣迷思，教你秒懂海藻鈣與檸檬酸鈣的差別，學會如何挑選命定鈣片，重建骨骼健康！
```

### 文章結構完整範例

#### 1. 引人入勝的開頭
```html
<div class="article-hero">
  <span class="article-category">礦物質指引</span>
  <h1 class="article-title">鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質</h1>
  <p class="article-subtitle">
    還在只吃碳酸鈣？營養師教你從8大迷思中覺醒，解析海藻鈣、檸檬酸鈣等4大來源的吸收率與副作用，為骨質疏鬆、抽筋、失眠問題找到最佳解方。
  </p>
</div>
```

#### 2. 核心概念視覺化
**鈣的雙重角色圖表：**
```html
<div class="chart-dual-role">
  <div class="donut-chart-visual">
    <div class="donut-chart-segment"></div>
    <div class="donut-chart-text">鈣的<br>雙重角色</div>
  </div>
  <div class="donut-chart-legend">
    <div class="legend-item legend-99">
      <div class="legend-value">99%</div>
      <div class="legend-label"><strong>結構鈣 (骨骼銀行)</strong><br>構成骨骼與牙齒的堅固建材。</div>
    </div>
    <div class="legend-item legend-1">
      <div class="legend-value">1%</div>
      <div class="legend-label"><strong>離子鈣 (生命總司令)</strong><br>調控心跳、神經傳導與肌肉收縮。</div>
    </div>
  </div>
</div>
```

#### 3. 專業提示框運用
```html
<div class="alert alert-tip">
  <strong>鈣恆定的悖論：為何1%的「總司令」能犧牲99%的「銀行」？</strong>
  <p>人體內存在一套精密而嚴格的調控系統，稱為<strong class="highlight-nutrient">「鈣恆定」</strong>，其首要任務是將血液中的鈣離子濃度維持在一個極其狹窄的範圍內。</p>
</div>
```

#### 4. 數據表格呈現
```html
<table class="data-table">
  <thead>
    <tr><th>年齡層</th><th>每日建議攝取量 (毫克)</th></tr>
  </thead>
  <tbody>
    <tr><td>青少年 (13-18 歲)</td><td><strong>1200 mg</strong></td></tr>
    <tr><td>成人 (19 歲以上)</td><td>1000 mg</td></tr>
  </tbody>
</table>
```

#### 5. 比較卡片設計
```html
<div class="supplement-cards-grid">
  <div class="supplement-card card-carbonate">
    <div class="card-header">
      <h4 class="card-title">碳酸鈣</h4>
      <p class="card-calcium-content">元素鈣含量: <span>40%</span></p>
    </div>
    <div class="card-section">
      <p class="card-section-title">吸收率</p>
      <div class="absorption-bar"><div class="absorption-bar-fill" style="width: 40%;"></div></div>
    </div>
  </div>
</div>
```

#### 6. 迷思破解區塊
```html
<div class="info-cards" style="grid-template-columns: repeat(4, 1fr);">
  <div class="info-card" style="background: #fef2f2; border-top: 5px solid #f87171;">
    <h4 class="info-card-title" style="color: #b91c1c;">迷思一：喝大骨湯補鈣？</h4>
    <p class="info-card-desc"><strong>事實：</strong>骨頭中的鈣很難溶出，一碗大骨湯的鈣含量微乎其微。</p>
  </div>
</div>
```

#### 7. FAQ 互動設計
```html
<div class="faq-item">
  <div class="faq-question">Q1: 鈣和鎂可以一起吃嗎？</div>
  <div class="faq-answer">
    <p><strong>A: 可以，而且建議一起補充，但要注意比例。</strong> 理想的<strong class="highlight-nutrient">鈣鎂攝取比例約為 2:1</strong>。</p>
  </div>
</div>
```

### 成功要素分析

#### 標題策略成功點
- **V.I.P. 框架完整應用**：價值（終結困擾）+ 好奇（不只補骨）+ 問題（抽筋失眠）
- **B.R.A.V.E. 元素到位**：品牌識別 + 具體數量 + 解決速度
- **情感共鳴強烈**：直接命中讀者痛點

#### 內容結構優勢
- **8個標準章節完整**：從基礎認知到實際應用
- **視覺化元素豐富**：圖表、卡片、進度條等
- **專業權威建立**：大量科學數據和專業解釋

#### 用戶體驗設計
- **互動性強**：FAQ 可展開、TOC 導航
- **視覺層次清晰**：不同顏色區分內容類型
- **行動指引明確**：具體的攝取建議和選購指引

## 快速模板與工具

### 標題生成器
```
營養素名稱：_______
核心價值：_______
引發好奇：_______
解決問題：_______
數量關鍵字：_______
速度關鍵字：_______

生成標題：_______
```

### 頁面描述生成器
```
目標讀者：_______
主要痛點：_______
解決方案：_______
具體效益：_______
時間承諾：_______

頁面描述：_______
```

### 文章結構檢查表
```
□ 引人入勝的開頭（Hero Section）
  □ 營養素分類標籤
  □ V.I.P. + B.R.A.V.E. 標題
  □ 吸引人的副標題
  □ 閱讀時間預估

□ 8個標準章節完整性
  □ 基本資訊：營養素是什麼？
  □ 核心功效：對人體有哪些好處？
  □ 每日建議攝取量與最佳時間
  □ 食物來源：哪些天然食物富含此營養素？
  □ 誰最需要補充？缺乏警訊與高風險族群
  □ 如何挑選補充品？
  □ 副作用與注意事項
  □ 常見問題 (FAQ)

□ 結尾模組
  □ 相關營養素連結
  □ 免責聲明
```

### CSS 類別快速參考
```css
/* 提示框 */
.alert-tip { background: #fffbeb; color: #b45309; }
.alert-nutritionist { background: #eff6ff; color: #1e40af; }
.alert-doctor { background: #fef2f2; color: #b91c1c; }

/* 資訊卡片 */
.info-cards { display: inline-flex; flex-wrap: wrap; align-items: stretch; justify-content: flex-start; gap: 20px; }
.info-card { flex: 1; min-width: 280px; max-width: calc(33.333% - 14px); box-sizing: border-box; background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); }

/* 風險族群卡片 */
.risk-group-cards { display: inline-flex; flex-wrap: wrap; align-items: stretch; justify-content: flex-start; gap: 20px; }
.risk-card { flex: 1; min-width: 250px; max-width: calc(33.333% - 14px); box-sizing: border-box; background: #fffbeb; border-left: 4px solid #f59e0b; }

/* 數據表格 */
.data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 15px; }

/* 高亮關鍵字 */
.highlight-nutrient {
    background-image: linear-gradient(to top, rgba(255, 107, 53, 0.5) 0%, rgba(255, 107, 53, 0.5) 100%);
    background-position: 0 1.05em;
    background-repeat: repeat-x;
    background-size: 100% 2px;
    text-decoration: none;
    border-bottom: none;
    padding-bottom: 1px;
}
```

### 快速導航
- [標題撰寫策略](#標題撰寫的終極策略)
- [文章結構](#文章結構-由上至下)
- [完整範例](#完整範例鈣質文章撰寫示範)
- [CSS 樣式指引](#格式化與常用-css-class)
- [視覺化圖表](#整合-svg-視覺化圖表)
- [品質檢查清單](#文章品質檢查清單)
- [SEO 設定](#seo-與-metadata)
- [發布前檢查](#發布前檢查)