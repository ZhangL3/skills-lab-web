import {detectCollision} from "../utils/isEmitted";
import dropDown from "../utils/dropDown";
import controllerStateIndex from '../utils/controllerState';
import { controllerActions } from "../utils/controllerActions";

let filledNameLabel;
let filledNameLabelId;
let activeController;
let toggleBoxNacl500NameLabel;
let isNameLabelFilledInHand = false;

export default AFRAME.registerComponent('name_label_filled_vive', {
    init: function () {
        filledNameLabel  = null;
        activeController = null;
        toggleBoxNacl500NameLabel = document.querySelector('#toggleBoxNacl500NameLabel');
    }
});

export function setFilledNameLabel(el) {
    filledNameLabel = el;
    filledNameLabelId = el.getAttribute('id');
}

export function handleControllerPressNameLabelFilledVive ( triggerEvent ) {

    if (
        !controllerStateIndex.getControllerState('nameLabelFilled')
        || controllerStateIndex.getControllerState('nameLabelPasted')
        || !controllerStateIndex.getControllerState('isNameFilledLabelHandling')
        || controllerStateIndex.getControllerState('nameLabelInHand') !== null
        // || !filledNameLabel
    ) {
        return false;
    }
    activeController = triggerEvent.activeController;
    // test
    filledNameLabel = document.querySelector(`#${filledNameLabelId}`);

    // Pick up filled name label
    if (
        detectCollision(filledNameLabel, activeController)
        && !controllerStateIndex.getControllerState('nameLabelInHand')
        && !isNameLabelFilledInHand
    ) {
        controllerStateIndex.setControllerState('nameLabelInHand', activeController.getAttribute('id'))
    }

}

export function handleControllerReleaseNameLabelFilledVive ( triggerEvent ) {

    if (
        !controllerStateIndex.getControllerState('nameLabelFilled')
        || controllerStateIndex.getControllerState('nameLabelPasted')
        || !controllerStateIndex.getControllerState('isNameFilledLabelHandling')
        // || !filledNameLabel
) {
        return false;
    }

    activeController = triggerEvent.activeController;

    // test
    filledNameLabel = document.querySelector(`#${filledNameLabelId}`);

    // Drop down
    if (
        controllerStateIndex.getControllerState('nameLabelInHand') === activeController.getAttribute('id')
        && isNameLabelFilledInHand
        && !detectCollision(filledNameLabel, toggleBoxNacl500NameLabel)
    ) {
        controllerStateIndex.setControllerState('nameLabelInHand', null);


    }

}

export function handleControllerStateNotifyNameLabelFilledVive (nextControllerState) {

    if (
        !nextControllerState.isNameFilledLabelHandling
        || !filledNameLabel
    ) {
        return false;
    }

    // Pick up
    if (
        nextControllerState.nameLabelInHand
        && !isNameLabelFilledInHand
    ) {
        dragInHand();
    }
    // Drop down
    else if (
        !nextControllerState.nameLabelInHand
        && isNameLabelFilledInHand
    ) {
        fallDown(filledNameLabel);
    }
}

export function setIsNameLabelFilledInHand(value) {
    isNameLabelFilledInHand = value;
}

function dragInHand() {
    if (!activeController) {
        return false;
    }
    let controllerActivities = new controllerActions(filledNameLabel, activeController);
    controllerActivities.drag();
    isNameLabelFilledInHand = activeController.getAttribute('id');
}

function drop() {
    let controllerActivities = new controllerActions(filledNameLabel, activeController);
    controllerActivities.drop();
    isNameLabelFilledInHand = null;
}

function fallDown(filledNameLabel) {
    drop();
    setTimeout(()=>{
        dropDown(filledNameLabel, 0.05);
    }, 100);
}
