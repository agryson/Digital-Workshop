var projectsWOpen = 950;
var plansWOpen = 900;
var linksWOpen = 850;
var projectsWClosed = 150;
var plansWClosed = 100;
var linksWClosed = 50;

var openAbout = function() {
    if (document.getElementById("projects").style.width > (projectsWClosed + "px")) {
		document.getElementById("projects").style.width = projectsWClosed + "px";
	}
	if (document.getElementById("plans").style.width > (plansWClosed + "px")){
		document.getElementById("plans").style.width = plansWClosed + "px";
	}
	if (document.getElementById("links").style.width > (linksWClosed + "px")) {
		document.getElementById("links").style.width = linksWClosed + "px";
	}
};

var openProjects = function(obj) {
	obj.style.width = projectsWOpen + "px";
	if (document.getElementById("plans").style.width > (plansWClosed + "px")){
		document.getElementById("plans").style.width = plansWClosed + "px";
	}
	if (document.getElementById("links").style.width > (linksWClosed + "px")) {
		document.getElementById("links").style.width = linksWClosed + "px";
	}
};

var openPlans = function(obj) {
	obj.style.width = plansWOpen + "px";
	if (document.getElementById("projects").style.width < (projectsWOpen + "px")){
		document.getElementById("projects").style.width = projectsWOpen + "px";
	} 
	if (document.getElementById("links").style.width > (linksWClosed + "px")) {
		document.getElementById("links").style.width = linksWClosed + "px";
	}
};

var openLinks = function(obj) {
	obj.style.width = linksWOpen + "px";
	if (document.getElementById("projects").style.width < projectsWOpen + "px"){
		document.getElementById("projects").style.width = "950px";
	}
	if (document.getElementById("plans").style.width < plansWOpen + "px") {
		document.getElementById("plans").style.width = "900px";
	}
};

var popOut = function(id) {
	console.log("called id " + id);
	document.getElementById("popBack").style.display = "inherit";
	document.getElementById("popBox").style.display = "inherit";
    document.getElementById("popBox").style.height = "600px";
    switch(id) {
        case document.getElementById("pongThumb"):
            document.getElementById("popBox").innerHTML = "<iframe id='pongFrame' src='../Pong/pong.html' scrolling='no'></iframe>";
            break;
        default:
        
    }
    
};

function popAway() {
    document.getElementById("popBack").style.display = "none";
    document.getElementById("popBox").style.display = "none";
}