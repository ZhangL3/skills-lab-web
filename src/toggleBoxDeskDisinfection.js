import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

export default AFRAME.registerComponent('toggle_box_desk_disinfection', {

    init: function(){

        element = this.el;

    },

});

export function handleControllerNotifyToggleBoxDeskDisinfection( triggerEvent ) {

    if(controllerStateIndex.getControllerState('disinfectionClothInHand')) {

        getWorldBound(element);

        if(
            isEmitted(element, triggerEvent.position)
            && triggerEvent.activeController.getAttribute('id') === controllerStateIndex.getControllerState('disinfectionClothInHand')
        ){
            controllerStateIndex.setControllerState('deskDisinfection', true);
        }
    }


}

export function handleControllerStateNotifyToggleBoxDesk (nextControllerState) {

}


