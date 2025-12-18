# Task: Professional Breadcrumb (導覽標記) Optimization

Refactor the website's breadcrumb system to meet 2024-2025 professional SEO and accessibility standards.

## 1. Professional Standard & Implementation Plan

### SEO (Structured Data)
- **Format**: JSON-LD `BreadcrumbList`.
- **Properties**: Each item must include `position`, `name`, and `item` (URL).
- **Hierarchy**: Reflect the logical site structure (Home > Category > Page).

### UX & Accessibility (WAI-ARIA)
- **Container**: `<nav aria-label="Breadcrumb">`.
- **Structure**: Use an ordered list `<ol>` for logical sequence.
- **Current Page**: The last item must have `aria-current="page"` and should **not** be a clickable link.
- **Micro-interactions**: Subtle hover effects and consistent separators (e.g., `/` or `>`).

### Design & Layout
- **Responsiveness**: Ensure breadcrumbs wrap or truncate gracefully on mobile (using `white-space: nowrap` and `overflow-x: auto` if needed).
- **Placement**: Consistently placed above the `h1` title within the article content.

## 1.1 Rationale for Automated Component Approach

Given the project's architecture (zero-dependency, native JavaScript, component-based, Shadow DOM for isolation) and the large number of article pages, a manual approach to updating breadcrumbs is inefficient and prone to errors. Therefore, we will adopt an automated component-based solution. This strategy offers:

*   **Maintainability**: Centralized logic means changes to breadcrumb structure, style, or logic require editing only one component.
*   **Scalability**: Adding new content merely requires updating data, not manual HTML edits.
*   **Consistency & Reliability**: Automation ensures uniform, error-free breadcrumbs across all pages.
*   **Architectural Alignment**: Aligns with the project's existing pattern of encapsulating features in JavaScript components.

## 2. Optimized Technical Roadmap: Automated Component Approach

This roadmap focuses on building a dynamic `BreadcrumbComponent.js` to generate breadcrumbs programmatically.

### Step 1: Centralize Hierarchy Data (Data-Driven Approach)

The foundation of the automated system will be a centralized data source that defines the site's content hierarchy.

*   **Action**: Modify `assets/js/articles-data.js`.
*   **Details**: For each entry in the `articles` object, add a `parent` property that points to the key of its parent article or category. This creates a relational map of the entire site.

**Example in `articles-data.js`**:
```javascript
const articlesData = {
  // ... other entries
  'home': {
    name: '首頁',
    path: '/', // Assuming '/' is the homepage path
    parent: null // Root element
  },
  'health-topics': {
    name: '健康主題',
    path: '/category/health-topics.html',
    parent: 'home'
  },
  'topic-cardiovascular-health': {
    name: '心血管健康',
    path: '/post/topic-cardiovascular-health.html',
    parent: 'health-topics'
  },
  'fish-oil': {
    name: '魚油',
    path: '/post/fish-oil.html',
    parent: 'topic-cardiovascular-health'
  }
  // ... etc.
};
```

### Step 2: Develop the `BreadcrumbComponent.js`

This component is the core of the new system.

*   **Action**: Create a new file at `assets/js/components/BreadcrumbComponent.js`.
*   **Functionality**:
    1.  The component's constructor will accept a `containerElement` (the DOM element where the breadcrumb will be rendered) and the current page's `articleId` (a unique identifier for the current page, e.g., 'fish-oil').
    2.  It will use the `articleId` to look up the page in `articlesData`.
    3.  It will recursively traverse the hierarchy using the `parent` property until it reaches `null` (the homepage), building the complete path.
    4.  It will dynamically generate the full breadcrumb HTML, including:
        *   A `<nav aria-label="Breadcrumb">` container.
        *   An `<ol>` for the list.
        *   `<li>` elements for each item in the path.
        *   The final `<li>` for the current page will be a `<span>` with `aria-current="page"`, and not a clickable link.
    5.  It will also dynamically generate a `<script type="application/ld+json">` tag containing the `BreadcrumbList` structured data based on the generated path.
    6.  Finally, it will render both the HTML and the JSON-LD into the `containerElement`. The component must encapsulate its CSS within a Shadow DOM as per project conventions.

### Step 3: Integrate the Component into the Template

*   **Action**: Modify the main article template, `post/00template.html`.
*   **Details**:
    1.  Remove any existing hardcoded breadcrumb HTML.
    2.  In its place, add an empty placeholder: `<div id="breadcrumb-container"></div>`.
    3.  Add a `<script>` block that:
        *   Imports `BreadcrumbComponent.js` (or ensures it's loaded).
        *   Obtains the `articleId` for the current page (e.g., from a `data-page-id` attribute on the `<body>` tag or a global variable).
        *   Instantiates `BreadcrumbComponent`, passing it the container element and the `articleId`.
        *   Calls an `initialize()` or `render()` method on the component to generate and inject the breadcrumb.

### Step 4: Sitewide Rollout and Verification

*   **Action**: Because most pages use `00template.html`, the changes will apply globally and automatically. For specific pages not using the main template (e.g., some `category/*.html` files or `index.html`), manually add the container `div` and the component initialization script as needed.
*   **Tasks**:
    1.  Ensure `BreadcrumbComponent.js` is correctly linked/loaded on all relevant pages.
    2.  Perform the verification steps:
        *   Validate HTML using the W3C validator.
        *   Validate the `BreadcrumbList` schema using Google's Rich Results Test.
        *   Perform accessibility checks, ensuring screen readers correctly interpret the new structure.

## 3. Optimized Task Checklist

### Phase 1: Data Preparation & Component Development
- [ ] Update `assets/js/articles-data.js` with `parent` and `path` properties for all relevant articles and categories. <!-- id: 0 -->
- [ ] Create `assets/js/components/BreadcrumbComponent.js` with dynamic HTML and JSON-LD generation. <!-- id: 1 -->
    - [ ] Implement Shadow DOM for CSS encapsulation. <!-- id: 2 -->
    - [ ] Implement logic to traverse `articlesData` hierarchy. <!-- id: 3 -->
    - [ ] Generate semantic HTML (`<nav>`, `<ol>`, `<li>`, `<span>` for current page). <!-- id: 4 -->
    - [ ] Apply WAI-ARIA attributes (`aria-label`, `aria-current`). <!-- id: 5 -->
    - [ ] Generate JSON-LD `BreadcrumbList` schema. <!-- id: 6 -->

### Phase 2: Template Integration & Initial Rollout
- [ ] Refactor `post/00template.html`: <!-- id: 7 -->
    - [ ] Remove existing breadcrumb HTML. <!-- id: 8 -->
    - [ ] Add `<div id="breadcrumb-container"></div>` placeholder. <!-- id: 9 -->
    - [ ] Add script to load and initialize `BreadcrumbComponent.js`, passing `articleId`. <!-- id: 10 -->
- [ ] Integrate component into key non-template pages (e.g., `category/tools.html`, `index.html`) as needed. <!-- id: 11 -->

### Phase 3: Global Coverage & Verification
- [ ] Ensure all remaining `post/` articles and `food/` articles correctly display the new breadcrumb (they should, due to `00template.html` usage). <!-- id: 12 -->
- [ ] Verify HTML validation (W3C). <!-- id: 13 -->
- [ ] Validate Rich Results (Google Search Console Simulator). <!-- id: 14 -->
- [ ] Accessibility check (Screen reader compatibility). <!-- id: 15 -->