/**
 * CardioRiskCalculator Component
 * 
 * 核心功能：計算 10 年內發生動脈粥狀硬化性心血管疾病 (ASCVD) 的風險百分比
 * 演算法：基於 2013 AHA/ACC Pooled Cohort Equations (PCE)
 * 適用族群：40-79 歲且無已知心血管疾病之一般大眾
 */
(function (global) {
    'use strict';

    class CardioRiskCalculator {
        constructor(hostElement) {
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });

            this._config = {
                debug: false,
                primaryColor: '#be123c', // Rose-700
                primaryLight: '#ffe4e6'
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

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .form-item { display: flex; flex-direction: column; gap: 8px; }
                .form-item.full { grid-column: span 2; }

                label { font-size: 0.85rem; font-weight: 700; color: #4b5563; }
                select, input {
                    padding: 10px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    background: #f8fafc;
                    color: #1e293b;
                }

                .checkbox-group {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    padding: 10px;
                    background: #f1f5f9;
                    border-radius: 10px;
                }

                .check-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 600; cursor: pointer; }

                .btn-submit {
                    width: 100%;
                    padding: 15px;
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

                .btn-submit:hover { transform: translateY(-2px); background: #9f1239; }

                .result-box {
                    margin-top: 35px;
                    padding: 25px;
                    border-radius: 15px;
                    display: none;
                    text-align: center;
                    border: 2px solid var(--primary-light);
                }

                .result-box.show { display: block; animation: fadeIn 0.4s ease-out; }

                .risk-percent { font-size: 3rem; font-weight: 900; color: var(--primary); line-height: 1; }
                .risk-label { font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
                
                .risk-level-low { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
                .risk-level-med { background: #fffbeb; border-color: #fde68a; color: #92400e; }
                .risk-level-high { background: #fef2f2; border-color: #fecaca; color: #991b1b; }

                .desc { font-size: 0.9rem; color: #475569; margin-top: 15px; line-height: 1.6; }
                .disclaimer { font-size: 0.75rem; color: #94a3b8; margin-top: 25px; border-top: 1px dashed #e2e8f0; padding-top: 15px; }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                @media (max-width: 480px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .form-item.full { grid-column: auto; }
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
                    <h2 class="title">📈 ASCVD 10年心血管風險計算機</h2>
                    <p class="subtitle">評估未來十年內發生心臟病或中風的機率</p>
                </div>

                <div class="form-grid">
                    <div class="form-item">
                        <label>性別</label>
                        <select id="sex">
                            <option value="male">男性</option>
                            <option value="female">女性</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label>年齡 (40-79 歲)</label>
                        <input type="number" id="age" value="55" min="40" max="79">
                    </div>
                    <div class="form-item">
                        <label>收縮壓 (mmHg)</label>
                        <input type="number" id="sbp" value="130" min="90" max="200">
                    </div>
                     <div class="form-item">
                        <label>總膽固醇 (mg/dL)</label>
                        <input type="number" id="tc" value="200" min="130" max="320">
                    </div>
                    <div class="form-item">
                        <label>HDL 高密度膽固醇</label>
                        <input type="number" id="hdl" value="50" min="20" max="100">
                    </div>
                    <div class="form-item full">
                        <label>健康背景 (請勾選符合項)</label>
                        <div class="checkbox-group">
                            <label class="check-item"><input type="checkbox" id="is-smoker"> 🚬 目前吸菸</label>
                            <label class="check-item"><input type="checkbox" id="has-diabetes"> 🍬 糖尿病</label>
                            <label class="check-item"><input type="checkbox" id="is-treated"> 💊 高血壓治療中</label>
                        </div>
                    </div>
                </div>

                <button class="btn-submit" id="btn-calc">開始評估風險</button>

                <div class="result-box" id="result-box">
                    <div style="font-size: 0.9rem; font-weight: 700;">預估 10 年內 ASCVD 風險</div>
                    <div class="risk-percent"><span id="risk-val">--</span><span style="font-size: 1.2rem; margin-left: 2px;">%</span></div>
                    <div class="risk-label" id="risk-label">風險程度：--</div>
                    <p class="desc" id="risk-desc"></p>
                    <div class="disclaimer">
                        * 本計算基於 AHA/ACC PCE 演算法。計算結果僅供參考，不能取代專業診斷。若您的風險大於 7.5%，建議諮詢醫師討論 Statin 藥物或生活調整，並可參考本站魚油與 K2 文章。
                    </div>
                </div>
            `;
            this.shadowRoot.appendChild(container);

            this.btn = this.shadowRoot.getElementById('btn-calc');
            this.resultBox = this.shadowRoot.getElementById('result-box');
            this.valEl = this.shadowRoot.getElementById('risk-val');
            this.labelEl = this.shadowRoot.getElementById('risk-label');
            this.descEl = this.shadowRoot.getElementById('risk-desc');
        }

        attachEvents() {
            this.btn.addEventListener('click', () => this.calculate());
        }

        calculate() {
            // Get inputs
            const sex = this.shadowRoot.getElementById('sex').value;
            const age = parseFloat(this.shadowRoot.getElementById('age').value);
            const sbp = parseFloat(this.shadowRoot.getElementById('sbp').value);
            const tc = parseFloat(this.shadowRoot.getElementById('tc').value);
            const hdl = parseFloat(this.shadowRoot.getElementById('hdl').value);
            const smoker = this.shadowRoot.getElementById('is-smoker').checked ? 1 : 0;
            const diabetes = this.shadowRoot.getElementById('has-diabetes').checked ? 1 : 0;
            const treated = this.shadowRoot.getElementById('is-treated').checked ? 1 : 0;

            // AHA/ACC 2013 Coefficients (White Male/Female as baseline)
            let risk = 0;
            const lnAge = Math.log(age);
            const lnTC = Math.log(tc);
            const lnHDL = Math.log(hdl);
            const lnSBP = Math.log(sbp);

            // Calculation based on Sex
            if (sex === 'female') {
                const terms =
                    (-29.799 * lnAge) +
                    (4.884 * Math.pow(lnAge, 2)) +
                    (13.540 * lnTC) +
                    (-3.114 * lnAge * lnTC) +
                    (-13.578 * lnHDL) +
                    (3.149 * lnAge * lnHDL) +
                    (2.019 * lnSBP) + // Treated
                    (treated ? 2.019 : 1.957) + // This is slightly simplified from original complex treatment interactions
                    (7.574 * smoker) +
                    (-1.665 * lnAge * smoker) +
                    (0.661 * diabetes);

                // Note: PCE has interaction terms. To be accurate, we use the full equation.
                // Ref: https://www.ahajournals.org/doi/10.1161/01.cir.0000437741.48617.87

                // Re-calculating with precise White Female Coefficients
                const sum =
                    -29.799 * lnAge +
                    4.884 * Math.pow(lnAge, 2) +
                    13.540 * lnTC +
                    -3.114 * lnAge * lnTC +
                    -13.578 * lnHDL +
                    3.149 * lnAge * lnHDL +
                    (treated ? 2.019 * lnSBP : 1.957 * lnSBP) +
                    7.574 * smoker +
                    -1.665 * lnAge * smoker +
                    0.661 * diabetes;

                risk = 1 - Math.pow(0.9665, Math.exp(sum - (-29.18)));
            } else {
                // White Male
                const sum =
                    12.344 * lnAge +
                    11.853 * lnTC +
                    -2.664 * lnAge * lnTC +
                    -7.990 * lnHDL +
                    1.769 * lnAge * lnHDL +
                    (treated ? 1.996 * lnSBP : 1.764 * lnSBP) +
                    7.837 * smoker +
                    -1.795 * lnAge * smoker +
                    0.658 * diabetes;

                risk = 1 - Math.pow(0.9144, Math.exp(sum - 61.18));
            }

            const percent = Math.min(Math.max(risk * 100, 0.1), 99).toFixed(1);
            this.showResult(percent);
        }

        showResult(val) {
            this.valEl.textContent = val;
            this.resultBox.className = 'result-box show';

            let label = '';
            let desc = '';
            let styleClass = '';

            const riskNum = parseFloat(val);
            if (riskNum < 5) {
                label = '低風險 (<5%)';
                desc = '您的血管健康狀態良好。建議維持目前的均衡飲食（地中海飲食）與規律運動。可持續攝取 Omega-3 作為基礎保養，避免血管壁脂肪紋堆積。';
                styleClass = 'risk-level-low';
            } else if (riskNum < 7.5) {
                label = '邊緣風險 (5-7.4%)';
                desc = '風險處於邊緣地帶。建議開始監控飲食中的飽和脂肪，並增加抗氧化營養素（如 Q10、維生素 C）的攝取，防止 LDL 氧化引發發炎反應。';
                styleClass = 'risk-level-med';
            } else if (riskNum < 20) {
                label = '中等風險 (7.5-19.9%)';
                desc = '這是一個警訊。建議諮詢醫師關於生活調整或 Statin 藥物。在營養補充上，強烈建議合併高濃度魚油 (EPA) 與維生素 K2，以減緩血管鈣化與發炎。';
                styleClass = 'risk-level-med';
            } else {
                label = '高風險 (≥20%)';
                desc = '風險顯著升高，高度建議醫療處置。請務必遵守醫師處方，並考慮進行頸動脈超音波檢查。生活上應嚴格控管血糖與血壓，並積極補充血管修復營養素。';
                styleClass = 'risk-level-high';
            }

            this.labelEl.textContent = `風險程度：${label}`;
            this.descEl.textContent = desc;
            this.resultBox.classList.add(styleClass);
        }
    }

    global.CardioRiskCalculator = CardioRiskCalculator;
})(window);
