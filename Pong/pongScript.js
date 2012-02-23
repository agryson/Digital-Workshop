//Insert link to devx article

//Add the various ids and vars necessary
var ball = document.getElementById("ball");
var paddle1 = document.getElementById("paddle1");
var paddle2 = document.getElementById("paddle2");

//set the speed vars (unlike in the tutorial, these will initially be 0 so that the
//player can "serve" the ball with the spacebar, also I'll have two different scores)
var dx = 0;
var dy = 0;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var paddle1Pos = parseInt(paddle1.style.top, 10); /* I should really instantiate these in the init function
var paddle2pos = parseInt(paddle2.style.top, 10);
var ballPosX = parseInt(ball.style.left, 10);
var ballPosY = parseInt(ball.style.top, 10);

//I don't need to set the initial conditions here because I've done it in the 
//stylesheet, but I'll still create an init function for the key listener
function init() {
    document.onKeyDown = keyListener;
}

//Now I set up the key listeners
function keyListener(e) {
    if(!e) {
        //tests for IE
        e = window.event;
    }
    switch(e.keycode) {
        case 38:
            paddle2Pos += 4;
            brea
    }
}