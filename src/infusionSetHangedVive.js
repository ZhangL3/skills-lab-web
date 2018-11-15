import $ from 'jquery';
import _ from 'lodash';

import controllerStateIndex from '../utils/controllerState';

let currentControllerState;
let element;

export let canTriggerChamberAndWheel = false;

export default AFRAME.registerComponent('infusion_set_hanged_vive', {

    init: function(){
        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });
    }
});

const schema = {
  dur: 800
};

export function setCanTriggerChamberAndWheel(value) {
    canTriggerChamberAndWheel = value;
}

export function handleControllerStateNotifyInfusionSetHangedVive (nextControllerState) {

    if (
        nextControllerState.nacl500Hanged
        && !currentControllerState.nacl500Hanged
    ) {
        // Wait until nacl 500 bottle hanged
        setTimeout(()=>{
            element.setAttribute('visible', true);
        }, 1000);
    }

    if (
        nextControllerState.dripChamberFilled
        && !nextControllerState.infusionSetWheelClosed
        && currentControllerState.dripChamberFilled
    ) {
        setTimeout(() => {
            element.setAttribute('visible', false);
        }, schema.dur);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}
