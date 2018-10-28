import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted,detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { isBottleChecked } from "./bottleNacl500Vive";
import { controllerActions } from "../utils/controllerActions";
import * as constants from '../utils/constants';
import stateIndex from './state';

import { haveSthInHand } from "./controllerHand";

import {canCheck} from "./bottleNacl500Vive";

let element;
let bottleNacl500Cap;
let infusionSetOpen;
let infusionSetInBottle;

let currentControllerState;
let activeController;
const bottleNacl500Scale = 0.1;

let isNacl500CapInHand = null;

export default AFRAME.registerComponent('toggle_box_nach500_cap', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');
        infusionSetOpen = document.querySelector('#infusionSetOpen');
        infusionSetInBottle =document.querySelector('#infusionSetInBottle');

        $(element).on('removeCap', ()=>{
           bottleNacl500Cap = null;
        });

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500Cap( triggerEvent ) {
    
    if (
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    // drag cap
    // if (bottleNacl500Cap
    //     && controllerStateIndex.getControllerState('nacl500OnDesk')
    //     && controllerStateIndex.getControllerState('bottleNacl500CapInHand') === null
    //     && haveSthInHand(triggerEvent.activeController).length === 0
    // ) {
    //     activeController = triggerEvent.activeController;
    //     let activeControllerId = activeController.getAttribute('id');
    //     controllerStateIndex.setControllerState('bottleNacl500CapInHand', activeControllerId);
    // }

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

export function handleControllerPressToggleBoxNacl500Cap( triggerEvent ) {

    if (
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    // drag cap
    if (bottleNacl500Cap
        && controllerStateIndex.getControllerState('nacl500OnDesk')
        && controllerStateIndex.getControllerState('bottleNacl500CapInHand') === null
        && haveSthInHand(triggerEvent.activeController).length === 0
    ) {
        activeController = triggerEvent.activeController;
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('bottleNacl500CapInHand', activeControllerId);
        controllerStateIndex.setControllerState('isNacl500CapHandling', true);

    }

}

export function handleControllerReleaseToggleBoxNacl500Cap( triggerEvent ) {

    if (
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    // pierce infusion set in bottle nacl 500
    if (
        controllerStateIndex.getControllerState('bottleNacl500CapDroped')
        && controllerStateIndex.getControllerState('infusionSetOpenInHand') === triggerEvent.activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('infusionSetInBottle') === false
    ) {
        controllerStateIndex.setControllerState('infusionSetInBottle', true);
        controllerStateIndex.setControllerState('nacl500Dragable', true);
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
        // nextControllerState.bottleOpened
        nextControllerState.infusionSetInBottle === true
        && currentControllerState.infusionSetInBottle === false
        && !controllerStateIndex.getControllerState('nacl500Hanged')
    ) {
        pierceInfusionSetInBottle();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
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
    console.log("pierceInfusionSetInBottle");
    infusionSetInBottle.setAttribute('visible', true);
    $(infusionSetOpen).remove();
}


