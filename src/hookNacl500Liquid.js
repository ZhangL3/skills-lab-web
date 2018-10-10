import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

let currentControllerState;


export default AFRAME.registerComponent('hook_nach500_liquid', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyHookNacl500Liquid( triggerEvent ) {

}

export function handleControllerStateNotifyHookNacl500Liquid (nextControllerState) {

    if (!element) {
        return false;
    }

    if (
        nextControllerState.nacl500LiquidChecked
        && !currentControllerState.nacl500LiquidChecked
        && nextControllerState.nacl500InHandToDesk !== null
    ) {
        showHookNacl500Liquid();
    }

    if (
        nextControllerState.nacl500NoHookAnymore
    ) {
        element.setAttribute('visible', false);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

export function showHookNacl500Liquid() {
    if (controllerStateIndex.getControllerState('nacl500LiquidChecked')) {
        element.setAttribute('visible', true);
        setTimeout(() => {
            element.setAttribute('visible', true);
        }, 100);
    }
}


