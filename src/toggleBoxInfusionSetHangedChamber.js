import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;
let infusionSetHangedFill;

let currentControllerState;

export default AFRAME.registerComponent('toggle_box_infusion_set_hanged_chamber', {

    init: function(){

        element = this.el;
        infusionSetHangedFill = document.querySelector('#infusionSetHangedFill');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

export function handleControllerNotifyToggleBoxInfusionSetHangedChamber( triggerEvent ) {

    if (
        !controllerStateIndex.getControllerState('nacl500Hanged')
        || controllerStateIndex.getControllerState('dripChamberFilled')
    ) {
        return false;
    }

    getWorldBound(element);
    if(isEmitted(element, triggerEvent.position)){
        controllerStateIndex.setControllerState('dripChamberFilled', true);
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetHangedChamber (nextControllerState) {

    if (
        nextControllerState.dripChamberFilled
        && !currentControllerState.dripChamberFilled
    ) {
        infusionSetHangedFill.setAttribute('visible', true);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


