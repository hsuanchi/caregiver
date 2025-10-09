document.addEventListener("DOMContentLoaded", function () {
    const topicGrid = document.querySelector('.topic-grid');

    if (typeof articlesData === 'undefined' || !topicGrid) {
        console.error("Data file (articles-data.js) is not loaded or the grid container is missing.");
        if (topicGrid) topicGrid.innerHTML = '<p style="text-align: center; color: red;">錯誤：主題資料載入失敗。</p>';
        return;
    }

    // 確保 topicArticles 存在，如果不存在則建立一個空陣列
    if (typeof topicArticles === 'undefined') {
        window.topicArticles = [];
    }

    // 建立一個從中文目標到英文 URL slug 的映射表
    const goalToSlugMap = {
        '心血管健康': 'cardiovascular-health',
        '免疫強化': 'immune-support',
        '骨骼與牙齒健康': 'bone-tooth-health',
        '腦部認知': 'cognitive-function',
        '抗氧化與抗發炎': 'antioxidant-anti-inflammatory',
        '腸道菌群平衡': 'gut-flora-balance',
        '能量代謝': 'energy-metabolism',
        '神經與情緒健康': 'neuro-emotional-health',
        '皮膚與黏膜健康': 'skin-mucous-health',
        '血紅素與氣色': 'hemoglobin-complexion',
        '新生與發育': 'growth-development',
        '肌膚與膠原蛋白': 'skin-collagen',
        '視力維護': 'vision-care',
        '生長發育與修復': 'growth-repair',
        '內分泌調節': 'endocrine-regulation',
        '血液凝固': 'blood-coagulation',
        '睡眠與放鬆': 'sleep-relaxation',
        '神經與肌肉功能': 'neuro-muscular-function',
        '血糖穩定': 'blood-sugar-stability',
        '體液平衡': 'fluid-balance',
        '男性保健': 'mens-health',
        '甲狀腺與代謝': 'thyroid-metabolism',
        '細胞保護': 'cell-protection',
        '關節與軟骨': 'joint-cartilage',
        '體重管理': 'weight-management',
        '消化道健康': 'digestive-health',
        '肝臟解毒與代謝': 'liver-detox-metabolism'
    };

    // 1. 建立一個物件來儲存每個健康目標的詳細資訊
    const goalsData = {};
    articlesData.forEach(article => {
        if (article.goals && Array.isArray(article.goals)) {
            article.goals.forEach(goal => {
                if (!goalsData[goal]) {
                    goalsData[goal] = {
                        count: 0,
                        articles: [],
                        topicLinks: []
                    };
                }
                goalsData[goal].count++;
                goalsData[goal].articles.push(article.name);
            });
        }
    });

    // 2. 將主題性文章歸類到 goalsData 中
    topicArticles.forEach(topicArticle => {
        if (goalsData[topicArticle.goal]) {
            goalsData[topicArticle.goal].topicLinks.push({
                title: topicArticle.title,
                link: topicArticle.link
            });
        }
    });

    // 3. 轉換為陣列並排序
    const sortedGoals = Object.keys(goalsData).sort((a, b) => a.localeCompare(b, 'zh-Hant'));

    // 4. 動態生成主題卡片 (Redesigned for Mobile Carousels)
    const cardsHTML = sortedGoals.map(goal => {
        const goalInfo = goalsData[goal];
        const slug = goalToSlugMap[goal] || goal.toLowerCase().replace(/\s+/g, '-');
        const cardLink = `topic-${slug}.html`; // 卡片主連結
        const description = `探索與「${goal}」相關的營養素與健康知識。`;

        // 生成主題文章連結 (for carousel)
        const topicLinksHTML = goalInfo.topicLinks.length > 0 ? `
            <h4 class="carousel-title">主題文章</h4>
            <div class="card-carousel-container">
                <div class="card-carousel">
                    ${goalInfo.topicLinks.map(link => `
                        <div class="carousel-item">
                            <a href="${link.link}" class="topic-article-card">
                                ${link.title}
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        // 生成營養素標籤 (for carousel)
        const nutrientsHTML = goalInfo.articles.map(name => `
            <div class="carousel-item">
                <span class="nutrient-tag">${name}</span>
            </div>
        `).join('');

        const nutrientsCarouselHTML = `
            <h4 class="carousel-title">相關營養素</h4>
            <div class="card-carousel-container">
                <div class="card-carousel">
                    ${nutrientsHTML}
                </div>
            </div>
        `;

        return `
            <div class="topic-card">
                <div class="topic-card-header">
                    <a href="${cardLink}" class="topic-card-title-link">
                        <h3 class="topic-card-title">${goal}</h3>
                    </a>
                </div>
                <p class="topic-card-desc">${description}</p>
                <div class="card-content-wrapper">
                    ${topicLinksHTML}
                    ${nutrientsCarouselHTML}
                </div>
            </div>
        `;
    }).join('');

    topicGrid.innerHTML = cardsHTML;
});