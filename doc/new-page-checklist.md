# 📋 新增頁面檢查清單

當您要為網站新增頁面時，請按照以下步驟確保頁面完整且符合網站標準。

## 🎯 快速檢查清單

- [ ] 建立 HTML 檔案
- [ ] 加入 GA4 分析組件
- [ ] 加入 Header 組件
- [ ] 加入 Footer 組件
- [ ] 更新 sitemap.xml

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

    <style>
      /* 頁面樣式 */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, "Noto Sans TC", sans-serif;
        line-height: 1.6;
        color: #2d3748;
        background: #faf8f5;
      }

      /* 其他樣式... */
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

    <!-- Load Components (步驟 2-4 會用到) -->
    <script src="../assets/js/deus-analytics-component.js"></script>
    <script src="../assets/js/deus-header-component.js"></script>
    <script src="../assets/js/deus-footer-component.js"></script>

    <script>
      // 初始化組件 (步驟 2-4 會用到)
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
    const analytics = new window.DeusAnalyticsComponent()
      .setDebug(false) // 開發時設為 true，正式環境設為 false
      .setEnvironment("production");
    console.log("✅ Analytics 組件初始化完成");
  } else {
    console.error("❌ Analytics 組件初始化失敗");
  }

  // 其他組件初始化...
});
```

### 3️⃣ **加入 Header 組件**

在上述初始化代碼中繼續加入：

```javascript
// Initialize Header Component
const headerContainer = document.getElementById("header-component");
if (headerContainer && window.DeusHeaderComponent) {
  const header = new window.DeusHeaderComponent(headerContainer)
    .setDebug(false)
    .setTheme("default")
    .setNavLinks([
      { text: "首頁", href: "../index.html" },
      { text: "營養素", href: "../index.html#nutrients" },
      { text: "工具", href: "../index.html#tools" },
    ]);
  console.log("✅ Header 組件初始化完成");
} else {
  console.error("❌ Header 組件初始化失敗");
}
```

### 4️⃣ **加入 Footer 組件**

在初始化代碼中加入：

```javascript
// Initialize Footer Component
const footerContainer = document.getElementById("footer-component");
if (footerContainer && window.DeusFooterComponent) {
  const footer = new window.DeusFooterComponent(footerContainer)
    .setDebug(false)
    .setTheme("default");
  console.log("✅ Footer 組件初始化完成");
} else {
  console.error("❌ Footer 組件初始化失敗");
}
```

### 5️⃣ **更新 sitemap.xml**

打開 `/sitemap.xml` 檔案，在 `</urlset>` 標籤前加入新頁面：

```xml
<url>
  <loc>https://life.maxlist.xyz/post/your-new-page.html</loc>
  <lastmod>2025-01-20</lastmod>
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

### 6️⃣ **路徑注意事項**

根據頁面位置調整腳本路徑：

| 頁面位置                             | 腳本路徑範例                   |
| ------------------------------------ | ------------------------------ |
| 根目錄 `/index.html`                 | `src="assets/js/xxx.js"`       |
| 子目錄 `/post/xxx.html`              | `src="../assets/js/xxx.js"`    |
| 二級子目錄 `/post/category/xxx.html` | `src="../../assets/js/xxx.js"` |
