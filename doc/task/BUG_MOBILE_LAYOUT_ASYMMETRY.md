# 任務名稱：修復行動裝置容器左右留白不對稱問題 (BUG-MOBILE-LAYOUT-ASYMMETRY)

**狀態**: `開發中`
**負責人**: @AI-Agent
**預計完成日期**: 2025-11-23
**相關連結**: `doc/task/todo.md`

---

## 1. 任務目標 (Objective)

修復文章頁面 (`post/*.html`) 在行動裝置上主內容容器左右 `padding` 或 `margin` 不對稱的佈局問題。此問題導致視覺不平衡，影響閱讀體驗。目標是實現一個通用的 CSS 解決方案，確保在所有行動裝置寬度下，頁面佈局都能保持對稱與美觀。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 技術方案

- **分析方法**: 檢查受影響頁面 (`post/magnesium.html`) 的 HTML 結構與載入的 CSS 規則，特別是與主內容容器相關的 `@media` 查詢。
- **解決方案**: 預計將在一個通用的樣式設定中（可能是 `00template.html` 的內嵌樣式，或是共用的 CSS 檔案），為行動裝置的 viewport 寬度設定一個標準化、對稱的水平 `padding`。

### 2.2. 檔案結構

此任務預計將修改以下檔案：

```
caregiver/
└── post/
    └── 00template.html  (可能修改)
    └── *.html           (如果樣式是寫死在各個頁面)
```
*（初步懷疑問題出在範本或共用樣式，若非，則需檢查所有 `post/*.html`）*

## 3. 任務拆解 (Task Breakdown)

- [x] **[分析]** 閱讀 `post/magnesium.html` 的原始碼，找出其主內容容器的 class 或 id，並確認其載入的 CSS 樣式來源。
- [x] **[分析]** 檢查找出的 CSS 規則，並假設問題源於子元素溢位 (overflow) 導致父容器無法正確置中。
- [x] **[實作]** 撰寫 CSS 規則 `body { overflow-x: hidden; }`，並將其應用於 `post/magnesium.html` 和 `post/00template.html` 的行動裝置 `@media` 查詢中，作為通用解決方案。
- [ ] **[驗證]** 確認修復方案在範例頁面 (`magnesium.html`) 上有效。
- [ ] **[重構]** 將此通用解決方案應用於所有 `post/*.html` 文章頁面，確保樣式一致。
- [ ] **[文件]** 將此次修復記錄到 `CHANGELOG.md`。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 低風險。
- **原因**: 修改僅針對行動裝置的 CSS 佈局，且目標是修正一個已知的顯示錯誤。只要 CSS 選擇器夠精確，就不太可能影響桌面版佈局或其他無關頁面。

### 相依性

- 無。

## 5. 驗收標準 (Acceptance Criteria)

- [ ] 在 Chrome 開發者工具的行動裝置模擬模式下，文章頁面的主內容容器左右邊距需完全對稱。
- [ ] 解決方案需對所有 `post/` 下的文章頁面有效。
- [ ] 桌面版的頁面佈局未受影響。

---