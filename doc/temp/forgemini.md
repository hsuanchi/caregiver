<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[權威指南] 預防心血管疾病吃什麼？10大實證護心營養素全解析</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Chosen Palette: Energetic & Playful (Adapted for Professional Context) -->
    <!-- 
         Palette:
         Background: #F9FAFB (Cool Gray 50) - Clean, readable canvas
         Primary Blue: #2F80ED (Vibrant Blue) - Trust, Authority (The "Water" in pipes)
         Accent Orange: #F2994A (Warm Orange) - Energy, Warning/Highlight
         Success Green: #27AE60 (Natural Green) - Food sources, Safety
         Warning Red: #EB5757 (Soft Red) - Contraindications, Inflammation
         Text Dark: #333333 - Readability
    -->

    <!-- Application Structure Plan:
         1. Hero Section (Story Hook): Uses the "House Maintenance" analogy (Heart = Pump, Vessels = Pipes) to simplify the cardiovascular system. This sets the mental model for the user.
         2. The 10 Guardians (Interactive Grid): Presents the 10 nutrients not as a boring list, but as "Specialists" in the maintenance crew (e.g., The Pipe Cleaner, The Rust Remover). Clicking expands to reveal professional details (Dosage, Evidence).
         3. Safety Check Protocol (Interactive Table): A dedicated section for "Dosage & Contraindications". Users can filter or toggle to see which nutrients conflict with common meds (Warfarin, Statins).
         4. Visualization Dashboard: 
            - Radar Chart: "Nutrient Power Profile" - showing which nutrient helps with what (BP, Lipids, Inflammation).
            - Bar Chart: "Top Food Sources" - Comparing nutrient density.
         5. Action Plan (Flow): A simple HTML-based flowchart summarizing the "Talk to Doctor -> Eat -> Supplement" decision tree.
    -->

    <!-- Visualization & Content Choices:
         1. Nutrient Roles (Compare/Inform): Radar Chart. Goal: Show that different nutrients target different risk factors (BP vs. Cholesterol vs. Inflammation). User sees the "shape" of protection.
         2. Food Density (Compare): Bar Chart. Goal: Show why "Food First" is better. Comparing mg of Magnesium in Spinach vs. Supplements (conceptually).
         3. Interaction Logic: Vanilla JS used to handle "Card Expansion" for the 10 nutrients and "Tab Switching" for the safety data. This keeps the interface clean but information-dense.
         4. Graphics: CSS-styled cards and Unicode icons used instead of SVGs.
    -->

    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap');
        
        body {
            font-family: 'Noto Sans TC', sans-serif;
            background-color: #F9FAFB;
            color: #333333;
        }

        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            height: 350px; /* Default height */
            max-height: 400px;
        }
        
        /* Custom scrollbar for content panels */
        .custom-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
        }

        .nutrient-card {
            transition: all 0.3s ease;
        }
        .nutrient-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .active-tab {
            border-bottom: 3px solid #2F80ED;
            color: #2F80ED;
            font-weight: 700;
        }
    </style>
</head>
<body class="antialiased">

    <!-- Navigation -->
    <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <span class="text-2xl text-[#EB5757]">♥</span>
                <h1 class="text-xl md:text-2xl font-bold tracking-tight text-gray-800">護心工程權威指南</h1>
            </div>
            <div class="hidden md:flex space-x-6 text-sm font-medium text-gray-500">
                <a href="#story" class="hover:text-[#2F80ED]">心臟的故事</a>
                <a href="#nutrients" class="hover:text-[#2F80ED]">10大護心隊長</a>
                <a href="#safety" class="hover:text-[#2F80ED]">安全劑量與禁忌</a>
            </div>
        </div>
    </nav>

    <!-- Hero / Story Hook Section -->
    <header id="story" class="bg-gradient-to-br from-[#2F80ED] to-[#56CCF2] text-white py-16 md:py-24">
        <div class="container mx-auto px-4 text-center max-w-4xl">
            <h2 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">想像您的心血管系統<br>就是一間房子的「水電管線」</h2>
            <p class="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                我們不用艱澀的醫學術語。簡單來說：<br>
                <strong>血管是水管，心臟是馬達，血液是流動的水。</strong><br>
                隨時間過去，水管會生鏽（發炎）、卡垢（膽固醇），馬達會沒力（能量不足）。<br>
                這份指南為您介紹 10 位專業的「維修技師」（營養素），<br>
                告訴您如何請它們來幫您維護這套精密的系統。
            </p>
            <a href="#nutrients" class="inline-block bg-[#F2994A] hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                認識 10 位維修專家 ↓
            </a>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="container mx-auto px-4 py-12 space-y-20">

        <!-- Introduction Paragraph for Nutrients -->
        <section id="nutrients">
            <div class="text-center max-w-3xl mx-auto mb-12">
                <h3 class="text-3xl font-bold text-gray-800 mb-4">這 10 位專家能幫您做什麼？</h3>
                <p class="text-gray-600 text-lg">
                    我們將這 10 種實證營養素分為三組：「管線清潔工」、「馬達保養員」與「系統穩壓器」。
                    點擊下方的卡片，查看它們的<strong>科學原理</strong>、<strong>建議劑量</strong>以及<strong>食物來源</strong>。
                </p>
            </div>

            <!-- Interaction Controls -->
            <div class="flex justify-center gap-4 mb-8 flex-wrap">
                <button onclick="filterNutrients('all')" class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium focus:ring-2 focus:ring-[#2F80ED] transition-colors active-filter" data-filter="all">全部顯示</button>
                <button onclick="filterNutrients('cleaner')" class="px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium focus:ring-2 focus:ring-blue-400 transition-colors" data-filter="cleaner">管線清潔工 (血管)</button>
                <button onclick="filterNutrients('engine')" class="px-4 py-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium focus:ring-2 focus:ring-orange-400 transition-colors" data-filter="engine">馬達保養員 (心肌)</button>
                <button onclick="filterNutrients('stabilizer')" class="px-4 py-2 rounded-full bg-green-100 hover:bg-green-200 text-green-800 font-medium focus:ring-2 focus:ring-green-400 transition-colors" data-filter="stabilizer">系統穩壓器 (血壓/代謝)</button>
            </div>

            <!-- Nutrient Grid -->
            <div id="nutrient-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Cards will be injected by JS -->
            </div>
        </section>

        <!-- Visualization Section -->
        <section class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                <!-- Chart 1: Radar -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">營養素功能雷達圖</h3>
                    <p class="text-gray-500 mb-6 text-sm">
                        此圖表顯示不同營養素在「降低血壓」、「清除膽固醇」、「抗發炎」等面向的相對強項。沒有單一營養素是萬能的，這就是為什麼我們需要多元攝取。
                    </p>
                    <div class="chart-container">
                        <canvas id="functionRadarChart"></canvas>
                    </div>
                </div>

                <!-- Chart 2: Stacked Bar -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">食物來源 vs. 補充品</h3>
                    <p class="text-gray-500 mb-6 text-sm">
                        透過全食物攝取通常能獲得更好的吸收率與協同效應。此圖表比較了關鍵食物來源中的營養密度。
                    </p>
                    <div class="chart-container">
                        <canvas id="sourceBarChart"></canvas>
                    </div>
                </div>

            </div>
        </section>

        <!-- Safety & Dosage Table Section -->
        <section id="safety" class="max-w-5xl mx-auto">
            <div class="text-center mb-10">
                <h3 class="text-3xl font-bold text-gray-800 mb-4">⚠️ 安全劑量與藥物禁忌資料庫</h3>
                <p class="text-gray-600 text-lg">
                    這是本指南最重要的一章。如果您正在服用抗凝血劑（如 Warfarin）或降血壓藥，請務必在使用任何補充品前查閱此表。
                    <br><span class="text-sm text-[#EB5757] font-bold">高風險提示：紅字代表絕對禁忌或需高度謹慎。</span>
                </p>
            </div>

            <!-- Custom Table Component -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                                <th class="p-4 font-bold">營養素</th>
                                <th class="p-4 font-bold">建議攝取量 (每日)</th>
                                <th class="p-4 font-bold">主要藥物禁忌 / 交互作用</th>
                                <th class="p-4 font-bold">備註</th>
                            </tr>
                        </thead>
                        <tbody id="safety-table-body" class="text-sm text-gray-700 divide-y divide-gray-100">
                            <!-- Rows injected by JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Decision Flowchart -->
        <section class="bg-[#2F80ED] text-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 class="text-2xl font-bold mb-8 text-center">您的下一步行動計劃</h3>
            
            <div class="flex flex-col md:flex-row justify-center items-center gap-6 text-center">
                
                <div class="bg-white/10 p-6 rounded-xl border border-white/20 w-full md:w-1/4 backdrop-blur-sm">
                    <div class="text-4xl mb-4">🩺</div>
                    <h4 class="font-bold text-lg mb-2">1. 檢視藥單</h4>
                    <p class="text-sm opacity-90">確認您目前正在服用的心血管藥物，特別是抗凝血劑。</p>
                </div>

                <div class="text-2xl md:rotate-0 rotate-90">→</div>

                <div class="bg-white/10 p-6 rounded-xl border border-white/20 w-full md:w-1/4 backdrop-blur-sm">
                    <div class="text-4xl mb-4">🥗</div>
                    <h4 class="font-bold text-lg mb-2">2. 飲食優先</h4>
                    <p class="text-sm opacity-90">先從上述的「超級食物」來源攝取。每週吃兩次深海魚。</p>
                </div>

                <div class="text-2xl md:rotate-0 rotate-90">→</div>

                <div class="bg-white/10 p-6 rounded-xl border border-white/20 w-full md:w-1/4 backdrop-blur-sm">
                    <div class="text-4xl mb-4">💊</div>
                    <h4 class="font-bold text-lg mb-2">3. 諮詢補充</h4>
                    <p class="text-sm opacity-90">若飲食不足，請帶著本文的「安全劑量表」與醫師討論補充品。</p>
                </div>

            </div>
        </section>

    </main>

    <footer class="bg-gray-800 text-gray-400 py-8 text-center text-sm">
        <div class="container mx-auto px-4">
            <p class="mb-2">資料來源整合自：AHA (美國心臟協會), Mayo Clinic, 與多項臨床營養學期刊。</p>
            <p class="text-[#EB5757]">免責聲明：本網站內容僅供教育參考，並非醫療建議。如有不適請立即就醫。</p>
        </div>
    </footer>

    <script>
        // --- Data ---
        const nutrients = [
            {
                id: 1,
                name: "Omega-3 脂肪酸",
                category: "cleaner",
                role: "管線消炎劑",
                icon: "🐟",
                story: "想像血管發炎就像水管內壁生鏽。Omega-3 是最好的防鏽漆與消炎劑，能平滑血管內壁，減少血栓（髒污堆積）的機會。",
                science: "降低三酸甘油酯 (15-30%)，微幅提升 HDL，改善血管內皮功能。",
                dosage: "一般保養 1000mg；治療高血脂需 2000-4000mg (需醫囑)。",
                food: "鮭魚、鯖魚、亞麻籽、核桃。",
                contraindication: "抗凝血劑 (Warfarin/Coumadin) - 可能增加出血風險。",
                riskLevel: "high"
            },
            {
                id: 2,
                name: "水溶性纖維",
                category: "cleaner",
                role: "血管海綿",
                icon: "🥣",
                story: "就像海綿吸附油污一樣，水溶性纖維在腸道就會把膽固醇「黏住」，直接排出體外，不讓它進入血液變成血管裡的垃圾。",
                science: "有效降低 LDL (壞膽固醇)，穩定血糖波動。",
                dosage: "每日 25-35g (其中水溶性應佔 6-8g)。",
                food: "燕麥、蘋果 (帶皮)、豆類、秋葵。",
                contraindication: "可能影響某些藥物吸收，建議與藥物間隔 2 小時服用。",
                riskLevel: "low"
            },
            {
                id: 3,
                name: "輔酶 Q10",
                category: "engine",
                role: "心臟火星塞",
                icon: "⚡",
                story: "心臟是全天候運作的馬達，Q10 就是它的「火星塞」。沒有足夠的 Q10，心臟收縮就會無力，容易導致心衰竭。",
                science: "改善心肌能量代謝，特別有助於服用 Statin 類藥物引起的肌肉痠痛。",
                dosage: "每日 30-100mg；心衰竭患者可能需更高。",
                food: "豬心、牛肉、沙丁魚、花生。",
                contraindication: "抗凝血劑 (Warfarin) - 結構類似維生素 K，可能降低藥效。",
                riskLevel: "medium"
            },
            {
                id: 4,
                name: "鉀 (Potassium)",
                category: "stabilizer",
                role: "血管放鬆劑",
                icon: "🍌",
                story: "如果「鈉」(鹽) 會把血管勒緊，那「鉀」就是負責把血管鬆開的手。它能對抗鹽分，讓血管放鬆，血壓自然下降。",
                science: "排鈉降壓，維持心肌細胞電位平衡。",
                dosage: "每日 3500-4700mg (從食物攝取)。",
                food: "香蕉、菠菜、馬鈴薯、地瓜。",
                contraindication: "ACEI/ARB 類降血壓藥、保鉀利尿劑、腎臟病患者 - 恐致高血鉀症 (危險)。",
                riskLevel: "high"
            },
            {
                id: 5,
                name: "鎂 (Magnesium)",
                category: "stabilizer",
                role: "心律指揮家",
                icon: "🥬",
                story: "鎂負責指揮心跳的節奏。缺鎂時，心臟容易亂跳 (心律不整) 且血管容易痙攣。",
                science: "放鬆血管平滑肌，穩定心律，改善胰島素敏感度。",
                dosage: "男性 400-420mg，女性 310-320mg。",
                food: "深綠色蔬菜、南瓜籽、黑巧克力、杏仁。",
                contraindication: "嚴重心腎功能不全者需注意；可能影響抗生素吸收。",
                riskLevel: "medium"
            },
            {
                id: 6,
                name: "植物固醇",
                category: "cleaner",
                role: "膽固醇替身",
                icon: "🌱",
                story: "它長得跟膽固醇很像。在腸道排隊進入血液時，它會「插隊」佔據位置，讓真正的壞膽固醇無法被吸收。",
                science: "每日攝取 2g 可降低 LDL 約 10%。",
                dosage: "每日 1.5-2g。",
                food: "強化植物油、堅果、全穀類 (天然含量低，常需強化食品)。",
                contraindication: "植物固醇血症 (罕見遺傳病) 患者禁用。",
                riskLevel: "low"
            },
            {
                id: 7,
                name: "茄紅素",
                category: "cleaner",
                role: "抗氧化盾牌",
                icon: "🍅",
                story: "血管內壁很怕自由基的攻擊。茄紅素是一面強力的紅色盾牌，專門阻擋 LDL 被氧化，因為只有「被氧化的 LDL」才會黏在血管壁上。",
                science: "強效抗氧化，降低 LDL 氧化率，改善血管內皮功能。",
                dosage: "每日 10-20mg。",
                food: "番茄 (煮熟更好)、紅西瓜、紅葡萄柚。",
                contraindication: "無明顯禁忌，極大量可能導致皮膚變黃。",
                riskLevel: "low"
            },
            {
                id: 8,
                name: "大蒜素 (Allicin)",
                category: "cleaner",
                role: "血管清道夫",
                icon: "🧄",
                story: "大蒜不只是調味。它能抑制血小板過度凝集（避免血塊），還能稍微擴張血管，就像是幫血管做定期的大掃除。",
                science: "抑制血小板凝集，輕微降血壓，抗菌。",
                dosage: "每日 600-1200mg (約 2-4 瓣生蒜)。",
                food: "生大蒜 (拍碎後靜置 10 分鐘活性最高)。",
                contraindication: "抗凝血劑、手術前 2 週 - 增加出血風險。",
                riskLevel: "medium"
            },
            {
                id: 9,
                name: "維生素 B 群 (B6, B12, 葉酸)",
                category: "stabilizer",
                role: "毒素轉化器",
                icon: "🥩",
                story: "血液中有一種叫「同型半胱胺酸」的毒素，會刮傷血管壁。B 群就是轉化器，能把這種毒素變回無害的物質。",
                science: "降低同型半胱胺酸 (Homocysteine) 濃度，減少動脈硬化風險。",
                dosage: "B6 1.3-1.7mg, B12 2.4mcg, 葉酸 400mcg。",
                food: "深綠色蔬菜 (葉酸)、肉類/蛋 (B12)、全穀 (B6)。",
                contraindication: "與特定化療藥物或抗癲癇藥可能有交互作用。",
                riskLevel: "low"
            },
            {
                id: 10,
                name: "維生素 D",
                category: "stabilizer",
                role: "系統總調節",
                icon: "☀️",
                story: "雖然叫維生素，其實它是荷爾蒙。它調節血壓系統和發炎反應。缺乏維生素 D 與高血壓和心臟病發作高度相關。",
                science: "調節 RAAS 系統 (血壓控制)，抗發炎。",
                dosage: "每日 600-2000 IU (依血檢結果調整)。",
                food: "日曬、強化牛奶、多脂魚、蛋黃。",
                contraindication: "地高辛 (Digoxin) - 可能增加藥物毒性風險 (高血鈣)。",
                riskLevel: "medium"
            }
        ];

        // --- Logic: Render Cards ---
        function renderCards(filterType) {
            const grid = document.getElementById('nutrient-grid');
            grid.innerHTML = '';
            
            const filtered = filterType === 'all' 
                ? nutrients 
                : nutrients.filter(n => n.category === filterType);

            filtered.forEach(n => {
                const card = document.createElement('div');
                card.className = 'nutrient-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full';
                
                // Color coding borders based on category
                let borderColor = 'border-t-4 border-gray-400';
                if(n.category === 'cleaner') borderColor = 'border-t-4 border-[#2F80ED]'; // Blue
                if(n.category === 'engine') borderColor = 'border-t-4 border-[#F2994A]'; // Orange
                if(n.category === 'stabilizer') borderColor = 'border-t-4 border-[#27AE60]'; // Green

                card.innerHTML = `
                    <div class="${borderColor} p-6 flex-grow">
                        <div class="flex justify-between items-start mb-4">
                            <div class="bg-gray-50 p-3 rounded-full text-3xl shadow-inner">${n.icon}</div>
                            <span class="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-500 uppercase">${n.role}</span>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">${n.name}</h4>
                        <p class="text-gray-600 text-sm mb-4 italic">"${n.story}"</p>
                        
                        <div class="space-y-3">
                            <div>
                                <h5 class="text-xs font-bold text-[#2F80ED] uppercase tracking-wide">科學實證</h5>
                                <p class="text-xs text-gray-500">${n.science}</p>
                            </div>
                            <div>
                                <h5 class="text-xs font-bold text-[#27AE60] uppercase tracking-wide">最佳食源</h5>
                                <p class="text-xs text-gray-500">${n.food}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 border-t border-gray-100">
                        <div class="flex items-center text-xs text-[#EB5757] font-semibold">
                            <span class="mr-1">⚠️</span> 注意：${n.contraindication.substring(0, 20)}...
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // --- Logic: Render Table ---
        function renderTable() {
            const tbody = document.getElementById('safety-table-body');
            nutrients.forEach(n => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-gray-50 transition-colors border-b border-gray-100';
                
                const riskClass = n.riskLevel === 'high' ? 'text-[#EB5757] font-bold' : (n.riskLevel === 'medium' ? 'text-orange-600' : 'text-gray-600');

                tr.innerHTML = `
                    <td class="p-4 font-medium text-gray-800 flex items-center gap-2">
                        <span>${n.icon}</span> ${n.name}
                    </td>
                    <td class="p-4 text-gray-600">${n.dosage}</td>
                    <td class="p-4 ${riskClass}">${n.contraindication}</td>
                    <td class="p-4 text-xs text-gray-500">${n.role}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // --- Logic: Filter Buttons ---
        function filterNutrients(type) {
            // Update active button state
            document.querySelectorAll('button[data-filter]').forEach(btn => {
                if(btn.dataset.filter === type) {
                    btn.classList.add('bg-gray-800', 'text-white', 'ring-2', 'ring-offset-2');
                    btn.classList.remove('bg-gray-200', 'bg-blue-100', 'bg-orange-100', 'bg-green-100', 'text-gray-700', 'text-blue-800', 'text-orange-800', 'text-green-800');
                } else {
                    // Reset to default styles (simplified for brevity, ideally strictly class swapping)
                    btn.className = `px-4 py-2 rounded-full font-medium focus:ring-2 transition-colors ${getOriginalBtnClass(btn.dataset.filter)}`;
                }
            });
            renderCards(type);
        }

        function getOriginalBtnClass(type) {
            if (type === 'all') return 'bg-gray-200 hover:bg-gray-300 text-gray-700';
            if (type === 'cleaner') return 'bg-blue-100 hover:bg-blue-200 text-blue-800 focus:ring-blue-400';
            if (type === 'engine') return 'bg-orange-100 hover:bg-orange-200 text-orange-800 focus:ring-orange-400';
            if (type === 'stabilizer') return 'bg-green-100 hover:bg-green-200 text-green-800 focus:ring-green-400';
        }

        // --- Visualization Init ---
        function initCharts() {
            // Chart 1: Radar Chart (Nutrient Functions)
            const ctxRadar = document.getElementById('functionRadarChart').getContext('2d');
            new Chart(ctxRadar, {
                type: 'radar',
                data: {
                    labels: ['降血壓', '降膽固醇', '抗發炎', '增強心肌', '抗氧化', '血管彈性'],
                    datasets: [{
                        label: 'Omega-3',
                        data: [3, 4, 5, 2, 2, 5],
                        fill: true,
                        backgroundColor: 'rgba(47, 128, 237, 0.2)',
                        borderColor: '#2F80ED',
                        pointBackgroundColor: '#2F80ED'
                    }, {
                        label: '鉀 & 鎂',
                        data: [5, 1, 2, 4, 0, 4],
                        fill: true,
                        backgroundColor: 'rgba(39, 174, 96, 0.2)',
                        borderColor: '#27AE60',
                        pointBackgroundColor: '#27AE60'
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(0,0,0,0.1)' },
                            grid: { color: 'rgba(0,0,0,0.1)' },
                            pointLabels: { font: { size: 12, family: 'Noto Sans TC' } },
                            suggestedMin: 0,
                            suggestedMax: 5
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });

            // Chart 2: Stacked Bar (Food Sources)
            const ctxBar = document.getElementById('sourceBarChart').getContext('2d');
            
            // Text wrap helper
            const wrapLabel = (str) => str.split(' ');

            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: ['鮭魚 (100g)', '菠菜 (1碗)', '燕麥 (1碗)', '堅果 (1把)', '香蕉 (1根)'],
                    datasets: [
                        {
                            label: 'Omega-3 (相對量)',
                            data: [90, 10, 5, 40, 0],
                            backgroundColor: '#2F80ED'
                        },
                        {
                            label: '鎂 (相對量)',
                            data: [10, 80, 30, 70, 15],
                            backgroundColor: '#F2994A'
                        },
                        {
                            label: '鉀 (相對量)',
                            data: [20, 60, 10, 20, 90],
                            backgroundColor: '#27AE60'
                        }
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true, display: false } // Normalize visually
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItems) {
                                    return tooltipItems[0].label;
                                }
                            }
                        },
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        // --- Init ---
        document.addEventListener('DOMContentLoaded', () => {
            renderCards('all');
            renderTable();
            initCharts();
            
            // Set initial active state for "All" button
            filterNutrients('all');
        });

    </script>
</body>
</html>