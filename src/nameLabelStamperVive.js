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
let nameLabelEmpty;
let nameLabelWroteLeft;
let nameLabelWroteRight;
let activeController;
let infusionSetWheel;

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

    if (
        !stateIndex.getIn(['infusionSet', 'finish'])
    ) {
        return false;
    }

    if (
        !controllerStateIndex.getControllerState('nameLabelInHand')
        && !stateIndex.getIn(['nameLabel', 'finish'])
    ) {
        getWorldBound(element);

        // take name label in hand
        if (
            isEmitted(element, triggerEvent.position)
        ) {
            activeController = triggerEvent.activeController;
            let activeControllerId = activeController.getAttribute('id');
            controllerStateIndex.setControllerState('nameLabelInHand', activeControllerId);
            // after 2 second can write name label
            setTimeout(()=>{
                canWrite = true;
            }, 2000);
        }
    }


}

export function handleControllerStateNotifyNameLabelStamperVive (nextControllerState) {

    if (
        nextControllerState.nameLabelInHand
        && currentControllerState.nameLabelInHand === null
    ) {
        dragNameLabelEmptyInHand();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragNameLabelEmptyInHand() {
    let controllerActivities = new controllerActions(nameLabelEmpty, activeController);
    controllerActivities.drag();
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

function pastNameLabelWrote() {

}
