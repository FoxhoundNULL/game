define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils',
  'views/character/characterStatisticsView',
  'views/character/characterMovesView',
  'helpers/_collidableHelper'
], function (_, $, Backbone, PIXI, Utils, CharacterStatistics, CharacterMoves, _CollidableHelper) {
  'use strict';

  var Character = Backbone.View.extend(_.extend({}, _.clone(_CollidableHelper, true), {

    charType: null,

    image: '../../assets/images/characters/bunny.png',
    scale: { x: 1, y: 1 },

    stats: new CharacterStatistics(),
    moves: new CharacterMoves(),

    // movement
    walkSpeed: 3, // velocity increase amount
    stopSpeed: 1, // kind of like brake strength
    stopRate: 3, // number of frames to skip for slowdown interval
    maxVelocity: 3, // max speed
    collision: false, // can collide with walls?
    dir: { x: 0, y: 0 }, // direction
    vel: { x: 0, y: 0 }, // velocity
    keys: null, // tracks keyboard state

    initialize: function (params) {
      this.env = params.env;
      this.type = params.type;
      this.collision = params.collision;
      this.sprite = new PIXI.Sprite.fromImage(this.image),
      this.render();

      this.listenTo(Backbone, 'regen', this.render);
      this.listenTo(Backbone, 'step', this.step);
      this.setAdditionalListeners();
    },

    setAdditionalListeners: function () { /* override this if you want more listeners */ },

    step: function (frame) {
      if ((this.vel.x > 0 && this.vel.y > 0) && (!this.collision || this.canMove())) {
        this.sprite.position.x += (this.dir.x * this.vel.x);
        this.sprite.position.y += (this.dir.y * this.vel.y);
      }

      if (!(frame % this.stopRate) && this.noKeys()) { // slow down every this.slowRate
        this.vel.x = (this.vel.x > 0 ? this.vel.x - this.stopSpeed : this.vel.x);
        this.vel.y = (this.vel.y > 0 ? this.vel.y - this.stopSpeed : this.vel.y);
      }
    },

    noKeys: function () {
      var keys = [];
      _.each(this.keys, function (key) {
        if (key) { keys.push(key); }
      });
      return this.keys && !keys.length;
    },

    keysChanged: function (keys) {
      this.keys = keys;
      if (this.noKeys()) { return; } // don't cease movement immediately by zeroing out the dir vector
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
      var pos = this.findSpawn();
      var x = this.env.tileOffsetX * pos.y;
      var y = this.env.tileOffsetY * pos.x;

      this.sprite.position.x = x;
      this.sprite.position.y = y;
      this.sprite.scale.set(this.scale.x, this.scale.y);

      this.pos = this.sprite.position;

      MAIN.stage.addChild(this.sprite);
    },

    findSpawn: function () {
      var width = this.env.mapWidth;
      var height = this.env.mapHeight;
      var empty = false;
      var x, y;
      while (!empty) {
        x = Utils.randIntWithinRangeInclusive(0, height - 1);
        y = Utils.randIntWithinRangeInclusive(0, width - 1);
        empty = !this.env.map[x][y];
      }
      return { x: x, y: y };
    },

    canMove: function () {
      console.log('canmove');
      if (!this.collision) { return true; }
      var potentialCoords = {
        x: this.sprite.position.x + (this.dir.x * this.vel.x),
        y: this.sprite.position.y + (this.dir.y * this.vel.y),
      };

      var xMult = potentialCoords.x / MAIN.renderer.width;
      var yMult = potentialCoords.y / MAIN.renderer.height;

      var x = Math.round(xMult * this.env.mapWidth);
      var y = Math.round(yMult * this.env.mapHeight);
      var potentialMapSpot = this.env.map[y][x];
      return !potentialMapSpot;
    }

  }));
  return Character;
});
