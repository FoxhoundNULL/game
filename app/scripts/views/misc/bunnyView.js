define([
  'lodash',
  'jquery',
  'backbone',
  'pixi',
  'config'
], function (_, $, Backbone, PIXI, Config) {

  var Bunny = Backbone.View.extend({

    initialize: function () {
      this.render();
    },

    render: function () {
      // set up animation loop
      requestAnimFrame(animate);

      var texture = PIXI.Texture.fromImage('../../assets/images/bunny.png');
      var bunny = new PIXI.Sprite(texture);

      // center the sprites anchor point
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // center the sprite
      bunny.position.x = MAIN.renderer.width / 2;
      bunny.position.y = MAIN.renderer.height / 2;

      MAIN.stage.addChild(bunny);

      function animate () {
        requestAnimFrame(animate);
        bunny.rotation += 0.1;
        MAIN.renderer.render(MAIN.stage);
      }
    }

  });
  return Bunny;
});
