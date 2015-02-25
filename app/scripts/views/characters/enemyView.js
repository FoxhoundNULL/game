define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/characters/characterView',
  'helpers/_collidableHelper'
], function (_, $, Backbone, PIXI, Utils, Character, _CollidableHelper) {
  'use strict';

  var Enemy = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: 'enemy',
    image: '../../assets/images/characters/enemy.png',
    scale: { x: 0.3, y: 0.3 },

  }));
  return Enemy;
});
