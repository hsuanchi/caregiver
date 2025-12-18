/**
 * Zone2Calculator Component
 * 
 * 核心功能：計算 Zone 2 運動心率區間
 * 演算法：
 * 1. Maffetone 180 公式 (專注代謝健康)
 * 2. Karvonen 公式 (專注個人體能)
 */
(function (global) {
    'use strict';

    class Zone2Calculator {
        constructor(hostElement) {
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });

            this._config = {
                debug: false,
                primaryColor: '#be123c', // Rose-700
                secondaryColor: '#334155', // Slate-700
                accentColor: '#059669', // Emerald-600
                zones: [
                    { name: 'Zone 1', color: '#94a3b8', desc: '暖身/恢復' },
                    { name: 'Zone 2', color: '#059669', desc: '有氧基礎/燃脂/血管修復' },
                    { name: 'Zone 3', color: '#d97706', desc: '有氧耐力' },
                    { name: 'Zone 4', color: '#ea580c', desc: '乳酸閾值' },
                    { name: 'Zone 5', color: '#dc2626', desc: '無氧極限' }
                ]
            };
        }

        initialize() {
            this.createStyles();
            this.createContent();
            this.loadState();
            this.attachEvents();
            this.calculate(true); // Initial calculation (silent)
            return this;
        }

        loadState() {
            try {
                const saved = localStorage.getItem('caregiver_zone2_calc_state');
                if (saved) {
                    const state = JSON.parse(saved);
                    if (state.age) this.ageInput.value = state.age;
                    if (state.rhr) this.rhrInput.value = state.rhr;
                    if (state.formula) {
                        this.btns.forEach(b => {
                            b.classList.toggle('active', b.dataset.formula === state.formula);
                        });
                        this.updateFields(state.formula);
                    }
                    if (state.modifier !== undefined) {
                        const radio = this.shadowRoot.querySelector(`input[name="status"][value="${state.modifier}"]`);
                        if (radio) radio.checked = true;
                    }
                }
            } catch (e) {
                console.error('Failed to load state:', e);
            }
        }

        saveState() {
            try {
                const activeBtn = this.shadowRoot.querySelector('.toggle-btn.active');
                const selectedRadio = this.shadowRoot.querySelector('input[name="status"]:checked');
                const state = {
                    age: this.ageInput.value,
                    rhr: this.rhrInput.value,
                    formula: activeBtn ? activeBtn.dataset.formula : 'maffetone',
                    modifier: selectedRadio ? selectedRadio.value : '0'
                };
                localStorage.setItem('caregiver_zone2_calc_state', JSON.stringify(state));
            } catch (e) {
                console.error('Failed to save state:', e);
            }
        }

        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    --primary: ${this._config.primaryColor};
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

                .toggle-group {
                    display: flex;
                    background: #f1f5f9;
                    border-radius: 12px;
                    padding: 5px;
                    margin-bottom: 30px;
                }
                .toggle-btn {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    background: transparent;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .toggle-btn.active {
                    background: white;
                    color: var(--primary);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .form-item { display: flex; flex-direction: column; gap: 8px; }
                .form-item.full { grid-column: span 2; }

                label { font-size: 0.85rem; font-weight: 700; color: #4b5563; }
                input, select {
                    padding: 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    font-size: 1rem;
                    background: #f8fafc;
                }

                .status-options {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 10px;
                    background: #f8fafc;
                    padding: 15px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }
                .option-item { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; cursor: pointer; }

                .result-container {
                    margin-top: 35px;
                    padding: 30px;
                    background: #f0fdf4;
                    border: 2px solid #bbf7d0;
                    border-radius: 18px;
                    text-align: center;
                    animation: fadeIn 0.4s ease-out;
                }

                .hr-range {
                    font-size: 3.5rem;
                    font-weight: 900;
                    color: var(--accent);
                    margin: 10px 0;
                    line-height: 1;
                }
                .hr-unit { font-size: 1rem; color: #166534; font-weight: 400; }

                .zone-bar {
                    display: flex;
                    height: 12px;
                    border-radius: 6px;
                    overflow: hidden;
                    margin: 25px 0 10px;
                    background: #e2e8f0;
                }
                .zone-segment { flex: 1; transition: all 0.3s; opacity: 0.3; }
                .zone-segment.active { opacity: 1; transform: scaleY(1.3); }

                .zone-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    color: #64748b;
                    font-weight: 600;
                }

                .benefits-box {
                    margin-top: 25px;
                    text-align: left;
                    font-size: 0.85rem;
                    color: #334155;
                    line-height: 1.6;
                }
                .benefits-title { font-weight: 700; margin-bottom: 5px; color: #166534; }

                .suggest-links {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    text-align: left;
                }
                
                .suggest-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px;
                    background: white;
                    border: 1px solid #bbf7d0;
                    border-radius: 10px;
                    text-decoration: none;
                    color: #166534;
                    font-size: 0.9rem;
                    font-weight: 700;
                    transition: all 0.2s;
                }
                
                .suggest-link:hover {
                    background: #dcfce7;
                    transform: translateX(5px);
                }

                .disclaimer { font-size: 0.75rem; color: #94a3b8; margin-top: 25px; border-top: 1px dashed #e2e8f0; padding-top: 15px; }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                [hidden] { display: none !important; }

                @media (max-width: 480px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .form-item.full { grid-column: auto; }
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        createContent() {
            const container = document.createElement('div');
            container.className = 'calc-wrapper';
            container.innerHTML = `
                <div class="header">
                    <h2 class="title">🏃 Zone 2 運動心率計算機</h2>
                    <p class="subtitle">優化粒線體功能與血管修復的「甜點區間」</p>
                </div>

                <div class="toggle-group">
                    <button class="toggle-btn active" data-formula="maffetone">Maffetone (代謝保護)</button>
                    <button class="toggle-btn" data-formula="karvonen">Karvonen (個人體能)</button>
                </div>

                <div class="form-grid">
                    <div class="form-item">
                        <label>您的年齡</label>
                        <input type="number" id="age" value="35" min="15" max="95">
                    </div>
                    
                    <div class="form-item" id="rhr-field" hidden>
                        <label>靜息心率 (RHR)</label>
                        <input type="number" id="rhr" value="65" min="30" max="120">
                    </div>

                    <div class="form-item full" id="maffetone-status">
                        <label>健康與訓練背景 (影響 MAF 修正)</label>
                        <div class="status-options">
                            <label class="option-item">
                                <input type="radio" name="status" value="-10"> 
                                <span>復健中/有慢性疾病/正服用藥物 (-10)</span>
                            </label>
                            <label class="option-item">
                                <input type="radio" name="status" value="-5"> 
                                <span>剛開始訓練/曾受傷/免疫較弱 (-5)</span>
                            </label>
                            <label class="option-item">
                                <input type="radio" name="status" value="0" checked> 
                                <span>規律訓練 1 年以上且進展穩定 (標準)</span>
                            </label>
                            <label class="option-item">
                                <input type="radio" name="status" value="5"> 
                                <span>規律訓練 2 年以上且表現優異 (+5)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="result-container" id="result-box">
                    <div style="font-size: 0.9rem; font-weight: 700; color: #166534;">建議 Zone 2 訓練強度</div>
                    <div class="hr-range"><span id="hr-low">--</span> - <span id="hr-high">--</span> <span class="hr-unit">BPM</span></div>
                    
                    <div class="zone-bar">
                        ${this._config.zones.map((z, i) => `<div class="zone-segment ${i === 1 ? 'active' : ''}" style="background: ${z.color}" title="${z.name}: ${z.desc}"></div>`).join('')}
                    </div>
                    <div class="zone-labels">
                        <span>Zone 1</span>
                        <span>Zone 2</span>
                        <span>Zone 3</span>
                        <span>Zone 4</span>
                        <span>Zone 5</span>
                    </div>

                    <div class="benefits-box">
                        <div class="benefits-title">✨ 此區間的生理價值：</div>
                        <div id="benefits-text">
                            此強度能最大化脂肪氧化率，並促進心臟毛細血管增生與血管內皮修復。是建立強大有氧基礎、改善胰島素阻抗的最佳區間。
                        </div>
                    </div>

                    <div id="suggest-area" class="suggest-links"></div>

                    <div class="disclaimer">
                        * 計算結果僅供參考。若感到不適或有胸悶等症狀，請立即停止運動並諮詢醫療人員。
                    </div>
                </div>
            `;
            this.shadowRoot.appendChild(container);

            this.ageInput = this.shadowRoot.getElementById('age');
            this.rhrInput = this.shadowRoot.getElementById('rhr');
            this.rhrField = this.shadowRoot.getElementById('rhr-field');
            this.maffetoneStatus = this.shadowRoot.getElementById('maffetone-status');
            this.hrLow = this.shadowRoot.getElementById('hr-low');
            this.hrHigh = this.shadowRoot.getElementById('hr-high');
            this.btns = this.shadowRoot.querySelectorAll('.toggle-btn');
            this.statusRadios = this.shadowRoot.querySelectorAll('input[name="status"]');
            this.resultBox = this.shadowRoot.getElementById('result-box');
            this.suggestArea = this.shadowRoot.getElementById('suggest-area');
        }

        attachEvents() {
            this.btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.btns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const formula = btn.dataset.formula;
                    this.updateFields(formula);
                    this.calculate();
                    this.saveState();
                });
            });

            [this.ageInput, this.rhrInput].forEach(el => el.addEventListener('input', () => {
                this.calculate();
                this.saveState();
            }));
            this.statusRadios.forEach(el => el.addEventListener('change', () => {
                this.calculate();
                this.saveState();
            }));
        }

        updateFields(formula) {
            if (formula === 'karvonen') {
                this.rhrField.hidden = false;
                this.maffetoneStatus.hidden = true;
            } else {
                this.rhrField.hidden = true;
                this.maffetoneStatus.hidden = false;
            }
        }

        calculate(silent = false) {
            const activeBtn = this.shadowRoot.querySelector('.toggle-btn.active');
            if (!activeBtn) return;
            const formula = activeBtn.dataset.formula;
            const age = parseInt(this.ageInput.value) || 30;

            let low, high;

            if (formula === 'maffetone') {
                const selectedRadio = this.shadowRoot.querySelector('input[name="status"]:checked');
                const modifier = selectedRadio ? parseInt(selectedRadio.value) : 0;
                const mafLimit = (180 - age) + modifier;
                high = mafLimit;
                low = mafLimit - 10;
            } else {
                const rhr = parseInt(this.rhrInput.value) || 60;
                const maxHR = Math.round(208 - (0.7 * age));
                const hrr = maxHR - rhr;
                low = Math.round(hrr * 0.60 + rhr);
                high = Math.round(hrr * 0.75 + rhr);
            }

            this.hrLow.textContent = low;
            this.hrHigh.textContent = high;

            this.showResult(silent);
        }

        showResult(silent = false) {
            const suggestions = [
                { name: '🫀 心血管健康完整指南', link: '/post/topic-cardiovascular-health.html' },
                { name: '🐟 魚油：血管修復的基石', link: '/post/fish-oil.html' }
            ];

            this.suggestArea.innerHTML = suggestions.map(s => `
                <a href="${s.link}" class="suggest-link">
                    <span>${s.name}</span>
                    <span style="margin-left: auto;">➔</span>
                </a>
            `).join('');

            if (silent) {
                this.resultBox.style.animation = 'none';
            }
        }
    }

    global.Zone2Calculator = Zone2Calculator;
})(window);
