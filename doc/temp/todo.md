# BetterBio 品牌頁面優化待辦事項

這是 `brand/betterbio.html` 頁面的後續優化建議。

## 1. 視覺與品牌感優化 (Visual & Brand Identity)

- [ ] **替換品牌 Logo**: 將 `/assets/images/betterbio_logo.png` 的 placeholder 圖片替換為 BetterBio 的正式 Logo。
- [ ] **替換品牌橫幅**: 將 `/assets/images/betterbio_banner.jpeg` 的 placeholder 圖片替換為高品質的品牌橫幅。
- [ ] **替換商品圖片**:
    - [ ] 將 `/assets/images/product1.jpeg` 替換為「高效益生菌膠囊」的實際商品圖。
    - [ ] 將 `/assets/images/product2.jpeg` 替換為「純淨魚油軟膠囊」的實際商品圖。
    - [ ] 將 `/assets/images/product3.jpeg` 替換為「綜合維生素B群」的實際商品圖。
- [ ] **優化優惠券卡片設計**:
    - [ ] 將卡片左側的灰色背景 (`bg-gray-50`) 替換為 BetterBio 的品牌主色。
    - [ ] 為「顯示折扣碼」按鈕增加更細緻的滑鼠懸停 (hover) 效果。

## 2. 技術與 SEO 優化 (Technical & SEO)

- [ ] **新增結構化資料 (JSON-LD)**:
    - [ ] 在 `<head>` 中為優惠券新增 `MerchantOffer` 或 `SaleEvent` 的 Schema.org 結構化資料。這有助於 Google 更佳地理解優惠內容，並可能在搜尋結果中以特殊形式呈現。
    - [ ] **參考範例**:
      ```json
      {
        "@context": "https://schema.org",
        "@type": "SaleEvent",
        "name": "BetterBio 首購優惠",
        "description": "消費滿$500現折$50，消費滿$3000現折$100",
        "startDate": "2025-11-04",
        "endDate": "2026-12-31", // 假設的結束日期
        "location": {
          "@type": "Place",
          "name": "BetterBio 官方網站",
          "address": "https://example.com/betterbio" // 應替換為實際官網
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "TWD",
          "availability": "https://schema.org/InStock"
        }
      }
      ```

- [ ] **圖片優化**:
    - [ ] 確保所有上傳的正式圖片（Logo, Banner, 商品圖）都經過壓縮，以加快頁面載入速度。
    - [ ] 考慮將圖片轉換為現代格式，如 WebP，以獲得更好的壓縮率和品質。
    - [ ] 確認所有 `<img>` 標籤的 `alt` 屬性都已填寫，且能準確描述圖片內容。

## 3. 內容更新

- [ ] **更新連結**: 將頁面中所有的 `href="#"` 臨時連結替換為實際的目標網址（例如官網、商品頁面）。
- [ ] **更新內容**: 將「明星商品推薦」、「使用者好評」和「常見問題」中的 placeholder 內容替換為真實、準確的資訊。