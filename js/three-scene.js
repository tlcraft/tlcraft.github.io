import * as THREE from './lib/three/build/three.module.js';

export function toggleThreeScene() {
    const button = document.getElementById('animation-toggle');
    const three = document.getElementById('three');

    if (button.innerHTML === 'Turn Animation Off') {
        three.style.display = 'block';
    } else {
        three.style.display = 'none';
    }
}

export function createThreeScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x008ac5 );
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