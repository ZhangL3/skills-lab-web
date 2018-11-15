import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import {canCheck} from "./bottleNacl500Vive";

let element;

export default AFRAME.registerComponent('toggle_box_nach500_label', {

    init: function(){
        element = this.el;
    },

});

export function handleControllerNotifyToggleBoxNacl500Label( triggerEvent ) {
    if (
        !controllerStateIndex.getControllerState('nacl500LabelChecked')
        && canCheck
    ) {
        if(controllerStateIndex.getControllerState('nacl500InHandToDesk')) {
            getWorldBound(element);
            if(isEmitted(element, triggerEvent.position)){
                controllerStateIndex.setControllerState('nacl500LabelChecked', true);
            }
        }
    }
}


