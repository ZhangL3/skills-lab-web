import $ from 'jquery';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';

import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";
import hints from '../utils/hints';


let element;
let clock;
let currentState;
let plat30sec;
let handDisinfectionTime = 3000;

AFRAME.registerComponent('hand_disinfection', {
    schema:{
        open : {default: '0 -0.09 0'},
        close :   {default: '0 0 0'},
        dur : {default: 500},
    },

    init: function(){

        element = this.el;
        clock = document.querySelector("#clockBody");

        $(this.el).on('click', () => {
            handleClickHandle();
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

function handDisinfection() {
    aAnimationWrapper(element, '', 'position', '', schema.open, schema.dur, '', false, 'backwards' );
    showClockIndicate();
}

function createPlat30Sec () {

}

function showClockIndicate() {

    plat30sec=document.createElement("a-gltf-model");

    plat30sec.setAttribute("id","plat30");
    plat30sec.setAttribute("src","#clockMarker");
    plat30sec.setAttribute("position", "0.01 0 0");
    plat30sec.setAttribute("rotation", getPlat30Rotation());

    clock.appendChild(plat30sec);
}

function hideClockIndicate() {
    $(plat30sec).remove();
}

function getPlat30Rotation(){
    const oTime= new Date();
    const curTime=oTime.getSeconds();
    const gradForOneSec=360/60;
    return {x: -(curTime*gradForOneSec), y: 0, z: 0};
}

function handleClickHandle () {
    if (
        stateIndex.getIn(['portfolio', 'finish']) === true &&
        stateIndex.getIn(['handDisinfection', 'disinfecting']) === false &&
        stateIndex.getIn(['handDisinfection', 'finish']) === 0
    ){
        stateIndex.setIn(['handDisinfection', 'disinfecting'], true);
    }
    else if (
        stateIndex.getIn(['tableDisinfection', 'finish']) === true &&
        stateIndex.getIn(['handDisinfection', 'disinfecting']) === false &&
        stateIndex.getIn(['handDisinfection', 'finish']) === 1
    ){
        stateIndex.setIn(['handDisinfection', 'disinfecting'], true);
    }
    // chang hints
    else if (
        !stateIndex.getIn(['portfolio', 'finish'])
    ) {
        console.log("Check portfolio before disinfecting hands");
    }
    else if (
        stateIndex.getIn(['portfolio', 'finish']) &&
        !stateIndex.getIn(['tableDisinfection', 'finish'])
    ) {
        console.log("Disinfect the work desk before disinfecting hands");
    }

}

export function handleNotifyHandDisinfection(nextState) {

    if(stateIndex.getIn(['handDisinfection', 'finish']) === 2) {
        return false;
    }

    if (// TODO: for product remove comment
        // nextState.tableDisinfection.hasCloth === true &&
         nextState.handDisinfection.disinfecting === true
         &&  (nextState.handDisinfection.finish === 0 || nextState.handDisinfection.finish === 1)
         && currentState.handDisinfection.disinfecting === false
         && nextState.handDisinfection.disinfected === false
    ) {
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // active handle, after 30sec chang state
        handDisinfection();
        setTimeout(()=>{
            stateIndex.setIn(['handDisinfection', 'disinfected'], true);
            stateIndex.setIn(['handDisinfection', 'disinfecting'], false);
            stateIndex.setIn(['handDisinfection', 'disinfected'], false);
            stateIndex.setIn(['handDisinfection', 'finish'], stateIndex.getIn(['handDisinfection', 'finish']) + 1);
            hideClockIndicate();
            changeHint();
        }, handDisinfectionTime);
    }
    // else if (
    //     (nextState.handDisinfection.finish === 0 || nextState.handDisinfection.finish === 1) &&
    //     nextState.handDisinfection.disinfecting === true &&
    //     nextState.handDisinfection.disinfected === true
    // ) {
    //     hideClockIndicate();
    //     stateIndex.setIn(['handDisinfection', 'finish'], stateIndex.getIn(['handDisinfection', 'finish']) + 1);
    // }

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyHandDisinfection( triggerEvent ) {
    // getWorldBound(element);
    // if (isEmitted(element, triggerEvent.position)) {
    if (detectCollision(element, triggerEvent.activeController)) {
        $(element).trigger('click');
    }
}

export function handleControllerStateNotifyHandDisinfection (nextControllerState) {

}

function changeHint() {
    if (
        stateIndex.getIn(['handDisinfection', 'finish']) === 1
    ) {
        stateIndex.set('hint', hints.wearGloves);
    }
    else if (
        stateIndex.getIn(['handDisinfection', 'finish']) === 2
    ) {
        stateIndex.set('hint', `${hints.takeDrug} or \\n ${hints.takeInfusionSet}`);
    }
}

