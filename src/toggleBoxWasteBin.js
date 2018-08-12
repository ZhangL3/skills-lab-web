import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";

let element;
let bottleNacl500Cap;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_waste_bin', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());


    },

});

const schema = {
    capInBinPosition: '0.779 -0.288 3.185',
    dur : 500,
};

function dropBottleNacl500Cap() {
    $(bottleNacl500Cap).trigger('drop', );

    if(bottleNacl500Cap) {
        aAnimationWrapper(nacl500Cap, '', 'position', '', schema.capInBinPosition, schema.dur, '',true , 'forwards');
    }

}

export function handleControllerNotifyToggleBoxWasteBin( triggerEvent ) {

    if(
        controllerStateIndex.getControllerState('bottleNacl500CapInHand')
        && stateIndex.get('wasteBinCapOpen')
    ) {

        getWorldBound(element);

        if(isEmitted(element, triggerEvent.position)){

            controllerStateIndex.setControllerState('bottleNacl500CapDroped', true);

        }
    }
}

export function handleControllerStateNotifyToggleBoxWasteBin (nextControllerState) {

    if (nextControllerState.bottleNacl500CapInHand && nextControllerState.bottleNacl500CapDroped) {
        dropBottleNacl500Cap();
    }


    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


