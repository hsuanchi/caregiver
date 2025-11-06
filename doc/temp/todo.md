# 開發待辦事項

**重要流程**：每次完成此處的待辦事項後，需將修改紀錄更新到根目錄的 `CHANGELOG.md`。記錄完成後，再清除此處的已完成項目，但**不要刪除**此檔案。

---

### 調整 Nutrient Dashboard 測試頁面

- [ ] **分析頁面結構**: 讀取 `category/nutrient-dashboard-TEST.html`，特別是 `Section 2: Goal Filter & Search (Combined)` 的部分。
- [ ] **移除搜尋功能**:
    - [ ] 刪除 HTML 中的搜尋輸入框 (`<input>`) 和按鈕 (`<button>`)。
    - [ ] 調整版面，確保 "依照健康目標顯示" 的功能仍然正常且美觀。
- [ ] **檢查相關腳本**:
    - [ ] 檢視 `assets/js/dashboard-logic.js`，找出並移除或註解與搜尋功能相關的 JavaScript 程式碼，避免頁面出錯。