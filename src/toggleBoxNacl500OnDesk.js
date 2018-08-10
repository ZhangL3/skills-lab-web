import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";

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

function isBottleChecked() {
    if (!controllerStateIndex.getControllerState('nacl500LabelChecked')) {
        return false;
    }
    if (!controllerStateIndex.getControllerState('nacl500LiquidChecked')) {
        return false;
    }
    if (!controllerStateIndex.getControllerState('nacl500CapChecked')) {
        return false;
    }
    return true;
}

export function handleControllerNotifyToggleBoxNacl500OnDesk( triggerEvent ) {

    if(controllerStateIndex.getControllerState('nacl500InHandToDesk')) {

        getWorldBound(element);

        if(isEmitted(element, triggerEvent.position)){

            $(bottleNacl500).trigger('putOnDesk');

            aAnimationWrapper(bottleNacl500, '', 'position', '', schema.onDeskPosition, schema.dur, '',true , 'forwards');
        }
    }
}

export function handleControllerStateNotifyToggleBoxNacl500OnDesk (nextControllerState) {

    if (nextControllerState.nacl500InHandToDesk && !currentControllerState.nacl500InHandToDesk) {
        setVisibleTrue(element);
    }

    if (isBottleChecked()) {
        element.setAttribute('material', 'color:#00ffff; transparent: true; opacity: 0.5')
    }

    if (nextControllerState.nacl500OnDesk && !currentControllerState.nacl500OnDesk) {
        setVisibleFalse(element);
    }

    if(nextControllerState.deskDisinfectionAllFinish && !currentControllerState.deskDisinfectionAllFinish) {

    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


