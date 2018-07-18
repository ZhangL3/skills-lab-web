import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';
import {bottle, infusionSet} from "../utils/constants";

let element;
let bottleCap;
let infusionSetInBottle;
let infusionSetHanged;
let currentState;
// Don't active the action, if the animation is not finish
let movable = true;
// For product us withInfusionSet
let test = true;

AFRAME.registerComponent('bottle_nacl500', {

    init: function () {

        element = this.el;
        bottleCap = $('#nacl500Cap');
        infusionSetInBottle = $('#infusionSetInBottle');
        infusionSetHanged = $('#infusionSetHanged');

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
    capOverBottlePosition: '0 1.99 0',
    capOverBinPosition: '0.779 1.99 3.185',
    capInBinPosition: '0.779 -0.288 3.185',
    hangedPosition: '0.841 1.36 -0.539',
    hangedRotation: '0 66.46 180',
    dur: 500,
};

// Used in class state to init
export function initBottlePutOnTableTakeOffCap() {
    $(element).attr('position', schema.onTablePosition);
    bottleCap.remove();
}

export function initBottleHanged() {
    $(element).attr('position', schema.hangedPosition);
    $(element).attr('rotation', schema.hangedRotation);
    bottleCap.remove();
}

function takeBottle() {
    console.log("takeBottle");
    movable = false;
    aAnimationWrapper(element, '', 'position', '', schema.inFrontOfCameraPosition, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);
}

function checkBack() {
    console.log("checkBack");
    movable = false;
    aAnimationWrapper(element, '', 'rotation', '', schema.checkBackSiteRotation, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);

}

function checkTop() {
    console.log("checkTop");
    movable = false;
    aAnimationWrapper(element, '', 'rotation', '', schema.checkTopSiteRotation, schema.dur, '', true, 'forwards');
    setTimeout(()=>{ movable = true }, schema.dur);

}

function putOnTable() {
    console.log("putOnTable");
    movable = false;

    aAnimationWrapper(element, '', 'position', '', schema.onTablePosition, schema.dur, '', true, 'forwards');
    aAnimationWrapper(element, '', 'rotation', '', schema.onTableRotation, schema.dur, '', true, 'forwards');

    setTimeout(()=>{ movable = true }, schema.dur);

}

function takeOffCap() {
    console.log("takeOffCap");
    movable = false;

    if (stateIndex.get('wasteBinCapOpen') === false) {
        stateIndex.set('wasteBinCapOpen', true);
    }
    aAnimationWrapper(bottleCap, '', 'position', '', schema.capOverBottlePosition, schema.dur, '', true, 'forwards');

    setTimeout(() => {
        aAnimationWrapper(bottleCap, '', 'position', '', schema.capOverBinPosition, schema.dur, '', true, 'forwards');
    }, schema.dur);

    setTimeout(() => {
        aAnimationWrapper(bottleCap, '', 'position', '', schema.capInBinPosition, schema.dur, '', true, 'forwards');
    }, schema.dur * 2);

    setTimeout(() => {
        stateIndex.set('wasteBinCapOpen', false);
        $(bottleCap).remove();

        movable = true;

    }, schema.dur * 2.5);
}

function hangUp() {
    console.log("hangUp");
    movable = false;

    aAnimationWrapper(element, '', 'position', '', schema.hangedPosition, schema.dur, '', true, 'forwards');

    aAnimationWrapper(element, '', 'rotation', '', schema.hangedRotation, schema.dur, '', true, 'forwards');

    setTimeout(()=>{infusionSetHanged.attr('visible', true)},schema.dur);

    infusionSetInBottle.remove();

    stateIndex.setIn(['bottlePrepare', 'finish'], true);
}

function handleClickBottle() {
    console.log("click bottle");
    
    //test!!!
    const controllerModel = document.querySelector('#viveControllerRight');
    console.log("controllerModel: ", controllerModel, typeof(controllerModel));
    console.log("controllerModel.getAttribute('obj-model'): ", controllerModel.getAttribute('obj-model'), typeof(controllerModel.getAttribute('obj-model')));
    
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
        stateIndex.getIn(['infusionSet', 'position']) === infusionSet.position.IN_BOTTLE &&
        test === true && movable
    ) {
        stateIndex.setIn(['bottlePrepare', 'position'], bottle.position.HANGED);
    }
}

export function handleNotifyBottle(nextState) {
    if(stateIndex.getIn(['bottlePrepare', 'finish'])) {
        return false;
    }

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
        nextState.bottlePrepare.withCap === false &&
        nextState.sectionSelected !== 4
    ) {
        takeOffCap();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }
    else if (
        nextState.bottlePrepare.position === bottle.position.HANGED &&
        currentState.infusionSet.position !== infusionSet.position.IN_BOTTLE &&
        nextState.bottlePrepare.finish === false &&
        nextState.infusionSet.position === infusionSet.position.IN_BOTTLE &&
        test === true
    ) {
        hangUp();
        // deep copy
        // currentState = _.cloneDeep(stateIndex.getState());
    }
}
