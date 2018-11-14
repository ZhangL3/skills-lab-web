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
import dropDown from "../utils/dropDown";
import {showHook} from "./portfolioCheck";
import hints from '../utils/hints';
import hasCollisionWithCabinets from "../utils/hasCollisionWithCabinets";

let element;
let currentState;
let foregroundOfPortfolio;
let toggleBoxPortfolio;

let activeController;

let     hookName;
let hookDrug;
let hookDose;
let hookIV;
let hookCF;

let isPortfolioOpen = false;
let isPortfolioInHand = null;

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

        toggleBoxPortfolio = document.querySelector('#toggleBoxPortfolio');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
        
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
    aAnimationWrapper(
        foregroundOfPortfolio, '', 'rotation', '', schema.openRotation, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        foregroundOfPortfolio, '', 'position', '', schema.openPosition, schema.dur,
        '', true, 'forwards'
    );
    isPortfolioOpen = true;
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
    aAnimationWrapper(
        foregroundOfPortfolio, '', 'rotation', schema.openRotation, schema.closeRotation, schema.dur,
        '', true, 'forwards'
    );
    isPortfolioOpen = false;
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
        stateIndex.set('hint', hints.check5R);
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
        stateIndex.set('hint', hints.handDisinfection);
        stateIndex.setIn(['portfolio', 'checkFinish'], true);
        stateIndex.setIn(['portfolio', 'finish'], true);
    }
}

// hide the hooks for 5R
export function hideHooks() {
    hookName.setAttribute('visible', false);
    hookDrug.setAttribute('visible', false);
    hookDose.setAttribute('visible', false);
    hookIV.setAttribute('visible', false);
    hookCF.setAttribute('visible', false);
}

export function handleNotifyPortfolio(nextState) {
    if(currentState.portfolio.finish) {
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
        && nextState.portfolio.position === constants.portfolio.position.ON_TABLE
    ) {
        putOnTable();
        close();
        // Change attribute after changing the DOM element
        setTimeout(() => {
            hideHooks();
        }, 500);

        // stateIndex.setIn(['portfolio', 'finish'], true);
    }
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyPortfolio ( triggerEvent ) {

    if (stateIndex.getIn(['portfolio', 'finish'])) {
        return false;
    }

    activeController = triggerEvent.activeController;

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

export function handleControllerPressPortfolio (triggerEvent) {
    if (stateIndex.getIn(['portfolio', 'finish'])) {
        return false;
    }

    activeController = triggerEvent.activeController;

    if(detectCollision(element, activeController)){
        if(
            controllerStateIndex.getControllerState('portfolioInHand') === null
            && haveSthInHand(activeController).length === 0
        ) {
            activeController = triggerEvent.activeController;
            let activeControllerId = activeController.getAttribute('id');

            controllerStateIndex.setControllerState('isPortfolioHandling', true);

            controllerStateIndex.setControllerState('portfolioInHand', activeControllerId);
            stateIndex.set('started', true);
            stateIndex.set('hint', hints.checkPortfolio);
            setTimeout(()=>{
                canCheckPortfolio = true;
            }, 300);
        }
    }
}

export function handleControllerReleasePortfolio (triggerEvent) {
    
    if (
        stateIndex.getIn(['portfolio', 'finish'])
        || !controllerStateIndex.getControllerState('portfolioInHand')
    ) {
        return false;
    }
    activeController = triggerEvent.activeController;

    if(
        triggerEvent.activeController.getAttribute('id') === controllerStateIndex.getControllerState('portfolioInHand')
        && !detectCollision(toggleBoxPortfolio, activeController)
        && !hasCollisionWithCabinets(element)
    ) {
        controllerStateIndex.setControllerState('portfolioInHand', null);
    }
}

export function handleControllerStateNotifyPortfolio (nextControllerState) {

    if (
        controllerStateIndex.getControllerState('portfolioInHand')
        && stateIndex.getIn(['portfolio', 'finish'])
    ) {
        return false;
    }

    // First time to take portfolio
    if (
        nextControllerState.portfolioInHand !== null
        && isPortfolioInHand === null
        && isPortfolioOpen === false
    ) {
        open();
        dragInHand();
    }
    // Take portfolio if dropped down
    else if (
        nextControllerState.portfolioInHand !== null
        && isPortfolioInHand === null
        && isPortfolioOpen === true
    ) {
        dragInHand();
        showHook();
    }
    // Put portfolio on desk
    else if (
        nextControllerState.portfolioInHand === null
        && isPortfolioInHand !== null
        && stateIndex.getIn(['portfolio', 'finish'])
        && nextControllerState.isPortfolioHandling === false
    ) {
        drop();
        dropOnDesk();
    }
    // Drop down to floor
    else if (
        nextControllerState.portfolioInHand === null
        && isPortfolioInHand !== null
        && !stateIndex.getIn(['portfolio', 'finish'])
        && nextControllerState.isPortfolioHandling === true
    ) {
        drop();
        showHook();
        setTimeout(()=>{
            dropDown(element);
        }, 100);
    }

    currentControllerState = _.cloneDeep(nextControllerState);
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
    isPortfolioInHand = activeController.getAttribute('id');
}

function drop() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
    isPortfolioInHand = null;
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


