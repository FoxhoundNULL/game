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

  var Enemy = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: 'enemy',

    stats: new CharacterStatistics({
      hp: 150,
      attack: 20
    }),

    image: '../../assets/images/characters/enemy.png',
    scale: { x: 0.3, y: 0.3 },

  }));
  return Enemy;
});
