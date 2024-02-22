export default function() {
    document.addEventListener('keyup', e => {
        if (e.key === 's') {
            console.log('[STOP ANIMATION]');
            window.global.events.animate = !window.global.events.animate;
        }
    });
}
