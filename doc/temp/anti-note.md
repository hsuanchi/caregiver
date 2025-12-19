Verification
Manual Verification Steps
Visual Check: Open 
post/anthocyanins.html
. The breadcrumb should appear in the hero section: 首頁 / 健康主題 / 心血管健康 / 花青素....
Functionality: Clicking "心血管健康" should navigate to 
/post/topic-cardiovascular-health.html
.
SEO: Inspect duplicates. The <head> should not contain a static BreadcrumbList script (the component generates it dynamically).
Next Steps
Implement the same optimization for other pages (e.g., 
amino-acids.html
, fish-oil.html) following this standard.




1. Data Layer Fix (Critical Foundation)
[MODIFY] 
articles-data.js
Action: Add the missing category node to support the hierarchy.
Node Definition:
{
    id: 'topic-card-cardiovascular-health',
    parent: 'category-health-topics', // Links to the static entry in BreadcrumbComponent
    type: '健康主題',
    name: '心血管健康',
    link: '/post/topic-cardiovascular-health.html', // Verify this path exists
    title: '心血管健康',
    keywords: '心血管, 血管, 高血壓'
}
2. View Layer Implementation (Automation)
[MODIFY] 
post/anthocyanins.html
Clean Up: Remove hardcoded <nav class="breadcrumb"> and json-ld BreadcrumbList.
Implement: Insert <breadcrumb-component id="breadcrumb-component-container"></breadcrumb-component>.
Wire Up: Add/Update script to set article-id to card-anthocyanins.
Dependency: Ensure 
BreadcrumbComponent.js
 is imported.
Remove Hardcoded JSON-LD BreadcrumbList.
Remove Hardcoded HTML <nav class="breadcrumb">.
Insert <breadcrumb-component> tag in the hero section.
Add Initialization script to set article-id.
Ensure 
assets/js/components/BreadcrumbComponent.js
 is included.
Verification Plan
Automated Tests
None available.
Manual Verification
Open 
post/anthocyanins.html
 in browser.
Verify Visuals:
Check if Breadcrumb appears above the title.
Check if it shows: 首頁 > 健康主題(if applicable) > 心血管健康 > 花青素... (path depends on data).
Check hover effects and styling.
Verify DOM:
Inspect Element to ensure Shadow DOM is attached.
Check <head> for injected JSON-LD BreadcrumbList.
Check there is no duplicate JSON-LD.
Verify Links:
Click breadcrumb links to ensure they navigate correctly.
