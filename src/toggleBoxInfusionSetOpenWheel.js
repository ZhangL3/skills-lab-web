import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { isBottleChecked } from "./bottleNacl500Vive";
import { controllerActions } from "../utils/controllerActions";

import {canTriggerCapAndWheel} from "./infusionSetOpenVive";
import {setCanTriggerInfusionSetCap} from "./infusionSetCapVive";
import stateIndex from "./state";
import hints from '../utils/hints';

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
    // close wheel
    if (
        detectCollision(element, triggerEvent.activeController)
        && controllerStateIndex.getControllerState('infusionSetOnDeskOpened')
        && !controllerStateIndex.getControllerState('infusionSetWheelClosed')
        && canTriggerCapAndWheel
    ) {
        controllerStateIndex.setControllerState('infusionSetWheelClosed', true);
        setTimeout(()=>{
            setCanTriggerInfusionSetCap(true);
            stateIndex.set('hint', hints.takeOffInfusionSetCap);
        }, 500);
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetCap (nextControllerState) {

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


