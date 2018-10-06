import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";
import { controllerActions } from "../utils/controllerActions";

let currentState;
let currentControllerState;
let element;
let infusionSetFilledFill;
let infusionSetHangedFilledWheel;
let infusionSetFixed;

// to different open wheel and fix tube
let touchable;

export default AFRAME.registerComponent('infusion_set_hanged_filled_vive', {

    init: function(){
        // shallow copy
        element = this.el;
        infusionSetFilledFill = document.querySelector('#infusionSetFilledFill');
        infusionSetHangedFilledWheel =document.querySelector('#infusionSetHangedFilledWheel');
        infusionSetFixed = document.querySelector('#infusionSetFixed');

        touchable = true;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });
    }
});

const schema = {
    infusionSetHangedFilledWheelOpenPosition: '-0.530 0.110 -0.060',
    dur: 800
};

export function handleNotifyInfusionSetHangedFilledVive(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyInfusionSetHangedFilledVive ( triggerEvent ) {

    console.log("controllerStateIndex.getControllerState('infusionSetWheelClosed'): ", controllerStateIndex.getControllerState('infusionSetWheelClosed'), typeof(controllerStateIndex.getControllerState('infusionSetWheelClosed')));
    console.log("controllerStateIndex.getControllerState('tubeFixed'): ", controllerStateIndex.getControllerState('tubeFixed'), typeof(controllerStateIndex.getControllerState('tubeFixed')));
    console.log("!touchable: ", !touchable, typeof(!touchable));
    console.log("!stateIndex.getIn(['infusionSet', 'tubeFilled']): ", !stateIndex.getIn(['infusionSet', 'tubeFilled']), typeof(!stateIndex.getIn(['infusionSet', 'tubeFilled'])));
    
    if(
        controllerStateIndex.getControllerState('infusionSetWheelClosed')
        || controllerStateIndex.getControllerState('tubeFixed')
        || !touchable
        || !stateIndex.getIn(['infusionSet', 'tubeFilled'])
    ) {
        console.log("infuisionSetFill return false");
        return false;
    }

    if (detectCollision(element, triggerEvent.activeController)) {
        controllerStateIndex.setControllerState('tubeFixed', true);
        stateIndex.setIn(['infusionSet', 'finish'], true);
    }

}

export function handleControllerStateNotifyInfusionSetHangedFilledVive (nextControllerState) {

    // Show filled infusion set
    if (
        !nextControllerState.infusionSetWheelClosed
        && nextControllerState.dripChamberFilled
        && currentControllerState.infusionSetWheelClosed
    ) {
        touchable = false;
        setTimeout(() => {
            infusionSetHangedFilledWheel.setAttribute('position', schema.infusionSetHangedFilledWheelOpenPosition);
            infusionSetFilledFill.setAttribute('visible', true);
            element.setAttribute('visible', true);
            touchable = true;
        }, schema.dur);
    }
    // show fixed infusion set
    else if (
        nextControllerState.tubeFixed
        && !currentControllerState.tubeFixed
    ) {
        fixTube();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function fixTube() {
    console.log("fix tube");
    element.setAttribute('visible', false);
    infusionSetFixed.setAttribute('visible', true);
}