import { getRandomIntNonZero } from './utilities.js';

const PLAYER_PUCK_RADIUS = 20;
const TARGET_PUCK_RADIUS = 10;
const SCORE_OFFSET = 30;

let xVector = getRandomIntNonZero(4) + 1;
let yVector = getRandomIntNonZero(4) + 1;
let requestId;
let playerPuck;
let target;
let score = 0;
let isTvOn = false;

export function toggleTvPower() {
    setTvState();
    animateTv();
}

export function leftButtonPress() {
    if(isTvOn) {
        xVector *= -1;
    }
}

export function rightButtonPress() {
    if(isTvOn) {
        yVector *= -1;
    }
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
        requestId = window.requestAnimationFrame(runGame);
     } else {
        window.cancelAnimationFrame(requestId);
        clearCanvas();
        screen.style.backgroundColor = '';
        screen.classList.add('animate-tv-off');
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

function runGame() {
    const canvas = document.getElementById('game-canvas');
    const context = canvas.getContext('2d');

    context.globalCompositeOperation = 'destination-over';
    context.clearRect(0, 0, canvas.width, canvas.height);

    generatePlayerPuck(canvas);
    generateTarget(canvas);
    drawPlayerPuck(context);
    drawTarget(context);
    drawScore(context, canvas.width);

    const xUpdatedValues = calculateNextPosition(playerPuck.x, xVector, canvas.width);
    playerPuck.x = xUpdatedValues.newPosition;
    xVector = xUpdatedValues.vector;

    const yUpdatedValues = calculateNextPosition(playerPuck.y, yVector, canvas.height, SCORE_OFFSET);
    playerPuck.y = yUpdatedValues.newPosition;
    yVector = yUpdatedValues.vector;
    
    detectCollision();

    requestId = window.requestAnimationFrame(runGame);
}

function generatePlayerPuck(canvas) {
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
            y: getRandomIntNonZero(canvas.height - SCORE_OFFSET - (2 * TARGET_PUCK_RADIUS)) + TARGET_PUCK_RADIUS + SCORE_OFFSET
        };
    }
}

function drawPlayerPuck(context) {
    if(playerPuck) {
        context.beginPath();
        context.fillStyle = '#FFFFFF';
        context.arc(playerPuck.x, playerPuck.y, PLAYER_PUCK_RADIUS, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
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

function drawScore(context, width) {
    context.font = '24px serif';
    context.fillText('Score: ' + score, 5, 25);

    context.beginPath();
    context.moveTo(0, SCORE_OFFSET);
    context.lineTo(width, SCORE_OFFSET);
    context.stroke();
}

function calculateNextPosition(currentPosition, vector, bound, offset = 0) {
    let newPosition = currentPosition + vector;

    if (newPosition <= PLAYER_PUCK_RADIUS + offset) {
        newPosition = PLAYER_PUCK_RADIUS + offset + (PLAYER_PUCK_RADIUS + offset - newPosition);
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