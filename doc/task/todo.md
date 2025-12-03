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

**核心目標**：建立與優化心血管健康相關的所有基礎營養素頁面，並建立一個清晰、以使用者為中心的主題頁面。

**執行清單 (頁面建立/優化)**:

-   [ ] **主題頁面**:
    -   [ ] `topic-cardiovascular-health.html` (建立一個新的心血管健康主題頁，整合所有相關營養素)

-   [ ] **核心營養素 (按優先級)**:
    -   [ ] **第一梯隊 (主要戰力)**
        -   [ ] **魚油 (Omega-3)**: 抗發炎、降三酸甘油酯。 (已存在 `fish-oil.html`，需優化)
        -   [ ] **輔酶 Q10**: 心肌能量、Statin 使用者。 (已存在 `coenzyme-q10.html`，需優化)
        -   [ ] **鉀**: 排鈉、降血壓。 (已存在 `potassium.html`，需優化)
        -   [ ] **鎂**: 放鬆血管、穩定心律。 (已存在 `magnesium.html`，需優化)
    -   [ ] **第二梯隊 (輔助與預防)**
        -   [ ] **水溶性纖維**: 降膽固醇。 (已存在 `dietary-fiber.html`，需優化)
        -   [ ] **B群 (B6, B12, 葉酸)**: 降低同型半胱胺酸。 (已存在 `vitamin-b.html` 和 `folic-acid.html`，需整合與優化)
        -   [X] **大蒜素**: 抑制血小板凝集。 (需建立 `garlic.html`)
    -   [ ] **第三梯隊 (長期保養)**
        -   [ ] **維生素 D**: 調節血壓系統。 (已存在 `vitamin-d.html`，需優化)
        -   [ ] **植物固醇**: 競爭性抑制膽固醇吸收。 (需建立 `plant-sterols.html`)
        -   [ ] **茄紅素**: 抗氧化，保護血管。 (已存在 `lycopene.html`，需優化)

**食物清單 (用於文章內容補充)**:
-   **富含 Omega-3**: [x] 鮭魚、[x] 鯖魚、[x] 亞麻籽、[x] 核桃
-   **富含水溶性纖維**: [ ] 燕麥、[ ] 蘋果、[ ] 豆類、[ ] 秋葵
-   **富含輔酶 Q10**: [ ] 豬心、[ ] 牛肉、[ ] 沙丁魚、[ ] 花生
-   **富含鉀**: [ ] 香蕉、[ ] 菠菜、[ ] 馬鈴薯、[ ] 地瓜
-   **富含鎂**: [ ] 深綠色蔬菜、[ ] 南瓜籽、[ ] 黑巧克力、[ ] 杏仁
-   **富含大蒜素**: [ ] 生大蒜
-   **富含茄紅素**: [ ] 番茄、[ ] 紅西瓜、[ ] 紅葡萄柚

---

## 待辦事項清單 (To-Do List)

此區塊的任務為一次性或階段性的開發工作。

### [待辦] 首頁整合儀表板功能 (HOMEPAGE-DASHBOARD-INTEGRATION)

**主要目標**: 將 `category/nutrient-dashboard.html` 的功能修改後，移植到首頁，呈現科技與數據感。
**相關檔案**: `index.html`, `category/nutrient-dashboard.html`, `assets/js/dashboard-logic.js`
**詳細說明**: 此任務對應 `INTEGRATE_DASHBOARD_TO_HOMEPAGE.md` 的規劃。需要將現有儀表板邏輯重構為一個獨立的、可嵌入的 Shadow DOM 組件。

### [待辦] 建立食物數據獨立頁面 (FOOD-DATA-PAGES)

**主要目標**: 為 `food/food_data.js` 中 `foodDatabase` 裡的所有食物數據建立獨立的靜態頁面。
**相關檔案**: `food/*.html`, `food/food_data.js`
**詳細說明**: 
1.  **頁面結構**: 每個食物頁面應包含該食物的詳細營養資訊（巨量營養素、微量營養素）、簡要介紹、食物來源圖片、以及與該食物相關的健康益處。
2.  **檔案命名**: 檔案應儲存在 `food/` 目錄下，命名格式為 `{key}.html` (例如：`banana.html`)。
3.  **整合**: `category/foodWiki.html` 中的食物項目應連結到這些獨立頁面。
4.  **SEO**: 每個獨立頁面應具備完整的 SEO metadata (title, description, keywords, JSON-LD)。

**待建立頁面清單 (Checklist):**
- [ ] `chicken.html` (雞胸肉)
- [ ] `braised_pork_rice.html` (滷肉飯)
- [ ] `beef_noodle.html` (紅燒牛肉麵)
- [ ] `stinky_tofu.html` (炸臭豆腐)
- [ ] `oyster_omelet.html` (蚵仔煎)
- [ ] `ba_wan.html` (肉圓)
- [ ] `scallion_pancake.html` (蔥油餅)
- [ ] `sausage.html` (烤香腸)
- [ ] `luwei.html` (滷味拼盤)
- [ ] `pig_blood_cake.html` (豬血糕)
- [ ] `popcorn_chicken.html` (鹹酥雞)
- [ ] `black_tea.html` (紅茶)
- [ ] `green_tea.html` (綠茶)
- [ ] `latte.html` (拿鐵咖啡)
- [ ] `americano.html` (美式咖啡)
- [ ] `cola.html` (可樂)
- [ ] `beer.html` (啤酒)
- [ ] `orange_juice.html` (柳橙汁)
- [ ] `soy_sauce.html` (醬油)
- [ ] `ketchup.html` (番茄醬)
- [ ] `mayonnaise.html` (美乃滋)



### [待辦] 優化首頁健康主題區塊 (HOMEPAGE-TOPICS-UI-IMPROVEMENT)

**主要目標**: 重新設計首頁的「健康主題」區塊 (`<section class="experts" id="health-topics">`)，提升其視覺美感與使用者體驗。
**相關檔案**: `index.html`
**詳細說明**: 目前的設計不夠突出，無法有效吸引使用者點擊。優化方向可考慮：
1. 採用更現代的卡片式設計 (Card-based design)。
2. 為每個主題增加一個具代表性的圖示 (Icon)。
3. 調整排版和色彩，使其更符合網站整體的專業與清新風格。
4. 考慮加入滑鼠懸停 (hover) 的互動效果。
---

### [可選] 自動化食物資料庫生成 (AUTOMATE-FOOD-DATA-GENERATION)

**主要目標**: 建立一個後端建置腳本，自動讀取 `food/*.html` 的內容，並產生 `food/food_data.js`，以確保資料的單一來源與同步。
**相關檔案**: `food/*.html`, `food/food_data.js`, `scripts/build-food-data.js` (新腳本)
**詳細說明**: 
此任務旨在解決「資料源頭不一」的維護問題。目前的作法是手動維護 `food_data.js` 與各個 `food/*.html` 頁面，未來可能導致內容不同步。
解決方案是建立一個建置腳本（例如 Node.js 腳本），在網站部署前執行。該腳本會：
1. 掃描 `food/` 資料夾下的所有 HTML 檔案。
2. 解析每個 HTML 檔案，提取所需的營養數據、摘要等資訊。
3. 將所有資料彙整成 `foodDatabase` 物件。
4. 自動覆寫 `food/food_data.js` 檔案。
這樣做可以讓 `food/*.html` 成為唯一的內容真實來源，同時保持前端載入效能，是比「在瀏覽器動態抓取」更專業的作法。此任務會改變目前的純靜態開發流程，引入「建置」步驟。
---