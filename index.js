var path = require('path');

var pattern = function(file) {
  return {
    pattern: path.join.apply(path, arguments),
    included: true,
    served: true,
    watched: false
  };
};

var factory = function(files) {
  // Reverse unshift order (inject -> load -> karma)
  files.unshift(pattern(__dirname, "adapter.js"));
  files.unshift(pattern(__dirname, "node_modules", "esquire", "src", "esquire-load.js"));
  files.unshift(pattern(__dirname, "node_modules", "esquire", "src", "esquire-inject.js"));
};

factory.$inject = ['config.files'];
module.exports = {'framework:esquire': ['factory', factory ]};
