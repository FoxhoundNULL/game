define([
  'lodash',
  'jquery',
  'backbone',
  'pixi'
], function (_, $, Backbone, PIXI) {

  var left =  function () { Backbone.trigger('movePlayer', 'left'); };
  var up =    function () { Backbone.trigger('movePlayer', 'up'); };
  var right = function () { Backbone.trigger('movePlayer', 'right'); };
  var down =  function () { Backbone.trigger('movePlayer', 'down'); };

  var PlayerControls = Backbone.View.extend({
    el: $('body'),

    events: {
      'keydown': 'keyDown'
    },

    initialize: function () {
    },

    keyDown: function (evt) {
      this.keyEvents[evt.keyCode] && this.keyEvents[evt.keyCode]();
    },

    keyEvents: {
      37: left,   65: left,
      38: up,     87: up,
      39: right,  68: right,
      40: down,   83: down
    }

  });
  return PlayerControls;
});
