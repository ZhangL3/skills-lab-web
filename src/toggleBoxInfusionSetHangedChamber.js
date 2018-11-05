import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

import {canTriggerChamberAndWheel} from "./infusionSetHangedVive";

import {setCanTriggerWheel} from "./toggleBoxInfusionSetHangedWheel";

let element;
let infusionSetHangedFill;
let infusionSetHangedFillTrigger;

let currentControllerState;

export default AFRAME.registerComponent('toggle_box_infusion_set_hanged_chamber', {

    init: function(){

        element = this.el;
        infusionSetHangedFill = document.querySelector('#infusionSetHangedFill');
        infusionSetHangedFillTrigger = $('#infusionSetHangedFillTrigger');

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

    if(
        detectCollision(element, triggerEvent.activeController)
        && canTriggerChamberAndWheel
    ){
        controllerStateIndex.setControllerState('dripChamberFilled', true);
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetHangedChamber (nextControllerState) {

    if (
        nextControllerState.dripChamberFilled
        && !currentControllerState.dripChamberFilled
    ) {
        infusionSetHangedFill.setAttribute('visible', true);
        infusionSetHangedFillTrigger.attr('visible', false);
        setTimeout(() => {
            setCanTriggerWheel(true);
        }, 1000);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


