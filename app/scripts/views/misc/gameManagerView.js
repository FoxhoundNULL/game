define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'config'
], function (_, $, Backbone, PIXI, Config) {

  var GameManager = Backbone.View.extend({

    initialize: function (params) {
      this.listenTo(Backbone, 'collision', this.onCollision);
    },

    onCollision: function (collisions) {
      _.each(collisions, function (entities) {
        charTypes = _.pluck(entities, 'charType');
        // use _.isEqual here for deep comparision in case we need it later
        if (!_.isEqual(charTypes[0], charTypes[1])) { // if different charTypes ...
          Backbone.trigger('battleStart', entities); // ... start a battle
        }
      })
    }

  });
  return GameManager;
});
