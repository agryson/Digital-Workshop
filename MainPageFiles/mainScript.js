/*The panels*/
var panel1;
var panel2;
var panel3;
var panel4;
var panel5;
var panel6;
var panel7;

/*Track if a panel is open or not*/
var panel1Open = false;
var panel2Open = false;
var panel3Open = false;
var panel4Open = false;
var panel5Open = false;
var panel6Open = false;
var panel7Open = false;

/*a panelArray starts with its number, id, odd? and open?*/

var panelsArray = [];

var bump = 290;


function init() {
    panel1 = document.getElementById("panel1");
    panel2 = document.getElementById("panel2");
    panel3 = document.getElementById("panel3");
    panel4 = document.getElementById("panel4");
    panel5 = document.getElementById("panel5");
    panel6 = document.getElementById("panel6");
    panel7 = document.getElementById("panel7");
    panelsArray = [[1,panel1,true,false],[2,panel2,false,false],[3,panel3,true,false],[4,panel4,false,false],[5,panel5,true,false],[6,panel6,false,false],[7,panel7,true,false]];
}

function expand(panel) {
    console.log(panel + panelsArray[1][0]);
    console.log("panel + panelsArray[i][0]");
    var i;
    for(i=0; i<7; i++) { //loops through the array
        if(panel === panelsArray[i][1]){ //locks onto the panel we've been passed
            console.log(panel + panelsArray[i][0]);
        }
    }
    
}