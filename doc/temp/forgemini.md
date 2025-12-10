<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>心血管系統除錯地圖 (Cardiovascular Debug Map)</title>
    <style>
        /* --- Component Scope CSS --- */
        :root {
            --c-symptom: #ef4444; /* Red for Alerts */
            --c-cause: #eab308;   /* Yellow for Warnings/Logic */
            --c-solution: #3b82f6; /* Blue for Solutions */
            --bg-panel: #ffffff;
            --line-inactive: #e5e7eb;
            --line-active: #64748b;
        }

        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: transparent; }

        .info-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .info-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .info-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #1e293b;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .info-subtitle {
            font-size: 0.875rem;
            color: #64748b;
            margin-top: 5px;
        }

        /* The Grid Layout */
        .debug-map {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 40px;
            position: relative;
        }

        /* Columns */
        .col-header {
            text-align: center;
            font-weight: 700;
            margin-bottom: 20px;
            padding: 8px;
            border-radius: 6px;
            font-size: 0.9rem;
        }
        .col-symptom .col-header { color: var(--c-symptom); background: #fef2f2; }
        .col-cause .col-header { color: var(--c-cause); background: #fefce8; }
        .col-solution .col-header { color: var(--c-solution); background: #eff6ff; }

        .node-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
            position: relative;
            z-index: 2; /* Above SVG lines */
        }

        /* Node Cards */
        .node {
            background: white;
            padding: 12px 15px;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 0.85rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .node:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-color: currentColor;
        }

        /* Node Specific Colors */
        .node[data-type="symptom"] { border-left: 4px solid var(--c-symptom); }
        .node[data-type="symptom"]:hover, .node[data-type="symptom"].active { background: #fef2f2; border-color: var(--c-symptom); }
        
        .node[data-type="cause"] { border-left: 4px solid var(--c-cause); }
        .node[data-type="cause"]:hover, .node[data-type="cause"].active { background: #fefce8; border-color: var(--c-cause); }
        
        .node[data-type="solution"] { border-left: 4px solid var(--c-solution); }
        .node[data-type="solution"]:hover, .node[data-type="solution"].active { background: #eff6ff; border-color: var(--c-solution); }

        .node-icon { margin-right: 8px; font-size: 1.1em; }
        .node-jump { opacity: 0; font-size: 0.8em; color: #94a3b8; transition: opacity 0.2s; }
        .node:hover .node-jump { opacity: 1; }

        /* SVG Connections Layer */
        .connections-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }

        path {
            fill: none;
            stroke: var(--line-inactive);
            stroke-width: 1.5;
            transition: stroke 0.4s, stroke-width 0.4s;
        }

        path.active {
            stroke: var(--line-active);
            stroke-width: 3;
            stroke-dasharray: 10;
            animation: dash 1s linear infinite;
        }

        @keyframes dash {
            to { stroke-dashoffset: -20; }
        }

        /* Safety Warning Box */
        .safety-box {
            margin-top: 30px;
            padding: 15px;
            background: #fff1f2;
            border: 1px solid #fda4af;
            border-radius: 8px;
            color: #9f1239;
            font-size: 0.85rem;
            display: flex;
            align-items: start;
            gap: 10px;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .debug-map {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .connections-layer { display: none; } /* Hide lines on mobile stack */
            .node { margin-bottom: 5px; }
            .node::after { content: "⬇"; display: block; position: absolute; bottom: -18px; left: 50%; color: #cbd5e1; font-size: 10px; }
            .col-solution .node::after { display: none; }
        }
    </style>
</head>
<body>

<div class="info-container">
    <div class="info-header">
        <div class="info-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            心血管系統故障除錯圖 (System Diagnostics)
        </div>
        <div class="info-subtitle">滑鼠移至「故障訊號」即可追蹤病理源頭與修復方案</div>
    </div>

    <div class="debug-map">
        <!-- SVG Layer for Lines -->
        <svg class="connections-layer" id="svg-layer"></svg>

        <!-- Column 1: Symptoms (Alerts) -->
        <div class="col-symptom">
            <div class="col-header">📡 1. 故障訊號 (Symptoms)</div>
            <div class="node-group">
                <div class="node" data-id="sym-acs" data-type="symptom" onclick="parent.location.hash='symptoms-acs'">
                    <span><span class="node-icon">💔</span>胸悶/輻射痛 (ACS)</span>
                    <span class="node-jump">↗</span>
                </div>
                <div class="node" data-id="sym-female" data-type="symptom" onclick="parent.location.hash='symptoms-acs'">
                    <span><span class="node-icon">🤢</span>頸背痛/噁心 (女性非典型)</span>
                    <span class="node-jump">↗</span>
                </div>
                <div class="node" data-id="sym-cold" data-type="symptom" onclick="parent.location.hash='signal-blockage'">
                    <span><span class="node-icon">❄️</span>手腳冰冷/跛行 (PAD)</span>
                    <span class="node-jump">↗</span>
                </div>
                <div class="node" data-id="sym-breath" data-type="symptom" onclick="parent.location.hash='symptoms-chronic'">
                    <span><span class="node-icon">😮‍💨</span>爬樓梯喘/端坐呼吸</span>
                    <span class="node-jump">↗</span>
                </div>
                <div class="node" data-id="sym-ed" data-type="symptom" onclick="parent.location.hash='signal-blockage'">
                    <span><span class="node-icon">⚠️</span>勃起障礙 (早期警訊)</span>
                    <span class="node-jump">↗</span>
                </div>
            </div>
        </div>

        <!-- Column 2: Mechanisms (Root Cause) -->
        <div class="col-cause">
            <div class="col-header">⚙️ 2. 核心故障 (Root Cause)</div>
            <div class="node-group">
                <div class="node" data-id="cau-inflam" data-type="cause" onclick="parent.location.hash='root-cause-1'">
                    <span><span class="node-icon">🔥</span>發炎與斑塊 (Atherosclerosis)</span>
                </div>
                <div class="node" data-id="cau-thromb" data-type="cause" onclick="parent.location.hash='pathology-thrombosis'">
                    <span><span class="node-icon">🩸</span>血栓形成 (Thrombosis)</span>
                </div>
                <div class="node" data-id="cau-calc" data-type="cause" onclick="parent.location.hash='root-cause-2'">
                    <span><span class="node-icon">🦴</span>血管鈣化 (Stiffness)</span>
                </div>
                <div class="node" data-id="cau-energy" data-type="cause" onclick="parent.location.hash='root-cause-3'">
                    <span><span class="node-icon">🔋</span>粒線體衰竭 (Energy Fail)</span>
                </div>
            </div>
        </div>

        <!-- Column 3: Solutions (Patches) -->
        <div class="col-solution">
            <div class="col-header">🛠️ 3. 修復協議 (Protocol)</div>
            <div class="node-group">
                <div class="node" data-id="sol-fish" data-type="solution" onclick="parent.location.hash='repair-1'">
                    <span><span class="node-icon">🐟</span>高濃度魚油 (Anti-Inflam)</span>
                    <span class="node-jump">Go</span>
                </div>
                <div class="node" data-id="sol-natto" data-type="solution" onclick="parent.location.hash='solution-thrombosis'">
                    <span><span class="node-icon">🥢</span>納豆激酶 (Fibrinolytic)</span>
                    <span class="node-jump">Go</span>
                </div>
                <div class="node" data-id="sol-k2" data-type="solution" onclick="parent.location.hash='repair-2'">
                    <span><span class="node-icon">🥬</span>維生素 K2 + 鎂 (Structure)</span>
                    <span class="node-jump">Go</span>
                </div>
                <div class="node" data-id="sol-no" data-type="solution" onclick="parent.location.hash='solution-endothelium'">
                    <span><span class="node-icon">🍉</span>瓜胺酸/精胺酸 (NO Boost)</span>
                    <span class="node-jump">Go</span>
                </div>
                <div class="node" data-id="sol-q10" data-type="solution" onclick="parent.location.hash='repair-3'">
                    <span><span class="node-icon">⚡</span>輔酶 Q10 (Recharge)</span>
                    <span class="node-jump">Go</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Safety Protocol -->
    <div class="safety-box">
        <span style="font-size: 1.5em;">🛡️</span>
        <div>
            <strong>安全防火牆 (Safety Protocol):</strong>
            <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                <li>服用 <strong>Warfarin</strong> 者：禁用高劑量 K2、納豆激酶、丹參。</li>
                <li>服用 <strong>Statins</strong> 者：嚴禁配葡萄柚汁，但建議補充 Q10。</li>
            </ul>
        </div>
    </div>
</div>

<script>
    // 1. Data Mapping (The Logic)
    // 定義連接關係： [起點] -> [終點]
    const connections = [
        // Symptoms -> Causes
        { from: 'sym-acs', to: 'cau-thromb' },
        { from: 'sym-acs', to: 'cau-inflam' },
        { from: 'sym-female', to: 'cau-inflam' }, // 微血管病變
        { from: 'sym-cold', to: 'cau-calc' },     // 硬化導致末梢差
        { from: 'sym-cold', to: 'cau-inflam' },   // 阻塞
        { from: 'sym-breath', to: 'cau-energy' }, // 心衰竭
        { from: 'sym-ed', to: 'cau-inflam' },     // 內皮功能障礙
        
        // Causes -> Solutions
        { from: 'cau-inflam', to: 'sol-fish' },
        { from: 'cau-inflam', to: 'sol-no' },
        { from: 'cau-thromb', to: 'sol-natto' },
        { from: 'cau-thromb', to: 'sol-fish' },   // 魚油也有抗血小板功能
        { from: 'cau-calc', to: 'sol-k2' },
        { from: 'cau-energy', to: 'sol-q10' },
        { from: 'cau-energy', to: 'sol-no' }      // 改善灌流
    ];

    const svg = document.getElementById('svg-layer');
    const nodes = document.querySelectorAll('.node');
    const container = document.querySelector('.debug-map');

    // 2. Draw Lines Function
    function drawLines() {
        svg.innerHTML = ''; // Clear existing lines
        
        // 取得容器相對於視窗的位置，用於校正座標
        const containerRect = container.getBoundingClientRect();

        connections.forEach(conn => {
            const fromEl = document.querySelector(`[data-id="${conn.from}"]`);
            const toEl = document.querySelector(`[data-id="${conn.to}"]`);
            
            if (!fromEl || !toEl) return;

            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();

            // 計算相對於 SVG 畫布的座標
            const x1 = fromRect.right - containerRect.left;
            const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
            const x2 = toRect.left - containerRect.left;
            const y2 = toRect.top + toRect.height / 2 - containerRect.top;

            // 繪製貝茲曲線 (Bezier Curve)
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const controlOffset = 40;
            const d = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`;
            
            path.setAttribute('d', d);
            path.setAttribute('data-from', conn.from);
            path.setAttribute('data-to', conn.to);
            svg.appendChild(path);
        });
    }

    // 3. Interaction Logic
    function activatePath(nodeId, type) {
        // Reset all
        document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('path').forEach(p => p.classList.remove('active'));

        const activeNodes = new Set([nodeId]);
        const activePaths = new Set();

        // Highlight Logic (Recursively find connected nodes)
        // Case 1: Hover Symptom (Forward: Sym -> Cause -> Sol)
        if (type === 'symptom') {
            connections.filter(c => c.from === nodeId).forEach(c1 => {
                activeNodes.add(c1.to); // Add Cause
                activePaths.add(`${c1.from}-${c1.to}`);
                
                connections.filter(c => c.from === c1.to).forEach(c2 => {
                    activeNodes.add(c2.to); // Add Solution
                    activePaths.add(`${c2.from}-${c2.to}`);
                });
            });
        }
        
        // Case 2: Hover Cause (Bi-directional)
        if (type === 'cause') {
            connections.filter(c => c.to === nodeId).forEach(c1 => {
                activeNodes.add(c1.from); // Add Symptom
                activePaths.add(`${c1.from}-${c1.to}`);
            });
            connections.filter(c => c.from === nodeId).forEach(c2 => {
                activeNodes.add(c2.to); // Add Solution
                activePaths.add(`${c2.from}-${c2.to}`);
            });
        }

        // Case 3: Hover Solution (Backward: Sol -> Cause -> Sym)
        if (type === 'solution') {
            connections.filter(c => c.to === nodeId).forEach(c1 => {
                activeNodes.add(c1.from); // Add Cause
                activePaths.add(`${c1.from}-${c1.to}`);

                connections.filter(c => c.to === c1.from).forEach(c2 => {
                    activeNodes.add(c2.from); // Add Symptom
                    activePaths.add(`${c2.from}-${c2.to}`);
                });
            });
        }

        // Apply classes
        activeNodes.forEach(id => {
            const el = document.querySelector(`[data-id="${id}"]`);
            if(el) el.classList.add('active');
        });
        
        document.querySelectorAll('path').forEach(path => {
            const from = path.getAttribute('data-from');
            const to = path.getAttribute('data-to');
            if (activePaths.has(`${from}-${to}`)) {
                path.classList.add('active');
                // Move active path to top of stack
                path.parentNode.appendChild(path);
            }
        });
    }

    // Event Listeners
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            activatePath(node.dataset.id, node.dataset.type);
        });
    });

    // Clear on mouse leave container
    container.addEventListener('mouseleave', () => {
        document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('path').forEach(p => p.classList.remove('active'));
    });

    // Initialize
    window.addEventListener('load', drawLines);
    window.addEventListener('resize', drawLines); // Redraw on resize

</script>

</body>
</html>