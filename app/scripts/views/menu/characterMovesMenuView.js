define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils'
], function (_, $, Backbone) {
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
        moves: this.character.moves.moves
      })).appendTo('#menus');
    },

    show: function () {
      this.$el.removeClass('hidden');
    },

    hide: function () {
      this.$el.addClass('hidden');
    },

    setPosition: function (pos) {
      this.$el.css({
        left: pos.x,
        top: pos.y
      });
    },

    getWidth: function () { return this.$el.width(); },
    getHeight: function () { return this.$el.height(); },

    keyPressed: function (key) {
      var curr = this.$el.find('> .move[data-selected="true"]');
      if (key == 'up' || key == 'down') {
        curr.attr('data-selected', false);
        var next = null;

        if (key == 'up') {
          next = curr.prev().length ? curr.prev() : this.$el.find('> .move:last-child');
        } else if (key == 'down') {
          next = curr.next().length ? curr.next() : this.$el.find('> .move:first-child');
        }
        next.attr('data-selected', true);
      } else if (key == 'select') {
        this.trigger('select', this.character, this.character.moves.moves[curr.attr('data-index')]);
      }
    }
  });
  return CharacterMovesMenu;
});
