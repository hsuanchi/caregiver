# 任務名稱：全站 FAQ 內容擴展與結構升級 (GLOBAL-FAQ-EXPANSION-STRATEGY)

**狀態**: `規劃中`
**負責人**: @[團隊成員] (請指派)
**相關文件**: `doc/task/todo.md`

---

## 簡潔有效的 FAQ 建立流程 (Simplified & Efficient FAQ Creation Workflow)

**核心原則**: 專注於內容生成、站內連結優化及結構化資料，忽略 UI 格式的嚴格檢查，以內容完整度和功能性為優先。

### Step 1: 內容生成與組織 (Content Generation & Organization)
-   **a. FAQ 內容撰寫**: 分析目標文章內容，運用 5W1H 框架，撰寫至少 10 個高品質的問答對。
-   **b. 內容分組與二層式框架**: 將所有問題依據主題或類型，歸納為清晰的「兩層式分類框架」。確保相同類型的問題在同一分類層級下。在 HTML 結構中，建議使用 `<h3>` 標籤作為主要分類標題。

### Step 2: 內部連結優化 (Internal Linking Optimization)
-   在 FAQ 答案中，為關鍵字或相關概念添加連結，提升文章的內部關聯性與使用者體驗。
-   **連結類型**:
    -   **頁面內部錨點**: 連結至當前文章的其他相關區塊 (例如 `#section-id`) 或其他 FAQ 問答項目 (例如 `#faq-basic-1`)。
    -   **其他站內頁面**: 連結至 `post/` 下的文章 (例如 `/post/protein.html`) 或 `food/` 下的食物頁面 (例如 `/food/chicken_breast.html`)。
-   **連結原則**: 確保連結的相關性與語義的準確性。避免過度連結，每個連結都應有助於讀者獲取更多資訊。



### Step 3: 排版微調 (Layout Fine-tuning)
-   **條件性調整**: 若擴充後的 FAQ 數量過多（例如超過 10 個），可考慮適度調整 `.faq-question` 和 `.faq-answer` 的 `font-size`，以優化版面密度和閱讀體驗。

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
