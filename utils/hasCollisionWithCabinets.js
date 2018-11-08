import {detectCollision, isEmitted} from "./isEmitted";
import {getWordPosition, getWorldBound} from "./getWorldPositionAndBound";

// detect collision
export default function hasCollisionWithCabinets(element) {
    const twoCabinets = document.querySelector('#twoCabinets');
    const result = detectCollision(element, twoCabinets);
    console.log("result: ", result, typeof(result));
    return result;

    /*const twoCabinets = document.querySelector('#twoCabinets');
    const elementPosition = getWordPosition(element);
    const result = isEmitted(twoCabinets, elementPosition);
    console.log("result: ", result, typeof(result));
    return result;*/

}