export function getRandomIntNonZero(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

export function getRandomIntIncludingZero(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomArrayValue(array) {
    const randomIndex = getRandomIntIncludingZero(array.length);
    return array[randomIndex];
}