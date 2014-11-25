var path = require('path');

var pattern = function(file) {
  return {
    pattern: file,
    included: true,
    watched: true,
    served: true
  };
};

var factory = function(files) {
  require("esquire");

  var dir = path.dirname(require.resolve('esquire'));

  // Reverse unshift order (inject -> load -> karma)
  files.unshift(pattern(path.join(dir, "ext", "karma.js")));
  files.unshift(pattern(path.join(dir, "ext", "mocha.js")));
  files.unshift(pattern(path.join(dir, "src", "loader.js")));
  files.unshift(pattern(path.join(dir, "src", "esquire.js")));
};

factory.$inject = ['config.files'];
module.exports = {'framework:esquire': ['factory', factory ]};
