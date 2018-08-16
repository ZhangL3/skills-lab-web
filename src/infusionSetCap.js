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

export default AFRAME.registerComponent('infusion_set_cap', {

    init: function(){
        // shallow copy
        element = this.el;
        activeController = null;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        console.log("infusion_set_cap");

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
        isEmitted(infusionSetOpenCap, triggerEvent.position)
        && controllerStateIndex.getControllerState('infusionSetOnDeskOpened')
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
    let controllerActivities = new controllerActions(element, activeController, 0.03, -1, 0, -0.01, 0.065);
    controllerActivities.drag();
}

function drop() {
    let controllerActivities = new controllerActions(element, activeController, -1, 0.03);
    controllerActivities.drop();
}
