# 任務名稱：心血管健康工具擴充計畫 (CARDIO-TOOLS-EXPANSION)

**狀態**: `已完成`
**負責人**: @Antigravity
**預計完成日期**: 2025-12-18
**相關連結**: [Cardiovascular Health Topic Page](file:///c:/Users/烈日千陽/caregiver/post/topic-cardiovascular-health.html)

---

## 1. 任務目標 (Objective)

繼「咖啡因計算機」成功上線後，本計畫旨在針對「心血管健康」專題開發一系列專業評估工具。透過將醫學公式（如 ASCVD, Na:K Ratio）轉化為互動組件，連結站內核心文章（魚油、鉀、鎂、Q10），建立強大的「內容+工具」護城河。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 預計開發工具清單

1.  **ASCVD 10年風險評估器**: 
    - 基於 AHA Pooled Cohort Equations。
    - 輸入：年齡、血壓、血脂、吸菸史等。
    - 輸出：心血管事件風險百分比與改善建議。
2.  **鈉鉀離子平衡比 (Na:K Ratio) 計算機**:
    - 輸入：一日鈉攝取量 (mg) 與 鉀攝取量 (mg)。
    - 輸出：比值評分（目標 < 0.67 或 1:1.5）與食物補強建議。
3.  **Zone 2 運動心率計算器**:
    - 基於 年齡與靜息心率 (MAFFETONE 或 KARVONEN 公式)。
    - 輸出：精準的 Zone 2 訓練區間，用於輔助血管內皮修復。

### 2.2. 技術方案

- **組件化**: 每個工具將被封裝為獨立的 JS Class（例如 `CardioRiskCalculator`, `SodiumPotassiumCalc`）。
- **樣式**: 統一使用 Rose Theme，並適配 Shadow DOM 隔離。
- **UI**: 增加「數據雷達圖」或「水平進度條」來視覺化風險等級。

## 3. 檔案結構

```
caregiver/
├── assets/js/
│   ├── cardio-risk-calculator.js      (新增)
│   ├── ionic-balance-calculator.js    (新增)
│   └── zone2-calculator.js            (新增)
└── category/
    └── tools.html                      (修改: 嵌入新工具)
```

## 3. 實作進度 (Task Progress)

- [x] **ASCVD 10年風險評估器**: 實作完成，包含性別、年齡、血壓、血脂與病史綜合評估。
- [x] **鈉鉀離子平衡比 (Na:K Ratio) 計算機**: 實作完成，包含鹽分轉換工具與分級建議。
- [x] **Zone 2 運動心率計算器**: 實作完成，整合 Maffetone 與 Karvonen 雙演算法。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 無。

### 相依性

- 部分計算邏輯（如血脂資料）可與未來「體檢報告識別」功能對接。

## 5. 驗收標準 (Acceptance Criteria)

- [x] ASCVD 計算結果與官方計算機誤差 < 1%。
- [x] 鈉鉀比計算支援多種單位換算 (mg vs mEq)。
- [x] Zone 2 計算支援「體能狀態」加權係數。
- [x] 所有工具在 `tools.html` 中具備獨立的跳轉錨點與 SEO 描述。
