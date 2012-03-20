var frame, cache, current;

function init() {
    frame = document.getElementById('frame');
    cache = document.getElementById('cache');
    current = 0;
    console.log("called?");
    nextImg();
    cacheImg();
}

function nextImg() {
    current += 1;
    frame.innerHTML = "<img src='images/" + current + ".jpg' onclick='nextImg();'></img>";
    cacheImg();
}

function cacheImg() {
    var inc = current + 1;
    cache.innerHTML = "<img src='images/" + inc + ".jpg'></img>";
}