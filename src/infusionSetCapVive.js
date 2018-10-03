import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

import { haveSthInHand } from "./controllerHand";

let currentState;
let currentControllerState;
let element;
let activeController;

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

        console.log("infusion_set_cap_vive");

        $(element).on('drop', (event, actController) => {
            activeController = actController;
            drop();
        });
    }
});

export function handleNotifyInfusionSetInPack(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetCap ( triggerEvent ) {

    getWorldBound(element);

    if (
        // isEmitted(infusionSetOpenCap, triggerEvent.position)
        isEmitted(element, triggerEvent.position)
        && controllerStateIndex.getControllerState('infusionSetOnDeskOpened')
        && haveSthInHand(triggerEvent.activeController).length === 0
    ) {
        console.log("take infusion set cap");
        activeController = triggerEvent.activeController;
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('infusionSetCapInHand', activeControllerId);
    }
}

export function handleControllerStateNotifyInfusionSetCap (nextControllerState) {

    if (
        nextControllerState.infusionSetCapInHand
        && !currentControllerState.infusionSetCapInHand
    ) {
        dragInHand();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController, scopeLocalToGlobalScale, -1);
    controllerActivities.drag();
}

function drop() {
    let controllerActivities = new controllerActions(element, activeController, -1, scopeLocalToGlobalScale);
    controllerActivities.drop();
}
