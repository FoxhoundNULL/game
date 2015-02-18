
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  paths: {
    lodash: '../bower_components/lodash/lodash',
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    pixi: '../bower_components/pixi/bin/pixi'
  },
  map: {
    '*': {
      'underscore': 'lodash' // so we can use lodash with modules that require backbone
    }
  }
});

requirejs([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'views/mainView',
  'views/global/controlsView',
  'views/misc/dungeonGeneratorView',
  'views/misc/collisionDetectorView',
  'views/characters/PlayerView',
  'views/characters/EnemyView'
], function (_, $, Backbone, PIXI, Main, Controls, DungeonGenerator, CollisionDetector, Player, Enemy) {

  window.MAIN = new Main();

  var controls = new Controls();

  var dungeon = new DungeonGenerator();

  var player = new Player({
    env: dungeon
  });

  var enemy = new Enemy({
    env: dungeon
  });

  var collisionDetector = new CollisionDetector({
    entities: [player, enemy]
  });

});
