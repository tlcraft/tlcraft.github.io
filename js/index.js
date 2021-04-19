import { toggleTvPower, leftButtonPress, rightButtonPress, toggleGameAnimation } from './game.js';
import { startAnimationInterval, toggleTextAnimation } from './text-animation.js';
import { createThreeScene } from './three-scene.js';

let isAnimationRunning = true;

$(document).ready(function () {
    initialize();
    generateCopyright();
    startAnimationInterval();
    createThreeScene();
});

function initialize() {
    window.toggleTvPower = toggleTvPower;
    window.leftButtonPress = leftButtonPress;
    window.rightButtonPress = rightButtonPress;
    window.toggleAnimation = toggleAnimation;
}

function generateCopyright() {
    $('footer #copyrightDate').text(new Date().getFullYear());
}

function toggleAnimation() {
    const button = document.getElementById('animation-toggle');
    const creations = document.getElementById('creations');
    isAnimationRunning = !isAnimationRunning;

    if (isAnimationRunning) {
        creations.style.display = 'block';
        button.innerHTML = 'Turn Animation Off';            
        button.setAttribute('aria-pressed', false);
    } else {
        creations.style.display = 'none';
        button.innerHTML = 'Turn Animation On';
        button.setAttribute('aria-pressed', true);
    }

    toggleGameAnimation(isAnimationRunning);
    toggleTextAnimation(isAnimationRunning);
}