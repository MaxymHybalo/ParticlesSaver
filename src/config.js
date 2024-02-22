const WIDTH = window.clientWidth;
const HEIGHT = window.clientHeight;


const SCREEN_LIFE = Math.sqrt(WIDTH**2 + HEIGHT**2);

export default {
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