let currentAnimationCount = 0;
let totalLifetimeAnimationCount = 0;
const MAX_PARALLEL_ANIMATIONS = 5;
let animationInterval;
const textChangeIntervals = {};
const changeCharacterTimeouts = [500, 700, 1000, 1500];
const specialCharacters = ['!', '#', '*', '|', '日', '本',　'木',　'気',　'こ', 'ん', 'に', 'ち', 'は', 'ト', 'ラ', 'ビ', 'ス', 'ク', 'ラ', 'フ', 'ト', 'ア', 'イ', 'ウ', 'エ', 'オ', 'ン', 'を', 'あ', 'い', 'う', 'え', 'お', '火', '大', 'シ', 'ツ', 'ロ', 'マ', 'ム', '父', 'ノ', 'ケ', 'サ', 'セ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let isTvOn = false;

$(document).ready(function () {
    generateCopyright();
    startAnimationInterval();
});

function generateCopyright() {
    $("footer #copyrightDate").text(new Date().getFullYear());
}

function startAnimationInterval() {
    startAnimation();
    animationInterval = setInterval(() => {
        if(currentAnimationCount < MAX_PARALLEL_ANIMATIONS) {
            currentAnimationCount++;
            totalLifetimeAnimationCount++;
            startAnimation();
        }
    }, 750);
}

function startAnimation() {
    const screenPosition = getLeftOrRight();
    const id = "text-scroll-" + totalLifetimeAnimationCount;

    const div = generateNewAnimationElement(screenPosition, id);
    const container = document.getElementById(screenPosition + '-scroll-container')
    container.appendChild(div);

    attachEventListener(id);
}

function getLeftOrRight() {
    const randomValue = getRandomIntNonZero(2);
    const screenPosition = randomValue === 2 ? 'right' : 'left';
    return screenPosition;
}

function generateNewAnimationElement(screenPosition, id) {
    const style = getAnimationStyle(screenPosition);

    const div = document.createElement("div");
    div.setAttribute("class", "text-scroll");
    div.setAttribute("id", id);
    div.setAttribute("style", style);

    const randomText = getRandomText();
    const text = document.createTextNode(randomText);
    div.appendChild(text);

    return div;
}

function getAnimationStyle(screenPosition) {
    const leftPercentage = getLeftPercentage(screenPosition);
    const animationDuration = getAnimationDuration();
    return "left: " + leftPercentage + "%; animation-duration: " + animationDuration + "s;";
}

function getLeftPercentage(screenPosition) {
    const basePercentage = getRandomIntNonZero(25);

    if (screenPosition === 'right') {
        return basePercentage + 71;
    }

    return basePercentage;
}

function getAnimationDuration() {
    const windowHeight = $(window).height();

    if (windowHeight <= 650) {
        return getRandomIntNonZero(4) + 1;
    } else if (windowHeight <= 1300) {
        return getRandomIntNonZero(5) + 2;
    }

    return getRandomIntNonZero(6) + 3;
}

function getRandomText() {
    const textChoice = getRandomIntNonZero(3);
    if (textChoice === 3) {
        return 'Hello World...';
    } else if (textChoice === 2) {
        return 'トラビスクラフト';
    } else {
        return (Math.random() + 1).toString(36).substr(2, 10);  
    }
}

function getRandomIntNonZero(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function getRandomIntIncludingZero(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function attachEventListener(id) {    
    $('#' + id).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() { 
        this.remove();
        clearInterval(textChangeIntervals[id]);
        delete textChangeIntervals[id];
        
        currentAnimationCount--;
        if (currentAnimationCount < 0) {
            currentAnimationCount = 0;
        }
    });

    const intervalTimeout = getRandomArrayValue(changeCharacterTimeouts);
    const interval = setInterval(() => changeLetter(id), intervalTimeout);

    textChangeIntervals[id] = interval;
}

function changeLetter(id) {
    const element = $('#' + id);
    const innerHtml = element.text();

    const characterToReplace = getRandomArrayValue(innerHtml);
    const randomSpecialCharacter = getRandomArrayValue(specialCharacters);
    const newInnerHtml = innerHtml.replace(characterToReplace, randomSpecialCharacter);

    element.text(newInnerHtml);
}

function getRandomArrayValue(array) {
    const randomIndex = getRandomIntIncludingZero(array.length);
    return array[randomIndex];
}


function toggleAnimation() {
    const button = document.getElementById('animation-toggle');
    if (button.innerHTML === 'Turn Animation Off') {
        clearInterval(animationInterval);
        button.innerHTML = 'Turn Animation On';
        button.setAttribute('aria-pressed', true);
        currentAnimationCount = 0;

        const animations = document.getElementsByClassName('text-scroll');
        for (let animation of animations) {             
            animation.remove();
        }

        for (const interval in textChangeIntervals) {
            if (textChangeIntervals.hasOwnProperty(interval)) {
                clearInterval(textChangeIntervals[interval]);
                delete textChangeIntervals[interval];
            }
        }
    } else {
        button.innerHTML = 'Turn Animation Off';            
        button.setAttribute('aria-pressed', false);
        startAnimationInterval();
    }
}

function toggleTvPower() {
    setTvState();
    animateTv();
}

function setTvState() {
    if(isTvOn) {
        isTvOn = false;
    } else {
        isTvOn = true;
    }
}

function animateTv() {
    const screen = document.getElementById('screen');

    if(isTvOn) {
        screen.classList.remove('animate-tv-off');
        screen.style.backgroundColor = 'transparent';
        window.requestAnimationFrame(drawCircle);
     } else {
        clearCanvas();
        screen.style.backgroundColor = '';
        screen.classList.add('animate-tv-off');
    }
}

let x = 95;
let xVector = 2;
let y = 50;
let yVector = 2;
const RADIUS = 40;

function drawCircle() {
    const canvas = document.getElementById("game-canvas");
    const context = canvas.getContext("2d");

    context.globalCompositeOperation = 'destination-over';
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.strokeStyle = "#FF0000";
    context.arc(x, y, RADIUS, 0, 2 * Math.PI);
    context.stroke();

    x = getX(canvas);
    y = getY(canvas);
    console.log('X: ', x);
    console.log('Y: ', y);

    window.requestAnimationFrame(drawCircle);
}

function getX(canvas) {
    x = x + xVector;

    if (x <= RADIUS) {
        x = RADIUS + (RADIUS - x);
        xVector = xVector * -1;
    }

    if (x >= canvas.width - RADIUS) {
        x = canvas.width - RADIUS - (x - canvas.width - RADIUS);        
        xVector = xVector * -1;
    }

    return x;
}

function getY(canvas) {
    y = y + yVector;

    if (y <= RADIUS) {
        y = RADIUS + (RADIUS - y);
        yVector = yVector * -1;
    }

    if (y >= canvas.height - RADIUS) {
        y = canvas.height - RADIUS - (y - canvas.height - RADIUS);        
        yVector = yVector * -1;
    }

    return y;
}

function clearCanvas() {
    const canvas = document.getElementById("game-canvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
}