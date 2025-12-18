/**
 * CaffeineCalculator Component
 * 
 * 核心功能：計算每日咖啡因安全耐受限量
 * 架構：原生 JavaScript Class + Shadow DOM 封裝
 * 數據來源：基於 FDA, EFSA 及常見營養學建議
 */
(function (global) {
    'use strict';

    class CaffeineCalculator {
        constructor(hostElement) {
            // 建立 Shadow DOM (closed)
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({mode: 'closed'});

            // 初始化內部狀態
            this._config = {
                debug: false,
                primaryColor: '#be123c', // Rose-700
                primaryLight: '#ffe4e6'   // Rose-100
            };

            // 預設輸入值
            this._state = {
                userType: 'adult', // adult, pregnant, teen
                weight: 70,
                sensitivity: 'normal' // sensitive, normal, fast
            };

            // 飲料參考數據 (mg)
            this._beverages = [
                { id: 'espresso', name: '義式濃縮 (1份)', caffeine: 75, icon: '☕' },
                { id: 'americano', name: '美式咖啡 (中杯)', caffeine: 150, icon: '☕' },
                { id: 'latte', name: '拿鐵咖啡 (中杯)', caffeine: 150, icon: '🥛' },
                { id: 'black-tea', name: '紅茶 (一杯)', caffeine: 50, icon: '🍵' },
                { id: 'green-tea', name: '綠茶 (一杯)', caffeine: 30, icon: '🍃' },
                { id: 'cola', name: '可樂 (330ml)', caffeine: 35, icon: '🥤' },
                { id: 'energy-drink', name: '能量飲料 (250ml)', caffeine: 80, icon: '⚡' }
            ];
        }

        /**
         * 初始化組件
         */
        initialize() {
            this.createStyles();
            this.createContent();
            this.attachEvents();
            this.log('debug', 'CaffeineCalculator Initialized');
            return this;
        }

        /**
         * 建立樣式
         */
        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    --primary: ${this._config.primaryColor};
                    --primary-light: ${this._config.primaryLight};
                    --text: #1e293b;
                    --text-light: #64748b;
                    --border: #e2e8f0;
                }

                .calc-wrapper {
                    background: #ffffff;
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 35px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
                    max-width: 650px;
                    margin: 0 auto;
                    color: var(--text);
                }

                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin: 0 0 10px 0;
                    color: var(--primary);
                }

                .subtitle {
                    font-size: 0.95rem;
                    color: var(--text-light);
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .form-item {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-item.full {
                    grid-column: span 2;
                }

                label {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #4b5563;
                }

                select, input {
                    padding: 12px;
                    border: 1px solid var(--border);
                    border-radius: 10px;
                    font-size: 1rem;
                    background: #f8fafc;
                    transition: all 0.2s;
                    color: var(--text);
                }

                select:focus, input:focus {
                    outline: none;
                    border-color: var(--primary);
                    background: #fff;
                    box-shadow: 0 0 0 4px var(--primary-light);
                }

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
                    transition: transform 0.2s, background 0.2s;
                    box-shadow: 0 4px 12px rgba(190, 18, 60, 0.2);
                }

                .btn-submit:hover {
                    background: #9f1239;
                    transform: translateY(-2px);
                }

                .btn-submit:active {
                    transform: translateY(0);
                }

                .result-container {
                    margin-top: 35px;
                    padding: 25px;
                    background: #fff1f2;
                    border: 2px solid var(--primary-light);
                    border-radius: 15px;
                    display: none;
                }

                .result-container.show {
                    display: block;
                    animation: slideUp 0.4s ease-out;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .limit-value {
                    font-size: 2.8rem;
                    font-weight: 900;
                    color: var(--primary);
                    text-align: center;
                    line-height: 1;
                    margin: 10px 0;
                }

                .limit-unit {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #9f1239;
                    margin-left: 5px;
                }

                .beverage-list {
                    margin-top: 25px;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                    gap: 12px;
                }

                .bev-card {
                    background: white;
                    padding: 12px;
                    border-radius: 10px;
                    text-align: center;
                    border: 1px solid var(--primary-light);
                }

                .bev-name {
                    font-size: 0.8rem;
                    color: var(--text-light);
                    display: block;
                }

                .bev-count {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--primary);
                }

                .disclaimer {
                    margin-top: 20px;
                    font-size: 0.75rem;
                    color: var(--text-light);
                    line-height: 1.5;
                }

                @media (max-width: 480px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .form-item.full { grid-column: auto; }
                    .calc-wrapper { padding: 20px; }
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        /**
         * 建立內容
         */
        createContent() {
            const container = document.createElement('div');
            container.className = 'calc-wrapper';
            container.innerHTML = `
                <div class="header">
                    <h2 class="title">☕ 每日咖啡因耐受計算機</h2>
                    <p class="subtitle">根據您的健康狀態與體重，算出專屬的「安全防線」</p>
                </div>

                <div class="form-grid">
                    <div class="form-item">
                        <label>族群類別</label>
                        <select id="user-type">
                            <option value="adult">一般成人 (健康)</option>
                            <option value="pregnant">孕婦 / 哺乳期</option>
                            <option value="teen">青少年 (12-18歲)</option>
                            <option value="child" disabled>孩童 (不建議攝取)</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label>體重 (kg)</label>
                        <input type="number" id="weight" value="70" min="20" max="250">
                    </div>
                    <div class="form-item full">
                        <label>咖啡因敏感度</label>
                        <select id="sensitivity">
                            <option value="sensitive">敏感 (喝完會心悸、失眠)</option>
                            <option value="normal" selected>正常 (適量提神、不影睡)</option>
                            <option value="fast">代謝快 (喝完沒感覺)</option>
                        </select>
                    </div>
                </div>

                <button class="btn-submit" id="btn-calc">立即分析計算</button>

                <div class="result-container" id="result-box">
                    <div style="text-align: center; font-size: 0.9rem; font-weight: 700; color: #9f1239;">建議每日攝取限量</div>
                    <div class="limit-value">
                        <span id="final-limit">--</span><span class="limit-unit">mg</span>
                    </div>
                    <p id="limit-desc" style="text-align: center; font-size: 0.9rem; margin-bottom: 20px; color: var(--text);">
                        您每日的安全攝取範圍約在這個數值內。
                    </p>

                    <div style="font-weight: 800; font-size: 0.85rem; border-top: 1px dashed var(--primary); padding-top: 15px; margin-bottom: 15px;">
                        📊 換算各類飲品 (約略杯數)
                    </div>
                    <div class="beverage-list" id="bev-list">
                        <!-- Beverages dynamic items -->
                    </div>

                    <div class="disclaimer">
                        * 注意：本計算建議僅供參考。敏感族群（如心臟病患者、焦慮症患者）即便在限量內亦可能產生不適。咖啡因含量會隨沖泡方式與品牌有巨大差異。
                    </div>
                </div>
            `;
            this.shadowRoot.appendChild(container);

            // 緩存元素
            this.btnCalc = this.shadowRoot.getElementById('btn-calc');
            this.resultBox = this.shadowRoot.getElementById('result-box');
            this.elLimit = this.shadowRoot.getElementById('final-limit');
            this.elDesc = this.shadowRoot.getElementById('limit-desc');
            this.elBevList = this.shadowRoot.getElementById('bev-list');
            
            this.inputUserType = this.shadowRoot.getElementById('user-type');
            this.inputWeight = this.shadowRoot.getElementById('weight');
            this.inputSensitivity = this.shadowRoot.getElementById('sensitivity');
        }

        /**
         * 綁定事件
         */
        attachEvents() {
            this.btnCalc.addEventListener('click', () => this.calculate());
        }

        /**
         * 計算邏輯
         */
        calculate() {
            const userType = this.inputUserType.value;
            const weight = parseFloat(this.inputWeight.value) || 70;
            const sensitivity = this.inputSensitivity.value;

            let limit = 400; // Base: Adult

            // 1. 基礎族群限額
            if (userType === 'pregnant') {
                limit = 200; // WHO/ACOG guideline
            } else if (userType === 'teen') {
                limit = weight * 3; // EFSA guideline
            } else {
                // Adult: Weight adjusted
                // 標準體重(60-70kg)約為300-400mg，即 6mg/kg
                limit = weight * 6;
                if (limit > 450) limit = 450; // 一般成人最高不超過 450mg
                if (limit < 200) limit = 200; // 即使體重輕也給予基本額度
                
                // 衛福部建議是一般成人 300mg 為主，我們取 300-400 區間
                if (limit > 300 && userType === 'adult') {
                    // 若無特別訓練，400 是硬上限
                    limit = Math.min(limit, 400); 
                }
            }

            // 2. 敏感度調整
            if (sensitivity === 'sensitive') {
                limit *= 0.6;
            } else if (sensitivity === 'fast') {
                limit *= 1.2;
            }

            // 確保數值整除
            limit = Math.round(limit / 5) * 5;

            this.showResult(limit, userType, weight);
        }

        /**
         * 顯示結果
         */
        showResult(limit, userType, weight) {
            this.elLimit.textContent = limit;
            
            // 描述語句
            let desc = '';
            if (userType === 'pregnant') desc = '孕期攝取過多咖啡因可能影響胎兒發育，建議嚴格遵守 200mg 限制。';
            else if (userType === 'teen') desc = '青少年神經系統發育中，對咖啡因較敏感，建議每日不超過 3mg/kg。';
            else desc = `根據您的體重與敏感度，${limit}mg 是較為安全的紅線。`;

            this.elDesc.textContent = desc;

            // 換算飲品
            this.elBevList.innerHTML = '';
            this._beverages.forEach(bev => {
                const count = (limit / bev.caffeine).toFixed(1);
                
                const card = document.createElement('div');
                card.className = 'bev-card';
                card.innerHTML = `
                    <div style="font-size: 1.5rem; margin-bottom: 5px;">${bev.icon}</div>
                    <span class="bev-name">${bev.name}</span>
                    <div class="bev-count">${count} <span style="font-size: 0.75rem;">杯</span></div>
                `;
                this.elBevList.appendChild(card);
            });

            this.resultBox.classList.add('show');
            this.log('debug', `Limit Calculated: ${limit}mg`);
        }

        /**
         * Console Logger
         */
        log(level, message) {
            if (!this._config.debug && level === 'debug') return;
            console.log(`[CaffeineCalc:${level}] ${message}`);
        }

        setDebug(debug) {
            this._config.debug = Boolean(debug);
            return this;
        }
    }

    // 掛載全域
    global.CaffeineCalculator = CaffeineCalculator;

})(window);
