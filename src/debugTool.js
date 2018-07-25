import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let element;

let leftCupboardLeftDoor;

export default AFRAME.registerComponent('debug_tool', {

    init: function(){
        // shallow copy
        element = this.el;

        // this.el.setAttribute('obj-model', {
        //     obj: 'https://cdn.aframe.io/controllers/vive/vr_controller_vive.obj',
        //     mtl: 'https://cdn.aframe.io/controllers/vive/vr_controller_vive.mtl'
        // });

        // console.log("vive obj-model: ", this.el.getAttribute('obj-model'));

        $(this.el).on('triggerdown', () => {

            leftCupboardLeftDoor = document.querySelector('#leftCupboardLeftDoor');
            console.log("leftCupboardLeftDoor: ", leftCupboardLeftDoor, typeof(leftCupboardLeftDoor));


            let triggerPosition = this.el.getAttribute('position');
            console.log("triggerdown");
            console.log("position:", this.el.getAttribute('position'));
            if(judgeTriggerObject(triggerPosition, leftCupboardLeftDoor)) {
                console.log("leftCupboardLeftDoor triggered!!!");
                $(leftCupboardLeftDoor).trigger('click');
            }
        });
    }
});

function judgeTriggerObject(position, element) {
    const obj = $(element);
    console.log("element: ", element, typeof(element));
    console.log('minX: ',obj.attr('worldBoundMinX'));
    console.log('maxX: ',obj.attr('worldBoundMaxX'));
    if(position.x < Number(obj.attr('worldBoundMinX')) || position.x > Number(obj.attr('worldBoundMaxX'))) {
        console.log("x problem!!!");
        return false;
    }
    if(position.y < Number(obj.attr('worldBoundMinY')) || position.y > Number(obj.attr('worldBoundMaxY'))) {
        console.log("y problem!!!");
        return false;
    }
    if(position.z < Number(obj.attr('worldBoundMinZ')) || position.z > Number(obj.attr('worldBoundMaxZ'))) {
        console.log("z problem!!!");
        return false;
    }
    console.log("no problem!!!");
    return true;
}


