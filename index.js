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
  var esquire = require.resolve('esquire');
  var adapter = path.join(__dirname, "adapter.js");
  var browser = path.join(path.dirname(esquire), "src", "esquire-inject.js");
  var loader  = path.join(path.dirname(esquire), "src", "esquire-load.js");

  // Reverse unshift order (inject -> load -> karma)
  files.unshift(pattern(adapter));
  files.unshift(pattern(browser));
  files.unshift(pattern(loader));
};

factory.$inject = ['config.files'];
module.exports = {'framework:esquire': ['factory', factory ]};
