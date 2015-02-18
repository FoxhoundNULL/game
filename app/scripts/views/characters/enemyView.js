define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/characters/CharacterView'
], function (_, $, Backbone, PIXI, Utils, Character) {

  var Enemy = Character.extend({

        // these are needed for collision detection, see collisionDetectorView
    dim: { x: 11, y: 11 }, // dimension
    pos: { x: 0, y: 0 }, // position
    col: { cells: [] }, // collision info

  });
  return Enemy;
});
