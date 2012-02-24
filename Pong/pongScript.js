//Insert link to devx article

//Add the various ids and vars necessary
var ball;
var paddle1;
var paddle2;

//set the speed vars (unlike in the tutorial, these will initially be 0 so that the
//player can "serve" the ball with the spacebar, also I'll have two different scores)
var dx = 0;
var dy = 0;
var currentPlayer = 1;
//set the other initial conditions, these match the original value for top and/or 
//left in the stylesheet
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var paddle1Pos = 250;
var paddle2Pos = 250;
var ballPosX = 295;
var ballPosY = 20;

//I don't need to set the initial conditions here because I've done it in the 
//stylesheet, but I'll still create an init function for the key listener
function init() {
    paddle1 = document.getElementById("paddle1");
    paddle2 = document.getElementById("paddle2");
    ball = document.getElementById("ball");
    document.onkeydown = keyListener;
}

//Now I set up the key listeners
function keyListener(e) {
    if (player1Move(e.keyCode) === false) {
        player2Move(e.keyCode);
    }
}    

    
    /*
    switch (e.keyCode) {
        case 38: //up arrow
            if (paddle2.style.top != '0px') {
                paddle2Pos -= 5;
                paddle2.style.top = paddle2Pos + "px";
            }
            break;
        
        case 40: //down arrow
            if (paddle2.style.top != '500px') {
                paddle2Pos += 5;
                paddle2.style.top = paddle2Pos + "px";
            }
            break;
            
        case 82: //r key
            if (paddle1.style.top != '0px') {
                paddle1Pos -= 5;
                paddle1.style.top = paddle1Pos + "px";
            }
            break;
        
        case 68: //d key
            if (paddle1.style.top != '500px') {
                paddle1Pos += 5;
                paddle1.style.top = paddle1Pos + "px";
            }
            break;
        default :
            console.log("Not an assigned key = " + e.keyCode);
    }*/


function player2Move(code) {
    switch (code) {
        case 38: //up arrow
            if (paddle2.style.top != '0px') {
                paddle2Pos -= 5;
                paddle2.style.top = paddle2Pos + "px";
                currentPlayer = 2;
            }
            break;
        
        case 40: //down arrow
            if (paddle2.style.top != '500px') {
                paddle2Pos += 5;
                paddle2.style.top = paddle2Pos + "px";
                currentPlayer = 2;
            }
            break;
        default:
            return false;
    }
}

function player1Move(code) {
    switch (code) {
        case 82: //r key
            if (paddle1.style.top != '0px') {
                paddle1Pos -= 5;
                paddle1.style.top = paddle1Pos + "px";
                currentPlayer = 1;
            }
            break;
        
        case 68: //d key
            if (paddle1.style.top != '500px') {
                paddle1Pos += 5;
                paddle1.style.top = paddle1Pos + "px";
                currentPlayer = 1;
            }
            break;
        default :
            return false;
    }
}

//If a player monopolizes the hold down key, I need to check if the other player is 
//trying to play too!
function monopoly(passedE) {
    var current = passedE;
    var last;
    if (current != last) {
        return false;
    } else {
        return true;
    }
}