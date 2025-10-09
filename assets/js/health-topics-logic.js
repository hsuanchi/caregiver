document.addEventListener("DOMContentLoaded", function () {
    const topicGrid = document.querySelector('.topic-grid');

    if (typeof articlesData === 'undefined' || !topicGrid) {
        console.error("Data file (articles-data.js) is not loaded or the grid container is missing.");
        if (topicGrid) topicGrid.innerHTML = '<p style="text-align: center; color: red;">錯誤：主題資料載入失敗。</p>';
        return;
    }

    // 1. 從 articlesData 中提取所有不重複的健康目標 (goals)
    const allGoals = new Set();
    articlesData.forEach(article => {
        if (article.goals && Array.isArray(article.goals)) {
            article.goals.forEach(goal => allGoals.add(goal));
        }
    });

    // 2. 轉換為陣列並排序
    const uniqueGoals = Array.from(allGoals).sort((a, b) => a.localeCompare(b, 'zh-Hant'));

    // 3. 動態生成主題卡片
    const cardsHTML = uniqueGoals.map(goal => {
        const description = `探索與「${goal}」相關的營養素與健康知識。`;

        return `
            <a href="#" class="topic-card">
                <h3 class="topic-card-title">${goal}</h3>
                <p class="topic-card-desc">${description}</p>
            </a>
        `;
    }).join('');

    topicGrid.innerHTML = cardsHTML;
});