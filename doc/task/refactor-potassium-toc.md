# 任務名稱：批量重構舊版文章頁面，升級至新範本

**狀態**: `開發中`
**負責人**: @AI-Agent
**預計完成日期**: 2025-12-20
**相關連結**: 
- **目標範本**: `post/fish-oil.html`

---

## 1. 任務目標 (Objective)

掃描專案後發現，部分文章頁面（如 `anthocyanins.html` 等）的目錄（TOC）及整體風格仍在使用舊版規格，導致其在視覺與功能上與新範本存在顯著差異。本次任務旨在將所有已發現的舊版頁面進行一次性、批次化的重構，使其完全符合新範本的標準，以統一全站使用者體驗、提升手機版易用性，並標準化程式碼結構。

## 2. 實作策略 (Implementation Strategy)

核心策略是將所有待辦檔案的內容，逐一遷移至 `fish-oil.html` 的結構與樣式框架中。

### 2.1. 技術方案

- **基礎範本**: 完全參照 `post/fish-oil.html` 的 HTML 結構與頁內 `<style>` 區塊。
- **樣式方案**: 移除舊頁面現有的外部 CSS 連結 (`article.css`)，替換為 `fish-oil.html` 的完整內嵌 CSS。
- **主題化**: 為每一篇被修復的文章設計一個專屬的、符合其內容的顏色主題，並替換新 CSS 中的所有主題色變數。
- **組件整合**: 確保 `responsive-toc-component.js` 能在新結構下正常運作。

### 2.2. 待修復檔案清單 (Scope of Work)

- [ ] `post/anthocyanins.html`
- [ ] `post/coenzyme-q10.html`
- [ ] `post/garlic.html`

### 2.3. 檔案結構

```
caregiver/
└── post/
    ├── anthocyanins.html  (修改)
    ├── coenzyme-q10.html  (修改)
    └── garlic.html        (修改)
```

## 3. 任務拆解 (SOP)

這份 SOP 將作為修復每一個檔案的標準作業流程。

- [ ] **1. 分析現有內容結構**:
    - 仔細閱讀待修復的 HTML 檔案，記錄所有 `<h2>` 和 `<h3>` 標題及其對應的 `id`，作為重建目錄的依據。

- [ ] **2. 替換與主題化 CSS**:
    - 複製 `post/fish-oil.html` 中完整的 `<style>...</style>` 區塊。
    - 貼到待修復檔案的 `<head>` 中，並刪除原有的 `<link rel="stylesheet" href="../assets/css/article.css">` 及舊的 `<style>` 區塊。
    - 在新的 `<style>` 區塊頂部，找到 `:root` 選擇器，為當前文章設計並替換一個全新的顏色主題。

- [ ] **3. 重建 TOC 的 HTML 結構**:
    - 找到待修復檔案中的 `<aside class="sidebar">` 區塊。
    - 根據步驟 1 分析的章節結構，手動重寫 `<ul class="toc-list">...</ul>` 內的 `<li>` 和 `<a>` 標籤。
    - 確保 `<a>` 標籤的 `href` 屬性正確指向對應的章節 `id`。
    - 若文章有 `<h3>` 子章節，需為其對應的 `<a>` 標籤加上 `class="toc-link sub-item"`。

- [ ] **4. 驗證響應式組件需求**:
    - 確認 `<div id="toc-mobile-target"></div>` 元素存在於正確位置。
    - 確認頁尾的 `<script>` 區塊中已包含 `responsive-toc-component.js` 的引入並被初始化。

- [ ] **5. 最終測試**:
    - 在瀏覽器中打開修改後的檔案。
    - **桌面版**: 驗證側邊欄目錄是否已更新為新主題，且點擊連結能平滑滾動。
    - **手機版**: 驗證目錄是否已變為可點擊展開的「手風琴」樣式。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes

- **評估**: 無。
- **原因**: 本次修改僅針對單一文章頁面的前端呈現，不涉及後端邏輯或全域腳本的破壞性變更。所有樣式均封裝在頁面內，風險極低。

### 相依性

- 本任務的成功高度相依於 `responsive-toc-component.js` 的正常運作。

## 5. 驗收標準 (Acceptance Criteria)

- [ ] 所有在 `2.2. 待修復檔案清單` 中的檔案都成功套用新範本與專屬主題色。
- [ ] 所有被修復的頁面，其目錄在桌面版和手機版上均能正常、美觀地運作。
- [ ] 所有頁面的原有功能不受影響。