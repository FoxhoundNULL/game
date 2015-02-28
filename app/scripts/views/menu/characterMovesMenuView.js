define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils'
], function (_, $, Backbone, PIXI, Utils) {
  'use strict';

  var CharacterMovesMenu = Backbone.View.extend({

    template: _.template($('[data-template-name="characterMovesMenu"]').html()),

    character: null,

    initialize: function (params) {
      this.character = params.character;

      this.generateMarkup();

      this.listenTo(params.controls, 'all', this.keyPressed);
    },

    generateMarkup: function () {
      this.$el = $(this.template({
        moves: this.character.moves.attacks
      })).appendTo('#menus');
    },

    show: function () {
      this.$el.removeClass('hidden');
    },

    hide: function () {
      this.$el.addClass('hidden');
    },

    // pos: { x: 0, y: 0 }
    setPosition: function (pos) {

    },

    keyPressed: function (key) {

    }
  });
  return CharacterMovesMenu;
});
