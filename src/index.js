const alreadyReplacedExpressions = [];

module.exports = function logger({ types }) {
  return {
    name: "replacer",
    visitor: {
      Identifier(path, state) {
        if (alreadyReplacedExpressions.includes(path.parent)) return;
        if (path.parent.type === "FunctionDeclaration") return;
        state.opts.rules.forEach(({ find, replace }) => {
          if (path.node.name === find) {
            path.node.name = replace;
            alreadyReplacedExpressions.push(path.parent);
          }
        });
      }
    }
  };
};
