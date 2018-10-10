import {detectCollision} from "./isEmitted";

let speed = 0;
let accelerate = 0.049;
let timeInterval = null;

export default function dropDown(element) {
    const cabinet = document.querySelector('#twoCabinets');
    const floor = document.querySelector('#floorBox');
    const originalPosition = element.getAttribute('position');
    const {x, y, z} = originalPosition;
    timeInterval = setInterval(() => {
        speed = speed + accelerate;
        element.setAttribute('position', `${x} ${y-speed} ${z}`);
        if (
            detectCollision(element, cabinet)
            || detectCollision(element, floor)
        ) {
            clearInterval(timeInterval);
            speed = 0;
        }
    }, 10);
}