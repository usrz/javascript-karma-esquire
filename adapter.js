'use strict';

(function(window) {

  /* Hold all describe(...) it(...) calls */
  var _describe = window.describe;
  var _it = window.it;

  var _modules = [];
  var _last = 0;

  window.describe = function() {
    var test = "$$esquire$$/describe/" + (++_last);
    _modules.push(test);
    var args = arguments;
    Esquire.define(test, [], function() {
      _describe.apply(window, args);
    });
  };

  window.it = function() {
    var test = "$$esquire$$/it/" + (++_last);
    _modules.push(test);
    var args = arguments;
    Esquire.define(test, [], function() {
      _it.apply(window, args);
    });
  };

  /* Placeholder in case we are loaded first */
  if (! window.Esquire) window.Esquire = {};

  /* If we have karma... */
  if (window.__karma__) {
    var karma = window.__karma__;
    console.log("Esquire: We have Karma...");

    /* List of matchers, one must resolve... */
    var matchers = [];

    /* Load scripts for Karma */
    window.Esquire.karma = function(callbackOrRegExp) {
      if (typeof(callbackOrRegExp) == 'function') {
        matchers.push(callbackOrRegExp);
      } else if (callbackOrRegExp instanceof RegExp) {
        matchers.push(function(fileName) {
          return callbackOrRegExp.test(fileName);
        });
      }
    };

    /* Replace Karma's loaded handler */
    karma.loaded = function() {
      window.describe = _describe;
      window.it = _it;
      for (var i in _modules) esquire(_modules[i]);


      /* Use a dictionary, remove duplicates */
      var scripts = {};

      /* See if any of the files match */
      for (var file in karma.files) {
        if (karma.files.hasOwnProperty(file)) {
          for (var matcher in matchers) {
            if (matchers[matcher](file)) {
              scripts[file] = file + "?" + karma.files[file];
            }
          }
        }
      }

      /* Convert the dictionary in an array */
      var locations = [];
      for (var i in scripts) {
        locations.push(scripts[i]);
      }

      /* Load the scripts if we have to */
      if (locations.length > 0) {

        console.log("Esquire: Loading " + locations.length + " scripts before running Karma");
        window.Esquire.load(locations)
          .then(function(success) {
            console.log("Esquire: Running Karma");
            karma.start();
          }, function(failure) {
            karma.error(failure);
          })

      } else {

        /* No scripts to load, just run */
        karma.start();
      }
    }
  }

})(self);
