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
import dropDown from "../utils/dropDown";
import hasCollisionWithCabinets from "../utils/hasCollisionWithCabinets";

let currentState;
let currentControllerState;
let element;
let activeController;
let infusionSetWheel;
let toggleBoxNacl500Cap;

let isInfusionSetOpenInHand = null;
let isInfusionSetOnDeskOpened = false;

export let canTriggerCapAndWheel = false;

export default AFRAME.registerComponent('infusion_set_open_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        activeController = null;
        infusionSetWheel = document.querySelector('#infusionSetOpenWheel');
        toggleBoxNacl500Cap = document.querySelector('#toggleBoxNacl500Cap');

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

    /*// getWorldBound(element);
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
        // change hints
        else if (
            (!controllerStateIndex.getControllerState('infusionSetCapOff')
            || !controllerStateIndex.getControllerState('infusionSetWheelClosed'))
            && !controllerStateIndex.getControllerState('infusionSetOpenInHand')
        ) {
            console.log("Take off the cap of infusion set and bottle, close the roller");
        }
    }*/
}

export function handleControllerPressInfusionSetOpen ( triggerEvent ) {

    if (
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    activeController = triggerEvent.activeController;

    // First time drag
    // take opened infusion set in hand
    if (
        controllerStateIndex.getControllerState('infusionSetCapOff')
        && controllerStateIndex.getControllerState('infusionSetWheelClosed')
        && !controllerStateIndex.getControllerState('infusionSetOpenInHand')
        && haveSthInHand(triggerEvent.activeController).length === 0
        && !controllerStateIndex.getControllerState('isInfusionSetOnDeskOpenedHandling')
        && controllerStateIndex.getControllerState('bottleNacl500CapDroped')
    ) {
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('infusionSetOpenInHand', activeControllerId);
        controllerStateIndex.setControllerState('isInfusionSetOnDeskOpenedHandling', true);
    }
    // pick up again
    else if (
        controllerStateIndex.getControllerState('isInfusionSetOnDeskOpenedHandling')
        && !controllerStateIndex.getControllerState('infusionSetOpenInHand')
        && !isInfusionSetOpenInHand
    ) {
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('infusionSetOpenInHand', activeControllerId);
        controllerStateIndex.setControllerState('isInfusionSetOnDeskOpenedHandling', true);
    }
    // change hints
    else if (
        (!controllerStateIndex.getControllerState('infusionSetCapOff')
            || !controllerStateIndex.getControllerState('infusionSetWheelClosed'))
        && !controllerStateIndex.getControllerState('infusionSetOpenInHand')
    ) {
        console.log("Take off the cap of infusion set and bottle, close the roller");
    }
}

export function handleControllerReleaseInfusionSetOpen ( triggerEvent ) {
    if (
        !controllerStateIndex.getControllerState('isInfusionSetOnDeskOpenedHandling')
    ) {
        return false;
    }

    activeController = triggerEvent.activeController;

    if (
        controllerStateIndex.getControllerState('infusionSetOpenInHand') === triggerEvent.activeController.getAttribute('id')
        && !detectCollision(element, toggleBoxNacl500Cap)
        && controllerStateIndex.getControllerState('isInfusionSetOnDeskOpenedHandling')
        && !hasCollisionWithCabinets(element)
    ) {
        controllerStateIndex.setControllerState('infusionSetOpenInHand', null);
    }
}


export function handleControllerStateNotifyInfusionSetOpen (nextControllerState) {
    // show element
    if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
        && !nextControllerState.infusionSetInBottle
    ) {
        element.setAttribute('visible', true);
    }
    // close wheel
    if (
        nextControllerState.infusionSetWheelClosed
        && !currentControllerState.infusionSetWheelClosed
    ) {
        closeWheel();
    }
    // drag element
    if (
        nextControllerState.infusionSetOpenInHand
        && nextControllerState.isInfusionSetOnDeskOpenedHandling
        && !isInfusionSetOpenInHand
    ) {
        dragInHand();
    }
    // drop element
    if (
        nextControllerState.isInfusionSetOnDeskOpenedHandling
        && !nextControllerState.infusionSetOpenInHand
        && isInfusionSetOpenInHand
    ) {
        fallDown(element);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
    isInfusionSetOpenInHand = activeController.getAttribute('id');
}

function drop() {
    $(element).remove();
    isInfusionSetOpenInHand = null;
}

function closeWheel() {
    aAnimationWrapper(
        infusionSetWheel, '', 'position', '', schema.infusionSetOpenWheelClose, schema.dur,
        '', true, 'forwards'
    );
}

export function unclasp(activeController) {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
    isInfusionSetOpenInHand = null;
}

function fallDown(element) {
    unclasp(activeController);
    setTimeout(()=>{
        dropDown(element, 0.05);
    }, 100);
}