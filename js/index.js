import { toggleTvPower, leftButtonPress, rightButtonPress, toggleGameAnimation } from './game.js';
import { startAnimationInterval, toggleTextAnimation } from './text-animation.js';
import { createThreeScene } from './three-scene.js';

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
    const wasAnimationRunning = button.innerHTML === 'Turn Animation Off';

    if (wasAnimationRunning) {
        creations.style.display = 'none';
        button.innerHTML = 'Turn Animation On';
        button.setAttribute('aria-pressed', true);
    } else {
        creations.style.display = 'block';
        button.innerHTML = 'Turn Animation Off';            
        button.setAttribute('aria-pressed', false);
    }

    toggleGameAnimation(wasAnimationRunning);
    toggleTextAnimation(wasAnimationRunning);
}