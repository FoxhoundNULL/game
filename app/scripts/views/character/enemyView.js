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

  var Enemy = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: 'enemy',

    stats: new CharacterStatistics({
      hp: 150,
      attack: 20
    }),

    moves: new CharacterMoves({
      attacks: [
        {
          displayName: 'Pinch',
          dmgMult: 0.7
        },
        {
          displayName: 'Weak Punch',
          dmgMult: 1.0
        },
        {
          displayName: 'Hard Kick',
          dmgMult: 1.3
        }
      ]
    }),

    image: '../../assets/images/characters/enemy.png',
    scale: { x: 0.3, y: 0.3 },

  }));
  return Enemy;
});
