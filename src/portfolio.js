import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

import { haveSthInHand } from "./controllerHand";


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

export let canCheckPortfolio = false;

let currentControllerState;

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

export const schema = {
    openPosition : '0 0 0',
    openRotation : '0 0 0',
    closePosition :   '0.08 -0.015 0',
    closeRotation : '0 0 -122.728',
    onTablePosition : '-0.57 0.684 -0.980',
    onTableRotation : '0 -90 -1.43',
    inFrontOfEyesPosition : '0 1 -0.52',
    inFrontOfEyesRotation : '0 -90 -70',
    positionAfterCheckVive: '-0.564 0.682 -0.939',
    dur : 500,
};

// open portfolio
export function open () {
    console.log("open");
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
export function close () {
    console.log("close");
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
    console.log("status5R: ", status5R, typeof(status5R));
    if (!status5R.name) {
        return false;
    }
    else if (!status5R.drug) {
        return false;
    }
    else if (!status5R.dose) {
        return false;
    }
    else if (!status5R.IV) {
        return false;
    }
    else if (!status5R.CF) {
        return false;
    }
    return true;
}

function handleClickPortfolio () {

    if (
        stateIndex.getIn(['portfolio','position']) === constants.portfolio.position.ON_TABLE &&
        !is5RChecked()
    ) {
        stateIndex.setIn(['portfolio', 'position'], constants.portfolio.position.IN_HAND);
        stateIndex.set('started', true);
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
export function hideHooks() {
    console.log("hide!!!!: ");
    hookName.setAttribute('visible', 'false');
    hookDrug.setAttribute('visible', 'false');
    hookDose.setAttribute('visible', 'false');
    hookIV.setAttribute('visible', 'false');
    hookCF.setAttribute('visible', 'false');
}

export function handleNotifyPortfolio(nextState) {
    if(nextState.portfolio.finish) {
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
        nextState.portfolio.checkFinish === true
        && nextState.portfolio.finish === false
        // && nextState.portfolio.position === constants.portfolio.position.IN_HAND
        && nextState.portfolio.position === constants.portfolio.position.ON_TABLE
    ) {
        putOnTable();
        close();
        hideHooks();

        stateIndex.setIn(['portfolio', 'finish'], true);
    }
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyPortfolio ( triggerEvent ) {

    if (stateIndex.getIn(['portfolio', 'finish'])) {
        return false;
    }

    // boundingBoxOnTable = getWorldBound(element);
    activeController = triggerEvent.activeController;

    // if(isEmitted(element, triggerEvent.position)){
    if(detectCollision(element, activeController)){
        // Store activeControllerId only if portfolio not draged
        if(
            controllerStateIndex.getControllerState('portfolioInHand') === null
            && haveSthInHand(activeController).length === 0
        ) {
            activeController = triggerEvent.activeController;
            let activeControllerId = activeController.getAttribute('id');
            controllerStateIndex.setControllerState('portfolioInHand', activeControllerId);
            stateIndex.set('started', true);
            setTimeout(()=>{
                canCheckPortfolio = true;
            }, 300);
        }
    }
}

export function handleControllerStateNotifyPortfolio (nextControllerState) {
    if (
        controllerStateIndex.getControllerState('portfolioInHand')
        && stateIndex.getIn(['portfolio', 'finish'])
    ) {
        return false;
    }


    if (
        nextControllerState.portfolioInHand !== null
        && currentControllerState.portfolioInHand === null
    ) {
        open();
        dragInHand();
        currentControllerState = _.cloneDeep(nextControllerState);
    }
    if (
        nextControllerState.portfolioInHand === null
        && currentControllerState != null
        && currentControllerState.portfolioInHand !== null
    ) {
        console.log("should drop portfolio");
        drop();
        dropOnDesk();
        currentControllerState = _.cloneDeep(nextControllerState);
    }
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
}

function drop() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
}

function dropOnDesk() {
    // After changing of DOM, run the animation
    setTimeout(()=>{
        const droppedPosition = element.getAttribute('position');
        const onDeskPosition = `${droppedPosition.x} 0.685 ${droppedPosition.z}`;
        // element.setAttribute('position', `${droppedPosition.x} 0.685 ${droppedPosition.z}`);
        aAnimationWrapper(
            element, '', 'position', '', onDeskPosition, schema.dur,
            '', true, 'forwards'
        );
    }, 500);
}


