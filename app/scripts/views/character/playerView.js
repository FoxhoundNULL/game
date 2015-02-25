define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/character/characterView',
  'views/character/characterStatisticsView',
  'helpers/_collidableHelper'
], function (_, $, Backbone, PIXI, Utils, Character, CharacterStatistics, _CollidableHelper) {
  'use strict';

  var Player = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: 'friendly',

    stats: new CharacterStatistics({
      hp: 170,
      attack: 30
    }),

    image: '../../assets/images/characters/bunny.png',
    scale: { x: 0.8, y: 0.8 },

    collision: false, // can't collide with walls

    setAdditionalListeners: function () {
      this.listenTo(MAIN.controls.playerControls, 'keysChanged', this.keysChanged);
    }
  }));
  return Player;
});
