/*This code was heavily inspired by this tutorial on DevX : 
    http://www.devx.com/webdev/10MinuteSolution/27134/0/page/1
I simply edited it to work with two paddles*/

//Add the various ids and vars necessary
var ball;
var paddle1;
var paddle2;
var scoreBoard;

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

/*Set vars to know if a key is down or not*/
var player1down = false;
var player1up = false;
var player2down = false;
var player2up = false;
var serveBar = false;

/*a var to know who the current player is and ace is for clean ball bounces in the 
hit() functions*/
var currentPlayer = 1;
var ace;

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
        p1up();
    }
    if (player1down === true) {
        p1down();
    }
    if (player2up === true) {
        p2up();
    }
    if (player2down === true) {
        p2down();
    }
}

/*code to serve ball, ensuring it's stationary first and checking who has it*/
function serve() {
    //if I don't check ball position too, a winning player can hold down serve to 
    //rapidly increment their score!
    if (dx === 0 && dy === 0 && ballPosX > 10 && ballPosX < 790) { 
        
        if (currentPlayer === 1) {
            hit1(true);
            
        } else {
            hit2(true);
        }
    }
}

/*Control the ball direction when it bounces on a paddle*/
function hit1(serve){
    if (serve === true) { //check to see if we're serving
        ace = Math.floor(Math.random() * 2 + 1); //and add some randomness
    } else {
        ace = dy; //or reflect normally
    }
    if (ballPosY > paddle1Pos + 15 && ballPosY < paddle1Pos +80) { 
                //middle of the racket
                dx = 10;
                dy = 0 + ace;
            } else if (ballPosY <= paddle1Pos + 15 && ballPosY >= paddle1Pos - 10) {
                //top part of racket
                dx = 10;
                dy = -5 - ace;
            } else if (ballPosY > paddle1Pos + 80 && ballPosY < paddle1Pos + 100) {
                //bottom part of racket
                dx = 10;
                dy = 5 + ace;
            }
}

/*Control the ball direction when it bounces on a paddle*/
function hit2(serve){
    if (serve === true) { //check to see if we're serving
        ace = Math.floor(Math.random() * 2 + 1); //and add some randomness
    } else {
        ace = dy; //or reflect normally
    }
    if (ballPosY > paddle2Pos + 15 && ballPosY < paddle2Pos +80) {
                //middle of the racket
                dx = -10;
                dy = 0 + ace;
            } else if (ballPosY <= paddle2Pos + 15 && ballPosY >= paddle2Pos - 10) {
                //top part of racket
                dx = -10;
                dy = -5 - ace;
            } else if (ballPosY > paddle2Pos + 80 && ballPosY < paddle2Pos + 100) {
                //bottom part of racket
                dx = -10;
                dy = 5 + ace;
            }
}

//code to move player 1 up
function p1up(){
    if (paddle1Pos > 0) {
        paddle1Pos -= 5;
        paddle1.style.top = paddle1Pos + "px";
    }
}

//code to move player 1 down
function p1down() {
    if (paddle1Pos < 500) {
        paddle1Pos += 5;
        paddle1.style.top = paddle1Pos + "px";
    }
}

//code to move player 2 up
function p2up(){
    if (paddle2Pos > 0) {
        paddle2Pos -= 5;
        paddle2.style.top = paddle2Pos + "px";
    }
}

//code to move player 2 down
function p2down() {
    if (paddle2Pos < 500) {
        paddle2Pos += 5;
        paddle2.style.top = paddle2Pos + "px";
    }
}

/*Check for collisions*/
function ping() {
    if (ballPosX < 20 - dx && dx !== 0) {
            hit1();
    }
    if (ballPosX > 770 - dx && dx !== 0) {
            hit2();
    }
    if (ballPosX <= 0 && dx !== 0) { 
        //If I don't check the ball speed (dx), the score will increment forever
        dx = 0; //should stop game here because we've moved beyond the back line
        dy = 0;
        scorePlayer2 += 1;
        reset(1);
    }
    if (ballPosX >= 790 && dx !== 0) {
        //If I don't check the ball speed, the score will increment forever
        dx = 0; //should stop game here because we've moved beyond the back line
        dy = 0;
        scorePlayer1 += 1;
        reset(2);
    }
    if (ballPosY <= 1 || ballPosY >= 589) {
        dy = dy * -1;
    }
}

/*reset the positions depending on which player's turn it is*/
function reset(player) {
    if (player === 1) {
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