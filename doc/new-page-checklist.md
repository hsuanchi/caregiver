# 新增頁面檢查清單

當您要為網站新增頁面時，請按照以下步驟確保頁面完整且符合網站標準。

> **文章寫作指引請參考** [`doc/writing-guide.md`](writing-guide.md) - 專注於內容結構、寫作風格、視覺化設計等內容層面

## 快速檢查清單

### 基礎結構
- [ ] 建立 HTML 檔案
- [ ] 設定正確的 `<title>` 標題
- [ ] 撰寫 SEO 優化的 `<meta description>`
- [ ] 設定 `<meta keywords>`
- [ ] 加入 Favicon 連結

### SEO 與結構化資料
- [ ] 加入 `og:site_name` 標籤
- [ ] 設定 Article JSON-LD 結構化資料
- [ ] 設定 WebSite JSON-LD 結構化資料
- [ ] 設定 BreadcrumbList JSON-LD 結構化資料
- [ ] 確認所有 JSON-LD 資料正確無誤

### 組件與功能
- [ ] 加入 GA4 分析組件
- [ ] 加入 Header 組件
- [ ] 加入 Footer 組件
- [ ] 加入進度條功能（如適用）
- [ ] 加入目錄導航功能（如適用）
- [ ] 加入 FAQ 互動功能（如適用）

### 內容品質
- [ ] 檢查文章結構完整性（8個標準章節）
- [ ] 啟用「PSMA 流程」：痛點 → 解方 → 原理 → 行動
- [ ] TOC 順序符合 `#problem` → `#solution` → `#mechanism` → `#how-much` → `#action-plan-food` → `#action-plan-supplements` → `#safety` → `#faq`
- [ ] 確認使用正確的 CSS 類別
- [ ] 檢查視覺化元素（圖表、卡片等）
- [ ] 驗證所有內部連結正常
- [ ] 檢查相關營養素連結
 - [ ] 迷思破解延伸章節（例：多醣體 ≠ 有效 β-葡聚醣）
 - [ ] 比較性章節（A vs. B；例：β-葡聚醣 vs. 益生菌）
 - [ ] 提示框文字分段優化（如「營養師的選購箴言」拆分短段）
 - [ ] 每個 `<h2>` 後均有引言段落 `<p>` 鋪陳背景

> **詳細寫作指引請參考** [`doc/writing-guide.md`](writing-guide.md)

### 網站整合
- [ ] **更新文章彙整頁面**
- [ ] **新增內部連結**
- [ ] 更新 sitemap.xml
- [ ] 檢查響應式設計
- [ ] **最終驗證**

---

## 詳細步驟指引

### 1. **建立基本 HTML 結構**

為了確保所有頁面都使用最新的、統一的結構與樣式，請**不要**手動撰寫新的 HTML 檔案。

**標準作法：**
1.  複製專案中的官方空白範本檔案：`/post/00empty.html`。
2.  將複製的檔案重新命名為您的新頁面檔名（例如：`collagen.html`）。
3.  基於此範本，開始修改標題、Meta 資訊與文章內容。

### 2. **加入 GA4 分析追蹤**

在 `<script>` 標籤中加入以下初始化代碼：

```javascript
// Initialize Components
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Analytics Component
  if (window.DeusAnalyticsComponent) {
    new window.DeusAnalyticsComponent().setDebug(false).setEnvironment("production");
  }

  // 其他組件初始化...
});
```

### 3. **加入 Header 組件**

在初始化代碼中繼續加入：

```javascript
// Initialize Header Component
const headerContainer = document.getElementById("header-component");
if (headerContainer && window.DeusHeaderComponent) {
  new window.DeusHeaderComponent(headerContainer).setDebug(false);
}
```

### 4. **加入 Footer 組件**

在初始化代碼中加入：

```javascript
// Initialize Footer Component
const footerContainer = document.getElementById("footer-component");
if (footerContainer && window.DeusFooterComponent) {
  new window.DeusFooterComponent(footerContainer).setDebug(false);
}
```

### 5. **更新中央資料庫**

若新增的是文章頁面，請打開 `/assets/js/articles-data.js` 檔案，在 `articlesData` 陣列中新增一筆對應的文章物件資料。`archive.html` 和 `nutrient-dashboard.html` 將會自動讀取此資料並同步更新，無需再手動編輯。

### 6. **新增內部連結**

思考新頁面與既有頁面的關聯性，在至少 1-2 個相關的舊頁面中，加入連向此新頁面的文字連結，以建立更緊密的站內連結結構。

### 7. **更新 sitemap.xml**

打開 `/sitemap.xml` 檔案，在 `</urlset>` 標籤前加入新頁面：

```xml
<url>
  <loc>https://life.maxlist.xyz/post/your-new-page.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

**優先級建議：**

- 首頁: `1.0`
- 重要文章/分類頁: `0.8`
- 一般文章: `0.6-0.7`
- 輔助頁面: `0.4-0.5`

**更新頻率建議：**

- `daily`: 每日更新的內容
- `weekly`: 每週更新的內容
- `monthly`: 每月更新的內容
- `yearly`: 很少更新的內容

### 8. **內容品質檢查**

#### 文章結構驗證
- [ ] **標題策略**：確認標題符合 V.I.P. + B.R.A.V.E. 框架
- [ ] **章節完整性**：檢查是否包含所有8個標準章節
- [ ] **敘事順序**：採用 PSMA（痛點→解方→原理→行動）
- [ ] **開場痛點**：Hero/首段明確點名 3-5 個典型困擾或族群
- [ ] **行動計畫**：包含食物餐盤路徑與補充品選購要點
- [ ] **內容深度**：確保每個章節內容充實且專業
 - [ ] **延伸章節**：包含「迷思破解」與「A vs. B 比較」等回應搜尋意圖之內容
 - [ ] **章節開場**：各 `<h2>` 之後皆有引言 `<p>` 串接脈絡

#### CSS 類別使用檢查
- [ ] 使用 `.alert` 提示框（至少3個）
- [ ] 使用 `.info-cards` 呈現核心功效
- [ ] 使用 `.risk-group-cards` 列出高風險族群
- [ ] 使用 `.data-table` 呈現數據比較
- [ ] 使用 `.highlight-nutrient` 強調關鍵字

#### 視覺化元素檢查
- [ ] 至少包含1個 SVG 圖表或視覺化元素
- [ ] 使用比較卡片展示不同產品類型
- [ ] 包含互動式 FAQ 設計
- [ ] 檢查所有圖表在手機上的顯示效果

#### PSMA 快速核對（建議）
```
□ Pain：有無 `.risk-group-cards` 命中族群/症狀？
□ Solution：.info-cards 是否用動詞與可量化語句？
□ Mechanism：是否聚焦 1-2 個關鍵機制詞並做對比？
□ Action-Food：是否提供逐步增量/聰明替換？
□ Action-Supplements：是否以「機制×族群」給出首選與備選？
```

> **詳細寫作指引和範例請參考** [`doc/writing-guide.md`](writing-guide.md)

### 9. **SEO 優化檢查**

#### Meta 標籤驗證
- [ ] `<title>` 長度在 50-60 字元之間
- [ ] `<meta description>` 長度在 150-160 字元之間
- [ ] `<meta keywords>` 包含主要關鍵字
- [ ] 標題和描述符合 V.I.P. + B.R.A.V.E. 框架

#### 結構化資料驗證
- [ ] Article JSON-LD 包含完整資訊
- [ ] WebSite JSON-LD 設定正確網站名稱
- [ ] BreadcrumbList JSON-LD 包含正確階層
- [ ] 所有 JSON-LD 語法正確無誤

#### 內部連結策略
- [ ] 在至少2個相關頁面加入新頁面連結
- [ ] 相關營養素連結正確且有意義
- [ ] 所有內部連結使用相對路徑
- [ ] 檢查連結文字是否描述性強

### 10. **技術功能檢查**

#### 互動功能測試
- [ ] 進度條功能正常運作
- [ ] 目錄導航連結正確跳轉
- [ ] FAQ 展開/收合功能正常
- [ ] 所有按鈕和互動元素有懸停效果

#### 響應式設計驗證
- [ ] 桌面版（1920px+）顯示正常
- [ ] 平板版（768px-1024px）顯示正常
- [ ] 手機版（320px-767px）顯示正常
- [ ] 所有文字在手機上可讀性良好
- [ ] **（新增）寬表格/複雜組件處理**：
  - 對於多欄位的寬表格（如 `.comparison-table`）或複雜圖表，必須採用特定策略以防破壞手機版面。
  - **建議方案**：將該組件用一個 `div` 包裹，並添加 CSS 使其可橫向滑動。
  - **範例程式碼**：
    ```html
    <!-- HTML 結構 -->
    <div class="responsive-table-wrapper">
      <div class="comparison-table-container">
        <!-- ...您的寬表格 ... -->
      </div>
    </div>
    ```
    ```css
    /* CSS 樣式 (加入 @media (max-width: 768px) 中) */
    .responsive-table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch; /* 增強在 iOS 上的滑動體驗 */
      border: 1px solid #e2e8f0;
      border-radius: 15px;
      padding: 10px;
    }
    ```

### 11. **最終驗證**

#### 瀏覽器相容性
- [ ] Chrome 最新版本測試通過
- [ ] Firefox 最新版本測試通過
- [ ] Safari 最新版本測試通過
- [ ] Edge 最新版本測試通過

#### 效能檢查
- [ ] 頁面載入速度 < 3 秒
- [ ] 圖片優化且載入正常
- [ ] 沒有多餘的 CSS 或 JavaScript
- [ ] 主控台無錯誤訊息

#### 可訪問性檢查
- [ ] 所有圖片有 alt 文字
- [ ] 標題層級結構正確（h1 > h2 > h3）
- [ ] 顏色對比度符合標準
- [ ] 鍵盤導航功能正常

### 12. **實用檢查工具**

#### 線上工具推薦
- **SEO 檢查**：[Google PageSpeed Insights](https://pagespeed.web.dev/)
- **結構化資料驗證**：[Google Rich Results Test](https://search.google.com/test/rich-results)
- **可訪問性檢查**：[WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- **響應式測試**：[Responsive Design Checker](https://www.responsivedesignchecker.com/)

#### 瀏覽器開發者工具檢查
```javascript
// 檢查 JSON-LD 是否正確載入
console.log(JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent));

// 檢查所有內部連結
document.querySelectorAll('a[href^="../"], a[href^="./"]').forEach(link => {
  console.log(link.href, link.textContent);
});
```

### 13. **技術檢查重點**

#### 需要特別注意的技術項目
- **JSON-LD 資料完整性**：確認所有結構化資料欄位都有填寫
- **內部連結策略**：確保相關營養素連結有意義且正確
- **響應式設計**：特別檢查圖表在手機上的顯示效果
- **可訪問性**：確保所有 SVG 圖表有適當的 alt 文字
- **組件初始化**：確認所有 JavaScript 組件正常載入

### 14. **路徑注意事項**

根據頁面位置調整腳本路徑：

| 頁面位置                             | 腳本路徑範例                   |
| ------------------------------------ | ------------------------------ |
| 根目錄 `/index.html`                 | `src="assets/js/xxx.js"`       |
| 子目錄 `/post/xxx.html`              | `src="../assets/js/xxx.js"`    |
| 二級子目錄 `/post/category/xxx.html` | `src="../../assets/js/xxx.js"` |

### 15. **常見錯誤預防**

#### 容易遺漏的項目
- [ ] 忘記更新 `dateModified` 日期
- [ ] JSON-LD 中的 URL 路徑錯誤
- [ ] 內部連結使用絕對路徑而非相對路徑
- [ ] 忘記在相關頁面加入新頁面連結
- [ ] CSS 類別名稱拼寫錯誤

#### 品質控制重點
- [ ] 確保所有數據表格有響應式設計
- [ ] 檢查所有圖表在深色模式下的顯示
- [ ] 驗證所有互動功能在觸控設備上正常運作
- [ ] 確認頁面載入速度符合標準

---

## 快速檢查模板

### 新頁面發布前 5 分鐘檢查
```
□ 標題符合 V.I.P. + B.R.A.V.E. 框架
□ Meta 描述在 150 字元內
□ 所有 JSON-LD 資料完整
□ 8個標準章節全部包含
□ 至少3個提示框（alert）
□ 至少1個視覺化圖表
□ 相關營養素連結正確
□ 手機版顯示正常
□ 所有連結可正常點擊
□ 主控台無錯誤訊息
```

### 緊急修復檢查清單
```
□ 檢查所有 JSON-LD 語法是否正確
□ 確認所有內部連結路徑正確
□ 驗證 CSS 類別名稱拼寫
□ 檢查圖片路徑和 alt 文字
□ 確認響應式設計在各種螢幕尺寸下正常
```

---

## 檢查清單統計

- **總檢查項目**：75+ 項
- **基礎結構**：5 項
- **SEO 優化**：15 項  
- **內容品質**：20 項
- **技術功能**：15 項
- **最終驗證**：20 項

**建議檢查時間**：新頁面 30-45 分鐘，更新頁面 15-20 分鐘