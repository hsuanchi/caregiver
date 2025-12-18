# 任務名稱：開發健康計算機工具箱 (TOOL-LED-GROWTH)

**狀態**: `已完成`
**負責人**: @Antigravity
**預計完成日期**: 2025-12-18
**相關連結**: [Caffeine Calculator Implementation Plan](file:///C:/Users/烈日千陽/.gemini/antigravity/brain/3ac0b35f-99c9-4a35-bfae-82a38d45c7b2/implementation_plan.md)

---

## 1. 任務目標 (Objective)

開發並建立一個中心化的「健康計算機工具箱 (Tools Hub)」，首波包含「咖啡因耐受度計算機」與「魚油真實成本計算機」。旨在透過功能性的數據工具：
1. **提升實用性**: 協助使用者將複雜的營養數據（如咖啡因安全限量、魚油含量換算）轉化為簡單的行動參考。
2. **增強 SEO**: 利用工具類頁面天然的高外連潛力，提升網域權威度。
3. **增加停留時間**: 透過互動式介面引導使用者探索更多相關營養文章。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

- **組件架構**: 使用原生 JavaScript Class + Shadow DOM (closed mode) 封裝，確保各個工具（Caffeine / Fish Oil）具有完全獨立的樣式與行為。
- **UI 風格**: 遵循專案標準的 **Rose Theme (薔薇色調)**，採用 Flat Design 輔以細微的陰影與過渡動畫。
- **計算邏輯**: 
    - **咖啡因**: 根據 FDA/EFSA 官方數據，針對體重、族群（普通/孕婦/青少年）與敏感度進行分階計算。
    - **魚油**: 沿用現有的每 1000mg Omega-3 成本換算邏輯與三層評級系統。

### 2.2. 檔案結構

```
caregiver/
├── category/
│   └── tools.html                      (新增: 全站工具入口頁)
├── assets/
│   └── js/
│       ├── caffeine-calculator.js      (新增: 咖啡因計算機組件)
│       └── fish-oil-calculator.js      (修改: 提取並封裝為獨立組件)
├── post/
│   └── topic-cardiovascular-health.html (修改: 整合工具連結)
└── assets/js/
    └── deus-header-component.js        (修改: 導覽列新增連結)
```

## 3. 任務拆解 (Task Breakdown)

- [x] **研究規劃**: 調查咖啡因安全限量（FDA/EFSA）與飲品含量數據。
- [x] **組件開發**: 撰寫 `CaffeineCalculator` 組件，實作分眾邏輯與動態 UI 渲染。
- [x] **頁面開發**: 建立 `category/tools.html` 並實作響應式佈局、快速跳轉按鈕與 JSON-LD SEO 標記。
- [x] **全站整合**: 
    - 在 Header 導覽列新增「健康工具箱」導航。
    - 更新 `topic-cardiovascular-health.html` 的 CTA 區塊導向。
- [x] **SEO 同步**: 更新 `sitemap.xml`，修復歷史連結並加入新頁面。
- [x] **文件歸檔**: 紀錄至 `CHANGELOG.md` 並更新 `todo.md`。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 無。
- **原因**: 為新增頁面與組件，採用 Shadow DOM 隔離技術，不會干擾現有頁面樣式。

### 相依性

- 本任務相依於現有的 `deus-header-component.js` 與 `deus-footer-component.js`。
- 計算邏輯獨立，不相依於任何外部資料庫，確保載入速度。

## 5. 驗證標準 (Acceptance Criteria)

- [x] **邏輯準確性**: 孕婦族群嚴格限制於 200mg，成人具備 400mg 上限保護。
- [x] **封裝性驗證**: Shadow DOM 樣式不外溢，主頁面樣式不入侵組件。
- [x] **響應式表現**: 手機端欄位轉為單欄堆疊，計算結果顯示完整。
- [x] **SEO 驗證**: 頁面具備完整的元標籤， breadcrumb JSON-LD 經驗證無誤。
- [x] **零依賴**: 專案在無任何 build step 情況下可直接運行。
