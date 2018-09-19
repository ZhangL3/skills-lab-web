import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';

let controllerRightHand;

export default AFRAME.registerComponent('controller_hand', {

    init: function(){
        // shallow copy
        controllerRightHand = this.el;

        // deep copy
        // currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        // currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(controllerRightHand).on('click', () => {
            console.log("click controller hand");
            controllerRightHand.setAttribute("animation-mixer", "loop: once");
        });

        controllerRightHand.addEventListener('animation-finished', ()=>{
           console.log("animation-loop");
            controllerRightHand.removeAttribute("animation-mixer");
        });
    }
});

export function handleNotifyControllerHand(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyControllerHand ( triggerEvent ) {
    $(controllerRightHand).trigger('click');

}

export function handleControllerStateNotifyControllerHand (nextControllerState) {


    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}



