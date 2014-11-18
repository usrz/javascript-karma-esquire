var path = require('path');

var pattern = function(file) {
  return {
    pattern: file,
    included: true,
    served: true,
    watched: false
  };
};

var factory = function(files) {
  var esquire = require.resolve('esquire');
  var browser = path.join(path.dirname(esquire), "esquire.min.js");
  var adapter = path.join(__dirname, "adapter.js");

  // Reverse unshift order (inject -> load -> karma)
  files.unshift(pattern(adapter));
  files.unshift(pattern(browser));
};

factory.$inject = ['config.files'];
module.exports = {'framework:esquire': ['factory', factory ]};
