import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from "../utils/aAnimationWrapper";

import {canTriggerChamberAndWheel} from "./infusionSetHangedVive";
import {setCanFixTube} from "./infusionSetHangedFilledVive";
import stateIndex from "./state";
import hints from "../utils/hints";

let element;
let infusionSetHangedWheel;

let currentControllerState;
let canTriggerWheel = false;

export default AFRAME.registerComponent('toggle_box_infusion_set_hanged_wheel', {

    init: function(){

        element = this.el;
        infusionSetHangedWheel = document.querySelector('#infusionSetHangedWheel');

        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },

});

const schema = {
    infusionSetHangedWheelOpenPosition: '-0.530 0.110 -0.060',
    dur: 500,
    fillTime: 800
};

export function handleControllerNotifyToggleBoxInfusionSetHangedWheel( triggerEvent ) {

    if (
        !controllerStateIndex.getControllerState('dripChamberFilled')
    ) {
        return false;
    }
    // Open roller
    if (
        detectCollision(element, triggerEvent.activeController)
        && canTriggerChamberAndWheel
    ) {

        if (
            controllerStateIndex.getControllerState('infusionSetWheelClosed')
        ) {
            controllerStateIndex.setControllerState('infusionSetWheelClosed', false);
            stateIndex.set('hint', hints.fixTube);
            let t = setTimeout(() => {
                setCanFixTube(true);
            }, 1000);
        }
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetHangedWheel (nextControllerState) {

    if (
        !nextControllerState.infusionSetWheelClosed
        && nextControllerState.dripChamberFilled
        && currentControllerState.infusionSetWheelClosed
        && canTriggerWheel
    ) {
        openWheel();
    }

    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function openWheel() {
    aAnimationWrapper(infusionSetHangedWheel, '', 'position', '', schema.infusionSetHangedWheelOpenPosition, schema.dur, '', true, 'forwards');
}

export function setCanTriggerWheel(status) {
    canTriggerWheel = status;
}
