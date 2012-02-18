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
}

var openProjects = function(obj) {
	obj.style.width = projectsWOpen + "px";
	if (document.getElementById("plans").style.width > (plansWClosed + "px")){
		document.getElementById("plans").style.width = plansWClosed + "px";
	}
	if (document.getElementById("links").style.width > (linksWClosed + "px")) {
		document.getElementById("links").style.width = linksWClosed + "px";
	}
}

var openPlans = function(obj) {
	obj.style.width = plansWOpen + "px";
	if (document.getElementById("projects").style.width < (projectsWOpen + "px")){
		document.getElementById("projects").style.width = projectsWOpen + "px";
	} 
	if (document.getElementById("links").style.width > (linksWClosed + "px")) {
		document.getElementById("links").style.width = linksWClosed + "px";
	}
}

var openLinks = function(obj) {
	obj.style.width = linksWOpen + "px";
	if (document.getElementById("projects").style.width < projectsWOpen + "px"){
		document.getElementById("projects").style.width = "950px";
	}
	if (document.getElementById("plans").style.width < plansWOpen + "px") {
		document.getElementById("plans").style.width = "900px";
	}
}

var popOut = function() {
	console.log("called");
	document.getElementById("popBack").style.display = "inherit";
	console.log(document.getElementById("popBack").style.display);
	document.getElementById("popBox").style.display = "inherit";
	console.log(document.getElementById("popBox").style.display);
}