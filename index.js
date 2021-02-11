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
    $('footer #copyrightDate').text(new Date().getFullYear());
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
    const id = 'text-scroll-' + totalLifetimeAnimationCount;

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

    const div = document.createElement('div');
    div.setAttribute('class', 'text-scroll');
    div.setAttribute('id', id);
    div.setAttribute('style', style);

    const randomText = getRandomText();
    const text = document.createTextNode(randomText);
    div.appendChild(text);

    return div;
}

function getAnimationStyle(screenPosition) {
    const leftPercentage = getLeftPercentage(screenPosition);
    const animationDuration = getAnimationDuration();
    return 'left: ' + leftPercentage + '%; animation-duration: ' + animationDuration + 's;';
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
    $('#' + id).one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() { 
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
        requestId = window.requestAnimationFrame(drawCircle);
     } else {
        window.cancelAnimationFrame(requestId);
        clearCanvas();
        screen.style.backgroundColor = '';
        screen.classList.add('animate-tv-off');
    }
}

const PLAYER_PUCK_RADIUS = 20;
const TARGET_PUCK_RADIUS = 10;

let xVector = getRandomIntNonZero(4) + 1;
let yVector = getRandomIntNonZero(4) + 1;
let requestId;
let playerPuck;
let target;
let score = 0;

function drawCircle() {
    const canvas = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');

    context.globalCompositeOperation = 'destination-over';
    context.clearRect(0, 0, canvas.width, canvas.height);

    generatePlayer(canvas);
    generateTarget(canvas);
    drawPlayerBall(context);
    drawTarget(context);
    drawScore(context);

    const xUpdatedValues = calculateNextPosition(playerPuck.x, xVector, canvas.width);
    playerPuck.x = xUpdatedValues.newPosition;
    xVector = xUpdatedValues.vector;

    const yUpdatedValues = calculateNextPosition(playerPuck.y, yVector, canvas.height);
    playerPuck.y = yUpdatedValues.newPosition;
    yVector = yUpdatedValues.vector;
    
    detectCollision();

    requestId = window.requestAnimationFrame(drawCircle);
}

function calculateNextPosition(currentPosition, vector, bound) {
    let newPosition = currentPosition + vector;

    if (newPosition <= PLAYER_PUCK_RADIUS) {
        newPosition = PLAYER_PUCK_RADIUS + (PLAYER_PUCK_RADIUS - newPosition);
        vector = vector * -1;
    }

    if (newPosition >= bound - PLAYER_PUCK_RADIUS) {
        newPosition = bound - PLAYER_PUCK_RADIUS;        
        vector = vector * -1;
    }

    return { newPosition, vector };
}

function detectCollision() {
    // See: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if(playerPuck && target) {
        var dx = playerPuck.x - target.x;
        var dy = playerPuck.y - target.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < PLAYER_PUCK_RADIUS + TARGET_PUCK_RADIUS) {
            target = null;
            score++;
        }
    }
}

function drawPlayerBall(context) {
    context.beginPath();
    context.fillStyle = '#FFFFFF';
    context.arc(playerPuck.x, playerPuck.y, PLAYER_PUCK_RADIUS, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}

function generatePlayer(canvas) {
    if(!playerPuck) {
        playerPuck = {
            x: getRandomIntNonZero(canvas.width - (2 * PLAYER_PUCK_RADIUS)) + PLAYER_PUCK_RADIUS,
            y: getRandomIntNonZero(canvas.height - (2 * PLAYER_PUCK_RADIUS)) + PLAYER_PUCK_RADIUS
        };
    }
}

function generateTarget(canvas) {
    if(!target) {
        target = {
            x: getRandomIntNonZero(canvas.width - (2 * TARGET_PUCK_RADIUS)) + TARGET_PUCK_RADIUS,
            y: getRandomIntNonZero(canvas.height - (2 * TARGET_PUCK_RADIUS)) + TARGET_PUCK_RADIUS
        };
    }
}

function drawTarget(context) {
    if(target) {
        context.beginPath();
        context.fillStyle = '#000000';
        context.arc(target.x, target.y, TARGET_PUCK_RADIUS, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}

function drawScore(context) {
    context.font = '24px serif';
    context.fillText('Score: ' + score, 5, 25);
}

function leftButtonPress() {
    if(isTvOn) {
        xVector *= -1;
    }
}

function rightButtonPress() {
    if(isTvOn) {
        yVector *= -1;
    }
}

function clearCanvas() {
    const canvas = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    score = 0;
    xVector = getRandomIntNonZero(4) + 1;
    yVector = getRandomIntNonZero(4) + 1;
    target = null;
    playerPuck = null;
}