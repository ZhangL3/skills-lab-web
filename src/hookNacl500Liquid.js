import _ from 'lodash';

import controllerStateIndex from '../utils/controllerState';

let element;
let currentControllerState;

export default AFRAME.registerComponent('hook_nach500_liquid', {
    init: function(){
        element = this.el;
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },
});

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


