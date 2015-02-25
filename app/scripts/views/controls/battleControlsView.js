define([
  'lodash',
  'jquery',
  'backbone'
], function (_, $, Backbone) {
  'use strict';

  // Battles don't require fluid controls so we can just trigger on keyup/keydown events.
  // See playerControlsView for an example of tracking key state for fluid movements
  var BattleControls = Backbone.View.extend({

    el: $('body'), // so we capture all events

    initialize: function () {
    },

    start: function () {
      this.delegateEvents({
        'keydown': 'keyDown'
      });
    },

    stop: function () {
      this.undelegateEvents();
    },

    keyDown: function (evt) {
      var keyName = this.keyNames[evt.keyCode];
      if (keyName) { // if it's a key we care about
        this.keyEvents[keyName](this);
      }
    },

    keyNames: {
      37: 'left',   65: 'left',
      38: 'up',     87: 'up',
      39: 'right',  68: 'right',
      40: 'down',   83: 'down',
      13: 'select'
    },

    keyEvents: {
      left: function (context) { context.trigger('left'); },
      up: function (context) { context.trigger('up'); },
      right: function (context) { context.trigger('right'); },
      down: function (context) { context.trigger('down'); },
      select: function (context) { context.trigger('select'); }
    },

  });
  return BattleControls;
});
