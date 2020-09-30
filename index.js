$(document).ready(function () {
    generateCopyright();
    startTextScroll();
});

function generateCopyright() {
    $("footer #copyrightDate").text(new Date().getFullYear());
}

function startTextScroll() {
    const div = document.createElement("div");
    div.setAttribute("class", "text-scroll");
    div.setAttribute("style", "left: 80%");

    const text = document.createTextNode("Hello World...");
    div.appendChild(text);
    
    const container = document.getElementById("scroll-container");
    container.appendChild(div);
}