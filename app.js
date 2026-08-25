/* Load feature files directly so the app stays static and server-free. */
(function loadApplicationFiles() {
  [
    "app/state.js",
    "app/vocabulary.js",
    "app/phrases.js",
    "app/mixed.js",
    "app/lessons.js",
    "app/integration.js",
    "app/ui.js",
  ].forEach((path) => document.write(`<script src="${path}"><\/script>`));
})();
