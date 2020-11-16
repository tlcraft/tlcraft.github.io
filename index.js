let currentAnimationCount = 0;
let totalLifetimeAnimationCount = 0;
const MAX_PARALLEL_ANIMATIONS = 5;
let animationInterval;

$(document).ready(function () {
    generateCopyright();
    startAnimationInterval();
    watchAnimationButton();
});

function generateCopyright() {
    $("footer #copyrightDate").text(new Date().getFullYear());
}

function startAnimationInterval() {
    startTextScroll();
    animationInterval = setInterval(() => {
        if(currentAnimationCount < MAX_PARALLEL_ANIMATIONS) {
            currentAnimationCount++;
            totalLifetimeAnimationCount++;
            startTextScroll();
        }
    }, 750);
}

function startTextScroll() {
    const screenPosition = getLeftOrRight();
    const leftPercentage = getLeftPercentage(screenPosition);
    const animationDuration = getAnimationDuration();

    const div = document.createElement("div");
    const id = "text-scroll-" + totalLifetimeAnimationCount;
    div.setAttribute("class", "text-scroll");
    div.setAttribute("id", id);
    div.setAttribute("style", "left: " + leftPercentage + "%; animation-duration: " + animationDuration + "s;");

    const text = document.createTextNode("Hello World...");
    div.appendChild(text);
    
    const container = document.getElementById(screenPosition + '-scroll-container')
    container.appendChild(div);

    $('#' + id).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() { 
        this.remove();
        currentAnimationCount--;
        if (currentAnimationCount < 0) {
            currentAnimationCount = 0;
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
        currentAnimationCount = 0;

        const animations = document.getElementsByClassName('text-scroll');
        console.log('Animation count: ', animations.length);
        for (let animation of animations) {
            console.log('ID: ', animation.id);              
            animation.remove();
        }
    } else {
        this.innerHTML = 'Turn Animation Off';            
        this.setAttribute('aria-pressed', false);
        startAnimationInterval();
    }
}