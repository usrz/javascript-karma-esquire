Karma Esquire
=============

A simple plugin to load the
[Esquire](https://github.com/usrz/javascript-esquire)
library and (optionally) a number of scripts before running
[Karma](http://karma-runner.github.io/).

### Installation

Install with [NPM](http://www.npmjs.com/):

```sh
npm install --save-dev karma-esquire
```

Then just add the `esquire` module to your listed `frameworks` in _karma.conf.js_.

```js
module.exports = function(config) {

  config.set({
    // ...
    frameworks: ['esquire', /* ... */ ],
    files: [
      // ...
    ]
};
```

### Loading scripts

When working with [Karma](http://karma-runner.github.io/) for unit testing, the
`Esquire.karma(...)` method can be used to specify what scripts to be loaded
with each run.

The `Esquire.karma(...)` method takes either a `RegExp` or a callback `function`:

This method can be invoked _multiple_ times, and *all* callbacks or expressions
will be evaluated. If *any* of them matches, the script will be loaded.

##### Regular Expressions

When invoked with a `RegExp`, any file matching the expression will be loaded.

```js
// This will load all '/tests/deferred/....js' files
Esquire.karma(/^\/tests\/deferred\/.\.js$/);
```

##### Callback functions

When invoked with a callback `function`, the callback will be invoked once for
every file known to `Karma` and if the callback returns a _truthy_ value,
said file will be loaded as a script dependency.

```js
// The callback function will be invoked for every file, and said
// file will be loaded if the function returns a truthy value
Esquire.karma(function(file) {
 return ...;
});
```

### License

[Apache License, Version 2.0](Apache License)
