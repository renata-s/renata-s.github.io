class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }

    if (player.x < this.x + enemy.width &&
        player.x + player.width > this.x &&
        player.y < this.y + enemy.height &&
        player.y + player.height > this.y) {
        player.x = 200;
        player.y = 400;
    }
};




// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-princess-girl.png';
    }
};

Player.prototype.update = function (dt) {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            if (this.x > 0) {
                this.x -= 102;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 102;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 85;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 85;
            }
            break;
    }

    if (this.y < 35) {
        this.y = 20;
        setTimeout(function () {
            player.x = 200;
            player.y = 400;
        }, 550);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemyPosition = [55, 140, 235];

enemyPosition.forEach(function (positionY) {
    enemy = new Enemy(0, positionY, 150);
    allEnemies.push(enemy);
});

const player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});