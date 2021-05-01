import * as THREE from './lib/three/build/three.module.js';

export function createThreeScene() {
    const scene = new THREE.Scene();
    const camera = generateCamera();
    const renderer = generateRenderer();
    addRendererToDom(renderer);

    const cube = generateCube();
    const edges = generateCubeEdges(cube);
    cube.add( edges );
    scene.add( cube );

    const animate = () => animation(animate, renderer, scene, camera, cube);
    animate();
}

function generateCamera() {
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 2;
    return camera;
}

function generateRenderer() {
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize( 300, 300 );
    return renderer;
}

function addRendererToDom(renderer) {
    const threeDiv = document.getElementById('three');
    threeDiv.appendChild( renderer.domElement );
}

function generateCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    return cube;
}

function generateCubeEdges(cube) {
    var edgesGeometry = new THREE.EdgesGeometry( cube.geometry );
    var lineBasicMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
    var edges = new THREE.LineSegments( edgesGeometry, lineBasicMaterial );
    return edges;
}

function animation(animate, renderer, scene, camera, cube) {
    window.requestAnimationFrame( animate );

    cube.rotation.x += 0.03;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.02;

    renderer.render( scene, camera );
};