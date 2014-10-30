var path = require('path');

var pattern = function(file) {
  return {
    pattern: path.join(__dirname, "node_modules", "esquire", "src", file),
    included: true,
    served: true,
    watched: false
  };
};

var factory = function(files) {
  files.unshift(pattern("esquire-load.js"));
  files.unshift(pattern("esquire-karma.js"));
  files.unshift(pattern("esquire-inject.js"));
};

factory.$inject = ['config.files'];
module.exports = {'framework:esquire': ['factory', factory ]};
