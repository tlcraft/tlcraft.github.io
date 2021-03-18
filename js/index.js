import { toggleTvPower, leftButtonPress, rightButtonPress, toggleGameAnimation } from './game.js';
import { startAnimationInterval, toggleTextAnimation } from './text-animation.js';

$(document).ready(function () {
    initialize();
    generateCopyright();
    startAnimationInterval();
});

function initialize() {
    window.toggleTvPower = toggleTvPower;
    window.toggleTextAnimation = toggleTextAnimation;
    window.leftButtonPress = leftButtonPress;
    window.rightButtonPress = rightButtonPress;
    window.toggleGameAnimation = toggleGameAnimation;
}

function generateCopyright() {
    $('footer #copyrightDate').text(new Date().getFullYear());
}