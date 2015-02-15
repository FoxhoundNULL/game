define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils'
], function (_, $, Backbone, PIXI, Utils) {

  var Player = Backbone.View.extend({

    player: null,

    initialize: function (params) {
      this.env = params.env;
      this.render();
      this.listenTo(Backbone, 'regen', this.render);
      this.listenTo(Backbone, 'movePlayer', this.move);
    },

    move: function (dir) {
      console.log(dir);
      console.log(this.player);
    },

    render: function () {
      pos = this.findSpawn();
      console.log(pos);
      var x = this.env.tileOffsetX * pos.y;
      var y = this.env.tileOffsetY * pos.x;
      this.player = new PIXI.Graphics();
      this.player.beginFill(0xFF0000);
      this.player.drawRect(x, y, this.env.tileOffsetX, this.env.tileOffsetY);

      MAIN.stage.addChild(this.player);
    },

    findSpawn: function () {
      var width = this.env.mapWidth;
      var height = this.env.mapHeight;
      var empty = false;
      while (!empty) {
        var x = Utils.randIntWithinRangeInclusive(0, height - 1);
        var y = Utils.randIntWithinRangeInclusive(0, width - 1);
        empty = !this.env.map[x][y];
      }
      return { x: x, y: y };
    }

  });
  return Player;
});
