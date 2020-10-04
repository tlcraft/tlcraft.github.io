$(document).ready(function () {
    generateCopyright();
    textScrollInterval();
});

function generateCopyright() {
    $("footer #copyrightDate").text(new Date().getFullYear());
}

function textScrollInterval() {
    startTextScroll();
    setInterval(startTextScroll, 500);
}

function startTextScroll() {
    const leftPosition = getRandomInt(100);
    const animationDuration = getRandomInt(10) + 1;

    const div = document.createElement("div");
    div.setAttribute("class", "text-scroll");
    div.setAttribute("style", "left: " + leftPosition + "%; animation-duration: " + animationDuration + "s;");

    const text = document.createTextNode("Hello World...");
    div.appendChild(text);
    
    const container = document.getElementById("scroll-container");
    container.appendChild(div);

    $(".text-scroll").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() { 
        this.remove();
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}