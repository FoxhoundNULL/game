define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'utils'
], function (_, $, Backbone, PIXI, Utils) {
  'use strict';

  return {
    // these are needed for collision detection, see collisionDetectorView
    dim: { x: 15, y: 15 }, // dimension
    pos: { x: 0, y: 0 }, // position
    col: { cells: [] }, // collision info
  };
});
