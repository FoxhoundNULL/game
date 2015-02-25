define([
  'lodash',
  'jquery',
  'backbone',
  'pixi'
], function (_, $, Backbone, PIXI) {
  'use strict';

  var BattleManager = Backbone.View.extend({

    stageSprite: new PIXI.Sprite.fromImage('../../assets/images/environments/stage.png'),
    controls: null,
    sprites: [], // all sprites should be added to this so they can be removed on cleanup
    characters: [],

    initialize: function (params) {
      this.controls = MAIN.controls.battleControls;

      this.listenTo(Backbone, 'battleStart', this.startBattle);
      this.listenTo(this.controls, 'all', this.keyPressed);
    },

    startBattle: function (characters) {
      console.log('battle between ' + characters);
      this.characters = characters;
      this.stopListening(Backbone, 'battleStart'); // battle started, don't listen for more

      this.drawStage();
      this.drawCharacters();


      // this.endBattle();
    },

    endBattle: function () {
      this.listenTo(Backbone, 'battleStart', this.startBattle);
      this.stopListening(this.controls, 'all');
      console.log(this.sprites);
      _.each(this.sprites, function (spr) { MAIN.stage.removeChild(spr); });
    },

    keyPressed: function (key) {
      console.log(key);
    },

    drawStage: function () {
      this.stageSprite.position.x = 0;
      this.stageSprite.position.y = 0;

      this.stageSprite.scale.set(1, 1);

      MAIN.stage.addChild(this.stageSprite);
      this.sprites.push(this.stageSprite);
    },

    drawCharacters: function () {
      _.each(this.characters, _.bind(function (char) {
        console.log('char');
        var sprite = new PIXI.Sprite.fromImage(char.image);

        sprite.scale.set(char.scale.x * 5, char.scale.y * 5);
        sprite.position = this.getCharacterPosition(char, sprite);

        MAIN.stage.addChild(sprite);
        this.sprites.push(sprite);
      }, this));
    },

    getCharacterPosition: function (char, sprite) {
      var pos = { // player on left, enemy on right
        x: (MAIN.renderer.width * (char.charType == 'friendly' ? 0.25 : 0.75)) - (sprite.width / 2),
        y: MAIN.renderer.height / 2
      };
      return new PIXI.Point(pos.x, pos.y);
    }

  });
  return BattleManager;
});
