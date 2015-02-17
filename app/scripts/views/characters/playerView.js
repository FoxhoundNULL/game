define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/characters/CharacterView',
], function (_, $, Backbone, PIXI, Utils, Character) {

  var Player = Character.extend({

    collision: false,

    setAdditionalListeners: function () {
      this.listenTo(Backbone, 'keysChanged', this.keysChanged);
    }
  });
  return Player;
});
