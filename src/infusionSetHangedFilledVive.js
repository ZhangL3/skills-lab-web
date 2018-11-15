import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import { detectCollision } from "../utils/isEmitted";
import hints from '../utils/hints';

let currentControllerState;
let element;
let infusionSetFilledFill;
let infusionSetHangedFilledWheel;
let infusionSetFixed;

// to different open wheel and fix tube
let touchable;
let canFixTube = false;

export default AFRAME.registerComponent('infusion_set_hanged_filled_vive', {

    init: function(){
        element = this.el;
        infusionSetFilledFill = document.querySelector('#infusionSetFilledFill');
        infusionSetHangedFilledWheel =document.querySelector('#infusionSetHangedFilledWheel');
        infusionSetFixed = document.querySelector('#infusionSetFixed');

        touchable = true;

        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });
    }
});

const schema = {
    infusionSetHangedFilledWheelOpenPosition: '-0.530 0.110 -0.060',
    dur: 800
};

export function handleControllerNotifyInfusionSetHangedFilledVive ( triggerEvent ) {

    if(
        controllerStateIndex.getControllerState('infusionSetWheelClosed')
        || controllerStateIndex.getControllerState('tubeFixed')
        || !touchable
        // || !stateIndex.getIn(['infusionSet', 'tubeFilled'])
    ) {
        console.log("infuisionSetFill return false");
        return false;
    }

    if (
        detectCollision(element, triggerEvent.activeController)
        && canFixTube
    ) {
        controllerStateIndex.setControllerState('tubeFixed', true);
        stateIndex.setIn(['infusionSet', 'finish'], true);
        stateIndex.set('hint', hints.takeNameLabel);
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
        setTimeout(() => {
            canFixTube = true;
        }, 1000)
    }
    // show fixed infusion set
    else if (
        nextControllerState.tubeFixed
        && !currentControllerState.tubeFixed
        && canFixTube
    ) {
        fixTube();
    }

    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function fixTube() {
    console.log("fix tube");
    element.setAttribute('visible', false);
    infusionSetFixed.setAttribute('visible', true);
}

export function setCanFixTube(value) {
    canFixTube = value;
}
