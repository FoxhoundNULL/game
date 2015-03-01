define([
  'lodash',
  'jquery',
  'backbone',
  'views/menu/characterMovesMenuView',
  'views/character/characterAiView',
  'pixi'
], function (_, $, Backbone, CharacterMovesMenu, CharacterAI, PIXI) {
  'use strict';

  var BattleManager = Backbone.View.extend({

    stageSprite: new PIXI.Sprite.fromImage('../../assets/images/environments/stage.png'),
    controls: null,
    sprites: [], // all sprites should be added to this so they can be removed on cleanup
    characters: [],
    activeCharacter: null, // the character whose turn it is
    menus: [],

    characterAI: null,

    initialize: function () {
      this.controls = MAIN.controls.battleControls;

      this.listenTo(Backbone, 'battleStart', this.startBattle);
      this.listenTo(this, 'characterDied', this.characterDied);
    },

    getCharacterOfType: function (type) {
      return _.find(this.characters, function (char) { return char.charType == type; });
    },

    startBattle: function (characters) {
      this.stopListening(Backbone, 'battleStart'); // battle started, don't listen for more
      this.characters = characters;
      this.activeCharacter = this.getCharacterOfType('friendly');

      this.characterAI = new CharacterAI({
        battleManager: this,
        character: this.getCharacterOfType('enemy')
      });

      this.drawStage();
      this.drawCharacters();
      this.drawMenus();
    },

    endBattle: function () {
      _.each(this.sprites, function (spr) { MAIN.stage.removeChild(spr); });
      _.invoke(this.menus, 'remove');
      this.menus = [];
      this.sprites = [];
      this.characters = [];

      this.listenTo(Backbone, 'battleStart', this.startBattle); // battle over, listen for more
    },

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

          this.listenTo(menu, 'select', this.moveSelected);
          menu.show();
          this.menus.push(menu);
        }
      }, this);
    },

    moveSelected: function (character, move) {
      var opponent = _.find(this.characters, function(char) { return char.cid != character.cid; });
      this.makeMove(character, opponent, move);
    },

    makeMove: function (moveMaker, moveReceiver, move) {
      console.log(moveMaker.charType + ' TURN BEGIN');

      moveReceiver.stats.hp = Math.max(moveReceiver.stats.hp - (moveMaker.stats.attack * move.dmgMult), 0);
      console.log(moveReceiver.charType + ' health: ' + moveReceiver.stats.hp);

      if (moveReceiver.stats.hp <= 0) {
        this.trigger('characterDied', moveReceiver);
      }

      console.log(moveMaker.charType + ' TURN END');

      this.trigger('moveMade', moveMaker, moveReceiver);
    },

    characterDied: function (character) {
      console.log('DIED: ');
      console.log(character);
      this.endBattle();
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
