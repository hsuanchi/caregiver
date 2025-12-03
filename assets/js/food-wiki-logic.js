(function (global) {
    'use strict';

    class FoodWiki {
        constructor(hostElement, foodDatabase) {
            this.hostElement = hostElement;
            this.foodDatabase = foodDatabase;
            this.currentFoodKey = 'avocado';
            this.currentMultiplier = 1;
            this.radarChart = null;
        }

        initialize() {
            this.renderExpandableCategories(); // NEW: Call the new method
            
            this.hostElement.querySelectorAll('.quick-search-btn').forEach(btn => {
                btn.addEventListener('click', this.handleQuickSearchClick.bind(this));
            });
            
            const defaultFoodKey = 'avocado'; // More user-friendly default
            this.currentFoodKey = defaultFoodKey;
            this.renderFood(this.currentFoodKey);
            
            this.hostElement.querySelectorAll('.portion-btn').forEach(btn => {
                btn.addEventListener('click', this.handlePortionClick.bind(this));
            });

            const searchInput = this.hostElement.querySelector('#searchInput');
            const searchResults = this.hostElement.querySelector('#searchResults');
            
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.handleSearch(e.target.value);
                });
            }
            
            // Hide search/category results on outside click
            this.hostElement.addEventListener('click', (e) => {
                if (!e.target.closest('#searchInput') && 
                    !e.target.closest('#expandable-category-browser') && // UPDATED
                    !e.target.closest('#searchResults')) {
                    if (searchResults) {
                        searchResults.classList.add('hidden');
                    }
                }
            });
        }

        renderExpandableCategories() {
            const container = this.hostElement.querySelector('#expandable-category-browser');
            if (!container) return;

            const foodsByCategory = Object.entries(this.foodDatabase).reduce((acc, [key, food]) => {
                const { category } = food;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push({ key, ...food });
                return acc;
            }, {});

            let html = '';
            for (const category in foodsByCategory) {
                const items = foodsByCategory[category];
                const previewItems = items.slice(0, 6); // MODIFIED: Show 6 items initially
                const hiddenItems = items.slice(6);

                html += `
                    <div class="category-group bg-white rounded-xl shadow-sm p-5 mb-4">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">${category}</h3>
                        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-4 gap-y-3">
                            ${previewItems.map(item => `
                                <div class="food-item text-center cursor-pointer group" data-food-key="${item.key}">
                                    <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mx-auto mb-1 group-hover:scale-110 transition-transform">${item.icon}</div>
                                    <p class="text-xs font-medium text-gray-600 group-hover:text-green-600 leading-tight">${item.name}</p>
                                </div>
                            `).join('')}
                        </div>
                        ${hiddenItems.length > 0 ? `
                            <div class="hidden-items hidden mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-4 gap-y-3">
                                ${hiddenItems.map(item => `
                                    <div class="food-item text-center cursor-pointer group" data-food-key="${item.key}">
                                        <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mx-auto mb-1 group-hover:scale-110 transition-transform">${item.icon}</div>
                                        <p class="text-xs font-medium text-gray-600 group-hover:text-green-600 leading-tight">${item.name}</p>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="text-center mt-4">
                                <button class="show-more-btn text-xs font-semibold text-gray-500 hover:text-green-600 transition bg-gray-100 hover:bg-green-50 px-3 py-1 rounded-full">
                                    展開看全部 ${items.length} 項 <i class="fa-solid fa-chevron-down text-xs ml-1 transition-transform"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                `;
            }
            container.innerHTML = html;

            // Add event listeners
            container.querySelectorAll('.food-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectFood(item.dataset.foodKey);
                    const foodDetailElement = this.hostElement.querySelector('#foodDetail');
                    if (foodDetailElement) {
                        window.scrollTo({ top: foodDetailElement.offsetTop - 100, behavior: 'smooth' });
                    }
                });
            });

            container.querySelectorAll('.show-more-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const group = e.target.closest('.category-group');
                    const hiddenItems = group.querySelector('.hidden-items');
                    const icon = e.target.querySelector('i');
                    const button = e.target;

                    hiddenItems.classList.toggle('hidden');
                    if (hiddenItems.classList.contains('hidden')) {
                        button.innerHTML = `展開看全部 ${group.querySelectorAll('.food-item').length} 項 <i class="fa-solid fa-chevron-down text-xs ml-1 transition-transform"></i>`;
                        button.classList.remove('bg-green-100');
                    } else {
                        button.innerHTML = `收合 <i class="fa-solid fa-chevron-up text-xs ml-1 transition-transform"></i>`;
                        button.classList.add('bg-green-100');
                    }
                });
            });
        }


        renderCategoryResults(results) {
            const container = this.hostElement.querySelector('#categoryResultsContainer');
            if (!container) return;
            container.innerHTML = '';

            if (results.length > 0) {
                results.forEach(key => {
                    const food = this.foodDatabase[key];
                    const card = document.createElement('div');
                    card.className = 'cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:transform hover:-translate-y-1 transition-all';
                    
                    card.innerHTML = `
                        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl mx-auto mb-3">${food.icon}</div>
                        <div class="text-center">
                            <div class="font-bold text-gray-800">${food.name}</div>
                            <div class="text-xs text-gray-500">${food.category}</div>
                        </div>
                    `;
                    
                    card.addEventListener('click', () => {
                        this.selectFood(key);
                        if (this.hostElement.querySelector('#foodDetail')) this.hostElement.querySelector('#foodDetail').classList.remove('hidden');
                        if (container) container.classList.add('hidden');
                    });
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = `<p class="text-center text-gray-500 col-span-full">此分類下沒有食物。</p>`;
            }
        }

        handlePortionClick(e) {
            this.hostElement.querySelectorAll('.portion-btn').forEach(b => {
                b.classList.remove('bg-white', 'text-green-700', 'shadow-sm');
                b.classList.add('text-gray-500');
            });
            e.target.classList.remove('text-gray-500');
            e.target.classList.add('bg-white', 'text-green-700', 'shadow-sm');
            
            this.currentMultiplier = parseFloat(e.target.dataset.mult);
            this.updateNumbers();
        }

        handleQuickSearchClick(e) {
            const key = e.currentTarget.dataset.food;
            this.selectFood(key);
            if (this.hostElement.querySelector('#foodDetail')) this.hostElement.querySelector('#foodDetail').classList.remove('hidden');
            if (this.hostElement.querySelector('#categoryResultsContainer')) this.hostElement.querySelector('#categoryResultsContainer').classList.add('hidden');
        }

        handleSearch(query) {
            const searchResults = this.hostElement.querySelector('#searchResults');
            const foodDetail = this.hostElement.querySelector('#foodDetail');
            const categoryResultsContainer = this.hostElement.querySelector('#categoryResultsContainer');

            if (foodDetail) foodDetail.classList.remove('hidden');
            if (categoryResultsContainer) categoryResultsContainer.classList.add('hidden');

            if (query.trim() === '') {
                if (searchResults) searchResults.classList.add('hidden');
                return;
            }

            const results = Object.keys(this.foodDatabase).filter(key => {
                const food = this.foodDatabase[key];
                const name = food.name.toLowerCase();
                const engName = food.engName.toLowerCase();
                const q = query.toLowerCase();
                return name.includes(q) || engName.includes(q) || key.includes(q);
            });

            this.renderSearchResults(results, null);
        }

        renderSearchResults(results, title) {
            const searchResults = this.hostElement.querySelector('#searchResults');
            if (!searchResults) return;
            searchResults.innerHTML = ''; 

            if (title) {
                const titleEl = document.createElement('div');
                titleEl.className = 'px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0';
                titleEl.innerText = title;
                searchResults.appendChild(titleEl);
            }

            if (results.length > 0) {
                results.forEach(key => {
                    const food = this.foodDatabase[key];
                    const item = document.createElement('a');
                    item.href = '#';
                    item.className = 'flex items-center px-4 py-3 hover:bg-green-50 transition text-sm border-b border-gray-50 last:border-0';
                    
                    item.innerHTML = `
                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg mr-3">${food.icon}</div>
                        <div>
                            <div class="font-medium text-gray-800">${food.name}</div>
                            <div class="text-xs text-gray-400">${food.engName}</div>
                        </div>
                    `;
                    
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.selectFood(key);
                    });
                    searchResults.appendChild(item);
                });
                searchResults.classList.remove('hidden');
            } else {
                const noResult = document.createElement('div');
                noResult.className = 'px-4 py-8 text-center text-gray-400 text-sm';
                noResult.innerHTML = '<i class="fa-regular fa-face-frown text-xl mb-2 block"></i> 找不到相關食物';
                searchResults.appendChild(noResult);
                searchResults.classList.remove('hidden');
            }
        }

        selectFood(key) {
            this.currentFoodKey = key;
            this.resetPortionUI();
            this.renderFood(key);
            
            const searchInput = this.hostElement.querySelector('#searchInput');
            const searchResults = this.hostElement.querySelector('#searchResults');
            
            if (this.hostElement.querySelector('#foodDetail')) this.hostElement.querySelector('#foodDetail').classList.remove('hidden');
            if (this.hostElement.querySelector('#categoryResultsContainer')) this.hostElement.querySelector('#categoryResultsContainer').classList.add('hidden');
            
            if (searchInput) {
                searchInput.value = this.foodDatabase[key].name;
                searchInput.placeholder = "試試看：酪梨、雞胸肉、鮭魚...";
            }
            if (searchResults) searchResults.classList.add('hidden');
        }

        resetPortionUI() {
            this.currentMultiplier = 1;
            const btn100 = this.hostElement.querySelector('#btn-100g');
            if (btn100) btn100.click(); 
        }

        renderFood(key) {
            const data = this.foodDatabase[key];
            if(!data) return;

            const foodName = this.hostElement.querySelector('#foodName');
            const foodIcon = this.hostElement.querySelector('#foodIcon');
            const foodCategory = this.hostElement.querySelector('#foodCategory');
            const aiSummary = this.hostElement.querySelector('#ai-summary');
            const btnServing = this.hostElement.querySelector('#btn-serving');
            const fullPageLink = this.hostElement.querySelector('#full-page-link');

            if(foodName) foodName.innerText = `${data.name} (${data.engName})`;
            if(foodIcon) foodIcon.innerText = data.icon;
            if(foodCategory) foodCategory.innerText = data.category;
            if(aiSummary) aiSummary.innerText = data.summary;
            if(btnServing) btnServing.innerText = data.portionName;
            
            if (fullPageLink) {
                fullPageLink.href = `../food/${key}.html`;
            }
            
            if(btnServing) {
                const servingMult = data.portionWeight / 100;
                btnServing.dataset.mult = servingMult;
            }

            this.updateNumbers();
            this.updateChart(data);
        }

        updateNumbers() {
            const data = this.foodDatabase[this.currentFoodKey].base;
            const m = this.currentMultiplier; 

            const fmt = (num) => (num * m).toFixed(1).replace('.0', '');

            const caloriesDisplay = this.hostElement.querySelector('#caloriesDisplay');
            const valProtein = this.hostElement.querySelector('#val-protein');
            const valFat = this.hostElement.querySelector('#val-fat');
            const valCarbs = this.hostElement.querySelector('#val-carbs');
            const valK = this.hostElement.querySelector('#val-k');
            const valFiber = this.hostElement.querySelector('#val-fiber');
            const barProtein = this.hostElement.querySelector('#bar-protein');
            const barFat = this.hostElement.querySelector('#bar-fat');
            const barCarbs = this.hostElement.querySelector('#bar-carbs');

            if(caloriesDisplay) caloriesDisplay.innerHTML = `${Math.round(data.calories * m)} <span class="text-base font-normal text-gray-500">kcal</span>`;
            if(valProtein) valProtein.innerText = `${fmt(data.protein)}g`;
            if(valFat) valFat.innerText = `${fmt(data.fat)}g`;
            if(valCarbs) valCarbs.innerText = `${fmt(data.carbs)}g`;
            if(valK) valK.innerText = `${Math.round(data.potassium * m)}mg`;
            if(valFiber) valFiber.innerText = `${fmt(data.fiber)}g`;

            const pPct = Math.min((data.protein * m / 60) * 100, 100);
            const fPct = Math.min((data.fat * m / 60) * 100, 100);
            const cPct = Math.min((data.carbs * m / 300) * 100, 100);

            if(barProtein) barProtein.style.width = `${pPct}%`;
            if(barFat) barFat.style.width = `${fPct}%`;
            if(barCarbs) barCarbs.style.width = `${cPct}%`;
        }

        updateChart(data) {
            const ctx = this.hostElement.querySelector('#nutritionRadar')?.getContext('2d');
            if(!ctx) return;
            
            if(this.radarChart) this.radarChart.destroy();

            this.radarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['蛋白質', '脂肪', '碳水', '纖維', '鉀'],
                    datasets: [{
                        label: '營養素佔比 (相對於高標)',
                        data: [
                            (data.base.protein / 30) * 100, 
                            (data.base.fat / 20) * 100, 
                            (data.base.carbs / 50) * 100,
                            (data.base.fiber / 10) * 100,
                            (data.base.potassium / 500) * 100
                        ],
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: { display: false },
                            grid: { color: '#e5e7eb' },
                            pointLabels: {
                                font: {
                                    family: "'Noto Sans TC', sans-serif",
                                    size: 11
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
    }

    global.FoodWiki = FoodWiki;

})(window);