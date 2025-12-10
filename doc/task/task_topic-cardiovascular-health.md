# 任務名稱：核心主題戰略：心血管健康戰情室 (Cardiovascular Hub Strategy)

**狀態**: `規劃中`
**負責人**: @[團隊成員]
**預計完成日期**: 
**相關連結**: `post/topic-cardiovascular-health.html`

---

## 1. 任務目標 (Objective)

建立一個權威性的「心血管健康導航頁」，該頁面旨在深度教育使用者關於心血管健康的知識，並將流量精準地導向高轉換率的單品評測頁面（如魚油、輔酶Q10）。此任務的價值在於建立主題權威性、提升使用者參與度，並最終增加潛在的商業收益。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案
- **內容生成**: 透過 NotebookLLM 進行提示工程 (Prompt Engineering)，從以下三份指定報告中合成核心內容：
    - `doc\Drafts\心血管保健食品全攻略.md`
    - `doc\Drafts\心血管疾病：症狀、病因與解決方案.md`
    - `doc\Drafts\心血管營養素研究詳解.md`    
- **頁面建構**: 執行「內容合成與導航頁建構 (Content Synthesis & Hub Construction)」，產出一個靜態的 `topic-cardiovascular-health.html` 頁面。
- **頁面範本**: **使用 `post/fish-oil.html` 作為新頁面的基礎範本**，以確保樣式與結構的一致性。
- **核心策略**: 內部連結 (Internal Linking) 是此頁面的關鍵，目標是作為流量中樞 (Hub)，將使用者分流至各個細分的輻射頁面 (Spoke)。

### 2.2. 檔案結構

```
caregiver/
└── post/
    ├── fish-oil.html                  (作為範本)
    └── topic-cardiovascular-health.html  (新增/修改)
```

## 3. 任務拆解 (Task Breakdown)

### Phase 1: 內容生成 (Prompt Engineering)
- [ ] **提取「痛點與解法」矩陣**: 根據文件，整理出心血管健康的常見痛點、對應的關鍵營養素及建議劑量。
- [ ] **挖掘「反直覺數據」**: 找出文件中顛覆大眾認知的研究結果，作為文章引子。
- [ ] **建立「工程師保養協議」**: 設計一套包含基礎與進階配置的「心血管保養最佳化流程」。

### Phase 2: 核心文章架構 (Hub Page Construction)
- [ ] **建立頁面骨架**: 在 `topic-cardiovascular-health.html` 中，建立 H2、H3 等標題，完成文章的基礎結構。
- [ ] **撰寫執行摘要**: 強調核心觀點（發炎與氧化問題），並呈現關鍵數據圖表。
- [ ] **建立痛點檢測站**: 以情境條列方式，引導使用者至對應的營養素或評測文章。
- [ ] **建立核心解決方案區塊**: 
    - [ ] Level 1: 基礎建設 (魚油)，並強力導流至魚油評測與計算機。
    - [ ] Level 2: 動能強化 (輔酶 Q10)，並導流至 Q10 挑選指南。
    - [ ] Level 3: 管路維護 (鎂 & 鉀)。
- [ ] **整合互動工具區**: 嵌入心血管風險快篩或魚油計算機。

### Phase 3: 撰寫與排版
- [ ] **填寫內容**: 將 Phase 1 產生的內容素材填入對應的頁面區塊。
- [ ] **善用強調區塊 (Callout Blocks)**: 使用 Note 或 Warning 區塊來強調重點資訊。
- [ ] **實作內部連結策略**: 確保所有提及特定營養素或產品的地方，都正確連結至對應的輻射頁面，而非在導航頁中詳述。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 無。
- **原因**: 本次修改為新增內容頁面，不會對現有功能造成破壞性變更。

### 相依性

- 本任務的成效高度相依於各「輻射頁面」(Spoke Pages) 的完成度，例如「魚油評測」、「Q10 挑選指南」等。

## 5. 驗收標準 (Acceptance Criteria)

- [ ] `topic-cardiovascular-health.html` 頁面已建立。
- [ ] 頁面結構符合任務拆解 Phase 2 中定義的架構。
- [ ] 頁面中的「行動呼籲」(Call-to-Action) 連結皆能正確指向指定的輻射頁面。
- [ ] 從 NotebookLLM 產生的內容已正確整合至頁面中。
- [ ] 頁面在視覺上符合設計規範，包含正確使用 Callout Blocks。
