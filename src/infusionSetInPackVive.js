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
import dropDown from "../utils/dropDown";
import hints from "../utils/hints";

let currentState;
let currentControllerState;
let element;
let activeController;
let toggleBoxInfusionSetOnDesk;
let hookInfusionSetInPack;

let isInfusionSetInHand = null;

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
    /*// Must hand disinfection, before taking infusion set
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
        controllerStateIndex.setControllerState('infusionSetInPackInHand', activeController.getAttribute('id'));
    }*/
}

export function handleControllerPressInfusionSetInPack ( triggerEvent ) {
    // Must hand disinfection, before taking infusion set
    if (
        stateIndex.getIn(['handDisinfection', 'finish']) !== 2
        || !detectCollision(element, triggerEvent.activeController)

    ) {
        return false;
    }

    activeController = triggerEvent.activeController;

    // First time drag
    if(
        controllerStateIndex.getControllerState('infusionSetInPackInHand') === null
        && isDrawerOpen
        && movable
        && haveSthInHand(triggerEvent.activeController).length === 0
        && !controllerStateIndex.getControllerState('isInfusionSetInPackHandling')
    ){
        stateIndex.set('hint', hints.checkInfusionSet);
        controllerStateIndex.setControllerState('infusionSetInPackInHand', activeController.getAttribute('id'));
        controllerStateIndex.setControllerState('isInfusionSetInPackHandling', true);
    }
    // Pick up
    else if (
        controllerStateIndex.getControllerState('infusionSetInPackInHand') === null
        && movable
        && haveSthInHand(triggerEvent.activeController).length === 0
        && controllerStateIndex.getControllerState('isInfusionSetInPackHandling')
    ) {
        controllerStateIndex.setControllerState('infusionSetInPackInHand', activeController.getAttribute('id'));
    }
}

export function handleControllerReleaseInfusionSetInPack ( triggerEvent ) {
    if(
        !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }
    activeController = triggerEvent.activeController;

    if (
        controllerStateIndex.getControllerState('isInfusionSetInPackHandling')
        && activeController.getAttribute('id') === controllerStateIndex.getControllerState('infusionSetInPackInHand')
        && (
            !controllerStateIndex.getControllerState('infusionSetChecked')
            || (
                controllerStateIndex.getControllerState('infusionSetChecked')
                && !detectCollision(element, toggleBoxInfusionSetOnDesk)
                )
            )
    ) {
        controllerStateIndex.setControllerState('infusionSetInPackInHand', null);
    }
}


export function handleControllerStateNotifyInfusionSetInPack (nextControllerState) {

    // drag in hand
    if (
        nextControllerState.infusionSetInPackInHand !== null
        && !isInfusionSetInHand
    ) {
        toggleBoxInfusionSetOnDesk.setAttribute('visible', true);
        dragInHand();
    }
    // show hook
    else if (
        nextControllerState.infusionSetChecked
        && (!currentControllerState || !currentControllerState.infusionSetChecked)
        && nextControllerState.infusionSetInPackInHand !== null
    ) {
        hookInfusionSetInPack.setAttribute('visible', true);
        toggleBoxInfusionSetOnDesk.setAttribute('material', "color:#00ffff; transparent: true; opacity: 0.5")
    }
    // fall down
    else if (
        nextControllerState.isInfusionSetInPackHandling
        && nextControllerState.infusionSetInPackInHand === null
    ) {
        drop();
        fallDown(element);
    }
    // drop
    else if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
    ) {
        dropToDesk();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
    isInfusionSetInHand = true;
}

function dropToDesk() {
    $(element).remove();
    if ( activeController ) {
        isInfusionSetInHand = activeController.getAttribute('id');
    }
}

function drop() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
    isInfusionSetInHand = null;
}

function fallDown(element) {
    setTimeout(()=>{
        dropDown(element, 0.05);
    }, 100);
}
