import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# 設定字體以支援中文顯示 (需視系統字體而定，此為通用設定)
plt.rcParams['font.sans-serif'] = ['Microsoft JhengHei', 'SimHei', 'Arial Unicode MS', 'sans-serif']
plt.rcParams['axes.unicode_minus'] = False

class FishOilAnalyzer:
    def __init__(self, data_path='../data/fish_oil_data.csv'):
        self.data_path = data_path
        self.df = None
        self.output_dir = 'output'
        
        # 建立輸出目錄
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def load_data(self):
        """讀取並初步清洗數據"""
        try:
            self.df = pd.read_csv(self.data_path)
            print(f"成功讀取數據，共 {len(self.df)} 筆資料。")
            return self.df
        except FileNotFoundError:
            print(f"錯誤：找不到檔案 {self.data_path}")
            # 生成測試用假資料
            print("生成測試數據以供演示...")
            self.generate_mock_data()
            return self.df

    def generate_mock_data(self):
        """生成測試用假數據 (當真實 CSV 不存在時使用)"""
        data = {
            'Brand': ['Sports Research', 'Daiken', 'Kirkland', 'Nordic Naturals', 'Suntory', 'Damo'],
            'Product': ['Triple Strength', 'German Top', 'Fish Oil 1000', 'Ultimate Omega', 'DHA&EPA', '90% Omega'],
            'Price_TWD': [950, 1500, 600, 1200, 2100, 1300],
            'Total_Capsules': [30, 60, 400, 60, 120, 60],
            'Serving_Size': [1, 2, 1, 2, 4, 2],
            'Omega3_per_serving': [950, 1008, 300, 1280, 400, 1080],
            'Form': ['rTG', 'rTG', 'EE', 'rTG', 'TG', 'rTG']
        }
        self.df = pd.DataFrame(data)

    def calculate_metrics(self):
        """計算關鍵指標：濃度與真實成本"""
        if self.df is None:
            return

        # 1. 計算單顆價格
        self.df['Price_per_Cap'] = self.df['Price_TWD'] / self.df['Total_Capsules']

        # 2. 計算單顆 Omega-3 (mg)
        self.df['Omega3_per_Cap'] = self.df['Omega3_per_serving'] / self.df['Serving_Size']

        # 3. 計算真實成本 (Price per 1000mg Omega-3)
        # Cost = (Price_per_Cap / Omega3_per_Cap) * 1000
        self.df['Real_Cost'] = (self.df['Price_per_Cap'] / self.df['Omega3_per_Cap']) * 1000

        # 4. 估算濃度 (僅供圖表 X 軸參考，假設膠囊均重 1200mg，若數據中有 Total_Weight 則優先使用)
        # 注意：這只是粗估，Kirkland 等 EE 型態通常膠囊較大 (1400mg+)，高濃度 rTG 通常較小 (700-1000mg)
        # 這裡為了簡單起見，不計算精確濃度 %，而是直接用 Omega3_per_Cap 作為品質指標
        # 或者我們模擬一個 'Concentration_Label'
        print("指標計算完成 (前 5 筆)：")
        print(self.df[['Brand', 'Product', 'Real_Cost']].head())

    def plot_scatter(self):
        """繪製散佈圖：濃度 vs 真實成本"""
        if self.df is None: return

        plt.figure(figsize=(10, 8))
        
        # 繪製散佈點
        sns.scatterplot(
            data=self.df, 
            x='Omega3_per_Cap', 
            y='Real_Cost', 
            hue='Form', 
            style='Form', 
            s=200, 
            alpha=0.8,
            palette='viridis'
        )

        # 標註品牌名稱
        for i, row in self.df.iterrows():
            plt.text(
                row['Omega3_per_Cap']+10, 
                row['Real_Cost'], 
                f"{row['Brand']}", 
                fontsize=9
            )

        # 裝飾圖表
        plt.title('魚油殘酷擂台：單顆劑量 vs 真實成本', fontsize=16, fontweight='bold')
        plt.xlabel('單顆 Omega-3 含量 (mg) -> 越高吞越少', fontsize=12)
        plt.ylabel('每 1000mg 真實成本 (TWD) -> 越低越便宜', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.6)
        
        # 儲存
        save_path = os.path.join(self.output_dir, 'fish_oil_scatter_2025.png')
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"圖表已儲存至：{save_path}")
        plt.close()

    def plot_bar(self):
        """繪製長條圖：真實成本排名"""
        if self.df is None: return

        # 排序
        df_sorted = self.df.sort_values('Real_Cost', ascending=True)

        plt.figure(figsize=(12, 6))
        
        barplot = sns.barplot(
            data=df_sorted,
            x='Brand',
            y='Real_Cost',
            hue='Form',
            palette='magma'
        )

        plt.title('誰是 CP 值之王？每 1000mg Omega-3 真實花費', fontsize=16, fontweight='bold')
        plt.xlabel('品牌', fontsize=12)
        plt.ylabel('費用 (TWD)', fontsize=12)
        plt.xticks(rotation=45)
        
        # 標註數值
        for i, p in enumerate(barplot.patches):
            if i < len(df_sorted): # 避免 hue 造成的索引問題
                height = p.get_height()
                if height > 0: # 確保數值有效
                     barplot.text(p.get_x() + p.get_width() / 2., height + 1, f'{height:.1f}', ha = 'center')

        save_path = os.path.join(self.output_dir, 'fish_oil_cost_ranking_2025.png')
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"圖表已儲存至：{save_path}")
        plt.close()

if __name__ == "__main__":
    analyzer = FishOilAnalyzer()
    analyzer.load_data()
    analyzer.calculate_metrics()
    analyzer.plot_scatter()
    analyzer.plot_bar()
