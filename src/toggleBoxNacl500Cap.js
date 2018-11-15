import $ from 'jquery';
import _ from 'lodash';

import { detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { controllerActions } from "../utils/controllerActions";
import stateIndex from './state';
import hints from "../utils/hints";

let element;
let bottleNacl500Cap;
let infusionSetOpen;
let infusionSetInBottle;
let activeController;
let isNacl500CapInHand = null;
let isInfusionSetInBottle = false;
const bottleNacl500Scale = 0.1;

export default AFRAME.registerComponent('toggle_box_nach500_cap', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');
        infusionSetOpen = document.querySelector('#infusionSetOpen');
        infusionSetInBottle =document.querySelector('#infusionSetInBottle');

        $(element).on('removeCap', ()=>{
           bottleNacl500Cap = null;
        });
    },

});

export function handleControllerNotifyToggleBoxNacl500Cap( triggerEvent ) {
    
    if (
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    // pierce infusion set in bottle nacl 500
    else if (
        controllerStateIndex.getControllerState('bottleNacl500CapDroped')
        && controllerStateIndex.getControllerState('infusionSetOpenInHand') === triggerEvent.activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('infusionSetInBottle') === false
    ) {
        controllerStateIndex.setControllerState('infusionSetInBottle', true);
        controllerStateIndex.setControllerState('nacl500Dragable', true);
    }
}

export function handleControllerReleaseToggleBoxNacl500Cap( triggerEvent ) {

    if (
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    activeController = triggerEvent.activeController;

    // pierce infusion set in bottle nacl 500
    if (
        controllerStateIndex.getControllerState('bottleNacl500CapDroped')
        && controllerStateIndex.getControllerState('infusionSetOpenInHand') === activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('infusionSetInBottle') === false
    ) {
        controllerStateIndex.setControllerState('infusionSetInBottle', true);
        controllerStateIndex.setControllerState('isInfusionSetOnDeskOpenedHandling', false);
        controllerStateIndex.setControllerState('nacl500Dragable', true);
        stateIndex.set('hint', hints.hang);
    }
}

export function handleControllerStateNotifyToggleBoxNacl500Cap (nextControllerState) {
    // drag cap in hand
    if (
        nextControllerState.bottleNacl500CapInHand !== null
        && isNacl500CapInHand === null
    ) {
        dragInHand();
    }

    // pierce infusion set in bottle nacl 500
    if (
        nextControllerState.infusionSetInBottle
        && !isInfusionSetInBottle
        && !nextControllerState.nacl500Hanged
    ) {
        pierceInfusionSetInBottle();
    }
}

function dragInHand() {
    if (!activeController) {
        return false;
    }
    let controllerActivities = new controllerActions(bottleNacl500Cap, activeController, bottleNacl500Scale);
    controllerActivities.drag();
    isNacl500CapInHand = activeController.getAttribute('id');
}

function pierceInfusionSetInBottle() {
    infusionSetInBottle.setAttribute('visible', true);
    $(infusionSetOpen).remove();
    isInfusionSetInBottle = true;
}


