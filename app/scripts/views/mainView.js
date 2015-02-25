define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'config'
], function (_, $, Backbone, PIXI, Config) {
  'use strict';

  var Main = Backbone.View.extend({

    stage: null,
    renderer: null,
    frame: 0,

    initialize: function () {
      this.stage = new PIXI.Stage(Config.stageColor);
      this.renderer = PIXI.autoDetectRenderer(Config.renderer.width, Config.renderer.height);
      this.render();
    },

    render: function () {
      $('#game')[0].appendChild(this.renderer.view);

      // set up animation loop
      requestAnimFrame(step);

      function step () {
        this.frame = (this.frame < 60 ? this.frame + 1 : 1);
        Backbone.trigger('step', frame);
        requestAnimFrame(step);
        MAIN.renderer.render(MAIN.stage);
      }
    }

  });
  return Main;
});
