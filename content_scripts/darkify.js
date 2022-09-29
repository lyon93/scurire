(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function resetStyles() {
    let elements = document.querySelectorAll("*");
    for (let element of elements) {
      element.style.background = "";
      element.style.color = "";
    }
  }
  function toDarkMode(message) {
    let elements = document.querySelectorAll("*");
    for (let element of elements) {
      element.style.background = message.color;
      element.style.color = "white";
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "color") {
      toDarkMode(message);
    } else if (message.command === "reset") {
      resetStyles();
    }
  });
})();
