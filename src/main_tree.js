import * as THREE from 'three';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const rednerScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(rednerScene);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.6,
    0.1,
    0.1)
composer.addPass(bloomPass);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry(1, 16, 8); // adjust sphere
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const cube = new THREE.Mesh(geometry, material);
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add(light);
scene.add(cube);

camera.position.z = 35;

export function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.position.x +=0.1
    // renderer.render(scene, camera);
    composer.render()
}

// animate();