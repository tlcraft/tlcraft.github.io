let currentScrollCount = 0;
let totalLifetimeScrollCount = 0;
const MAX_TEXT_SCROLLS = 5;

$(document).ready(function () {
    generateCopyright();
    textScrollInterval();
});

function generateCopyright() {
    $("footer #copyrightDate").text(new Date().getFullYear());
}

function textScrollInterval() {
    startTextScroll();
    setInterval(() => {
        if(currentScrollCount < MAX_TEXT_SCROLLS) {
            currentScrollCount++;
            totalLifetimeScrollCount++;
            startTextScroll();
        }
    }, 500);
}

function startTextScroll() {
    const leftPosition = getRandomInt(100);
    const animationDuration = getRandomInt(10) + 1;

    const div = document.createElement("div");
    const id = "text-scroll-" + totalLifetimeScrollCount;
    div.setAttribute("class", "text-scroll");
    div.setAttribute("id", id);
    div.setAttribute("style", "left: " + leftPosition + "%; animation-duration: " + animationDuration + "s;");

    const text = document.createTextNode("Hello World...");
    div.appendChild(text);
    
    const container = document.getElementById("right-scroll-container");
    container.appendChild(div);

    $('#'+id).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() { 
        this.remove();
        currentScrollCount--;
        debugScroll();
    });

    debugScroll();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function debugScroll() {
    const countDiv = document.getElementById('count');
    countDiv.innerHTML = 'Curent count: ' + currentScrollCount;
    const totalCountDiv = document.getElementById('total-count');
    totalCountDiv.innerHTML = 'Total count: '  + totalLifetimeScrollCount;
}