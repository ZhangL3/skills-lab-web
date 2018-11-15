import $ from 'jquery';
import _ from 'lodash';

import { detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import stateIndex from './state';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setCanTriggerChamberAndWheel} from "./infusionSetHangedVive";
import hints from "../utils/hints";

let element;
let nacl500Bottle;
let infusionSetInBottle;
let currentControllerState;

export default AFRAME.registerComponent('toggle_box_nacl500_hanged', {

    init: function(){

        element = this.el;
        infusionSetInBottle = document.querySelector('#infusionSetInBottle');
        nacl500Bottle = document.querySelector('#nacl500Bottle');
        
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },

});

const schema = {
    hangedPosition: '0.841 1.36 -0.539',
    hangedRotation: '0 66.46 180',
    dur: 500,
};

export function handleControllerReleaseToggleBoxNacl500Hanged( triggerEvent ) {

    if (
        controllerStateIndex.getControllerState('nacl500Hanged')
        || !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }
    // Hang nacl 500 bottle
    if (
        controllerStateIndex.getControllerState('nacl500InHandToStand') === triggerEvent.activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('nacl500InHandToStand')
        && !stateIndex.getIn(['bottlePrepare', 'finish'])
    ) {
        $(nacl500Bottle).trigger('hangToStand');
        //After the change of DOM, run the animation
        setTimeout(()=>{
            aAnimationWrapper(nacl500Bottle, '', 'position', '', schema.hangedPosition, schema.dur, '',true , 'forwards');
            aAnimationWrapper(nacl500Bottle, '', 'rotation', '', schema.hangedRotation, schema.dur, '',true , 'forwards');
            setCanTriggerChamberAndWheel(true);
        }, 500);
        element.setAttribute('visible', false);
        // show infusion set in bottle during hinging
        setTimeout(()=>{
            infusionSetInBottle.setAttribute('visible', true);
        }, 50);
        // Remove infusion set in bottle after hinging
        setTimeout(()=> {
            $(infusionSetInBottle).remove();
        }, 500 + schema.dur);
        stateIndex.set('hint', hints.squeezeChamber);
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
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


