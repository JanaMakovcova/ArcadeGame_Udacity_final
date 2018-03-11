// Enemies our player must avoid
var Enemy = function() {
    //move enemies outside canvas
    this.x = -101;
    this.y = 150;
    //random speed for enemies
    this.move = Math.floor(Math.random()*300) + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        this.x += this.move*dt;
    } else {
        this.x = -101;
    }
    this.collision(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//player class
var Player = function() {
    //image of player
    this.sprite = 'images/char-pink-girl.png';
    
};
//counts collision of two object based on left up and right down corner and compairing values
//for this function i had to resize provided images of enemies and player
Enemy.prototype.collision = function(player) {
    const playerAX = player.x;
    const playerAY = player.y;

    const playerBX = player.x + Resources.get(player.sprite).width;
    const playerBY = player.y + Resources.get(player.sprite).height;

    const enemyAX = this.x;
    const enemyAY = this.y;

    const enemyBX = this.x + Resources.get(this.sprite).width;
    const enemyBY = this.y + Resources.get(this.sprite).height;

    if (playerAX <= enemyBX && playerAY <= enemyBY && enemyAX <= playerBX && enemyAY <= playerBY){
        //increase counter of collisions
        //for each collisions 10 points minus from total points
        ++crash;
        value = value - 10;
        if (value <= 0) {
            stop();
            afterGameOver();
            value = 0;
        }
        document.getElementById("timer").innerHTML = value;
        player.reset();
    } else {
        return;
    }
};

Player.prototype.update = function() {

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Set player starter position to the bottom of canvas
Player.prototype.reset = function(){
    this.x = 210;
    this.y = 470;
};

Player.prototype.handleInput = function(direction) {
    //moving on squares
    //just on canvas, not out of it
    const stepUP = 83;
    const stepLeft = 101;
    switch (direction) {
        case "left":
            //no move left out of canvas
            if (this.x > 50) {
                this.x = this.x - stepLeft;
            }
            break;
        case "up":
            //no move up out of canvas
            if (this.y > 100) {
                //reaching water
                if (this.y < 150 && this.y > 100){
                    stop();
                    afterGameOver();
                }
                this.y = this.y - stepUP;
            }
            break;
        case "right":
            //no move right out of canvas
            if (this.x < 400) {
                this.x = this.x + stepLeft;
            }
            break;
        case "down":
            //no move down out of canvas
            if (this.y < 470)  {
                this.y = this.y + stepUP;
            }
            break;
        default:
            return;
    }

};

//timer for game starts at 120 seconds and counting down to 0.
function changeValue() {
    --value;
    //show timer
    document.getElementById("timer").innerHTML = value;
    if (value <= 0)  {
        stop();
        afterGameOver();
    }
}

function start() {
    stop(); // stoping the previous counting (if any)
    value = 120;
    document.getElementById("timer").innerHTML = value;
    timerInterval = setInterval(changeValue, 1000);
}

function stop() {
    clearInterval(timerInterval);
}

function afterGameOver() {
    //when modal popups
    // remove listeners from GameStart button and
    // remove listener from player, remove bugs (to prevent playing when game ends)
    document.removeEventListener('keyup',listenToArrow );
    document.getElementById('start').removeEventListener('click',initGameComponents);
    allEnemies = [];

    //creating popup button after game is over
    const buttonOver = document.createElement('button');
    const divOver = document.createElement('div');
    //const head = document.getElementById('head');
    const allContent = document.getElementById('game-modal');
    const spanGameOver1 = document.createElement('p');
    const spanGameOver2 = document.createElement('p');
    const spanGameOver3 = document.createElement('p');
    const buttonOk = document.createElement('button');
    divOver.setAttribute('id', 'modal-inner');
    buttonOver.appendChild(divOver);

    //win game
    if (value > 0)   {
    spanGameOver1.textContent = 'You WON the game';
    spanGameOver2.textContent = "Total collisions with bugs: " + crash;
    buttonOk.textContent = 'OK';
    spanGameOver3.textContent = "Total points: " + value;  }
    else {
        //loose game
        spanGameOver1.textContent = 'You LOST the game';
        spanGameOver2.textContent = "Total collisions with bugs: " + crash;
        buttonOk.textContent = 'OK';
        //count minutes and seconds from value
        spanGameOver3.textContent = "No points left";
    }
    divOver.appendChild(spanGameOver1);
    divOver.appendChild(spanGameOver2);
    divOver.appendChild(spanGameOver3);
    divOver.appendChild(buttonOk);
    buttonOver.setAttribute('id', 'button-over');
    allContent.appendChild(buttonOver);
    buttonOver.style.display = "block";
    //stop timer
    stop();
    //on click on button Ok, close popup
    function closePop(event){
        if (event.target == buttonOk) {
            buttonOver.style.display = "none";
            cleanGameComponents();
            document.getElementById('start').addEventListener('click',initGameComponents);
        }
    }
    buttonOk.addEventListener('click',closePop);
}

let allEnemies  = [];
let player = new Player();
let timerInterval = null;
let crash = 0;
// remove all enemies from array
// reset counter for collisions and timer
function cleanGameComponents(){
    allEnemies = [];
    crash = 0;
    timerInterval = null;
    document.getElementById("timer").innerHTML = 120;
}

function initGameComponents(){
    cleanGameComponents();
    player.reset();
    // Place all enemy objects in an array called allEnemies
    for (let i = 0; i < 3; i++) {
        const enemy = new Enemy();
        enemy.y = enemy.y + i*80;
        enemy.x = - 100 * i;
        allEnemies.push(enemy);
    }
    //add listener for arrow keys
    document.addEventListener('keyup',listenToArrow );
    start();
}

//listener for player - moving on arrow keys
function listenToArrow (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

document.getElementById('start').addEventListener('click',initGameComponents);



