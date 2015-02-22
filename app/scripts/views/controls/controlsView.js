define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'views/dev/debugPanelView',
  'views/controls/playerControlsView',
  'views/controls/battleControlsView'
], function (_, $, Backbone, PIXI, DebugPanel, PlayerControls, BattleControls) {

  var Controls = Backbone.View.extend({

    playerControls: null,
    battleControls: null,

    initialize: function (params) {
      new DebugPanel();
      this.playerControls = new PlayerControls();
      this.battleControls = new BattleControls();

      this[params.initialControls].start();

      this.listenTo(Backbone, 'battleStart', this.onBattleStart);
      this.listenTo(Backbone, 'battleEnd', this.onBattleEnd);
    },

    onBattleStart: function () {
      this.playerControls.stop();
      this.battleControls.start();
    },

    onBattleEnd: function () {
      this.battleControls.stop();
      this.playerControls.start();
    },
  });
  return Controls;
});
