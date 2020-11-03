let currentScrollCount = 0;
let totalLifetimeScrollCount = 0;
const MAX_TEXT_SCROLLS = 5;
let animationInterval;

$(document).ready(function () {
    generateCopyright();
    textScrollInterval();
    watchAnimationButton();
});

function generateCopyright() {
    $("footer #copyrightDate").text(new Date().getFullYear());
}

function textScrollInterval() {
    startTextScroll();
    animationInterval = setInterval(() => {
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
    const animationDuration = getRandomInt(10);

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
        if (currentScrollCount < 0) {
            currentScrollCount = 0;
        }
    });
}

function getLeftOrRight() {
    const randomValue = getRandomInt(2);
    const screenPosition = randomValue === 2 ? 'right' : 'left';
    return screenPosition;
}

function getLeftPercentage(screenPosition) {
    const basePercentage = getRandomInt(28);

    if (screenPosition === 'right') {
        return basePercentage + 71;
    }

    return basePercentage;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function watchAnimationButton() {
    const button = document.getElementById('animation-toggle');
    button.addEventListener('click', function() {
        if (this.innerHTML === 'Turn Animation Off') {
            clearInterval(animationInterval);
            this.innerHTML = 'Turn Animation On';
            currentScrollCount = 0;

            const animations = document.getElementsByClassName('text-scroll');
            console.log('Animation count: ', animations.length);
            for (let animation of animations) {
                console.log('ID: ', animation.id);              
                animation.remove();
            }
        } else {
            this.innerHTML = 'Turn Animation Off';
            textScrollInterval();
        }
    });
}