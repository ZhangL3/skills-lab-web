import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import { detectCollision } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";
import { haveSthInHand } from "./controllerHand";
import {canTakeBottle} from "./nacl500DoorOpen";
import dropDown from '../utils/dropDown';
import {showHookNacl500Cap} from "./hookNacl500Cap";
import {showHookNacl500Label} from "./hookNacl500Label";
import {showHookNacl500Liquid} from "./hookNacl500Liquid";
import hints from "../utils/hints";
import hasCollisionWithCabinets from "../utils/hasCollisionWithCabinets";

let element;
let currentState;
let activeController;
let infusionSetInBottle;
let currentControllerState;
let toggleBoxNacl500OnDesk;
let toggleBoxNacl500Hanged;
let isNacl500InHand = null;
export let canCheck = false;

export default AFRAME.registerComponent('bottle_nacl_500_vive', {

    init: function(){
        element = this.el;
        infusionSetInBottle = document.querySelector('#infusionSetInBottle');
        toggleBoxNacl500OnDesk = document.querySelector('#toggleBoxNacl500OnDesk');
        toggleBoxNacl500Hanged = document.querySelector('#toggleBoxNacl500Hanged');

        currentState = _.cloneDeep(stateIndex.getState());
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(element).on('click', () => {
        });

        $(element).on('putOnDesk', () => {
            dropBottle();
            controllerStateIndex.setControllerState('nacl500InHandToDesk', null);
            controllerStateIndex.setControllerState('nacl500Dragable', false);
            controllerStateIndex.setControllerState('nacl500NoHookAnymore', true);
            setTimeout(()=>{
                controllerStateIndex.setControllerState('nacl500OnDesk', true);
            }, 500);
        });

        $(element).on('hangToStand', () => {
            dropBottleToHang();
            controllerStateIndex.setControllerState('nacl500InHandToStand', null);
            controllerStateIndex.setControllerState('nacl500Hanged', true);
            stateIndex.setIn(['bottlePrepare', 'finish'], true);
            controllerStateIndex.setControllerState('nacl500Dragable', false);
            controllerStateIndex.setControllerState('isNacl500ToStandHandling', false);
        });

    }
});

export function handleControllerPressBottleNacl500Vive ( triggerEvent ) {

    if (!detectCollision(element, triggerEvent.activeController)) {
        return false;
    }

    // to desk
    if (
        stateIndex.getIn(['handDisinfection', 'finish']) === 2
        && controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
        && controllerStateIndex.getControllerState('nacl500Dragable')
        && !controllerStateIndex.getControllerState('infusionSetInBottle')
        && haveSthInHand(triggerEvent.activeController).length === 0
        && canTakeBottle
    ) {
        activeController = triggerEvent.activeController;
        let activeControllerId =  activeController.getAttribute('id');
        stateIndex.set('hint', hints.checkDrug);
        controllerStateIndex.setControllerState('nacl500InHandToDesk', activeControllerId);
        controllerStateIndex.setControllerState('isNacl500ToDeskHandling', true);
    }

    // to stand
    if (
        controllerStateIndex.getControllerState('infusionSetInBottle')
        && controllerStateIndex.getControllerState('nacl500InHandToStand') === null
        && haveSthInHand(triggerEvent.activeController).length === 0
    ) {
        activeController = triggerEvent.activeController;
        let activeControllerId =  activeController.getAttribute('id');
        controllerStateIndex.setControllerState('nacl500InHandToStand', activeControllerId);
        controllerStateIndex.setControllerState('isNacl500ToStandHandling', true);
    }
}

export function handleControllerReleaseBottleNacl500Vive ( triggerEvent ) {

    // drop during dragging to desk
    if (
        controllerStateIndex.getControllerState('nacl500InHandToDesk') === triggerEvent.activeController.getAttribute('id')
        && !detectCollision(toggleBoxNacl500OnDesk, triggerEvent.activeController)
        && !hasCollisionWithCabinets(element)
    ) {
        controllerStateIndex.setControllerState('nacl500InHandToDesk', null);
        isNacl500InHand = null;
    }
    // drop during dragging to stand
    else if(
        controllerStateIndex.getControllerState('nacl500InHandToStand') === triggerEvent.activeController.getAttribute('id')
        && !detectCollision(toggleBoxNacl500Hanged, triggerEvent.activeController)
        && !hasCollisionWithCabinets(element)
    ) {
        controllerStateIndex.setControllerState('nacl500InHandToStand', null);
        isNacl500InHand = null;
    }
}

export function handleControllerStateNotifyBottleNacl500Vive (nextControllerState) {

    // drag to desk
    if (
        nextControllerState.nacl500InHandToDesk !== null
        && isNacl500InHand === null
        && nextControllerState.nacl500Dragable
    ) {
        dragInHand();
        showAllHooks();
        setTimeout(()=>{
            canCheck = true;
        }, 500);

        currentControllerState = _.cloneDeep(nextControllerState);
    }
    // drag to stand
    if (
        nextControllerState.nacl500InHandToStand !== null
        && isNacl500InHand === null
        && nextControllerState.nacl500Dragable
    ) {
        dragInHandToHang();

        // toggleBoxNacl500OnDesk is shown here, but don't know the reason. So hide it. NOT good.
        let toggleBoxNacl500OnDesk = document.querySelector('#toggleBoxNacl500OnDesk');
        toggleBoxNacl500OnDesk.setAttribute('visible', false);
        // Wait for the finish of DOM change
        setTimeout(() => {
            infusionSetInBottle.setAttribute('visible', true);
        }, 50);
    }
    // Drop down to floor during putting on table
    else if (
        nextControllerState.nacl500InHandToDesk === null
        && isNacl500InHand !== null
        && !stateIndex.getIn(['bottlePrepare', 'finish'])
        && nextControllerState.isNacl500ToDeskHandling
    ) {
        dropBottle();
        setTimeout(()=>{
            dropDown(element);
        }, 100);
    }
    // Drop down to floor during hanging to stand
    else if (
        nextControllerState.nacl500InHandToStand === null
        && isNacl500InHand !== null
        && !stateIndex.getIn(['bottlePrepare', 'finish'])
        && nextControllerState.isNacl500ToStandHandling
    ) {
        dropBottleToHang();
        setTimeout(()=>{
            dropDown(element);
        }, 100);
    }

    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    isNacl500InHand = activeController.getAttribute('id');
    controllerActivities.drag();
}

function dragInHandToHang() {
    let controllerActivities = new controllerActions(element, activeController);
    isNacl500InHand = activeController.getAttribute('id');
    controllerActivities.drag();
}

function dropBottle() {
    let controllerActivities = new controllerActions(element, activeController);
    isNacl500InHand = null;
    controllerActivities.drop();
}

function dropBottleToHang() {
    let controllerActivities = new controllerActions(element, activeController);
    isNacl500InHand = null;
    controllerActivities.drop();
}

export function isBottleChecked() {
    if (!controllerStateIndex.getControllerState('nacl500LabelChecked')) {
        return false;
    }
    if (!controllerStateIndex.getControllerState('nacl500LiquidChecked')) {
        return false;
    }
    if (!controllerStateIndex.getControllerState('nacl500CapChecked')) {
        return false;
    }
    return true;
}

function showAllHooks() {
    showHookNacl500Liquid();
    showHookNacl500Label();
    showHookNacl500Cap();
}


