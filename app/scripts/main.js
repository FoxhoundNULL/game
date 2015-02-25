'use strict';

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
  'views/controls/controlsView',
  'views/misc/dungeonGeneratorView',
  'views/misc/collisionDetectorView',
  'views/misc/gameManagerView',
  'views/misc/battleManagerView',
  'views/character/PlayerView',
  'views/character/EnemyView'
], function (_, $, Backbone, PIXI, Main, Controls, DungeonGenerator, CollisionDetector, GameManager, BattleManager,
  Player, Enemy) {

  window.MAIN = new Main();

  MAIN.controls = new Controls({
    initialControls: 'playerControls' // start player controls initially
  });

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

  var gameManager = new GameManager();

  var battleManager = new BattleManager();

});
