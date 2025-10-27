document.addEventListener("DOMContentLoaded", function () {
    /**
     * =========================================================================
     * health-topics-logic.js
     * -------------------------------------------------------------------------
     * DEV NOTE:
     * 此腳本專門用於處理 `health-topics.html` 頁面的渲染。
     * 其唯一的資料來源是 `articles-data.js` 中定義的 `topicArticles` 陣列。
     * 
     * 主要職責：
     * 1. 讀取 `topicArticles` 陣列。
     * 2. 根據文章的 `goal` 屬性進行分組。
     * 3. 為每一個 `goal` (主題) 生成一個大的主題摘要看板。
     * 4. 在看板中，列出所有屬於該主題的文章及其詳細資訊。
     * 
     * **重要**: 此腳本不應讀取或處理 `articlesData` 陣列中的單一營養素文章。
     * 頁面已明確區分「主題式文章」與「營養素文章」。
     * =========================================================================
     */

    const topicGrid = document.querySelector('.topic-grid');
    const topicTree = document.getElementById('topicTree');

    if (typeof topicArticles === 'undefined' || !topicGrid) {
        console.error("Data file (articles-data.js) is not loaded or the grid container is missing.");
        if (topicGrid) topicGrid.innerHTML = '<p style="text-align: center; color: red;">錯誤：主題文章資料載入失敗。</p>';
        return;
    }

    // 1. Group articles by goal
    const goalsData = topicArticles.reduce((acc, article) => {
        const goal = article.goal;
        if (!acc[goal]) {
            acc[goal] = [];
        }
        acc[goal].push(article);
        return acc;
    }, {});

    const sortedGoals = Object.keys(goalsData).sort((a, b) => a.localeCompare(b, 'zh-Hant'));

    // 2. Generate master cards for each goal
    const cardsHTML = sortedGoals.map(goal => {
        const articlesInGoal = goalsData[goal];
        const slug = goal.toLowerCase().replace(/\s+/g, '-'); // Simple slug for ID

        const articlesHTML = articlesInGoal.map(article => {
            const keywordsHTML = article.keywords ? article.keywords.split(', ').map(k => `<span>${k}</span>`).join('') : '';
            return `
                <div class="article-entry">
                    <h3 class="article-entry-title"><a href="${article.link}">${article.title}</a></h3>
                    <div class="article-entry-meta">
                        <span class="article-entry-published">發布日期: ${article.published || 'N/A'}</span>
                    </div>
                    <p class="article-entry-description">${article.description || ''}</p>
                    <div class="article-entry-keywords">
                        <strong>關鍵字:</strong> 
                        ${keywordsHTML}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="topic-master-card" id="topic-${slug}">
              <h2 class="topic-master-card-header">${goal}</h2>
              <div class="article-entry-list">
                ${articlesHTML}
              </div>
            </div>
        `;
    }).join('');

    topicGrid.innerHTML = cardsHTML;

    // 3. Generate sidebar
    if (topicTree) {
        let treeHTML = '';
        sortedGoals.forEach(goal => {
            const slug = goal.toLowerCase().replace(/\s+/g, '-');
            treeHTML += `<li class="tree-leaf"><a href="#topic-${slug}">${goal}</a></li>`;
        });
        topicTree.innerHTML = treeHTML;


    }
});