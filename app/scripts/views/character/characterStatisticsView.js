define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
], function (_, $, Backbone, PIXI, Utils) {
  'use strict';

  var CharacterStatistics = Backbone.View.extend({

    hp: 100,
    attack: 25,

    initialize: function (params) {
      _.each(params, _.bind(function (val, key) {
        this[key] = val;
      }, this));
    }

  });
  return CharacterStatistics;
});
