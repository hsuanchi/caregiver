# 開發待辦事項 (TODO List)

這份文件用於快速概覽當前待辦任務。每個任務應遵循以下簡潔格式，以便快速理解其主要目標。

**重要流程**：
1.  每次完成此處的待辦事項後，請將相關修改紀錄更新到 `CHANGELOG.md`。
2.  記錄完成後，再清除此處的已完成項目。
3.  **不要刪除此檔案**。


---

## 每日任務 (Daily Tasks)

此區塊的任務是持續性、可量化的日常工作。

### [進行中] 每日文章優化 (DAILY-ARTICLE-OPT)

**主要目標**: 每天至少優化一篇文章，目標是補充專業知識、去除AI口吻，並將其重新提交至 Google Search Console (GSC) 以提升 SEO 表現。
**相關檔案**: `post/*.html`, `sitemap.xml`, `category/health-topics.html`, `index.html`
**詳細說明**: 
這是一個持續性的每日任務，旨在將知識分享的過程變得量化且有趣。完成一篇後，請至 `doc/task/CHANGELOG.md` 頂部的「文章優化進度總覽」矩陣中更新該文章的狀態。

**優化流程與目標：**
1.  **主題選定**: 挑選一個營養目標主題 (目前選定：心血管健康)。
2.  **內容優化**: 針對該主題下的相關文章進行深度優化。
    - **2.1 結構與意圖**: 確保 `<h2>` 和 `<h3>` 標題符合使用者搜尋意圖。
    - **2.2 視覺化**: 補充更多 SVG 圖示或數據圖表，讓資訊更易懂。
    - **2.3 內容豐富度**: 擴充 `<p>` 段落內容，提供更詳盡的說明與解釋。
3.  **主題頁面更新**: 在 `category/health-topics.html` 中，新增或更新對應的營養目標主題文章。
4.  **首頁曝光**: 在 `index.html` 首頁新增該營養目標主題的推薦區塊 (Section)。

#### 心血管專項執行計畫

**核心分析：為什麼選這幾個？(Analyst Note)**
基於 Winter Seasonality (冬季特性) 與 Search Intent (搜尋意圖)：

- **第一王牌：v魚油 (Fish Oil)**
  - **理由**: 冬季血液循環變差，中風風險高。魚油是「抗發炎」與「血管通暢」的搜尋首選。且它還能蹭到「冬季皮膚乾燥」的流量（魚油對皮膚好）。
  - **戰術**: 把它當作「旗艦產品」來打。

- **剛需防禦：v鎂 (Magnesium) & 鉀 (Potassium)**
  - **理由**: 天冷血管收縮，血壓易升高。這兩者是「天然降壓藥」。
  - **戰術**: 鎖定關鍵字「冬天血壓高怎麼辦」、「放鬆血管食物」。

- **高客單價潛力：輔酶Q10 (CoQ10)**
  - **理由**: 這是中高齡族群（也是最有消費力的族群）在找的。特別是有在吃降膽固醇藥(Statin)的人，冬天心臟負擔大，更需要補氣。

---

## 待辦事項清單 (To-Do List)

此區塊的任務為一次性或階段性的開發工作。

### [待辦] 全站文章頁面 RWD 樣式標準化 (GLOBAL-ARTICLE-RWD-STANDARDIZATION)

**主要目標**: 將修復行動裝置佈局問題的 CSS 規則 (`body { overflow-x: hidden; }`) 應用於所有 `post/*.html` 文章頁面，並藉此機會統一所有文章頁面的行動裝置 `@media` 查詢樣式，確保全站 RWD 效果一致。
**相關檔案**: `post/*.html`, `post/00template.html`
**詳細說明**: 遍歷所有文章頁面，檢查其 `@media (max-width: 1024px)` 媒體查詢區塊，確保 `body { overflow-x: hidden; }` 規則存在，並移除或統一其他可能存在衝突的舊樣式。

### [待辦] 首頁整合儀表板功能 (HOMEPAGE-DASHBOARD-INTEGRATION)

**主要目標**: 將 `category/nutrient-dashboard.html` 的功能修改後，移植到首頁，呈現科技與數據感。
**相關檔案**: `index.html`, `category/nutrient-dashboard.html`, `assets/js/dashboard-logic.js`
**詳細說明**: 此任務對應 `INTEGRATE_DASHBOARD_TO_HOMEPAGE.md` 的規劃。需要將現有儀表板邏輯重構為一個獨立的、可嵌入的 Shadow DOM 組件。

### [待辦] 調整儀表板測試頁面標題 (DASHBOARD-TEST-TITLE)

**主要目標**: 更新 `tests/index-dashboard-test.html` 中 `<section class="popular" id="health-goals">` 區塊的標題，使其更符合儀表板功能。
**相關檔案**: `tests/index-dashboard-test.html`
**詳細說明**: 確保標題能準確反映頁面內容，提升測試頁面的語義清晰度。

### [已完成] BUG: 行動裝置容器左右留白不對稱 (BUG-MOBILE-LAYOUT-ASYMMETRY)

**問題描述 (Problem)**:
文章頁面 (例如 `post/magnesium.html`, `post/vitamin-c.html`) 在部分行動裝置的螢幕寬度下，主內容容器與頁面背景之間的左右留白(padding/margin)會出現不對稱的情況，導致視覺上的不平衡。

**目標 (Goal)**:
1.  分析造成此問題的 CSS 根本原因。
2.  提出一個能適用於所有文章頁面的通用解決方案。
3.  修復此問題，確保在各種行動裝置寬度下，頁面佈局皆能保持對稱與美觀。

**影響範圍 (Affected Files)**:
- 所有位於 `post/` 資料夾下的文章頁面。
- 可能是頁面內嵌的通用 CSS 規則，特別是 `@media` query 中的設定。
