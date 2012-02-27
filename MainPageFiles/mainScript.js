/*The panels*/
var panel1;
var panel2;
var panel3;
var panel4;
var panel5;
var panel6;
var panel7;
/*And their array*/
var panelsArray = [];

/*The values to apply (can be easily edited, script wide, here)*/
var bump = 290;
var origWidth = 48;
var openWidth = 100;
var origHeight = 260;
var openHeight = 550;

function init() {                                                                                           //Initializes all variables and builds our reference array
    panel1 = document.getElementById("panel1");
    panel2 = document.getElementById("panel2");
    panel3 = document.getElementById("panel3");
    panel4 = document.getElementById("panel4");
    panel5 = document.getElementById("panel5");
    panel6 = document.getElementById("panel6");
    panel7 = document.getElementById("panel7");
    panelsArray = [                                                                                         //a single panelArray = [sequence #, id, bumpedOnce?, bumpedTwice?, open?]
        [1,panel1,false,false,false],
        [2,panel2,false,false,false],
        [3,panel3,false,false,false],
        [4,panel4,false,false,false],
        [5,panel5,false,false,false],
        [6,panel6,false,false,false],
        [7,panel7,false,false,false]
    ];
}

function expand(panel) {                                                                                    //expands clicked on panel, closing any other open ones and shifting other panels
    for(var i = 0; i < panelsArray.length; i++) {                                                           //loops through the array
        closeAll();                                                                                         //closes all other open panels
        if(panel === panelsArray[i][1]){                                                                    //locks onto the panel we've been passed
            shiftOthers(i);                                                                                 //shifts others to make room
			panelsArray[i][1].style.width = openWidth + "%";
			panelsArray[i][1].style.height = openHeight + "px";
        }
    }
    
}

function closeAll() {                                                                                       //loops through array and closes the open panel before returning all panels to starting positions
	for(var i = 0; i < panelsArray.length; i++) {
		if(panelsArray[i][4] === true) {
			panelsArray[i][1].style.width = origWidth + "%";
			panelsArray[i][1].style.height = origHeight + "px";
			startingPositions();
		}
	}
}

function startingPositions() {																				//Returns all shifted panels to their original positions
	for (var i = 0; i<panelsArray.length; i++) {
        if(panelsArray[i][2] === true){                                                                     //if shifted once, shift it back up one
            panelsArray[i][1].style.top = (parseInt(panelsArray[i][1].style.top, 10) - bump) + "px";
            panelsArray[i][2] = false;                                                                      //then reset our marker
		} else if (panelsArray[i][3] === true){                                                             //if shifted down twice, shift back up twice
			panelsArray[i][1].style.top = (parseInt(panelsArray[i][1].style.top, 10) - (bump * 2)) + "px";
			panelsArray[i][3] = false;                                                                      //then reset our marker
		}
	}
}

function shiftOthers(i) {                                                                                   //Shifts all but the clicked upon panel to make room for expansion
    var j;
	if (panelsArray[i][0]%2 === 0 && i < panelsArray.length) {                                              //if the panel is on the right (but stop at the last one)
		for (j = i-1; j < panelsArray.length; j++) {                                                        //for every panel after and the one to the left of it
			if (panelsArray[j][0]%2 !== 0) {                                                                //if it's odd (on the left)
				panelsArray[j][1].style.top = parseInt(panelsArray[j][1].style.top, 10) + (bump * 2) + "px";//bump it down twice
				panelsArray[j][3] = true;                                                                   //mark it as bumped down twice
			} else if(j !== i) {                                                                            //if it's on the right (and not the one we've clicked on)
				panelsArray[j][1].style.top = parseInt(panelsArray[j][1].style.top, 10) + (bump) + "px";    //bump it down once
				panelsArray[j][2] = true;                                                                   //mark it as bumped down once
			}
		}
	} else if (i < panelsArray.length) {																	//if the panel is on the left and not the last panel
		for (j = i+1; j < panelsArray.length; j++) {                                                        //for every panel after
			if (panelsArray[j][0]%2 === 0) {                                                                //if it's even (on the right)
				panelsArray[j][1].style.top = parseInt(panelsArray[j][1].style.top, 10) + (bump * 2) + "px";//bump it down twice
				panelsArray[j][3] = true;                                                                   //mark it as bumped down twice
			} else {                                                                                        //if it's on the left
				panelsArray[j][1].style.top = parseInt(panelsArray[j][1].style.top, 10) + (bump) + "px";    //bump it down once
				panelsArray[j][2] = true;                                                                   //mark it as bumped down once
			}
		}
	}
}