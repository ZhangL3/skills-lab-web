import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;
let hookInfusionSetInPack;
let toggleBoxInfusionSetOnDesk;

export default AFRAME.registerComponent('toggle_box_infusion_set_in_pack', {

    init: function(){

        element = this.el;
        hookInfusionSetInPack = document.querySelector('#hookInfusionSetInPack');
        toggleBoxInfusionSetOnDesk = document.querySelector('#toggleBoxInfusionSetOnDesk');
    },

});

export function handleControllerNotifyToggleBoxInfusionSetInPack( triggerEvent ) {
    getWorldBound(element);

    if(
        isEmitted(element, triggerEvent.position)
        && controllerStateIndex.getControllerState('infusionSetInPackInHand') !== null
    ){
        controllerStateIndex.setControllerState('infusionSetChecked', true);
    }
}


