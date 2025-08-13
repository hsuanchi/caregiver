# 營養百科專案架構說明

## 📁 專案目錄結構

```
caregiver-web/
├── index.html                    # 🏠 網站首頁（主要入口）
├── CLAUDE.md                     # 📋 開發規範和指引
├── README.md                     # 📖 專案說明文件
├── PROJECT_STRUCTURE.md          # 📚 本文件 - 架構說明
│
├── 📁 assets/                    # 🎨 所有靜態資源
│   ├── css/                      # 📄 CSS 樣式表
│   ├── js/                       # 📜 JavaScript 腳本和組件
│   │   ├── deus-header-component.js  # 🎯 Header 導覽列組件
│   │   ├── deus-footer-component.js  # 🦶 Footer 頁尾組件
│   │   └── deus-header-simple.js     # 🎯 簡化版 Header（測試用）
│   └── images/                   # 🖼️ 圖片資源
│
├── 📁 post/                      # 📝 文章目錄
│   └── fish-oil.html             # 🐟 魚油完整指南文章
│
├── 📁 tests/                     # 🧪 測試檔案
│   ├── simple-test.html          # 🔧 簡單組件測試
│   ├── debug-test.html           # 🐛 除錯測試頁面
│   └── test-components.html      # ⚙️ 組件功能測試
│
└── 📁 doc/                       # 📋 文件和說明
    ├── homepage.md               # 📝 首頁內容規劃
    ├── fish-oil.md               # 🐟 魚油文章內容
    └── *.jpg                     # 🖼️ 設計稿和截圖
```

## 🎯 主要檔案說明

### 🏠 首頁檔案
- **`index.html`** - 網站主要入口，包含完整的首頁內容和魚油文章連結功能

### 🧩 組件系統
所有組件都使用 **Shadow DOM** 完全封裝，確保樣式和腳本隔離：

- **`assets/js/deus-header-component.js`** 
  - 響應式導覽列
  - 支援手機版選單
  - 可自訂 Logo、連結、按鈕
  - 包含分享功能

- **`assets/js/deus-footer-component.js`**
  - 完整的網站頁尾
  - 包含連結、聯絡資訊、版權聲明
  - 響應式設計

### 📝 文章系統
- **`post/`** 目錄包含所有文章
- 每篇文章都是獨立的 HTML 檔案
- 使用統一的 Header 和 Footer 組件

### 🧪 測試系統
- **`tests/`** 目錄包含所有測試檔案
- 用於驗證組件功能和除錯
- 包含不同層級的測試頁面

## 🔗 路徑引用規則

### 從根目錄引用組件：
```html
<script src="assets/js/deus-header-component.js"></script>
<script src="assets/js/deus-footer-component.js"></script>
```

### 從子目錄引用組件：
```html
<!-- 在 post/ 或 tests/ 目錄中 -->
<script src="../assets/js/deus-header-component.js"></script>
<script src="../assets/js/deus-footer-component.js"></script>
```

### 導覽連結設定：
```javascript
// 從根目錄
.setNavLinks([
    { text: '首頁', href: 'index.html' },
    { text: '營養素', href: 'index.html#nutrients' }
])

// 從子目錄
.setNavLinks([
    { text: '首頁', href: '../index.html' },
    { text: '營養素', href: '../index.html#nutrients' }
])
```

## 🎨 設計原則

### ✅ 零建置原則
- 所有檔案都可直接在瀏覽器中運行
- 不需要任何編譯或建置工具
- 使用原生 JavaScript 和 CSS

### 🔒 Shadow DOM 隔離
- 所有組件使用 Shadow DOM 封裝
- 完全避免樣式和腳本衝突
- 每個組件都是獨立可重用的

### 🔧 Chainable API
- 所有組件支援鏈式呼叫
- Getter/Setter 模式
- 統一的設定介面

## 🚀 快速開始

1. **開啟首頁**：直接在瀏覽器中打開 `index.html`
2. **查看文章**：瀏覽 `post/` 目錄中的文章
3. **測試組件**：使用 `tests/` 目錄中的測試頁面
4. **開發新功能**：遵循 `CLAUDE.md` 中的開發規範

## 📋 下一步計劃

- [x] ~~移除舊版檔案~~ 
- [x] ~~整合魚油文章連結到首頁~~
- [ ] 新增更多文章到 `post/` 目錄
- [ ] 建立 CSS 和 JS 的集中管理
- [ ] 新增更多可重用組件
- [ ] 建立自動化測試流程