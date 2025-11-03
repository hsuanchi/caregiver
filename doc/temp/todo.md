# 開發待辦事項

**重要流程**：每次完成此處的待辦事項後，需將修改紀錄更新到根目錄的 `CHANGELOG.md`。記錄完成後，再清除此處的已完成項目，但**不要刪除**此檔案。

---

### 新增任務
- 優化折扣碼頁面

網站折扣碼頁面設計分析 (以 Klook 頁面為例)

這份文件分析了 rewardpay.com 網站上 Klook 折扣碼頁面的設計邏輯與關鍵元素。

一、 核心設計邏輯

這個頁面的核心目標是「高效率地引導使用者複製折扣碼並前往商家網站完成購買」。所有的設計都圍繞著這個目標展開，具體體現在以下幾個邏輯：

清晰分類 (Clear Categorization):

頁面一開始就提供了「全部」、「折扣」、「回饋」、「優惠券代碼」等篩選標籤。

邏輯： 使用者目的明確（我要找折扣碼），此設計能讓使用者快速過濾掉不需要的資訊（例如現金回饋），直達目標，減少決策時間。

視覺層次 (Visual Hierarchy):

每個優惠都是一張獨立的「卡片」(Card)，資訊被清楚地劃分區塊。

邏輯： 卡片式設計讓使用者可以一次專注於一個優惠。在卡片內部，最重要的資訊（如 "10% OFF"）會用最大字體和最顯眼的顏色呈現，其次是優惠標題，最後才是次要資訊（如 "詳情"）。

漸進揭露 (Progressive Disclosure):

折扣碼預設是隱藏的，使用者必須點擊「顯示折扣碼」按鈕才會顯示。

邏輯： 這是此類網站最關鍵的設計之一。

增加互動： 促使使用者主動點擊，提升參與感。

追蹤成效： 網站可以精確追蹤哪個折扣碼最受歡迎（被點擊次數最多）。

減少混亂： 避免滿版的折扣碼讓頁面看起來雜亂，只顯示使用者感興趣的。

「詳情」和「條款」也是預設收合的，同樣是為了保持頁面簡潔。

引導行動 (Action-Oriented):

每張卡片上都有一個顏色鮮明、文字直接的 CTA (Call to Action) 按鈕，例如「顯示折扣碼」或「立即前往」。

邏輯： 這是使用者旅程的「下一步」。點擊後，通常會顯示折扣碼並附帶「複製」按鈕，同時可能自動開啟前往 Klook 的新分頁，最大化轉換率。

建立信任與急迫性 (Build Trust & Urgency):

頁面上會顯示「最後使用時間：38 分鐘前」或「到期日：11 月 30 日」等資訊。

邏輯：

「最後使用」：暗示這個折扣碼是有效的（社會認同），增加使用者嘗試的信心。

「到期日」：製造急迫性 (Urgency)，促使使用者「立即」使用，避免流失。

二、 關鍵 UI 元素拆解

以下是構成此頁面的主要 UI 元件：

篩選標籤 (Filter Tabs):

元素： 一組按鈕或連結，用於切換不同類型的優惠。

目的： 內容分類，快速導覽。

優惠卡片 (Offer Card):

元素： 承載單一優惠所有資訊的容器（通常帶有圓角和陰影，使其看起來像一張卡片）。

目的： 資訊區塊化，易於瀏覽。

優惠標籤 (Offer Tag):

元素： 在卡片角落或標題旁的次要標籤，如「優惠券代碼」或「Deal」。

目的： 再次強調優惠的類型。

優惠力度 (Discount Value):

元素： 卡片中最顯眼的文字，如 "10% OFF" 或 "NT$100"。

目的： 吸引使用者目光，快速傳達核心價值。

優惠標題 (Offer Title):

元素： 描述優惠內容的文字。

目的： 詳細說明折扣內容，例如「新用戶專屬」或「全站適用」。

CTA 按鈕 (Call-to-Action Button):

元素： 視覺上最突出的按鈕，例如「顯示折扣碼」。

目的： 促使使用者執行主要動作。

折扣碼顯示區 (Code Reveal Area):

元素： 預設隱藏的區域，點擊 CTA 後顯示。

內容： 包含折扣碼（通常用虛線框）和一個「複製」按鈕。

目的： 方便使用者一鍵複製，優化使用體驗。

元數據 (Meta Data):

元素： 字體較小的輔助資訊，如「到期日」、「最後使用時間」、「發布者」。

目的： 提供次要資訊，建立信任感與急迫性。

詳情連結 (Details Link):

元素： 「詳情」或「條款與細則」連結。

目的： 提供法律規範或使用限制，但不佔用主要版面。





三、 側欄 (Sidebar) 設計分析

側欄是頁面的次要區域，主要用來輔助主內容，其設計邏輯包括：

相關商店 (Related Stores):

元素： 顯示其他商家 (如 Agoda, AirAsia) 的 Logo、名稱和優惠數量。

邏輯（交叉銷售 & 導航）： 這是關鍵的流量導引設計。當使用者對 Klook (旅遊) 感興趣時，他們很可能也對 Agoda (訂房) 或 AirAsia (機票) 感興趣。這能有效提高使用者在網站上的停留時間和頁面瀏覽量 (Pageviews)，將流量導向其他高價值頁面，最大化單一使用者的價值。

省錢提示 (Hints & Tips):

元素： 簡短的、可執行的省錢建議列表，例如「下載 Klook app...」、「分享你的推薦碼...」。

邏輯（提供額外價值 & 建立權威）： 這不僅是填充內容，而是提供使用者「如何省更多」的具體建議。這建立了網站作為「省錢專家」的權威形象，同時也可能教育使用者如何使用 Klook 的功能 (如 app 優惠)，間接提高了商家 (Klook) 的轉換成功率。

優惠摘要 (Offer Summary):

元素： 「今日有效優惠」並再次列出各分類的數量 (如：優惠券代碼 48)。

邏輯（內容強化 & 輔助導航）：

強化： 再次向使用者強調此頁面有大量 (總共 63 個) 且分類清楚的優惠，增加頁面可信度。

輔助導航： 這些摘要有時也可以作為可點擊的篩選器，讓使用者在頁面滾動到下方時，也能快速篩選，作為頂部主要篩選標籤的輔助。

內容/資訊區塊 (Content/Info Section):

元素： 可能是「關於 Klook」、「常見問題 (FAQs)」或「如何使用折扣碼」的文字區塊或連結。

邏輯（SEO 優化 & 解答疑惑）：

SEO： 這些相關的文字內容（Q&A、品牌介紹）富含「Klook」、「折扣碼」等關鍵字，有助於提升此頁面在 Google 等搜尋引擎的自然搜尋排名。

解答疑惑： 預先回答使用者可能有的問題（例如「折扣碼怎麼用？」），減少使用者的不確定性，增加他們實際使用折扣碼的信心和成功率。


側欄 HTML 程式碼範例
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>側欄 (Sidebar) 程式碼範例</title>
    <!-- 載入 Tailwind CSS，這樣我們用的 class 才會有樣式 -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* 在獨立預覽時，給頁面一個灰色背景，
          並限制最大寬度 (模擬它在主頁面上的樣子)，
          這樣看起來比較舒服。
        */
        body {
            background-color: #f3f4f6; /* Tailwind 的 bg-gray-100 */
            padding: 2rem; /* Tailwind 的 p-8 */
        }
        .sidebar-container {
            max-width: 400px; /* 限制最大寬度，方便預覽 */
            margin: auto; /* 置中 */
        }
    </style>
</head>
<body>

    <!-- 
      這是一個容器，用來模擬側欄在頁面上的位置。
      lg:w-1/3: 在大型螢幕上 (lg)，寬度佔 1/3。
      mt-8 lg:mt-0: 在手機上 (預設)，與上方元素間距 8 (mt-8)；在電腦上 (lg)，無間距 (mt-0)。
    -->
    <div class="sidebar-container lg:w-1/3 mt-8 lg:mt-0">
        
        <!-- 
          側欄小工具 1: 相關商店
          邏輯: 交叉銷售 (Cross-selling) 與導航。
          吸引對 Klook (旅遊) 感興趣的使用者，也去瀏覽 Agoda (訂房) 等相關頁面。

          bg-white: 白色背景
          rounded-lg: 大圓角
          shadow-md: 中等陰影
          p-4: 內距 4 (padding)
          mb-6: 底部外距 6 (margin-bottom)，與下一個小工具分開
        -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <!-- 
              h3: 標題
              text-lg: 稍大的字體
              font-semibold: 半粗體
              text-gray-800: 深灰色文字
              border-b: 底部邊框
              pb-2: 內距 (底部) 2 (padding-bottom)
              mb-4: 底部外距 4 (margin-bottom)，與下方列表分開
            -->
            <h3 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">相關商店</h3>
            
            <!-- 
              ul: 列表
              space-y-4: 列表項目 (li) 之間的垂直間距為 4
            -->
            <ul class="space-y-4">
                <!-- 
                  li: 列表項目
                  flex: 使用 Flexbox 佈局，讓圖片和文字水平排列
                  items-center: 垂直置中
                  space-x-3: 項目 (圖片、div) 之間的水平間距為 3
                -->
                <li class="flex items-center space-x-3">
                    <!-- 
                      img: 圖片 (Logo)
                      w-10 h-10: 寬高 10 (40px)
                      rounded-md: 中圓角
                      object-cover: 圖片會填滿容器，可能會被裁切
                      bg-gray-200: 灰色背景，作為圖片載入前的佔位
                      onerror: 圖片載入失敗時的處理
                    -->
                    <img src="https://placehold.co/40x40/e2e8f0/333?text=Agoda" 
                         alt="Agoda Logo" 
                         class="w-10 h-10 rounded-md object-cover bg-gray-200"
                         onerror="this.src='https://placehold.co/40x40/e2e8f0/9ca3af?text=Logo'; this.onerror=null;">
                    <div>
                        <!-- 
                          a: 連結
                          font-semibold: 半粗體
                          text-blue-600: 藍色文字
                          hover:underline: 滑鼠移上去時加底線
                        -->
                        <a href="#" class="font-semibold text-blue-600 hover:underline">Agoda</a>
                        <!-- 
                          p: 段落 (優惠數量)
                          text-sm: 小字體
                          text-gray-500: 灰色文字
                        -->
                        <p class="text-sm text-gray-500">30 則優惠</p>
                    </div>
                </li>
                
                <!-- 第二個商店 (結構同上) -->
                <li class="flex items-center space-x-3">
                    <img src="https://placehold.co/40x40/e2e8f0/333?text=AirAsia" 
                         alt="AirAsia Logo" 
                         class="w-10 h-10 rounded-md object-cover bg-gray-200"
                         onerror="this.src='https://placehold.co/40x40/e2e8f0/9ca3af?text=Logo'; this.onerror=null;">
                    <div>
                        <a href="#" class="font-semibold text-blue-600 hover:underline">AirAsia</a>
                        <p class="text-sm text-gray-500">6 則優惠</p>
                    </div>
                </li>
            </ul>
        </div>
        
        <!-- 
          側欄小工具 2: 省錢提示
          邏輯: 提供額外價值 (Value-add)。
          建立網站的專家形象，並教育使用者如何省更多。
          (樣式 class 同小工具 1)
        -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">省錢提示 💡</h3>
            <!-- 
              ul: 列表
              space-y-3: 項目垂直間距 3
              list-disc: 圓點列表符號
              list-inside: 列表符號放在文字內部
              text-gray-700: 灰色文字
              text-sm: 小字體
            -->
            <ul class="space-y-3 list-disc list-inside text-gray-700 text-sm">
                <li>下載 Klook app 可享新用戶優惠。</li>
                <li>分享你的推薦碼給朋友，雙方都能獲得獎勵。</li>
                <li>預訂並完成活動後，留下評論可賺取 Klook 積分。</li>
            </ul>
        </div>

        <!-- 
          側欄小工具 3: 優惠摘要
          邏輯: 內容強化與導航。
          再次強調此頁面有大量優惠，並可能作為輔助的篩選器。
          (樣式 class 同小工具 1，除了移除 mb-6)
        -->
        <div class="bg-white rounded-lg shadow-md p-4">
            <h3 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">今日有效優惠</h3>
            <ul class="space-y-2 text-sm">
                <!-- 
                  li: 列表項目
                  flex: 使用 Flexbox 佈局
                  justify-between: 左右兩邊的 span 會自動推開 (靠左 & 靠右)
                -->
                <li class="flex justify-between">
                    <span class="text-gray-600">優惠券代碼</span> 
                    <span class="font-medium">48</span>
                </li>
                <li class="flex justify-between">
                    <span class="text-gray-600">折扣</span> 
                    <span class="font-medium">12</span>
                </li>
                <li class="flex justify-between">
                    <span class="text-gray-600">回饋</span> 
                    <span class="font-medium">1</span>
                </li>
                <!-- 
                  li: 總計
                  font-bold: 粗體
                  text-base: 標準字體大小 (覆蓋 text-sm)
                  mt-2 pt-2: 增加上方間距並用邊框隔開
                  border-t: 頂部邊框
                -->
                <li class="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                    <span class="text-gray-800">全部</span> 
                    <span>63</span>
                </li>
            </ul>
        </div>

    </div> <!-- 結束側欄容器 -->

</body>
</html>

