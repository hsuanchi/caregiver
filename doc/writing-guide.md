# ✍️ Caregiver 營養百科 - 文章風格指南

這份文件旨在為所有「營養百科」的文章建立一套統一、高標準的風格與結構。遵循此指南將有助於我們產出高品質、風格一致且對讀者極具吸引力的內容。

---

## 🎨 總體風格與核心理念

文章的整體風格應為**「專業、親切且易於行動」**。我們透過專業的口吻建立權威，同時用生活化的比喻和清晰的視覺設計拉近與讀者的距離，並在文末提供明確的指引。

---

## 🔩 文章結構 (由上至下)

每篇文章都應遵循以下標準結構，以確保內容的連貫性與完整性。
 
#### 1. **引人入勝的開頭**
   - **標題撰寫的終極策略：V.I.P. + B.R.A.V.E. 混合框架**
     - **核心要求：** 我們的標題不怕長，但**必須**精準且全面。標題應盡可能融合 V.I.P. 與 B.R.A.V.E. 框架的元素，創造最大的點擊誘因與資訊價值，但**首要原則是「文要對題」**，絕不可為了套用公式而犧牲內容的準確性。
     - **V.I.P. 框架 (內容核心)**
       - **V (Value-Driven - 價值驅動):** 明確點出對讀者的核心**益處**。
       - **I (Intriguing - 引發好奇):** 使用**比喻、提問或知識缺口**來吸引讀者。
       - **P (Problem-Solving - 解決問題):** 直接命中讀者的**痛點**或生活情境。
     - **B.R.A.V.E. 框架 (點擊觸發器)**
       - **B (Brand - 品牌):** 在標題結尾加入「**| 營養百科**」，建立權威感。
       - **R (Recentness - 時效性):** (非必要) 若內容具時效性，可加入**年份**，如「2025年」。
       - **A (Amount - 數量):** 使用**具體數字**，如「7大功效」、「5個技巧」，暗示內容的豐富性。
       - **V (Velocity - 速度):** 強調**效率**，如「5分鐘搞懂」、「快速上手」。
       - **E (Economy - 經濟性):** 強調**免費或高CP值**，如「免費指南」、「省錢妙招」。

   - **綜合應用範例 (V+I+P+B+R+A+V+E)**
     - **目標：** 撰寫一篇關於「益生菌」的文章。
     - **元素拆解：**
       - **V (價值):** 重建腸道平衡、改善消化。
       - **I (好奇):** 菌株編號的秘密是什麼？
       - **P (問題):** 解決便秘、腹瀉困擾。
       - **B (品牌):** | 營養百科
       - **R (時效性):** 2025年 (若適用)
       - **A (數量):** 7大關鍵
       - **V (速度):** 5分鐘搞懂
       - **E (經濟性):** 免費完整指南
     - **最終標題組合：**
       - `益生菌 (核心主題) - 2025年終結便秘腹瀉的7大關鍵：5分鐘搞懂菌株編號秘密的免費完整指南 | 營養百科`
   - **摘要區塊**：在主要內容開始前，提供一個「**30 秒速讀版**」或「**需求自我檢測**」區塊，快速抓住讀者興趣。

#### 2. **清晰的章節劃分**
   - 內文應使用 `<h2>` 和 `<h3>` 標籤劃分章節。
   - 建議的章節順序：
     1.  `基礎知識` (這是什麼？)
     2.  `核心功效` (有什麼好處？)
     3.  `如何補充/挑選` (我該怎麼做？)
     4.  `常見迷思` (破解錯誤觀念)
     5.  `常見問題 (FAQ)`

#### 3. **固定的結尾模組**
   - **相關營養素**：在文章主要內容結束後，提供 2-3 個相關主題的文章連結，以卡片形式呈現，增加內部連結。
   - **免責聲明**：在頁尾組件前，必須加上標準的免責聲明區塊。

---
🗣️ 內容與語氣
## 

#### 1. **專業口吻**
   - 適時使用「**營養師提醒**」、「**醫師警告**」等提示框，增加內容的權威性。

#### 2. **善用比喻**
   - 將複雜的科學概念轉化為簡單易懂的比喻。例如：
     - *維生素B群是身體的「能量轉換器」。*
     - *Q10是「心臟的能量火星塞」。*

#### 3. **強調重點**
   - 對於段落中的關鍵字詞，使用 `<strong>` 標籤或 `<span class="highlight-nutrient">` 來凸顯。

#### 4. **善用讀者觀點**
   - 在撰寫前，先思考讀者為何會搜尋這個主題？他們可能遇到了什麼具體問題（例如：失眠、容易累、皮膚不好），或是有什麼樣的目標（例如：備孕、提升運動表現）。
   - 從讀者會遇到的日常生活情境出發，分析其背後的意圖與困難，讓文章內容能真正解決他們的問題，而不只是單純的知識陳列。

---

## 💻 格式化與常用 CSS Class

為了維持視覺上的一致性，請多加利用以下預設的 CSS 樣式。

#### 1. **提示框 (`.alert`)**
   - **一般提示**：`class="alert alert-tip"` (綠色系)
   - **營養師提醒**：`class="alert alert-nutritionist"` (藍色系)
   - **醫師警告**：`class="alert alert-doctor"` (紅色系)

   ```html
   <div class="alert alert-tip">
     <strong>💡 營養師小撇步：</strong> 怕高溫、怕光、怕氧氣...
   </div>
   ```

#### 2. **資訊卡片 (`.info-cards`)**
   - 用於並列呈現 3-4 個核心觀點或功效。

   ```html
   <div class="info-cards">
     <div class="info-card">
       <span class="info-card-icon">✨</span>
       <h4 class="info-card-title">使命一：對抗老化</h4>
       <p class="info-card-desc">維生素E能中斷自由基的連鎖反應...</p>
     </div>
     <!-- more cards... -->
   </div>
   ```

#### 3. **風險族群卡片 (`.risk-card`)**
   - 用於強調哪些族群需要特別注意，通常帶有黃色警示風格。

   ```html
    <div class="risk-group-cards">
      <div class="risk-card">
        <div class="risk-card-header">
          <span class="risk-card-icon">🚬</span>
          <h4 class="risk-card-title">吸菸者</h4>
        </div>
        <p class="risk-card-desc">香菸會產生大量自由基...</p>
      </div>
      <!-- more cards... -->
    </div>
   ```

#### 4. **比較表格 (`.data-table`)**
   - 用於比較不同產品、食物的優劣。

   ```html
   <table class="data-table">
     <thead>
       <tr><th>排名</th><th>食物項目</th><th>含量 (mg)</th></tr>
     </thead>
     <tbody>
       <tr><td>🥇 冠軍</td><td><strong>葵花籽</strong></td><td><strong>36.3</strong></td></tr>
       <!-- more rows... -->
     </tbody>
   </table>
   ```

#### 5. **使用 Emoji**
   - 在標題、卡片和列表前適度使用 Emoji，可以讓版面更活潑，但請勿過度使用。

---

## ✅ 發布前檢查

在您完成一篇文章的撰寫後，請務必完成以下兩個關鍵步驟，以確保網站的完整性：

1.  **更新文章彙整頁面**：手動打開 `/post/archive.html` 檔案，將新文章的卡片資訊新增至列表頂端。
2.  **更新 Sitemap**：手動打開 `/sitemap.xml` 檔案，加入新文章的 `<url>` 資訊。

這兩個步驟對於網站的導覽和 SEO 至關重要。更詳細的檢查清單，請參考 `doc/new-page-checklist.md` 文件。

---

## 🔍 SEO 與 Metadata

這是確保文章能被搜尋引擎正確索引的關鍵步驟。

1.  **基礎 Meta 標籤**：確實填寫 `<title>`、`<meta name="description">` 和 `<meta name="keywords">`。
    - `description` 應控制在 150 字元左右，並包含核心關鍵字。

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