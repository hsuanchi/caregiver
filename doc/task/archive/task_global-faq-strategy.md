# 任務名稱：全站 FAQ 內容擴展與結構升級 (GLOBAL-FAQ-EXPANSION-STRATEGY)

**狀態**: `已完成`
**負責人**: @[團隊成員] (請指派)
**相關文件**: `doc/task/todo.md`

---

## 高效率 FAQ 建立流程 (Modular & High-Efficiency FAQ Workflow)

**核心原則**: 以「小單位、模組化、高效率」為核心，確保在擴展至 20 個問答對時，仍能維持高品質的內容與 SEO 結構。

### Step 1: 模組化內容生成 (Modular Content Mapping)
為了確保 20 個問題能全面覆蓋讀者需求，採用以下 **5 大模組分類法** 進行內容開發：
- **A. 基礎知識 (Basics)**: 定義、成分與運作機制 (建議 5-6 題)。
- **B. 功效解析 (Benefits)**: 具體健康效益、複方搭配效果 (建議 5-6 題)。
- **C. 攝取建議 (Usage)**: 時機、劑量、天然與補充品比較 (建議 3-4 題)。
- **D. 安全與禁忌 (Safety)**: 副作用、藥物干擾、特殊情況處理 (建議 3-4 題)。
- **E. 特定族群 (Populations)**: 不同年齡或生活型態的特定建議 (建議 2-3 題)。

### Step 2: 結構化標註與 ID 規範 (Structured ID Pattern)
每個 `.faq-item` 必須具備唯一且具描述性的 `id`（支持深層連結與 Google 深層搜尋）：
- **命名規範**: `faq-[主題]-[序號]` (例如: `faq-benefit-1`, `faq-safety-2`)。
- **優勢**: 使用者可從搜尋結果直接導向特定答案，提升 SEO 權威度。

### Step 3: SEO 數據同步 (JSON-LD Sync)
確保視覺內容與 `FAQPage` JSON-LD 結構化資料完全同步。建議先完成內容對應表，再一次性更新 HTML 與 JSON-LD，減少人工對齊負擔。

### Step 4: 階層化框架選擇 (Hierarchy Choice)
根據內容複雜度選擇合適的視覺架構：
- **兩層式 (標準版)**: `<h3>` 分類標題 -> `.faq-item`。
- **三層式 (Hub/專題版)**: `<h3>` (Category) -> `<h4>` (Subcategory) -> `.faq-item`。

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

- [x] post/amino-acids.html
- [x] post/anthocyanins.html
- [x] post/beta-glucan.html
- [x] post/calcium.html
- [x] post/chondroitin.html
- [x] post/chromium.html
- [x] post/coenzyme-q10.html
- [x] post/collagen.html
- [x] post/copper.html
- [x] post/curcumin.html
- [x] post/dietary-fiber.html
- [x] post/fish-oil.html
- [x] post/fluoride.html
- [x] post/folic-acid.html
- [x] post/gaba.html
- [x] post/garlic.html
- [x] post/glucosamine.html
- [x] post/glutathione.html
- [x] post/iodine.html
- [x] post/iron.html
- [x] post/lutein.html
- [x] post/lycopene.html
- [x] post/magnesium.html
- [x] post/manganese.html
- [x] post/official-health-sites.html
- [x] post/phosphorus.html
- [x] post/plant-sterols.html
- [x] post/potassium.html
- [x] post/prebiotics.html
- [x] post/probiotics.html
- [x] post/protein.html
- [x] post/review-fish-oil.html (部分完成)
- [x] post/selenium.html
- [x] post/sodium.html
- [x] post/topic-cardiovascular-health.html (已完成)
- [x] post/topic-immune-boosting-nutrients.html
- [x] post/topic-stroke-prevention-nutrients.html
- [x] post/topic-vascular-health-superfoods.html
- [x] post/vitamin-a.html
- [x] post/vitamin-b.html
- [x] post/vitamin-c.html
- [x] post/vitamin-d.html
- [x] post/vitamin-e.html
- [x] post/vitamin-k.html
- [x] post/vitamin-k2.html
- [ ] post/zinc.html

## 5. 第二階段：全站 FAQ 20 題深度優化 (Phase 2: 20-FAQ Expansion)

**重點目標**: 依照鋅 (Zinc) 頁面的標竿模式，將所有頁面的 FAQ 擴展至 20 題，包含 5 大模組分類與 JSON-LD 同步。

### 執行順序與分組 (Batch Priority)

為了維持高效，將頁面分為以下批次執行：

#### Batch 1: 高流量核心營養素 (Core Nutrients)
- [x] post/zinc.html (Demo 完成)
- [ ] post/fish-oil.html
- [ ] post/vitamin-d.html
- [ ] post/vitamin-c.html
- [ ] post/magnesium.html
- [ ] post/protein.html

#### Batch 2: 維生素與礦物質家族 (Vitamins & Minerals)
- [ ] post/vitamin-a.html
- [ ] post/vitamin-b.html
- [ ] post/vitamin-e.html
- [ ] post/vitamin-k.html
- [ ] post/vitamin-k2.html
- [ ] post/calcium.html
- [ ] post/iron.html
- [ ] post/selenium.html

#### Batch 3: 特殊機能營養素 (Functional Nutrients)
- [ ] post/lutein.html
- [ ] post/coenzyme-q10.html
- [ ] post/curcumin.html
- [ ] post/probiotics.html
- [ ] post/collagen.html

## 6. 執行紀錄 (Execution Log)

- **2025-12-18**: 確立「Phase 2: 20-FAQ 擴展計畫」。
- **2025-12-18**: 完成 `post/zinc.html` 作為 Phase 2 首篇標竿示範，達成 20 題模組化擴展與 JSON-LD 同步。
- **2025-12-18**: 確立「每個項目獨立 ID」與「三層式 Hub 結構」為標準 FAQ 策略。
- **2025-12-17**: 優化 `post/topic-cardiovascular-health.html`，完成內容擴充、三層式結構。

## 7. 後續修復紀錄 (Follow-up Fix Log)

### 7.1. TOC 目錄連結修復 (TOC-LINK-REPAIR)
- **完成日期**: 2025-12-18
- **目標**: 修復因「FAQ 內容擴展」後，部分頁面側邊欄目錄 (TOC) 中「常見問題」連結失效的問題。
- **執行內容**:
    - 全面檢查了所有已擴展 FAQ 的頁面。
    - 修正了 TOC 中 `<a>` 標籤的 `href` 屬性，確保其準確指向 `<h2>常見問題</h2>` 標題的 `id` (`faq-main-title`)。
    - 為部分遺失結構的頁面補全了 TOC 連結或對應的 `<h2>` 標題，確保了全站結構的一致性。
- **結果**: 所有相關頁面的 TOC 連結均已修復並可正常運作。
