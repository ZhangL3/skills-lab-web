import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

import { haveSthInHand } from "./controllerHand";

import {canTakeBottle} from "./nacl500DoorOpen";
import dropDown from '../utils/dropDown';

import {showHookNacl500Cap} from "./hookNacl500Cap";
import {showHookNacl500Label} from "./hookNacl500Label";
import {showHookNacl500Liquid} from "./hookNacl500Liquid";

let element;
let currentState;

let activeController;
let infusionSetInBottle;

let currentControllerState;

let toggleBoxNacl500OnDesk;
let toggleBoxNacl500Hanged;

let isNacl500Open = false;
let isNacl500InHand = null;

export let canCheck = false;

const schema = {
    onDeskPosition: '-0.32 0.732 -0.83',
    dur: '500'
};

export default AFRAME.registerComponent('bottle_nacl_500_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        infusionSetInBottle = document.querySelector('#infusionSetInBottle');
        toggleBoxNacl500OnDesk = document.querySelector('#toggleBoxNacl500OnDesk');
        toggleBoxNacl500Hanged = document.querySelector('#toggleBoxNacl500Hanged');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(element).on('click', () => {
        });

        $(element).on('putOnDesk', () => {
            console.log("triggle putOnDesk");
            dropBottle();
            controllerStateIndex.setControllerState('nacl500InHandToDesk', null);
            controllerStateIndex.setControllerState('nacl500Dragable', false);
            controllerStateIndex.setControllerState('nacl500NoHookAnymore', true);
            setTimeout(()=>{
                controllerStateIndex.setControllerState('nacl500OnDesk', true);
            }, 500);
        });

        $(element).on('hangToStand', () => {
            console.log("hang to stand");
            dropBottleToHang();
            controllerStateIndex.setControllerState('nacl500InHandToStand', null);
            controllerStateIndex.setControllerState('nacl500Hanged', true);
            stateIndex.setIn(['bottlePrepare', 'finish'], true);
            controllerStateIndex.setControllerState('nacl500Dragable', false);
        });

    }
});

export function handleNotifyBottleNacl500Vive(nextState) {
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyBottleNacl500Vive ( triggerEvent ) {

    if (!detectCollision(element, triggerEvent.activeController)) {
       return false;
    }

    if(triggerEvent.eventName === 'triggerDown') {
        // to desk
        if (
            stateIndex.getIn(['handDisinfection', 'finish']) === 2
            && controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
            && controllerStateIndex.getControllerState('nacl500Dragable')
            && !controllerStateIndex.getControllerState('infusionSetInBottle')
            && haveSthInHand(triggerEvent.activeController).length === 0
            && canTakeBottle
        ) {
            console.log("emmit triggerDown to bottle");
            activeController = triggerEvent.activeController;
            let activeControllerId =  activeController.getAttribute('id');
            controllerStateIndex.setControllerState('nacl500InHandToDesk', activeControllerId);
        }
        // change hints
        else if (
            stateIndex.getIn(['handDisinfection', 'finish']) !== 2
            && controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
            && controllerStateIndex.getControllerState('nacl500Dragable')
        ) {
            console.log("Disinfect hands before taking bottle");
        }

        // to stand
        if (
            controllerStateIndex.getControllerState('infusionSetInBottle')
            && controllerStateIndex.getControllerState('nacl500InHandToStand') === null
            && haveSthInHand(triggerEvent.activeController).length === 0
        ) {
            console.log("to stand");
            activeController = triggerEvent.activeController;
            let activeControllerId =  activeController.getAttribute('id');
            controllerStateIndex.setControllerState('nacl500InHandToStand', activeControllerId);
        }
    }
}

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
        console.log("emmit triggerDown to bottle");
        activeController = triggerEvent.activeController;
        let activeControllerId =  activeController.getAttribute('id');
        controllerStateIndex.setControllerState('nacl500InHandToDesk', activeControllerId);
        controllerStateIndex.setControllerState('isNacl500ToDeskHandling', true);
    }
    // change hints
    else if (
        stateIndex.getIn(['handDisinfection', 'finish']) !== 2
        && controllerStateIndex.getControllerState('nacl500InHandToDesk') === null
        && controllerStateIndex.getControllerState('nacl500Dragable')
    ) {
        console.log("Disinfect hands before taking bottle");
    }

    // to stand
    if (
        controllerStateIndex.getControllerState('infusionSetInBottle')
        && controllerStateIndex.getControllerState('nacl500InHandToStand') === null
        && haveSthInHand(triggerEvent.activeController).length === 0
    ) {
        console.log("to stand");
        activeController = triggerEvent.activeController;
        let activeControllerId =  activeController.getAttribute('id');
        controllerStateIndex.setControllerState('nacl500InHandToStand', activeControllerId);
    }
}

export function handleControllerReleaseBottleNacl500Vive ( triggerEvent ) {
    // drag to desk
    if (
        controllerStateIndex.getControllerState('nacl500InHandToDesk') === triggerEvent.activeController.getAttribute('id')
        && !detectCollision(toggleBoxNacl500OnDesk, triggerEvent.activeController)
    ) {
        controllerStateIndex.setControllerState('nacl500InHandToDesk', null);
        isNacl500InHand = null;
    }
    // drag to stand
    else if(
        controllerStateIndex.getControllerState('nacl500InHandToStand') !== null
        && !detectCollision(toggleBoxNacl500Hanged, triggerEvent.activeController)
) {
        controllerStateIndex.setControllerState('nacl500InHandToStand', null);
        isNacl500InHand = null;
    }
}

export function handleControllerStateNotifyBottleNacl500Vive (nextControllerState) {
    
    console.log("nextControllerState.nacl500InHandToDesk === null: ", nextControllerState.nacl500InHandToDesk === null, typeof(nextControllerState.nacl500InHandToDesk === null));
    console.log("isNacl500InHand !== null: ", isNacl500InHand !== null, typeof(isNacl500InHand !== null));
    console.log("!stateIndex.getIn(['bottlePrepare', 'finish']): ", !stateIndex.getIn(['bottlePrepare', 'finish']), typeof(!stateIndex.getIn(['bottlePrepare', 'finish'])));
    console.log("nextControllerState.isNacl500ToDeskHandling === true: ", nextControllerState.isNacl500ToDeskHandling === true, typeof(nextControllerState.isNacl500ToDeskHandling === true));
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
    // take nacl500 to desk again, if it falls down
    // else if (
    //
    // ) {
    //
    // }

    // drag to stand
    if (
        nextControllerState.nacl500InHandToStand !== null
        && currentControllerState.nacl500InHandToStand === null
        && nextControllerState.nacl500Dragable
    ) {
        dragInHandToHang();

        // toggleBoxNacl500OnDesk is shown here, but don't know the reason. So hide it. NOT good.
        let toggleBoxNacl500OnDesk = document.querySelector('#toggleBoxNacl500OnDesk');
        toggleBoxNacl500OnDesk.setAttribute('visible', false);
        infusionSetInBottle.setAttribute('visible', false);

        console.log("should drag bottle in hand to hang");
    }
    // take nacl 500 again to stand, if it falls down
    // else if ( ) {
    //
    // }

    // Drop down to floor
    else if (
        nextControllerState.nacl500InHandToDesk === null
        && isNacl500InHand !== null
        && !stateIndex.getIn(['bottlePrepare', 'finish'])
        && nextControllerState.isNacl500ToDeskHandling === true
    ) {
        dropBottle();
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
    console.log("controllerActivities drag: ", controllerActivities, typeof(controllerActivities));
    // drag(element, activeController);
    // element = document.querySelector('#nacl500Bottle');
}

function dragInHandToHang() {
    // drag(element, activeController);
    // element = document.querySelector('#nacl500Bottle');

    // trickDrag(element, activeController);

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
    nacl500Inhand = null;
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


