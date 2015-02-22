define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'config'
], function (_, $, Backbone, PIXI, Config) {

  var BattleManager = Backbone.View.extend({

    initialize: function (params) {
      this.setListeners();
    },

    setListeners: function () {
      this.listenTo(Backbone, 'battleStart', this.startBattle);
      this.listenTo(MAIN.controls.battleControls, 'all', this.keyPressed);
    },

    startBattle: function (characters) {
      console.log('battle between ' + characters);
      this.stopListening(Backbone, 'battleStart'); // battle started, don't listen for more
      // *punch* *kick* x_x
      this.endBattle();
    },

    endBattle: function () {
      this.setListeners(); // listen for additional battles
    },

    keyPressed: function (key) {
      console.log(key);
    }

  });
  return BattleManager;
});
