import $ from 'jquery';

export default AFRAME.registerComponent('get_world_bound', {

    init: function(){
        $(this.el).on('click', () => {
        });

        $(this.el).on('model-loaded', ()=> {
            getWorldBound(this.el);
        })
    },
});

function getWordPosition() {
    let worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(element.object3D.matrixWorld);

}

function getWorldBound(element) {
    let boundingBox = new THREE.Box3().setFromObject(element.object3D);

    $(element).attr('worldBoundMaxX', boundingBox.max.x);
    $(element).attr('worldBoundMaxY', boundingBox.max.y);
    $(element).attr('worldBoundMaxZ', boundingBox.max.z);
    $(element).attr('worldBoundMinX', boundingBox.min.x);
    $(element).attr('worldBoundMinY', boundingBox.min.y);
    $(element).attr('worldBoundMinZ', boundingBox.min.z);

    console.log("element got wordBound: ", element);
}
