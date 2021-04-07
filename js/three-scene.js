export function toggleThreeScene() {
    const button = document.getElementById('animation-toggle');
    const three = document.getElementById('three');

    if (button.innerHTML === 'Turn Animation Off') {
        three.style.display = 'block';
    } else {
        three.style.display = 'none';
    }
}