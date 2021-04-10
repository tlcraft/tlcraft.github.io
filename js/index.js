import { toggleTvPower, leftButtonPress, rightButtonPress, toggleGameAnimation } from './game.js';
import { startAnimationInterval, toggleTextAnimation } from './text-animation.js';
import { toggleThreeScene, createThreeScene } from './three-scene.js';

$(document).ready(function () {
    initialize();
    generateCopyright();
    startAnimationInterval();
    createThreeScene();
});

function initialize() {
    window.toggleTvPower = toggleTvPower;
    window.toggleTextAnimation = toggleTextAnimation;
    window.leftButtonPress = leftButtonPress;
    window.rightButtonPress = rightButtonPress;
    window.toggleGameAnimation = toggleGameAnimation;
    window.toggleThreeScene = toggleThreeScene;
}

function generateCopyright() {
    $('footer #copyrightDate').text(new Date().getFullYear());
}