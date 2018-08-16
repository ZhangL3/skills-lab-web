import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";

let element;
let bottleNacl500Cap;
let infusionSetCap;

let currentControllerState;

let activeController;

export default AFRAME.registerComponent('toggle_box_waste_bin', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');
        infusionSetCap = document.querySelector('#infusionSetOpenCap');

        activeController = null;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },

});

const schema = {
    naCl500CapInBinPosition: '0 0.679 -0.93',
    infusionSetCapInBinPosition: '-0.03 0.689 -0.83',
    dur : 500,
};

function dropBottleNacl500Cap(activeController) {
    $(bottleNacl500Cap).trigger('drop', [activeController]);
    aAnimationWrapper(bottleNacl500Cap, '', 'position', '', schema.naCl500CapInBinPosition, schema.dur, '', true, 'forwards');
}

function dropInfusionSetCap(activeController) {
    $(infusionSetCap).trigger('drop', [activeController]);
    aAnimationWrapper(infusionSetCap, '', 'position', '', schema.infusionSetCapInBinPosition, schema.dur, '', true, 'forwards');
}

export function handleControllerNotifyToggleBoxWasteBin( triggerEvent ) {

    if(
        controllerStateIndex.getControllerState('bottleNacl500CapInHand')
        && stateIndex.get('wasteBinCapOpen')
    ) {

        getWorldBound(element);
        
        // drop the cap of nacl 500
        if (
            isEmitted(element, triggerEvent.position)
            && controllerStateIndex.getControllerState('bottleNacl500CapInHand') === triggerEvent.activeController.getAttribute('id')
        ) {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('bottleNacl500CapDroped', true);
        }
    }

    if (
        controllerStateIndex.getControllerState('infusionSetCapInHand')
        && stateIndex.get('wasteBinCapOpen')
    ) {
        getWorldBound(element);

        // drop the cap of infusion set
        if (
            isEmitted(element, triggerEvent.position)
            && controllerStateIndex.getControllerState('infusionSetCapInHand') === triggerEvent.activeController.getAttribute('id')
        ) {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('infusionSetCapOff', true);
        }
    }
}

export function handleControllerStateNotifyToggleBoxWasteBin (nextControllerState) {

    // drop cap of nacl 500 bottle
    if (
        nextControllerState.bottleNacl500CapInHand
        && nextControllerState.bottleNacl500CapDroped
        && !currentControllerState.bottleNacl500CapDroped
    ) {
        dropBottleNacl500Cap(activeController);
    }

    // drop cap of infusion set
    if (
        nextControllerState.infusionSetCapInHand
        && nextControllerState.infusionSetCapOff
        && !currentControllerState.infusionSetCapOff
    ) {
        dropInfusionSetCap(activeController);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


