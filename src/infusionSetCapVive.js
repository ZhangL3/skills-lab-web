import controllerStateIndex from '../utils/controllerState';
import { detectCollision } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";
import { haveSthInHand } from "./controllerHand";
import {canTriggerCapAndWheel} from "./infusionSetOpenVive";
import dropDown from "../utils/dropDown";
import hasCollisionWithCabinets from "../utils/hasCollisionWithCabinets";

let element;
let activeController;
let canTriggerInfusionSetCap = false;
let isInfusionSetCapInHand = null;
const scopeLocalToGlobalScale = 0.05;

export default AFRAME.registerComponent('infusion_set_cap_vive', {
    init: function(){
        element = this.el;
        activeController = null;
    }
});

export function setCanTriggerInfusionSetCap(value) {
    canTriggerInfusionSetCap = value;
}

export function handleControllerPressInfusionSetCap ( triggerEvent ) {

    if (!detectCollision(element, triggerEvent.activeController)) {
        return false;
    }

    if (
        controllerStateIndex.getControllerState('infusionSetOnDeskOpened')
        && haveSthInHand(triggerEvent.activeController).length === 0
        && canTriggerCapAndWheel
        && canTriggerInfusionSetCap
    ) {
        activeController = triggerEvent.activeController;
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('infusionSetCapInHand', activeControllerId);
        controllerStateIndex.setControllerState('isInfusionSetCapInHandling', true);
    }
}

export function handleControllerReleaseInfusionSetCap ( triggerEvent ) {
    activeController = triggerEvent.activeController;

    if (
        controllerStateIndex.getControllerState('infusionSetCapInHand') === activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('isInfusionSetCapInHandling')
        && !detectCollision(element, toggleBoxWasteBin)
        && !hasCollisionWithCabinets(element)
    ) {
        controllerStateIndex.setControllerState('infusionSetCapInHand', null);
    }
}

export function handleControllerStateNotifyInfusionSetCap (nextControllerState) {

    if (
        nextControllerState.infusionSetCapInHand
        && !isInfusionSetCapInHand
        && nextControllerState.isInfusionSetCapInHandling
        && !controllerStateIndex.getControllerState('infusionSetCapOff')
    ) {
        dragInHand();
    }
    else if (
        !nextControllerState.infusionSetCapInHand
        && isInfusionSetCapInHand
        && nextControllerState.isInfusionSetCapInHandling
    ) {
        fallDown(element);
    }
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController, scopeLocalToGlobalScale, -1);
    controllerActivities.drag();
    isInfusionSetCapInHand = activeController.getAttribute('id');
}

export function drop(activeController) {
    let controllerActivities = new controllerActions(element, activeController, -1, scopeLocalToGlobalScale);
    controllerActivities.drop();
    isInfusionSetCapInHand = null;
}

function fallDown(element) {
    drop(activeController);
    setTimeout(()=>{
        dropDown(element, 0.05);
    }, 100);
}
