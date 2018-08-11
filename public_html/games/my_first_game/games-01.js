var config = {
  width: 1024,
  height: 576,
  renderer: Phaser.AUTO,
  parent: 'mainActivity',
  state: {
      preload: preload,
      create: create,
      update: update,
      render: render
  }
};

var preLoadObj = {
  ball_10: {key: 'ball_10', img_src: 'images/ball10_40x40.png'},
  paddle: {key: 'paddle', img_src: 'images/paddle_x30.png'},
  start_logo: {key: 'start_logo', img_src: 'images/logo.png'}
};

var game = new Phaser.Game(config);

function preload() {
  game.stage.backgroundColor = '#263C7B';
  fullScreen();
  game.load.image(preLoadObj.ball_10.key, preLoadObj.ball_10.img_src);
  game.load.image(preLoadObj.paddle.key, preLoadObj.paddle.img_src);
  game.load.image(preLoadObj.start_logo.key, preLoadObj.start_logo.img_src);
}

var ball_10;
var paddle;
var scoreText;
var gameScore;
var main_logo;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  main_logo = game.add.sprite(game.world.centerX, game.world.centerY, preLoadObj.start_logo.key);
  main_logo.anchor.setTo(0.5, 0.5);

  game.time.events.add(Phaser.Timer.SECOND * 6, fadePicture, this);

  ball_10 = game.add.sprite(game.world.halfWidth, game.world.height - (game.world.height * 0.9), preLoadObj.ball_10.key);
  game.physics.enable(ball_10, Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;
  
  ball_10.anchor.set(0.5);
  ball_10.body.gravity.y = 0;
  ball_10.body.bounce.set(1);
  ball_10.body.speed = 10000;
  ball_10.body.collideWorldBounds = true;
  ball_10.checkWorldBounds = true;
  ball_10.events.onOutOfBounds.add(gameOver, this);
  ball_10.body.velocity.set(150, -150);
  
  
  paddle = game.add.sprite(game.world.width, game.world.height - 15, preLoadObj.paddle.key);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.anchor.set(0.5);
  paddle.body.immovable = true;
  
  /// ...
  scoreText = game.add.text(10, 10, 'Game score: 0', {font: "2em Press Start 2P", fill: '#fff'})


}

function update() {
  // moveBall(ball);
  game.physics.arcade.collide(ball_10, paddle);
  paddle.x = game.input.x || game.world.width * 0.6;
  // paddle.x = game.input.x;
  // paddle.y = game.input.y;

}

var info = 'ball_10.body.halfWidth';
function render() {
  game.debug.text("Info text: - " + info + ' >>> ' + ball_10.body.halfWidth, 10, game.world.height - 10, 'yellow', this.font = '16px "Arial"');
  game.debug.text("Info text: " + game.time.events.duration, 10, game.world.height - 50, 'yellow', this.font = '22px "Arial"');

}

var scaleType = {
  '0': 'NO_SCALE',
  '1': 'EXACT_FIT',
  '2': 'SHOW_ALL',
  '3': 'RESIZE',
  '4': 'USER_SCALE'
};

function fullScreen() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = false;
}

function gameOver() {
  alert('Game over!');
  location.reload();
}

function fadePicture() {
  game.add.tween(main_logo).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
}