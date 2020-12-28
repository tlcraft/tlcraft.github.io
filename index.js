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
    alert(`Turned TV ${getTvState()}`);
}

function setTvState() {
    if(isTvOn) {
        isTvOn = false;
    } else {
        isTvOn = true;
    }
}

function getTvState() {
    if(isTvOn) {
        return 'On';
    } else {
        return 'Off';
    }
}