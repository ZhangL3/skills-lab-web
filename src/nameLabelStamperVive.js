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
import hints from "../utils/hints";

let currentState;
let currentControllerState;
let element;
let nameLabelEmpty;
let nameLabelWroteLeft;
let nameLabelWroteRight;
let activeController;
let infusionSetWheel;

let isNameLabelEmptyInHand = false;
let isNameEmptyLabelHandling = false;

// take empty name label and write can not at same time done
export let canWrite;

export default AFRAME.registerComponent('name_label_stamper_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        nameLabelEmpty = document.querySelector('#nameLabelEmpty');
        nameLabelWroteLeft = document.querySelector('#nameLabelWroteLeft');
        nameLabelWroteRight = document.querySelector('#nameLabelWroteRight');
        activeController = null;
        infusionSetWheel = document.querySelector('#infusionSetOpenWheel');
        canWrite = false;

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
    pastedNameLabelPosition: '-0.454 0 0.295',
    pastedNameLabelRotation: '-0.454 0 0.295',
    dur : 500,
};

export function handleNotifyNameLabelStamperVive(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyNameLabelStamperVive ( triggerEvent ) {

    /*if (
        !stateIndex.getIn(['infusionSet', 'finish'])
    ) {
        console.log("Fix the tube before taking name label");
        return false;
    }

    if (
        !controllerStateIndex.getControllerState('nameLabelInHand')
        && !stateIndex.getIn(['nameLabel', 'finish'])
    ) {
        getWorldBound(element);

        // take name label in hand
        if (
            detectCollision(element, triggerEvent.activeController)
            && haveSthInHand(triggerEvent.activeController).length === 0
        ) {
            activeController = triggerEvent.activeController;
            let activeControllerId = activeController.getAttribute('id');
            controllerStateIndex.setControllerState('nameLabelInHand', activeControllerId);
            // after 2 second can write name label
            setTimeout(()=>{
                canWrite = true;
            }, 2000);
        }
    }*/
}

export function handleControllerPressNameLabelStamperVive ( triggerEvent ) {

    if (
        !stateIndex.getIn(['infusionSet', 'finish'])
    ) {
        console.log("Fix the tube before taking name label");
        return false;
    }

    activeController = triggerEvent.activeController;

    if (
        !controllerStateIndex.getControllerState('nameLabelFilled')
        && !controllerStateIndex.getControllerState('nameLabelInHand')
        && !stateIndex.getIn(['nameLabel', 'finish'])
    ) {
        // take name label in hand first time
        if (
            detectCollision(nameLabelEmpty, triggerEvent.activeController)
            && haveSthInHand(triggerEvent.activeController).length === 0
            && !controllerStateIndex.getControllerState('isNameEmptyLabelHandling')
            && !controllerStateIndex.getControllerState('nameLabelInHand')
        ) {
            let activeControllerId = activeController.getAttribute('id');
            controllerStateIndex.setControllerState('nameLabelInHand', activeControllerId);
            controllerStateIndex.setControllerState('isNameEmptyLabelHandling', true);
            isNameEmptyLabelHandling = true;
            stateIndex.set('hint', hints.fillNameLabel);
            // after 2 second can write name label
            setTimeout(()=>{
                canWrite = true;
            }, 1500);
        }
        // Pick up again
        else if (
            detectCollision(nameLabelEmpty, triggerEvent.activeController)
            && haveSthInHand(triggerEvent.activeController).length === 0
            && isNameEmptyLabelHandling
            && !controllerStateIndex.getControllerState('nameLabelInHand')
        ) {
            let activeControllerId = activeController.getAttribute('id');
            controllerStateIndex.setControllerState('nameLabelInHand', activeControllerId);
            // after 2 second can write name label
            setTimeout(()=>{
                canWrite = true;
            }, 1500);
        }
    }
}

export function handleControllerReleaseNameLabelStamperVive ( triggerEvent ) {
    if (
        controllerStateIndex.getControllerState('nameLabelFilled')
        || !controllerStateIndex.getControllerState('isNameEmptyLabelHandling')
    ) {
        return false;
    }

    activeController = triggerEvent.activeController;

    if (
        activeController.getAttribute('id') === controllerStateIndex.getControllerState('nameLabelInHand')
        && isNameLabelEmptyInHand
    ) {
        controllerStateIndex.setControllerState('nameLabelInHand', null);
    }
}


export function handleControllerStateNotifyNameLabelStamperVive (nextControllerState) {

    // drag in hand
    if (
        nextControllerState.nameLabelInHand
        && nextControllerState.isNameEmptyLabelHandling
        && !isNameLabelEmptyInHand
    ) {
        dragNameLabelEmptyInHand();
    }
    // drop down
    else if (
        !nextControllerState.nameLabelInHand
        && nextControllerState.isNameEmptyLabelHandling
        && isNameLabelEmptyInHand
    ) {
        fallDown(nameLabelEmpty);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragNameLabelEmptyInHand() {
    let controllerActivities = new controllerActions(nameLabelEmpty, activeController);
    controllerActivities.drag();
    isNameLabelEmptyInHand = activeController.getAttribute('id');
}

function dropNameLabelEmpty() {
    $(nameLabelEmpty).remove();
}

function dragNameLabelWroteInHand() {
    if (activeController.getAttribute('id') === 'viveControllerLeft') {
        nameLabelWroteLeft.setAttribute('visible', true);
    } else if (activeController.getAttribute('id') === 'viveControllerRight') {
        nameLabelWroteRight.setAttribute('visible', true);
    }
}

function drop() {
    let controllerActivities = new controllerActions(nameLabelEmpty, activeController);
    controllerActivities.drop();
    isNameLabelEmptyInHand = null;
}

function fallDown(element) {
    drop();
    setTimeout(()=>{
        dropDown(element, 0.05);
    }, 100);
}
