import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { isBottleChecked } from "./bottleNacl500Vive";
import { controllerActions } from "../utils/controllerActions";

let element;
let hookInfusionSetInPack;
let toggleBoxInfusionSetOnDesk;

let currentControllerState;
let activeController;


export default AFRAME.registerComponent('toggle_box_infusion_set_in_pack', {

    init: function(){

        element = this.el;
        hookInfusionSetInPack = document.querySelector('#hookInfusionSetInPack');
        toggleBoxInfusionSetOnDesk = document.querySelector('#toggleBoxInfusionSetOnDesk');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxInfusionSetInPack( triggerEvent ) {
    getWorldBound(element);

    if(
        isEmitted(element, triggerEvent.position)
        && controllerStateIndex.getControllerState('infusionSetInPackInHand') !== null
    ){
        controllerStateIndex.setControllerState('infusionSetChecked', true);
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetInPack (nextControllerState) {

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


