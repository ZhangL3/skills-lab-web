import $ from 'jquery';

export default AFRAME.registerComponent('get_world_bound', {
    init: function(){
        $(this.el).on('model-loaded', ()=> {
            getWorldBound(this.el);
        })
    },
});

export function getWordPosition() {
    let worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(element.object3D.matrixWorld);
}

export function getWorldBound() {
    let boundingBox = new THREE.Box3().setFromObject(this.object3D);

    $(this).attr('worldBoundMaxX', boundingBox.max.x);
    $(this).attr('worldBoundMaxY', boundingBox.max.y);
    $(this).attr('worldBoundMaxZ', boundingBox.max.z);
    $(this).attr('worldBoundMinX', boundingBox.min.x);
    $(this).attr('worldBoundMinY', boundingBox.min.y);
    $(this).attr('worldBoundMinZ', boundingBox.min.z);

    return boundingBox;
}
