import $ from 'jquery';
import controllerStateIndex from '../utils/controllerState';
import {getWordPosition} from "../utils/getWorldPositionAndBound";

let element;
let labelDistanceToCamera;
let liquidDistanceToCamera;
let capDistanceToCamera;
let isClosest = false;

let transparentNacl500Cap;
let transparentNacl500Liquid;
let raycasterVive;

AFRAME.registerComponent('nacl500_label_check_vive', {

    init: function () {
        element = this.el;
        transparentNacl500Cap = document.querySelector('#transparentNacl500Cap');
        transparentNacl500Liquid = document.querySelector('#transparentNacl500Liquid');
        raycasterVive = document.querySelector('#raycasterVive');

        let isStaring = false;

        $(element).on('raycaster-intersected', (event) => {
            if (shouldCheck()) {
                isStaring = true;
            }
        });

        $(element).on('raycaster-intersected-cleared', (event) => {
            if (shouldCheck()) {
                isStaring = false;
                isClosest = false;
            }
        });

        $(element).on('controllerClick', () => {
            isClosest = labelDistanceToCamera < liquidDistanceToCamera
                && labelDistanceToCamera < capDistanceToCamera;

            if (isStaring && isClosest) {
                setChecked();
            }
        })
    }
});

function shouldCheck() {
    return !(controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
        || controllerStateIndex.getControllerState('nacl500LabelChecked'));
}

function setChecked() {
    controllerStateIndex.setControllerState('nacl500LabelChecked', true);
}

export function handleControllerNotifyNacl500LabelCheckVive(triggerEvent) {
    if (
        shouldCheck()
    ) {
        labelDistanceToCamera = getWordPosition(element).distanceTo(getWordPosition(raycasterVive));
        liquidDistanceToCamera = getWordPosition(transparentNacl500Liquid).distanceTo(getWordPosition(raycasterVive));
        capDistanceToCamera = getWordPosition(transparentNacl500Cap).distanceTo(getWordPosition(raycasterVive));

        $(element).trigger('controllerClick');
    }
}