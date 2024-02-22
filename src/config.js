const WIDTH = window.clientWidth;
const HEIGHT = window.clientHeight;


const SCREEN_LIFE = Math.sqrt(WIDTH**2 + HEIGHT**2);

export default {
    pool: 40,
    speed: 0.1,
    size: 1,
    color: 0xff00ff,
    light_color: 0xff00ff,
    life: 500,
    shape: 'rect',
    shadow: {
        enabled: true,
        color: 'red',
        blur: 15
    },
    geometry: {
        w_seg: 15,
        h_seg: 15
    },
    events: {
        animate: true
    },
    bloom: {
        strength: 3,
        threshold: 1.2,
        radius: 0.5,
        resolution: 0.5
    }
    // _speed: {
    //     dx: Math.random(),
    //     dy: Math.random()
    // }
}