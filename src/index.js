import cfg from './config';
import { animate, init } from './main_tree';
// import { animate, init } from './test';

import listenEvents from './listeners';

console.log('index')
console.table(cfg);
window.global = {};
window.global.events = cfg.events;
window.global.bloom = cfg.bloom;
listenEvents();
init();
animate();