define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/characters/characterView',
  'helpers/_collidableHelper'
], function (_, $, Backbone, PIXI, Utils, Character, _CollidableHelper) {

  var Player = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    collision: false,

    setAdditionalListeners: function () {
      this.listenTo(Backbone, 'keysChanged', this.keysChanged);
      this.listenTo(Backbone, 'collision', this.collided);
    },

    collided: function (entities) {
      console.log('COLLISION');
      console.log(entities);
    }
  }));
  return Player;
});
