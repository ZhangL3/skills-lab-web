import $ from 'jquery';
import controllerStateIndex from '../utils/controllerState';

let element;

AFRAME.registerComponent('infusion_set_in_pack_check_vive', {

    init: function () {
        element = this.el;

        let isStaring = false;

        $(element).on('raycaster-intersected', (event) => {
            if (shouldCheck()) {
                isStaring = true;
            }
        });

        $(element).on('raycaster-intersected-cleared', (event) => {
            if (shouldCheck()) {
                isStaring = false;
            }
        });

        $(element).on('controllerClick', () => {
            if (isStaring) {
                setChecked();
            }
        })
    }
});

function shouldCheck() {
    return !(controllerStateIndex.getControllerState('infusionSetInPackInHand') === null
        || controllerStateIndex.getControllerState('infusionSetChecked'));
}

function setChecked() {
    controllerStateIndex.setControllerState('infusionSetChecked', true);
}

export function handleControllerNotifyInfusionSetInPackCheckVive(triggerEvent) {
    if (
        shouldCheck()
    ) {
        $(element).trigger('controllerClick');
    }
}