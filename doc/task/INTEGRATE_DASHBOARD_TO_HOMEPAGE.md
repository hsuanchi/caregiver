# 任務名稱：將互動式儀表板整合至首頁

**狀態**: `規劃中`
**負責人**: @[團隊成員]
**預計完成日期**: YYYY-MM-DD
**相關連結**: nutrient-dashboard.html

---

## 1. 任務目標 (Objective)

將 `category/nutrient-dashboard.html` 的關鍵互動圖表區塊，整合到網站首頁 (`index.html`)。目標是提升首頁的資訊密度與使用者互動性，讓訪客能第一時間看到專案的核心數據展示，進而增加在首頁的停留時間，並引導他們深入探索完整的儀表板頁面。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

- **前端框架**: 純原生 JavaScript，嚴格遵循 `CLAUDE.md` 開發規範。
- **組件化與隔離**: 將儀表板的圖表邏輯重構為一個獨立的 JavaScript 類別 (`DashboardWidget`)，並使用 Shadow DOM 技術將其樣式 (CSS) 與行為 (JS) 完全封裝。這能確保嵌入首頁時，不會與現有全域樣式或腳本產生衝突。
- **資料來源**: 沿用 `assets/js/dashboard-logic.js` 的資料處理邏輯，資料來源為 `assets/js/articles-data.js`。

### 2.2. 檔案結構

```
caregiver/
├── index.html                     (修改)
└── assets/
    └── js/
        ├── homepage-logic.js        (新增或修改)
        └── dashboard-logic.js       (修改)
```

## 3. 任務拆解 (Task Breakdown)

- [ ] 分析 `dashboard-logic.js`，將其核心圖表生成邏輯重構為一個可重用的 `DashboardWidget` 類別。
- [ ] `DashboardWidget` 類別必須遵循 `CLAUDE.md` 的所有規範，包括 Shadow DOM 封裝、getter/setter 及 chainable API。
- [ ] 在 `index.html` 的適當位置新增一個 `<div id="homepage-dashboard-widget"></div>` 作為掛載點。
- [ ] 建立或修改 `assets/js/homepage-logic.js`，在頁面載入後，實例化 `DashboardWidget` 並將其掛載到指定掛載點。
- [ ] 調整 `DashboardWidget` 的響應式設計，確保其在首頁的版位中於各種裝置尺寸下都能良好呈現。
- [ ] 撰寫使用範例，說明如何在 `homepage-logic.js` 中呼叫並設定 `DashboardWidget`。
- [ ] 進行跨瀏覽器與裝置的完整測試。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 無。
- **原因**: 本次修改為功能擴充，且所有新程式碼均使用 Shadow DOM 隔離，不會對現有首頁功能或全域樣式造成破壞性變更。

### 相依性

- 本任務的圖表資料相依於 `articles-data.js` 的資料結構。

## 5. 驗收標準 (Acceptance Criteria)

- [ ] 儀表板組件成功渲染於首頁。
- [ ] 組件的 CSS 完全隔離，無任何樣式洩漏至主頁面，也未受主頁面樣式影響。
- [ ] `setDebug(true)` 能在 Console 中正常開啟儀表板組件的除錯日誌。
- [ ] 整合後，首頁在所有目標瀏覽器中皆可正常運作，無 JavaScript 錯誤。
- [ ] 專案在沒有建置工具的情況下可直接運作。