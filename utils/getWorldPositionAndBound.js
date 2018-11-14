import $ from 'jquery';

/**
 * Add bound relate to global as attribute of object during initiation
 */
export default AFRAME.registerComponent('get_world_bound', {
    init: function(){
        $(this.el).on('model-loaded', ()=> {
            getWorldBound(this.el);
        })
    },
});

/**
 * Get position relate to global
 *
 * @param element
 * @returns {*|MathUtil.Vector3}
 */
export function getWordPosition(element) {
    let worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(element.object3D.matrixWorld);
    return worldPos;
}


/**
 * Add bound relate to global as attribute of object
 * and return the value of bound
 *
 * @param element
 * @returns {*}
 */
export function getWorldBound(element) {
    let boundingBox = new THREE.Box3().setFromObject(element.object3D);

    $(element).attr('worldBoundMaxX', boundingBox.max.x);
    $(element).attr('worldBoundMaxY', boundingBox.max.y);
    $(element).attr('worldBoundMaxZ', boundingBox.max.z);
    $(element).attr('worldBoundMinX', boundingBox.min.x);
    $(element).attr('worldBoundMinY', boundingBox.min.y);
    $(element).attr('worldBoundMinZ', boundingBox.min.z);

    return boundingBox;
}

/**
 * Get the position of 8 vertexes of bounding box
 *
 * @param element
 * @returns {Array}
 */
export function getVertexesOfBoundingBox(element) {
    let vertexes = [];
    let boundingBox = new THREE.Box3().setFromObject(element.object3D);
    let {max, min} =boundingBox;

    const A = {x: min.x, y: min.y, z: max.z};
    const B = {x: max.x, y: min.y, z: max.z};
    const C = {x: max.x, y: min.y, z: min.z};
    const D = {x: min.x, y: min.y, z: min.z};

    const E = {x: min.x, y: max.y, z: max.y};
    const F = {x: max.x, y: max.y, z: min.z};
    const G = {x: max.x, y: max.y, z: min.z};
    const H = {x: min.x, y: max.y, z: min.z};

    vertexes.push(A, B, C, D, E, F, G, H);

    return vertexes;
}
