define([
  'lodash',
  'jquery',
  'backbone'
], function (_, $, Backbone) {

  return {
    randIntWithinRangeInclusive: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

});
