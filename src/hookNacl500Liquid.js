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

    console.log("nextControllerState: ", nextControllerState, typeof(nextControllerState));

    if (!element) {
        return false;
    }

    if (nextControllerState.nacl500LiquidChecked && nextControllerState.nacl500InHandToDesk) {
        element.setAttribute('visible', true);
    }
    else {
        element.setAttribute('visible', false);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


