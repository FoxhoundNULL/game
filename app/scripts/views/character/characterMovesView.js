define([
  'lodash',
  'jquery',
  'backbone'
], function (_, $, Backbone) {
  'use strict';

  var CharacterMoves = Backbone.View.extend({

    attacks: [
      {
        displayName: 'Slap',
        dmgMult: 0.9
      },
      {
        displayName: 'Punch',
        dmgMult: 1.1
      },
      {
        displayName: 'Kick',
        dmgMult: 1.2
      }
    ],

    initialize: function (params) {
      _.each(params, _.bind(function (val, key) {
        this[key] = val;
      }, this));
    }

  });
  return CharacterMoves;
});
