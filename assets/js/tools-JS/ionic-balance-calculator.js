/**
 * SodiumPotassiumCalc Component
 * 
 * 核心功能：計算飲食中的鈉鉀比 (Na:K Ratio)
 * 評估標準：
 * - 最佳：< 0.5 (AHA 理想標準)
 * - 良好：0.5 - 0.7 (WHO 標準)
 * - 警戒：0.7 - 1.0
 * - 高風險：> 1.0 (典型現代失衡飲食)
 */
(function (global) {
    'use strict';

    class SodiumPotassiumCalc {
        constructor(hostElement) {
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });

            this._config = {
                debug: false,
                primaryColor: '#be123c', // Rose-700
                primaryLight: '#ffe4e6',
                accentColor: '#059669' // Emerald-600
            };
        }

        initialize() {
            this.createStyles();
            this.createContent();
            this.attachEvents();
            return this;
        }

        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    --primary: ${this._config.primaryColor};
                    --primary-light: ${this._config.primaryLight};
                    --accent: ${this._config.accentColor};
                }

                .calc-wrapper {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    padding: 35px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
                    max-width: 650px;
                    margin: 0 auto;
                }

                .header { text-align: center; margin-bottom: 30px; }
                .title { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin: 0 0 10px 0; }
                .subtitle { font-size: 0.9rem; color: #64748b; }

                .input-section {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .input-group { display: flex; flex-direction: column; gap: 8px; }
                .input-group.full { grid-column: span 2; }

                label { font-size: 0.85rem; font-weight: 700; color: #4b5563; display: flex; justify-content: space-between; }
                .label-hint { font-weight: 400; color: #94a3b8; font-size: 0.75rem; }

                input {
                    padding: 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 1rem;
                    background: #f8fafc;
                    color: #1e293b;
                    transition: border-color 0.2s;
                }

                input:focus {
                    outline: none;
                    border-color: var(--primary);
                    background: #fff;
                }

                .helper-tool {
                    background: #f1f5f9;
                    border-radius: 12px;
                    padding: 15px;
                    margin-bottom: 25px;
                    font-size: 0.85rem;
                }

                .helper-title { font-weight: 700; color: #475569; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }

                .btn-calc {
                    width: 100%;
                    padding: 16px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(190, 18, 60, 0.2);
                }

                .btn-calc:hover { transform: translateY(-2px); background: #9f1239; }

                .result-area {
                    margin-top: 35px;
                    padding: 25px;
                    border-radius: 15px;
                    display: none;
                    border: 2px solid var(--primary-light);
                }

                .result-area.show { display: block; animation: slideUp 0.4s ease-out; }

                .result-header { text-align: center; margin-bottom: 20px; }
                .ratio-display { font-size: 3.5rem; font-weight: 900; line-height: 1; color: var(--primary); }
                .ratio-unit { font-size: 1rem; color: #64748b; font-weight: 400; }
                
                .status-badge {
                    display: inline-block;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    margin-top: 10px;
                }

                .status-optimal { background: #d1fae5; color: #065f46; }
                .status-good { background: #ecfdf5; color: #047857; }
                .status-warning { background: #fffbeb; color: #92400e; }
                .status-danger { background: #fef2f2; color: #991b1b; }

                .gauge-container {
                    height: 10px;
                    background: #e2e8f0;
                    border-radius: 5px;
                    margin: 25px 0;
                    position: relative;
                    overflow: hidden;
                }
                .gauge-fill {
                    height: 100%;
                    width: 0%;
                    transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .suggestion-box {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-radius: 12px;
                    padding: 15px;
                    margin-top: 20px;
                    text-align: left;
                }
                .suggestion-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 8px; color: #1e293b; }
                .suggestion-list { margin: 0; padding-left: 20px; font-size: 0.85rem; color: #475569; line-height: 1.6; }

                .disclaimer { font-size: 0.75rem; color: #94a3b8; margin-top: 25px; border-top: 1px dashed #e2e8f0; padding-top: 15px; text-align: center; }

                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 480px) {
                    .input-section { grid-template-columns: 1fr; }
                    .calc-wrapper { padding: 20px; }
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        createContent() {
            const container = document.createElement('div');
            container.className = 'calc-wrapper';
            container.innerHTML = `
                <div class="header">
                    <h2 class="title">⚖️ 鈉鉀離子平衡比計算機</h2>
                    <p class="subtitle">評估飲食中的礦物質平衡，預防高血壓與水腫</p>
                </div>

                <div class="helper-tool">
                    <div class="helper-title">🧂 鹽分轉換小工具</div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <input type="number" id="salt-input" placeholder="輸入鹽量 (g)" style="flex: 1; padding: 8px;">
                        <span style="font-size: 1.2rem;">➔</span>
                        <div id="salt-result" style="flex: 1; font-weight: 700; color: var(--primary);">約 0 mg 鈉</div>
                    </div>
                    <p style="margin: 8px 0 0 0; color: #64748b; font-size: 0.75rem;">* 1 克食鹽 (NaCl) 約含有 400 毫克鈉。</p>
                </div>

                <div class="input-section">
                    <div class="input-group">
                        <label>每日總鈉攝取 <span class="label-hint">(mg/日)</span></label>
                        <input type="number" id="na-input" value="2400" min="0">
                    </div>
                    <div class="input-group">
                        <label>每日總鉀攝取 <span class="label-hint">(mg/日)</span></label>
                        <input type="number" id="k-input" value="2000" min="0">
                    </div>
                </div>

                <button class="btn-calc" id="btn-calc">計算 Na:K 比值</button>

                <div class="result-area" id="result-area">
                    <div class="result-header">
                        <div style="font-size: 0.9rem; font-weight: 700; color: #64748b;">您的鈉鉀質量比為</div>
                        <div class="ratio-display" id="ratio-val">1.20</div>
                        <div class="status-badge" id="status-badge">高風險 (失衡)</div>
                    </div>

                    <div class="gauge-container">
                        <div class="gauge-fill" id="gauge-fill"></div>
                    </div>

                    <div class="suggestion-box">
                        <div class="suggestion-title" id="suggestion-title">💡 專家平衡建議</div>
                        <ul class="suggestion-list" id="suggestion-list"></ul>
                    </div>

                    <div class="disclaimer">
                        * 本工具僅供飲食參考。WHO 建議鈉攝取應低於 2000mg，鉀應高於 3510mg。若有腎臟疾病者，請務必諮詢診治醫師。
                    </div>
                </div>
            `;
            this.shadowRoot.appendChild(container);

            this.naInput = this.shadowRoot.getElementById('na-input');
            this.kInput = this.shadowRoot.getElementById('k-input');
            this.saltInput = this.shadowRoot.getElementById('salt-input');
            this.saltResult = this.shadowRoot.getElementById('salt-result');
            this.btn = this.shadowRoot.getElementById('btn-calc');
            this.resultArea = this.shadowRoot.getElementById('result-area');
            this.ratioVal = this.shadowRoot.getElementById('ratio-val');
            this.statusBadge = this.shadowRoot.getElementById('status-badge');
            this.gaugeFill = this.shadowRoot.getElementById('gauge-fill');
            this.suggestionList = this.shadowRoot.getElementById('suggestion-list');
        }

        attachEvents() {
            this.btn.addEventListener('click', () => this.calculate());

            this.saltInput.addEventListener('input', (e) => {
                const salt = parseFloat(e.target.value) || 0;
                const na = Math.round(salt * 400);
                this.saltResult.textContent = `約 ${na} mg 鈉`;
                this.naInput.value = na;
            });

            // Prevent negative inputs
            [this.naInput, this.kInput].forEach(input => {
                input.addEventListener('change', (e) => {
                    if (parseFloat(e.target.value) < 0) e.target.value = 0;
                });
            });
        }

        calculate() {
            const na = parseFloat(this.naInput.value) || 0;
            const k = parseFloat(this.kInput.value) || 0;

            if (k === 0) {
                alert('鉀攝取量不能為 0，請輸入正確數值。');
                return;
            }

            const ratio = na / k;
            this.showResult(ratio, na, k);
        }

        showResult(ratio, na, k) {
            this.ratioVal.textContent = ratio.toFixed(2);
            this.resultArea.classList.add('show');

            let status = '';
            let statusClass = '';
            let color = '';
            let suggestions = [];

            if (ratio < 0.5) {
                status = '極致平衡 (AHA 理想)';
                statusClass = 'status-optimal';
                color = '#059669';
                suggestions = [
                    '您的鈉鉀比例非常理想，這對血壓穩定極具幫助。',
                    '請維持目前這種低度加工、天然植物來源豐富的飲食習慣。',
                    '注意：若日常運動量極大且出汗多，可略微增加鈉攝取以防低血鈉。'
                ];
            } else if (ratio <= 0.7) {
                status = '良好平衡 (WHO 標準)';
                statusClass = 'status-good';
                color = '#10b981';
                suggestions = [
                    '比例符合健康標準，屬於中風風險較低的族群。',
                    '持續以天然食材為主，避免過度依賴餐館與外食。',
                    '每日可搭配適量的高鉀水果（如香蕉、奇異果）來固守平衡。'
                ];
            } else if (ratio <= 1.0) {
                status = '輕微失衡 (警戒區)';
                statusClass = 'status-warning';
                color = '#f59e0b';
                suggestions = [
                    '目前的鈉攝取略高於鉀，可能增加腎臟負擔與水腫機率。',
                    '**減鈉建議**：烹飪時嘗試用香料（薑、蒜、檸檬）取代部分鹽分。',
                    '**增鉀建議**：晚餐增加半碗綠色葉菜類或根莖類（如地瓜、南瓜）。'
                ];
            } else {
                status = '嚴重失衡 (高風險)';
                statusClass = 'status-danger';
                color = '#dc2626';
                suggestions = [
                    '強烈警訊！過高的鈉攝取正對您的心血管造成壓力。',
                    '**首要任務**：大幅減少加工食品、罐頭與連鎖速食的攝取。',
                    '**急救措施**：多補充富含鉀的深綠色蔬菜與酪梨。',
                    '**水分補充**：確保每日飲水量充足，協助身體排除多餘的鈉。'
                ];
            }

            // Additional logic for double high/low
            if (na > 2300) suggestions.push('提醒：您的總鈉量已超過 2300mg 限制。');
            if (k < 2500) suggestions.push('提醒：您的總鉀量嚴重不足（低於 2500mg）。');

            this.statusBadge.textContent = status;
            this.statusBadge.className = `status-badge ${statusClass}`;

            // Gauge fill (0 to 2.0 scale)
            const fillWidth = Math.min((ratio / 2) * 100, 100);
            this.gaugeFill.style.width = `${fillWidth}%`;
            this.gaugeFill.style.backgroundColor = color;

            // Render suggestions
            this.suggestionList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
        }
    }

    global.SodiumPotassiumCalc = SodiumPotassiumCalc;
})(window);
