import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

let element;
let currentState;

let activeController;

let currentControllerState;

let controllerActivities;


export default AFRAME.registerComponent('bottle_nacl_500_vive', {

    init: function(){
        // shallow copy
        element = this.el;

        controllerActivities = null;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(element).on('click', () => {
        });

        $(element).on('putOnDesk', () => {
            drop();
            controllerStateIndex.setControllerState('nacl500OnDesk', true);
            controllerStateIndex.setControllerState('nacl500Dragable', true);
        });

    }
});

export function handleNotifyBottleNacl500Vive(nextState) {
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyBottleNacl500Vive ( triggerEvent ) {

    getWorldBound(element);

    if(isEmitted(element, triggerEvent.position)){
        if(triggerEvent.eventName === 'triggerDown') {
            if (controllerStateIndex.getControllerState('nacl500InHandToDesk') === null) {
                if (controllerStateIndex.getControllerState('nacl500Dragable')) {
                    activeController = triggerEvent.activeController;
                    let activeControllerId =  activeController.getAttribute('id');
                    controllerStateIndex.setControllerState('nacl500InHandToDesk', activeControllerId);
                }
            }
        }
    }
}

export function handleControllerStateNotifyBottleNacl500Vive (nextControllerState) {
    if (nextControllerState.nacl500InHandToDesk !== null && currentControllerState.nacl500InHandToDesk === null) {

        dragInHand();

        currentControllerState = _.cloneDeep(nextControllerState);

    }
}

function dragInHand() {
    controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
}

function drop() {
    controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
}

export function isBottleChecked() {
    if (!controllerStateIndex.getControllerState('nacl500LabelChecked')) {
        return false;
    }
    if (!controllerStateIndex.getControllerState('nacl500LiquidChecked')) {
        return false;
    }
    if (!controllerStateIndex.getControllerState('nacl500CapChecked')) {
        return false;
    }
    return true;
}


