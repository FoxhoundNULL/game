define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/character/characterView',
  'views/character/characterStatisticsView',
  'views/character/characterMovesView',
  'helpers/_collidableHelper'
], function (_, $, Backbone, PIXI, Utils, Character, CharacterStatistics, CharacterMoves, _CollidableHelper) {
  'use strict';

  var Player = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: 'friendly',

    stats: new CharacterStatistics({
      hp: 170,
      attack: 30
    }),

    moves: new CharacterMoves({
      attacks: [
        {
          displayName: 'Backhand Slap',
          dmgMult: 1.1
        },
        {
          displayName: 'Medium Punch',
          dmgMult: 1.2
        },
        {
          displayName: 'Light Kick',
          dmgMult: 1.0
        }
      ]
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
