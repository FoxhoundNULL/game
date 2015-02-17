define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils'
], function (_, $, Backbone, PIXI, Utils) {

  var Player = Backbone.View.extend({

    playerSprite: null,
    keys: null,
    walkSpeed: 3,
    stopSpeed: 1,
    stopRate: 3, // number of frames to skip for slowdown interval
    dir: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    maxVelocity: 3,

    initialize: function (params) {
      this.env = params.env;
      this.render();
      this.listenTo(Backbone, 'regen', this.render);
      this.listenTo(Backbone, 'keysChanged', this.keysChanged);
      this.listenTo(Backbone, 'step', this.step);
    },

    step: function (frame) {
      if (this.vel.x > 0 && this.vel.y > 0 &&   this.canMove()) {
        this.playerSprite.position.x += (this.dir.x * this.vel.x);
        this.playerSprite.position.y += (this.dir.y * this.vel.y);
      }

      if (!(frame % this.stopRate) && this.noKeys()) { // slow down every this.slowRate
        this.vel.x = (this.vel.x > 0 ? this.vel.x - this.stopSpeed : this.vel.x);
        this.vel.y = (this.vel.y > 0 ? this.vel.y - this.stopSpeed : this.vel.y);
      }
    },

    noKeys: function () {
      var keys = [];
      _.each(this.keys, function (key) {
        key && keys.push(key);
      });
      return !keys.length;
    },

    keysChanged: function (keys) {
      this.keys = keys;
      if (this.noKeys()) { return }; // don't cease movement immediately by zeroing out the dir vector
      var dir = { x: 0, y: 0 };
      // keys in opposite direction do nothing
      if ((keys.left && keys.right) || (keys.up && keys.down)) {
        return;
      }
      if (keys.left || keys.right) { // horizontal
        dir.x = keys.left ? -1 : 1;
      }
      if (keys.up || keys.down) { // vertical
        dir.y = keys.up ? -1: 1;
      }
      this.dir = dir;
      this.setVelocity();
    },

    setVelocity: function () {
      this.vel.x = Math.min(this.vel.x + this.walkSpeed, this.maxVelocity);
      this.vel.y = Math.min(this.vel.y + this.walkSpeed, this.maxVelocity);
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
    },

    canMove: function () {
      var potentialCoords = {
        x: this.playerSprite.position.x + (this.dir.x * this.walkSpeed),
        y: this.playerSprite.position.y + (this.dir.y * this.walkSpeed),
      };

      var xMult = potentialCoords.x / MAIN.renderer.width;
      var yMult = potentialCoords.y / MAIN.renderer.height;

      var x = Math.round(xMult * this.env.mapWidth);
      var y = Math.round(yMult * this.env.mapHeight);
      var potentialMapSpot = this.env.map[y][x];
      return !potentialMapSpot;
    }

  });
  return Player;
});
