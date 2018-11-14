/**
 * Detect collision, condition: the trigger position in the bounding box of element
 *
 * @param element
 * @param triggerPosition
 * @param modifier
 * @returns {boolean}
 */
export function isEmitted(element, triggerPosition, modifier = 0) {
    const boundingBox = new THREE.Box3().setFromObject(element.object3D);

    const maxX = boundingBox.max.x;
    const maxY = boundingBox.max.y;
    const maxZ = boundingBox.max.z;

    const minX = boundingBox.min.x;
    const minY = boundingBox.min.y;
    const minZ = boundingBox.min.z;

    if (triggerPosition.x > maxX - modifier || triggerPosition.x < minX + modifier) {
        return false;
    }

    if (triggerPosition.y > maxY - modifier || triggerPosition.y < minY + modifier) {
        return false;
    }

    if (triggerPosition.z > maxZ- modifier || triggerPosition.z < minZ + modifier) {
        return false;
    }

    return true;
}

/**
 * Detect collision, condition: the bonding boxes of two objects intersect
 *
 * @param elementObject
 * @param elementTarget
 * @returns {*}
 */
export function detectCollision(elementObject, elementTarget) {

    const objectBox = new THREE.Box3().setFromObject(elementObject.object3D);
    const targetBoX = new THREE.Box3().setFromObject(elementTarget.object3D);

    return objectBox.intersectsBox(targetBoX);
}

