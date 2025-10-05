# Caregiver 營養百科 - 文章風格指南

這份文件旨在為所有「營養百科」的文章建立一套統一、高標準的風格與結構。遵循此指南將有助於我們產出高品質、風格一致且對讀者極具吸引力的內容。

> **技術檢查清單請參考** [`doc/new-page-checklist.md`](new-page-checklist.md) - 專注於 HTML 結構、SEO 設定、組件整合等技術層面

---

## 總體風格與核心理念

文章的整體風格應為**「專業、親切且易於行動」**。我們透過專業的口吻建立權威，同時用生活化的比喻和清晰的視覺設計拉近與讀者的距離，並在文末提供明確的指引。

---

## 使用說明與目錄 (How to Use This Guide)

### 使用說明
每個章節下方有三個 prompt（Nutritionist / Analyst / Front-end）。選用時把 `<<INPUT>>` 替換成你要寫的營養素名稱或文章草稿（例如：鈣、維生素D、益生菌）。每個 prompt 都會指定輸出格式（標題、摘要、表格、JSON-LD、SVG 區塊等），方便直接貼給撰稿 AI、分析師或前端工程師執行與產出。

### 本指南目錄
*   [文章結構](#文章結構-由上至下) (由上至下)
*   [內容與語氣](#內容與語氣)
*   [完整範例](#完整範例鈣質文章撰寫示範) (以鈣質文章為案例)
*   [格式化與常用 CSS Class](#格式化與常用-css-class)
*   [整合 SVG 視覺化圖表](#整合-svg-視覺化圖表)
*   [文章品質檢查清單](#文章品質檢查清單)
*   [SEO 與 Metadata](#seo-與-metadata)
*   [發布前檢查](#發布前檢查)
*   [快速模板與工具](#快速模板與工具)

---

## 文章結構 (由上至下) 

每篇文章都應遵循以下標準結構，以確保內容的連貫性與完整性。
 
### 1. **引人入勝的開頭**
   - **標題撰寫的終極策略：V.I.P. + B.R.A.V.E. 混合框架**
     - **核心結構：** 所有文章標題**必須**嚴格遵循「**營養素 - 介紹說明**」的格式。
       - **營養素部分：** 簡潔明瞭地標示出文章主題，例如「鈣」、「維生素D」、「魚油」。
       - **介紹說明部分：** 這是發揮創意的空間，目標是融合 V.I.P. 與 B.R.A.V.E. 框架，創造最大的點擊誘因。
     - **格式範例 (正確示範)：**
       - `鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質`
       - `維生素K - 補鈣、補D為何一定要有它？K2才是預防骨鬆與血管鈣化的關鍵`
     - **核心要求：** 我們的標題不怕長，但**必須**精準且全面。**首要原則是「文要對題」**，絕不可為了套用公式而犧牲內容的準確性。
     - **V.I.P. 框架 (內容核心)**
       - **V (Value-Driven - 價值驅動):** 明確點出對讀者的核心**益處**。
       - **I (Intriguing - 引發好奇):** 使用**比喻、提問或知識缺口**來吸引讀者。
       - **P (Problem-Solving - 解決問題):** 直接命中讀者的**痛點**或生活情境。
     - **B.R.A.V.E. 框架 (點擊觸發器)**
       - **B (Brand - 品牌):** 在標題結尾加入「**| 營養百科**」，建立權威感。
       - **R (Recentness - 時效性):** <span style="color: #c0392b;">**(不建議使用)**</span> 避免加入年份，以維持文章的長期價值。
       - **A (Amount - 數量):** 使用**具體數字**，如「7大功效」、「5個技巧」，暗示內容的豐富性。
       - **V (Velocity - 速度):** 強調**效率**，如「5分鐘搞懂」、「快速上手」。
       - **E (Economy - 經濟性):** <span style="color: #c0392b;">**(不建議使用)**</span> 避免使用「免費」等詞彙，維持專業形象。

   - **綜合應用範例 (V+I+P+B+A+V)**
     - **目標：** 撰寫一篇關於「益生菌」的文章。
     - **元素拆解：**
       - **V (價值):** 重建腸道平衡、改善消化。
       - **I (好奇):** 菌株編號的秘密是什麼？
       - **P (問題):** 解決便秘、腹瀉困擾。
       - **B (品牌):** | 營養百科
       - **A (數量):** 7大關鍵
       - **V (速度):** 5分鐘搞懂
     - **最終標題組合：**
       - `益生菌 - 終結便秘腹瀉的7大關鍵：5分鐘搞懂菌株編號秘密的完整指南 | 營養百科`
     - **延伸應用 (SEO 頁面描述):** 撰寫標題時，必須同時思考如何產出優秀的 SEO 頁面描述 (`<meta name="description">`)。頁面描述的撰寫同樣遵循 **V.I.P. + B.R.A.V.E. 混合框架**，目標是將標題的吸引力延伸至搜尋結果頁面，提升點擊率。詳細規則請參考本文檔的「SEO 與 Metadata」章節。
   - **麵包屑導覽列 (`<nav class="breadcrumb">`) 規則**
     - 為了網站導覽的一致性，麵包屑的最後一節文字**必須**與頁面的 `<h1>` 主標題完全相同。
     - **範例：**
       ```html
       <nav class="breadcrumb">
         <a href="../index.html">首頁</a>
         <span class="separator">/</span>
         <span>鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質</span>
       </nav>
       <h1 class="article-title">鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質</h1>
       ```
   - **摘要區塊**：在主要內容開始前，提供一個「**30 秒速讀版**」或「**需求自我檢測**」區塊，快速抓住讀者興趣。

### 2. **清晰的章節劃分 (模組化結構)**
   - 內文應使用 `<h2>` 和 `<h3>` 標籤劃分章節。以下為**建議的核心章節順序**，這套結構是確保內容完整性的基礎。
   - **寫作彈性**：在包含這 8 個核心章節的前提下，作者可以根據特定營養素的深度與廣度，**自由增加額外的延伸章節**。例如，若某營養素有複雜的法規議題或豐富的歷史背景，可額外增加「法規環境」或「歷史沿革」等章節。我們的目標是完整性與專業性，而非僵化的模板。

   - **`<h2>` 1. 基本資訊：[營養素]是什麼？**
     - **目的**：建立基礎認知。
     - **內容**：
       - `<h3>` 定義與分類：簡潔說明其本質。
       - `<h3>` 關鍵類型比較：比較不同型態的差異（例如：維生素D的D2 vs. D3、魚油的TG vs. rTG、葉黃素的游離型 vs. 酯化型）。這是展現專業深度的關鍵。

   - **`<h2>` 2. 核心功效：[營養素]對人體有哪些好處？**
     - **目的**：闡述價值，回應讀者「我為什麼需要它」的疑問。
     - **內容**：使用 `.info-cards` 樣式，列出 3-4 個最核心的功效，並在下方段落詳細解釋其作用機制。

   - **`<h2>` 3. 每日建議攝取量與最佳時間**
     - **目的**：提供具體的行動指南。
     - **內容**：
       - `<h3>` 官方建議攝取量：使用 `.data-table` 呈現不同年齡、族群的建議量(RDA)與上限攝取量(UL)。
       - `<h3>` 最佳攝取時間與方式：說明飯前/飯後、搭配何種食物能提高吸收率。

   - **`<h2>` 4. 食物來源：哪些天然食物富含[營養素]？**
     - **目的**：強調「從飲食優先」的健康觀念。
     - **內容**：使用 `.data-table` 製作食物含量排行榜，並搭配 `<div class="alert alert-tip">` 提供營養師的烹調或吸收小撇步。

   - **`<h2>` 5. 誰最需要補充？[營養素]缺乏的警訊與高風險族群**
     - **目的**：精準命中目標讀者的痛點，讓他們產生「這就是在說我」的共鳴。
     - **內容**：使用 `.risk-group-cards` 樣式，列出 4-5 個典型族群（如：上班族、孕婦、素食者、年長者）及其缺乏警訊。

   - **`<h2>` 6. 如何挑選[營養素]補充品？**
     - **目的**：提供商業決策價值的內容，是文章的重點之一。
     - **內容**：使用 `.data-table` 比較市售產品的類型、優缺點、吸收率，並條列出「選購要點」（如：看劑量、看型態、看複方、看認證）。

   - **`<h2>` 7. 副作用與注意事項**
     - **目的**：建立權威與信任感，展現內容的完整與負責。
     - **內容**：說明可能的副作用、過量風險，以及與特定藥物的交互作用。務必加入 `<div class="alert alert-doctor">` 的醫師警告。

   - **`<h2>` 8. 常見問題 (FAQ)**
     - **目的**：解答讀者的次要疑問，並增加長尾關鍵字的覆蓋率。
     - **內容**：以 Q&A 形式，回答 3-5 個常見問題（例如：可以跟B群一起吃嗎？晚上吃會失眠嗎？）。

### 3. **固定的結尾模組**
   - **相關營養素**：在文章主要內容結束後，提供 2-3 個相關主題的文章連結，以卡片形式呈現，增加內部連結。
   - **免責聲明**：在頁尾組件前，必須加上標準的免責聲明區塊。

---
## 內容與語氣

### 1. **專業口吻**
   - 適時使用「**營養師提醒**」、「**醫師警告**」等提示框，增加內容的權威性。

### 2. **善用比喻**
   - 將複雜的科學概念轉化為簡單易懂的比喻。例如：
     - *維生素B群是身體的「能量轉換器」。*
     - *Q10是「心臟的能量火星塞」。*

### 3. **強調重點**
   - 對於段落中的關鍵字詞，使用 `<strong>` 標籤或 `<span class="highlight-nutrient">` 來凸顯。

### 4. **善用讀者觀點**
   - 在撰寫前，先思考讀者為何會搜尋這個主題？他們可能遇到了什麼具體問題（例如：失眠、容易累、皮膚不好），或是有什麼樣的目標（例如：備孕、提升運動表現）。
   - 從讀者會遇到的日常生活情境出發，分析其背後的意圖與困難，讓文章內容能真正解決他們的問題，而不只是單純的知識陳列。

### 5. **精簡圖示 (Icon) 使用**
   - **原則禁止，例外手動**：為維持版面的專業性與內容的純粹性，**原則上禁止使用任何裝飾性圖示（包含 Emoji）**。
   - 任何圖示的出現，都應是經過審慎評估後，由編輯**手動明確加入**的，絕非自動或常規性添加。
   - 目標是讓視覺焦點完全回歸內容本身，避免任何不必要的視覺干擾。

### 6. **全面專業潤稿 (Full-Pass Proofreading)**
   - **目標**：在完成初稿後，進行一次徹底的專業潤稿，根除所有可能削弱文章權威性的元素。
   - **核心原則**：
     - **消除「內容農場」語氣**：避免使用過於聳動、誇大或缺乏根據的語句。
     - **整合專家觀點**：將「專家建議」、「醫師提醒」等外部標籤，無縫地融入文章的論述脈絡中。讓內容本身直接展現其專業性，而非依賴標籤。
     - **統一沉穩語氣**：確保整篇文章的語氣一致、沉穩且充滿信賴感，避免過於口語化的表達。
     - **優化起承轉合**：檢查各段落間的邏輯連接，確保行文流暢，論述結構嚴謹。
   - **最終成果**：潤稿後的文章應是一份精雕細琢的權威指南，而非僅僅是資訊的堆砌。

---

## 完整範例：鈣質文章撰寫示範

### 標題撰寫範例
**輸入：** 鈣質
**V.I.P. + B.R.A.V.E. 分析：**
- **V (價值):** 不只補骨，終結抽筋、失眠
- **I (好奇):** 為何99%的鈣在骨骼，1%卻能調控生命？
- **P (問題):** 解決骨質疏鬆、抽筋、失眠困擾
- **B (品牌):** | 營養百科
- **A (數量):** 8大迷思、4大來源
- **V (速度):** 終結困擾

**最終標題：** `鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質 | 營養百科`

**頁面描述範例：**
```
深受抽筋、失眠困擾？想預防骨質疏鬆？這份2025免費鈣質終極指南，將在10分鐘內破解8大補鈣迷思，教你秒懂海藻鈣與檸檬酸鈣的差別，學會如何挑選命定鈣片，重建骨骼健康！
```

### 文章結構完整範例

#### 1. 引人入勝的開頭
```html
<div class="article-hero">
  <span class="article-category">礦物質指南</span>
  <h1 class="article-title">鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質</h1>
  <p class="article-subtitle">
    還在只吃碳酸鈣？營養師教你從8大迷思中覺醒，解析海藻鈣、檸檬酸鈣等4大來源的吸收率與副作用，為骨質疏鬆、抽筋、失眠問題找到最佳解方。
  </p>
</div>
```

#### 2. 核心概念視覺化
**鈣的雙重角色圖表：**
```html
<div class="chart-dual-role">
  <div class="donut-chart-visual">
    <div class="donut-chart-segment"></div>
    <div class="donut-chart-text">鈣的<br>雙重角色</div>
  </div>
  <div class="donut-chart-legend">
    <div class="legend-item legend-99">
      <div class="legend-value">99%</div>
      <div class="legend-label"><strong>結構鈣 (骨骼銀行)</strong><br>構成骨骼與牙齒的堅固建材。</div>
    </div>
    <div class="legend-item legend-1">
      <div class="legend-value">1%</div>
      <div class="legend-label"><strong>離子鈣 (生命總司令)</strong><br>調控心跳、神經傳導與肌肉收縮。</div>
    </div>
  </div>
</div>
```

#### 3. 專業提示框運用
```html
<div class="alert alert-tip">
  <strong>鈣恆定的悖論：為何1%的「總司令」能犧牲99%的「銀行」？</strong>
  <p>人體內存在一套精密而嚴格的調控系統，稱為<strong class="highlight-nutrient">「鈣恆定」</strong>，其首要任務是將血液中的鈣離子濃度維持在一個極其狹窄的範圍內。</p>
</div>
```

#### 4. 數據表格呈現
```html
<table class="data-table">
  <thead>
    <tr><th>年齡層</th><th>每日建議攝取量 (毫克)</th></tr>
  </thead>
  <tbody>
    <tr><td>青少年 (13-18 歲)</td><td><strong>1200 mg</strong></td></tr>
    <tr><td>成人 (19 歲以上)</td><td>1000 mg</td></tr>
  </tbody>
</table>
```

#### 5. 比較卡片設計
```html
<div class="supplement-cards-grid">
  <div class="supplement-card card-carbonate">
    <div class="card-header">
      <h4 class="card-title">碳酸鈣</h4>
      <p class="card-calcium-content">元素鈣含量: <span>40%</span></p>
    </div>
    <div class="card-section">
      <p class="card-section-title">吸收率</p>
      <div class="absorption-bar"><div class="absorption-bar-fill" style="width: 40%;"></div></div>
    </div>
  </div>
</div>
```

#### 6. 迷思破解區塊
```html
<div class="info-cards" style="grid-template-columns: repeat(4, 1fr);">
  <div class="info-card" style="background: #fef2f2; border-top: 5px solid #f87171;">
    <h4 class="info-card-title" style="color: #b91c1c;">迷思一：喝大骨湯補鈣？</h4>
    <p class="info-card-desc"><strong>事實：</strong>骨頭中的鈣很難溶出，一碗大骨湯的鈣含量微乎其微。</p>
  </div>
</div>
```

#### 7. FAQ 互動設計
```html
<div class="faq-item">
  <div class="faq-question">Q1: 鈣和鎂可以一起吃嗎？</div>
  <div class="faq-answer">
    <p><strong>A: 可以，而且建議一起補充，但要注意比例。</strong> 理想的<strong class="highlight-nutrient">鈣鎂攝取比例約為 2:1</strong>。</p>
  </div>
</div>
```

### 成功要素分析

#### 標題策略成功點
- **V.I.P. 框架完整應用**：價值（終結困擾）+ 好奇（不只補骨）+ 問題（抽筋失眠）
- **B.R.A.V.E. 元素到位**：品牌識別 + 具體數量 + 解決速度
- **情感共鳴強烈**：直接命中讀者痛點

#### 內容結構優勢
- **8個標準章節完整**：從基礎認知到實際應用
- **視覺化元素豐富**：圖表、卡片、進度條等
- **專業權威建立**：大量科學數據和專業解釋

#### 用戶體驗設計
- **互動性強**：FAQ 可展開、TOC 導航
- **視覺層次清晰**：不同顏色區分內容類型
- **行動指引明確**：具體的攝取建議和選購指南

---

## 格式化與常用 CSS Class

為了維持視覺上的一致性，請多加利用以下預設的 CSS 樣式。

> **重要規則：** 為維持版面的專業性與內容的純粹性，**原則上禁止在文章內使用任何裝飾性圖示（包含 Emoji）**。所有範例均不應包含圖示，以確保視覺焦點完全回歸內容本身。

### 1. **提示框 (`.alert`)**
   - **一般提示**：`class="alert alert-tip"` (綠色系)
   - **營養師提醒**：`class="alert alert-nutritionist"` (藍色系)
   - **醫師警告**：`class="alert alert-doctor"` (紅色系)

   ```html
   <div class="alert alert-tip">
     <strong>營養師小撇步：</strong> 怕高溫、怕光、怕氧氣...
   </div>
   ```

### 提示框圖示使用規則 (例外條款)

為了在不犧牲專業性的前提下，增強特定提示的視覺辨識度，我們針對以下三種提示框設立圖示使用例外。

此規則**僅限於**透過 CSS `::before` 偽元素添加，**嚴禁**在文章內文中手動插入任何圖示或 Emoji。

#### 實作方式

在 CSS 樣式中，為對應的 class 添加 `::before` 偽元素，並使用 `content` 屬性插入 Unicode 圖示。

**1. 醫師警告 (`.alert-doctor`)**
   - **圖示：** ⚠️ (Warning Sign)
   - **CSS 程式碼範例：**
     ```css
     .alert-doctor > strong::before {
       content: '⚠️';
       margin-right: 8px;
     }
     ```

**2. 營養師提醒 (`.alert-nutritionist`)**
   - **圖示：** 💡 (Light Bulb)
   - **CSS 程式碼範例：**
     ```css
     .alert-nutritionist > strong::before {
       content: '💡';
       margin-right: 8px;
     }
     ```

**3. 一般提示 (`.alert-tip`)**
   - **圖示：** 💡 (Light Bulb)
   - **CSS 程式碼範例：**
     ```css
     .alert-tip > strong::before {
       content: '💡';
       margin-right: 8px;
     }
     ```

#### 注意事項
*   此為**唯一**的圖示使用例外，其餘地方仍維持「原則禁止」的規定。
*   圖示的目的是為了**功能性**（加強警告/提示），而非裝飾。
*   我選擇將圖示附加在 `<strong>` 標籤前，這樣它會與「醫師警告：」這類標題文字緊鄰，視覺上更為整合。

### 2. **資訊卡片 (`.info-cards`)**
   - 用於並列呈現 3-4 個核心觀點或功效。

   ```html
   <div class="info-cards">
     <div class="info-card">
       <h4 class="info-card-title">核心功效一</h4>
       <p class="info-card-desc">說明此功效的詳細內容...</p>
     </div>
     <!-- more cards... -->
   </div>
   ```

### 3. **風險族群卡片 (`.risk-card`)**
   - 用於強調哪些族群需要特別注意。

   ```html
    <div class="risk-group-cards">
      <div class="risk-card">
        <div class="risk-card-header">
          <h4 class="risk-card-title">吸菸者</h4>
        </div>
        <p class="risk-card-desc">香菸會產生大量自由基...</p>
      </div>
      <!-- more cards... -->
    </div>
   ```

### 4. **比較表格 (`.data-table`)**
   - 用於比較不同產品、食物的優劣。

   ```html
   <table class="data-table">
     <thead>
       <tr><th>排名</th><th>食物項目</th><th>含量 (mg)</th></tr>
     </thead>
     <tbody>
       <tr><td>冠軍</td><td><strong>葵花籽</strong></td><td><strong>36.3</strong></td></tr>
       <!-- more rows... -->
     </tbody>
   </table>
   ```

### 5. **進階比較表格 (`.comparison-table`)**
   - 用於多個項目（如不同劑型、來源）的詳細優劣比較，特別是當有「推薦選項」時。
   - 此表格設計更具視覺引導性，能幫助讀者快速抓住重點。

   ```html
   <div class="comparison-table-container">
       <table class="comparison-table">
           <thead>
               <tr>
                   <th class="comparison-header-main">比較項目</th>
                   <th class="comparison-header-option comparison-recommended">
                       <div class="option-badge">推薦</div>
                       <strong>魚油 (Fish Oil)</strong>
                   </th>
                   <th class="comparison-header-option">
                       <strong>磷蝦油 (Krill Oil)</strong>
                   </th>
               </tr>
           </thead>
           <tbody>
               <tr class="comparison-row">
                   <td class="comparison-label">生物利用率</td>
                   <td class="comparison-cell comparison-recommended">
                       <div class="rating-badge rating-high">高</div>
                   </td>
                   <td class="comparison-cell">
                       <div class="rating-badge rating-very-high">極高</div>
                   </td>
               </tr>
               <tr class="comparison-row">
                   <td class="comparison-label">優缺點</td>
                   <td class="comparison-cell comparison-recommended">
                       <div class="pros-cons">
                           <div class="pros">+ 性價比高、研究完整</div>
                           <div class="cons">- 可能有魚腥味</div>
                       </div>
                   </td>
                   <td class="comparison-cell">
                       <div class="pros-cons">
                           <div class="pros">+ 吸收率極佳、無腥味</div>
                           <div class="cons">- 價格昂貴、濃度偏低</div>
                       </div>
                   </td>
               </tr>
           </tbody>
       </table>
   </div>
   ```
   > **注意**: 此表格的完整 CSS 樣式較為複雜，已內建於各文章頁面的 `<style>` 區塊中。您可以在 `tests/comparison-table-demo.html` 中找到完整的實作範例。

---

## 整合 SVG 視覺化圖表

### 目的
建立一個標準化的指令 (Prompt)，用於指導 AI 在生成或優化文章時，主動扮演「視覺化內容策略師」的角色，找出最適合用圖表呈現的段落，並直接產出對應的 SVG 程式碼。

### Prompt 範本

#### # 角色 (Role)
你是一位頂尖的健康領域內容策略師，同時也是一位精通數據視覺化的前端開發者。你擅長將複雜的健康知識轉化為清晰、易懂且具吸引力的視覺圖表，並且堅持使用最純粹、高效的網頁技術來實現。

#### # 任務 (Task)
你的任務是分析我提供的文章草稿，找出其中最適合進行視覺化升級的 3-5 個關鍵點，並為每一個點主動提出一個具體的 SVG 資訊圖表建議，最後產出完整的 HTML/SVG/CSS 程式碼。

#### # 工作流程 (Workflow)
1.  **分析內容：** 深入閱讀文章，找出適合視覺化的關鍵概念，例如：
    *   包含關鍵數據或比例的段落 (e.g., 99% vs 1%)。
    *   描述一個過程、時間軸或生命週期的部分 (e.g., 巔峰骨量變化)。
    *   需要比較多個項目的優缺點 (e.g., 不同鈣質補充品)。
    *   解釋多個元素之間複雜關係的段落 (e.g., 鈣與維生素 D、鎂的協同作用)。
2.  **提出建議：** 對於每一個你找出的關鍵點，明確提出你的視覺化建議。例如：「在『鈣的雙重角色』段落，我建議使用一個甜甜圈圖來呈現...」
3.  **產出程式碼：** 在提出建議後，立即提供一個獨立、完整的 HTML 區塊，其中包含你手寫的 SVG 圖形以及對應的 CSS 樣式。

#### # 關鍵指令 (Key Directives)
*   **純粹技術原則：** 嚴格禁止使用任何外部 JavaScript 圖表函式庫 (如 Chart.js, D3.js) 或點陣圖檔 (如 JPG, PNG)。所有圖表**必須**使用純粹的 `<svg>` 標籤手寫而成。
*   **設計風格：** 圖表設計需現代、簡潔，並與文章的整體風格 (參考色：#ff6b35) 保持一致。
*   **程式碼品質：** 產出的 SVG 程式碼必須結構清晰、易於閱讀，並具備響應式設計，確保在各種螢幕尺寸上都能正常顯示。

#### # 範例
如果文章提到「市面上有碳酸鈣、檸檬酸鈣、海藻鈣三種主流的鈣補充品」，你應主動建議：「這個段落非常適合改造成一個視覺化比較卡片，讓讀者能一目了然地比較其優缺點。」接著，你就需要提供那幾張卡片的完整 HTML 與 CSS 程式碼。

---

## 內容品質檢查要點

### 寫作品質重點
- **標題策略**：確保符合 V.I.P. + B.R.A.V.E. 框架
- **章節完整性**：包含所有8個標準章節
- **專業權威性**：避免「內容農場」語氣，使用科學數據
- **用戶體驗**：文章長度適中，使用生活化比喻
- **視覺化元素**：至少包含1個 SVG 圖表或視覺化元素

> **詳細檢查清單請參考** [`doc/new-page-checklist.md`](new-page-checklist.md)

---

## 發布前檢查

在您完成一篇文章的撰寫後，請務必完成以下兩個關鍵步驟：

1. **更新文章彙整頁面**：手動打開 `/post/archive.html` 檔案，將新文章的卡片資訊新增至列表頂端。
2. **更新 Sitemap**：手動打開 `/sitemap.xml` 檔案，加入新文章的 `<url>` 資訊。

> **完整技術檢查清單請參考** [`doc/new-page-checklist.md`](new-page-checklist.md)

---

## SEO 與 Metadata

這是確保文章能被搜尋引擎正確索引的關鍵步驟。

1.  **基礎 Meta 標籤**：確實填寫 `<title>`、`<meta name="description">` 和 `<meta name="keywords">`。
    - **頁面描述 (description)**：頁面描述是影響點閱率的關鍵。撰寫時應**完整使用 V.I.P. + B.R.A.V.E. 混合框架**，將文章的核心價值與誘因濃縮在 150 字元左右的文案中。目標是創造最大的 SEO 點擊誘因與資訊價值。
      - **寫作範例 (以益生菌為例)**: `想終結便秘腹瀉嗎？快來了解益生菌的7大關鍵功效！最新指南將教你如何看懂菌株編號，5分鐘學會挑選技巧，重建腸道健康。`
    - `keywords` 應包含文章的核心關鍵字。

2.  **JSON-LD 結構化資料**：**此為必填項目**。請務必複製並修改以下範本，填入正確的文章資訊。

    ```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://life.maxlist.xyz/post/your-new-page.html" // 修改為新頁面的完整網址
      },
      "headline": "文章主標題", // 與 <title> 相似
      "description": "文章的詳細描述", // 與 meta description 相似
      "image": "https://life.maxlist.xyz/assets/images/your-og-image.jpg", // 替換為代表性圖片
      "author": {
        "@type": "Organization",
        "name": "Caregiver 營養百科",
        "url": "https://life.maxlist.xyz/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Caregiver 營養百科",
        "logo": {
          "@type": "ImageObject",
          "url": "https://life.maxlist.xyz/assets/images/logo-for-google.png"
        }
      },
      "datePublished": "YYYY-MM-DD", // 首次發布日期
      "dateModified": "YYYY-MM-DD"  // 最後修改日期
    }
    </script>
    ```

3.  **全站品牌識別 (Site Name) 設定**：為了確保 Google 搜尋結果正確顯示網站名稱為「營養百科」，而非繼承主網域的名稱，所有頁面都必須包含以下設定。
    - **`og:site_name` 標籤**：在每個頁面的 `<head>` 中加入，為社群分享提供正確的網站名稱。
      ```html
      <meta property="og:site_name" content="營養百科" />
      ```

    - **`WebSite` 結構化資料**：在每個頁面的 `<head>` 中加入，明確向搜尋引擎宣告網站身份。這是**最關鍵**的步驟。
      ```html
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "營養百科",
        "alternateName": "營養百科",
        "url": "https://life.maxlist.xyz/"
      }
      </script>
      ```

    - **`BreadcrumbList` 結構化資料**：為所有**非首頁**的頁面加入麵包屑導航數據，強化網站層級與品牌主體。
      ```html
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "營養百科",
          "item": "https://life.maxlist.xyz/"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "目前頁面的標題" // 例如: "關於我們" 或 "維生素D完整指南"
        }]
      }
      </script>
      ```

---

## 快速模板與工具

### 標題生成器
```
營養素名稱：_______
核心價值：_______
引發好奇：_______
解決問題：_______
數量關鍵字：_______
速度關鍵字：_______

生成標題：_______
```

### 頁面描述生成器
```
目標讀者：_______
主要痛點：_______
解決方案：_______
具體效益：_______
時間承諾：_______

頁面描述：_______
```

### 文章結構檢查表
```
□ 引人入勝的開頭（Hero Section）
  □ 營養素分類標籤
  □ V.I.P. + B.R.A.V.E. 標題
  □ 吸引人的副標題
  □ 閱讀時間預估

□ 8個標準章節完整性
  □ 基本資訊：營養素是什麼？
  □ 核心功效：對人體有哪些好處？
  □ 每日建議攝取量與最佳時間
  □ 食物來源：哪些天然食物富含此營養素？
  □ 誰最需要補充？缺乏警訊與高風險族群
  □ 如何挑選補充品？
  □ 副作用與注意事項
  □ 常見問題 (FAQ)

□ 結尾模組
  □ 相關營養素連結
  □ 免責聲明
```

### CSS 類別快速參考
```css
/* 提示框 */
.alert-tip { background: #fffbeb; color: #b45309; }
.alert-nutritionist { background: #eff6ff; color: #1e40af; }
.alert-doctor { background: #fef2f2; color: #b91c1c; }

/* 資訊卡片 */
.info-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.info-card { background: white; border-radius: 15px; padding: 30px; }

/* 風險族群卡片 */
.risk-group-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
.risk-card { background: #fffbeb; border-left: 4px solid #f59e0b; }

/* 數據表格 */
.data-table { width: 100%; border-collapse: collapse; background: white; border-radius: 15px; }

/* 高亮關鍵字 */
.highlight-nutrient { border-bottom: 2px solid #ff6b35; padding-bottom: 1px; }
```

### 快速導航
- [標題撰寫策略](#標題撰寫的終極策略)
- [文章結構](#文章結構-由上至下)
- [完整範例](#完整範例鈣質文章撰寫示範)
- [CSS 樣式指南](#格式化與常用-css-class)
- [視覺化圖表](#整合-svg-視覺化圖表)
- [品質檢查清單](#文章品質檢查清單)
- [SEO 設定](#seo-與-metadata)
- [發布前檢查](#發布前檢查)
