document.addEventListener("DOMContentLoaded", function () {
    const archiveGrid = document.querySelector('.archive-grid');
    if (typeof articlesData === 'undefined' || !archiveGrid) {
        console.error("articles-data.js is not loaded or the grid container is missing.");
        if(archiveGrid) archiveGrid.innerHTML = '<p style="text-align: center; color: red;">錯誤：文章資料載入失敗。</p>';
        return;
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const noResults = document.getElementById('no-results');
    const treeView = document.getElementById('treeView');
    let articleCards = [];

    function generateArticleCards() {
        const cardsHTML = articlesData.map(article => {
            const link = article.link.startsWith('tools/') ? `./${article.link}` : `../post/${article.link}`;
            const tagClass = article.category || 'other';
            return `
            <div class="article-card" id="${article.id}" data-category="${article.category}" data-published="${article.published}" data-modified="${article.modified}">
                <div class="card-content">
                    <span class="card-tag ${tagClass}">${article.tag}</span>
                    <a href="${link}" class="card-title-link"><h2 class="card-title">${article.title}</h2></a>
                    <p class="card-desc">${article.description}</p>
                    <a href="${link}" class="card-read-more">閱讀全文 &rarr;</a>
                </div>
                <div class="card-metadata">
                    <h4>文章資訊</h4>
                    <p><strong>關鍵字:</strong> <span>${article.keywords}</span></p>
                    <p><strong>發布日期:</strong> <span>${article.published}</span></p>
                    <p><strong>最後更新:</strong> <span>${article.modified}</span></p>
                </div>
            </div>
        `}).join('');
        archiveGrid.innerHTML = cardsHTML;
        articleCards = document.querySelectorAll('.article-card');
    }

    function generateTreeView() {
        if (!treeView) return;
        const categoryOrder = ["維生素", "礦物質", "草本營養", "蛋白質", "其他營養素", "關節營養", "實用工具", "益生菌", "其他機能性成分", "膳食纖維"];
        const categories = {};
        articlesData.forEach(article => {
            const category = article.tag;
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push({ title: article.title, id: article.id });
        });

        const sortedCategories = Object.keys(categories).sort((a, b) => {
            const indexA = categoryOrder.indexOf(a);
            const indexB = categoryOrder.indexOf(b);
            if (indexA === -1 && indexB === -1) return a.localeCompare(b, 'zh-Hant');
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

        let treeHTML = '';
        sortedCategories.forEach(category => {
            treeHTML += `
                <li class="tree-node">
                    <span class="node-label">${category}</span>
                    <ul class="tree-children">
            `;
            categories[category].forEach(article => {
                treeHTML += `<li class="tree-leaf"><a href="#${article.id}">${article.title}</a></li>`;
            });
            treeHTML += `</ul></li>`;
        });
        treeView.innerHTML = treeHTML;
    }

    function attachTreeEvents() {
        if (!treeView) return;
        treeView.addEventListener('click', function(e) {
            if (e.target.classList.contains('node-label')) {
                e.target.parentElement.classList.toggle('open');
            }
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetElement.style.transition = 'all 0.3s ease';
                    targetElement.style.boxShadow = '0 0 0 3px #ff6b35';
                    setTimeout(() => {
                        targetElement.style.boxShadow = '';
                    }, 1500);
                }
            }
        });
        document.querySelector('a[href="#archive-title"]')?.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#archive-title').scrollIntoView({ behavior: 'smooth' });
        });
    }

    function sortAndFilterArticles() {
        const selectedCategory = document.querySelector('.filter-btn.active').dataset.filter;
        const searchTerm = searchInput.value.toLowerCase();
        const sortValue = sortSelect.value;

        let cardsArray = Array.from(articleCards);

        cardsArray.sort((a, b) => {
            const dateA = new Date(a.dataset[sortValue.split('-')[0]]);
            const dateB = new Date(b.dataset[sortValue.split('-')[0]]);
            return sortValue.endsWith('-asc') ? dateA - dateB : dateB - dateA;
        });

        let visibleCount = 0;
        archiveGrid.innerHTML = ''; // Clear and re-append in sorted order
        cardsArray.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const desc = card.querySelector('.card-desc').textContent.toLowerCase();
            const keywords = card.querySelector('.card-metadata span').textContent.toLowerCase();

            const categoryMatch = (selectedCategory === 'all' || category === selectedCategory);
            const searchMatch = (title.includes(searchTerm) || desc.includes(searchTerm) || keywords.includes(searchTerm));

            if (categoryMatch && searchMatch) {
                archiveGrid.appendChild(card);
                visibleCount++;
            } 
        });

        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    function updateCategoryCounts() {
        const counts = { all: 0, vitamin: 0, mineral: 0, herbal: 0, protein: 0, other: 0 };
        articlesData.forEach(article => {
            counts.all++;
            if (counts.hasOwnProperty(article.category)) {
                counts[article.category]++;
            }
        });

        filterButtons.forEach(button => {
            const filter = button.dataset.filter;
            const count = counts[filter];
            const originalText = button.textContent.replace(/\s*\(\d+\)/, '');
            button.textContent = `${originalText} (${count})`;
        });
    }

    // --- Initialization ---
    generateArticleCards();
    generateTreeView();
    attachTreeEvents();
    updateCategoryCounts();
    sortAndFilterArticles();

    // --- Attach Event Listeners ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            sortAndFilterArticles();
        });
    });

    searchInput.addEventListener('input', sortAndFilterArticles);
    sortSelect.addEventListener('change', sortAndFilterArticles);

    // --- Initialize Deus Components ---
    if (window.DeusAnalyticsComponent) new window.DeusAnalyticsComponent().setDebug(false).setEnvironment('production');
    if (window.DeusHeaderComponent) new window.DeusHeaderComponent(document.getElementById("header-component")).setDebug(false);
    if (window.DeusFooterComponent) new window.DeusFooterComponent(document.getElementById("footer-component")).setDebug(false);
});
