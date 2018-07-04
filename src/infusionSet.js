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

AFRAME.registerComponent('infusion_set', {

    init: function () {

        element = this.el;
        infusionSetInPack = $('#infusionSetInPack');

        infusionSetInPack.on('click', () => {
            handleClickInfusionSet();
        });

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

    }
});

const schema = {
    infusionSetInDrawerClosePosition : '-0.215 0.466 -0.813',
    infusionSetInDrawerOpenPosition : '-0.215 0.466 -0.633',
    inFrontOfCameraPosition: '0 1 -0.5',
    inFrontOfCameraRotation: '-90.000 0 0',
    onTablePosition: '-0.161 0.698 -0.819',
    onTableRotation: '0 90 0',

    dur: 500,
};

export function moveWithDrawer() {
    if (
        isDrawerOpen === false
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ) {
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerOpenPosition, schema.dur, '', true, 'forwards');
        isDrawerOpen = !isDrawerOpen;
    }
    else if (
        isDrawerOpen === true
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ){
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerClosePosition, schema.dur, '', true, 'forwards');
        isDrawerOpen = !isDrawerOpen;
    }
}

function takeInfusionSet() {
    console.log("takeInfusionSet");
    movable = false;
    aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.inFrontOfCameraPosition, schema.dur, '', true, 'forwards');
    aAnimationWrapper(infusionSetInPack, '', 'rotation', '', schema.inFrontOfCameraRotation, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);
}

function putInfusionSetOnTable() {
    console.log("putInfusionSetOnTable");
    movable = false;
    aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.onTablePosition, schema.dur, '', true, 'forwards');
    aAnimationWrapper(infusionSetInPack, '', 'rotation', '', schema.onTableRotation, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);
}

function handleClickInfusionSet() {
    console.log("click infusion set");
    if (// TODO: for product remove comment
        // stateIndex.getIn(['handDisinfection', 'finish']) === true &&
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER && movable
    ) {
        stateIndex.setIn(['infusionSet', 'position'], infusionSet.position.IN_HAND);
    }
    else if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_HAND &&
        movable
    ) {
        stateIndex.setIn(['infusionSet', 'position'], infusionSet.position.ON_TABLE);
    }
    // else if (
    //     stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
    //     stateIndex.getIn(['bottlePrepare', 'checkBottle', 'front']) === true &&
    //     stateIndex.getIn(['bottlePrepare', 'checkBottle', 'back']) === false && movable
    // ) {
    //     stateIndex.setIn(['bottlePrepare', 'checkBottle', 'back'], true);
    // }
    // else if (
    //     stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
    //     stateIndex.getIn(['bottlePrepare', 'checkBottle', 'back']) === true &&
    //     stateIndex.getIn(['bottlePrepare', 'checkBottle', 'top']) === false && movable
    // ) {
    //     stateIndex.setIn(['bottlePrepare', 'checkBottle', 'top'], true);
    //     stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.ON_TABLE);
    // }
    // else if (
    //     stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.ON_TABLE &&
    //     stateIndex.getIn(['bottlePrepare', 'checkBottle', 'top']) === true &&
    //     stateIndex.getIn(['bottlePrepare', 'withCap']) === true && movable
    // ) {
    //     stateIndex.setIn(['bottlePrepare', 'withCap'], false);
    //
    //     test = true;
    // }
    // else if (
    //     stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.ON_TABLE &&
    //     stateIndex.getIn(['bottlePrepare', 'withCap']) === false &&
    //     // stateIndex.getIn(['bottlePrepare', 'withInfusionSet']) === true && movable
    //     test === true && movable
    // ) {
    //     stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.HANGED);
    // }
}

export function handleNotifyInfusionSet(nextState) {
    if (// TODO: for product remove comment
    // stateIndex.getIn(['handDisinfection', 'finish']) === true &&
    currentState.infusionSet.position === infusionSet.position.IN_DRAWER &&
    nextState.infusionSet.position === infusionSet.position.IN_HAND
    ) {
        takeInfusionSet();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        currentState.infusionSet.position === infusionSet.position.IN_HAND &&
        nextState.infusionSet.position === infusionSet.position.ON_TABLE
    ) {
        putInfusionSetOnTable();
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
