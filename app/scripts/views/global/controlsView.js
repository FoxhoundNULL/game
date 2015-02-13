define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'views/dev/debugPanelView',
  'views/global/playerControlsView'
], function (_, $, Backbone, PIXI, DebugPanel, PlayerControls) {

  var Controls = Backbone.View.extend({

    initialize: function () {
      new DebugPanel();
      new PlayerControls();
    }
  });
  return Controls;
});
