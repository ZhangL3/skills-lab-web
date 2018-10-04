import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

import {canCheck} from "./bottleNacl500Vive";

let element;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_nach500_liquid', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500Liquid( triggerEvent ) {

    if (
        !controllerStateIndex.getControllerState('nacl500LiquidChecked')
        && controllerStateIndex.getControllerState('nacl500InHandToDesk')
        && canCheck
    ) {
        getWorldBound(element);
        if(isEmitted(element, triggerEvent.position, 0.02)){
            controllerStateIndex.setControllerState('nacl500LiquidChecked', true);
        }
    }
}

export function handleControllerStateNotifyToggleBoxNacl500Liquid (nextControllerState) {

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


