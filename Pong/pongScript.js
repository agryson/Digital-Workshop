/*This code was heavily inspired by this tutorial on DevX : 
    http://www.devx.com/webdev/10MinuteSolution/27134/0/page/1
I simply edited it to work with two paddles*/

//Add the various ids and vars necessary
var ball, paddle1, paddle2, scoreBoard, ace;

/*set the speed vars (unlike in the tutorial, these will initially be 0 so that the
player can "serve" the ball with the spacebar)*/
var dx = 0;
var dy = 0;

/*set the other initial conditions, these match the original value for top and/or 
left in the stylesheet*/
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var paddle1Pos = 250;
var paddle2Pos = 250;
var ballPosX = 20;
var ballPosY = 295;
var padSpeed = 5;   //changint his value will change the speed with which the paddles move

/*Set vars to know if a key is down or not*/
var player1down = false;
var player1up = false;
var player2down = false;
var player2up = false;
var serveBar = false;

/*a var to know who the current player is and ace is for clean ball bounces in the 
hit() functions*/
var currentPlayer = 1;

/*When I click to start, I initialize everything and fade nicely from the start 
screen to the game*/
function start() {
    console.log("clicked start");
    init();
    document.getElementById("fadein").style.backgroundColor = "transparent";
    document.getElementById("fadein").style.color = "transparent";
    document.getElementById("startButton").style.color = "transparent";
    document.getElementById("startButton").style.backgroundColor = "transparent";
}

/*Initialize the various parts so that I can reference them and set the key listeners
before finally starting the main loop*/
function init() {
    paddle1 = document.getElementById("paddle1");
    paddle2 = document.getElementById("paddle2");
    ball = document.getElementById("ball");
    scoreBoard = document.getElementById("score");
    document.onkeydown = keydown;
    document.onkeyup = keyup;
    mainLoop();
}

/*detect when a key is depressed and mark relevant var*/
function keydown(e) {
    switch (e.keyCode) {
        case 82:
            player1up = true;
            break;
        case 68:
            player1down = true;
            break;
        case 38:
            player2up = true;
            break;
        case 40:
            player2down = true;
            break;
        case 32:
            serveBar = true;
            break;
        default:
            console.log("Key pressed is not assigned");
    }
}

/*detect when a key is released and mark relevant var*/
function keyup(e) {
    switch (e.keyCode) {
        case 38:
            player2up = false;
            break;
        case 40:
            player2down = false;
            break;
        case 82:
            player1up = false;
            break;
        case 68:
            player1down = false;
            break;
        case 32:
            serveBar = false;
            break;
        default:
            console.log("Key released is not assigned");
    }
}

/*code to incrementally move everything*/
function move(){
    ballPosX += dx;
    ballPosY += dy;
    ball.style.left = ballPosX + "px";
    ball.style.top = ballPosY + "px";
    
    if (serveBar === true) {
        serve();
    }
    
    if (player1up === true) {
        shift(1, 'up');
    }
    
    if (player1down === true) {
        shift(1, 'down');
    }
    
    if (player2up === true) {
        shift(2, 'up');
    }
    
    if (player2down === true) {
        shift(2, 'down');
    }
}

/*code to serve ball, ensuring it's stationary first and checking who has it*/
function serve() {
    //if I don't check ball position too, a winning player can hold down serve to 
    //rapidly increment their score!
    if (dx === 0 && dy === 0 && ballPosX > 10 && ballPosX < 790) { 
        
        if (currentPlayer === 1) {
            hit(true, 1);
            
        } else {
            hit(true, 2);
        }
    }
}

/*Control the ball direction when it bounces on a paddle*/
function hit(serve, player){
    var pad, invert;
    
    if (player == 1) {
        pad = paddle1Pos;
        invert = 1;
    } else {
        pad = paddle2Pos;
        invert = -1;
    }
    
    if (serve === true) { //check to see if we're serving
        ace = Math.floor(Math.random() * 2 + 1); //and add some randomness
    } else {
        ace = dy; //or reflect normally
    }
    
    if (ballPosY > pad + 15 && ballPosY < pad +80) { 
            //middle of the racket
            dx = 10 * invert;
            dy = 0 + ace;
        } else if (ballPosY <= pad + 15 && ballPosY >= pad - 10) {
            //top part of racket
            dx = 10 * invert;
            dy = -5 - ace;
        } else if (ballPosY > pad + 80 && ballPosY < pad + 100) {
            //bottom part of racket
            dx = 10 * invert;
            dy = 5 + ace;
        }
}

//shift() takes the player and direction and then moves the appropriate player's paddle in the appropriate direction
function shift(player, direction) {
    
    switch (player) {
        
        case 1:
            if (direction == 'up' && paddle1Pos > 0) {
                paddle1Pos -= padSpeed;
                paddle1.style.top = paddle1Pos + "px";
            } else if (direction == 'down' && paddle1Pos < 500) {
                paddle1Pos += padSpeed;
                paddle1.style.top = paddle1Pos + "px";
            }
            break;
            
        case 2:
            if (direction == 'up' && paddle2Pos > 0) {
                paddle2Pos -= padSpeed;
                paddle2.style.top = paddle2Pos + "px";
            } else if (direction == 'down' && paddle2Pos < 500) {
                paddle2Pos += padSpeed;
                paddle2.style.top = paddle2Pos + "px";
            }
            break;
            
        default:
            break;
    }
}

function ping() {
    
    if (dx !== 0) { //Ensure the ball is not stationary
        if (ballPosX < 20 - dx) {
                hit(false, 1);
        }
        
        if (ballPosX > 770 - dx) {
                hit(false, 2);
        }
        
        if (ballPosX <= 0) { 
            //If I don't check the ball speed (dx), the score will increment forever
            dx = 0; //should stop game here because we've moved beyond the back line
            dy = 0;
            scorePlayer2 += 1;
            reset(1);
        }
        
        if (ballPosX >= 790) {
            //If I don't check the ball speed, the score will increment forever
            dx = 0; //should stop game here because we've moved beyond the back line
            dy = 0;
            scorePlayer1 += 1;
            reset(2);
        }
        
        //reflect off of the bottom or top edges
        if (ballPosY <= 1 || ballPosY >= 589) {
            dy = dy * -1;
        }
    }
    
}

/*reset the positions depending on which player's turn it is*/
function reset(player) {
    if (player == 1) {
        ballPosX = 20;
        ballPosY = 295;
        ball.style.left = ballPosX + "px";
        ball.style.top = ballPosY + "px";
        currentPlayer = 1;
    } else {
        ballPosX = 770;
        ballPosY = 295;
        ball.style.left = ballPosX + "px";
        ball.style.top = ballPosY + "px";
        currentPlayer = 2;
    }
}

/*Show the scores*/
function updateScore() {
    scoreBoard.innerHTML = scorePlayer1 + "   :   " + scorePlayer2;
}

/*The main loop checks for collisions, then moves accordingly, updates the scores
and then repeats itself every 50ms*/
function mainLoop() {
    ping();
    move();
    updateScore();
    setTimeout(mainLoop, 50); //changing the time will change the FPS
}