console.log('particles js');
const canvas = document.querySelector("#canvas");

// Get the rendering context (2D in this case)
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;


var particles = [];


const SETTINGS = {
    pool: 10,
    speed: 2,
    size: 5,
    color: '#f0f',
    life: 1000,
    shadow: {
        enabled: true,
        color: '#f0e',
        blur: 8
    }
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = SETTINGS.size;
    this.speedX = Math.random() * SETTINGS.speed - SETTINGS.speed / 2;
    this.speedY = Math.random() * SETTINGS.speed -  SETTINGS.speed / 2;
    this.life = SETTINGS.life;
}

Particle.prototype.draw = function () {
    const blur = SETTINGS.shadow.blur;
    if (SETTINGS.shadow.enabled) {
        ctx.shadowColor = SETTINGS.shadow.color;
        ctx.shadowBlur = blur;
    }
    ctx.fillStyle = SETTINGS.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
    if (SETTINGS.shadow.enabled) ctx.shadowBlur = 0;
}

Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= SETTINGS.speed;
}

function createParticles(x, y) {
    for (let i = 0; i < SETTINGS.pool; i++) {
        const particle = new Particle(x, y);
        particles.push(particle);
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() > 0.85) {
    // if (particles.length <= 400) {
        createParticles(canvas.width / 2, canvas.height / 2);
    }
    // createParticles(canvas.width / 2, canvas.height / 2);


    for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();

        // console.log('life', particles[i].life);
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}

animate();