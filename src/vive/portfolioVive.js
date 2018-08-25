import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

import { close, hideHooks, is5RChecked, open, schema} from "../portfolio";


let element;
let currentState;

let activeController;
let boundingBoxOnTable;

let currentControllerState;

let observer;

export default AFRAME.registerComponent('portfolio', {

    init: function(){
        // shallow copy
        element = this.el;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        observer = new MutationObserver(() => {

        })
    }
});

export function handleNotifyPortfolio(nextState) {
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyPortfolioVive ( triggerEvent ) {

    boundingBoxOnTable = getWorldBound(element);

    if(isEmitted(element, triggerEvent.position)){
        // Store activeControllerId only if portfolio not draged
        if(controllerStateIndex.getControllerState('portfolioInHand') === null) {
            activeController = triggerEvent.activeController;
            let activeControllerId = activeController.getAttribute('id');
            controllerStateIndex.setControllerState('portfolioInHand', activeControllerId);
        }
    }
}

export function handleControllerStateNotifyPortfolioVive (nextControllerState) {
    if (nextControllerState.portfolioInHand !== null && currentControllerState.portfolioInHand === null) {

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


