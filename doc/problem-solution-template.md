# 問題解決導向（PSMA）文章範本

> 用途：快速複製此檔，將 `[]` 內文替換為目標營養素與內容。對應 `writing-guide.md` 的 PSMA 結構與 8 標準章節。

---

## 基本資訊

- 文章主題：[營養素名稱]
- 分類標籤：[維生素/礦物質/其他營養素]
- 主要關鍵字：[關鍵字1, 關鍵字2]
- 頁面描述草稿：以「痛點+效益」一句話抓住讀者。

---

## Hero 區（可貼到 HTML）
```html
<div class="article-hero">
  <nav class="breadcrumb">
    <a href="../index.html">首頁</a><span class="separator">/</span><span>[H1 完整標題]</span>
  </nav>
  <span class="article-category">[分類標籤]</span>
  <h1 class="article-title">[H1 完整標題]</h1>
  <p class="article-subtitle">[用痛點+效益 1 句總結，如：解決[困擾]，達成[目標]]</p>
</div>
```

---

## 文章主體（依 PSMA 排序）

### 1) Pain — 您有這些困擾嗎？
```html
<section id="problem">
  <h2>您有這些困擾嗎？[痛點集合]</h2>
  <div class="risk-group-cards">
    <div class="risk-card"><h4 class="risk-card-title">[族群/情境A]</h4><p class="risk-card-desc">[具體症狀/需求與風險]</p></div>
    <div class="risk-card"><h4 class="risk-card-title">[族群/情境B]</h4><p class="risk-card-desc">[具體症狀/需求與風險]</p></div>
    <div class="risk-card"><h4 class="risk-card-title">[族群/情境C]</h4><p class="risk-card-desc">[具體症狀/需求與風險]</p></div>
  </div>
</section>
```

### 2) Solution — [營養素]：問題的終極解答
```html
<section id="solution">
  <h2>[營養素]：問題的終極解答</h2>
  <div class="info-cards">
    <div class="info-card"><h4 class="info-card-title">[動詞起手的效益1]</h4><p class="info-card-desc">[可量化/可驗證的補充說明]</p></div>
    <div class="info-card"><h4 class="info-card-title">[效益2]</h4><p class="info-card-desc">[補充說明]</p></div>
    <div class="info-card"><h4 class="info-card-title">[效益3]</h4><p class="info-card-desc">[補充說明]</p></div>
  </div>
</section>
```

### 3) Mechanism — 如何運作？關鍵機制
```html
<section id="mechanism">
  <h2>[營養素]如何運作？關鍵機制</h2>
  <div class="info-cards" style="grid-template-columns: 1fr 1fr;">
    <div class="info-card"><h4 class="info-card-title">[機制詞1]</h4><p class="info-card-desc">[簡明解釋 + 對比點]</p></div>
    <div class="info-card"><h4 class="info-card-title">[機制詞2]</h4><p class="info-card-desc">[簡明解釋 + 對比點]</p></div>
  </div>
  <div class="alert alert-nutritionist">
    <strong>營養師提醒：</strong>
    <p>[1 句抓重點的原理總結與使用建議]</p>
  </div>
</section>
```

### 4) How much — 我該攝取多少？
```html
<section id="how-much">
  <h2>我該攝取多少？[權威建議]</h2>
  <table class="data-table">
    <thead><tr><th>組織/權威機構</th><th>成人建議量</th></tr></thead>
    <tbody>
      <tr><td>[WHO/FDA/…]</td><td><strong>[數值+單位]</strong></td></tr>
    </tbody>
  </table>
  <div class="alert alert-tip"><strong>關鍵洞察：</strong> [補充 1 句數據觀察]</div>
  <!-- 可在此補：最佳時機與搭配、與他營養素協同作用 -->
  <!-- 食物來源可視情況放在此或 Action-Food 區 -->
  
</section>
```

### 5) Action-Food — 打造您的高[營養素]餐盤
```html
<section id="action-plan-food">
  <h2>實踐指引(一)：打造您的高[營養素]餐盤</h2>
  <!-- 互動餐盤/清單/替換策略；提供逐步增量與聰明替換 -->
</section>
```

### 6) Action-Supplements — 精準挑選補充品
```html
<section id="action-plan-supplements">
  <h2>實踐指引(二)：精準挑選[營養素]補充品</h2>
  <div class="comparison-table-container">
    <table class="comparison-table">
      <thead>
        <tr>
          <th class="comparison-header-main">比較項目</th>
          <th class="comparison-header-option comparison-recommended"><div class="option-badge">[首選用途]</div><strong>[選項A]</strong></th>
          <th class="comparison-header-option"><strong>[選項B]</strong></th>
          <th class="comparison-header-option"><strong>[選項C]</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="comparison-label">主要機制</td><td class="comparison-cell">[A 機制]</td><td class="comparison-cell">[B 機制]</td><td class="comparison-cell">[C 機制]</td></tr>
        <tr><td class="comparison-label">族群適配</td><td class="comparison-cell">[A 適合族群]</td><td class="comparison-cell">[B 適合族群]</td><td class="comparison-cell">[C 適合族群]</td></tr>
        <tr><td class="comparison-label">優缺點</td><td class="comparison-cell">[A 優/缺]</td><td class="comparison-cell">[B 優/缺]</td><td class="comparison-cell">[C 優/缺]</td></tr>
      </tbody>
    </table>
  </div>
</section>
```

### 7) 安全注意事項
```html
<section id="safety">
  <h2>安全注意事項</h2>
  <div class="alert alert-doctor">
    <strong>醫師警告：</strong>
    <ul style="list-style-position: inside;">
      <li><strong>[用量/水分/時機]</strong> [說明]</li>
      <li><strong>[藥物交互]</strong> 建議間隔 [X] 小時。</li>
      <li><strong>[特殊族群]</strong> [孕期/慢性病/手術前後 注意]</li>
    </ul>
  </div>
</section>
```

### 8) FAQ（3-5 題）
```html
<section id="faq" class="faq-section">
  <h2>常見問題</h2>
  <div class="faq-item"><div class="faq-question">Q1: [問題]</div><div class="faq-answer"><p><strong>A:</strong> [回答要點]</p></div></div>
  <div class="faq-item"><div class="faq-question">Q2: [問題]</div><div class="faq-answer"><p><strong>A:</strong> [回答要點]</p></div></div>
</section>
```

---

## PSMA 自我檢核（貼進 PR 描述/文末備註皆可）

```
□ Pain：是否命中 3-5 個典型困擾/族群？
□ Solution：是否用 3-6 張 .info-card 清楚表述效益？
□ Mechanism：是否聚焦 1-2 個關鍵機制詞並做對比？
□ Action-Food：是否提供逐步增量與聰明替換？
□ Action-Supplements：是否以「機制×族群」給出首選與備選？
□ Safety：是否包含藥物交互與操作風險？
□ FAQ：是否回應落地使用問題？
```


