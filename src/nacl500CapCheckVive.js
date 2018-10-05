import $ from 'jquery';
import controllerStateIndex from '../utils/controllerState';
import stateIndex from './state';

let element;

AFRAME.registerComponent('nacl500_cap_check_vive', {

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
    if (
        controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
        || controllerStateIndex.getControllerState('nacl500CapChecked')
    ) {
        return false;
    }

    return true;
}

function setChecked() {
    controllerStateIndex.setControllerState('nacl500CapChecked', true);

}

export function handleControllerNotifyNacl500CapCheckVive(triggerEvent) {

    if (shouldCheck()) {
        $(element).trigger('controllerClick');
    }
}