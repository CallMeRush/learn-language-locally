/* Appearance controls are local preferences, shared with progress export. */
function renderSettings() {
  var root = $("#settings-view");
  root.querySelector("#settings-random-mode").checked = randomMode;
  root.querySelectorAll("[data-accent-choice]").forEach((button) => {
    var selected = button.dataset.accentChoice === colorAccent;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.onclick = () => {
      colorAccent = button.dataset.accentChoice;
      applyAppearance();
      renderSettings();
      savePreferences();
    };
  });
  root.querySelectorAll("[data-background-choice]").forEach((button) => {
    var selected = button.dataset.backgroundChoice === colorBackground;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.onclick = () => {
      colorBackground = button.dataset.backgroundChoice;
      applyAppearance();
      renderSettings();
      savePreferences();
    };
  });
}
