import _ from 'lodash';

import controllerStateIndex from '../utils/controllerState';

let element;
let currentControllerState;

export default AFRAME.registerComponent('hook_nach500_cap', {

    init: function(){

        element = this.el;

        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },
});

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


