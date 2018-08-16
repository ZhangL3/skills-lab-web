import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";


let currentState;
let currentControllerState;
let element;
let activeController;
let toggleBoxInfusionSetOnDesk;
let hookInfusionSetInPack;

export default AFRAME.registerComponent('infusion_set_in_pack_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        activeController = null;
        toggleBoxInfusionSetOnDesk = document.querySelector('#toggleBoxInfusionSetOnDesk');
        hookInfusionSetInPack = document.querySelector('#hookInfusionSetInPack');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });
    }
});

const schema = {
    dur : 500,
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

export function handleNotifyInfusionSetInPack(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetInPack ( triggerEvent ) {

    getWorldBound(element);

    if(isEmitted(element, triggerEvent.position)){
        activeController = triggerEvent.activeController;
        controllerStateIndex.setControllerState('infusionSetInPackInHand', activeController);
    }
}

export function handleControllerStateNotifyInfusionSetInPack (nextControllerState) {
    if (
        nextControllerState.infusionSetInPackInHand !== null
        && currentControllerState.infusionSetInPackInHand === null
    ) {
        toggleBoxInfusionSetOnDesk.setAttribute('visible', true);
        dragInHand();
    }

    if (
        nextControllerState.infusionSetChecked
        && !currentControllerState.infusionSetChecked
        && nextControllerState.infusionSetInPackInHand !== null
    ) {
        hookInfusionSetInPack.setAttribute('visible', true);
        toggleBoxInfusionSetOnDesk.setAttribute('material', "color:#00ffff; transparent: true; opacity: 0.5")
    }

    if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
    ) {
        drop();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();
}

function drop() {
    $(element).remove();
}


