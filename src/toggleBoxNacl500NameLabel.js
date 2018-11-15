import $ from 'jquery';
import _ from 'lodash';

import { detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import stateIndex from './state';
import hints from "../utils/hints";

let element;
let nameLabelWroteOnBottle;
let nameLabelWroteLeft;
let nameLabelWroteRight;
let currentControllerState;

export default AFRAME.registerComponent('toggle_box_nach500_name_label', {

    init: function(){

        element = this.el;
        nameLabelWroteOnBottle = document.querySelector('#nameLabelWroteOnBottle');
        nameLabelWroteLeft =document.querySelector('#nameLabelWroteLeft');
        nameLabelWroteRight =document.querySelector('#nameLabelWroteRight');

        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },

});

export function handleControllerReleaseToggleBoxNacl500NameLabel( triggerEvent ) {
    if (!controllerStateIndex.getControllerState('nameLabelFilled')) {
        return false;
    }

    if (
        controllerStateIndex.getControllerState('nameLabelInHand') === triggerEvent.activeController.getAttribute('id')
        && detectCollision(element, triggerEvent.activeController)
        && controllerStateIndex.getControllerState('nameLabelFilled')
        && !stateIndex.getIn(['nameLabel', 'finish'])
    ) {
        controllerStateIndex.setControllerState('nameLabelPasted', true);
        controllerStateIndex.setControllerState('isNameFilledLabelHandling', false);
        stateIndex.setIn(['nameLabel', 'finish'], true);
        stateIndex.set('hint', hints.wellDone);
    }
}

export function handleControllerStateNotifyToggleBoxNacl500NameLabel (nextControllerState) {

    if (
        nextControllerState.nameLabelInHand
        && !currentControllerState.nameLabelInHand
    ) {
        element.setAttribute('visible', true);
    }

    if (
        nextControllerState.nameLabelFilled
        && !currentControllerState.nameLabelFilled
    ) {
        element.setAttribute('material',"color:#00ffff; transparent: true; opacity: 0.5");
    }

    if (
        nextControllerState.nameLabelPasted
    ) {
        element.setAttribute('visible', false);
        pastNameLabel();
    }

    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function pastNameLabel () {
    nameLabelWroteOnBottle.setAttribute('visible', true);
    $(nameLabelWroteLeft).remove();
    $(nameLabelWroteRight).remove();
}
