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
    const screenPosition = getLeftOrRight();
    const leftPercentage = getLeftPercentage(screenPosition);
    const animationDuration = getRandomInt(10) + 1;

    const div = document.createElement("div");
    const id = "text-scroll-" + totalLifetimeScrollCount;
    div.setAttribute("class", "text-scroll");
    div.setAttribute("id", id);
    div.setAttribute("style", "left: " + leftPercentage + "%; animation-duration: " + animationDuration + "s;");

    const text = document.createTextNode("Hello World...");
    div.appendChild(text);
    
    const container = document.getElementById(screenPosition + '-scroll-container')
    container.appendChild(div);

    $('#'+id).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() { 
        this.remove();
        currentScrollCount--;
        debugScroll();
    });

    debugScroll();
}

function getLeftOrRight() {
    const randomValue = getRandomInt(100) + 1;
    const screenPosition = randomValue > 50 ? 'right' : 'left';
    return screenPosition;
}

function getLeftPercentage(screenPosition) {
    const basePercentage = getRandomInt(28);

    if (screenPosition === 'right') {
        return basePercentage + 70;
    }

    return basePercentage;
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