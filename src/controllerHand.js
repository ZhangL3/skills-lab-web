import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';

let controllerRightHand;
let controllerLeftHand;

export default AFRAME.registerComponent('controller_hand', {

    init: function(){
        // shallow copy
        controllerRightHand = document.querySelector('#rightHand');
        controllerLeftHand = document.querySelector('#leftHand');

        // deep copy
        // currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        // currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(controllerRightHand).on('click', () => {
            controllerRightHand.setAttribute("animation-mixer", "loop: once");
        });

        controllerRightHand.addEventListener('animation-finished', ()=>{
            controllerRightHand.removeAttribute("animation-mixer");
        });

        $(controllerLeftHand).on('click', () => {
            controllerLeftHand.setAttribute("animation-mixer", "loop: once");
        });

        controllerLeftHand.addEventListener('animation-finished', ()=>{
            controllerLeftHand.removeAttribute("animation-mixer");
        });
    }
});

export function handleNotifyControllerHand(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyControllerHand ( triggerEvent ) {
    if (triggerEvent.activeController.getAttribute('id')==='viveControllerRight') {
        $(controllerRightHand).trigger('click');
    }
    else if (triggerEvent.activeController.getAttribute('id')==='viveControllerLeft') {
        $(controllerLeftHand).trigger('click');
    }

}

export function handleControllerStateNotifyControllerHand (nextControllerState) {


    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}



