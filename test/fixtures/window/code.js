function window() {
  window;
  window.document;
  window.addEventListener("load", () => {
    console.log("loaded");
  });
  window.document.addEventListener("click", () => {
    console.log("clicked");
  });
}
