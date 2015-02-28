define([
  'lodash',
  'jquery',
  'backbone'
], function (_, $, Backbone) {
  'use strict';

  var CharacterMoves = Backbone.View.extend({

    moves: [
      {
        type: 'attack',
        displayName: 'Slap',
        dmgMult: 0.9
      },
      {
        type: 'attack',
        displayName: 'Punch',
        dmgMult: 1.1
      },
      {
        type: 'attack',
        displayName: 'Kick',
        dmgMult: 1.2
      }
    ],

    initialize: function (params) {
      _.each(params, function (val, key) {
        this[key] = val;
      }, this);
    }
  });
  return CharacterMoves;
});
