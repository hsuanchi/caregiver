# 任務名稱：優化 foodWiki 頁面並整合獨立食物頁面

**狀態**: `規劃中`
**負責人**: @Gemini
**預計完成日期**: 2025-12-05
**相關連結**: `category/foodWiki_v2test.html`, `food/food_data.js`

---

## 1. 任務目標 (Objective)

此任務旨在優化現有的 `foodWiki_v2test.html` 頁面，解決其因前端動態渲染而導致的 SEO 問題。目標是將其改造為一個能有效引導流量至各個獨立食物頁面 (`food/*.html`) 的中樞頁面，同時保留其既有的使用者互動體驗。

**核心價值**：
-   **提升 SEO**：透過建立可被爬蟲索引的靜態連結，為每個獨立食物頁面帶來自然搜尋流量。
-   **改善使用者體驗**：使用者不僅能快速瀏覽所有食物，還能點擊進入深度閱讀，獲取更完整的資訊。
-   **統一資料來源**：確保頁面資料與 `food/food_data.js` 完全同步，簡化維護流程。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

-   **前端框架**: 純原生 JavaScript，嚴格遵循 `doc/writing-guide.md` 開發規範。
-   **資料來源**: 頁面顯示的所有食物資料，將統一從 `food/food_data.js` 中的 `foodDatabase` 物件讀取。
-   **SEO 優化策略**:
    1.  `foodWiki_v2test.html` 頁面上的每個食物卡片，都將包含一個 `<a>` 標籤。
    2.  該標籤的 `href` 屬性將指向對應的獨立食物頁面 (例如，從 `food/food_data.js` 讀取到 `salmon` 的資料，就產生一個連結指向 `../food/salmon.html`)。
    3.  這樣，搜尋引擎爬蟲可以順著這些連結，發現並索引所有的獨立食物頁面。

### 2.2. 檔案結構

列出此任務將會新增或修改的檔案。

```
caregiver/
├── category/
│   └── foodWiki_v2test.html  (修改)
├── food/
│   └── food_data.js          (維持，作為主要資料來源)
└── assets/
    └── js/
        └── food-wiki-logic.js (可能需要新增或修改，用於渲染 foodWiki_v2test.html)
```

## 3. 任務拆解 (Task Breakdown)

-   [ ] **分析 `foodWiki_v2test.html`**：仔細研究現有頁面的 HTML 結構與 JavaScript 邏輯，了解其功能呈現方式。
-   [ ] **重構渲染邏輯**:
    -   修改或建立一個新的 JavaScript 檔案 (例如 `assets/js/food-wiki-logic.js`)。
    -   這個腳本將負責讀取 `food/food_data.js`。
    -   動態生成食物卡片列表。
-   [ ] **加入靜態連結**:
    -   在生成每個食物卡片時，確保卡片本身或其標題被一個 `<a>` 標籤包裹。
    -   `<a>` 標籤的 `href` 屬性必須動態指向對應的食物頁面路徑 (例如 `../food/{food_id}.html`)。
-   [ ] **維持現有功能**: 確保篩選 (filter)、搜尋 (search) 等現有互動功能在新架構下依然能正常運作。
-   [ ] **樣式調整**: 確保加入 `<a>` 標籤後，卡片的樣式與點擊效果維持原有的設計感。
-   [ ] **完整性驗證**: 檢查 `food/food_data.js` 中的所有食物，確認它們都有對應的 `food/*.html` 頁面存在。若無，應將其列為後續任務。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

-   **評估**: 無。
-   **原因**: 本次修改主要針對 `foodWiki_v2test.html` 的內部實作，對外呈現的功能將維持一致，不會影響網站其他部分。

### 相依性

-   本任務的核心相依於 `food/food_data.js` 的資料結構。未來任何對 `foodDatabase` 物件結構的修改，都可能需要同步調整 `foodWiki_v2test.html` 的渲染邏輯。
-   本任務的 SEO 成效相依於 `food/*.html` 獨立食物頁面的存在與完整性。

## 5. 驗收標準 (Acceptance Criteria)

-   [ ] `foodWiki_v2test.html` 頁面能成功載入並顯示 `food/food_data.js` 中的所有食物。
-   [ ] 頁面上的每個食物卡片都是一個可點擊的連結。
-   [ ] 點擊食物卡片後，能正確跳轉至對應的獨立食物頁面 (例如，點擊「鮭魚」卡片，跳轉至 `../food/salmon.html`)。
-   [ ] 頁面原有的篩選、搜尋功能在新架構下完全正常。
-   [ ] 頁面在所有支援的瀏覽器中，包含行動裝置，皆可正常顯示且功能正常。

---

### 關於您猜想的糾正

您的猜想**完全正確**。

在目前純靜態網站的架構下，如果一個頁面的內容是完全依賴使用者端的 JavaScript 執行後才動態生成的，那麼對搜尋引擎爬蟲來說，這個頁面很可能只是一個空殼。爬蟲不一定會執行或等待所有 JavaScript 完成，因此無法「看到」並索引動態載入的內容。

**您的解決方案——從 foodWiki 頁面連結到各個獨立、靜態的食物頁面——是提升 SEO 的最佳實踐。**

這創造了一個清晰的「中樞 (Hub) - 輻條 (Spoke)」模型：
-   **中樞 (Hub)**: `foodWiki_v2test.html` 頁面，提供一個所有食物的總覽。
-   **輻條 (Spokes)**: 每一個 `food/*.html` 頁面，都是一個內容詳實、可被獨立索引的靜態頁面。

這種結構對 SEO 非常友好，能有效提升整個食物主題區塊的能見度與流量。
