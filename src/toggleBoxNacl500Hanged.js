import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import stateIndex from './state';
import aAnimationWrapper from '../utils/aAnimationWrapper';

import {setCanTriggerChamberAndWheel} from "./infusionSetHangedVive";

let element;
let nacl500Bottle;

let currentControllerState;

export default AFRAME.registerComponent('toggle_box_nacl500_hanged', {

    init: function(){

        element = this.el;
        nacl500Bottle = document.querySelector('#nacl500Bottle');
        
        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
    hangedPosition: '0.841 1.36 -0.539',
    hangedRotation: '0 66.46 180',
    dur: 500,
};

export function handleControllerNotifyToggleBoxNacl500Hanged( triggerEvent ) {

    if (controllerStateIndex.getControllerState('nacl500Hanged')) {
        return false;
    }

    if(!detectCollision(element, triggerEvent.activeController)) {
        return false;
    }

    if (
        controllerStateIndex.getControllerState('nacl500InHandToStand') === triggerEvent.activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('nacl500InHandToStand')
        && !stateIndex.getIn(['bottlePrepare', 'finish'])
    ) {
        console.log("hang to stand");
        $(nacl500Bottle).trigger('hangToStand');
        //After the change of DOM, run the animation
        setTimeout(()=>{
            aAnimationWrapper(nacl500Bottle, '', 'position', '', schema.hangedPosition, schema.dur, '',true , 'forwards');
            // nacl500Bottle.setAttribute('position', schema.hangedPosition);
            // nacl500Bottle.setAttribute('rotation', schema.hangedRotation);
            aAnimationWrapper(nacl500Bottle, '', 'rotation', '', schema.hangedRotation, schema.dur, '',true , 'forwards');
            setCanTriggerChamberAndWheel(true);
        }, 500);
        element.setAttribute('visible', false);
    }

}

export function handleControllerStateNotifyToggleBoxNacl500Hanged (nextControllerState) {

    if (nextControllerState.nacl500Hanged) {
        return false;
    }

    if (
        nextControllerState.nacl500InHandToStand
        && !currentControllerState.nacl500InHandToStand
    ) {
        element.setAttribute('visible', true);
    }

    // if (
    //     nextControllerState.nacl500Hanged
    //     && !currentControllerState.nacl500Hanged
    // ) {
    //     console.log("should hanged");
    //     // drop bottle to hang
    //     $(nacl500Bottle).trigger('hangToStand');
    // }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


