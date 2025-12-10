# 開發待辦事項 (TODO List)

這份文件用於快速概覽當前待辦任務。每個任務應遵循以下簡潔格式，以便快速理解其主要目標。

**重要流程**：
1.  每次完成此處的待辦事項後，請將相關修改紀錄更新到 `CHANGELOG.md`。
2.  記錄完成後，再清除此處的已完成項目。
3.  **不要刪除此檔案**。


---
---

## 待辦事項清單 (To-Do List)

此區塊的任務為一次性或階段性的開發工作。

### [執行中] 心血管主題文章
**主要目標**: 依據 `doc/task/task_topic-cardiovascular-health.md` 的規劃，建立一個權威性的「心血管健康導航頁」，旨在教育使用者並將流量導向高轉換率的評測頁面。




### [待辦] 首頁整合儀表板功能 (HOMEPAGE-DASHBOARD-INTEGRATION)

**主要目標**: 將 `category/nutrient-dashboard.html` 的功能修改後，移植到首頁，呈現科技與數據感。
**相關檔案**: `index.html`, `category/nutrient-dashboard.html`, `assets/js/dashboard-logic.js`
**詳細說明**: 此任務對應 `INTEGRATE_DASHBOARD_TO_HOMEPAGE.md` 的規劃。需要將現有儀表板邏輯重構為一個獨立的、可嵌入的 Shadow DOM 組件。



### [待辦] 優化首頁健康主題區塊 (HOMEPAGE-TOPICS-UI-IMPROVEMENT)

**主要目標**: 重新設計首頁的「健康主題」區塊 (`<section class="experts" id="health-topics">`)，提升其視覺美感與使用者體驗。
**相關檔案**: `index.html`
**詳細說明**: 目前的設計不夠突出，無法有效吸引使用者點擊。優化方向可考慮：
1. 採用更現代的卡片式設計 (Card-based design)。
2. 為每個主題增加一個具代表性的圖示 (Icon)。
3. 調整排版和色彩，使其更符合網站整體的專業與清新風格。
4. 考慮加入滑鼠懸停 (hover) 的互動效果。
---

### [待辦] 將食物儀表板整合至所有 Food 頁面 (FOOD-PAGE-DASHBOARD-INTEGRATION)

**主要目標**: 將 `category/foodWiki.html` 中的食物儀表板格式，整合進 `food/` 目錄下的每一個獨立食物頁面，取代現有的靜態營養表格。
**相關檔案**: `food/*.html`, `category/foodWiki.html`, `assets/js/food-wiki-logic.js`, `food/food_data.js`
**詳細說明**: 
此任務旨在提升使用者體驗，將靜態的營養成分表格升級為互動式、視覺化的儀表板。
1.  **分析儀表板結構**: 參照 `category/foodWiki.html`，將其 `div#foodDetail` 區塊作為儀表板的範本。
2.  **建立儀表板組件**: 將儀表板的 HTML 結構、CSS（可考慮從 `foodWiki.html` 的 `<style>` 標籤中提取）和 JavaScript 邏輯（`food-wiki-logic.js` 的一部分）重構為一個可重複使用的組件或範本。
3.  **整合至食物頁面**:
    a. 在每個 `food/*.html` 頁面中，找到並移除現有的靜態營養表格 (`section#nutrition`)。
    b. 在相同位置插入新的儀表板 HTML 結構。
4.  **數據驅動**:
    a. 確保每個食物頁面的儀表板，能自動從 `food/food_data.js` 中讀取對應食物的數據（如熱量、蛋白質、脂肪、碳水化合物、鉀、纖維等）。
    b. JavaScript 邏輯需要能夠根據當前頁面的食物 ID（可從 `body[data-article-id]` 讀取）來填充儀表板的數據。
5.  **樣式與腳本**: 確保所有 `food/*.html` 頁面都正確引入了必要的 CSS（如 FontAwesome）和 JavaScript（如 Chart.js 和新的儀表板邏輯腳本）。

### [待辦] 開發 Web Tools (魚油 CP 值與咖啡因耐受度計算機) (TOOL-LED-GROWTH)

**主要目標**: 開發兩個簡單的 Web 工具：「魚油 CP 值計算機」與「每日咖啡因耐受度計算機」，以提升網站的實用性、使用者停留時間與 SEO 外連效益。
**相關檔案**: `category/tools.html` (新頁面), `assets/js/tools-logic.js` (新檔案), 相關 CSS
**詳細說明**: 
此任務旨在透過提供實用工具來實現「工具導向成長 (Tool-Led Growth)」策略，並藉由長停留時間與外連提升 SEO 表現。

**A. 魚油 CP 值計算機**
1.  **功能**:
    *   輸入欄位：魚油產品價格 (總價)、膠囊總顆數、每顆膠囊 EPA+DHA 總毫克數。
    *   計算結果：每單位 EPA+DHA 的成本 (例如：每 1000mg EPA+DHA 的成本)。
2.  **技術實現**:
    *   簡單的 HTML 表單。
    *   JavaScript 進行計算和結果顯示。
    *   考慮加入簡單的驗證，確保輸入為有效數字。

**B. 每日咖啡因耐受度計算機**
1.  **功能**:
    *   輸入欄位：使用者體重 (公斤)。
    *   計算結果：
        *   基於體重的建議每日咖啡因上限 (例如：每公斤體重 3-6mg)。
        *   將此上限換算成常見飲品 (如：美式咖啡、拿鐵) 的杯數，並標示「爆表」警告。
2.  **技術實現**:
    *   簡單的 HTML 表單。
    *   JavaScript 進行計算和結果顯示。
    *   需定義常見飲品的咖啡因含量參考值。

**C. 頁面整合與 SEO**
1.  **新工具頁面**: 建立一個新的 HTML 頁面，例如 `category/tools.html`，用於展示這兩個工具。
2.  **樣式**: 確保工具的 UI/UX 設計簡潔、易用，並符合網站整體風格。
3.  **SEO 考量**:
    *   確保頁面有適當的 `title`, `description`, `keywords`。
    *   考慮加入 JSON-LD structured data (例如 `WebPage`, `HowTo` 等，若適用)。
    *   頁面內容應簡要介紹工具的用途與健康建議。

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


