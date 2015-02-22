define([
  'lodash',
  'jquery',
  'backbone',
  'pixi'
], function (_, $, Backbone, PIXI) {

  // This view keeps track of the state of the keys we care about at all times. We need to do it that way
  // instead of just triggering on keyup/keydown events so the subscribing views can translate keypresses
  // into fluid movement. See battleControlsView for an example of keyup/keydown event based triggering
  var PlayerControls = Backbone.View.extend({

    keys: {},

    el: $('body'), // so we capture all events

    initialize: function () {
    },

    start: function () {
      this.delegateEvents({
        'keydown': 'keyAction',
        'keyup': 'keyAction'
      });
    },

    stop: function () {
      this.undelegateEvents();
    },

    keyAction: function (evt) {
      var keyName = this.keyNames[evt.keyCode];
      if (keyName) { // if it's a key we care about
        this.keys[keyName] = (evt.type == 'keydown');
      }
      this.trigger('keysChanged', this.keys);
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
