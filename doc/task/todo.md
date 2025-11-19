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

- **第一王牌：魚油 (Fish Oil)**
  - **理由**: 冬季血液循環變差，中風風險高。魚油是「抗發炎」與「血管通暢」的搜尋首選。且它還能蹭到「冬季皮膚乾燥」的流量（魚油對皮膚好）。
  - **戰術**: 把它當作「旗艦產品」來打。

- **剛需防禦：鎂 (Magnesium) & 鉀 (Potassium)**
  - **理由**: 天冷血管收縮，血壓易升高。這兩者是「天然降壓藥」。
  - **戰術**: 鎖定關鍵字「冬天血壓高怎麼辦」、「放鬆血管食物」。

- **高客單價潛力：輔酶Q10 (CoQ10)**
  - **理由**: 這是中高齡族群（也是最有消費力的族群）在找的。特別是有在吃降膽固醇藥(Statin)的人，冬天心臟負擔大，更需要補氣。

---

## 待辦事項清單 (To-Do List)

此區塊的任務為一次性或階段性的開發工作。

### [待辦] 首頁整合儀表板功能 (HOMEPAGE-DASHBOARD-INTEGRATION)

**主要目標**: 將 `category/nutrient-dashboard.html` 的功能修改後，移植到首頁，呈現科技與數據感。
**相關檔案**: `index.html`, `category/nutrient-dashboard.html`, `assets/js/dashboard-logic.js`
**詳細說明**: 此任務對應 `INTEGRATE_DASHBOARD_TO_HOMEPAGE.md` 的規劃。需要將現有儀表板邏輯重構為一個獨立的、可嵌入的 Shadow DOM 組件。

### [待辦] 優化儀表板資訊卡樣式 (DASHBOARD-CARD-STYLE-OPT)

**主要目標**: 讓儀表板的營養素資訊卡更美觀，並移除多餘的標籤。
**相關檔案**: `assets/js/dashboard-logic.js` (或新組件的 CSS), `category/nutrient-dashboard.html`
**詳細說明**: 專注於提升卡片的視覺設計，可能涉及調整佈局、顏色、字體和間距，並簡化卡片上的資訊標籤。

### [待辦] 移除儀表板的「資料總覽」區塊 (REMOVE-DASHBOARD-OVERVIEW)

**主要目標**: 從 `category/nutrient-dashboard.html` 頁面中移除「資料總覽：內容涵蓋狀態」區塊，以簡化頁面。
**相關檔案**: `category/nutrient-dashboard.html`
**詳細說明**: 移除包含進度條和狀態文本的整個 `div.bg-white` 區塊。

### [待辦] 優化文章內相關營養素卡片樣式 (ARTICLE-INFO-CARD-STYLE-OPT)

**主要目標**: 統一文章內相關營養素卡片的視覺風格，使其更現代、簡潔，並與整體設計語言保持一致。
**相關檔案**: `post/*.html` (特別是 `.info-cards` 和 `.info-card` 元素)
**詳細說明**:
- 移除卡片中不必要的「類型」和「狀態」顯示。
- 將卡片整體設計為可點擊區域。
- 將「閱讀文章」按鈕改為簡潔的文字連結（例如：「閱讀文章 →」），並使其在卡片底部對齊，避免視覺混亂。
- 參考 `assets/js/dashboard-logic.js` 中 `renderNutrientCard` 函數的最新優化邏輯。

### [待辦] 調整儀表板測試頁面標題 (DASHBOARD-TEST-TITLE)

**主要目標**: 更新 `tests/index-dashboard-test.html` 中 `<section class="popular" id="health-goals">` 區塊的標題，使其更符合儀表板功能。
**相關檔案**: `tests/index-dashboard-test.html`
**詳細說明**: 確保標題能準確反映頁面內容，提升測試頁面的語義清晰度。