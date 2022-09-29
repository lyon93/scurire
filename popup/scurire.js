const blackSaturation = [
  "#a6a6a6",
  "#999999",
  "#8c8c8c",
  "#808080",
  "#737373",
  "#666666",
  "#595959",
  "#4d4d4d",
  "#404040",
  "#333333",
  "#262626",
  "#1a1a1a",
  "#0d0d0d",
];

const content = document.getElementById("popup-content");

function addColorsElements() {
  // iterate over saturation array and create a div for each color
  blackSaturation.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("square");
    colorDiv.style.backgroundColor = color;
    colorDiv.dataset.color = color;
    content.appendChild(colorDiv);
  });
}

function createResetButton() {
  const resetButton = document.createElement("button");
  resetButton.classList.add("reset");
  resetButton.textContent = "Reset";
  content.appendChild(resetButton);
}

function listenClicks() {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("reset") && e.target?.dataset?.color) {
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "color",
          color: e.target?.dataset?.color,
        });
      });
    } else if (e.target.classList.contains("reset")) {
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }
  });
}
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute darkify content script: ${error.message}`);
}
browser.tabs
  .executeScript({ file: "/content_scripts/darkify.js" })
  .then(() => {
    addColorsElements();
    createResetButton();
    listenClicks();
  })
  .catch(reportExecuteScriptError);
