# Refactor Scrolling Logic to CSS `scroll-margin-top`

This plan outlines the steps to refactor the anchor link scrolling behavior from a JavaScript-based implementation to a more efficient and maintainable CSS-based solution.

## 1. Add CSS Rule to Template

- [x] Modify `post/00template.html` to add the `section[id] { scroll-margin-top: 100px; }` CSS rule.

## 2. Remove Redundant JavaScript from Pages

The following files contain duplicated JavaScript code for smooth scrolling that needs to be removed.

- [x] `post/calcium.html`
- [x] `post/coenzyme-q10.html`
- [x] `post/collagen.html`
- [x] `post/curcumin.html`
- [x] `post/dietary-fiber.html`
- [x] `post/fish-oil.html`
- [x] `post/folic-acid.html`
- [x] `post/gaba.html`
- [x] `post/glutathione.html`
- [x] `post/iron.html`
- [x] `post/potassium.html`
- [x] `post/protein.html`
- [x] `post/vitamin-a.html`
- [x] `post/vitamin-b.html`
- [x] `post/vitamin-d.html`
- [x] `post/vitamin-e.html`
- [x] `post/vitamin-k.html`
- [x] `post/zinc.html`

## 3. Remove Redundant JavaScript from Component

- [x] `assets/js/health-topics-logic.js`