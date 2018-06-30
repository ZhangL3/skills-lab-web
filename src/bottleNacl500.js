import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';
import { bottle } from "../utils/constants";

let element;
let bottleCap;
let currentState;
let plat30sec;

AFRAME.registerComponent('bottle_nacl500', {
    schema:{
        open : {default: '0 -0.09 0'},
        close :   {default: '0 0 0'},
        dur : {default: 500},
    },

    init: function(){

        element = this.el;
        clock = document.querySelector("#clockBody");

        $(this.el).on('click', () => {
            handleClickBottle();
        });

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

    }
});

const schema = {
    open : '0 -0.09 0',
    close : '0 0 0',
    dur : 500,
};

function takeBottle() {

}

function checkBack() {

}

function checkSite() {

}

function checkTop() {

}

function putOnTable() {

}

function takeOfCap() {

}

function hangUp() {

}

function handleClickBottle () {
    if (// TODO: for product remove comment
        // stateIndex.getIn(['handDisinfection', 'finish']) === true &&
        stateIndex.getIn(['bottlePrepare', 'position']) === bottle.position.IN_CUPBOARD
    ){
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
        stateIndex.setIn(['bottlePrepare', 'checkBottle', 'back'], false);
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

export function handleNotifyHandDisinfection(nextState) {
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
        currentState.bottlePrepare.position === bottle.position.IN_CUPBOARD &&
        nextState.bottlePrepare.position === bottle.position.IN_HAND &&
        nextState.bottlePrepare.checkBottle.front === true
    ) {
        takeBottle();
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    }

}
