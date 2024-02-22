import * as THREE from 'three';
import cfg from './config';


const customVertexShader = `
    varying vec3 vNormal;

    void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const customFragmentShader = `
    varying vec3 vNormal;

    void main() {
        // Calculate intensity based on the normal direction
        float intensity = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
        
        // Define emissive color and intensity
        vec3 emissiveColor = vec3(1.0, 0.0, 1.0); // Red emissive color
        float emissiveIntensity = 1.0; // Adjust emissive intensity
        
        // Calculate final emissive color
        vec3 finalColor = emissiveColor * emissiveIntensity * intensity;
        
        // Output final color
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

// Create a custom shader material
const customMaterial = new THREE.ShaderMaterial({
    vertexShader: customVertexShader,
    fragmentShader: customFragmentShader,
    // Set emissive color to black (it will be controlled in the shader)
    emissive: 0x000000,
    emissiveIntensity: 5, // Initial emissive intensity
    side: THREE.DoubleSide // Ensure both sides of the mesh are visible
});


function Particle(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = cfg.size;
    this.speedX = Math.random() * cfg.speed - cfg.speed / 2;
    this.speedY = Math.random() * cfg.speed -  cfg.speed / 2;
    this.speedZ = Math.random() * cfg.speed -  cfg.speed / 2;
    // try to use speed vector to calculating speed and use to remove particle after
    this.life = cfg.life;
    const { w_seg, h_seg } = cfg.geometry;
    // const geometry = new THREE.SphereGeometry(this.size, w_seg, h_seg); // adjust sphere
    const geometry = new THREE.IcosahedronGeometry( 1, 15 );

    // const material = new THREE.ShaderMaterial({
    //     vertexShader: customVertexShader,
    //     fragmentShader: customFragmentShader,
    //     emissiveIntensity: 5, // Initial emissive intensity
    //     side: THREE.DoubleSide // Ensure both sides of the mesh are visible
    // });
    const material = new THREE.MeshBasicMaterial({ color: cfg.color });
    this.sphere = new THREE.Mesh(geometry, material);
    // this.light = new THREE.PointLight(cfg.light_color);
    // this.light.intensity = 1.5;
    // this.light.distance = 10;
    // this.light.position.set(x - this.size * 2, y, z);
}

Particle.prototype.update = function () {
    if (!window.global.events.animate) return;

    this.sphere.position.x += this.speedX;
    this.sphere.position.y += this.speedY;
    this.sphere.position.z += this.speedZ;
    this.sphere.rotation.x += 0.01;
    // this.light.position.x += this.speedX;
    // this.light.position.y += this.speedY - this.size * 2;
    // this.light.position.z += this.speedZ + this.size * 2;
    this.life -= 1;
}

export default Particle;