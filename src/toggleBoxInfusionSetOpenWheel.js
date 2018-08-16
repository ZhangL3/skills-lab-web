import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { isBottleChecked } from "./bottleNacl500Vive";
import { controllerActions } from "../utils/controllerActions";

let element;

let currentControllerState;
let activeController;


export default AFRAME.registerComponent('toggle_box_infusion_set_open_wheel', {

    init: function(){

        element = this.el;
        activeController = null;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxInfusionSetCap( triggerEvent ) {
    getWorldBound(element);

    // close wheel
    if (
        isEmitted(element, triggerEvent.position)
        && controllerStateIndex.getControllerState('infusionSetOnDeskOpened')
        && !controllerStateIndex.getControllerState('infusionSetWheelClosed')
    ) {
        console.log("trigger wheel");
        controllerStateIndex.setControllerState('infusionSetWheelClosed', true)
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetCap (nextControllerState) {

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


