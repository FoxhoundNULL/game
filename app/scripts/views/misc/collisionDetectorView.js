define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'config'
], function (_, $, Backbone, PIXI, Config) {

  var CollisionDetector = Backbone.View.extend({

    checkRate: 12, // frames to skip between each check

    initialize: function (params) {
      this.entities = params.entities;
      if (!this.validEntities()) {
        console.error('One or more entities do not have the required attributes for collision detection.');
        console.log(this.entities);
        return;
      }
      this.listenTo(Backbone, 'step', this.step);
    },

    step: function (frame) {
      if (!(frame % this.checkRate)) {
        var collisions = this.getCollisions();
        if (collisions.length) {
          Backbone.trigger('collision', collisions);
        }
      }
    },

    getCollisions: function () {
      this.setOccupiedCells();
      var collisions = [];
      _.each(this.entities, _.bind(function (ent) {
        _.each(this.entities, function (ent2) {
          if (ent !== ent2) {
            // using JSON.stringify to get arrays suitable for passing to _.intersection feels dirty
            // there is probably a more performant solution
            var a = _.map(ent.col.cells, function (cell) { return JSON.stringify(cell); });
            var b = _.map(ent2.col.cells, function (cell) { return JSON.stringify(cell); });
            var intersections = _.intersection(a, b);
            if (intersections.length) { // if the collider matrices intersect
              // if previous intersection isn't logically the same as this one
              // using _.isEqual instead of _.contains because we need deep comparison
              if (!_.isEqual(collisions[collisions.length - 1], [ent2, ent])) {
                collisions.push([ent, ent2]);
              }
            }
          }
        });
      }, this));
      return collisions;
    },

    setOccupiedCells: function () {
      _.each(this.entities, function (ent) {
        var xRadius = Math.floor(ent.dim.x / 2);
        var yRadius = Math.floor(ent.dim.y / 2);

        var startX = ent.pos.x - xRadius;
        var finishX = ent.pos.x + xRadius;
        var startY = ent.pos.y - yRadius;
        var finishY = ent.pos.y + yRadius;

        ent.col.cells = [];
        for (var i = startY; i <= finishY; i++) {
          for (var j = startX; j <= finishX; j++) {
            ent.col.cells.push([j, i]);
          }
        }
      });
    },

    validEntities: function () {
      var valid = true;
      _.each(this.entities, function (ent) {
        valid = valid && ('dim' in ent) && ('pos' in ent) && ('col' in ent);
      });
      return valid;
    },
  });
  return CollisionDetector;
});
