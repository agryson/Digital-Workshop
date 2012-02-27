/*The panels*/
var panel1;
var panel2;
var panel3;
var panel4;
var panel5;
var panel6;
var panel7;
/*And their array*/
var panelsArray;

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
    panelsArray = [                                                                                         //a single panelArray = [sequence #, id, bumpedOnce?, bumpedTwice?, open?, top]
        [1,panel1,false,false,false,210],
        [2,panel2,false,false,false,210],
        [3,panel3,false,false,false,500],
        [4,panel4,false,false,false,500],
        [5,panel5,false,false,false,790],
        [6,panel6,false,false,false,790],
        [7,panel7,false,false,false,1080]
    ];
}

function expand(panel) {                                                                                    //expands clicked on panel, closing any other open ones and shifting other panels
    for(var i = 0; i < panelsArray.length; i++) {                                                           //loops through the array
        if(panel === panelsArray[i][1]){                                                                    //locks onto the panel we've been passed
            closeAll();                                                                                     //closes all other open panels
            shiftOthers(i);                                                                                 //shifts others to make room
			panelsArray[i][1].style.width = openWidth + "%";
			panelsArray[i][1].style.height = openHeight + "px";
            panelsArray[i][4] = true;
        }
    }
    
}

function closeAll() {                                                                                       //loops through array and closes the open panel before returning all panels to starting positions
	for(var j = 0; j < panelsArray.length; j++) {
		if (panelsArray[j][4] === true) {
            console.log(panelsArray[j][1].style.width);
			panelsArray[j][1].style.width = origWidth + "%";
			panelsArray[j][1].style.height = origHeight + "px";
            panelsArray[j][4] = false;
			startingPositions();
		}
	}
}

function startingPositions() {																				//Returns all shifted panels to their original positions
	var step = 0;
    while ( step < panelsArray.length) {
        console.log("startingPositions" + step);
        if(panelsArray[step][2] === true){                                                                     //if shifted once, shift it back up one
            panelsArray[step][5] -= bump;
            panelsArray[step][1].style.top = panelsArray[step][5] + "px";
            panelsArray[step][2] = false;                                                                      //then reset our marker
		} else if (panelsArray[step][3] === true){                                                             //if shifted down twice, shift back up twice
			panelsArray[step][5] -= (bump * 2);
            panelsArray[step][1].style.top = panelsArray[step][5] + "px";
			panelsArray[step][3] = false;                                                                      //then reset our marker
		}
        step++;	
    
    }
}

function shiftOthers(num) {                                                                                   //Shifts all but the clicked upon panel to make room for expansion
    console.log(num);
    var j = num - 1;
    if (j < 0) {
        j = 0;
    }
    console.log("j" + j);
	if (panelsArray[num][0]%2 === 0 && num < panelsArray.length) {                                              //if the panel is on the right (but stop at the last one)
        while (j < panelsArray.length) {                                                        //for every panel after and the one to the left of it
            if (panelsArray[j][0]%2 !== 0 && panelsArray[j][3] === false && panelsArray[j][2] === false) {                                                                //if it's odd (on the left)
				console.log(panelsArray[j][5]);
                panelsArray[j][5] += (bump * 2);
                panelsArray[j][1].style.top = panelsArray[j][5] + "px";//bump it down twice                    //it's applying this six times to same thing
                panelsArray[j][3] = true;//mark it as bumped down twice
                console.log(panelsArray[j][5]);			
            } else if(j !== num && panelsArray[j][3] === false && panelsArray[j][2] === false) {                                                                            //if it's on the right (and not the one we've clicked on)
				console.log("theory");
                panelsArray[j][5] += bump;
                panelsArray[j][1].style.top = panelsArray[j][5] + "px";    //bump it down once
				panelsArray[j][2] = true;                                                                   //mark it as bumped down once
            }
            j++;
		}
	} else if (num < panelsArray.length) {																	//if the panel is on the left and not the last panel
		while (j < panelsArray.length) {                                                        //for every panel after
			if (panelsArray[j][0]%2 === 0) {                                                                //if it's even (on the right)
				panelsArray[j][5] += (bump * 2);
                panelsArray[j][1].style.top = panelsArray[j][5] + "px";//bump it down twice
				panelsArray[j][3] = true;                                                                   //mark it as bumped down twice
			} else {                                                                                        //if it's on the left
				panelsArray[j][5] += bump;
                panelsArray[j][1].style.top = panelsArray[j][5] + "px";    //bump it down once                     //null bug here
				panelsArray[j][2] = true;                                                                   //mark it as bumped down once
			}
            j++;		
    	
		}
	}
}