let count = 0;
let totalCount = 0;
const MAX = 5;

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
        if(count < MAX) {
            count++;
            totalCount++;
            startTextScroll();
        }
    }, 500);
}

function startTextScroll() {
    const leftPosition = getRandomInt(100);
    const animationDuration = getRandomInt(10) + 1;

    const div = document.createElement("div");
    const id = "text-scroll-" + totalCount;
    div.setAttribute("class", "text-scroll");
    div.setAttribute("id", id);
    div.setAttribute("style", "left: " + leftPosition + "%; animation-duration: " + animationDuration + "s;");

    const text = document.createTextNode("Hello World...");
    div.appendChild(text);
    
    const container = document.getElementById("scroll-container");
    container.appendChild(div);

    $('#'+id).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() { 
        this.remove();
        count--;
    });

    debugScroll();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function debugScroll() {
    const countDiv = document.getElementById('count');
    countDiv.innerHTML = 'Curent count: ' + count;
    const totalCountDiv = document.getElementById('total-count');
    totalCountDiv.innerHTML = 'Total count: '  + totalCount;
}