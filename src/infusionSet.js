import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';
import {bottle, infusionSet} from "../utils/constants";

let element;

let infusionSetInPack;
let infusionSetOpen;
let infusionSetOpenCap;
let infusionSetOpenWheel;
let infusionSetInBottle;

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
        infusionSetOpen = $('#infusionSetOpen');
        infusionSetOpenCap = $('#infusionSetOpenCap');
        infusionSetOpenWheel = $('#infusionSetOpenWheel');
        infusionSetInBottle = $('#infusionSetInBottle');

        infusionSetInPack.on('click', () => {
            handleClickInfusionSetInPack();
        });

        infusionSetOpenCap.on('click', () => {
            handleClickInfusionSetOpenCap();
        });

        infusionSetOpenWheel.on('click', () => {
            handleClickInfusionSetOpenWheel();
        });

        infusionSetOpen.on('click', () => {
            handleClickInfusionSetOpen();
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
    infusionSetOpenCapOnTableOpen: '1.259 0 -0.554',
    infusionSetOpenCapOverTableOpen: '1.259 8.647 -0.554',
    infusionSetOpenCapOverCan: '-5.253 8.647 5.617',
    infusionSetOpenCapInCan: '-5.253 1.217 5.617',
    infusionSetOpenWheelClose: '-0.454 0 0.295',

    dur: 500,
};

export function moveWithDrawer() {
    console.log("moveWithDrawer");
    movable = false;
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
    setTimeout(()=>{ movable = true }, schema.dur);
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

function openInfusionSet() {
    console.log("openInfusionSet");
    movable = false;
    infusionSetInPack.remove();
    infusionSetOpen.attr('visible', true);
    setTimeout(()=>{ movable = true }, schema.dur);
}

function takeOffInfusionSetOpenCap() {
    console.log("takeOffInfusionSetOpenCap");
    movable = false;

    if (stateIndex.get('wasteBinCapOpen') === false) {
        stateIndex.set('wasteBinCapOpen', true);
    }
    aAnimationWrapper(infusionSetOpenCap, '', 'position', '', schema.infusionSetOpenCapOnTableOpen, schema.dur, '', true, 'forwards');

    setTimeout(() => {
        aAnimationWrapper(infusionSetOpenCap, '', 'position', '', schema.infusionSetOpenCapOverTableOpen, schema.dur, '', true, 'forwards');
    }, schema.dur);

    setTimeout(() => {
        aAnimationWrapper(infusionSetOpenCap, '', 'position', '', schema.infusionSetOpenCapOverCan, schema.dur, '', true, 'forwards');
    }, schema.dur * 2);

    setTimeout(() => {
        aAnimationWrapper(infusionSetOpenCap, '', 'position', '', schema.infusionSetOpenCapInCan, schema.dur, '', true, 'forwards');
    }, schema.dur * 3);

    setTimeout(() => {
        stateIndex.set('wasteBinCapOpen', false);
        $(infusionSetOpenCap).remove();

        movable = true;

    }, schema.dur * 3.5);

    setTimeout(()=>{ movable = true }, schema.dur);
}

function closeInfusionSetOpenWheel() {
    console.log("closeInfusionSetOpenWheel");
    movable = false;

    aAnimationWrapper(infusionSetOpenWheel, '', 'position', '', schema.infusionSetOpenWheelClose, schema.dur, '', true, 'forwards');

    setTimeout(()=>{ movable = true }, schema.dur);
}

function pierceInfusionSetIntoBottle() {
    console.log("closeInfusionSetOpenWheel");
    movable = false;

    infusionSetOpen.remove();
    infusionSetInBottle.attr('visible', true);

    setTimeout(()=>{ movable = true }, schema.dur);
}

function handleClickInfusionSetInPack() {
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
    else if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'inPack']) === true && movable
    ) {
        stateIndex.setIn(['infusionSet', 'inPack'], false);
    }
}

function handleClickInfusionSetOpenCap() {
    console.log('click cap');
    if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'inPack']) === false &&
        stateIndex.getIn(['infusionSet', 'withCap']) === true && movable
    ) {
        stateIndex.setIn(['infusionSet', 'withCap'], false);
    }
}

function handleClickInfusionSetOpenWheel() {
    console.log('click wheel');
    if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'inPack']) === false &&
        stateIndex.getIn(['infusionSet', 'rollerClapOpen']) === true && movable
    ) {
        stateIndex.setIn(['infusionSet', 'rollerClapOpen'], false);
    }
}

function handleClickInfusionSetOpen() {
    console.log("click infusion set open");

    if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'withCap']) === false &&
        stateIndex.getIn(['infusionSet', 'rollerClapOpen']) === false && movable
    ) {
        stateIndex.setIn(['infusionSet','position'], infusionSet.position.IN_BOTTLE);
    }
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
        // currentState.infusionSet.position === infusionSet.position.ON_TABLE &&
        nextState.infusionSet.position === infusionSet.position.ON_TABLE &&
        currentState.infusionSet.inPack === true &&
        nextState.infusionSet.inPack === false
    ) {
        openInfusionSet();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        console.log('currentState: ', currentState);
    }
    else if (
        nextState.infusionSet.position === infusionSet.position.ON_TABLE &&
        currentState.infusionSet.withCap === true &&
        nextState.infusionSet.withCap === false
    ) {
        takeOffInfusionSetOpenCap();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.infusionSet.position === infusionSet.position.ON_TABLE &&
        currentState.infusionSet.rollerClapOpen === true &&
        nextState.infusionSet.rollerClapOpen === false
    ) {
        closeInfusionSetOpenWheel();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        currentState.infusionSet.position === infusionSet.position.ON_TABLE &&
        nextState.infusionSet.position === infusionSet.position.IN_BOTTLE &&
        nextState.bottlePrepare.withCap === false
    ) {
        pierceInfusionSetIntoBottle();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    // else if (
    //     nextState.bottlePrepare.position === bottle.position.HANGED &&
    //     currentState.bottlePrepare.withInfusionSet === false &&
    //     nextState.bottlePrepare.finish === false &&
    //     // nextState.bottlePrepare.withInfusionSet === true
    //     test === true
    // ) {
    //     hangUp();
    //     // deep copy
    //     // currentState = _.cloneDeep(stateIndex.getState());
    // }
}
