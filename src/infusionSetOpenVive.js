import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

import { haveSthInHand } from "./controllerHand";

let currentState;
let currentControllerState;
let element;
let activeController;
let infusionSetWheel;
export let canTriggerCapAndWheel = false;

export default AFRAME.registerComponent('infusion_set_open_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        activeController = null;
        infusionSetWheel = document.querySelector('#infusionSetOpenWheel');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        // $(this.el).on('closeWheel', () => {
        //     closeWheel();
        // });
    }
});

const schema = {
    infusionSetOpenWheelClose: '-0.454 0 0.295',
    dur : 500,
};

export function setCanTriggerCapAndWheel(value) {
    canTriggerCapAndWheel = value;
}

export function handleNotifyInfusionSetInPack(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetOpen ( triggerEvent ) {

    // getWorldBound(element);
    // getWorldBound(infusionSetWheel);

    if (detectCollision(element, triggerEvent.activeController)) {
        // take opened infusion set in hand
        if (
            controllerStateIndex.getControllerState('infusionSetCapOff')
            && controllerStateIndex.getControllerState('infusionSetWheelClosed')
            && !controllerStateIndex.getControllerState('infusionSetOpenInHand')
            && haveSthInHand(triggerEvent.activeController).length === 0
        ) {
            activeController = triggerEvent.activeController;
            let activeControllerId = activeController.getAttribute('id');
            controllerStateIndex.setControllerState('infusionSetOpenInHand', activeControllerId);
        }
        // change hint
        else if (
            (!controllerStateIndex.getControllerState('infusionSetCapOff')
            || !controllerStateIndex.getControllerState('infusionSetWheelClosed'))
            && !controllerStateIndex.getControllerState('infusionSetOpenInHand')
        ) {
            console.log("Take off the cap of infusion set and bottle, close the roller");
        }
    }
}

export function handleControllerStateNotifyInfusionSetOpen (nextControllerState) {
    if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
        && !nextControllerState.infusionSetInBottle
    ) {
        element.setAttribute('visible', true);
    }

    if (
        nextControllerState.infusionSetWheelClosed
        && !currentControllerState.infusionSetWheelClosed
    ) {
        closeWheel();
    }

    if (
        nextControllerState.infusionSetOpenInHand
        && !currentControllerState.infusionSetOpenInHand
    ) {
        dragInHand();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
}

function drop() {
    $(element).remove();
}

function closeWheel() {
    console.log("close wheel");
    aAnimationWrapper(
        infusionSetWheel, '', 'position', '', schema.infusionSetOpenWheelClose, schema.dur,
        '', true, 'forwards'
    );
}