# 任務名稱：開發健康計算機工具箱與心血管工具擴充 (TOOL-LED-GROWTH & CARDIO-TOOLS-EXPANSION)

**狀態**: `已完成`
**負責人**: @Antigravity
**相關連結**: 
- [Health Tools Hub Page](file:///c:/Users/烈日千陽/caregiver/category/tools.html)
- [Caffeine Calculator Implementation Plan](file:///C:/Users/烈日千陽/.gemini/antigravity/brain/3ac0b35f-99c9-4a35-bfae-82a38d45c7b2/implementation_plan.md)

---

## 1. 總體任務目標 (Overall Objective)

本計畫旨在建立一個中心化的「健康計算機工具箱 (Tools Hub)」，並針對「心血管健康」專題開發一系列專業評估工具。透過將複雜的營養數據與醫學公式轉化為簡單的互動組件，連結站內核心文章，建立強大的「內容+工具」護城河，達成以下目標：

1. **提升實用性**: 協助使用者將複雜數據（如咖啡因安全限量、心血管風險）轉化為簡單的行動參考。
2. **增強 SEO**: 利用工具類頁面天然的高外連潛力，提升網域權威度。
3. **增加停留時間**: 透過互動式介面引導使用者探索更多相關營養文章。

---

## 2. 第一階段：建立工具箱與基礎工具 (Phase 1: Hub & Foundational Tools)

### 2.1. 開發工具 (Developed Tools)
- **咖啡因耐受度計算機**: 根據 FDA/EFSA 官方數據，針對體重、族群與敏感度進行分階計算。
- **魚油真實成本計算機**: 沿用現有的每 1000mg Omega-3 成本換算邏輯與三層評級系統。

### 2.2. 技術方案 (Technical Strategy)
- **組件架構**: 使用原生 JavaScript Class + Shadow DOM (closed mode) 封裝，確保各工具完全獨立。
- **UI 風格**: 遵循專案標準的 **Rose Theme (薔薇色調)**，採用 Flat Design。

### 2.3. 任務拆解 (Task Breakdown)
- [x] **組件開發**: 撰寫 `CaffeineCalculator` 組件，並將魚油計算機封裝為獨立組件。
- [x] **頁面開發**: 建立 `category/tools.html` 作為全站工具入口頁，並實作 RWD 與 SEO 標記。
- [x] **全站整合**: 在 Header 新增「健康工具箱」導航，並更新相關文章的 CTA。
- [x] **文件歸檔**: 紀錄至 `CHANGELOG.md` 並更新 `todo.md`。

---

## 3. 第二階段：心血管健康工具擴充 (Phase 2: Cardiovascular Health Tools Expansion)

### 3.1. 開發工具 (Developed Tools)
1.  **ASCVD 10年風險評估器**: 
    - 基於 AHA Pooled Cohort Equations，綜合評估心血管事件風險。
2.  **鈉鉀離子平衡比 (Na:K Ratio) 計算機**:
    - 評估鈉鉀攝取比例（目標 < 0.67），並提供食物補強建議。
3.  **Zone 2 運動心率計算器**:
    - 整合 Maffetone 與 Karvonen 雙演算法，輸出精準的 Zone 2 訓練區間。

### 3.2. 技術方案 (Technical Strategy)
- **組件化**: 每個工具被封裝為獨立的 JS Class（`CardioRiskCalculator`, `SodiumPotassiumCalc`, `Zone2Calculator`）。
- **UI**: 增加「數據雷達圖」或「水平進度條」來視覺化風險等級。

### 3.3. 實作進度 (Task Progress)
- [x] **ASCVD 10年風險評估器**: 實作完成。
- [x] **鈉鉀離子平衡比計算機**: 實作完成。
- [x] **Zone 2 運動心率計算器**: 實作完成。

---

## 4. 最終檔案結構 (Final File Structure)

```
caregiver/
├── category/
│   └── tools.html                      (主要工具入口頁)
├── assets/
│   └── js/
│       ├── tools-JS/                   (統一存放工具組件的目錄)
│       │   ├── caffeine-calculator.js
│       │   ├── fish-oil-calculator.js
│       │   ├── cardio-risk-calculator.js
│       │   ├── ionic-balance-calculator.js
│       │   └── zone2-calculator.js
│       └── deus-header-component.js    (修改: 導覽列新增連結)
└── post/
    └── topic-cardiovascular-health.html (修改: 整合工具連結)
```

---

## 5. 影響評估與驗收 (Impact & Acceptance)

### Breaking Changes
- **評估**: 無。所有開發均為新增頁面與 Shadow DOM 隔離組件，不影響現有功能。

### 驗收標準
- [x] **邏輯準確性**: 所有計算機的計算結果與醫學/官方指引誤差極小。
- [x] **封裝性驗證**: Shadow DOM 樣式不外溢，主頁面樣式不入侵組件。
- [x] **響應式表現**: 手機端欄位轉為單欄堆疊，計算結果顯示完整。
- [x] **SEO 驗證**: `tools.html` 頁面具備完整的元標籤與 JSON-LD。
- [x] **零依賴**: 專案在無任何 build step 情況下可直接運行。