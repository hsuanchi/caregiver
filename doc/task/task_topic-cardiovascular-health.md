# 任務名稱：核心主題戰略：心血管健康戰情室 (Cardiovascular Hub Strategy)

**狀態**: `已完成`
**負責人**: @[團隊成員] (請指派)
**預計完成日期**: 
**相關連結**: `post/topic-cardiovascular-health.html`

---

## 1. 任務目標 (Objective)

建立一個權威性的「心血管健康導航頁」，該頁面旨在深度教育使用者關於心血管健康的知識，並將流量精準地導向高轉換率的單品評測頁面（如魚油、輔酶Q10）。此任務的價值在於建立主題權威性、提升使用者參與度，並最終增加潛在的商業收益。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案
- **內容生成**: 透過 NotebookLLM 進行提示工程 (Prompt Engineering)，從以下三份指定報告中合成核心內容：
    - `doc/Drafts/心血管保健食品全攻略.md`
    - `doc/Drafts/心血管疾病：症狀、病因與解決方案.md`
    - `doc/Drafts/心血管營養素研究詳解.md`
- **頁面建構**: **使用 `post/00template.html` 作為新頁面的基礎範本**，以確保樣式與結構的乾淨與一致性。
- **核心策略**: 內部連結 (Internal Linking) 是此頁面的關鍵，目標是作為流量中樞 (Hub)，將使用者分流至各個細分的輻射頁面 (Spoke)。
- **互動設計**: **優先使用 `doc/writing-guide.md` 中定義的標準化 UI 元件** (如 `.quick-test`, `.step-guide-container`, `.dosage-infographic-container`) 來提升使用者參與度，而非自訂 JavaScript 或 iframe。

### 2.2. 檔案結構

```
caregiver/
└── post/
    ├── 00template.html                  (作為範本)
    └── topic-cardiovascular-health.html   (新增)
```

## 3. 任務拆解 (Task Breakdown)

### Phase 1: 內容與結構規劃
- [x] **定義文章結構與標題**: 依據下方 Phase 2 的規劃，建立 H1, H2, H3 的完整文章骨架。
- [x] **規劃內容與 UI 對應**: 將每個章節的內容，明確對應到 `writing-guide.md` 中最適合的 UI 元件。
- [x] **提取核心內容**: 根據指定文件，整理出心血管健康的常見痛點、對應營養素、建議劑量、以及具吸引力的「反直覺洞察」作為內容素材。

### Phase 2: 頁面建構與 UI 實作
- [x] **建立頁面檔案**: 複製 `post/00template.html` 為 `post/topic-cardiovascular-health.html`。
- [x] **撰寫執行摘要與引言**: 在 H1 後，撰寫引人入勝的開頭，強調核心觀點（如：發炎與氧化問題），並呈現關鍵數據圖表。
- [x] **實作文章核心結構與 UI 元件**: 

    **H1: 心血管健康地圖：看懂症狀、病因與完整修復方案**

    **H2: 1. 身體儀表板：你的血管亮紅燈了嗎？**
    - **實作方式**: 使用 **`<div class="quick-test">` (互動式需求檢測)** 元件。
    - **內容**: 列出 4-6 個常見的早期警訊（如：不明原因的疲勞、爬樓梯會喘、手腳冰冷、健檢紅字），引導使用者自我評估。

    **H2: 2. 三大核心故障原因 (Root Cause Analysis)**
    - **實作方式**: 使用 **`<div class="info-cards md-grid-3">`**。
    - **內容**: 將「發炎與斑塊」、「血管鈣化」、「生物能量匱乏」製作成三張資訊卡片，清晰解釋每個根本原因。

    **H2: 3. 修復工程：精準營養介入的黃金三步驟**
    - **實作方式**: 使用 **`<div class="step-guide-container">` (步驟指南)**。
    - **內容**: 
        - **第一步：基礎建設 (滅火與清淤)**：主打「魚油」，並強力導流至魚油評測頁。
        - **第二步：動能強化 (提升效率)**：主打「輔酶 Q10」，並導流至 Q10 挑選指南。
        - **第三步：管路維護 (預防堵塞)**：主打「鎂 & 鉀」，並連結至對應的營養素頁面。

    **H2: 4. 各族群的精準劑量建議**
    - **實作方式**: 使用 **`<div class="dosage-infographic-container">` (視覺化劑量圖)**。
    - **內容**: 為「日常保養族」、「高壓工程師」、「健檢紅字族」等不同族群，提供視覺化的營養素（EPA/DHA, Q10）建議劑量圖。

    **H2: 5. 常見問題 (FAQ)**
    - **實作方式**: 使用標準的 FAQ HTML 結構，並確保加上 `FAQPage` Schema。
    - **內容**: 回答 PAA (People Also Ask) 中的熱門問題。

### Phase 3: 內容撰寫與發布前檢查
- [x] **填寫內容**: 將 Phase 1 產生的內容素材填入對應的 UI 元件區塊中。
- [x] **使用標準提示框**: 在適當位置使用如 `<div class="alert alert-doctor">` 或 `<div class="alert alert-tip">` 來強調重點。
- [x] **實作內部連結策略**: 確保所有提及特定營養素或產品的地方，都已正確連結至對應的輻射頁面。
- [x] **完成 SEO 設定**: 填寫 `<title>`, `<meta name="description">`，並實作 `Article` 與 `BreadcrumbList` JSON-LD。

## 4. 影響評估 (Impact Assessment)

- **Breaking Changes**: 無。本次為新增內容頁面，不會影響現有功能。
- **相依性**: 本任務的成效高度相依於各「輻射頁面」(Spoke Pages) 的完成度。

## 5. 驗收標準 (Acceptance Criteria)
- [x] `topic-cardiovascular-health.html` 頁面已建立，且基於 `00template.html`。
- [x] 頁面結構符合 Phase 2 中定義的架構，並正確使用了 `.quick-test`, `.step-guide-container`, `.dosage-infographic-container` 等標準元件。
- [x] 頁面中的所有「行動呼籲」(Call-to-Action) 連結皆能正確指向指定的輻射頁面。
- [x] 頁面在視覺上符合設計規範，包含正確使用 `.alert` 提示框。
- [x] 頁面已完成 On-Page SEO 與 JSON-LD 結構化資料設定。
- [x] 頁面通過 W3C HTML 驗證，無嚴重錯誤。

## 6. 關鍵指標 (Key Metrics / KPIs)
- **流量指標**: `頁面瀏覽量`, `不重複訪客數`
- **參與度指標**: `平均停留時間`, `互動元件使用率`
- **導流成效指標**: `輻射頁面點擊率 (Spoke Page CTR)`

## 7. SEO 與推廣策略 (SEO & Promotion Strategy)
- **核心關鍵字**: `心血管健康`, `心血管保養`, `心血管疾病`
- **長尾關鍵字**: `心血管保健食品推薦`, `預防心血管疾病`, `魚油 Q10 功效`
- **On-Page SEO**: `Meta 標題`, `Meta 描述`, `結構化資料 (Article, FAQPage)`
- **推廣計畫**: 內容發布後，透過電子報 (Newsletter)、社群媒體 (Facebook, Line) 等渠道進行推廣。


### Phase 4: 深度內容擴充 (Deep Content Enrichment)
- [x] **分析研究報告**: 讀取並分析 `心血管保健食品全攻略`, `症狀、病因與解決方案`, `營養素研究詳解` 三份草稿。
- [x] **設計 UI 組件**: 實作 `Collapsible Info Card` (可折疊資訊卡)，用於收納艱深內容。
- [x] **內容注入**: 將專業知識轉化為資訊卡格式，插入至對應章節 (病因分析、營養素詳解等)。

### Phase 5: UI 標準化與修復 (Standardization & Fixes)
- [x] **移除實驗性風格**: 移除導致視覺不一致的 Glassmorphism CSS，回歸 Rose Theme 標準。
- [x] **HTML 結構修復**: 修正巢狀表格與標籤缺失導致的破版問題。
- [x] **組件還原**: 確保 System Diagnostics Map 與 Flowchart 在新版 CSS 下正常顯示。

### Phase 6: 深度內容整合與專業化 (Deep Content Integration & Professionalization)
- [x] **系統性分析草稿**: 重新深度閱讀 `心血管保健食品全攻略`, `心血管疾病：症狀、病因與解決方案`, `心血管營養素研究詳解` 三份草稿。
- [x] **提取專業知識**: 提取適合進階讀者的詳細機制、臨床數據、藥物動力學等複雜資訊。
- [x] **逐步內容注入**: 將提取的專業內容，分階段、有系統地整合進 `post/topic-cardiovascular-health.html` 的對應章節。
- [x] **使用 Insight Card 封裝**: **強制要求**將所有注入的、高度技術性或複雜的知識點，使用 `<details class="professional-insight-card">` 元件進行收納，以維持主文的流暢與易讀性。
- [x] **確保上下文連貫**: 確保新加入的「專業洞察卡片」與其所在章節的上下文邏輯相符、位置得當。

- [x] **擴展 FAQ 區塊至多層次用戶導向問答 (Expand FAQ to Multi-layered User-Oriented Q&A)**
- [x] **導入 FAQ 區塊所需 CSS 樣式**:
  -   從 `00template.html` 複製 FAQ 相關 CSS 規則到 `post/topic-cardiovascular-health.html` 的 `<style>` 區塊。
  -   包含 `.faq-section`, `.faq-category-title`, `.faq-item`, `.faq-question`, `.faq-answer` 等，特別是控制 `max-height` 和 `transform` 的規則，以啟用手風琴互動效果。
- [x] **修正 FAQ 內容格式與字型大小**:
  -   將現有 FAQ 內容調整為符合 `00template.html` 的正確 HTML 結構 (`<div class="faq-item">` 包含 `<div class="faq-question">` 和 `<div class="faq-answer">`)。
  -   調整 `.faq-question` 字型大小為 `1.05em`，`.faq-answer p, .faq-answer ul` 字型大小為 `0.95em`。
- [x] **擴充 FAQ - 第一階段 (年齡層)**:
  -   新增「E. 不同年齡層的提醒」分類及其問答。
- [x] **擴充 FAQ - 第二階段 (生活型態)**:
  -   新增「F. 不同生活型態的策略」分類及其問答。
- [x] **擴充 FAQ - 第三階段 (健康狀況)**:
  -   新增「G. 不同健康狀況的考量」分類及其問答。
- [x] **驗證 FAQ 互動功能**:
  -   確認所有 FAQ 項目都能正確點擊展開/收合。
  -   檢查所有內部錨點連結和頁面連結是否正常運作。



### Phase 7: FAQ 擴充與結構優化 (FAQ Expansion & Structure Refinement)
- [x] **擴充 FAQ 內容**: 為 A-G 所有七個分類，各新增至少五個以上的問答，深化內容廣度與深度。
- [x] **重構 FAQ 結構**: 將「E. 不同年齡層的提醒」區塊，從平面結構重構為「青少年」、「中壯年」、「老年」的三層式巢狀結構。
- [x] **實現巢狀收合功能**: 為新的三層式結構加入對應的 CSS 與 JavaScript，讓第二層（年齡分類）與第三層（問答項目）都能獨立收合。
- [x] **簡化 FAQ 樣式**: 根據使用者回饋，移除次分類的背景色與左側邊框，回歸以字體大小和縮排為主的極簡風格，提升頁面簡潔度。
