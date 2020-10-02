$(document).ready(function () {
    generateCopyright();
    startTextScroll();
});

function generateCopyright() {
    $("footer #copyrightDate").text(new Date().getFullYear());
}

function startTextScroll() {
    const leftPosition = getRandomInt(100);
    const div = document.createElement("div");
    div.setAttribute("class", "text-scroll");
    div.setAttribute("style", "left: " + leftPosition + "%; animation-duration: 10s;");

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