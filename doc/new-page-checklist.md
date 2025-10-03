# 📋 新增頁面檢查清單

當您要為網站新增頁面時，請按照以下步驟確保頁面完整且符合網站標準。

## 🎯 快速檢查清單

- [ ] 建立 HTML 檔案
- [ ] 加入 GA4 分析組件
- [ ] 加入 Header 組件
- [ ] 加入 Footer 組件
- [ ] **更新文章彙整頁面**
- [ ] **新增內部連結**
- [ ] 更新 sitemap.xml
- [ ] **最終驗證**

---

## 📝 詳細步驟指南

### 1️⃣ **建立基本 HTML 結構**

使用以下模板作為新頁面的起點：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>頁面標題 | 營養百科</title>
    <meta name="description" content="頁面描述（建議 150-160 字元）" />
    <meta name="keywords" content="關鍵字1, 關鍵字2, 關鍵字3" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/pic/Nutrition Encyclopedia.png">
    <link rel="shortcut icon" type="image/png" href="/pic/Nutrition Encyclopedia.png">
    <!-- Open Graph for Social Media -->
    <meta property="og:site_name" content="營養百科" />

    <!-- JSON-LD for Structured Data (SEO) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://life.maxlist.xyz/post/your-new-page.html"
      },
      "headline": "文章主標題",
      "description": "文章的詳細描述",
      "image": "https://life.maxlist.xyz/assets/images/your-og-image.jpg",
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
      "datePublished": "YYYY-MM-DD",
      "dateModified": "YYYY-MM-DD"
    }
    </script>

    <!-- JSON-LD for WebSite (Site Name in Search Results) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "營養百科",
      "alternateName": "營養百科",
      "url": "https://life.maxlist.xyz/"
    }
    </script>

    <!-- JSON-LD for Breadcrumb -->
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
        "name": "目前頁面的標題"
      }]
    }
    </script>

    <style>
      /* 頁面樣式 */
    </style>
  </head>
  <body>
    <!-- Header Component Container -->
    <div id="header-component"></div>

    <!-- 主要內容區域 -->
    <main>
      <!-- 您的頁面內容 -->
    </main>

    <!-- Footer Component Container -->
    <div id="footer-component"></div>

    <!-- Load Components -->
    <script src="../assets/js/deus-analytics-component.js"></script>
    <script src="../assets/js/deus-header-component.js"></script>
    <script src="../assets/js/deus-footer-component.js"></script>

    <script>
      // 初始化組件
    </script>
  </body>
</html>
```

### 2️⃣ **加入 GA4 分析追蹤**

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

### 3️⃣ **加入 Header 組件**

在初始化代碼中繼續加入：

```javascript
// Initialize Header Component
const headerContainer = document.getElementById("header-component");
if (headerContainer && window.DeusHeaderComponent) {
  new window.DeusHeaderComponent(headerContainer).setDebug(false);
}
```

### 4️⃣ **加入 Footer 組件**

在初始化代碼中加入：

```javascript
// Initialize Footer Component
const footerContainer = document.getElementById("footer-component");
if (footerContainer && window.DeusFooterComponent) {
  new window.DeusFooterComponent(footerContainer).setDebug(false);
}
```

### 5️⃣ **更新文章彙整頁面**

若新增的是文章頁面，請打開 `/post/archive.html`，手動新增該篇文章的卡片資訊，以確保目錄同步更新。

### 6️⃣ **新增內部連結**

思考新頁面與既有頁面的關聯性，在至少 1-2 個相關的舊頁面中，加入連向此新頁面的文字連結，以建立更緊密的站內連結結構。

### 7️⃣ **更新 sitemap.xml**

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

### 8️⃣ **最終驗證**

- **響應式檢查**：在桌面和手機兩種尺寸下，檢查頁面排版是否正常。
- **連結檢查**：點擊頁面上的所有連結，確保沒有失效連結 (404)。
- **主控台檢查**：在瀏覽器中打開開發者工具 (F12)，確認 Console 面板沒有任何紅色錯誤訊息。

### 9️⃣ **路徑注意事項**

根據頁面位置調整腳本路徑：

| 頁面位置                             | 腳本路徑範例                   |
| ------------------------------------ | ------------------------------ |
| 根目錄 `/index.html`                 | `src="assets/js/xxx.js"`       |
| 子目錄 `/post/xxx.html`              | `src="../assets/js/xxx.js"`    |
| 二級子目錄 `/post/category/xxx.html` | `src="../../assets/js/xxx.js"` |