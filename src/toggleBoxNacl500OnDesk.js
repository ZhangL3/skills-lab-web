import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";
import { isBottleChecked } from './bottleNacl500Vive';

let element;
let bottleNacl500;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_nacl500_on_desk', {

    init: function(){
        element = this.el;
        bottleNacl500 = document.querySelector('#nacl500Bottle');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },

});

const schema = {
    onDeskPosition: '-0.32 0.732 -0.83',
    dur: '500'
};

export function handleControllerNotifyToggleBoxNacl500OnDesk( triggerEvent ) {
    getWorldBound(element);
    if(!isEmitted(element, triggerEvent.position)) {
        return false;
    }

    if(
        controllerStateIndex.getControllerState('nacl500InHandToDesk') !== null
        &&triggerEvent.activeController.getAttribute('id') === controllerStateIndex.getControllerState('nacl500InHandToDesk')
        && !controllerStateIndex.getControllerState('nacl500OnDesk')
    ) {
        $(bottleNacl500).trigger('putOnDesk');
        aAnimationWrapper(bottleNacl500, '', 'position', '', schema.onDeskPosition, schema.dur, '',true , 'forwards');
    }
}

export function handleControllerStateNotifyToggleBoxNacl500OnDesk (nextControllerState) {

    console.log("nextControllerState: ", nextControllerState, typeof(nextControllerState));
    console.log("currentControllerState: ", currentControllerState, typeof(currentControllerState));

    if (
        nextControllerState.nacl500InHandToDesk !== null
        && currentControllerState.nacl500InHandToDesk === null
    ) {
        setVisibleTrue(element);
    }

    if (
        isBottleChecked()
        && nextControllerState.nacl500InHandToDesk
    ) {
        element.setAttribute('material', 'color:#00ffff; transparent: true; opacity: 0.5')
    }

    if (
        nextControllerState.nacl500OnDesk
        && !currentControllerState.nacl500OnDesk
    ) {
        setVisibleFalse(element);
    }

    if(nextControllerState.deskDisinfectionAllFinish && !currentControllerState.deskDisinfectionAllFinish) {

    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


