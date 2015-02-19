define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/characters/characterView',
  'helpers/_collidableHelper'
], function (_, $, Backbone, PIXI, Utils, Character, _CollidableHelper) {

  var Enemy = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: 'enemy'

  }));
  return Enemy;
});
