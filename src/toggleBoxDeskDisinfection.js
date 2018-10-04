import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

export default AFRAME.registerComponent('toggle_box_desk_disinfection', {

    init: function(){

        element = this.el;

    },

});

export function handleControllerNotifyToggleBoxDeskDisinfection( triggerEvent ) {

    // Must have cloth in hand, before disinfection
    if(controllerStateIndex.getControllerState('disinfectionClothInHand')) {

        if(
            detectCollision(element, triggerEvent.activeController)
            && triggerEvent.activeController.getAttribute('id') === controllerStateIndex.getControllerState('disinfectionClothInHand')
        ){
            controllerStateIndex.setControllerState('deskDisinfection', true);
        }
    }


}

export function handleControllerStateNotifyToggleBoxDesk (nextControllerState) {

}


