import {detectCollision} from "../utils/isEmitted";
import dropDown from "../utils/dropDown";
import controllerStateIndex from '../utils/controllerState';
import { controllerActions } from "../utils/controllerActions";

let element;
let activeController;
let isNameLabelFilledInHand = false;

export default AFRAME.registerComponent('name_label_filled_vive', {
    init: function () {
        element = this.el;
        activeController = null;
    }
});

export function handleControllerPresseNameLabelFilledVive ( triggerEvent ) {

}

export function handleControllerReleaseNameLabelFilledVive ( triggerEvent ) {

    if (
        !controllerStateIndex.getControllerState('nameLabelFilled')
        || controllerStateIndex.getControllerState('nameLabelPasted')
    ) {
        return false;
    }

    activeController = triggerEvent.activeController;

    // Drop down
    if (
        controllerStateIndex.getControllerState('isNameFilledLabelHandling')
        && controllerStateIndex.getControllerState('nameLabelInHand') === activeController.getAttribute('id')
        && isNameLabelFilledInHand
    ) {
        controllerStateIndex.setControllerState('nameLabelInHand', null)
    }

}

export function handleControllerStateNotifyNameLabelFilledVive (nextControllerState) {

    if (
        nextControllerState.isNameFilledLabelHandling
        && !nextControllerState.nameLabelInHand
        && isNameLabelFilledInHand
    ) {
        fallDown(element);
    }
}

export function setIsNameLabelFilledInHand(value) {
    isNameLabelFilledInHand = value;
}

function drop() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
    isNameLabelFilledInHand = null;
}

function fallDown(element) {
    drop();
    setTimeout(()=>{
        dropDown(element, 0.05);
    }, 100);
}
