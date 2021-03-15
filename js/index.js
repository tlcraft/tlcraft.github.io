import { toggleTvPower, leftButtonPress, rightButtonPress } from './game.js';
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
}

function generateCopyright() {
    $('footer #copyrightDate').text(new Date().getFullYear());
}