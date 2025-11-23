# 任務名稱：全站文章頁面 TOC 目錄結構標準化 (TOC-FORMAT-STANDARDIZATION)

**狀態**: `待辦`
**負責人**: @AI-Agent
**預計完成日期**: 2025-11-24
**相關連結**: `doc/task/todo.md`

---

## 1. 任務目標 (Objective)

確保所有 `post/*.html` 文章頁面的側邊欄目錄 (Table of Contents, TOC) 結構與樣式，皆符合 `post/fish-oil.html` 中定義的標準格式。此舉旨在統一全站使用者體驗，並確保 `responsive-toc-component.js` 能在所有頁面正常運作。

## 2. 標準 TOC 結構 (Standard TOC Structure)

根據對 `post/fish-oil.html` 的分析，標準的 TOC HTML 結構應如下：

```html
<aside class="sidebar" id="sidebar">
  <div class="toc">
    <h3 class="toc-title">
      <span>目錄</span>
    </h3>
    <ul class="toc-list">
      <li><a href="#section-1" class="toc-link">第一節標題</a></li>
      <li><a href="#section-2" class="toc-link sub-item">第二節子標題</a></li>
      <!-- More list items -->
    </ul>
  </div>
</aside>
```

### 關鍵驗收標準：
- 最外層容器為 `<aside class="sidebar" id="sidebar">`。
- 標題為 `<h3 class="toc-title"><span>目錄</span></h3>`，不應包含 `<a>` 標籤。
- 列表為 `<ul class="toc-list">`。
- 每個列表項為 `<li><a href="..." class="toc-link">...</a></li>`。
- 子項目需在 `<a>` 標籤上額外加上 `sub-item` class。

### 2.1 樣式標準 (Style Standard)
- **粗體**: 所有第一層的目錄連結 (`.toc-list a:not(.sub-item)`) 都應明確設定為粗體 (`font-weight: 700;` 或 `font-weight: bold;`)，以確保在不同頁面主題色系下，視覺層級依然清晰。
- **顏色**: 目錄的 `active` 與 `hover` 狀態顏色應使用頁面定義的 CSS 變數 (`--primary-color`, `--primary-bg-light`, etc.)，以保持主題一致性。

## 3. 任務拆解 (Task Breakdown)

- [x] **[分析]** 比較 `post/00template.html` 與 `post/fish-oil.html` 的 TOC 結構，定義出標準範本。
- [x] **[文件]** 建立此 `TOC_FORMAT_STANDARDIZATION.md` 任務文件。
- [x] **[文件]** 將此任務新增至 `doc/task/todo.md`。
- [ ] **[重構]** 遍歷所有 `post/*.html` 檔案，檢查其 TOC HTML 結構是否符合標準。
- [ ] **[重構]** 檢查並統一所有 `post/*.html` 頁面中，針對 `.toc-list a:not(.sub-item)` 的 `font-weight` 樣式，確保其設定為 `700` 或 `bold`。
- [ ] **[重構]** 對於不符合標準的頁面，修改其 HTML 結構以符合上述範本。
- [ ] **[驗證]** 確保修改後的頁面，其桌面版與行動版的 TOC 功能與 RWD 樣式皆正常運作。
- [ ] **[文件]** 將此次標準化修改記錄到 `CHANGELOG.md`。

## 4. 影響評估 (Impact Assessment)

- **風險**: 低。此任務主要為前端 HTML 結構的標準化，對後端邏輯無影響。
- **相依性**: 依賴 `responsive-toc-component.js` 的 class 與 id 選擇器。

---
