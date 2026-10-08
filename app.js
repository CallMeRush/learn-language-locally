/* Load content and feature files directly so the app stays static and server-free. */
(function bootstrapApplication() {
  var loaded = new Set(), pending = new Map();
  var content = { vocabulary: new Set(), verbs: new Set(), phrases: new Set() };
  var vocab = [], phrases = [];
  window.WortwerkData = {
    register(kind, group, records) {
      if (content[kind].has(group)) return;
      content[kind].add(group);
      if (kind === "phrases") phrases.push(...records);
      else vocab.push(...records.map(item => ({
        ...item,
        category: kind === "verbs" ? "verbs" : group,
        ...(kind === "verbs" ? { verbCategory: group } : {}),
      })));
    },
  };
  window.vocab = vocab;
  window.phrases = phrases;
  window.contentLoaded = (kind, group) => content[kind].has(group);
  window.contentAvailable = (kind, group = "all") => {
    if (group === "all") {
      return Object.keys(contentManifest[kind]).every(key => content[kind].has(key));
    }
    return content[kind].has(group);
  };
  function loadScript(path) {
    if (loaded.has(path)) return Promise.resolve();
    if (pending.has(path)) return pending.get(path);
    var task = new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.src = path;
      script.onload = () => { loaded.add(path); pending.delete(path); resolve(); };
      script.onerror = () => reject(new Error("Could not load " + path));
      document.head.append(script);
    });
    pending.set(path, task);
    return task;
  }
  window.ensureContent = async (kind, group = "all") => {
    var groups = group === "all" ? Object.keys(contentManifest[kind]) : [group];
    await Promise.all(groups.map(key => {
      var entry = contentManifest[kind][key];
      if (!entry) throw new Error("Unknown content group: " + kind + "/" + key);
      return content[kind].has(key) ? Promise.resolve() : loadScript(entry.src);
    }));
  };
  window.contentTotals = contentManifest.totals;
  async function loadFeatures() {
    var files = [
      "app/state.js", "app/practice.js", "app/settings.js", "app/vocabulary.js", "app/dictionary.js", "app/phrases.js", "app/issues.js",
      "app/application.js", "app/mixed.js", "app/lessons.js", "app/integration.js", "app/ui.js",
    ];
    for (const path of files) await loadScript(path);
  }
  async function start() {
    await ensureContent("vocabulary", "greetings");
    await loadFeatures();
  }
  start().catch(error => {
    console.error(error);
    document.body.insertAdjacentHTML("afterbegin", '<p class="load-error">Wortwerk could not load its local learning content. Refresh and try again.</p>');
  });
})();
