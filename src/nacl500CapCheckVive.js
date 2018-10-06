import $ from 'jquery';
import controllerStateIndex from '../utils/controllerState';
import {getWordPosition} from "../utils/getWorldPositionAndBound";

let element;
let capDistanceToCamera;
let labelDistanceToCamera;
let liquidDistanceToCamera;
let isClosest = false;

let transparentNacl500Liquid;
let transparentNacl500Label;
let raycasterVive;

AFRAME.registerComponent('nacl500_cap_check_vive', {

    init: function () {
        element = this.el;
        transparentNacl500Liquid = document.querySelector('#transparentNacl500Liquid');
        transparentNacl500Label = document.querySelector('#transparentNacl500Label');
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

            isClosest = capDistanceToCamera < labelDistanceToCamera
                && capDistanceToCamera < liquidDistanceToCamera;

            if (isStaring && isClosest) {
                setChecked();
            }
        })
    }
});

function shouldCheck() {
    return !(controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
        || controllerStateIndex.getControllerState('nacl500CapChecked'));
}

function setChecked() {
    controllerStateIndex.setControllerState('nacl500CapChecked', true);
}

export function handleControllerNotifyNacl500CapCheckVive(triggerEvent) {
    if (
        shouldCheck()
    ) {
        capDistanceToCamera = getWordPosition(element).distanceTo(getWordPosition(raycasterVive));
        labelDistanceToCamera = getWordPosition(transparentNacl500Label).distanceTo(getWordPosition(raycasterVive));
        liquidDistanceToCamera = getWordPosition(transparentNacl500Liquid).distanceTo(getWordPosition(raycasterVive));

        $(element).trigger('controllerClick');
    }
}