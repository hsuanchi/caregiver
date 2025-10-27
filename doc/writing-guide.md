<!DOCTYPE html>
<html lang="zh-Hant" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caregiver 專案 - 完整開發指引</title>
    <!-- 引入 Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- 引入 Inter 字體 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- 內嵌 CSS - 包含規範中定義的所有樣式 -->
    <style>
        /* 基本字體設定 */
        body {
            font-family: 'Inter', 'Noto Sans TC', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* 程式碼區塊美化 */
        pre {
            background-color: #f3f4f6; /* bg-gray-100 */
            border: 1px solid #e5e7eb; /* border-gray-200 */
            border-radius: 0.5rem; /* rounded-lg */
            padding: 1rem; /* p-4 */
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9em;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        pre code {
            white-space: pre;
        }
        
        /* 內容區域的標題樣式 */
        main h1 {
            font-size: 2.25rem; /* text-3xl */
            font-weight: 700; /* font-bold */
            margin-top: 2.5rem; /* mt-10 (for sections after the first) */
            margin-bottom: 1rem; /* mb-4 */
            padding-bottom: 0.5rem; /* pb-2 */
            border-bottom: 2px solid #ff6b35; /* border-b-2 border-orange-500 */
        }
        main h1:first-child {
            margin-top: 0;
        }
        main h2 {
            font-size: 1.875rem; /* text-2xl */
            font-weight: 600; /* font-semibold */
            margin-top: 2.5rem; /* mt-10 */
            margin-bottom: 1rem; /* mb-4 */
            padding-bottom: 0.5rem; /* pb-2 */
            border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
        }
        main h3 {
            font-size: 1.5rem; /* text-xl */
            font-weight: 600; /* font-semibold */
            margin-top: 2rem; /* mt-8 */
            margin-bottom: 1rem; /* mb-4 */
        }
        main h4 {
            font-size: 1.25rem; /* text-lg */
            font-weight: 600; /* font-semibold */
            margin-top: 1.5rem; /* mt-6 */
            margin-bottom: 0.5rem; /* mb-2 */
        }
        /* [新增] h5 樣式 */
        main h5 {
            font-size: 1.125rem; /* text-lg slightly smaller */
            font-weight: 600; /* font-semibold */
            margin-top: 1.5rem; /* mt-6 */
            margin-bottom: 0.75rem; /* mb-3 */
            color: #1f2937; /* text-gray-800 */
        }
        main p, main ul, main ol {
            margin-bottom: 1rem; /* mb-4 */
            line-height: 1.75; /* leading-relaxed */
            color: #374151; /* text-gray-700 */
        }
        main ul {
            list-style-type: disc;
            padding-left: 1.5rem; /* pl-6 */
        }
        main ol {
            list-style-type: decimal;
            padding-left: 1.5rem; /* pl-6 */
        }
        main li {
            margin-bottom: 0.5rem; /* mb-2 */
        }
        /* Style for checkboxes in lists */
        main li > input[type="checkbox"] {
            margin-right: 0.5rem;
            transform: translateY(2px);
        }
        main strong {
            color: #1f2937; /* text-gray-800 */
        }
        main a {
            color: #ff6b35;
            text-decoration: underline;
            text-decoration-offset: 2px;
        }
        main blockquote {
            border-left: 4px solid #ff6b35;
            padding-left: 1rem; /* pl-4 */
            margin: 1.5rem 0; /* my-6 */
            background-color: #fffbeb; /* bg-amber-50 */
            color: #78350f; /* text-amber-800 */
            font-style: italic;
        }
        main code {
            background-color: #f3f4f6;
            color: #c2410c; /* text-orange-700 */
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-size: 0.9em;
            font-family: 'Courier New', Courier, monospace;
        }
        main pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
            border-radius: 0;
            font-size: 1em;
        }

        /* 側邊欄 TOC 樣式 */
        #toc-nav a {
            transition: all 0.2s ease-in-out;
            color: #4b5563; /* text-gray-600 */
        }
        #toc-nav a:hover {
            color: #1f2937; /* text-gray-800 */
        }
        #toc-nav a.active {
            color: #ff6b35;
            font-weight: 600; /* font-semibold */
            transform: translateX(4px);
        }
        #toc-nav a.toc-h1 {
            font-weight: 600;
            color: #111827; /* text-gray-900 */
            margin-top: 0.75rem;
        }
        #toc-nav a.toc-h1.active {
            color: #ff6b35;
            font-weight: 700;
        }
        #toc-nav a.toc-h2 {
            padding-left: 1rem; /* pl-4 */
            font-size: 0.9rem; /* text-sm */
        }
        #toc-nav a.toc-h2.active {
            border-left: 2px solid #ff6b35;
            padding-left: 0.75rem; /* pl-3 */
        }
        #toc-nav a.toc-h3 {
            padding-left: 2rem; /* pl-8 */
            font-size: 0.85rem; /* text-xs */
            color: #6b7280; /* text-gray-500 */
        }
        #toc-nav a.toc-h3.active {
            color: #ff6b35;
            border-left: 2px solid #fdba74; /* border-orange-300 */
            padding-left: 1.75rem; /* pl-7 */
            font-weight: 500;
        }
        /* [新增] TOC H4/H5 樣式 */
         #toc-nav a.toc-h4, #toc-nav a.toc-h5 {
            padding-left: 3rem; /* Further indent */
            font-size: 0.8rem; /* Even smaller */
            color: #9ca3af; /* text-gray-400 */
        }
         #toc-nav a.toc-h4.active, #toc-nav a.toc-h5.active {
            color: #f97316; /* text-orange-600 */
            border-left: 2px solid #fed7aa; /* border-orange-200 */
            padding-left: 2.75rem; 
            font-weight: 500;
        }
        /* Style for sub-item in TOC */
        #toc-nav a.sub-item {
             padding-left: 2rem; /* Indent sub-items */
             font-size: 0.85rem; /* Smaller font for sub-items */
             color: #6b7280; /* Lighter color for sub-items */
        }
        #toc-nav a.sub-item::before {
             content: "- ";
             margin-right: 0.25rem;
        }
        #toc-nav a.sub-item.active {
            color: #ff6b35;
            border-left: 2px solid #fdba74;
            padding-left: 1.75rem;
        }


        /* * -------------------------------------------------
         * 以下是從「風格指引」中複製過來的關鍵 CSS 樣式
         * -------------------------------------------------
        */

        /* 1. 提示框 (.alert) */
        .alert {
            padding: 1rem; /* p-4 */
            border-radius: 0.5rem; /* rounded-lg */
            margin-bottom: 1rem; /* mb-4 */
            border-width: 1px;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem; /* gap-3 */
        }
        .alert strong {
            flex-shrink: 0;
        }
        .alert p {
            margin-bottom: 0;
            line-height: 1.6;
        }
        /* 自動添加圖示 */
        .alert-doctor::before,
        .alert-nutritionist::before,
        .alert-tip::before {
            flex-shrink: 0;
            margin-top: 0.125rem; /* mt-0.5 */
            font-size: 1.125rem; /* text-lg */
        }

        .alert-tip { 
            background: #fffbeb; 
            color: #b45309; 
            border-color: #fde68a;
        }
        .alert-tip::before {
            content: '💡';
        }

        .alert-nutritionist { 
            background: #eff6ff; 
            color: #1e40af; 
            border-color: #bfdbfe;
        }
        .alert-nutritionist::before {
            content: '💡';
        }
        
        .alert-doctor { 
            background: #fef2f2; 
            color: #b91c1c; 
            border-color: #fecaca;
        }
        .alert-doctor::before {
            content: '⚠️';
        }

        /* 2. 資訊卡片 (.info-cards) */
        .info-cards { 
            display: flex; 
            flex-wrap: wrap; 
            align-items: stretch; 
            justify-content: flex-start; 
            gap: 20px; 
            margin-bottom: 1rem;
        }
        .info-card { 
            flex: 1; 
            min-width: 280px; 
            /* [修改] 變更 max-width 以實現最多 2 欄 */
            max-width: calc(50% - 10px); 
            box-sizing: border-box; 
            background: white; 
            border-radius: 15px; 
            padding: 30px; 
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); 
            border: 1px solid #e5e7eb;
        }
        .info-card-title {
            font-size: 1.125rem; /* text-lg */
            font-weight: 600;
            margin-top: 0 !important; /* 覆蓋 main h4 樣式 */
            margin-bottom: 0.5rem;
            color: #1f2937;
        }
        .info-card-desc {
            font-size: 0.9rem;
            color: #4b5563;
        }
        .info-card p {
             margin-bottom: 0;
        }

        /* 3. 風險族群卡片 (.risk-group-cards) */
        .risk-group-cards { 
            display: flex; 
            flex-wrap: wrap; 
            align-items: stretch; 
            justify-content: flex-start; 
            gap: 20px; 
            margin-bottom: 1rem;
        }
        .risk-card { 
            flex: 1; 
            min-width: 250px; 
            /* 風險卡片維持 3 欄 */
            max-width: calc(33.333% - 14px); 
            box-sizing: border-box; 
            background: #fffbeb; 
            border-left: 4px solid #f59e0b;
            padding: 1.5rem;
            border-radius: 0 0.5rem 0.5rem 0;
        }
        .risk-card-header {
            margin-bottom: 0.5rem;
        }
        .risk-card-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #78350f;
            margin-top: 0 !important; /* 覆蓋 main h4 樣式 */
        }
        .risk-card-desc {
            font-size: 0.9rem;
            color: #78350f;
            margin: 0;
        }

        /* 4. 數據表格 (.data-table) */
        .data-table { 
            width: 100%; 
            border-collapse: collapse; 
            background: white; 
            border-radius: 15px; 
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            margin-bottom: 1rem;
            border: 1px solid #e5e7eb;
        }
        .data-table th, .data-table td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        .data-table th {
            background-color: #f9fafb; /* bg-gray-50 */
            font-weight: 600;
            color: #374151;
        }
        .data-table tbody tr:last-child td {
            border-bottom: 0;
        }

        /* 5. 進階比較表格 (.comparison-table) */
        .comparison-table-container {
            overflow-x: auto;
            margin-bottom: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 600px;
        }
        .comparison-table th, .comparison-table td {
            padding: 1rem;
            text-align: center;
            vertical-align: top;
            border-bottom: 1px solid #e5e7eb;
        }
        .comparison-header-main {
            text-align: left;
            background: #f9fafb;
            font-weight: 600;
            width: 25%;
        }
        .comparison-header-option {
            background: #f9fafb;
            position: relative;
        }
        .comparison-header-option strong {
            font-size: 1.125rem;
        }
        .comparison-recommended {
            background-color: #fffbeb;
        }
        .option-badge {
            position: absolute;
            top: -1px;
            right: -1px;
            background-color: #ff6b35;
            color: white;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.25rem 0.5rem;
            border-radius: 0 14px 0 8px;
        }
        .comparison-label {
            text-align: left;
            font-weight: 500;
            color: #374151;
            background: #fdfdfd;
        }
        .rating-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 99px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        .rating-high { background-color: #d1fae5; color: #065f46; }
        .rating-very-high { background-color: #a7f3d0; color: #047857; }
        .pros-cons {
            text-align: left;
            font-size: 0.9rem;
        }
        .pros { color: #059669; margin-bottom: 0.25rem; }
        .cons { color: #dc2626; }
        .comparison-table tbody tr:last-child td {
            border-bottom: 0;
        }
        
        /* ============================================= */
        /* == 全局 RWD 與佈局標準化 (Global RWD)    == */
        /* ============================================= */

        /* 1. 通用盒模型與文字換行 */
        * {
            box-sizing: border-box;
        }
        p, td, th, li, a {
            word-break: break-word; /* 防止長字串溢出 */
        }

        /* 2. 響應式媒體 (圖片、SVG) */
        img, svg {
            max-width: 100%;
            height: auto;
        }

        /* 3. 響應式表格容器 */
        .responsive-table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 20px 0;
            border: 1px solid #e2e8f0;
            border-radius: 15px;
        }

        /* 4. 行動版優先的卡片容器 */
        .info-cards, .risk-group-cards {
            display: flex;
            flex-direction: column; /* 手機上預設為單欄垂直排列 */
            gap: 20px;
            margin: 40px 0;
        }
        .info-card, .risk-card {
            flex: 1;
            min-width: 250px;
        }

        /* 5. 桌面版佈局的 Utility Classes */
        @media (min-width: 768px) {
            .md-grid-2 { 
                display: grid;
                grid-template-columns: repeat(2, 1fr); 
            }
            .md-grid-3 { 
                display: grid;
                grid-template-columns: repeat(3, 1fr); 
            }
            .md-grid-4 { 
                 display: grid; 
                 grid-template-columns: repeat(4, 1fr); 
            }
            .md-flex-row { 
                flex-direction: row; 
            }
        }
        /* ============================================= */
        /* == END Global RWD                         == */
        /* ============================================= */


        /* 7. 高亮關鍵字 */
        .highlight-nutrient {
            background-image: linear-gradient(to top, rgba(255, 107, 53, 0.5) 0%, rgba(255, 107, 53, 0.5) 100%);
            background-position: 0 1.05em;
            background-repeat: repeat-x;
            background-size: 100% 2px;
            text-decoration: none;
            border-bottom: none;
            padding-bottom: 1px;
        }

        /* 8. 修正範例的新增 class */
        .card-theme-myth {
            background: #fef2f2;
            border-top: 5px solid #f87171;
        }
        .card-theme-myth .info-card-title,
        .title-theme-myth {
            color: #b91c1c;
        }
        
        /* CSS 變數模式 (用於動態寬度) */
        .absorption-bar {
            width: 100%;
            height: 1rem;
            background-color: #e5e7eb;
            border-radius: 5px;
            overflow: hidden;
        }
        .absorption-bar-fill {
            width: var(--absorption-percent, 0%);
            height: 100%;
            background-color: #ff6b35;
            border-radius: 5px;
            transition: width 0.5s ease-in-out;
        }
        
        /* 9. 範例區塊樣式 */
        .example-preview {
            border: 2px dashed #cbd5e1; /* border-gray-300 */
            background-color: #f9fafb; /* bg-gray-50 */
            padding: 1.5rem; /* p-6 */
            border-radius: 0.5rem; /* rounded-lg */
            margin-top: 1rem; /* mt-4 */
            margin-bottom: 1.5rem; /* mb-6 */
        }
        .example-preview-title {
            font-weight: 600;
            color: #374151; /* text-gray-700 */
            margin-bottom: 1rem; /* mb-4 */
            margin-top: 0 !important; /* 覆蓋 main h4 樣式 */
        }

        /* 10. 鈣質文章範例的 SVG 樣式 */
        .chart-dual-role {
            display: flex;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
        }
        .donut-chart-visual {
            position: relative;
            width: 150px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .donut-chart-segment {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: conic-gradient(#ff6b35 0% 1%, #cbd5e1 1% 100%);
        }
        .donut-chart-text {
            position: absolute;
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 0.9rem;
            font-weight: 600;
            color: #374151;
            line-height: 1.3;
        }
        .donut-chart-legend {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .legend-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        .legend-value {
            font-size: 1.5rem;
            font-weight: 700;
        }
        .legend-99 .legend-value { color: #6b7280; }
        .legend-1 .legend-value { color: #ff6b35; }
        .legend-label {
            font-size: 0.9rem;
            line-height: 1.5;
            color: #4b5563;
        }
        .legend-label strong { color: #1f2937; }
        
        /* 11. FAQ 範例 */
        .faq-item {
            border-bottom: 1px solid #e5e7eb;
        }
        .faq-question {
            padding: 1rem 0;
            font-weight: 600;
            cursor: pointer;
        }
        .faq-answer {
            padding-bottom: 1rem;
            color: #374151;
        }
        
        /* 12. Checkbox List Item Styling */
        ul li input[type="checkbox"] {
            margin-right: 8px; /* Add some space between checkbox and text */
            vertical-align: middle; /* Align checkbox vertically */
        }

        /* 13. Anchor offset for fixed header */
        /* [修改] 針對所有帶 ID 的元素應用，而不只是 section */
        [id] { 
             scroll-margin-top: 100px; 
        }

    </style>
</head>
<body class="bg-gray-50 text-gray-900">

    <div class="flex max-w-screen-xl mx-auto">
        <!-- 
          側邊導航欄 (TOC)
          - 桌面版: 固定在左側 (sticky)
          - 手機版: 隱藏 (hidden lg:block)
        -->
        <aside class="hidden lg:block w-72 xl:w-80 flex-shrink-0 h-screen sticky top-0 py-10 pr-8">
            <h3 class="font-bold text-lg mb-4 text-gray-800">Caregiver 專案指引</h3>
            <nav id="toc-nav" class="flex flex-col space-y-2 text-sm max-h-[90vh] overflow-y-auto">
                <!-- TOC 內容將由 JavaScript 動態生成 -->
            </nav>
        </aside>

        <!-- 主要內容區 -->
        <main id="main-content" class="flex-1 min-w-0 py-10 lg:pl-8 lg:border-l lg:border-gray-200 bg-white shadow-lg rounded-lg px-6 md:px-12">
            <!-- 
              內容來自 forgemini.md + Checklist
              我會將 Markdown 轉換為 HTML 並整合
            -->

            <!-- ============================================= -->
            <!-- 文件一: API 文件 -->
            <!-- ============================================= -->
            <section id="doc-1">
                <h1>API 文件 (CaregiverHomepage)</h1>
                
                <section id="h2-1-0">
                    <h2 id="建構函數">建構函數</h2>
<pre><code>const homepage = new CaregiverHomepage(hostElement);</code></pre>
                    <ul>
                        <li><code>hostElement</code>: Shadow DOM 的宿主元素（必要）</li>
                    </ul>
                </section>

                <section id="h2-1-1">
                    <h2 id="getter-方法">Getter 方法</h2>
<pre><code>homepage.getTheme(); // 取得主題設定
homepage.getDebug(); // 取得除錯模式狀態
homepage.getSearchPlaceholder(); // 取得搜尋框 placeholder
homepage.getLanguage(); // 取得語言設定
homepage.getConfig(); // 取得完整設定物件</code></pre>
                </section>

                <section id="h2-1-2">
                    <h2 id="setter-方法支援鏈式呼叫">Setter 方法（支援鏈式呼叫）</h2>
<pre><code>homepage
    .setTheme('light|dark')           // 設定主題
    .setDebug(true|false)             // 設定除錯模式
    .setSearchPlaceholder('...')      // 設定搜尋框 placeholder
    .setLanguage('zh-TW')             // 設定語言
    .setConfig({...})                 // 批次設定</code></pre>
                </section>

                <section id="h2-1-3">
                    <h2 id="功能方法">功能方法</h2>
<pre><code>homepage.initialize(); // 初始化組件（必要）
homepage.reset(); // 重置所有設定
homepage.destroy(); // 銷毀組件，清理資源</code></pre>
                </section>

                <section id="h2-1-4">
                    <h2 id="使用範例">使用範例</h2>
                    
                    <section id="h3-1-4-0">
                        <h3 id="基本初始化">基本初始化</h3>
<pre><code>const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("light")
  .setDebug(false)
  .initialize();</code></pre>
                    </section>
                    
                    <section id="h3-1-4-1">
                        <h3 id="開發模式包含除錯">開發模式（包含除錯）</h3>
<pre><code>const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("light")
  .setDebug(true) // 啟用除錯訊息
  .setLanguage("zh-TW")
  .initialize();

// 檢查設定
console.log("主題:", homepage.getTheme());
console.log("除錯模式:", homepage.getDebug());</code></pre>
                    </section>

                    <section id="h3-1-4-2">
                        <h3 id="深色主題">深色主題</h3>
<pre><code>const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setTheme("dark") // 深色主題
  .setDebug(false)
  .initialize();</code></pre>
                    </section>

                    <section id="h3-1-4-3">
                        <h3 id="自訂搜尋框-placeholder">自訂搜尋框 Placeholder</h3>
<pre><code>const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setSearchPlaceholder("輸入營養素名稱，例如：維生素C、鈣質...")
  .setTheme("light")
  .setDebug(false)
  .initialize();</code></pre>
                    </section>

                    <section id="h3-1-4-4">
                        <h3 id="批次設定">批次設定</h3>
<pre><code>const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setConfig({
    theme: "dark",
    debug: false,
    language: "zh-TW",
    searchPlaceholder: "搜尋營養素...",
  })
  .initialize();</code></pre>
                    </section>

                    <section id="h3-1-4-5">
                        <h3 id="動態切換主題">動態切換主題</h3>
<pre><code>// 切換到深色主題
homepage.setTheme("dark");

// 切換到淺色主題
homepage.setTheme("light");</code></pre>
                    </section>
                </section>

                <section id="h2-1-5">
                    <h2 id="shadow-dom-隔離驗證">Shadow DOM 隔離驗證</h2>
                    <p>組件使用 Closed Shadow DOM 確保完全隔離：</p>
<pre><code>// 驗證 CSS 隔離
const initialStyleCount = document.head.querySelectorAll("style").length;

const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
).initialize();

// 檢查主頁面的 CSS 數量是否增加
const finalStyleCount = document.head.querySelectorAll("style").length;
console.log("CSS 隔離:", initialStyleCount === finalStyleCount); // 應該是 true</code></pre>
                </section>

                <section id="h2-1-6">
                    <h2 id="除錯功能">除錯功能</h2>
                    
                    <section id="h3-1-6-0">
                        <h3 id="開啟除錯模式">開啟除錯模式</h3>
<pre><code>const homepage = new CaregiverHomepage(
  document.getElementById("homepage-container")
)
  .setDebug(true) // 關鍵：啟用除錯模式
  .initialize();</code></pre>
                    </section>
                </section>
            </section>

            <!-- ============================================= -->
            <!-- 文件二: 原生 JavaScript 前端函式庫開發規範指引 -->
            <!-- ============================================= -->
            <section id="doc-2">
                <h1>原生 JavaScript 前端函式庫開發規範指引</h1>
                
                <section id="h2-2-0">
                    <h2 id="核心理念零建置直接可用">核心理念：零建置、直接可用</h2>
                    <p><strong>本規範的核心原則是建立完全無需建置過程的 JavaScript 函式庫</strong></p>
                    <ul>
                        <li>✅ <strong>寫完即可用</strong>：程式碼寫完直接就是可部署的最終版本</li>
                        <li>✅ <strong>零工具相依</strong>：不需要 Node.js、npm、webpack、babel 等任何工具</li>
                        <li>✅ <strong>拷貝即部署</strong>：直接將檔案複製到伺服器就能運作</li>
                        <li>✅ <strong>原生相容</strong>：使用純原生 JavaScript，支援 2022 年以來的瀏覽器</li>
                        <li>❌ <strong>絕不使用</strong>：任何需要編譯、轉譯、打包的語法或工具</li>
                    </ul>
                </section>

                <section id="h2-2-1">
                    <h2 id="程式碼風格">程式碼風格</h2>
                    <ul>
                        <li>這是一個純原生 JavaScript 前端專案，所有程式碼都應該用原生 JavaScript 撰寫</li>
                        <li><strong>絕對不使用任何第三方 JavaScript 函式庫或框架</strong>，包括 jQuery、React、Vue 等</li>
                        <li><strong>不使用 ES Modules (import/export)</strong>，一律使用傳統的 JavaScript 載入方式</li>
                        <li><strong>所有 JavaScript 檔案都必須可以直接載入使用，絕對不需要任何 build、compile、transpile 等預處理程序</strong></li>
                        <li><strong>所有功能都必須用 JavaScript class 封裝</strong>，確保程式碼組織清晰</li>
                        <li>Claude 在產生程式碼時一律要相容於<strong>2022年以來的瀏覽器版本</strong></li>
                        <li><strong>所有必要和可選的參數及設定都必須使用 getter 和 setter 方法，並採用可串接的 chainable 模式</strong></li>
                        <li><strong>所有 setter 方法都要回傳 this 以支援鏈式呼叫</strong></li>
                        <li><strong>關鍵需求：所有 CSS 和 JavaScript 都必須封裝在 Shadow DOM 中以實現完全隔離</strong></li>
                        <li><strong>Shadow DOM 封裝：確保樣式和腳本不會與外部頁面產生衝突或洩漏</strong></li>
                        <li><strong>嚴格禁止：避免將 CSS 注入到主頁面中</strong></li>
                        <li><strong>debug 參數必須遵循 getter/setter + chainable 模式：<code>.setDebug(true).getDebug()</code></strong></li>
                        <li><strong>當 debug 為 false 時，不得在 console 輸出任何除錯訊息</strong></li>
                    </ul>
                </section>
                
                <section id="h2-2-2">
                    <h2 id="shadow-dom-封裝要求">Shadow DOM 封裝要求</h2>
                    <p><strong>所有 JavaScript 函式庫都必須使用 Shadow DOM 來封裝 CSS 和 JavaScript，確保完全隔離</strong></p>
                    
                    <section id="h3-2-2-0">
                        <h3 id="-shadow-dom-封裝原則">🔒 Shadow DOM 封裝原則</h3>
                        <ul>
                            <li><strong>完全隔離</strong>：所有樣式和腳本都必須封裝在 Shadow DOM 內</li>
                            <li><strong>無外部影響</strong>：Shadow DOM 內的樣式不會影響外部頁面</li>
                            <li><strong>無外部干擾</strong>：外部頁面的樣式不會影響 Shadow DOM 內容</li>
                            <li><strong>嚴格禁止 CSS 注入</strong>：絕對不允許將 CSS 注入到主頁面的 <code>&lt;head&gt;</code> 或任何外部元素</li>
                        </ul>
                    </section>

                    <section id="h3-2-2-1">
                        <h3 id="-禁止的做法">❌ 禁止的做法</h3>
<pre><code>// 🚫 絕對不要這樣做 - 不可將 CSS 注入主頁面
document.head.insertAdjacentHTML('beforeend', '&lt;style&gt;...&lt;/style&gt;');
document.head.appendChild(styleElement);
document.styleSheets[0].insertRule('...');

// 🚫 不可在主頁面撰寫 style 標籤
const style = document.createElement('style');
document.head.appendChild(style);

// 🚫 不可修改主頁面的現有樣式
document.documentElement.style.setProperty('--custom-color', 'red');</code></pre>
                    </section>

                    <section id="h3-2-2-2">
                        <h3 id="-正確的做法">✅ 正確的做法</h3>
<pre><code>// ✅ 正確 - 所有 CSS 都在 Shadow DOM 內
createStyles()
{
    const style = document.createElement('style');
    style.textContent = `
        /* 所有樣式都在 Shadow DOM 內，完全隔離 */
        :host { display: block; }
        .component { background: #fff; }
    `;
    this.shadowRoot.appendChild(style); // 只添加到 Shadow DOM
}</code></pre>
                    </section>
                    
                    <section id="h3-2-2-3">
                        <h3 id="-shadow-dom-實作模式">📦 Shadow DOM 實作模式</h3>
<pre><code>// Shadow DOM 封裝模式
(function (global) {
    'use strict';

    class DeusComponentWithShadowDOM {
        constructor(hostElement) {
            // 建立 Shadow DOM
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({mode: 'closed'});

            // 初始化設定
            this._config = {
                debug: false,
                theme: 'default'
            };

            // 初始化組件
            this.initialize();
        }

        initialize() {
            this.createStyles();
            this.createContent();
            this.attachEvents();
        }

        // 建立 Shadow DOM 內的樣式
        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                /* 所有樣式都在 Shadow DOM 內，完全隔離 */
                :host {
                    display: block;
                    contain: layout style paint;
                }
                
                .component-container {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background: #ffffff;
                    border: 1px solid #e1e5e9;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                /* ... 其他樣式 ... */
                
                /* 主題樣式 */
                :host([theme="dark"]) .component-container {
                    background: #1f2937;
                    border-color: #374151;
                    color: #f9fafb;
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        // ...
        // Getter/Setter 方法（維持 chainable 模式）
        getDebug() {
            return this._config.debug;
        }

        setDebug(debug) {
            this._config.debug = Boolean(debug);
            // ...
            return this; // 支援鏈式呼叫
        }

        getTheme() {
            return this._config.theme;
        }

        setTheme(theme) {
            this._config.theme = theme;
            this.hostElement.setAttribute('theme', theme);
            return this;
        }
        
        // 銷毀組件
        destroy() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = '';
            }
        }
    }

    // 將類別掛載到全域物件
    global.DeusComponentWithShadowDOM = DeusComponentWithShadowDOM;

})(window);

// 使用範例
const hostElement = document.createElement('div');
document.body.appendChild(hostElement);

const component = new DeusComponentWithShadowDOM(hostElement)
    .setTheme('dark')
    .setDebug(true)
    .setHeader('我的 Shadow DOM 組件')
    .setContent('完全隔離的內容，不會受到外部樣式影響');</code></pre>
                    </section>

                    <section id="h3-2-2-4">
                        <h3 id="-shadow-dom-檢查清單">📋 Shadow DOM 檢查清單</h3>
                        <ul>
                            <li>[ ] 建立 Closed Shadow DOM</li>
                            <li>[ ] 所有 CSS 都在 Shadow DOM 內定義</li>
                            <li>[ ] <strong>絕對不將 CSS 注入到主頁面的 <code>&lt;head&gt;</code> 或任何外部元素</strong></li>
                            <li>[ ] 使用 <code>:host</code> 選擇器</li>
                            <li>[ ] 事件處理器在 Shadow DOM 內註冊</li>
                            <li>[ ] 維持 getter/setter + chainable API</li>
                            <li>[ ] 包含 debug 參數控制</li>
                            <li>[ ] 提供 destroy 方法清理資源</li>
                            <li>[ ] <strong>驗證無任何 CSS 洩漏到主頁面</strong></li>
                        </ul>
                    </section>

                    <section id="h3-2-2-5">
                        <h3 id="-console-日誌輸出機制">📊 Console 日誌輸出機制</h3>
<pre><code>class DeusLogger {
    constructor(debugMode = false) {
        this.debugMode = debugMode;
    }

    setDebugMode(enabled) {
        this.debugMode = Boolean(enabled);
        return this;
    }

    log(level, message) {
        // 關鍵：只在 debug 模式或非 debug 等級時輸出
        if (!this.debugMode && level === 'debug') {
            return; // 不輸出 debug 訊息
        }
        // ...
    }

    debug(message) {
        if (this.debugMode) {
            this.log('debug', '🔍 ' + message);
        }
    }
}</code></pre>
                    </section>
                </section>

                <section id="h2-2-3">
                    <h2 id="javascript-class-封裝模式">JavaScript Class 封裝模式</h2>
                    <p>使用 IIFE 包裝避免全域污染</p>
<pre><code>// 使用 IIFE 包裝避免全域污染
(function (global) {
    'use strict';

    /**
     * 基礎服務類別 - 展示完整的 getter/setter chainable 模式
     */
    class DeusBaseService {
        constructor() {
            // 內部設定物件
            this._config = {
                apiUrl: null,
                timeout: 5000,
                debug: false,  // 關鍵需求：debug 參數
            };
            // ...
        }

        // =================
        // Getter 方法
        // =================
        getApiUrl() { /* ... */ }
        getDebug() {
            return this._config.debug;
        }
        getConfig() {
            return Object.assign({}, this._config); // 回傳完整設定的副本
        }

        // =================
        // Setter 方法 - 全部支援鏈式呼叫
        // =================
        setApiUrl(url) {
            // ... 驗證 ...
            this._config.apiUrl = url.trim();
            return this; // 支援鏈式呼叫
        }
        setDebug(debug) {
            this._config.debug = Boolean(debug);
            // ...
            return this;
        }

        // 批次設定方法
        setConfig(configObject) {
            // ...
            return this;
        }

        // ...
    }

    // 將類別掛載到全域物件
    global.DeusBaseService = DeusBaseService;

})(window);

// =================
// 使用範例 - 展示 chainable API
// =================

/*
// 基本鏈式呼叫 - 注意 debug 參數的使用
const service = new DeusBaseService()
    .setApiUrl('https://api.example.com')
    .setDebug(true)                 // 啟用除錯模式
    .validate()
    .execute();

// 正式環境使用 - 關閉除錯模式
const service2 = new DeusBaseService()
    .setConfig({
        apiUrl: 'https://api.example.com',
        debug: false                // 關閉除錯模式，不輸出 debug 訊息
    })
    .validate()
    .execute();

// 取得設定值 - 包含 debug 狀態
console.log('當前 debug 模式:', service.getDebug());  // 關鍵方法
*/</code></pre>
                </section>

                <section id="h2-2-4">
                    <h2 id="重要開發原則">重要開發原則</h2>
                    <ul>
                        <li><strong>確保你用適當的 JavaScript 類別和 IIFE 封裝來隔離程式碼</strong></li>
                        <li><strong>特別重要：每一次的程式修改都要 100% 避免 breaking changes</strong></li>
                        <li><strong>確保你寫的任何程式碼都是正式環境可用的</strong></li>
                        <li><strong>強制要求：所有類別的參數和設定都必須使用 getter/setter 模式</strong></li>
                        <li><strong>強制要求：所有 setter 方法都必須回傳 this 以支援鏈式呼叫</strong></li>
                        <li><strong>關鍵需求：所有函式庫都必須包含 debug 參數控制除錯訊息顯示</strong></li>
                        <li><strong>關鍵需求：debug=false 時絕對不能在 console 輸出除錯訊息</strong></li>
                    </ul>
                </section>
                
                <section id="h2-2-5">
                    <h2 id="gettersetter-實作檢查清單">Getter/Setter 實作檢查清單</h2>
                    
                    <section id="h3-2-2-6">
                        <h3 id="-必要檢查項目">✅ 必要檢查項目</h3>
                        <ul>
                            <li>[ ] 每個設定參數都有對應的 getter 和 setter 方法</li>
                            <li>[ ] 所有 setter 方法都回傳 <code>this</code></li>
                            <li>[ ] 提供 <code>setConfig(object)</code> 批次設定方法</li>
                            <li>[ ] <strong>必須包含 <code>setDebug(boolean)</code> 和 <code>getDebug()</code> 方法</strong></li>
                            <li>[ ] <strong>debug 參數必須控制 console 除錯訊息的顯示/隱藏</strong></li>
                            <li>[ ] <strong>必須使用 Shadow DOM 封裝所有 CSS 和 JavaScript</strong></li>
                            <li>[ ] <strong>建立 Closed Shadow DOM（mode: 'closed'）</strong></li>
                            <li>[ ] <strong>絕對不將 CSS 注入到主頁面</strong></li>
                            <li>[ ] <strong>提供 destroy() 方法清理 Shadow DOM 資源</strong></li>
                        </ul>
                    </section>
                </section>
            </section>
            
            <!-- ============================================= -->
            <!-- 文件三: 新增頁面檢查清單 -->
            <!-- ============================================= -->
            <section id="doc-3">
                <h1>新增頁面檢查清單 (與重構步驟)</h1>
                <p>當您要為網站新增頁面，或重構舊有頁面以符合最新規範時，請按照以下步驟確保頁面完整且功能統一。</p>
                <blockquote>
                    <strong>文章寫作指引請參考</strong> 文件四 (`doc-4`) - 專注於內容結構、寫作風格、視覺化設計等內容層面
                </blockquote>
                
                <section id="h2-3-0">
                    <h2 id="快速檢查清單">快速檢查清單</h2>
                    
                    <section id="h3-3-0-0">
                        <h3 id="基礎結構">基礎結構</h3>
                        <ul>
                            <li>[ ] 建立/檢查 HTML 檔案 (新頁面複製 <code>00template.html</code>)</li>
                            <li>[ ] 設定/檢查正確的 <code>&lt;title&gt;</code> 與 <code>&lt;meta&gt;</code> 標籤</li>
                            <li>[ ] 在 <code>&lt;body&gt;</code> 加入/檢查 <code>data-article-id</code> (需與 `articles-data.js` 對應)</li>
                        </ul>
                    </section>
                    
                    <section id="h3-3-0-1">
                        <h3 id="組件與功能">組件與功能</h3>
                        <ul>
                            <li>[ ] 加入/檢查 Header/Footer 組件</li>
                            <li>[ ] <strong>(新/重構)</strong> 加入/檢查響應式目錄組件 (`ResponsiveTocComponent`) - 見下方詳細步驟</li>
                            <li>[ ] <strong>(新/重構)</strong> 加入/檢查智慧推薦文章組件 (`RelatedArticlesComponent`) - 見下方詳細步驟</li>
                            <li>[ ] 加入/檢查 GA4 分析組件</li>
                            <li>[ ] 加入/檢查進度條、FAQ 等互動功能</li>
                        </ul>
                    </section>
                    
                    <section id="h3-3-0-2">
                        <h3 id="seo-與結構化資料">SEO 與結構化資料</h3>
                        <ul>
                            <li>[ ] 設定/檢查 Article, WebSite, BreadcrumbList 的 JSON-LD</li>
                            <li>[ ] 確認所有 JSON-LD 資料正確無誤</li>
                        </ul>
                    </section>
                    
                    <section id="h3-3-0-3">
                        <h3 id="內容品質">內容品質</h3>
                        <ul>
                            <li>[ ] 檢查文章結構完整性（PSMA + 8個標準章節）- 見文件四</li>
                            <li>[ ] 檢查 CSS 元件使用規則 (無行內樣式, Class 正確使用) - 見文件四</li>
                            <li>[ ] 檢查視覺化元素（圖表、卡片等）</li>
                            <li>[ ] 驗證所有內部連結正常</li>
                        </ul>
                    </section>

                    <section id="h3-3-0-4">
                        <h3 id="樣式與佈局">樣式與佈局</h3>
                         <ul>
                             <li>[ ] 檢查全局 RWD 規則是否已應用 (卡片佈局、表格包裹) - 見文件四</li>
                             <li>[ ] 驗證錨點連結 (`#hash`) 是否因 Header 遮擋 (需有 `scroll-margin-top`)</li>
                         </ul>
                    </section>
                    
                    <section id="h3-3-0-5">
                        <h3 id="網站整合">網站整合</h3>
                        <ul>
                            <li>[ ] <strong>(新頁面)</strong> 更新 <code>articles-data.js</code> 中央資料庫</li>
                            <li>[ ] <strong>(新頁面)</strong> 在至少 1-2 個舊頁面中，加入指向此 new 頁面的內部連結</li>
                            <li>[ ] <strong>(新頁面)</strong> 更新 <code>sitemap.xml</code></li>
                            <li>[ ] <strong>最終驗證</strong> (跨瀏覽器、響應式、效能)</li>
                        </ul>
                    </section>
                </section>
                
                <section id="h2-3-1">
                    <h2 id="詳細步驟指引-整合重構計畫">詳細步驟指引 (整合重構計畫)</h2>
                    
                    <section id="h3-3-1-0">
                        <h3 id="1-建立檢查基本-html-結構">1. 建立/檢查基本 HTML 結構</h3>
                        <p><strong>新頁面標準作法：</strong> 複製 <code>/post/00template.html</code> 範本檔案。</p>
                        <p><strong>重構頁面：</strong> 檢查是否符合範本的基本結構。</p>
                    </section>
                    
                    <section id="h3-3-1-1">
                        <h3 id="2-設定檢查文章-id">2. 設定/檢查文章 ID</h3>
                        <p>確保 <code>&lt;body&gt;</code> 標籤上已設定 <code>data-article-id</code>，且此 ID 與 <code>articles-data.js</code> 中的 `id` 完全對應。</p>
<pre><code>&lt;!-- 範例 --&gt;
&lt;body data-article-id="card-vitamin-b"&gt;</code></pre>
                    </section>
                    
                    <section id="h3-3-1-2">
                        <h3 id="3-設定檢查組件容器">3. 設定/檢查組件容器</h3>
                        <p>確保在文章的 HTML 指定位置放置了必要的空的 <code>&lt;div&gt;</code> 容器：</p>
                        <ul>
                             <li>
                                 <strong>響應式目錄容器 (Responsive TOC)</strong>:
                                 <ul>
                                     <li>**位置**: 必須放置在 `<main>` 區塊的 `<header>` 標籤後，且位於 `<div class="article-hero">` 之後、`<article class="article-body">` 之前。</li>
                                     <li>**程式碼**: `<div id="toc-mobile-target"></div>`</li>
                                     <li>**範例**:
<pre><code>&lt;/header&gt; &lt;!-- header 結束 --&gt;

&lt;div id="toc-mobile-target"&gt;&lt;/div&gt; &lt;!-- TOC 容器在此 --&gt;
    
&lt;article class="article-body"&gt; &lt;!-- 文章主體開始 --&gt;</code></pre>
                                     </li>
                                 </ul>
                            </li>
                            <li>
                                <strong>智慧推薦文章容器 (Related Articles)</strong>:
                                <ul>
                                    <li>**位置**: 放在 `&lt;/article&gt;` 標籤的**正上方**。</li>
                                    <li>**程式碼**: `<div id="related-articles-container"></div>`</li>
                                    <li>**重構注意**: 移除此位置原有的任何靜態推薦連結區塊。</li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    
                    <section id="h3-3-1-3">
                        <h3 id="4-引入並初始化組件-含-rwd-修正">4. 引入並初始化組件 (含 RWD 修正)</h3>
                        <p>在頁面底部的 <code>&lt;script&gt;</code> 區塊，確保已正確引入組件腳本並初始化。</p>
                        
                        <h4 id="引入腳本-注意順序">引入腳本 (注意順序)</h4>
<pre><code>&lt;!-- 中央資料庫 (必須最先) --&gt;
&lt;script src="../assets/js/articles-data.js"&gt;&lt;/script&gt; 
&lt;!-- 組件腳本 --&gt;
&lt;script src="../assets/js/related-articles-component.js"&gt;&lt;/script&gt;
&lt;script src="../assets/js/responsive-toc-component.js"&gt;&lt;/script&gt;
&lt;!-- 其他組件... --&gt;</code></pre>

                        <h4 id="初始化程式碼-domcontentloaded">初始化程式碼 (DOMContentLoaded)</h4>
<pre><code>document.addEventListener("DOMContentLoaded", function () {
  // --- 其他組件初始化 ---
  // 例如：Header/Footer, GA4 等...

  // --- 初始化智慧推薦組件 ---
  const relatedContainer = document.getElementById("related-articles-container");
  const articleId = document.body.dataset.articleId; 
  // 確保容器存在、組件已載入、資料也已載入
  if (relatedContainer && articleId && window.RelatedArticlesComponent && typeof articlesData !== 'undefined' && typeof topicArticles !== 'undefined') {
    try { // 加入錯誤處理
        new window.RelatedArticlesComponent(relatedContainer, articleId, articlesData, topicArticles).initialize();
    } catch (error) {
        console.error("智慧推薦組件初始化失敗:", error);
    }
  } else {
     // 可選：如果缺少必要元素，輸出警告
     if (!relatedContainer) console.warn("缺少智慧推薦組件容器: #related-articles-container");
     if (!articleId) console.warn("缺少 body[data-article-id]");
     // ... 其他檢查
  }

  // --- 初始化響應式目錄組件 ---
  if (window.ResponsiveTocComponent) {
     try { // 加入錯誤處理
        new window.ResponsiveTocComponent().initialize();
     } catch (error) {
         console.error("響應式目錄組件初始化失敗:", error);
     }
  } else {
      console.warn("響應式目錄組件 (ResponsiveTocComponent) 未載入");
  }

  // --- RWD 初始渲染問題修正 ---
  // 強制觸發 resize 事件，解決 Chrome DevTools 手機模式下的初始渲染問題
  // 延遲觸發以確保佈局穩定
  setTimeout(() => {
     console.log("觸發 resize 事件以修正 RWD 初始渲染...");
     window.dispatchEvent(new Event('resize'));
  }, 100); 

});</code></pre>
                        <h4 id="重構注意">重構注意：</h4>
                         <ul>
                            <li>確保舊頁面中若有手動實現類似功能的 JS 程式碼已被移除。</li>
                            <li>檢查 CSS 中是否移除了舊的 `@media (max-width: 1024px)` 中隱藏 sidebar (`display: none`) 的規則，否則新組件無法正常顯示。</li>
                        </ul>
                    </section>
                    
                    <section id="h3-3-1-4">
                        <h3 id="5-更新中央資料庫-articles-datajs---僅限新頁面">5. 更新中央資料庫 (<code>articles-data.js</code>) - 僅限新頁面</h3>
                        <p>若為新增文章，務必在 <code>articlesData</code> (核心營養素) 或 <code>topicArticles</code> (主題式) 陣列中，為新文章新增一筆完整的物件資料，特別是 <code>id</code>, <code>link</code>, <code>title</code>, <code>goals</code> 等欄位。<code>goals</code> 欄位將影響智慧推薦的準確性。</p>
                    </section>

                    <section id="h3-3-1-5">
                        <h3 id="6-目錄-toc-結構與連結修正">6. 目錄 (TOC) 結構與連結修正</h3>
                        <ul>
                            <li><strong>階層式結構</strong>: 根據文件四規範，為次要章節 (通常是 `<h3>` 對應的連結) 在目錄的 `<a>` 標籤上加上 `.sub-item` class。</li>
                            <li><strong>納入 `<h3>` 標籤</strong>: 確保目錄生成邏輯 (無論是手動或自動) 包含文章中的 `<h3>` 標籤，並套用 `.sub-item` 樣式。</li>
                            <li><strong>錨點連結 CSS</strong>: 檢查全域 CSS 或頁面 `<style>` 中是否包含 <code>[id] { scroll-margin-top: 100px; }</code> (或類似數值)，防止標題被固定 Header 遮擋。 (見文件四詳細說明)</li>
                            <li><strong>相關營養素連結</strong>: 目錄中「相關營養素」的連結**必須**指向智慧推薦組件的容器 ID：`href="#related-articles-container"`。</li>
                        </ul>
                    </section>
                </section>
            </section>
            
            <!-- ============================================= -->
            <!-- 文件四: Caregiver 營養百科 - 文章風格指引 -->
            <!-- ============================================= -->
            <section id="doc-4">
                <h1>Caregiver 營養百科 - 文章風格指引</h1>
                <p>這份文件旨在為所有「營養百科」的文章建立一套統一、高標準的風格與結構。遵循此指引將有助於我們產出高品質、風格一致且對讀者極具吸引力的內容。</p>
                <blockquote>
                    <strong>技術檢查清單請參考</strong> 文件三 (`doc-3`) - 專注於 HTML 結構、SEO 設定、組件整合等技術層面
                </blockquote>

                <section id="h2-4-0">
                    <h2 id="第一章核心原則">第一章：核心原則</h2>
                    
                    <section id="h3-4-0-0">
                        <h3 id="總體風格與核心理念">總體風格與核心理念</h3>
                        <p>文章的整體風格應為<strong>「專業、親切且易於行動」</strong>。我們透過專業的口吻建立權威，同時用生活化的比喻和清晰的視覺設計拉近與讀者的距離，並在文末提供明確的指引。</p>
                    </section>
                </section>
            
                <section id="h2-4-1">
                    <h2 id="第二章內容策略與結構">第二章：內容策略與結構</h2>

                    <section id="h3-4-1-0">
                        <h3 id="問題解決導向敘事psma-流程">問題解決導向敘事（PSMA 流程）</h3>
                        <p>為提升閱讀完成率與轉化率，建議在不犧牲「8個標準章節」完整性的前提下，優先採用「PSMA：Pain → Solution → Mechanism → Action」的敘事順序。</p>
                        
                        <h4 id="章節骨架對應-html-id">章節骨架（對應 HTML id）</h4>
<pre><code>&lt;section id="problem"&gt;
  &lt;h2&gt;您有這些困擾嗎？[痛點集合]&lt;/h2&gt;
  &lt;!-- 使用 .risk-group-cards 命中族群與症狀 --&gt;
&lt;/section&gt;

&lt;section id="solution"&gt;
  &lt;h2&gt;[營養素]：問題的終極解答&lt;/h2&gt;
  &lt;!-- [修改] 使用 .info-cards 呈現 2 個核心效益 --&gt;
&lt;/section&gt;

&lt;!-- ... 其他 ... --&gt;
</code></pre>
                        <h4 id="撰寫提示可直接複製當作小檢核">撰寫提示（可直接複製當作小檢核）</h4>
<pre><code>□ 開頭 3 句內命中痛點（族群+情境+症狀/目標）
□ [修改] Solution 區使用 .info-cards 呈現 2 個核心效益
□ Mechanism 僅選 1-2 個關鍵機制詞，並用對比凸顯差異（如：高黏度/低發酵）
...
</code></pre>
                    </section>
                    
                    <section id="h3-4-1-1">
                        <h3 id="標準文章結構">標準文章結構</h3>
                        <p>每篇文章都應遵循以下標準結構，以確保內容的連貫性與完整性。</p>

                        <h4 id="1-引人入勝的開頭">1. 引人入勝的開頭</h4>
                        <ul>
                            <li><strong>標題撰寫的終極策略：V.I.P. + B.R.A.V.E. 混合框架</strong>
                                <ul>
                                    <li><strong>核心結構：</strong> <code>營養素 - 介紹說明</code></li>
                                    <li><strong>格式範例 (正確示範)：</strong> <code>鈣 - 不只補骨！終結抽筋、失眠的關鍵礦物質</code></li>
                                </ul>
                            </li>
                            <li><strong>麵包屑導覽列 (<code>&lt;nav class="breadcrumb"&gt;</code>) 規則</strong>
                                <ul>
                                    <li>麵包屑的最後一節文字<strong>必須</strong>與頁面的 <code>&lt;h1&gt;</code> 主標題完全相同。</li>
                                </ul>
                            </li>
                        </ul>

                        <h4 id="2-清晰的章節劃分-模組化結構">2. 清晰的章節劃分 (模組化結構)</h4>
                        <p>內文應使用 <code>&lt;h2&gt;</code> 和 <code>&lt;h3&gt;</code> 標籤劃分章節。以下為<strong>建議的核心章節順序</strong>：</p>
                        <ol>
                            <li><strong><code>&lt;h2&gt;</code> 基本資訊：[營養素]是什麼？</strong> (<code>&lt;h3&gt;</code> 定義與分類, <code>&lt;h3&gt;</code> 關鍵類型比較)</li>
                            <li><strong><code>&lt;h2&gt;</code> 核心功效：[營養素]對人體有哪些好處？</strong> (使用 <code>.info-cards</code>，[修改] 建議 2 個)</li>
                            <li><strong><code>&lt;h2&gt;</code> 每日建議攝取量與最佳時間</strong> (<code>&lt;h3&gt;</code> 官方建議攝取量, <code>&lt;h3&gt;</code> 最佳攝取時間)</li>
                            <li><strong><code>&lt;h2&gt;</code> 食物來源：哪些天然食物富含[營養素]？</strong> (使用 <code>.data-table</code>)</li>
                            <li><strong><code>&lt;h2&gt;</code> 誰最需要補充？[營養素]缺乏的警訊與高風險族群</strong> (使用 <code>.risk-group-cards</code>)</li>
                            <li><strong><code>&lt;h2&gt;</code> 如何挑選[營養素]補充品？</strong> (使用 <code>.comparison-table</code>)</li>
                            <li><strong><code>&lt;h2&gt;</code> 副作用與注意事項</strong> (使用 <code>.alert-doctor</code>)</li>
                            <li><strong><code>&lt;h2&gt;</code> 常見問題 (FAQ)</strong></li>
                            <li><strong><code>&lt;h2&gt;</code> 相關營養素 (自動化)</strong> (指向 <code>#related-articles-container</code>)</li>
                        </ol>
                        
                        <h5 id="章節開場白原則-整合-checklist-強調">章節開場白原則 (整合 Checklist 強調)</h5>
                        <p>為確保內容流暢易讀，請務必遵循以下原則：</p>
                        <ul>
                           <li><strong>豐富引言內容</strong>: 確保每一個 <code>&lt;h2&gt;</code> 和 <code>&lt;h3&gt;</code> 標籤後，都有一段**內容豐富**的 <code>&lt;p&gt;</code> 引言。避免標題後直接就是列表、表格或卡片。</li>
                           <li><strong>強化引導性</strong>: 引言段落應扮演**承上啟下**的角色，為讀者提供必要的背景知識、情境鋪陳，或點出該章節要解決的核心問題，讓讀者更容易進入章節的核心內容。</li>
                           <li><strong>避免生硬陳列</strong>: 嘗試透過更具吸引力的**比喻或提問**來開頭，讓資訊的流動更順暢，提升文章的整體閱讀體驗與專業感。</li>
                        </ul>


                        <h4 id="toc-目錄結構建議-整合-checklist-強調">TOC 目錄結構建議 (整合 Checklist 強調)</h4>
                        <p>TOC 現已支援兩層式結構，並應包含 <code>&lt;h3&gt;</code> 標籤以提供更詳細的導航。</p>
                        <ul>
                            <li><strong>階層式結構</strong>: 在目錄的 <code>&lt;ul&gt;</code> 列表中，為屬於子項目 (通常對應 <code><h3></code>) 的 <code>&lt;a&gt;</code> 標籤加上 <code>sub-item</code> class。</li>
                            <li><strong>納入 `<h3>` 標籤</strong>: 目錄應包含文章中的 <code>&lt;h3&gt;</code> 標籤，並套用 <code>.sub-item</code> 樣式。</li>
                            <li><strong>錨點連結修正</strong>:
                                <ul>
                                     <li>**CSS**: 樣式表中必須包含 <code>[id] { scroll-margin-top: 100px; }</code> 規則 (見下方詳細說明)。</li>
                                     <li>**連結目標**: 「相關營養素」的目錄連結必須指向 <code>#related-articles-container</code>。</li>
                                </ul>
                            </li>
                        </ul>
<pre><code>&lt;ul class="toc-list"&gt;
  &lt;!-- 主項目 (H2) --&gt;
  &lt;li&gt;&lt;a href="#problem" class="toc-link"&gt;您有這些困擾嗎？（Pain）&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#solution" class="toc-link"&gt;解方與核心效益（Solution）&lt;/a&gt;&lt;/li&gt;
  
  &lt;!-- 子項目 (H3) --&gt;
  &lt;li&gt;&lt;a href="#mechanism" class="toc-link"&gt;[營養素]如何運作？&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#mechanism-type-a" class="toc-link sub-item"&gt;類型 A 的機制&lt;/a&gt;&lt;/li&gt; &lt;!-- 假設有 H3 --&gt;
  &lt;li&gt;&lt;a href="#mechanism-type-b" class="toc-link sub-item"&gt;類型 B 的機制&lt;/a&gt;&lt;/li&gt; &lt;!-- 假設有 H3 --&gt;

  &lt;li&gt;&lt;a href="#related-articles-container" class="toc-link"&gt;相關營養素&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>
                        
                        <!-- [新增] 錨點連結重構說明 -->
                        <h5 id="錨點連結滾動偏移重構說明-css-scroll-margin-top">錨點連結滾動偏移重構說明 (CSS scroll-margin-top)</h5>
                        <p>本節詳細說明為何及如何使用 CSS <code>scroll-margin-top</code> 屬性來解決固定 Header 遮擋錨點內容的問題，取代舊有的 JavaScript 解決方案。</p>
                        <ol>
                            <li><strong id="問題背景header-遮擋錨點內容">問題背景：Header 遮擋錨點內容</strong>
                                <p>當頁面頂部有固定 Header 時，點擊錨點連結會導致目標區塊被 Header 遮擋。</p>
                            </li>
                            <li><strong id="舊有解決方案javascript-方式">舊有解決方案（JavaScript 方式）</strong>
                                <p>透過 JavaScript 阻止預設行為，計算位置並手動調整滾動偏移。</p>
                            </li>
                            <li><strong id="新的解決方案css-scroll-margin-top-方式">新的解決方案（CSS <code>scroll-margin-top</code> 方式）</strong>
                                <p>使用 CSS <code>scroll-margin-top</code> 屬性指示瀏覽器在滾動到錨點時保留頂部空間。</p>
                                <ul>
                                    <li><strong><code>[id] { scroll-margin-top: 100px; }</code> 的解釋</strong>：選取所有帶 `id` 的元素，並在其上方保留 100px 的滾動邊距，以避開 Header。</li>
                                </ul>
                           </li>
                           <li><strong id="新方法css的優勢">新方法（CSS）的優勢</strong>
                                <ul>
                                    <li><strong>簡潔與易維護</strong>：一行 CSS 取代複雜 JS。</li>
                                    <li><strong>效能更佳</strong>：瀏覽器原生支援，更流暢。</li>
                                    <li><strong>更具彈性</strong>：無需事件監聽，動態內容也有效。</li>
                                    <li><strong>職責分離</strong>：視覺呈現交由 CSS 處理。</li>
                                </ul>
                           </li>
                           <li><strong id="整體修改邏輯與步驟-refactor-plan">整體修改邏輯與步驟 (Refactor Plan)</strong>
                                <p>這次重構旨在將錨點滾動偏移的處理從 JavaScript 轉換為 CSS，提升程式碼品質和可維護性。主要步驟如下：</p>
                                <ol>
                                    <li><strong>[已完成] 在範本中添加 CSS 規則</strong> (`post/00template.html`):
                                        <ul><li>添加 <code>[id] { scroll-margin-top: 100px; }</code> 規則，讓所有文章頁面自動獲得滾動偏移效果。</li></ul>
                                    </li>
                                    <li><strong>[待執行] 移除各頁面中冗餘的 JavaScript 程式碼</strong> (`post/*.html`):
                                        <ul><li>找出並移除各文章頁面底部 `<script>` 區塊中，用於處理錨點點擊、計算偏移和執行 `window.scrollTo` 或類似平滑滾動功能的 JavaScript 程式碼。</li></ul>
                                    </li>
                                    <li><strong>[已完成] 移除組件中冗餘的 JavaScript 程式碼</strong> (`assets/js/health-topics-logic.js`):
                                        <ul><li>移除該組件中處理內部錨點跳轉的手動滾動邏輯，確保行為統一由 CSS 控制。</li></ul>
                                    </li>
                                </ol>
                           </li>
                        </ol>
                        <!-- [結束] 錨點連結重構說明 -->
                        
                    </section>

                    <section id="h3-4-1-2">
                        <h3 id="內容與語氣">內容與語氣</h3>
                        <ol>
                            <li><strong>專業口吻</strong>：適時使用「<strong>營養師提醒</strong>」、「<strong>醫師警告</strong>」等提示框。</li>
                            <li><strong>善用比喻</strong>：例如：<em>維生素B群是身體的「能量轉換器」。</em></li>
                            <li><strong>強調重點</strong>：使用 <code>&lt;strong&gt;</code> 或 <code>&lt;span class="highlight-nutrient"&gt;</code> 來凸顯。</li>
                            <li><strong>精簡圖示 (Icon) 使用</strong>：<strong>原則禁止，例外手動</strong>。絕不使用 Emoji。</li>
                        </ol>
                    </section>
                </section>

                <section id="h2-4-2">
                    <h2 id="第三章技術與格式化規範">第三章：技術與格式化規範</h2>

                    <section id="h3-4-2-0">
                        <h3 id="格式化與常用-css-class">格式化與常用 CSS Class</h3>
                        <blockquote>
                            <p><strong>重要規則：</strong></p>
                            <ol>
                                <li><strong>禁止行內樣式</strong>: 應完全避免使用 <code>style="..."</code> 屬性。 (來自 Checklist 強調)</li>
                                <li><strong>禁止裝飾性圖示</strong>: <strong>原則上禁止在文章內使用任何裝飾性圖示（包含 Emoji）</strong>。</li>
                                <li><strong>例外：CSS 變數</strong>：唯一允許使用 <code>style</code> 屬性的情境，是為了傳遞動態數值給 CSS 變數，例如 <code>style="--percent: 40%;"</code>。</li>
                            </ol>
                        </blockquote>

                        <h4 id="1-提示框-alert">1. 提示框 (`.alert`)</h4>
                        <p><strong>圖示自動套用</strong>: 警示圖示 (⚠️, 💡) 是由 CSS 自動添加的，<strong>嚴禁</strong>在 HTML 中手動插入任何 Emoji 或圖示。</p>
                        <p>標準 HTML 結構：</p>
<pre><code>&lt;div class="alert alert-tip"&gt;
  &lt;strong&gt;營養師小撇步：&lt;/strong&gt;
  &lt;p&gt;將魚油與含有脂肪的正餐一同服用，是提升其生物利用率的關鍵。&lt;/p&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：提示框</h4>
                            <div class="alert alert-tip">
                                <strong>營養師小撇步：</strong>
                                <p>將魚油與含有脂肪的正餐一同服用，是提升其生物利用率的關鍵。空腹服用會大幅降低吸收效果。</p>
                            </div>
                            <div class="alert alert-nutritionist">
                                <strong>營養師提醒：</strong>
                                <p>這是一個專業建議，說明了為何這個營養素很重要。</p>
                            </div>
                            <div class="alert alert-doctor">
                                <strong>醫師警告：</strong>
                                <p>若您正在服用特定藥物，請在補充此營養素前諮詢您的醫師。</p>
                            </div>
                        </div>

                        <h4 id="2-資訊卡片-info-cards">2. 資訊卡片 (`.info-cards`)</h4>
                        <p>用於並列呈現核心觀點或功效。<strong>[修改] 此舉是為了強調資訊卡僅用於呈現最核心的重點，故一個區塊不應放置超過 2 張卡片</strong>。</p>
<pre><code>&lt;!-- 桌面版為兩欄: md-grid-2 --&gt;
&lt;div class="info-cards md-grid-2"&gt; 
  &lt;div class="info-card"&gt;
    &lt;h4 class="info-card-title"&gt;核心功效一&lt;/h4&gt;
    &lt;p class="info-card-desc"&gt;說明此功效的詳細內容...&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="info-card"&gt;
    &lt;h4 class="info-card-title"&gt;核心功效二&lt;/h4&gt;
    &lt;p class="info-card-desc"&gt;說明此功效的詳細內容...&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：資訊卡片（[修改] 最多 2 張）</h4>
                            <div class="info-cards md-grid-2">
                                <div class="info-card">
                                    <h4 class="info-card-title">核心功效一</h4>
                                    <p class="info-card-desc">說明此功效的詳細內容，幫助讀者快速了解價值。</p>
                                </div>
                                <div class="info-card">
                                    <h4 class="info-card-title">核心功效二</h4>
                                    <p class="info-card-desc">說明此功效的詳細內容，幫助讀者快速了解價值。</p>
                                </div>
                            </div>
                        </div>

                        <h4 id="3-風險族群卡片-risk-group-cards">3. 風險族群卡片 (`.risk-group-cards`)</h4>
                        <p><strong>一個區塊不應放置超過 3 張卡片</strong>。（此規則不變）</p>
<pre><code>&lt;!-- 桌面版為三欄: md-grid-3 --&gt;
&lt;div class="risk-group-cards md-grid-3"&gt;
  &lt;div class="risk-card"&gt;
    &lt;div class="risk-card-header"&gt;
      &lt;h4 class="risk-card-title"&gt;吸菸者&lt;/h4&gt;
    &lt;/div&gt;
    &lt;p class="risk-card-desc"&gt;香菸會產生大量自由基...&lt;/p&gt;
  &lt;/div&gt;
  &lt;!-- ... 其他卡片 ... --&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：風險族群卡片</h4>
                            <div class="risk-group-cards md-grid-3">
                                <div class="risk-card">
                                    <div class="risk-card-header">
                                        <h4 class="risk-card-title">吸菸者</h4>
                                    </div>
                                    <p class="risk-card-desc">香菸會產生大量自由基，加速消耗體內抗氧化營養素。</p>
                                </div>
                                <div class="risk-card">
                                    <div class="risk-card-header">
                                        <h4 class="risk-card-title">高壓上班族</h4>
                                    </div>
                                    <p class="risk-card-desc">長期壓力會消耗體內B群與維生素C，導致疲勞。</p>
                                </div>
                                <div class="risk-card">
                                    <div class="risk-card-header">
                                        <h4 class="risk-card-title">素食者</h4>
                                    </div>
                                    <p class="risk-card-desc">部分營養素在植物性食物中含量較低，如B12與鐵。</p>
                                </div>
                            </div>
                        </div>

                        <h4 id="4-比較表格-data-table">4. 比較表格 (`.data-table`)</h4>
                        <p><strong>必須</strong>用 <code>&lt;div class="responsive-table-wrapper"&gt;</code> 包裹。</p>
<pre><code>&lt;div class="responsive-table-wrapper"&gt;
  &lt;table class="data-table"&gt;
    &lt;thead&gt;
      &lt;tr&gt;&lt;th&gt;排名&lt;/th&gt;&lt;th&gt;食物項目&lt;/th&gt;&lt;th&gt;含量 (mg)&lt;/th&gt;&lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;&lt;td&gt;冠軍&lt;/td&gt;&lt;td&gt;&lt;strong&gt;葵花籽&lt;/strong&gt;&lt;/td&gt;&lt;td&gt;&lt;strong&gt;36.3&lt;/strong&gt;&lt;/td&gt;&lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：比較表格</h4>
                            <div class="responsive-table-wrapper">
                                <table class="data-table">
                                    <thead>
                                        <tr><th>排名</th><th>食物項目</th><th>含量 (mg)</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>冠軍</td><td><strong>葵花籽</strong></td><td><strong>36.3</strong></td></tr>
                                        <tr><td>亞軍</td><td>杏仁</td><td>29.8</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <h4 id="5-進階比較表格-comparison-table">5. 進階比較表格 (`.comparison-table`)</h4>
                        <p>外部容器 <code>.comparison-table-container</code> 已包含 `overflow-x: auto`，無需再包裹 <code>.responsive-table-wrapper</code>。</p>
<pre><code>&lt;div class="comparison-table-container"&gt;
  &lt;table class="comparison-table"&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th class="comparison-header-main"&gt;比較項目&lt;/th&gt;
        &lt;th class="comparison-header-option comparison-recommended"&gt;
          &lt;div class="option-badge"&gt;推薦&lt;/div&gt;
          &lt;strong&gt;魚油 (Fish Oil)&lt;/strong&gt;
        &lt;/th&gt;
        &lt;th class="comparison-header-option"&gt;&lt;strong&gt;磷蝦油&lt;/strong&gt;&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;!-- ... rows ... --&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：進階比較表格</h4>
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
                        </div>

                        <h4 id="6-全局響應式設計-global-rwd---整合-checklist">6. 全局響應式設計 (Global RWD) - 整合 Checklist</h4>
                        <p><strong>目標</strong>: 整合並標準化全站的響應式設計規則，提升在所有裝置上的瀏覽體驗與未來可維護性。</p>

                        <h5 id="核心-css-規則-已加入-style-區塊">核心 CSS 規則 (已加入 `<style>` 區塊)</h5>
                        <p>以下規則應已包含在本文件的 `<style>` 區塊或全站樣式表中：</p>
<pre><code class="language-css">/* ============================================= */
/* == 全局 RWD 與佈局標準化 (Global RWD)    == */
/* ============================================= */

/* 1. 通用盒模型與文字換行 */
* { box-sizing: border-box; }
p, td, th, li, a { word-break: break-word; }

/* 2. 響應式媒體 */
img, svg { max-width: 100%; height: auto; }

/* 3. 響應式表格容器 */
.responsive-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 20px 0;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
}

/* 4. 行動版優先的卡片容器 */
.info-cards, .risk-group-cards {
    display: flex;
    flex-direction: column; /* 手機預設單欄 */
    gap: 20px;
    margin: 40px 0;
}
.info-card, .risk-card { flex: 1; min-width: 250px; }

/* 5. 桌面版佈局 Utility Classes */
@media (min-width: 768px) {
    .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
    .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
    .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
    .md-flex-row { flex-direction: row; } /* (較少用，grid 優先) */
}
</code></pre>

                        <h5 id="html-實作方式">HTML 實作方式</h5>
                        <ul>
                            <li><strong>卡片佈局</strong>: 為 <code>.info-cards</code> (建議 <code>.md-grid-2</code>) 或 <code>.risk-group-cards</code> (建議 <code>.md-grid-3</code>) 容器加上對應的 Utility Class。</li>
                            <li><strong>表格</strong>: **所有**的普通 <code>&lt;table class="data-table"&gt;</code> 元素，都**必須**被一個 <code>&lt;div class="responsive-table-wrapper"&gt;</code> 包裹起來。</li>
                        </ul>
                         <h5 id="執行檢查-重構時">執行檢查 (重構時)</h5>
                         <ul>
                            <li><input type="checkbox" disabled> 檢查所有卡片佈局 (<code>.info-cards</code>, <code>.risk-group-cards</code>)，移除舊的行內樣式或特定欄數 class，換上標準的 <code>.md-grid-N</code> Utility Class。</li>
                            <li><input type="checkbox" disabled> 檢查所有 <code>&lt;table class="data-table"&gt;</code>，確保都已被 <code>responsive-table-wrapper</code> <code>&lt;div&gt;</code> 包裹。</li>
                            <li><input type="checkbox" disabled> 在手機模擬器中，檢查頁面，確保卡片佈局正常（手機單欄，桌面多欄）且表格內容可橫向滾動，無頁面級橫向滾動條。</li>
                         </ul>

                    </section>
                    
                    <section id="h3-4-2-1">
                        <h3 id="seo-與-metadata">SEO 與 Metadata</h3>
                        <p>這是確保文章能被搜尋引擎正確索引的關鍵步驟。</p>
                        <ol>
                            <li><strong>基礎 Meta 標籤</strong>：確實填寫 <code>&lt;title&gt;</code>、<code>&lt;meta name="description"&gt;</code>。</li>
                            <li><strong>JSON-LD 結構化資料</strong>：<strong>此為必填項目</strong>。包含 <code>Article</code>, <code>WebSite</code>, <code>BreadcrumbList</code>。</li>
                            <li><strong>全站品牌識別 (Site Name) 設定</strong>。</li>
                        </ol>
                    </section>
                </section>
            
                <section id="h2-4-3">
                    <h2 id="第五章資源與範例">第五章：資源與範例</h2>
                    
                    <section id="h3-4-3-0">
                        <h3 id="完整範例鈣質文章撰寫示範">完整範例：鈣質文章撰寫示範</h3>
                        
                        <h4 id="核心概念視覺化">核心概念視覺化</h4>
<pre><code>&lt;div class="chart-dual-role"&gt;
  &lt;div class="donut-chart-visual"&gt;
    &lt;div class="donut-chart-segment"&gt;&lt;/div&gt;
    &lt;div class="donut-chart-text"&gt;鈣的&lt;br&gt;雙重角色&lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- ... legend ... --&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：鈣的雙重角色圖表</h4>
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
                        </div>
                        
                        <h4 id="比較卡片設計-使用-css-變數">比較卡片設計 (使用 CSS 變數)</h4>
<pre><code>&lt;!-- 
  [修正說明]
  - 唯一例外：使用 CSS 自訂屬性 (Custom Property) 來傳遞「動態數值」(資料)，
  - 而非寫死「樣式」。CSS 檔案中應定義 .absorption-bar-fill { width: var(--absorption-percent, 0%); }
--&gt;
&lt;div class="absorption-bar"&gt;
  &lt;div class="absorption-bar-fill" style="--absorption-percent: 40%;"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：吸收率進度條 (40%)</h4>
                            <div class="absorption-bar">
                                <div class="absorption-bar-fill" style="--absorption-percent: 40%;"></div>
                            </div>
                        </div>
                        
                        <h4 id="迷思破解區塊-使用-css-class">迷思破解區塊 (使用 CSS Class)</h4>
<pre><code>&lt;!--
  [修正說明]
  - 移除所有行內 style="..." 屬性。
  - 替換為功能性的 CSS class:
    - "md-grid-4": 控制桌面版網格佈局 (手機版預設單欄)。
    - "card-theme-myth": 控制卡片主題樣式。
--&gt;
&lt;div class="info-cards md-grid-4"&gt;
  &lt;div class="info-card card-theme-myth"&gt;
    &lt;h4 class="info-card-title title-theme-myth"&gt;迷思一：喝大骨湯補鈣？&lt;/h4&gt;
    &lt;p class="info-card-desc"&gt;&lt;strong&gt;事實：&lt;/strong&gt;骨頭中的鈣很難溶出...&lt;/p&gt;
  &lt;/div&gt;
  &lt;!-- ... 其他迷思卡片 ... --&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：迷思破解卡片</h4>
                            <div class="info-cards md-grid-4">
                                <div class="info-card card-theme-myth">
                                    <h4 class="info-card-title title-theme-myth">迷思一：喝大骨湯補鈣？</h4>
                                    <p class="info-card-desc"><strong>事實：</strong>骨頭中的鈣很難溶出，一碗大骨湯的鈣含量微乎其微。</p>
                                </div>
                                <div class="info-card card-theme-myth">
                                    <h4 class="info-card-title title-theme-myth">迷思二：吃小魚乾？</h4>
                                    <p class="info-card-desc"><strong>事實：</strong>鈣含量雖高，但鈉含量也極高，且不易吸收。</p>
                                </div>
                                 <div class="info-card card-theme-myth">
                                    <h4 class="info-card-title title-theme-myth">迷思三：豆漿補鈣？</h4>
                                    <p class="info-card-desc"><strong>事實：</strong>傳統豆漿鈣含量低，需選擇鈣強化豆漿。</p>
                                </div>
                                 <div class="info-card card-theme-myth">
                                    <h4 class="info-card-title title-theme-myth">迷思四：補鈣會結石？</h4>
                                    <p class="info-card-desc"><strong>事實：</strong>適量補充通常不會，水份攝取不足才是主因。</p>
                                </div>
                            </div>
                        </div>

                        <h4 id="faq-互動設計">FAQ 互動設計</h4>
<pre><code>&lt;div class="faq-item"&gt;
  &lt;div class="faq-question"&gt;Q1: 鈣和鎂可以一起吃嗎？&lt;/div&gt;
  &lt;div class="faq-answer"&gt;
    &lt;p&gt;&lt;strong&gt;A: 可以...&lt;/strong&gt; 理想的&lt;strong class="highlight-nutrient"&gt;鈣鎂攝取比例約為 2:1&lt;/strong&gt;。&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
                        <div class="example-preview">
                            <h4 class="example-preview-title">即時預覽：FAQ</h4>
                            <div class="faq-item">
                                <div class="faq-question">Q1: 鈣和鎂可以一起吃嗎？</div>
                                <div class="faq-answer">
                                    <p><strong>A: 可以，而且建議一起補充，但要注意比例。</strong> 理想的<strong class="highlight-nutrient">鈣鎂攝取比例約為 2:1</strong>。</p>
                                </div>
                            </div>
                            <div class="faq-item">
                                <div class="faq-question">Q2: 晚上吃鈣片會睡不著嗎？</div>
                                <div class="faq-answer">
                                    <p><strong>A: 通常不會。</strong> 鈣有助於神經穩定，對睡眠可能有幫助。但若選擇碳酸鈣且消化不良，可能影響睡眠。</p>
                                </div>
                           </div>
                        </div>
                    </section>
                    
                    <section id="h3-4-3-1">
                        <h3 id="css-類別快速參考">CSS 類別快速參考</h3>
                        <p>此處列出規範中提到的所有自訂 CSS 類別，應統一放在全域 CSS 檔案中。</p>
<pre><code>/* 提示框 */
.alert-tip { background: #fffbeb; color: #b45309; }
.alert-nutritionist { background: #eff6ff; color: #1e40af; }
.alert-doctor { background: #fef2f2; color: #b91c1c; }

/* 資訊卡片 CSS */
.info-card {
    flex: 1; 
    min-width: 280px; 
    max-width: calc(50% - 10px); /* 2 欄 */
    /* ... */
}

/* 風險卡片 */
.risk-card {
     flex: 1; 
     min-width: 250px; 
     max-width: calc(33.333% - 14px); /* 3 欄 */
     /* ... */
}


/* 高亮關鍵字 */
.highlight-nutrient { /* ... */ }

/* 響應式表格 */
.responsive-table-wrapper { /* ... */ }

/* 響應式網格 (桌面版) */
@media (min-width: 768px) {
  .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
  .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
  .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
}

/* 卡片主題 (迷思破解) */
.card-theme-myth { /* ... */ }
.title-theme-myth { /* ... */ }

/* CSS 變數模式 (動態寬度) */
.absorption-bar-fill { width: var(--absorption-percent, 0%); /* ... */ }

/* TOC 子項目 */
a.sub-item { /* ... */ }

/* 錨點偏移 */
[id] { scroll-margin-top: 100px; } /* [修改] 應用於所有帶 ID 的元素 */
</code></pre>
                    </section>
                </section>
            </section>
            
        </main>
    </div>

    <!-- 
      互動式 TOC 的 JavaScript 
      - 自動生成 TOC (H1-H5)
      - 監聽滾動並反白當前章節 (Scrollspy)
      - FAQ 互動
      - RWD 初始渲染修正
    -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const mainContent = document.getElementById('main-content');
            const tocNav = document.getElementById('toc-nav');
            
            // --- TOC Generation ---
            // [修改] 包含 h4, h5
            const allHeadings = mainContent.querySelectorAll('h1, h2, h3, h4, h5');
            let tocItems = []; // Store TOC item data {id, link, el, level}
            
            allHeadings.forEach((heading) => {
                const title = heading.textContent.trim(); // Trim whitespace
                if (!title) return; // Skip empty headings

                // Use heading's own ID if it exists and is valid
                let id = heading.id && CSS.supports('selector(:is(#' + heading.id + '))') ? heading.id : null; 
                
                // If no valid ID on heading, try closest parent section ID
                if (!id) {
                     id = heading.closest('section[id]')?.id || heading.closest('[id]')?.id;
                }
                
                // If still no ID, generate one from title
                if (!id) {
                     id = title.toLowerCase()
                        .replace(/[\s\(\)\[\]\{\}]+/g, '-') // Replace spaces and brackets with hyphens
                        .replace(/[^\w-]+/g, '') // Remove invalid chars
                        .replace(/--+/g, '-') // Replace multiple hyphens
                        .replace(/^-+|-+$/g, ''); // Trim hyphens
                     id = id || `heading-${Math.random().toString(36).substring(7)}`; // Generate random if empty
                     heading.id = id; // Assign back
                } else {
                     // Ensure assigned ID is valid for querySelector
                     if (!CSS.supports('selector(:is(#' + id + '))')) {
                          console.warn(`Invalid ID "${id}" skipped for TOC on heading: "${title}"`);
                          return;
                     }
                }
                
                const level = heading.tagName; // H1, H2, H3, H4, H5
                
                // Create link
                const link = document.createElement('a');
                link.href = `#${id}`; // Link directly to heading ID
                link.textContent = title;
                link.classList.add('block', 'py-1');

                // Apply level-specific class
                if (level === 'H1') link.classList.add('toc-h1');
                else if (level === 'H2') link.classList.add('toc-h2');
                else if (level === 'H3') link.classList.add('toc-h3');
                else if (level === 'H4') link.classList.add('toc-h4'); // [新增]
                else if (level === 'H5') link.classList.add('toc-h5'); // [新增]
                else return; // Ignore other levels
                
                // Avoid duplicates based on href AND text
                if (tocItems.some(item => item.href === link.href && item.text === link.textContent)) return;

                tocNav.appendChild(link);
                tocItems.push({ 
                    id: id, 
                    link: link, 
                    el: heading, // Observe the heading itself
                    href: link.href, 
                    text: link.textContent,
                    level: level 
                });
            });

            // --- Scrollspy Logic ---
            const scrollObserver = new IntersectionObserver(entries => {
                let bestVisibleEntry = null;

                entries.forEach(entry => {
                     // Consider entries that are at least partially visible near the top
                    if (entry.isIntersecting && entry.boundingClientRect.top < (window.innerHeight * 0.3)) { 
                         if (!bestVisibleEntry || entry.boundingClientRect.top < bestVisibleEntry.boundingClientRect.top) {
                             bestVisibleEntry = entry;
                         }
                    }
                });

                // Clear all active states first
                tocItems.forEach(item => item.link.classList.remove('active'));
                tocNav.querySelectorAll('a.toc-h1').forEach(h1Link => h1Link.classList.remove('active')); // Clear H1 separately

                let activeId = null;
                if (bestVisibleEntry) {
                    activeId = bestVisibleEntry.target.id;
                } else {
                     // Fallback: If nothing is clearly intersecting near the top, find the last one scrolled past the top edge
                    let lastPastEntry = null;
                     tocItems.forEach(item => { // Iterate through observed items
                         const headingElement = item.el;
                         // Check if the bottom of the element is above the trigger line (e.g., 80px from top)
                         if (headingElement.getBoundingClientRect().bottom < 80) { 
                              // Among those above, find the one closest to the top (largest top value)
                              if (!lastPastEntry || headingElement.getBoundingClientRect().top > lastPastEntry.el.getBoundingClientRect().top) {
                                  lastPastEntry = item;
                              }
                         }
                     });
                    if (lastPastEntry) {
                        activeId = lastPastEntry.id;
                    }
                }

                // Handle top/bottom edge cases
                if (window.scrollY < 200 && tocItems.length > 0) {
                    activeId = tocItems[0].id;
                } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 && tocItems.length > 0) {
                     activeId = tocItems[tocItems.length - 1].id;
                }

                // Activate the corresponding link(s)
                if (activeId) {
                    const activeItem = tocItems.find(item => item.id === activeId);
                    if (activeItem) {
                        activeItem.link.classList.add('active');

                        // Activate the parent H1 link as well
                        const parentSectionId = activeItem.el.closest('section[id]')?.id;
                        if(parentSectionId) {
                            // Extract H1 ID prefix (assuming format doc-X)
                            const idParts = parentSectionId.match(/^(doc-\d+)/);
                             const activeH1Id = idParts ? idParts[1] : null; 
                           
                            // Find the corresponding H1 link in TOC
                            const parentH1Link = tocNav.querySelector(`a.toc-h1[href="#${activeH1Id}"]`);
                            if (parentH1Link) {
                                 parentH1Link.classList.add('active'); 
                            }
                        }
                    } else {
                         // Fallback if ID doesn't match exactly (e.g., generated ID), try href
                         const fallbackLink = tocNav.querySelector(`a[href="#${activeId}"]`);
                         if (fallbackLink) fallbackLink.classList.add('active');
                    }
                }
                 // If no activeId is found, activate the first item as default
                 else if (tocItems.length > 0) {
                      tocItems[0].link.classList.add('active');
                       const firstSectionId = tocItems[0].el.closest('section[id]')?.id;
                       if (firstSectionId) {
                            const firstH1Id = firstSectionId.match(/^(doc-\d+)/)?.[1];
                            const firstH1Link = tocNav.querySelector(`a.toc-h1[href="#${firstH1Id}"]`);
                            if (firstH1Link) firstH1Link.classList.add('active');
                       }
                 }


            }, {
                rootMargin: '-80px 0px -70% 0px', // Adjust trigger zone: starts 80px from top, ends 30% from bottom
                threshold: 0 // Trigger as soon as it enters/leaves the zone
            });

            tocItems.forEach(item => {
                 if(item.el) scrollObserver.observe(item.el);
            });


            // --- FAQ Interaction ---
            mainContent.querySelectorAll('.faq-question').forEach(question => {
                const answer = question.nextElementSibling;
                if (answer && answer.classList.contains('faq-answer')) {
                    answer.style.display = 'none'; // Initially hide
                    answer.style.overflow = 'hidden'; // For animation
                    answer.style.transition = 'max-height 0.3s ease-out';
                    answer.style.maxHeight = '0';
                    question.style.cursor = 'pointer';
                    
                    question.addEventListener('click', () => {
                        const isHidden = answer.style.display === 'none';
                        if (isHidden) {
                            answer.style.display = 'block';
                            // Timeout needed to allow display change before setting max-height
                            setTimeout(() => {
                                answer.style.maxHeight = answer.scrollHeight + 'px'; // Expand
                            }, 10); 
                        } else {
                            answer.style.maxHeight = '0'; // Collapse
                            // Wait for animation before setting display:none
                            setTimeout(() => {
                                answer.style.display = 'none';
                            }, 300); 
                        }
                    });
                }
            });
            
            // --- RWD Initial Render Fix ---
            // Trigger resize after a short delay
            setTimeout(() => {
                 console.log("觸發 resize 事件以修正 RWD 初始渲染...");
                 window.dispatchEvent(new Event('resize'));
            }, 100); 

        });
    </script>
</body>
</html>

