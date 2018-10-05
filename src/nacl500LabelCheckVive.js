import $ from 'jquery';
import controllerStateIndex from '../utils/controllerState';
import stateIndex from './state';

let element;
let hookNach500Label;

AFRAME.registerComponent('nacl500_label_check_vive', {

    init: function () {
        element = this.el;
        hookNach500Label = document.querySelector('#hookNach500Label');
        
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
        || controllerStateIndex.getControllerState('nacl500LabelChecked')
    ) {
        return false;
    }

    return true;
}

function setChecked() {
    controllerStateIndex.setControllerState('nacl500LabelChecked', true);

}

export function handleControllerNotifyNacl500LabelCheckVive(triggerEvent) {

    if (shouldCheck()) {
        $(element).trigger('controllerClick');
    }
}