import aAnimationWrapper from '../utils/aAnimationWrapper';
import $ from 'jquery';

import stateIndex from './state';

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

function moveToCamera() {

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
    stateIndex.getIn(['handDisinfection', 'disinfecting']) === false &&
    stateIndex.getIn(['handDisinfection', 'finish']) === false
    ){
        stateIndex.setIn(['handDisinfection', 'disinfecting'], true);
    }

}

export function handleNotifyHandDisinfection(nextState) {
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
            stateIndex.setIn(['handDisinfection', 'finish'], true);
        }, 3000);
    }
    else if (
        nextState.handDisinfection.disinfecting === true &&
        nextState.handDisinfection.finish === true
    ) {
        hideClockIndicate();
    }

}
