const pluginTester = require("babel-plugin-tester");

const plugin = require("../src");

const path = require("path");

const { getFixtures } = require("./utils");

const fixtures = getFixtures(path.join(__dirname, "fixtures"));

pluginTester({
  plugin,
  pluginOptions: {
    rules: [
      { find: "window", replace: "window.iframeWindow" },
      { find: "document", replace: "window.iframeWindow.document" }
    ]
  },
  tests: fixtures
});
