document.addEventListener('DOMContentLoaded', () => {
    const nutrientGrid = document.getElementById('nutrientGrid');
    if (typeof articlesData === 'undefined' || !nutrientGrid) {
        console.error("articlesData is not loaded or the grid container is missing.");
        if(nutrientGrid) nutrientGrid.innerHTML = '<p style="text-align: center; color: red;">錯誤：營養素資料載入失敗。</p>';
        return;
    }

    articlesData.sort((a, b) => (a.en_name || '').localeCompare(b.en_name || ''));
    
    const searchInput = document.getElementById('searchInput');
    const resultsCount = document.getElementById('resultsCount');
    const clearGoalsBtn = document.getElementById('clearGoalsBtn');
    const healthGoalAccordionContainer = document.getElementById('healthGoalAccordionContainer');

    let activeGoals = new Set();
    let searchTerm = '';

    const healthGoalCategories = {
      '核心代謝與內在調理': ['免疫強化', '抗氧化與抗發炎', '細胞保護', '內分泌調節', '能量代謝', '甲狀腺與代謝', '血糖穩定', '體重管理', '肝臟解毒與代謝', '新生與發育', '生長發育與修復', '體液平衡'],
      '心血管與腦部功能': ['心血管健康', '腦部認知', '血液凝固', '血紅素與氣色', '神經與情緒健康', '睡眠與放鬆'],
      '骨骼、肌肉與靈活行動': ['骨骼與牙齒健康', '神經與肌肉功能', '關節與軟骨', '運動修復與支持', '肌肉與能量'],
      '消化系統與腸道健康': ['消化道健康', '腸道菌群平衡'],
      '外觀保養與感官健康': ['皮膚與黏膜健康', '肌膚與膠原蛋白', '視力維護', '男性保健']
    };

    function renderNutrientCard(nutrient) {
        const statusColor = nutrient.status === '完整' ? 'teal' : 'amber';
        const goalTags = nutrient.goals.map(goal => 
            `<span class="text-xs font-medium text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">${goal}</span>`
        ).join(' ');
        const enNameDisplay = nutrient.en_name ? `<span class="text-base font-medium text-slate-500">(${nutrient.en_name})</span>` : '';
        const link = nutrient.link ? nutrient.link : '#';

        return `
            <a href="${link}" class="group bg-white rounded-lg shadow-md p-5 flex flex-col h-full border-l-4 border-${statusColor}-500 transition hover:shadow-xl hover:transform hover:-translate-y-1">
                <div class="flex-grow">
                    <div class="flex justify-between items-start mb-2">
                         <h3 class="text-lg font-bold text-slate-900">
                             ${nutrient.name} 
                             ${enNameDisplay}
                         </h3>
                    </div>
                    <div class="flex flex-wrap gap-1 mb-3">${goalTags}</div>
                    <p class="text-slate-700 text-sm mb-3">${nutrient.func}</p>
                </div>
                ${nutrient.link ? `<span class="mt-auto pt-4 text-teal-600 font-semibold group-hover:underline transition">閱讀文章 →</span>` : ''}
            </a>
        `;
    }

    function applyFilters() {
        let filteredData = articlesData;
        if (activeGoals.size > 0) {
            const requiredGoals = Array.from(activeGoals);
            filteredData = filteredData.filter(item => requiredGoals.every(goal => item.goals.includes(goal)));
        }
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filteredData = filteredData.filter(item => 
                item.name.toLowerCase().includes(lowerSearchTerm) ||
                (item.en_name && item.en_name.toLowerCase().includes(lowerSearchTerm)) ||
                item.func.toLowerCase().includes(lowerSearchTerm) ||
                item.type.toLowerCase().includes(lowerSearchTerm) ||
                item.goals.some(goal => goal.toLowerCase().includes(lowerSearchTerm))
            );
        }
        nutrientGrid.innerHTML = filteredData.map(renderNutrientCard).join('');
        resultsCount.textContent = `找到 ${filteredData.length} 筆結果`;
    }

    function setupGoalFilters() {
        healthGoalAccordionContainer.innerHTML = '';
        Object.keys(healthGoalCategories).forEach(category => {
            const goals = healthGoalCategories[category].sort();
            const itemDiv = document.createElement('div');
            itemDiv.className = 'border-b border-slate-200 last:border-b-0';
            const headerButton = document.createElement('button');
            headerButton.className = 'w-full flex justify-between items-center text-left p-4 hover:bg-slate-50 transition duration-150';
            headerButton.innerHTML = `
                <span class="font-semibold text-slate-800">${category}</span>
                <svg class="w-5 h-5 transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            `;
            const contentDiv = document.createElement('div');
            contentDiv.className = 'accordion-content';
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'p-4 pt-0 flex flex-wrap gap-2';
            tagsContainer.innerHTML = goals.map(goal => {
                const baseClasses = 'px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition duration-150 ease-in-out border whitespace-nowrap';
                const inactiveClasses = 'bg-white text-slate-600 border-slate-300 hover:bg-teal-50 hover:border-teal-400';
                return `<button data-goal="${goal}" class="${baseClasses} ${inactiveClasses}">${goal}</button>`;
            }).join('');
            contentDiv.appendChild(tagsContainer);
            itemDiv.appendChild(headerButton);
            itemDiv.appendChild(contentDiv);
            healthGoalAccordionContainer.appendChild(itemDiv);

            headerButton.addEventListener('click', () => {
                const icon = headerButton.querySelector('svg');
                const isActive = contentDiv.style.maxHeight;
                if (isActive) {
                    contentDiv.style.maxHeight = null;
                    icon.classList.remove('rotate-180');
                } else {
                    contentDiv.style.maxHeight = contentDiv.scrollHeight + "px";
                    icon.classList.add('rotate-180');
                }
            });
        });

        healthGoalAccordionContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON' && e.target.dataset.goal) {
                const goal = e.target.dataset.goal;
                const isSelected = activeGoals.has(goal);
                if (isSelected) {
                    activeGoals.delete(goal);
                    e.target.classList.remove('bg-teal-500', 'text-white', 'border-teal-500', 'shadow-md');
                    e.target.classList.add('bg-white', 'text-slate-600', 'border-slate-300', 'hover:bg-teal-50', 'hover:border-teal-400');
                } else {
                    activeGoals.add(goal);
                    e.target.classList.add('bg-teal-500', 'text-white', 'border-teal-500', 'shadow-md');
                    e.target.classList.remove('bg-white', 'text-slate-600', 'border-slate-300', 'hover:bg-teal-50', 'hover:border-teal-400');
                }
                clearGoalsBtn.classList.toggle('hidden', activeGoals.size === 0);
                applyFilters();
            }
        });
        clearGoalsBtn.addEventListener('click', () => {
            activeGoals.clear();
            document.querySelectorAll('#healthGoalAccordionContainer button[data-goal]').forEach(btn => {
                btn.classList.remove('bg-teal-500', 'text-white', 'border-teal-500', 'shadow-md');
                btn.classList.add('bg-white', 'text-slate-600', 'border-slate-300', 'hover:bg-teal-50', 'hover:border-teal-400');
            });
            clearGoalsBtn.classList.add('hidden');
            applyFilters();
        });
    }

    searchInput.addEventListener('input', e => {
        searchTerm = e.target.value;
        applyFilters();
    });

    // Initial setup
    setupGoalFilters(); 
    applyFilters();
});