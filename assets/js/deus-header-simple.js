/**
 * 簡化版 Header 組件 - 用於測試
 */
(function (global) {
    'use strict';

    class DeusHeaderSimple {
        constructor(hostElement) {
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'open' });

            this._config = {
                debug: false,
                logo: '營養百科'
            };

            this.initialize();
        }

        initialize() {
            console.log('🚀 簡化版 Header 初始化開始');
            this.createStyles();
            this.createContent();
            console.log('✅ 簡化版 Header 初始化完成');
            console.log('📋 Shadow DOM 內容:', this.shadowRoot.innerHTML.substring(0, 100));
        }

        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    width: 100%;
                    background: #ff6b35;
                    color: white;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    box-sizing: border-box;
                }
                
                .simple-header {
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    margin: 0;
                }
                
                .simple-nav {
                    text-align: center;
                    margin-top: 10px;
                }
                
                .simple-nav a {
                    color: white;
                    text-decoration: none;
                    margin: 0 20px;
                    font-weight: 500;
                }
                
                .simple-nav a:hover {
                    text-decoration: underline;
                }
            `;
            this.shadowRoot.appendChild(style);
            console.log('📋 樣式已添加');
        }

        createContent() {
            const container = document.createElement('div');
            container.innerHTML = `
                <h1 class="simple-header">${this._config.logo}</h1>
                <nav class="simple-nav">
                    <a href="#">首頁</a>
                    <a href="#">營養素</a>
                    <a href="#">工具</a>
                </nav>
            `;
            this.shadowRoot.appendChild(container);
            console.log('📋 內容已添加');
        }

        setLogo(logo) {
            this._config.logo = logo;
            return this;
        }

        setDebug(debug) {
            this._config.debug = Boolean(debug);
            return this;
        }
    }

    global.DeusHeaderSimple = DeusHeaderSimple;

})(window);