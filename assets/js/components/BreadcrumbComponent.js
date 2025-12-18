class BreadcrumbComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // 監聽 'article-id' 屬性，以便動態傳入
  static get observedAttributes() { return ['article-id']; }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'article-id' && oldValue !== newValue) {
      this.render(newValue);
    }
  }

  buildPath(articleId) {
    const path = [];
    let currentId = articleId;
    let depth = 0;
    const maxDepth = 10; // 防呆機制：防止無限迴圈

    // Combine global articlesData and topicArticles (assuming they are defined in window scope)
    const allArticlesArray = [
        ...(window.articlesData || []),
        ...(window.topicArticles || []),
        // Add predefined category/system pages if they are not dynamically generated
        {
            id: 'category-archive',
            name: '文章總覽',
            link: '/category/archive.html',
            parent: 'home'
        },
        {
            id: 'category-health-topics',
            name: '健康主題',
            link: '/category/health-topics.html',
            parent: 'home'
        },
        {
            id: 'category-food-wiki',
            name: '食物百科',
            link: '/category/foodWiki.html',
            parent: 'home'
        },
        {
            id: 'category-nutrient-dashboard',
            name: '互動式資料庫',
            link: '/category/nutrient-dashboard.html',
            parent: 'home'
        },
        {
            id: 'category-tools',
            name: '健康計算機工具箱',
            link: '/category/tools.html',
            parent: 'home'
        }
    ];

    // Create a map for efficient lookup
    const articleMap = allArticlesArray.reduce((acc, article) => {
        acc[article.id] = article;
        return acc;
    }, {
        'home': { id: 'home', name: '首頁', link: '/', parent: null } // Base home entry
    });


    while (currentId && articleMap[currentId] && depth < maxDepth) {
      const item = articleMap[currentId];
      // 將項目加到陣列開頭
      path.unshift({
        name: item.name,
        url: item.link,
        isCurrent: currentId === articleId
      });
      
      currentId = item.parent;
      depth++;
    }
    return path;
  }

  generateJSONLD(pathArray) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": pathArray.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        // URL 必須是絕對路徑
        "item": window.location.origin + item.url 
      }))
    };

    // 檢查是否已存在，避免重複注入
    let script = document.getElementById('json-ld-breadcrumb');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-breadcrumb';
      script.type = 'application/ld+json';
      document.head.appendChild(script); // 注入到 Light DOM 的 head
    }
    script.textContent = JSON.stringify(schema, null, 2);
  }

  render(articleId) {
    if (!articleId) return;
    const pathArray = this.buildPath(articleId);
    
    // 1. 生成 JSON-LD (作為副作用執行)
    this.generateJSONLD(pathArray);

    // 2. 生成視覺化 HTML 到 Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block; 
          --separator: '/';
          --link-color: #007bff; /* Default if not set by global CSS variable */
          --text-color: #6c757d; /* Default if not set by global CSS variable */
          --hover-color: #0056b3; /* Default if not set by global CSS variable */

          /* Allow global CSS variables to override */
          color: var(--breadcrumb-text-color, var(--text-color));
          font-size: var(--breadcrumb-font-size, 0.9rem);
        }
        nav { font-size: inherit; color: inherit; }
        ol { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; }
        li { display: inline-flex; align-items: center; }
        li:not(:last-child)::after {
          content: var(--separator);
          margin: 0 0.5rem;
          color: #ccc;
        }
        a { text-decoration: none; color: var(--breadcrumb-link-color, var(--link-color)); }
        a:hover { text-decoration: underline; color: var(--breadcrumb-hover-color, var(--hover-color)); }
        span[aria-current="page"] { color: var(--breadcrumb-current-color, inherit); font-weight: bold; }
        
        /* 行動裝置優化：橫向滾動 */
        @media (max-width: 600px) {
           ol { 
             flex-wrap: nowrap; 
             overflow-x: auto; 
             white-space: nowrap; 
             padding-bottom: 5px; 
             -ms-overflow-style: none;  /* IE and Edge */
             scrollbar-width: none;  /* Firefox */
           }
           ol::-webkit-scrollbar { display: none; } /* Chrome, Safari, and Opera */
        }
      </style>
      <nav aria-label="Breadcrumb">
        <ol>
          ${pathArray.map(item => `
            <li>
              ${!item.isCurrent && item.url
                ? `<a href="${item.url}">${item.name}</a>`
                : `<span aria-current="page">${item.name}</span>`
              }
            </li>
          `).join('')}
        </ol>
      </nav>
    `;
  }
}

customElements.define('breadcrumb-component', BreadcrumbComponent);