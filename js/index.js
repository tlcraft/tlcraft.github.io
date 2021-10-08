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
    window.toggleAnimation = toggleAnimation;
}

function generateCopyright() {
    $('footer #copyrightDate').text(new Date().getFullYear());
}

function toggleAnimation() {
    const button = document.getElementById('animation-toggle');
    isAnimationRunning = !isAnimationRunning;

    if (isAnimationRunning) {
        button.innerHTML = 'Turn Animation Off';            
        button.setAttribute('aria-pressed', false);
    } else {
        button.innerHTML = 'Turn Animation On';
        button.setAttribute('aria-pressed', true);
    }

    toggleTextAnimation(isAnimationRunning);
}
