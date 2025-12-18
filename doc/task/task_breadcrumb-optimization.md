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

## 2. Technical Roadmap

### Phase 1: Global CSS & Template Upgrade
1.  **Refactor CSS**: Update `.breadcrumb` styles in `post/00template.html` to support the new list-based structure.
2.  **Refactor HTML Structure**: Replace the flat `nav` structure with a semantic `nav > ol > li` pattern.
3.  **Refactor JSON-LD**: Update the template's script block to a more robust `BreadcrumbList` schema.

### Phase 2: Hub & Core Article Migration
1.  **Cardiovascular Hub**: Update `post/topic-cardiovascular-health.html` to provide a clear parent-child structure.
2.  **Core Nutrients**: Update `post/fish-oil.html`, `post/zinc.html`, etc.
3.  **Category Pages**: Update `category/tools.html`.

### Phase 3: Global Rollout
- Apply the standardized pattern to all remaining `post/` articles.

## 3. Task Checklist

### Phase 1: Planning & Standardization
- [ ] Define the site-wide hierarchy mapping (Home > Category > Page) <!-- id: 0 -->
- [ ] Design the refined CSS layout (responsive & consistent) <!-- id: 1 -->
- [ ] Finalize the JSON-LD `BreadcrumbList` schema template <!-- id: 2 -->

### Phase 2: Core Template Implementation
- [ ] Refactor `post/00template.html` <!-- id: 3 -->
    - [ ] Update semantic HTML (`<nav>`, `<ol>`) <!-- id: 4 -->
    - [ ] Apply WAI-ARIA attributes (`aria-label`, `aria-current`) <!-- id: 5 -->
    - [ ] Modernize CSS styling <!-- id: 6 -->
    - [ ] Sync JSON-LD schema <!-- id: 7 -->

### Phase 3: Global Rollout (Batch Priority)
- [ ] Batch 1: High-Traffic Hubs <!-- id: 8 -->
    - [ ] Apply to `post/topic-cardiovascular-health.html` <!-- id: 9 -->
    - [ ] Apply to `category/tools.html` <!-- id: 10 -->
- [ ] Batch 2: Core Nutrients <!-- id: 11 -->
    - [ ] Apply to `post/fish-oil.html` <!-- id: 12 -->
    - [ ] Apply to `post/zinc.html` <!-- id: 13 -->
- [ ] Batch 3: All remaining articles <!-- id: 14 -->

### Phase 4: Verification
- [ ] Verify HTML validation (W3C) <!-- id: 15 -->
- [ ] Validate Rich Results (Google Search Console Simulator) <!-- id: 16 -->
- [ ] Accessibility check (Screen reader compatibility) <!-- id: 17 -->
