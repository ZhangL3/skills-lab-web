import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';
import * as constants from '../utils/constants';
import {device} from "../utils/controllerManage";

const timeToStay = 6000;
const moveTime = 800;
const moveTimeGear = 1000;
let cameraPosition;
let cameraMoved = false;
// Objects lead to move the camera in flat mode
let nacl500Bottle;
let infusionSetOpen;
let infusionSetHanged;
let infusionSetHangedFilled;
let handDisinfectionHandle;
let element;

const positionVar = {
    origin: {name: 'ORIGIN', position: '0 1 -0.4'},
    nacl500Bottle: {name:'NACL_500_BOTTLE', position:'-0.3 1.5 -0.5'},
    infusionSetOpen: {name:'INFUSION_SET_OPEN', position:'-0.055 0.810 -0.634'},
    infusionSetHanged: {name:'INFUSION_SET_Hanged', position:'0.670 1.100 -0.502'},
    handDisinfectionHandle: {name:'DISPENSER_HANDLE', position:'-1.3 1 -0.4'},

    originGear: {name: 'ORIGIN_GEAR', position: '0 1.85 -0.6'},
    nacl500BottleGear: {name:'NACL_500_BOTTLE_GEAR', position:'-1.006 3.763 -1.165'},
    infusionSetOpenGear: {name:'INFUSION_SET_OPEN_GEAR', position:'-0.8 1.552 -1.629'},
    infusionSetHangedGear: {name:'INFUSION_SET_Hanged_GEAR', position:'1.351 2.851 -1.629'},
    handDisinfectionHandleGear: {name:'DISPENSER_HANDLE_GEAR', position:'-4.467 2.204 -0.680'}
};

AFRAME.registerComponent('camera-move', {

    schema: {
        disable: {type: 'boolean', default: false}
    },

    init: function () {
        let data = this.data;
        element = this.el;

        if (data.disable) {
            return false;
        }

        console.log("Should not shown if disable true");

        cameraPosition = positionVar.origin.name;
        nacl500Bottle = document.querySelector('#nacl500Bottle');
        infusionSetOpen = document.querySelector('#infusionSetOpen');
        infusionSetHanged = document.querySelector('#infusionSetHanged');
        infusionSetHangedFilled = document.querySelector('#infusionSetHangedFilled');
        handDisinfectionHandle = document.querySelector('#handDisinfectionHandle');

        // move to cupboard
        nacl500Bottle.addEventListener('raycaster-intersected', moveToCupboardAndBack);

        // move to cabinet
        infusionSetOpen.addEventListener('raycaster-intersected', moveToCabinetAndBack);

        // move to holder
        infusionSetHanged.addEventListener('raycaster-intersected', moveToHolderAndBack);

        // move to holder
        infusionSetHangedFilled.addEventListener('raycaster-intersected', moveToHolderAndBack);

        // move to hand disinfection
        handDisinfectionHandle.addEventListener('raycaster-intersected', moveToHandDisinfectionAndBack);
    },

    update: function (oldData) {
        let data = this.data;
        // in update function must assignment the element again
        cameraPosition = positionVar.origin.name;
        nacl500Bottle = document.querySelector('#nacl500Bottle');
        infusionSetOpen = document.querySelector('#infusionSetOpen');
        infusionSetHanged = document.querySelector('#infusionSetHanged');
        infusionSetHangedFilled = document.querySelector('#infusionSetHangedFilled');
        handDisinfectionHandle = document.querySelector('#handDisinfectionHandle');

        if (data.disable) {
            removeAllEventListener();
        }

    },
});

function removeAllEventListener() {
    // move to cupboard
    nacl500Bottle.removeEventListener('raycaster-intersected', moveToCupboardAndBack);
    // move to cabinet
    infusionSetOpen.removeEventListener('raycaster-intersected', moveToCabinetAndBack);
    // move to holder
    infusionSetHanged.removeEventListener('raycaster-intersected', moveToHolderAndBack);
    // move to holder
    infusionSetHangedFilled.removeEventListener('raycaster-intersected', moveToHolderAndBack);
    // move to hand disinfection
    handDisinfectionHandle.removeEventListener('raycaster-intersected', moveToHandDisinfectionAndBack);
    // move to holder
    infusionSetHangedFilled.removeEventListener('raycaster-intersected', moveToHolderAndBack);
    // move to hand disinfection
    handDisinfectionHandle.removeEventListener('raycaster-intersected', moveToHandDisinfectionAndBack);
}

function moveToCupboardAndBack() {
    if(cameraMoved) {
        return false;
    }
    if (
        stateIndex.get('started')
        && stateIndex.getIn(['bottlePrepare', 'position']) === constants.bottle.position.IN_CUPBOARD
        && (
            (cameraPosition === positionVar.origin.name) || (cameraPosition = positionVar.originGear.name)
        )
    ) {
        if (device === "GearVRWithoutController") {
            moveToBottleGear(element);
            setTimeout(()=>{
                backToOriginGear(element);
            }, timeToStay);
        }
        else {
            moveToBottle(element);
            setTimeout(()=>{
                backToOrigin(element);
            }, timeToStay);
        }
    }
}

function moveToCabinetAndBack() {
    if(cameraMoved) {
        return false;
    }
    if (
        stateIndex.getIn(['infusionSet', 'position']) === constants.infusionSet.position.ON_TABLE
        && (
            stateIndex.getIn(['infusionSet', 'withCap'])
            || stateIndex.getIn(['infusionSet', 'rollerClapOpen'])
        )
        && (
            (cameraPosition === positionVar.origin.name) || (cameraPosition = positionVar.originGear.name)
        )
    ) {
        if (device === "GearVRWithoutController") {
            moveToInfusionSetOpenGear(element);
            setTimeout(()=>{
                backToOriginGear(element);
            }, timeToStay);
        }
        else {
            moveToInfusionSetOpen(element);
            setTimeout(()=>{
                backToOrigin(element);
            }, timeToStay);
        }
    }
}

function moveToHolderAndBack() {
    if(cameraMoved) {
        return false;
    }
    if (
        stateIndex.getIn(['bottlePrepare', 'position']) === constants.bottle.position.HANGED
        && (
            (cameraPosition === positionVar.origin.name) || (cameraPosition = positionVar.originGear.name)
        )
    ) {
        if (device === "GearVRWithoutController") {
            moveToInfusionSetHangedGear(element);
            setTimeout(()=>{
                backToOriginGear(element);
            }, timeToStay);
        }
        else {
            moveToInfusionSetHanged(element);
            setTimeout(()=>{
                backToOrigin(element);
            }, timeToStay);
        }
    }
}

function moveToHandDisinfectionAndBack() {
    if(cameraMoved) {
        return false;
    }
    if (
        (stateIndex.getIn(['handDisinfection', 'finish']) === 0
            && stateIndex.getIn(['portfolio', 'finish']))
        ||
        (stateIndex.getIn(['handDisinfection', 'finish']) === 1
            && stateIndex.getIn(['tableDisinfection', 'finish']))
        && (
            (cameraPosition === positionVar.origin.name) || (cameraPosition = positionVar.originGear.name)
        )
    ) {
        if (device === "GearVRWithoutController") {
            moveToHandDisinfectionGear(element);
            setTimeout(()=>{
                backToOriginGear(element);
            }, timeToStay);
        }
        else {
            moveToHandDisinfection(element);
            setTimeout(()=>{
                backToOrigin(element);
            }, timeToStay);
        }
    }
}

function backToOrigin(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.origin.position, moveTime, '', true, 'forwards');
    cameraPosition = positionVar.origin.name;
    cameraMoved = false;
}

function moveToBottle(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.nacl500Bottle.position, moveTime, '', true, 'forwards');
    cameraPosition = positionVar.nacl500Bottle.name;
    cameraMoved = true;
}

function moveToInfusionSetOpen(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetOpen.position, moveTime, '', true, 'forwards');
    cameraPosition = positionVar.infusionSetOpen.name;
    cameraMoved = true;
}

function moveToInfusionSetHanged(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetHanged.position, moveTime, '', true, 'forwards');
    cameraPosition = positionVar.infusionSetHanged.name;
    cameraMoved = true;
}

function moveToHandDisinfection(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.handDisinfectionHandle.position, moveTime, '', true, 'forwards');
    cameraPosition = positionVar.handDisinfectionHandle.name;
    cameraMoved = true;
}

// For Gear VR without controller (scale is not same as others)
function backToOriginGear(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.originGear.position, moveTimeGear, '', true, 'forwards');
    cameraPosition = positionVar.originGear.name;
    cameraMoved = false;
}

function moveToBottleGear(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.nacl500BottleGear.position, moveTimeGear, '', true, 'forwards');
    cameraPosition = positionVar.nacl500BottleGear.name;
    cameraMoved = true;
}

function moveToInfusionSetOpenGear(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetOpenGear.position, moveTimeGear, '', true, 'forwards');
    cameraPosition = positionVar.infusionSetOpenGear.name;
    cameraMoved = true;
}

function moveToInfusionSetHangedGear(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetHangedGear.position, moveTimeGear, '', true, 'forwards');
    cameraPosition = positionVar.infusionSetHangedGear.name;
    cameraMoved = true;
}

function moveToHandDisinfectionGear(el) {
    aAnimationWrapper(el, '', 'position', '', positionVar.handDisinfectionHandleGear.position, moveTimeGear, '', true, 'forwards');
    cameraPosition = positionVar.handDisinfectionHandleGear.name;
    cameraMoved = true;
}

