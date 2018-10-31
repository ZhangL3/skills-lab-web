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

import {canTriggerCapAndWheel} from "./infusionSetOpenVive";
import dropDown from "../utils/dropDown";

let currentState;
let currentControllerState;
let element;
let activeController;

let canTriggerInfusionSetCap = false;
let isInfusionSetCapInHand = null;

const scopeLocalToGlobalScale = 0.05;

export default AFRAME.registerComponent('infusion_set_cap_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        activeController = null;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    }
});

export function setCanTriggerInfusionSetCap(value) {
    canTriggerInfusionSetCap = value;
}

export function handleNotifyInfusionSetInPack(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetCap ( triggerEvent ) {

    /*if (
        detectCollision(element, triggerEvent.activeController)
        && controllerStateIndex.getControllerState('infusionSetOnDeskOpened')
        && haveSthInHand(triggerEvent.activeController).length === 0
        && canTriggerCapAndWheel
        && canTriggerInfusionSetCap
    ) {
        console.log("take infusion set cap");
        activeController = triggerEvent.activeController;
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('infusionSetCapInHand', activeControllerId);
    }*/
}

export function handleControllerPressInfusionSetCap ( triggerEvent ) {

    if (!detectCollision(element, triggerEvent.activeController)) {
        return false;
    }

    if (
        controllerStateIndex.getControllerState('infusionSetOnDeskOpened')
        && haveSthInHand(triggerEvent.activeController).length === 0
        && canTriggerCapAndWheel
        && canTriggerInfusionSetCap
    ) {
        console.log("take infusion set cap");
        activeController = triggerEvent.activeController;
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('infusionSetCapInHand', activeControllerId);
        controllerStateIndex.setControllerState('isInfusionSetCapInHandling', true);
    }
}

export function handleControllerReleaseInfusionSetCap ( triggerEvent ) {
    activeController = triggerEvent.activeController;

    if (
        controllerStateIndex.getControllerState('infusionSetCapInHand') === activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('isInfusionSetCapInHandling')
        && !detectCollision(element, toggleBoxWasteBin)
    ) {
        controllerStateIndex.setControllerState('infusionSetCapInHand', null);
    }
}

export function handleControllerStateNotifyInfusionSetCap (nextControllerState) {

    if (
        nextControllerState.infusionSetCapInHand
        && !isInfusionSetCapInHand
    ) {
        dragInHand();
    }
    else if (
        !nextControllerState.infusionSetCapInHand
        && isInfusionSetCapInHand
    ) {
        fallDown(element);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController, scopeLocalToGlobalScale, -1);
    controllerActivities.drag();
    isInfusionSetCapInHand = activeController.getAttribute('id');
}

export function drop(activeController) {
    let controllerActivities = new controllerActions(element, activeController, -1, scopeLocalToGlobalScale);
    controllerActivities.drop();
    isInfusionSetCapInHand = null;
}

function fallDown(element) {
    drop(activeController);
    setTimeout(()=>{
        dropDown(element, 0.05);
    }, 100);
}
