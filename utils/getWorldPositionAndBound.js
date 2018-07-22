import $ from 'jquery';

let element;

export default AFRAME.registerComponent('get_world_bound', {

    init: function(){
        element = this.el;

        $(this.el).on('click', () => {
        });

        $(this.el).on('model-loaded', ()=> {
            getWorldBound();
        })
    },
});

function getWordPosition() {
    let worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(element.object3D.matrixWorld);
    // $(element).attr('worldPosition', worldPos);
    
}

function getWorldBound() {
    let boundingBox = new THREE.Box3().setFromObject(element.object3D);

    $(element).attr('worldBoundMaxX', boundingBox.max.x);
    $(element).attr('worldBoundMaxY', boundingBox.max.y);
    $(element).attr('worldBoundMaxZ', boundingBox.max.z);
    $(element).attr('worldBoundMinX', boundingBox.min.x);
    $(element).attr('worldBoundMinY', boundingBox.min.y);
    $(element).attr('worldBoundMinZ', boundingBox.min.z);

    console.log("element got wordBound: ", element);
}
