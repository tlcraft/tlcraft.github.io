import { toggleTvPower, leftButtonPress, rightButtonPress, toggleGameAnimation } from './game.js';
import { startAnimationInterval, toggleTextAnimation } from './text-animation.js';
import { toggleThreeScene } from './three-scene.js';
import * as THREE from './lib/three/build/three.module.js';

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

function createThreeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( 200, 200 );
    const threeDiv = document.getElementById('three');
    threeDiv.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    animate();
}