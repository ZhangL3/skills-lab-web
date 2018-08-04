import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

export default AFRAME.registerComponent('toggle_box_desk', {

    init: function(){

        element = this.el;

    },

});

export function handleControllerNotifyToggleBoxDesk( triggerEvent ) {

    if(controllerStateIndex.getControllerState('hasDisinfectionCloth')) {

        getWorldBound(element);

        if(isEmitted(element, triggerEvent.position)){
            controllerStateIndex.setControllerState('deskDisinfection', true);
        }
    }


}

export function handleControllerStateNotifyToggleBoxDesk (nextControllerState) {

}


