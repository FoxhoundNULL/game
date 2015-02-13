define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'config'
], function (_, $, Backbone, PIXI, Config) {

  var Main = Backbone.View.extend({

    stage: null,
    renderer: null,

    initialize: function () {
      this.stage = new PIXI.Stage(Config.stageColor);
      this.renderer = PIXI.autoDetectRenderer(Config.renderer.width, Config.renderer.height);
      this.render();
    },

    render: function () {
      document.body.appendChild(this.renderer.view);
    }

  });
  return Main;
});
