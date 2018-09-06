import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

let currentState;
let currentControllerState;
let element;
let activeController;
let toggleBoxInfusionSetOnDesk;
let hookInfusionSetInPack;

export default AFRAME.registerComponent('infusion_set_in_pack_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        activeController = null;
        toggleBoxInfusionSetOnDesk = document.querySelector('#toggleBoxInfusionSetOnDesk');
        hookInfusionSetInPack = document.querySelector('#hookInfusionSetInPack');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });
    }
});

export function handleNotifyInfusionSetInPack(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetInPack ( triggerEvent ) {

    getWorldBound(element);

    if(isEmitted(element, triggerEvent.position)){
        activeController = triggerEvent.activeController;
        controllerStateIndex.setControllerState('infusionSetInPackInHand', activeController);
    }
}

export function handleControllerStateNotifyInfusionSetInPack (nextControllerState) {
    if (
        // Must hand disinfection, before taking infusion set
        stateIndex.getIn(['handDisinfection', 'finish'])
        &&nextControllerState.infusionSetInPackInHand !== null
        && currentControllerState.infusionSetInPackInHand === null
    ) {
        toggleBoxInfusionSetOnDesk.setAttribute('visible', true);
        dragInHand();
    }

    if (
        nextControllerState.infusionSetChecked
        && !currentControllerState.infusionSetChecked
        && nextControllerState.infusionSetInPackInHand !== null
    ) {
        hookInfusionSetInPack.setAttribute('visible', true);
        toggleBoxInfusionSetOnDesk.setAttribute('material', "color:#00ffff; transparent: true; opacity: 0.5")
    }

    if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
    ) {
        drop();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
}

function drop() {
    $(element).remove();
}


