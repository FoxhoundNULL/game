define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/characters/CharacterView'
], function (_, $, Backbone, PIXI, Utils, Character) {

  return {
    // these are needed for collision detection, see collisionDetectorView
    dim: { x: 13, y: 13 }, // dimension
    pos: { x: 0, y: 0 }, // position
    col: { cells: [] }, // collision info
  }
});
