

---

# 更新日誌

所有此專案的變更將會記錄在此檔案中。

本檔案的格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)，
且本專案遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)。


## [1.5.9] - 2025-12-18
### Feat
- **FAQ 20-題深度優化 (GLOBAL-FAQ-20-EXPANSION)**:
  - **模組化擴展**: 實作 5 大模組分類法（基礎、功效、用法、安全、特定族群），並將 `post/zinc.html` 與 `post/fish-oil.html` 擴展至 20 題高品質問答。
  - **獨立 ID 與深層連結**: 為每個問答對實作唯一 ID (例：`faq-oil-basic-1`)，支援搜尋引擎深層索引。
  - **結構化資料同步**: 100% 同步視覺內容與 `FAQPage` JSON-LD 結構化資料。

### Optimization & Project Management
- **任務中央化與排程 (PROJECT-SCHEDULING)**:
  - **Todo 清單整合**: 將「心血管健康工具擴充」與「全站 FAQ 20 題優化」計畫正式寫入 `doc/task/todo.md`，建立明確的執行批次與進度追蹤。
  - **Breadcrumb 專業化計畫**: 完成「導覽標記 (Breadcrumbs)」專業化優化計畫書與任務分拆，建立 `doc/task/task_breadcrumb-optimization.md` 作為執行基準。

## [1.5.8] - 2025-12-18
### Optimization & UX
- **健康工具優化 (HEALTH-TOOLS-OPT)**:
  - **資料持久化**: 實作 `localStorage` 持久化，所有計算機輸入皆可自動保存並於載入時恢復。
  - **交互優化**: 實作「靜默初始計算」，確保頁面初始化時自動根據保存數據渲染結果，無多餘警示與動畫。
  - **交叉連結**: 於計算結果中整合「推薦閱讀」邏輯，引導使用者深入了解相關健康主題（如：心血管風險、魚油、鈉鉀平衡）。
  - **SEO 強化**: 於 `tools.html` 為所有工具實作 `SoftwareApplication` JSON-LD 結構化數據，並新增「專業洞察卡」摺疊區塊，提供深度專家解析與長尾關鍵字優化。
  - **文章整合**: 將相關計算機深度嵌入至教育文章中：
    - 魚油計算機嵌入 `post/fish-oil.html`。
    - 鈉鉀比例計算機嵌入 `post/sodium.html` 與 `post/potassium.html`。
    - ASCVD 風險評估器嵌入 `post/garlic.html`、`post/plant-sterols.html` 與心血管健康主題頁面。

## [1.5.7] - 2025-12-18
### Documentation & Metadata
- **專案文件與索引更新 (PROJECT-DOCS-UPDATE)**:
  - **README.md**: 全面更新「互動式健康工具組件」與「專案結構」章節，新增所有五大健康計算機的描述。
  - **Sitemap.xml**: 更新健康工具首頁的更新頻率為 `weekly`，確保搜尋引擎索引效能。
  - **文章索引 (articles-data.js)**: 新增「大蒜素」、「植物固醇」文章與「健康計算機工具箱」元數據，同步更新文章彙整頁面 (archive.html)。
  - **維修與清理**: 完成心血管健康工具組件的程式碼重構與目錄遷移，並清理 `CHANGELOG.md` 與 `task.md`。

## [1.5.6] - 2025-12-18
### Feat
- **Zone 2 運動心率計算器 (CARDIO-TOOLS-EXPANSION)**:
  - **新組件**: 開發 `Zone2Calculator` 組件，支援 Maffetone 180 (代謝保護) 與 Karvonen (運動表現) 雙公式。
  - **視覺化反饋**: 內建五區間心率條 (5-Zone HR Bar)，突顯 Zone 2 的生理價值與範圍。
  - **工具中心整合**: 於 `category/tools.html` 嵌入計算機，並新增導覽列快速跳轉連結。

## [1.5.5] - 2025-12-18
### Feat
- **鈉鉀離子平衡比 (Na:K Ratio) 計算機 (CARDIO-TOOLS-EXPANSION)**:
  - **新組件**: 開發 `SodiumPotassiumCalc` 組件，支援每日鈉/鉀攝取平衡評估，並內建鹽分 (NaCl) 轉鈉 (Na) 工具。
  - **健康工具箱整合**: 於 `category/tools.html` 嵌入鈉鉀平衡計算機，並新增快速跳轉按鈕。

## [1.5.4] - 2025-12-18
### Feat
- **ASCVD 心血管風險評估器 (CARDIO-TOOLS-EXPANSION)**:
  - **新組件**: 實作 `CardioRiskCalculator` 組件，基於 2013 AHA/ACC 彙整隊列方程 (PCE) 提供 10 年心血管疾病風險評估。
  - **工具中心整合**: 將 ASCVD 評估器整合至 `category/tools.html` 並新增快速導覽按鈕。

### Refactor
- **工具腳本目錄重組**: 
  - 建立 `assets/js/tools-JS/` 目錄，統一收納所有計算機腳本。
  - 將 `caffeine-calculator.js`, `fish-oil-calculator.js`, 與 `cardio-risk-calculator.js` 移至新目錄。
  - 同步更新 `category/tools.html` 與 `post/fish-oil.html` 中的腳本引用路徑。

## [1.5.3] - 2025-12-18
### Feat
- **健康工具箱與咖啡因計算機 (TOOL-LED-GROWTH)**:
  - **新組件**: 開發 `CaffeineCalculator` 原生 JavaScript 組件，基於 FDA/EFSA 數據提供精準的每日建議限量計算與飲品換算。
  - **新頁面**: 建立 `category/tools.html` 作為全站工具中心，整合「咖啡因耐受度計算機」與「魚油真實成本計算機」。
  - **全站整合**: 更新全站導覽列 (deus-header-component.js) 加入「健康工具箱」選項，並同步更新 Sitemap.xml。
  - **頁面修復**: 更新 `post/topic-cardiovascular-health.html` 的工具連結，並修復了 Sitemap 中失效的心血管健康專題連結。

## [1.5.2] - 2025-12-18
### Feat
- **FAQ 內容全面擴展與結構升級 (GLOBAL-FAQ-EXPANSION-STRATEGY)**:
  - 為所有文章頁面（包括 topic-cardiovascular-health.html, topic-immune-boosting-nutrients.html, topic-stroke-prevention-nutrients.html, topic-vascular-health-superfoods.html, vitamin-a.html, vitamin-b.html, vitamin-c.html, vitamin-d.html, vitamin-e.html, vitamin-k.html, vitamin-k2.html, zinc.html 以及其他先前已完成文章）全面擴展並升級 FAQ 內容。
  - 每篇文章的 FAQ 部分現在至少包含 10 個高品質問答對，並採用兩層式分類框架 (`<h3>` 標籤用於分類)。
  - 所有 FAQ 回答都增加了豐富的內部連結 (包括頁面內部錨點、其他 post/ 文章、food/ 頁面)，以提升閱讀體驗和站內 SEO。
  - FAQ 結構嚴格遵循簡化流程，確保內容完整性與功能性，而無需修改 CSS 或 JSON-LD。

## [1.5.1] - 2025-12-17
### Changed
- **首頁UI優化 (HOMEPAGE-TOPICS-UI-IMPROVEMENT)**:
  - 將首頁「健康主題」區塊從靜態、擬物化的樣式，重構為動態生成、更具專業權威感的卡片式設計。
  - 新設計透過結構化、以排版為主的佈局取代了裝飾性圖示，突顯了專業感。
  - 主題卡片現在經由 JavaScript 動態生成，展示精選的核心健康主題，提升了可維護性。

### Docs
- 在寫作指南中，新增了 `professional-insight-card` 元件的說明文件。
- 在文章範本中，加入了 `professional-insight-card` 的範例。
- 更新 `todo.md` 以反映任務完成狀態。

### Refactor
- 重構網站 Footer，使其連結策略與 Hub-and-Spoke 內容架構一致，並以主要主題為導覽核心。
- 修正 Footer 中的無效連結，移除失效連結，並為提升使用者體驗和 SEO 新增了網站地圖連結。
- 將 Footer 元件更新為使用封閉式 (closed) Shadow DOM。

## [1.5.0] - 2025-12-17
### Added
- **New Page**: `post/vitamin-k2.html` - "Project Omega II" Deep Dive report covering Cis/Trans isomers, patent analysis (MenaQ7/K2Vital), and stability issues.
- **Content Expansion**: Updated `post/magnesium.html` with "Buffered Magnesium" trap analysis and EML (Effective Magnesium Load) calculator.
- **Content Expansion**: Integrated `post/review-fish-oil.html` content (Charts, Calculator, Tier List) into `post/fish-oil.html` as the new "Market Reality" section.
- **Refinement**: Adjusted tone in `post/topic-cardiovascular-health.html` from "Engineering Logic" to "Expert Nutrition Team" persona while retaining helpful system metaphors.
- **Privacy & Tone**: Neutralized tone in `post/fish-oil.html` Market Review (removed "IQ Tax" ref), removed all affiliate/direct purchase links, and added market data disclaimer.

### Changed
- **Cardiovascular Hub**: Updated `post/topic-cardiovascular-health.html` Section 3.2 to include deep links to the new K2 and Magnesium reports.
- **Redirect**: `post/review-fish-oil.html` now redirects to `post/fish-oil.html`.
- **System**: Updated `article-data.js` and `sitemap.xml` to include the new K2 page.

## [1.4.5] - 2025-12-17

### 修復 (Fixes)
- **心血管主題頁 UI 標準化與修復 (CARDIO-UI-REPAIR)**:
  - **樣式重構**: 移除實驗性的 Glassmorphism 風格，統一回歸專案標準的 Rose Theme (Flat Design)，確保全站視覺一致性。
  - **結構修復**: 修正了導致排版錯亂的 HTML 巢狀表格錯誤 (Nested Tables) 與缺失的表格標籤。
  - **組件還原**: 修復了因樣式覆蓋而消失的「系統故障診斷圖 (System Diagnostics Map)」，並為其補回了對應的響應式 CSS。
  - **細節調整**: 修正免責聲明 (Disclaimer) 的置中對齊問題。

## [1.4.4] - 2025-12-17

### 優化
- **心血管主題頁深度優化 (CARDIO-PAGE-ENRICHMENT)**：
  - **內容擴充**: 整合研究報告，新增「進階症狀學」、「魚油/及Q10深度比較」、「內皮重塑機制」等資訊卡 (Info Cards)。
  - **行動版優化**: 實作 `table-responsive` 表格捲動與 `flowchart` 垂直堆疊，確保手機閱讀體驗流暢。
  - **UI 組件**: 新增「可折疊專業洞察卡 (Professional Insight Card)」組件。

## [1.4.3] - 2025-12-17

### 新增
- **魚油品類數據化評測 (FISH-OIL-DATA-ANALYTICS)**：
  - 建立評測頁面 `post/review-fish-oil.html`，整合 15 款熱門魚油的真實成本數據。
  - 開發 `FishOilCalculator` 互動式組件，提供使用者計算 "每 1000mg Omega-3 真實成本"。
  - 整合 Chart.js 動態散佈圖與長條圖，視覺化呈現「智商稅散佈」與「CP 值排行」。
  - 引用深度研究報告，新增「深度產品分析」與「避坑指南」區塊，提供高價值的分析師觀點。
  - 建立 `assets/data/fish_oil_data.csv` 與 `assets/analysis/fish_oil_analytics.py` 數據處理流程。

## [1.4.2] - 2025-12-10

### 優化
- **優化舊版 Food 頁面至新版 UI 範本 (OPTIMIZE-OLD-FOOD-PAGES)**：
  - 將 `food/orange_juice.html` 更新為符合 `food/apple.html` 的新版 UI 範本與結構。
  - 調整了頁面的 SEO meta 標籤、JSON-LD 結構化資料、CSS 變數、文章標題與內文，以反映柳橙汁的特性。
  - 移除了舊版側邊欄目錄，採用單欄佈局，並更新了相關的 JavaScript 邏輯。
  - 重新檢查了 `food/` 目錄下的多個頁面（包括 `almond.html`, `americano.html`, `avocado.html`, `ba_wan.html`, `bacon_danbing.html`, `banana.html`, `beef_noodle.html`），確認除 `food/orange_juice.html` 外，其餘頁面皆已符合新版 UI 範本，因此完成此項檢查任務。

## [1.4.1] - 2025-12-05

### 優化
- **全面標準化 Food 頁面至新版 UI 範本 (REFACTOR-FOOD-PAGES-V2)**：
  - 將 `food/` 目錄下的所有 HTML 檔案重構，使其符合由 `food/apple.html` 定義的新型現代 UI 範本與結構。
  - 這項變更為所有食物相關頁面帶來了一致、現代且響應式的設計。
  - 從所有食物頁面中移除了側邊欄/目錄 (TOC)，以實現更簡潔的單欄佈局。
  - 更新了 CSS，使用針對每種食物主題量身定制的新變數化顏色系統。

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