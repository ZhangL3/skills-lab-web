import $ from 'jquery';

import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';
import {bottle, infusionSet} from "../utils/constants";
import {isDrawerOpen } from "./drawerOpenWithInfusionSet";
import hints from '../utils/hints';

let element;
let infusionSetInPack;
let infusionSetOpen;
let infusionSetOpenCap;
let infusionSetOpenWheel;
let infusionSetInBottle;
let infusionSetHanged;
let infusionSetHangedFill;
let infusionSetHangedFillTrigger;
let infusionSetHangedWheel;
let infusionSetHangedFilled;
let infusionSetHangedFilledWheel;
let infusionSetFilledFill;
let infusionSetFixed;
let currentState;
// Don't active the action, if the animation is not finish
export let movable = true;

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
        infusionSetHangedFillTrigger = $('#infusionSetHangedFillTrigger');
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

        infusionSetHangedFillTrigger.on('click', () => {
           handleClickInfusionSetHanged();
        });

        infusionSetHangedWheel.on('click', () => {
           handleClickInfusionSetHangedRoller();
        });

        infusionSetHangedFilled.on('click', () => {
           handleClickInfusionSetHangedFilled();
        });

        currentState = _.cloneDeep(stateIndex.getState());
    }
});

const schema = {
    infusionSetInDrawerClosePosition : '-0.215 0.466 -0.9',
    infusionSetInDrawerOpenPosition : '-0.215 0.466 -0.710',
    inFrontOfCameraPosition: '0 1 -0.5',
    inFrontOfCameraRotation: '-90.000 0 0',
    onTablePosition: '-0.161 0.698 -0.819',
    onTableRotation: '0 90 0',
    infusionSetOpenCapOnTableOpen: '0.637 0.402 -2.183',
    infusionSetOpenCapOverTableOpen: '0.637 8.647 -2.183',
    infusionSetOpenCapOverCan: '-4.731 8.647 3.152',
    infusionSetOpenCapInCan: '-4.731 1.168 3.152',
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
    movable = false;
    if (
        isDrawerOpen === false
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ) {
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerOpenPosition, schema.dur, '', true, 'forwards');
    }
    else if (
        isDrawerOpen === true
        && stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER
    ){
        aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.infusionSetInDrawerClosePosition, schema.dur, '', true, 'forwards');
    }
    setTimeout(()=>{ movable = true }, schema.dur);
}

function takeInfusionSet() {
    movable = false;
    aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.inFrontOfCameraPosition, schema.dur, '', true, 'forwards');
    aAnimationWrapper(infusionSetInPack, '', 'rotation', '', schema.inFrontOfCameraRotation, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);
}

function putInfusionSetOnTable() {
    movable = false;
    aAnimationWrapper(infusionSetInPack, '', 'position', '', schema.onTablePosition, schema.dur, '', true, 'forwards');
    aAnimationWrapper(infusionSetInPack, '', 'rotation', '', schema.onTableRotation, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);
}

function openInfusionSet() {
    movable = false;
    infusionSetInPack.remove();
    infusionSetOpen.attr('visible', true);
    setTimeout(()=>{ movable = true }, schema.dur);
}

function takeOffInfusionSetOpenCap() {
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
    movable = false;
    aAnimationWrapper(infusionSetOpenWheel, '', 'position', '', schema.infusionSetOpenWheelClose, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);
}

function pierceInfusionSetIntoBottle() {
    movable = false;
    infusionSetOpen.remove();
    infusionSetInBottle.attr('visible', true);
    setTimeout(()=>{ movable = true }, schema.dur);
}

function fillChamber() {
    infusionSetHangedFill.attr('visible', true);
}

function openRoller() {
    movable = false;
    infusionSetHanged.remove();
    infusionSetHangedFilled.attr('visible', true);
    infusionSetFilledFill.attr('visible', true);
    aAnimationWrapper(infusionSetHangedFilledWheel, '', 'position', '', schema.infusionSetHangedWheelOpen, schema.dur, '', true, 'forwards');

    setTimeout(()=>{ movable = true }, schema.dur);
}

function fixTube() {
    movable = false;
    infusionSetHangedFilled.remove();
    infusionSetFixed.attr('visible', true);

    setTimeout(()=>{ movable = true }, schema.dur);
}

function handleClickInfusionSetInPack() {
    if (
        stateIndex.getIn(['handDisinfection', 'finish']) === 2 &&
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_DRAWER &&
        movable
    ) {
        stateIndex.setIn(['infusionSet', 'position'], infusionSet.position.IN_HAND);
        stateIndex.set('hint', hints.checkInfusionSet);
    }
    else if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_HAND &&
        movable
    ) {
        stateIndex.setIn(['infusionSet', 'position'], infusionSet.position.ON_TABLE);
        stateIndex.set('hint', hints.unpackInfusionSet);
    }
    else if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'inPack']) === true && movable
    ) {
        stateIndex.setIn(['infusionSet', 'inPack'], false);
        stateIndex.set('hint', `${hints.closeRoller} and ${hints.takeOffInfusionSetCap}`);
    }
}

function handleClickInfusionSetOpenCap() {
    if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'inPack']) === false &&
        stateIndex.getIn(['infusionSet', 'withCap']) === true && movable
    ) {
        stateIndex.setIn(['infusionSet', 'withCap'], false);
        if (
            stateIndex.getIn(['infusionSet', 'rollerClapOpen'])
        ) {
            stateIndex.set('hint', hints.closeRoller);
        }
        else {
            stateIndex.set('hint', hints.pierceInfusionSet);
        }
    }
}

function handleClickInfusionSetOpenWheel() {
    if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'inPack']) === false &&
        stateIndex.getIn(['infusionSet', 'rollerClapOpen']) === true && movable
    ) {
        stateIndex.setIn(['infusionSet', 'rollerClapOpen'], false);
        if (
            stateIndex.getIn(['infusionSet', 'withCap'])
        ) {
            stateIndex.set('hint', hints.takeOffInfusionSetCap);
        }
        else {
            stateIndex.set('hint', hints.pierceInfusionSet);
        }
    }
}

function handleClickInfusionSetOpen() {
    if (
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.ON_TABLE &&
        stateIndex.getIn(['infusionSet', 'withCap']) === false &&
        stateIndex.getIn(['infusionSet', 'rollerClapOpen']) === false && movable &&
        stateIndex.getIn(['bottlePrepare', 'withCap']) === false
    ) {
        stateIndex.setIn(['infusionSet','position'], infusionSet.position.IN_BOTTLE);
        stateIndex.set('hint', hints.hang);
    }
}

function handleClickInfusionSetHanged() {
    if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.HANGED &&
        stateIndex.getIn(['infusionSet', 'chamberFilled']) === false &&
        movable
    ) {
        stateIndex.setIn(['infusionSet', 'chamberFilled'], true);
        stateIndex.set('hint', hints.openRoller);
    }
}

function handleClickInfusionSetHangedRoller() {
    if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.HANGED &&
        stateIndex.getIn(['infusionSet','chamberFilled']) === true &&
        stateIndex.getIn(['infusionSet','tubeFilled']) === false &&
        movable
    ) {
        stateIndex.setIn(['infusionSet', 'tubeFilled'], true);
        stateIndex.setIn(['infusionSet', 'rollerClapOpen'], true);
        stateIndex.set('hint', hints.fixTube);
    }
}


function handleClickInfusionSetHangedFilled() {
    if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.HANGED &&
        stateIndex.getIn(['infusionSet', 'chamberFilled']) === true &&
        stateIndex.getIn(['infusionSet', 'tubeFilled']) === true &&
        movable
    ) {
        stateIndex.setIn(['infusionSet','fixed'], true);
        stateIndex.setIn(['infusionSet','finish'], true);
        stateIndex.set('hint', hints.takeNameLabel);
    }
}

export function handleNotifyInfusionSet(nextState) {

    if(stateIndex.getIn(['infusionSet', 'finish'])) {
        return false;
    }

    if (
    currentState.infusionSet.position === infusionSet.position.IN_DRAWER &&
    nextState.infusionSet.position === infusionSet.position.IN_HAND
    ) {
        // take in hand
        takeInfusionSet();

        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        currentState.infusionSet.position === infusionSet.position.IN_HAND &&
        nextState.infusionSet.position === infusionSet.position.ON_TABLE
    ) {
        // put on table
        putInfusionSetOnTable();

        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.infusionSet.position === infusionSet.position.ON_TABLE &&
        currentState.infusionSet.inPack === true &&
        nextState.infusionSet.inPack === false
    ) {
        // open pack
        openInfusionSet();

        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.infusionSet.position === infusionSet.position.ON_TABLE &&
        currentState.infusionSet.withCap === true &&
        nextState.infusionSet.withCap === false
    ) {
        // take of the cap of infusion set
        takeOffInfusionSetOpenCap();

        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.infusionSet.position === infusionSet.position.ON_TABLE &&
        currentState.infusionSet.rollerClapOpen === true &&
        nextState.infusionSet.rollerClapOpen === false
    ) {
        // open the roller clamp
        closeInfusionSetOpenWheel();

        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        // currentState is not stable, because of the selection of section.
        (currentState.infusionSet.position === infusionSet.position.ON_TABLE ||
            nextState.sectionSelected === 5)
        && nextState.infusionSet.position === infusionSet.position.IN_BOTTLE
        && nextState.bottlePrepare.withCap === false
        && nextState.bottlePrepare.position !== bottle.position.HANGED
    ) {
        // pierce infusion set in bottle
        pierceInfusionSetIntoBottle();

        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.HANGED &&
        currentState.infusionSet.chamberFilled === false &&
        nextState.infusionSet.chamberFilled === true
    ) {
        // fill chamber
        fillChamber();
        infusionSetHangedFillTrigger.attr('visible', false);

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
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.HANGED &&
        currentState.infusionSet.fixed === false &&
        nextState.infusionSet.fixed === true
    ) {
        fixTube();

        currentState = _.cloneDeep(stateIndex.getState());
    }
}
