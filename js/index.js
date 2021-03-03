import { toggleTvPower, leftButtonPress, rightButtonPress } from './game.js';
import { startAnimationInterval, toggleAnimation } from './text-animation.js';

$(document).ready(function () {
    initialize();
    generateCopyright();
    startAnimationInterval();
});

function initialize() {
    window.toggleTvPower = toggleTvPower;
    window.toggleAnimation = toggleAnimation;
    window.leftButtonPress = leftButtonPress;
    window.rightButtonPress = rightButtonPress;
}

function generateCopyright() {
    $('footer #copyrightDate').text(new Date().getFullYear());
}