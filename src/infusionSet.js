import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';
import {bottle, infusionSet} from "../utils/constants";

import {isDrawerOpen } from "./drawerOpenWithInfusionSet";

let element;

let infusionSetInPack;
let infusionSetOpen;
let infusionSetOpenCap;
let infusionSetOpenWheel;
let infusionSetInBottle;
let infusionSetHanged;
let infusionSetHangedFill;
let infusionSetHangedWheel;
let infusionSetHangedFilled;
let infusionSetHangedFilledWheel;
let infusionSetFilledFill;
let infusionSetFixed;

let currentState;

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
        infusionSetHanged =$('#infusionSetHanged');
        infusionSetHangedFill =$('#infusionSetHangedFill');
        infusionSetHangedWheel =$('#infusionSetHangedWheel');
        infusionSetHangedFilled = $('#infusionSetHangedFilled');
        infusionSetHangedFilledWheel = $('#infusionSetHangedFilledWheel');
        infusionSetFixed = $('#infusionSetFixed');
        infusionSetFilledFill = $('#infusionSetFilledFill');

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

        infusionSetHanged.on('click', () => {
           handleClickInfusionSetHanged();
        });

        infusionSetHangedWheel.on('click', () => {
           handleClickInfusionSetHangedRoller();
        });

        // Problem: visible === false, but get click event
        infusionSetHangedFilled.on('click', () => {
           handleClickInfusionSetHangedFilled();
           console.log("infusionSetHangedFilled: ", infusionSetHangedFilled, typeof(infusionSetHangedFilled));
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
    infusionSetHangedWheelOpen: '-0.530 0.110 -0.060',
    dur: 500,
};

export function initInfusionSetOnTableOffCapOpenCloseWheel() {
    infusionSetInPack.remove();
    infusionSetOpen.attr('visible', true);
    infusionSetOpen.attr('position', schema.onTablePosition);
    infusionSetOpenCap.remove();
    infusionSetOpenWheel.attr('position', schema.infusionSetOpenWheelClose);
}

export function initInfusionSetFixed() {
    infusionSetHanged.remove();
    infusionSetHangedFill.remove();
    infusionSetHangedWheel.remove();
    infusionSetHangedFilled.remove();
    infusionSetHangedFilledWheel.remove();
    infusionSetFilledFill.remove();
    infusionSetFixed.attr('visible', true);
}

export function moveWithDrawer() {
    console.log("moveWithDrawer");
    movable = false;
    if (
        isDrawerOpen === false
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ) {
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerOpenPosition, schema.dur, '', true, 'forwards');
        // isDrawerOpen = !isDrawerOpen;
    }
    else if (
        isDrawerOpen === true
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ){
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerClosePosition, schema.dur, '', true, 'forwards');
        // isDrawerOpen = !isDrawerOpen;
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

function fillChamber() {
    console.log("fillChamber");
    infusionSetHangedFill.attr('visible', true);
    console.log(infusionSetHangedFill.attr('visible'));
}

function openRoller() {
    console.log("openRoller");

    movable = false;
    infusionSetHanged.remove();
    infusionSetHangedFilled.attr('visible', true);
    infusionSetFilledFill.attr('visible', true);
    aAnimationWrapper(infusionSetHangedFilledWheel, '', 'position', '', schema.infusionSetHangedWheelOpen, schema.dur, '', true, 'forwards');

    setTimeout(()=>{ movable = true }, schema.dur);
}

function fixTube() {
    console.log("fixTube");

    movable = false;
    infusionSetHangedFilled.remove();
    infusionSetFixed.attr('visible', true);

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

function handleClickInfusionSetHanged() {
    console.log("handleClickInfusionSetHanged");
    if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.HANGED &&
        stateIndex.getIn(['infusionSet', 'chamberFilled']) === false &&
        movable
    ) {
        stateIndex.setIn(['infusionSet', 'chamberFilled'], true);
    }
}

function handleClickInfusionSetHangedRoller() {
    console.log('click roller');
    if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.HANGED &&
        stateIndex.getIn(['infusionSet','chamberFilled']) === true &&
        stateIndex.getIn(['infusionSet','tubeFilled']) === false &&
        movable
    ) {
        stateIndex.setIn(['infusionSet', 'tubeFilled'], true);
        stateIndex.setIn(['infusionSet', 'rollerClapOpen'], true);
    }
}

function handleClickInfusionSetOpen() {
    console.log("click infusion set open");

    if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'withCap']) === false &&
        stateIndex.getIn(['infusionSet', 'rollerClapOpen']) === false && movable &&
        stateIndex.getIn(['bottlePrepare', 'withCap']) === false
    ) {
        stateIndex.setIn(['infusionSet','position'], infusionSet.position.IN_BOTTLE);
    }
}

function handleClickInfusionSetHangedFilled() {
    console.log("click hanged filled");
    console.log(stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.HANGED);
    console.log(stateIndex.getIn(['infusionSet', 'chamberFilled']) === true);
    console.log(stateIndex.getIn(['infusionSet', 'tubeFilled']) === true);
    if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.HANGED &&
        stateIndex.getIn(['infusionSet', 'chamberFilled']) === true &&
        stateIndex.getIn(['infusionSet', 'tubeFilled']) === true &&
        movable
    ) {
        stateIndex.setIn(['infusionSet','fixed'], true);
        stateIndex.setIn(['infusionSet','finish'], true);
    }
}

export function handleNotifyInfusionSet(nextState) {

    if(stateIndex.getIn(['infusionSet', 'finish'])) {
        return false;
    }

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
        // currentState is not stable, because of the selection of section
        (currentState.infusionSet.position === infusionSet.position.ON_TABLE || nextState.sectionSelected === 5)
        && nextState.infusionSet.position === infusionSet.position.IN_BOTTLE
        && nextState.bottlePrepare.withCap === false
    ) {
        pierceInfusionSetIntoBottle();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.HANGED &&
        currentState.infusionSet.chamberFilled === false &&
        nextState.infusionSet.chamberFilled === true
    ) {
        fillChamber();

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
       nextState.bottlePrepare.position === bottle.position.HANGED &&
        currentState.infusionSet.chamberFilled === true &&
        currentState.infusionSet.tubeFilled === false &&
        nextState.infusionSet.tubeFilled === true
    ) {
        openRoller();

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
        console.log("after openRoller, current state: ", currentState);
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.HANGED &&
        currentState.infusionSet.fixed === false &&
        nextState.infusionSet.fixed === true
        // currentState.infusionSet.finish === false &&
        // nextState.infusionSet.finish === true
    ) {
        fixTube();

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
