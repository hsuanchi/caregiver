# 文章優化進度總覽

此矩陣用於追蹤所有文章的內容優化進度。每日任務完成後，請更新此處的狀態。

| 文章名稱 | 優化狀態 | 最後更新日期 |
| :--- | :---: | :---: |
| amino-acids.html | ✅ 已優化 | 2025-12-03 |
| anthocyanins.html | ✅ 已優化 | 2025-12-03 |
| beta-glucan.html | ✅ 已優化 | 2025-12-03 |
| calcium.html | ✅ 已優化 | 2025-12-03 |
| chondroitin.html | ✅ 已優化 | 2025-12-03 |
| chromium.html | ✅ 已優化 | 2025-12-03 |
| coenzyme-q10.html | ✅ 已優化 | 2025-12-03 |
| collagen.html | ✅ 已優化 | 2025-12-03 |
| copper.html | ✅ 已優化 | 2025-12-03 |
| curcumin.html | ✅ 已優化 | 2025-12-03 |
| dietary-fiber.html | ✅ 已優化 | 2025-12-03 |
| fish-oil.html | ✅ 已優化 | 2025-11-18 |
| fluoride.html | ✅ 已優化 | 2025-12-03 |
| folic-acid.html | ✅ 已優化 | 2025-12-03 |
| gaba.html | ✅ 已優化 | 2025-12-03 |
| glucosamine.html | ✅ 已優化 | 2025-12-03 |
| glutathione.html | ✅ 已優化 | 2025-12-03 |
| iodine.html | ✅ 已優化 | 2025-12-03 |
| iron.html | ✅ 已優化 | 2025-12-03 |
| lutein.html | ✅ 已優化 | 2025-12-03 |
| lycopene.html | ✅ 已優化 | 2025-12-03 |
| magnesium.html | ✅ 已優化 | 2025-12-03 |
| manganese.html | ✅ 已優化 | 2025-12-03 |
| official-health-sites.html | ✅ 已優化 | 2025-12-03 |
| phosphorus.html | ✅ 已優化 | 2025-12-03 |
| potassium.html | ✅ 已優化 | 2025-12-03 |
| prebiotics.html | ✅ 已優化 | 2025-12-03 |
| probiotics.html | ✅ 已優化 | 2025-12-03 |
| protein.html | ✅ 已優化 | 2025-12-03 |
| selenium.html | ✅ 已優化 | 2025-12-03 |
| sodium.html | ✅ 已優化 | 2025-12-03 |
| topic-immune-boosting-nutrients.html | 待優化 | |
| topic-stroke-prevention-nutrients.html | 待優化 | |
| topic-vascular-health-superfoods.html | 待優化 | |
| vitamin-a.html | ✅ 已優化 | 2025-12-03 |
| vitamin-b.html | ✅ 已優化 | 2025-12-03 |
| vitamin-c.html | ✅ 已優化 | 2025-12-03 |
| vitamin-d.html | ✅ 已優化 | 2025-12-03 |
| vitamin-e.html | ✅ 已優化 | 2025-12-03 |
| vitamin-k.html | ✅ 已優化 | 2025-12-03 |
| zinc.html | ✅ 已優化 | 2025-12-03 |
| garlic.html | ✅ 已優化 | 2025-12-03 |

---

# 更新日誌

所有此專案的變更將會記錄在此檔案中。

本檔案的格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)，
且本專案遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)。

## [1.4.0] - 2025-12-03

### 新增
- **心血管健康專項計畫 (CARDIOVASCULAR-HEALTH-INITIATIVE)**：
  - 建立新的心血管健康主題頁面 `post/topic-cardiovascular-health.html`，整合所有相關營養素。
  - 建立「植物固醇」頁面 `post/plant-sterols.html`，並在主題頁面中加入連結。
  - 建立「大蒜素」頁面 `post/garlic.html`。

### 優化
- 根據心血管專項計畫，全面檢視並確認以下核心營養素頁面內容的完整性與準確性：
  - **第一梯隊**: `fish-oil.html`, `coenzyme-q10.html`, `potassium.html`, `magnesium.html`
  - **第二梯隊**: `dietary-fiber.html`, `vitamin-b.html`, `folic-acid.html`
  - **第三梯隊**: `vitamin-d.html`, `lycopene.html`

## [1.3.9] - 2025-12-03

### 新增
- **補齊食物數據頁面內容 (FILL-FOOD-DATA-PAGES)**：
  - 根據 `food/apple.html` 範本，補齊了 `food/` 目錄下所有食物頁面的內容。
  - 完善了每個頁面的 SEO meta 標籤 (`title`, `description`, `keywords`) 和 JSON-LD 結構化資料 (`WebSite`, `Article`, `NutritionInformation`, `BreadcrumbList`)。
  - 增加了完整的 `article-body` 結構，包含 `introduction`、`nutrition` (更新為200g份量，並包含所有重要營養素)、`benefits` (使用 `info-cards`)、`how-to-eat` (使用 `alert-nutritionist` 或 `alert-doctor`) 和 `faq-section`。
  - 移除了舊的 inline style，統一使用 `assets/css/article.css`。
  - 補齊了所有頁面所需的 JavaScript 引用和功能，如進度條、TOC 高亮、FAQ 互動等。

## [1.3.8] - 2025-12-03

### 新增
- **建立食物數據獨立頁面 (FOOD-DATA-PAGES)**：
  - 為 `food/food_data.js` 中的21種食物（如雞胸肉、滷肉飯、鹹酥雞等）建立了獨立的HTML頁面。
  - 每個頁面都包含詳細的營養資訊、簡介和健康建議。
  - 所有新頁面均存放於 `food/` 目錄下。

### 變更
- 更新 `food/food_data.js`，將相關食物的 `link` 屬性從 `null` 更新為指向對應新頁面的路徑，以完成整合。

## [1.3.7] - 2025-12-01

### 新增
- 建立 `food/garlic.html` 頁面，內容為「大蒜 - 天然抗生素與心血管守護者」。
### 變更
- 將 `food/garlic.html` 的文章資料從 `assets/js/articles-data.js` 移至 `food/food_data.js`，並更新 `sitemap.xml`。

## [2025-11-24] - TOC 結構標準化

### 新增
- 確立全站文章頁面 TOC (Table of Contents) 目錄結構與樣式標準。
- 統一 `<aside class="sidebar" id="sidebar">`、`<h3 class="toc-title"><span>目錄</span></h3>`、`<ul class="toc-list">` 等 HTML 結構。
- 規定第一層目錄連結 (`.toc-list a:not(.sub-item)`) 樣式必須為粗體 (`font-weight: 700;` 或 `bold`)。
- 規定目錄 `active` 與 `hover` 狀態顏色使用 CSS 變數。
 2.1 樣式標準 (Style Standard)
- **粗體**: 所有第一層的目錄連結 (`.toc-list a:not(.sub-item)`) 都應明確設定為粗體 (`font-weight: 700;` 或 `font-weight: bold;`)，以確保在不同頁面主題色系下，視覺層級依然清晰。
- **顏色**: 目錄的 `active` 與 `hover` 狀態顏色應使用頁面定義的 CSS 變數 (`--primary-color`, `--primary-bg-light`, etc.)，以保持主題一致性。
### 變更
- 修正多個 `post/*.html` 頁面以符合新的 TOC 結構與樣式標準。

### 備註
- 確保所有修改後的頁面，其桌面版與行動版的 TOC 功能與 RWD 樣式皆正常運作。

## [1.3.6] - 2025-11-23

### 修改
- **全站文章頁面 TOC 結構標準化 (TOC-FORMAT-STANDARDIZATION)**：
  - 統一所有 `post/*.html` 文章頁面的側邊欄目錄 (TOC) HTML 結構，確保其 `<h3 class="toc-title">` 不包含 `<a>` 標籤，並為 `<aside>` 容器添加 `id="sidebar"`，以符合標準範本，確保 RWD 功能一致性。

## [1.3.5] - 2025-11-23

### 修改
- **全站文章頁面 RWD 標準化 (GLOBAL-ARTICLE-RWD-STANDARDIZATION)**：
  - 為所有 `post/*.html` 文章頁面的行動裝置 `@media (max-width: 1024px)` 查詢中，新增 `body { overflow-x: hidden; }` 規則，以解決主內容容器左右留白不對稱問題，確保頁面佈局在行動裝置上保持對稱與美觀。

## [1.3.4] - 2025-11-23

### 移除
- **移除儀表板的「資料總覽」區塊 (REMOVE-DASHBOARD-OVERVIEW)**：
  - 從 `category/nutrient-dashboard.html` 頁面中移除了「資料總覽：內容涵蓋狀態」區塊，以簡化頁面。

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