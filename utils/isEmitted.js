import $ from 'jquery';
import {getWorldBound, getVertexesOfBoundingBox} from './getWorldPositionAndBound';

export function isEmitted(element, triggerPosition, modifier = 0) {
    const el = $(element);

    const boundingBox = new THREE.Box3().setFromObject(element.object3D);

    // const maxX = Number(el.attr('worldboundmaxx'));
    // const maxY = Number(el.attr('worldboundmaxy'));
    // const maxZ = Number(el.attr('worldboundmaxz'));
    //
    // const minX = Number(el.attr('worldboundminx'));
    // const minY = Number(el.attr('worldboundminy'));
    // const minZ = Number(el.attr('worldboundminz'));

    const maxX = boundingBox.max.x;
    const maxY = boundingBox.max.y;
    const maxZ = boundingBox.max.z;

    const minX = boundingBox.min.x;
    const minY = boundingBox.min.y;
    const minZ = boundingBox.min.z;

    if (triggerPosition.x > maxX - modifier || triggerPosition.x < minX + modifier) {
        // console.log("x wrong");
        return false;
    }

    if (triggerPosition.y > maxY - modifier || triggerPosition.y < minY + modifier) {
        // console.log("y wrong");
        return false;
    }

    if (triggerPosition.z > maxZ- modifier || triggerPosition.z < minZ + modifier) {
        // console.log("z wrong");
        return false;
    }

    return true;
}

export function isEmittedBoundingBox(boundingBox, position) {
    const maxX = boundingBox.max.x;
    const maxY = boundingBox.max.y;
    const maxZ = boundingBox.max.z;

    const minX = boundingBox.min.x;
    const minY = boundingBox.min.y;
    const minZ = boundingBox.min.z;

    if (triggerPosition.x > maxX || triggerPosition.x < minX) {
        console.log("x wrong");
        return false;
    }

    if (triggerPosition.y > maxY || triggerPosition.y < minY) {
        console.log("y wrong");
        return false;
    }

    if (triggerPosition.z > maxZ || triggerPosition.z < minZ) {
        console.log("z wrong");
        return false;
    }

    return true;
}

export function detectCollision(elementObject, elementTarget) {
    const objectVertexes = getVertexesOfBoundingBox(elementObject);
    const targetVertexes = getVertexesOfBoundingBox(elementTarget);

    for ( let i = 0; i < objectVertexes.length; i++ ) {
        if ( isEmitted(elementTarget, objectVertexes[i]) ) {
            return true;
        }
    }

    for ( let j = 0; j < targetVertexes.length; j++) {
        if ( isEmitted(elementObject, targetVertexes[j]) ) {
            return true;
        }
    }

    return false;
}

