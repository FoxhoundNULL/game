define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'config'
], function (_, $, Backbone, PIXI, Config) {

  var DungeonGenerator = Backbone.View.extend({

    map: [[]],
    mapWidth: 72,
    mapHeight: 48,
    initialWallChance: 0.4,
    becomeEmptyLimit: 3,
    becomeWallLimit: 4,
    numSteps: 8,
    tileOffsetX: 0,
    tileOffsetY: 0,

    initialize: function () {
      this.generateMap();
      this.render();
      this.listenTo(Backbone, 'regen', this.regenMap);
      return this.map;
    },

    regenMap: function () {
      this.generateMap();
      this.render();
    },

    render: function () {
      MAIN.stage.removeChildren();
      this.tileOffsetX = Math.floor(MAIN.renderer.width / this.mapWidth);
      this.tileOffsetY = Math.floor(MAIN.renderer.height / this.mapHeight);

      for (var i = 0; i < this.map.length; i++) {
        for (var j = 0; j < this.map[i].length; j++) {
          if (this.map[i][j]) {
            var x = this.tileOffsetX * j;
            var y = this.tileOffsetY * i;
            var tile = new PIXI.Graphics();
            tile.beginFill(0x999999);
            tile.drawRect(x, y, this.tileOffsetX, this.tileOffsetY);

            MAIN.stage.addChild(tile);
          }
        }
      }
    },

    generateMap: function () {
      var map = this.initMap(map);

      for (var i = 0; i < this.numSteps; i++) {
        map = this.step(map);
      }

      this.map = map;
    },

    initMap: function () {
      var map = [[]];
      for (var x = 0; x < this.mapHeight; x++) {
        map[x] = [];
        for (var y = 0; y < this.mapWidth; y++){
          map[x][y] = 0;
        }
      } // 0 out the map

      for (var x = 0; x < this.mapHeight; x++) {
        for (var y = 0; y < this.mapWidth; y++) {
          if (Math.random() < this.initialWallChance) {
            map[x][y] = 1;
          }
        }
      }
      return map;
    },

    step: function (map) {
      var newmap = [[]];
      for (var x = 0; x < map.length; x++) {
        newmap[x] = [];
        for (var y = 0; y < map[0].length; y++) {
          //Count up the neighbours
          var nbs = this.numAliveNeighbours(map, x, y);
          if (map[x][y] > 0) { // solid
            newmap[x][y] = (nbs < this.becomeEmptyLimit ? 0 : 1);
          } else { // empty
            newmap[x][y] = (nbs > this.becomeWallLimit ? 1 : 0);
          }
        }
      }
      return newmap;
    },

    numAliveNeighbours: function (map, x, y) {
      var count = 0;
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
          var neighborsX = i + x;
          var neighborsY = j + y;

          var tileItself = (i == 0 && j == 0);
          var atEdge = neighborsX < 0 || neighborsY < 0 || neighborsX >= map.length || neighborsY >= map[0].length;
          if (tileItself) { // the tile itself, do nothing
            // no op
          } else if (atEdge) { // if at the edge, consider it to be solid
            count += 1; // or do nothing here to have non solid walls
          } else if (map[neighborsX][neighborsY] == 1) { // neighbor is solid
            count += 1;
          }
        }
      }
      return count;
    }
  });
  return DungeonGenerator;
});
