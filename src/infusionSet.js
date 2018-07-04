import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';
import {bottle, infusionSet} from "../utils/constants";

let element;
let infusionSetInPack;
let currentState;

let isDrawerOpen = false;

// Don't active the action, if the animation is not finish
let movable = true;
// For product use withInfusionSet
let test = false;
// export let eventMoveWithDrawer = new Event('moveWithDrawerEvent');

AFRAME.registerComponent('infusion_set', {

    init: function () {

        element = this.el;
        infusionSetInPack = $('#infusionSetInPack');

        // console.log("infusionSetInPack: ", infusionSetInPack, typeof(infusionSetInPack));
        const infusionSetInPack2 = document.querySelector("#infusionSetInPack");

        // infusionSetInPack2.addEventListener('moveWithDrawerEvent', () => {
        //     moveWithDrawer();
        // });

        // infusionSetInPack.on('moveWithDrawerEvent', () => {
        //     moveWithDrawer();
        // });

        // $(this.el).on('click', () => {
        //     handleClickBottle();
        // });

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

    }
});

const schema = {
    infusionSetInDrawerClosePosition : '-0.215 0.466 -0.813',
    infusionSetInDrawerOpenPosition : '-0.215 0.466 -0.633',

    hangedRotation: '0 66.46 180',
    dur: 500,
};

export function moveWithDrawer() {
    console.log("isDrawerOpen: ", isDrawerOpen, typeof(isDrawerOpen));
    console.log(stateIndex.getIn(['infusionSet', 'position']));
    // movable = false;
    if (
        isDrawerOpen === false
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ) {
        console.log("to open");
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerOpenPosition, schema.dur, '', true, 'forwards');
        isDrawerOpen = !isDrawerOpen;
    }
    else if (
        isDrawerOpen === true
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ){
        console.log("to close");
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerClosePosition, schema.dur, '', true, 'forwards');
        isDrawerOpen = !isDrawerOpen;
    }
}

function moveawer() {
    console.log("takeBottle");
    movable = false;
    aAnimationWrapper(element, '', 'position', '', schema.inFrontOfCameraPosition, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);
}

function handleClickBottle() {
    console.log("click bottle");
    if (// TODO: for product remove comment
        // stateIndex.getIn(['handDisinfection', 'finish']) === true &&
    stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_CUPBOARD && movable
    ) {
        stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.IN_HAND);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'front']) === false && movable
    ) {
        stateIndex.setIn(['bottlePrepare', 'checkBottle', 'front'], true);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'front']) === true &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'back']) === false && movable
    ) {
        stateIndex.setIn(['bottlePrepare', 'checkBottle', 'back'], true);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'back']) === true &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'top']) === false && movable
    ) {
        stateIndex.setIn(['bottlePrepare', 'checkBottle', 'top'], true);
        stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.ON_TABLE);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.ON_TABLE &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'top']) === true &&
        stateIndex.getIn(['bottlePrepare', 'withCap']) === true && movable
    ) {
        stateIndex.setIn(['bottlePrepare', 'withCap'], false);

        test = true;
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.ON_TABLE &&
        stateIndex.getIn(['bottlePrepare', 'withCap']) === false &&
        // stateIndex.getIn(['bottlePrepare', 'withInfusionSet']) === true && movable
        test === true && movable
    ) {
        stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.HANGED);
    }
}

export function handleNotifyBottle(nextState) {
    if (// TODO: for product remove comment
    // stateIndex.getIn(['handDisinfection', 'finish']) === true &&
    currentState.bottlePrepare.position === bottle.position.IN_CUPBOARD &&
    nextState.bottlePrepare.position === bottle.position.IN_HAND
    ) {
        takeBottle();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.IN_HAND &&
        currentState.bottlePrepare.checkBottle.front === false &&
        nextState.bottlePrepare.checkBottle.front === true
    ) {
        checkBack();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.IN_HAND &&
        currentState.bottlePrepare.checkBottle.back === false &&
        nextState.bottlePrepare.checkBottle.back === true
    ) {
        checkTop();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        currentState.bottlePrepare.position === bottle.position.IN_HAND &&
        nextState.bottlePrepare.position === bottle.position.ON_TABLE &&
        currentState.bottlePrepare.checkBottle.top === false &&
        nextState.bottlePrepare.checkBottle.top === true
    ) {
        putOnTable();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.ON_TABLE &&
        currentState.bottlePrepare.withCap === true &&
        nextState.bottlePrepare.withCap === false
    ) {
        takeOffCap();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.HANGED &&
        currentState.bottlePrepare.withInfusionSet === false &&
        nextState.bottlePrepare.finish === false &&
        // nextState.bottlePrepare.withInfusionSet === true
        test === true
    ) {
        hangUp();
        // deep copy
        // currentState = _.cloneDeep(stateIndex.getState());
    }
}
