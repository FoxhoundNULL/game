define([
  'lodash',
  'jquery',
  'backbone',
  'pixi'
], function (_, $, Backbone, PIXI) {

  var Controls = Backbone.View.extend({

    events: {
      'click a.regen': 'regenClicked'
    },

    initialize: function () {
      this.$el = $('#controls');
      this.render();
    },

    render: function () {
      this.$el.html('<a class="regen" href="#">regen map</a>');
    },

    regenClicked: function (evt) {
      evt.preventDefault();
      console.log('triggering');
      Backbone.trigger('regen');
    }

  });
  return Controls;
});
