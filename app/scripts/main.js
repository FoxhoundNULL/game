
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: '../bower_components/',
  paths: {
    lodash: 'lodash/lodash',
    jquery: 'jquery/dist/jquery',
    pixi: 'pixi/bin/pixi'
  }
});

requirejs([
  'lodash',
  'jquery',
  'pixi'
], function (_, $, Pixi) {
  var stage = new Pixi.Stage(0xCCCCCC);
  var renderer = Pixi.autoDetectRenderer(640, 360);
  document.body.appendChild(renderer.view);

  // set up animation loop
  requestAnimFrame(animate);

  var texture = Pixi.Texture.fromImage('assets/images/bunny.png');
  var bunny = new Pixi.Sprite(texture);

  // center the sprites anchor point
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // center the sprite
  bunny.position.x = renderer.width / 2;
  bunny.position.y = renderer.height / 2;

  stage.addChild(bunny);

  function animate() {
      requestAnimFrame(animate);

      bunny.rotation += 0.1;

      renderer.render(stage);
  }
});
