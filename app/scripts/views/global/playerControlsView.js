define([
  'lodash',
  'jquery',
  'backbone',
  'pixi'
], function (_, $, Backbone, PIXI) {

  var PlayerControls = Backbone.View.extend({

    keys: {},

    el: $('body'), // so we capture all events

    events: {
      'keydown': 'keyAction',
      'keyup': 'keyAction'
    },

    initialize: function () {
    },

    keyDown: function (evt) {
      this.keyEvents[evt.keyCode] && this.keyEvents[evt.keyCode]();
    },

    keyAction: function (evt) {
      var keyName = this.keyNames[evt.keyCode];
      if (keyName) { // if it's a key we care about
        this.keys[keyName] = (evt.type == 'keydown');
      }
      Backbone.trigger('keysChanged', this.keys);
    },

    keyNames: {
      37: 'left',   65: 'left',
      38: 'up',     87: 'up',
      39: 'right',  68: 'right',
      40: 'down',   83: 'down'
    }

  });
  return PlayerControls;
});
