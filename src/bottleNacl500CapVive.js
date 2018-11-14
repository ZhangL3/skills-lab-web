import $ from 'jquery';
import _ from 'lodash';

import { detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { controllerActions } from "../utils/controllerActions";
import { haveSthInHand } from "./controllerHand";
import dropDown from "../utils/dropDown";
import hasCollisionWithCabinets from "../utils/hasCollisionWithCabinets";

let element;
let toggleBoxWasteBin;
let currentControllerState;
let activeController;
const bottleNacl500Scale = 0.1;
let isNacl500CapInHand = null;

export default AFRAME.registerComponent('bottle_nacl500_cap_vive', {

    init: function(){

        element = this.el;
        toggleBoxWasteBin = document.querySelector('#toggleBoxWasteBin');

        $(element).on('removeCap', ()=>{
            // bottleNacl500Cap = null;
        });

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

export function handleControllerPressBottleNacl500CapVive( triggerEvent ) {

    if (!element
        || !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    // drag cap
    if (element
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

export function handleControllerReleaseBottleNacl500CapVive( triggerEvent ) {
    if (
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    if (
        controllerStateIndex.getControllerState('bottleNacl500CapInHand') === triggerEvent.activeController.getAttribute('id')
        && !detectCollision(toggleBoxWasteBin, activeController)
        && !hasCollisionWithCabinets(element)
    ) {
        controllerStateIndex.setControllerState('bottleNacl500CapInHand', null);
    }
}

export function handleControllerStateNotifyBottleNacl500CapVive (nextControllerState) {
    // drag cap in hand
    if (
        nextControllerState.bottleNacl500CapInHand !== null
        && isNacl500CapInHand === null
        && nextControllerState.isNacl500CapHandling
    ) {
        dragInHand();
    }
    // drop cap down
    else if (
        nextControllerState.isNacl500CapHandling
        && nextControllerState.bottleNacl500CapInHand === null
        && isNacl500CapInHand !== null
    ) {
        fallDown(element);
    }

    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    if (!activeController) {
        return false;
    }
    let controllerActivities = new controllerActions(element, activeController, bottleNacl500Scale);
    controllerActivities.drag();
    isNacl500CapInHand = activeController.getAttribute('id');
}

function drop() {
    let controllerActivities = new controllerActions(element, activeController, -1, 0.1);
    controllerActivities.drop();
    isNacl500CapInHand = null;
}

function fallDown(element) {
    drop();
    setTimeout(()=>{
        dropDown(element, 0.05);
    }, 100);
}



