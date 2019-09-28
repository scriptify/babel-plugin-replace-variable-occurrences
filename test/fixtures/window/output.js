function window() {
  window.iframeWindow;
  window.iframeWindow.document;
  window.iframeWindow.addEventListener("load", () => {
    console.log("loaded");
  });
  window.iframeWindow.document.addEventListener("click", () => {
    console.log("clicked");
  });
}
