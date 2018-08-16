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
let activeController;
let infusionSetWheel;

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

export function handleNotifyInfusionSetInPack(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetOpen ( triggerEvent ) {

    getWorldBound(element);
    getWorldBound(infusionSetWheel);

    // take opened infusion set in hand
    if (
        isEmitted(element, triggerEvent.position)
        && controllerStateIndex.getControllerState('infusionSetCapOff')
        && controllerStateIndex.getControllerState('infusionSetWheelClosed')
    ) {
        activeController = triggerEvent.activeController;
        controllerStateIndex.setControllerState('infusionSetOpenInHand', activeController);
    }
}

export function handleControllerStateNotifyInfusionSetOpen (nextControllerState) {
    if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
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