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

  var Player = Character.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: 'friendly',
    image: '../../assets/images/characters/bunny.png',
    collision: false, // can't collide with walls

    setAdditionalListeners: function () {
      this.listenTo(MAIN.controls.playerControls, 'keysChanged', this.keysChanged);
    }
  }));
  return Player;
});
