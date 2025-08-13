# 原生 JavaScript 前端函式庫開發規範指南

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
