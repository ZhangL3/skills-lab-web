import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';
import {bottle} from "../utils/constants";

let element;
let bottleCap;
let currentState;
let plat30sec;

AFRAME.registerComponent('bottle_nacl500', {

    init: function () {

        element = this.el;

        $(this.el).on('click', () => {
            handleClickBottle();
        });

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

    }
});

const schema = {
    inCupboardPosition: '-0.441 1.407 -0.766',
    inFrontOfCameraPosition: '0 1.054 -0.55',
    checkBackSiteRotation: '0 150 0',
    checkTopSiteRotation: '0 120 90',
    onTablePosition: '-0.32 0.732 -0.83',
    onTableRotation: '0 90 0',
    dur: 500,
};

function takeBottle() {
    console.log("takeBottle");
    aAnimationWrapper(element, '', 'position', '', schema.inFrontOfCameraPosition, schema.dur, '', true, 'forwards');
}

function checkBack() {
    console.log("checkBack");
    aAnimationWrapper(element, '', 'rotation', '', schema.checkBackSiteRotation, schema.dur, '', true, 'forwards')
}

function checkTop() {
    console.log("checkTop");
    aAnimationWrapper(element, '', 'rotation', '', schema.checkTopSiteRotation, schema.dur, '', true, 'forwards')
}

function putOnTable() {
    console.log("putOnTable");
    aAnimationWrapper(element, '', 'position', '', schema.onTablePosition, schema.dur, '', true, 'forwards');
    aAnimationWrapper(element, '', 'rotation', '', schema.onTableRotation, schema.dur, '', true, 'forwards');
}

function takeOffCap() {
    console.log("takeOffCap");
}

function hangUp() {
    console.log("hangUp");
}

function isBottleChecked(state) {
    Object.values(state.bottlePrepare.checkBottle).forEach((checked) => {
        if (checked === false) {
            return false;
        }
    });
    return true;
}

function handleClickBottle() {
    console.log("click bottle");
    if (// TODO: for product remove comment
    // stateIndex.getIn(['handDisinfection', 'finish']) === true &&
    stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_CUPBOARD
    ) {
        stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.IN_HAND);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'front']) === false
    ) {
        stateIndex.setIn(['bottlePrepare', 'checkBottle', 'front'], true);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'front']) === true &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'back']) === false
    ) {
        stateIndex.setIn(['bottlePrepare', 'checkBottle', 'back'], true);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_HAND &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'back']) === true &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'top']) === false
    ) {
        stateIndex.setIn(['bottlePrepare', 'checkBottle', 'top'], true);
        stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.ON_TABLE);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.ON_TABLE &&
        stateIndex.getIn(['bottlePrepare', 'checkBottle', 'top']) === true &&
        stateIndex.getIn(['bottlePrepare', 'withCap']) === true
    ) {
        stateIndex.setIn(['bottlePrepare', 'withCap'], false);
    }
    else if (
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.ON_TABLE &&
        stateIndex.getIn(['bottlePrepare', 'withCap']) === false &&
        stateIndex.getIn(['bottlePrepare', 'withInfusionSet']) === true
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
        currentState.bottlePrepare.position === bottle.position.IN_HAND &&
        nextState.bottlePrepare.position === bottle.position.ON_TABLE
    ) {
        takeOffCap();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        currentState.bottlePrepare.position === bottle.position.ON_TABLE &&
        currentState.bottlePrepare.withInfusionSet === false &&
        nextState.bottlePrepare.withInfusionSet === true
    ) {
        hangUp();
        // deep copy
        // currentState = _.cloneDeep(stateIndex.getState());
    }
}
