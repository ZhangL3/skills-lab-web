import {detectCollision} from "./isEmitted";

/**
 * Detect collision between cabinets and object
 *
 * @param element
 * @returns {*}
 */
export default function hasCollisionWithCabinets(element) {
    const twoCabinets = document.querySelector('#twoCabinets');
    const result = detectCollision(element, twoCabinets);
    console.log("result: ", result, typeof(result));
    return result;
}
