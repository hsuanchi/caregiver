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

### [待辦] 首頁整合儀表板功能 (HOMEPAGE-DASHBOARD-INTEGRATION)

**主要目標**: 將 `category/nutrient-dashboard.html` 的功能修改後，移植到首頁，呈現科技與數據感。
**相關檔案**: `index.html`, `category/nutrient-dashboard.html`, `assets/js/dashboard-logic.js`
**詳細說明**: 此任務對應 `INTEGRATE_DASHBOARD_TO_HOMEPAGE.md` 的規劃。需要將現有儀表板邏輯重構為一個獨立的、可嵌入的 Shadow DOM 組件。

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

### [規劃中] 心血管健康工具擴充與全站整合 (CARDIO-TOOLS-EXPANSION)

**主要目標**: 將專業評估工具（ASCVD, Na:K Ratio, Zone 2）與專業洞察卡片 (Insight Cards) 整合至**所有相關 `post/` 頁面**。
**相關檔案**: `category/tools.html`, `assets/js/tools-JS/*.js`, `post/*.html`
**詳細說明**: 
1. **工具開發**: 已完成 ASCVD、鈉鉀比、Zone 2 計算機開發。
2. **全站審核與優化**: 逐一檢查所有 `post/` 頁面，針對具有心血管相關聯性的營養素（如魚油、維生素 K2、鎂等）嵌入對應工具或「專業洞察卡」。
3. **內鏈結構**: 確保每個工具在相關文章中皆有正確的跳轉錨點與導流連結，強化內容深度。

### [進行中] 全站 FAQ 20 題模組化擴展計畫 (GLOBAL-FAQ-EXPANSION)

**主要目標**: **對全站所有 `post/` 文章進行補充檢查**，並將其 FAQ 擴展至 20 題，落實 5 大模組分類與 JSON-LD 同步。
**相關檔案**: `post/*.html`, `doc/task/archive/task_global-faq-strategy.md`
**詳細說明**: 
1. **全站優化**: 針對所有文章落實 A-E 五大模組（基礎、功效、用法、安全、族群），確保每個問答皆有獨立 ID 與深層連結支援。
2. **Batch 1 (核心營養素)**: 鋅 (已完成), 魚油 (已完成), 維生素 D, 維生素 C, 鎂, 蛋白質。
3. **Batch 2 (維家族)**: 維生素 A, B, E, K, K2, 鈣, 鐵, 硒。
4. **Batch 3 (機能類)**: 葉黃素, Q10, 薑黃,益生菌, 膠原蛋白。
5. **Batch 4 (全站剩餘文章)**: 逐篇檢查其餘所有 post 文章並完成 20 題優化。

### [待辦] 導覽標記 (Breadcrumb) 專業化優化 (BREADCRUMB-OPTIMIZATION)

**主要目標**: 重構網站導覽系統，達成 2024-2025 專業 SEO (JSON-LD) 與無障礙 (WAI-ARIA) 標準。
**相關檔案**: `post/00template.html`, `post/*.html`, `doc/task/task_breadcrumb-optimization.md`
**詳細說明**: 
1. **標準重構**: 採用 `<nav aria-label="Breadcrumb">` 與 `<ol>` 語義化結構，並由 JSON-LD `BreadcrumbList` 同步數據。
2. **無障礙優化**: 加入 `aria-current="page"` 標註，確保螢幕閱讀器正確辨識，且當前頁面不連結回自身。
3. **全站導入**: 從 `00template.html` 開始標準化，並分批將此結構導入全站所有文章頁面。
