import $ from 'jquery';

import { detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { canWrite } from "./nameLabelStamperVive";
import {setIsNameLabelFilledInHand} from "./nameLabelFilledVive";
import {setFilledNameLabel} from "./nameLabelFilledVive";
import hints from "../utils/hints";
import stateIndex from './state';

let element;
let nameLabelWroteLeft;
let nameLabelWroteRight;
let nameLabelEmpty;
let isNameLabelFilled = false;

export default AFRAME.registerComponent('toggle_box_name_label_empty', {

    init: function(){
        element = this.el;
        nameLabelWroteLeft = document.querySelector('#nameLabelWroteLeft');
        nameLabelWroteRight = document.querySelector('#nameLabelWroteRight');
        nameLabelEmpty =document.querySelector('#nameLabelEmpty');
    },

});

export function handleControllerNotifyToggleBoxNameLabelEmpty( triggerEvent ) {

    if (
        controllerStateIndex.getControllerState('nameLabelInHand')
        && !controllerStateIndex.getControllerState('nameLabelFilled')
        && canWrite
    ) {
        if(
            triggerEvent.activeController.getAttribute('id') !== controllerStateIndex.getControllerState('nameLabelInHand')
            && detectCollision(element, triggerEvent.activeController)
        ){
            controllerStateIndex.setControllerState('nameLabelFilled', true);
            controllerStateIndex.setControllerState('isNameEmptyLabelHandling', false);
            controllerStateIndex.setControllerState('isNameFilledLabelHandling', true);
            stateIndex.set('hint', hints.pasteNameLabel);
        }
    }
}

export function handleControllerStateNotifyToggleBoxNameLabelEmpty (nextControllerState) {
    if (
        nextControllerState.nameLabelFilled
        && !isNameLabelFilled
    ) {
        writeNameLabel();
    }
}

function writeNameLabel() {
    const activeHandId = controllerStateIndex.getControllerState('nameLabelInHand');
    if (activeHandId === 'viveControllerLeft') {
        nameLabelWroteLeft.setAttribute('visible', true);
        setFilledNameLabel(nameLabelWroteLeft);
        $(nameLabelWroteRight).remove();
    }
    else if (activeHandId === 'viveControllerRight') {
        nameLabelWroteRight.setAttribute('visible', true);
        setFilledNameLabel(nameLabelWroteRight);
        $(nameLabelWroteLeft).remove();
    }
    $(nameLabelEmpty).remove();
    isNameLabelFilled = true;
    setIsNameLabelFilledInHand(activeHandId);
}


