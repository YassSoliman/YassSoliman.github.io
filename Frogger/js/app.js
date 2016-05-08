var allEnemies=[];
var player;
var rows=[50, 133, 216];
var eps = 0.5;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = (Math.floor((Math.random()*200)+100));
    this.x = -150;
    this.y = rows[Math.floor(Math.random()*rows.length)];
    this.width = 101;
    this.height = 171;
    this.sprite = 'images/enemy-bug.png';
};

function checkCollisions() {
  for(var i=0; i<allEnemies.length; i++){
    if (((player.x - allEnemies[i].x) <= eps) && ((player.y - allEnemies[i].y) <= eps)){
      player.x = 202;
      player.y = 299;
    }
  }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    checkCollisions();
    this.x += this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 202;
  this.y = 299;
  this.width = 101;
  this.height = 171;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(event) {
  switch (event) {
    case 'up':
      if(this.y >= 133){
      this.y -= 83;
    } else {
      this.x = 202;
      this.y = 299;
      console.log("You win!");
    }
      break;
    case 'down':
    if(this.y <= 299){
      this.y += 83;
    } else {
      console.log("You cannot leave the scene!");
    }
      break;
    case 'left':
    if(this.x >= 101){
      this.x -= 101;
    } else {
      console.log("You cannot leave the scene!");
    }
      break;
    case 'right':
    if(this.x <= 303){
      this.x += 101;
    } else {
      console.log("You cannot leave the scene!");
    }
      break;
    default:
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
