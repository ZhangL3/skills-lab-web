import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { isBottleChecked } from "./bottleNacl500Vive";
import { controllerActions } from "../utils/controllerActions";

let element;
let bottleNacl500Cap;
let infusionSetOpen;
let infusionSetInBottle;

let currentControllerState;
let activeController;
const bottleNacl500Scale = 0.1;


export default AFRAME.registerComponent('toggle_box_nach500_cap', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');
        infusionSetOpen = document.querySelector('#infusionSetOpen');
        infusionSetInBottle =document.querySelector('#infusionSetInBottle');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500Cap( triggerEvent ) {

    getWorldBound(element);
    if (!isEmitted(element, triggerEvent.position)) {
        return false;
    }

    // check cap
    if (!controllerStateIndex.getControllerState('nacl500CapChecked')) {
        if(controllerStateIndex.getControllerState('nacl500InHandToDesk')) {
            controllerStateIndex.setControllerState('nacl500CapChecked', true);
        }
    }

    // drag cap
    if (controllerStateIndex.getControllerState('nacl500OnDesk')
        && controllerStateIndex.getControllerState('bottleNacl500CapInHand') === null
        // && controllerStateIndex.getControllerState('bottleOpened')
    ) {
        activeController = triggerEvent.activeController;
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('bottleNacl500CapInHand', activeControllerId);
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

    // console.log(nextControllerState.infusionSetInBottle === true);
    // console.log(currentControllerState.infusionSetOpenInHand === false);
    // console.log("nextControllerState: ", nextControllerState, typeof(nextControllerState));
    // console.log("currentControllerState: ", currentControllerState, typeof(currentControllerState));

    // drag cap in hand
    if (
        nextControllerState.bottleNacl500CapInHand !== null
        && currentControllerState.bottleNacl500CapInHand === null
    ) {
        dragInHand();
    }

    // pierce infusion set in bottle nacl 500
    if (
        nextControllerState.infusionSetInBottle === true
        && currentControllerState.infusionSetInBottle === false
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
}

function pierceInfusionSetInBottle() {
    console.log("pierceInfusionSetInBottle");
    infusionSetInBottle.setAttribute('visible', true);
    $(infusionSetOpen).remove();
}


