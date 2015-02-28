define([
  'lodash',
  'jquery',
  'backbone',
  'views/menu/characterMovesMenuView',
  'pixi'
], function (_, $, Backbone, CharacterMovesMenu, PIXI) {
  'use strict';

  var BattleManager = Backbone.View.extend({

    stageSprite: new PIXI.Sprite.fromImage('../../assets/images/environments/stage.png'),
    controls: null,
    sprites: [], // all sprites should be added to this so they can be removed on cleanup
    characters: [],
    menus: [],

    initialize: function (params) {
      this.controls = MAIN.controls.battleControls;

      this.listenTo(Backbone, 'battleStart', this.startBattle);
      // this.listenTo(this.controls, 'all', this.keyPressed);
    },

    startBattle: function (characters) {
      console.log('battle between ' + characters);
      this.characters = characters;
      this.stopListening(Backbone, 'battleStart'); // battle started, don't listen for more

      this.drawStage();
      this.drawCharacters();
      this.drawMenus();

      // this.endBattle();
    },

    endBattle: function () {
      this.listenTo(Backbone, 'battleStart', this.startBattle);
      this.stopListening(this.controls, 'all');
      console.log(this.sprites);
      _.each(this.sprites, function (spr) { MAIN.stage.removeChild(spr); });
    },

    // keyPressed: function (key) {
    //   console.log(key);
    //   // _.each(this.characters, function (char) {
    //   //   console.log(char.stats);
    //   //   console.log(char.moves);
    //   //   console.log('--------------------');
    //   // }, this);
    // },

    drawStage: function () {
      this.stageSprite.position.x = 0;
      this.stageSprite.position.y = 0;

      this.stageSprite.scale.set(1, 1);

      MAIN.stage.addChild(this.stageSprite);
      this.sprites.push(this.stageSprite);
    },

    drawCharacters: function () {
      _.each(this.characters, function (char) {
        var sprite = new PIXI.Sprite.fromImage(char.image);

        sprite.scale.set(char.scale.x * 5, char.scale.y * 5);
        sprite.position = this.getCharacterPosition(char, sprite);

        MAIN.stage.addChild(sprite);
        this.sprites.push(sprite);
      }, this);
    },

    drawMenus: function () {
      _.each(this.characters, function (char) {
        if (char.charType == 'friendly') {
          var menu = new CharacterMovesMenu({
            character: char,
            controls: this.controls
          });

          menu.setPosition({ // bottom left
            x: 0,
            y: (MAIN.renderer.height - menu.getHeight())
          });

          this.listenTo(menu, 'select', this.makeMove);
          this.menus[char.cid] = menu;
          menu.show();
        }
      }, this);
    },

    makeMove: function (character, move) {
      console.log(character);
      console.log('MAKING MOVE');
      console.log(move);
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
