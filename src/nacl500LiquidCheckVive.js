import $ from 'jquery';
import controllerStateIndex from '../utils/controllerState';
import {getWordPosition} from "../utils/getWorldPositionAndBound";

let element;
let liquidDistanceToCamera;
let labelDistanceToCamera;
let capDistanceToCamera;
let isClosest = false;

let transparentNacl500Cap;
let transparentNacl500Label;
let raycasterVive;

AFRAME.registerComponent('nacl500_liquid_check_vive', {

    init: function () {
        element = this.el;
        transparentNacl500Cap = document.querySelector('#transparentNacl500Cap');
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

            isClosest = liquidDistanceToCamera < labelDistanceToCamera
                && liquidDistanceToCamera < capDistanceToCamera;

            if (isStaring && isClosest) {
                setChecked();
            }
        })
    }
});

function shouldCheck() {
    return !(controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
        || controllerStateIndex.getControllerState('nacl500LiquidChecked'));
}

function setChecked() {
    controllerStateIndex.setControllerState('nacl500LiquidChecked', true);
}

export function handleControllerNotifyNacl500LiquidCheckVive(triggerEvent) {
    if (
        shouldCheck()
    ) {

        liquidDistanceToCamera = getWordPosition(element).distanceTo(getWordPosition(raycasterVive));
        labelDistanceToCamera = getWordPosition(transparentNacl500Label).distanceTo(getWordPosition(raycasterVive));
        capDistanceToCamera = getWordPosition(transparentNacl500Cap).distanceTo(getWordPosition(raycasterVive));

        $(element).trigger('controllerClick');
    }
}