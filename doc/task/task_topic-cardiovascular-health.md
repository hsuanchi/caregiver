# 任務名稱：核心主題戰略：心血管健康戰情室 (Cardiovascular Hub Strategy)

**狀態**: `規劃中`
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
- **頁面建構**: 執行「內容合成與導航頁建構 (Content Synthesis & Hub Construction)」，產出一個靜態的 `topic-cardiovascular-health.html` 頁面。
- **頁面範本**: **使用 `post/fish-oil.html` 作為新頁面的基礎範本**，以確保樣式與結構的一致性。
- **核心策略**: 內部連結 (Internal Linking) 是此頁面的關鍵，目標是作為流量中樞 (Hub)，將使用者分流至各個細分的輻射頁面 (Spoke)。
- **互動工具**: 考慮使用 JavaScript 或嵌入式 iframe 整合「魚油劑量計算機」或「心血管風險評估」等小型應用，以提升使用者參與度。

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
- [ ] **挖掘「反直覺洞察」**: 找出文件中顛覆大眾認知的研究結果或觀點，作為文章引子 (Hook)。
- [ ] **建立「工程師保養協議」**: 設計一套包含基礎與進階配置的「心血管保養最佳化流程」。

### Phase 2: 核心文章架構 (Hub Page Construction)
- [v] **建立頁面檔案**: 複製 `post/fish-oil.html` 為 `post/topic-cardiovascular-health.html` 並清除範本內容，僅保留結構。
- [ ] **定義頁面結構**: 在 `topic-cardiovascular-health.html` 中，建立 H2、H3 等標題，完成文章的基礎結構。

H1: 心血管健康地圖：看懂症狀、病因與修復方案
    H2: 1. 身體儀表板：你的血管亮紅燈了嗎？
        H3: ⚠️ 訊號 A：管路淤積 (Perfusion Deficit)
        H3: ⚠️ 訊號 B：馬達無力與壓力過載 (Pump Failure)

    H2: 2. 三大核心故障原因 (Root Cause Analysis)
        H3: 1. 發炎與斑塊 (Atherosclerosis)
        H3: 2. 血管鈣化 (Vascular Calcification)
        H3: 3. 生物能量匱乏 (Mitochondrial Dysfunction)

    H2: 3. 修復工程：精準營養介入
        H3: 3.1 血管清道夫：抗發炎與溶栓 (Target: TG / Fibrin)
        H3: 3.2 彈性修復師：逆轉鈣化 (Target: MGP Protein)
        H3: 3.3 心臟電池：粒線體賦活 (Target: Electron Transport Chain)

H2: 📝 實用營養工具 (Tools)



- [ ] **撰寫執行摘要**: 強調核心觀點（發炎與氧化問題），並呈現關鍵數據圖表。
- [ ] **建立痛點檢測站**: 以情境條列方式，引導使用者至對應的營養素或評測文章。
- [ ] **建立核心解決方案區塊**: 
    - [ ] Level 1: 基礎建設 (魚油)，並強力導流至魚油評測與計算機。
    - [ ] Level 2: 動能強化 (輔酶 Q10)，並導流至 Q10 挑選指南。
    - [ ] Level 3: 管路維護 (鎂 & 鉀)。
- [ ] **規劃互動工具區**: 確定互動工具（如計算機）的嵌入位置與方式。

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
- [ ] 頁面通過 W3C HTML 驗證，無嚴重錯誤。

## 6. 關鍵指標 (Key Metrics / KPIs)

- **流量指標**:
    - `頁面瀏覽量 (Page Views)`: 衡量頁面的總體觸及範圍。
    - `不重複訪客數 (Unique Visitors)`: 了解觸及的獨立使用者數量。
- **參與度指標**:
    - `平均停留時間 (Average Time on Page)`: 評估內容對使用者的吸引力。
    - `跳出率 (Bounce Rate)`: 觀察使用者是否在未進行任何互動前就離開。
- **導流成效指標**:
    - `輻射頁面點擊率 (Spoke Page CTR)`: 衡量導航頁將流量導向評測頁面的效率。
    - `互動工具使用率 (Tool Engagement Rate)`: 如適用，追蹤計算機等工具的使用次數。

## 7. SEO 與推廣策略 (SEO & Promotion Strategy)

- **關鍵字策略**:
    - **核心關鍵字**: `心血管健康`, `心血管保養`, `心血管疾病`
    - **長尾關鍵字**: `心血管保健食品推薦`, `預防心血管疾病`, `魚油 Q10 功效`
- **On-Page SEO**:
    - **Meta 標題**: 撰寫具吸引力且包含核心關鍵字的標題 (60字以內)。
    - **Meta 描述**: 撰寫能總結頁面價值並吸引點擊的描述 (160字以內)。
    - **結構化資料 (Schema Markup)**: 考慮使用 `Article` 或 `FAQPage` Schema 增強搜尋結果呈現。
- **推廣計畫**:
    - 內容發布後，透過電子報 (Newsletter)、社群媒體 (Facebook, Line) 等渠道進行第一波推廣。