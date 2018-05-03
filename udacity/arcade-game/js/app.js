/**
 * @description Enemy
 * @constructor
 */
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
};

/**
 * @description update the enemy's position
 * @param {dt} - ensure the game runs at the same speed for all computers.
 */
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -50;
        // Randomly setting the Enemy speed
        this.speed = 120 + Math.floor(Math.random() * 200);
    }

    // Handles enemies collision with the Player
    const width = 80;
    const height = 60;
    if (player.x < this.x + width &&
        player.x + width > this.x &&
        player.y < this.y + height &&
        player.y + height > this.y) {
        player.x = 200;
        player.y = 400;
    }
};

/**
 * @description draw the enemy on the screen
 */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Player
 * @constructor
 */
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-princess-girl.png';
        this.scoresElement = document.querySelector('.scores');
        this.scores = 0;
        this.scoresElement.innerHTML = this.scores;
    }
};

/**
 * @description the update method for the Player
 */
Player.prototype.update = function (dt) {

}

/**
 * @description player won game
 */
Player.prototype.won = function () {
    player.x = 200;
    player.y = 400;

    // When the player wins, show message "You Won!" and player get score
    alert("You Won!");
    this.scores++;
    this.scoresElement.innerHTML = this.scores;
}

/**
 * @description the render method for the Player
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

/**
 * @description the handleInput method, receive user input, allowedKeys (the key which was pressed) and move the player according to that input
 */
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

    // The game is won and player moving back to the initial location
    if (this.y < 35) {
        player.won();
    }
};

/**
 * @description all enemy objects placed in an array called allEnemies
 */
const allEnemies = [];
// Setting the Enemy initial location
const enemyPosition = [55, 140, 235];

enemyPosition.forEach(function (positionY) {
    enemy = new Enemy(0, positionY, 250);
    allEnemies.push(enemy);
});

/**
 * @description the player object placed in a variable called player
 */
const player = new Player(200, 400);

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});