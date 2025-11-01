# 開發待辦事項

**重要流程**：每次完成此處的待辦事項後，需將修改紀錄更新到根目錄的 `CHANGELOG.md`。記錄完成後，再清除此處的已完成項目，但**不要刪除**此檔案。

---

### 新增任務
- 為所有營養素文章頁面新增或標準化「風險與安全注意事項」章節。

### 執行計畫
1.  **更新風格指引**：將「風險與安全注意事項」的標準化結構寫入 `doc/writing-guide.md`。
2.  **循序修改**：依照下方「執行進度」清單 (A-Z 排序)，逐一修改文章。
3.  **標準化流程**：
    - 讀取文章，搜尋「副作用」、「注意事項」等舊章節。
    - **若找到**：以標準標題 `<h2>{營養素}的風險與安全注意事項</h2>` 和 `<h3>常見副作用</h3>` 替換舊標題，並整合現有內容。
    - **若未找到**：在 `<section id="faq">` 之前，插入完整的標準化新章節，並填寫專業內容。
4.  **追蹤進度**：每完成一篇，就在下方的清單中標記 `[x]`。
5.  **完成回報**：全部處理完畢後，向您報告。

---

### 執行進度
- [x] `amino-acids.html`
- [x] `anthocyanins.html`
- [x] `beta-glucan.html`
- [x] `calcium.html`
- [x] `chondroitin.html`
- [x] `chromium.html`
- [x] `coenzyme-q10.html`
- [x] `collagen.html`
- [x] `copper.html`
- [x] `curcumin.html`
- [x] `dietary-fiber.html`
- [x] `fish-oil.html`
- [x] `fluoride.html`
- [x] `folic-acid.html`
- [x] `gaba.html`
- [x] `glucosamine.html`
- [x] `glutathione.html`
- [x] `iodine.html`
- [x] `iron.html`
- [x] `lutein.html`
- [x] `lycopene.html`
- [x] `magnesium.html`
- [x] `manganese.html`
- `official-health-sites.html` (非營養素，跳過)
- [ ] `phosphorus.html`
- [ ] `potassium.html`
- [ ] `prebiotics.html`
- [ ] `probiotics.html`
- [ ] `protein.html`
- [ ] `selenium.html`
- [ ] `sodium.html`
- `topic-immune-boosting-nutrients.html` (非營養素，跳過)
- `topic-stroke-prevention-nutrients.html` (非營養素，跳過)
- `topic-vascular-health-superfoods.html` (非營養素，跳過)
- [ ] `vitamin-a.html`
- [ ] `vitamin-b.html`
- [ ] `vitamin-c.html`
- [ ] `vitamin-d.html`
- [ ] `vitamin-e.html`
- [ ] `vitamin-k.html`
- [ ] `zinc.html`

---

### 修改
- 統一所有營養素文章的副作用章節標題格式為 `<h2>{營養素}的風險與安全注意事項</h2>`。
- 在上述章節中，新增 `<h3>{營養素}的常見副作用</h3>` 小標題，使結構更清晰。
- 針對部分沒有安全提醒區塊的文章，根據營養學補上完整專業的的詳細內容，