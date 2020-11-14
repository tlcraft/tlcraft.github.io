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
    }, 750);
}

function startTextScroll() {
    const screenPosition = getLeftOrRight();
    const leftPercentage = getLeftPercentage(screenPosition);
    const animationDuration = getAnimationDuration();

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

function getAnimationDuration() {
    const windowHeight = $(window).height();

    if (windowHeight <= 650) {
        return getRandomInt(3) + 1;
    }

    return getRandomInt(4) + 2;
}
function getLeftPercentage(screenPosition) {
    const basePercentage = getRandomInt(25);

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
    button.addEventListener('click', toggleButton);
}

function toggleButton() {
    if (this.innerHTML === 'Turn Animation Off') {
        clearInterval(animationInterval);
        this.innerHTML = 'Turn Animation On';
        this.setAttribute('aria-pressed', true);
        currentScrollCount = 0;

        const animations = document.getElementsByClassName('text-scroll');
        console.log('Animation count: ', animations.length);
        for (let animation of animations) {
            console.log('ID: ', animation.id);              
            animation.remove();
        }
    } else {
        this.innerHTML = 'Turn Animation Off';            
        this.setAttribute('aria-pressed', false);
        textScrollInterval();
    }
}