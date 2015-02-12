
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: '../bower_components/',
  paths: {
    lodash: 'lodash/lodash'
  }
});

requirejs([
  'lodash'
], function (_) {
  console.log('LOGLOGLOG');
});
