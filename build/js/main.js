import {Event} from './Event.js';

new Event(['mousedown', 'touchstart'], function (e) {
    console.log('Mouse down or touch start happened');
    console.log(e);
}, document.querySelectorAll('a[data-event]'));