import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

let currentState;
let currentControllerState;
let element;
let infusionSetHangedFill;

export default AFRAME.registerComponent('infusion_set_hanged_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        infusionSetHangedFill = document.querySelector('infusionSetHangedFill');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });
    }
});

export function handleNotifyInfusionSetHanged(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetHanged ( triggerEvent ) {

    getWorldBound(infusionSetHangedFill);

    if(isEmitted(infusionSetHangedFill, triggerEvent.position)){
        controllerStateIndex.setControllerState('dripChamberFilled', true);
    }
}

export function handleControllerStateNotifyInfusionSetHanged (nextControllerState) {

    if (
        nextControllerState.nacl500Hanged
        && !currentControllerState.nacl500Hanged
    ) {
        element.setAttribute('visible', true);
    }

    if (
        nextControllerState.dripChamberFilled
        && currentControllerState.dripChamberFilled
    ) {
        infusionSetHangedFill.setAttribute('visible', true);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}
