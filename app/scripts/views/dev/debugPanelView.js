define([
  'lodash',
  'jquery',
  'backbone',
  'pixi'
], function (_, $, Backbone, PIXI) {

  var DebugPanel = Backbone.View.extend({
    el: $('#debugPanel'),

    template: _.template($('[data-template-name="debugPanel"]').html()),

    events: {
      'click a.regen': 'regenClicked'
    },

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template());
    },

    regenClicked: function (evt) {
      evt.preventDefault();
      Backbone.trigger('regen');
    }

  });
  return DebugPanel;
});
