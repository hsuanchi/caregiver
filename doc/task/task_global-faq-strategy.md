# 任務名稱：全站 FAQ 內容擴展與結構升級 (GLOBAL-FAQ-EXPANSION-STRATEGY)

**狀態**: `規劃中`
**負責人**: @[團隊成員] (請指派)
**相關文件**: `doc/task/todo.md`

---

## 1. 任務目標 (Objective)

將所有主要文章 (`post/*.html`) 的 FAQ 區塊，系統性地擴展並升級為一個內容全面、結構清晰、且對搜尋引擎友善的問答系統，以提升頁面的專業深度與 SEO 表現。

## 2. 執行方案 (SOP)

**執行原則**: 為避免單次修改範圍過大，強烈建議以「單一文章頁面」或「單一 FAQ 分類」作為最小執行單元，分階段、逐一完成以下所有步驟。

### Step 1: 內容生成 (Content Generation)
- **方法**: 分析目標文章的內容，使用 5W1H 框架（What, Why, How, Who, When）進行地毯式提問。
- **要求**: 需包含「自問自答」式的深度問題，以預測並解答讀者尚未提出的疑惑。

### Step 2: 內容分類 (Categorization)
- **方法**: 將生成的所有問題，歸納為多個主題導向或族群導向的分類。
- **範例**: 「核心觀念」、「關鍵營養素」、「不同年齡層」等。

### Step 3: UI 結構與實作 (UI Implementation)
- **主分類**: 使用 `<h3 class="faq-category-title">` 作為標題。
- **問答對**: 所有問答皆須使用標準的 accordion 結構 (`<div class="faq-item">` 包含 `.faq-question` 和 `.faq-answer`)。
- **樣式檢查**: 確保目標頁面已包含必要的 CSS 樣式，若無，需從 `@post/00template.html` 複製。

### Step 4: SEO 優化與錨點連結 (SEO & Linking)
- **4.1. 添加獨立 ID (Anchor IDs)**:
    - **目標**: 讓每個問答都能被獨立連結，實現從 Google 搜尋結果直接跳轉。
    - **動作**: 為每個 `.faq-item` 元素，添加一個全頁唯一的 `id` 屬性，格式為 `id="faq-{分類}-{編號}"`。
- **4.2. 建立內部連結**:
    - 在答案的內文中，為關鍵字加上頁面內部 (`#id-name`) 或外部 (`/folder/page.html`) 的連結。

### Step 5: 結構化資料 (Structured Data)
- **目標**: 讓 Google 能夠讀懂 FAQ 內容，並在搜尋結果中以「複合式摘要」的形式展示。
- **動作**:
    - a. 掃描頁面中所有已添加 `id` 的 FAQ 項目，提取問題與答案的文字內容。
    - b. 根據提取的內容，按照 Schema.org 的 `FAQPage` 規範，生成一個完整的 JSON-LD 物件。
    - c. 將生成的 JSON-LD 包裝在 `<script type="application/ld+json">` 標籤中，並插入到頁面 `<head>` 的結尾處。

### Step 6: 優化排版 (Layout Optimization)
- **條件**: 若擴充後的 FAQ 總問題數超過 10 個。
- **動作**: 適度縮小 `.faq-question` 和 `.faq-answer` 的 `font-size`（例如：`1.05em` 和 `0.95em`），以優化版面密度。

---
## 3. 執行範圍 (Execution Scope)

以下為預計需要執行此 FAQ 優化策略的文章頁面清單。

- [ ] post/amino-acids.html
- [ ] post/anthocyanins.html
- [ ] post/beta-glucan.html
- [ ] post/calcium.html
- [ ] post/chondroitin.html
- [ ] post/chromium.html
- [ ] post/coenzyme-q10.html
- [ ] post/collagen.html
- [ ] post/copper.html
- [ ] post/curcumin.html
- [ ] post/dietary-fiber.html
- [ ] post/fish-oil.html
- [ ] post/fluoride.html
- [ ] post/folic-acid.html
- [ ] post/gaba.html
- [ ] post/garlic.html
- [ ] post/glucosamine.html
- [ ] post/glutathione.html
- [ ] post/iodine.html
- [ ] post/iron.html
- [ ] post/lutein.html
- [ ] post/lycopene.html
- [ ] post/magnesium.html
- [ ] post/manganese.html
- [ ] post/official-health-sites.html
- [ ] post/phosphorus.html
- [ ] post/plant-sterols.html
- [ ] post/potassium.html
- [ ] post/prebiotics.html
- [ ] post/probiotics.html
- [ ] post/protein.html
- [x] post/review-fish-oil.html (部分完成)
- [ ] post/selenium.html
- [ ] post/sodium.html
- [x] post/topic-cardiovascular-health.html (已完成)
- [ ] post/topic-immune-boosting-nutrients.html
- [ ] post/topic-stroke-prevention-nutrients.html
- [ ] post/topic-vascular-health-superfoods.html
- [ ] post/vitamin-a.html
- [ ] post/vitamin-b.html
- [ ] post/vitamin-c.html
- [ ] post/vitamin-d.html
- [ ] post/vitamin-e.html
- [ ] post/vitamin-k.html
- [ ] post/vitamin-k2.html
- [ ] post/zinc.html

## 4. 執行紀錄 (Execution Log)

- **2025-12-17**: 優化 post/topic-cardiovascular-health.html，完成內容擴充、三層式結構、樣式簡化、錨點添加與 JSON-LD 生成。
- **YYYY-MM-DD**: ...






