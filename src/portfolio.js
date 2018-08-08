import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
// import { dragByController, drop } from "../utils/dragByController";
import { controllerActions } from "../utils/controllerActions";


let element;
let currentState;
let foregroundOfPortfolio;

let activeController;
let boundingBoxOnTable;

let hookName;
let hookDrug;
let hookDose;
let hookIV;
let hookCF;

let ViveController;
let currentControllerState;

let timeInterval;

let controllerActivities;


export default AFRAME.registerComponent('portfolio', {

    init: function(){
        // shallow copy
        element = this.el;
        // Here must use querySelector, not JQuery selector.
        foregroundOfPortfolio = document.querySelector('#portfolioFrontSiteModel');

        hookName = document.querySelector("#hookName");
        hookDrug = document.querySelector("#hookDrug");
        hookDose = document.querySelector("#hookDose");
        hookIV = document.querySelector("#hookIV");
        hookCF = document.querySelector("#hookCF");

        controllerActivities = null;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
        
        console.log("currentControllerState: ", currentControllerState, typeof(currentControllerState));

        $(this.el).on('click', () => {
            handleClickPortfolio();
        });
    }
});

const schema = {
    openPosition : '0 0 0',
    openRotation : '0 0 0',
    closePosition :   '0.08 -0.015 0',
    closeRotation : '0 0 -122.728',
    onTablePosition : '-0.57 0.684 -0.980',
    onTableRotation : '0 -90 -1.43',
    inFrontOfEyesPosition : '0 1 -0.52',
    inFrontOfEyesRotation : '0 -90 -70',
    dur : 500,
    positionAfterCheckVive: '-0.564 0.682 -0.939',
};

// open portfolio
function open () {
    aAnimationWrapper(
        foregroundOfPortfolio, '', 'rotation', '', schema.openRotation, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        foregroundOfPortfolio, '', 'position', '', schema.openPosition, schema.dur,
        '', true, 'forwards'
    );
}

function faceToCamera() {
    aAnimationWrapper(
        element, '', 'rotation', '0 0 -55', schema.dur, '', true, 'forwards'
    );
}

function takeInHand () {
    aAnimationWrapper(
        element, '', 'position', schema.onTablePosition, schema.inFrontOfEyesPosition, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        element, '', 'rotation', schema.onTableRotation, schema.inFrontOfEyesRotation, schema.dur,
        '', true, 'forwards'
    );
}

// close portfolio
function close () {
    // aAnimationWrapper(
    //     foregroundOfPortfolio, 0, 'position', schema.openPosition, schema.closePosition, schema.dur,
    //     '', true, 'forwards'
    // );
    aAnimationWrapper(
        foregroundOfPortfolio, '', 'rotation', schema.openRotation, schema.closeRotation, schema.dur,
        '', true, 'forwards'
    );
}

function putOnTable(){
    aAnimationWrapper(
        element, '', 'position', schema.inFrontOfEyesPosition, schema.onTablePosition, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        element, '', 'rotation', schema.inFrontOfEyesRotation, schema.onTableRotation, schema.dur,
        '', true, 'forwards'
    );
}

export function is5RChecked () {
    const status5R = stateIndex.getIn(['portfolio', 'checkPortfolio']);
    const checkValues = Object.values(status5R);
    for(let i = 0; i < checkValues.length; i++) {
        if (checkValues[i] === false) {
           return false;
        }
    }
    return true;
}

function handleClickPortfolio () {

    if (
        stateIndex.getIn(['portfolio','position']) === constants.portfolio.position.ON_TABLE &&
        !is5RChecked()
    ) {
        stateIndex.setIn(['portfolio', 'position'], constants.portfolio.position.IN_HAND);
    }
    else if (
        stateIndex.getIn(['portfolio','position']) === constants.portfolio.position.IN_HAND &&
        is5RChecked()
    ) {
        stateIndex.setIn(['portfolio', 'position'], constants.portfolio.position.ON_TABLE);
    }
    else if (
        currentState.portfolio.position === constants.portfolio.position.ON_TABLE &&
        stateIndex.getIn(['portfolio','position']) === constants.portfolio.position.ON_TABLE &&
        is5RChecked() &&
        stateIndex.getIn(['portfolio', 'finish']) === false
    ) {
        stateIndex.setIn(['portfolio', 'checkFinish'], true);
    }
}

// hide the hooks for 5R
function hideHooks() {
    console.log("hide!!!!: ");
    hookName.setAttribute('visible', 'false');
    hookDrug.setAttribute('visible', 'false');
    hookDose.setAttribute('visible', 'false');
    hookIV.setAttribute('visible', 'false');
    hookCF.setAttribute('visible', 'false');
}

export function handleNotifyPortfolio(nextState) {
    // console.log("currentState: ", currentState.portfolio.position);
    // console.log("nextState: ", nextState.portfolio.position);
    // console.log("is5RChecked(): ", is5RChecked());
    // console.log("nextState: ", nextState, typeof(nextState));

    // if(stateIndex.getIn(['portfolio', 'finish'])) {
    if(nextState.portfolio.finish) {
        // vive
        // if (timeInterval) {
        //     drop(element);
        // }
        // if (controllerStateIndex.getAllControllerState('portfolioInHand')) {
        //     drop();
        // }
        return false;
    }

    if(
        (currentState.portfolio.position === constants.portfolio.position.ON_TABLE &&
            nextState.portfolio.position === constants.portfolio.position.IN_HAND) &&
            !is5RChecked()
    ) {
        takeInHand();
        open();
    }
    else if (
        // (currentState.portfolio.position === constants.portfolio.position.IN_HAND &&
        //     nextState.portfolio.position === constants.portfolio.position.ON_TABLE) &&
        // is5RChecked()
        nextState.portfolio.checkFinish === true && nextState.portfolio.finish === false
    ) {
        // console.log("putOnTable: ");
        putOnTable();
        close();
        hideHooks();

        stateIndex.setIn(['portfolio', 'finish'], true);
    }
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyPortfolio ( triggerEvent ) {

    boundingBoxOnTable = getWorldBound(element);

    if(isEmitted(element, triggerEvent.position)){
        if(triggerEvent.eventName === 'triggerDown') {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('portfolioInHand', true);
        }
    }
}

export function handleControllerStateNotifyPortfolio (nextControllerState) {
    if (nextControllerState.portfolioInHand && !currentControllerState.portfolioInHand) {

        open();

        dragInHand();

        currentControllerState = _.cloneDeep(nextControllerState);

    }
    if (!nextControllerState.portfolioInHand && currentControllerState != null && currentControllerState.portfolioInHand) {
        console.log("should drop portfolio");
        drop();
        currentControllerState = _.cloneDeep(nextControllerState);
    }
}

function dragInHand() {
    controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
}

function drop() {
    console.log("drop portfolio");
    controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
}


