import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';

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
    console.log("hide clock indicate");
    $(plat30sec).remove();
}

function getPlat30Rotation(){
    const oTime= new Date();
    const curTime=oTime.getSeconds();
    const gradForOneSec=360/60;
    return {x: -(curTime*gradForOneSec), y: 0, z: 0};
}

function handleClickHandle () {
    if (// TODO: for product remove comment
        // stateIndex.getIn(['tableDisinfection', 'finish']) === true &&
        stateIndex.getIn(['handDisinfection', 'disinfecting']) === false &&
        stateIndex.getIn(['handDisinfection', 'finish']) === false
    ){
        stateIndex.setIn(['handDisinfection', 'disinfecting'], true);
    }

}

export function handleNotifyHandDisinfection(nextState) {

    console.log("handleNotifyHandDisinfection", nextState);

    if(stateIndex.getIn(['handDisinfection', 'finish'])) {
        return false;
    }

    if (// TODO: for product remove comment
        // nextState.tableDisinfection.hasCloth === true &&
        nextState.handDisinfection.disinfecting === true &&
        nextState.handDisinfection.finish === false &&
        currentState.handDisinfection.disinfecting === false
    ) {
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // active handle, after 30sec chang state
        handDisinfection();
        setTimeout(()=>{
            stateIndex.setIn(['handDisinfection', 'disinfected'], true);
        }, handDisinfectionTime);
    }
    else if (
        nextState.handDisinfection.disinfecting === true &&
        nextState.handDisinfection.disinfected === true
    ) {
        hideClockIndicate();
        stateIndex.setIn(['handDisinfection', 'finish'], true)
    }

}

