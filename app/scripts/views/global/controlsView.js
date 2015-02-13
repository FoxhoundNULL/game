define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'views/dev/debugPanelView'
], function (_, $, Backbone, PIXI, DebugPanel) {

  var Controls = Backbone.View.extend({

    initialize: function () {
      new DebugPanel({
        el: $('#debugPanel')
      });
    }
  });
  return Controls;
});
