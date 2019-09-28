const fs = require("fs");
const path = require("path");

var walk = function(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + "/" + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};

function sanitizeCode(code = "") {
  return code.replace(/\r/g, "");
}

function getFixtures(fixturesPath) {
  const allFiles = walk(fixturesPath);
  const REQUIRED_FILES = ["code.js", "output.js"];
  const fixtures = allFiles.reduce((acc, file) => {
    const folderName = path.dirname(file);
    const title = path.basename(folderName);
    if (acc.find(test => test.title === title)) return acc;
    const reqFiles = REQUIRED_FILES.map(rFile => path.join(folderName, rFile));
    reqFiles.forEach(rFile => {
      if (!fs.existsSync(rFile)) {
        throw new Error(`Missing ${path.basename(rFile)} in ${folderName}`);
      }
    });
    const [code, output] = reqFiles.map(rFile =>
      sanitizeCode(fs.readFileSync(rFile).toString())
    );

    return [...acc, { title, code, output }];
  }, []);
  return fixtures;
}

module.exports = { getFixtures };
