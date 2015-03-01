define([
  'lodash',
  'jquery',
  'backbone',
], function (_, $, Backbone) {
  'use strict';

  var CharacterAiView = Backbone.View.extend({

    battleManager: null,
    character: null,
    opponent: null,

    isMyTurn: false,

    initialize: function (params) {
      this.character = params.character;
      this.battleManager = params.battleManager;
      this.isMyTurn = this.battleManager.activeCharacter == this.character;

      this.listenTo(this.battleManager, 'moveMade', this.moveMade);
    },

    moveMade: function (moveMaker, moveReceiver) {
      this.isMyTurn = moveReceiver == this.character;
      this.opponent = moveMaker;
      if (this.isMyTurn) {
        this.takeTurn();
      }
    },

    takeTurn: function () {
      var move = this.character.moves.moves[0];
      this.battleManager.makeMove(this.character, this.opponent, move);
    }

  });
  return CharacterAiView;
});
