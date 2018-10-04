import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

import { isDrawerOpen } from "./drawerOpenWithInfusionSet";
import  {movable } from "./infusionSet";

import { haveSthInHand } from "./controllerHand";

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
    // Must hand disinfection, before taking infusion set
    if (
        // !stateIndex.getIn(['handDisinfection', 'finish'])
        stateIndex.getIn(['handDisinfection', 'finish']) !== 2

    ) {
        return false;
    }

    if(
        detectCollision(element, triggerEvent.activeController)
        && controllerStateIndex.getControllerState('infusionSetInPackInHand') === null
        && isDrawerOpen
        && movable
        && haveSthInHand(triggerEvent.activeController).length === 0
    ){
        activeController = triggerEvent.activeController;
        controllerStateIndex.setControllerState('infusionSetInPackInHand', activeController);
    }
}

export function handleControllerStateNotifyInfusionSetInPack (nextControllerState) {
    if (
        nextControllerState.infusionSetInPackInHand !== null
        && currentControllerState.infusionSetInPackInHand === null
    ) {
        toggleBoxInfusionSetOnDesk.setAttribute('visible', true);
        dragInHand();
    }

    if (
        nextControllerState.infusionSetChecked
        && (!currentControllerState || !currentControllerState.infusionSetChecked)
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


