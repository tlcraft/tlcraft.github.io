import * as THREE from './lib/three/build/three.module.js';

export function createThreeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( 300, 300 );

    const threeDiv = document.getElementById('three');
    threeDiv.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );

    const edges = generateBoxEdges(cube);
    cube.add( edges );

    scene.add( cube );
    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.rotation.z += 0.01;

        renderer.render( scene, camera );
    };

    animate();
}

function generateBoxEdges(cube) {
    var edgesGeometry = new THREE.EdgesGeometry( cube.geometry );
    var lineBasicMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
    var edges = new THREE.LineSegments( edgesGeometry, lineBasicMaterial );
    return edges;
}