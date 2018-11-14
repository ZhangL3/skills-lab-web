import {detectCollision} from "./isEmitted";
import {getWorldBound, getWordPosition} from "./getWorldPositionAndBound";

let speed = 0;
let accelerate = 0.049;
let timeInterval = null;
const detectFrequency = 0.01;

let specialCondition = {worldBound: {min: {x: 0, y: 0, z: 0}, max: {x: 0, y: 0, z: 0}}, lowestY : 0};
let twoCabinetsCondition;
const defaultLowestY = 0.02;

/**
 * Handle the animation of fall
 *
 * @param element
 * @param lowestY
 * @param specialConditions
 */
export default function dropDown(element, lowestY = defaultLowestY, specialConditions = []) {
    const twoCabinets = document.querySelector('#twoCabinets');
    const twoCabinetsWorldBound = getWorldBound(twoCabinets);
    twoCabinetsCondition = {worldBound: twoCabinetsWorldBound, lowestY: twoCabinetsWorldBound.max.y + defaultLowestY};
    const floor = document.querySelector('#floorBox');
    const originalPosition = element.getAttribute('position');
    const {x, y, z} = originalPosition;

    timeInterval = setInterval(() => {
        speed = speed + accelerate;
        element.setAttribute('position', `${x} ${y-speed} ${z}`);
        if (
            detectCollision(element, twoCabinets)
            || detectCollision(element, floor)
            || element.getAttribute('position').y <= lowestY
            || handleTwoCabinetsCondition(element)
            || handleSpecialConditions(element, specialConditions)
        ) {
            clearInterval(timeInterval);
            speed = 0;
        }
    }, detectFrequency);
}

/**
 * Detect the collision between cabinets and object
 *
 * @param element
 */
function handleTwoCabinetsCondition(element) {
    return handleSpecialCondition(element, twoCabinetsCondition);
}

/**
 * Detect collision between spacial condition and object
 *
 * @param element
 * @param specialCondition
 * @returns {boolean}
 */
function handleSpecialCondition(element, specialCondition) {
    const ElementPosition = getWordPosition(element);
    const {x, y, z} = ElementPosition;
    
    return x < specialCondition.worldBound.max.x
        && x > specialCondition.worldBound.min.x
        && z < specialCondition.worldBound.max.z
        && z > specialCondition.worldBound.min.z
        && y <= specialCondition.lowestY;

}

/**
 * Check all special conditions
 *
 * @param element
 * @param specialConditions
 * @returns {boolean}
 */
function handleSpecialConditions(element, specialConditions) {
    if(specialConditions.length === 0) {
        return false;
    }
    for (let i = 0; i < specialConditions.length; i++) {
        if(handleSpecialCondition(element, specialConditions[i])) {
            return true;
        }
    }
    return false;
}