import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

let currentControllerState;


export default AFRAME.registerComponent('hook_nach500_label', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyHookNacl500Label( triggerEvent ) {

}

export function handleControllerStateNotifyHookNacl500Label (nextControllerState) {

    if (!element) {
        return false;
    }

    if (
        nextControllerState.nacl500LabelChecked
        && !currentControllerState.nacl500LabelChecked
        && nextControllerState.nacl500InHandToDesk !== null
    ) {
        showHookNacl500Label();
    }
    if(
        nextControllerState.nacl500NoHookAnymore
    ) {
        element.setAttribute('visible', false);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

export function showHookNacl500Label() {
    if (controllerStateIndex.getControllerState('nacl500LabelChecked')) {
        element.setAttribute('visible', true);
        setTimeout(() => {
            element.setAttribute('visible', true);
        }, 100);
    }
}


