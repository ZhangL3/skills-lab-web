import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

let currentControllerState;


export default AFRAME.registerComponent('hook_nach500_cap', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyHookNacl500Cap( triggerEvent ) {

}

export function handleControllerStateNotifyHookNacl500Cap (nextControllerState) {

    if (!element) {
        return false;
    }

    if (
        nextControllerState.nacl500CapChecked
        && !currentControllerState.nacl500CapChecked
        && nextControllerState.nacl500InHandToDesk !== null
    ) {
        showHookNacl500Cap();
    }

    if(
        nextControllerState.nacl500NoHookAnymore
    ) {
        element.setAttribute('visible', false);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

export function showHookNacl500Cap() {
    if (controllerStateIndex.getControllerState('nacl500CapChecked')) {
        element.setAttribute('visible', true);
        setTimeout(() => {
            element.setAttribute('visible', true);
        }, 100);
    }
}


