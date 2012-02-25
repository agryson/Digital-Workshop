//Insert link to devx article

//Add the various ids and vars necessary
var ball;
var paddle1;
var paddle2;
var scoreBoard;

//set the speed vars (unlike in the tutorial, these will initially be 0 so that the
//player can "serve" the ball with the spacebar, also I'll have two different scores)
var dx = 0;
var dy = 0;

//set the other initial conditions, these match the original value for top and/or 
//left in the stylesheet
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var paddle1Pos = 250;
var paddle2Pos = 250;
var ballPosX = 20;
var ballPosY = 295;

//Set vars to know if a key is down or not
var player1down = false;
var player1up = false;
var player2down = false;
var player2up = false;
var serveBar = false;
var currentPlayer = 1;

var ace;

function init() {
    paddle1 = document.getElementById("paddle1");
    paddle2 = document.getElementById("paddle2");
    ball = document.getElementById("ball");
    scoreBoard = document.getElementById("score");
    document.onkeydown = keydown;
    document.onkeyup = keyup;
    document.getElementById("fadein").style.backgroundColor = "transparent";
    mainLoop();
}

//detect when a key is depressed and mark relevant var
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

//detect when a key is released and mark relevant var
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

//code to set various movements in place
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

//code to serve ball, ensuring it's stationary first and checking who has it
function serve() {
    if (dx === 0 && dy === 0 && ballPosX > 10 && ballPosX < 790) { //if I don't check ball position too, a winning player can hold down serve to rapidly increment their score!
        
        if (currentPlayer === 1) {
            hit1();
            
        } else {
            hit2();
        }
    }
}

function hit1(serve){
    if (serve === true) {
        ace = Math.floor(Math.random() * 2 + 1);
    } else {
        ace = dy;
    }
    if (ballPosY > paddle1Pos + 15 && ballPosY < paddle1Pos +80) { //middle of the racket
                dx = 10;
                dy = 0 + ace;
            } else if (ballPosY <= paddle1Pos + 15 && ballPosY >= paddle1Pos - 10) { //top part of racket
                dx = 10;
                dy = -5 - ace * -1;
            } else if (ballPosY > paddle1Pos + 80 && ballPosY < paddle1Pos + 100) { //bottom part of racket
                dx = 10;
                dy = 5 + ace;
            }
}

function hit2(serve){
    if (serve === true) {
        ace = Math.floor(Math.random() * 2 + 1);
    } else {
        ace = dy;
    }
    if (ballPosY > paddle2Pos + 15 && ballPosY < paddle2Pos +80) {
                dx = -10;
                dy = 0 + ace;
            } else if (ballPosY <= paddle2Pos + 15 && ballPosY >= paddle2Pos - 10) {
                dx = -10;
                dy = -5 - ace * -1;
            } else if (ballPosY > paddle2Pos + 80 && ballPosY < paddle2Pos + 100) {
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

function ping() {
    if (ballPosX < 20 - dx && dx !== 0) {
            hit1();
    }
    if (ballPosX > 770 - dx && dx !== 0) {
            hit2();
    }
    if (ballPosX === 0 && dx !== 0 && dy !== 0) { //If I don't check the ball speed, the score will increment forever
        dx = 0; //should stop game here because we've moved beyond the back line
        dy = 0;
        scorePlayer2 += 1;
        reset(1);
    }
    if (ballPosX === 790 && dx !== 0 && dy !== 0) { //If I don't check the ball speed, the score will increment forever
        dx = 0; //should stop game here because we've moved beyond the back line
        dy = 0;
        scorePlayer1 += 1;
        reset(2);
    }
    if (ballPosY <= 0 || ballPosY >= 590) {
        dy = dy * -1;
    }
}

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

function updateScore() {
    scoreBoard.innerHTML = scorePlayer1 + "   :   " + scorePlayer2;
}

function mainLoop() {
    ping();
    move();
    updateScore();
    setTimeout("mainLoop();", 50);
}