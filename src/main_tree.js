import * as THREE from 'three';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import cfg from './config';
import Particle from './particle';

const particles = [];

const params = {
    threshold: 0,
    strength: 1,
    radius: 0.5,
    exposure: 1
};

const renderer = new THREE.WebGLRenderer();
const composer = new EffectComposer(renderer);
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );

bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;
bloomPass.radius = 0.7
function createParticles() {
    console.log('pool', cfg.pool);
    for(let i = 0; i < cfg.pool; i++) {
        particles.push(
            new Particle(0, 0, 0)
        );
    }
}
export function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const rednerScene = new RenderPass(scene, camera);
    // const composer = new EffectComposer(renderer);
    composer.addPass(rednerScene);

    composer.addPass(bloomPass);
    document.body.appendChild(renderer.domElement);

    createParticles();
    particles.forEach(p => {
        scene.add(p.sphere)
        // scene.add(p.light);
    });

    camera.position.z = 25;
    
    // return {
    //     composer
    // }
}

export function animate() {
    requestAnimationFrame(animate);

    particles.forEach(p => p.update());
    
    const { strength, threshold, radius, resolution } = window.global.bloom;
    bloomPass.strength = strength;
    bloomPass.threshold = threshold;
    bloomPass.radius = radius;
    bloomPass.resolution = resolution;

    // renderer.render(scene, camera);
    composer.render();

    // console.log(particles);
}

// animate();