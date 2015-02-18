define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/characters/CharacterView'
], function (_, $, Backbone, PIXI, Utils, Character) {

  var Player = Character.extend({

    collision: false,

        // these are needed for collision detection, see collisionDetectorView
    dim: { x: 11, y: 11 }, // dimension
    pos: { x: 0, y: 0 }, // position
    col: { cells: [] }, // collision info

    setAdditionalListeners: function () {
      this.listenTo(Backbone, 'keysChanged', this.keysChanged);
      this.listenTo(Backbone, 'collision', this.collided);
    },

    collided: function (entities) {
      console.log('COLLISION');
      console.log(entities);
    }
  });
  return Player;
});
