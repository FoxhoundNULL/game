define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils'
], function (_, $, Backbone, PIXI, Utils) {

  var Player = Backbone.View.extend({

    playerSprite: null,
    walkSpeed: 4,

    initialize: function (params) {
      this.env = params.env;
      this.render();
      this.listenTo(Backbone, 'regen', this.render);
      this.listenTo(Backbone, 'keysChanged', this.keysChanged);
    },

    keysChanged: function (keys) {
      var dir = { x: 0, y: 0 };
      // keys in opposite direction neutralize movement
      if ((keys.left && keys.right) || (keys.up && keys.down)) {
        return;
      }
      if (keys.left || keys.right) { // horizontal
        dir.x = keys.left ? -1 : 1;
      }
      if (keys.up || keys.down) { // vertical
        dir.y = keys.up ? -1: 1;
      }
      if (this.canMove(dir)) {
        this.move(dir);
      }
    },

    canMove: function (dir) {
      var potentialCoords = {
        x: this.playerSprite.position.x + (dir.x * this.walkSpeed),
        y: this.playerSprite.position.y + (dir.y * this.walkSpeed),
      };

      var xMult = potentialCoords.x / MAIN.renderer.width;
      var yMult = potentialCoords.y / MAIN.renderer.height;

      var x = Math.round(xMult * this.env.mapWidth);
      var y = Math.round(yMult * this.env.mapHeight);
      var potentialMapSpot = this.env.map[y][x];
      return !potentialMapSpot;
    },

    move: function (dir) {
      this.playerSprite.position.x += (dir.x * this.walkSpeed);
      this.playerSprite.position.y += (dir.y * this.walkSpeed);
    },

    render: function () {
      pos = this.findSpawn();
      console.log(pos);
      var x = this.env.tileOffsetX * pos.y;
      var y = this.env.tileOffsetY * pos.x;
      this.playerSprite = new PIXI.Sprite.fromImage('../../assets/images/player.png');

      this.playerSprite.position.x = x;
      this.playerSprite.position.y = y;
      this.playerSprite.scale.set(0.25, 0.25);

      MAIN.stage.addChild(this.playerSprite);
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
