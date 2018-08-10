import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_nach500_label', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500Label( triggerEvent ) {

    if(controllerStateIndex.getControllerState('nacl500InHandToDesk')) {
        getWorldBound(element);
        if(isEmitted(element, triggerEvent.position)){
            controllerStateIndex.setControllerState('nacl500LabelChecked', true);
        }
    }
}

export function handleControllerStateNotifyToggleBoxNacl500Label (nextControllerState) {

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


