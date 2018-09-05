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

export default AFRAME.registerComponent('infusion_set_hanged_vive', {

    init: function(){
        // shallow copy
        element = this.el;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });
    }
});

const schema = {
  dur: 800
};

export function handleNotifyInfusionSetHangedVive(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetHangedVive ( triggerEvent ) {

}

export function handleControllerStateNotifyInfusionSetHangedVive (nextControllerState) {

    if (
        nextControllerState.nacl500Hanged
        && !currentControllerState.nacl500Hanged
    ) {
        // Wait until nacl 500 bottle hanged
        setTimeout(()=>{
            element.setAttribute('visible', true);
        }, 1000);
    }

    if (
        nextControllerState.dripChamberFilled
        && !nextControllerState.infusionSetWheelClosed
        && currentControllerState.dripChamberFilled
    ) {
        setTimeout(() => {
            element.setAttribute('visible', false);
        }, schema.dur);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}
