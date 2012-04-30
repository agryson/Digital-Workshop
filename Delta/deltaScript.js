"use strict"; 
var mainBoard, rowClick, cellClick;
function init() {
    mainBoard = document.getElementById('mainBoard');
    boardGen(); //we'll just fill a loop with random numbers to check it works...
}

function boardGen() {
        // creates a <tbody> element
        var tableBody = document.createElement("tbody");

        // creating all cells
        for (var j = 0; j < 21; j++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var i = 0; i < 21; i++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                var cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            // add the row to the end of the table body
            tableBody.appendChild(row);
        }

        // put the <tbody> in the <table>
        mainBoard.appendChild(tableBody);
        
        //this set up a listener for the row
        var rows = mainBoard.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var k = 0; k < rows.length; k++) {
            rows[k].onclick = function() {
            rowClick = this.rowIndex;
        };
    }
}

//this sets a listener for the cell
function clickCell(e) {
    var clicked;  
    if (e && ((clicked = e.target) || (clicked = e.srcElement))){
        cellClick = clicked.cellIndex;
    }
    alert("row: " + rowClick + " cell: " + cellClick);
}


function testBoard() {
    var i, j;
    console.log("huh?");
    for (i=0; i < 21; i++) {
        console.log(i);
        for (j=0; j < 21; j++){
            console.log(j);
            mainBoard.rows[i].cells[j].firstChild.data = rand();
        }
    }
}

function rand() {
    return Math.floor(Math.random()*10);
}