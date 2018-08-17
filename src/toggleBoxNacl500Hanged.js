import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_nacl500_hanged', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500Hanged( triggerEvent ) {

}

export function handleControllerStateNotifyToggleBoxNacl500Hanged (nextControllerState) {

    if (
        nextControllerState.infusionSetInBottle
        && !nextControllerState.nacl500Hanged
    ) {
        element.setAttribute('visible', true);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


