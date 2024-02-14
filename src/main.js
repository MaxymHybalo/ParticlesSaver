console.log('particles js');
const canvas = document.querySelector("#canvas");

// Get the rendering context (2D in this case)
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const WIDTH = canvas.clientWidth;
const HEIGHT = canvas.clientHeight;

const SCREEN_LIFE = Math.sqrt(WIDTH**2 + HEIGHT**2);
console.log('SCREN_LIFE', SCREEN_LIFE);
const particles = [];

const SAME_SPEED_DIRECTIONS = Math.random();
const SETTINGS = {
    pool: 40,
    speed: 2,
    size: 6,
    color: '#f0f',
    life: SCREEN_LIFE,
    shape: 'rect',
    shadow: {
        enabled: true,
        color: 'red',
        blur: 15
    },
    // _speed: {
    //     dx: Math.random(),
    //     dy: Math.random()
    // }
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = SETTINGS.size;
    this.speedX = Math.random() * SETTINGS.speed - SETTINGS.speed / 2;
    this.speedY = Math.random() * SETTINGS.speed -  SETTINGS.speed / 2;
    // try to use speed vector to calculating speed and use to remove particle after
    this.life = SETTINGS.life;
}

Particle.prototype.draw = function () {
    const blur = SETTINGS.shadow.blur;
    if (SETTINGS.shadow.enabled) {
        ctx.shadowColor = SETTINGS.shadow.color;
        ctx.shadowBlur = blur;
    }
    ctx.fillStyle = SETTINGS.color;
    if (SETTINGS.shape === 'circle') {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
    }
    
    if(SETTINGS.shape === 'rect') {
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
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

function createParticle(x, y) {
    particles.push(new Particle(x, y));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() > 0.9 && particles.length < 3000) {
    // if (particles.length <= 400) {
        createParticles(canvas.width / 2, canvas.height / 2);
    }


    for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();

        // console.log('life', particles[i].life);
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            // createParticle(canvas.width / 2, canvas.height / 2);
        }
    }
    console.log(particles.length);
}

document.addEventListener('keyup', e => {
    if (e.key === 'c') {
        console.log('[CLEAR PARTICLES]');
        particles.length = 0;
    }
})
animate();