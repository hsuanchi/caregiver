# 文章優化進度總覽

此矩陣用於追蹤所有文章的內容優化進度。每日任務完成後，請更新此處的狀態。

| 文章名稱 | 優化狀態 | 最後更新日期 |
| :--- | :---: | :---: |
| amino-acids.html | 待優化 | |
| anthocyanins.html | 待優化 | |
| beta-glucan.html | 待優化 | |
| calcium.html | 待優化 | |
| chondroitin.html | 待優化 | |
| chromium.html | 待優化 | |
| coenzyme-q10.html | 待優化 | |
| collagen.html | 待優化 | |
| copper.html | 待優化 | |
| curcumin.html | 待優化 | |
| dietary-fiber.html | 待優化 | |
| fish-oil.html | ✅ 已優化 | 2025-11-18 |
| fluoride.html | 待優化 | |
| folic-acid.html | 待優化 | |
| gaba.html | 待優化 | |
| glucosamine.html | 待優化 | |
| glutathione.html | 待優化 | |
| iodine.html | 待優化 | |
| iron.html | 待優化 | |
| lutein.html | 待優化 | |
| lycopene.html | 待優化 | |
| magnesium.html | 待優化 | |
| manganese.html | 待優化 | |
| official-health-sites.html | 待優化 | |
| phosphorus.html | 待優化 | |
| potassium.html | 待優化 | |
| prebiotics.html | 待優化 | |
| probiotics.html | 待優化 | |
| protein.html | 待優化 | |
| selenium.html | 待優化 | |
| sodium.html | 待優化 | |
| topic-immune-boosting-nutrients.html | 待優化 | |
| topic-stroke-prevention-nutrients.html | 待優化 | |
| topic-vascular-health-superfoods.html | 待優化 | |
| vitamin-a.html | 待優化 | |
| vitamin-b.html | 待優化 | |
| vitamin-c.html | 待優化 | |
| vitamin-d.html | 待優化 | |
| vitamin-e.html | 待優化 | |
| vitamin-k.html | 待優化 | |
| zinc.html | 待優化 | |

---

# 更新日誌

所有此專案的變更將會記錄在此檔案中。

本檔案的格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)，
且本專案遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)。

## [1.3.3] - 2025-11-19

### 修改
- **優化儀表板卡片樣式 (DASHBOARD-CARD-STYLE-OPT)**：
  - 重新設計了儀表板 (`nutrient-dashboard.html`) 的營養素資訊卡片，提升視覺美感與資訊清晰度。
  - 簡化了卡片上的資訊標籤，使版面更為簡潔。
  - 對 `assets/js/dashboard-logic.js` 中的 `renderNutrientCard` 函數進行了相應的調整，以生成新的卡片結構。

## [1.3.2] - 2025-11-05

### 新增
- 為 `brand/betterbio.html` 品牌頁面新增 `SaleEvent` JSON-LD 結構化資料，以優化 SEO。

### 修改
- 優化 `brand/betterbio.html` 頁面中商品圖片的 `alt` 屬性，使其更具描述性，提升可訪問性。

## [1.3.1] - 2025-11-04

### 新增
- 建立 BetterBio 專屬優惠頁面 (`brand/betterbio.html`)，提供 BetterBio 獨家優惠與折扣碼。

## [1.3.0] - 2025-11-03

### 新增
- 建立「專屬優惠」頁面 (`category/brands.html`)，展示合作品牌的獨家優惠與折扣碼。
- 將「專屬優惠」頁面連結新增至全站共用的頁首導覽列。
- 為「專屬優惠」頁面新增 FAQ 區塊，以優化 SEO。

### 修改
- 移除「專屬優惠」頁面中與營養主題無關的品牌範例（如旅遊品牌），並更新側邊欄內容，使其完全聚焦於營養保健品。
- 優化「專屬優惠」頁面的 Meta 標籤、JSON-LD 結構化資料及內容文案.

## [1.2.0] - 2025-10-29

### 新增
- 為所有營養素文章頁面新增或標準化「風險與安全注意事項」章節。

### 修改
- 統一所有營養素文章的副作用章節標題格式為 `<h2>{營養素}的風險與安全注意事項</h2>`。
- 在上述章節中，新增 `<h3>{營養素}的常見副作用</h3>` 小標題，使結構更清晰。
- 針對部分沒有安全提醒區塊的文章，根據營養學通則補上對應的內容。

## [1.1.0] - 2025-10-28]

### 新增
- 為所有文章頁面新增標準化的 `article-meta` 區塊，包含作者、更新日期與閱讀時間。

### 修改
- 統一所有文章頁首的作者、日期、閱讀時間圖示與格式。
- 根據文章字數重新校對並更新了部分文章的預估閱讀時間。
- 校對所有文章的最後更新日期，使其與 `articles-data.js` 中的記錄一致。

## [1.0.0] - 2025-10-01
- 網站初始版本發布。